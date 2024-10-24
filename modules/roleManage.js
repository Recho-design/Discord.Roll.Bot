// 引入数据库的Schema
const { TemporaryRole, TemporaryRoleStock, ItemList } = require('./schema.js');
const { client, shardid } = require('./client.js');

const monitorBot = process.env.MONITORBOT || "292953664492929025";
const monitorChannel = process.env.MONITOR_CHANNEL;


/**
 * 启动定时清理任务，间隔1分钟检测并清理过期的身份组
 */
function startRoleCleanupTask() {
  setInterval(async () => {
    try {
      const now = new Date;

      // 查询所有 TemporaryRole 记录
      const allRoles = await TemporaryRole.find({});
      allRoles.forEach(async (tempRole) => {
        tempRole.roles.forEach(async (role) => {

          // 检查是否过期
          if (role.expiresAt < now) {
            console.log(`身份组 ${role.roleId} 已过期`);

            // 获取 Discord 服务器
            const guild = client.guilds.cache.get(tempRole.guildId);
            if (!guild) {
              console.log(`无法找到服务器: ${tempRole.guildId}`);
              return;
            }

            // 获取并删除身份组
            const discordRole = guild.roles.cache.get(role.roleId);
            if (discordRole) {
              try {
                await discordRole.delete('身份组已过期');
              } catch (roleError) {
                console.error(`删除身份组时出错: ${role.roleId}`, roleError);
              }
            }

            // 从数据库中删除该过期角色记录，若 roles 为空则删除整个 TemporaryRole 条目
            try {
              // 使用 MongoDB 的 $pull 操作从 roles 数组中移除过期角色
              await TemporaryRole.updateOne(
                { _id: tempRole._id },
                { $pull: { roles: { roleId: role.roleId } } }
              );
              console.log(`成功从数据库中移除过期角色: Role ID ${role.roleId}, User ID: ${tempRole.userId}`);

              // 再次查询该条记录，检查 roles 数组是否已为空
              const updatedTempRole = await TemporaryRole.findOne({ _id: tempRole._id });

              if (updatedTempRole && updatedTempRole.roles.length === 0) {
                // 如果 roles 数组为空，删除整个记录
                await TemporaryRole.deleteOne({ _id: tempRole._id });
                console.log(`由于 roles 数组为空，已删除整个 TemporaryRole 条目: User ID ${tempRole.userId}`);
              }

            } catch (dbError) {
              console.error(`从数据库删除记录时出错: ${role.roleId}`, dbError);
            }

            // 检查该身份组是否还存在于服务器
            const discordRoleExists = guild.roles.cache.get(role.roleId);
            if (!discordRoleExists) {
              console.log(`身份组 ${role.roleId} 已在服务器 ${tempRole.guildId} 中不存在，准备移除`);

              try {
                // 使用 MongoDB 的 $pull 操作从 roles 数组中移除无效身份组
                await TemporaryRole.updateOne(
                  { _id: tempRole._id },
                  { $pull: { roles: { roleId: role.roleId } } }
                );
                console.log(`成功移除了无效身份组: Role ID ${role.roleId}`);
              } catch (dbError) {
                console.error(`移除无效身份组时出错: ${role.roleId}`, dbError);
              }
            }
          }
        });
      });

    } catch (error) {
      console.error('角色清理任务中发生错误:', error);
    }
  }, 600000);  // 每隔10分钟运行一次
}

/**
 * 每隔 24 小时检测并清理数据库中无效的身份组 ID
 * 无效身份组：在对应的服务器中已不存在的身份组
 */
function checkInvalidRoleIdsTask() {
  // 每隔 24 小时（86400000 毫秒）执行一次
  setInterval(async () => {
    try {
      console.log("开始检测无效身份组 ID...");

      // 查询所有 TemporaryRole 记录
      const allRoles = await TemporaryRole.find({});
      allRoles.forEach(async (tempRole) => {
        tempRole.roles.forEach(async (role) => {

          // 检查该 roleId 是否存在于对应的 Discord 服务器
          const guild = client.guilds.cache.get(tempRole.guildId);
          if (!guild) {
            console.log(`无法找到服务器: ${tempRole.guildId}`);
            return;
          }

          const discordRole = guild.roles.cache.get(role.roleId);
          if (!discordRole) {
            console.log(`检测到无效身份组: Role ID ${role.roleId}，将在数据库中移除`);

            // 使用 MongoDB 的 $pull 操作从 roles 数组中移除无效的角色
            try {
              await TemporaryRole.updateOne(
                { _id: tempRole._id },
                { $pull: { roles: { roleId: role.roleId } } }
              );
              console.log(`成功移除无效身份组: Role ID ${role.roleId}, User ID: ${tempRole.userId}`);

            } catch (dbError) {
              console.error(`从数据库移除无效身份组时出错: ${role.roleId}`, dbError);
            }
          }
        });
      });

    } catch (error) {
      console.error('检测无效身份组 ID 时发生错误:', error);
    }
  }, 86430000);  // 每隔 24 小时运行一次，岔开时间
}

// 正则表达式：匹配 "You have bought [数量] [itemname]"，并支持 itemname 后的换行和其他字符
const purchaseRegex = /You have bought (\d+) ([\s\S]+?)(?=\s*!|\s*\n|$)/;

/**
 * 监听指定机器人的嵌入消息，并根据消息内容更新库存
 */
function monitorBotMessages() {
  client.on('messageCreate', async (message) => {
    try {
      // 检查是否来自指定机器人并且是在指定频道
      if (message.author.id === monitorBot && message.channel.id === monitorChannel) {

        let userInfo = null;

        // 检查是否为斜杠命令的回复
        if (message.interaction) {
          userInfo = message.interaction.user; // 获取触发命令的用户信息
        }

        // 检查是否有嵌入消息
        if (message.embeds.length > 0) {
          message.embeds.forEach(async (embed) => {
            // 检查描述是否存在
            if (embed.description) {

              // 使用正则表达式匹配嵌入消息中的库存使用记录
              const match = embed.description.match(purchaseRegex);
              if (match && userInfo) {
                const usedCount = parseInt(match[1], 10);  // 提取购买数量
                const itemName = match[2].trim();  // 提取物品名称，去除多余的空白字符

                // 验证物品名称是否存在于 ItemList
                const itemExists = await ItemList.findOne({ itemName });
                if (!itemExists) {
                  console.log(`物品 ${itemName} 不存在于数据库中，终止操作。`);
                  return;  // 如果物品不存在，终止后续操作
                }

                // 更新数据库中的库存
                await updateTemporaryRoleStock(userInfo.id, message.guild.id, itemName, usedCount);

                // 使用 message.channel.send() 向用户发送提示消息
                await message.channel.send({
                  content: `<@${userInfo.id}> 你购买了 ${usedCount} 个 ${itemName}，可以使用 /临时身份组 命令来使用它们！`
                });
              }
            }
          });
        }
      }
    } catch (error) {
      console.error('监控机器人的消息时发生错误:', error);
    }
  });
}

/**
 * 更新数据库中的库存数
 * @param {string} userId 用户的ID
 * @param {string} guildId 服务器的ID
 * @param {string} itemName 物品名称
 * @param {number} usedCount 增加的库存数量
 */
async function updateTemporaryRoleStock(userId, guildId, itemName, usedCount) {
  try {
    // 查找数据库中的记录
    const stockRecord = await TemporaryRoleStock.findOne({ userId, guildId });

    if (stockRecord) {
      // 查找是否已有对应的itemName条目
      const stockItem = stockRecord.stocks.find(stock => stock.itemName === itemName);

      if (stockItem) {
        // 如果条目存在，增加库存数
        stockItem.stockCount += usedCount;
      } else {
        // 如果条目不存在，新增该条目
        stockRecord.stocks.push({ itemName, stockCount: usedCount });
      }
      await stockRecord.save();
    } else {
      // 如果记录不存在，创建新记录
      await TemporaryRoleStock.create({
        userId,
        guildId,
        stocks: [{ itemName, stockCount: usedCount }],
      });
    }
  } catch (error) {
    console.error('更新临时身份组库存时发生错误:', error);
  }
}

module.exports = {
  startRoleCleanupTask,
  monitorBotMessages,
  checkInvalidRoleIdsTask,
};