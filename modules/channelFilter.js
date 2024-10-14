const schema = require("./schema.js");

const isFilteredCountChannel = async (groupid, channelId, message) => {
  let filtered = await schema.filteredChannels.findOne({
    groupid,
    $or: [
      { "categories.channels.channelid": channelId },
      { "categories.channels.threads.threadid": channelId },
    ],
  });

  if (filtered) {
    const category = filtered.categories.find((cat) =>
      cat.channels.some((ch) => ch.channelid === channelId)
    );
    if (category) {
      const channel = category.channels.find((ch) => ch.channelid === channelId);
      if (channel && channel.isFiltered) {
        return true;
      }
    }

    const categoryWithThread = filtered.categories.find((cat) =>
      cat.channels.some((ch) =>
        ch.threads.some((th) => th.threadid === channelId)
      )
    );
    if (categoryWithThread) {
      const channelWithThread = categoryWithThread.channels.find((ch) =>
        ch.threads.some((th) => th.threadid === channelId)
      );
      const thread = channelWithThread.threads.find(
        (th) => th.threadid === channelId
      );
      if (thread && thread.isFiltered) {
        return true;
      }
    }
  }


  const emojiRegex = /^<:\w+:\d+>$|^[\p{Emoji}]$/u;
  const singleChineseCharRegex = /^[\u4e00-\u9fff]$/;

  if (emojiRegex.test(message.content) || singleChineseCharRegex.test(message.content)) {
    return true;
  }

  return false;
};


const filterThreadIfNeeded = async (thread) => {
  try {
    const parentChannelId = thread.parentId;
    const threadId = thread.id;
    const guildId = thread.guildId;

    const filteredData = await schema.filteredChannels.findOne({
      groupid: guildId,
      'categories.channels.channelid': parentChannelId,
      'categories.channels.isFiltered': true,
    });

    if (filteredData) {
      const category = filteredData.categories.find(cat =>
        cat.channels.some(chan => chan.channelid === parentChannelId)
      );

      if (category) {
        const channel = category.channels.find(chan => chan.channelid === parentChannelId);

        const existingThread = channel.threads.find(thr => thr.threadid === threadId);

        if (!existingThread) {
          channel.threads.push({
            threadid: threadId,
            isFiltered: true,
          });

          await filteredData.save();
          console.log(`子线程 ${threadId} 已被添加到过滤列表中。`);
        } else {
          console.log(`子线程 ${threadId} 已经存在于过滤列表中。`);
        }
      }
    }
  } catch (error) {
    console.error("filterThreadIfNeeded 发生错误: ", error);
  }
};

module.exports = {
  isFilteredCountChannel,
  filterThreadIfNeeded
};