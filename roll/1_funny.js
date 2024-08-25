"use strict";
const rollbase = require('./rollbase.js');
let variables = {};
const fs = require('fs');
const { SlashCommandBuilder } = require('discord.js');
const axiosRetry = require('axios-retry');
const chineseConv = require('chinese-conv'); //繁簡转換
const axios = require('axios');
const cheerio = require('cheerio');
const wiki = require('wikijs').default;
const identity = 'HKTRPG (https://www.hktrpg.com; admin@hktrpg.com) wiki.js';
const gameName = function () {
	return '【趣味掷骰】 排序(至少3个选项) choice/随机(至少2个选项) 运势 每日塔罗 每日笑话 每日动漫 每日一言 每日废话 每日黄历 每日毒汤 每日情话 每日灵签 每日浅草签 每日大事 每日(星座) 每日解答	立flag .me'
}

axiosRetry(axios, { retries: 3 });
const gameType = function () {
	return 'funny:funny:hktrpg'
}
const prefixs = function () {
	return [{
		first: /^排序|排序$|^随机|随机$|^choice|^每日塔罗|^时间塔罗|^大十字塔罗|立flag|运势|鸭霸兽|^每日笑话$|^每日动漫$|^每日一言$|^每日废话$|^每日黄历$|^每日毒汤$|^每日情话$|^每日灵签$|^每日浅草签$|^每日大事$|^每日解答$|^每日白羊$|^每日牡羊$|^每日金牛$|^每日双子$|^每日巨蟹$|^每日狮子$|^每日处女$|^每日天秤$|^每日天平$|^每日天蝎$|^每日天蝎$|^每日射手$|^每日人马$|^每日摩羯$|^每日山羊$|^每日水瓶$|^每日宝瓶$|^每日双鱼$/i,
		second: null
	}]
}


const getHelpMessage = async function () {
	return `【趣味掷骰】

【随机选择】： 启动语 choice 随机
(问题)(启动语)(问题)  (选项1) (选项2) 
例子 收到圣诞礼物随机数 1 2 >3  

【随机排序】：启动语 排序
(问题)(启动语)(问题) (选项1) (选项2)(选项3)
例子 交换礼物排序 A君 C君 F君 G君

【复述功能】：启动语 .re (模拟系统说话)
(启动语) (句子)(句子)(句子)
例子 .re C君杀死了NPC 村民, 受到尼什村通缉!

【占卜运气功能】：字句开头或结尾包括「运势」两字及四十字以内

【塔罗牌占卜】：「大十字塔罗 每日塔罗 时间塔罗」 等关键字可启动

【随机死亡FLAG】： 字句开头或结尾包括「立FLAG」可启动

【每日功能】
每日笑话	显示一条笑话
每日动漫	显示一条动漫金句
每日废话 	(名字)	生成一条你的废话  
每日一言	显示一条金句
每日黄历	显示今日黄历
每日毒汤	显示一条有毒的鸡汤
每日情话	显示一条情话
每日灵签	抽取一条观音签
每日浅草签	抽取一条浅草签
每日大事	显示今天历史上的大事
每日解答    显示问题的答案
每日(星座) 显示每日星座运程 如 每日白羊 每日金牛 每日巨蟹
`
}
const initialize = function () {
	return variables;
}

const rollDiceCommand = async function ({
	inputStr,
	mainMsg,
	displayname, displaynameDiscord, tgDisplayname
}) {
	let rply = {
		default: 'on',
		type: 'text',
		text: ''
	}
	//let result = {};
	//		if (trigger.match(/排序/) != null && mainMsg.length >= 3) return exports.funny.SortIt(inputStr, mainMsg);
	//choice 指令开始於此
	//	if (trigger.match(/choice|随机|选项|选1/) != null && mainMsg.length >= 3) return exports.funny.choice(inputStr, mainMsg);
	//tarot 指令
	/*
	if (trigger.match(/tarot|塔罗牌|塔罗/) != null) {
		if (trigger.match(/^单张|^每日|^daily/) != null) return exports.funny.NomalDrawTarot(mainMsg[1], mainMsg[2]); //預設抽 79 张
		if (trigger.match(/^时间|^time/) != null) return exports.funny.MultiDrawTarot(mainMsg[1], mainMsg[2], 1);
		if (trigger.match(/^大十字|^cross/) != null) return exports.funny.MultiDrawTarot(mainMsg[1], mainMsg[2], 2);
	}
	*/

	//FLAG指令开始於此
	//		if (trigger.match(/立flag|死亡flag/) != null) return exports.funny.BStyleFlagSCRIPTS();

	//鸭霸兽指令开始於此
	//		if (trigger.match(/鸭霸兽/) != null) return exports.funny.randomReply();
	//		if (trigger.match(/运势/) != null) return exports.funny.randomLuck(mainMsg); //占卜运氣		
	/*猜拳指令
	if (trigger.match(/猜拳/) != null) {
	return RockPaperScissors(inputStr, mainMsg[1]);
	}
*/

	switch (true) {
		case /^help$/i.test(mainMsg[1]):
			rply.text = await this.getHelpMessage();
			rply.buttonCreate = ['随机 跑团 温习 打游戏', '排序 A君 C君 F君 G君', '.re 签到', '.re 1d100', '今日运势', '每日塔罗', '立FLAG', '每日大事', '每日笑话', '每日废话', '每日一言', '每日黄历', '每日毒汤', '每日情话', '每日灵签', '每日浅草签', '每日动漫', '每日解答']
			return rply;
		case /^排序|排序$/i.test(mainMsg[0]) && (mainMsg.length >= 4):
			rply.text = SortIt(inputStr, mainMsg);
			return rply;
		case /^随机|^choice|随机$|choice$/i.test(mainMsg[0]) && (mainMsg.length >= 3):
			rply.text = choice(inputStr, mainMsg);
			return rply;
		case /^每日解答$/i.test(mainMsg[0]):
			rply.text = dailyAnswerChoice(inputStr);
			return rply;
		case /塔罗/i.test(mainMsg[0]):
			rply.quotes = true;
			if (mainMsg[0].match(/^每日塔罗/) != null)
				rply.text = NomalDrawTarot(mainMsg[1], mainMsg[2]); //預設抽 79 张
			if (mainMsg[0].match(/^时间塔罗/) != null)
				rply.text = MultiDrawTarot(mainMsg[1], mainMsg[2], 1);
			if (mainMsg[0].match(/^大十字塔罗/) != null)
				rply.text = MultiDrawTarot(mainMsg[1], mainMsg[2], 2);
			return rply;
		case (/立flag$|^立flag/i.test(mainMsg[0]) && mainMsg[0].toString().match(/[\s\S]{1,25}/g).length <= 1):
			rply.text = BStyleFlagSCRIPTS();
			return rply;
		case /^鸭霸兽$/i.test(mainMsg[0]):
			rply.text = randomReply();
			return rply;
		case (/运势$|^运势/i.test(mainMsg[0]) && mainMsg[0].toString().match(/[\s\S]{1,40}/g).length <= 1):
			rply.text = randomLuck(mainMsg);
			return rply;
		case /^每日笑话$/.test(mainMsg[0]): {
			rply.text = joke.getFunnyRandomResult();
			return rply;
		}
		case /^每日动漫$/.test(mainMsg[0]): {
			rply.text = acg.getFunnyRandomResult();
			return rply;
		}
		case /^每日一言$/.test(mainMsg[0]): {
			rply.text = slogan.getFunnyRandomResult();
			return rply;
		}
		case /^每日黄历$/.test(mainMsg[0]): {
			rply.text = await dailyAlmanac.getAlmanac();
			return rply;
		}
		case /^每日毒汤$/.test(mainMsg[0]): {
			rply.text = blackjoke.getFunnyRandomResult();
			return rply;
		}
		case /^每日情话$/.test(mainMsg[0]): {
			rply.text = mlove.getFunnyRandomResult();
			return rply;
		}
		case /^每日灵签$/.test(mainMsg[0]): {
			rply.text = watchMusic.getRandomWatchMusic100()
			return rply;
		}
		case /^每日浅草签$/.test(mainMsg[0]): {
			rply.text = asakusa100.getRandomAsakusa100();
			return rply;
		}
		case /^每日废话$/.test(mainMsg[0]): {
			const name = mainMsg[1] || displaynameDiscord || tgDisplayname || displayname || '你';
			const req = DailyFuckUp.generateArticles(name);
			rply.text = req;
			return rply;
		}
		case /^每日大事$/.test(mainMsg[0]): {
			const date = new Date();
			const day = date.getDate();
			const month = date.getMonth() + 1;
			let respond = `${month}月${day}日\n\n`;
			rply.text = await wiki({
				headers: { 'User-Agent': identity },
				apiUrl: 'https://zh.wikipedia.org/w/api.php',
				setpagelanguage: "zh-hant"
			}).page(`${month}月${day}日`)
				.then(async page => {
					let temp = await page.content();
					let answerFestival = temp.find(v => {
						return v && v.title.match(/(节日)|(节日)|(习俗)|(假日)|(节假)/)
					})
					respond += `${(answerFestival && answerFestival.title) ? `${answerFestival.title}\n` : ''}${(answerFestival && answerFestival.content) ? `${answerFestival.content}\n` : ''}\n`
					let answerBig = temp.find(v => {
						return v && v.title.match(/(大事)/)
					})
					if (answerBig && answerBig.items) answerBig = answerBig.items;

					for (let index = 0; index < answerBig?.length; index++) {

						respond += `${answerBig[index].title}\n${answerBig[index].content}\n\n`
					}
					return chineseConv.tify(respond)
				})
				.catch(error => {
					if (error == 'Error: No article found')
						return '没有此条目'
					else {
						console.error('每日大事error', error)
						console.error('每日大事 this.page', this.page)

						return '条目出错';
					}
				})
			return rply;
		}
		//白羊座、金牛座、双子座、巨蟹座、狮子座、处女座、天秤座、天蝎座、射手座、摩羯座、水瓶座、双鱼
		case (/^每日白羊$/.test(mainMsg[0]) || /^每日牡羊$/.test(mainMsg[0])): {
			rply.text = await dailyAstro.getAstro('牡羊')
			if (!rply.text) rply.text = await axiosDaily('https://ovooa.com/API/xz/api.php?msg=白羊&type=json')
			return rply;
		}

		case /^每日金牛$/.test(mainMsg[0]): {
			rply.text = await dailyAstro.getAstro('金牛')
			if (!rply.text) rply.text = await axiosDaily('https://ovooa.com/API/xz/api.php?msg=金牛&type=json')
			return rply;
		}

		case /^每日双子$/.test(mainMsg[0]): {
			rply.text = await dailyAstro.getAstro('双子')
			if (!rply.text) rply.text = await axiosDaily('https://ovooa.com/API/xz/api.php?msg=双子&type=json')
			return rply;
		}

		case /^每日巨蟹$/.test(mainMsg[0]): {
			rply.text = await dailyAstro.getAstro('巨蟹')
			if (!rply.text) rply.text = await axiosDaily('https://ovooa.com/API/xz/api.php?msg=巨蟹&type=json')
			return rply;
		}

		case /^每日狮子$/.test(mainMsg[0]): {
			rply.text = await dailyAstro.getAstro('狮子')
			if (!rply.text) rply.text = await axiosDaily('https://ovooa.com/API/xz/api.php?msg=狮子&type=json')
			return rply;
		}

		case /^每日处女$/.test(mainMsg[0]): {
			rply.text = await dailyAstro.getAstro('处女')
			if (!rply.text) rply.text = await axiosDaily('https://ovooa.com/API/xz/api.php?msg=处女&type=json')
			return rply;
		}

		case (/^每日天秤$/.test(mainMsg[0]) || /^每日天平$/.test(mainMsg[0])): {
			rply.text = await dailyAstro.getAstro('天秤')
			if (!rply.text) rply.text = await axiosDaily('https://ovooa.com/API/xz/api.php?msg=天秤&type=json')
			return rply;
		}

		case /^每日天蝎$/.test(mainMsg[0]) || /^每日天蝎$/.test(mainMsg[0]): {
			rply.text = await dailyAstro.getAstro('天蝎')
			if (!rply.text) rply.text = await axiosDaily('https://ovooa.com/API/xz/api.php?msg=天蝎&type=json')
			return rply;
		}

		case (/^每日射手$/.test(mainMsg[0]) || /^每日人马$/.test(mainMsg[0])): {
			rply.text = await dailyAstro.getAstro('射手')
			if (!rply.text) rply.text = await axiosDaily('https://ovooa.com/API/xz/api.php?msg=射手&type=json')
			return rply;
		}

		case (/^每日摩羯$/.test(mainMsg[0]) || /^每日山羊$/.test(mainMsg[0])): {
			rply.text = await dailyAstro.getAstro('摩羯')
			if (!rply.text) rply.text = await axiosDaily('https://ovooa.com/API/xz/api.php?msg=摩羯&type=json')
			return rply;
		}

		case (/^每日水瓶$/.test(mainMsg[0]) || /^每日宝瓶$/.test(mainMsg[0])): {
			rply.text = await dailyAstro.getAstro('水瓶')
			if (!rply.text) rply.text = await axiosDaily('https://ovooa.com/API/xz/api.php?msg=水瓶&type=json')
			return rply;
		}
		case /^每日双鱼$/.test(mainMsg[0]): {
			rply.text = await dailyAstro.getAstro('双鱼')
			if (!rply.text) rply.text = await axiosDaily('https://ovooa.com/API/xz/api.php?msg=双鱼&type=json')
			return rply;
		}
		default:
			break;
	}
}

class FunnyRandom {
	constructor(txt) {
		this.random = FunnyRandom.convertArray(txt);
	}
	static convertArray(txt) {
		const data = fs.readFileSync(txt, 'utf8').toString();
		return data.split('\n');
	}
	getFunnyRandomResult() {
		try {
			return this.random[rollbase.Dice(this.random.length) - 1];
		} catch (error) {
			console.error('Funny #330', error);
			return '出现问题，请以后再试';
		}
	}
}

/**
 * .ME
 */
function me(inputStr) {
	return inputStr.replace(/^[.]re/i, '');
}

const twelveAstro = [
	'牡羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手', '摩羯', '水瓶', '双鱼'
]

class TwelveAstro {
	constructor() {
		this.Astro = [];
	}
	async getAstro(name) {
		try {
			let astroCode = twelveAstro.indexOf(name);
			if (!this.Astro[astroCode] || this.Astro[astroCode].date !== this.getDate()) {
				await this.updateAstro(astroCode);
			}
			if (this.Astro[astroCode]) {
				return this.returnStr(this.Astro[astroCode], name);
			} else return;
		} catch (error) {
			return;
		}
	}

	returnStr(astro, name) {
		return `今日${name}座运程
你的幸运数字：${astro.TODAY_LUCKY_NUMBER}	
你的幸运星座：${astro.TODAY_LUCKY_ASTRO}
短语：${astro.TODAY_WORD}${astro.TODAY_CONTENT}
	`;
	}


	async updateAstro(code) {
		let date = this.getDate();
		let res = await axios.get(`https://astro.click108.com.tw/daily_${code}.php?iAcDay=${date}&iAstro=${code}`);
		const $ = cheerio.load(res.data)
		this.Astro[code] = new Astro($, date);
	}
	getDate() {
		let year = new Date().getFullYear();
		let month = ('0' + (new Date().getMonth() + 1)).slice(-2);
		let day = ('0' + new Date().getDate()).slice(-2);
		return `${year}-${month}-${day}`;
	}

}

class Astro {
	constructor($, date) {
		//TODAY_CONTENT
		this.TODAY_CONTENT = $('.TODAY_CONTENT').text().replaceAll('                ', '');
		this.TODAY_WORD = $('.TODAY_WORD').text();
		this.TODAY_LUCKY_NUMBER = this.matchImgUrl($, 0)
		this.TODAY_LUCKY_COLOR = this.matchImgUrl($, 1)
		this.TODAY_LUCKY_DIRECTION = this.matchImgUrl($, 2)
		this.TODAY_LUCKY_TIME = this.matchImgUrl($, 3)
		this.TODAY_LUCKY_ASTRO = this.matchImgUrl($, 4)
		this.date = date;
	}
	matchImgUrl($, num) {
		const LUCKY = $('.TODAY_LUCKY .LUCKY').text().match(/\S+/g);
		return LUCKY[num];

	}
}


class DailyAlmanac {
	constructor() {
		this.Almanac = {};
	}
	async getAlmanac() {
		try {
			if (!this.Almanac || this.Almanac.date !== this.getDate()) {
				await this.updateAlmanac();
			}
			if (this.Almanac) {
				return this.returnStr(this.Almanac);
			} else return;
		} catch (error) {
			console.error(error)
			return;
		}
	}

	returnStr(Almanac) {
		return `今日黄历 - ${Almanac.date}
${Almanac.content}
	`;
	}


	async updateAlmanac() {
		let date = this.getDate();
		let res = await axios.get(encodeURI(`https://tw.18dao.net/每日黄历/${date}`));
		const $ = cheerio.load(res.data)
		this.Almanac = new Almanac($, date);
	}
	getDate() {
		let year = new Date().getFullYear();
		let month = ((new Date().getMonth() + 1))
		let day = (new Date().getDate())
		return `${year}年${month}月${day}日`;
	}

}
class Almanac {
	constructor($, date) {
		//TODAY_CONTENT
		this.date = date;
		this.title = $('.fieldset').text();
		this.content = $('.right_column').text();

	}
}
const dailyAlmanac = new DailyAlmanac();
const dailyAstro = new TwelveAstro();
const joke = new FunnyRandom('./assets/joke.txt');
const acg = new FunnyRandom('./assets/acg.txt');
const slogan = new FunnyRandom('./assets/slogan.txt');
const blackjoke = new FunnyRandom('./assets/blackjoke.txt');
const mlove = new FunnyRandom('./assets/mlove.txt');

class Asakusa100 {
	constructor() {
		this.Asakusa100 = [];
	}
	getRandomAsakusa100() {
		let random = Math.floor(Math.random() * (this.Asakusa100.length));
		return this.Asakusa100[random];
	}
	createAsakusa100() {
		const rawdata = fs.readFileSync('./assets/Asakusa100.json');
		const asakusa100 = JSON.parse(rawdata);
		this.Asakusa100 = asakusa100.json;
	}
}

const asakusa100 = new Asakusa100();
asakusa100.createAsakusa100();


class WatchMusic100 {
	constructor() {
	}
	getRandomWatchMusic100() {
		const random = ('00' + Math.floor(Math.random() * (100) + 1)).slice(-3);
		const WatchMusic = fs.readFileSync(`./assets/watchmusic100/观音百签${random}签.htm`, 'utf8')
		const $ = cheerio.load(WatchMusic);
		let chance = '';
		$('tr > td').each((i, elem) => {
			chance = $(elem).text().includes('观音一百签') ? $(elem).text().replaceAll(/^\s+/g, '').replaceAll(/\s+\n/g, '\n') : chance;

		})
		return chance;
	}
}
const watchMusic = new WatchMusic100();


/**
 * 占卜&其他
 */

function BStyleFlagSCRIPTS() {
	const rplyArr = ['\
「打完这仗我就回老家结婚（この戦いが終わったら、故郷に帰って结婚するんだ）」', '\
「打完这一仗后我请你喝酒」', '\
別怕！子彈還很多！', '\
「现在的我，已经戰无不勝了！（今の俺は、負ける気がしねぇ！）', '\
这裡是安全屋吧。', '\
「你、你要錢嗎！要什么我都能給你！\n我可以給你更多的錢！」', '\
「做完这次任務，我就要结婚了。」', '\
「幹完这一票我就金盆洗手了。」', '\
「好想再试一次啊……」', '\
「已经没什么好害怕的了（もう何も恐くない）」', '\
「我一定會回來的（必ず帰る！）」', '\
「差不多該走了」', '\
「我只是希望你永遠不要忘記我。」', '\
「我只是希望能永遠和你在一起。」', '\
「啊啊…为什么會在这种时候、想起了那些无聊的事呢？」', '\
「能遇見你真是太好了。」', '\
「我終於…为你們報仇了！」', '\
「他們佔盡優勢。」', '\
「等到一切结束后，我有些话想跟妳说！」', '\
「这段时间我过的很开心啊。」', '\
「待一切结束后記得還給我。」', '\
「真希望这份幸福可以永遠持續下去。」', '\
「这工作结束后我們两人一起生活吧！」（この仕事が終わったら2人で暮らそう）', '\
「我們三个人要永永遠遠在一起！」', '\
「这是我女兒的照片，很可愛吧？」', '\
「请告訴他/她，我永遠愛他/她」', '\
「听好，在我回來之前絕不要亂走动哦（いいか、俺が帰ってくるまでここを动くんじゃないぞ）」', '\
「要像一个乖孩子一樣等著我回來」', '\
「我去去就來（先に行って、すぐ戻るから）」', '\
「快逃！(逃げろう！/早く逃げろう！)」', '\
「对方只有一个人，大家一起上啊」', '\
「我就不信，这么多人還杀不了他一个！」', '\
「幹，幹掉了嗎？（やったのか？）」', '\
「身体好輕」', '\
「可恶！你給我看著！（逃跑）」', '\
「躲在这裡就應該不會被发现了吧。」', '\
「我不會讓任何人死的。」', '\
「可恶！原來是这么回事！」', '\
「嘛 反正以后還有很多机會问的。」', '\
「你的生命已经如風中殘燭。」', '\
「没有手牌場上也没卡，你還想要贏嗎？」', '\
「跑这么遠應該就行了。」', '\
「我已经甚么都不怕了（もう何も恐くない）」', '\
「这東西是什么，怎么之前没見过（なんだこのXXX、見たことないな）」', '\
「什麽聲音……？就去看一下吧（:「何の音だ？ちょっと見てくる」', '\
「是我的错覺嗎？可能是我看错了」', '\
「成功了嗎！？」', '\
「二十年后又是一条好漢！」', '\
「大人武运昌隆」', '\
「这次工作的報酬是以前无法比较的（「今度の仕事でまとまったカネが入るんだ」）', '\
「我才不要和罪犯呆在一起，我回自己的房间去了！（この中に杀人者がいるかもしれないのに、一緒に居られるか!俺は自分の部屋に戻るぞ!）」', '\
「其实我知道事情的真相…犯人就是……」', '\
「我已经天下无敵了~~」', '\
「大人！这边就交給小的吧，请快離开这边吧」', '\
「这就是我們流派的最終奧義。这一招我只會演示一次，你看好了！」', '\
「誰敢杀我？」', '\
「從來没有人能破解我这招。」', '\
「就算杀死也没问题吧？」', '\
「看我塔下强杀！」', '\
「騙人的吧，我們不是朋友嗎？」', '\
「不需要大人出手，就交給在下吧」', '\
「原來只有这种水平嗎」', '\
「操縱一切的黑手其实就是！」', '\
「没看过你呢，你是誰？」', '\
「外面怎么这么吵」', '\
「我老爸是....你有种就....」', '\
「戰鬥力只有五的渣渣。」', '\
「我真是HIGH到不行了啊！」', '\
「嗯？鞋帶斷了。」', '\
「这一招我只會演示一次，你看好了！」', '\
「过了明天就没事了。」', '\
「我出門了。」', '\
「你能走到这裡很了不起……」', '\
「給我打，打出事來我負責」', '\
「我已经不是那个一无所知的我了！」', '\
「明天我會把所有事全部告訴你……」', '\
「只要擊败你們两个，剩下的就很容易解決。」', '\
「我會變得比任何人都强，一生保護你。」', '\
「你可以繼承这裡嗎，这孩子也说喜歡你。」', '\
「打倒了！他死掉了！」', '\
「來戰个痛快，我和你最后的戰鬥！！」', '\
「我看你是个分身或是什么类似東西吧。」', '\
「謝謝你，你讓我感到我不是孤单一人。」', '\
「我先去死了，你儘管加油。」', '\
「这次任務輕輕松松，訓練时辛苦多了！」', '\
「我的这把刀可是塗满了毒藥的毒刃！」\nhttp://takehana.cocolog-nifty.com/photos/uncategorized/2011/08/06/onesegpc_20110806_01041904.jpg', '\
「哈哈哈，今天又是幸运的一天，死裡逃生了！」', '\
「我花費一生的实驗終於完成了！」', '\
「什么寺廟什么神像，看我拆了它！」', '\
「世上怎會有鬼，都是吓小朋友啦。」', '\
「这个经过多重实驗，保證不會发生意外。」', '\
「大哥……哥……。」', '\
「大哥哥，一起玩吧。」', '\
「接下來將會说明規则。」\n「夠了，这种整人节目可以停了吧，我要走了。」', '\
「过不久我也要升级了！」', '\
「这是你的生日禮物，很有历史價值的」', '\
「哇，好嘔心的液体！」', '\
「我已经死而无憾！」', '\
「好大件事呢，但这和我們也没什么关係。草」', '\
「回來后我會十倍奉還！」', '\
「雷达出现巨大的影子！」「雷达故障了吧。」', '\
「今天天氣真好，是適合出海的日子！」', '\
「雖然被怪物咬了一口，但只是皮外傷而已！」', '\
「隊长，这裡看到一个人影……」「喂喂？你说什么」「……」', '\
「这裡很安全」「这下放心了！」', '\
「前輩會停住他，別怕，去吧！」', '\
「我要將我超过５年的感情告訴她！」', '\
「換人吧，你太无聊了。」', '\
「只要他們幸福就好，我從心底祝福他們。」', '\
「我可以好好利用这件事」'];

	//	rply.text = rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
	return rplyArr[rollbase.Dice(rplyArr.length) - 1]
}

function randomReply() {
	const rplyArr = ['\
你們死定了呃呃呃不要糾结这些……所以是在糾结哪些？', '\
在澳洲，每过一分鐘就有一隻鴨嘴兽被拔嘴。 \n我到底在共三小。', '\
嗚噁噁噁噁噁噁，不要隨便叫我。', '\
幹，你这学不會的豬！', '\
嘎嘎嘎。', '\
wwwwwwwwwwwwwwwww', '\
为什么你們每天都可以一直玩；玩就算了還玩我。', '\
好棒，整点了！咦？不是嗎？', '\
不要打擾我挖坑！', '好棒，误点了！', '\
在南半球，一隻鴨嘴兽拍打他的鰭，他的嘴就會掉下來。 \n我到底在共三小。', '\
什么東西你共三小。', '\
哈哈哈哈哈哈哈哈！', '\
一直叫，你4不4想拔嘴人家？', '\
一直叫，你想被淨灘嗎？', '\
幫主你也敢嘴？', '\
拔嘴的话，我的嘴巴會长出觸手，然后开花成四个花瓣哦 (´×`)', '\
看看我！！我体內的怪物已经这么大了！！', '\
傳说中，凡是拔嘴过鴨嘴兽的人，有高机率在100年內死去。 \n我到底在共三小。', '\
人类每花60秒拔嘴，就減少一分鐘的壽命。 \n我到底在共三小。', '\
嘴被拔，就會掉。', '\
你在大聲什么啦！！！！', '\
公道價，八萬一（伸手）。', '\
你的嘴裡有異音（指）', '\
幫主说，有人打你的左脸，你就要用肉食性猛擊咬斷他的小腿。'];
	//	rply.text = rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
	return rplyArr[rollbase.Dice(rplyArr.length) - 1];
}

function randomLuck(TEXT) {
	const rplyArr = ['超吉', '超级上吉', '大吉', '吉', '中吉', '小吉', '吉', '小吉', '吉', '吉', '中吉', '吉', '中吉', '吉', '中吉', '小吉', '末吉', '吉', '中吉', '小吉', '末吉', '中吉', '小吉', '小吉', '吉', '小吉', '末吉', '中吉', '小吉', '凶', '小凶', '没凶', '大凶', '很凶', '你不要知道比较好呢', '命运在手中,何必问我'];
	//	rply.text = TEXT[0] + ' ： ' + rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
	return TEXT[0] + ' ： ' + rplyArr[rollbase.Dice(rplyArr.length) - 1];
}

/**
 * Tarot塔罗牌
 */
function MultiDrawTarot(text, text2, type) {
	let returnStr = '';
	let cards = rollbase.shuffleTarget(TarotList2);

	const formatText = (prefix, text, text2) => {
		return `${prefix}\n${text ? "；" + text : ""}${text2 ? " " + text2 : ""}`;
	};

	switch (type) {
		case 1:
			returnStr = formatText('【时间塔罗】/每日塔罗/大十字塔罗', text, text2);
			returnStr += `过去: ${cards[0]}\n现在: ${cards[1]}\n未來: ${cards[2]}\n`;
			break;
		case 2:
			returnStr = formatText('【大十字塔罗】/每日塔罗/时间塔罗', text, text2);
			returnStr += `现況: ${cards[0]}\n助力: ${cards[1]}\n目标: ${cards[2]}\n基礎: ${cards[3]}\n过去: ${cards[4]}\n未來: ${cards[5]}\n自我: ${cards[6]}\n环境: ${cards[7]}\n恐懼: ${cards[8]}\n结論: ${cards[9]}\n`;
			break;
		default:
			break;
	}
	return returnStr;
}


function NomalDrawTarot(text, text2) {
	let returnStr = '';
	returnStr = '【每日塔罗】/大十字塔罗/时间塔罗'
	returnStr += `${text ? "\n；" + text : ""}${text2 ? " " + text2 : ""}`
	let ans = rollbase.shuffleTarget(TarotList)
	returnStr += '\n' + ans[0]
	return returnStr;
}


const TarotList = ["愚者 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/00.jpg",
	"魔术師 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/01.jpg",
	"女祭司 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/02.jpg",
	"女皇 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/03.jpg",
	"皇帝 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/04.jpg",
	"教皇 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/05.jpg",
	"戀人 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/06.jpg",
	"戰車 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/07.jpg",
	"力量 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/08.jpg",
	"隱者 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/09.jpg",
	"命运之輪 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/10.jpg",
	"正義 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/11.jpg",
	"吊人 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/12.jpg",
	"死神 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/13.jpg",
	"节制 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/14.jpg",
	"恶魔 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/15.jpg",
	"高塔 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/16.jpg",
	"星星 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/17.jpg",
	"月亮 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/18.jpg",
	"太陽 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/19.jpg",
	"審判 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/20.jpg",
	"世界 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/21.jpg",
	"愚者 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/00-Re.jpg",
	"魔术師 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/01-Re.jpg",
	"女祭司 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/02-Re.jpg",
	"女皇 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/03-Re.jpg",
	"皇帝 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/04-Re.jpg",
	"教皇 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/05-Re.jpg",
	"戀人 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/06-Re.jpg",
	"戰車 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/07-Re.jpg",
	"力量 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/08-Re.jpg",
	"隱者 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/09-Re.jpg",
	"命运之輪 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/10-Re.jpg",
	"正義 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/11-Re.jpg",
	"吊人 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/12-Re.jpg",
	"死神 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/13-Re.jpg",
	"节制 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/14-Re.jpg",
	"恶魔 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/15-Re.jpg",
	"高塔 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/16-Re.jpg",
	"星星 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/17-Re.jpg",
	"月亮 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/18-Re.jpg",
	"太陽 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/19-Re.jpg",
	"審判 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/20-Re.jpg",
	"世界 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/21-Re.jpg",
	"聖杯一 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_01.jpg",
	"聖杯二 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_02.jpg",
	"聖杯三 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_03.jpg",
	"聖杯四 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_04.jpg",
	"聖杯五 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_05.jpg",
	"聖杯六 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_06.jpg",
	"聖杯七 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_07.jpg",
	"聖杯八 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_08.jpg",
	"聖杯九 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_09.jpg",
	"聖杯十 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_10.jpg",
	"聖杯國王 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_KING.jpg",
	"聖杯騎士 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_KNIGHT.jpg",
	"聖杯侍者 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_PAGE.jpg",
	"聖杯皇后 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_QUEEN.jpg",
	"錢幣一 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_01.jpg",
	"錢幣二 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_02.jpg",
	"錢幣三 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_03.jpg",
	"錢幣四 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_04.jpg",
	"錢幣五 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_05.jpg",
	"錢幣六 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_06.jpg",
	"錢幣七 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_07.jpg",
	"錢幣八 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_08.jpg",
	"錢幣九 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_09.jpg",
	"錢幣十 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_10.jpg",
	"錢幣國王 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_KING.jpg",
	"錢幣騎士 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_KNIGHT.jpg",
	"錢幣侍者 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_PAGE.jpg",
	"錢幣皇后 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_QUEEN.jpg",
	"寶剑一 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_01.jpg",
	"寶剑二 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_02.jpg",
	"寶剑三 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_03.jpg",
	"寶剑四 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_04.jpg",
	"寶剑五 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_05.jpg",
	"寶剑六 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_06.jpg",
	"寶剑七 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_07.jpg",
	"寶剑八 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_08.jpg",
	"寶剑九 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_09.jpg",
	"寶剑十 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_10.jpg",
	"寶剑國王 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_KING.jpg",
	"寶剑騎士 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_KNIGHT.jpg",
	"寶剑侍者 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_PAGE.jpg",
	"寶剑皇后 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_QUEEN.jpg",
	"權杖一 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_01.jpg",
	"權杖二 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_02.jpg",
	"權杖三 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_03.jpg",
	"權杖四 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_04.jpg",
	"權杖五 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_05.jpg",
	"權杖六 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_06.jpg",
	"權杖七 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_07.jpg",
	"權杖八 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_08.jpg",
	"權杖九 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_09.jpg",
	"權杖十 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_10.jpg",
	"權杖國王 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_KING.jpg",
	"權杖騎士 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_KNIGHT.jpg",
	"權杖侍者 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_PAGE.jpg",
	"權杖皇后 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_QUEEN.jpg",
	"聖杯一 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_01-Re.jpg",
	"聖杯二 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_02-Re.jpg",
	"聖杯三 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_03-Re.jpg",
	"聖杯四 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_04-Re.jpg",
	"聖杯五 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_05-Re.jpg",
	"聖杯六 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_06-Re.jpg",
	"聖杯七 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_07-Re.jpg",
	"聖杯八 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_08-Re.jpg",
	"聖杯九 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_09-Re.jpg",
	"聖杯十 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_10-Re.jpg",
	"聖杯國王 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_KING-Re.jpg",
	"聖杯騎士 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_KNIGHT-Re.jpg",
	"聖杯侍者 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_PAGE-Re.jpg",
	"聖杯皇后 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_QUEEN-Re.jpg",
	"錢幣一 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_01-Re.jpg",
	"錢幣二 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_02-Re.jpg",
	"錢幣三 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_03-Re.jpg",
	"錢幣四 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_04-Re.jpg",
	"錢幣五 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_05-Re.jpg",
	"錢幣六 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_06-Re.jpg",
	"錢幣七 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_07-Re.jpg",
	"錢幣八 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_08-Re.jpg",
	"錢幣九 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_09-Re.jpg",
	"錢幣十 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_10-Re.jpg",
	"錢幣國王 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_KING-Re.jpg",
	"錢幣騎士 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_KNIGHT-Re.jpg",
	"錢幣侍者 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_PAGE-Re.jpg",
	"錢幣皇后 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_QUEEN-Re.jpg",
	"寶剑一 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_01-Re.jpg",
	"寶剑二 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_02-Re.jpg",
	"寶剑三 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_03-Re.jpg",
	"寶剑四 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_04-Re.jpg",
	"寶剑五 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_05-Re.jpg",
	"寶剑六 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_06-Re.jpg",
	"寶剑七 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_07-Re.jpg",
	"寶剑八 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_08-Re.jpg",
	"寶剑九 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_09-Re.jpg",
	"寶剑十 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_10-Re.jpg",
	"寶剑國王 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_KING-Re.jpg",
	"寶剑騎士 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_KNIGHT-Re.jpg",
	"寶剑侍者 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_PAGE-Re.jpg",
	"寶剑皇后 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_QUEEN-Re.jpg",
	"權杖一 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_01-Re.jpg",
	"權杖二 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_02-Re.jpg",
	"權杖三 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_03-Re.jpg",
	"權杖四 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_04-Re.jpg",
	"權杖五 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_05-Re.jpg",
	"權杖六 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_06-Re.jpg",
	"權杖七 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_07-Re.jpg",
	"權杖八 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_08-Re.jpg",
	"權杖九 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_09-Re.jpg",
	"權杖十 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_10-Re.jpg",
	"權杖國王 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_KING-Re.jpg",
	"權杖騎士 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_KNIGHT-Re.jpg",
	"權杖侍者 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_PAGE-Re.jpg",
	"權杖皇后 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_QUEEN-Re.jpg",
	"空白"
]

const TarotList2 = ["愚者 ＋",
	"魔术師 ＋",
	"女祭司 ＋",
	"女皇 ＋",
	"皇帝 ＋",
	"教皇 ＋",
	"戀人 ＋",
	"戰車 ＋",
	"力量 ＋",
	"隱者 ＋",
	"命运之輪 ＋",
	"正義 ＋",
	"吊人 ＋",
	"死神 ＋",
	"节制 ＋",
	"恶魔 ＋",
	"高塔 ＋",
	"星星 ＋",
	"月亮 ＋",
	"太陽 ＋",
	"審判 ＋",
	"世界 ＋",
	"聖杯一 ＋",
	"聖杯二 ＋",
	"聖杯三 ＋",
	"聖杯四 ＋",
	"聖杯五 ＋",
	"聖杯六 ＋",
	"聖杯七 ＋",
	"聖杯八 ＋",
	"聖杯九 ＋",
	"聖杯十 ＋",
	"聖杯國王 ＋",
	"聖杯騎士 ＋",
	"聖杯侍者 ＋",
	"聖杯皇后 ＋",
	"錢幣一 ＋",
	"錢幣二 ＋",
	"錢幣三 ＋",
	"錢幣四 ＋",
	"錢幣五 ＋",
	"錢幣六 ＋",
	"錢幣七 ＋",
	"錢幣八 ＋",
	"錢幣九 ＋",
	"錢幣十 ＋",
	"錢幣國王 ＋",
	"錢幣騎士 ＋",
	"錢幣侍者 ＋",
	"錢幣皇后 ＋",
	"寶剑一 ＋",
	"寶剑二 ＋",
	"寶剑三 ＋",
	"寶剑四 ＋",
	"寶剑五 ＋",
	"寶剑六 ＋",
	"寶剑七 ＋",
	"寶剑八 ＋",
	"寶剑九 ＋",
	"寶剑十 ＋",
	"寶剑國王 ＋",
	"寶剑騎士 ＋",
	"寶剑侍者 ＋",
	"寶剑皇后 ＋",
	"權杖一 ＋",
	"權杖二 ＋",
	"權杖三 ＋",
	"權杖四 ＋",
	"權杖五 ＋",
	"權杖六 ＋",
	"權杖七 ＋",
	"權杖八 ＋",
	"權杖九 ＋",
	"權杖十 ＋",
	"權杖國王 ＋",
	"權杖騎士 ＋",
	"權杖侍者 ＋",
	"權杖皇后 ＋",
	"愚者 －",
	"魔术師 －",
	"女祭司 －",
	"女皇 －",
	"皇帝 －",
	"教皇 －",
	"戀人 －",
	"戰車 －",
	"力量 －",
	"隱者 －",
	"命运之輪 －",
	"正義 －",
	"吊人 －",
	"死神 －",
	"节制 －",
	"恶魔 －",
	"高塔 －",
	"星星 －",
	"月亮 －",
	"太陽 －",
	"審判 －",
	"世界 －",
	"聖杯一 －",
	"聖杯二 －",
	"聖杯三 －",
	"聖杯四 －",
	"聖杯五 －",
	"聖杯六 －",
	"聖杯七 －",
	"聖杯八 －",
	"聖杯九 －",
	"聖杯十 －",
	"聖杯國王 －",
	"聖杯騎士 －",
	"聖杯侍者 －",
	"聖杯皇后 －",
	"錢幣一 －",
	"錢幣二 －",
	"錢幣三 －",
	"錢幣四 －",
	"錢幣五 －",
	"錢幣六 －",
	"錢幣七 －",
	"錢幣八 －",
	"錢幣九 －",
	"錢幣十 －",
	"錢幣國王 －",
	"錢幣騎士 －",
	"錢幣侍者 －",
	"錢幣皇后 －",
	"寶剑一 －",
	"寶剑二 －",
	"寶剑三 －",
	"寶剑四 －",
	"寶剑五 －",
	"寶剑六 －",
	"寶剑七 －",
	"寶剑八 －",
	"寶剑九 －",
	"寶剑十 －",
	"寶剑國王 －",
	"寶剑騎士 －",
	"寶剑侍者 －",
	"寶剑皇后 －",
	"權杖一 －",
	"權杖二 －",
	"權杖三 －",
	"權杖四 －",
	"權杖五 －",
	"權杖六 －",
	"權杖七 －",
	"權杖八 －",
	"權杖九 －",
	"權杖十 －",
	"權杖國王 －",
	"權杖騎士 －",
	"權杖侍者 －",
	"權杖皇后 －",
	"空白"
]

/**
 *  choice 及SORT
 */

function dailyAnswerChoice(input) {
	return input + ' \n→ ' + dailyAnswer[rollbase.Dice(dailyAnswer.length) - 1];
}
function choice(input, str) {
	let array = input.replace(str[0], '').match(/\S+/ig);
	return str[0] + ' [ ' + array.join(' ') + ' ] \n→ ' + array[rollbase.Dice(array.length) - 1];
}

function SortIt(input, mainMsg) {
	let a = input.replace(mainMsg[0], '').match(/\S+/ig);
	for (let i = a.length - 1; i >= 0; i--) {
		//let randomIndex = Math.floor(Math.random() * (i + 1));  
		//3 -> 210 , 10, 0
		let randomIndex = rollbase.Dice(i + 1) - 1
		//3 ->
		let itemAtIndex = a[randomIndex];
		a[randomIndex] = a[i];
		a[i] = itemAtIndex;
	}
	return mainMsg[0] + ' \n→ [ ' + a.join(', ') + ' ]';
}
async function axiosDaily(url) {
	let reply = await fetchData(url);
	if (reply === '错误error') {
		reply = await fetchData(url.replace('https://ovooa.com', 'http://lkaa.top'));
	}
	if (reply === '错误error') {
		reply = `服务器出现问题，请稍后再试。`;
	}
	return reply;

}

async function fetchData(url) {
	let reply = '';
	try {
		const response = await axios.get(encodeURI(url), { timeout: 20000 });
		const json = analyzeResponse(response);
		reply += `${json.title ? json.title + '\n' : ''}`
		reply += `${json.text && json.text !== '获取成功' ? json.text + '\n' : ''}`
		reply += `${json.data && json.data.title ? json.data.title + '\n' : ''}`
		reply += `${json.data && json.data.text ? json.data.text + '\n' : ''}`
		reply += `${json.data && json.data.Msg ? json.data.Msg + '\n' : ''}`
		reply = chineseConv.tify(reply);
		reply += `${json.image ? json.image + '\n' : ''}`
		reply += `${json.data && json.data.image ? json.data.image + '\n' : ''}`
		reply = reply.replace(/\\r/g, '\n').replace(/\\n/g, '\n')
		return reply || '没有结果，请检查內容'
	} catch (error) {
		if (error.code !== 'ETIMEDOUT' || error.code !== 'ECONNABORTED' || error.code !== 'ECONNRESET' || error.code !== 'undefined') {
			return '错误error'
		}
		//return `'服务器連線出现问题，请稍后再试，错误代碼: ${error.code}`;
	}
}
function analyzeResponse(response) {
	switch (typeof response) {
		case 'string':
			return { data: { text: response } }
		case 'object':
			if (response && response.data && response.data.data) {
				return response.data;
			}
			if (response && response.data) {
				return response;
			}
			break;
		default:
			break;
	}
}
/*來源自 https://ovooa.com
	
http://api.uuouo.cn/
http://ybapi.top/
http://weizhinb.top/
	
*/
const discordCommand = [
	{
		data: new SlashCommandBuilder()
			.setName('mee')
			.setDescription('【复述功能】 /mee 模拟HKTRPG说话 ')
			.addStringOption(option => option.setName('text').setDescription('复述內容').setRequired(true)),
		async execute(interaction) {
			const text = interaction.options.getString('text')
			if (text !== null) {
				await interaction.reply({ content: '已进行模拟HKTRPG说话', ephemeral: true }).catch();
				return `.me ${text}`
			}
			else return `需要输入內容\n 
			例子 /mee C君杀死了NPC 村民, 受到尼什村通缉!`
		}
	},
	{
		data: new SlashCommandBuilder()
			.setName('排序')
			.setDescription('进行随机排序')
			.addStringOption(option => option.setName('text').setDescription('输入所有內容，以空格分隔 如 排序 选项A 选项B 选项C').setRequired(true))
		,
		async execute(interaction) {
			const text = interaction.options.getString('text')
			if (text !== null)
				return `排序 ${text}`

		}
	},
	{
		data: new SlashCommandBuilder()
			.setName('随机')
			.setDescription('进行随机抽选')
			.addStringOption(option => option.setName('text').setDescription('输入所有內容，以空格分隔 如 选项A 选项B 选项C').setRequired(true))
		,
		async execute(interaction) {
			const text = interaction.options.getString('text')
			if (text !== null)
				return `随机 ${text}`
		}
	},
	{
		data: new SlashCommandBuilder()
			.setName('choice')
			.setDescription('进行随机抽选')
			.addStringOption(option => option.setName('text').setDescription('输入所有內容，以空格分隔 如 选项A 选项B 选项C').setRequired(true))
		,
		async execute(interaction) {
			const text = interaction.options.getString('text')
			if (text !== null)
				return `随机 ${text}`
		}
	},
	{
		data: new SlashCommandBuilder()
			.setName('运势')
			.setDescription('进行随机抽选')
			.addStringOption(option => option.setName('text').setDescription('可选: 什么的运势'))
		,
		async execute(interaction) {
			//	console.log(interaction.options.getString('text'))
			const text = interaction.options.getString('text')
			if (text !== null)
				return `${text}的运势`
			else return `今日运势`
		}
	},
	{
		data: new SlashCommandBuilder()
			.setName('塔罗')
			.setDescription('进行塔罗占卜')
			.addStringOption(option =>
				option.setName('category')
					.setDescription('塔罗种类')
					.setRequired(true)
					.addChoices(
						{ name: '每日塔罗(单张)', value: '每日塔罗' },
						{ name: '大十字塔罗', value: '大十字塔罗' },
						{ name: '时间塔罗', value: '时间塔罗' }))
		,
		async execute(interaction) {
			const category = interaction.options.getString('category')
			if (category !== null)
				return `${category}`
		}
	},
	{
		data: new SlashCommandBuilder()
			.setName('立flag')
			.setDescription('立FLAG')
			.addStringOption(option => option.setName('text').setDescription('可选: 立什么FLAG'))
		,
		async execute(interaction) {
			const text = interaction.options.getString('text')
			if (text !== null)
				return `${text}立FLAG`
			else return `立FLAG`
		}
	},
	{
		data: new SlashCommandBuilder()
			.setName('每日')
			.setDescription('进行每日功能')
			.addSubcommand(subcommand =>
				subcommand
					.setName('星座')
					.setDescription('显示每日星座运程')
					.addStringOption(option =>
						option.setName('star')
							.setDescription('哪个星座')
							.setRequired(true)
							.addChoices({ name: '白羊', value: '每日白羊' },
								{ name: '金牛', value: '每日金牛' },
								{ name: '巨蟹', value: '每日巨蟹' },
								{ name: '狮子', value: '每日狮子' },
								{ name: '双子', value: '每日双子' },
								{ name: '处女', value: '每日处女' },
								{ name: '天秤', value: '每日天秤' },
								{ name: '天蝎', value: '每日天蝎' },
								{ name: '射手', value: '每日射手' },
								{ name: '摩羯', value: '每日摩羯' },
								{ name: '水瓶', value: '每日水瓶' },
								{ name: '双鱼', value: '每日双鱼' }
							)))
			.addSubcommand(subcommand =>
				subcommand
					.setName('塔罗')
					.setDescription('抽取一张塔罗牌'))
			.addSubcommand(subcommand =>
				subcommand
					.setName('一言')
					.setDescription('显示一条金句'))
			.addSubcommand(subcommand =>
				subcommand
					.setName('毒汤')
					.setDescription('显示一条有毒的鸡汤'))
			.addSubcommand(subcommand =>
				subcommand
					.setName('情话')
					.setDescription('显示一条情话'))
			.addSubcommand(subcommand =>
				subcommand
					.setName('灵签')
					.setDescription('抽取一条观音签'))
			.addSubcommand(subcommand =>
				subcommand
					.setName('浅草签')
					.setDescription('抽取一条浅草签'))
			.addSubcommand(subcommand =>
				subcommand
					.setName('大事')
					.setDescription('显示今天历史上的大事'))
			.addSubcommand(subcommand =>
				subcommand
					.setName('笑话')
					.setDescription('显示一条笑话'))
			.addSubcommand(subcommand =>
				subcommand
					.setName('动漫')
					.setDescription('显示一条动漫金句'))
			.addSubcommand(subcommand =>
				subcommand
					.setName('黄历')
					.setDescription('显示今日黄历'))
			.addSubcommand(subcommand =>
				subcommand
					.setName('废话')
					.setDescription('生产一条你或对像的废话').addStringOption(option => option.setName('name').setDescription('可选: 对像的名字，留白则使用你的名字')))

		,
		async execute(interaction) {
			await interaction.deferReply({});
			const category = interaction.options.getString('category')
			const name = interaction.options.getString('name') || '';
			const subcommand = interaction.options.getSubcommand()
			const star = interaction.options.getString('star')
			if (star !== null)
				return `${star}`
			if (subcommand !== null)
				return `每日${subcommand} ${name}`
			if (category !== null)
				return `${category}`
			return;
		}
	}
];



class DailyFuckUp {
	static randomSentence(list) {
		let row = Math.floor(Math.random() * list.length);
		return list[row];
	}

	static randomNumber(min = 0, max = 100) {
		let number = Math.random() * (max - min) + min;
		return number;
	}

	static genCelebrity() {
		let quotes = DailyFuckUp.randomSentence(DailyFuckUp.celebrityQuotes)
		quotes = quotes.replace("曾经说过", DailyFuckUp.randomSentence(DailyFuckUp.formerFuck))
		quotes = quotes.replace("这不禁令我深思", DailyFuckUp.randomSentence(DailyFuckUp.afterFuck))
		return quotes
	}

	static genDiscuss(subject) {
		let sentence = DailyFuckUp.randomSentence(DailyFuckUp.discuss);
		sentence = sentence.replace(RegExp("主题", "g"), subject);
		return sentence;
	}

	static addParagraph(chapter) {
		if (chapter[chapter.length - 1] === " ") {
			chapter = chapter.slice(0, -2)
		}
		return "　　" + chapter + "。 "
	}

	static generateArticles(subject) {
		let text = []
		let chapter = "";
		let chapterLength = 0;
		while (chapterLength < 300) {
			let num = DailyFuckUp.randomNumber();
			if (num < 5 && chapter.length > 200) {
				chapter = DailyFuckUp.addParagraph(chapter) + "\n";;
				text.push(chapter);
				chapter = "";
			} else if (num < 20) {
				let sentence = DailyFuckUp.genCelebrity();
				chapterLength = chapterLength + sentence.length;
				chapter = chapter + sentence;
			} else {
				let sentence = DailyFuckUp.genDiscuss(subject);
				chapterLength = chapterLength + sentence.length;
				chapter = chapter + sentence;
			}
		}
		chapter = DailyFuckUp.addParagraph(chapter);
		text.push(chapter);

		let result = text.join("\n\n").replace('。。', '。');
		return result;
	}

	static discuss = [
		"现在，解決主题的问题，是非常非常重要的。 ",
		"主题的发生，到底需要如何做到，不主题的发生，又會如何产生。 ",
		"主题，到底應該如何实现。 ",
		"帶著这些问题，我們來審視一下主题。 ",
		"所謂主题，关鍵是主题需要如何寫。 ",
		"我們一般認为，抓住了问题的关鍵，其他一切则會迎刃而解。 ",
		"问题的关鍵究竟为何? ",
		"主题因何而发生?",
		"每个人都不得不面对这些问题。 在面对这种问题时， ",
		"一般來講，我們都必須務必慎重的考慮考慮。 ",
		"要想清楚，主题，到底是一种怎么樣的存在。 ",
		"瞭解清楚主题到底是一种怎么樣的存在，是解決一切问题的关鍵。 ",
		"就我个人來说，主题对我的意義，不能不说非常重大。 ",
		"本人也是经过了深思熟慮，在每个日日夜夜思考这个问题。 ",
		"主题，发生了會如何，不发生又會如何。 ",
		"在这种困难的抉擇下，本人思來想去，寢食难安。 ",
		"生活中，若主题出现了，我們就不得不考慮它出现了的事实。 ",
		"这种事实对本人來说意義重大，相信对这个世界也是有一定意義的。 ",
		"我們都知道，只要有意義，那么就必須慎重考慮。 ",
		"在现今社會，一些重要的问题始終存在著。因此，我們需要关注这些问题並找到有效的解決方案。",
		"從长遠來看，我們必須重視某些问题的影響，因为它們可能对我們的未來产生深遠的影響。",
		"解決问题需要集中精力和全面的思考。只有这樣，才能找到最佳解決方案。",
		"我們必須從多个角度來看待问题，因为问题的解決通常不是单一的方法。",
		"无論面对什么樣的问题，我們都必須保持冷靜和理性。只有这樣，我們才能找到最好的解決方案。",
		"看似簡单的问题，有时也可能是非常复雜的。因此，我們需要投入更多的时间和精力去理解问题。",
		"通过学习和经驗，我們可以增强解決问题的能力。这不僅可以幫助我們應对当前的问题，還可以使我們更好地應对未來的挑戰。",
		"尋找最佳解決方案需要勇氣和创造力。我們必須敢於嘗试新的思路和方法。",
		"某些问题可能會給我們帶來挑戰，但同时也可能帶來机會。我們需要善加利用这些机會，以创造更好的未來。",
		"在解決问题的过程中，我們需要充分了解问题的本质和原因，以確保我們找到的解決方案是可行的。",
		"解決问题需要有一个清晰的目标和计劃。只有这樣，我們才能更有效地实现我們的目标。",
		"面对困难和挑戰，我們必須堅持不懈，直到找到最佳解決方案。",
		"在解決问题的过程中，我們必須有耐心和毅力。只有这樣，我們才能成功地克服所有的障礙。",
		"綜观主题的历史，我們會发现，这是一个复雜且多變的问题。",
		"許多学者和專家已经对主题进行了深入的研究和分析，但仍有許多问题需要解決。",
		"与主题相关的議题越來越多，因此需要更多的研究和探討。",
		"对於主题的討論，人們常常持不同的观点和看法，这使得解決问题變得更加困难。",
		"面对主题，我們必須採取有效的措施，才能解決问题。",
		"許多人对主题感到困惑和无助，需要更多的指導和支援。",
		"主题涉及的範圍非常廣泛，需要進一步细化和區分。",
		"对於主题的處理，我們需要更好地运用科技和创新，才能取得更好的效果。",
		"解決主题需要全社會的參与和努力，不能单靠某一个群体或个人的力量。",
		"主题所帶來的影響和后果是深遠的，必須慎重对待。",
	]

	static celebrityQuotes = [
		"馬丁路德金曾经说过：“黑夜雖然會延遲，但白天一定會到來。这不禁令我深思",
		"貝多芬曾经说过：“人生就像一首交響樂，需要高低起伏才會有美妙的旋律。这不禁令我深思",
		"約翰·藍儂曾经说过：“生命是发生在你身上的事情，当你忙於为其餘的東西而忘了它时，它就會溜走。这不禁令我深思",
		"艾倫·德珍尼斯曾经说过：“生命中最困难的部分是不知道該怎么做，而最容易的部分是知道該怎么做卻不去做。这不禁令我深思",
		"奧斯卡·王爾德曾经说过：“人生就像一場戏劇，演员們出場、扮演角色，但当燈光熄滅时，他們又得回到现实中來。这不禁令我深思",
		"約翰·华納克爾曾经说过：“成功不是最終目的，失败也不是致命的，勇氣繼續前進才是最重要的。这不禁令我深思",
		"亞伯拉罕·林肯曾经说过：“你可以愛上你的工作，也可以恨你的工作，但你必須为它付出努力。这不禁令我深思",
		"比爾·蓋茨曾经说过：“成功不是取決於你有多聰明，而是取決於你有多認真。这不禁令我深思",
		"納爾遜·曼德拉曾经说过：“教育是改變世界的最强大的武器。这不禁令我深思",
		"史蒂夫·乔布斯曾经说过：“你的工作將佔用你生命中大部分时间，为什么不要做你熱愛的工作呢？这不禁令我深思",
		"伏爾泰曾经说过，不经巨大的困难，不會有偉大的事業。这不禁令我深思",
		"富勒曾经说过，苦难磨鍊一些人，也毀滅另一些人。这不禁令我深思",
		"文森特·皮爾曾经说过，改變你的想法，你就改變了自己的世界。这不禁令我深思",
		"拿破崙·希爾曾经说过，不要等待，时机永遠不會恰到好處。这不禁令我深思",
		"塞涅卡曾经说过，生命如同寓言，其價值不在与长短，而在与內容。这不禁令我深思",
		"奧普拉·温弗瑞曾经说过，你相信什么，你就成为什么樣的人。这不禁令我深思",
		"呂凱特曾经说过，生命不可能有两次，但許多人連一次也不善於度过。这不禁令我深思",
		"莎士比亞曾经说过，人的一生是短的，但如果卑劣地过这一生，就太长了。这不禁令我深思",
		"笛卡兒曾经说过，我的努力求学没有得到別的好處，只不过是愈來愈发覺自己的无知。这不禁令我深思",
		"左拉曾经说过，生活的道路一旦选定，就要勇敢地走到底，決不回头。这不禁令我深思",
		"米歇潘曾经说过，生命是一条艱險的峽谷，只有勇敢的人才能通过。这不禁令我深思",
		"吉姆·羅恩曾经说过，要么你主宰生活，要么你被生活主宰。这不禁令我深思",
		"日本諺语曾经说过，不幸可能成为通向幸福的橋樑。这不禁令我深思",
		"海貝爾曾经说过，人生就是学校。在那裡，与其说好的教師是幸福，不如说好的教師是不幸。这不禁令我深思",
		"杰納勒爾·乔治·S·巴頓曾经说过，接受挑戰，就可以享受勝利的喜悦。这不禁令我深思",
		"德謨克利特曾经说过，节制使快樂增加並使享受加强。这不禁令我深思",
		"裴斯泰洛齐曾经说过，今天應做的事没有做，明天再早也是耽误了。这不禁令我深思",
		"歌德曾经说过，決定一个人的一生，以及整个命运的，只是一瞬之间。这不禁令我深思",
		"卡耐基曾经说过，一个不注意小事情的人，永遠不會成就大事業。这不禁令我深思",
		"盧梭曾经说过，浪費时间是一樁大罪过。这不禁令我深思",
		"康德曾经说过，既然我已经踏上这条道路，那么，任何東西都不應妨礙我沿著这条路走下去。这不禁令我深思",
		"克勞斯·莫瑟爵士曾经说过，教育需要花費錢，而无知也是一樣。这不禁令我深思",
		"伏爾泰曾经说过，堅持意志偉大的事業需要始終不渝的精神。这不禁令我深思",
		"亞伯拉罕·林肯曾经说过，你活了多少歲不算什么，重要的是你是如何度过这些歲月的。这不禁令我深思",
		"韓非曾经说过，內外相應，言行相稱。这不禁令我深思",
		"富蘭克林曾经说过，你熱愛生命嗎？那么別浪費时间，因为时间是組成生命的材料。这不禁令我深思",
		"馬爾頓曾经说过，堅强的信心，能使平凡的人做出驚人的事業。这不禁令我深思",
		"笛卡兒曾经说过，讀一切好書，就是和許多高尚的人談话。这不禁令我深思",
		"塞涅卡曾经说过，真正的人生，只有在经过艱难卓絕的鬥爭之后才能实现。这不禁令我深思",
		"易卜生曾经说过，偉大的事業，需要決心，能力，组织和責任感。这不禁令我深思",
		"歌德曾经说过，没有人事先了解自己到底有多大的力量，直到他试过以后才知道。这不禁令我深思",
		"达爾文曾经说过，敢於浪費哪怕一个鐘头时间的人，说明他還不懂得珍惜生命的全部價值。这不禁令我深思",
		"佚名曾经说过，感激每一个新的挑戰，因为它會鍛造你的意志和品格。这不禁令我深思",
		"奧斯特洛夫斯基曾经说过，共同的事業，共同的鬥爭，可以使人們产生忍受一切的力量。　这不禁令我深思",
		"蘇軾曾经说过，古之立大事者，不惟有超世之才，亦必有堅忍不拔之志。这不禁令我深思",
		"王陽明曾经说过，故立志者，为学之心也；为学者，立志之事也。这不禁令我深思",
		"歌德曾经说过，讀一本好書，就如同和一个高尚的人在交談。这不禁令我深思",
		"烏申斯基曾经说过，学习是勞动，是充满思想的勞动。这不禁令我深思",
		"別林斯基曾经说过，好的書籍是最貴重的珍寶。这不禁令我深思",
		"富蘭克林曾经说过，讀書是易事，思索是难事，但两者缺一，便全无用處。这不禁令我深思",
		"魯巴金曾经说过，讀書是在別人思想的幫助下，建立起自己的思想。这不禁令我深思",
		"培根曾经说过，合理安排时间，就等於节約时间。这不禁令我深思",
		"屠格涅夫曾经说过，你想成为幸福的人嗎？但願你首先学會吃得起苦。这不禁令我深思",
		"莎士比亞曾经说过，拋棄时间的人，时间也拋棄他。这不禁令我深思",
		"叔本华曾经说过，普通人只想到如何度过时间，有才能的人設法利用时间。这不禁令我深思",
		"博曾经说过，一次失败，只是證明我們成功的決心還夠堅强。 維这不禁令我深思",
		"拉羅什夫科曾经说过，取得成就时堅持不懈，要比遭到失败时頑强不屈更重要。这不禁令我深思",
		"莎士比亞曾经说过，人的一生是短的，但如果卑劣地过这一生，就太长了。这不禁令我深思",
		"俾斯麥曾经说过，失败是堅忍的最后考驗。这不禁令我深思",
		"池田大作曾经说过，不要回避苦惱和困难，挺起身來向它挑戰，進而克服它。这不禁令我深思",
		"莎士比亞曾经说过，那腦袋裡的智慧，就像打火石里的火花一樣，不去打它是不肯出來的。这不禁令我深思",
		"希臘曾经说过，最困难的事情就是認識自己。这不禁令我深思",
		"黑塞曾经说过，有勇氣承擔命运这才是英雄好漢。这不禁令我深思",
		"非洲曾经说过，最灵繁的人也看不見自己的背脊。这不禁令我深思",
		"培根曾经说过，閱讀使人充实，會談使人敏捷，寫作使人精確。这不禁令我深思",
		"斯賓諾莎曾经说过，最大的驕傲於最大的自卑都表示心灵的最軟弱无力。这不禁令我深思",
		"西班牙曾经说过，自知之明是最难得的知識。这不禁令我深思",
		"塞內加曾经说过，勇氣通往天堂，怯懦通往地獄。这不禁令我深思",
		"赫爾普斯曾经说过，有时候讀書是一种巧妙地避开思考的方法。这不禁令我深思",
		"笛卡兒曾经说过，閱讀一切好書如同和过去最傑出的人談话。这不禁令我深思",
		"鄧拓曾经说过，越是没有本领的就越加自命不凡。这不禁令我深思",
		"愛爾蘭曾经说过，越是无能的人，越喜歡挑剔別人的错兒。这不禁令我深思",
		"老子曾经说过，知人者智，自知者明。勝人者有力，自勝者强。这不禁令我深思",
		"歌德曾经说过，意志堅强的人能把世界放在手中像泥塊一樣任意揉捏。这不禁令我深思",
		"邁克爾·F·斯特利曾经说过，最具挑戰性的挑戰莫过於提升自我。这不禁令我深思",
		"愛迪生曾经说过，失败也是我需要的，它和成功对我一樣有價值。这不禁令我深思",
		"羅素·貝克曾经说过，一个人即使已登上頂峰，也仍要自强不息。这不禁令我深思",
		"馬雲曾经说过，最大的挑戰和突破在於用人，而用人最大的突破在於信任人。这不禁令我深思",
		"雷鋒曾经说过，自己活著，就是爲了使別人过得更美好。这不禁令我深思",
		"布爾沃曾经说过，要掌握書，莫被書掌握；要为生而讀，莫为讀而生。这不禁令我深思",
		"培根曾经说过，要知道对好事的稱頌过於誇大，也會招來人們的反感輕蔑和嫉妒。这不禁令我深思",
		"莫扎特曾经说过，誰和我一樣用功，誰就會和我一樣成功。这不禁令我深思",
		"馬克思曾经说过，一切节省，歸根到底都歸结为时间的节省。这不禁令我深思",
		"莎士比亞曾经说过，意志命运往往背道而馳，決心到最后會全部推倒。这不禁令我深思",
		"卡萊爾曾经说过，过去一切时代的精华盡在書中。这不禁令我深思",
		"培根曾经说过，深窺自己的心，而后发覺一切的奇蹟在你自己。这不禁令我深思",
		"羅曼·羅蘭曾经说过，只有把抱怨环境的心情，化为上進的力量，才是成功的保證。这不禁令我深思",
		"孔子曾经说过，知之者不如好之者，好之者不如樂之者。这不禁令我深思",
		"达·芬奇曾经说过，大膽和堅定的決心能夠抵得上武器的精良。这不禁令我深思",
		"叔本华曾经说过，意志是一个强壮的盲人，倚靠在明眼的跛子肩上。这不禁令我深思",
		"黑格爾曾经说过，只有永遠躺在泥坑裡的人，才不會再掉進坑裡。这不禁令我深思",
		"普列姆昌德曾经说过，希望的燈一旦熄滅，生活剎那间變成了一片黑暗。这不禁令我深思",
		"維龍曾经说过，要成功不需要什么特別的才能，只要把你能做的小事做得好就行了。这不禁令我深思",
		"郭沫若曾经说过，形成天才的決定因素應該是勤奮。这不禁令我深思",
		"洛克曾经说过，学到很多東西的訣竅，就是一下子不要学很多。这不禁令我深思",
		"西班牙曾经说过，自己的鞋子，自己知道紧在哪裡。这不禁令我深思",
		"拉羅什福科曾经说过，我們唯一不會改正的缺点是軟弱。这不禁令我深思",
		"亞伯拉罕·林肯曾经说过，我这个人走得很慢，但是我從不后退。这不禁令我深思",
		"美华納曾经说过，勿问成功的秘訣为何，且盡全力做你應該做的事吧。这不禁令我深思",
		"俾斯麥曾经说过，对於不屈不撓的人來说，没有失败这回事。这不禁令我深思",
		"阿卜·日·法拉茲曾经说过，学问是異常珍貴的東西，從任何源泉吸收都不可恥。这不禁令我深思",
		"白哲特曾经说过，堅强的信念能贏得强者的心，並使他們變得更堅强。 这不禁令我深思",
		"查爾斯·史考伯曾经说过，一个人幾乎可以在任何他懷有无限熱忱的事情上成功。 这不禁令我深思",
		"貝多芬曾经说过，卓越的人一大優点是：在不利与艱难的遭遇里百折不饒。这不禁令我深思",
		"莎士比亞曾经说过，本來无望的事，大膽嘗试，往往能成功。这不禁令我深思",
		"卡耐基曾经说过，我們若已接受最壞的，就再没有什么損失。这不禁令我深思",
		"德國曾经说过，只有在人群中间，才能認識自己。这不禁令我深思",
		"史美爾斯曾经说过，書籍把我們引入最美好的社會，使我們認識各个时代的偉大智者。这不禁令我深思",
		"馮学峰曾经说过，当一个人用工作去迎接光明，光明很快就會來照耀著他。这不禁令我深思",
		"吉格·金克拉曾经说过，如果你能做夢，你就能实现它。这不禁令我深思",
	]

	static afterFuck = ["这不禁令我深思。 ", "帶著这句话，我們還要更加慎重的審視这个问题： ", "这启发了我， ", "我希望諸位也能好好地体會这句话。 ", "这句话语雖然很短，但令我浮想联翩。 ", "无可否認，这句话帶給我們极大的啟示。", "我深深体會到这句话所蘊含的深意。", "这句话真正引起了我的共鳴。", "这句话不僅引发了我們的关注，也引起了我們的思考。", "我們需要認真对待这句话所提出的挑戰。", "这句话所傳达的信息絕对不容忽視。", "这句话令我們更加清晰地看到了问题的本质。", "这句话讓我們看到了问题的另一面。", "我深信这句话會成为我們思考的重要起点。", "我們必須從这句话中学到更多的東西。", "这句话能夠激发我們內心深處的共鳴。", "我們需要從这句话中学到一个重要的教訓。", "这句话引起了我們对问题的关注，也啟发了我們的思考。", "这句话不僅是一句警句，更是一个重要的提醒。", "这句话在我們思考的过程中发揮了重要的作用。", "这句话讓我們看到了一个全新的視角。", "这句话可以幫助我們更好地理解问题的本质。", "我們必須從这句话中吸取更多的智慧和啟示。", "这句话深刻地反映了现实的困境和挑戰。", "这句话讓我們更加明白了自己的不足之處。", "这句话揭示了问题的一个重要方面。", "这句话讓我們更加認識到自己的責任和使命。", "这句话提醒我們要时刻保持警醒和警覺。", "这句话讓我們更加堅定了自己的信念和決心。", "这句话可以幫助我們更好地理解自己和他人。", "这句话是一个重要的思想火花，可以引发更多的啟示。", "这句话可以幫助我們更好地理解自己的身份和使命。", "这句话讓我們更加明白了人生的真諦和意義。", "这句话可以激勵我們更加努力地工作和生活。", "这句话是一个非常寶貴的啟示和提醒。", "这句话讓我們看到了问题的一个新的方向和出路。", "这句话可以幫助我們更好地面对人生的挑戰和困境。", "这句话讓我們更加明白了自己的優点和不足。", "这句话是一个非常实用的工作和生活的指導原则。", "这句话可以幫助我們更好地理解人性和社會。", "这句话讓我們更加意識到自己的權利和義務。", "这句话讓我們更加了解了一个文化或一个國家的特点和價值观。", "这句话可以啟发我們更多的创造力和想像力。", "这句话讓我們更加明白了生命的珍貴和脆弱。"]

	static formerFuck = ["曾经说过", "在不经意间这樣说过", "事先聲明", "先说一聲", "需要先强调", "需要先说明", "需要先说明一下", "必須说明的是", "講过一个小故事", "討論过这问题", "曾经稍微講过背景", "曾经簡单提过一下", "談到这个话题", "想要先聲明的是", "在关於这个问题", "根據自己的经驗", "曾探討过这个議题", "在談論过这件事", "过交代过", "談到这个事情时，说过", "在進入正题前，曾说过", "关於这个话题，曾说过", "交代过一下", "说过自己的立場", "闡述过想法", "探討过这个问题", "談論过这个主题", "曾分析过", "提过，一下问题的重要性", "曾深入探討这个问题", "談到这个議题"]

}




const dailyAnswer = ["不一定", "需要别人的帮助", "需要慎重考虑", "相信你自己", "你是对的", "放弃吧", "听听别人的建议", "需要坚持", "不要放弃", "不要错过机会", "会有转机", "等待机会", "花更多时间来决定", "再多考虑", "你可能要放弃些东西", "考虑下别人的感受", "这事不靠谱", "别让它影响到你", "做能让你快乐的那个决定", "扫清障碍", "不要觉得忧虑", "主动一点", "时间会给你答案", "现在就开始", "别犹豫", "决定了就做", "显而易见的结果", "保存实力", "时机还不成熟", "你需要掌握更多的信息", "去找个人倾诉", "你需要去探索真相", "把握机会", "决定了就坚持", "很麻烦2现在比以往任何时候的情况都要好", "重新思考", "列出原因", "期待一下,令人期待的事情马上会发生", "培养一项新的爱好", "走容易走的路", "时间不对", "给自己点时间", "坦诚相告", "著眼未来", "信任", "别傻傻等待", "希望渺茫", "需要新的开始", "其实你已经有了答案", "听听别人的建议", "试著放弃", "不要犹豫", "趁早放弃", "再努力一些", "忘掉过去", "可以", "值得一试", "抓住机会", "不要尝试", "听长辈的建议", "不要坚持", "你可以的", "不靠谱", "打消念头", "等待机会", "重新计划", "重新开始", "摆脱现在的环境", "建议多次尝试", "需要休息一下再决定", "冷静思考再决定", "珍惜他或者她", "坦白一切", "努力一下", "主动出击", "不要太主动", "冷静处理", "谨慎做决定", "独立面对", "从过去寻找答案", "多和家人沟通", "多和朋友沟通", "暗中观察", "不太确定", "没太大可能", "没什么把握", "学会放弃", "放弃这个念头", "不值得一试", "风险很大", "不要再浪费时间", "做多重计划", "再坚持一下", "不能继续下去", "不会有结果", "结果不会让你满意", "结果出乎你的意料", "坚持就有结果", "付诸行动", "你会成功", "成功率很高", "没问题", "耐心处理", "不要主动出击", "好运马上来了", "会有变化", "无济于事", "是个好主意", "不太稳妥", "放空自己", "信任", "相信自己的判断", "坚持就能看见真理", "会有转折", "会有改变", "相信自己的第一直觉", "定下目标", "学会独立思考", "学会舍得", "继续前行", "不惧未来", "需要些时间", "还有更好的选择", "不合适", "结果不理想", "抓住新的机会", "寻找新的机会", "寻找更好的方法", "听取家人的建议", "接受它", "当面沟通", "多次尝试", "你一定会成功", "可以确定是的", "不重要", "错误的想法", "争取机会", "或许很难", "放心去尝试", "没有好结果", "花点时间处理", "坚持自己的想法", "多方面思考再决定", "别犹豫", "思考风险再决定", "有希望", "不要失去信心", "摆脱现在的关系", "十分困难", "需要一些准备", "需要条件", "改变自己再决定", "参考朋友的建议", "分享想法会有收获", "不算是", "考虑全面", "非常肯定", "也许希望很小", "不是最佳选择", "再找找别的办法", "趁早放弃", "一定要坚持", "时间会改变一切", "充实自己再做决定", "从回忆中找答案", "不可以尝试", "不要做让自己后悔的事", "不做你会后悔", "抓紧行动", "机不可失", "等待好机会", "整理思路", "可以确定", "控制自己", "做充分准备", "需要好的建议", "幷没有那么好", "不是最好的选择", "不要抱太大希望", "完全正确", "很遗憾", "这不是一个好办法", "不能否认", "千真万确", "一定是", "完全肯定", "寻找可能", "细心观察", "勇于面对", "为未来做打算", "背向而驰", "凭借自己的直觉", "深思熟虑再决定", "不是唯一的选择", "最好的选择", "找个人给你点意见", "请教你妈妈", "谁说的准呢先观望著", "把心踹怀里", "答案在镜子里", "这事儿不靠谱", "天上要掉馅饼了", "有好运", "要有耐心", "你需要知道真相", "还有另一种情况", "观望", "别让他影响到你", "照你想做的那样去", "但行好事莫问前程", "走容易走的路", "试试卖萌", "借助他人的经验", "再多考虑", "机会稍纵即逝", "制定一个新计划", "GO", "情况很快会发生变化", "转移你的注意力", "告诉自己什么是最重要的", "为什么不", "别傻等了", "不要忘记", "WHY", "NOT", "去解决", "寻找更多的选择8上帝为你关一扇门必定会为你开一扇窗", "随波逐流未必是好事", "问天问大地不如问问自己", "你就是答案", "去争取机会", "改变不了世界就改变自己", "主动一点人生会大不相同", "学会妥协", "掌握更多信息", "相信你的最初想法", "勿忘初心方得始终", "扫清障碍", "把重心放在工作学习上", "培养一项新的爱好", "对他人慷慨", "去做其他的事情", "观察形势", "休息休息一会儿", "这是你最后的机会", "再考虑一下", "幷不明智", "等待更好的", "很快能解决", "重要", "去做", "不要过火", "事情开始变得有趣了", "保存你的实力", "不确定因素有点多", "结果不错,你可能不得不放弃其他东西", "不要忧虑", "不需要", "去倾诉,告诉别人这对你意味著什么", "无论你做何种选择结果都是对的", "保持头脑清醒", "克服困难", "实际一点", "你需要一点帮助", "协作", "寻找更多的选择", "负责", "阻止", "你必须现在就行动", "遵守规则", "坚持", "需要花点时间", "你不会失望", "不要迫于压力而改变初衷", "不要忽略身边的人", "抗拒", "不值得斗争", "玩得开心就好", "毋庸置疑", "你也许会失望", "去改变", "一个强有力的承诺将会换回更好的结果", "也许有更好的解决方案", "不要害怕", "想法太对选择太少", "一笑而过", "取决于你的选择", "随他去", "你需要考虑其他方面", "一年后就不那么重要了", "醒醒吧别做梦了", "意义非凡", "默数十秒再问我", "去行动", "发挥你的想像力", "保持冷静", "你必须弥补这个缺点", "你会后悔的", "毫无疑问", "当然", "现在比以往任何时候的情况都要好", "相信你的直觉", "这是一个机会", "去问你爸爸", "从来没有", "寻找一个指路人", "去尝试", "荒谬", "不赌", "不值得冒险", "不妥协", "关注你的家庭生活", "肯定", "不可预测", "绝对不", "我确定", "尽早完成,令人期待的事情马上就要发生", "你需要适应", "表示怀疑", "它会带来好运", "看看会发生什么", "记录下俩", "不宜在这个时候", "决定了就去做", "别要求太多", "放弃第一个方案", "Hold不住", "谨慎小心", "注意细节", "注意身后", "不要犹豫", "继续前行", "情况很快会发生改变", "不要被情绪左右", "转移注意力", "著眼未来", "问自己什么是最重要的", "不要等了", "保持乐观", "没有更好的选择", "你需要主动", "妥协", "有比这更重要的东西", "你需要掌握更多的信息", "删除记忆", "专注于你的工作", "你需要考虑其他的方面", "相信自己的直觉", "形势不明", "先让自己休息", "重新考虑", "不要做的太过分", "保持现状/有意料之外的事会发生不妨等待", "花更多的时间来决定", "你开心就好", "有风险但也有机会", "算了吧", "当然咯", "千万别傻,保持你的好奇心去挖掘真相", "把心揣怀里", "时机不对", "照你想做的那样去做", "量力而行", "抛弃首选方案", "最佳方案不一定可行", "注意细节", "说出来吧", "谁都不能保证", "不要陷得太深", "至关重要", "这是一定的", "不妨赌一把", "需要多思考一下", "这个问题确实不好回答", "其实都还不错", "你认为好的那个", "或许还没有", "没有足够的条件", "目前不满足", "可以接受", "停止", "对比一下再决定", "勿忘初心", "不重要", "多读书少思考", "放弃第一个选择", "不该坚持", "学会放弃", "舍得才有机会获得", "你是对的", "你值得这么做", "没有你想的那么简单", "不会更糟糕", "别骗自己", "想太多了", "睡一觉再决定", "不是最佳选择", "不合适", "把注意力转移一下", "不要强求", "时间会告诉你答案", "这件事不好回答", "要看你自己", "这个问题没有答案", "你懂得，不用问我", "用心去做", "不能言传", "改变自己", "无所谓", "全力以赴", "争取早日摆脱", "显而易见的道理", "没有理由拒绝", "想想未来吧", "开心就好", "及时行乐", "看情况再说", "不听老人言，吃亏在眼前", "无须多言", "熬过去就好", "一切都是好的", "是非难辨", "搞不清楚状况", "不要太乐观", "用心感受", "嗯", "明天就有变化", "等一周再说", "都可以", "都值得去做", "太早决定不好", "别怀疑自己", "你要果断一些", "静观其变", "看起来不靠谱", "放轻松", "不想要就趁早放弃", "寻找新的开始", "都可以", "放下吧", "忽略别人的看法", "不需要解释", "爱拼才会赢", "让他、她知道", "其他选择", "没有意义", "你的答案在心里", "换位思考", "尝试新的生活", "接受它", "一切都是最好的安排", "完美", "不要放纵自己", "跟随大众的审美", "不太满意的结果", "没有更好的选择", "坚持到底", "不要", "随心所欲", "大胆去做", "听人劝吃饱饭", "你还是不够努力", "不要欺骗自己", "注意细节", "珍惜现在", "让别人替你分担", "分享会有惊喜", "走下去", "淘汰它", "心诚则灵", "行与不行一试便知", "真心对待", "最后的决定", "二选一，选前者", "找人帮你做", "相信大家的眼光", "难得糊涂", "从现在开始努力", "回头是岸", "求同存异", "或许还不是时候", "先苦后甜", "树立信心再来一次", "过了这村没这店", "运气不佳不建议做", "别一条路走到黑", "别再委屈自己", "多看看外面的世界", "问下你们老师", "这是个问题嘛？", "无法回答", "相信科学", "少吃多动就会有收获", "干嘛想不开来笑一个", "谁也帮不了你", "了解自己的人会给你答案", "没效果", "言多必失", "敞开心扉", "梳理一下再决定", "想想得了", "最后的疼爱是手放开", "别想那么多没用的", "没用的", "不起作用", "适得其反", "空说无用", "没什么不妥", "长点心吧", "还有别的选择嘛？", "别往心里去", "控制自己", "今生无缘", "幸福快来了", "不是现在这个人、事、物", "再给自己一次机会", "未必适合你", "没问题的", "不计得失方能成功", "爱干嘛就干嘛", "分散注意力", "缓解压力继续前行", "说多无益", "别胆少", "直接点", "只有你最清楚", "问问你闺蜜或基友", "看样子是不行", "没什么差别", "摸著自己的胸再问一次", "亲爱的那是不可能的", "反正也不会实现", "无所谓了", "试一次就知道", "别怕麻烦", "自己拿主意吧", "别人说的话随便听一听", "我也帮不上忙", "和昨天一样", "别忘了你的承诺", "恐怕来不及", "反复无常", "不要自讨苦吃", "不要自讨没趣", "枉然", "取长补短", "不能硬来", "不明智的选择", "犯不著", "理清头绪答案就有了", "放轻松再问一遍", "你喜欢的就是好的", "如果有选择我选第一个", "做自己喜欢的事", "很重要的事情要花点功夫", "对自己好一点", "爱惜自己", "没有对比就没有伤害", "醒醒吧", "不要轻易放弃", "浪费功夫", "依赖别人也不是办法", "别人帮不了你", "没有办法感同身受", "不要好了伤疤忘了疼", "要矜持点", "简单易行的方式", "找值得信赖的人谘询", "少点套路", "什么都没有把握", "主意不错哦", "要有野心", "好景不长", "不要自寻烦恼", "清理自己的过去", "提高自己", "谁也做不了你的主", "这个还真不好说", "给自己一点压力", "别管对错去做吧", "你需要点套路", "懒得想不如简单点", "看开一点", "支持你", "不适合你的", "你这么好看说什么都对", "多读书少提问", "活在当下", "别灰心再试一下", "没有绝对的答案", "不存在优势", "抓住重点", "这跟我没关系", "好主意", "搞不定", "想想就好，别冲动", "鼓励一下，你行滴", "无疑是一个好选择", "看情况咯", "费尽心思也无济于事", "性格不合", "试试卖萌、耍酷", "冷静冷静", "主动联系", "一包辣条压压惊", "痛苦的选择", "离开", "顾及别人感受", "傻人有傻福", "一切从简", "重新考虑一下", "千万小心", "太天真", "别想太多啦", "忍一忍就过去了", "何必认真", "都是缘分", "提醒自己过去的事", "随你吧", "这不重要吧", "你说对了呢", "仁者见仁智者见智", "无解", "是个谜", "无所谓", "不要反复果断点", "不要感情用事", "放手一搏", "什么都不用做", "转机马上到了", "要敢于直面现实", "改变不了自己，就放弃", "接受现状", "可能不会有", "现实很残酷", "不知道啊", "你一定是对的", "跟以前一样", "还是老样子", "不如让自己开心一点", "糟糕", "猜不透就不猜", "别理睬", "忍", "阳光总在风雨后", "小心为上", "不提也罢", "不该问我，问问自己", "想不通就明天再想", "问你身边的异性", "问你身边的朋友", "问你身边的同性", "答案即将揭晓", "肯定没戏", "别抱太大希望", "慢慢来", "不必在乎", "没有准确答案", "如往常一样", "没什么不妥", "安心去做", "抓紧实现", "你搞不定", "这个问题没有答案", "需要找个专家问问", "乐观面对", "不要做鸵鸟", "清醒地认识自己", "摆脱一切干扰", "试试手气重新来过", "别让自己变得不像自己", "别著急，再好好想想", "问天问地不如问问自己", "毫无意义的事", "不要强加于人", "及时行乐", "与人沟通，会有收获", "乐趣在于探索", "找不到相关的信息", "大胆提出建议", "无话可说", "别忘了自己的梦想", "说好的独立解决呢", "拒绝回答一切问题", "不太想管你这种闲事", "安心的去做", "难道告诉你结果不妙嘛", "无聊的问题", "别人说的都对", "好人有好报", "祈祷一下，就会有奇迹", "不够虔诚，重新问一次", "不要骗自己", "很尴尬的局面", "没必要坚持", "放手一搏", "换个角度思考", "神仙都帮不了你", "心灵鶏汤救不了你", "远水救不了近火", "更多选择更多欢笑", "软硬兼施", "全面推进", "妥协吧", "只是时间问题罢了", "天时地利只欠人和", "等风来", "回家问你妈妈", "不一定是你满意的结果", "强扭的瓜不甜", "真的未必能做到", "没可能完成", "尝试三次不行就撤", "谁说你不行，去他打", "你怎样做都是错,真理永远掌握在少数人手中", "别犹豫加油做", "去吧，不然会后悔", "智者是不需要任何答案的", "反向思考", "淡定", "不知道", "找个人请教一下", "话听三分", "你的地盘你做主", "这个问题太深奥", "决定了就去做"]

module.exports = {
	rollDiceCommand,
	initialize,
	getHelpMessage,
	prefixs,
	gameType,
	gameName,
	discordCommand
};