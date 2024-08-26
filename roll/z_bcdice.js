"use strict";
if (!process.env.mongoURL) {
  return;
}
const { DynamicLoader } = require("bcdice");
const variables = {};
const checkTools = require("../modules/check.js");
const schema = require("../modules/schema.js");
const { SlashCommandBuilder } = require("discord.js");
const gameName = function () {
  return "【BcDice】.bc";
};

const gameType = function () {
  return "Dice:bcdice:骰娘爱你哦💖";
};
const prefixs = function () {
  //[mainMSG[0]的prefixs,mainMSG[1]的prefixs,   <---这里是一对
  //mainMSG[0]的prefixs,mainMSG[1]的prefixs  ]  <---这里是一对
  //如前面是 /^1$/ig, 后面是/^1D100$/ig, 即 prefixs 变成 1 1D100
  ///^(?=.*he)(?!.*da).*$/ig
  return [
    {
      first:
        /^\.bc$|^\.al$|^\.kk$|^\.mk$|^\.ss$|^\.sg$|^\.UK$|^\.dx$|^\.nc$|^\.sw$/i,
      second: null,
    },
  ];
};
const getHelpMessage = function () {
  return `【BcDice】日系掷骰
这是让你可以使用Bcdice 那100种掷骰系统的功能

使用方法
首先，先在BCDICE官方的骰表ID中找出你所想的系统
然后输入.bc use (ID) 进行登记
现在，你可以以.bc (骰子指令)来进行掷骰了。 
想看骰子说明可输入.bc dicehelp

注: 登记需要Admin或频道管理权限

https://bcdice.org/systems/
`;
};
const initialize = function () {
  return variables;
};

const rollDiceCommand = async function ({
  inputStr,
  mainMsg,
  userrole,
  botname,
  channelid,
  groupid,
}) {
  let rply = {
    default: "on",
    type: "text",
    text: "",
  };
  let filter = {
    botname: botname,
    channelid: channelid,
    //    trpgId: String
  };
  switch (true) {
    case /^help$/i.test(mainMsg[1]) || !mainMsg[1]: {
      rply.text = this.getHelpMessage();
      rply.quotes = true;
      return rply;
    }
    case /^\.kk$/i.test(mainMsg[0]): {
      let result = await calldice("Kamigakari", mainMsg[1]);
      result
        ? (rply.text = `${mainMsg[1]} ${
            mainMsg[2] ? mainMsg[2] : ""
          }\n${result}`)
        : null;
      return rply;
    }
    case /^\.dx$/i.test(mainMsg[0]): {
      let result = await calldice("DoubleCross", mainMsg[1]);
      result
        ? (rply.text = `${mainMsg[1]} ${
            mainMsg[2] ? mainMsg[2] : ""
          }\n${result}`)
        : null;
      return rply;
    }
    case /^\.sw$/i.test(mainMsg[0]): {
      let result = await calldice("SwordWorld2.5", mainMsg[1]);
      result
        ? (rply.text = `${mainMsg[1]} ${
            mainMsg[2] ? mainMsg[2] : ""
          }\n${result}`)
        : null;
      return rply;
    }

    case /^dicehelp$/i.test(mainMsg[1]): {
      let doc = await schema.bcdiceRegedit
        .findOne(filter)
        .catch((err) => console.error(err));
      if (doc && doc.trpgId) {
        rply.text = (await callHelp(doc.trpgId)) || "";
        return rply;
      } else {
        rply.text = `没有已设定的骰表ID\n\n请输入ID，ID可以在下列网站找到\nhttps://bcdice.org/systems/ \n\n使用例子: .bc use CthulhuTech`;
        rply.quotes = true;
        return rply;
      }
    }
    case /^use+$/i.test(mainMsg[1]): {
      if (
        (rply.text = checkTools.permissionErrMsg({
          flag: checkTools.flag.ChkChannelManager,
          gid: groupid,
          role: userrole,
        }))
      ) {
        return rply;
      }
      if (!mainMsg[2]) {
        rply.text = `请输入ID，ID可以在下列网站找到\nhttps://bcdice.org/systems/\n\n使用例子: .bc use CthulhuTech`;
        return rply;
      }
      let help = await callHelp(mainMsg[2]);
      if (!help) {
        rply.text = `此骰表ID没有回应，请检查是否正确\nhttps://bcdice.org/systems/\n\n使用例子: .bc use CthulhuTech`;
        return rply;
      }
      let doc = await schema.bcdiceRegedit
        .findOneAndUpdate(
          filter,
          { trpgId: mainMsg[2] },
          { upsert: true, returnDocument: "after", returnNewDocument: true }
        )
        .catch((err) => null);
      if (doc)
        rply.text = `已更新BcDice，现在此频道正在使用 ${doc.trpgId}

            使用说明: \n${help}
            `;
      else rply.text = `登记失败，请以后再尝试`;
      return rply;
    }
    case /^delete+$/i.test(mainMsg[1]): {
      if (
        (rply.text = checkTools.permissionErrMsg({
          flag: checkTools.flag.ChkChannelManager,
          gid: groupid,
          role: userrole,
        }))
      ) {
        return rply;
      }

      let doc = await schema.bcdiceRegedit
        .findOneAndDelete(filter, { returnDocument: true })
        .catch((err) => console.error(err));
      if (doc) rply.text = `已刪除BcDice的设定`;
      else rply.text = `刪除失败，请以后再尝试`;
      return rply;
    }
    case /^\S/.test(mainMsg[1] || ""): {
      let doc = await schema.bcdiceRegedit
        .findOne(filter)
        .catch((err) => console.error(err));
      if (doc && doc.trpgId) {
        rply.text = await calldice(doc.trpgId, inputStr.replace(/^\S+/, ""));
        return rply;
      } else {
        rply.text =
          "没有已设定的BcDice 骰表ID\n请查找骰表ID 并输入 .bc use (id)\nhttps://bcdice.org/systems/";
        return rply;
      }
    }
    default: {
      rply.text = `这骰组已经整合成BcDice
使用方法
首先，先在BcDice官方的骰表ID中找出你所想的系统
然后输入.bc use (ID) 进行登记
现在，你可以以.bc (骰子指令)来进行掷骰了。 
想看骰子说明可输入.bc dicehelp

注: 登记需要Admin或频道管理权限

https://bcdice.org/systems/
`;
      return rply;
    }
  }
};

const discordCommand = [
  {
    data: new SlashCommandBuilder()
      .setName("bcdice掷骰")
      .setDescription("进行BcDice掷骰")
      .addStringOption((option) =>
        option.setName("text").setDescription("掷骰內容").setRequired(true)
      ),
    async execute(interaction) {
      const text = interaction.options.getString("text");
      return `.bc ${text} `;
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName("bcdice设定")
      .setDescription("进行bcdice的设定(说明/登记/刪除)")
      .addStringOption((option) =>
        option
          .setName("指令")
          .setDescription("进行bcdice的设定")
          .setRequired(true)
          .addChoices(
            { name: "显示使用说明", value: "help" },
            { name: "显示BcDice骰组使用说明(登记后可使用)", value: "dicehelp" },
            { name: "登记使用的骰表ID", value: "use" },
            { name: "移除使用的骰表ID", value: "delete" }
          )
      )
      .addStringOption((option) =>
        option
          .setName("usetext")
          .setDescription("如登记，请在这里填写ID")
          .setRequired(false)
      ),
    async execute(interaction) {
      const useText = interaction.options.getString("usetext") || "";
      const subcommand = interaction.options.getString("指令") || "";
      switch (subcommand) {
        case "help":
          return ".bc help";
        case "dicehelp":
          return ".bc dicehelp";
        case "delete":
          return ".bc delete";
        case "use":
          return `.bc use ${useText} `;
        default:
          return;
      }
    },
  },
];
async function calldice(gameType, message) {
  const loader = new DynamicLoader();
  const GameSystem = await loader.dynamicLoad(gameType);
  const result = GameSystem.eval(message);
  return result && result.text ? result.text : null;
}
async function callHelp(gameType) {
  try {
    const loader = new DynamicLoader();
    const GameSystem = await loader.dynamicLoad(gameType);
    const result = GameSystem.HELP_MESSAGE || "";
    return result;
  } catch (error) {
    return;
  }
}
module.exports = {
  rollDiceCommand,
  initialize,
  getHelpMessage,
  prefixs,
  gameType,
  gameName,
  discordCommand,
};
