"use strict";
if (!process.env.mongoURL) {
  return;
}
const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { Role } = require('discord.js');
const { TemporaryRoleStock, TemporaryRole, ItemList } = require('../modules/schema.js');

const gameName = function () {
  return "【身份组管理】";
};

const gameType = function () {
  return "Tool:role:骰娘爱你哦💖";
};

const getHelpMessage = function () {
  return `【道具管理】
注意: 此功能需求【编辑身份组】的权限，请确定授权。
.item list：列出当前道具及作用范围
.item edit [名称] [范围(d、h、m、s为单位的时间)]：创建或更新一个道具。例：.item edit 测试 1d
.item del [名称]：删除一个道具
    `;
};

const initialize = function () {
  return variables;
};

const prefixs = function () {
  return [
    {
      first: /^[.]item$/i,
      second: null,
    },
  ];
};

const rollDiceCommand = async function ({
  mainMsg,
}) {
  let rply = {
    default: "on",
    type: "text",
    text: "",
  };
  if (/^help$/i.test(mainMsg[1])) {
    rply.text = await this.getHelpMessage();
    rply.quotes = true;
    return rply;
  }

  if (/^list$/i.test(mainMsg[1])) {
    try {
      const items = await ItemList.find({});
      if (!items.length) {
        rply.text = "ItemList 中没有任何数据。";
      } else {
        items.forEach(item => {
          rply.text += `名称: ${item.itemName}, 范围: ${item.range}\n`;
        });
      }
    } catch (e) {
      console.error("查询 ItemList 失败:", e);
      rply.text = "查询失败，请稍后重试。";
    }
    return rply;
  }

  if (/^edit$/i.test(mainMsg[1])) {
    const itemName = mainMsg[2];  // 获取 name
    const itemRange = mainMsg[3]; // 获取 range

    if (!itemName) {
      rply.text = "请提供 item 的名称。";
      return rply;
    }

    // 检查 range 是否符合时间简写格式（h, m, s）
    if (!/^\d+[dhmsDHMS]$/.test(itemRange)) {
      rply.text = "请提供有效的范围时间（如：7d，1h, 30m, 15s）。";
      return rply;
    }

    try {
      // 查找该 itemName 是否已存在
      let item = await ItemList.findOne({ itemName });

      if (item) {
        // 更新已有的 range
        item.range = itemRange;
        await item.save();
        rply.text = `已更新 ${itemName} 的范围为 ${itemRange}。`;
      } else {
        // 新建一个 item
        const newItem = new ItemList({ itemName, range: itemRange });
        await newItem.save();
        rply.text = `已新增 ${itemName}，范围为 ${itemRange}。`;
      }
    } catch (e) {
      console.error("编辑/新增 Item 失败:", e);
      rply.text = "操作失败，请稍后重试。";
    }
    return rply;
  }

  // .item del [name]：删除 item
  if (/^del$/i.test(mainMsg[1])) {
    const itemName = mainMsg[2];  // 获取要删除的 name

    if (!itemName) {
      rply.text = "请提供要删除的 item 的名称。";
      return rply;
    }

    try {
      // 查找并删除对应的 item
      const result = await ItemList.findOneAndDelete({ itemName });

      if (result) {
        rply.text = `已删除 ${itemName} 及其对应的范围。`;
      } else {
        rply.text = `未找到名为 ${itemName} 的条目。`;
      }
    } catch (e) {
      console.error("删除 Item 失败:", e);
      rply.text = "删除失败，请稍后重试。";
    }
    return rply;
  }
};


// Helper function: 解析时间简写为秒数
function parseExpirationRange(range) {
  const timePattern = /^(\d+)([dhmsDHMS])$/;
  const match = range.match(timePattern);

  if (!match) return null;

  const value = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();

  switch (unit) {
    case 'd': return value * 24 * 60 * 60;
    case 'h': return value * 60 * 60;
    case 'm': return value * 60;
    case 's': return value;
    default: return null;
  }
}

// Discord 斜杠命令定义
const discordCommand = [
  {
    data: new SlashCommandBuilder()
      .setName('临时身份组')
      .setDescription('给自己添加一个临时身份组')
      .addStringOption(option =>
        option.setName('item')
          .setDescription('选择物品')
          .setRequired(true)
          .setAutocomplete(true))
      .addStringOption(option =>
        option.setName('role_name')
          .setDescription('要添加的身份组名称')
          .setRequired(true))
      .addStringOption(option =>
        option.setName('color')
          .setDescription('要添加的身份组颜色（Hex格式，如：#FF5733）')
          .setRequired(true))
      .addStringOption(option =>
        option.setName('icon')
          .setDescription('要为身份组设置的图标（可选，标准 Emoji 或自定义表情）')
          .setRequired(false)),

    async execute(interaction) {
      try {
        // 获取斜杠命令的参数
        const roleName = interaction.options.getString('role_name');
        const roleColor = interaction.options.getString('color');
        const iconInput = interaction.options.getString('icon');
        const itemName = interaction.options.getString('item');
        const userId = interaction.user.id;
        const guildId = interaction.guild.id;

        console.log(`Received command with parameters: role_name=${roleName}, color=${roleColor}, item=${itemName}, icon=${iconInput}`);

        await interaction.deferReply({ ephemeral: true });
        console.log("Reply deferred, now processing...");

        // 查询物品列表
        const item = await ItemList.findOne({ itemName });
        if (!item) {
          console.log(`Item not found: ${itemName}`);
          await interaction.editReply({ content: '选择的物品不存在。' });
          return;
        }
        console.log(`Found item: ${itemName}, with range: ${item.range}`);

        // 解析物品中的 range 为秒数
        const expirationDuration = parseExpirationRange(item.range);
        if (!expirationDuration) {
          console.log(`Invalid range format for item: ${itemName}`);
          await interaction.editReply({ content: '该物品的范围格式不正确。' });
          return;
        }
        console.log(`Parsed expiration duration: ${expirationDuration} seconds`);

        // 查询用户的库存
        const stockRecord = await TemporaryRoleStock.findOne({
          userId,
          guildId,
          'stocks.itemName': itemName
        });

        if (!stockRecord || !stockRecord.stocks || stockRecord.stocks.length === 0) {
          console.log(`No stock found for user: ${userId}, guild: ${guildId}`);
          await interaction.editReply({ content: '你没有足够的库存。' });
          return;
        }

        const stockItem = stockRecord.stocks.find(stock => stock.itemName === itemName);
        if (!stockItem || stockItem.stockCount <= 0) {
          console.log(`Not enough stock for item: ${itemName}`);
          await interaction.editReply({ content: `你没有足够的 ${itemName} 库存。` });
          return;
        }
        console.log(`Stock available for item: ${itemName}, count: ${stockItem.stockCount}`);

        // 解析图标
        let parsedIcon = null;
        if (iconInput) {
          parsedIcon = parseIcon(iconInput);
          if (!parsedIcon) {
            console.log(`Invalid icon input: ${iconInput}`);
            await interaction.editReply({ content: '无效的图标，请输入标准 Emoji 或自定义表情。' });
            return;
          }
        }
        console.log(`Parsed icon: ${parsedIcon}`);

        // 添加身份组
        const role = await addRoleToUser(interaction.guild, interaction.member, roleName, roleColor, parsedIcon);
        console.log(`Role added: ${roleName} with id: ${role.id}`);

        // 设置身份组的过期时间
        const expirationDate = new Date();
        expirationDate.setSeconds(expirationDate.getSeconds() + expirationDuration);
        console.log(`Role expiration date set to: ${expirationDate}`);

        // 更新 TemporaryRole 数据库
        await TemporaryRole.updateOne(
          { userId, guildId },
          {
            $push: {
              roles: {
                itemName,
                roleId: role.id,
                expiresAt: expirationDate,
              }
            }
          },
          { upsert: true }
        );
        console.log(`Temporary role record updated for user: ${userId}`);

        // 确保身份组在机器人的身份组下方
        await moveRoleBelowBot(role, interaction.guild, interaction.guild.members.me);
        console.log(`Role moved below bot role: ${roleName}`);

        const formattedExpiration = expirationDate.toLocaleString();

        // 回复用户
        await interaction.editReply({
          content: `成功为你添加了身份组：${roleName}，颜色：${roleColor}，物品：${itemName}，图标：${parsedIcon}，过期时间：${formattedExpiration}。剩余库存：${stockItem.stockCount - 1}`,
        });
        console.log(`Reply sent to user with success message`);

        // 更新库存
        stockItem.stockCount -= 1;
        await stockRecord.save();
        console.log(`Stock updated for item: ${itemName}, new count: ${stockItem.stockCount}`);

      } catch (error) {
        console.error('Error in addrole command:', error);
        if (interaction.replied || interaction.deferred) {
          await interaction.editReply({ content: '添加身份组时出错，请稍后再试。' });
        } else {
          await interaction.reply({ content: '添加身份组时出错，请稍后再试。', ephemeral: true });
        }
      }
    },
  }
];

// 工具 - 解析图标
function parseIcon(input) {
  // 匹配标准 Emoji 或自定义表情
  const customEmojiRegex = /^<:\w+:\d+>$/; // 匹配自定义表情格式 <name:id>

  if (customEmojiRegex.test(input)) {
    return input;  // 输入是自定义表情
  }

  // 使用 Discord.js 内置的 Emoji 检查
  if (/^[\u{1F600}-\u{1F64F}]$/u.test(input)) {
    return input;  // 输入是标准 Emoji
  }

  return null;  // 如果输入既不是标准 Emoji 也不是自定义表情，则返回 null
}

/**
 * 将临时身份组移动到机器人身份组下面
 * @param {Role} role - 要移动的角色
 * @param {Guild} guild - 服务器对象
 * @param {GuildMember} botMember - 机器人的成员对象
 */
async function moveRoleBelowBot(role, guild, botMember) {
  try {
    // 获取机器人最高身份组的位置
    const botRole = botMember.roles.highest;
    const botRolePosition = botRole.position;

    // 检查机器人是否有权限移动身份组
    if (!botMember.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      console.log('机器人没有 "管理身份组" 权限');
      throw new Error('机器人没有 "管理身份组" 权限');
    }

    // 将临时身份组移动到机器人身份组下面
    await role.setPosition(botRolePosition - 1);
  } catch (error) {
    console.error('将身份组移动到机器人身份组下面时发生错误:', error);
    throw error; // 继续抛出错误以便上层捕获处理
  }
}

/**
 * 创建一个角色并添加给指定用户
 * @param {Guild} guild - 服务器对象
 * @param {GuildMember} member - 用户对象
 * @param {String} roleName - 角色名称
 * @param {String} roleColor - 角色颜色
 * @param {String|null} icon - 角色图标（标准 Emoji 或自定义表情）
 * @returns {Role} - 创建的角色对象
 */
async function addRoleToUser(guild, member, roleName, roleColor, icon = null) {
  try {
    // 创建角色的选项对象
    const roleOptions = {
      name: roleName,
      color: roleColor,
      permissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel],
      reason: `用户 ${member.user.username} 创建了一个临时身份组`,
    };

    // 如果存在图标，判断是标准 Emoji 还是自定义表情
    if (icon) {
      // 自定义表情格式通常是 `<:name:id>`，需要将其转换为 Discord 的图片 URL
      const customEmojiRegex = /^<:\w+:(\d+)>$/;
      const emojiMatch = icon.match(customEmojiRegex);

      if (emojiMatch) {
        // 如果是自定义表情，提取表情 ID 并从缓存中获取表情对象
        const emojiId = emojiMatch[1];
        const emoji = guild.emojis.cache.get(emojiId);

        if (emoji) {
          // 判断表情是否为动画表情，并设置相应的 URL 扩展名
          const emojiUrl = emoji.animated
            ? `https://cdn.discordapp.com/emojis/${emojiId}.gif`
            : `https://cdn.discordapp.com/emojis/${emojiId}.png`;

          roleOptions.icon = emojiUrl;
        } else {
          throw new Error('无法找到自定义表情对象');
        }
      } else {
        // 如果是标准 Emoji，直接使用
        roleOptions.unicodeEmoji = icon;
      }
    }

    // 在服务器中创建一个新角色
    const role = await guild.roles.create(roleOptions);

    // 将该角色添加给用户
    await member.roles.add(role);

    return role;
  } catch (error) {
    console.error('Error creating or adding role:', error);
    throw new Error('无法创建或添加身份组');
  }
}

module.exports = {
  rollDiceCommand: rollDiceCommand,
  initialize: initialize,
  prefixs: prefixs,
  discordCommand: discordCommand,
  getHelpMessage: getHelpMessage,
  gameType: gameType,
  gameName: gameName,
};