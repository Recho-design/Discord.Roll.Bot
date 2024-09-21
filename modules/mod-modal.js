const schema = require('./schema');
const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
/**
 * 处理创建角色模态框提交的逻辑
 * @param {ModalSubmitInteraction} interaction
 */
//总处理
async function handleModalInteraction(interaction) {
  // 根据 customId 判断触发哪种模态框操作
  switch (interaction.customId) {
    case "createRoleModal":
      await handleCreateRoleModal(interaction); // 处理创建角色的模态框
      break;
    case "editCharacter":
      await handleEditCharacterModal(interaction); // 处理编辑角色的模态框
      break;
    default:
      console.error(`未知的模态框 customId: ${interaction.customId}`);
      await interaction.reply({
        content: "发生了未知的错误，请稍后再试。",
        ephemeral: true,
      });
  }
}

async function handleCreateRoleModal(interaction) {
  try {
    let roleName = interaction.fields.getTextInputValue("roleName").trim();
    let roleAttributes = interaction.fields.getTextInputValue("roleAttributes").trim();
    let roleDice = interaction.fields.getTextInputValue("roleDice").trim();
    const remark = interaction.fields.getTextInputValue("remark").trim();

    roleAttributes = roleAttributes.replace(/\n/g, ";");
    roleDice = roleDice.replace(/\n/g, ";");
    const remarks = remark.replace(/\n/g, ";");

    const stateArray = roleAttributes.split(";").map((attr) => {
      const [name, itemA, itemB] = attr.split(":").map((str) => str.trim());
      return { name, itemA, itemB };
    });

    const rollArray = roleDice.split(";").map((dice) => {
      const [name, itemA] = dice.split(":").map((str) => str.trim());
      return { name, itemA };
    });

    const notesArray = remarks.split(";").map((note) => {
      const [name, itemA] = note.split(":").map((str) => str.trim());
      return { name, itemA };
    });

    const card = {
      id: interaction.user.id,
      name: roleName,
      state: stateArray,
      roll: rollArray,
      notes: notesArray,
    };

    // 修改这里，直接传递正则表达式
    const filter = {
      id: interaction.user.id,
      name: new RegExp(roleName, "i"),  // 直接传递正则表达式
    };

    const existingCard = await schema.characterCard.findOne(filter);

    if (existingCard) {
      await interaction.reply({
        content: `已存在同名角色卡："${roleName}"`,
        ephemeral: true,
      });
      return;
    }

    await schema.characterCard.create(card);

    await interaction.reply({
      content: `角色卡 "${roleName}" 已成功创建！`,
    });
  } catch (error) {
    console.error("新增角色卡失败: ", error);
    await interaction.reply({
      content: `新增角色卡失败，因为: ${error.message}`,
      ephemeral: true,
    });
  }
}

/**
 * 构建编辑角色的模态框
 * @param {Object} character 角色信息对象
 * @returns {ModalBuilder} 返回构建好的模态框
 */
function buildEditCharacterModal(character) {
  const modal = new ModalBuilder()
    .setCustomId("editCharacter")
    .setTitle("修改角色信息");

  const roleNameInput = new TextInputBuilder()
    .setCustomId("roleName")
    .setLabel("角色名称")
    .setPlaceholder("请输入角色名称")
    .setStyle(TextInputStyle.Short)
    .setValue(character.name)
    .setRequired(true);

  const roleAttributesInput = new TextInputBuilder()
    .setCustomId("roleAttributes")
    .setLabel("角色属性")
    .setPlaceholder(
      "请输入角色属性，多个属性之间用换行隔开。示例：\nHP: 5/5\nMP: 3/3\nSAN: 50/90"
    )
    .setStyle(TextInputStyle.Paragraph)
    .setValue(
      character.state
        ?.map((attr) =>
          attr.itemA ? `${attr.name}:${attr.itemA}` : attr.name
        )
        .join("\n") || ""
    )
    .setRequired(false);

  const roleDiceInput = new TextInputBuilder()
    .setCustomId("roleDice")
    .setLabel("角色骰点")
    .setPlaceholder(
      "请输入角色将会用于骰点的属性，多个属性之间用换行隔开，变量放在大括号中。示例：\n投掷: cc 80\nSC: cc {SAN}"
    )
    .setStyle(TextInputStyle.Paragraph)
    .setValue(
      character.roll
        ?.map((dice) =>
          dice.itemA ? `${dice.name}:${dice.itemA}` : dice.name
        )
        .join("\n") || ""
    )
    .setRequired(false);

  const remarkInput = new TextInputBuilder()
    .setCustomId("remark")
    .setLabel("备注")
    .setPlaceholder("请填写其他备注信息，多个备注之间用换行隔开")
    .setStyle(TextInputStyle.Paragraph)
    .setValue(
      character.notes
        ?.map((note) =>
          note.itemA ? `${note.name}:${note.itemA}` : note.name
        )
        .join("\n") || ""
    )
    .setRequired(false);

  // 将所有输入框组件放入模态框的 action rows 中
  const actionRow1 = new ActionRowBuilder().addComponents(roleNameInput);
  const actionRow2 = new ActionRowBuilder().addComponents(roleAttributesInput);
  const actionRow3 = new ActionRowBuilder().addComponents(roleDiceInput);
  const actionRow4 = new ActionRowBuilder().addComponents(remarkInput);

  modal.addComponents(actionRow1, actionRow2, actionRow3, actionRow4);

  return modal;
}

/**
 * 处理编辑角色的模态框提交
 * @param {ModalSubmitInteraction} interaction Discord 交互对象
 */
async function handleEditCharacterModal(interaction) {
  try {
    const userId = interaction.user.id; // 获取用户ID
    const newName = interaction.fields.getTextInputValue("roleName").trim(); // 获取角色名称

    // 获取其他表单中的值
    let roleAttributes = interaction.fields.getTextInputValue("roleAttributes").trim();
    let roleDice = interaction.fields.getTextInputValue("roleDice").trim();
    let remark = interaction.fields.getTextInputValue("remark").trim();

    // 将换行符替换为分隔符
    roleAttributes = roleAttributes.replace(/\n/g, ";");
    roleDice = roleDice.replace(/\n/g, ";");
    const remarks = remark.replace(/\n/g, ";");

    // 解析角色属性，将其转换为对象数组
    const stateArray = roleAttributes.split(";").map((attr) => {
      const [name, itemA] = attr.split(":").map((str) => str.trim());
      return { name, itemA: itemA || "" };
    });

    // 解析骰点，将其转换为对象数组
    const rollArray = roleDice.split(";").map((dice) => {
      const [name, itemA] = dice.split(":").map((str) => str.trim());
      return { name, itemA: itemA || "" };
    });

    // 解析备注，将其转换为对象数组
    const notesArray = remarks.split(";").map((note) => {
      const [name, itemA] = note.split(":").map((str) => str.trim());
      return { name, itemA: itemA || "" };
    });

    // 查找是否有相同名称的角色
    const filter = { id: userId, name: newName };
    const existingCharacter = await schema.characterCard.findOne(filter);

    if (existingCharacter) {
      // 如果有，更新数据
      await schema.characterCard.updateOne(filter, {
        $set: {
          state: stateArray,
          roll: rollArray,
          notes: notesArray,
        },
      });

      await interaction.reply({
        content: `角色 "${newName}" 已更新！`,
        ephemeral: false,
      });
    } else {
      // 如果没有，创建新角色
      const newCharacter = new schema.characterCard({
        id: userId,
        name: newName,
        state: stateArray,
        roll: rollArray,
        notes: notesArray,
      });

      await newCharacter.save();

      await interaction.reply({
        content: `新的角色 "${newName}" 已创建！`,
        ephemeral: false,
      });
    }
  } catch (error) {
    // 捕获错误并回复给用户
    console.error("处理角色卡出错: ", error);
    await interaction.reply({
      content: `处理角色卡失败\n因为 ${error.message}`,
      ephemeral: false,
    });
  }
}

module.exports = {
  handleModalInteraction,
  buildEditCharacterModal
};



