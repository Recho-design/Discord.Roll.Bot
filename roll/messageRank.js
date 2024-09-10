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
  //添加过滤频道
  {
    data: new SlashCommandBuilder()
      .setName("添加过滤频道")
      .setDescription("为当前群组添加一个过滤频道，包括其所有子区")
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
          filteredChannels = new filteredChannelsModel({ groupid, channelList: [] });
        }
  
        // 检查是否该频道已在过滤列表中
        if (filteredChannels.channelList.some((c) => c.channelid === channel.id)) {
          return interaction.reply(`频道 ${channel.name} 已经在过滤列表中。`);
        }
  
        // 使用 fetch() 获取该频道下的所有子区（子线程）
        const fetchedThreads = await channel.threads.fetch(); // 通过 fetch() 获取完整子区列表
  
        // 将父频道和所有子区的 ID 加入过滤列表
        filteredChannels.channelList.push({ channelid: channel.id }); // 添加父频道
  
        // 遍历子区并加入过滤列表
        fetchedThreads.threads.forEach((thread) => {
          if (!filteredChannels.channelList.some((c) => c.channelid === thread.id)) {
            filteredChannels.channelList.push({ channelid: thread.id }); // 添加子区
          }
        });
  
        // 保存过滤列表
        await filteredChannels.save();
  
        return interaction.reply(
          `已成功将频道 ${channel.name} 及其所有子区添加到过滤列表中。`
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
      .setDescription("从当前群组的过滤列表中删除一个频道及其所有子区")
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
  
        // 查找该频道是否在过滤列表中
        const parentIndex = filteredChannels.channelList.findIndex(
          (c) => c.channelid === channel.id
        );
  
        // 如果父频道不在过滤列表中，直接返回提示
        if (parentIndex === -1) {
          return interaction.reply(`频道 ${channel.name} 不在过滤列表中。`);
        }
  
        // 使用 fetch() 获取该频道下的所有子区（子线程）
        const fetchedThreads = await channel.threads.fetch(); // 通过 fetch() 获取完整子区列表
  
        // 从过滤列表中删除父频道
        filteredChannels.channelList.splice(parentIndex, 1);
  
        // 遍历子区并从过滤列表中删除
        fetchedThreads.threads.forEach((thread) => {
          const threadIndex = filteredChannels.channelList.findIndex(
            (c) => c.channelid === thread.id
          );
          if (threadIndex !== -1) {
            filteredChannels.channelList.splice(threadIndex, 1); // 删除子区
          }
        });
  
        // 保存过滤列表
        await filteredChannels.save();
  
        return interaction.reply(
          `已成功将频道 ${channel.name} 及其所有子区从过滤列表中删除。`
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
      .setDescription("列出当前群组的所有过滤频道及其子区"),
  
    async execute(interaction) {
      try {
        const groupid = interaction.guild.id;
  
        // 查找该群组的过滤频道列表
        const filteredChannels = await filteredChannelsModel.findOne({ groupid });
  
        // 如果没有找到记录，提示没有设置任何过滤频道
        if (!filteredChannels || filteredChannels.channelList.length === 0) {
          return interaction.reply(`当前群组没有设置任何过滤频道。`);
        }
  
        // 准备回复消息，逐个列出过滤的父频道及其子区
        let replyMessage = "当前群组的过滤频道及其子区列表：\n";
        for (const channelData of filteredChannels.channelList) {
          const channel = interaction.guild.channels.cache.get(channelData.channelid);
  
          if (channel) {
            // 使用 channel.type 来判断是否是文本频道
            if (channel.type === ChannelType.GuildText) {
              replyMessage += `父频道名称: ${channel.name}, 频道ID: ${channel.id}\n`;
  
              // 使用 fetch() 获取该父频道的所有子区（子线程）
              const fetchedThreads = await channel.threads.fetch(); // 通过 fetch() 获取完整子区列表
  
              // 遍历子区并在回复消息中列出
              fetchedThreads.threads.forEach((thread) => {
                if (filteredChannels.channelList.some((c) => c.channelid === thread.id)) {
                  replyMessage += `    子区名称: ${thread.name}, 子区ID: ${thread.id}\n`;
                }
              });
            }
          } else {
            replyMessage += `频道ID: ${channelData.channelid}（已不存在或无法访问）\n`;
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
      .addStringOption((option) =>
        option
          .setName("周期")
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
          startTime = now.clone().subtract(1, "days");
        } else if (period === "week") {
          startTime = now.clone().subtract(1, "weeks");
        } else if (period === "month") {
          startTime = now.clone().subtract(1, "months");
        }

        // 查询数据库以获取指定时间段内的发言数据
        const messageLogs = await messageLogModel.aggregate([
          {
            $match: {
              groupid,
              "messages.timestamp": { $gte: startTime.toDate(), $lte: now.toDate() },
            },
          },
          { $unwind: "$messages" }, // 展开数组
          { $match: { "messages.timestamp": { $gte: startTime.toDate(), $lte: now.toDate() } } }, // 时间范围内的消息
          { $group: { _id: "$userId", count: { $sum: 1 } } }, // 按用户ID统计发言数量
          { $sort: { count: -1 } }, // 按发言数量降序排列
        ]);

        // 如果没有数据，返回提示
        if (messageLogs.length === 0) {
          return interaction.reply("在指定的时间周期内没有任何发言记录。");
        }

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
          interaction.guild
        );

        // 创建翻页按钮
        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder().setCustomId("first_page").setLabel("第一页").setStyle(ButtonStyle.Primary).setDisabled(currentPage === 0),
          new ButtonBuilder().setCustomId("previous_page").setLabel("上一页").setStyle(ButtonStyle.Primary).setDisabled(currentPage === 0),
          new ButtonBuilder().setCustomId("next_page").setLabel("下一页").setStyle(ButtonStyle.Primary).setDisabled(currentPage === totalPages - 1),
          new ButtonBuilder().setCustomId("last_page").setLabel("最后一页").setStyle(ButtonStyle.Primary).setDisabled(currentPage === totalPages - 1)
        );

        // 发送嵌入消息和按钮
        const reply = await interaction.reply({
          embeds: [embed],
          components: [row],
        });

        // 监听按钮点击事件
        const collector = reply.createMessageComponentCollector({ time: 60000 }); // 60秒内有效

        collector.on("collect", async (i) => {
          if (i.user.id !== interaction.user.id) {
            return i.reply({ content: "你不能使用这个按钮！", ephemeral: true });
          }

          if (i.customId === "first_page") {
            currentPage = 0;
          } else if (i.customId === "previous_page" && currentPage > 0) {
            currentPage--;
          } else if (i.customId === "next_page" && currentPage < totalPages - 1) {
            currentPage++;
          } else if (i.customId === "last_page") {
            currentPage = totalPages - 1;
          }

          // 更新嵌入消息和按钮状态
          const newEmbed = generateEmbed(
            messageLogs,
            currentPage,
            itemsPerPage,
            totalPages,
            now,
            startTime,
            interaction.guild
          );
          const newRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("first_page").setLabel("第一页").setStyle(ButtonStyle.Primary).setDisabled(currentPage === 0),
            new ButtonBuilder().setCustomId("previous_page").setLabel("上一页").setStyle(ButtonStyle.Primary).setDisabled(currentPage === 0),
            new ButtonBuilder().setCustomId("next_page").setLabel("下一页").setStyle(ButtonStyle.Primary).setDisabled(currentPage === totalPages - 1),
            new ButtonBuilder().setCustomId("last_page").setLabel("最后一页").setStyle(ButtonStyle.Primary).setDisabled(currentPage === totalPages - 1)
          );

          await i.update({ embeds: [newEmbed], components: [newRow] });
        });

        collector.on("end", () => {
          // 停止收集器后禁用所有按钮
          const disabledRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("first_page").setLabel("第一页").setStyle(ButtonStyle.Primary).setDisabled(true),
            new ButtonBuilder().setCustomId("previous_page").setLabel("上一页").setStyle(ButtonStyle.Primary).setDisabled(true),
            new ButtonBuilder().setCustomId("next_page").setLabel("下一页").setStyle(ButtonStyle.Primary).setDisabled(true),
            new ButtonBuilder().setCustomId("last_page").setLabel("最后一页").setStyle(ButtonStyle.Primary).setDisabled(true)
          );
          reply.edit({ components: [disabledRow] });
        });
      } catch (error) {
        console.error("显示发言排名时发生错误:", error);
        return interaction.reply("显示发言排名时发生错误，请稍后重试。");
      }
    },
  },
];

// 生成排行榜嵌入消息的辅助函数
function generateEmbed(
  messageLogs,
  currentPage,
  itemsPerPage,
  totalPages,
  now,
  startTime,
  guild
) {
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const pageItems = messageLogs.slice(startIndex, endIndex);

  // 使用 EmbedBuilder 创建嵌入消息
  const embed = new EmbedBuilder()
    .setTitle("发言排行榜")
    .setDescription(
      `显示从 ${startTime.format("YYYY-MM-DD HH:mm")} 到 ${now.format("YYYY-MM-DD HH:mm")} 的发言数据`
    )
    .setColor("#0099ff")
    .setFooter({ text: `第 ${currentPage + 1} 页，共 ${totalPages} 页` });

  // 使用 addFields 方法，并传递一个对象数组
  const fields = pageItems.map((log, index) => {
    const member = guild.members.cache.get(log._id); // 获取用户信息
    const username = member ? member.displayName : `未知用户 (${log._id})`;
    return {
      name: `${startIndex + index + 1}. ${username}`, // 名称
      value: `发言数: ${log.count}`,                 // 值
      inline: false,                                 // 是否内联显示
    };
  });

  // 将生成的字段添加到嵌入消息中
  embed.addFields(fields);

  return embed;
}

module.exports = {
  gameType,
  gameName,
  discordCommand,
};