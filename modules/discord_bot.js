"use strict";
exports.analytics = require("./analytics");
const debugMode = !!process.env.DEBUG;
const schema = require("./schema.js");
const adminSecret = process.env.ADMIN_SECRET || "";
const candle = require("../modules/candleDays.js");
const { client, shardid } = require('./client.js');
const Discord = require("discord.js");
const {
  Collection,
  EmbedBuilder,
  PermissionsBitField,
  AttachmentBuilder,
  ChannelType,
} = Discord;

const {
  handleMessageCreate,
} = require('./handlers-message-receive');
const {
  SendToReplychannel,
  SendToReply,
  SendToId 
} = require('./handlers-message-response');

const { handlingInteractionMessage } = require('./handlers-interaction');

const checkMongodb = require("../modules/dbWatchdog.js");
const fs = require("node:fs");
const errorCount = [];
const { rollText } = require("./getRoll");
const agenda =
  require("../modules/schedule") && require("../modules/schedule").agenda;
exports.z_stop = require("../roll/z_stop");

const SIX_MONTH = 30 * 24 * 60 * 60 * 1000 * 6;

const link = process.env.WEB_LINK;
const port = process.env.PORT || 20721;
const mongo = process.env.mongoURL;
let TargetGM = process.env.mongoURL
  ? require("../roll/z_DDR_darkRollingToGM").initialize()
  : "";

const RECONNECT_INTERVAL = 1 * 1000 * 60;
const WebSocket = require("ws");
let ws;

client.on('messageCreate', async (message) => {
  try {
    await handleMessageCreate(message);
  } catch (error) {
    console.error("Error handling messageCreate:", error);
  }
});

client.on("guildCreate", async (guild) => {
  try {
    const channels = await guild.channels.fetch();
    const keys = Array.from(channels.values());
    const channel = keys.find((channel) => {
      return (
        channel.type === ChannelType.GuildText &&
        channel
          .permissionsFor(guild.members.me)
          .has(PermissionsBitField.Flags.SendMessages)
      );
    });
    if (!channel) return;
    //	let channelSend = await guild.channels.fetch(channel.id);
    const text = new EmbedBuilder()
      .setColor("#0099ff")
      //.setTitle(rplyVal.title)
      //.setURL('https://discord.js.org/')
      .setAuthor({
        name: "骰娘爱你哦💖",
        url: "https://www.kakka.win",
        iconURL:
          "https://cdn.midjourney.com/12db0d9b-1b9d-4707-a803-e06bfe9a8e3f/0_0.png",
      })
      .setDescription(newMessage.joinMessage());
    await channel.send({ embeds: [text] });
  } catch (error) {
    if (error.message === "Missing Access") return;
    if (error.message === "Missing Permissions") return;
    console.error(
      "discord bot guildCreate  #114 error",
      error && error.name,
      error && error.message,
      error && error.reson
    );
  }
});

// 交互事件处理器
client.on("interactionCreate", async (interaction) => {
  try {
    if (interaction.user && interaction.user.bot) return;  // 忽略机器人消息
    await handlingInteractionMessage(interaction);  
  } catch (error) {
    console.error(
      "discord bot interactionCreate error",
      error && error.name,
      error && error.message,
      error && error.reason
    );
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  if (!checkMongodb.isDbOnline()) return;
  if (reaction.me) return;
  const list = await schema.roleReact
    .findOne({
      messageID: reaction.message.id,
      groupid: reaction.message.guildId,
    })
    .cache(30)
    .catch((error) => {
      console.error(
        "discord_bot #802 mongoDB error: ",
        error.name,
        error.reson
      );
      checkMongodb.dbErrOccurs();
    });
  try {
    if (!list || list.length === 0) return;
    const detail = list.detail;
    const findEmoji = detail.find(function (item) {
      return (
        item.emoji === reaction.emoji.name ||
        item.emoji === `<:${reaction.emoji.name}:${reaction.emoji.id}>`
      );
    });
    if (findEmoji) {
      const member = await reaction.message.guild.members.fetch(user.id);
      member.roles.add(findEmoji.roleID.replace(/\D/g, ""));
    } else {
      reaction.users.remove(user.id);
    }
  } catch (error) {
    console.error(
      "Discord bot messageReactionAdd #249 ",
      error && error.name,
      error && error.message,
      error && error.reson
    );
  }
});

client.on("messageReactionRemove", async (reaction, user) => {
  if (!checkMongodb.isDbOnline()) return;
  if (reaction.me) return;
  const list = await schema.roleReact
    .findOne({
      messageID: reaction.message.id,
      groupid: reaction.message.guildId,
    })
    .catch((error) =>
      console.error("discord_bot #817 mongoDB error: ", error.name, error.reson)
    );
  try {
    if (!list || list.length === 0) return;
    const detail = list.detail;
    for (let index = 0; index < detail.length; index++) {
      if (
        detail[index].emoji === reaction.emoji.name ||
        detail[index].emoji === `<:${reaction.emoji.name}:${reaction.emoji.id}>`
      ) {
        const member = await reaction.message.guild.members.fetch(user.id);
        member.roles.remove(detail[index].roleID.replace(/\D/g, ""));
      }
    }
  } catch (error) {
    if (error.message === "Unknown Member") return;
    console.error(
      "Discord bot messageReactionRemove #268 ",
      error && error.name,
      error && error.message,
      error && error.reson
    );
  }
});

const sleep = async (minutes) => {
  await new Promise((resolve) => {
    return setTimeout(resolve, minutes * 1000 * 60);
  });
};

client.once("ready", async () => {
  initInteractionCommands();
  if (process.env.BROADCAST) connect();
  //	if (shardid === 0) getSchedule();
  client.user.setActivity(`${candle.checker() || "🌼"}骰娘摸鱼中`);
  console.log(`Discord: Logged in as ${client.user.tag}!`);
  let switchSetActivity = 0;
  // eslint-disable-next-line no-unused-vars
  //await sleep(6);
  const HEARTBEAT_CHECK_INTERVAL = 1000 * 60;
  const WARNING_THRESHOLD = 3;
  const CRITICAL_THRESHOLD = 5;
  const restartServer = () => {
    require("child_process").exec("sudo reboot");
  };
  let heartbeat = 0;
  console.log("Discord Heartbeat: Ready...");
  setInterval(async () => {
    const isAwake = await checkWakeUp();
    if (isAwake) {
      heartbeat = 0;
      return;
    }
    if (!isAwake || isAwake.length > 0) {
      heartbeat++;
      console.log(
        `Discord Heartbeat: ID: ${isAwake.length} - ${heartbeat}... `
      );
    }
    if (heartbeat > WARNING_THRESHOLD && adminSecret) {
      SendToId(
        adminSecret,
        `骰娘 ID: ${wakeup.join(", ")} 可能下線了 請盡快檢查.`
      );
    }
    if (heartbeat > CRITICAL_THRESHOLD) {
      if (isAwake.length > 0)
        for (let i = 0; i < isAwake.length; i++)
          client.cluster.evalOnManager(
            `this.clusters.get(${isAwake[i]}).respawn({ delay: 7000, timeout: -1 })`,
            { timeout: 10000 }
          );
    }

    if (heartbeat > 20) {
      restartServer();
    }
  }, HEARTBEAT_CHECK_INTERVAL);
  // eslint-disable-next-line no-unused-vars
  const refreshId2 = setInterval(async () => {
    switch (switchSetActivity % 2) {
      case 1:
        client.user.setActivity(`${candle.checker() || "🌼"}骰娘摸鱼中`);
        break;
      default:
        client.user.setActivity(await count2());
        break;
    }
    switchSetActivity = switchSetActivity % 2 ? 2 : 3;
  }, 180000);
});

//inviteDelete
//messageDelete


async function privateMsgFinder(channelid) {
  if (!TargetGM || !TargetGM.trpgDarkRollingfunction) return;
  let groupInfo = TargetGM.trpgDarkRollingfunction.find(
    (data) => data.groupid == channelid
  );
  if (groupInfo && groupInfo.trpgDarkRollingfunction)
    return groupInfo.trpgDarkRollingfunction;
  else return [];
}

//Set Activity 可以自定義正在玩什麼

async function count() {
  if (!client.cluster) return;
  const promises = [
    client.cluster.fetchClientValues("guilds.cache.size"),
    client.cluster.broadcastEval((c) =>
      c.guilds.cache
        .filter((guild) => guild.available)
        .reduce((acc, guild) => acc + guild.memberCount, 0)
    ),
  ];
  return Promise.all(promises)
    .then((results) => {
      const totalGuilds = results[0].reduce(
        (acc, guildCount) => acc + guildCount,
        0
      );
      const totalMembers = results[1].reduce(
        (acc, memberCount) => acc + memberCount,
        0
      );
      return `正在運行的Discord 群組數量: ${totalGuilds}\nDiscord 會員數量: ${totalMembers}`;
    })
    .catch((err) => {
      console.error(`disocrdbot #596 error ${err}`);
    });
}
async function count2() {
  if (!client.cluster) return "🌼骰娘摸鱼中";
  const promises = [
    client.cluster.fetchClientValues("guilds.cache.size"),
    client.cluster.broadcastEval((c) =>
      c.guilds.cache
        .filter((guild) => guild.available)
        .reduce((acc, guild) => acc + guild.memberCount, 0)
    ),
  ];

  return Promise.all(promises)
    .then((results) => {
      const totalGuilds = results[0].reduce(
        (acc, guildCount) => acc + guildCount,
        0
      );
      const totalMembers = results[1].reduce(
        (acc, memberCount) => acc + memberCount,
        0
      );
      return ` ${totalGuilds}群組📶-\n ${totalMembers}會員📶`;
    })
    .catch((err) => {
      console.error(`disocrdbot #617 error ${err}`);
      respawnCluster(err);
      return "🌼骰娘摸鱼中";
    });
}

// handle the error event
process.on("unhandledRejection", (error) => {
  if (error.message === "Unknown Role") return;
  if (error.message === "Cannot send messages to this user") return;
  if (error.message === "Unknown Channel") return;
  if (error.message === "Missing Access") return;
  if (error.message === "Missing Permissions") return;
  if (error.message && error.message.includes("Unknown interaction")) return;
  if (error.message && error.message.includes("INTERACTION_NOT_REPLIED"))
    return;
  if (error.message && error.message.includes("Invalid Form Body")) return;
  // Invalid Form Body
  // user_id: Value "&" is not snowflake.

  console.error("Discord Unhandled promise rejection:", error);
  process.send({
    type: "process:msg",
    data: "discorderror",
  });
});

function respawnCluster(err) {
  if (!err.toString().match(/CLUSTERING_NO_CHILD_EXISTS/i)) return;
  let number = err.toString().match(/\d+$/i);
  if (!errorCount[number]) errorCount[number] = 0;
  errorCount[number]++;
  if (errorCount[number] > 3) {
    try {
      client.cluster.evalOnManager(
        `this.clusters.get(${client.cluster.id}).respawn({ delay: 7000, timeout: -1 })`,
        { timeout: 10000 }
      );
    } catch (error) {
      console.error(
        "respawnCluster #480 error",
        error && error.name,
        error && error.message,
        error && error.reson
      );
    }
  }
}
function respawnCluster2() {
  try {
    client.cluster.evalOnManager(
      `this.clusters.get(${client.cluster.id}).respawn({ delay: 7000, timeout: -1 })`,
      { timeout: 10000 }
    );
  } catch (error) {
    console.error(
      "respawnCluster2 error",
      error && error.name,
      error && error.message,
      error && error.reson
    );
  }
}

(async function () {
  if (!agenda) return;
  let quotes = true;
  agenda.define("scheduleAtMessageDiscord", async (job) => {
    //const date = new Date(2012, 11, 21, 5, 30, 0);
    //const date = new Date(Date.now() + 5000);
    //指定時間一次
    //if (shardids !== 0) return;
    let data = job.attrs.data;
    let text = await rollText(data.replyText);
    if (/<@\S+>/g.test(text)) quotes = false;
    if (!data.imageLink && !data.roleName)
      SendToReplychannel({
        replyText: text,
        channelid: data.channelid,
        quotes: quotes,
        groupid: data.groupid,
      });
    else {
      await sendCronWebhook({
        channelid: data.channelid,
        replyText: text,
        data,
      });
    }
    try {
      await job.remove();
    } catch (e) {
      console.error(
        "Discord Error removing job from collection:scheduleAtMessageDiscord",
        e
      );
    }
  });

  agenda.define("scheduleCronMessageDiscord", async (job) => {
    //const date = new Date(2012, 11, 21, 5, 30, 0);
    //const date = new Date(Date.now() + 5000);
    //指定時間一次
    //if (shardids !== 0) return;
    let data = job.attrs.data;
    let text = await rollText(data.replyText);
    if (/<@\S+>/g.test(text)) quotes = false;
    if (!data.imageLink && !data.roleName)
      SendToReplychannel({
        replyText: text,
        channelid: data.channelid,
        quotes: quotes,
        groupid: data.groupid,
      });
    else {
      await sendCronWebhook({
        channelid: data.channelid,
        replyText: text,
        data,
      });
    }
    try {
      if (new Date(Date.now()) - data.createAt >= SIX_MONTH) {
        await job.remove();
        SendToReplychannel({
          replyText: "已運行六個月, 移除此定時訊息",
          channelid: data.channelid,
          quotes: true,
          groupid: data.groupid,
        });
      }
    } catch (e) {
      console.error(
        "Discord Error removing job from collection:scheduleCronMessageDiscord",
        e
      );
    }
  });
})();

function sendNewstoAll(rply) {
  for (let index = 0; index < rply.target.length; index++) {
    SendToId(rply.target[index].userID, rply.sendNews);
  }
}

async function repeatMessage(discord, message) {
  try {
    await discord.delete();
  } catch (error) {
    //error
  }
  let webhook = await manageWebhook(discord);
  try {
    let text = await rollText(message.myName.content);
    //threadId: discord.channelId,
    let obj = {
      content: text,
      username: message.myName.username,
      avatarURL: message.myName.avatarURL,
    };
    let pair =
      webhook && webhook.isThread ? { threadId: discord.channelId } : {};
    await webhook.webhook.send({ ...obj, ...pair });
  } catch (error) {
    await SendToReplychannel({
      replyText:
        "不能成功發送扮演發言, 請檢查你有授權骰娘 管理Webhook的權限, \n此為本功能必須權限",
      channelid: discord.channel.id,
    });
    return;
  }
}

async function repeatMessages(discord, message) {
  try {
    let webhook = await manageWebhook(discord);
    for (let index = 0; index < message.myNames.length; index++) {
      const element = message.myNames[index];
      let text = await rollText(element.content);
      let obj = {
        content: text,
        username: element.username,
        avatarURL: element.avatarURL,
      };
      let pair =
        webhook && webhook.isThread ? { threadId: discord.channelId } : {};
      await webhook.webhook.send({ ...obj, ...pair });
    }
  } catch (error) {
    await SendToReplychannel({
      replyText:
        "不能成功發送扮演發言, 請檢查你有授權骰娘 管理Webhook的權限, \n此為本功能必須權限",
      channelid: discord.channel.id,
    });
    return;
  }
}
async function manageWebhook(discord) {
  try {
    const channel = await client.channels.fetch(discord.channelId);
    const isThread = channel && channel.isThread();
    let webhooks = isThread
      ? await channel.guild.fetchWebhooks()
      : await channel.fetchWebhooks();
    let webhook = webhooks.find((v) => {
      return (
        (v.channelId == channel.parentId || v.channelId == channel.id) &&
        v.token
      );
    });

    //type Channel Follower
    //'Incoming'
    if (!webhook) {
      const hooks = isThread
        ? await client.channels.fetch(channel.parentId)
        : channel;
      await hooks.createWebhook({
        name: "KKTRPG .me Function",
        avatar:
          "https://user-images.githubusercontent.com/23254376/113255717-bd47a300-92fa-11eb-90f2-7ebd00cd372f.png",
      });
      webhooks = await channel.fetchWebhooks();
      webhook = webhooks.find((v) => {
        return (
          (v.channelId == channel.parentId || v.channelId == channel.id) &&
          v.token
        );
      });
    }
    return { webhook, isThread };
  } catch (error) {
    //	console.error(error)
    await SendToReplychannel({
      replyText:
        "不能新增Webhook.\n 請檢查你有授權骰娘 管理Webhook的權限, \n此為本功能必須權限",
      channelid: (discord.channel && discord.channel.id) || discord.channelId,
    });
    return;
  }
}

async function roleReact(channelid, message) {
  try {
    const detail = message.roleReactDetail;
    const channel = await client.channels.fetch(channelid);
    const sendMessage = await channel.send(message.roleReactMessage);
    for (let index = 0; index < detail.length; index++) {
      sendMessage.react(detail[index].emoji);
    }
    await schema.roleReact
      .findByIdAndUpdate(message.roleReactMongooseId, {
        messageID: sendMessage.id,
      })
      .catch((error) =>
        console.error(
          "discord_bot #786 mongoDB error: ",
          error.name,
          error.reson
        )
      );
  } catch (error) {
    await SendToReplychannel({
      replyText:
        "不能成功增加ReAction, 請檢查你有授權骰娘 新增ReAction的權限, \n此為本功能必須權限",
      channelid,
    });
    return;
  }
}

async function newRoleReact(channel, message) {
  try {
    const detail = message.newRoleReactDetail;
    const channels = await client.channels.fetch(channel.channelId);
    const sendMessage = await channels.messages.fetch(
      message.newRoleReactMessageId
    );
    for (let index = 0; index < detail.length; index++) {
      sendMessage.react(detail[index].emoji);
    }
  } catch (error) {
    await SendToReplychannel({
      replyText:
        "不能成功增加ReAction, 請檢查你有授權骰娘 新增ReAction的權限, \n此為本功能必須權限",
    });
    return;
  }
}
async function checkWakeUp() {
  const promises = [client.cluster.broadcastEval((c) => c.ws.status)];
  return Promise.all(promises)
    .then((results) => {
      const indexes = results[0].reduce((r, n, i) => {
        n !== 0 && r.push(i);
        return r;
      }, []);
      if (indexes.length > 0) {
        indexes.forEach((index) => {
          //checkMongodb.discordClientRespawn(client, index)
        });
        return indexes;
      } else return true;
      //if (results[0].length !== number || results[0].reduce((a, b) => a + b, 0) >= 1)
      //		return false
      //	else return true;
    })
    .catch((error) => {
      console.error(
        `disocrdbot #836 error `,
        error && error.name,
        error && error.message,
        error && error.reson
      );
      return false;
    });
}

function z_stop(mainMsg, groupid) {
  if (
    !Object.keys(exports.z_stop).length ||
    !exports.z_stop.initialize().save ||
    !mainMsg ||
    !groupid
  ) {
    return false;
  }
  let groupInfo = exports.z_stop
    .initialize()
    .save.find((e) => e.groupid == groupid);
  if (!groupInfo || !groupInfo.blockfunction) return;
  let match = groupInfo.blockfunction.find((e) =>
    mainMsg[0].toLowerCase().includes(e.toLowerCase())
  );
  if (match) {
    return true;
  } else return false;
}

const discordPresenceStatus = ["online", "idle", "invisible", "do not disturb"];
async function getAllshardIds() {
  if (!client.cluster) {
    return;
  }
  const promises = [
    [...client.cluster.ids.keys()],
    client.cluster.broadcastEval((c) => c.ws.status),
    client.cluster.broadcastEval((c) => c.ws.ping),
    client.cluster.id,
  ];
  return Promise.all(promises)
    .then((results) => {
      return `\n現在的shard ID: ${results[3]}
			所有启动中的shard ID:   ${results[0].join(", ")} 
			所有启动中的shard online:   ${results[1]
          .map((ele) => discordPresenceStatus[ele])
          .join(", ")
          .replace(/online/g, "在線")} 
			所有启动中的shard ping:   ${results[2]
          .map((ele) => ele.toFixed(0))
          .join(", ")}`;
    })
    .catch((error) => {
      console.error(
        `disocrdbot #884 error `,
        error && error.name,
        error && error.message,
        error && error.reson
      );
    });
}


function initInteractionCommands() {
  client.commands = new Collection();
  const commandFiles = fs
    .readdirSync("./roll")
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`../roll/${file}`);
    if (command && command.discordCommand) {
      pushArrayInteractionCommands(command.discordCommand);
    }
  }
}
function pushArrayInteractionCommands(arrayCommands) {
  for (const command of arrayCommands) {
    client.commands.set(command.data.name, command);
  }
}

const sendBufferImage = async (message, rplyVal, userid) => {
  await message.channel.send({
    content: `<@${userid}>\n你的Token已經送到，現在輸入 .token 為方型，.token2 為圓型 .token3 為按名字決定的隨機顏色`,
    files: [new AttachmentBuilder(rplyVal.sendImage)],
  });
  fs.unlinkSync(rplyVal.sendImage);
  return;
};
const sendFiles = async (message, rplyVal, userid) => {
  let text = rplyVal.fileText || "";
  let files = [];
  for (let index = 0; index < rplyVal.fileLink.length; index++) {
    files.push(new AttachmentBuilder(rplyVal.fileLink[index]));
  }
  try {
    await message.channel.send({
      content: `<@${userid}>\n${text}`,
      files,
    });
  } catch (error) {
    console.error;
  }
  for (let index = 0; index < rplyVal.fileLink.length; index++) {
    try {
      fs.unlinkSync(files[index]);
    } catch (error) {
      console.error(
        "discord bot error #1082",
        (error?.name, error?.message),
        files
      );
    }
  }

  return;
};

const convertRegex = function (str = "") {
  return new RegExp(str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"));
};

const connect = function () {
  ws = new WebSocket("ws://127.0.0.1:53589");
  ws.on("open", function open() {
    console.log(`connectd To core-www from discord! Shard#${shardid}`);
    ws.send(`connectd To core-www from discord! Shard#${shardid}`);
  });
  ws.on("message", async function incoming(data) {
    //if (shardid !== 0) return;
    const object = JSON.parse(data);
    if (object.botname !== "Discord") return;

    try {
      let channel = await client.channels.cache.get(object.message.target.id);
      if (channel) {
        await channel.send(object.message.text);
      }
    } catch (error) {
      console.error(
        `disocrdbot #99 error `,
        error && error.name,
        error && error.message,
        error && error.reson
      );
    }
    return;
  });
  ws.on("error", (error) => {
    console.error(
      "Discord socket error",
      error && error.name,
      error && error.message,
      error && error.reson
    );
  });
  ws.on("close", function () {
    console.error("Discord socket close");
    setTimeout(connect, RECONNECT_INTERVAL);
  });
};


async function handlingEditMessage(message, rplyVal) {
  try {
    //type = reply
    if (message.type !== 19)
      return message.reply({ content: "請Reply 你所想要修改的指定訊息" });
    if (message.channelId !== message.reference.channelId)
      return message.reply({ content: "請只修改同一個頻道的訊息" });
    const editReply = rplyVal.discordEditMessage;
    const channel = await client.channels.fetch(message.reference.channelId);
    const editMessage = await channel.messages.fetch(
      message.reference.messageId
    );
    if (editMessage.editable) return editMessage.edit({ content: editReply });
    else if (editMessage.webhookId) {
      const messageid = editMessage.id;
      const webhooks = await channel.fetchWebhooks();
      const webhook = webhooks.find((wh) => wh.id == editMessage.webhookId);
      if (!webhook)
        return message.reply({
          content: "找不到這個訊息的webhook，所以不能修改",
        });
      return await webhook.editMessage(messageid, {
        content: editReply,
      });
    } else
      return message.reply({
        content:
          "根據Discord的規則，只能修改此BOT(骰娘)和Webhook所發出的訊息，請重新檢查",
      });
  } catch (error) {
    console.error();
  }
}

//TOP.GG
const togGGToken = process.env.TOPGG;
if (togGGToken) {
  if (shardid !== getInfo().TOTAL_SHARDS - 1) return;
  const Topgg = require(`@top-gg/sdk`);
  const api = new Topgg.Api(togGGToken);
  this.interval = setInterval(async () => {
    const guilds = await client.cluster.fetchClientValues("guilds.cache.size");
    api.postStats({
      serverCount: parseInt(guilds.reduce((a, c) => a + c, 0)),
      shardCount: getInfo().TOTAL_SHARDS,
      shardId: client.cluster.id,
    });
  }, 300000);
}

async function sendCronWebhook({ channelid, replyText, data }) {
  let webhook = await manageWebhook({ channelId: channelid });
  let obj = {
    content: replyText,
    username: data.roleName,
    avatarURL: data.imageLink,
  };
  let pair = webhook && webhook.isThread ? { threadId: channelid } : {};
  await webhook.webhook.send({ ...obj, ...pair });
}


client.on("shardDisconnect", (event, shardID) => {
  console.log("shardDisconnect: ", event, shardID);
});

client.on("shardResume", (replayed, shardID) =>
  console.log(
    `Shard ID ${shardID} resumed connection and replayed ${replayed} events.`
  )
);

client.on("shardReconnecting", (id) =>
  console.log(`Shard with ID ${id} reconnected.`)
);

if (debugMode)
  process.on("warning", (e) => {
    console.warn(e.stack);
  });

/**
 *
 * const dataFields = [];
  try {
  await manager.broadcastEval((bot) => {
    return [bot.shard?.ids, bot.ws.status, bot.ws.ping, bot.guilds.cache.size];
  }).then(async (results) => {
    results.map((data) => {
    dataFields.push({
      status: data[1] === 0 ? 'online' : 'offline',
      ping: `${data[2]}ms`,
      guilds: data[3],
    });
    });
  });
  } catch (e: any) {
  console.log(e);
  }
.addFields(
  { name: 'Regular field title', value: 'Some value here' },
  { name: '\u200B', value: '\u200B' },
  { name: 'Inline field title', value: 'Some value here', inline: true },
  { name: 'Inline field title', value: 'Some value here', inline: true },
)
.addField('Inline field title', 'Some value here', true)
 */
//.setImage('https://i.imgur.com/wSTFkRM.png')
//.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');