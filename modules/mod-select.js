const schema = require('./schema');
const { buildEditCharacterModal } = require('./mod-modal');

/**
 * 处理选择菜单的交互事件
 * @param {Interaction} interaction Discord 交互对象
 */
async function handleSelectMenuInteraction(interaction) {
  try {
    switch (interaction.customId) {
      case 'selectCharacter':

        const selectedCharacterId = interaction.values[0];
        interaction.customData = { selectedCharacterId };

        // 查询数据库中的角色信息
        const character = await schema.characterCard.findById(selectedCharacterId);

        if (!character) {
          return interaction.reply({
            content: "未找到该角色，请重新尝试。",
            ephemeral: true,
          });
        }

        const modal = buildEditCharacterModal(character);

        await interaction.showModal(modal);

        break;

      case 'deleteCharacter':
        await handleDeleteCharacter(interaction); // 调用删除角色的处理函数
        break;

      default:
        console.error(`未知的选择菜单 customId: ${interaction.customId}`);
        await interaction.reply({
          content: "发生了未知的错误，请稍后再试。",
          ephemeral: true,
        });
        break;
    }
  } catch (error) {
    console.error(`处理选择菜单时发生错误: ${error.message}`);
  }
}

/**
 * 处理修改角色的选择菜单交互
 */
async function handleEditCharacter(interaction) {
  try {
    const selectedCharacterId = interaction.values[0]; // 获取用户选择的角色ID

    // 查询数据库中的角色信息
    const character = await schema.characterCard.findById(selectedCharacterId);

    if (!character) {
      return interaction.update({
        content: "未找到该角色，请重新尝试。",
        components: [],
      });
    }

    // 获取角色的相关信息
    const roleName = character.name;
    const roleAttributes =
      character.state
        ?.map((attr) =>
          attr.itemA ? `${attr.name}:${attr.itemA}` : attr.name
        )
        .join("\n") || "";

    const roleDice =
      character.roll
        ?.map((dice) =>
          dice.itemA ? `${dice.name}:${dice.itemA}` : dice.name
        )
        .join("\n") || "";

    const remarks =
      character.notes
        ?.map((note) =>
          note.itemA ? `${note.name}:${note.itemA}` : note.name
        )
        .join("\n") || "";

    // 构建模态框
    const modal = new ModalBuilder()
      .setCustomId("editCharacter")
      .setTitle("修改角色信息");

    const roleNameInput = new TextInputBuilder()
      .setCustomId("roleName")
      .setLabel("角色名称")
      .setPlaceholder("请输入角色名称")
      .setStyle(TextInputStyle.Short)
      .setValue(roleName)
      .setRequired(true);

    const roleAttributesInput = new TextInputBuilder()
      .setCustomId("roleAttributes")
      .setLabel("角色属性")
      .setPlaceholder(
        "请输入角色属性，多个属性之间用换行隔开。示例：\nHP: 5/5\nMP: 3/3\nSAN: 50/90"
      )
      .setStyle(TextInputStyle.Paragraph)
      .setValue(roleAttributes)
      .setRequired(false);

    const roleDiceInput = new TextInputBuilder()
      .setCustomId("roleDice")
      .setLabel("角色骰点")
      .setPlaceholder(
        "请输入角色将会用于骰点的属性，多个属性之间用换行隔开，变量放在大括号中。示例：\n投掷: cc 80\nSC: cc {SAN}"
      )
      .setStyle(TextInputStyle.Paragraph)
      .setValue(roleDice)
      .setRequired(false);

    const remarkInput = new TextInputBuilder()
      .setCustomId("remark")
      .setLabel("备注")
      .setPlaceholder("请填写其他备注信息，多个备注之间用换行隔开")
      .setStyle(TextInputStyle.Paragraph)
      .setValue(remarks)
      .setRequired(false);

    const actionRow1 = new ActionRowBuilder().addComponents(roleNameInput);
    const actionRow2 = new ActionRowBuilder().addComponents(roleAttributesInput);
    const actionRow3 = new ActionRowBuilder().addComponents(roleDiceInput);
    const actionRow4 = new ActionRowBuilder().addComponents(remarkInput);

    modal.addComponents(actionRow1, actionRow2, actionRow3, actionRow4);

    // 显示模态框
    await interaction.showModal(modal);
  } catch (error) {
    console.error(`修改角色时发生错误: ${error.message}`);
    try {
      await interaction.update({
        content: "修改角色时发生错误，请稍后再试。",
        components: [],
      });
    } catch (updateError) {
      console.error(`更新交互消息时发生错误: ${updateError.message}`);
    }
  }
}

/**
 * 处理删除角色的选择菜单交互
 */
async function handleDeleteCharacter(interaction) {
  const selectedCharacterNames = interaction.values; // 获取用户选择的角色名

  await interaction.update({
    content: `你选择了以下角色：${selectedCharacterNames.join(", ")}\n请点击确认删除按钮以删除这些角色。`,
    components: interaction.message.components, // 保留原有的组件
  });
}

module.exports = {
  handleSelectMenuInteraction,
};


