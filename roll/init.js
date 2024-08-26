"use strict";
if (!process.env.mongoURL) {
    return;
}
const math = require('mathjs')
const schema = require('../modules/schema.js');
const rollDice = require('./rollbase').rollDiceCommand;
const convertRegex = function (str) {
    return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
};
const gameName = function () {
    return '【先攻表功能】 .in (remove clear reroll) .init'
}
const gameType = function () {
    return 'Tool:trpgInit:hktrpg'
}
const prefixs = function () {
    return [{
        first: /(^[.]init$)|(^[.]initn$)|(^[.]in$)/ig,
        second: null
    }]
}
const getHelpMessage = async function () {
    return `【先攻表功能】 .in (remove clear reroll) .init
这是让你快速自定义先攻表的功能
它可以储存你的掷骰方法，然后直接重新投掷，而不需要再输入。
.in (掷骰或数字) (名字)  - 样式
.in 1d20 3 (名字)  
.in 1d3 (如没有输入, 会用聊天软件中的名字)
.in 80          - 直接取代先攻值
.in -3 6*3/2.1  - 加减
------------
.in remove (名字) - 移除该角色
.in reroll - 根据算式重掷先攻表
.in clear  - 清除整个先攻表
.init      - 显示先攻表，由大到小
.initn     - 显示先攻表，由小到大
`
}
const initialize = function () {
    return;
}

const rollDiceCommand = async function ({
    inputStr,
    mainMsg,
    groupid,
    displaynameDiscord,
    botname,
    displayname,
    channelid
}) {
    let temp;
    let result;
    let objIndex;
    let name = inputStr.replace(mainMsg[0], '').replace(mainMsg[1], '').replace(/^\s+/, '') || displaynameDiscord || displayname || 'Sad';
    let rply = {
        default: 'on',
        type: 'text',
        text: ''
    };
    if ((/^help$/i.test(mainMsg[1])) && /^[.]in|[.]init$/i.test(mainMsg[0])) {
        rply.text = await this.getHelpMessage();
        rply.quotes = true;
        if (botname == "Line")
            rply.text += "\n因为Line的机制, 如掷骰时并无显示用家名字, 请到下列网址,和机器人任意说一句话,成为好友. \n https://line.me/R/ti/p/svMLqy9Mik"
        return rply;
    }
    if (!groupid && mainMsg[1]) {
        rply.text = "这是社区功能，请于社区使用。"
        return rply;
    }
    switch (true) {
        case /(^[.]in$)/i.test(mainMsg[0]) && /^remove$/i.test(mainMsg[1]):
            temp = await schema.init.updateOne({
                "groupID": channelid || groupid
            }, {
                $pull: {
                    "list": {
                        "name": {
                            $regex: new RegExp('^' + convertRegex(name) + '$', "i")
                        }
                    }
                }
            }, {
                safe: true
            })
            rply.text = (temp && temp.nModified) ? '已移除 ' + name + ' 的先攻值' : '找不到' + name + '的先攻值';
            return rply;
        case /(^[.]in$)/i.test(mainMsg[0]) && /^clear$/i.test(mainMsg[1]):
            temp = await schema.init.deleteOne({
                "groupID": channelid || groupid
            })
            rply.text = (temp) ? '已移除这社区的先攻值' : '找不到这社区的先攻表';
            return rply;
        case /(^[.]in$)/i.test(mainMsg[0]) && /^reroll$/i.test(mainMsg[1]):
            temp = await schema.init.findOne({
                "groupID": channelid || groupid
            });
            if (!temp) {
                rply.text = "找不到先攻表, 如有疑问, 可以输入.init help 观看说明"
                return rply;
            }
            for (let i = 0; i < temp.list.length; i++) {
                temp.list[i].result = await countInit(temp.list[i].formula);
            }
            try {
                await temp.save();
            } catch (error) {
                rply.text = "先攻表更新失败，\n" + error;
                return rply;
            }
            rply.text = await showInit(temp)
            return rply;
        case /(^[.]in$)/i.test(mainMsg[0]) && /^[+-/*]\d+/i.test(mainMsg[1]):
            temp = await schema.init.findOne({
                "groupID": channelid || groupid
            });
            if (!temp) {
                rply.text = "找不到先攻表, 如有疑问, 可以输入.init help 观看说明"
                return rply;
            }
            objIndex = temp.list.findIndex((obj => obj.name.toLowerCase() == name.toLowerCase()));
            if (objIndex == -1) {
                rply.text = "找不到该角色"
                return rply;
            }
            temp.list[objIndex].result = math.evaluate(temp.list[objIndex].result + mainMsg[1])
            try {
                await temp.save();
            } catch (error) {
                rply.text = "先攻表更新失败，\n" + error;
                return rply;
            }
            rply.text = temp.list[objIndex].name + '已经 ' + mainMsg[1] + ' 先攻值'
            rply.text += '\n现在的先攻值:  ' + temp.list[objIndex].result;
            return rply;
        case /(^[.]in$)/i.test(mainMsg[0]) && /^\w+/i.test(mainMsg[1]):
            result = await countInit(mainMsg[1]);
            if (!result) return;
            temp = await schema.init.findOne({
                "groupID": channelid || groupid,
            });
            if (!temp) {
                temp = new schema.init({
                    "groupID": channelid || groupid,
                    list: [{
                        name: name,
                        result: Number(result),
                        formula: mainMsg[1]
                    }]
                });
                try {
                    await temp.save();
                } catch (error) {
                    rply.text = "先攻表更新失败，\n" + error;
                    console.error('init #154 mongoDB error: ', error.name, error.reson)
                    return rply;
                }
                rply.text = name + ' 的先攻值是 ' + Number(result);
                return rply;
            }
            objIndex = temp.list.findIndex((obj => obj.name.toLowerCase() == name.toLowerCase())) >= 0 ? temp.list.findIndex((obj => obj.name.toLowerCase() == name.toLowerCase())) : temp.list.length || 0;
            temp.list.set(Number(objIndex), {
                name: (temp.list[objIndex] && temp.list[objIndex].name) || name,
                result: Number(result),
                formula: mainMsg[1]
            });
            try {
                await temp.save();
            } catch (error) {
                rply.text = "先攻表更新失败，\n" + error;
                return rply;
            }
            rply.text = temp.list[objIndex].name + ' 的先攻值是 ' + Number(result);
            return rply;

        case /(^[.]init$)/i.test(mainMsg[0]):
            temp = await schema.init.findOne({
                "groupID": channelid || groupid
            });
            if (!temp) {
                rply.text = "找不到先攻表, 如有疑问, 可以输入.init help 观看说明"
                return rply;
            }
            rply.text = await showInit(temp)
            return rply;
        case /(^[.]initn$)/i.test(mainMsg[0]):
            temp = await schema.init.findOne({
                "groupID": channelid || groupid
            });
            if (!temp) {
                rply.text = "找不到先攻表, 如有疑问, 可以输入.init help 观看说明"
                return rply;
            }
            rply.text = await showInitn(temp)
            return rply;

        default:
            break;
    }
}


async function countInit(num) {
    let result;
    let temp = await rollDice({
        mainMsg: [num]
    })
    if (temp && temp.text) {
        result = temp.text.match(/[+-]?([0-9]*[.])?[0-9]+$/)[0];
    } else if (num.match(/^[+-]?([0-9]*[.])?[0-9]+$/)) {
        result = num;
    }
    return result;
}

async function showInit(doc) {
    let result = '┌──────先攻表──────┐\n';
    doc.list.sort(function (a, b) {
        return b.result - a.result;
    });

    for (let i = 0; i < doc.list.length; i++) {
        if (i == doc.list.length - 1) {
            result += "└";
        } else
            if (i == 0) {
                result += "┌";
            } else {
                result += "├";
            }
        result += doc.list[i].name + ' - ' + doc.list[i].result + '\n';
    }
    return result;
}
async function showInitn(doc) {
    let result = '┌─────先攻表─────┐\n';
    doc.list.sort(function (a, b) {
        return a.result - b.result;
    });
    for (let i = 0; i < doc.list.length; i++) {
        if (i == doc.list.length - 1) {
            result += "└";
        } else
            if (i == 0) {
                result += "┌";
            } else {
                result += "├";
            }

        result += doc.list[i].name + ' - ' + doc.list[i].result + '\n';
    }
    return result;
}
module.exports = {
    rollDiceCommand: rollDiceCommand,
    initialize: initialize,
    getHelpMessage: getHelpMessage,
    prefixs: prefixs,
    gameType: gameType,
    gameName: gameName
};