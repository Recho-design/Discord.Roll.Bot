// 统一处理消息响应
exports.analytics = require("./analytics");
const checkMongodb = require("../modules/dbWatchdog.js");
const multiServer = require("../modules/multi-server");
const schema = require("./schema.js");
const { isFilteredCountChannel } = require('./channelFilter'); 
const { handlingResponMessage, handlingSendMessage } = require('./handlers-message-response');


// 消息创建响应
async function handleMessageCreate(message) {
  try {
    // 检查数据库是否在线并重新连接
    if (!checkMongodb.isDbOnline() && checkMongodb.isDbRespawn()) {
      respawnCluster2();  // 数据库离线时重新连接
    }

    // 处理消息响应逻辑
    const result = await handlingResponMessage(message);
    await handlingMultiServerMessage(message);

    // 确保消息响应逻辑不会中断后续的消息计数逻辑
    if (result && result.text) handlingSendMessage(result);

    // 检查是否是机器人消息 或者 消息是否为空
    if (message.author.bot || !message.content.trim()) {
      return;  // 跳过机器人消息和空消息
    }

    // 检查消息是否来自服务器（guild），如果是私聊则跳过
    if (!message.guild) {
      return;
    }

    const groupid = message.guild.id;
    const userId = message.author.id;
    const channelId = message.channel.id;

    // 应用过滤功能，只影响消息计数
    const isFiltered = await isFilteredCountChannel(groupid, channelId, message);

    // 如果频道被过滤，跳过计数逻辑
    if (isFiltered) {
      return;
    }

    // 记录消息的时间戳
    await schema.messageLog.findOneAndUpdate(
      { groupid, userId, channelId },
      { $push: { messages: { timestamp: new Date() } } },
      { upsert: true, new: true }
    );


  } catch (error) {
    console.error("discord bot messageCreate error:", error);
  }
}

//多服务器
async function handlingMultiServerMessage(message) {
  if (!process.env.mongoURL) return;
  let target = multiServer.multiServerChecker(message.channel.id);
  if (!target) return;
  else {
    //	const targetsData = target;
    const sendMessage = multiServerTarget(message);
    //	for (let index = 0; index < targetsData.length; index++) {
    const targetData = target;
    let webhook = await manageWebhook({ channelId: targetData.channelid });
    let pair =
      webhook && webhook.isThread ? { threadId: targetData.channelid } : {};
    await webhook?.webhook.send({ ...sendMessage, ...pair });
    //	}
  }
  return;
}
function multiServerTarget(message) {
  const obj = {
    content: message.content,
    username: message?._member?.nickname || message?._member?.displayName,
    avatarURL: message.author.displayAvatarURL(),
  };
  return obj;
}


module.exports = {
  handleMessageCreate,
};
