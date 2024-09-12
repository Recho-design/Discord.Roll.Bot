const schema = require("./schema.js");

const isFilteredCountChannel = async (groupid, channelId) => {
  // 1. 在数据库中查找该群组的过滤信息
  let filtered = await schema.filteredChannels.findOne({
    groupid,
    // 查找包含该子频道或子区的过滤文档
    $or: [
      { "categories.channels.channelid": channelId }, // 查找子频道
      { "categories.channels.threads.threadid": channelId }, // 查找子区
    ],
  });

  // 2. 如果找到了过滤信息，进一步检查
  if (filtered) {
    // 检查子频道
    const category = filtered.categories.find((cat) =>
      cat.channels.some((ch) => ch.channelid === channelId)
    );
    if (category) {
      const channel = category.channels.find((ch) => ch.channelid === channelId);
      if (channel && channel.isFiltered) {
        return true; // 该子频道已被过滤
      }
    }

    // 检查子区
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
        return true; // 该子区已被过滤
      }
    }
  }

  // 3. 如果没有找到任何过滤信息，返回 false
  return false;
};


module.exports = {
  isFilteredCountChannel,
};