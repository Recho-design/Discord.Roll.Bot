"use strict";
if (!process.env.DISCORD_CHANNEL_SECRET) {
  return;
}
const { PermissionFlagsBits, PermissionsBitField } = require("discord.js");
let variables = {};
const oneMinuts = process.env.DEBUG ? 1 : 60000;
const sevenDay = process.env.DEBUG ? 1 : 60 * 24 * 7 * 60000;
const checkTools = require("../modules/check.js");

const gameName = function () {
  return "【Discord 频道输出工具】";
};
const opt = {
  upsert: true,
  runValidators: true,
};
const VIP = require("../modules/veryImportantPerson");
const FUNCTION_LIMIT = process.env.DEBUG
  ? [99, 99, 99, 40, 40, 99, 99, 99]
  : [1, 20, 40, 40, 40, 99, 99, 99];
/**
 * 因为資源限制，
 * 每个guild 5分钟可以使用一次,
 * 每个ACC可以一星期一次
 *
 *
 * 升级的话, 个人一星期20次
 * 只有一分钟限制
 *
 */
const schema = require("../modules/schema.js");
const fs = require("fs").promises;
const moment = require("moment-timezone");
const CryptoJS = require("crypto-js");
const gameType = function () {
  return "Tool:Export:骰娘爱你哦💖";
};
const dir = __dirname + "/../tmp/";
const prefixs = function () {
  return [
    {
      first: /^[.]discord$/i,
      second: null,
    },
  ];
};
const getHelpMessage = async function () {
  return `测试进行中【聊天记录】
    .discord html 可以输出有分析功能的聊天记录
    .discord txt 可以输出纯文字的聊天记录
    .discord txt -withouttime 可以输出【没有时间标记的】纯文字的聊天记录
    需要使用者及rollbot 都有阅读频道聊天记录的权限
    然后会私信你记录
    注意 使用此功能，你需要有管理此频道的权限或管理员权限。
    另外网页版内容经过AES加密，后者是纯文字档案
    因为经过server处理，担心个人资料外泄请勿使用。
`;
};
const initialize = function () {
  return variables;
};

const rollDiceCommand = async function ({
  inputStr,
  mainMsg,
  discordClient,
  discordMessage,
  channelid,
  groupid,
  botname,
  userid,
  userrole,
}) {
  let rply = {
    default: "on",
    type: "text",
    text: "",
  };
  let C, M;
  let data = "";
  let totalSize = 0;
  let newRawDate = [];
  let newValue = "";
  let lv, limit, checkUser, checkGP;
  let channelName = discordMessage.channel.name || "";
  let date = new Date();
  let seconds = date.getSeconds();
  let minutes = date.getMinutes();
  let hour = date.getHours();
  let tempA = channelid + "_" + hour + minutes + seconds;
  let hasReadPermission, gpLimitTime;
  let update, gpRemainingTime, userRemainingTime;
  let theTime = new Date();
  let demoMode = false;
  if (groupid) {
    hasReadPermission =
      discordMessage.channel
        .permissionsFor(discordMessage.guild.members.me)
        .has(PermissionFlagsBits.ReadMessageHistory) ||
      discordMessage.guild.members.me.permissions.has(
        PermissionFlagsBits.Administrator
      );
  }

  async function replacer(first, second) {
    let users = await discordClient.users.fetch(second);
    if (users && users.username) {
      return "@" + users.username;
    } else {
      return first;
    }
  }

  async function lots_of_messages_getter_HTML(channel, demo) {
    const sum_messages = [];
    let last_id;
    let totalSize = 0;

    while (true) {
      const options = {
        limit: 100,
      };
      if (last_id) {
        options.before = last_id;
      }
      const messages = await channel.messages.fetch(options);
      totalSize += messages.size ? messages.size : 0;

      for (const element of messages.values()) {
        let temp;
        if (element.type === 0 || element.type === 19) {
          const content = await replaceMentions(element.content);
          temp = {
            timestamp: element.createdTimestamp,
            contact: content,
            userName: element.author.username,
            isbot: element.author.bot,
          };
        } else {
          temp = {
            timestamp: element.createdTimestamp,
            contact: element.author.username + "\n" + element.type,
            userName: "系统信息",
            isbot: true,
          };
        }
        sum_messages.push(temp);
      }

      last_id = messages.last().id;
      if (messages.size != 100) {
        break;
      }
      if (demo) {
        if (totalSize >= 500) {
          break;
        }
      }
    }

    return {
      sum_messages: sum_messages,
      totalSize: totalSize,
    };
  }
  async function lots_of_messages_getter_TXT(channel, demo, members) {
    const sum_messages = [];
    let last_id;
    let totalSize = 0;

    while (true) {
      const options = {
        limit: 100,
      };
      if (last_id) {
        options.before = last_id;
      }
      const messages = await channel.messages.fetch(options);
      totalSize += messages.size ? messages.size : 0;

      for (const element of messages.values()) {
        let temp;
        const content = await replaceMentions(element.content, members);
        const processedEmbeds = await Promise.all(
          element.embeds && element.embeds.length
            ? element.embeds.map(async (embed) => {
                if (embed.description) {
                  return await replaceMentions(embed.description, members);
                }
                return embed.description;
              })
            : []
        );
        if (element.type === 0 || element.type === 19) {
          temp = {
            timestamp: element.createdTimestamp,
            contact: content,
            userName: element.author.username,
            isbot: element.author.bot,
            attachments:
              element.attachments && element.attachments.size
                ? element.attachments.map((attachment) => attachment.proxyURL)
                : [],
            embeds: processedEmbeds,
          };
        } else if (element.interaction && element.interaction.commandName) {
          temp = {
            timestamp: element.createdTimestamp,
            contact:
              (element.interaction.nickname ||
                element.interaction.user.username) +
              "使用" +
              element.interaction.commandName +
              "\n",
            userName: "系统信息",
            isbot: true,
            attachments:
              element.attachments && element.attachments.size
                ? element.attachments.map((attachment) => attachment.proxyURL)
                : [],
            embeds: processedEmbeds,
          };
        }
        if (temp) sum_messages.push(temp);
      }

      last_id = messages.last().id;
      if (messages.size != 100) {
        break;
      }
      if (demo) {
        if (totalSize >= 400) {
          break;
        }
      }
    }

    return {
      sum_messages: sum_messages,
      totalSize: totalSize,
    };
  }

  async function replaceMentions(content, members) {
    if (!content) return content;
    const mentionRegex = /<@(.*?)>/gi;
    const matches = content.match(mentionRegex);
    if (!matches) return content;

    const replacements = await Promise.all(
      matches.map(async (match) => {
        const userId = match.slice(2, -1); // 提取用戶 ID
        try {
          let name = "";
          // 尝试獲取所有用戶
          const member = members.find((member) => member.id === userId); // 尝试獲取用戶
          if (member) name = member.nickname || member.displayName;
          if (!member)
            name = await discordClient.users
              .fetch(userId)
              .then((user) => user.username)
              .catch(() => ""); // 尝试獲取用戶名
          return name ? `@${name}` : match; // 如果用戶存在，返回用戶名
        } catch (error) {
          return match; // 如果出现错误，返回原始的 match
        }
      })
    );

    let replacedContent = content;
    matches.forEach((match, index) => {
      replacedContent = replacedContent.replace(match, replacements[index]);
    });

    return replacedContent;
  }

  switch (true) {
    case /^help$/i.test(mainMsg[1]):
      rply.text = await this.getHelpMessage();
      rply.quotes = true;
      return rply;
    case /^html$/i.test(mainMsg[1]):
      rply.text = "功能暂停，请先使用TXT版 .discord txt";
      return rply;
      if (!channelid || !groupid) {
        rply.text = "这是频道功能，需要在频道上使用。";
        return rply;
      }
      if (!hasReadPermission) {
        rply.text =
          "骰娘没有相关权限，禁止使用这功能。\n骰娘需要有查看此频道对话历史的权限。";
        return rply;
      }
      if (userrole < 2) {
        rply.text =
          "你没有相关权限，禁止使用这功能。\n你需要有管理此频道的权限或管理员权限。";
        return rply;
      }
      if (botname !== "Discord") {
        rply.text = "这是Discord限定功能";
        return rply;
      }
      lv = await VIP.viplevelCheckUser(userid);
      limit = FUNCTION_LIMIT[lv];
      checkUser = await schema.exportUser.findOne({
        userID: userid,
      });
      checkGP = await schema.exportGp.findOne({
        groupID: userid,
      });
      gpLimitTime = lv > 0 ? oneMinuts : oneMinuts * 5;
      gpRemainingTime = checkGP
        ? theTime - checkGP.lastActiveAt - gpLimitTime
        : 1;
      userRemainingTime = checkUser
        ? theTime - checkUser.lastActiveAt - sevenDay
        : 1;
      try {
        C = await discordClient.channels.fetch(channelid);
      } catch (error) {
        if (error) {
          rply.text = `出现错误(ERROR): 
                     ${error}`;
          return rply;
        }
      }
      //<0 = DC 未过
      if (gpRemainingTime < 0) {
        rply.text = `此社区的冷却时间未过，冷却剩余 ${millisToMinutesAndSeconds(
          gpRemainingTime
        )} 时间`;
        return rply;
      }
      if (userRemainingTime < 0 && checkUser && checkUser.times >= limit) {
        rply.text = `你每星期完整下载聊天记录的上限为 ${limit} 次，
                冷却剩余 ${millisToMinutesAndSeconds(userRemainingTime)} 时间，
                现在正处于Demo模式，可以输出500条信息。`;
        demoMode = true;
      }
      /**
       * A. 检查GP 资料, USER 资料
       *
       * B. 检查 GP 5分钟DC 时间
       * PASS-> 检查
       *
       * C. USER > 检查时间
       * 超过一星期 -> 立即进行动作
       * 更新最新使用时间
       * 运行EXPORT
       *
       *
       * 检查
       */
      console.log("USE EXPORT HTML");
      if (!checkGP) {
        checkGP = await schema.exportGp.updateOne(
          {
            groupID: userid,
          },
          {
            lastActiveAt: new Date(),
          },
          opt
        );
      } else {
        checkGP.lastActiveAt = theTime;
        await checkGP.save();
      }

      discordMessage.channel.send(
        "<@" + userid + ">\n" + " 请稍等，骰娘现在开始努力处理，需要一点时间"
      );
      M = await lots_of_messages_getter_HTML(C, demoMode);
      if (M.length == 0) {
        rply.text = "未能读取信息";
        return rply;
      }
      if (!checkUser) {
        checkUser = await schema.exportUser.updateOne(
          {
            userID: userid,
          },
          {
            lastActiveAt: new Date(),
            times: 1,
          },
          opt
        );
      } else {
        if (userRemainingTime && userRemainingTime > 0) {
          update = {
            times: 1,
            lastActiveAt: new Date(),
          };
        } else {
          if (!demoMode)
            update = {
              $inc: {
                times: 1,
              },
            };
        }
        if (update)
          await schema.exportUser.updateOne(
            {
              userID: userid,
            },
            update,
            opt
          );
      }
      totalSize = M.totalSize;
      newRawDate = M.sum_messages;

      try {
        await fs.access(dir);
      } catch (error) {
        if (error && error.code === "ENOENT") await fs.mkdir(dir);
      }
      data = await fs.readFile(
        __dirname + "/../views/discordLog.html",
        "utf-8"
      );
      let key = makeid(32);
      let randomLink = makeid(7);
      let newAESDate = AES(key, key, JSON.stringify(newRawDate));
      //aesData = [];
      newValue = data
        .replace(
          /aesData\s=\s\[\]/,
          "aesData = " + JSON.stringify(newAESDate.toString("base64"))
        )
        .replace(
          /<h1>聊天记录<\/h1>/,
          "<h1>" + channelName + " 的聊天记录</h1>"
        );
      let tempB = key;
      await fs.writeFile(
        dir +
          channelid +
          "_" +
          hour +
          minutes +
          seconds +
          "_" +
          randomLink +
          ".html",
        newValue
      ); // need to be in an async function
      rply.discordExportHtml = [tempA + "_" + randomLink, tempB];
      rply.text += `已私信你 频道 ${discordMessage.channel.name} 的聊天记录
            你的channel 聊天记录 共有 ${totalSize} 项`;
      return rply;
    case /^txt$/i.test(mainMsg[1]): {
      if (
        (rply.text = checkTools.permissionErrMsg({
          flag: checkTools.flag.ChkBot,
          gid: groupid,
          role: userrole,
          name: botname,
        }))
      ) {
        return rply;
      }

      if (!hasReadPermission) {
        rply.text = `骰娘没有相关权限，禁止使用这功能。
                    骰娘需要有查看此频道对话历史的权限。`;
        return rply;
      }

      lv = await VIP.viplevelCheckUser(userid);
      let gpLv = await VIP.viplevelCheckGroup(groupid);
      lv = gpLv > lv ? gpLv : lv;
      limit = FUNCTION_LIMIT[lv];
      checkUser = await schema.exportUser
        .findOne({
          userID: userid,
        })
        .catch((error) =>
          console.error("export #372 mongoDB error: ", error.name, error.reson)
        );
      checkGP = await schema.exportGp
        .findOne({
          groupID: userid,
        })
        .catch((error) =>
          console.error("export #375 mongoDB error: ", error.name, error.reson)
        );
      gpLimitTime = lv > 0 ? oneMinuts : oneMinuts * 120;
      gpRemainingTime = checkGP
        ? theTime - checkGP.lastActiveAt - gpLimitTime
        : 1;
      userRemainingTime = checkUser
        ? theTime - checkUser.lastActiveAt - sevenDay
        : 1;
      try {
        C = await discordClient.channels.fetch(channelid);
      } catch (error) {
        if (error) {
          rply.text = "出现错误(ERROR): " + "\n" + error;
          return rply;
        }
      }
      //<0 = DC 未过
      if (gpRemainingTime < 0) {
        rply.text =
          "此社区的冷却时间未过，冷却剩余" +
          millisToMinutesAndSeconds(gpRemainingTime) +
          "时间";
        return rply;
      }
      if (userRemainingTime < 0 && checkUser && checkUser.times >= limit) {
        rply.text = `你每星期完整下载聊天记录的上限为 ${limit} 次，
                    冷却剩余 ${millisToMinutesAndSeconds(
                      userRemainingTime
                    )} 时间，
                    现在正处于Demo模式，可以输出500条信息，`;
        return rply;
      }

      if (!checkGP) {
        checkGP = await schema.exportGp
          .updateOne(
            {
              groupID: userid,
            },
            {
              lastActiveAt: new Date(),
            },
            opt
          )
          .catch((error) =>
            console.error(
              "export #408 mongoDB error: ",
              error.name,
              error.reson
            )
          );
      } else {
        checkGP.lastActiveAt = theTime;
        await checkGP.save();
      }

      console.log("USE EXPORT TXT");
      discordMessage.channel.send(
        "<@" + userid + ">\n" + " 请稍等，骰娘现在开始努力处理，需要一点时间"
      );
      const members = discordMessage.guild.members.cache.map(
        (member) => member
      );
      M = await lots_of_messages_getter_TXT(C, demoMode, members);
      if (M.length == 0) {
        rply.text = "未能读取信息";
        return rply;
      }
      if (!checkUser) {
        checkUser = await schema.exportUser
          .updateOne(
            {
              userID: userid,
            },
            {
              lastActiveAt: new Date(),
              times: 1,
            },
            opt
          )
          .catch((error) =>
            console.error(
              "export #428 mongoDB error: ",
              error.name,
              error.reson
            )
          );
      } else {
        if (userRemainingTime && userRemainingTime > 0) {
          update = {
            times: 1,
            lastActiveAt: new Date(),
          };
        } else {
          if (!demoMode)
            update = {
              $inc: {
                times: 1,
              },
            };
        }
        if (update)
          await schema.exportUser
            .updateOne(
              {
                userID: userid,
              },
              update,
              opt
            )
            .catch((error) =>
              console.error(
                "export #446 mongoDB error: ",
                error.name,
                error.reson
              )
            );
      }
      totalSize = M.totalSize;
      M = M.sum_messages;
      M.sort(function (b, a) {
        return a.timestamp - b.timestamp;
      });
      let withouttime = /-withouttime/i.test(inputStr);
      //加不加时间标记下去
      for (let index = M.length - 1; index >= 0; index--) {
        if (withouttime) {
          if (M[index].isbot) {
            data += "(🤖)";
          }
          data += M[index].userName + "	" + "\n";
          data += M[index].contact;
          data += "\n\n";
        } else {
          let time = M[index].timestamp.toString().slice(0, -3);
          const dateObj = moment
            .unix(time)
            .tz("Asia/Beijing")
            .format("YYYY-MM-DD HH:mm:ss");
          if (M[index].isbot) {
            data += "(🤖)";
          }
          //dateObj  決定有没有时间
          data += M[index].userName + "	" + dateObj + "\n";
          data += M[index].contact ? M[index].contact + "\n" : "";
          data += M[index].embeds.length ? `${M[index].embeds.join("\n")}` : "";
          data += M[index].attachments.length
            ? `${M[index].attachments.join("\n")}`
            : "";
          data += "\n";
        }
      }
      try {
        await fs.access(dir);
      } catch (error) {
        if (error && error.code === "ENOENT") await fs.mkdir(dir);
      }
      await fs.writeFile(
        dir + channelid + "_" + hour + minutes + seconds + ".txt",
        data
      ); // need to be in an async function
      rply.discordExport = channelid + "_" + hour + minutes + seconds;
      rply.text += `已私信你 频道  ${discordMessage.channel.name}  的聊天记录
                你的channel聊天记录 共有  ${totalSize}  项`;
      console.log("EXPORT TXT DONE");
      return rply;
    }
    default:
      break;
  }
};

function getAesString(data, key, iv) {
  //加密
  let keyy = CryptoJS.enc.Utf8.parse(key);
  //alert(key）;
  let ivv = CryptoJS.enc.Utf8.parse(iv);
  let encrypted = CryptoJS.AES.encrypt(data, keyy, {
    iv: ivv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString(); //返回的是base64格式的密文
}

function AES(key, iv, data) {
  let crypto = require("crypto");
  let algo = "aes-256-cbc"; // we are using 128 bit here because of the 16 byte key. use 256 is the key is 32 byte.
  let cipher = crypto.createCipheriv(
    algo,
    Buffer.from(key, "utf-8"),
    iv.slice(0, 16)
  );
  // let encrypted = cipher.update(data, 'utf-8', 'base64'); // `base64` here represents output encoding
  //encrypted += cipher.final('base64');
  let encrypted = Buffer.concat([
    cipher.update(Buffer.from(data)),
    cipher.final(),
  ]);
  return encrypted;
}

function getAES(key, iv, data) {
  //加密
  let encrypted = getAesString(data, key, iv); //密文
  //    let encrypted1 = CryptoJS.enc.Utf8.parse(encrypted);
  return encrypted;
}

function makeid(length) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
const millisToMinutesAndSeconds = (millis) => {
  millis = millis * -1;
  let minutes = Math.floor(millis / 60000);
  let seconds = ((millis % 60000) / 1000).toFixed(0);
  //ES6 interpolated literals/template literals
  //If seconds is less than 10 put a zero in front.
  return `${minutes}分钟${seconds < 10 ? "0" : ""}${seconds}秒`;
};

module.exports = {
  rollDiceCommand: rollDiceCommand,
  initialize: initialize,
  getHelpMessage: getHelpMessage,
  prefixs: prefixs,
  gameType: gameType,
  gameName: gameName,
};
