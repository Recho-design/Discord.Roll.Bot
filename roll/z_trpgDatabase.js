"use strict";
if (!process.env.mongoURL) {
  return;
}
const rollbase = require("./rollbase.js");
const records = require("../modules/records.js");
const schema = require("../modules/schema.js");
let trpgDatabasefunction = {};
records.get("trpgDatabase", (msgs) => {
  trpgDatabasefunction.trpgDatabasefunction = msgs;
});
const checkTools = require("../modules/check.js");
records.get("trpgDatabaseAllgroup", (msgs) => {
  trpgDatabasefunction.trpgDatabaseAllgroup = msgs;
});
const VIP = require("../modules/veryImportantPerson");
const FUNCTION_LIMIT = [30, 200, 200, 300, 300, 300, 300, 300];
const gameName = function () {
  return "【资料库功能】 .db(p) (add del show 自定关鍵字)";
};
const gameType = function () {
  return "funny:trpgDatabase:骰娘爱你哦💖";
};
const prefixs = function () {
  return [
    {
      first: /(^[.]db(p|)$)/gi,
      second: null,
    },
  ];
};
const getHelpMessage = async function () {
  return `【资料库功能】
这是根据关键词来显示数据的,
例如输入 .db add 九大阵营 守序善良 (...太长省略) 中立邪恶 混乱邪恶 
再输入.db 九大阵营  守序善良 (...太长省略) 中立邪恶 混乱邪恶
add 后面第一个是关键词, 可以是汉字,数字,英文及emoji
P.S.如果没立即生效 用.db show 刷新一下
输入.db add (关键词) (内容)即可增加关键词
输入.db show 显示所有关键词
输入.db del(编号)或all 即可删除
输入.db  (关键词) 即可显示 
如使用输入.dbp 会变成全服版,全服可看, 可用add show功能 
新增指令 - 输入.dbp newType 可以观看效果
* {br}          <--隔一行
* {ran:100}     <---随机1-100
* {random:5-20} <---随机5-20
* {server.member_count}  <---现在频道中总人数 
* {my.name}     <---显示掷骰者名字
以下需要开启.level 功能
* {allgp.name}  <---随机全GP其中一人名字
* {allgp.title}  <---随机全GP其中一种称号
* {my.RankingPer}  <---现在排名百分比 
* {my.Ranking}  <---显示掷骰者现在排名 
* {my.exp}      <---显示掷骰者经验值
* {my.title}    <---显示掷骰者称号
* {my.level}    <---显示掷骰者等级
`;
};
const initialize = function () {
  return trpgDatabasefunction;
};
exports.z_Level_system = require("./z_Level_system");
// eslint-disable-next-line no-unused-vars
const rollDiceCommand = async function ({
  inputStr,
  mainMsg,
  groupid,
  userrole,
  userid,
  displayname,
  displaynameDiscord,
  membercount,
}) {
  let rply = {
    default: "on",
    type: "text",
    text: "",
  };
  let checkifsamename = 0;
  let checkifsamenamegroup = 0;
  let tempshow = 0;
  let temp2 = 0;
  let lv;
  let limit = FUNCTION_LIMIT[0];
  switch (true) {
    case /^help$/i.test(mainMsg[1]) || !mainMsg[1]:
      rply.text = await this.getHelpMessage();
      rply.quotes = true;
      return rply;

    // .DB(0) ADD(1) TOPIC(2) CONTACT(3)
    case /(^[.]db$)/i.test(mainMsg[0]) &&
      /^add$/i.test(mainMsg[1]) &&
      /^(?!(add|del|show)$)/gi.test(mainMsg[2]): {
      //增加资料库
      //检查有没有重覆
      if (!mainMsg[2]) rply.text += " 没有输入标题。\n\n";
      if (!mainMsg[3]) rply.text += " 没有输入內容。\n\n";
      if (
        (rply.text += checkTools.permissionErrMsg({
          flag: checkTools.flag.ChkChannelManager,
          gid: groupid,
          role: userrole,
        }))
      ) {
        return rply;
      }

      lv = await VIP.viplevelCheckGroup(groupid);
      limit = FUNCTION_LIMIT[lv];

      if (trpgDatabasefunction.trpgDatabasefunction)
        for (
          let i = 0;
          i < trpgDatabasefunction.trpgDatabasefunction.length;
          i++
        ) {
          if (trpgDatabasefunction.trpgDatabasefunction[i].groupid == groupid) {
            if (
              trpgDatabasefunction.trpgDatabasefunction[0] &&
              trpgDatabasefunction.trpgDatabasefunction[0]
                .trpgDatabasefunction[0]
            ) {
              if (
                trpgDatabasefunction.trpgDatabasefunction[i]
                  .trpgDatabasefunction.length >= limit
              ) {
                rply.text = "关鍵字上限" + limit + "个";
                return rply;
              }
              for (
                let a = 0;
                a <
                trpgDatabasefunction.trpgDatabasefunction[i]
                  .trpgDatabasefunction.length;
                a++
              ) {
                if (
                  trpgDatabasefunction.trpgDatabasefunction[i]
                    .trpgDatabasefunction[a].topic == mainMsg[2]
                ) {
                  checkifsamename = 1;
                }
              }
            }
          }
        }
      let temp = {
        groupid: groupid,
        trpgDatabasefunction: [
          {
            topic: mainMsg[2],
            contact: inputStr
              .replace(/\.db\s+add\s+/i, "")
              .replace(mainMsg[2], "")
              .replace(/^\s+/, ""),
          },
        ],
      };
      if (checkifsamename == 0) {
        records.pushtrpgDatabasefunction("trpgDatabase", temp, () => {
          records.get("trpgDatabase", (msgs) => {
            trpgDatabasefunction.trpgDatabasefunction = msgs;
          });
        });
        rply.text = "新增成功: " + mainMsg[2];
      } else rply.text = "新增失败. 重复标题";

      return rply;
    }
    case /(^[.]db$)/i.test(mainMsg[0]) &&
      /^del$/i.test(mainMsg[1]) &&
      /^all$/i.test(mainMsg[2]):
      //刪除资料库
      if (
        (rply.text = checkTools.permissionErrMsg({
          flag: checkTools.flag.ChkChannelManager,
          gid: groupid,
          role: userrole,
        }))
      ) {
        return rply;
      }

      for (
        let i = 0;
        i < trpgDatabasefunction.trpgDatabasefunction.length;
        i++
      ) {
        if (trpgDatabasefunction.trpgDatabasefunction[i].groupid == groupid) {
          let temp = trpgDatabasefunction.trpgDatabasefunction[i];
          temp.trpgDatabasefunction = [];
          records.settrpgDatabasefunction("trpgDatabase", temp, () => {
            records.get("trpgDatabase", (msgs) => {
              trpgDatabasefunction.trpgDatabasefunction = msgs;
            });
          });
          rply.text = "刪除所有关鍵字";
        }
      }
      return rply;
    case /(^[.]db$)/i.test(mainMsg[0]) &&
      /^del$/i.test(mainMsg[1]) &&
      /^\d+$/i.test(mainMsg[2]):
      //刪除资料库
      if (!mainMsg[2]) rply.text += "没有关鍵字. \n\n";
      if (
        (rply.text += checkTools.permissionErrMsg({
          flag: checkTools.flag.ChkChannelManager,
          gid: groupid,
          role: userrole,
        }))
      ) {
        return rply;
      }

      for (
        let i = 0;
        i < trpgDatabasefunction.trpgDatabasefunction.length;
        i++
      ) {
        if (
          trpgDatabasefunction.trpgDatabasefunction[i].groupid == groupid &&
          mainMsg[2] <
            trpgDatabasefunction.trpgDatabasefunction[i].trpgDatabasefunction
              .length &&
          mainMsg[2] >= 0
        ) {
          let temp = trpgDatabasefunction.trpgDatabasefunction[i];
          temp.trpgDatabasefunction.splice(mainMsg[2], 1);
          records.settrpgDatabasefunction("trpgDatabase", temp, () => {
            records.get("trpgDatabase", (msgs) => {
              trpgDatabasefunction.trpgDatabasefunction = msgs;
            });
          });
        }
        rply.text = "刪除成功: " + mainMsg[2];
      }

      return rply;

    case /(^[.]db$)/i.test(mainMsg[0]) && /^show$/i.test(mainMsg[1]):
      //显示
      records.get("trpgDatabase", (msgs) => {
        trpgDatabasefunction.trpgDatabasefunction = msgs;
      });
      if (!groupid) {
        rply.text = "不在社区. ";
        return rply;
      }
      let temp = 0;
      if (trpgDatabasefunction.trpgDatabasefunction)
        for (
          let i = 0;
          i < trpgDatabasefunction.trpgDatabasefunction.length;
          i++
        ) {
          if (trpgDatabasefunction.trpgDatabasefunction[i].groupid == groupid) {
            rply.text += "资料库列表:";
            for (
              let a = 0;
              a <
              trpgDatabasefunction.trpgDatabasefunction[i].trpgDatabasefunction
                .length;
              a++
            ) {
              temp = 1;
              rply.text +=
                (a % 2 && a != 1) || a == 0
                  ? "\n" +
                    a +
                    ": " +
                    trpgDatabasefunction.trpgDatabasefunction[i]
                      .trpgDatabasefunction[a].topic
                  : "       " +
                    a +
                    ": " +
                    trpgDatabasefunction.trpgDatabasefunction[i]
                      .trpgDatabasefunction[a].topic;
            }
          }
          if (temp == 0) rply.text = "没有已设定的关鍵字. ";
        }
      rply.quotes = true;
      //显示资料库
      rply.text = rply.text
        .replace(/^([^(,)\1]*?)\s*(,)\s*/gm, "$1: ")
        .replace(/,/gm, ", ");
      return rply;
    case /(^[.]db$)/i.test(mainMsg[0]) &&
      /\S/i.test(mainMsg[1]) &&
      /^(?!(add|del|show)$)/gi.test(mainMsg[1]): {
      //显示关鍵字
      //let times = /^[.]db/.exec(mainMsg[0])[1] || 1
      //if (times > 30) times = 30;
      //if (times < 1) times = 1
      if (!groupid) {
        rply.text = "不在社区. ";
        return rply;
      }
      let temp = 0;
      if (trpgDatabasefunction.trpgDatabasefunction && mainMsg[1])
        for (
          let i = 0;
          i < trpgDatabasefunction.trpgDatabasefunction.length;
          i++
        ) {
          if (trpgDatabasefunction.trpgDatabasefunction[i].groupid == groupid) {
            //rply.text += '资料库列表:'
            for (
              let a = 0;
              a <
              trpgDatabasefunction.trpgDatabasefunction[i].trpgDatabasefunction
                .length;
              a++
            ) {
              if (
                trpgDatabasefunction.trpgDatabasefunction[
                  i
                ].trpgDatabasefunction[a].topic.toLowerCase() ==
                mainMsg[1].toLowerCase()
              ) {
                temp = 1;
                rply.text = `【${trpgDatabasefunction.trpgDatabasefunction[i].trpgDatabasefunction[a].topic}】\n${trpgDatabasefunction.trpgDatabasefunction[i].trpgDatabasefunction[a].contact}`;
              }
            }
          }
        }
      if (temp == 0) rply.text = "没有相关关鍵字. ";
      rply.text = await replaceAsync(rply.text, /{(.*?)}/gi, replacer);

      // rply.text = rply.text.replace(/,/mg, ' ')
      return rply;
    }
    case /(^[.]dbp$)/i.test(mainMsg[0]) &&
      /^add$/i.test(mainMsg[1]) &&
      /^(?!(add|del|show)$)/gi.test(mainMsg[2]):
      //if (!mainMsg[2]) return;
      if (rply && trpgDatabasefunction.trpgDatabaseAllgroup && mainMsg[2])
        if (
          rply &&
          trpgDatabasefunction.trpgDatabaseAllgroup &&
          trpgDatabasefunction.trpgDatabaseAllgroup[0] &&
          trpgDatabasefunction.trpgDatabaseAllgroup[0].trpgDatabaseAllgroup[0]
        ) {
          if (
            trpgDatabasefunction.trpgDatabaseAllgroup[0].trpgDatabaseAllgroup
              .length > 100
          ) {
            rply.text = "只可以有100个关鍵字啊";
            return rply;
          }
          for (
            let i = 0;
            i < trpgDatabasefunction.trpgDatabaseAllgroup.length;
            i++
          ) {
            for (
              let a = 0;
              a <
              trpgDatabasefunction.trpgDatabaseAllgroup[i].trpgDatabaseAllgroup
                .length;
              a++
            ) {
              if (
                trpgDatabasefunction.trpgDatabaseAllgroup[
                  i
                ].trpgDatabaseAllgroup[a].topic.toLowerCase() ==
                mainMsg[2].toLowerCase()
              ) {
                checkifsamenamegroup = 1;
              }
            }
          }
        }
      if (mainMsg[3]) {
        let tempA = {
          trpgDatabaseAllgroup: [
            {
              topic: mainMsg[2],
              contact: inputStr
                .replace(/\.dbp add /i, "")
                .replace(mainMsg[2], "")
                .replace(/^\s+/, ""),
            },
          ],
        };
        if (checkifsamenamegroup == 0) {
          records.pushtrpgDatabaseAllgroup(
            "trpgDatabaseAllgroup",
            tempA,
            () => {
              records.get("trpgDatabaseAllgroup", (msgs) => {
                trpgDatabasefunction.trpgDatabaseAllgroup = msgs;
              });
            }
          );
          rply.text = "新增成功: " + mainMsg[2];
        } else {
          rply.text = "新增失败. 重复关鍵字";
        }
      } else {
        rply.text = "新增失败.";
        if (!mainMsg[2]) rply.text += " 没有关鍵字.";
        if (!mainMsg[3]) rply.text += " 没有內容.";
      }
      return rply;
    case /(^[.]dbp$)/i.test(mainMsg[0]) && /^show$/i.test(mainMsg[1]):
      records.get("trpgDatabaseAllgroup", (msgs) => {
        trpgDatabasefunction.trpgDatabaseAllgroup = msgs;
      });
      if (trpgDatabasefunction.trpgDatabaseAllgroup)
        for (
          let i = 0;
          i < trpgDatabasefunction.trpgDatabaseAllgroup.length;
          i++
        ) {
          rply.text += "资料库列表:";
          for (
            let a = 0;
            a <
            trpgDatabasefunction.trpgDatabaseAllgroup[i].trpgDatabaseAllgroup
              .length;
            a++
          ) {
            tempshow = 1;
            rply.text +=
              (a % 2 && a != 1) || a == 0
                ? "\n" +
                  a +
                  ": " +
                  trpgDatabasefunction.trpgDatabaseAllgroup[i]
                    .trpgDatabaseAllgroup[a].topic
                : "      " +
                  a +
                  ": " +
                  trpgDatabasefunction.trpgDatabaseAllgroup[i]
                    .trpgDatabaseAllgroup[a].topic;
          }
        }
      if (tempshow == 0) rply.text = "没有已设定的关鍵字. ";
      //显示资料库
      rply.text = rply.text
        .replace(/^([^(,)\1]*?)\s*(,)\s*/gm, "$1: ")
        .replace(/,/gm, ", ");
      return rply;
    case /(^[.]dbp$)/i.test(mainMsg[0]) &&
      /\S/i.test(mainMsg[0]) &&
      /^(?!(add|del|show)$)/gi.test(mainMsg[1]):
      //let timesgp = /^[.]dbp/.exec(mainMsg[0])[1] || 1
      //  if (timesgp > 30) timesgp = 30;
      //  if (timesgp < 1) timesgp = 1
      if (trpgDatabasefunction.trpgDatabaseAllgroup && mainMsg[1])
        for (
          let i = 0;
          i < trpgDatabasefunction.trpgDatabaseAllgroup.length;
          i++
        ) {
          for (
            let a = 0;
            a <
            trpgDatabasefunction.trpgDatabaseAllgroup[i].trpgDatabaseAllgroup
              .length;
            a++
          ) {
            if (
              trpgDatabasefunction.trpgDatabaseAllgroup[i].trpgDatabaseAllgroup[
                a
              ].topic.toLowerCase() == mainMsg[1].toLowerCase()
            ) {
              temp2 = 1;
              rply.text = `【${trpgDatabasefunction.trpgDatabaseAllgroup[i].trpgDatabaseAllgroup[a].topic}】
${trpgDatabasefunction.trpgDatabaseAllgroup[i].trpgDatabaseAllgroup[a].contact}`;
            }
          }
        }
      if (temp2 == 0) rply.text = "没有相关关鍵字. ";
      rply.text = await replaceAsync(rply.text, /{(.*?)}/gi, replacer);
      return rply;
    default:
      break;
  }
  async function replacer(first, second) {
    let temp = "",
      num = 0,
      temp2 = "";
    switch (true) {
      case /^ran:\d+/i.test(second):
        temp = /^ran:(\d+)/i.exec(second);
        if (!temp || !temp[1]) return " ";
        return rollbase.Dice(temp[1]) || " ";
      case /^random:\d+/i.test(second):
        temp = /^random:(\d+)-(\d+)/i.exec(second);
        if (!temp || !temp[1] || !temp[2]) return " ";
        return rollbase.DiceINT(temp[1], temp[2]) || " ";
      case /^allgp.name$/i.test(second):
        temp = await findGpMember(groupid);
        if (!temp) return " ";
        num = rollbase.DiceINT(0, temp.length - 1);
        num = num < 1 ? 0 : num;
        temp = temp[num].name;
        return temp || " ";
      // * {allgp.name} <---随机全GP其中一人名字
      case /^allgp.title$/i.test(second):
        temp = await findGp(
          groupid,
          userid,
          displayname,
          displaynameDiscord,
          membercount
        );
        if (!temp) return " ";
        if (temp.Title.length == 0) {
          temp.Title = exports.z_Level_system.Title();
        }
        temp2 = await temp.Title.filter(function (item) {
          return item;
        });
        num = rollbase.DiceINT(0, temp2.length - 1);
        num = num < 1 ? 0 : num;
        temp = temp2[num];
        return temp || " ";
      // * {allgp.title}<---随机全GP其中一种称号
      case /^server.member_count$/i.test(second):
        temp = await findGpMember(groupid);
        num =
          temp && temp.length
            ? Math.max(membercount, temp.length)
            : membercount;
        return num || " ";
      //  {server.member_count} 现在频道中总人数 \
      case /^my.RankingPer$/i.test(second): {
        //* {my.RankingPer} 现在排名百分比 \
        // let userRankingPer = Math.ceil(userRanking / usermember_count * 10000) / 100 + '%';
        let gpMember = await findGpMember(groupid);
        temp2 = await ranking(userid, gpMember);
        if (!temp2) return " ";
        num =
          temp && gpMember.length
            ? Math.max(membercount, gpMember.length)
            : membercount;
        temp2 = Math.ceil((temp2 / num) * 10000) / 100 + "%";
        return temp2 || " ";
      }
      case /^my.Ranking$/i.test(second): {
        let gpMember = await findGpMember(groupid);
        //* {my.Ranking} 显示掷骰者现在排名 \
        if (!gpMember) return " ";
        return (await ranking(userid, gpMember)) || " ";
      }
      case /^my.exp$/i.test(second):
        //* {my.exp} 显示掷骰者经验值
        temp = await findGp(
          groupid,
          userid,
          displayname,
          displaynameDiscord,
          membercount
        );
        temp2 = await findUser(groupid, userid);
        if (!temp || !temp2 || !temp2.EXP) return " ";
        return temp2.EXP || " ";
      case /^my.name$/i.test(second):
        //* {my.name} <---显示掷骰者名字
        return displaynameDiscord || displayname || "无名";
      case /^my.title$/i.test(second):
        // * {my.title}<---显示掷骰者称号
        temp = await findGp(
          groupid,
          userid,
          displayname,
          displaynameDiscord,
          membercount
        );
        temp2 = await findUser(groupid, userid);
        if (!temp || !temp2 || !temp2.Level || !temp.Title) return " ";
        //   let userTitle = await this.checkTitle(userlevel, trpgLevelSystemfunction.trpgLevelSystemfunction[i].Title);
        return (
          (await exports.z_Level_system.checkTitle(temp2.Level, temp.Title)) ||
          " "
        );
      case /^my.level$/i.test(second):
        //* {my.level}<---显示掷骰者等级
        temp2 = await findUser(groupid, userid);
        if (!temp2 || !temp2.Level) return " ";
        return temp2.Level || " ";
      case /^br$/i.test(second):
        temp = "\n";
        return temp || " ";
      default:
        break;
    }
  }
};
async function findGp(groupid) {
  if (!process.env.mongoURL || !groupid) {
    return;
  }
  //1. 检查GROUP ID 有没有开启CONFIG 功能 1
  let gpInfo = await schema.trpgLevelSystem
    .findOne({
      groupid: groupid,
    })
    .catch((error) =>
      console.error("db #430 mongoDB error: ", error.name, error.reson)
    );
  if (!gpInfo || gpInfo.SwitchV2 != 1) return;
  // userInfo.name = displaynameDiscord || displayname || '无名'
  return gpInfo;
  //6 / 7 * LVL * (2 * LVL * LVL + 30 * LVL + 100)
}
async function findGpMember(groupid) {
  if (!process.env.mongoURL || !groupid) {
    return;
  }
  //1. 检查GROUP ID 有没有开启CONFIG 功能 1
  let gpInfo = await schema.trpgLevelSystemMember
    .find({
      groupid: groupid,
    })
    .catch((error) =>
      console.error("db #443 mongoDB error: ", error.name, error.reson)
    );
  // userInfo.name = displaynameDiscord || displayname || '无名'
  return gpInfo;
  //6 / 7 * LVL * (2 * LVL * LVL + 30 * LVL + 100)
}

async function findUser(groupid, userid) {
  if (!groupid || !userid) return;
  let userInfo = await schema.trpgLevelSystemMember
    .findOne({
      groupid: groupid,
      userid: userid,
    })
    .catch((error) =>
      console.error("db #454 mongoDB error: ", error.name, error.reson)
    );
  // userInfo.name = displaynameDiscord || displayname || '无名'
  return userInfo;
  //6 / 7 * LVL * (2 * LVL * LVL + 30 * LVL + 100)
}

async function ranking(who, data) {
  let array = [];
  let answer = "0";
  for (let key in data) {
    await array.push(data[key]);
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
    if (array[b].userid == who) answer = b + 1;
  }
  return answer;
}

async function replaceAsync(str, regex, asyncFn) {
  const promises = [];
  str.replace(regex, (match, ...args) => {
    const promise = asyncFn(match, ...args);
    promises.push(promise);
  });
  const data = await Promise.all(promises);
  return str.replace(regex, () => data.shift());
}

module.exports = {
  rollDiceCommand: rollDiceCommand,
  initialize: initialize,
  getHelpMessage: getHelpMessage,
  prefixs: prefixs,
  gameType: gameType,
  gameName: gameName,
};
