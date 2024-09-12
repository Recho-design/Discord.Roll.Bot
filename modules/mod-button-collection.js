// 控制按钮合集
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// 定义翻页按钮的合集
const createPaginationButtons = (disableAll = false, currentPage = 0, totalPages = 1) => {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('first_page')
      .setEmoji('⏮️') // 第一页
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(disableAll || currentPage === 0),
    new ButtonBuilder()
      .setCustomId('previous_page')
      .setEmoji('⏪') // 上一页
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(disableAll || currentPage === 0),
    new ButtonBuilder()
      .setCustomId('next_page')
      .setEmoji('⏩') // 下一页
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(disableAll || currentPage === totalPages - 1),
    new ButtonBuilder()
      .setCustomId('last_page')
      .setEmoji('⏭️') // 最后一页
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(disableAll || currentPage === totalPages - 1),
    new ButtonBuilder()
      .setCustomId('stop')
      .setEmoji('⏹️') // 停止操作
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(disableAll) // 停止按钮不受页码影响
  );
};

// 定义提交和取消按钮的合集
const createActionButtons = (disableAll = false) => {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('submit')
      .setLabel('提交') // 提交按钮
      .setStyle(ButtonStyle.Success)
      .setDisabled(disableAll),
    new ButtonBuilder()
      .setCustomId('cancel')
      .setLabel('取消') // 取消按钮
      .setStyle(ButtonStyle.Danger)
      .setDisabled(disableAll)
  );
};

// 定义过滤不需要更新消息的按钮
const isControlButton = (customId) => {
  const controlButtons = ['first_page', 'previous_page', 'next_page', 'last_page', 'stop', 'submit', 'cancel'];
  return controlButtons.includes(customId);
};

// 导出这些函数供其他模块使用
module.exports = {
  createPaginationButtons,
  createActionButtons,
  isControlButton,
};