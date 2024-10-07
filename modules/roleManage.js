// 引入数据库的Schema
const { TemporaryRole,TemporaryRoleStock } = require('./schema.js');
const { client, shardid } = require('./client.js');

const monitorBot = process.env.MONITORBOT || "292953664492929025";
const monitorChannel = process.env.MONITOR_CHANNEL; 

function startRoleCleanupTask(client) {

  // 每隔20秒检查一次过期身份组
  setInterval(async () => {
    try {
      const now = new Date();
      console.log(`[${now.toLocaleString()}] 正在检查过期身份组...`);

      // 查询所有过期的身份组
      const expiredRoles = await TemporaryRole.find({ expiresAt: { $lt: now } });
      console.log(`[${now.toLocaleString()}] 已找到 ${expiredRoles.length} 个过期身份组`);

      if (expiredRoles.length === 0) {
        console.log('没有找到任何过期的身份组');
        return;
      }

      for (const roleRecord of expiredRoles) {
        console.log(`正在处理过期身份组: Role ID ${roleRecord.roleId}, User ID: ${roleRecord.userId}`);

        const guild = client.guilds.cache.get(roleRecord.guildId);
        if (!guild) {
          console.log(`找不到服务器: ${roleRecord.guildId}`);
          continue;
        }

        const role = guild.roles.cache.get(roleRecord.roleId);
        if (role) {
          await role.delete('身份组已过期');
          console.log(`成功删除身份组: ${role.name} (ID: ${role.id})`);
        } else {
          console.log(`找不到身份组: ${roleRecord.roleId} (服务器: ${guild.name})`);
        }

        // 从数据库中删除记录
        await TemporaryRole.findByIdAndDelete(roleRecord._id);
        console.log(`成功从数据库删除记录: Role ID ${roleRecord.roleId}, User ID: ${roleRecord.userId}`);
      }

    } catch (error) {
      console.error('Error in role cleanup:', error);
    }
  }, 20000); // 每20秒运行一次
}

// 正则表达式匹配临时身份组使用记录
const tempRoleRegex = /You have used (\d+) 临时身份组（20s版）!/;

// 监听特定机器人的消息并同时监听指定频道
function monitorBotMessages() {
  client.on('messageCreate', async (message) => {
    try {
      // 检查是否来自指定机器人并且是在指定频道
      if (message.author.id === monitorBot && message.channel.id === monitorChannel) {

        let userInfo = null;

        // 检查是否为斜杠命令的回复
        if (message.interaction) {
          userInfo = message.interaction.user; // 获取触发命令的用户信息
          console.log(`[${new Date().toLocaleString()}] 机器人在指定频道中回复了用户: ${userInfo.tag} (ID: ${userInfo.id})`);
        }

        // 检查是否有嵌入消息
        if (message.embeds.length > 0) {
          message.embeds.forEach(async (embed) => {
            // 检查描述是否存在
            if (embed.description) {
              console.log(`[${new Date().toLocaleString()}] 分析嵌入消息描述: ${embed.description}`);

              // 使用正则表达式匹配描述中的库存使用记录
              const match = embed.description.match(tempRoleRegex);
              if (match && userInfo) {
                const usedCount = parseInt(match[1], 10); // 提取使用数量
                console.log(`检测到使用了 ${usedCount} 个临时身份组`);

                // 更新数据库中的库存
                await updateTemporaryRoleStock(userInfo.id, message.guild.id, usedCount);
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

// 更新数据库中的库存数
async function updateTemporaryRoleStock(userId, guildId, usedCount) {
  try {
    // 查找数据库中的记录
    const stockRecord = await TemporaryRoleStock.findOne({ userId, guildId });

    if (stockRecord) {
      // 如果记录存在，增加库存数
      stockRecord.stockCount += usedCount;
      await stockRecord.save();
      console.log(`库存已更新: 用户ID ${userId}, 服务器ID ${guildId}, 当前库存数: ${stockRecord.stockCount}`);
    } else {
      // 如果记录不存在，创建新记录
      await TemporaryRoleStock.create({
        userId,
        guildId,
        stockCount: usedCount,
      });
      console.log(`创建新库存记录: 用户ID ${userId}, 服务器ID ${guildId}, 当前库存数: ${usedCount}`);
    }
  } catch (error) {
    console.error('更新临时身份组库存时发生错误:', error);
  }
}


module.exports = {
  startRoleCleanupTask,
  monitorBotMessages
};

