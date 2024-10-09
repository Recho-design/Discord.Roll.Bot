const { handlingCommand } = require('./mod-text-commands');
const { handlingResponMessage, handlingSendMessage, replilyMessage } = require('./handlers-message-response');

const { isControlButton } = require('./mod-button-collection');

const schema = require('./schema');

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
      case message.isAutocomplete(): {  
        return await handleAutocompleteInteraction(message);
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

async function handleButtonInteraction(interaction) {
  //删除角色卡
  if (interaction.customId === "confirmDelete") {
    await handleConfirmDelete(interaction);
    return;
  }
}

/**
 * 处理确认删除按钮的交互
 * @param {Interaction} interaction Discord 交互对象
 */
async function handleConfirmDelete(interaction) {
  try {
    await interaction.deferUpdate(); // 延迟更新以避免超时

    // 获取用户之前选择的角色（这些角色已经在选择菜单中选择）
    const selectedCharacterNames = interaction.message.content
      .match(/(?<=选择了以下角色：).*/)[0]
      .split(", ");

    const userId = interaction.user.id;

    // 执行删除操作
    for (const characterName of selectedCharacterNames) {
      await schema.characterCard.deleteOne({
        id: userId,
        name: characterName,
      });
    }

    // 成功删除后，更新消息，禁用按钮和选择菜单
    await interaction.editReply({
      content: `成功删除角色: ${selectedCharacterNames.join(", ")}`,
      components: [], // 禁用按钮和选择菜单
    });
  } catch (error) {
    console.error(`删除角色时发生错误: ${error.message}`);
    try {
      await interaction.editReply({
        content: "删除角色时发生错误，请稍后再试。",
        components: [],
      });
    } catch (editError) {
      console.error(`更新交互消息时发生错误: ${editError.message}`);
    }
  }
}

/**
 * 处理自动补全事件的函数
 * @param {CommandInteraction} interaction - Discord interaction 对象，自动补全的请求
 */
async function handleAutocompleteInteraction(interaction) {
  try {
    // 获取用户输入的部分内容
    const focusedValue = interaction.options.getFocused();

    // 查询数据库中的 itemName，支持模糊匹配
    const itemList = await schema.ItemList.find({
      itemName: { $regex: new RegExp(focusedValue, 'i') }  // 使用正则表达式进行模糊匹配
    }).limit(25);  // 限制返回25个结果

    // 将结果映射为自动补全选项
    const choices = itemList.map(item => ({
      name: item.itemName,  // 选项的显示名称
      value: item.itemName  // 选项的值
    }));

    // 返回选项给 Discord，显示在自动补全列表中
    await interaction.respond(choices);

  } catch (error) {
    console.error('处理自动补全时发生错误:', error);
  }
}