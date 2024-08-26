"use strict";
let rollbase = require('./rollbase.js');
let variables = {};
const gameName = function () {
    return '【猫猫鬼差】.kc xDy z'
}

const gameType = function () {
    return 'Dice:yumingkueichai:骰娘爱你哦💖'
}
const prefixs = function () {
    //[mainMSG[0]的prefixs,mainMSG[1]的prefixs,   <---这里是一对  
    //mainMSG[0]的prefixs,mainMSG[1]的prefixs  ]  <---这里是一对
    //如前面是 /^1$/ig, 后面是/^1D100$/ig, 即 prefixs 变成 1 1D100 
    ///^(?=.*he)(?!.*da).*$/ig
    return [{
        first: /^[.]KC$/i,
        second: /^(|4|5)d+((\d+)|)$/i
    }, {
        first: /^[.]KC$/i,
        second: null
    }]
}
const getHelpMessage = async function () {
    return `【猫猫鬼差】
.kc xDy z 
x 投掷多少粒六面骰 留空为4, 只可输入4,5或留空 
y 修正值 1-20
z 目标值 1-20
十八啦玩法, 只要出现一个对子就成功, 达成值视为另外两颗骰子加总
若出现两对子, 则选较高者
另外, 若达成值为3, 视为戏剧性失败.`
}
const initialize = function () {
    return variables;
}

const rollDiceCommand = async function ({
    mainMsg
}) {
    let rply = {
        default: 'on',
        type: 'text',
        text: ''
    };
    switch (true) {
        case /^help$/i.test(mainMsg[1]) || !mainMsg[1]:
            rply.text = await this.getHelpMessage();
            return rply;
        case /^(|4|5)d+((\d+)|)$/i.test(mainMsg[1]):
            rply.text = await compareAllValues(mainMsg[1], "" || mainMsg[2])
            return rply;
        default:
            break;
    }
}

async function compareAllValues(triggermsg, msg) {
    let result = ""
    let rollresult = []
    let match = /^(|4|5)(d)(\d+|)$/i.exec(triggermsg);
    //判斷式  [0]4d3,[1]4,[2]d,[3]3  
    let x = match[1] || 4;
    let y = match[3] || 0
    let z = msg || 0
    if (y > 20) y = 20
    if (z > 20) z = 20
    if (z >= 1) {
        result = "目标值 ≧ " + z + " ：\n"
    }
    for (let i = 0; i < x; i++) {
        rollresult[i] = rollbase.Dice(6)
    }
    result += "[ " + rollresult + " ] → "
    //找到一样->report  剩下最大两粒
    //目标值 ≧ 12：
    //[1, 3, 5, 3, 3] → 达成值 6 [5,1] → 成功
    //[1, 3, 5, 3, 3] → 达成值 6 [5,1] → 失败
    //============================
    //[1, 3, 5, 3, 3] → 失败
    //[1, 3, 5, 3, 3] → 达成值 3 [1,2] → 戏劇性失败
    //[1, 3, 5, 3, 3] → 达成值 6 [5,1]  
    //
    let temp = rollresult
    temp.sort(function (a, b) {
        return a - b
    });

    let first = true;
    for (let i = 0; i < temp.length; i++) {
        for (let j = 0; j < i; j++) {
            //如果有对子, 输出达成值
            if (temp[j] == temp[i] && first == true) {
                first = false
                result += "达成值 "
                let tempresult = 0;
                let tempa = 0;
                let tempb = 0;
                let sum = 0;
                for (let a = temp.length; a >= 0; a--) {
                    if ((a != i && a != j && sum < 2) && temp[a] > 0) {
                        sum++
                        tempresult += temp[a]
                        if (sum == 1) {
                            tempa = temp[a]
                        }
                        if (sum == 2) {
                            tempb = temp[a]
                        }
                    }
                }
                //如果5D 11112 会变成大失败, 修正变成 达成值11
                if (x == 5 && tempa == 2 && tempb == 1 && temp[0] == 1 && temp[1] == 1 && temp[2] == 1 && temp[3] == 1 && temp[4] == 2) {
                    tempa = 1;
                    tempb = 1
                    tempresult = 2
                }
                if (y > 0) {
                    tempresult = Number(tempresult) + Number(y)
                }
                result += tempresult + " [" + tempa + "," + tempb + "]"
                if (y > 0) result += " +" + y
                if (tempa == 2 && tempb == 1) {
                    result += " → 戏剧性失败"
                } else if (z >= 1) {
                    result += " → "
                    if (z > tempresult)
                        result += "失败"
                    if (z <= tempresult)
                        result += "成功"
                }
            }
        }
    }
    if (first == true) {
        result += "失败"
    }
    if (isNaN(z)) {
        result += "；" + z
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