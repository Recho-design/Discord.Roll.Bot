//处理交互事件
client.on("interactionCreate", async (interaction) => {
  //新建角色模态框
  if (interaction.isModalSubmit()) {
    if (interaction.customId === "createRoleModal") {
      try {
        let roleName = interaction.fields.getTextInputValue("roleName").trim();
        let roleAttributes = interaction.fields
          .getTextInputValue("roleAttributes")
          .trim();
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

        const filter = {
          id: interaction.user.id,
          name: { $regex: new RegExp(roleName, "i") },
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
    //处理修改角色模态框
    else if (interaction.isModalSubmit()) {
      if (interaction.customId === "editCharacter") {
        const userId = interaction.user.id; //
        const newName = interaction.fields.getTextInputValue("roleName").trim();

        let roleAttributes = interaction.fields
          .getTextInputValue("roleAttributes")
          .trim();
        let roleDice = interaction.fields.getTextInputValue("roleDice").trim();
        let remark = interaction.fields.getTextInputValue("remark").trim();

        roleAttributes = roleAttributes.replace(/\n/g, ";");
        roleDice = roleDice.replace(/\n/g, ";");
        const remarks = remark.replace(/\n/g, ";");

        const stateArray = roleAttributes.split(";").map((attr) => {
          const [name, itemA] = attr.split(":").map((str) => str.trim());
          return { name, itemA: itemA || "" };
        });

        const rollArray = roleDice.split(";").map((dice) => {
          const [name, itemA] = dice.split(":").map((str) => str.trim());
          return { name, itemA: itemA || "" };
        });

        const notesArray = remarks.split(";").map((note) => {
          const [name, itemA] = note.split(":").map((str) => str.trim());
          return { name, itemA: itemA || "" };
        });

        try {
          const filter = { id: userId, name: newName };
          const existingCharacter = await schema.characterCard.findOne(filter);

          if (existingCharacter) {
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
            const newCharacter = new schema.characterCard({
              id: userId,
              name: newName,
              state: stateArray,
              roll: rollArray,
              notes: notesArray,
            });

            await newCharacter.save();

            await interaction.reply({
              content: `角色名称不一致，新的角色 "${newName}" 已创建！`,
              ephemeral: false,
            });
          }
        } catch (error) {
          console.error("处理角色卡出错: ", error);
          await interaction.reply({
            content: `处理角色卡失败\n因为 ${error.message}`,
            ephemeral: false,
          });
        }
      }
    }
  }

  if (interaction.customId === "deleteCharacter") {
    const selectedCharacterNames = interaction.values;

    try {
      await interaction.update({
        content: `你选择了以下角色：${selectedCharacterNames.join(
          ", "
        )}\n请点击确认删除按钮以删除这些角色。`,
        components: interaction.message.components,
      });
    } catch (error) {
      console.error(`更新交互时发生错误: ${error.message}`);
    }
  } else if (interaction.customId === "confirmDelete") {
    try {
      await interaction.deferUpdate();

      const selectedCharacterNames = interaction.message.content
        .match(/(?<=选择了以下角色：).*/)[0]
        .split(", ");

      const userId = interaction.user.id;

      for (const characterName of selectedCharacterNames) {
        await schema.characterCard.deleteOne({
          id: userId,
          name: characterName,
        });
      }

      await interaction.editReply({
        content: `成功删除角色: ${selectedCharacterNames.join(", ")}`,
        components: [],
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
});