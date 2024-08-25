"use strict";
//heroku labs:enable runtime-dyno-metadata -a <app name>
let chineseConv = require('chinese-conv'); //繁簡转換
const duckImage = require("@zetetic/duckduckgo-images-api")
const wiki = require('wikijs').default;
const rollbase = require('./rollbase.js');
const translate = require('@vitalets/google-translate-api').translate;
let variables = {};
const schema = require('../modules/schema.js');
const VIP = require('../modules/veryImportantPerson');
const translateChannel = require('../modules/translate');
const FUNCTION_LIMIT = [0, 2, 4, 6, 8, 9, 9, 9];
const opt = {
	upsert: true,
	runValidators: true
}
const gameName = function () {
	return '【Wiki查詢/圖片搜索】 .wiki .image .tran'
}

const gameType = function () {
	return 'funny:Wiki:hktrpg'
}
const prefixs = function () {
	return [{
		first: /^[.]wiki$|^[.]tran$|^[.]tran[.]\S+$|^[.]image$|^[.]imagee$|^[.]translate$/i,
		second: null
	}]

}

const getHelpMessage = async function () {
	return `【Wiki查詢/即时翻譯】.wiki .image .tran .tran.(目标语言)
Wiki功能		： .wiki (条目)  
EG: .wiki BATMAN  

圖片搜尋功能	： .Image (內容)  
從Google 得到相关随机圖片Link
随机YES NO: 如.image yesno 會得到yes 或NO 结果

即时翻譯功能	： .tran (內容)  
預設翻譯成正体中文 
EG: .tran BATMAN 

可翻譯成其他语言 ： .tran.(语系) (內容)
EG: .tran.ja BATMAN  .tran.日 BATMAN
常用语言代碼: 英=en, 簡=zh-cn, 德=de, 日=ja
语系代碼 https://github.com/vitalets/google-translate-api/blob/master/languages.js

注: 翻譯使用Google Translate
`
}
const initialize = function () {
	return variables;
}

const rollDiceCommand = async function ({
	inputStr,
	mainMsg,
	groupid,
	channelid,
	botname,
	userrole
}) {
	let rply = {
		default: 'on',
		type: 'text',
		text: ''
	}; //type是必需的,但可以更改
	let lang = '',
		test = '';
	//let result = {};

	switch (true) {
		case /^help$/i.test(mainMsg[1]) || !mainMsg[1]:
			rply.text = await this.getHelpMessage();
			return rply;
		case /\S+/.test(mainMsg[1]) && /[.]wiki/i.test(mainMsg[0]):
			rply.text = await wiki({
				apiUrl: 'https://zh.wikipedia.org/w/api.php'
			}).page(mainMsg[1].toLowerCase())
				.then(async page => {
					return chineseConv.tify(await page.summary())
				})
				.catch(error => {
					if (error == 'Error: No article found')
						return '没有此条目'
					else {
						return error
					}
				})
			return rply;
		case /\S+/.test(mainMsg[1]) && /^[.]tran$/i.test(mainMsg[0]):
			rply.text = await translate(inputStr.replace(mainMsg[0], ""), {
				to: 'zh-TW'
			}).then(res => {
				return res.text
			}).catch(err => {
				return err.message;
			});
			return rply;
		/**
	case /^[.]translate$/i.test(mainMsg[0]): {
		if (botname !== "Discord") {
			rply.text = '这是Discord 限定功能';
			return rply;
		}
		if (userrole < 3) {
			rply.text = '本功能只能由admin 启动开关';
			return rply;
		}
		if (/^on$/i.test(mainMsg[1])) {
			let check = await schema.translateChannel.find({
				groupid: groupid,
				switch: true
			}).countDocuments().catch(error => console.error('translate #111 mongoDB error: ', error.name, error.reson));
			let gpLv = await VIP.viplevelCheckGroup(groupid);
			let limit = FUNCTION_LIMIT[gpLv];
			if (check.length >= limit) {
				rply.text = '此群組翻譯上限为' + limit + '条频道' + '\n支援及解锁上限 https://www.patreon.com/HKTRPG\n';
				return rply
			}
			await schema.translateChannel.findOneAndUpdate({
				groupid: groupid,
				channelid: channelid
			}, {
				switch: true
			}, opt);
			translateChannel.translateSwitchOn(channelid)
			rply.text = '此频道已开启翻譯功能。'
			return rply
		}
		if (/^off$/i.test(mainMsg[1])) {
			await schema.translateChannel.findOneAndUpdate({
				groupid: groupid,
				channelid: channelid
			}, {
				switch: false
			}, opt);
			translateChannel.translateSwitchOff(channelid)
			rply.text = '此频道已关閉翻譯功能。'
			return rply
		}

		rply.text = '没有正確指令，需要输入.translate on 或.translate off 去启动/关閉翻譯功能'

		return rply
	}
	 */
		case /\S+/.test(mainMsg[1]) && /^[.]tran[.]\S+$/.test(mainMsg[0]):
			lang = /.tran.(\S+)/;
			test = mainMsg[0].match(lang)
			rply.text = await translate(inputStr.replace(mainMsg[0], ""), {
				to: test[1].replace(/簡体|簡中|簡|zh-cn/, "zh-CN").replace(/英文|英语|英/, "en").replace(/德文|德语|德/, "de").replace(/日文|日语|日/, "ja")
			}).then(res => {
				return res.text
			}).catch(err => {
				console.error('tran error:', err.message)
				return err.message + "\n常用语言代碼: 英=en, 簡=zh-cn, 德=de, 日=ja\n例子: .tran.英\n.tran.日\n.tran.de";
			});
			return rply;
		case /\S+/.test(mainMsg[1]) && /^[.]image$/i.test(mainMsg[0]):
			try {
				rply.text = await searchImage(inputStr, mainMsg, true)
				rply.type = 'image'
			} catch (error) {
				console.error('.image error #108')
				return rply;
			}
			return rply;

		case /\S+/.test(mainMsg[1]) && /^[.]imagee$/i.test(mainMsg[0]):
			//成人版
			try {
				rply.text = await searchImage(inputStr, mainMsg, false)
				rply.type = 'image'
			} catch (error) {
				console.error('.image error #119')
				return rply;
			}
			return rply;
		default:
			break;
	}
}

async function searchImage(inputStr, mainMsg, safe) {
	let keyword = inputStr.replace(mainMsg[0] + " ", "")
	//let page = Math.floor((Math.random() * (10)) * 10) + 1;
	if (mainMsg[1].match(/^yesno$/i)) {
		//随机YES NO
		let A = ['yes', 'no']
		keyword = A[rollbase.Dice(A.length) - 1] + " GIF";
	}
	return await duckImage.image_search({
		query: keyword,
		moderate: safe
	})
		.then(async images => {
			if (images[0] && images[0].image) {
				//let resultnum = Math.floor((Math.random() * (images.length)) + 0)
				let resultnum = rollbase.Dice(images.length) - 1;
				return images[resultnum].image;
			} else {
				return '没有结果'
			}

		}).catch(err => {
			console.error('duckImage error: ', err & err.respone && err.respone.statusText)
		})
}


module.exports = {
	rollDiceCommand: rollDiceCommand,
	initialize: initialize,
	getHelpMessage: getHelpMessage,
	prefixs: prefixs,
	gameType: gameType,
	gameName: gameName
};