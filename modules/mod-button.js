const { EmbedBuilder, ButtonBuilder, ActionRowBuilder,ButtonStyle} = require('discord.js');

const buttonStyles = [
  ButtonStyle.Danger,
  ButtonStyle.Primary,
  ButtonStyle.Secondary,
  ButtonStyle.Success,
  ButtonStyle.Danger,
];

function buttonsStyle(num) {
  return buttonStyles[num % 5];
}

async function splitArray(perChunk, inputArray) {
  let myArray = [];
  for (let i = 0; i < inputArray.length; i += perChunk) {
    myArray.push(inputArray.slice(i, i + perChunk));
  }
  return myArray;
}

async function handlingButtonCreate(message, input) {
  const buttonsNames = input;
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
  return arrayRow;
}

module.exports = {
  handlingButtonCreate,
  buttonsStyle,
  splitArray
};