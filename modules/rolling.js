const { ActionRowBuilder, ButtonBuilder, } = require('discord.js');
const { buttonsStyle, splitArray } = require('./mod-button');


// handlingRequestRolling 函数
async function handlingRequestRolling(message, buttonsNames, displayname = "") {
  const row = [];
  const totallyQuotient = ~~((buttonsNames.length - 1) / 5) + 1;
  for (let index = 0; index < totallyQuotient; index++) {
    row.push(new ActionRowBuilder());
  }
  for (let i = 0; i < buttonsNames.length; i++) {
    const quot = ~~(i / 5);
    const name = buttonsNames[i] || "null";
    row[quot].addComponents(
      new ButtonBuilder()
        .setCustomId(`${name}_${i}`)
        .setLabel(name)
        .setStyle(buttonsStyle(i))
    );
  }
  const arrayRow = await splitArray(5, row);
  for (let index = 0; index < arrayRow.length; index++) {
    try {
      await message.reply({
        content: `${displayname}要求掷骰/点击`,
        components: arrayRow[index],
      });
    } catch (error) {
      console.error("Handling Request Rolling Error:", error);
    }
  }
}

// handlingRequestRollingCharacter 函数
async function handlingRequestRollingCharacter(message, input) {
  const buttonsNames = input[0];
  const characterName = input[1];
  const charMode = input[2] === "char";
  const row = [];
  const totallyQuotient = ~~((buttonsNames.length - 1) / 5) + 1;
  for (let index = 0; index < totallyQuotient; index++) {
    row.push(new ActionRowBuilder());
  }
  for (let i = 0; i < buttonsNames.length; i++) {
    const quot = ~~(i / 5);
    const name = buttonsNames[i] || "null";
    row[quot].addComponents(
      new ButtonBuilder()
        .setCustomId(`${name}_${i}`)
        .setLabel(name)
        .setStyle(buttonsStyle(i))
    );
  }
  const arrayRow = await splitArray(5, row);
  for (let index = 0; index < arrayRow.length; index++) {
    if (arrayRow[0][0].components.length === 0) {
      await message.reply({
        content: `${characterName}的角色卡 没有技能 \n不能产生Button`,
      });
      continue;
    }
    try {
      await message.reply({
        content: charMode ? `${characterName}的角色卡` : `${characterName}的角色`,
        components: arrayRow[index],
      });
    } catch (error) {
      console.error("Handling Request Rolling Character Error:", error);
    }
  }
}

module.exports = {
  handlingRequestRolling,
  handlingRequestRollingCharacter,
};