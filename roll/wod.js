"use strict";
let rollbase = require('./rollbase.js');
let variables = {};

const gameName = function () {
	return '【WOD黑暗世界】.xWDy'
}

const gameType = function () {
	return 'Dice:WOD:骰娘爱你哦💖'
}
const prefixs = function () {
	return [{
		first: /^[.](\d+)(wd)(\d|)((\+|-)(\d+)|)$/i,
		second: null
	}]
}
const getHelpMessage = async function () {
	return `【WOD 黑暗世界掷骰】
[.](骰数)Wd(加骰)(+成功数) (问题)
例子 .3wd8 .15wd9+2`
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
	let matchwod = /^[.](\d+)(wd|wod)(\d|)((\+|-)(\d+)|)$/i.exec(mainMsg[0]); //判斷式  [0]3wd8+10,[1]3,[2]wd,[3]8,[4]+10,[5]+,[6]10  
	if (matchwod && matchwod[1] >= 1 && matchwod[1] <= 600)
		rply.text = await wod(mainMsg[0], mainMsg[1]);
	return rply;
}


module.exports = {
	rollDiceCommand: rollDiceCommand,
	initialize: initialize,
	getHelpMessage: getHelpMessage,
	prefixs: prefixs,
	gameType: gameType,
	gameName: gameName
};
/**
 * WOD黑暗世界
 * @param {.5WD6} triggermsg 
 * @param {文字描述} text 
 */

async function wod(triggermsg, text) {

	let returnStr = triggermsg + ' [';
	let varcou = 0;
	let varsu = 0;
	let match = /^[.](\d+)(wd|wod)(\d|)((\+|-)(\d+)|)$/i.exec(triggermsg); //判斷式  [0]3wd8+10,[1]3,[2]wd,[3]8,[4]+10,[5]+,[6]10  
	if (match[3] == "") {
		match[3] = 10
	}
	if (match[3] <= 3) {
		return '加骰最少比3高';
	}

	for (let i = 0; i < Number(match[1]); i++) {
		//varcou = Math.floor(Math.random() * 10) + 1;
		varcou = rollbase.Dice(10)
		returnStr += varcou + ', ';
		if (varcou >= match[3]) {
			i--
		}
		if (varcou >= 8) {
			varsu++;
		}
	}
	if (match[5] == '+') {
		for (let i = 0; i < Number(match[6]); i++) {
			varsu++;
		}
	}
	if (match[5] == '-') {

		for (let i = 0; i < Number(match[6]); i++) {
			varsu--;
		}
	}
	returnStr = returnStr.replace(/[,][ ]$/, '] → ' + varsu + '成功');
	if (text != null) {
		returnStr += ' ; ' + text;
	}
	return returnStr;
}