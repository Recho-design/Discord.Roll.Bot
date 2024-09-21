// 统一处理消息响应
exports.analytics = require("./analytics");
const { client, shardid } = require('./client');
const newMessage = require("./message");

const candle = require("../modules/candleDays.js");
const { handlingRequestRolling, handlingRequestRollingCharacter } = require('./rolling');
const courtMessage = require("./logs").courtMessage || function () { };
const EXPUP = require("./level").EXPUP || function () { };

const { EmbedBuilder } = require('discord.js');

const { handlingButtonCreate } = require('./mod-button'); 

const isImageURL = require("image-url-validator").default;
const imageUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)(\s?)$/gim;

const MESSAGE_SPLITOR = /\S+/gi;

//消息回复响应
async function handlingResponMessage(message, answer = "") {
  try {
    let hasSendPermission = true;
    /**
				if (message.guild && message.guild.me) {
					hasSendPermission = (message.channel && message.channel.permissionsFor(message.guild.me)) ? message.channel.permissionsFor(message.guild.me).has(PermissionsBitField.Flags.SEND_MESSAGES) : false;
				}
				 */
// 如果 answer 不为空，将其设为 message.content
    if (answer) message.content = answer;

    // 确保 inputStr 永远是一个字符串
    let inputStr = message.content ? String(message.content) : ""; // 使用 String() 保证 inputStr 是字符串

    // 定义输入字符串
    let mainMsg = inputStr.match(MESSAGE_SPLITOR);
    let trigger = mainMsg && mainMsg[0] ? mainMsg[0].toString().toLowerCase() : "";

    if (!trigger) return await nonDice(message);

    const groupid = message.guildId ? message.guildId : "";
    if ((trigger == ".me" || trigger == ".mee") && !z_stop(mainMsg, groupid))
      return await sendMeMessage({ message, inputStr, groupid });

    let rplyVal = {};
    const checkPrivateMsg = __privateMsg({ trigger, mainMsg, inputStr });
    inputStr = checkPrivateMsg.inputStr; // 再次确保 inputStr 是字符串
    let target = await exports.analytics.findRollList(
      inputStr.match(MESSAGE_SPLITOR)
    );

    if (!target) return await nonDice(message);
    if (!hasSendPermission) return;

    const userid =
      (message.author && message.author.id) ||
      (message.user && message.user.id) ||
      "";
    const displayname =
      (message.member && message.member.user && message.member.user.tag) ||
      (message.user && message.user.username) ||
      "";
    const displaynameDiscord =
      message.member && message.member.user && message.member.user.username
        ? message.member.user.username
        : "";
    const membercount = message.guild ? message.guild.memberCount : 0;
    const titleName =
      (message.guild && message.guild.name ? message.guild.name + " " : "") +
      (message.channel && message.channel.name ? message.channel.name : "");
    const channelid = message.channelId ? message.channelId : "";
    const userrole = __checkUserRole(groupid, message);

    rplyVal = await exports.analytics.parseInput({
      inputStr: inputStr, // 再次确保 inputStr 是字符串
      groupid: groupid,
      userid: userid,
      userrole: userrole,
      botname: "Discord",
      displayname: displayname,
      channelid: channelid,
      displaynameDiscord: displaynameDiscord,
      membercount: membercount,
      discordClient: client,
      discordMessage: message,
      titleName: titleName,
    });

    if (rplyVal.requestRollingCharacter)
      await handlingRequestRollingCharacter(
        message,
        rplyVal.requestRollingCharacter
      );
    if (rplyVal.requestRolling)
      await handlingRequestRolling(
        message,
        rplyVal.requestRolling,
        displaynameDiscord
      );
    if (rplyVal.buttonCreate)
      rplyVal.buttonCreate = await handlingButtonCreate(
        message,
        rplyVal.buttonCreate
      );
    if (rplyVal.roleReactFlag) await roleReact(channelid, rplyVal);
    if (rplyVal.newRoleReactFlag) await newRoleReact(message, rplyVal);
    if (rplyVal.discordEditMessage) await handlingEditMessage(message, rplyVal);

    if (rplyVal.myName) await repeatMessage(message, rplyVal);
    if (rplyVal.myNames) await repeatMessages(message, rplyVal);

    if (rplyVal.sendNews) sendNewstoAll(rplyVal);

    if (rplyVal.sendImage) sendBufferImage(message, rplyVal, userid);
    if (rplyVal.fileLink?.length > 0) sendFiles(message, rplyVal, userid);
    if (rplyVal.respawn) respawnCluster2();
    if (!rplyVal.text && !rplyVal.LevelUp) return;
    if (process.env.mongoURL)
      try {
        const isNew = await newMessage.newUserChecker(userid, "Discord");
        if (process.env.mongoURL && rplyVal.text && isNew) {
          SendToId(userid, newMessage.firstTimeMessage(), true);
        }
      } catch (error) {
        console.error(
          `discord bot error #236`,
          error && error.name && error.message
        );
      }

    if (rplyVal.state) {
      rplyVal.text += "\n" + (await count());
      rplyVal.text +=
        "\nPing: " + Number(Date.now() - message.createdTimestamp) + "ms";
      rplyVal.text += await getAllshardIds();
    }

    if (groupid && rplyVal && rplyVal.LevelUp) {
      await SendToReplychannel({
        replyText: `<@${userid}>\n${rplyVal.LevelUp}`,
        channelid,
      });
    }

    if (rplyVal.discordExport) {
      message.author.send({
        content: "這是頻道 " + message.channel.name + " 的聊天紀錄",
        files: [
          new AttachmentBuilder("./tmp/" + rplyVal.discordExport + ".txt"),
        ],
      });
    }
    if (rplyVal.discordExportHtml) {
      if (!link || !mongo) {
        message.author.send({
          content:
            "這是頻道 " +
            message.channel.name +
            " 的聊天紀錄\n 密碼: " +
            rplyVal.discordExportHtml[1],
          files: ["./tmp/" + rplyVal.discordExportHtml[0] + ".html"],
        });
      } else {
        message.author.send(
          "這是頻道 " +
            message.channel.name +
            " 的聊天紀錄\n 密碼: " +
            rplyVal.discordExportHtml[1] +
            "\n請注意這是暫存檔案，會不定時移除，有需要請自行下載檔案。\n" +
            link +
            ":" +
            port +
            "/app/discord/" +
            rplyVal.discordExportHtml[0] +
            ".html"
        );
      }
    }
    if (!rplyVal.text) {
      return;
    } else
      return {
        privatemsg: checkPrivateMsg.privatemsg,
        channelid,
        groupid,
        userid,
        text: rplyVal.text,
        message,
        statue: rplyVal.statue,
        quotes: rplyVal.quotes,
        buttonCreate: rplyVal.buttonCreate,
      };
  } catch (error) {
    console.error(
      "handlingResponMessage Error: ",
      error,
      error && error.name,
      error && error.message,
      error && error.reson
    );
  }
}

// 消息发送
async function handlingSendMessage(input) {
  const privatemsg = input.privatemsg || 0;
  const channelid = input.channelid;
  const groupid = input.groupid;
  const userid = input.userid;
  let sendText = input.text;
  const message = input.message;
  const statue = input.statue;
  const quotes = input.quotes;
  const buttonCreate = input.buttonCreate;
  let TargetGMTempID = [];
  let TargetGMTempdiyName = [];
  let TargetGMTempdisplayname = [];
  if (privatemsg > 1 && TargetGM) {
    let groupInfo = (await privateMsgFinder(channelid)) || [];
    groupInfo.forEach((item) => {
      TargetGMTempID.push(item.userid);
      TargetGMTempdiyName.push(item.diyName);
      TargetGMTempdisplayname.push(item.displayname);
    });
  }
  switch (true) {
    case privatemsg == 1:
      // 輸入dr  (指令) 私訊自己
      //
      if (groupid) {
        await SendToReplychannel({
          replyText: "<@" + userid + "> 暗骰給自己",
          channelid,
        });
      }
      if (userid) {
        sendText = "<@" + userid + "> 的暗骰\n" + sendText;
        SendToReply({ replyText: sendText, message });
      }
      return;
    case privatemsg == 2:
      //輸入ddr(指令) 私訊GM及自己
      if (groupid) {
        let targetGMNameTemp = "";
        for (let i = 0; i < TargetGMTempID.length; i++) {
          targetGMNameTemp =
            targetGMNameTemp +
            ", " +
            (TargetGMTempdiyName[i] || "<@" + TargetGMTempID[i] + ">");
        }
        await SendToReplychannel({
          replyText:
            "<@" + userid + "> 暗骰進行中 \n目標: 自己 " + targetGMNameTemp,
          channelid,
        });
      }
      if (userid) {
        sendText = "<@" + userid + "> 的暗骰\n" + sendText;
      }
      SendToReply({ replyText: sendText, message });
      for (let i = 0; i < TargetGMTempID.length; i++) {
        if (userid != TargetGMTempID[i]) {
          SendToId(TargetGMTempID[i], sendText);
        }
      }
      return;
    case privatemsg == 3:
      //輸入dddr(指令) 私訊GM
      if (groupid) {
        let targetGMNameTemp = "";
        for (let i = 0; i < TargetGMTempID.length; i++) {
          targetGMNameTemp =
            targetGMNameTemp +
            " " +
            (TargetGMTempdiyName[i] || "<@" + TargetGMTempID[i] + ">");
        }
        await SendToReplychannel({
          replyText:
            "<@" + userid + "> 暗骰進行中 \n目標:  " + targetGMNameTemp,
          channelid,
        });
      }
      sendText = "<@" + userid + "> 的暗骰\n" + sendText;
      for (let i = 0; i < TargetGMTempID.length; i++) {
        SendToId(TargetGMTempID[i], sendText);
      }
      return;
    default:
      if (userid) {
        sendText = `<@${userid}> ${statue ? statue : ""
          }${candle.checker()}\n${sendText}`;
      }
      if (groupid) {
        await SendToReplychannel({
          replyText: sendText,
          channelid,
          quotes: quotes,
          buttonCreate: buttonCreate,
        });
      } else {
        SendToReply({
          replyText: sendText,
          message,
          quotes: quotes,
          buttonCreate: buttonCreate,
        });
      }
      return;
  }
}
//消息回复
async function __handlingReplyMessage(message, result) {
  const text = result.text;
  const sendTexts = text.toString().match(/[\s\S]{1,2000}/g);
  for (let index = 0; index < sendTexts?.length && index < 4; index++) {
    const sendText = sendTexts[index];
    try {
      if (index == 0)
        await message.reply({
          embeds: await convQuotes(sendText),
          ephemeral: false,
        });
      else
        await message.channel.send({
          embeds: await convQuotes(sendText),
          ephemeral: false,
        });
    } catch (error) {
      try {
        await message.editReply({
          embeds: await convQuotes(sendText),
          ephemeral: false,
        });
      } catch (error) {
        return;
      }
    }
  }
}

async function SendToReplychannel({
  replyText = "",
  channelid = "",
  quotes = false,
  groupid = "",
  buttonCreate = "",
 }) {
  if (!channelid) return;
  let channel;
  try {
    channel = await client.channels.fetch(channelid);
  } catch (error) {
    console.error(`Error fetching channel: ${channelid}`, error);
    return;
  }

  if (!channel && groupid) {
    try {
      let guild = await client.guilds.fetch(groupid);
      channel = await guild.channels.fetch(channelid);
    } catch (error) {
      console.error(`Error fetching guild or channel: ${groupid} / ${channelid}`, error);
      return;
    }
  }

  if (!channel) return;

  const sendText = replyText.toString().match(/[\s\S]{1,2000}/g);

  for (let i = 0; i < sendText.length; i++) {
    try {
      const messageData = quotes ? {
        embeds: await convQuotes(sendText[i]),
        components: buttonCreate[i] || null,
      } : {
        content: sendText[i],
        components: buttonCreate[i] || null,
      };

      await channel.send(messageData);

    } catch (e) {
      if (e.message !== "Missing Permissions") {
        console.error(
          "Discord Error: SendToReplychannel: ",
          e,
          replyText,
          channelid
        );
      }
    }
  }
  return;
}

async function SendToId(targetid, replyText, quotes) {
  let user = await client.users.fetch(targetid);
  if (typeof replyText === "string") {
    let sendText = replyText.toString().match(/[\s\S]{1,2000}/g);
    for (let i = 0; i < sendText.length; i++) {
      if (
        i == 0 ||
        i == 1 ||
        i == sendText.length - 1 ||
        i == sendText.length - 2
      )
        try {
          if (quotes) {
            user.send({ embeds: await convQuotes(sendText[i]) });
          } else {
            user.send(sendText[i]);
          }
        } catch (e) {
          console.error("Discord GET ERROR:  SendtoID: ", e.message, replyText);
        }
    }
  } else {
    user.send(replyText);
  }
}

async function SendToReply({ replyText = "", message, quotes = false }) {
  let sendText = replyText.toString().match(/[\s\S]{1,2000}/g);
  for (let i = 0; i < sendText.length; i++) {
    if (
      i == 0 ||
      i == 1 ||
      i == sendText.length - 1 ||
      i == sendText.length - 2
    )
      try {
        if (quotes) {
          message.author &&
            message.author.send({ embeds: await convQuotes(sendText[i]) });
        } else message.author && message.author.send(sendText[i]);
      } catch (e) {
        if (e.message !== "Cannot send messages to this user") {
          console.error(
            "Discord  GET ERROR:  SendToReply: ",
            e.message,
            "e",
            message,
            replyText
          );
        }
      }
  }

  return;
}

async function replilyMessage(message, result) {
  const displayname =
    message.member && message.member.id
      ? `<@${message.member.id}>${candle.checker()}\n`
      : "";
  if (result && result.text) {
    result.text = `${displayname}${result.text}`;
    await __handlingReplyMessage(message, result);
  } else {
    try {
      return await message.reply({
        content: `${displayname}指令沒有得到回應，請檢查內容`,
        ephemeral: true,
      });
    } catch (error) {
      return;
    }
  }
}

function __privateMsg({ trigger, mainMsg, inputStr }) {
  let privatemsg = 0;
  if (trigger.match(/^dr$/i) && mainMsg && mainMsg[1]) {
    privatemsg = 1;
    inputStr = inputStr.replace(/^dr\s+/i, "");
  }
  if (trigger.match(/^ddr$/i) && mainMsg && mainMsg[1]) {
    privatemsg = 2;
    inputStr = inputStr.replace(/^ddr\s+/i, "");
  }
  if (trigger.match(/^dddr$/i) && mainMsg && mainMsg[1]) {
    privatemsg = 3;
    inputStr = inputStr.replace(/^dddr\s+/i, "");
  }
  return { inputStr, privatemsg };
}

function __checkUserRole(groupid, message) {
  /**
   * 1 - 一般使用者
   * 2 - 頻道管理員
   * 3 - 群組管理員
   */
  try {
    if (
      groupid &&
      message.member &&
      message.member.permissions.has(PermissionsBitField.Flags.Administrator)
    )
      return 3;
    if (
      groupid &&
      message.channel &&
      message.channel.permissionsFor(message.member) &&
      message.channel
        .permissionsFor(message.member)
        .has(PermissionsBitField.Flags.ManageChannels)
    )
      return 2;
    return 1;
  } catch (error) {
    //	console.log('error', error)
    return 1;
  }
}

async function nonDice(message) {
  await courtMessage({
    result: "",
    botname: "Discord",
    inputStr: "",
    shardids: shardid,
  });
  const groupid = (message.guild && message.guild.id) || "";
  const userid =
    (message.author && message.author.id) ||
    (message.user && message.user.id) ||
    "";
  if (!groupid || !userid) return;
  const displayname =
    (message.member && message.member.user && message.member.user.tag) ||
    (message.user && message.user.username) ||
    "";
  const membercount = message.guild ? message.guild.memberCount : 0;
  try {
    let LevelUp = await EXPUP(
      groupid,
      userid,
      displayname,
      "",
      membercount,
      "",
      message
    );
    if (groupid && LevelUp && LevelUp.text) {
      await SendToReplychannel({
        replyText: `@${displayname} ${candle.checker()} ${LevelUp && LevelUp.statue ? LevelUp.statue : ""
          }\n${LevelUp.text}`,
        channelid: message.channel.id,
      });
    }
  } catch (error) {
    console.error(
      "await #534 EXPUP error",
      error && error.name,
      error && error.message,
      error && error.reson
    );
  }
  return null;
}

async function convQuotes(text = "") {
  let embeds = [];
  let embed = new EmbedBuilder()
    .setColor("#0099ff")
    //.setTitle(rplyVal.title)
    //.setURL('https://discord.js.org/')
    .setAuthor({
      name: "骰娘爱你哦💖",
      url: "https://www.kakaa.win",
      iconURL:
        "https://cdn.midjourney.com/12db0d9b-1b9d-4707-a803-e06bfe9a8e3f/0_0.png",
    });
  const imageMatch = text.match(imageUrl) || null;
  if (imageMatch && imageMatch.length) {
    for (let index = 0; index < imageMatch.length && index < 10; index++) {
      imageMatch[index] = imageMatch[index].replace(/\s?$/, "");
      let imageVaild = await isImageURL(imageMatch[index]);
      if (imageVaild) {
        let imageEmbed = new EmbedBuilder()
          .setURL("https://www.kakaa.win")
          .setImage(imageMatch[index]);
        if (imageMatch.length === 1) embed.setImage(imageMatch[index]);
        else embeds.push(imageEmbed);
        text = text.replace(imageMatch[index], "");
      }
    }
  }
  embed.setDescription(text);
  embeds.unshift(embed);
  return embeds;
}

async function sendMeMessage({ message, inputStr, groupid }) {
  inputStr = inputStr.replace(/^\.mee\s*/i, " ").replace(/^\.me\s*/i, " ");
  if (inputStr.match(/^\s+$/)) {
    inputStr = `.me 或 /mee 可以令骰娘重覆你的說話\n請輸入復述內容`;
  }
  if (groupid) {
    await SendToReplychannel({
      replyText: inputStr,
      channelid: message.channel.id,
    });
  } else {
    SendToReply({ replyText: inputStr, message });
  }
  return;
}

module.exports = {
  handlingResponMessage,
  handlingSendMessage,
  replilyMessage,
  SendToReplychannel,
  SendToReply,
  SendToId
};