"use strict";
const rollbase = require('./rollbase.js');
let variables = {};
const mathjs = require('mathjs')
const gameName = function () {
    return '【魔女狩猎之夜】.wn xDn+-y'
}

const gameType = function () {
    return 'Dice:witch-hunting-night:骰娘爱你哦💖'
}
const prefixs = function () {
    return [{
        first: /^.wn$/i,
        second: null
    }]
}
const getHelpMessage = async function () {
    return `【魔女狩猎之夜】
.wn xDDn -y  x骰池 n罪业值 y调整值 
.wn 3 骰3次D6,大于等于4成功 
.wn 5D4 3 骰5次D6,大于等于5成功然后 3
.wn 3DD6 2 有第二个D，会使用成功数减去失败数得出结果(可负数)
默认值>3

.wn x@Dn -yD 魔改版 x骰池 n罪业值 y调整值
魔改版 少于等于罪业值为失败
.wn 3@3 3 骰3次D6,大于3成功 
.wn 3@D3 2 有第二个D，会使用成功数减去失败数得出结果(可负数)`
}
const initialize = function () {
    return variables;
}

const rollDiceCommand = async function ({ mainMsg }) {
    let rply = {
        default: 'on',
        type: 'text',
        text: ''
    };
    switch (true) {
        case /^help$/i.test(mainMsg[1]) || !mainMsg[1]:
            rply.text = await this.getHelpMessage();
            rply.quotes = true;
            return rply;
        case /^\d/i.test(mainMsg[1]):
            if (mainMsg[1].replace(/\d|[+]|[-]|[*]|[/]|[(]|[)]|[d]|[>]|[<]|[=]|[@]/ig, '')) return;

            rply.text = await WN(mainMsg[1]).then(async (result) => {
                return await WN2(result, mainMsg[2])
            });
            return rply;
        default:
            break;
    }
}

async function WN(message) {

    //x@n(+-y)(D)
    //xD(D)n(+-y)
    //4
    //5d6
    //5d6d
    //5dd6
    //5dd
    //5d6+5-5

    //5@6
    //5@5d
    //5@5-5
    //5@6-5D

    //[0]5 [1]^@|^D [2]D [3]!+-5 [4]+-5
    let key = [];
    let tempmessage = message;
    let regex = /^(\d+)/ig
    key[0] = tempmessage.match(regex) || 1
    tempmessage = tempmessage.replace(regex, '')
    let regex1 = /^([@]|[d])/ig
    key[1] = tempmessage.match(regex1) || 'd'
    tempmessage = tempmessage.replace(regex1, '')
    let regex999 = /\d+d\d+/ig;
    while (tempmessage.match(regex999) != null) {
        // let totally = 0
        let tempMatch = tempmessage.match(regex999)
        if (tempMatch[1] > 1000 || tempMatch[1] <= 0) return
        if (tempMatch[2] < 1 || tempMatch[2] > 9000000000000000) return
        tempmessage = tempmessage.replace(/\d+d\d+/i, await Dice(tempmessage.match(/\d+d\d+/i)));
    }

    let regex2 = /d/ig
    key[2] = tempmessage.match(regex2) || ''
    tempmessage = tempmessage.replace(regex2, '')
    let regex3 = /^\d+/
    key[3] = tempmessage.match(regex3) || '4'
    tempmessage = tempmessage.replace(regex3, '')
    key[4] = tempmessage || ''
    return key
}
async function Dice(msg) {
    if (msg)
        return rollbase.BuildRollDice(msg)
    else msg
}
async function WN2(key, message) {
    //[0]5 [1]^@|^D [2]D [3]!+-5 [4]+-5
    let result = [];
    let success = 0
    let False = 0;
    let time = key[0];
    let method = key[1] || "d";
    let special = key[2] || "";
    let betterthan = 3;
    let theSins = (key[3]) || 3
    if (method == "@") {
        betterthan = (key[3]) || 4
        if (betterthan >= 6)
            return "罪业6以上扣除5点罪业，增加一点代价"
    }
    if (method && method.toString().toLowerCase() == "d") {
        if (theSins >= 6)
            return "罪业超过6点时扣除6点罪业，转化为一点代价"
        else
            if (theSins > 3)
                betterthan = (key[3])
    }
    let Adjustment = key[4] || "";

    if (time > 200) time = 200 //限制次数
    for (let i = 0; i < time; i++) {
        result[i] = rollbase.Dice(6);
        if (result[i] > betterthan)
            success++
        else
            False++
    }
    // time method special > betterthan ; 
    let temp = time + method + special + theSins + '>' + betterthan
    if (message)
        temp += '； ' + message
    temp += " \n[" + result + "]"
    let tempAdj = ''
    try {
        tempAdj = mathjs.evaluate(Adjustment)
    } catch (error) {
        tempAdj = Adjustment
    }
    if (tempAdj)
        temp += ' ' + tempAdj + '修正'
    if (special) {
        //xD(D)n(+-y)
        temp += " -> " + mathjs.evaluate(success - False + Adjustment) + "成功"
        return temp
    }

    temp += " - > " + mathjs.evaluate(success + Adjustment) + "成功"
    return temp
    //export ->
    //6@6-5D
    //6D6D>3-5 -> X 成功
}




module.exports = {
    rollDiceCommand: rollDiceCommand,
    initialize: initialize,
    getHelpMessage: getHelpMessage,
    prefixs: prefixs,
    gameType: gameType,
    gameName: gameName
};