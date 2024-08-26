"use strict";
if (!process.env.mongoURL) {
  return;
}
const VIP = require("../modules/veryImportantPerson");
const limitAtArr = [10, 20, 50, 200, 200, 200, 200, 200];
const schema = require("../modules/schema.js");
const opt = {
  upsert: true,
  runValidators: true,
  new: true,
};
const gameName = function () {
  return "【你的名字】.myname / .me .me1 .me泉心";
};
const convertRegex = function (str) {
  return str.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
};
const gameType = function () {
  return "Tool:myname:骰娘爱你哦💖";
};
const prefixs = function () {
  return [
    {
      first: /^\.myname$|^\.me\S+/i,
      second: null,
    },
  ];
};
const getHelpMessage = function () {
  return `【你的名字】Discord限定功能
TRPG扮演发言功能
你可以设定一个角色的名字及头像，
然后你只要输入指令和说话，
就会帮你使用该角色发言。

示范
https://i.imgur.com/VSzO08U.png

注意: 此功能需求编辑Webhook及信息功能，请确定授权。

指令列表

1.设定角色
.myname "名字" 角色图片网址 名字缩写(非必要)
示例 
.myname "泉心 造史" https://images.pexels.com/photos/10013067/pexels-photo-10013067.jpeg 造

*名字*是角色名字，会作为角色显示的名字，但如果该名字有空格就需要用开引号"包着
如"泉心 造史" 不然可以省去

图片则是角色图示，如果图片出错会变成最简单的Discord图示，
图片可以直接上传到DISCORD或IMGUR.COM上，然后复制连结

名字缩写是 是用来方便你启动它
例如 .me造 「来玩吧」

2.删除角色
.myname delete  序号 / 名字缩写  
删除方式是delete 后面接上序号或名字缩写


3.显示角色列表
.myname show

4.使用角色发言
.me(序号/名字缩写) 信息
如
.me1 泉心慢慢的走到他们旁边，伺机行动
.me造 「我接受你的挑战」 
.me造 「我接受你的挑战」 
[[CC 80]] 
[[立FLAG]]

支援掷骰，请使用[[]]来包裹掷骰指令
    `;
};
const errorMessage = `输入出错\n留意各个资料前要有空格分隔\n 
范例
.myname "泉心 造史" https://example.com/example.jpg 造史
.myname 泉心造史 https://example.com/example.jpg 1
.myname 泉心造史 https://example.com/example.jpg
`;
const initialize = function () {
  return "";
};

const rollDiceCommand = async function ({
  inputStr,
  mainMsg,
  userid,
  botname,
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
    case /^\.myname+$/i.test(mainMsg[0]) && /^show$/i.test(mainMsg[1]): {
      let myNames = await schema.myName.find({ userID: userid });
      if (groupid) {
        let result = showNames(myNames);
        if (typeof result == "string") rply.text = result;
        else rply.myNames = result;
      } else {
        rply.text = showNamesInText(myNames);
      }
      return rply;
    }
    case /^\.myname+$/i.test(mainMsg[0]) && /^delete$/i.test(mainMsg[1]): {
      if (!mainMsg[2] || !/\d+/i.test(mainMsg[2])) {
        rply.text =
          "移除角色指令为 .myname delete (序号/名字缩写) \n 如 .myname delete 0 / .myname delete 小云";
        return rply;
      }
      if (mainMsg[2].match(/\d+/)) {
        try {
          let myNames = await schema.myName.find({ userID: userid });
          let result = await myNames[mainMsg[2] - 1].deleteOne();
          if (result) {
            rply.text = `移除成功，${result.name} 已被移除`;
            return rply;
          } else {
            rply.text =
              "移除出错\n移除角色指令为 .myname delete (序号 或 名字缩写) \n 如 .myname delete 1 / .myname delete 小云\n序号请使用.myname show 查询";
            return rply;
          }
        } catch (error) {
          //   console.error("移除角色失败, inputStr: ", inputStr);
          rply.text =
            "移除出错\n移除角色指令为 .myname delete (序号 或 名字缩写) \n 如 .myname delete 1 / .myname delete 小云\n序号请使用.myname show 查询";
          return rply;
        }
      }

      try {
        let myNames = await schema.myName.findOneAndRemove({
          userID: userid,
          shortName: mainMsg[2],
        });

        if (myNames) {
          rply.text = `移除成功，${myNames}`;
          rply.quotes = true;
          return rply;
        } else {
          rply.text =
            "移除出错\n移除角色指令为 .myname delete (序号/名字缩写) \n 如 .myname delete 1 / .myname delete 小云\n序号请使用.myname show 查询";
          rply.quotes = true;
          return rply;
        }
      } catch (error) {
        //   console.error("移除角色失败, inputStr: ", inputStr);
        rply.text =
          "移除出错\n移除角色指令为 .myname delete (序号/名字缩写) \n 如 .myname delete 1 / .myname delete 小云\n序号请使用.myname show 查询";
        rply.quotes = true;
        return rply;
      }
    }
    case /^\.myname$/i.test(mainMsg[0]): {
      //.myname 泉心造史 https://example.com/example.jpg
      if (!mainMsg[2]) {
        rply.text = errorMessage;
        rply.quotes = true;
        return rply;
      }
      let lv = await VIP.viplevelCheckUser(userid);
      let limit = limitAtArr[lv];
      let myNamesLength = await schema.myName.countDocuments({
        userID: userid,
      });
      if (myNamesLength >= limit) {
        rply.text =
          ".myname 个人上限为" +
          limit +
          "个";
        rply.quotes = true;
        return rply;
      }
      let checkName = checkMyName(inputStr);
      if (!checkName || !checkName.name || !checkName.imageLink) {
        rply.text = errorMessage;
        rply.quotes = true;
        return rply;
      }
      if (!checkName.imageLink.match(/^http/i)) {
        rply.text = `输入出错\n 图示link 必须符合 http/https 开头`;
        rply.quotes = true;
        return rply;
      }
      let myName = {};
      try {
        myName = await schema.myName.findOneAndUpdate(
          { userID: userid, name: checkName.name },
          { imageLink: checkName.imageLink, shortName: checkName.shortName },
          opt
        );
      } catch (error) {
        rply.text = `发生了一点错误，请稍后再试`;
        return rply;
      }
      rply.text = `已新增角色 - ${myName.name}`;
      let myNames = await schema.myName.find({ userID: userid });

      if (groupid) {
        rply.myNames = [showName(myNames, myName.name)];
      } else {
        rply.text += showName(myNames, myName.name).content;
      }
      return rply;
    }
    case /^\.me\S+/i.test(mainMsg[0]): {
      //.myname 泉心造史 https://example.com/example.jpg
      if (!mainMsg[1]) {
        return;
      }
      if (!groupid) {
        rply.text = ".me(X) 这功能只可以在频道中使用";
        rply.quotes = true;
        return rply;
      }
      let checkName = checkMeName(mainMsg[0]);
      let myName;
      if (typeof checkName == "number") {
        let myNameFind = await schema.myName
          .find({ userID: userid })
          .skip(checkName - 1 < 0 ? 1 : checkName - 1)
          .limit(1);
        if (myNameFind) {
          myName = myNameFind[0];
        }
      }
      if (!myName) {
        try {
          myName = await schema.myName.findOne({
            userID: userid,
            shortName: new RegExp("^" + convertRegex(checkName) + "$", "i"),
          });
        } catch (error) {
          // rply.text = `找不到角色 - ${checkName} \n可能是序号或名字不对`;
          // rply.quotes = true;
          return rply;
        }
      }
      if (!myName) {
        //   rply.text = `找不到角色 - ${checkName} \n可能是序号或名字不对`;
        // rply.quotes = true;
        return rply;
      }
      rply.myName = showMessage(myName, inputStr);
      return rply;
    }
    default: {
      break;
    }
  }
};

function showMessage(myName, inputStr) {
  let result = {
    content: inputStr.replace(/^\s?\S+\s+/, ""),
    username: myName.name,
    avatarURL: myName.imageLink,
  };
  return result;
}

function checkMyName(inputStr) {
  try {
    let name = inputStr.replace(/^\s?\S+\s+/, "");
    let finalName = {};
    if (name.match(/^".*"/)) {
      finalName = name.match(/"(.*)"\s+(\S+)\s*(\S*)/);
    } else {
      finalName = name.match(/^(\S+)\s+(\S+)\s*(\S*)/);
    }
    return {
      name: finalName[1],
      imageLink: finalName[2],
      shortName: finalName[3],
    };
  } catch (err) {
    return {};
  }
}

function checkMeName(inputStr) {
  let name = inputStr.replace(/^\.me/i, "");
  if (name.match(/^\d+$/)) {
    name = Number(name);
  }
  return name;
}

function showNames(names) {
  let reply = [];
  if (names && names.length > 0) {
    for (let index = 0; index < names.length; index++) {
      let name = names[index];
      reply[index] = {
        content: `序号#${index + 1} \n${
          name.shortName
            ? `安安，我的別名是${name.shortName}`
            : `嘻，我的名字是${name.name}`
        }
\n使用我来发言的指令是输入  \n.me${index + 1} 加上你想说的话${
          name.shortName ? `\n或 \n .me${name.shortName} 加上你想说的话` : ""
        } `,
        username: name.name,
        avatarURL: name.imageLink,
      };
    }
  } else reply = "没有找到角色";
  return reply;
}

function showNamesInText(names) {
  let reply = "";
  if (names && names.length > 0) {
    for (let index = 0; index < names.length; index++) {
      let name = names[index];
      reply += `序号#${index + 1} \n${
        name.shortName
          ? `安安，我是${name.name}，我的別名是${name.shortName}`
          : `嘻，我的名字是${name.name}`
      } \n${name.imageLink} \n
\n使用我来发言的指令是输入  \n.me${index + 1} 加上你想说的话${
        name.shortName ? `\n或 \n .me${name.shortName} 加上你想说的话` : ""
      } `;
    }
  } else reply = "没有找到角色";
  return reply;
}

function showName(names, targetName) {
  let reply = {};
  if (names && names.length > 0) {
    for (let index = 0; index < names.length; index++) {
      let name = names[index];
      if (names[index].name == targetName)
        reply = {
          content: `序号#${index + 1} \n${
            name.shortName
              ? `Hello, 我的別名是${name.shortName}`
              : `你好，我的名字是${name.name}`
          } \n使用我来发言的指令是输入  \n.me${index + 1} 加上你想说的话${
            name.shortName ? `\n或 \n .me${name.shortName} 加上你想说的话` : ""
          } `,
          username: name.name,
          avatarURL: name.imageLink,
        };
    }
  } else reply = "没有找到角色";
  return reply;
}

module.exports = {
  rollDiceCommand: rollDiceCommand,
  initialize: initialize,
  getHelpMessage: getHelpMessage,
  prefixs: prefixs,
  gameType: gameType,
  gameName: gameName,
};
