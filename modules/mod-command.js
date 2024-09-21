const { handlingCommand } = require('./mod-text-commands');
const { handlingResponMessage, replilyMessage } = require('./handlers-message-response');

/**
 * 处理命令事件的函数
 * @param {Interaction} message Discord交互对象
 */

async function handleCommandInteraction(interaction) {
    try {
      // 调用命令处理函数
      const answer = await handlingCommand(interaction);
      if (!answer) return; // 如果没有返回结果，则不做任何操作
  
      // 获取处理结果并发送回复
      const result = await handlingResponMessage(interaction, answer);
      return replilyMessage(interaction, result); // 发送消息回复
    } catch (error) {
      console.error("Error in interaction handling:", error);
    }
  }

module.exports = {
  handleCommandInteraction,
};