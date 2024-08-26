//參考
//https://github.com/cookkkie/mee6
"use strict";
if (!process.env.mongoURL) {
  return;
}
const checkMongodb = require("../modules/dbWatchdog.js");
const checkTools = require("../modules/check.js");
const tempSwitchV2 = require("../modules/level");
const schema = require("../modules/schema.js");
const DEFAULT_RANK_WORD =
  "{user.displayName}《{user.title}》，你的克苏鲁神话知识现在是 {user.level}点！\n现在排名是{server.member_count}人中的第{user.Ranking}名！{user.RankingPer}！\n调查经验是{user.exp}点。 ";

const gameName = function () {
  return "【经验值功能】 .level (show config LevelUpWord RankWord)";
};
const gameType = function () {
  return "funny:trpgLevelSystem:hktrpg";
};
const prefixs = function () {
  return [
    {
      first: /(^[.]level$)/gi,
      second: null,
    },
  ];
};
const getHelpMessage = async function () {
  return `【经验值功能】
这是根据开源Discord bot Mee6开发的功能
按发言次数增加经验，提升等级，实现服务器内排名等欢乐功能
当经验达到要求，就会弹出通知，提示你已提升等级。
默认并不开启，需要输入.level config 11 启动功能 
数字11代表等级升级时会进行通知，10代表不会通知，
00的话代表关闭功能，
-------------
默认回应是「{user.displayName}《{user.title}》，你的克苏鲁神话知识现在是 {user.level}点！
现在排名是{server.member_count}人中的第{user.Ranking}名！{user.RankingPer}！
调查经验是{user.exp}点。」
-------------
输入.level LevelUpWord (内容) 修改在这社区升级时弹出的升级语
输入.level RankWord (内容) 修改在这社区查询等级时的回应
输入.level TitleWord -(LV) (内容)，修改称号，大于等级即会套用
建议由-0开始，可一次输入多个，如 .level TitleWord -0 幼童 -5 学徒 -10 武士 
输入.level RankWord/LevelUpWord/TitleWord del 即使用默认字句
输入.level RankWord/LevelUpWord/TitleWord show 即显示现在设定
输入.level show 可以查询你现在的等级
输入.level showMe (数字) 可以查询这社区排名 默认头5名
输入.level showMeTheworld (数字) 可以查询世界排名 默认头6名
输入.level showMeAtTheworld 可以查询自己的世界排名
-------------
升级语及RankWord可使用不同代码
{user.name} 名字  {user.displayName} Discord里的Server昵称
{user.level} 等级 {user.title} 称号 
{user.exp} 经验值 {user.Ranking} 现在排名 
{user.RankingPer} 现在排名百分比 
{server.member_count} 现在频道中总人数 
`;
};
const initialize = function () {
  return;
};
const checkTitle = async function (userlvl, DBTitle) {
  let templvl = 0;
  let temptitle = "";
  if (DBTitle && DBTitle.length > 0) {
    for (let g = 0; g < DBTitle.length; g++) {
      if (userlvl >= g) {
        if (templvl <= g && DBTitle[g]) {
          templvl = g;
          temptitle = DBTitle[g];
        }
      }
    }
  }
  if (!temptitle)
    for (let g = 0; g < Title().length; g++) {
      if (userlvl >= g) {
        if (templvl <= g && Title()[g]) {
          templvl = g;
          temptitle = Title()[g];
        }
      }
    }
  return temptitle;
};
const Title = function () {
  let Title = [];
  Title[0] = "无名调查员";
  Title[3] = "雀";
  Title[4] = "调查员";
  Title[8] = "记者";
  Title[11] = "侦探";
  Title[13] = "小熊";
  Title[14] = "考古家";
  Title[18] = "神秘学家";
  Title[21] = "狂信徒";
  Title[24] = "教主";
  Title[28] = "眷族";
  Title[31] = "眷族首领";
  Title[33] = "南";
  Title[34] = "化身";
  Title[38] = "旧神";
  Title[41] = "旧日支配者";
  Title[43] = "门";
  Title[44] = "外神";
  Title[48] = "KP";
  Title[53] = "东";
  Title[54] = "作者";
  return Title;
};

/*
    称号
    0-3     无名调查员
    4-7     调查员
    8-10    记者    
    11-13   侦探
    14-17   考古家
    18-20   神秘学家
    21-23   狂信徒
    24-27   教主
    28-30   眷族
    31-33   眷族首领
    34-37   化身
    38-40   旧神
    41-43   旧日支配者
    44-47   外神
    48-50   門
    */
const rollDiceCommand = async function ({
  inputStr,
  mainMsg,
  groupid,
  userid,
  userrole,
  botname,
  displayname,
  displaynameDiscord,
  tgDisplayname,
  discordMessage,
  membercount,
}) {
  let rply = {
    default: "on",
    type: "text",
    text: "",
  };
  switch (true) {
    case /^help$/i.test(mainMsg[1]) || !mainMsg[1]:
      rply.text = await this.getHelpMessage();
      rply.quotes = true;
      if (botname == "Line")
        rply.text +=
          "\n因为Line的机制, 如掷骰时并无显示用家名字, 请到下列网址,和机器人任意说一句话,成为好友. \n https://line.me/R/ti/p/svMLqy9Mik";
      return rply;
    // .level(0) LevelUpWord(1) TOPIC(2) CONTACT(3)

    case /(^[.]level$)/i.test(mainMsg[0]) &&
      /^TitleWord$/i.test(mainMsg[1]) &&
      /^del$/i.test(mainMsg[2]): {
      if (
        (rply.text = checkTools.permissionErrMsg({
          flag: checkTools.flag.ChkChannelAdmin,
          gid: groupid,
          role: userrole,
        }))
      ) {
        return rply;
      }

      let doc = await schema.trpgLevelSystem
        .findOne({
          groupid: groupid,
        })
        .catch((error) =>
          console.error(
            "level_system #164 mongoDB error: ",
            error.name,
            error.reson
          )
        );

      //问题: 如果没有GP 的话, 可以刪除嗎?
      if (!doc || doc.Title.length < 1) {
        rply.text = "刪除称号成功。现改回使用预设称号。";
        return rply;
      }
      doc.Title = [];
      await doc.save();
      rply.text = "刪除称号成功。现改回使用预设称号。";
      return rply;
    }
    case /(^[.]level$)/i.test(mainMsg[0]) &&
      /^TitleWord$/i.test(mainMsg[1]) &&
      /^Show$/i.test(mainMsg[2]): {
      if (!groupid) {
        rply.text = "查询失败。你不在社区当中，请在社区中使用。";
        return rply;
      }
      let doc = await schema.trpgLevelSystem
        .findOne({
          groupid: groupid,
        })
        .catch((error) =>
          console.error(
            "level_system #184 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      if (!doc || doc.Title.length < 1) {
        rply.text = "正在使用预设称号。";
        return rply;
      }
      rply.text = "称号:\n";
      for (let te = 0; te < doc.Title.length; te++) {
        if (doc.Title[te]) {
          rply.text += `${[te]}等级: ` + doc.Title[te] + "\n";
        }
      }
      return rply;
    }
    case /(^[.]level$)/i.test(mainMsg[0]) && /^TitleWord$/i.test(mainMsg[1]): {
      //
      //称号Title
      //
      if (
        (rply.text = checkTools.permissionErrMsg({
          flag: checkTools.flag.ChkChannelAdmin,
          gid: groupid,
          role: userrole,
        }))
      ) {
        return rply;
      }

      let doc = await schema.trpgLevelSystem
        .findOne({
          groupid: groupid,
        })
        .catch((error) =>
          console.error(
            "level_system #212 mongoDB error: ",
            error.name,
            error.reson
          )
        );

      let temprply = setNew(inputStr, doc.Title);

      if (temprply.length < 1) {
        rply.text =
          "新增失败。 未有称号输入，格式为 \n.level TitleWord -(等级) (称号).";
        return rply;
      }
      await schema.trpgLevelSystem
        .updateOne(
          {
            groupid: groupid,
          },
          {
            $set: {
              Title: temprply,
            },
          }
        )
        .catch((error) =>
          console.error(
            "level_system #227 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      rply.text = "新增称号成功: \n";
      for (let te = 0; te < temprply.length; te++) {
        if (temprply[te]) rply.text += [te] + "等级: " + temprply[te] + "\n";
      }
      return rply;
    }
    case /(^[.]level$)/i.test(mainMsg[0]) &&
      /^LevelUpWord$/i.test(mainMsg[1]) &&
      /^Show$/i.test(mainMsg[2]): {
      if (!groupid) {
        rply.text = "新增失败。你不在社区当中，请在社区中使用。";
        return rply;
      }
      let doc = await schema.trpgLevelSystem
        .findOne({
          groupid: groupid,
        })
        .catch((error) =>
          console.error(
            "level_system #242 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      if (!doc || !doc.LevelUpWord) {
        rply.text = "正在使用预设升级语. ";
        return rply;
      }
      rply.text = "现在升级语:";
      rply.text += "\n" + doc.LevelUpWord;
      return rply;
    }
    case /(^[.]level$)/i.test(mainMsg[0]) &&
      /^LevelUpWord$/i.test(mainMsg[1]) &&
      /^del$/i.test(mainMsg[2]): {
      if (
        (rply.text = checkTools.permissionErrMsg({
          flag: checkTools.flag.ChkChannelAdmin,
          gid: groupid,
          role: userrole,
        }))
      ) {
        return rply;
      }

      let doc = await schema.trpgLevelSystem
        .findOne({
          groupid: groupid,
        })
        .catch((error) =>
          console.error(
            "level_system #262 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      doc.LevelUpWord = "";
      await doc
        .save()
        .catch((error) =>
          console.error(
            "level_system #264 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      rply.text = "刪除升级语成功.";
      return rply;
    }
    case /(^[.]level$)/i.test(mainMsg[0]) &&
      /^LevelUpWord$/i.test(mainMsg[1]): {
      if (
        (rply.text = checkTools.permissionErrMsg({
          flag: checkTools.flag.ChkChannelAdmin,
          gid: groupid,
          role: userrole,
        }))
      ) {
        return rply;
      }

      let doc = await schema.trpgLevelSystem
        .findOne({
          groupid: groupid,
        })
        .catch((error) =>
          console.error(
            "level_system #280 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      doc.LevelUpWord = inputStr.replace(/\s?.*\s+\w+\s+/i, "");
      await doc
        .save()
        .catch((error) =>
          console.error(
            "level_system #282 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      rply.text = "新增升级语成功.\n" + inputStr.replace(/\s?.*\s+\w+\s+/i, "");

      return rply;
    }
    case /(^[.]level$)/i.test(mainMsg[0]) &&
      /^RankWord$/i.test(mainMsg[1]) &&
      /^Show$/i.test(mainMsg[2]): {
      if (!groupid) {
        rply.text = "新增失败。你不在社区当中，请在社区中使用。";
        return rply;
      }
      let doc = await schema.trpgLevelSystem
        .findOne({
          groupid: groupid,
        })
        .catch((error) =>
          console.error(
            "level_system #294 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      if (!doc || !doc.RankWord) {
        rply.text = "正在使用预设查询语. ";
        return rply;
      }
      rply.text = "现在查询语:";
      rply.text += "\n" + doc.RankWord;
      return rply;
    }
    case /(^[.]level$)/i.test(mainMsg[0]) &&
      /^RankWord$/i.test(mainMsg[1]) &&
      /^del$/i.test(mainMsg[2]): {
      if (
        (rply.text = checkTools.permissionErrMsg({
          flag: checkTools.flag.ChkChannelAdmin,
          gid: groupid,
          role: userrole,
        }))
      ) {
        return rply;
      }

      let doc = await schema.trpgLevelSystem
        .findOne({
          groupid: groupid,
        })
        .catch((error) =>
          console.error(
            "level_system #314 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      doc.RankWord = "";
      await doc.save();
      rply.text = "刪除查询语成功.";
      return rply;
    }
    case /(^[.]level$)/i.test(mainMsg[0]) && /^RankWord$/i.test(mainMsg[1]): {
      if (
        (rply.text = checkTools.permissionErrMsg({
          flag: checkTools.flag.ChkChannelAdmin,
          gid: groupid,
          role: userrole,
        }))
      ) {
        return rply;
      }

      let doc = await schema.trpgLevelSystem
        .findOne({
          groupid: groupid,
        })
        .catch((error) =>
          console.error(
            "level_system #332 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      doc.RankWord = inputStr.replace(/\s?.*\s+\w+\s+/i, "");
      await doc.save();
      rply.text = "新增查询语成功.\n" + inputStr.replace(/\s?.*\s+\w+\s+/i, "");
      return rply;
    }
    case /(^[.]level$)/i.test(mainMsg[0]) &&
      /^config$/i.test(mainMsg[1]) &&
      /^Show$/i.test(mainMsg[2]): {
      if (!groupid) {
        rply.text = "你不在社区当中，请在社区中使用。";
        return rply;
      }
      let doc = await schema.trpgLevelSystem
        .findOne({
          groupid: groupid,
        })
        .catch((error) =>
          console.error(
            "level_system #345 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      rply.text = "现在设定: " + "\n经验值功能: ";
      rply.text +=
        doc && doc.SwitchV2 ? "启动\n升级通知功能: " : "关闭\n升级通知功能: ";
      rply.text += doc && doc.HiddenV2 ? "启动" : "关闭";
      return rply;
    }

    case /(^[.]level$)/i.test(mainMsg[0]) && /^config$/i.test(mainMsg[1]): {
      if (
        (rply.text = checkTools.permissionErrMsg({
          flag: checkTools.flag.ChkChannelAdmin,
          gid: groupid,
          role: userrole,
        }))
      ) {
        return rply;
      }

      if (!mainMsg[2]) {
        rply.text = "修改失败。没有设定onoff\n";
        rply.text +=
          "\nconfig 11 代表启动功能 \
                \n 数字11代表等级升级时会进行升级通知，10代表不会自动进行升级通知，\
                \n 00的话代表不启动功能\n";
        return rply;
      }
      let doc = await schema.trpgLevelSystem
        .findOne({
          groupid: groupid,
        })
        .catch((error) =>
          console.error(
            "level_system #370 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      if (!doc) {
        doc = new schema.trpgLevelSystem({
          groupid: groupid,
        });
      }
      switch (mainMsg[2]) {
        case "00": {
          doc.SwitchV2 = false;
          doc.HiddenV2 = false;
          await doc.save();
          let temp = tempSwitchV2.tempSwitchV2.find(function (group) {
            return group.groupid == groupid;
          });
          temp.SwitchV2 = false;
          break;
        }
        case "01": {
          doc.SwitchV2 = false;
          doc.HiddenV2 = true;
          await doc.save();
          let temp = tempSwitchV2.tempSwitchV2.find(function (group) {
            return group.groupid == groupid;
          });
          temp.SwitchV2 = false;
          break;
        }
        case "11": {
          doc.SwitchV2 = true;
          doc.HiddenV2 = true;
          await doc.save();
          let temp = tempSwitchV2.tempSwitchV2.find(function (group) {
            return group.groupid == groupid;
          });
          temp.SwitchV2 = true;
          break;
        }
        case "10":
          {
            doc.SwitchV2 = true;
            doc.HiddenV2 = false;
            await doc.save();
            let temp = tempSwitchV2.tempSwitchV2.find(function (group) {
              return group.groupid == groupid;
            });
            temp.SwitchV2 = true;
          }
          break;
        default:
          rply.text = "修改失败。没有设定onoff\n";
          rply.text +=
            "\nconfig 11 代表启动功能 \
                    \n 数字11代表等级升级时会进行通知，10代表不会自动通知，\
                    \n 00的话代表不启动功能\n";
          return rply;
      }
      rply.text = "修改成功: " + "\n经验值功能: ";
      rply.text += doc.SwitchV2
        ? "启动\n升级通知功能: "
        : "关闭\n升级通知功能: ";
      rply.text += doc.HiddenV2 ? "启动" : "关闭";
      return rply;
    }

    case /(^[.]level$)/i.test(mainMsg[0]) && /^show$/i.test(mainMsg[1]): {
      if (!checkMongodb.isDbOnline()) return;
      if (!groupid) {
        rply.text = "你不在社区当中，请在社区中使用。";
        return rply;
      }
      if (!userid) {
        rply.text = "出现问题，你没有UserID。";
        return rply;
      }
      let doc = await schema.trpgLevelSystem
        .findOne({
          groupid: groupid,
          SwitchV2: true,
        })
        .catch((error) => {
          console.error(
            "level_system #442 mongoDB error: ",
            error.name,
            error.reson
          );
          checkMongodb.dbErrOccurs();
        });
      if (!doc || !doc.SwitchV2) {
        rply.text =
          "此社区并有没有开启LEVEL功能. \n.level config 11 代表启动功能 \
                    \n 数字11代表等级升级时会进行通知，10代表不会自动通知，\
                    \n 00的话代表不启动功能";
        return rply;
      }
      let docMember = await schema.trpgLevelSystemMember
        .find({
          groupid: groupid,
        })
        .sort({
          EXP: -1,
        })
        .catch((error) =>
          console.error(
            "level_system #453 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      //要尋找其中自己的userid
      let myselfIndex = docMember
        .map(function (members) {
          return members.userid;
        })
        .indexOf(userid.toString());
      if (myselfIndex < 0) {
        rply.text = "未有你的资料，请稍后再试。";
        return rply;
      }
      //6.    ->没有 使用预设排名语
      //{user.name} 名字 {user.level} 等级 \
      //{user.title} 称号
      // {user.exp} 经验值 {user.Ranking} 现在排名 \
      // {user.RankingPer} 现在排名百分比 \
      // {server.member_count} 现在频道中总人数 \

      //rply.text += '资料库列表:'
      //1.    读取 社区有没有开启功能

      //5.    读取社区的排名语

      let rankWord = doc.RankWord ? doc.RankWord : DEFAULT_RANK_WORD;

      let username =
        tgDisplayname || displaynameDiscord || displayname || "无名";

      let userlevel = docMember[myselfIndex].Level;
      let userexp = docMember[myselfIndex].EXP;
      let usermember_count = Math.max(membercount, docMember.length);
      let userRanking = myselfIndex + 1;
      let userRankingPer =
        Math.ceil((userRanking / usermember_count) * 10000) / 100 + "%";
      let userTitle = await this.checkTitle(userlevel, doc.Title || []);
      //Title 首先检查  trpgLevelSystemfunction.trpgLevelSystemfunction[i].trpgLevelSystemfunction[a].Title[0].Lvl 有没有那个LV的TITLE
      //没有  则使用预设

      //{user.name} 名字 {user.level} 等级 \
      ////{user.title} 称号
      // { user.exp } 经验值 { user.Ranking } 现在排名 \
      // { user.RankingPer} 现在排名百分比 \
      // { server.member_count } 现在频道中总人数 \

      rply.text = rankWord
        .replace(/{user.name}/gi, username)
        .replace(/{user.level}/gi, userlevel)
        .replace(/{user.exp}/gi, userexp)
        .replace(/{user.Ranking}/gi, userRanking)
        .replace(/{user.RankingPer}/gi, userRankingPer)
        .replace(/{server.member_count}/gi, usermember_count)
        .replace(/{user.title}/gi, userTitle);
      if (rply.text.match(/{user.displayName}/gi)) {
        let userDisplayName =
          (await getDisplayName(discordMessage)) || username || "无名";
        rply.text = rply.text.replace(/{user.displayName}/gi, userDisplayName);
      }
      return rply;
    }
    case /(^[.]level$)/i.test(mainMsg[0]) && /^showMe$/i.test(mainMsg[1]): {
      if (!groupid) {
        rply.text = "你不在社区当中，请在社区中使用。";
        return rply;
      }
      //显示社区头五名排名
      let RankNumber = 5;
      if (mainMsg[2]) {
        if (mainMsg[2] > 5 && mainMsg[2] <= 20) RankNumber = Number(mainMsg[2]);
        if (mainMsg[2] > 20) RankNumber = 20;
      }
      let doc = await schema.trpgLevelSystem
        .findOne({
          groupid: groupid,
          SwitchV2: true,
        })
        .catch((error) =>
          console.error(
            "level_system #514 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      if (!doc || !doc.SwitchV2) {
        rply.text =
          "此社区并有没有开启LEVEL功能. \n.level config 11 代表启动功能 \
                    \n 数字11代表等级升级时会进行通知，10代表不会自动通知，\
                    \n 00的话代表不启动功能\n";
        return rply;
      }
      let docMember = await schema.trpgLevelSystemMember
        .find({
          groupid: groupid,
        })
        .sort({
          EXP: -1,
        })
        .limit(RankNumber)
        .catch((error) =>
          console.error(
            "level_system #525 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      if (docMember.length < 1) {
        rply.text = "此社区未有足够资料\n";
        return rply;
      }
      rply.quotes = true;
      rply.text = await rankingList(doc, docMember, RankNumber, "社区排行榜");
      return rply;
    }
    case /(^[.]level$)/i.test(mainMsg[0]) &&
      /^showMeAtTheWorld$/i.test(mainMsg[1]): {
      //显示自己的排名
      let myExp = await schema.trpgLevelSystemMember
        .findOne({ groupid: groupid, userid: userid })
        .catch((error) =>
          console.error(
            "level_system #537 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      if (!myExp || !myExp.EXP) {
        rply.text = "未有找到你的资料，请检查有没有开启经验值功能";
        return rply;
      }
      let docMember = await schema.trpgLevelSystemMember
        .find({ EXP: { $gt: myExp.EXP } })
        .countDocuments()
        .catch((error) =>
          console.error(
            "level_system #543 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      rply.text = `你现在的世界排名是第${docMember + 1}名`;
      return rply;
    }
    case /(^[.]level$)/i.test(mainMsg[0]) &&
      /^showMeTheWorld$/i.test(mainMsg[1]): {
      //显示世界头六名排名
      let RankNumber = 6;
      if (mainMsg[2]) {
        if (mainMsg[2] > 6 && mainMsg[2] <= 20) RankNumber = Number(mainMsg[2]);
        if (mainMsg[2] > 20) RankNumber = 20;
      }
      let docMember = await schema.trpgLevelSystemMember
        .find({}, { name: 1, EXP: 1, Level: 1 })
        .sort({
          EXP: -1,
        })
        .limit(RankNumber)
        .catch((error) =>
          console.error(
            "level_system #559 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      let docMemberCount = await schema.trpgLevelSystemMember
        .countDocuments({})
        .catch((error) =>
          console.error(
            "level_system #560 mongoDB error: ",
            error.name,
            error.reson
          )
        );

      if (docMember.length < 1) {
        rply.text = "此社区未有足够资料\n";
        return rply;
      }
      rply.quotes = true;
      rply.text = await rankingList(
        {},
        docMember,
        RankNumber,
        "世界排行榜",
        docMemberCount
      );
      return rply;
    }
    default:
      break;
  }

  function setNew(a, result) {
    let b = /-(\d+)\s+(\S+)/gi;
    let e = /-(\d+)\s+(\S+)/;
    //let f = [];
    let c = a.match(b);
    let d = [];
    if (c)
      for (let i = 0; i < c.length; i++) {
        d[i] = e.exec(c[i]);
      }
    if (d)
      for (let i = 0; i < d.length; i++) {
        //限制0-500以內
        if (d[i][1] && d[i][2] && d[i][1] <= 500 && d[i][1] >= 0)
          result[d[i][1]] = d[i][2];
      }

    return result;
  }

  async function rankingList(gp, who, RankNumber, Title, docMemberCount) {
    let array = [];
    let answer = "";
    let tempTitleAll = gp.Title || [];

    for (let key in who) {
      array.push(who[key]);
    }
    array.sort(function (a, b) {
      return b.Level - a.Level;
    });
    let rank = 1;
    for (let i = 0; i < array.length; i++) {
      if (i > 0 && array[i].Level < array[i - 1].Level) {
        rank++;
      }
      array[i].rank = rank;
    }
    for (let b = 0; b < RankNumber; b++) {
      if (array && array[b]) {
        if (b == 0) {
          answer += Title;
          answer +=
            Title == "世界排行榜"
              ? " (人口: " + docMemberCount + "人)\n┌"
              : "\n┌";
        } else if (b < RankNumber - 1 && b < array.length - 1) {
          answer += "├";
        } else if (b == RankNumber - 1 || b == array.length - 1) {
          answer += "└";
        }
        answer += "第" + (Number([b]) + 1) + "名 ";
        answer +=
          "《" + (await checkTitle(array[b].Level, tempTitleAll)) + "》 ";
        answer +=
          array[b].name +
          " " +
          array[b].Level +
          "级 " +
          (await kMGTPE(parseInt(array[b].EXP), 1)) +
          "经验\n";
      }
    }
    return answer;
  }

  //将千位以上变成約数
  async function kMGTPE(num, fixed) {
    if (num === null) {
      return null;
    } // terminate early
    if (num === 0) {
      return "0";
    } // terminate early
    fixed = !fixed || fixed < 0 ? 0 : fixed; // number of decimal places to show
    let b = num.toPrecision(2).split("e"), // get power
      k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
      c =
        k < 1
          ? num.toFixed(0 + fixed)
          : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
      d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
      e = d + ["", "K", "M", "B", "T"][k]; // append power
    return e;
  }
};

module.exports = {
  rollDiceCommand: rollDiceCommand,
  initialize: initialize,
  getHelpMessage: getHelpMessage,
  prefixs: prefixs,
  gameType: gameType,
  gameName: gameName,
  Title: Title,
  checkTitle: checkTitle,
};

async function getDisplayName(message) {
  if (!message) return;
  const member = await message.guild.members.fetch(message.author);
  let nickname = member ? member.displayName : message.author.username;
  return nickname;
}

/*
let trpgLevelSystemfunction = [{
        nickname: "Bob",
        EXP: 100
    },
    {
        nickname: "Amy",
        EXP: 200
    },
    {
        nickname: "Grant",
        EXP: 1300
    },
    {
        nickname: "Steve",
        EXP: 4200
    },
    {
        nickname: "Joe",
        EXP: 500
    }
];
function rankingList(who) {
    let array = [];

    for (let key in trpgLevelSystemfunction) {
        array.push(trpgLevelSystemfunction[key]);

    }

    array.sort(function (a, b) {
        return b.EXP - a.EXP;
    });

    let rank = 1;
    for (let i = 0; i < array.length; i++) {
        if (i > 0 && array[i].EXP < array[i - 1].EXP) {
            rank++;
        }
        array[i].rank = rank;
    }
    for (let b = 0; b < array.length; b++) {
            document.write("第",Number([b])+1, "名 ",array[b].nickname ," ",array[b].EXP," <br\>");

    }


}
rankingList('Joe');

┌
├
├
├
└

let a = ".lev  -3 a -34 bc -1 DEF -2   Gh i -30 JK -45 ab 23"
let b = /-(\d+)\s+(\S+)/ig
let e = /-(\d+)\s+(\S+)/

let f = [];

let c = a.match(b);
document.write(c,"<br\>");
for (let z=0 ;z<c.length;z++)
{
document.write(z," ", c[z],"<br\>");
}
document.write("<br\>");
let d=[];
for (let i=0 ;i<c.length;i++)
{
d[i]=e.exec(c[i])
f.push({lvl:d[i][1],Title:d[i][2]})

document.write(i," ",d[i],"<br\>");
}
document.write("<br\>");
for(let dd=0;dd<f.length;dd++)
document.write(f[dd].lvl," ",f[dd].Title,"<br\>");
*/
