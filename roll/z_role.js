"use strict";
if (!process.env.mongoURL) {
  return;
}
const VIP = require("../modules/veryImportantPerson");
const FUNCTION_LIMIT = [3, 10, 50, 200, 200, 200, 200, 200];
const schema = require("../modules/schema.js");
const emojiRegex = require("emoji-regex");
let regextemp = emojiRegex().toString();
const regex = regextemp.replace(/^\//, "").replace(/\/g$/, "");
//https://www.npmjs.com/package/emoji-regex
const roleReactRegixMessage = /\[\[message\]\](.*)/is;
const newRoleReactRegixMessageID = /\[\[messageID\]\]\s+(\d+)/is;
const roleReactRegixDetail = new RegExp(
  `(\\d+)\\s+(${regex}|(<a?)?:\\w+:(\\d+>)?)`,
  "g"
);
const roleReactRegixDetail2 = new RegExp(
  `^(\\d+)\\s+(${regex}|(<a?)?:\\w+:(\\d+>)?)`
);
const gameName = function () {
  return "【身份组管理】.roleReact";
};

const gameType = function () {
  return "Tool:role:hktrpg";
};
const prefixs = function () {
  return [
    {
      first: /^\.roleReact$/i,
      second: null,
    },
  ];
};
const getHelpMessage = function () {
  return `【身份组管理】Discord限定功能
让对指定信息的Reaction Emoji(😀😃😄)进行点击的用家
分配指定的身份组别

示范
https://i.imgur.com/YCnCyET.mp4

注意: 此功能需求【编辑身份组】及【增加Reaction】的权限，请确定授权。
另外，使用者需要【管理者】权限。

指令列表

1.设定Reaction给予身份组
首先去User Setting=>Advanced=>开启Developer Mode
这会令你可以COPY ID
再去Server Setting=>Roles=>新增或设定希望分配的身份组
然后对该身份组按右键并按COPY ID，把该ID记下来

接着，去任意频道中发布一段信息，并对该信息按右键后按COPY ID，和记下ID

示例
按🎨可得身份组-画家
按😁可得身份组-大笑

然后按以下格式输入指令

.roleReact add
身份组ID Emoji
[[messageID]]
发布信息的ID

示例
.roleReact add
232312882291231263 🎨 
123123478897792323 😁 
[[messageID]]
12312347889779233

完成
注意, 可以重复输入同样ID来增加新emoji

2.显示列表
.roleReact show

3.删除
.roleReact delete 序号
删除方式是 delete 后面接上序号
示例
.roleReact delete 1


    `;
};
const initialize = function () {
  return "";
};

const rollDiceCommand = async function ({
  inputStr,
  mainMsg,
  botname,
  userrole,
  groupid,
}) {
  let rply = {
    default: "on",
    type: "text",
    text: "",
  };
  if (botname !== "Discord") {
    rply.text = "此功能只能在Discord中使用";
    return rply;
  }
  switch (true) {
    case /^help$/i.test(mainMsg[1]) || !mainMsg[1]: {
      rply.text = this.getHelpMessage();
      rply.quotes = true;
      return rply;
    }
    case !groupid || userrole < 3: {
      rply.text = rejectUser(
        !groupid ? "notInGroup" : userrole < 3 ? "notAdmin" : ""
      );
      return rply;
    }
    //new Type role React
    case /^\.roleReact$/i.test(mainMsg[0]) && /^show$/i.test(mainMsg[1]): {
      let list = await schema.roleReact
        .find({ groupid: groupid })
        .catch((error) =>
          console.error("role #188 mongoDB error: ", error.name, error.reson)
        );
      rply.text = roleReactList(list);
      return rply;
    }

    case /^\.roleReact$/i.test(mainMsg[0]) && /^delete$/i.test(mainMsg[1]): {
      if (!mainMsg[2] || !/\d+/i.test(mainMsg[2])) {
        rply.text =
          "移除指令为 .roleReact delete (序号) \n 如 .roleReact delete 1";
        return rply;
      }
      try {
        let myNames = await schema.roleReact
          .findOneAndRemove({ groupid: groupid, serial: mainMsg[2] })
          .catch((error) =>
            console.error("role #111 mongoDB error: ", error.name, error.reson)
          );
        if (myNames) {
          rply.text = `移除成功，#${myNames.serial}\n${myNames.message}`;
          return rply;
        } else {
          rply.text =
            "移除出错\n移除指令为 .roleReact delete (序号) \n 如 .roleReact delete 1 \n序号请使用.roleReact show 查询";
          return rply;
        }
      } catch (error) {
        console.error("移除失败, inputStr: ", inputStr);
        rply.text =
          "移除出错\n移除指令为 .roleReact delete (序号) \n 如 .roleReact delete 1 \n序号请使用.roleReact show 查询";
        return rply;
      }
    }

    case /^\.roleReact$/i.test(mainMsg[0]) && /^add$/i.test(mainMsg[1]): {
      if (!mainMsg[5]) {
        rply.text = `输入资料失败，
                本功能已改版，需要自行新增信息，并把信息ID填在下面

                范例
                .roleReact add
                232312882291231263 🎨 
                123123478897792323 😁 
                [[messageID]]
                946739512439073384

                希望取得详细使用说明请输入.roleReact help 或到 https://bothelp.hktrpg.com`;
        rply.quotes = true;
        return rply;
      }
      let checkName = checknewroleReact(inputStr);
      if (
        !checkName ||
        !checkName.detail ||
        !checkName.messageID ||
        checkName.detail.length === 0
      ) {
        rply.text = `输入资料失败，
                本功能已改版，需要自行新增信息，并把信息ID填在下面
                
                范例
                .roleReact add
                232312882291231263 🎨 
                123123478897792323 😁 
                [[messageID]]
                946739512439073384

                希望取得详细使用说明请输入.roleReact help 或到 https://bothelp.hktrpg.com`;
        rply.quotes = true;
        return rply;
      }

      //已存在相同
      let list = await schema.roleReact
        .findOne({ groupid: groupid, messageID: checkName.messageID })
        .catch((error) =>
          console.error("role #240 mongoDB error: ", error.name, error.reson)
        );
      if (list) {
        list.detail.push.apply(list.detail, checkName.detail);
        await list
          .save()
          .catch((error) =>
            console.error("role #244 mongoDB error: ", error.name, error.reson)
          );
        rply.text = `已成功更新。你现在可以试试role功能\n可以使用.roleReact show /  delete 操作 ${list.serial}`;
        rply.newRoleReactFlag = true;
        rply.newRoleReactMessageId = checkName.messageID;
        rply.newRoleReactDetail = checkName.detail;
        return rply;
      }

      //新增新的
      let lv = await VIP.viplevelCheckGroup(groupid);
      let limit = FUNCTION_LIMIT[lv];
      let myNamesLength = await schema.roleReact
        .countDocuments({ groupid: groupid })
        .catch((error) =>
          console.error("role #141 mongoDB error: ", error.name, error.reson)
        );
      if (myNamesLength >= limit) {
        rply.text = ".roleReact 社区上限为" + limit + "个";
        rply.quotes = true;
        return rply;
      }
      const dateObj = new Date();
      let month = dateObj.getMonth() + 1; //months from 1-12
      let day = dateObj.getDate();
      let year = dateObj.getFullYear();
      let hour = dateObj.getHours();
      let minute = dateObj.getMinutes();
      let listSerial = await schema.roleReact
        .find({ groupid: groupid }, "serial")
        .catch((error) =>
          console.error("role #268 mongoDB error: ", error.name, error.reson)
        );
      let serial = findTheNextSerial(listSerial);
      let myName = new schema.roleReact({
        message: `${year}/${month}/${day}  ${hour}:${minute} - ID: ${checkName.messageID}`,
        groupid: groupid,
        messageID: checkName.messageID,
        serial: serial,
        detail: checkName.detail,
      });
      try {
        await myName
          .save()
          .catch((error) =>
            console.error("role #277 mongoDB error: ", error.name, error.reson)
          );
        rply.text = `已成功增加。你现在可以试试role功能\n繼续用add 同样的messageID 可以新增新的emoji 到同一信息\n刪除可以使用.roleReact delete ${serial}`;
        rply.newRoleReactFlag = true;
        rply.newRoleReactMessageId = checkName.messageID;
        rply.newRoleReactDetail = checkName.detail;
        return rply;
      } catch (error) {
        console.error("role save error:", error);
        rply.text = `储存失败\n请重新再试`;
        return rply;
      }
    }

    default: {
      break;
    }
  }
};

/**
        case /^\.roleReact$/i.test(mainMsg[0]) && /^show$/i.test(mainMsg[1]): {
            let list = await schema.roleReact.find({ groupid: groupid }).catch(error => console.error('role #100 mongoDB error: ', error.name, error.reson));
            rply.text = roleReactList(list);
            return rply;
        }

        case /^\.roleReact$/i.test(mainMsg[0]) && /^delete$/i.test(mainMsg[1]): {
            if (!mainMsg[2] || !/\d+/i.test(mainMsg[2])) {
                rply.text = '移除指令为 .roleReact delete (序号) \n 如 .roleReact delete 1'
                return rply
            }
            try {
                let myNames = await schema.roleReact.findOneAndRemove({ groupid: groupid, serial: mainMsg[2] }).catch(error => console.error('role #111 mongoDB error: ', error.name, error.reson));
                if (myNames) {
                    rply.text = `移除成功，#${myNames.serial}\n${myNames.message}`
                    return rply
                } else {
                    rply.text = '移除出错\n移除指令为 .roleReact delete (序号) \n 如 .roleReact delete 1 \n序号请使用.roleReact show 查询'
                    return rply
                }
            } catch (error) {
                console.error("移除失败, inputStr: ", inputStr);
                rply.text = '移除出错\n移除指令为 .roleReact delete (序号) \n 如 .roleReact delete 1 \n序号请使用.roleReact show 查询'
                return rply
            }
        }

        case /^\.roleReact$/i.test(mainMsg[0]) && /^add$/i.test(mainMsg[1]): {
            if (!mainMsg[5]) {
                rply.text = `输入资料失败，范例
                .roleReact add
                232312882291231263 🎨 
                123123478897792323 😁 
                [[message]]
                按🎨可得身份组-畫家
                按😁可得身份组-大笑
                希望取得详细使用说明请输入.roleReact help`
                rply.quotes = true;
                return rply;
            }
            let lv = await VIP.viplevelCheckGroup(groupid);
            let limit = FUNCTION_LIMIT[lv];
            let myNamesLength = await schema.roleReact.countDocuments({ groupid: groupid }).catch(error => console.error('role #141 mongoDB error: ', error.name, error.reson));
            if (myNamesLength >= limit) {
                rply.text = '.roleReact 社区上限为' + limit + '个\n支援及解锁上限 https://www.patreon.com/HKTRPG\n';
                rply.quotes = true;
                return rply;
            }
            let checkName = checkRoleReact(inputStr);
            if (!checkName || !checkName.message || !checkName.detail || checkName.detail.length === 0) {
                rply.text = `输入资料失败，范例
                .roleReact add
                232312882291231263 🎨 
                123123478897792323 😁 
                [[message]]
                按🎨可得身份组-畫家
                按😁可得身份组-大笑
                希望取得详细使用说明请输入.roleReact help`
                rply.quotes = true;
                return rply;
            }
            let list = await schema.roleReact.find({ groupid: groupid }, 'serial').catch(error => console.error('role #161 mongoDB error: ', error.name, error.reson));
            let myName = new schema.roleReact({
                message: checkName.message,
                groupid: groupid,
                serial: findTheNextSerial(list),
                detail: checkName.detail
            })
            try {
                let data = await myName.save().catch(error => console.error('role #169 mongoDB error: ', error.name, error.reson));
                rply.roleReactFlag = true;
                rply.roleReactMongooseId = data.id;
                rply.roleReactMessage = checkName.message;
                rply.roleReactDetail = checkName.detail;
                return rply;
            } catch (error) {
                console.error('role save error:', error)
                rply.text = `储存失败\n请重新再试，或联絡HKTRPG作者`;
                return rply;
            }
        }
 

*/

function checkRoleReact(inputStr) {
  let message = inputStr.match(roleReactRegixMessage);
  inputStr = inputStr.replace(roleReactRegixMessage);
  let detail = [];
  let detailTemp = inputStr.match(roleReactRegixDetail);
  for (let index = 0; index < detailTemp.length && index < 20; index++) {
    const regDetail = detailTemp[index].match(roleReactRegixDetail2);
    detail.push({
      roleID: regDetail[1],
      emoji: regDetail[2],
    });
  }
  return { message: message && message[1].replace(/^\n/, ""), detail };
}

function checknewroleReact(inputStr) {
  let messageID = inputStr.match(newRoleReactRegixMessageID);
  inputStr = inputStr.replace(newRoleReactRegixMessageID);
  let detail = [];
  let detailTemp = inputStr.match(roleReactRegixDetail);
  for (let index = 0; index < detailTemp.length && index < 20; index++) {
    const regDetail = detailTemp[index].match(roleReactRegixDetail2);
    detail.push({
      roleID: regDetail[1],
      emoji: regDetail[2],
    });
  }
  return { messageID: messageID && messageID[1].replace(/^\n/, ""), detail };
}

const rejectUser = (reason) => {
  switch (reason) {
    case "notInGroup":
      return "这功能只可以在频道中使用";
    case "notAdmin":
      return "这功能只可以由服务器管理员使用";
    default:
      return "这功能未能使用";
  }
};

function roleReactList(list) {
  let reply = "";
  if (list && list.length > 0) {
    list.sort(compareSerial);
    for (let index = 0; index < list.length; index++) {
      let item = list[index];
      reply += `\n序号#${item.serial} \n 新增日期: ${item.message}\n`;
      for (let index = 0; index < item.detail.length; index++) {
        const role = item.detail[index];
        reply += `身份ID#${role.roleID} emoji: ${role.emoji}\n`;
      }
    }
  } else reply = "没有找到已设定的react 资料。";
  return reply;
}

function compareSerial(a, b) {
  if (a.serial < b.serial) {
    return -1;
  }
  if (a.serial > b.serial) {
    return 1;
  }
  return 0;
}

function findTheNextSerial(list) {
  if (list.length === 0) return 1;
  let serialList = [];
  for (let index = 0; index < list.length; index++) {
    serialList.push(list[index].serial);
  }
  serialList.sort(function (a, b) {
    return a - b;
  });
  //[1,2,4,5]
  for (let index = 0; index < serialList.length - 1; index++) {
    if (serialList[index] !== index + 1) {
      return index + 1;
    }
  }
  return serialList[list.length - 1] + 1;
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
 * const roleInvitesRegixMessage = /(\d+)\s+(\S+)/g;
case /^\.roleInvites$/i.test(mainMsg[0]) && /^add$/i.test(mainMsg[1]): {
    if (!mainMsg[3]) {
        rply.text = '输入资料失败，请仔细检查说明及范例\n希望取得使用说明请输入.roleInvites help'
        rply.quotes = true;
        return rply;
    }
    const lv = await VIP.viplevelCheckGroup(groupid);
    const limit = FUNCTION_LIMIT[lv];
    const myNamesLength = await schema.roleInvites.countDocuments({ groupid: groupid })
    if (myNamesLength >= limit) {
        rply.text = '.roleInvites 社区上限为' + limit + '个\n支援及解锁上限 https://www.patreon.com/HKTRPG\n';
        rply.quotes = true;
        return rply;
    }

    let checkName = checkroleInvites(inputStr);
    if (!checkName || checkName.length == 0) {
        rply.text = `输入资料失败，请仔细检查说明及范例
.roleInvites add
(身份组) (邀请連结/邀请码)
希望取得使用说明请输入.roleInvites help`;
        rply.quotes = true;
        return rply;
    }
    if (myNamesLength + checkName.length >= limit) {
        rply.text = '.roleInvites 社区上限为' + limit + '个\n一条邀请連结使用一个限额\n支援及解锁上限 https://www.patreon.com/HKTRPG\n';
        rply.quotes = true;
        return rply;
    }
    for (let index = 0; index < checkName.length; index++) {
        let list = await schema.roleInvites.find({ groupid: groupid }, 'serial');
        const myName = new schema.roleInvites({
            groupid: groupid,
            serial: findTheNextSerial(list),
            roleID: checkName[index].roleID,
            invitesLink: checkName[index].invitesLink
        })
        try {
            await myName.save();
            rply.text += `序号#${myName.serial}     ID: ${myName.roleID}       ${myName.invitesLink}\n`;

        } catch (error) {
            console.error('error', error)
            rply.text = `储存失败\n请重新再试，或联絡HKTRPG作者}`;
            return rply;
        }
    }
    return rply;
}
function checkroleInvites(inputStr) {
    inputStr = inputStr.replace(/^\s?\.roleInvites\s+add\s?\S?/i, '').replace(/https:\/\/discord.gg\/qUacvzUz/i, '')
    let detail = []
    let detailTemp = inputStr.match(roleInvitesRegixMessage);
    for (let index = 0; index < detailTemp.length; index++) {
        const regDetail = detailTemp[index].match((/(\S+)\s+(\S+)/u))
        detail.push({
            roleID: regDetail[1],
            invitesLink: regDetail[2]
        })
    }
    return detail;
}

  case /^\.roleInvites$/i.test(mainMsg[0]) && /^show$/i.test(mainMsg[1]): {
            let list = await schema.roleInvites.find({ groupid: groupid });
            rply.text = roleInvitesList(list);
            return rply;
        }

 case /^\.roleInvites$/i.test(mainMsg[0]) && /^delete$/i.test(mainMsg[1]): {
            if (!mainMsg[2] || !/\d+/i.test(mainMsg[2])) {
                rply.text = '移除指令为 .roleInvites delete (序号) \n 如 .roleInvites delete 1'
                return rply
            }
            try {
                let myNames = await schema.roleInvites.findOneAndRemove({ groupid: groupid, serial: mainMsg[2] })
                if (myNames) {
                    rply.text = `移除成功，#${myNames.serial}\n${myNames.invitesLink}`
                    return rply
                } else {
                    rply.text = '移除出错\n移除指令为 .roleInvites delete (序号) \n 如 .roleInvites delete 1 \n序号请使用.roleInvites show 查询'
                    return rply
                }
            } catch (error) {
                console.error("移除失败, inputStr: ", inputStr);
                rply.text = '移除出错\n移除指令为 .roleInvites delete (序号) \n 如 .roleInvites delete 1 \n序号请使用.roleInvites show 查询'
                return rply
            }
        }
        function roleInvitesList(list) {
    let reply = '';
    if (list && list.length > 0) {
        list.sort(compareSerial);
        for (let index = 0; index < list.length; index++) {
            let item = list[index];
            reply += `序号#${item.serial} \n身份ID#: ${item.roleID} 邀请連结: ${item.invitesLink}\n`;
        }
    }
    else reply = "没有找到序号。"
    return reply;
}

 */
