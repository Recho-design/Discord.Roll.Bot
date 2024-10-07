"use strict";
if (!process.env.mongoURL) {
  return;
}
const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { Role } = require('discord.js'); 
const { TemporaryRoleStock, TemporaryRole } = require('../modules/schema.js'); 

const gameName = function () {
  return "【身份组管理】";
};

const gameType = function () {
  return "Tool:role:骰娘爱你哦💖";
};

const getHelpMessage = function () {
  return `【身份组管理】

注意: 此功能需求【编辑身份组】的权限，请确定授权。

    `;
};

const discordCommand = [
  {
    data: new SlashCommandBuilder()
      .setName('addrole')
      .setDescription('给自己添加一个临时身份组')
      .addStringOption(option =>
        option.setName('role_name')
          .setDescription('要添加的身份组名称')
          .setRequired(true))
      .addStringOption(option =>
        option.setName('color')
          .setDescription('要添加的身份组颜色（Hex格式，如：#FF5733）')
          .setRequired(true)),

    async execute(interaction) {
      try {
        const roleName = interaction.options.getString('role_name');
        const roleColor = interaction.options.getString('color');
        const userId = interaction.user.id;
        const guildId = interaction.guild.id;

        // 延迟交互响应，告诉Discord稍后会回复
        await interaction.deferReply({ ephemeral: true });

        // 首先检查用户库存
        const stockRecord = await TemporaryRoleStock.findOne({ userId, guildId });

        if (!stockRecord || stockRecord.stockCount <= 0) {
          await interaction.editReply({
            content: '你没有足够的临时身份组库存。',
          });
          return;
        }

        // 调用工具函数，为用户创建角色并添加
        const role = await addRoleToUser(interaction.guild, interaction.member, roleName, roleColor);

        // 将角色信息存入数据库，包含过期时间
        const expirationDate = new Date();
        expirationDate.setSeconds(expirationDate.getSeconds() + 20); // 设置角色20秒的过期时间

        await TemporaryRole.create({
          userId,
          roleId: role.id,
          guildId,
          expiresAt: expirationDate,
        });

        // 减少库存
        stockRecord.stockCount -= 1;
        await stockRecord.save();

        // 将身份组移动到最前面
        await moveRoleToTop(role, interaction.guild);

        // 格式化过期时间为字符串，方便展示
        const formattedExpiration = expirationDate.toLocaleString(); // 使用Locale时间格式化

        // 任务完成后，通过editReply发送最终的回复，包含过期时间
        await interaction.editReply({
          content: `成功为你添加了身份组：${roleName}，颜色：${roleColor}，过期时间：${formattedExpiration}。剩余库存：${stockRecord.stockCount}`,
        });
      } catch (error) {
        console.error('Error in addrole command:', error);
        // 错误处理时，确保只回复一次
        if (interaction.replied || interaction.deferred) {
          await interaction.editReply({ content: '添加身份组时出错，请稍后再试。' });
        } else {
          await interaction.reply({ content: '添加身份组时出错，请稍后再试。', ephemeral: true });
        }
      }
    }
  }
];

/**
 * 将身份组移动到服务器角色列表的最前面
 * @param {Role} role - 要移动的角色
 * @param {Guild} guild - 服务器对象
 */
async function moveRoleToTop(role, guild) {
  try {
    // 获取当前服务器所有的身份组
    const roles = guild.roles.cache;

    // 找到所有比当前身份组位置更高的身份组
    const highestPosition = roles.reduce((highest, r) => {
      return r.position > highest ? r.position : highest;
    }, 0);

    // 将临时身份组移动到最高位置
    await role.setPosition(highestPosition + 1);
    console.log(`角色 ${role.name} 已成功移动到服务器角色列表最前面`);
  } catch (error) {
    console.error('移动身份组到服务器最前面时发生错误:', error);
  }
}

/**
 * 创建一个角色并添加给指定用户
 * @param {Guild} guild - 服务器对象
 * @param {GuildMember} member - 用户对象
 * @param {String} roleName - 角色名称
 * @param {String} roleColor - 角色颜色
 * @returns {Role} - 创建的角色对象
 */
async function addRoleToUser(guild, member, roleName, roleColor) {
  try {
    // 在服务器中创建一个新角色
    const role = await guild.roles.create({
      name: roleName,
      color: roleColor,
      permissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel],
      reason: `用户 ${member.user.username} 创建了一个临时身份组`,
    });

    // 将该角色添加给用户
    await member.roles.add(role);

    return role;
  } catch (error) {
    console.error('Error creating or adding role:', error);
    throw new Error('无法创建或添加身份组');
  }
}

module.exports = {
  discordCommand: discordCommand,
  getHelpMessage: getHelpMessage,
  gameType: gameType,
  gameName: gameName,
};


