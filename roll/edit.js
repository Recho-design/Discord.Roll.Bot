"use strict";
if (!process.env.DISCORD_CHANNEL_SECRET) {
  return;
}
const checkTools = require("../modules/check.js");
const variables = {};
const { SlashCommandBuilder } = require("discord.js");
const gameName = function () {
  return "【旧信息修改功能】Discord限定";
};

const gameType = function () {
  return "tool:edit:骰娘爱你哦💖";
};
const prefixs = function () {
  return [
    {
      first: /^\.edit$/i,
      second: null,
    },
  ];
};
const getHelpMessage = function () {
  return `【旧信息修改功能】Discord限定
    这是让管理员用来修改由骰娘和webhook(角色扮演功能)所发出的信息的功能
    就像你自己只能修改自己的信息一样，此功能不能修改其他人或其他BOT的信息。
    使用方法:  
    对想要修改的信息右击点选reply 然后按以下格式输入即可
    .edit 信息第一行
    信息第二行
    信息第三行
    
    注: 本功能需要Admin或频道管理权限
`;
};
const initialize = function () {
  return variables;
};

const rollDiceCommand = async function ({ inputStr, mainMsg, userrole }) {
  let rply = {
    default: "on",
    type: "text",
    text: "",
  };
  switch (true) {
    case /^help$/i.test(mainMsg[1]) || !mainMsg[1]: {
      rply.text = this.getHelpMessage();
      rply.quotes = true;
      return rply;
    }
    case /^\S/.test(mainMsg[1] || ""): {
      if (
        (rply.text = checkTools.permissionErrMsg({
          flag: checkTools.flag.ChkManager,
          role: userrole,
        }))
      ) {
        return rply;
      }

      rply.discordEditMessage = inputStr.replace(/^\S+\s+/, "");
      return rply;
    }
    default: {
      break;
    }
  }
};

const discordCommand = [
  {
    data: new SlashCommandBuilder()
      .setName("edit")
      .setDescription("【修改旧信息】 请Reply想要修改的信息")
      .addStringOption((option) =>
        option.setName("text").setDescription("输入內容").setRequired(true)
      ),
    async execute(interaction) {
      const text = interaction.options.getString("text");
      return `.edit ${text}`;
    },
  },
];
module.exports = {
  rollDiceCommand,
  initialize,
  getHelpMessage,
  prefixs,
  gameType,
  gameName,
  discordCommand,
};
