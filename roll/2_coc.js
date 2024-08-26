"use strict";
const rollbase = require("./rollbase.js");
const schema = require("../modules/schema.js");
const checkTools = require("../modules/check.js");
const checkMongodb = require("../modules/dbWatchdog.js");
const mathjs = require("mathjs");
const gameName = function () {
  return "【克苏鲁神话】 cc cc(n)1~2 ccb ccrt ccsu .dp .cc7build .cc6build .cc7bg";
};
const { SlashCommandBuilder } = require("discord.js");
const gameType = function () {
  return "Dice:CoC:骰娘爱你哦💖";
};
const prefixs = function () {
  return [
    {
      first:
        /(^\.cccc$)|(^\.ccdr$)|(^\.ccpc$)|(^ccrt$)|(^\.chase$)|(^ccsu$)|(^cc7版创角$)|(^[.]dp$)|(^[.]cc7build$)|(^[.]ccpulpbuild$)|(^[.]cc6build$)|(^[.]cc7bg$)|(^cc6版创角$)|(^cc7版角色背景$)/i,
      second: null,
    },
    {
      first:
        /(^\.sc$)|(^ccb$)|(^cc$)|(^ccn[1-2]$)|(^cc[1-2]$)|(^成长检定$)|(^幕间成长$)/i,
      second: /(^\d+)|(^help$)/i,
    },
  ];
};
const getHelpMessage = function () {
  return `【克苏鲁神话】
coc6版掷骰		： ccb 80 技能小于等于80
coc7版掷骰		： cc 80 技能小于等于80
coc7版奖励骰	： cc(1~2) cc1 80 一粒奖励骰
coc7版惩罚骰	： ccn(1~2) ccn2 80 两粒惩罚骰
coc7版联合检定	： cc 80,40 侦查,斗殴 cc1 80,40 侦查,斗殴 ccN1 80,40 侦查,斗殴

coc7版SanCheck	： .sc (SAN值) (成功)/(失败)
eg: .sc 50		.sc 50 1/1d3+1		.sc 50 1d10/1d100

coc7版追逐战产生器(娱乐用): .chase
P.S.追逐战功能使用了可选规则及我对规则书之独断理解，
并不一定完全符合规则书内容，请自行衡量使用
建议使用前详细阅读规则书第七章追逐

coc7版 即时型疯狂： 启动语 ccrt
coc7版 总结型疯狂： 启动语 ccsu

coc7版 神话组织 随机产生： 启动语 .cccc
coc7版 神话资料 随机产生： 启动语 .ccdr
coc7版 施法推骰后果： 启动语 .ccpc

coc pulp版创角			： 启动语 .ccpulpbuild
coc6版创角				： 启动语 .cc6build
coc7版创角				： 启动语 .cc7build (岁数7-89)
coc7版随机创角			： 启动语 .cc7build random
coc7版自由分配点数创角	： 启动语 .cc7build .xyz (岁数7-89)
如.cc7build .752 就会掷出
7次 3d6 * 5
5次 (2d6+6) * 5 
2次 3d6 * 5
可只输入.  不输入xyz
预设值为 .53 即5次 3d6 * 5 和3次 (2d6+6) * 5 

coc7 成长或增强检定： .dp 或 成长检定 或 幕间成长 (技能%) (名称) (可以一次输入多个)
例）.DP 50 骑乘 80 斗殴  70 60

coc7版角色背景随机生成： 启动语 .cc7bg

成长检定纪录功能
开启后将会纪录你使用CC功能投掷成功和大成功大失败的技能，
然后可以呼叫出来进行自动成长。
.dp start 	： 开启纪录功能
.dp stop  	： 停止纪录功能
.dp show  	： 显示掷骰纪录
.dp showall	： 显示全频道所有大成功大失败掷骰纪录
.dp auto  	： 进行自动成长并清除掷骰纪录
.dp clear 	： 清除掷骰纪录
.dp clearall： 清除掷骰纪录包括大成功大失败
`;
};
const initialize = function () {
  return {};
};

const rollDiceCommand = async function ({
  mainMsg,
  groupid,
  userid,
  userrole,
  channelid,
  displayname,
  displaynameDiscord,
  tgDisplayname,
  botname,
}) {
  let rply = {
    default: "on",
    type: "text",
    text: "",
  };
  let trigger = mainMsg[0].toLowerCase();
  switch (true) {
    case /^help$/i.test(mainMsg[1]): {
      rply.text = this.getHelpMessage();
      rply.quotes = true;
      break;
    }
    case /^ccrt$/i.test(mainMsg[0]): {
      rply.text = ccrt();
      rply.quotes = true;
      break;
    }
    case /^ccsu$/i.test(mainMsg[0]): {
      rply.text = ccsu();
      rply.quotes = true;
      break;
    }
    case /^\.sc$/i.test(mainMsg[0]): {
      let sc = new SanCheck(mainMsg, botname);
      rply.text = sc.run();
      rply.buttonCreate = sc.getButton();
      rply.quotes = true;
      break;
    }
    case /^\.chase$/i.test(mainMsg[0]): {
      rply.text = chase();
      rply.quotes = true;
      break;
    }
    case trigger == "ccb" && mainMsg[1] <= 1000: {
      rply.text = coc6(mainMsg[1], mainMsg[2]);
      break;
    }
    //DevelopmentPhase幕间成长指令开始于此
    case /^\.dp$/i.test(mainMsg[0]) && /^start$/i.test(mainMsg[1]): {
      if (
        (rply.text = checkTools.permissionErrMsg({
          flag: checkTools.flag.ChkChannelAdmin,
          gid: groupid,
          role: userrole,
        }))
      ) {
        return rply;
      }
      rply.text = await dpRecordSwitch({ onOff: true, groupid, channelid });
      rply.quotes = true;
      return rply;
    }
    case /^\.dp$/i.test(mainMsg[0]) && /^stop$/i.test(mainMsg[1]): {
      if (
        (rply.text = checkTools.permissionErrMsg({
          flag: checkTools.flag.ChkChannelAdmin,
          gid: groupid,
          role: userrole,
        }))
      ) {
        return rply;
      }
      rply.text = await dpRecordSwitch({ onOff: false, groupid, channelid });
      rply.quotes = true;
      break;
    }
    case /^\.dp$/i.test(mainMsg[0]) && /^show$/i.test(mainMsg[1]): {
      if (
        (rply.text = checkTools.permissionErrMsg({
          flag: checkTools.flag.ChkChannel,
          gid: groupid,
        }))
      ) {
        return rply;
      }

      let switchOn = await schema.developmentConductor
        .findOne({
          groupID: channelid || groupid,
          switch: true,
        })
        .catch((error) =>
          console.error("coc #149 mongoDB error: ", error.name, error.reson)
        );
      if (!switchOn) {
        rply.text = "本频道未开启CC记录功能, 请使用 .dp start 开启";
        return rply;
      }
      let result = await schema.developmentRollingRecord
        .find({
          groupID: channelid || groupid,
          userID: userid,
        })
        .sort({ date: -1 })
        .catch((error) =>
          console.error("coc #157 mongoDB error: ", error.name, error.reson)
        );
      rply.quotes = true;
      if (!result || result.length == 0) {
        rply.text = "未有CC掷骰记录";
        return rply;
      }
      let successResult = {
        data: false,
        text: `成功的掷骰结果`,
      };
      let successResultWithoutName = {
        data: false,
        text: `=======
				无记名成功结果`,
      };
      let criticalSuccessNfumbleResult = {
        data: false,
        text: `=======
				大成功与大失败`,
      };
      for (let index = 0; index < result.length; index++) {
        if (
          result[index].skillPerStyle == "normal" &&
          result[index].skillName
        ) {
          successResult.data = true;
          successResult.text += `
					「${result[index].skillName}」	${result[index].skillPer} - ${
            result[index].date.getMonth() + 1
          }月${result[index].date.getDate()}日 ${result[
            index
          ].date.getHours()}:${
            result[index].date.getMinutes() < 10
              ? "0" + result[index].date.getMinutes()
              : result[index].date.getMinutes()
          }`;
        }
        if (
          result[index].skillPerStyle == "normal" &&
          !result[index].skillName
        ) {
          successResultWithoutName.data = true;
          successResultWithoutName.text += `
					「无名技能」	${result[index].skillPer} - ${
            result[index].date.getMonth() + 1
          }月${result[index].date.getDate()}日 ${result[
            index
          ].date.getHours()}:${
            result[index].date.getMinutes() < 10
              ? "0" + result[index].date.getMinutes()
              : result[index].date.getMinutes()
          }`;
        }
        if (
          result[index].skillPerStyle == "criticalSuccess" ||
          result[index].skillPerStyle == "fumble"
        ) {
          criticalSuccessNfumbleResult.data = true;
          criticalSuccessNfumbleResult.text += `
					${
            result[index].skillName
              ? "「" + result[index].skillName + "」"
              : "「无名技能」"
          } ${result[index].skillPer} - ${
            result[index].date.getMonth() + 1
          }月${result[index].date.getDate()}日 ${result[
            index
          ].date.getHours()}:${
            result[index].date.getMinutes() < 10
              ? "0" + result[index].date.getMinutes()
              : result[index].date.getMinutes()
          } - ${
            result[index].skillPerStyle == "criticalSuccess"
              ? "大成功"
              : "大失败"
          }`;
        }
      }
      /**
       * 成功的掷骰结果
       * =======
       * 空手 50	拳击 60	拳	80
       * 空手 50	拳击 60	拳	80
       * =======
       * 无记名成功结果
       * 21-08-04 12:33 技能	80
       * 21-08-04 13:33 技能	80
       * =======
       * 大成功与大失败
       * 技能	80	大失败
       * 拳	80	大成功
       */

      successResult.data ? (rply.text += `${successResult.text}\n`) : null;
      successResultWithoutName.data
        ? (rply.text += `${successResultWithoutName.text}\n`)
        : null;
      criticalSuccessNfumbleResult.data
        ? (rply.text += `${criticalSuccessNfumbleResult.text}\n`)
        : null;
      return rply;
    }

    case /^\.dp$/i.test(mainMsg[0]) && /^showall$/i.test(mainMsg[1]): {
      if (
        (rply.text = checkTools.permissionErrMsg({
          flag: checkTools.flag.ChkChannel,
          gid: groupid,
        }))
      ) {
        return rply;
      }
      let switchOn = await schema.developmentConductor
        .findOne({
          groupID: channelid || groupid,
          switch: true,
        })
        .catch((error) =>
          console.error("coc #224 mongoDB error: ", error.name, error.reson)
        );
      if (!switchOn) {
        rply.text = "本频道未开启CC记录功能, 请使用 .dp start 开启";
        return rply;
      }
      let result = await schema.developmentRollingRecord
        .find({
          groupID: channelid || groupid,
          userID: userid,
          $or: [
            {
              skillPerStyle: "criticalSuccess",
            },
            {
              skillPerStyle: "fumble",
            },
          ],
        })
        .sort({ userName: -1 })
        .catch((error) =>
          console.error("coc #237 mongoDB error: ", error.name, error.reson)
        );
      rply.quotes = true;
      let criticalSuccessNfumbleResult = {
        data: false,
        text: `大成功与大失败
				=======`,
      };
      for (let index = 0; index < result.length; index++) {
        if (
          result[index].skillPerStyle == "criticalSuccess" ||
          result[index].skillPerStyle == "fumble"
        ) {
          criticalSuccessNfumbleResult.data = true;
          criticalSuccessNfumbleResult.text += `
					${result[index].userName ? result[index].userName : "「无名使用者」"} ${
            result[index].skillName ? result[index].skillName : "「无名技能」"
          } ${result[index].skillPer} - ${
            result[index].date.getMonth() + 1
          }月${result[index].date.getDate()}日 ${result[
            index
          ].date.getHours()}:${
            result[index].date.getMinutes() < 10
              ? "0" + result[index].date.getMinutes()
              : result[index].date.getMinutes()
          } - ${
            result[index].skillPerStyle == "criticalSuccess"
              ? "大成功"
              : "大失败"
          }`;
        }
      }
      criticalSuccessNfumbleResult.data
        ? (rply.text += criticalSuccessNfumbleResult.text)
        : (rply.text += "本频道未有相关记录, 请多些掷骰吧!");
      return rply;
    }
    case /^\.dp$/i.test(mainMsg[0]) && /^auto$/i.test(mainMsg[1]): {
      rply.quotes = true;
      if (
        (rply.text = checkTools.permissionErrMsg({
          flag: checkTools.flag.ChkChannel,
          gid: groupid,
        }))
      ) {
        return rply;
      }

      let switchOn = await schema.developmentConductor
        .findOne({
          groupID: channelid || groupid,
          switch: true,
        })
        .catch((error) =>
          console.error("coc #264 mongoDB error: ", error.name, error.reson)
        );
      if (!switchOn) {
        rply.text = "本频道未开启CC记录功能, 请使用 .dp start 开启";
        return rply;
      }

      let result = await schema.developmentRollingRecord
        .find({
          groupID: channelid || groupid,
          userID: userid,
          skillPerStyle: "normal",
        })
        .sort({ date: -1 })
        .catch((error) =>
          console.error("coc #274 mongoDB error: ", error.name, error.reson)
        );
      if (!result || result.length == 0) {
        rply.text = "未有CC掷骰记录";
        return rply;
      }
      rply.text = `自动成长检定\n========`;
      for (let index = 0; index < result.length; index++) {
        let target = Number(result[index].skillPer);
        let name = result[index].skillName || "无名技能";
        let skill = rollbase.Dice(100);
        let confident = target <= 89 ? true : false;
        if (target > 95) target = 95;
        if (skill >= 96 || skill > target) {
          let improved = rollbase.Dice(10);
          rply.text += `\n1D100 > ${target} 掷出: ${skill}  →  「${name}」成长成功! 技能增加 ${improved} 点，现在是 ${
            target + improved
          } 点。- ${result[index].date.getMonth() + 1}月${result[
            index
          ].date.getDate()}日 ${result[index].date.getHours()}:${
            result[index].date.getMinutes() < 10
              ? "0" + result[index].date.getMinutes()
              : result[index].date.getMinutes()
          }`;

          if (confident && target + improved >= 90) {
            rply.text += `\n调查员的技能提升到90%以上，他的当前理智值增加${
              rollbase.Dice(6) + rollbase.Dice(6)
            }点。`;
          }
        } else {
          rply.text += `\n1D100 > ${target} 掷出: ${skill}  →  「${name}」 成长失败!  - ${
            result[index].date.getMonth() + 1
          }月${result[index].date.getDate()}日 ${result[
            index
          ].date.getHours()}:${
            result[index].date.getMinutes() < 10
              ? "0" + result[index].date.getMinutes()
              : result[index].date.getMinutes()
          }`;
        }
      }
      await schema.developmentRollingRecord
        .deleteMany({
          groupID: channelid || groupid,
          userID: userid,
          skillPerStyle: "normal",
        })
        .catch((error) =>
          console.error("coc #302 mongoDB error: ", error.name, error.reson)
        );
      rply.text += `\n--------
			成长结束，已清除掷骰记录`;
      return rply;
    }
    case /^\.dp$/i.test(mainMsg[0]) && /^clear$/i.test(mainMsg[1]): {
      if (
        (rply.text = checkTools.permissionErrMsg({
          flag: checkTools.flag.ChkChannel,
          gid: groupid,
        }))
      ) {
        return rply;
      }

      let result = await schema.developmentRollingRecord
        .deleteMany({
          groupID: channelid || groupid,
          userID: userid,
          skillPerStyle: "normal",
        })
        .catch((error) =>
          console.error("coc #316 mongoDB error: ", error.name, error.reson)
        );

      rply.quotes = true;
      rply.text = `已清除 ${result.n}项记录, 如想大成功大失败记录也清除, 请使用 .dp clearall`;
      return rply;
    }
    case /^\.dp$/i.test(mainMsg[0]) && /^clearall$/i.test(mainMsg[1]): {
      if (
        (rply.text = checkTools.permissionErrMsg({
          flag: checkTools.flag.ChkChannel,
          gid: groupid,
        }))
      ) {
        return rply;
      }

      let result = await schema.developmentRollingRecord
        .deleteMany({
          groupID: channelid || groupid,
          userID: userid,
          $or: [
            {
              skillPerStyle: "criticalSuccess",
            },
            {
              skillPerStyle: "fumble",
            },
            {
              skillPerStyle: "normal",
            },
          ],
        })
        .catch((error) =>
          console.error("coc #338 mongoDB error: ", error.name, error.reson)
        );
      rply.quotes = true;
      rply.text = `已清除你在本频道的所有CC掷骰记录, 共计${result.n}项`;
      return rply;
    }
    case trigger == ".dp" || trigger == "成长检定" || trigger == "幕间成长": {
      rply.text = DevelopmentPhase(mainMsg);
      rply.quotes = true;
      break;
    }
    case trigger == "cc" && mainMsg[1] !== null: {
      rply.text = await coc7({
        chack: mainMsg[1],
        text: mainMsg[2],
        userid,
        groupid,
        channelid,
        userName: tgDisplayname || displaynameDiscord || displayname,
      });
      break;
    }
    case trigger == "cc1" && mainMsg[1] !== null: {
      rply.text = await coc7bp({
        chack: mainMsg[1],
        text: mainMsg[2],
        userid,
        groupid,
        channelid,
        bpdiceNum: 1,
        userName: tgDisplayname || displaynameDiscord || displayname,
      });
      break;
    }
    case trigger == "cc2" && mainMsg[1] !== null: {
      rply.text = await coc7bp({
        chack: mainMsg[1],
        text: mainMsg[2],
        userid,
        groupid,
        channelid,
        bpdiceNum: 2,
        userName: tgDisplayname || displaynameDiscord || displayname,
      });
      break;
    }
    case trigger == "ccn1" && mainMsg[1] !== null: {
      rply.text = await coc7bp({
        chack: mainMsg[1],
        text: mainMsg[2],
        userid,
        groupid,
        channelid,
        bpdiceNum: -1,
        userName: tgDisplayname || displaynameDiscord || displayname,
      });
      break;
    }
    case trigger == "ccn2" && mainMsg[1] !== null: {
      rply.text = await coc7bp({
        chack: mainMsg[1],
        text: mainMsg[2],
        userid,
        groupid,
        channelid,
        bpdiceNum: -2,
        userName: tgDisplayname || displaynameDiscord || displayname,
      });
      break;
    }

    case /(^cc7版创角$)|(^[.]cc7build$)/i.test(mainMsg[0]): {
      rply.text = builder
        .build(mainMsg[1] || "random", mainMsg[2])
        .replace(/\*5/gi, " * 5")
        .trim();
      rply.quotes = true;
      break;
    }
    case /(^ccpulp版创角$)|(^[.]ccpulpbuild$)/i.test(mainMsg[0]): {
      rply.text = buildpulpchar(mainMsg[1]).replace(/\*5/gi, " * 5");
      rply.quotes = true;
      break;
    }
    case /(^cc6版创角$)|(^[.]cc6build$)/i.test(mainMsg[0]): {
      rply.text = build6char(mainMsg[1]);
      rply.quotes = true;
      break;
    }
    case /(^cc7版角色背景$)|(^[.]cc7bg$)/i.test(mainMsg[0]): {
      rply.text = PcBG();
      rply.quotes = true;
      break;
    }
    case /(^\.cccc)/i.test(mainMsg[0]): {
      rply.text = CreateCult.createCult();
      rply.quotes = true;
      return rply;
    }
    case /(^\.ccpc)/i.test(mainMsg[0]): {
      rply.text = MythoyCollection.getMythonData("pushedCasting");
      rply.quotes = true;
      return rply;
    }
    case /(^\.ccdr)/i.test(mainMsg[0]): {
      rply.text = MythoyCollection.getMythos();
      rply.quotes = true;
      return rply;
    }

    default:
      break;
  }
  return rply;
};
const discordCommand = [
  {
    data: new SlashCommandBuilder()
      .setName("ccrt")
      .setDescription("coc7版 即时型疯狂"),
    async execute() {
      return `ccrt`;
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName("ccsu")
      .setDescription("coc7版 总结型疯狂"),
    async execute() {
      return `ccsu`;
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName("ccb")
      .setDescription("coc6版掷骰")
      .addStringOption((option) =>
        option
          .setName("text")
          .setDescription("目标技能大小及名字")
          .setRequired(true)
      ),
    async execute(interaction) {
      const text = interaction.options.getString("text");
      if (text !== null) return `ccb ${text}`;
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName("cc")
      .setDescription("coc7版掷骰")
      .addStringOption((option) =>
        option
          .setName("text")
          .setDescription("目标技能大小及名字")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("paney")
          .setDescription("奖励或惩罚骰")
          .addChoices(
            { name: "1粒奖励骰", value: "1" },
            { name: "2粒奖励骰", value: "2" },
            { name: "1粒惩罚骰", value: "n1" },
            { name: "2粒惩罚骰", value: "n2" }
          )
      ),
    async execute(interaction) {
      const text = interaction.options.getString("text");
      const paney = interaction.options.getString("paney") || "";

      return `cc${paney} ${text}`;
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName("sc")
      .setDescription("coc7版SanCheck")
      .addStringOption((option) =>
        option.setName("text").setDescription("你的San值").setRequired(true)
      )
      .addStringOption((option) =>
        option.setName("success").setDescription("成功扣多少San")
      )
      .addStringOption((option) =>
        option.setName("failure").setDescription("失败扣多少San")
      ),
    async execute(interaction) {
      const text = interaction.options.getString("text");
      const success = interaction.options.getString("success");
      const failure = interaction.options.getString("failure");
      let ans = `.sc ${text}`;
      if (success !== null && failure !== null)
        ans = `${ans} ${success}/${failure}`;
      return ans;
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName("build")
      .setDescription("创角功能")
      .addSubcommand((subcommand) =>
        subcommand.setName("ccpulpbuild").setDescription("pulp版创角")
      )
      .addSubcommand((subcommand) =>
        subcommand.setName("cc6build").setDescription("coc6版创角")
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName("cc7build")
          .setDescription("coc7版创角")
          .addStringOption((option) =>
            option
              .setName("age")
              .setDescription("可选: (歲数7-89) 如果没有会使用随机开角")
          )
      ),

    async execute(interaction) {
      const age = interaction.options.getString("age") || "";
      const subcommand = interaction.options.getSubcommand();
      if (subcommand !== null) return `.${subcommand} ${age}`;
      return ".cc7build help";
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName("dp")
      .setDescription("coc7 成长或增强检定")
      .addStringOption((option) =>
        option
          .setName("text")
          .setDescription("目标技能大小及名字")
          .setRequired(true)
      ),
    async execute(interaction) {
      const text = interaction.options.getString("text");
      return `.dp ${text}`;
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName("dpg")
      .setDescription("coc7 成长检定记录功能")
      .addStringOption((option) =>
        option
          .setName("mode")
          .setDescription("功能")
          .addChoices(
            { name: "显示掷骰记录", value: "show" },
            { name: "显示全频道所有大成功大失败掷骰记录", value: "showall" },
            { name: "开启记录功能", value: "start" },
            { name: "停止记录功能", value: "stop" },
            { name: "进行自动成长并清除掷骰记录", value: "auto" },
            { name: "清除掷骰记录", value: "clear" },
            { name: "清除掷骰记录包括大成功大失败", value: "clearall" }
          )
      ),
    async execute(interaction) {
      const mode = interaction.options.getString("mode");
      return `.dp ${mode}`;
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName("cc7bg")
      .setDescription("coc7版角色背景随机生成"),
    async execute() {
      return `.cc7bg`;
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName("cccc")
      .setDescription("随机产生 神话组织"),
    async execute() {
      return `.cccc`;
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName("ccdr")
      .setDescription("随机产生 神话资料"),
    async execute() {
      return `.ccdr`;
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName("ccpc")
      .setDescription("施法推骰后果"),
    async execute() {
      return `.ccpc`;
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

class CreateCult {
  constructor() {}
  /*
	回应格式
	==============
	Cult 产生器
	首领名字: XXXXXX

	首领身份:
	-> 1-10;
	
	属性: A-D STR, CON, SIZ, DEX, INT, APP, POW, and EDU
	
	技能: QUICK-REFERENCE SKILLS  A-E

	特质:  个性: 
	-1-100

	能力来源: 
	SOURCES OF POWER 1-3, 4-6, 7-8, 9-10
	==============
	邪教名称?

	CULT GOALS—WANTS 1-10

	CULT GOALS—MEANS 1-10
	 */
  static createCult() {
    let cult = {
      leaderPosition: this.leaderPosition(),
      characteristics: this.characteristics(),
      skill: this.skill(),
      description: this.description(),
      personality: this.personality(),
      spells: this.spells(),
      sourcesOfPower: this.sourcesOfPower(),
      cultGoals: this.cultGoals(),
      cultGoalsMeans: this.cultGoalsMeans(),
    };
    let cultText = `Cult 产生器
	首领身份:
	${cult.leaderPosition}
	
	属性: 
	${cult.characteristics}
	
	技能: 
	${cult.skill}

	法术:
	${cult.spells}

	特质: 
	${cult.description}
	
	个性: 
	${cult.personality}

	能力来源: 
	${cult.sourcesOfPower}
	==============
	教派目标:
	${cult.cultGoals}

	实现目标的手段:
	${cult.cultGoalsMeans}`;
    return cultText;
  }
  static leaderPosition() {
    return this.LeaderPosition[rollbase.Dice(10) - 1];
  }
  static characteristics() {
    //四选一
    let selectedCharacteristics = this.characteristicsSet[rollbase.Dice(4) - 1];
    // 使用 Fisher–Yates 洗牌算法随机排列属性
    selectedCharacteristics = this.FisherYates(selectedCharacteristics);
    let text = "";
    for (let i = 0; i < this.sixState.length; i++) {
      text += `${this.sixState[i]}: ${selectedCharacteristics[i]} `;
      if (i % 3 === 0 && i !== 0) {
        text += "\n";
      }
    }
    return text;
  }

  static skill() {
    let text = "";
    let skillStates =
      this.SkillStatesSet[rollbase.Dice(this.SkillStatesSet.length) - 1];
    //使用 Fisher–Yates 洗牌算法随机排列技能
    skillStates = this.FisherYates(skillStates);
    let skillNames = this.WightRandom(
      this.SkillNameSet(),
      Object.keys(this.SkillNameSet()).length
    );
    for (let i = 0; i < skillStates.length; i++) {
      text += `${skillNames[i]}: ${skillStates[i]} `;
      if (i % 3 === 0 && i !== 0) {
        text += "\n";
      }
    }
    return text;
  }
  static description() {
    return this.descriptionSet[rollbase.Dice(this.descriptionSet.length) - 1];
  }
  static personality() {
    return this.traitsSet[rollbase.Dice(this.traitsSet.length) - 1];
  }
  static spells() {
    let text = "";
    let num = 0;
    let spells = this.spellsSet[rollbase.Dice(this.spellsSet.length) - 1];
    text = rollbase.BuildDiceCal(spells);
    num = text.match(/\d+$/i)[0];
    text += "\n";
    text += ` ${this.getLeaderMythonList(num).join(", ")},`;
    text = text.replace(/,$/i, "");
    return text;
  }
  static getLeaderMythonList(count) {
    const shuffledArr = MythoyCollection.Magic.slice();
    for (let i = shuffledArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
    }
    return shuffledArr.slice(0, count);
  }
  static sourcesOfPower() {
    let text = "";
    let num = rollbase.Dice(10);
    switch (num) {
      case 1:
      case 2:
      case 3:
        text = this.SourcesOfPowerSet[0];
        break;
      case 4:
      case 5:
      case 6:
        text = this.SourcesOfPowerSet[1];
        break;
      case 7:
      case 8:
        text = this.SourcesOfPowerSet[2];
        break;
      case 9:
      case 10:
        text = this.SourcesOfPowerSet[3];
        break;
    }
    return text;
  }
  static cultGoals() {
    return this.CultWants[rollbase.Dice(this.CultWants.length) - 1];
  }
  static cultGoalsMeans() {
    return this.CultMeans[rollbase.Dice(this.CultMeans.length) - 1];
  }
  static WightRandom(options, num_choices) {
    let choices = new Set();
    while (choices.size < num_choices) {
      let total_weight = 0;
      for (let j in options) {
        total_weight += options[j];
      }
      let rnd = Math.random() * total_weight;
      for (let j in options) {
        if (rnd < options[j]) {
          choices.add(j);
          options[j] = options[j] / 2;
          break;
        }
        rnd -= options[j];
      }
    }
    return Array.from(choices);
  }
  static FisherYates(arr) {
    for (let j = arr.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [arr[j], arr[k]] = [arr[k], arr[j]];
    }
    return arr;
  }

  static sixState = ["STR", "CON", "SIZ", "DEX", "INT", "APP", "POW", "EDU"];
  static characteristicsSet = [
    [75, 70, 65, 60, 55, 50, 40, 35],
    [80, 75, 70, 60, 55, 50, 40, 35],
    [90, 85, 80, 80, 70, 60, 60, 50],
    [100, 80, 60, 60, 45, 40, 35, 35],
  ];

  static LeaderPosition = [
    `富有商人
	金钱就是力量。拥有成功的小企业者；跨国公司董事会上的一员；有权势的电影制片人；投资银行家等等。`,
    `家族女/男家长
	血缘是一种具有特殊且具有束缚力的连结。阿巴拉契亚山脉中一个广大家族的古老祖母；一个大型且有贵族气质的家庭的尊贵曾祖父；一位强大巫师的后裔；一对双胞胎的单亲父或母。`,
    `帮派领导者
	罪犯有一种在雷达之下运作的方式——这种经验可能在隐藏克苏鲁教派的活动时有所帮助。城市街头帮派的领导者；犯罪组织的老大；大规模的毒品卡特尔的领导者；其他孩子们景仰的正在冒出头角的街头小混混。`,
    `宗教领导者
	已经位于影响力的位置，可以接触到大量的人群，其中一些人急需帮助，更容易受到欺诈和诱惑。
	这些宗教领袖可能免于课税。主流宗教的神父，拉比，伊玛目，或牧师。`,
    `大学教授/老师
	拥有接触许多易受影响，年轻心灵的人的机会。一位高中老师或校长；拥有图书馆钥匙的大学教授，图书馆内充满着陈旧的书册；
	具有影响力的青年领袖，可带领具有可被重新导向的活动组织的青年。`,
    `政治家
	政治影响力可以指导政策，什至改变法律。市长或城市议会成员；州议会人员；州长什至国家总统。 `,
    `农民/工厂工人
	"蓝领" 宗教教派领袖可能对确保社会运作平稳的人有影响力，例如工厂员工，农村工人，建筑行业和维修工人。`,
    `军官
	在军队之中有个邪教是一个可怕的想法。可能是部队中位阶较高的官员，或者是在情报机构中的执行者，例如FBI或CIA，或是说，其他国家的相似机构。`,
    `船长 
	在海上，船长处于一个非常有威力的位置。可能是大型运输船的船长，一艘帆船，一艘商船，什至是一艘邮轮的船长。`,
    `异类 
	这些人士在社会边缘活动，往往被忽视，例如巡回销售员，在家工作的网页开发员，或者是一位蓝调吉他手/歌手。`,
  ];

  static SkillStatesSet = [
    [80, 60, 60, 60, 50, 40],
    [100, 80, 60, 60, 50, 40],
    [90, 80, 70, 70, 60, 55],
    [80, 75, 70, 65, 65, 60, 60, 55, 55, 50, 40, 25],
    [90, 85, 75, 70, 60, 60, 60, 55, 50, 40, 30, 25],
  ];

  static SkillNameSet() {
    return Object.assign(
      {},
      this.CombatSkills,
      this.CharacterSkills,
      this.UsefulSkills,
      this.ActionSkills
    );
  }
  static CombatSkills = {
    闪避: 4,
    斗殴: 2,
    "斗殴(刀/剑/棒)": 2,
    "射击（手枪）": 3,
    投掷: 1,
  }; //1
  static CharacterSkills = {
    信用评级: 4,
    人类学: 1,
    估价: 1,
    考古学: 2,
    语言: 1,
    法律: 1,
    博物学: 1,
    物理学: 1,
  }; //1
  static UsefulSkills = {
    克苏鲁神话: 10,
    心理学: 4,
    巧手: 3,
    锁匠: 2,
    机械修理: 1,
    驾驶汽车: 2,
    乔装: 2,
    "艺术/工艺（演技）": 3,
  };
  static ActionSkills = {
    侦查: 4,
    话术: 1,
    取悦: 3,
    恐吓: 2,
    说服: 1,
    攀爬: 1,
    跳跃: 1,
    聆听: 1,
  }; //1-5

  static descriptionSet = [
    "肌肉发达",
    "毛发蓬松",
    "眼神狂野",
    "全身冒汗",
    "牙齿状况差",
    "非常高大",
    "非常「平凡」外表",
    "瘦骨嶙峋",
    "衣著整洁无瑕",
    "眯著眼睛",
    "深邃的眼睛",
    "下垂的",
    "多疤痕",
    "瘢痕累累",
    "眼睛眼距近",
    "有皱纹",
    "刺青",
    "高额头",
    "雕刻般的",
    "眼睛深陷",
    "有胡子",
    "下巴双层",
    "鼻子歪曲",
    "突出的眉骨",
    "秃头",
    "修剪整齐的指甲",
    "娇小",
    "消瘦",
    "超重",
    "长满老茧的手",
    "细薄的头发",
    "长指甲",
    "细长的",
    "苗条",
    "运动型",
    "沾满墨水的手指",
    "丰满的头发",
    "小手",
    "怪诞",
    "湿疹",
    "口臭",
    "全身同色的衣服",
    "缺指",
    "狭长的脸",
    "干燥的皮肤",
    "高挑的",
    "穿耳环的",
    "脸颊凹陷",
    "丰满",
    "单眼",
    "尸体般的",
    "面具",
    "腐烂的",
    "缺少一肢",
    "无毛的",
    "疾病缠身的",
    "缩小的",
    "虚弱的",
    "高耸的",
    "骨瘦如柴的",
    "贫血的",
    "弯曲的",
    "佝偻的",
    "灵巧的",
    "笨重的",
    "苍白的",
    "野兽般的",
    "蜡色的",
    "狐狸般的",
    "脸庞像小天使的",
    "憔悴的",
    "令人厌恶的",
    "不老的",
    "肉感的",
    "枯萎的",
    "青筋浮现的皮肤",
    "纤维状",
    "拋光过的",
    "绷紧的",
    "时髦的",
    "丑陋的",
    "肮脏的",
    "强壮的",
    "纤细的",
    "结实的",
    "眼镜",
    "有吸引力的",
    "不修边幅的",
    "独眼镜",
    "华丽的",
    "普通的外表",
    "一头白发",
    "阴森的笑容",
    "老式的",
    "堂堂皇皇的",
    "弯腰驼背的",
    "华美的",
    "迷人的",
    "猫眼状的",
    "闪亮的眼睛",
  ];

  static traitsSet = [
    "浪漫",
    "不友善的",
    "好色",
    "冷漠",
    "傲慢",
    "无情",
    "挑剔",
    "固执",
    "自负",
    "心不在焉",
    "反复无常",
    "好斗",
    "粗鄙",
    "虐待狂",
    "神经质",
    "过分讲究",
    "挥霍",
    "强迫",
    "矫揉造作",
    "自恋",
    "犹豫",
    "吝啬",
    "不稳定",
    "掠夺成性",
    "鲁莽",
    "悲惨的",
    "嫉妒的",
    "无礼的",
    "武断的",
    "快活的",
    "极端的",
    "精密计算的",
    "吹嘘的",
    "残忍的",
    "讨厌的",
    "糟糕的",
    "着迷",
    "敏感的",
    "和蔼可亲的",
    "有耐心的",
    "敏锐的",
    "幽默的",
    "亲切的",
    "活泼的",
    "机智的",
    "有秩序的",
    "整洁的",
    "好奇的",
    "清醒的",
    "受过教育的",
    "精确",
    "即兴",
    "稳定",
    "有野心",
    "专制",
    "严厉",
    "要求多",
    "真诚",
    "欺骗",
    "忠诚",
    "粗鲁",
    "好争吵",
    "尖酸刻薄",
    "难以宽恕",
    "粗糙",
    "不耐烦",
    "强烈",
    "杀人的",
    "疯狂的",
    "无忧无虑",
    "严格",
    "狡猾",
    "心不在焉",
    "神秘",
    "不道德的",
    "尴尬",
    "冷静",
    "挫折",
    "亲切",
    "操控他人",
    "瘾君子",
    "完美主义者",
    "放松",
    "骄傲",
    "讽刺",
    "保守",
    "紧张",
    "虚荣",
    "嗜血",
    "急躁",
    "谨慎",
    "精力充沛",
    "冲动",
    "物质主义",
    "轻浮",
    "做作",
    "冷酷",
    "偏执",
    "过度情绪",
    "无情绪",
  ];

  static spellsSet = ["1d4+1", "1d6+1d4+2", "3d6+4", "4d6+10"];
  static SourcesOfPowerSet = [
    `神话生物
	与神话生物如深潜者，人面鼠，修格斯，星之吸血鬼等有某种形式的关联。
	为了某种形式的服务或牺牲，怪兽保护并帮助教派领袖。`,
    `文物
	赋予法术般的能力，防护，攻击方式或类似的物品(如充当魔法点数或什至POW点数的存储装置)。该文物可能来自地球之外或远古时代。`,
    `科技
	也许来自Xoth (克苏鲁在来到地球前的家)，可能来自另一个维度或另一个世界，这种装置可能提供法术般效能，存储魔法点数，可能是魔法武器，或者如盔甲一般提供防护。`,
    `授予的力量
	某种形式的「祝福」，由克苏鲁或其仆从植入教派领袖的心灵中。这种力量可能复制相同或降低的法术效果(通常为一半)所消耗的魔法点数或POW。这种力量也可能是另外的形式。
	某种形式的物理或感官变化：触手从脸部或身体上生长，某种形式的物理或感官变化：触手从脸部或身体上生长，鳞状皮肤护甲，高度的感官等等。`,
  ];

  static CultWants = [
    `财富
	无论是海洋中的金子、金融预测，还是宝贵的古代文物，邪教都相信克苏鲁会赋予某种形式的财富。这可能是对个人或团体具有特定且有帮助的东西。不要低估金钱的力量——它可以驱使人们做出最卑劣的行为。`,
    `魔法力量
	了解强大的咒语和仪式。这样的魔法可能提供宝贵的洞察宇宙（高等学问）的知识，或者可能是控制和/或杀死他人——通过魔法掌控生命的力量。揭示现实秘密是一种令人陶醉且引人入胜的酒，许多人都会希望飨饱其间。或许，获得魔法力量是达成更大目标的手段。`,
    `欲望
	可能意指伴侣关系或身体欲望和欲望。世界上有很多孤独的人，他们几乎可以为了与他人建立联系而做任何事。有些人沉迷于极致的快感，在邪教中成为会员，可以使他们的行为和欲望合法化。`,
    `救赎
	克苏鲁的崛起将带来前所未有的恐惧和破坏。有些人相信，通过安抚克苏鲁，他们将能够从这场大灾难中幸免于难，他们是那些将在克苏鲁的统治下开创新时代的被选择者。现在邪教所做的是让人们购买他们所谓的拯救。`,
    `权力控制他人
	控制其他人：个人，一个组织，一个社区，一个城市，一个国家等。使人们顺从邪教的意志是其使命的关键。也许是通过魔法，洗脑，或是微妙的条件制造。邪教希望人们为他们效力，这可能是为了推动某种计划，或者只是邪教所认为克苏鲁要求的。
	`,
    `宇宙理解
	真理的追寻者，无论这真理有多惊悚或诅咒。"真理"有时候是主观的 - 主观越强，创造一个吸引人的故事就越好。知识就是力量。谁知道深入探索神话之谜会带来什么结果。`,
    `暴力
	有些人希望看到世界燃烧。这些邪教徒以克苏鲁的名义杀人和伤害人。他们将自己的行为视为最终的自由，放弃道德以在克苏鲁的桌旁获得一席之地 - 他们相信他们是人类发展的下一阶段的先驱。有些人可能使用暴力作为实施更大计划的手段，而其他人则将其用作掩盖更可怕真相的幌子。`,
    `寻找解决方案
	看似善意的目标，如治疗疾病，清除腐败的权威，理解人类行为 - 这些目标却被克苏鲁的影响扭曲和腐败。善意的愿望走向了黑暗。`,
    `恶习上瘾
	为了满足某种成瘾，无论是平凡的(药物，赌博，权力等)或是源自神话（魔法，知识，变革等）。对某物成瘾的人可能更容易被控制——这个邪教想要控制它的成员。`,
    `爱
	不要与肉体的亲密混淆，爱是大多数人的强大驱动力。一个邪教可能利用对家人，伴侣，或者友情的爱来控制人们。也许爱的目标已经以某种方式扭曲了。也许这个邪教是出于对人类的爱而行动，以非常错误的方式试图「拯救」世界。`,
  ];
  //手指
  static CultMeans = [
    `牺牲
		为了某种目的，教派信徒牺牲活的人类和/或动物。这可能是为了证明他们的忠诚，作为某种力量的来源，或是大计划的一部分。`,
    `仪式
		为了进行一种或多种形式的仪式，需要一小群或大量的参与者。仪式可能完全为教派服务，或者是满足克苏鲁的意志以完成某事（无论大小）。`,
    `集结
		可能是收集知识（神祕学典籍）, 特定的资源，什至是特定的人。教派必须为了克苏鲁只知的理由收集「某物」。`,
    `服务
		通过服务神祕神灵—与克苏鲁有连结的一个， 教派正在满足克苏鲁的意志。作为回报，教派将以某种方式得到实体的帮助。或者，教派已深陷于此实体之中，必须服从其命令。也许这个实体与克苏鲁没有实际的连结，但它宣称有连结只是为了对教派获得更多的权力。`,
    `创造
	这个邪教被命令要建造些什么。这可能是一个魔法之门，一个神秘的工艺品，一个可以集中巨大力量的地方，或者是一个寺庙。也许它只是创建一个秘密网络，以便有一天接管一个城镇，一个城市，一个国家，或者是世界。`,
    `摧毁
	邪教被命令去摧毁某物——也许是那些阻碍，激怒，或者伤害克苏鲁的东西。这可能是摧毁一座古老的寺庙，一个神秘的屏障，或者是推翻一个与克苏鲁的目标相牴触的政府或组织。`,
    `转变
	邪教徒必须进行转变——无论身体还是心灵。人类的能力有限，无法完成克苏鲁的目标，或者对于即将到来的世界太过脆弱，所以邪教徒寻求将自己转变成更强大的存在。这可能是人类进化的新阶段，或者是与神话同化，就像深海族那样。`,
    `追猎并杀死
	摧毁克苏鲁的敌人，如某些人类的派系或另一个像那些上古之物这样的神话种族，他们的行为是对抗的。这样的存在可能成为克苏鲁恐怖计划的问题。也许在追捕和杀死他们的目标时，邪教会得到些回报：吃掉他们的杀戮能给他们提供神话力量或洞见等等。`,
  ];
}

const oldArr = [15, 20, 40, 50, 60, 70, 80];
const DebuffArr = [5, 0, 5, 10, 20, 40, 80];
const AppDebuffArr = [0, 0, 5, 10, 15, 20, 25];
const EDUincArr = [0, 1, 2, 3, 4, 4, 4];

const OldArr2020 = [7, 8, 9, 10, 11, 12, 13, 14];
const EDUincArr2020 = [5, 10, 15, 20, 25, 30, 35, 40];

const PersonalDescriptionArr = [
  "结实的",
  "英俊的",
  "粗鄙的",
  "机灵的",
  "迷人的",
  "娃娃脸的",
  "聪明的",
  "蓬头垢面的",
  "愚钝的",
  "肮脏的",
  "耀眼的",
  "有书卷气的",
  "青春洋溢的",
  "感觉疲惫的",
  "丰满的",
  "粗壮的",
  "毛发茂盛的",
  "苗条的",
  "优雅的",
  "邋遢的",
  "敦实的",
  "苍白的",
  "阴沉的",
  "平庸的",
  "脸色红润的",
  "皮肤黝黑色",
  "满脸皱纹的",
  "古板的",
  "有狐臭的",
  "狡猾的",
  "健壮的",
  "娇俏的",
  "筋肉发达的",
  "魁梧的",
  "迟钝的",
  "虚弱的",
];
const IdeologyBeliefsArr = [
  "虔诚信仰着某个神祈",
  "觉得人类不需要依靠宗教也可以好好生活",
  "觉得科学可以解释所有事，并对某种科学领域有独特的兴趣",
  "相信因果循环与命运",
  "是一个政党、社群或秘密结社的成员",
  "觉得这个社会已经病了，而其中某些病灶需要被铲除",
  "是神秘学的信徒",
  "是积极参与政治的人，有特定的政治立场",
  "觉得金钱至上，且为了金钱不择手段",
  "是一个激进主义分子，活跃于社会运动",
];
const SignificantPeopleArr = [
  "他的父母",
  "他的祖父母",
  "他的兄弟姐妹",
  "他的孩子",
  "他的另一半",
  "那位曾经教导调查员最擅长的技能（点数最高的职业技能）的人",
  "他的儿时好友",
  "他心目中的偶像或是英雄",
  "在游戏中的另一位调查员",
  "一个由KP指定的NPC",
];
const SignificantPeopleWhyArr = [
  "调查员在某种程度上受了他的帮助，欠了人情",
  "调查员从他那里学到了些什么重要的东西",
  "他给了调查员生活的意义",
  "调查员曾经伤害过他，寻求他的原谅",
  "和他曾有过无可磨灭的经验与回忆",
  "调查员想要对他证明自己",
  "调查员崇拜着他",
  "调查员对他有着某些使调查员后悔的过往",
  "调查员试图证明自己和他不同，比他更出色",
  "他让调查员的人生变得乱七八糟，因此调查员试图复仇",
];
const MeaningfulLocationsArr = [
  "过去就读的学校",
  "他的故乡",
  "与他的初恋之人相遇之处",
  "某个可以安静沉思的地方",
  "某个类似酒吧或是熟人的家那样的社交场所",
  "与他的信念息息相关的地方",
  "埋葬着某个对调查员别具意义的人的墓地",
  "他从小长大的那个家",
  "他生命中最快乐时的所在",
  "他的工作场所",
];
const TreasuredPossessionsArr = [
  "一个与他最擅长的技能（点数最高的职业技能）相关的物品",
  "一件他的在工作上需要用到的必需品",
  "一个从他童年时就保存至今的宝物",
  "一样由调查员最重要的人给予他的物品",
  "一件调查员珍视的搜藏品",
  "一件调查员无意间发现，但不知道到底是什么的东西，调查员正努力寻找答案",
  "某种体育用品",
  "一把特别的武器",
  "他的宠物",
];
const TraitsArr = [
  "慷慨大方的人",
  "对动物很友善的人",
  "善于梦想的人",
  "享乐主义者",
  "甘冒风险的赌徒或冒险者",
  "善于料理的人",
  "万人迷",
  "忠心耿耿的人",
  "有好名声的人",
  "充满野心的人",
];

/**
 * COC恐懼表
 */
const cocmadnessrt = [
  [
    "1) 失忆（Amnesia）：调查员完全忘记了自上个安全地点以来的所有记忆。对他们而言，似乎一瞬间还在享用早餐，下一瞬却面对着可怕的怪物。",
  ],
  [
    "2) 假性残疾（Psychosomatic Disability）：调查员经历着心理上的失明、失聪或肢体缺失感，陷入无法自拔的困境。",
  ],
  [
    "3) 暴力倾向（Violence）：调查员在一阵狂暴中失去理智，对周围的敌人与友方展开毫不留情的攻击。",
  ],
  [
    "4) 偏执（Paranoia）：调查员经历着深重的偏执妄想，感觉到每个人都在暗中对他们施加威胁！没有一个人可被信任！他们被无形的目光监视；有人将他们背叛；所见的一切皆是诡计，万事皆虚。",
  ],
  [
    "5) 人际依赖（Significant Person）：守秘人细心检视调查员背景中的重要人物条目。调查员误将场景中的另一人视为其重要人物，并基于这种错误的认知行动。",
  ],
  ["6) 昏厥（Faint）：调查员突然失去意识，陷入短暂的昏迷。"],
  [
    "7) 逃避行为（Flee in Panic）：调查员在极度恐慌中，无论如何都想逃离当前的境地，即使这意味着夺走唯一的交通工具而撇下他人。",
  ],
  [
    "8) 歇斯底里（Physical Hysterics or Emotional Outburst）：调查员在情绪的漩涡中崩溃，表现出无法控制的大笑、哭泣或尖叫等极端情感。",
  ],
  [
    "9) 恐惧（Phobia）：调查员突如其来地产生一种新的恐惧症，例如幽闭恐惧症、恶灵恐惧症或蟑螂恐惧症。即使恐惧的来源并不在场，他们在接下来的轮数中仍会想象其存在，所有行动都将受到惩罚骰的影响。",
  ],
  [
    "10) 狂躁（Mania）：调查员获得一种新的狂躁症，例如严重的洁癖强迫症、非理性的说谎强迫症或异常喜爱蠕虫的强迫症。在接下来的轮数内，他们会不断追求满足这种狂躁，所有行动都将受到惩罚骰的影响。",
  ],
];

const cocmadnesssu = [
  [
    "1) 失忆（Amnesia）：调查员回过神来，发现自己身处一个陌生的境地，完全忘记了自己的身份。记忆将随着时间的推移逐渐恢复。",
  ],
  [
    "2) 被盗（Robbed）：调查员在恢复意识后，惊觉自己遭到盗窃，身体却无恙。如果他们携带了珍贵之物（见调查员背景），则需进行幸运检定以决定是否被窃取。其他所有有价值的物品则自动消失。",
  ],
  [
    "3) 遍体鳞伤（Battered）：调查员在醒来后，发现自己满身是伤，瘀伤累累。生命值减少至疯狂前的一半，但不会造成重伤。他们并未遭到盗窃，伤害的来源由守秘人决定。",
  ],
  [
    "4) 暴力倾向（Violence）：调查员陷入一场强烈的暴力与破坏的狂潮。当他们回过神来时，可能会意识到自己所做的事情，也可能完全失去记忆。调查员施加暴力的对象，以及是否造成死亡或仅仅是伤害，均由守秘人决定。",
  ],
  [
    "5) 极端信念（Ideology/Beliefs）：查看调查员背景中的信仰与信念。调查员将以极端且疯狂的方式表现出某种信念。例如，一位虔诚的信徒可能会在地铁上高声传道。",
  ],
  [
    "6) 重要之人（Significant People）：考虑调查员背景中对其至关重要的人物及其原因。在那1D10小时或更久的时间内，调查员曾不顾一切地接近那个人，并努力加深彼此的关系。",
  ],
  [
    "7) 被收容（Institutionalized）：调查员在精神病院病房或警察局牢房中醒来，慢慢回想起导致自己被关押的经过。",
  ],
  [
    "8) 逃避行为（Flee in panic）：调查员恢复意识时，发现自己身处遥远的地方，可能迷失在荒野，或是在开往未知目的地的列车或长途巴士上。",
  ],
  [
    "9) 恐惧（Phobia）：调查员突然获得一种新的恐惧症。掷1D100以决定具体的恐惧症状，或由守秘人选择。调查员醒来后，会开始采取各种措施以避开恐惧的源头。",
  ],
  [
    "10) 狂躁（Mania）：调查员获得一种新的狂躁症。在表中掷1D100以决定具体的狂躁症状，或由守秘人选择。在这次疯狂的发作中，调查员将全然沉浸于新的狂躁症状中。该症状是否对他人可见则取决于守秘人和调查员。",
  ],
];

const cocPhobias = [
  ["1) 沐浴癖（Ablutomania）：执着于清洗自己。"],
  ["2) 犹豫癖（Aboulomania）：病态地犹豫不定。"],
  ["3) 喜暗狂（Achluomania）：对黑暗的过度热爱。"],
  ["4) 喜高狂（Acromaniaheights）：狂热迷恋高处。"],
  ["5) 亲切癖（Agathomania）：病态地对他人友好。"],
  ["6) 喜旷症（Agromania）：强烈地倾向于待在开阔空间中。"],
  ["7) 喜尖狂（Aichmomania）：痴迷于尖锐或锋利的物体。"],
  ["8) 恋猫狂（Ailuromania）：近乎病态地对猫友善。"],
  ["9) 疼痛癖（Algomania）：痴迷于疼痛。"],
  ["10) 喜蒜狂（Alliomania）：痴迷于大蒜。"],
  ["11) 乘车癖（Amaxomania）：痴迷于乘坐车辆。"],
  ["12) 欣快癖（Amenomania）：不正常地感到喜悦。"],
  ["13) 喜花狂（Anthomania）：痴迷于花朵。"],
  ["14) 计算癖（Arithmomania）：狂热地痴迷于数字。"],
  ["15) 消费癖（Asoticamania）：鲁莽冲动地消费。"],
  ["16) 隐居癖（Eremiomania）：过度地热爱独自隐居。"],
  ["17) 芭蕾癖（Balletmania）：痴迷于芭蕾舞。"],
  ["18) 窃书癖（Biliokleptomania）：无法克制偷窃书籍的冲动。"],
  ["19) 恋书狂（Bibliomania）：痴迷于书籍和/或阅读"],
  ["20) 磨牙癖（Bruxomania）：无法克制磨牙的冲动。"],
  ["21) 灵臆症（Cacodemomania）：病态地坚信自己已被一个邪恶的灵体占据。"],
  ["22) 美貌狂（Callomania）：痴迷于自身的美貌。"],
  ["23) 地图狂（Cartacoethes）：在何时何处都无法控制查阅地图的冲动。"],
  ["24) 跳跃狂（Catapedamania）：痴迷于从高处跳下。"],
  ["25) 喜冷症（Cheimatomania）：对寒冷或寒冷的物体的反常喜爱。"],
  ["26) 舞蹈狂（Choreomania）：无法控制地起舞或发颤。"],
  ["27) 恋床癖（Clinomania）：过度地热爱待在床上。"],
  ["28) 恋墓狂（Coimetormania）：痴迷于墓地。"],
  ["29) 色彩狂（Coloromania）：痴迷于某种颜色。"],
  ["30) 小丑狂（Coulromania）：痴迷于小丑。"],
  ["31) 恐惧狂（Countermania）：执着于经历恐怖的场面。"],
  ["32) 杀戮癖（Dacnomania）：痴迷于杀戮。"],
  ["33) 魔臆症（Demonomania）：病态地坚信自己已被恶魔附身。"],
  ["34) 抓挠癖（Dermatillomania）：执着于抓挠自己的皮肤。"],
  ["35) 正义狂（Dikemania）：痴迷于目睹正义被伸张。"],
  ["36) 嗜酒狂（Dipsomania）：反常地渴求酒精。"],
  ["37) 毛皮狂（Doramania）：痴迷于拥有毛皮。"],
  ["38) 赠物癖（Doromania）：痴迷于赠送礼物。"],
  ["39) 漂泊症（Drapetomania）：执着于逃离。"],
  ["40) 漫游癖（Ecdemiomania）：执着于四处漫游。"],
  ["41) 自恋狂（Egomania）：近乎病态地以自我为中心或自我崇拜。"],
  ["42) 职业狂（Empleomania）：对于工作的无尽病态渴求。"],
  ["43) 臆罪症（Enosimania）：病态地坚信自己带有罪孽。"],
  ["44) 学识狂（Epistemomania）：痴迷于获取学识。"],
  ["45) 静止癖（Eremiomania）：执着于保持安静。"],
  ["46) 乙醚上瘾（Etheromania）：渴求乙醚。"],
  ["47) 求婚狂（Gamomania）：痴迷于进行奇特的求婚。"],
  ["48) 狂笑癖（Geliomania）：无法自制地，强迫性的大笑。"],
  ["49) 巫术狂（Goetomania）：痴迷于女巫与巫术。"],
  ["50) 写作癖（Graphomania）：痴迷于将每一件事写下来。"],
  ["51) 裸体狂（Gymnomania）：执着于裸露身体。"],
  [
    "52) 妄想狂（Habromania）：近乎病态地充满愉快的妄想（而不顾现实状况如何）。",
  ],
  ["53) 蠕虫狂（Helminthomania）：过度地喜爱蠕虫。"],
  ["54) 枪械狂（Hoplomania）：痴迷于火器。"],
  ["55) 饮水狂（Hydromania）：反常地渴求水分。"],
  ["56) 喜鱼癖（Ichthyomania）：痴迷于鱼类。"],
  ["57) 图标狂（Iconomania）：痴迷于图标与肖像"],
  ["58) 偶像狂（Idolomania）：痴迷于什至愿献身于某个偶像。"],
  ["59) 信息狂（Infomania）：痴迷于积累各种信息与资讯。"],
  ["60) 射击狂（Klazomania）：反常地执着于射击。"],
  ["61) 偷窃癖（Kleptomania）：反常地执着于偷窃。"],
  ["62) 噪音癖（Ligyromania）：无法自制地执着于制造响亮或刺耳的噪音。"],
  ["63) 喜线癖（Linonomania）：痴迷于线绳。"],
  ["64) 彩票狂（Lotterymania）：极端地执着于购买彩票。"],
  ["65) 抑郁症（Lypemania）：近乎病态的重度抑郁倾向。"],
  [
    "66) 巨石狂（Megalithomania）：当站在石环中或立起的巨石旁时，就会近乎病态地写出各种奇怪的创意。",
  ],
  ["67) 旋律狂（Melomania）：痴迷于音乐或一段特定的旋律。"],
  ["68) 作诗癖（Metromania）：无法抑制地想要不停作诗。"],
  ["69) 憎恨癖（Misomania）：憎恨一切事物，痴迷于憎恨某个事物或团体。"],
  ["70) 偏执狂（Monomania）：近乎病态地痴迷与专注某个特定的想法或创意。"],
  ["71) 夸大癖（Mythomania）：以一种近乎病态的程度说谎或夸大事物。"],
  ["72) 臆想症（Nosomania）：妄想自己正在被某种臆想出的疾病折磨。"],
  ["73) 记录癖（Notomania）：执着于记录一切事物（例如摄影）"],
  ["74) 恋名狂（Onomamania）：痴迷于名字（人物的、地点的、事物的）"],
  ["75) 称名癖（Onomatomania）：无法抑制地不断重复某个词语的冲动。"],
  ["76) 剔指癖（Onychotillomania）：执着于剔指甲。"],
  ["77) 恋食癖（Opsomania）：对某种食物的病态热爱。"],
  ["78) 抱怨癖（Paramania）：一种在抱怨时产生的近乎病态的愉悦感。"],
  ["79) 面具狂（Personamania）：执着于佩戴面具。"],
  ["80) 幽灵狂（Phasmomania）：痴迷于幽灵。"],
  ["81) 谋杀癖（Phonomania）：病态的谋杀倾向。"],
  ["82) 渴光癖（Photomania）：对光的病态渴求。"],
  ["83) 背德癖（ASPD）：病态地渴求违背社会道德。"],
  ["84) 求财癖（Plutomania）：对财富的强迫性的渴望。"],
  ["85) 欺骗狂（Pseudomania）：无法抑制的执着于撒谎。"],
  ["86) 纵火狂（Pyromania）：执着于纵火。"],
  ["87) 提问狂（Questiong-Asking Mania）：执着于提问。"],
  ["88) 挖鼻癖（Rhinotillexomania）：执着于挖鼻子。"],
  ["89) 涂鸦癖（Scribbleomania）：沉迷于涂鸦。"],
  [
    "90) 列车狂（Siderodromomania）：认为火车或类似的依靠轨道交通的旅行方式充满魅力。",
  ],
  ["91) 臆智症（Sophomania）：臆想自己拥有难以置信的智慧。"],
  ["92) 科技狂（Technomania）：痴迷于新的科技。"],
  ["93) 臆咒狂（Thanatomania）：坚信自己已被某种死亡魔法所诅咒。"],
  ["94) 臆神狂（Theomania）：坚信自己是一位神灵。"],
  ["95) 抓挠癖（Titillomaniac）：抓挠自己的强迫倾向。"],
  ["96) 手术狂（Tomomania）：对进行手术的不正常爱好。"],
  ["97) 拔毛癖（Trichotillomania）：执着于拔下自己的头发。"],
  ["98) 臆盲症（Typhlomania）：病理性的失明。"],
  ["99) 嗜外狂（Xenomania）：痴迷于异国的事物。"],
  ["100) 喜兽癖（Zoomania）：对待动物的态度近乎疯狂地友好。"],
];

const cocManias = [
  ["1) 洗澡恐惧症（Ablutophobia）：对于洗涤或洗澡的恐惧。"],
  ["2) 恐高症（Acrophobia）：对于身处高处的恐惧。"],
  ["3) 飞行恐惧症（Aerophobia）：对飞行的恐惧。"],
  ["4) 广场恐惧症（Agoraphobia）：对于开放的（拥挤）公共场所的恐惧。"],
  ["5) 恐鸡症（Alektorophobia）：对鸡的恐惧。"],
  ["6) 大蒜恐惧症（Alliumphobia）：对大蒜的恐惧。"],
  ["7) 乘车恐惧症（Amaxophobia）：对于乘坐地面载具的恐惧。"],
  ["8) 恐风症（Ancraophobia）：对风的恐惧。"],
  ["9) 男性恐惧症（Androphobia）：对于成年男性的恐惧。"],
  ["10) 恐英症（Anglophobia）：对英格兰或英格兰文化的恐惧。"],
  ["11) 恐花症（Anthophobia）：对花的恐惧。"],
  ["12) 截肢者恐惧症（Apotemnophobia）：对截肢者的恐惧。"],
  ["13) 蜘蛛恐惧症（Arachnophobia）：对蜘蛛的恐惧。"],
  ["14) 闪电恐惧症（Astraphobia）：对闪电的恐惧。"],
  ["15) 废墟恐惧症（Atephobia）：对遗迹或残址的恐惧。"],
  ["16) 长笛恐惧症（Aulophobia）：对长笛的恐惧。"],
  ["17) 细菌恐惧症（Bacteriophobia）：对细菌的恐惧。"],
  ["18) 导弹/子弹恐惧症（Ballistophobia）：对导弹或子弹的恐惧。"],
  ["19) 跌落恐惧症（Basophobia）：对于跌倒或摔落的恐惧。"],
  ["20) 书籍恐惧症（Bibliophobia）：对书籍的恐惧。"],
  ["21) 植物恐惧症（Botanophobia）：对植物的恐惧。"],
  ["22) 美女恐惧症（Caligynephobia）：对美貌女性的恐惧。"],
  ["23) 寒冷恐惧症（Cheimaphobia）：对寒冷的恐惧。"],
  ["24) 恐钟表症（Chronomentrophobia）：对于钟表的恐惧。"],
  ["25) 幽闭恐惧症（Claustrophobia）：对于处在封闭的空间中的恐惧。"],
  ["26) 小丑恐惧症（Coulrophobia）：对小丑的恐惧。"],
  ["27) 恐犬症（Cynophobia）：对狗的恐惧。"],
  ["28) 恶魔恐惧症（Demonophobia）：对邪灵或恶魔的恐惧。"],
  ["29) 人群恐惧症（Demophobia）：对人群的恐惧。"],
  ["30) 牙科恐惧症①（Dentophobia）：对牙医的恐惧。"],
  ["31) 丢弃恐惧症（Disposophobia）：对于丢弃物件的恐惧（贮藏癖）。"],
  ["32) 皮毛恐惧症（Doraphobia）：对动物皮毛的恐惧。"],
  ["33) 过马路恐惧症（Dromophobia）：对于过马路的恐惧。"],
  ["34) 教堂恐惧症（Ecclesiophobia）：对教堂的恐惧。"],
  ["35) 镜子恐惧症（Eisoptrophobia）：对镜子的恐惧。"],
  ["36) 针尖恐惧症（Enetophobia）：对针或大头针的恐惧。"],
  ["37) 昆虫恐惧症（Entomophobia）：对昆虫的恐惧。"],
  ["38) 恐猫症（Felinophobia）：对猫的恐惧。"],
  ["39) 过桥恐惧症（Gephyrophobia）：对于过桥的恐惧。"],
  ["40) 恐老症（Gerontophobia）：对于老年人或变老的恐惧。"],
  ["41)恐女症（Gynophobia）：对女性的恐惧。"],
  ["42) 恐血症（Haemaphobia）：对血的恐惧。"],
  ["43) 宗教罪行恐惧症（Hamartophobia）：对宗教罪行的恐惧。"],
  ["44) 触摸恐惧症（Haphophobia）：对于被触摸的恐惧。"],
  ["45) 爬虫恐惧症（Herpetophobia）：对爬行动物的恐惧。"],
  ["46) 迷雾恐惧症（Homichlophobia）：对雾的恐惧。"],
  ["47) 火器恐惧症（Hoplophobia）：对火器的恐惧。"],
  ["48) 恐水症（Hydrophobia）：对水的恐惧。"],
  ["49) 催眠恐惧症①（Hypnophobia）：对于睡眠或被催眠的恐惧。"],
  ["50) 白袍恐惧症（Iatrophobia）：对医生的恐惧。"],
  ["51) 鱼类恐惧症（Ichthyophobia）：对鱼的恐惧。"],
  ["52) 蟑螂恐惧症（Katsaridaphobia）：对蟑螂的恐惧。"],
  ["53) 雷鸣恐惧症（Keraunophobia）：对雷声的恐惧。"],
  ["54) 蔬菜恐惧症（Lachanophobia）：对蔬菜的恐惧。"],
  ["55) 噪音恐惧症（Ligyrophobia）：对刺耳噪音的恐惧。"],
  ["56) 恐湖症（Limnophobia）：对湖泊的恐惧。"],
  ["57) 机械恐惧症（Mechanophobia）：对机器或机械的恐惧。"],
  ["58) 巨物恐惧症（Megalophobia）：对于庞大物件的恐惧。"],
  ["59) 捆绑恐惧症（Merinthophobia）：对于被捆绑或紧缚的恐惧。"],
  ["60) 流星恐惧症（Meteorophobia）：对流星或陨石的恐惧。"],
  ["61) 孤独恐惧症（Monophobia）：对于一人独处的恐惧。"],
  ["62) 不洁恐惧症（Mysophobia）：对污垢或污染的恐惧。"],
  ["63) 粘液恐惧症（Myxophobia）：对粘液（史莱姆）的恐惧。"],
  ["64) 尸体恐惧症（Necrophobia）：对尸体的恐惧。"],
  ["65) 数字8恐惧症（Octophobia）：对数字8的恐惧。"],
  ["66) 恐牙症（Odontophobia）：对牙齿的恐惧。"],
  ["67) 恐梦症（Oneirophobia）：对梦境的恐惧。"],
  ["68) 称呼恐惧症（Onomatophobia）：对于特定词语的恐惧。"],
  ["69) 恐蛇症（Ophidiophobia）：对蛇的恐惧。"],
  ["70) 恐鸟症（Ornithophobia）：对鸟的恐惧。"],
  ["71) 寄生虫恐惧症（Parasitophobia）：对寄生虫的恐惧。"],
  ["72) 人偶恐惧症（Pediophobia）：对人偶的恐惧。"],
  ["73) 吞咽恐惧症（Phagophobia）：对于吞咽或被吞咽的恐惧。"],
  ["74) 药物恐惧症（Pharmacophobia）：对药物的恐惧。"],
  ["75) 幽灵恐惧症（Phasmophobia）：对鬼魂的恐惧。"],
  ["76) 日光恐惧症（Phenogophobia）：对日光的恐惧。"],
  ["77) 胡须恐惧症（Pogonophobia）：对胡须的恐惧。"],
  ["78) 河流恐惧症（Potamophobia）：对河流的恐惧。"],
  ["79) 酒精恐惧症（Potophobia）：对酒或酒精的恐惧。"],
  ["80) 恐火症（Pyrophobia）：对火的恐惧。"],
  ["81) 魔法恐惧症（Rhabdophobia）：对魔法的恐惧。"],
  ["82) 黑暗恐惧症（Scotophobia）：对黑暗或夜晚的恐惧。"],
  ["83) 恐月症（Selenophobia）：对月亮的恐惧。"],
  ["84) 火车恐惧症（Siderodromophobia）：对于乘坐火车出行的恐惧。"],
  ["85) 恐星症（Siderophobia）：对星星的恐惧。"],
  ["86) 狭室恐惧症（Stenophobia）：对狭小物件或地点的恐惧。"],
  ["87) 对称恐惧症（Symmetrophobia）：对对称的恐惧。"],
  ["88) 活埋恐惧症（Taphephobia）：对于被活埋或墓地的恐惧。"],
  ["89) 公牛恐惧症（Taurophobia）：对公牛的恐惧。"],
  ["90) 电话恐惧症（Telephonophobia）：对电话的恐惧。"],
  ["91) 怪物恐惧症①（Teratophobia）：对怪物的恐惧。"],
  ["92) 深海恐惧症（Thalassophobia）：对海洋的恐惧。"],
  ["93) 手术恐惧症（Tomophobia）：对外科手术的恐惧。"],
  ["94) 十三恐惧症（Triskadekaphobia）：对数字13的恐惧症。"],
  ["95) 衣物恐惧症（Vestiphobia）：对衣物的恐惧。"],
  ["96) 女巫恐惧症（Wiccaphobia）：对女巫与巫术的恐惧。"],
  ["97) 黄色恐惧症（Xanthophobia）：对黄色或「黄」字的恐惧。"],
  ["98) 外语恐惧症（Xenoglossophobia）：对外语的恐惧。"],
  ["99) 异域恐惧症（Xenophobia）：对陌生人或外国人的恐惧。"],
  ["100) 动物恐惧症（Zoophobia）：对动物的恐惧。"],
];

async function dpRecordSwitch({ onOff = false, groupid = "", channelid = "" }) {
  try {
    let result = await schema.developmentConductor
      .findOneAndUpdate(
        {
          groupID: channelid || groupid,
        },
        {
          $set: {
            switch: onOff,
          },
        },
        {
          new: true,
          upsert: true,
          returnDocument: true,
        }
      )
      .catch((error) =>
        console.error("coc #673 mongoDB error: ", error.name, error.reson)
      );
    return `现在这频道的COC 成长记录功能为 ${result.switch ? "开启" : "关闭"}
以后CC掷骰将 ${result.switch ? "会" : "不会"}进行记录`;
  } catch (error) {
    console.error(`dpRecordSwitch ERROR ${error.message}`);
    return "发生错误";
  }
}

async function dpRecorder({
  userID = "",
  groupid = "",
  channelid = "",
  skillName = "",
  skillPer = 0,
  skillPerStyle = "",
  skillResult = 0,
  userName = "",
}) {
  if (!checkMongodb.isDbOnline()) return;
  try {
    let result = await schema.developmentConductor
      .findOne({
        groupID: channelid || groupid,
        switch: true,
      })
      .catch((error) => {
        console.error("coc #687 mongoDB error: ", error.name, error.reson);
        checkMongodb.dbErrOccurs();
      });
    if (!result) return;
    /**
     *
     * 检定成功 -> 检查有没有技能名字
     * 有	检查有没有重复的名字 有则覆蓋时间 和记錄结果
     * 没有则储存十个
     */
    if (skillName) {
      await schema.developmentRollingRecord
        .findOneAndUpdate(
          {
            groupID: channelid || groupid,
            userID: userID,
            skillName: skillName,
            skillPerStyle: "normal",
          },
          {
            date: Date.now(),
            skillPer: skillPer,
            skillResult: skillResult,
          },
          {
            new: true,
            upsert: true,
            returnDocument: true,
          }
        )
        .catch((error) =>
          console.error("coc #710 mongoDB error: ", error.name, error.reson)
        );
    } else {
      await schema.developmentRollingRecord
        .create({
          groupID: channelid || groupid,
          userID: userID,
          skillName: "",
          skillPerStyle: "normal",
          date: Date.now(),
          skillPer: skillPer,
          skillResult: skillResult,
        })
        .catch((error) =>
          console.error("coc #720 mongoDB error: ", error.name, error.reson)
        );
      let countNumber = await schema.developmentRollingRecord
        .find({
          groupID: channelid || groupid,
          userID: userID,
          skillName: "",
          skillPerStyle: "normal",
        })
        .countDocuments()
        .catch((error) =>
          console.error("coc #726 mongoDB error: ", error.name, error.reson)
        );
      if (countNumber > 10) {
        let moreThanTen = await schema.developmentRollingRecord
          .find({
            groupID: channelid || groupid,
            userID: userID,
            skillName: "",
            skillPerStyle: "normal",
          })
          .sort({ date: 1 })
          .limit(countNumber - 10)
          .catch((error) =>
            console.error("coc #733 mongoDB error: ", error.name, error.reson)
          );

        moreThanTen.forEach(async function (doc) {
          await schema.developmentRollingRecord
            .deleteOne({ _id: doc._id })
            .catch((error) =>
              console.error("coc #736 mongoDB error: ", error.name, error.reson)
            );
        });
      }
    }

    /**
     * 大成功大失败储存
     * 额外储存十次大成功大失败的记录
     */

    if (skillPerStyle == "criticalSuccess" || skillPerStyle == "fumble") {
      await schema.developmentRollingRecord
        .create({
          groupID: channelid || groupid,
          userID: userID,
          skillName: skillName,
          skillPerStyle: skillPerStyle,
          date: Date.now(),
          skillPer: skillPer,
          skillResult: skillResult,
          userName: userName,
        })
        .catch((error) =>
          console.error("coc #757 mongoDB error: ", error.name, error.reson)
        );
      let countNumber = await schema.developmentRollingRecord
        .find({
          groupID: channelid || groupid,
          userID: userID,
          skillPerStyle: skillPerStyle,
        })
        .countDocuments()
        .catch((error) =>
          console.error("coc #762 mongoDB error: ", error.name, error.reson)
        );
      if (countNumber > 10) {
        let moreThanTen = await schema.developmentRollingRecord
          .find({
            groupID: channelid || groupid,
            userID: userID,
            skillPerStyle: skillPerStyle,
          })
          .sort({ date: 1 })
          .limit(countNumber - 10)
          .catch((error) =>
            console.error("coc #768 mongoDB error: ", error.name, error.reson)
          );

        moreThanTen.forEach(async function (doc) {
          await schema.developmentRollingRecord
            .deleteOne({ _id: doc._id })
            .catch((error) =>
              console.error("coc #771 mongoDB error: ", error.name, error.reson)
            );
        });
      }
    }
  } catch (error) {
    console.error(`dpRecordSwitch ERROR ${error.message}`);
    return "发生错误";
  }

  /**
   * 行为
   * 打开后就开始记录CC CC1~2 CCN1~2 的结果
   *
   * 检定成功 -> 检查有没有技能名字
   * 有	检查有没有重复的名字 有则覆蓋时间 和记錄结果
   * 没有则储存十个
   *
   *
   * 大成功大失败储存
   * 额外储存十次大成功大失败的记录
   *
   */
}

function DevelopmentPhase(input) {
  let result = "";
  for (let index = 1; index < input.length; index++) {
    let target = "",
      text = "";
    if (!isNaN(input[index])) {
      target = input[index];
    } else continue;
    if (input[index + 1] && isNaN(input[index + 1])) {
      text = input[index + 1];
      index++;
    }
    result += everyTimeDevelopmentPhase(target, text) + "\n" + "\n";
  }
  return result;
}

function everyTimeDevelopmentPhase(target, text = "") {
  let result = "";
  target = Number(target);
  if (target > 1000) target = 1000;
  if (text == undefined) text = "";
  let skill = rollbase.Dice(100);
  let confident = target <= 89;
  if (target > 95) target = 95;
  if (skill >= 96 || skill > target) {
    let improved = rollbase.Dice(10);
    result =
      "成长或增强检定: " +
      text +
      "\n1D100 > " +
      target +
      "\n掷出: " +
      skill +
      " → 成功!\n你的技能增加" +
      improved +
      "点，现在是" +
      (target + improved) +
      "点。";
    if (confident && target + improved >= 90) {
      result += `\n调查员的技能提升到90%以上，他的当前理智值增加2D6 > ${
        rollbase.Dice(6) + rollbase.Dice(6)
      }点。
这一项奖励显示他经由精通一项技能而獲得自信。`;
    }
  } else {
    result =
      "成长或增强检定: " +
      text +
      "\n1D100 > " +
      target +
      "\n掷出: " +
      skill +
      " → 失败!\n你的技能没有变化!";
  }
  return result;
}
function ccrt() {
  let result = "";
  //let rollcc = Math.floor(Math.random() * 10);
  //let time = Math.floor(Math.random() * 10) + 1;
  //let PP = Math.floor(Math.random() * 100);
  let rollcc = rollbase.Dice(10) - 1;
  let time = rollbase.Dice(10);
  let PP = rollbase.Dice(100) - 1;
  if (rollcc <= 7) {
    result = cocmadnessrt[rollcc] + "\n症状持续" + time + "轮数";
  } else if (rollcc == 8) {
    result =
      cocmadnessrt[rollcc] +
      "\n症状持续" +
      time +
      "轮数" +
      " \n" +
      cocManias[PP];
  } else if (rollcc == 9) {
    result =
      cocmadnessrt[rollcc] +
      "\n症状持续" +
      time +
      "轮数" +
      " \n" +
      cocPhobias[PP];
  }
  return result;
}

function ccsu() {
  let result = "";
  let rollcc = rollbase.Dice(10) - 1;
  let time = rollbase.Dice(10);
  let PP = rollbase.Dice(100) - 1;
  if (rollcc <= 7) {
    result = cocmadnesssu[rollcc] + "\n症状持续" + time + "小时";
  } else if (rollcc == 8) {
    result =
      cocmadnesssu[rollcc] +
      "\n症状持续" +
      time +
      "小时" +
      " \n" +
      cocManias[PP];
  } else if (rollcc == 9) {
    result =
      cocmadnesssu[rollcc] +
      "\n症状持续" +
      time +
      "小时" +
      " \n" +
      cocPhobias[PP];
  }
  return result;
}

/**
 * COC6
 * @param {数字 如CB 80 的80} chack
 * @param {后面的文字,如侦查} text
 */
function coc6(chack, text) {
  let result = "";
  let temp = rollbase.Dice(100);
  if (temp == 100) result = "ccb<=" + chack + "\n" + temp + " → 啊！大失败！";
  else if (temp <= chack) result = "ccb<=" + chack + "\n" + temp + " → 成功";
  else result = "ccb<=" + chack + "\n" + temp + " → 失败";
  if (text) result += "；" + text;
  return result;
}

/**
 * COC7
 * @param {CC 80 的80} chack
 * @param {攻击等描述字眼} text
 */

async function coc7({
  chack,
  text = "",
  userid,
  groupid,
  channelid,
  userName,
}) {
  let result = "";
  let temp = rollbase.Dice(100);
  let skillPerStyle = "";
  let check = chack.split(",");
  let name = text.split(",");
  let checkNum = !check.some((i) => !Number.isInteger(Number(i)));
  if (!checkNum) return;
  if (check.length >= 2) result += "联合检定\n";
  for (let index = 0; index < check.length; index++) {
    switch (true) {
      case temp == 1: {
        result +=
          "1D100 ≦ " + check[index] + "　\n" + temp + " → 恭喜！大成功！";
        skillPerStyle = "criticalSuccess";
        break;
      }
      case temp == 100: {
        result = "1D100 ≦ " + check[index] + "　\n" + temp + " → 啊！大失败！";
        skillPerStyle = "fumble";
        break;
      }
      case temp >= 96 && check[index] <= 49: {
        result += "1D100 ≦ " + check[index] + "　\n" + temp + " → 啊！大失败！";
        skillPerStyle = "fumble";
        break;
      }
      case temp > check[index]: {
        result += "1D100 ≦ " + check[index] + "　\n" + temp + " → 失败";
        skillPerStyle = "failure";
        break;
      }
      case temp <= check[index] / 5: {
        result += "1D100 ≦ " + check[index] + "　\n" + temp + " → 极限成功";
        skillPerStyle = "normal";
        break;
      }
      case temp <= check[index] / 2: {
        result += "1D100 ≦ " + check[index] + "　\n" + temp + " → 困难成功";
        skillPerStyle = "normal";
        break;
      }
      case temp <= check[index]: {
        result += "1D100 ≦ " + check[index] + "　\n" + temp + " → 通常成功";
        skillPerStyle = "normal";
        break;
      }
      default:
        break;
    }

    if (text[index]) result += "：" + (name[index] || "");
    result += "\n\n";
    if (userid && groupid && skillPerStyle !== "failure") {
      await dpRecorder({
        userID: userid,
        groupid,
        channelid,
        skillName: name[index],
        skillPer: check[index],
        skillPerStyle,
        skillResult: temp,
        userName,
      });
    }
  }

  return result;
}

async function coc7chack({
  chack,
  temp,
  text = "",
  userid,
  groupid,
  channelid,
  userName,
  bpdiceNum,
}) {
  let result = "";
  let skillPerStyle = "";
  switch (true) {
    case temp == 1: {
      result = temp + " → 恭喜！大成功！";
      skillPerStyle = "criticalSuccess";
      break;
    }
    case temp == 100: {
      result = temp + " → 啊！大失败！";
      skillPerStyle = "fumble";
      break;
    }
    case temp >= 96 && chack <= 49: {
      result = temp + " → 啊！大失败！";
      skillPerStyle = "fumble";
      break;
    }
    case temp > chack: {
      result = temp + " → 失败";
      skillPerStyle = "failure";
      break;
    }
    case temp <= chack / 5: {
      result = temp + " → 极限成功";
      skillPerStyle = "success";
      break;
    }
    case temp <= chack / 2: {
      result = temp + " → 困难成功";
      skillPerStyle = "success";
      break;
    }
    case temp <= chack: {
      result = temp + " → 通常成功";
      skillPerStyle = "success";
      break;
    }
    default:
      break;
  }
  if (text) result += "：" + text;
  if (userid && groupid && skillPerStyle !== "failure" && bpdiceNum <= 0) {
    await dpRecorder({
      userID: userid,
      groupid,
      channelid,
      skillName: text,
      skillPer: chack,
      skillPerStyle,
      skillResult: temp,
      userName,
    });
  }
  return result;
}

async function coc7bp({
  chack,
  text,
  userid,
  groupid,
  channelid,
  bpdiceNum,
  userName,
}) {
  try {
    let result = "";
    let temp0 = rollbase.Dice(10) - 1;
    let countStr = "";
    let check = chack.split(",");
    let name = (text && text.split(",")) || [];
    let checkNum = !check.some((i) => !Number.isInteger(Number(i)));
    if (!checkNum) return;
    if (check.length >= 2) result += "联合检定\n";
    if (bpdiceNum > 0) {
      for (let i = 0; i <= bpdiceNum; i++) {
        let temp = rollbase.Dice(10);
        let temp2 = temp.toString() + temp0.toString();
        if (temp2 > 100) temp2 = parseInt(temp2) - 100;
        countStr = countStr + temp2 + "、";
      }
      countStr = countStr.substring(0, countStr.length - 1);
      let countArr = countStr.split("、");

      for (let index = 0; index < check.length; index++) {
        let finallyStr =
          countStr +
          " → " +
          (await coc7chack({
            chack: check[index],
            temp: Math.min(...countArr),
            text: name[index],
            userid,
            groupid,
            channelid,
            userName,
            bpdiceNum,
          }));
        result += "1D100 ≦ " + check[index] + "　\n" + finallyStr + "\n\n";
      }

      return result;
    }
    if (bpdiceNum < 0) {
      for (let i = 0; i <= Math.abs(bpdiceNum); i++) {
        let temp = rollbase.Dice(10);
        let temp2 = temp.toString() + temp0.toString();
        if (temp2 > 100) temp2 = parseInt(temp2) - 100;
        countStr = countStr + temp2 + "、";
      }
      countStr = countStr.substring(0, countStr.length - 1);
      let countArr = countStr.split("、");

      for (let index = 0; index < check.length; index++) {
        let finallyStr =
          countStr +
          " → " +
          (await coc7chack({
            chack: check[index],
            temp: Math.max(...countArr),
            text: name[index],
            userid,
            groupid,
            channelid,
            bpdiceNum,
          }));
        result += "1D100 ≦ " + check[index] + "  \n" + finallyStr + "\n\n";
      }
      return result;
    }
  } catch (error) {
    console.error("error coc #1536", error);
  }
}
function buildpulpchar() {
  let ReStr = "Pulp CoC 不使用年龄调整\n";
  //读取年龄
  ReStr += "\nＳＴＲ：" + rollbase.BuildDiceCal("3d6*5");
  ReStr += "\nＤＥＸ：" + rollbase.BuildDiceCal("3d6*5");
  ReStr += "\nＰＯＷ：" + rollbase.BuildDiceCal("3d6*5");

  ReStr += "\nＣＯＮ：" + rollbase.BuildDiceCal("3d4*5");
  ReStr += "\nＡＰＰ：" + rollbase.BuildDiceCal("3d6*5");
  ReStr += "\nＳＩＺ：" + rollbase.BuildDiceCal("(2d6+6)*5");
  ReStr += "\nＩＮＴ：" + rollbase.BuildDiceCal("(2d6+6)*5");

  ReStr += "\nＥＤＵ：" + rollbase.BuildDiceCal("(2d6+6)*5");
  ReStr += "\nＬＵＫ：" + rollbase.BuildDiceCal("(2d6+6)*5");
  ReStr += "\n核心属性：" + rollbase.BuildDiceCal("(1d6+13)*5");
  return ReStr;
}

/**
 * COC7傳统创角
 * @param {年龄} text
 */

/**
 * COC6傳统创角
 */

function build6char() {
  let ReStr = "六版核心创角：";
  ReStr += "\nＳＴＲ：" + rollbase.BuildDiceCal("3d6");
  ReStr += "\nＤＥＸ：" + rollbase.BuildDiceCal("3d6");
  ReStr += "\nＣＯＮ：" + rollbase.BuildDiceCal("3d6");
  ReStr += "\nＰＯＷ：" + rollbase.BuildDiceCal("3d6");
  ReStr += "\nＡＰＰ：" + rollbase.BuildDiceCal("3d6");
  ReStr += "\nＩＮＴ：" + rollbase.BuildDiceCal("(2d6+6)");
  ReStr += "\nＳＩＺ：" + rollbase.BuildDiceCal("(2d6+6)");
  ReStr += "\nＥＤＵ：" + rollbase.BuildDiceCal("(3d6+3)");
  ReStr += "\n年收入：" + rollbase.BuildDiceCal("(1d10)");
  ReStr +=
    "\n调查员的最小起始年龄等于EDU 6，每比起始年龄年老十年，\n调查员增加一点EDU并且加20点职业技能点数。\n当超过40岁后，每老十年，\n从STR,CON,DEX,APP中选择一个减少一点。";
  return ReStr;
}
//随机产生角色背景
function PcBG() {
  return (
    "背景描述生成器（仅供娱乐用，不具实际参考价值）\n=======\n调查员是一个" +
    PersonalDescriptionArr[rollbase.Dice(PersonalDescriptionArr.length) - 1] +
    "人。\n【信念】：说到这个人，他" +
    IdeologyBeliefsArr[rollbase.Dice(IdeologyBeliefsArr.length) - 1] +
    "。\n【重要之人】：对他来说，最重要的人是" +
    SignificantPeopleArr[rollbase.Dice(SignificantPeopleArr.length) - 1] +
    "，这个人对他来说之所以重要，是因为" +
    SignificantPeopleWhyArr[rollbase.Dice(SignificantPeopleWhyArr.length) - 1] +
    "。\n【意义非凡之地】：对他而言，最重要的地点是" +
    MeaningfulLocationsArr[rollbase.Dice(MeaningfulLocationsArr.length) - 1] +
    "。\n【宝贵之物】：他最宝贵的東西就是" +
    TreasuredPossessionsArr[rollbase.Dice(TreasuredPossessionsArr.length) - 1] +
    "。\n【特征】：总括来说，调查员是一个" +
    TraitsArr[rollbase.Dice(TraitsArr.length) - 1] +
    "。"
  );
}

class SanCheck {
  constructor(mainMsg, botname) {
    this.mainMsg = mainMsg;
    this.rollDice = rollbase.Dice(100);
    this.currentSan = this.getSanity(mainMsg[1]);
    this.scMode = this.getScMode(mainMsg[2]);
    this.sc = this.getSc(mainMsg[2]);
    this.rollSuccess = this.getRollSuccess(this.sc);
    this.rollFail = this.getRollFail(this.sc);
    this.lossSan = this.calculateLossSanity(this.rollSuccess, this.rollFail);
    this.buttonCreate = ["ccrt", "ccsu"];
    this.botname = botname;
  }

  getSanity(mainMsg) {
    const sanityMatch = mainMsg.match(/^\d+$/);
    return sanityMatch ? sanityMatch[0] : null;
  }

  getScMode(mainMsg) {
    return /\//.test(mainMsg || null);
  }

  getSc(mainMsg) {
    return this.scMode ? mainMsg && mainMsg.match(/^(.+)\/(.+)$/i) : null;
  }

  getRollSuccess(sc) {
    return sc && sc[1] ? sc[1].replace(/[^+\-*\dD]/gi, "") : null;
  }

  getRollFail(sc) {
    return sc && sc[2] ? sc[2].replace(/[^+\-*\dD]/gi, "") : null;
  }

  calculateLossSanity(rollSuccess = "", rollFail = "") {
    const parseRoll = (roll) => {
      try {
        return Math.max(rollbase.BuildDiceCal(roll).match(/\S+$/)?.[0], 0);
      } catch {}
      try {
        return Math.max(mathjs.evaluate(roll), 0);
      } catch {}
      return roll;
    };

    const rollSuccessLoss = parseRoll(rollSuccess) || 0;
    const rollFailLoss = parseRoll(rollFail) || 0;

    let rollFumbleLoss = rollFail;
    const regExp = /d/gi;
    try {
      rollFumbleLoss = mathjs.evaluate(rollFail.replace(regExp, "*"));
    } catch {}

    return {
      rollSuccessLoss,
      rollFailLoss,
      rollFumbleLoss,
    };
  }
  runDiscord() {
    let arr = [];
    let str = `手动San Check模式 \n 请选择要掷骰的方式\n  1d100 - 基本San Check\n`;
    this.scMode = this.getScMode(this.mainMsg[1]);
    this.sc = this.getSc(this.mainMsg[1]);
    this.rollSuccess = this.getRollSuccess(this.sc);
    this.rollFail = this.getRollFail(this.sc);
    if (this.rollSuccess) {
      str += ` ${this.rollSuccess} - 成功时San Check\n`;
      arr.push(this.rollSuccess);
    }
    if (this.rollFail) {
      str += ` ${this.rollFail} - 失败时San Check\n`;
      arr.push(this.rollFail);
    }
    this.buttonCreate.unshift("1d100", ...arr);
    return str;
  }
  run() {
    if (!this.currentSan && this.botname == "Discord") return this.runDiscord();
    if (!this.currentSan)
      return "请输入正确的San值，\n格式是 .sc 50 或 .sc 50 1/3 或 .sc 50 1d3+3/1d100";
    const diceFumble =
      this.rollDice === 100 ||
      (this.rollDice >= 96 && this.rollDice <= 100 && this.currentSan <= 49);
    const diceSuccess = this.rollDice <= this.currentSan;
    const diceFail = this.rollDice > this.currentSan;

    if (diceFumble) {
      return this.handleDiceFumble();
    } else if (diceSuccess) {
      return this.handleDiceSuccess();
    } else if (diceFail) {
      return this.handleDiceLoss();
    }

    //可接受输入: .sc 50	.sc 50 哈哈		.sc 50 1/3		.sc 50 1d3+3/1d100
    //scMode 代表会扣SC 或有正常输入扣SAN的数字
  }

  handleDiceFumble() {
    if (!this.scMode) {
      return `San Check\n1d100 ≦ ${this.currentSan}\n掷出:${this.rollDice} → 大失败!`;
    }
    if (this.rollFail) {
      let updatedSan =
        this.currentSan - this.lossSan.rollFumbleLoss < 0
          ? 0
          : this.currentSan - this.lossSan.rollFumbleLoss;
      return `San Check\n1d100 ≦ ${this.currentSan}\n掷出:${this.rollDice} → 大失败!\n失去${this.rollFail}最大值 ${this.lossSan.rollFumbleLoss}点San\n现在San值是${updatedSan}点`.replace(
        "是NaN点",
        " 算式错误，未能计算"
      );
    }
    return `San Check\n1d100 ≦ ${this.currentSan}\n掷出:${this.rollDice} → 大失败!`;
  }
  handleDiceSuccess() {
    //成功
    if (!this.scMode) {
      return `San Check\n1d100 ≦ ${this.currentSan}\n掷出:${this.rollDice} → 成功!`;
    }
    if (this.lossSan) {
      let updatedSan =
        this.currentSan - this.lossSan.rollSuccessLoss < 0
          ? 0
          : this.currentSan - this.lossSan.rollSuccessLoss;
      return `San Check\n1d100 ≦ ${this.currentSan}\n掷出:${this.rollDice} → 成功!\n失去${this.rollSuccess} → ${this.lossSan.rollSuccessLoss}点San\n现在San值是${updatedSan}点`.replace(
        "是NaN点",
        " 算式错误，未能计算"
      );
    } else
      return `San Check\n1d100 ≦ ${this.currentSan}\n掷出:${this.rollDice} → 成功!\n不需要减少San`;
  }
  handleDiceLoss() {
    if (!this.scMode) {
      return `San Check\n1d100 ≦ ${this.currentSan}\n掷出:${this.rollDice} → 失败!`;
    }
    if (this.lossSan) {
      let updatedSan =
        this.currentSan - this.lossSan.rollFailLoss < 0
          ? 0
          : this.currentSan - this.lossSan.rollFailLoss;
      return `San Check\n1d100 ≦ ${this.currentSan}\n掷出:${this.rollDice} → 失败!\n失去${this.rollFail} → ${this.lossSan.rollFailLoss}点San\n现在San值是${updatedSan}点`.replace(
        "是NaN点",
        " 算式错误，未能计算"
      );
    } else
      return `San Check\n1d100 ≦ ${this.currentSan}\n掷出:${this.rollDice} → 失败!\n但不需要减少San`;
  }
  getButton() {
    return this.buttonCreate;
  }
}

function chase() {
  let rply = `CoC 7ed追逐戰产生器\n`;
  let round = rollbase.Dice(5) + 5;
  for (let index = 0; index < round; index++) {
    rply += `${chaseGenerator(index)}\n========\n`;
  }
  return rply;
}
function chaseGenerator(num) {
  let rply = "";
  let chase = rollbase.Dice(100);
  let dangerMode = rollbase.Dice(2) == 1 ? true : false;
  switch (true) {
    case chase >= 96: {
      rply = `地点${num + 1} 极限难度 ${dangerMode ? "险境" : "障碍"}
			`;
      let itemsNumber = rollbase.DiceINT(2, 5);
      let result = shuffle(request);
      rply += `可能进行的检定: `;
      for (let index = 0; index < itemsNumber; index++) {
        rply += `${result[index]} `;
      }
      if (dangerMode) {
        rply += `
				失败 失去1D10严重事故HP伤害
				及 失去（1D3）点行动点`;
      } else {
        let blockhp = shuffle(blockHard);
        rply += `
				障碍物 HP${blockhp[0]}`;
      }
      //1D10嚴重事故
      //额外失去1（1D3）点行动点
      break;
    }
    case chase >= 85: {
      rply = `地点${num + 1} 困难难度 ${dangerMode ? "险境" : "障碍"}
			`;
      let itemsNumber = rollbase.DiceINT(2, 5);
      let result = shuffle(request);
      rply += `可能进行检定: `;
      for (let index = 0; index < itemsNumber; index++) {
        rply += `${result[index]} `;
      }
      if (dangerMode) {
        rply += `
				失败 失去1D6中度事故HP伤害
				及 失去（1D3）点行动点`;
      } else {
        let blockhp = shuffle(blockIntermediate);
        rply += `
				障碍物 HP${blockhp[0]}`;
      }
      //1D6中度事故
      //额外失去1（1D3）点行动点
      break;
    }
    case chase >= 60: {
      rply = `地点${num + 1} 一般难度 ${dangerMode ? "险境" : "障碍"}
			`;
      let itemsNumber = rollbase.DiceINT(2, 5);
      let result = shuffle(request);
      rply += `可能进行检定: `;
      for (let index = 0; index < itemsNumber; index++) {
        rply += `${result[index]} `;
      }
      if (dangerMode) {
        rply += `
				失败 失去1D3-1轻微事故HP伤害
				及 失去（1D3）点行动点`;
      } else {
        let blockhp = shuffle(blockEasy);
        rply += `
				障碍物 HP${blockhp[0]}`;
      }
      //1D3-1輕微事故
      //额外失去1（1D3）点行动点
      break;
    }
    default: {
      rply = `地点${num + 1} 没有险境/障碍`;
      break;
    }
  }
  return rply;
}

const request = [
  "攀爬",
  "游泳",
  "闪避",
  "力量",
  "敏捷",
  "跳跃",
  "锁匠",
  "攻击",
  "战技",
  "侦查",
  "幸运",
  "话术",
  "恐吓",
  "潜行",
  "心理学",
  "聆听",
];

const blockHard = [5, 5, 10, 10, 15, 15, 25, 50, 100];
const blockEasy = [5, 5, 5, 10, 10, 15];
const blockIntermediate = [5, 5, 10, 10, 15, 15, 25];

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function getOccupationSkill(state) {
  //state = [STR,DEX,....]
  let skillsPool = [];
  let skillResult = [];
  let CR = rollbase.Dice(8) - 1;
  for (let index = 0; index < 8; index++) {
    let temp = eval(state[index]);
    for (let index2 = 0; index2 < temp.length; index2++) {
      skillsPool.push(temp[index2]);
    }
    //skillsPool = ["戰鬥类", "醫療"] - 決定POOL有什么d
    //skillsPool (15) ['戰鬥类', '醫療', '戰鬥类', '醫療', '移动类', '隱密类', '戰鬥类
    if (index == CR) {
      skillResult.push("信誉");
    }
    skillResult.push(skillsPool[rollbase.Dice(skillsPool.length) - 1]);
    //
  }

  //skillResult (9) ['醫療', '醫療', '醫療', '信誉', '戰鬥类', '隱密类', '移动类', '隱密类', '戰鬥类']
  let finalOSkillList = [];
  let sortSkillList = [
    { name: "移动类", sort: shuffle([...移动类]) },
    { name: "隐密类", sort: shuffle([...隐密类]) },
    { name: "职业兴趣", sort: shuffle([...职业兴趣]) },
    { name: "调查类", sort: shuffle([...调查类]) },
    { name: "战斗类", sort: shuffle([...战斗类]) },
    { name: "医疗类", sort: shuffle([...医疗类]) },
    { name: "语言类", sort: shuffle([...语言类]) },
    { name: "学问类", sort: shuffle([...学问类]) },
    { name: "交际类", sort: shuffle([...交际类]) },
  ];
  for (let i = 0; i < skillResult.length; i++) {
    if (skillResult[i] == "信誉") {
      finalOSkillList.push("信誉");
      continue;
    }
    sortSkillList.forEach((v) => {
      if (v.name == skillResult[i]) {
        finalOSkillList.push(v.sort[0].name);
        v.sort.shift();
      }
    });
  }

  let tempOtherSkillList = [];
  sortSkillList.forEach((element) => {
    tempOtherSkillList.push(element.sort);
  });
  let tempFinalOtherSkillList = shuffle([...tempOtherSkillList.flat()]);
  let finalOtherSkillList = [];
  for (let index = 0; index < 4; index++) {
    finalOtherSkillList.push(tempFinalOtherSkillList[index]);
  }

  return { finalOSkillList, finalOtherSkillList };

  //
}
function checkState(state) {
  let result = [];
  result[0] = eightStateNumber[state.indexOf("STR")];
  result[1] = eightStateNumber[state.indexOf("DEX")];
  result[2] = eightStateNumber[state.indexOf("POW")];
  result[3] = eightStateNumber[state.indexOf("CON")];
  result[4] = eightStateNumber[state.indexOf("APP")];
  result[5] = eightStateNumber[state.indexOf("SIZ")];
  result[6] = eightStateNumber[state.indexOf("INT")];
  result[7] = eightStateNumber[state.indexOf("EDU")];
  return result;
}

const eightState = ["STR", "DEX", "POW", "CON", "APP", "SIZ", "INT", "EDU"];
const eightStateNumber = [80, 70, 70, 60, 50, 50, 50, 40];
const eightskillsNumber = [70, 60, 60, 50, 50, 50, 40, 40, 40];

const 交际类 = [
  { name: "心理学", skill: 10 },
  { name: "说服", skill: 10 },
  { name: "话术", skill: 5 },
  { name: "恐吓", skill: 15 },
  { name: "取悦", skill: 15 },
];
const 移动类 = [
  { name: "导航", skill: 10 },
  { name: "生存", skill: 10 },
  { name: "跳跃", skill: 20 },
  { name: "攀爬", skill: 20 },
  { name: "游泳", skill: 20 },
  { name: "驾驶（汽车）", skill: 20 },
  { name: "驾驶（其他）", skill: 1 },
  { name: "潜水", skill: 1 },
  { name: "骑术", skill: 5 },
];

const 隐密类 = [
  { name: "潜行", skill: 20 },
  { name: "追踪", skill: 10 },
  { name: "乔装", skill: 5 },
  { name: "锁匠", skill: 1 },
  { name: "巧手", skill: 10 },
];

const 学问类 = [
  { name: "会计", skill: 5 },
  { name: "法律", skill: 5 },
  { name: "神秘学", skill: 5 },
  { name: "历史", skill: 5 },
  { name: "自然学", skill: 10 },
  { name: "人类学", skill: 1 },
  { name: "考古学", skill: 1 },
  { name: "司法科学", skill: 1 },
  { name: "数学", skill: 1 },
  { name: "动物学", skill: 1 },
  { name: "电子学", skill: 1 },
  { name: "天文学", skill: 1 },
  { name: "地质学", skill: 1 },
  { name: "生物学", skill: 1 },
  { name: "物理", skill: 1 },
  { name: "化学", skill: 1 },
  { name: "密码学", skill: 1 },
  { name: "气象学", skill: 1 },
  { name: "植物学", skill: 1 },
  { name: "学问:", skill: 1 },
];

const 语言类 = [
  { name: "语言", skill: 1 },
  { name: "语言", skill: 1 },
  { name: "语言", skill: 1 },
  { name: "语言", skill: 1 },
  { name: "语言", skill: 1 },
  { name: "语言", skill: 1 },
  { name: "语言", skill: 1 },
];

const 职业兴趣 = [
  { name: "美术", skill: 5 },
  { name: "伪造", skill: 5 },
  { name: "表演", skill: 5 },
  { name: "摄影", skill: 5 },
  { name: "艺术／手艺(自选一项)", skill: 5 },
  { name: "操作重机", skill: 1 },
  { name: "机械维修", skill: 10 },
  { name: "电器维修", skill: 10 },
  { name: "电脑使用", skill: 5 },
  { name: "动物驯养", skill: 5 },
];

const 调查类 = [
  { name: "侦查", skill: 25 },
  { name: "聆听", skill: 20 },
  { name: "图书馆使用", skill: 20 },
  { name: "估价", skill: 5 },
  { name: "读唇", skill: 1 },
];

const 战斗类 = [
  { name: "闪避", skill: 0 },
  { name: "斗殴", skill: 25 },
  { name: "剑", skill: 20 },
  { name: "投掷", skill: 20 },
  { name: "弓", skill: 15 },
  { name: "手枪", skill: 20 },
  { name: "步枪／霰弹枪", skill: 25 },
];

const 医疗类 = [
  { name: "精神分析", skill: 1 },
  { name: "急救", skill: 30 },
  { name: "医学", skill: 1 },
  { name: "药学", skill: 1 },
  { name: "催眠", skill: 1 },
];
const STR = ["战斗类", "医疗类"];
const DEX = ["移动类", "隐密类"];
const POW = ["职业兴趣", "学问类"];
const CON = ["移动类", "战斗类"];
const APP = ["语言类", "交际类"];
const EDU = ["调查类", "医疗类", "学问类"];
const SIZ = ["战斗类", "交际类"];
const INT = ["隐密类", "职业兴趣", "调查类"];
class MythoyCollection {
  constructor() {}

  static getMythos() {
    return `克苏鲁神话邪神:
		${this.getMythonData("god")}

		克苏鲁神话生物:
		${this.getMythonData("monster")}

		克苏鲁神话书籍:
		${this.getMythonData("MagicBook")}

		克苏鲁神话法术:
		${this.getMythonData("magic")}
		`;
  }
  static getMythonData(dataType) {
    return this.cases[dataType]
      ? this.cases[dataType]()
      : this.cases._default();
  }
  static cases = {
    god: () => {
      return this.getRandomData(this.MythoyGodList);
    },
    monster: () => {
      return this.getRandomData(this.mosterList);
    },
    magic: () => {
      return this.getRandomData(this.Magic);
    },
    MagicBook: () => {
      return this.getRandomData(this.MagicBookList);
    },
    pushedCasting: () => {
      return `${this.getRandomData(this.pushedCastingRoll)}
	  对于更强大的法术（例如召唤神灵或消耗POW的法术），副作用可能更严重：
			${this.getRandomData(this.pushedPowerfulCastingRoll)}
			`;
    },
    _default: () => {
      return "没有找到符合的资料";
    },
  };
  static getRandomData(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  static mosterList = [
    "拜亚基",
    "钻地魔虫",
    "星之彩",
    "蠕行者",
    "达贡&海德拉（特殊深潜者）",
    "黑山羊幼崽",
    "深潜者",
    "混种深潜者",
    "巨噬蠕虫",
    "空鬼",
    "古老者",
    "炎之精",
    "飞水螅",
    "无形眷族",
    "妖鬼",
    "食尸鬼",
    "格拉基之僕",
    "诺弗·刻",
    "伊斯之伟大种族",
    "庭达罗斯的猎犬",
    "恐怖猎手",
    "罗伊格尔",
    "米-戈",
    "夜魇",
    "人面鼠",
    "潜沙怪",
    "蛇人",
    "外神僕役",
    "夏盖妖虫",
    "夏塔克鸟",
    "修格斯",
    "修格斯主宰(人型)",
    "修格斯主宰(修格斯形态)",
    "克苏鲁的星之眷族",
    "星之精",
    "乔乔人",
    "耶库伯人",
    "冷蛛",
    "昆扬人",
    "月兽",
    "空鬼",
    "潜沙怪",
    "冷原人",
    "图姆哈人",
  ];
  static MythoyGodList = [
    "阿布霍斯",
    "阿特拉克·纳克亚",
    "阿萨托斯",
    "芭丝特",
    "昌格纳·方庚",
    "克图格亚",
    "伟大的克苏鲁",
    "赛伊格亚",
    "道罗斯",
    "埃霍特",
    "加塔诺托亚",
    "格拉基",
    "哈斯塔，不可名状者",
    "伊塔库亚",
    "黄衣之王，哈斯塔的化身",
    "诺登斯",
    "奈亚拉托提普(人类形态)",
    "奈亚拉托提普(怪物形态)",
    "尼约格萨",
    "兰-提格斯",
    "莎布-尼古拉斯",
    "修德梅尔",
    "撒托古亚",
    "图尔兹查",
    "乌波·萨斯拉",
    "乌波·萨斯拉的子嗣",
    "伊戈罗纳克",
    "伊波·兹特尔",
    "伊格",
    "犹格·索托斯",
    "佐斯·奥摩格",
  ];
  static Magic = [
    "维瑞之印",
    "守卫术",
    "忘却之波",
    "肢体凋萎术",
    "真言术",
    "折磨术",
    "灵魂分配术",
    "耶德·艾塔德放逐术",
    "束缚术",
    "祝福刀锋术",
    "葛哥洛斯形体扭曲术",
    "深渊之息",
    "黄金蜂蜜酒酿造法",
    "透特之咏",
    "记忆模糊术",
    "纽格塔紧握术",
    "外貌滥用术",
    "致盲术/复明术",
    "创造纳克-提特之障壁",
    "拉莱耶造雾术",
    "僵尸制造术",
    "腐烂外皮之诅咒",
    "致死术",
    "支配术",
    "阿撒托斯的恐怖诅咒",
    "苏莱曼之尘",
    "旧印开光术",
    "绿腐术",
    "恐惧注入术",
    "血肉熔解术",
    "心理暗示术",
    "精神震爆术",
    "精神交换术",
    "精神转移术",
    "塔昆·阿提普之镜",
    "伊本-加兹之粉",
    "蒲林的埃及十字架",
    "修德·梅尔之赤印",
    "复活术",
    "枯萎术",
    "哈斯塔之歌",
    "请神术",
    "联络术",
    "通神术",
    "附魔术",
    "迷身术（迷惑牺牲者）",
    "邪眼术",
    "犹格-索托斯之拳",
    "血肉防护术",
    "时空门法术",
    "召唤术",
    "束缚术",
  ];
  static MagicBookList = [
    "阿齐夫(死灵之书原版)",
    "死灵之书",
    "不可名状的教团",
    "拉莱耶文本",
    "格拉基启示录",
    "死灵之书",
    "戈尔·尼格拉尔",
    "伊波恩之书",
    "水中之喀特",
    "绿之书",
    "不可名状的教团",
    "伊波恩之书",
    "来自被诅咒者，或（关于古老而恐怖的教团的论文）",
    "死亡崇拜",
    "艾欧德之书",
    "蠕虫之秘密",
    "食尸鬼教团",
    "伊波恩之书",
    "埃尔特当陶片",
    "暗黑仪式",
    "诺姆羊皮卷",
    "达尔西第四之书",
    "斯克洛斯之书",
    "断罪处刑之书",
    "智者玛格洛鲁姆",
    "暗黑大典",
    "格哈恩残篇",
    "纳克特抄本",
    "不可名状的教团",
    "伊希之仪式",
    "刻莱诺残篇",
    "狂僧克利萨努斯的忏悔",
    "迪詹之书",
    "达贡祷文",
    "反思录",
    "怪物及其族类",
    "恶魔崇拜",
    "深渊栖息者",
    "铉子七奥书",
    "亚洲的神秘奥迹，含有从《戈尔·尼格拉尔》中摘抄的注释",
    "巨噬蠕虫颂",
    "盖夫抄本",
    "萨塞克斯手稿",
    "钻地启示录",
    "《死灵之书》中的克苏鲁",
    "伊拉内克纸草",
    "卡纳玛戈斯圣约书",
    "水中之喀特",
    "海底的教团",
    "真实的魔法",
    "纳斯编年史",
    "远古的恐怖",
    "骷髅黑书",
    "伊斯提之歌",
    "来自被诅咒者",
    "波纳佩圣典",
    "神秘学基础",
    "置身高压水域",
    "魔法与黑巫术",
    "黄衣之王",
    "黑之契经",
    "《波纳佩圣典》所述的史前太平洋",
    "伊戈尔伦理学",
    "来自亚狄斯的幻象",
    "利夸利亚的传说",
    "哈利湖启示录",
    "姆-拉斯纸草",
    "撒都该人的胜利",
    "新英格兰乐土上的奇术异事",
    "混沌之魂",
    "犹基亚颂歌",
    "秘密窥视者",
    "约翰森的叙述",
    "致夏盖的安魂弥撒",
    "艾欧德之书",
    "越过幻象",
    "关于新英格兰的既往巫术",
    "阿撒托斯及其他",
    "黑色的疯狂之神",
    "伊波恩生平",
    "全能的奥苏姆",
    "地底掘进者",
    "巨石的子民",
    "撒拉逊人的宗教仪式",
    "水鳍书",
    "波利尼西亚神话学，附有对克苏鲁传说圈的记录",
    "异界的监视者",
    "科学的奇迹",
    "萨波斯的卡巴拉",
    "赞苏石板",
    "鱼之书",
    "失落帝国的遗迹",
    "托斯卡纳的宗教仪式",
    "夜之魍魉",
    "太平洋史前史：初步调查",
    "纳卡尔之钥",
    "宣福者美多迪乌斯",
    "翡翠石板",
    "金枝",
    "易经",
    "揭开面纱的伊西斯",
    "所罗门之钥",
    "女巫之锤",
    "诺查丹玛斯的预言",
    "西欧的异教巫术崇拜",
    "光明篇",
  ];

  static pushedCastingRoll = [
    "1 .视力模糊或暂时失明。",
    "2: 残缺不全的尖叫声、声音或其他噪音。",
    "3: 强烈的风或其他大气效应。",
    "4: 流血——可能是由于施法者、在场其他人或环境（如墙壁）的出血。",
    "5: 奇异的幻象和幻觉。",
    "6: 周围的小动物爆炸。",
    "7: 异臭的硫磺味。",
    "8: 不小心召唤了神话生物。",
  ];
  static pushedPowerfulCastingRoll = [
    "1: 大地震动，墙壁破裂。",
    "2: 巨大的雷电声。",
    "3: 血从天而降。",
    "4: 施法者的手被干枯和烧焦。",
    "5: 施法者不正常地老化（年龄增加2D10岁，并应用特征修正，请参见老化规则）。",
    "6: 强大或众多的神话生物出现，从施法者开始攻击附近所有人！",
    "7: 施法者或附近的所有人被吸到遥远的时间或地方。",
    "8: 不小心召唤了神话神明。",
  ];
}

class BuilderRegistry {
  constructor() {
    this.builders = new Map();
  }

  registerBuilder(pattern, builderClass) {
    this.builders.set(pattern, new builderClass());
  }

  getBuilder(name) {
    return this.builders.get(name);
  }
}

class Build7Char {
  constructor() {
    this.builderRegistry = new BuilderRegistry();
    this.defaultRegistry;
  }
  defaultBuiler(builderClass) {
    this.defaultRegistry = new builderClass();
  }

  registerBuilder(name, builderClass) {
    this.builderRegistry.registerBuilder(name, builderClass);
  }

  build(text, age) {
    for (const [pattern, builderClass] of this.builderRegistry.builders) {
      if (text.match(pattern)) {
        return builderClass.build(text, age);
      }
    }

    return `你输入的指令不正确，指令为 
	coc7版创角				： 启动语 .cc7build (岁数7-89)
	coc7版随机创角			： 启动语 .cc7build random 或留空
	coc7版自由分配点数创角	： 启动语 .cc7build .xyz (岁数15-89)
	
	先以coc7版随机模式来创角
	${this.defaultRegistry.build()}
`;
  }
}

class RandomBuilder {
  /**
   * 该方案適合大家想要立刻掏枪上馬开桌的时候。
   * 将４０、５０、５０、５０、６０、６０、７０、８０分配在属性上。
   * 选择职业和８个职业技能
   * 将８个职业技能和信誉分別分配以下数额：１项７０％，２项６０％，３项５０％和３项４０％（直接假定这些技能就是这个数值，忽略掉技能初始值）。
   * ４个非本职技能，将它们在基础值上各增加２０％。
   *
   */
  constructor() {}
  static pattern() {
    return /^random$/i;
  }

  build() {
    //设定 因年龄减少的点数 和 EDU加骰次数
    let old = rollbase.DiceINT(15, 89);
    let ReStr = `
=======coc7版随机创角=======
调查员年龄设为：${old}\n`;
    let Debuff = 0;
    let AppDebuff = 0;
    let EDUinc = 0;
    for (let i = 0; old >= oldArr[i]; i++) {
      Debuff = DebuffArr[i];
      AppDebuff = AppDebuffArr[i];
      EDUinc = EDUincArr[i];
    }
    ReStr += "=======\n";
    switch (true) {
      case old >= 15 && old <= 19:
        ReStr +=
          "年龄调整：从STR或SIZ中减去" +
          Debuff +
          "点\n（请自行手动选择计算）。\nEDU减去5点。LUK骰两次取高。";
        ReStr += "\n=======";
        ReStr += "\n（以下箭号两项，减值" + Debuff + "点。）";
        break;
      case old >= 20 && old <= 39:
        ReStr += "年龄调整：可做" + EDUinc + "次EDU的成长掷骰。";
        ReStr += "\n=======";
        break;
      case old >= 40 && old <= 49:
        ReStr +=
          "年龄调整：从STR、DEX或CON中减去" +
          Debuff +
          "点\n（请自行手动选择计算）。\nAPP减去" +
          AppDebuff +
          "点。进行" +
          EDUinc +
          "次EDU的成长掷骰。";
        ReStr += "\n=======";
        ReStr += "\n（以下箭号三项，自选减去" + Debuff + "点。）";
        break;
      case old >= 50:
        ReStr +=
          "年龄调整：从STR、DEX或CON中减去" +
          Debuff +
          "点\n（从一，二或全部三项中选择）\n（请自行手动选择计算）。\nAPP减去" +
          AppDebuff +
          "点。进行" +
          EDUinc +
          "次EDU的成长掷骰。";
        ReStr += "\n=======";
        ReStr += "\n（以下箭号三项，自选减去" + Debuff + "点。）";
        break;

      default:
        break;
    }
    /**
		 * 
		 * ＳＴＲ：(4+6+4) * 5 = 70 ←（可选）
		ＤＥＸ：(1+6+1) * 5 = 40
		ＰＯＷ：(2+2+2) * 5 = 30
		ＣＯＮ：(4+3+6) * 5 = 65
		ＡＰＰ：(2+1+1) * 5 = 20
		ＳＩＺ：((3+4)+6) * 5 = 65 ←（可选）
		ＩＮＴ：((6+2)+6) * 5 = 70
		ＥＤＵ：(((4+6)+6) * 5)-5 = 75
		 */
    let randomState = shuffle(eightState);
    let randomStateNumber = checkState(randomState);
    ReStr += "\nＳＴＲ：" + randomStateNumber[0];
    if (old >= 40) ReStr += " ←（可选） ";
    if (old < 20) ReStr += " ←（可选）";

    ReStr += "\nＤＥＸ：" + randomStateNumber[1];
    if (old >= 40) ReStr += " ← （可选）";

    ReStr += "\nＰＯＷ：" + randomStateNumber[2];

    ReStr += "\nＣＯＮ：" + randomStateNumber[3];
    if (old >= 40) ReStr += " ← （可选）";

    if (old >= 40) {
      ReStr +=
        "\nＡＰＰ：" +
        `${randomStateNumber[4]}-${AppDebuff} = ${
          randomStateNumber[4] - AppDebuff
        }`;
    } else ReStr += "\nＡＰＰ：" + randomStateNumber[4];

    ReStr += "\nＳＩＺ：" + randomStateNumber[5];
    if (old < 20) {
      ReStr += " ←（可选）";
    }

    ReStr += "\nＩＮＴ：" + randomStateNumber[6];

    if (old < 20) ReStr += "\nＥＤＵ：" + randomStateNumber[7];
    else {
      ReStr += "\n=======";
      ReStr += "\nＥＤＵ初始值：" + randomStateNumber[7];

      let tempEDU = +randomStateNumber[7];

      for (let i = 1; i <= EDUinc; i++) {
        let EDURoll = rollbase.Dice(100);
        ReStr += "\n第" + i + "次EDU成长 → " + EDURoll;
        if (EDURoll > tempEDU) {
          let EDUplus = rollbase.Dice(10);
          ReStr += " → 成长" + EDUplus + "点";
          tempEDU = tempEDU + EDUplus;
        } else {
          ReStr += " → 没有成长";
        }
      }
      ReStr += "\n";
      ReStr += "\nＥＤＵ最终值：" + tempEDU;
    }
    ReStr += "\n=======";
    const tempBuildLuck = [
      rollbase.BuildDiceCal("3d6*5"),
      rollbase.BuildDiceCal("3d6*5"),
    ];
    const tempLuck = [
      tempBuildLuck[0].match(/\d+$/),
      tempBuildLuck[1].match(/\d+$/),
    ];

    if (old < 20) {
      ReStr +=
        "\nＬＵＫ第一次：" +
        `${tempBuildLuck[0]} \nＬＵＫ第二次： ${tempBuildLuck[1]}`;
      ReStr += "\nＬＵＫ最终值：" + Math.max(...tempLuck);
    } else {
      ReStr += "\nＬＵＫ：" + `${tempBuildLuck[0]} `;
    }

    //ReStr += '\nＬＵＫ：' + rollbase.BuildDiceCal('3d6*5');
    //if (old < 20) ReStr += '\nＬＵＫ加骰：' + rollbase.BuildDiceCal('3D6*5');
    ReStr += `\n==本职技能==`;
    let occAndOtherSkills = getOccupationSkill(randomState);
    for (
      let index = 0;
      index < occAndOtherSkills.finalOSkillList.length;
      index++
    ) {
      ReStr += `\n ${occAndOtherSkills.finalOSkillList[index]} ${eightskillsNumber[index]}`;
    }
    ReStr += `\n==其他技能==`;
    for (
      let index = 0;
      index < occAndOtherSkills.finalOtherSkillList.length;
      index++
    ) {
      ReStr += `\n ${occAndOtherSkills.finalOtherSkillList[index].name} ${
        occAndOtherSkills.finalOtherSkillList[index].skill + 20
      }`;
    }
    ReStr += `\n=======\n${PcBG()}`;
    return ReStr;
  }
}

class AgeBuilder {
  static pattern() {
    return /^\d+$/i;
  }

  build(text) {
    let old = "";
    let ReStr = "调查员年龄设为：";
    if (text) old = text.replace(/\D/g, "");
    if (old) {
      ReStr += old + "\n";
    }
    //设定 因年龄减少的点数 和 EDU加骰次数
    let Debuff = 0;
    let AppDebuff = 0;
    let EDUinc = 0;
    if (old < 7) {
      ReStr +=
        "\n等等，核心规则或日本拓展没有适用小于7岁的人物哦。\n先当成15岁处理\n";
      old = 15;
    }

    if (old >= 7 && old <= 14) {
      ReStr +=
        "\n等等，核心规则没有适用小于15岁的人物哦。\n先使用日本CoC 7th 2020 拓展 - 7到14岁的幼年调查员规则吧\n";
    }
    if (old >= 90) {
      ReStr += "\n等等，核心规则没有适用于90岁以上的人物哦。\n先当成89岁处理\n";
      old = 89;
    }
    for (let i = 0; old >= oldArr[i]; i++) {
      Debuff = DebuffArr[i];
      AppDebuff = AppDebuffArr[i];
      EDUinc = EDUincArr[i];
    }
    ReStr += "=======\n";
    switch (true) {
      case old >= 7 && old <= 14: {
        if (old >= 7 && old <= 12) {
          ReStr += "\nＳＴＲ：" + rollbase.BuildDiceCal("3d4*5");
          ReStr += "\nＤＥＸ：" + rollbase.BuildDiceCal("3d6*5");
          ReStr += "\nＰＯＷ：" + rollbase.BuildDiceCal("3d6*5");

          ReStr += "\nＣＯＮ：" + rollbase.BuildDiceCal("3d4*5");
          ReStr += "\nＡＰＰ：" + rollbase.BuildDiceCal("3d6*5");
          ReStr += "\nＳＩＺ：" + rollbase.BuildDiceCal("(2d3+6)*5");
          ReStr += "\nＩＮＴ：" + rollbase.BuildDiceCal("(2d6+6)*5");
        }
        if (old >= 13 && old <= 14) {
          ReStr += "\nＳＴＲ：" + rollbase.BuildDiceCal("(2d6+1)*5");
          ReStr += "\nＤＥＸ：" + rollbase.BuildDiceCal("3d6*5");
          ReStr += "\nＰＯＷ：" + rollbase.BuildDiceCal("3d6*5");

          ReStr += "\nＣＯＮ：" + rollbase.BuildDiceCal("(2d6+1)*5");
          ReStr += "\nＡＰＰ：" + rollbase.BuildDiceCal("3d6*5");
          ReStr += "\nＳＩＺ：" + rollbase.BuildDiceCal("(2d4+6)*5");
          ReStr += "\nＩＮＴ：" + rollbase.BuildDiceCal("(2d6+6)*5");
        }
        for (let i = 0; old >= OldArr2020[i]; i++) {
          EDUinc = EDUincArr2020[i];
        }
        ReStr += "\nＥＤＵ：" + EDUinc;
        const tempBuildLuck = [
          rollbase.BuildDiceCal("3d6*5"),
          rollbase.BuildDiceCal("3d6*5"),
        ];
        const tempLuck = [
          tempBuildLuck[0].match(/\d+$/),
          tempBuildLuck[1].match(/\d+$/),
        ];
        ReStr +=
          "\nＬＵＫ第一次：" +
          `${tempBuildLuck[0]} \nＬＵＫ第二次： ${tempBuildLuck[1]}`;
        ReStr += "\nＬＵＫ最终值：" + Math.max(...tempLuck);
        ReStr += "\n\n幼年调查员的特性：" + rollbase.BuildDiceCal("2d6");
        ReStr += "\n幼年调查员的家境：" + rollbase.BuildDiceCal("1D100");
        ReStr +=
          "\n幼年调查员可受「帮忙」的次数：" + Math.round((17 - old) / 3);
        return ReStr;
      }

      case old >= 15 && old <= 19:
        ReStr +=
          "年龄调整：从STR或SIZ中减去" +
          Debuff +
          "点\n（请自行手动选择计算）。\nEDU减去5点。LUK骰两次取高。";
        ReStr += "\n=======";
        ReStr += "\n（以下箭号两项，减值" + Debuff + "点。）";
        break;
      case old >= 20 && old <= 39:
        ReStr += "年龄调整：可做" + EDUinc + "次EDU的成长掷骰。";
        ReStr += "\n=======";
        break;
      case old >= 40 && old <= 49:
        ReStr +=
          "年龄调整：从STR、DEX或CON中减去" +
          Debuff +
          "点\n（请自行手动选择计算）。\nAPP减去" +
          AppDebuff +
          "点。进行" +
          EDUinc +
          "次EDU的成长掷骰。";
        ReStr += "\n=======";
        ReStr += "\n（以下箭号三项，自选减去" + Debuff + "点。）";
        break;
      case old >= 50:
        ReStr +=
          "年龄调整：从STR、DEX或CON中减去" +
          Debuff +
          "点\n（从一，二或全部三项中选择）\n（请自行手动选择计算）。\nAPP减去" +
          AppDebuff +
          "点。进行" +
          EDUinc +
          "次EDU的成长掷骰。";
        ReStr += "\n=======";
        ReStr += "\n（以下箭号三项，自选减去" + Debuff + "点。）";
        break;

      default:
        break;
    }
    ReStr += "\nＳＴＲ：" + rollbase.BuildDiceCal("3d6*5");
    if (old >= 40) ReStr += " ←（可选） ";
    if (old < 20) ReStr += " ←（可选）";

    ReStr += "\nＤＥＸ：" + rollbase.BuildDiceCal("3d6*5");
    if (old >= 40) ReStr += " ← （可选）";

    ReStr += "\nＰＯＷ：" + rollbase.BuildDiceCal("3d6*5");

    ReStr += "\nＣＯＮ：" + rollbase.BuildDiceCal("3d6*5");
    if (old >= 40) ReStr += " ← （可选）";

    if (old >= 40) {
      ReStr += "\nＡＰＰ：" + rollbase.BuildDiceCal("(3d6*5)-" + AppDebuff);
    } else ReStr += "\nＡＰＰ：" + rollbase.BuildDiceCal("3d6*5");

    ReStr += "\nＳＩＺ：" + rollbase.BuildDiceCal("(2d6+6)*5");
    if (old < 20) {
      ReStr += " ←（可选）";
    }

    ReStr += "\nＩＮＴ：" + rollbase.BuildDiceCal("(2d6+6)*5");

    if (old < 20)
      ReStr += "\nＥＤＵ：" + rollbase.BuildDiceCal("((2d6+6)*5)-5");
    else {
      let firstEDU = "(" + rollbase.BuildRollDice("2d6") + "+6)*5";
      ReStr += "\n=======";
      ReStr += "\nＥＤＵ初始值：" + firstEDU + " = " + eval(firstEDU);

      let tempEDU = eval(firstEDU);

      for (let i = 1; i <= EDUinc; i++) {
        let EDURoll = rollbase.Dice(100);
        ReStr += "\n第" + i + "次EDU成长 → " + EDURoll;
        if (EDURoll > tempEDU) {
          let EDUplus = rollbase.Dice(10);
          ReStr += " → 成长" + EDUplus + "点";
          tempEDU = tempEDU + EDUplus;
        } else {
          ReStr += " → 没有成长";
        }
      }
      ReStr += "\n";
      ReStr += "\nＥＤＵ最终值：" + tempEDU;
    }
    ReStr += "\n=======";

    const tempBuildLuck = [
      rollbase.BuildDiceCal("3d6*5"),
      rollbase.BuildDiceCal("3d6*5"),
    ];
    const tempLuck = [
      tempBuildLuck[0].match(/\d+$/),
      tempBuildLuck[1].match(/\d+$/),
    ];
    if (old < 20) {
      ReStr +=
        "\nＬＵＫ第一次：" +
        `${tempBuildLuck[0]} \nＬＵＫ第二次： ${tempBuildLuck[1]}`;
      ReStr += "\nＬＵＫ最终值：" + Math.max(...tempLuck);
    } else {
      ReStr += "\nＬＵＫ：" + `${tempBuildLuck[0]} `;
    }

    //ReStr += '\nＬＵＫ：' + rollbase.BuildDiceCal('3d6*5');
    //if (old < 20) ReStr += '\nＬＵＫ加骰：' + rollbase.BuildDiceCal('3D6*5');
    ReStr +=
      "\n=======\n煤油灯特征: 1D6&1D20 → " +
      rollbase.Dice(6) +
      "," +
      rollbase.Dice(20);
    return ReStr;
  }
}

class XYZBuilder {
  static pattern() {
    return /^([.])/i;
  }

  build(text, age) {
    this.x = (text.match(/[.]\d+/i) && text[1]) || 5;
    this.y = (text.match(/[.]\d+/i) && text[2]) || 3;
    this.z = (text.match(/[.]\d+/i) && text[3]) || 0;
    this.age = age?.match(/^\d+/i) || 0;
    let ReStr = `自由分配属性点数创角方案
=======
`;
    for (let i = 0; i < this.x; i++) {
      ReStr += `${rollbase.BuildDiceCal("3d6*5")}\n`;
    }
    if (this.x) ReStr += `=======\n`;
    for (let i = 0; i < this.y; i++) {
      ReStr += `${rollbase.BuildDiceCal("(2d6+6)*5")}\n`;
    }
    if (this.y) ReStr += `=======\n`;
    for (let i = 0; i < this.z; i++) {
      ReStr += `${rollbase.BuildDiceCal("3d6*5")}\n`;
    }
    if (this.z) ReStr += `=======\n`;
    if (this.age && !isNaN(this.age)) {
      ReStr += `${this.ageAdjustment(this.age)}`;
      //设定 因年龄减少的点数 和 EDU加骰次数
    } else {
      ReStr += `没有年龄调整\n如果在后面加上年龄，就会自动计算年龄调整 如 
.cc7build .533 40`;
      const tempBuildLuck = [
        rollbase.BuildDiceCal("3d6*5"),
        rollbase.BuildDiceCal("3d6*5"),
      ];
      ReStr += "\n=======\nＬＵＫ：" + `${tempBuildLuck[0]} `;
    }

    return ReStr;
  }
  ageAdjustment(age) {
    let Debuff = 0;
    let AppDebuff = 0;
    let EDUinc = 0;
    let ReStr = "";
    let newAge = age;
    if (newAge < 15) newAge = 15;
    if (newAge > 89) age = 89;
    for (let i = 0; newAge >= oldArr[i]; i++) {
      Debuff = DebuffArr[i];
      AppDebuff = AppDebuffArr[i];
      EDUinc = EDUincArr[i];
    }
    ReStr += "年龄：" + newAge + "\n";
    switch (true) {
      case newAge >= 15 && newAge <= 19:
        ReStr +=
          "年龄调整：从STR或SIZ中减去" +
          Debuff +
          "点\n（请自行手动选择计算）。\nEDU减去5点。";
        ReStr += "\n=======";
        break;
      case newAge >= 20 && newAge <= 39:
        ReStr += "年龄调整：可做" + EDUinc + "次EDU的成长掷骰。";
        ReStr += "\n=======";
        break;
      case newAge >= 40 && newAge <= 49:
        ReStr +=
          "年龄调整：从STR、DEX或CON中减去" +
          Debuff +
          "点\n（请自行手动选择计算）。\nAPP减去" +
          AppDebuff +
          "点。进行" +
          EDUinc +
          "次EDU的成长掷骰。";
        ReStr += "\n=======";
        break;
      case newAge >= 50:
        ReStr +=
          "年龄调整：从STR、DEX或CON中减去" +
          Debuff +
          "点\n（从一，二或全部三项中选择）\n（请自行手动选择计算）。\nAPP减去" +
          AppDebuff +
          "点。进行" +
          EDUinc +
          "次EDU的成长掷骰。";
        ReStr += "\n=======";
        break;

      default:
        break;
    }
    for (let i = 1; i <= EDUinc; i++) {
      let EDURoll = rollbase.Dice(100);
      ReStr += "\n第" + i + "次EDU成长 → " + EDURoll;

      let EDUplus = rollbase.Dice(10);
      ReStr += " → 如果高于现有EDU，则成长" + EDUplus + "点";
    }
    const tempBuildLuck = [
      rollbase.BuildDiceCal("3d6*5"),
      rollbase.BuildDiceCal("3d6*5"),
    ];
    const tempLuck = [
      tempBuildLuck[0].match(/\d+$/),
      tempBuildLuck[1].match(/\d+$/),
    ];
    if (newAge < 20) {
      ReStr +=
        "\nＬＵＫ第一次：" +
        `${tempBuildLuck[0]} \nＬＵＫ第二次： ${tempBuildLuck[1]}`;
      ReStr += "\nＬＵＫ最终值：" + Math.max(...tempLuck);
    } else {
      ReStr += "\n=======\nＬＵＫ：" + `${tempBuildLuck[0]} `;
    }
    ReStr +=
      "\n=======\n煤油灯特征: 1D6&1D20 → " +
      rollbase.Dice(6) +
      "," +
      rollbase.Dice(20);
    return ReStr;
  }
}

const builder = new Build7Char();
builder.defaultBuiler(RandomBuilder);
builder.registerBuilder(RandomBuilder.pattern(), RandomBuilder);
builder.registerBuilder(XYZBuilder.pattern(), XYZBuilder);
builder.registerBuilder(AgeBuilder.pattern(), AgeBuilder);
