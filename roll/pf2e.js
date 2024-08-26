"use strict";
const variables = {};
const { SlashCommandBuilder } = require('discord.js');
const Fuse = require('fuse.js')
const gameName = function () {
    return '【Pf2e】.pf2 '
}

const datalink = ['../assets/pf2e/pf2_action.json', '../assets/pf2e/pf2_feat.json', '../assets/pf2e/pf2_item.json', '../assets/pf2e/pf2_monster.json', '../assets/pf2e/pf2state&spells.json']
const gameType = function () {
    return 'Dice:Pf2e:骰娘爱你哦💖'
}
const prefixs = function () {
    //[mainMSG[0]的prefixs,mainMSG[1]的prefixs,   <---这里是一对  
    //mainMSG[0]的prefixs,mainMSG[1]的prefixs  ]  <---这里是一对
    //如前面是 /^1$/ig, 后面是/^1D100$/ig, 即 prefixs 变成 1 1D100 
    ///^(?=.*he)(?!.*da).*$/ig
    return [{
        first: /^\.Pf2$/i,
        second: null
    }]
}
const getHelpMessage = function () {
    return `【Pf2e】.pf2
这是一个Pf2e的数据库，只要输入 .pf2 查找的内容，
就会显示相关资料，如果没有资料，就会显示类似字眼

资料来源自 https://www.goddessfantasy.net/bbs/index.php?topic=134913.0 #1 仙堂麻尋
    `
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

        case /^\S/.test(mainMsg[1] || ''): {
            rply.text = pf2.search(mainMsg[1]);

            return rply;
        }
        default: {
            break;
        }
    }
}


class Pf2e {
    constructor(data) {
        this.pf2eData = data;
        this.fuse = new Fuse(this.pf2eData, {
            keys: ['name'],
            includeScore: true,
            threshold: 0.3
        });
    }

    static init() {
        let data = [];
        for (let i = 0; i < datalink.length; i++) {
            let temp = require(datalink[i]);
            data = data.concat(Pf2e.objectToArray(temp.helpdoc))
        }

        return new Pf2e(data);
    }
    static objectToArray(input) {
        let data = [];
        for (let i = 0; i < Object.keys(input).length; i++) {
            data.push({
                name: Object.keys(input)[i],
                desc: Object.values(input)[i]
            });
        }
        return data;
    }
    search(name) {
        try {
            let result = this.fuse.search(name);
            let rply = '';
            if (result.length === 0) return '没有找到相关资料';
            if (result[0].item.name === name) {
                return `【${result[0].item.name}】
        ${result[0].item.desc} \n
         `;
            }
            if (result.length <= 2) {
                for (let i = 0; i < result.length; i++) {
                    rply += `【${result[i].item.name}】
${result[i].item.desc} \n
 `;
                }
            }
            else {
                rply += '找到太多相关资料，请更精确的查询\n\n';
                for (let i = 0; i < result.length; i++) {
                    rply += `${result[i].item.name}\n`;
                }
            }
            return rply;
        }
        catch (error) {
            console.error(error);
            return '发生错误';
        }
    }
}
const pf2 = Pf2e.init();

const discordCommand = []
module.exports = {
    rollDiceCommand,
    initialize,
    getHelpMessage,
    prefixs,
    gameType,
    gameName,
    discordCommand
};