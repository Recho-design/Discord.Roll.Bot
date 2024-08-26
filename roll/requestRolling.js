"use strict";
if (!process.env.DISCORD_CHANNEL_SECRET) {
    return;
}
const variables = {};
const { SlashCommandBuilder } = require('discord.js');
const gameName = function () {
    return '【要求掷骰/点击功能】'
}

const gameType = function () {
    return 'funny:request:骰娘爱你哦💖'
}
const prefixs = function () {
    //[mainMSG[0]的prefixs,mainMSG[1]的prefixs,   <---这里是一对  
    //mainMSG[0]的prefixs,mainMSG[1]的prefixs  ]  <---这里是一对
    //如前面是 /^1$/ig, 后面是/^1D100$/ig, 即 prefixs 变成 1 1D100 
    ///^(?=.*he)(?!.*da).*$/ig
    return [{
        first: /^\.re$/i,
        second: null
    }]
}
const getHelpMessage = function () {
    return `【要求掷骰/点击功能】
    Discord 专用功能
    .re 要求掷骰/点击功能
    范例 .re 1d100 哈哈, 1d3 SC成功, 1d10 SC失败, 签到`
}
const initialize = function () {
    return variables;
}

const rollDiceCommand = async function ({
    inputStr,
    mainMsg,
    groupid,
    userid,
    userrole,
    botname,
    displayname,
    channelid,
    displaynameDiscord,
    membercount
}) {
    let rply = {
        default: 'on',
        type: 'text',
        text: ''
    };
    switch (true) {
        case /^help$/i.test(mainMsg[1]) || !mainMsg[1]: {
            rply.text = this.getHelpMessage();
            rply.quotes = true;
            return rply;
        }
        case /^\.re$/i.test(mainMsg[0]):
            {
                rply.requestRolling = handleRequestRolling(inputStr)
                return rply;
            }
        default: {
            break;
        }
    }
}
function handleRequestRolling(text) {
    text = text.replace(/^\.re\s+/i, '').replace(/[\r\n]/gm, '').split(',')
    text.splice(10);
    for (let index = 0; index < text.length; index++) {
        text[index] = text[index].substring(0, 80);
    }
    text = text.filter(n => n)
    return text;
}

const discordCommand = [
    {
        data: new SlashCommandBuilder()
            .setName('re')
            .setDescription('要求掷骰/点击功能')
            .addStringOption(option => option.setName('text1').setDescription('输入第一个掷骰內容').setRequired(true))
            .addStringOption(option => option.setName('text2').setDescription('输入第二个掷骰內容'))
            .addStringOption(option => option.setName('text3').setDescription('输入第三个掷骰內容'))
            .addStringOption(option => option.setName('text4').setDescription('输入第四个掷骰內容'))
            .addStringOption(option => option.setName('text5').setDescription('输入第五个掷骰內容')),
        async execute(interaction) {
            const text1 = interaction.options.getString('text1');
            const text2 = (interaction.options.getString('text2')) ? `,${interaction.options.getString('text2')}` : '';
            const text3 = (interaction.options.getString('text3')) ? `,${interaction.options.getString('text3')}` : '';
            const text4 = (interaction.options.getString('text4')) ? `,${interaction.options.getString('text4')}` : '';
            const text5 = (interaction.options.getString('text5')) ? `,${interaction.options.getString('text5')}` : '';
            return `.re ${text1}${text2}${text3}${text4}${text5}`;
        }
    }
]
module.exports = {
    rollDiceCommand,
    initialize,
    getHelpMessage,
    prefixs,
    gameType,
    gameName,
    discordCommand
};