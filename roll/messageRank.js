"use strict";
if (!process.env.mongoURL) {
  return;
}

// 引入所需的模块
const {
  messageLog: messageLogModel,
  filteredChannels: filteredChannelsModel,
} = require('../modules/schema.js');
const moment = require("moment-timezone");

const Discord = require("discord.js");
const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
} = Discord;

// 定义游戏名称
const gameName = function () {
  return "消息计数";
};

// 定义游戏类型
const gameType = function () {
  return "Tool:message:骰娘爱你哦💖";
};

// 定义斜杠命令
const discordCommand = [
  // 添加过滤频道命令
  {
    data: new SlashCommandBuilder()
      .setName("添加过滤频道")
      .setDescription("为当前群组添加一个过滤频道，包括其所有子频道和子区")
      .addChannelOption((option) =>
        option.setName("频道").setDescription("选择要过滤的频道").setRequired(true)
      ),
    async execute(interaction) {
      try {
        const groupid = interaction.guild.id;
        const channel = interaction.options.getChannel("频道");

        // 查找该群组的过滤频道列表
        let filteredChannels = await filteredChannelsModel.findOne({ groupid });

        // 如果没有过滤频道列表则创建一个新的
        if (!filteredChannels) {
          filteredChannels = new filteredChannelsModel({ groupid, categories: [] });
        }

        // 判断频道的类型并根据不同类型执行不同的逻辑
        switch (channel.type) {
          case ChannelType.GuildCategory: // 父频道（类别）
            // 检查父频道是否已存在
            if (filteredChannels.categories.some((cat) => cat.categoryid === channel.id)) {
              return interaction.reply(`父频道 ${channel.name} 已经在过滤列表中。`);
            }

            // 添加父频道及其所有子频道和子区
            const newCategory = { categoryid: channel.id, channels: [] };

            // 获取所有属于该父频道的子频道
            const childChannels = interaction.guild.channels.cache.filter(
              (ch) => ch.parentId === channel.id && (ch.type === ChannelType.GuildText || ch.type === ChannelType.GuildVoice)
            );

            for (const childChannel of childChannels.values()) {
              const newChannel = { channelid: childChannel.id, threads: [] };

              // 获取子频道的所有子区（子线程），确保子区的 `parentId` 与当前子频道的 `id` 匹配
              const fetchedThreads = await childChannel.threads.fetch();
              fetchedThreads.threads.forEach((thread) => {
                if (thread.parentId === childChannel.id) {
                  newChannel.threads.push({ threadid: thread.id });
                }
              });

              newCategory.channels.push(newChannel);
            }

            filteredChannels.categories.push(newCategory);
            break;

          case ChannelType.GuildText: // 子频道
          case ChannelType.GuildVoice:
            // 查找该子频道的父级（类别）
            const parentCategoryId = channel.parentId;
            const parentCategory = filteredChannels.categories.find((cat) => cat.categoryid === parentCategoryId);

            if (parentCategory) {
              if (parentCategory.channels.some((ch) => ch.channelid === channel.id)) {
                return interaction.reply(`子频道 ${channel.name} 已经在过滤列表中。`);
              }

              // 添加子频道及其所有子区，确保子区的 `parentId` 与当前子频道的 `id` 匹配
              const newChannel = { channelid: channel.id, threads: [] };

              const fetchedThreads = await channel.threads.fetch();
              fetchedThreads.threads.forEach((thread) => {
                if (thread.parentId === channel.id) {
                  newChannel.threads.push({ threadid: thread.id });
                }
              });

              parentCategory.channels.push(newChannel);
            } else {
              // 如果父级不存在，创建一个新的父级并添加子频道
              const newCategory = { categoryid: parentCategoryId, channels: [] };
              const newChannel = { channelid: channel.id, threads: [] };

              const fetchedThreads = await channel.threads.fetch();
              fetchedThreads.threads.forEach((thread) => {
                if (thread.parentId === channel.id) {
                  newChannel.threads.push({ threadid: thread.id });
                }
              });

              newCategory.channels.push(newChannel);
              filteredChannels.categories.push(newCategory);
            }
            break;

          case ChannelType.PublicThread: // 子区（子线程）
          case ChannelType.PrivateThread:
            // 查找该子区的父级子频道
            const parentChannelId = channel.parentId;
            const parentCategoryForThread = filteredChannels.categories.find((cat) =>
              cat.channels.some((ch) => ch.channelid === parentChannelId)
            );

            if (parentCategoryForThread) {
              const parentChannel = parentCategoryForThread.channels.find((ch) => ch.channelid === parentChannelId);

              if (parentChannel.threads.some((th) => th.threadid === channel.id)) {
                return interaction.reply(`子区 ${channel.name} 已经在过滤列表中。`);
              }

              // 添加子区
              parentChannel.threads.push({ threadid: channel.id });
            } else {
              return interaction.reply(`无法找到该子区的父级频道，请先添加父频道或子频道。`);
            }
            break;

          default:
            return interaction.reply(`无效的频道类型，无法添加到过滤列表。`);
        }

        // 保存过滤列表
        await filteredChannels.save();

        return interaction.reply(
          `已成功将频道 ${channel.name} 及其相关子频道/子区添加到过滤列表中。`
        );
      } catch (error) {
        console.error("添加过滤频道时发生错误:", error);
        return interaction.reply("添加过滤频道时发生错误，请稍后重试。");
      }
    },
  },

  // 删除过滤频道命令
  {
    data: new SlashCommandBuilder()
      .setName("删除过滤频道")
      .setDescription("从当前群组的过滤列表中删除一个频道及其所有子频道和子区")
      .addChannelOption((option) =>
        option.setName("频道").setDescription("选择要删除的过滤频道").setRequired(true)
      ),

    async execute(interaction) {
      try {
        const groupid = interaction.guild.id;
        const channel = interaction.options.getChannel("频道");

        // 查找该群组的过滤频道列表
        let filteredChannels = await filteredChannelsModel.findOne({ groupid });

        // 如果没有找到记录，提示没有设置任何过滤频道
        if (!filteredChannels) {
          return interaction.reply(`当前群组没有任何过滤频道。`);
        }

        // 判断频道的类型并根据不同类型执行不同的逻辑
        switch (channel.type) {
          case ChannelType.GuildCategory: // 父频道（类别）
            // 删除父频道及其所有子频道和子区
            filteredChannels.categories = filteredChannels.categories.filter(
              (c) => c.categoryid !== channel.id
            );
            break;

          case ChannelType.GuildText: // 子频道
          case ChannelType.GuildVoice:
            // 查找父级类别并删除该子频道
            const parentCategory = filteredChannels.categories.find((cat) => cat.categoryid === channel.parentId);
            if (parentCategory) {
              parentCategory.channels = parentCategory.channels.filter((ch) => ch.channelid !== channel.id);
            }
            break;

          case ChannelType.PublicThread: // 子区（子线程）
          case ChannelType.PrivateThread:
            // 查找该子区的父级子频道并删除该子区
            const parentCategoryForThread = filteredChannels.categories.find((cat) =>
              cat.channels.some((ch) => ch.channelid === channel.parentId)
            );

            if (parentCategoryForThread) {
              const parentChannel = parentCategoryForThread.channels.find((ch) => ch.channelid === channel.parentId);
              parentChannel.threads = parentChannel.threads.filter((th) => th.threadid !== channel.id);
            }
            break;

          default:
            return interaction.reply(`无效的频道类型，无法从过滤列表中删除。`);
        }

        // 保存过滤列表
        await filteredChannels.save();

        return interaction.reply(
          `已成功将频道 ${channel.name} 及其相关子频道/子区从过滤列表中删除。`
        );
      } catch (error) {
        console.error("删除过滤频道时发生错误:", error);
        return interaction.reply("删除过滤频道时发生错误，请稍后重试。");
      }
    },
  },

  // 列出过滤频道命令
  {
    data: new SlashCommandBuilder()
      .setName("列出过滤频道")
      .setDescription("列出当前群组的所有过滤频道及其子频道和子区"),

    async execute(interaction) {
      try {
        const groupid = interaction.guild.id;

        // 查找该群组的过滤频道列表
        const filteredChannels = await filteredChannelsModel.findOne({ groupid });

        // 如果没有找到记录，提示没有设置任何过滤频道
        if (!filteredChannels || filteredChannels.categories.length === 0) {
          return interaction.reply(`当前群组没有设置任何过滤频道。`);
        }

        let replyMessage = `**过滤频道列表：**\n`;

        // 遍历父频道、子频道和子区，并构建层级显示
        for (const category of filteredChannels.categories) {
          const parentChannel = interaction.guild.channels.cache.get(category.categoryid);

          if (parentChannel) {
            replyMessage += `📂 **父频道: ${parentChannel.name}**\n`;

            for (const channel of category.channels) {
              const childChannel = interaction.guild.channels.cache.get(channel.channelid);
              if (childChannel) {
                replyMessage += `  📄 子频道: ${childChannel.name}\n`;

                for (const thread of channel.threads) {
                  const threadChannel = interaction.guild.channels.cache.get(thread.threadid);
                  if (threadChannel) {
                    replyMessage += `    🧵 子区: ${threadChannel.name}\n`;
                  }
                }
              }
            }
          }
        }

        return interaction.reply(replyMessage);
      } catch (error) {
        console.error("列出过滤频道时发生错误:", error);
        return interaction.reply("列出过滤频道时发生错误，请稍后重试。");
      }
    },
  },
  // 发言排名命令
  {
    data: new SlashCommandBuilder()
      .setName("显示发言排名")
      .setDescription("查看发言排名，可以按天、按周、按月查看")
      .addStringOption(option =>
        option.setName("周期")
          .setDescription("选择统计周期")
          .setRequired(true)
          .addChoices(
            { name: "按天", value: "day" },
            { name: "按周", value: "week" },
            { name: "按月", value: "month" }
          )
      ),
    async execute(interaction) {
      try {
        const groupid = interaction.guild.id;
        const period = interaction.options.getString("周期");

        // 获取当前时间并调整为北京时间
        const now = moment().tz("Asia/Shanghai");
        let startTime;
        if (period === "day") {
          startTime = now.clone().subtract(1, 'days');
        } else if (period === "week") {
          startTime = now.clone().subtract(1, 'weeks');
        } else if (period === "month") {
          startTime = now.clone().subtract(1, 'months');
        }

        // 查询数据库以获取指定时间段内的发言数据
        const messageLogs = await messageLogModel.aggregate([
          {
            $match: {
              groupid,
              "messages.timestamp": { $gte: startTime.toDate(), $lte: now.toDate() }
            }
          },
          { $unwind: "$messages" },
          {
            $match: {
              "messages.timestamp": { $gte: startTime.toDate(), $lte: now.toDate() }
            }
          },
          { $group: { _id: "$userId", count: { $sum: 1 } } },
          { $sort: { count: -1 } }
        ]);

        // 如果没有数据，返回提示
        if (messageLogs.length === 0) {
          return interaction.reply("在指定的时间周期内没有任何发言记录。");
        }

        // 获取所有用户ID，用于批量获取用户信息
        const userIds = messageLogs.map((log) => log._id);

        // 批量获取用户信息
        const members = await interaction.guild.members.fetch({ user: userIds });

        // 延迟初次交互处理
        await interaction.deferReply();

        // 创建嵌入消息，显示第一页的排行榜
        let currentPage = 0;
        const itemsPerPage = 10; // 每页显示10条记录
        const totalPages = Math.ceil(messageLogs.length / itemsPerPage);

        const embed = generateEmbed(
          messageLogs,
          currentPage,
          itemsPerPage,
          totalPages,
          now,
          startTime,
          members
        );

        // 使用 editReply 发送初次嵌入消息
        const reply = await interaction.editReply({
          embeds: [embed],
          components: [generateActionRow(currentPage, totalPages)]
        });

        // 监听按钮点击事件
        const collector = reply.createMessageComponentCollector({ time: 60000 }); // 60秒内有效

        collector.on("collect", async (i) => {
          try {
            if (i.user.id !== interaction.user.id) {
              return i.reply({ content: "你不能使用这个按钮！", ephemeral: true });
            }

            if (i.customId === "stop") {
              // 停止按钮，直接删除所有按钮组件
              await i.update({ components: [] });
              return;
            }

            await i.deferUpdate(); // 延迟按钮交互的处理

            if (i.customId === "first_page") {
              currentPage = 0;
            } else if (i.customId === "previous_page" && currentPage > 0) {
              currentPage--;
            } else if (i.customId === "next_page" && currentPage < totalPages - 1) {
              currentPage++;
            } else if (i.customId === "last_page") {
              currentPage = totalPages - 1;
            }

            const newEmbed = generateEmbed(
              messageLogs,
              currentPage,
              itemsPerPage,
              totalPages,
              now,
              startTime,
              members
            );

            // 更新嵌入消息和按钮状态
            await i.update({
              embeds: [newEmbed],
              components: [generateActionRow(currentPage, totalPages)]
            });

          } catch (error) {
            console.error("按钮交互处理时发生错误：", error);
          }
        });

        collector.on("end", () => {
          const disabledRow = generateActionRow(currentPage, totalPages, true); // 所有按钮禁用
          reply.edit({ components: [disabledRow] }).catch((err) => console.error("按钮禁用失败:", err));
        });

      } catch (error) {
        console.error("显示发言排名时发生错误：", error);
        interaction.reply("显示发言排名时发生错误，请稍后重试。");
      }
    }
  }
]
// 生成排行榜嵌入消息的辅助函数
function generateEmbed(
  messageLogs,
  currentPage,
  itemsPerPage,
  totalPages,
  now,
  startTime,
  members
) {
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const pageItems = messageLogs.slice(startIndex, endIndex);

  // 生成 description 内容，显示排名、用户 mention 和发言数
  const description = pageItems
    .map((log, index) => {
      const member = members.get(log._id);
      const userTag = `<@${log._id}>`; // 生成用户 mention 格式
      const displayIndex = startIndex + index + 1; // 排名
      return `${displayIndex}. ${userTag} | 发言数：${log.count}`;
    })
    .join("\n");

  // 使用 EmbedBuilder 创建嵌入消息
  const embed = new EmbedBuilder()
    .setTitle("发言排行榜")
    .setDescription(description) // 将排名信息放入 description
    .setColor("#0099ff")
    .setFooter({ text: `第 ${currentPage + 1} 页，共 ${totalPages} 页` })
    .setFields({
      name: "统计时间", // 将统计时间放入 Field
      value: `从 ${startTime.format("YYYY-MM-DD HH:mm")} 到 ${now.format("YYYY-MM-DD HH:mm")}`,
    });

  return embed;
}

// 生成操作按钮的辅助函数
function generateActionRow(currentPage, totalPages, disableAll = false) {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("first_page")
      .setEmoji("⏮️") // 第一页
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(disableAll || currentPage === 0),
    new ButtonBuilder()
      .setCustomId("previous_page")
      .setEmoji("⏪") // 上一页
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(disableAll || currentPage === 0),
    new ButtonBuilder()
      .setCustomId("next_page")
      .setEmoji("⏩") // 下一页
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(disableAll || currentPage === totalPages - 1),
    new ButtonBuilder()
      .setCustomId("last_page")
      .setEmoji("⏭️") // 最后一页
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(disableAll || currentPage === totalPages - 1),
    new ButtonBuilder()
      .setCustomId("stop")
      .setEmoji("⏹️") // 停止操作
      .setStyle(ButtonStyle.Secondary) // 去掉红色底色，和其他按钮一致
      .setDisabled(disableAll) // 停止按钮不受页码影响
  );
}

module.exports = {
  gameType,
  gameName,
  discordCommand,
};