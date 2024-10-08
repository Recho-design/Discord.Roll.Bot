"use strict";
if (!process.env.mongoURL) {
  return;
}
let variables = {};
const mathjs = require("mathjs");
const rollDice = require("./rollbase").rollDiceCommand;
const schema = require("../modules/schema.js");
const Discord = require("discord.js");
const {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ButtonBuilder,
  ButtonStyle,
} = Discord;
const VIP = require("../modules/veryImportantPerson");
const FUNCTION_LIMIT = [4, 20, 20, 30, 30, 99, 99, 99];
const gameName = function () {
  return "【角色卡功能】 .char (add edit show delete use nonuse button) .ch (set show showall button)";
};
const gameType = function () {
  return "Tool:trpgcharacter:骰娘爱你哦💖";
};
const prefixs = function () {
  return [
    {
      first: /(^[.]char$)|(^[.]ch$)/gi,
      second: null,
    },
  ];
};
const regexName = new RegExp(/name\[(.*?)\]~/, "i");
const regexState = new RegExp(/state\[(.*?)\]~/, "i");
const regexRoll = new RegExp(/roll\[(.*?)\]~/, "i");
const regexNotes = new RegExp(/notes\[(.*?)\]~/, "i");
const re = new RegExp(/(.*?):(.*?)(;|$)/, "ig");
const opt = {
  upsert: true,
  runValidators: true,
};
const convertRegex = function (str) {
  return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
};

/*
TODO?
COC export to roll20?

*/

const getHelpMessage = async function () {
  return `【角色卡功能】
以个人为单位, 一张卡可以在不同的社区使用
目标是文字团可以快速掷骰，及更新角色状态。

👤简单新增角色卡↓
 .char add name[Sad]~ state[HP:15/15;]~ roll[斗殴: cc 50;]~ notes[笔记:这是测试,请试试在社区输入 .char use Sad;]~ 
新增了角色卡后，可以输入 ↓
.admin account (username) (password) 
然后在网页: https://card.hktrpg.com/ 中直接进行修改（需要管理员先授权频道）

把结果传送到已登记的Discord，TG，LINE上的聊天社区的登记方法: 
由该社区的Admin授权允许 输入 .admin allowrolling  
登记该社区到自己的名单中 输入 .admin registerChannel 
 
❎︎取消方法
由该社区的Admin取消授权 输入 .admin disallowrolling  
取消登记该社区到名单 输入 .admin unregisterChannel  

最后网站会显示社区名称，点击就可以使用了

-----.char-----
.char add name[Sad]~ state[HP:15/15;con:60;san:60]~ roll[斗殴: cc 50;投掷: cc 15;sc:cc {san}]~ notes[笔记:这是测试,请试试在社区输入 .char use Sad;]~  
- 可以新增及更新角色卡
.char Show - 可以显示角色卡列表
.char Show0 - 可以显示0号角色卡内容 0可以用其他数字取代
.char edit name[角色卡名字]~ - 可以以add的格式修改指定角色卡
.char use 角色卡名字 - 可以在该社区中使用指定角色卡
.char nonuse - 可以在该社区中取消使用角色卡
.char delete 角色卡名字 - 可以删除指定角色卡
.char button 角色卡名字 - Discord限定，可以产生按钮指令，会使用直接掷骰指令
-----.ch 功能-----
在社区中使用.char use (角色名) 后, 就可以启动角色卡功能
.ch 项目名称 项目名称 - 没有加减的话, 会单纯显示数据或掷骰
.ch 项目名称 (数字)  - 可以立即把如HP变成该数字
.ch 项目名称 (+-*/数字)  - 可以立即对如HP进行四则运算
.ch 项目名称 (+-*/xDy)  - 可以对如HP进行掷骰四则运算
.ch set 项目名称 新内容 - 直接更改内容
.ch show - 显示角色卡的state 和roll 内容
.ch showall - 显示角色卡的所有内容
.ch button  - Discord限定，可以产生按钮指令，会调用.ch 指令
-----范例及运算式-----
角色卡还可以进行运算，详情请看
https://github.com/hktrpg/TG.line.Discord.Roll.Bot/wiki/Character-Card `;
};

const initialize = function () {
  return variables;
};

// eslint-disable-next-line no-unused-vars
const rollDiceCommand = async function ({
  inputStr,
  mainMsg,
  groupid,
  botname,
  userid,
  channelid,
}) {
  let rply = {
    default: "on",
    type: "text",
    text: "",
    characterReRoll: false,
    characterName: "",
    characterReRollName: "",
  };
  let filter = {};
  let doc = {};
  let docSwitch = {};
  let Card = {};
  let temp;
  let tempMain = {};
  let lv;
  let limit = FUNCTION_LIMIT[0];
  let check;
  switch (true) {
    case /^help$/i.test(mainMsg[1]) || !mainMsg[1]:
      rply.text = await this.getHelpMessage();
      rply.quotes = true;
      return rply;
    // .ch(0) ADD(1) TOPIC(2) CONTACT(3)
    case /(^[.]char$)/i.test(mainMsg[0]) && /^public+/i.test(mainMsg[1]):
      if (!mainMsg[2]) {
        rply.text = "未输入要公开的角色卡名字";
        return rply;
      }
      filter = {
        id: userid,
        name: new RegExp(
          "^" +
            convertRegex(inputStr.replace(/^\.char\s+public\s+/i, "")) +
            "$",
          "i"
        ),
      };
      doc = await schema.characterCard.findOne(filter);
      if (!doc) {
        rply.text = "没有此角色卡";
        return rply;
      }
      try {
        doc.public = true;
        await doc.save();
      } catch (error) {
        console.error("GET ERROR 修改失败" + error);
        rply.text = "修改失败\n" + error;
        return rply;
      }

      rply.text =
        "修改成功\n现在角色卡: " +
        doc.name +
        " 已经公开。\n请到以下网址查看\n https://publiccard.hktrpg.com/ ";
      return rply;
    case /(^[.]char$)/i.test(mainMsg[0]) && /^unpublic+/i.test(mainMsg[1]):
      if (!mainMsg[2]) {
        rply.text = "未输入要公开的角色卡名字";
        return rply;
      }
      filter = {
        id: userid,
        name: new RegExp(
          "^" +
            convertRegex(inputStr.replace(/^\.char\s+unpublic\s+/i, "")) +
            "$",
          "i"
        ),
      };
      doc = await schema.characterCard.findOne(filter);
      if (!doc) {
        rply.text = "没有此角色卡";
        return rply;
      }
      try {
        doc.public = false;
        await doc.save();
      } catch (error) {
        console.error("GET ERROR 修改失败" + error);
        rply.text = "修改失败\n" + error;
        return rply;
      }

      rply.text =
        "修改成功\n现在角色卡: " +
        doc.name +
        " 已经不公开。\n请到以下网址查看\n https://publiccard.hktrpg.com/ ";
      return rply;
    case /(^[.]char$)/i.test(mainMsg[0]) && /^show\d+/i.test(mainMsg[1]):
      filter = {
        id: userid,
      };
      temp = mainMsg[1].replace(/^show/gi, "");
      //取得本来的资料, 如有重覆, 以新的覆蓋
      try {
        doc = await schema.characterCard.find(filter);
      } catch (error) {
        console.error("char  show GET ERROR: ", error);
      }
      if (temp < doc.length) {
        rply.text = await showCharacter(doc[temp], "showAllMode");
      }
      return rply;
    case /(^[.]char$)/i.test(mainMsg[0]) && /^show$/i.test(mainMsg[1]):
      filter = {
        id: userid,
      };
      rply.text += "角色卡列表\n";
      //取得本来的资料, 如有重覆, 以新的覆蓋
      try {
        doc = await schema.characterCard.find(filter);
      } catch (error) {
        console.error("char  show GET ERROR: ", error);
      }
      for (let index = 0; index < doc.length; index++) {
        rply.text += index + ": " + doc[index].name + "　\n";
      }
      rply.text += `\n输入 .char show0 可以显示0号角色卡
            .char button 角色名字 可以产生你的角色卡按钮
            输入 .char use 角色名字  可以在频道中使用角色卡
            
            输入use后，
            再输入 .ch button 也可以产生你的角色卡按钮
            
            两种产生的按钮指令会有所不同，前者调用.ch后者产生直接掷骰的指令 `;
      return rply;
    case /(^[.]char$)/i.test(mainMsg[0]) &&
      /^add$/i.test(mainMsg[1]) &&
      /^\S+$/.test(mainMsg[2]): {
      Card = await analysicInputCharacterCard(inputStr); //分析输入的资料
      if (!Card.name) {
        rply.text =
          "没有输入角色的名字，请重新整理內容 格式为 \n.char add name[Sad]~ \nstate[HP:15/15;MP:6/6;]~\nroll[投掷:cc 80 投掷;斗殴:cc 40 斗殴;]~\nnotes[心灵支柱: 无;notes:这是测试,请试试在社区输入 .char use Sad;]~\n";
        return rply;
      }
      /*
            只限四张角色卡.
            使用VIPCHECK
            */
      lv = await VIP.viplevelCheckUser(userid);
      let gpLv = await VIP.viplevelCheckGroup(groupid);
      lv = gpLv > lv ? gpLv : lv;
      limit = FUNCTION_LIMIT[lv];
      check = await schema.characterCard.find({
        id: userid,
      });
      if (check.length >= limit) {
        rply.text =
          "你的角色卡上限为" +
          limit +
          "张" +
          "\n支援及解锁上限 https://www.patreon.com/HKTRPG\n";
        return rply;
      }
      filter = {
        id: userid,
        name: new RegExp("^" + convertRegex(Card.name) + "$", "i"),
      };
      //取得本来的资料, 如有重覆, 以新的覆蓋
      doc = await schema.characterCard.findOne(filter);
      //把旧和新的合併
      if (doc) {
        doc.name = Card.name;
        Card.state = await Merge(doc.state, Card.state, "name");
        Card.roll = await Merge(doc.roll, Card.roll, "name");
        Card.notes = await Merge(doc.notes, Card.notes, "name");
      }
      try {
        await schema.characterCard.updateOne(filter, Card, opt);
      } catch (error) {
        console.error("新增角色卡 GET ERROR: ", error);
        rply.text = "新增角色卡失败\n因为 " + error.message;
        return rply;
      }
      //增加资料库
      //检查有没有重覆
      rply.text = await showCharacter(Card, "addMode");
      return rply;
    }

    case /(^[.]char$)/i.test(mainMsg[0]) &&
      /^edit$/i.test(mainMsg[1]) &&
      /^\S+$/.test(mainMsg[2]):
      Card = await analysicInputCharacterCard(inputStr); //分析输入的资料
      if (!Card.name) {
        rply.text =
          "没有输入角色的名字，请重新整理內容 格式为 .char edit name[Sad]~ \nstate[HP:15/15;MP:6/6;]~\nroll[投掷:cc 80 投掷;斗殴:cc 40 斗殴;]~\nnotes[心灵支柱: 无;notes:这是测试,请试试在社区输入 .char use Sad;]~\n";
        return rply;
      }
      /*
            只限四张角色卡.
            使用VIPCHECK
            */
      filter = {
        id: userid,
        name: new RegExp("^" + convertRegex(Card.name) + "$", "i"),
      };
      //取得本来的资料, 如有重覆, 以新的覆蓋

      doc = await schema.characterCard.findOne(filter);
      //把旧和新的合併
      if (doc) {
        doc.name = Card.name;
        Card.state = await Merge(doc.state, Card.state, "name");
        Card.roll = await Merge(doc.roll, Card.roll, "name");
        Card.notes = await Merge(doc.notes, Card.notes, "name");
      } else {
        rply.text = "没有此角色卡, 请重新检查";
        return rply;
      }
      try {
        await schema.characterCard.updateOne(filter, Card);
      } catch (error) {
        console.error("修改角色卡 GET ERROR:  ", error);
        rply.text = "修改角色卡失败\n因为 " + error.message;
        return rply;
      }
      //增加资料库
      //检查有没有重覆
      rply.text = await showCharacter(Card, "addMode");
      return rply;

    case /(^[.]char$)/i.test(mainMsg[0]) &&
      /^use$/i.test(mainMsg[1]) &&
      /^\S+$/.test(mainMsg[2]):
      if (!groupid) {
        rply.text = "此功能必须在社区中使用";
        return rply;
      }

      filter = {
        id: userid,
        name: new RegExp(
          "^" + convertRegex(inputStr.replace(/^\.char\s+use\s+/i, "")) + "$",
          "i"
        ),
      };
      doc = await schema.characterCard.findOne(filter);
      if (!doc) {
        rply.text = "没有此角色卡";
        return rply;
      }
      try {
        await schema.characterGpSwitch.findOneAndUpdate(
          {
            gpid: channelid || groupid,
            id: userid,
          },
          {
            name: doc.name,
            cardId: doc._id,
          },
          opt
        );
      } catch (error) {
        console.error("GET ERROR 修改失败" + error);
        rply.text = "修改失败\n" + error;
        return rply;
      }

      rply.text = "修改成功\n现在使用角色卡: " + doc.name;
      return rply;
    case /(^[.]char$)/i.test(mainMsg[0]) && /^nonuse$/i.test(mainMsg[1]):
      if (!groupid) {
        rply.text = "此功能必须在社区中使用";
        return rply;
      }
      try {
        await schema.characterGpSwitch.findOneAndUpdate(
          {
            gpid: channelid || groupid,
            id: userid,
          },
          {
            name: "",
            cardId: "",
          },
          opt
        );
      } catch (error) {
        console.error("GET ERROR 修改失败" + error);
        rply.text = "修改失败\n" + error;
        return rply;
      }
      rply.text = "修改成功。\n现在这社区没有使用角色卡， .ch 不会出现效果。";
      return rply;

    case /(^[.]char$)/i.test(mainMsg[0]) &&
      /^delete$/i.test(mainMsg[1]) &&
      /^\S+$/.test(mainMsg[2]):
      filter = {
        id: userid,
        name: inputStr.replace(/^\.char\s+delete\s+/gi, ""),
      };

      doc = await schema.characterCard.findOne(filter);
      if (!doc) {
        rply.text = "没有此角色卡. 注意:刪除角色卡需要名字大小写完全相同";
        return rply;
      }
      try {
        let filterRemove = {
          cardId: doc._id,
        };
        await schema.characterCard.findOneAndRemove(filter);
        await schema.characterGpSwitch.deleteMany(filterRemove);
      } catch (error) {
        console.error("刪除角色卡 GET ERROR:  ", error);
        rply.text = "刪除角色卡失败";
        return rply;
      }
      //增加资料库
      //检查有没有重覆
      rply.text = "刪除角色卡成功: " + doc.name;
      return rply;
    case /(^[.]char$)/i.test(mainMsg[0]) &&
      /^button$/i.test(mainMsg[1]) &&
      /^\S+$/.test(mainMsg[2]): {
      if (!groupid) {
        rply.text = "此功能必须在社区中使用";
        return rply;
      }
      if (botname !== "Discord") {
        rply.text = "这是Discord限定功能";
        return rply;
      }

      filter = {
        id: userid,
        name: new RegExp(
          "^" +
            convertRegex(inputStr.replace(/^\.char\s+button\s+/i, "")) +
            "$",
          "i"
        ),
      };
      const doc = await schema.characterCard.findOne(filter);
      if (!doc) {
        rply.text = "没有此角色卡";
        return rply;
      }
      if (doc.roll)
        rply.requestRollingCharacter = [
          handleRequestRolling(doc),
          doc.name,
          "char",
        ];
      return rply;
    }

    case /(^[.]ch$)/i.test(mainMsg[0]) &&
      /^set$/i.test(mainMsg[1]) &&
      /^\S+$/i.test(mainMsg[2]) &&
      /^\S+$/i.test(mainMsg[3]):
      //更新功能
      if (!groupid) {
        rply.text = "此功能必须在社区中使用";
        return rply;
      }
      if (!mainMsg[3]) {
        return;
      }
      /**
       * 流程
       * .ch 功能需要在charactergpswitches 中, 找出现在在使用那张角色卡
       * 再用charactergpswitches 中的名字, 到charactercard 使用那张卡的资料
       *
       *
       * SET 直接改变数據
       *
       */

      filter = {
        id: userid,
        gpid: channelid || groupid,
      };

      docSwitch = await schema.characterGpSwitch.findOne(filter);
      if (docSwitch && docSwitch.cardId) {
        doc = await schema.characterCard.findOne({
          _id: docSwitch.cardId,
        });
      } else {
        rply.text =
          "未有登记的角色卡, \n请输入.char use 角色卡名字  \n进行登记";
      }
      if (doc) {
        let useTarget = new RegExp(
          mainMsg[0] + "\\s+" + mainMsg[1] + "\\s+" + convertRegex(mainMsg[2])
        );
        let useName = convertRegex(mainMsg[2]);
        let useItemA = inputStr.replace(useTarget, "").replace(/^\s+/, "");
        let useCard = [
          {
            name: useName,
            itemA: useItemA.replace(/^[.]ch\s+/, "").replace(/^[.]char\s+/, ""),
          },
        ];
        doc.state = await Merge(doc.state, useCard, "name", true);
        doc.roll = await Merge(doc.roll, useCard, "name", true);
        doc.notes = await Merge(doc.notes, useCard, "name", true);
        try {
          let a = await doc.save();
          if (a) {
            let resutltState = (await findObject(doc.state, mainMsg[2])) || "";
            let resutltNotes = (await findObject(doc.notes, mainMsg[2])) || "";
            let resutltRoll = (await findObject(doc.roll, mainMsg[2])) || "";
            if (resutltState) {
              rply.text +=
                a.name + "\n" + resutltState.name + ": " + resutltState.itemA;
              rply.text += resutltState.itemB ? "/" + resutltState.itemB : "";
            }
            if (resutltNotes) {
              rply.text +=
                a.name + "\n" + resutltNotes.name + ": " + resutltNotes.itemA;
            }
            if (resutltRoll) {
              rply.text +=
                a.name + "\n" + resutltRoll.name + ": " + resutltRoll.itemA;
            }
            return rply;
          }
        } catch (error) {
          console.error("doc error", doc);
          console.error("inputSTR: ", inputStr);
          console.error("doc SAVE  GET ERROR:", error);
          console.error("更新角色卡失败: ", error);
          rply.text = "更新角色卡失败";
          return rply;
        }
      }
      return;

    case /(^[.]ch$)/i.test(mainMsg[0]) && /^show$/i.test(mainMsg[1]):
      if (!groupid) {
        rply.text = "此功能必须在社区中使用";
        return rply;
      }
      filter = {
        id: userid,
        gpid: channelid || groupid,
      };

      docSwitch = await schema.characterGpSwitch.findOne(filter);
      if (docSwitch && docSwitch.cardId) {
        doc = await schema.characterCard.findOne({
          _id: docSwitch.cardId,
        });
      } else {
        rply.text =
          "未有登记的角色卡, \n请输入.char use 角色卡名字  \n进行登记";
        return rply;
      }
      rply.text = await showCharacter(doc, "showMode");
      return rply;
    case /(^[.]ch$)/i.test(mainMsg[0]) && /^showall$/i.test(mainMsg[1]):
      if (!groupid) {
        rply.text = "此功能必须在社区中使用";
        return rply;
      }
      filter = {
        id: userid,
        gpid: channelid || groupid,
      };

      docSwitch = await schema.characterGpSwitch.findOne(filter);
      if (docSwitch && docSwitch.cardId) {
        doc = await schema.characterCard.findOne({
          _id: docSwitch.cardId,
        });
      } else {
        rply.text =
          "未有登记的角色卡, \n请输入.char use 角色卡名字  \n进行登记";
        return rply;
      }
      rply.text = await showCharacter(doc, "showAllMode");
      return rply;
    case /(^[.]ch$)/i.test(mainMsg[0]) && /^button$/i.test(mainMsg[1]): {
      if (!groupid) {
        rply.text = "此功能必须在社区中使用";
        return rply;
      }
      if (botname !== "Discord") {
        rply.text = "这是Discord限定功能";
        return rply;
      }
      const filter = {
        id: userid,
        gpid: channelid || groupid,
      };

      const docSwitch = await schema.characterGpSwitch.findOne(filter);
      if (docSwitch && docSwitch.cardId) {
        const doc = await schema.characterCard.findOne({
          _id: docSwitch.cardId,
        });
        if (doc.roll)
          rply.requestRollingCharacter = [
            handleRequestRollingChMode(doc),
            doc.name,
            "ch",
          ];
      }
      //  rply.requestRolling = handleRequestRolling(inputStr)
      return rply;
    }

    case /(^[.]ch$)/i.test(mainMsg[0]) && /^\S+$/i.test(mainMsg[1]):
      if (!groupid) {
        rply.text = "此功能必须在社区中使用";
        return rply;
      }
      filter = {
        id: userid,
        gpid: channelid || groupid,
      };

      docSwitch = await schema.characterGpSwitch.findOne(filter);
      if (docSwitch && docSwitch.cardId) {
        doc = await schema.characterCard.findOne({
          _id: docSwitch.cardId,
        });
      } else {
        rply.text =
          "未有登记的角色卡, \n请输入.char use 角色卡名字  \n进行登记";
        return rply;
      }
      //显示关鍵字
      /**
       * 对mainMsg 1以后的內容全部进行对比
       * 如果是roll的, 就变成掷骰MODE(最優先)
       * 在roll指令中, 如果有{\w+} 转換成数字
       * 没有的话, 再对比所有, 如果有state 的內容
       * 而且后面跟著数字 +3 -3, 会进行+-运算
       * 然后显示State
       * 如果只有一个, 则显示该项目
       *
       */

      tempMain = await mainCharacter(doc, mainMsg);
      rply = Object.assign({}, rply, tempMain);
      rply.characterName = doc.name;
      return rply;
    default:
      break;
  }
};
function handleRequestRolling(doc) {
  const rolls = doc.roll;
  let text = [];
  for (let index = 0; index < rolls.length; index++) {
    const roll = rolls[index];
    const itemName = new RegExp(convertRegex(roll.name) + "$", "i");
    text[index] = roll.itemA.match(itemName)
      ? `${roll.itemA}`
      : `${roll.itemA} [${roll.name}]`;
    text[index] = text[index].substring(0, 80);
  }
  text.push = `.ch use ${doc.name}`;
  return text;
}

function handleRequestRollingChMode(doc) {
  const rolls = doc.roll;
  let text = [];
  for (let index = 0; index < rolls.length; index++) {
    const roll = rolls[index];
    text[index] = `${roll.itemA} [${roll.name}]`;
    text[index] = text[index].substring(0, 80);
  }
  return text;
}

async function mainCharacter(doc, mainMsg) {
  mainMsg.shift();
  let findState = [];
  let findNotes = [];
  let findRoll = {};
  let last = "";
  let tempRply = {
    characterReRoll: false,
    text: "",
    characterReRollName: "",
  };
  for (let name in mainMsg) {
    let resutltState = await findObject(doc.state, mainMsg[name]);
    let resutltNotes = await findObject(doc.notes, mainMsg[name]);
    let resutltRoll = await findObject(doc.roll, mainMsg[name]);
    if (resutltRoll) {
      findRoll = resutltRoll;
      last = "roll";
    } else if (resutltNotes) {
      last = "notes";
      await findNotes.push(resutltNotes);
    } else if (resutltState) {
      last = "state";
      await findState.push(resutltState);
    } else if (mainMsg[name].match(/^[+-/*]\d+/i) && last == "state") {
      last = "";
      let res = mainMsg[name].charAt(0);
      let number = await countNum(mainMsg[name].substring(1));
      number ? await findState.push(res + number) : null;
    } else if (mainMsg[name].match(/^\d+$/i) && last == "state") {
      last = "";
      await findState.push(mainMsg[name]);
    } else {
      last = "";
    }
  }
  //如果是roll的, 就变成掷骰MODE(最優先)
  //如果是另外两个
  async function myAsyncFn(match, p1) {
    let result = await replacer(doc, p1);
    return result;
  }
  if (Object.keys(findRoll).length > 0) {
    //把{}进行replace
    //https://stackoverflow.com/questions/33631041/javascript-async-await-in-replace
    //ref source
    tempRply.characterReRollItem = await replaceAsync(
      findRoll.itemA,
      /\{(.*?)\}/gi,
      await myAsyncFn
    );
    tempRply.characterReRollItem = await replaceAsync(
      tempRply.characterReRollItem,
      /\[\[(.*?)\]\]/gi,
      await myAsyncFn2
    );
    tempRply.characterReRollName = findRoll.name;
    tempRply.characterReRoll = true;
  }
  if (Object.keys(findState).length > 0 || Object.keys(findNotes).length > 0) {
    for (let i = 0; i < findState.length; i++) {
      //如果i 是object , i+1 是STRING 和数字, 就进行加减
      //否则就正常输出
      if (
        typeof findState[i] == "object" &&
        typeof findState[i + 1] == "string"
      ) {
        doc.state.forEach(async (element, index) => {
          if (element.name === findState[i].name) {
            //如果是一个数字, 取代本来的数值
            //不然就尝试计算它
            //還是失败就强制变成一个数字,进行运算
            if (findState[i + 1].match(/^([0-9]*[.])?[0-9]+$/i)) {
              doc.state[index].itemA = findState[i + 1];
            } else {
              try {
                let num = mathjs.evaluate(
                  new String(doc.state[index].itemA) +
                    findState[i + 1].replace("--", "-")
                );
                if (!isNaN(num)) {
                  doc.state[index].itemA = num;
                }
              } catch (error) {
                console.error("error of Char:", findState[i + 1]);
              }
            }
          }
        });
      }
      if (typeof findState[i] == "object") {
        tempRply.text += findState[i].name + ": " + findState[i].itemA;
        if (findState[i].itemB) {
          tempRply.text += "/" + findState[i].itemB;
        }
        tempRply.text += "　\n";
      }
    }
    try {
      if (doc && doc.db) await doc.save();
    } catch (error) {
      // console.error('doc ', doc)
      console.error("doc SAVE GET ERROR:", error);
    }

    if (findNotes.length > 0) {
      for (let i = 0; i < findNotes.length; i++) {
        //如果i 是object , i+1 是STRING 和数字, 就进行加减
        //否则就正常输出
        tempRply.text += findNotes[i].name + ": " + findNotes[i].itemA + "　\n";
      }
    }

    if (findState.length > 0 || findNotes.length > 0) {
      tempRply.text = doc.name + "　\n" + tempRply.text;
    }
  }
  return tempRply;
}

async function findObject(doc, mainMsg) {
  let re = mainMsg.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
  let resutlt = doc.find((element) => {
    if (element.name)
      return element.name.match(new RegExp("^" + re + "$", "i"));
  });

  return resutlt;
}
const colorEmoji = ["🟫", "🟥", "🟧", "🟨"];
const colorEmoji2 = ["🟢", "🔵", "🟤", "🟣"];

async function showCharacter(Card, mode) {
  /*
    角色名字
    HP: 5/5 MP: 3/3 SAN: 50/90 護甲: 6
    -------
    投掷: cc 80 投掷 
    空手: cc 50
    -------
    筆记: SAD
    心灵支柱: 特质

    ======
    */
  let returnStr = "";
  if (mode == "addMode") {
    returnStr += "新增/修改成功\n";
  }
  returnStr += Card.name + "　\n";
  let a = 0;
  if (Card.state.length > 0) {
    for (let i = 0; i < Card.state.length; i++) {
      if (
        a != 0 &&
        a % 4 == 0 &&
        (Card.state[i].itemA || Card.state[i].itemB)
      ) {
        returnStr += "　\n";
      }
      returnStr += colorEmoji[(i + 1) % 4];

      if (mode == "addMode" || mode == "showAllMode") {
        returnStr += Card.state[i].name + ": " + Card.state[i].itemA;
        returnStr += Card.state[i].itemB ? "/" + Card.state[i].itemB : "";
      } else {
        returnStr += Card.state[i].itemA
          ? Card.state[i].name + ": " + Card.state[i].itemA
          : "";
        returnStr +=
          Card.state[i].itemA && Card.state[i].itemB
            ? "/" + Card.state[i].itemB
            : "";
      }
      if (Card.state[i].itemA || Card.state[i].itemB) {
        a++;
      }
      if (
        ((Card.state[i].itemA || Card.state[i].itemB) && mode == "addMode") ||
        mode == "showAllMode"
      ) {
        returnStr += " ";
      } else if (Card.state[i].itemA) {
        returnStr += " ";
      }
    }
    returnStr += "\n-------\n";
  }

  if (Card.roll.length > 0) {
    for (let i = 0; i < Card.roll.length; i++) {
      returnStr += colorEmoji2[(i + 1) % 4];
      if (mode == "addMode" || mode == "showAllMode") {
        returnStr += Card.roll[i].name + ": " + Card.roll[i].itemA + "  ";
      } else {
        returnStr += Card.roll[i].itemA
          ? Card.roll[i].name + ": " + Card.roll[i].itemA + "  "
          : "";
      }
      if (i != 0 && ((i + 1) % 2 == 0 || i == Card.roll.length - 1)) {
        returnStr += "　\n";
      }
    }
    returnStr += "-------\n";
  }
  if (mode == "addMode" || mode == "showAllMode")
    if (Card.notes.length > 0) {
      for (let i = 0; i < Card.notes.length; i++) {
        //returnStr += (Card.notes[i].itemA) ? Card.notes[i].name + ': ' + Card.notes[i].itemA + ' \n' : '';
        returnStr += Card.notes[i].name + ": " + Card.notes[i].itemA + "　\n";
      }

      returnStr += "-------";
    }
  return returnStr;
}

async function replacer(doc, match) {
  let result = "";
  let state = await findObject(doc.state, match);

  if (state && state.itemA) {
    result = state.itemA;
  } else {
    let note = await findObject(doc.notes, match);
    if (note && note.itemA) {
      result = note.itemA;
    }
  }
  return result;
}
async function analysicInputCharacterCard(inputStr) {
  let characterName = inputStr.match(regexName)
    ? inputStr.match(regexName)[1]
    : "";
  let characterStateTemp = inputStr.match(regexState)
    ? inputStr.match(regexState)[1]
    : "";
  let characterRollTemp = inputStr.match(regexRoll)
    ? inputStr.match(regexRoll)[1]
    : "";
  let characterNotesTemp = inputStr.match(regexNotes)
    ? inputStr.match(regexNotes)[1]
    : "";
  let characterState = characterStateTemp
    ? await analysicStr(characterStateTemp, true)
    : [];
  let characterRoll = characterRollTemp
    ? await analysicStr(characterRollTemp, false)
    : [];
  let characterNotes = characterNotesTemp
    ? await analysicStr(characterNotesTemp, false, "notes")
    : [];
  //Remove duplicates from an array of objects in JavaScript
  // if (characterState)
  characterState = characterState.filter(
    (v, i, a) => a.findIndex((t) => t.name === v.name) === i
  );
  //if (characterRoll)
  characterRoll = characterRoll.filter(
    (v, i, a) => a.findIndex((t) => t.name === v.name) === i
  );
  //if (characterNotes)
  characterNotes = characterNotes.filter(
    (v, i, a) => a.findIndex((t) => t.name === v.name) === i
  );
  let character = {
    name: characterName.replace(/^\s+/, "").replace(/\s+$/, ""),
    state: characterState,
    roll: characterRoll,
    notes: characterNotes,
  };
  return character;
}

async function analysicStr(inputStr, state, term) {
  let character = [];
  let myArray = [];
  while ((myArray = re.exec(inputStr)) !== null) {
    if (myArray[2].match(/.*?\/.*/) && state) {
      let temp2 = /(.*)\/(.*)/.exec(myArray[2]);
      myArray[2] = temp2[1];
      myArray[3] = temp2[2];
    }

    //防止误输入
    myArray[3] = myArray[3] == ";" ? "" : myArray[3];
    myArray[1] = myArray[1].replace(/\s+/g, "");
    if (term !== "notes") {
      myArray[2] = myArray[2]
        .replace(/\s+[.]ch\s+/i, " ")
        .replace(/\s+[.]char\s+/i, " ");
    }
    myArray[2] = myArray[2].replace(/^\s+/, "").replace(/\s+$/, "");
    myArray[3] = myArray[3].replace(/^\s+/, "").replace(/\s+$/, "");
    if (state)
      character.push({
        name: myArray[1],
        itemA: myArray[2],
        itemB: myArray[3],
      });
    else
      character.push({
        name: myArray[1],
        itemA: myArray[2],
      });
  }

  return character;
}
/*
character = {
            gpid: String,
            id: String,
            acrossGroup: boolem,
            active:boolem, 
            acrossActive:boolem,
            name: String,
            nameShow:boolem,
            state: [{name:String,itemA:String,itemB:String}],
            roll: [{name:String,itemA:String}],
            notes: [{name:String,itemA:String}]

        }
*/

//https://stackoverflow.com/questions/7146217/merge-2-arrays-of-objects
async function Merge(target, source, prop, updateMode) {
  /**
   * target 本来的资料
   * source 新资料
   * prop  以什么项目作比较对像
   * updateMode True 只会更新已有资料 False 没有的话, 加上去
   */
  if (!target) target = [];
  if (!source) source = [];
  const mergeByProperty = (target, source, prop) => {
    source.forEach((sourceElement) => {
      let targetElement = target.find((targetElement) => {
        return sourceElement[prop].match(
          new RegExp("^" + convertRegex(targetElement[prop]) + "$", "i")
        );
      });
      if (updateMode)
        targetElement ? Object.assign(targetElement, sourceElement) : "";
      else
        targetElement
          ? Object.assign(targetElement, sourceElement)
          : target.push(sourceElement);
    });
  };

  mergeByProperty(target, source, prop);
  return target;
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

async function myAsyncFn2(match, p1) {
  let result = "";
  try {
    result = mathjs.evaluate(p1);
  } catch (error) {
    result = p1;
  }
  return result;
}

async function countNum(num) {
  let result;
  let temp = await rollDice({
    mainMsg: [num],
  });
  if (temp && temp.text) {
    result = temp.text.match(/[+-]?([0-9]*[.])?[0-9]+$/)[0];
  } else if (num.match(/^[+-]?([0-9]*[.])?[0-9]+$/)) {
    result = num;
  }
  return result;
}
//模态框
const discordCommand = [
  // 新建角色
  {
    data: new SlashCommandBuilder()
      .setName("新建角色")
      .setDescription("创建一个新角色"),
    async execute(interaction) {
      const modal = new ModalBuilder()
        .setCustomId("createRoleModal")
        .setTitle("创建新角色");

      const roleNameInput = new TextInputBuilder()
        .setCustomId("roleName")
        .setLabel("角色名称")
        .setPlaceholder("请输入角色名称")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const roleAttributesInput = new TextInputBuilder()
        .setCustomId("roleAttributes")
        .setLabel("角色属性")
        .setPlaceholder(
          "请输入角色属性，多个属性之间用换行隔开。示例：\nHP: 5/5\nMP: 3/3\nSAN: 50/90"
        )
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(false);

      const roleDiceInput = new TextInputBuilder()
        .setCustomId("roleDice")
        .setLabel("角色骰点")
        .setPlaceholder(
          "请输入角色将会用于骰点的属性，多个属性之间用换行隔开，在冒号后指明使用的骰点方法，变量放在大括号中。示例：\n投掷: cc 80\nSC: cc {SAN}"
        )
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(false);

      const remarkInput = new TextInputBuilder()
        .setCustomId("remark")
        .setLabel("备注")
        .setPlaceholder("请填写其他备注信息，多个备注之间用换行隔开")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(false);

      const actionRow1 = new ActionRowBuilder().addComponents(roleNameInput);
      const actionRow2 = new ActionRowBuilder().addComponents(
        roleAttributesInput
      );
      const actionRow3 = new ActionRowBuilder().addComponents(roleDiceInput);
      const actionRow4 = new ActionRowBuilder().addComponents(remarkInput);

      modal.addComponents(actionRow1, actionRow2, actionRow3, actionRow4);

      await interaction.showModal(modal);
    },
  },
  //修改角色
  {
    data: new SlashCommandBuilder()
      .setName("修改角色")
      .setDescription("修改一个现有的角色"),

    async execute(interaction) {
      try {
        const userId = interaction.user.id;
        const characters = await schema.characterCard.find({ id: userId });

        const selectMenu = new StringSelectMenuBuilder()
          .setCustomId("selectCharacter")
          .setPlaceholder("请选择一个角色");

        if (characters.length === 0) {
          return interaction.reply({
            content: "你没有任何可用角色。",
            ephemeral: true,
          });
        }

        characters.forEach((character) => {
          selectMenu.addOptions(
            new StringSelectMenuOptionBuilder()
              .setLabel(character.name)
              .setValue(character._id.toString())
          );
        });

        const actionRow = new ActionRowBuilder().addComponents(selectMenu);

        await interaction.reply({
          content: "请选择你想要修改的角色：",
          components: [actionRow],
        });

        // 监听选择菜单的交互
        const filter = (i) =>
          i.customId === "selectCharacter" && i.user.id === userId;
        const collector = interaction.channel.createMessageComponentCollector({
          filter,
          time: 60000,
        });

        collector.on("collect", async (i) => {
          if (i.customId === "selectCharacter") {
            const selectedCharacterId = i.values[0];

            const character = await schema.characterCard.findById(
              selectedCharacterId
            );

            if (!character) {
              return i.update({
                content: "未找到该角色，请重新尝试。",
                components: [],
              });
            }

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

            const actionRow1 = new ActionRowBuilder().addComponents(
              roleNameInput
            );
            const actionRow2 = new ActionRowBuilder().addComponents(
              roleAttributesInput
            );
            const actionRow3 = new ActionRowBuilder().addComponents(
              roleDiceInput
            );
            const actionRow4 = new ActionRowBuilder().addComponents(
              remarkInput
            );

            modal.addComponents(actionRow1, actionRow2, actionRow3, actionRow4);

            await i.showModal(modal);
          }
        });

        collector.on("end", (collected) => {
          if (collected.size === 0) {
            interaction.editReply({
              content: "超时未选择角色。",
              components: [],
            });
          }
        });
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "在获取角色信息时发生错误。",
          ephemeral: true,
        });
      }
    },
  },
  //删除角色
  {
    data: new SlashCommandBuilder()
      .setName("删除角色")
      .setDescription("删除已有角色"),
    async execute(interaction) {
      try {
        const userId = interaction.user.id;
        const characters = await schema.characterCard.find({ id: userId });

        const selectMenu = new StringSelectMenuBuilder()
          .setCustomId("deleteCharacter")
          .setPlaceholder("请选择一个或多个角色")
          .setMinValues(1)
          .setMaxValues(characters.length); // 最大选择数量，需要与角色数量一致

        if (characters.length === 0) {
          return interaction.reply({
            content: "你没有任何可用角色。",
            ephemeral: true,
          });
        }

        characters.forEach((character) => {
          selectMenu.addOptions(
            new StringSelectMenuOptionBuilder()
              .setLabel(character.name)
              .setValue(character.name)
          );
        });

        const confirmButton = new ButtonBuilder()
          .setCustomId("confirmDelete")
          .setLabel("确认删除")
          .setStyle(ButtonStyle.Danger);

        const actionRow = new ActionRowBuilder().addComponents(selectMenu);
        const actionRow2 = new ActionRowBuilder().addComponents(confirmButton);

        await interaction.reply({
          content: "请选择你想要删除的一个或多个角色，然后点击确认删除：",
          components: [actionRow, actionRow2],
        });
      } catch (error) {
        console.error(`发生错误: ${error.message}`);
        await interaction.reply({
          content: "查询角色时发生错误，请稍后再试。",
          ephemeral: true,
        });
      }
    },
  },
];

module.exports = {
  rollDiceCommand: rollDiceCommand,
  initialize: initialize,
  getHelpMessage: getHelpMessage,
  prefixs: prefixs,
  gameType: gameType,
  gameName: gameName,
  mainCharacter: mainCharacter,
  discordCommand: discordCommand,
};

/*
以个人为单位, 一张卡可以在不同的社区使用
.char add 的输入格式,用来增建角色卡
.char add name[Sad]~
state[HP:5/5;MP:3/3;SAN:50/99;護甲:6]~
roll[投掷:cc 80 投掷;空手斗殴: cc [[50 +{hp}]]]~
notes[筆记:SAD;心灵支柱: 特质]~

// state 可以进行增减
// notes 文字筆记
// roll 掷骰指令

如果没有名字 会更新修正正在USE的角色卡
但没有的话,  就会出错
============


===
.char use 使用角色卡
.char use sad
会自动使用名叫Sad 的角色卡
====
.char nonuse
.char use
会取消在此社区使用角色卡

====
.char delete  角色卡
.char delete Sad
刪除角色卡

====

显示SHOW 功能:

.ch show (显示 名字 state 和roll)
.ch shows  (显示 名字 state,notes 和roll)
.ch show notes (显示 名字 和notes)


角色名字
HP: 5/5 MP: 3/3 SAN: 50/90 護甲: 6
-------
投掷: cc 80 投掷
空手: cc 50
-------
筆记: SAD
心灵支柱: 特质

======

功能 使用角色卡的state 和notes

.ch set HP  10 直接把现在值变成10
.ch set HP  10/20 直接把现在值变成10 最大值变成20



.ch HP MP 显示该內容
HP 5/5 MP 3/3

.ch HP -5 如果HP是State 自动减5
.ch HP +5  如果HP是State 自动加5 如果是



============
.ch 输出指令
.ch  投掷
cc 80 投掷
在指令中可以加上 +{HP} -{san}
在结果中会进行运算。


======


*/
