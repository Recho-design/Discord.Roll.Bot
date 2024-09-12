const { handlingCommand } = require('./mod-text-commands');
const { handlingResponMessage, handlingSendMessage, replilyMessage } = require('./handlers-message-response');

const { isControlButton } = require('./mod-button-collection');

const convertRegex = function (str = "") {
  return new RegExp(str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"));
};

/**
 * 处理interactionCreate事件的函数
 * @param {Interaction} message Discord交互对象
 */
//总
async function handlingInteractionMessage(message) {
  try {
    switch (true) {
      case message.isCommand(): {
        const answer = await handlingCommand(message);
        if (!answer) return;
        const result = await handlingResponMessage(message, answer);
        return replilyMessage(message, result);
      }

      case message.isButton(): {
        return await handleButtonInteraction(message);
      }

      default:
        break;
    }
  } catch (error) {
    console.error("Error in interaction handling:", error);
  }
}

module.exports = {
  handlingInteractionMessage,
};



// 处理按钮交互的函数
async function handleButtonInteraction(message) {
  const answer = handlingButtonCommand(message);
  const result = await handlingResponMessage(message, answer);

  const messageContent = message.message.content;
  const displayname = message.member && message.member.id ? `<@${message.member.id}>\n` : "";
  const resultText = (result && result.text) || "";

  if (isControlButton(message.component.customId)) {
    // 查找并禁用旧的按钮
    await disableOldButtons(message);
    return; // 不更新消息，直接返回
  }

  try {
    // 处理 "的角色卡" 的情况
    if (/的角色卡$/.test(messageContent)) {
      if (resultText) {
        return await message.reply({
          content: `${displayname}${messageContent.replace(/的角色卡$/, "")}進行掷骰 \n${resultText}`,
          ephemeral: false,
        });
      } else {
        return await message.reply({
          content: `${displayname}沒有反應，請檢查按鈕內容`,
          ephemeral: true,
        });
      }
    }

    // 处理 "的角色" 的情况
    if (/的角色$/.test(messageContent)) {
      return await message.reply({
        content: `${displayname}${resultText}`,
        ephemeral: false,
      });
    }

    // 如果有结果文本，更新消息
    if (resultText) {
      const content = handlingCountButton(message, "roll");
      handlingSendMessage(result);
      return await message.update({ content: content });
    } else {
      const content = handlingCountButton(message, "count");
      return await message.update({ content: content });
    }
  } catch (error) {
    console.error("Error while handling button interaction:", error);
  }
}

function handlingButtonCommand(message) {
  return message.component.label || "";
}

function handlingCountButton(message, mode) {
  const modeString = mode === "roll" ? "投掷" : "点击";
  const content = message.message.content;
  if (!/点击了「|投掷了「|要求掷骰\/点击/.test(content)) return;
  const user = `${message.member?.nickname || message.user.displayName}(${message.user.username})`;
  const button = `${modeString}了「${message.component.label}」`;
  const regexpButton = convertRegex(`${button}`);
  let newContent = content;
  if (newContent.match(/要求掷骰\/点击/)) newContent = "";
  if (newContent.match(regexpButton)) {
    let checkRepeat = checkRepeatName(content, button, user);
    if (!checkRepeat)
      newContent = newContent.replace(regexpButton, `、${user} ${button}`);
  } else {
    newContent += `\n${user} ${button}`;
  }
  return newContent.slice(0, 1000);
}

function checkRepeatName(content, button, user) {
  let flag = false;
  const everylines = content.split(/\n/);
  for (const line of everylines) {
    if (line.match(convertRegex(button))) {
      let splitNames = line.split("、");
      for (const name of splitNames) {
        if (
          name.match(convertRegex(user)) ||
          name.match(convertRegex(`${user} ${button}`))
        ) {
          flag = true;
        }
      }
    }
  }
  return flag;
}

// 禁用旧消息中的相同 customId 按钮
async function disableOldButtons(message) {
  try {
    const channel = message.channel; // 获取当前消息的频道
    const customId = message.component.customId; // 获取当前按钮的 customId

    // 获取最新的 50 条消息（可以根据需要调整）
    const messages = await channel.messages.fetch({ limit: 50 });

    // 遍历所有消息，找到带有相同 customId 的按钮
    for (const [, msg] of messages) {
      if (msg.components.length > 0) {
        let updated = false;
        const updatedComponents = msg.components.map((row) => {
          const updatedRow = row.components.map((component) => {
            if (component.customId === customId && !component.disabled) {
              updated = true;
              return { ...component, disabled: true }; // 禁用按钮
            }
            return component;
          });
          return { ...row, components: updatedRow };
        });

        // 如果有按钮被禁用，更新消息
        if (updated) {
          await msg.edit({ components: updatedComponents });
          console.log(`Disabled buttons in message ID: ${msg.id}`);
        }
      }
    }
  } catch (error) {
    console.error("Failed to disable old buttons:", error);
  }
}