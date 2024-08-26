"use strict";
if (!process.env.mongoURL) {
    return;
}
let save = {};
const records = require('../modules/records.js');
records.get('block', (msgs) => {
    save.save = msgs
})
const checkTools = require('../modules/check.js');
const VIP = require('../modules/veryImportantPerson');
const FUNCTION_LIMIT = [30, 200, 200, 300, 300, 300, 300, 300];
const gameName = function () {
    return '【掷骰开关功能】 .bk (add del show)'
}

const gameType = function () {
    return 'admin:Block:骰娘爱你哦💖'
}
const prefixs = function () {
    return [{
        first: /^[.]bk$/ig,
        second: null
    }]
}
const getHelpMessage = async function () {
    return `【掷骰开关功能】
这是根据关键词来开关功能,只要符合内容,
例如运势,那么只要字句中包括,就不会让Bot有反应
所以注意如果用了D, 那么1D100, .1WD 都会全部没反应.
另外不可挡b,k,bk, 只可以挡汉字,数字和英文
P.S.如果没立即生效 用.bk show 刷新一下
输入.bk add xxxxx 即可增加关键词 每次一个
输入.bk show 显示关键词
输入.bk del (编号)或all 即可删除`
}
const initialize = function () {
    return save;
}

const rollDiceCommand = async function ({
    mainMsg,
    groupid,
    userrole
}) {
    let rply = {
        default: 'on',
        type: 'text',
        text: ''
    };
    let lv;
    let limit = FUNCTION_LIMIT[0];
    switch (true) {
        case /^help$/i.test(mainMsg[1]) || !mainMsg[1]:
            rply.text = await this.getHelpMessage();
            rply.quotes = true;
            return rply;
        case /^add$/i.test(mainMsg[1]) && /^\S+$/ig.test(mainMsg[2]): {
            //增加阻挡用关鍵字
            //if (!mainMsg[2]) return;
            if (!mainMsg[2]) rply.text += '没有关鍵字. '
            if (rply.text += checkTools.permissionErrMsg({
                flag : checkTools.flag.ChkChannelManager,
                gid : groupid,
                role : userrole
            })) {
                return rply;
            }

            if (mainMsg[2].length <= 1 || /bk/ig.test(mainMsg[2])) {
                rply.text = '至少两个字，及不可以阻挡bk'
                return rply;
            }
            lv = await VIP.viplevelCheckGroup(groupid);
            limit = FUNCTION_LIMIT[lv];
            let findVIP = save.save.find(function (item) {
                return item._doc.groupid;
            });
            if (findVIP)
                if (findVIP._doc.blockfunction.length >= limit) {
                    rply.text = '关鍵字上限' + limit + '个';
                    return rply;
                }

            let temp = {
                groupid: groupid,
                blockfunction: mainMsg[2]
            }
            records.pushblockfunction('block', temp, () => {
                records.get('block', (msgs) => {
                    save.save = msgs
                })

            })
            rply.text = '新增成功: ' + mainMsg[2]

            return rply;
        }
        case /^del$/i.test(mainMsg[1]) && /^all$/i.test(mainMsg[2]):
            //刪除阻挡用关鍵字
            if (rply.text = checkTools.permissionErrMsg({
                flag : checkTools.flag.ChkChannelManager,
                gid : groupid,
                role : userrole
            })) {
                return rply;
            }

            for (let i = 0; i < save.save.length; i++) {
                if (save.save[i].groupid == groupid) {
                    let temp = save.save[i]
                    temp.blockfunction = []
                    records.set('block', temp, () => {
                        records.get('block', (msgs) => {
                            save.save = msgs
                        })
                    })
                    rply.text = '刪除所有关鍵字'
                }
            }
            return rply;
        case /^del$/i.test(mainMsg[1]) && /^\d+$/i.test(mainMsg[2]):
            //刪除阻挡用关鍵字
            if (!mainMsg[2]) rply.text += '没有关鍵字. '
            if (rply.text += checkTools.permissionErrMsg({
                flag : checkTools.flag.ChkChannelManager,
                gid : groupid,
                role : userrole
            })) {
                return rply;
            }

            for (let i = 0; i < save.save.length; i++) {
                if (save.save[i].groupid == groupid && mainMsg[2] < save.save[i].blockfunction.length && mainMsg[2] >= 0) {
                    let temp = save.save[i]
                    temp.blockfunction.splice(mainMsg[2], 1)
                    records.set('block', temp, () => {
                        records.get('block', (msgs) => {
                            save.save = msgs
                        })
                    })

                }
                rply.text = '刪除成功: ' + mainMsg[2]
            }
            return rply;

        case /^show$/i.test(mainMsg[1]): {
            records.get('block', (msgs) => {
                save.save = msgs
            })

            if (rply.text = checkTools.permissionErrMsg({
                flag : checkTools.flag.ChkChannel,
                gid : groupid
            })) {
                return rply;
            }
            
            let temp = 0;
            for (let i = 0; i < save.save.length; i++) {
                if (save.save[i].groupid == groupid) {
                    rply.text += '阻挡用关鍵字列表:'
                    for (let a = 0; a < save.save[i].blockfunction.length; a++) {
                        temp = 1
                        rply.text += ("\n") + a + ": " + save.save[i].blockfunction[a]
                    }
                }
            }
            if (temp == 0) rply.text = '没有阻挡用关鍵字. '

            //显示阻挡用关鍵字
            return rply;
        }
        default:
            break;
    }
}


module.exports = {
    rollDiceCommand: rollDiceCommand,
    initialize: initialize,
    getHelpMessage: getHelpMessage,
    prefixs: prefixs,
    gameType: gameType,
    gameName: gameName
};