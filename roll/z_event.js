"use strict";
if (!process.env.mongoURL) {
  return;
}
const checkMongodb = require("../modules/dbWatchdog.js");
const debugMode = process.env.DEBUG ? true : false;
let variables = {};
const rollDice = require("./rollbase");
const schema = require("../modules/schema.js");
const VIP = require("../modules/veryImportantPerson");
const FUNCTION_LIMIT = [4, 20, 20, 30, 30, 99, 99, 99];
const EN_RECOVER_TIME = 10 * 60 * 1000; //每10分钟回复一点;
const gameName = function () {
  return "【事件功能】 .event (add edit show delete) .evt (event 任何名字)";
};
const gameType = function () {
  return "Funny:trpgevent:hktrpg";
};
const prefixs = function () {
  return [
    {
      first: /(^[.]event$)|(^[.]evt$)/gi,
      second: null,
    },
  ];
};

const convertRegex = function (str) {
  return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
};
const regexMain = new RegExp(/^((-)?\d):(.*)/, "igm");
const regexExp = new RegExp(/^exp:(.*)/, "im");
const regexName = new RegExp(/^name:(.*)/, "im");
const regexChainTitle = new RegExp(/^chain:(.*)/, "im");

const opt = {
  upsert: true,
  runValidators: true,
};
const ENemoji = function (per) {
  switch (true) {
    case per <= 0:
      return "▯▯▯▯▯▯";
    case per <= 20:
      return "▮▯▯▯▯▯";
    case per <= 40:
      return "▮▮▯▯▯▯";
    case per <= 60:
      return "▮▮▮▯▯▯";
    case per <= 80:
      return "▮▮▮▮▯▯";
    case per <= 99:
      return "▮▮▮▮▮▯";
    default:
      return "▮▮▮▮▮▮";
  }
};

/**
 *
 * TODO:
 * 状態包括HKTRPG 有特別效果, 如名字改变?动物EMOJI?
 * @!$%#&%$&^%亂码ETC?
 *
 *
 */

const getHelpMessage = function () {
  return `【事件功能】.event (add delete show) .evt (random/事件名称)
经由新增的事件，会得到一些状态或增加减少经验值，
并可以赚取额外经验值。
---
.event add 详情看下面说明 - 新增事件
.event delete (事件名称) - 删除事件
.event show             - 显示你新增的所有事件, 及赚取了的EXP
.event show (事件名称)   - 显示你新增的指定事件详情
.event useExp           - 在社区中使用, 将会得到你赚取的EXP
---
.evt random     - 进入随机的事件, 消耗5EN
.evt (系列名称)  - 进入指定的系列事件, 消耗10EN
.evt (事件名称)  - 进入指定的事件, 消耗15EN
---
EN上限 = 20 LV
每10分钟回复1点EN
得知事件名称的方法，别人告知 或 经随机事件知道名字
设计事件的好处
能够吸收对方消耗的en和经验值 作为自己赚取到的经验值
---
新增事件的格式示例
.event add
name:Haha
chain:开心系列
exp:SAN
0:你今天的运气真好;你是个好人;我爱你
-1:你中招了;你不好运要-SAN了
1:你吃了好味的糖，加SAN
----
name -> 事件标题
chain-> 系列名称，别人可以指定该系列来进行抽选
exp  -> (可选)经验值的名称, 例如改成SAN, 会变成「你损失了X点SAN」
0:你今天的运气真好;你是个好人;我爱你 ->
(事件类型):(事件的描述);(事件的描述2);(事件的描述3)
事件的描述 ->会从描述1,2,3选取其中一个.
事件类型  -> 
0. 没有事发生
1. 直接增加X点经验
2. 未来X次里会得到 X 倍经验值
3. 赠送社区所有人1点经验
4. 赠送作者已赚取到的经验给玩家
5. 从整个CHANNEL 的X人吸收X点经验
-1. 直接减少X点经验
-2. 停止得到经验(X次)
-3. 被事件开发者吸收X点经验
-4. 分发X经验给整个CHANNEL中的X人
-5. 每次发言减少X经验(X次内)
----
限制
A. 一个事件中，正面选项要比负面选项多
B. 一个事件中，可以有3 (ROUNDDOWN 设计者LV/10)  项选项
C. 一个事件中，不可以全部正面效果
D. 一个事件可用的总EN 为(10 LV)，负面事件消耗X点EN
`;
};

const initialize = function () {
  return variables;
};

const rollDiceCommand = async function ({
  inputStr,
  mainMsg,
  groupid,
  userid,
  displayname,
  displaynameDiscord,
}) {
  let rply = {
    default: "on",
    type: "text",
    text: "",
    characterReRoll: false,
    characterName: "",
    characterReRollName: "",
    qu: true,
  };
  let filter = {};
  let doc = {};
  let events = {};
  let temp;
  let tempMain = {};
  let lv;
  let limit = FUNCTION_LIMIT[0];
  let check;
  let levelLv = 0;
  /**
   * .event
   * .event add 事件    新增事件
   * .event delete 事件  刪除事件
   * .event show  空白/ (事件名称)
   * 空白显示列表
   * .evt
   */
  /**
   * .event add
   * name:神奇事件
   * exp:SAN
   * 0:你今天的运氣真好;你是个好人;我爱你
   * -1:你中招了:你不好运要-SAN了
   * 1:你吃了好味的糖，加SAN人
   */
  if (!checkMongodb.isDbOnline()) return;
  switch (true) {
    case /^help$/i.test(mainMsg[1]) || !mainMsg[1]: {
      rply.text = this.getHelpMessage();
      rply.quotes = true;
      return rply;
    }
    case /(^[.]event$)/i.test(mainMsg[0]) &&
      /^add$/i.test(mainMsg[1]) &&
      /^\S+$/.test(mainMsg[2]): {
      events = await analysicInputData(inputStr); //分析输入的资料

      if (!events || !events.MainData || !events.eventName) {
        rply.text = `没有输入事件或名字，请重新整理內容 格式为
.event add
name:Haha
chain:开心系列
exp:SAN
0:你今天的运气真好;你是个好人;我爱你
-1:你中招了;你不好运要-SAN了
1:你吃了好吃的糖，加SAN`;
        return rply;
      }

      /*
            基本只限四次事件.
            使用VIPCHECK
            */
      lv = await VIP.viplevelCheckUser(userid);
      let gpLv = await VIP.viplevelCheckGroup(groupid);
      lv = gpLv > lv ? gpLv : lv;
      limit = FUNCTION_LIMIT[lv];
      check = await schema.eventList.find({
        userID: userid,
      });
      levelLv = await findMaxLv(userid);

      //取得本来的资料, 如有重覆, 以新的覆蓋
      //doc = await schema.event.findOne(filter);
      let mainSplit = await analysicDetail(events.MainData);
      if (mainSplit.length < 3 || mainSplit.length > Number(3 + levelLv)) {
        rply.text =
          "新增事件失败\n一个事件需要至少设定 3 个结果\n你现在的VIP LV最多同时可设定 " +
          Number(3 + levelLv) +
          " 个事件";
        return rply;
      }
      //至少一个是正面
      let positiveCheck = false;
      for (let index = 0; index < mainSplit.length; index++) {
        Number(mainSplit[index].result) > 0 ? (positiveCheck = true) : null;
        levelLv += Number(mainSplit[index].result);
      }

      if (!positiveCheck) {
        rply.text = "新增事件失败\n需要至少设定一个正面事件";
        return rply;
      }
      if (levelLv < 0) {
        rply.text =
          "新增事件失败\n因为不可以过多负面事件\n事件种类加(使用者LV/10)必需高于0\n现在加起来是" +
          levelLv +
          " 点";
        return rply;
      }

      let listDatas = {
        title: events.eventName,
        userID: userid,
        userName: displaynameDiscord || displayname || "",
        detail: mainSplit,
        expName: events.expName || "",
        chainTitle: events.eventChain || "",
      };

      filter = {
        userID: userid,
        title: {
          $regex: new RegExp("^" + convertRegex(events.eventName) + "$", "i"),
        },
      };
      try {
        doc = await schema.eventList.updateOne(filter, listDatas, opt);
      } catch (error) {
        console.error("新增事件 GET ERROR: ", error);
        rply.text = "新增事件失败\n因为 " + error.message;
        return rply;
      }
      if (!doc && check && check.length >= limit) {
        rply.text =
          "你的事件上限为" +
          limit +
          "件";
        return rply;
      }
      tempMain = await schema.eventList.findOne(filter);

      let eventsDatas = {
        userID: userid,
        userName: displaynameDiscord || displayname || "",
        eventList: {
          title: events.eventName,
          eventID: tempMain._id,
        },
      };
      if (!tempMain._id) {
        rply.text = "新增事件失败";
        return rply;
      }
      try {
        filter = {
          userID: userid,
        };
        temp = await schema.eventMember.findOne(filter);
        if (!temp) {
          temp = new schema.eventMember(eventsDatas);
        } else {
          let findEventId = temp.eventList.findIndex(
            (obj) => obj.eventID == tempMain._id
          );
          if (findEventId >= 0) {
            temp.eventList[findEventId] = {
              title: events.eventName,
              eventID: tempMain._id,
            };
            temp.userName = displaynameDiscord || displayname || "";
          } else {
            temp.eventList.push({
              title: events.eventName,
              eventID: tempMain._id,
            });
            temp.userName = displaynameDiscord || displayname || "";
          }
        }
        await temp.save();
      } catch (error) {
        console.error("新增事件 GET ERROR: ", error);
        rply.text = "新增事件失败\n因为 " + error.message;
        return rply;
      }
      //增加资料库
      //检查有没有重覆
      rply.text =
        "新增/修改事件 - " +
        tempMain.title +
        "\n经验值的名称: " +
        tempMain.expName +
        "\n";
      rply.text += tempMain.chainTitle
        ? `系列名称: ${tempMain.chainTitle}\n`
        : "";
      for (let index = 0; index < tempMain.detail.length; index++) {
        rply.text +=
          "类型:" +
          tempMain.detail[index].result +
          " 內容: " +
          tempMain.detail[index].event +
          "\n";
      }
      return rply;
    }
    case /(^[.]event$)/i.test(mainMsg[0]) &&
      /^delete$/i.test(mainMsg[1]) &&
      /^\S+$/.test(mainMsg[2]): {
      filter = {
        userID: userid,
        title: {
          $regex: new RegExp(
            "^" +
              convertRegex(
                inputStr
                  .replace(/^\.event\s+delete\s+/gi, "")
                  .replace(/\s+$/, "")
              ) +
              "$",
            "i"
          ),
        },
      };
      doc = await schema.eventList.findOne(filter);
      if (!doc) {
        rply.text = "没有此事件.";
        return rply;
      }
      try {
        await schema.eventList.findOneAndRemove(filter);
        await schema.eventMember.updateOne(
          {
            userID: userid,
          },
          {
            $pull: {
              eventList: {
                eventID: doc._id,
              },
            },
          }
        );
      } catch (error) {
        console.error("刪除事件 GET ERROR:  ", error);
        rply.text = "刪除事件失败";
        return rply;
      }
      //增加资料库
      //检查有没有重覆
      rply.text = "刪除事件成功: " + doc.title;
      return rply;
    }
    case /(^[.]event$)/i.test(mainMsg[0]) && /^useExp$/i.test(mainMsg[1]): {
      if (!groupid) {
        rply.text = "你不在社区.请在社区使用此功能 ";
        return rply;
      }
      let gp = await schema.trpgLevelSystem.findOne({ groupid: groupid });
      if (!gp || !gp.SwitchV2) {
        rply.text =
          "此社区并有没有开启LEVEL功能. \n.level config 11 代表启动功能 \
                \n 数字11代表等级升级时会进行通知，10代表不会自动通知，\
                \n 00的话代表不启动功能\n";
        return rply;
      }
      let eventMember = await schema.eventMember.findOne({
        userID: userid,
      });
      let thisMember = await schema.trpgLevelSystemMember.findOne({
        groupid: groupid,
        userid: userid,
      });
      if (!eventMember || !thisMember) {
        rply.text = `未有你的资料, 未符合使用取得EXP的条件。`;
        return rply;
      }
      if (eventMember.earnedEXP > 0) {
        let exp = eventMember.earnedEXP;
        try {
          await thisMember.updateOne({
            $inc: {
              EXP: exp,
            },
          });

          rply.text = `你已把${exp}EXP加到这社区的账号里。\n你最新的EXP是${
            thisMember.EXP + exp
          }`;
          eventMember.earnedEXP = 0;
          await eventMember.save();
          return rply;
        } catch (error) {
          rply.text = `发生错误未能更新。`;
          console.error(
            "%cz_event.js line:282 error",
            "color: #007acc;",
            error
          );
          return rply;
        }
      } else {
        rply.text = `你未有赚取到EXP。\n赚取条件为有人使用你所写的事件，请更多使用吧!`;
        return rply;
      }
    }
    case (/(^[.]event$)/i.test(mainMsg[0]) || /(^[.]evt$)/i.test(mainMsg[0])) &&
      /^show$/i.test(mainMsg[1]): {
      rply.quotes = true;
      filter = {
        userID: userid,
      };
      let eventMember = await schema.eventMember.findOne(filter);
      doc = await schema.eventList.find(filter);

      let maxLv = await findMaxLv(userid);
      /**
       * 检查ENERGY，如果没有则新增，数字为EN= 20+LV
       */
      if (!eventMember) {
        eventMember = new schema.eventMember({
          userID: userid,
          userName: displaynameDiscord || displayname || "",
          energy: maxLv + 20,
          lastActiveAt: new Date(Date.now()),
        });
      }
      if (!eventMember.energy || !eventMember.lastActiveAt) {
        eventMember.energy = maxLv + 20;
      }

      //回复EN
      let EnergyRecover = Math.round(
        (new Date(Date.now()) - new Date(eventMember.lastActiveAt)) /
          EN_RECOVER_TIME
      );
      eventMember.energy = Math.min(
        maxLv + 20,
        EnergyRecover + eventMember.energy
      );
      eventMember.lastActiveAt = new Date(Date.now());
      debugMode ? (eventMember.energy = 99) : null;

      rply.text = `姓名: ${displaynameDiscord || displayname || "无名"}
EN: ${eventMember.energy} / ${maxLv + 20} ${ENemoji(
        Math.round((eventMember.energy / (maxLv + 20)) * 100)
      )}
总共赚取EXP: ${
        eventMember.totailEarnedEXP ? eventMember.totailEarnedEXP : 0
      }\n未使用EXP: ${eventMember.earnedEXP ? eventMember.earnedEXP : 0}`;
      if (eventMember.activityList.length > 0) {
        let result = eventMember.activityList;
        rply.text += "\n====最近发生的事件====";
        for (let index = 0; index < result.length; index++) {
          rply.text += `\n${result[index].date.getMonth() + 1}月${result[
            index
          ].date.getDate()}日 ${result[index].date.getHours()}:${
            result[index].date.getMinutes() < 10
              ? "0" + result[index].date.getMinutes()
              : result[index].date.getMinutes()
          } - ${result[index].activityDetail}`;
        }
      }
      if (doc && doc.length > 0) rply.text += "\n====你创作的事件列表====";
      for (let index = 0; index < doc.length; index++) {
        rply.text += "\n" + doc[index].title + "\n";
        if (doc[index].expName)
          rply.text += "经验值的名称: " + doc[index].expName + "\n";
        rply.text += doc[index].chainTitle
          ? `系列名称: ${doc[index].chainTitle} \n`
          : "";
        if (
          mainMsg[2] &&
          mainMsg[2].match(
            new RegExp("^" + convertRegex(doc[index].title) + "$", "i")
          )
        ) {
          rply.text += getDetail(doc[index]) + "\n";
        }
      }
      return rply;
    }
    case /(^[.]evt$)/i.test(mainMsg[0]) && /^\S+$/i.test(mainMsg[1]): {
      {
        rply.quotes = true;
        if (!groupid) {
          rply.text = "你不在社区.请在社区使用此功能 ";
          return rply;
        }
        let gp = await schema.trpgLevelSystem.findOne({ groupid: groupid });
        if (!gp || !gp.SwitchV2) {
          rply.text =
            "此社区并有没有开启LEVEL功能. \n.level config 11 代表启动功能 \
                    \n 数字11代表等级升级时会进行通知，10代表不会自动通知，\
                    \n 00的话代表不启动功能\n";
          return rply;
        }
        //用来看EN還有多少, 没有就RETURN
        //没有就新增一个

        let eventMember = await schema.eventMember.findOne({
          userID: userid,
        });
        //尋找所有社区的资料，用来设定EN上限
        let thisMember = await schema.trpgLevelSystemMember.findOne({
          groupid: groupid,
          userid: userid,
        });
        if (!thisMember) {
          rply.text = `错误发生，未有这社区的资料`;
          return rply;
        }
        let maxLv = await findMaxLv(userid);
        /**
         * 检查ENERGY，如果没有则新增，数字为EN= 20+LV
         */
        if (!eventMember) {
          eventMember = new schema.eventMember({
            userID: userid,
            userName: displaynameDiscord || displayname || "",
            energy: maxLv + 20,
            lastActiveAt: new Date(Date.now()),
          });
        }

        if (!eventMember.energy || !eventMember.lastActiveAt) {
          eventMember.energy = maxLv + 20;
        }

        //回复EN
        let EnergyRecover = Math.round(
          (new Date(Date.now()) - new Date(eventMember.lastActiveAt)) /
            EN_RECOVER_TIME
        );

        eventMember.energy = Math.min(
          maxLv + 20,
          EnergyRecover + eventMember.energy
        );
        if (EnergyRecover > 0 || !eventMember.lastActiveAt)
          eventMember.lastActiveAt = new Date(Date.now());
        debugMode ? (eventMember.energy = 99) : null;

        //查看是什么事件, 随机, 系列, 指定
        const targetEventName = convertRegex(mainMsg[1]);
        let eventMode = "";
        let eventList = [];
        if (targetEventName.match(/^random$/i)) {
          eventMode = "random";
        } else {
          if (eventMember.energy < 10) {
            rply.text = "没有足够EN, 你现在只有" + eventMember.energy + "EN";
            return rply;
          }
          eventList = await schema.eventList.aggregate([
            {
              $match: {
                chainTitle: {
                  $regex: new RegExp(
                    "^" + convertRegex(targetEventName) + "$",
                    "i"
                  ),
                },
              },
            },
            { $sample: { size: 1 } },
          ]);
          if (eventList.length > 0) {
            eventMode = "chain";
          } else {
            if (eventMember.energy < 15) {
              rply.text = "没有足够EN, 你现在只有" + eventMember.energy + "EN";
              return rply;
            }
            eventList = await schema.eventList.aggregate([
              {
                $match: {
                  title: {
                    $regex: new RegExp(
                      "^" + convertRegex(targetEventName) + "$",
                      "i"
                    ),
                  },
                },
              },
              { $sample: { size: 1 } },
            ]);
            if (eventList.length > 0) {
              eventMode = "title";
            }
          }
        }

        let earedXP = 0;

        if (thisMember.EXP <= 0) {
          rply.text = `你使用太多经验值了……你现在的经验值过低: ${thisMember.EXP} ，赚取更多经验值再来玩吧…`;
          return rply;
        }

        switch (eventMode) {
          case "random":
            if (eventMember.energy < 5) {
              rply.text = `随机事件需要5EN, 你现在只有 ${eventMember.energy} EN`;
              return rply;
            } else {
              eventList = await schema.eventList.aggregate([
                { $sample: { size: 1 } },
              ]);
              if (eventList.length == 0) {
                rply.text = "未有人新增事件，你可以成为第一个事件产生者!";
                return rply;
              }
              eventMember.energy -= 5;
              earedXP = 5;
            }
            break;

          case "chain":
            eventMember.energy -= 10;
            earedXP = 10;
            break;
          case "title":
            if (eventList[0].userID == userid) {
              rply.text = `不可以指定进入自己新增的事件呢.`;
              return rply;
            }
            eventMember.energy -= 15;
            earedXP = 15;
            break;

          default:
            rply.text = `没有以「${targetEventName} 」命名的事件呢.`;
            return rply;
        }

        await eventMember.save();
        let randomDetail =
          eventList[0].detail[
            (await rollDice.Dice(eventList[0].detail.length)) - 1
          ];
        let eventText = randomDetail.event.split(";");

        rply.text += `====${eventList[0].title}====\n ${
          eventText[(await rollDice.Dice(eventText.length)) - 1]
        } `;

        rply.text += `\n${await eventProcessExp({
          randomDetail: randomDetail,
          groupid: groupid,
          eventList: eventList[0],
          thisMember: thisMember,
        })} `;
        await schema.eventMember.findOneAndUpdate(
          { userID: eventList[0].userID },
          { $inc: { earnedEXP: earedXP, totailEarnedEXP: earedXP } }
        );
        return rply;
      }
    }
    default:
      break;
  }
};

function getDetail(doc) {
  let text = "";
  for (let index = 0; index < doc.detail.length; index++) {
    text +=
      "类型:" +
      doc.detail[index].result +
      " 內容: " +
      doc.detail[index].event +
      "\n";
  }
  return text;
}

async function analysicInputData(inputStr) {
  let MainData = inputStr.match(regexMain) ? inputStr.match(regexMain) : "";
  let ExpName = inputStr.match(regexExp)
    ? inputStr.match(regexExp)[1].replace(/^\s+/, "").replace(/\s+$/, "")
    : "";
  let eventName = inputStr.match(regexName)
    ? inputStr.match(regexName)[1].replace(/^\s+/, "").replace(/\s+$/, "")
    : "";
  let eventChain = inputStr.match(regexChainTitle)
    ? inputStr.match(regexChainTitle)[1].replace(/^\s+/, "").replace(/\s+$/, "")
    : "";
  let result = {
    expName: ExpName,
    MainData: MainData,
    eventName: eventName,
    eventChain: eventChain,
  };
  return result;
}
async function analysicDetail(data) {
  let info = [];
  for (let index = 0; index < data.length; index++) {
    let temp = data[index].match(/(-?\d+):(.*)/);
    if (temp[1] <= 5 && temp[1] >= -5)
      info.push({
        event: temp[2],
        result: temp[1],
      });
  }
  return info;
}

module.exports = {
  rollDiceCommand: rollDiceCommand,
  initialize: initialize,
  getHelpMessage: getHelpMessage,
  prefixs: prefixs,
  gameType: gameType,
  gameName: gameName,
};

/**
 * TODO:
 * 1. .evt (event)系统设计
经由新增的事件 可以增加减少EXP
功能及设计列表
1. 舉報不良项目, 有幾个个舉報, 自动隱藏
3. 
进入事件的方法
输入 .evt event ->   即 进入 随机事件, 消耗5EN
输入 .evt (事件名称) ->   即 进入 指定事件, 消耗15EN

EN= 20+LV
每5分钟回复1点EN

得知事件名称的方法，別人告知 或 经随机事件知道名字

4. 
事件效果
-1. 直接减少X点经验(X分钟內)
-2. 停止得到经验(X分钟內)
-3. 分发X经验给整个CHANNEL中的X人
-4. 停止得到经验(X分钟內)并每次减少发言减少X经验
-5. 吸收对方X点经验
0. 没有事发生
1. 直接增加X点经验(X分钟內)
2. 对方得到经验值 X 倍(X分钟內)
3. 从整个CHANNEL 的X人吸收X点经验

5. 
设计事件的好处
能够吸收对方消耗的en 作为自己的exp

6.
设计方式
输入 .evt add 天命
你被雷打中 得到{exp}点真氣  2  (直接增加X点经验)
你掉下山中 头破血流，損失{exp}点真氣  3  (直接减少X点经验)
今天風平浪靜 1 (无事发生)

可以有3+(ROUNDDOWN 设计者LV/10)  项结果
由设计者自己设定
一个事件由以下三项组成
事件名称，事件內容及设定事件结果 

7. 
限制
A. 一个事件中，正面选项要比负面选项多
B. 事件效果隨著设计者LV 而开发
如: 效果1-3 LV0-10 可用
4 需要LV11-20LV
5 需要LV21-30
C. 一个事件中，不可以全部正面效果
D. 一个事件可用的总EN 为(10+LV)，负面事件消耗X点EN

8.
变数X 普通为
设计者LV , 
使用者LV, 
设计者LV 与使用者LV 的相差,
负面效果的程度(即如果一个事件中有负面效果，那正面效果会增加)
 * 
 * 
 * A) .evt event / .evt 指定名字   - roll/event.js  (检查有没有开EXP功能)
 * B) 没有则RETURN，
 *      有->傳送GP ID, USER ID, 名字 到 MODULES/EVENT.JS
 *      取得MONGOOSE资料 ->进行  (randomEvent)
 *       i)   抽选整个列表      
 *      ii)   抽选指定列表
 * C)   从该列表中抽选一个结果 (randomEvent)
 * D)   得到结果后，进行 该运算 (event)
 *      1/8个结果   -> (expChange)
 * E)   得到结果，修改MONGOOSE (editExp)
 * F)   翻回文字结果到使用者(roll/event.js)
 * 
 * 
 * 
 */

async function eventProcessExp({
  randomDetail,
  groupid,
  eventList,
  thisMember,
}) {
  let expName = eventList.expName ? `「${eventList.expName} 」` : "经验";
  switch (randomDetail.result) {
    case 1: {
      let exp = await calXP(eventList, thisMember.Level, "exp");
      await thisMember.updateOne({
        $inc: { EXP: exp },
      });
      await schema.eventMember.updateOne(
        { userID: thisMember.userid },
        {
          $push: {
            activityList: {
              $each: [
                {
                  date: Date.now(),
                  activityDetail: `你已增加 ${exp} 点${expName} `,
                },
              ],
              $sort: { date: -1 },
              $slice: 10,
            },
          },
        }
      );
      return `你已增加 ${exp} 点${expName} `;
    }

    case 2: //  8. 使用者得到经验值 X 倍(多少次)
    {
      let times = await calXP(eventList, thisMember.Level, "times");
      let multi = await calXP(eventList, thisMember.Level, "multi");
      await thisMember.updateOne({
        $max: { multiEXP: multi, multiEXPTimes: times },
      });

      await schema.eventMember.updateOne(
        { userID: thisMember.userid },
        {
          $push: {
            activityList: {
              $each: [
                {
                  date: Date.now(),
                  activityDetail: `你在${Math.max(
                    isNaN(thisMember.multiEXPTimes)
                      ? 0
                      : thisMember.multiEXPTimes,
                    times
                  )} 次內都会有 ${Math.max(
                    isNaN(thisMember.multiEXP) ? 0 : thisMember.multiEXP,
                    multi
                  )} 倍${expName}  `,
                },
              ],
              $sort: { date: -1 },
              $slice: 10,
            },
          },
        }
      );
      return `你在${Math.max(
        isNaN(thisMember.multiEXPTimes) ? 0 : thisMember.multiEXPTimes,
        times
      )} 次內都会有 ${Math.max(
        isNaN(thisMember.multiEXP) ? 0 : thisMember.multiEXP,
        multi
      )} 倍${expName} `;
    }
    case 3: //  社区所有人增加1点经验
    {
      await schema.trpgLevelSystemMember.updateMany(
        {
          groupid: groupid,
        },
        {
          $inc: { EXP: 1 },
        }
      );
      /**
                 , $push: {
                                        date: Date.now(),
                                        activityDetail: `因为${thisMember.name} 你增加 1 点${expName} `
                                    }
                 */
      await schema.eventMember.updateOne(
        { userID: thisMember.userid },
        {
          $push: {
            activityList: {
              $each: [
                {
                  date: Date.now(),
                  activityDetail: `你已增加 此社区所有人1点 ${expName}`,
                },
              ],
              $sort: { date: -1 },
              $slice: 10,
            },
          },
        }
      );

      let reply = `你已增加 此社区所有人1点 ${expName} `;
      return reply;
    }

    case 4: //  赠送作者的Erned经验给玩家
    {
      //ERROR
      let createEventerLV = await findMaxLv(eventList.userID);

      let createEventer = await findCreater(eventList.userID);

      let exp = await calXP(
        eventList,
        Math.min(createEventerLV, thisMember.Level),
        "exp"
      );

      //防止减到0
      exp = Math.min(Math.max(0, Number(createEventer.earnedEXP) - exp), exp);

      await thisMember.updateOne({
        $inc: { EXP: exp },
      });
      await createEventer.updateOne(
        {
          userID: eventList.userID,
        },
        {
          $inc: { earnedEXP: -exp, totailEarnedEXP: exp },
          $push: {
            activityList: {
              $each: [
                {
                  date: Date.now(),
                  activityDetail: `你已赠送 ${thisMember.name}  ${exp} 点${expName}`,
                },
              ],
              $sort: { date: -1 },
              $slice: 10,
            },
          },
        }
      );

      await schema.eventMember.updateOne(
        { userID: thisMember.userid },
        {
          $push: {
            activityList: {
              $each: [
                {
                  date: Date.now(),
                  activityDetail: `你已被 ${eventList.userName} 赠送了 ${exp} 点${expName}`,
                },
              ],
              $sort: { date: -1 },
              $slice: 10,
            },
          },
        }
      );

      return `你已被 ${eventList.userName} 赠送了 ${exp} 点${expName} `;
    }
    case 5: //  9. 从整个CHANNEL 的X人吸收X点经验
    {
      let times = await calXP(eventList, thisMember.Level, "times");
      let targetMember = await schema.trpgLevelSystemMember.aggregate([
        {
          $match: {
            groupid: groupid,
            userid: {
              $not: { $regex: new RegExp(thisMember.userid, "i") },
            },
          },
        },
        {
          $sample: { size: times },
        },
      ]);
      let name = [],
        expMember = [],
        totalEXP = 0;

      for (let index = 0; index < targetMember.length; index++) {
        let exp = await calXP(
          eventList,
          Math.min(thisMember.Level, targetMember[index].Level),
          "exp"
        );

        //防止变成0以下
        exp = Math.min(Math.max(0, Number(targetMember[index].EXP) - exp), exp);

        await schema.trpgLevelSystemMember.findOneAndUpdate(
          {
            groupid: targetMember[index].groupid,
            userid: targetMember[index].userid,
          },
          {
            $inc: { EXP: -exp },
          }
        );
        await schema.eventMember.updateOne(
          { userID: targetMember[index].userid },
          {
            $push: {
              activityList: {
                $each: [
                  {
                    date: Date.now(),
                    activityDetail: `你被 ${eventList.userName} 吸收了 ${exp} 点${expName}`,
                  },
                ],
                $sort: { date: -1 },
                $slice: 10,
              },
            },
          }
        );
        name.push(targetMember[index].name);
        expMember.push(exp);
        totalEXP += exp;
      }

      await thisMember.updateOne({
        $inc: { EXP: totalEXP },
      });

      await schema.eventMember.updateOne(
        { userID: thisMember.userid },
        {
          $push: {
            activityList: {
              $each: [
                {
                  date: Date.now(),
                  activityDetail: `你吸收 ${targetMember.length}人 共 ${totalEXP} 点${expName}`,
                },
              ],
              $sort: { date: -1 },
              $slice: 10,
            },
          },
        }
      );
      let reply = `你已增加 ${totalEXP} 点${expName} 及`;
      for (let index = 0; index < name.length; index++) {
        reply += `\n${name[index] || "无名"} 减少了${
          expMember[index]
        } 点${expName} `;
      }
      return reply;
    }
    case -1: // -1. 直接减少X点经验
    //100之一 ->50之一 * 1.0X ( 相差LV)% *1.0X(负面级数)^(幾个负面)
    {
      let exp = await calXP(eventList, thisMember.Level, "expNeg");
      //防止变成0以下
      exp = Math.min(Math.max(0, Number(thisMember.EXP) - exp), exp);
      await thisMember.updateOne({
        $inc: { EXP: -exp },
      });

      await schema.eventMember.updateOne(
        { userID: thisMember.userid },
        {
          $push: {
            activityList: {
              $each: [
                {
                  date: Date.now(),
                  activityDetail: `你减少了 ${exp} 点${expName}`,
                },
              ],
              $sort: { date: -1 },
              $slice: 10,
            },
          },
        }
      );
      return `你已减少 ${exp} 点${expName} `;
    }

    case -2: //   -2. 停止得到经验(X次內)
    {
      let times = await calXP(eventList, thisMember.Level, "times");
      await thisMember.updateOne({
        $max: { stopExp: times },
      });
      await schema.eventMember.updateOne(
        { userID: thisMember.userid },
        {
          $push: {
            activityList: {
              $each: [
                {
                  date: Date.now(),
                  activityDetail: `你${Math.max(
                    isNaN(thisMember.stopExp) ? 0 : thisMember.stopExp,
                    times
                  )} 次內会失去得到${expName} 的机会`,
                },
              ],
              $sort: { date: -1 },
              $slice: 10,
            },
          },
        }
      );

      return `你在未来${Math.max(
        isNaN(thisMember.stopExp) ? 0 : thisMember.stopExp,
        times
      )} 次都会失去得到${expName} 的机会`;
    }

    case -3: //   7. 吸收对方X点经验
    {
      let createEventerLV = await findMaxLv(eventList.userID);
      let exp = await calXP(
        eventList,
        Math.min(createEventerLV, thisMember.Level),
        "expNeg"
      );

      //防止变成0以下
      exp = Math.min(Math.max(0, Number(thisMember.EXP) - exp), exp);

      await thisMember.updateOne({
        $inc: { EXP: -exp },
      });

      await schema.eventMember.updateOne(
        { userID: thisMember.userid },
        {
          $push: {
            activityList: {
              $each: [
                {
                  date: Date.now(),
                  activityDetail: `你被 ${eventList.userName} 吸收了 ${exp} 点${expName} `,
                },
              ],
              $sort: { date: -1 },
              $slice: 10,
            },
          },
        }
      );

      await schema.eventMember.findOneAndUpdate(
        {
          userID: eventList.userID,
        },
        {
          $inc: { earnedEXP: exp, totailEarnedEXP: exp },
          $push: {
            activityList: {
              $each: [
                {
                  date: Date.now(),
                  activityDetail: `你吸收了 ${thisMember.name}  ${exp} 点${expName} `,
                },
              ],
              $sort: { date: -1 },
              $slice: 10,
            },
          },
        }
      );
      return `你已被 ${eventList.userName} 吸收了 ${exp} 点${expName} `;
    }
    case -4: //  5. 分发X经验给整个CHANNEL中的X人
    {
      let times = await calXP(eventList, thisMember.Level, "times");
      let targetMember = await schema.trpgLevelSystemMember.aggregate([
        {
          $match: {
            groupid: groupid,
            userid: {
              $not: { $regex: new RegExp(thisMember.userid, "i") },
            },
          },
        },
        {
          $sample: { size: times },
        },
      ]);
      let name = [],
        expMember = [],
        totalEXP = 0;
      for (let index = 0; index < targetMember.length; index++) {
        let exp = await calXP(
          eventList,
          Math.min(thisMember.Level, targetMember[index].Level),
          "expNeg"
        );

        //防止变成0以下
        exp = Math.min(Math.max(0, Number(thisMember.EXP) - exp), exp);

        thisMember.EXP -= exp;

        await schema.trpgLevelSystemMember.findOneAndUpdate(
          {
            groupid: targetMember[index].groupid,
            userid: targetMember[index].userid,
          },
          {
            $inc: { EXP: exp },
          }
        );

        await schema.eventMember.updateOne(
          { userID: targetMember[index].userid },
          {
            $push: {
              activityList: {
                $each: [
                  {
                    date: Date.now(),
                    activityDetail: ` ${thisMember.name} (被强行)分发了 ${exp} 点${expName} 给你 `,
                  },
                ],
                $sort: { date: -1 },
                $slice: 10,
              },
            },
          }
        );
        name.push(targetMember[index].name);
        expMember.push(exp);
        totalEXP += exp;
      }
      await thisMember.updateOne({
        $inc: { EXP: -totalEXP },
      });

      await schema.eventMember.updateOne(
        { userID: thisMember.userid },
        {
          $push: {
            activityList: {
              $each: [
                {
                  date: Date.now(),
                  activityDetail: `你(被强行)分发了共 ${totalEXP} 点${expName} 给 ${targetMember.length}人 `,
                },
              ],
              $sort: { date: -1 },
              $slice: 10,
            },
          },
        }
      );

      let reply = `你已减少 ${totalEXP} 点${expName} 及`;
      for (let index = 0; index < name.length; index++) {
        reply += `\n${name[index] || "无名"} 增加了${
          expMember[index]
        } 点${expName} `;
      }

      return reply;
    }
    case -5: //  6. 每次发言减少X经验(X次內)
    {
      let exp = Math.round(await calXP(eventList, thisMember.Level, "expNeg"));
      let times = await calXP(eventList, thisMember.Level, "times");
      await thisMember.updateOne({
        $max: { decreaseEXP: exp, decreaseEXPTimes: times },
      });

      await schema.eventMember.updateOne(
        { userID: thisMember.userid },
        {
          $push: {
            activityList: {
              $each: [
                {
                  date: Date.now(),
                  activityDetail: `你接下来${Math.max(
                    thisMember.decreaseEXPTimes,
                    times
                  )} 次发言都会减少 ${Math.max(
                    isNaN(thisMember.decreaseEXP) ? 0 : thisMember.decreaseEXP,
                    exp
                  )} ${expName}  `,
                },
              ],
              $sort: { date: -1 },
              $slice: 10,
            },
          },
        }
      );
      return `你在未来 ${Math.max(
        isNaN(thisMember.decreaseEXPTimes) ? 0 : thisMember.decreaseEXPTimes,
        times
      )} 次发言都会减少 ${Math.max(
        isNaN(thisMember.decreaseEXP) ? 0 : thisMember.decreaseEXP,
        exp
      )} ${expName} `;
    }

    default:
      //     0. 没有事发生
      return `没有事发生呢`;
  }
}
async function calXP(eventList, thisMemberLV, type) {
  let typeNumber = 1;
  switch (type) {
    case "exp": {
      //正面事件  把负面的数字相加
      let eventPosit = eventList.detail.map((item) => {
        if (item.result < 0 && !isNaN(item.result)) {
          return item.result;
        } else return 0;
      });
      eventPosit = eventPosit.filter((item) => item < 0);
      let eventPositiveLV =
        eventPosit.length > 0
          ? eventPosit.reduce((b, a) => Number(a) + Number(b))
          : 1;

      let createEventerLV = await findMaxLv(eventList.userID);
      typeNumber =
        (await rollDice.DiceINT(
          Math.max(createEventerLV, thisMemberLV) + 20,
          Math.min(createEventerLV, thisMemberLV)
        )) + 15;

      typeNumber *= Math.abs(createEventerLV - thisMemberLV) / 20 + 1;

      typeNumber *=
        (eventPositiveLV ^ 2) / 20 + 1 > 1 ? (eventPositiveLV ^ 2) / 20 + 1 : 1;

      typeNumber *= eventPosit.length / 5 + 1;

      return Math.round(typeNumber);
    }
    case "expNeg": {
      //负面事件  把正面的数字相加
      let eventNeg = eventList.detail.map((item) => {
        if (item.result > 0 && !isNaN(item.result)) {
          return item.result;
        } else return 0;
      });
      eventNeg = eventNeg.filter((item) => item < 0);
      let eventNegLV =
        eventNeg.length > 0
          ? eventNeg.reduce((b, a) => Number(a) + Number(b))
          : 1;

      let createEventerLV = await findMaxLv(eventList.userID);

      typeNumber =
        (await rollDice.DiceINT(
          Math.max(createEventerLV, thisMemberLV) + 20,
          Math.min(createEventerLV, thisMemberLV)
        )) + 15;

      typeNumber *= Math.abs(createEventerLV - thisMemberLV) / 20 + 1;

      typeNumber *=
        (eventNegLV ^ 2) / 20 + 1 > 1 ? (eventNegLV ^ 2) / 20 + 1 : 1;

      typeNumber *= eventNeg.length / 5 + 1;

      return Math.round(typeNumber);
    }
    case "times": {
      let createEventerLV = await findMaxLv(eventList.userID);
      typeNumber = await rollDice.DiceINT(
        5,
        createEventerLV - thisMemberLV > 0
          ? Math.min(createEventerLV - thisMemberLV, 20)
          : 1
      );
      if (isNaN(typeNumber)) typeNumber = 1;
      if (typeNumber < 1) typeNumber = 1;
      return typeNumber;
    }

    case "multi": {
      let createEventerLV = await findMaxLv(eventList.userID);
      typeNumber = await rollDice.DiceINT(
        3,
        createEventerLV - thisMemberLV > 0
          ? Math.round((createEventerLV - thisMemberLV) / 3)
          : 2
      );
      return typeNumber;
    }
    default:
      return typeNumber;
  }
  //   1. 直接增加X点经验
  //100之一 ->50之一 * 1.0X ( 相差LV)% *1.0X(负面级数)^(幾个事件)
}
async function findMaxLv(userid) {
  let maxLV = await schema.trpgLevelSystemMember
    .findOne({ userid: userid })
    .sort({ Level: -1 });
  if (!maxLV) return 1;
  return maxLV.Level;
}

async function findCreater(userid) {
  let creater = await schema.eventMember
    .findOne({ userID: userid })
    .sort({ Level: -1 });
  if (!creater) return null;
  return creater;
}

/**
 EVENT 功能修改点
(##TODO##)

[X]1. 10分钟回复一点EN.
[X]2. 随机事件 5EN, 系列事件10EN, 指定事件15EN
[X]3. 吸收的经验值根據 (被吸收者和吸收者LV+20 随机) 来決定



[X]4. 增加种类选项
[X]A) 赠送作者经验给玩家
B) 每次发言增加Ｘ经验
[X]C) 社区所有人增加1点经验

[X]5. 能否不骰到別群的事件
增加 參数: 系列,chain of events
可以指定该系列的事件
如 修真 系列

会自动尋



[ ]6.是否能指定某人觸发事件 <---
在.evt XXX  @XXXX 后, 会尝试根據对方的名字,
但LINE的话, 需要对方和HKTRPG成为朋友, 才可能成功.
不会搜尋无名


[X] 7.经验避免被扣到负值，最低歸零
对方不可零, 自己不可零

[ ]8.能否赠送別人经验 <---
同6,  傳功消耗, 6折
不会搜尋无名


[X]9. 状態欄
姓名:
EN:  /   ▬▬▬▬▬▬▭▭▭▭▮▮▮▮▯▯▯▯:white_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:
earnedEXP
totailEarnedEXP
eventList
最高等级?

10次最后发生的事件
---


 */
