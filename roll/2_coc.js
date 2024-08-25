"use strict";
const rollbase = require('./rollbase.js');
const schema = require('../modules/schema.js');
const checkTools = require('../modules/check.js');
const checkMongodb = require('../modules/dbWatchdog.js');
const mathjs = require('mathjs');
const gameName = function () {
	return '【克苏鲁神话】 cc cc(n)1~2 ccb ccrt ccsu .dp .cc7build .cc6build .cc7bg'
}
const { SlashCommandBuilder } = require('discord.js');
const gameType = function () {
	return 'Dice:CoC'
}
const prefixs = function () {
	return [{
		first: /(^\.cccc$)|(^\.ccdr$)|(^\.ccpc$)|(^ccrt$)|(^\.chase$)|(^ccsu$)|(^cc7版创角$)|(^[.]dp$)|(^[.]cc7build$)|(^[.]ccpulpbuild$)|(^[.]cc6build$)|(^[.]cc7bg$)|(^cc6版创角$)|(^cc7版角色背景$)/i,
		second: null
	},
	{
		first: /(^\.sc$)|(^ccb$)|(^cc$)|(^ccn[1-2]$)|(^cc[1-2]$)|(^成长检定$)|(^幕间成长$)/i,
		second: /(^\d+)|(^help$)/i
	}
	]
}
const getHelpMessage = function () {
	return `【克苏鲁神话】
coc6版掷骰		： ccb 80 技能小于等于80
coc7版掷骰		： cc 80 技能小于等于80
coc7版奖励骰	： cc(1~2) cc1 80 一粒奖励骰
coc7版惩罚骰	： ccn(1~2) ccn2 80 两粒惩罚骰
coc7版联合检定	： 
cc 80,40 侦查,斗殴 cc1 80,40 侦查,斗殴 ccN1 80,40 侦查,斗殴

coc7版SanCheck	： .sc (SAN值) (成功)/(失败)
eg: .sc 50		.sc 50 1/1d3+1		.sc 50 1d10/1d100

coc7版追逐战产生器(娱乐用): .chase
P.S.追逐战功能使用了可选规则及我对规则书之独断理解，
并不一定完全符合规则书内容，请自行衡量使用
建议使用前详细阅读规则书第七章追逐

coc7版 即时型疯狂： 启动语 ccrt
coc7版 总结型疯狂： 启动语 ccsu

coc7版 神话组织 随机产生： 启动语 .cccc
coc7版 神话资料 随机产生： 启动语 .ccdr
coc7版 施法推骰后果： 启动语 .ccpc

coc pulp版创角			： 启动语 .ccpulpbuild
coc6版创角				： 启动语 .cc6build
coc7版创角				： 启动语 .cc7build (岁数7-89)
coc7版随机创角			： 启动语 .cc7build random
coc7版自由分配点数创角	： 启动语 .cc7build .xyz (岁数7-89)
如.cc7build .752 
就会掷出
7次 3d6 * 5
5次 (2d6+6) * 5 
2次 3d6 * 5
可只输入.  不输入xyz
预设值为 .53 即5次 3d6 * 5 和3次 (2d6+6) * 5 

coc7 成长或增强检定： .dp 或 成长检定 或 幕间成长 (技能%) (名称) (可以一次输入多个)
例）.DP 50 骑乘 80 斗殴  70 60

coc7版角色背景随机生成： 启动语 .cc7bg

----2021/08/07新增----
成长检定纪录功能
开启后将会纪录你使用CC功能投掷成功和大成功大失败的技能，
然后可以呼叫出来进行自动成长。
.dp start 	： 开启纪录功能
.dp stop  	： 停止纪录功能
.dp show  	： 显示掷骰纪录
.dp showall	： 显示全频道所有大成功大失败掷骰纪录
.dp auto  	： 进行自动成长并清除掷骰纪录
.dp clear 	： 清除掷骰纪录
.dp clearall： 清除掷骰纪录包括大成功大失败
`
}
const initialize = function () {
	return {};
}

const rollDiceCommand = async function ({
	mainMsg,
	groupid,
	userid,
	userrole,
	channelid,
	displayname,
	displaynameDiscord,
	tgDisplayname,
	botname
}) {
	let rply = {
		default: 'on',
		type: 'text',
		text: ''
	};
	let trigger = mainMsg[0].toLowerCase();
	switch (true) {
		case (/^help$/i.test(mainMsg[1])): {
			rply.text = this.getHelpMessage();
			rply.quotes = true;
			break;
		}
		case /^ccrt$/i.test(mainMsg[0]): {
			rply.text = ccrt();
			rply.quotes = true;
			break;
		}
		case /^ccsu$/i.test(mainMsg[0]): {
			rply.text = ccsu();
			rply.quotes = true;
			break;
		}
		case /^\.sc$/i.test(mainMsg[0]): {
			let sc = new SanCheck(mainMsg, botname);
			rply.text = sc.run();
			rply.buttonCreate = sc.getButton();
			rply.quotes = true;
			break;
		}
		case /^\.chase$/i.test(mainMsg[0]): {
			rply.text = chase();
			rply.quotes = true;
			break;
		}
		case (trigger == 'ccb' && mainMsg[1] <= 1000): {
			rply.text = coc6(mainMsg[1], mainMsg[2]);
			break;
		}
		//DevelopmentPhase幕间成长指令开始於此
		case /^\.dp$/i.test(mainMsg[0]) && /^start$/i.test(mainMsg[1]): {
			if (rply.text = checkTools.permissionErrMsg({
				flag: checkTools.flag.ChkChannelAdmin,
				gid: groupid,
				role: userrole
			})) {
				return rply;
			}
			rply.text = await dpRecordSwitch({ onOff: true, groupid, channelid });
			rply.quotes = true;
			return rply;
		}
		case /^\.dp$/i.test(mainMsg[0]) && /^stop$/i.test(mainMsg[1]): {
			if (rply.text = checkTools.permissionErrMsg({
				flag: checkTools.flag.ChkChannelAdmin,
				gid: groupid,
				role: userrole
			})) {
				return rply;
			}
			rply.text = await dpRecordSwitch({ onOff: false, groupid, channelid });
			rply.quotes = true;
			break;
		}
		case /^\.dp$/i.test(mainMsg[0]) && /^show$/i.test(mainMsg[1]): {
			if (rply.text = checkTools.permissionErrMsg({
				flag: checkTools.flag.ChkChannel,
				gid: groupid
			})) {
				return rply;
			}

			let switchOn = await schema.developmentConductor.findOne({
				groupID: channelid || groupid,
				switch: true
			}).catch(error => console.error('coc #149 mongoDB error: ', error.name, error.reson));
			if (!switchOn) {
				rply.text = '本频道未开启CC记录功能, 请使用 .dp start 开启'
				return rply;
			}
			let result = await schema.developmentRollingRecord.find({
				groupID: channelid || groupid,
				userID: userid,
			}).sort({ date: -1 }).catch(error => console.error('coc #157 mongoDB error: ', error.name, error.reson));
			rply.quotes = true;
			if (!result || result.length == 0) {
				rply.text = '未有CC掷骰记录';
				return rply;
			}
			let successResult = {
				data: false,
				text: `成功的掷骰结果`
			};
			let successResultWithoutName = {
				data: false,
				text: `=======
				无记名成功结果`}
				;
			let criticalSuccessNfumbleResult = {
				data: false,
				text: `=======
				大成功与大失败`}
				;
			for (let index = 0; index < result.length; index++) {
				if (result[index].skillPerStyle == 'normal' && result[index].skillName) {
					successResult.data = true;
					successResult.text += `
					「${result[index].skillName}」	${result[index].skillPer} - ${result[index].date.getMonth() + 1}月${result[index].date.getDate()}日 ${result[index].date.getHours()}:${(result[index].date.getMinutes() < 10) ? '0' + result[index].date.getMinutes() : result[index].date.getMinutes()}`
				}
				if (result[index].skillPerStyle == 'normal' && !result[index].skillName) {
					successResultWithoutName.data = true;
					successResultWithoutName.text += `
					「无名技能」	${result[index].skillPer} - ${result[index].date.getMonth() + 1}月${result[index].date.getDate()}日 ${result[index].date.getHours()}:${(result[index].date.getMinutes() < 10) ? '0' + result[index].date.getMinutes() : result[index].date.getMinutes()}`
				}
				if (result[index].skillPerStyle == 'criticalSuccess' || result[index].skillPerStyle == 'fumble') {
					criticalSuccessNfumbleResult.data = true;
					criticalSuccessNfumbleResult.text += `
					${(result[index].skillName) ? '「' + result[index].skillName + '」' : '「无名技能」'} ${result[index].skillPer} - ${result[index].date.getMonth() + 1}月${result[index].date.getDate()}日 ${result[index].date.getHours()}:${(result[index].date.getMinutes() < 10) ? '0' + result[index].date.getMinutes() : result[index].date.getMinutes()} - ${(result[index].skillPerStyle == 'criticalSuccess') ? '大成功' : '大失败'}`
				}

			}
			/**
			 * 成功的掷骰结果
			 * =======
			 * 空手 50	拳擊 60	拳	80
			 * 空手 50	拳擊 60	拳	80 	
			 * =======
			 * 无記名成功结果
			 * 21-08-04 12:33 技能	80
			 * 21-08-04 13:33 技能	80
			 * =======
			 * 大成功与大失败
			 * 技能	80	大失败
			 * 拳	80	大成功
			 */

			(successResult.data) ? rply.text += `${successResult.text}\n` : null;
			(successResultWithoutName.data) ? rply.text += `${successResultWithoutName.text}\n` : null;
			(criticalSuccessNfumbleResult.data) ? rply.text += `${criticalSuccessNfumbleResult.text}\n` : null;
			return rply;
		}

		case /^\.dp$/i.test(mainMsg[0]) && /^showall$/i.test(mainMsg[1]): {
			if (rply.text = checkTools.permissionErrMsg({
				flag: checkTools.flag.ChkChannel,
				gid: groupid,
			})) {
				return rply;
			}
			let switchOn = await schema.developmentConductor.findOne({
				groupID: channelid || groupid,
				switch: true
			}).catch(error => console.error('coc #224 mongoDB error: ', error.name, error.reson));
			if (!switchOn) {
				rply.text = '本频道未开启CC记录功能, 请使用 .dp start 开启'
				return rply;
			}
			let result = await schema.developmentRollingRecord.find({
				groupID: channelid || groupid,
				userID: userid,
				$or: [{
					skillPerStyle: 'criticalSuccess'
				}, {
					skillPerStyle: 'fumble'
				}]
			}).sort({ userName: -1 }).catch(error => console.error('coc #237 mongoDB error: ', error.name, error.reson));
			rply.quotes = true;
			let criticalSuccessNfumbleResult = {
				data: false,
				text: `大成功与大失败
				=======`}
				;
			for (let index = 0; index < result.length; index++) {
				if (result[index].skillPerStyle == 'criticalSuccess' || result[index].skillPerStyle == 'fumble') {
					criticalSuccessNfumbleResult.data = true;
					criticalSuccessNfumbleResult.text += `
					${(result[index].userName) ? result[index].userName : '「无名使用者」'} ${(result[index].skillName) ? result[index].skillName : '「无名技能」'} ${result[index].skillPer} - ${result[index].date.getMonth() + 1}月${result[index].date.getDate()}日 ${result[index].date.getHours()}:${(result[index].date.getMinutes() < 10) ? '0' + result[index].date.getMinutes() : result[index].date.getMinutes()} - ${(result[index].skillPerStyle == 'criticalSuccess') ? '大成功' : '大失败'}`
				}

			}
			(criticalSuccessNfumbleResult.data) ? rply.text += criticalSuccessNfumbleResult.text : rply.text += "本频道未有相关记录, 请多些掷骰吧!";
			return rply;
		}
		case /^\.dp$/i.test(mainMsg[0]) && /^auto$/i.test(mainMsg[1]): {
			rply.quotes = true;
			if (rply.text = checkTools.permissionErrMsg({
				flag: checkTools.flag.ChkChannel,
				gid: groupid,
			})) {
				return rply;
			}

			let switchOn = await schema.developmentConductor.findOne({
				groupID: channelid || groupid,
				switch: true
			}).catch(error => console.error('coc #264 mongoDB error: ', error.name, error.reson));
			if (!switchOn) {
				rply.text = '本频道未开启CC记录功能, 请使用 .dp start 开启'
				return rply;
			}

			let result = await schema.developmentRollingRecord.find({
				groupID: channelid || groupid,
				userID: userid,
				skillPerStyle: 'normal'
			}).sort({ date: -1 }).catch(error => console.error('coc #274 mongoDB error: ', error.name, error.reson));
			if (!result || result.length == 0) {
				rply.text = '未有CC掷骰记录';
				return rply;
			}
			rply.text = `自动成长检定\n========`;
			for (let index = 0; index < result.length; index++) {
				let target = Number(result[index].skillPer);
				let name = result[index].skillName || '无名技能';
				let skill = rollbase.Dice(100);
				let confident = (target <= 89) ? true : false;
				if (target > 95) target = 95;
				if (skill >= 96 || skill > target) {
					let improved = rollbase.Dice(10);
					rply.text += `\n1D100 > ${target} 掷出: ${skill}  →  「${name}」成长成功! 技能增加 ${improved} 点，现在是 ${target + improved} 点。- ${result[index].date.getMonth() + 1}月${result[index].date.getDate()}日 ${result[index].date.getHours()}:${(result[index].date.getMinutes() < 10) ? '0' + result[index].date.getMinutes() : result[index].date.getMinutes()}`

					if (confident && ((target + improved) >= 90)) {
						rply.text += `\n调查员的技能提升到90%以上，他的当前理智值增加${rollbase.Dice(6) + rollbase.Dice(6)}点。`
					}
				} else {
					rply.text += `\n1D100 > ${target} 掷出: ${skill}  →  「${name}」 成长失败!  - ${result[index].date.getMonth() + 1}月${result[index].date.getDate()}日 ${result[index].date.getHours()}:${(result[index].date.getMinutes() < 10) ? '0' + result[index].date.getMinutes() : result[index].date.getMinutes()}`
				}

			}
			await schema.developmentRollingRecord.deleteMany({
				groupID: channelid || groupid,
				userID: userid,
				skillPerStyle: 'normal'
			}).catch(error => console.error('coc #302 mongoDB error: ', error.name, error.reson));
			rply.text += `\n--------
			成长结束，已清除掷骰记录`
			return rply;
		}
		case /^\.dp$/i.test(mainMsg[0]) && /^clear$/i.test(mainMsg[1]): {
			if (rply.text = checkTools.permissionErrMsg({
				flag: checkTools.flag.ChkChannel,
				gid: groupid,
			})) {
				return rply;
			}

			let result = await schema.developmentRollingRecord.deleteMany({
				groupID: channelid || groupid,
				userID: userid,
				skillPerStyle: 'normal'
			}).catch(error => console.error('coc #316 mongoDB error: ', error.name, error.reson));

			rply.quotes = true;
			rply.text = `已清除 ${result.n}项记录, 如想大成功大失败记录也清除, 请使用 .dp clearall`
			return rply;
		}
		case /^\.dp$/i.test(mainMsg[0]) && /^clearall$/i.test(mainMsg[1]): {
			if (rply.text = checkTools.permissionErrMsg({
				flag: checkTools.flag.ChkChannel,
				gid: groupid,
			})) {
				return rply;
			}

			let result = await schema.developmentRollingRecord.deleteMany({
				groupID: channelid || groupid,
				userID: userid,
				$or: [{
					skillPerStyle: 'criticalSuccess'
				}, {
					skillPerStyle: 'fumble'
				}, {
					skillPerStyle: 'normal'
				}]

			}).catch(error => console.error('coc #338 mongoDB error: ', error.name, error.reson));
			rply.quotes = true;
			rply.text = `已清除你在本频道的所有CC掷骰记录, 共计${result.n}项`
			return rply;

		}
		case (trigger == '.dp' || trigger == '成长检定' || trigger == '幕间成长'): {
			rply.text = DevelopmentPhase(mainMsg);
			rply.quotes = true;
			break;
		}
		case (trigger == 'cc' && mainMsg[1] !== null): {
			rply.text = await coc7({ chack: mainMsg[1], text: mainMsg[2], userid, groupid, channelid, userName: tgDisplayname || displaynameDiscord || displayname });
			break;
		}
		case (trigger == 'cc1' && mainMsg[1] !== null): {
			rply.text = await coc7bp({ chack: mainMsg[1], text: mainMsg[2], userid, groupid, channelid, bpdiceNum: 1, userName: tgDisplayname || displaynameDiscord || displayname });
			break;
		}
		case (trigger == 'cc2' && mainMsg[1] !== null): {
			rply.text = await coc7bp({ chack: mainMsg[1], text: mainMsg[2], userid, groupid, channelid, bpdiceNum: 2, userName: tgDisplayname || displaynameDiscord || displayname });
			break;
		}
		case (trigger == 'ccn1' && mainMsg[1] !== null): {
			rply.text = await coc7bp({ chack: mainMsg[1], text: mainMsg[2], userid, groupid, channelid, bpdiceNum: -1, userName: tgDisplayname || displaynameDiscord || displayname });
			break;
		}
		case (trigger == 'ccn2' && mainMsg[1] !== null): {
			rply.text = await coc7bp({ chack: mainMsg[1], text: mainMsg[2], userid, groupid, channelid, bpdiceNum: -2, userName: tgDisplayname || displaynameDiscord || displayname });
			break;
		}

		case /(^cc7版创角$)|(^[.]cc7build$)/i.test(mainMsg[0]): {
			rply.text = builder.build(mainMsg[1] || 'random', mainMsg[2]).replace(/\*5/ig, ' * 5').trim();
			rply.quotes = true;
			break;
		}
		case /(^ccpulp版创角$)|(^[.]ccpulpbuild$)/i.test(mainMsg[0]): {
			rply.text = (buildpulpchar(mainMsg[1])).replace(/\*5/ig, ' * 5');
			rply.quotes = true;
			break;
		}
		case /(^cc6版创角$)|(^[.]cc6build$)/i.test(mainMsg[0]): {
			rply.text = build6char(mainMsg[1]);
			rply.quotes = true;
			break;
		}
		case /(^cc7版角色背景$)|(^[.]cc7bg$)/i.test(mainMsg[0]): {
			rply.text = PcBG();
			rply.quotes = true;
			break;
		}
		case /(^\.cccc)/i.test(mainMsg[0]): {
			rply.text = CreateCult.createCult();
			rply.quotes = true;
			return rply;
		};
		case /(^\.ccpc)/i.test(mainMsg[0]): {
			rply.text = MythoyCollection.getMythonData('pushedCasting');
			rply.quotes = true;
			return rply;
		};
		case /(^\.ccdr)/i.test(mainMsg[0]): {
			rply.text = MythoyCollection.getMythos();
			rply.quotes = true;
			return rply;
		};

		default:
			break;
	}
	return rply;
}
const discordCommand = [
	{
		data: new SlashCommandBuilder()
			.setName('ccrt')
			.setDescription('coc7版 即时型疯狂')
		,
		async execute() {
			return `ccrt`
		}
	}, {
		data: new SlashCommandBuilder()
			.setName('ccsu')
			.setDescription('coc7版 总结型疯狂')
		,
		async execute() {
			return `ccsu`
		}
	}, {
		data: new SlashCommandBuilder()
			.setName('ccb')
			.setDescription('coc6版掷骰')
			.addStringOption(option => option.setName('text').setDescription('目标技能大小及名字').setRequired(true)),
		async execute(interaction) {
			const text = interaction.options.getString('text')
			if (text !== null)
				return `ccb ${text}`
		}
	}, {
		data: new SlashCommandBuilder()
			.setName('cc')
			.setDescription('coc7版掷骰')
			.addStringOption(option => option.setName('text').setDescription('目标技能大小及名字').setRequired(true))
			.addStringOption(option =>
				option.setName('paney')
					.setDescription('奖励或惩罚骰')
					.addChoices({ name: '1粒奖励骰', value: '1' },
						{ name: '2粒奖励骰', value: '2' },
						{ name: '1粒惩罚骰', value: 'n1' },
						{ name: '2粒惩罚骰', value: 'n2' }))
		,
		async execute(interaction) {
			const text = interaction.options.getString('text')
			const paney = interaction.options.getString('paney') || '';

			return `cc${paney} ${text}`
		}
	}, {
		data: new SlashCommandBuilder()
			.setName('sc')
			.setDescription('coc7版SanCheck')
			.addStringOption(option => option.setName('text').setDescription('你的San值').setRequired(true))
			.addStringOption(option => option.setName('success').setDescription('成功扣多少San'))
			.addStringOption(option => option.setName('failure').setDescription('失败扣多少San')),
		async execute(interaction) {
			const text = interaction.options.getString('text')
			const success = interaction.options.getString('success')
			const failure = interaction.options.getString('failure')
			let ans = `.sc ${text}`
			if ((success !== null) && (failure !== null)) ans = `${ans} ${success}/${failure}`
			return ans;
		}
	},
	{
		data: new SlashCommandBuilder()
			.setName('build')
			.setDescription('创角功能')
			.addSubcommand(subcommand =>
				subcommand
					.setName('ccpulpbuild')
					.setDescription('pulp版创角'))
			.addSubcommand(subcommand =>
				subcommand
					.setName('cc6build')
					.setDescription('coc6版创角'))
			.addSubcommand(subcommand =>
				subcommand
					.setName('cc7build')
					.setDescription('coc7版创角').addStringOption(option => option.setName('age').setDescription('可选: (歲数7-89) 如果没有會使用随机开角')))

		,
		async execute(interaction) {
			const age = interaction.options.getString('age') || '';
			const subcommand = interaction.options.getSubcommand()
			if (subcommand !== null)
				return `.${subcommand} ${age}`
			return '.cc7build help';
		}
	}, {
		data: new SlashCommandBuilder()
			.setName('dp')
			.setDescription('coc7 成长或增强检定')
			.addStringOption(option => option.setName('text').setDescription('目标技能大小及名字').setRequired(true)),
		async execute(interaction) {
			const text = interaction.options.getString('text')
			return `.dp ${text}`
		}
	}, {
		data: new SlashCommandBuilder()
			.setName('dpg')
			.setDescription('coc7 成长检定记录功能')
			.addStringOption(option =>
				option.setName('mode')
					.setDescription('功能')
					.addChoices({ name: '显示掷骰记录', value: 'show' },
						{ name: '显示全频道所有大成功大失败掷骰记录', value: 'showall' },
						{ name: '开启记录功能', value: 'start' },
						{ name: '停止记录功能', value: 'stop' },
						{ name: '进行自动成长並清除掷骰记录', value: 'auto' },
						{ name: '清除掷骰记录', value: 'clear' },
						{ name: '清除掷骰记录包括大成功大失败', value: 'clearall' })
			),
		async execute(interaction) {
			const mode = interaction.options.getString('mode')
			return `.dp ${mode}`
		}
	}, {
		data: new SlashCommandBuilder()
			.setName('cc7bg')
			.setDescription('coc7版角色背景随机生成'),
		async execute() {
			return `.cc7bg`
		}
	}
	, {
		data: new SlashCommandBuilder()
			.setName('cccc')
			.setDescription('随机产生 神话组织')
		,
		async execute() {
			return `.cccc`
		}
	}, {
		data: new SlashCommandBuilder()
			.setName('ccdr')
			.setDescription('随机产生 神话资料')
		,
		async execute() {
			return `.ccdr`
		}
	}, {
		data: new SlashCommandBuilder()
			.setName('ccpc')
			.setDescription('施法推骰后果')
		,
		async execute() {
			return `.ccpc`
		}
	}
];

module.exports = {
	rollDiceCommand,
	initialize,
	getHelpMessage,
	prefixs,
	gameType,
	gameName,
	discordCommand
};

class CreateCult {
	constructor() {
	}
	/*
	回應格式
	==============
	Cult 产生器
	首领名字: XXXXXX

	首领身份:
	-> 1-10;
	
	属性: A-D STR, CON, SIZ, DEX, INT, APP, POW, and EDU
	
	技能: QUICK-REFERENCE SKILLS  A-E

	特质:  个性: 
	-1-100

	能力來源: 
	SOURCES OF POWER 1-3, 4-6, 7-8, 9-10
	==============
	邪教名稱?

	CULT GOALS—WANTS 1-10

	CULT GOALS—MEANS 1-10
	 */
	static createCult() {
		let cult = {
			leaderPosition: this.leaderPosition(),
			characteristics: this.characteristics(),
			skill: this.skill(),
			description: this.description(),
			personality: this.personality(),
			spells: this.spells(),
			sourcesOfPower: this.sourcesOfPower(),
			cultGoals: this.cultGoals(),
			cultGoalsMeans: this.cultGoalsMeans(),
		}
		let cultText = `Cult 产生器
	首领身份:
	${cult.leaderPosition}
	
	属性: 
	${cult.characteristics}
	
	技能: 
	${cult.skill}

	法术:
	${cult.spells}

	特质: 
	${cult.description}
	
	个性: 
	${cult.personality}

	能力來源: 
	${cult.sourcesOfPower}
	==============
	教派目标:
	${cult.cultGoals}

	实现目标的手段:
	${cult.cultGoalsMeans}`
		return cultText;
	}
	static leaderPosition() {
		return this.LeaderPosition[rollbase.Dice(10) - 1];
	}
	static characteristics() {
		//四选一
		let selectedCharacteristics = this.characteristicsSet[rollbase.Dice(4) - 1];
		// 使用 Fisher–Yates 洗牌算法随机排列属性
		selectedCharacteristics = this.FisherYates(selectedCharacteristics);
		let text = '';
		for (let i = 0; i < this.sixState.length; i++) {
			text += `${this.sixState[i]}: ${selectedCharacteristics[i]} `;
			if (i % 3 === 0 && i !== 0) {
				text += '\n';
			}
		}
		return text;
	}

	static skill() {
		let text = '';
		let skillStates = this.SkillStatesSet[rollbase.Dice(this.SkillStatesSet.length) - 1];
		//使用 Fisher–Yates 洗牌算法随机排列技能
		skillStates = this.FisherYates(skillStates);
		let skillNames = this.WightRandom(this.SkillNameSet(), Object.keys(this.SkillNameSet()).length);
		for (let i = 0; i < skillStates.length; i++) {
			text += `${skillNames[i]}: ${skillStates[i]} `;
			if (i % 3 === 0 && i !== 0) {
				text += '\n';
			}
		}
		return text;
	}
	static description() {
		return this.descriptionSet[rollbase.Dice(this.descriptionSet.length) - 1];
	}
	static personality() {
		return this.traitsSet[rollbase.Dice(this.traitsSet.length) - 1];
	}
	static spells() {
		let text = '';
		let num = 0;
		let spells = this.spellsSet[rollbase.Dice(this.spellsSet.length) - 1];
		text = rollbase.BuildDiceCal(spells);
		num = text.match(/\d+$/i)[0];
		text += '\n';
		text += ` ${this.getLeaderMythonList(num).join(', ')},`;
		text = text.replace(/,$/i, '');
		return text;
	}
	static getLeaderMythonList(count) {
		const shuffledArr = MythoyCollection.Magic.slice();
		for (let i = shuffledArr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
		}
		return shuffledArr.slice(0, count);
	}
	static sourcesOfPower() {
		let text = '';
		let num = rollbase.Dice(10);
		switch (num) {
			case 1: case 2: case 3:
				text = this.SourcesOfPowerSet[0];
				break;
			case 4: case 5: case 6:
				text = this.SourcesOfPowerSet[1];
				break;
			case 7: case 8:
				text = this.SourcesOfPowerSet[2];
				break;
			case 9: case 10:
				text = this.SourcesOfPowerSet[3];
				break;
		}
		return text;
	}
	static cultGoals() {
		return this.CultWants[rollbase.Dice(this.CultWants.length) - 1];
	}
	static cultGoalsMeans() {
		return this.CultMeans[rollbase.Dice(this.CultMeans.length) - 1];
	}
	static WightRandom(options, num_choices) {

		let choices = new Set();
		while (choices.size < num_choices) {
			let total_weight = 0;
			for (let j in options) {
				total_weight += options[j];
			}
			let rnd = Math.random() * total_weight;
			for (let j in options) {
				if (rnd < options[j]) {
					choices.add(j);
					options[j] = options[j] / 2;
					break;
				}
				rnd -= options[j];
			}
		}
		return Array.from(choices);
	}
	static FisherYates(arr) {
		for (let j = arr.length - 1; j > 0; j--) {
			const k = Math.floor(Math.random() * (j + 1));
			[arr[j], arr[k]] = [arr[k], arr[j]];
		}
		return arr;
	}

	static sixState = ["STR", "CON", "SIZ", "DEX", "INT", "APP", "POW", "EDU"]
	static characteristicsSet = [[75, 70, 65, 60, 55, 50, 40, 35],
	[80, 75, 70, 60, 55, 50, 40, 35],
	[90, 85, 80, 80, 70, 60, 60, 50],
	[100, 80, 60, 60, 45, 40, 35, 35]
	];

	static LeaderPosition = [
		`富有商人
	金錢就是力量。擁有成功的小企業者；跨國公司董事會上的一员；有權勢的電影製片人；投資銀行家等等。`,
		`家族女/男家长
	血緣是一种具有特殊且具有束縛力的連结。阿巴拉契亞山脈中一个廣大家族的古老祖母；一个大型且有貴族氣质的家庭的尊貴曾祖父；一位强大巫師的后裔；一对双胞胎的单親父或母。`,
		`幫派领導者
	罪犯有一种在雷达之下运作的方式——这种经驗可能在隱藏Cthulhu教派的活动时有所幫助。城市街头幫派的领導者；犯罪组织的老大；大規模的毒品卡特爾的领導者；其他孩子們景仰的正在冒出头角的街头小混混。`,
		`宗教领導者
	已经位於影響力的位置，可以接觸到大量的人群，其中一些人急需幫助，更容易受到欺詐和誘惑。
	这些宗教领袖可能免於課稅。主流宗教的神父，拉比，伊瑪目，或牧師。`,
		`大学教授/老師
	擁有接觸許多易受影響，年輕心灵的人的机會。一位高中老師或校长；擁有圖書館鑰匙的大学教授，圖書館內充满著陳舊的書冊；
	具有影響力的青年领袖，可帶领具有可被重新導向的活动组织的青年。`,
		`政治家
	政治影響力可以指導政策，甚至改變法律。市长或城市議會成员；州議會人员；州长甚至國家总統。 `,
		`農民/工廠工人
	"藍领" 宗教教派领袖可能对確保社會运作平穩的人有影響力，例如工廠员工，農村工人，建築行業和維修工人。`,
		`軍官
	在軍隊之中有个邪教是一个可怕的想法。可能是部隊中位階较高的官员，或者是在情報机構中的執行者，例如FBI或CIA，或是说，其他國家的相似机構。`,
		`船长 
	在海上，船长處於一个非常有威力的位置。可能是大型运输船的船长，一艘帆船，一艘商船，甚至是一艘郵輪的船长。`,
		`異类 
	这些人士在社會边緣活动，往往被忽視，例如巡迴銷售员，在家工作的網頁开发员，或者是一位藍调吉他手/歌手。`
	]

	static SkillStatesSet = [[80, 60, 60, 60, 50, 40],
	[100, 80, 60, 60, 50, 40],
	[90, 80, 70, 70, 60, 55],
	[80, 75, 70, 65, 65, 60, 60, 55, 55, 50, 40, 25],
	[90, 85, 75, 70, 60, 60, 60, 55, 50, 40, 30, 25]];

	static SkillNameSet() {
		return Object.assign({}, this.CombatSkills, this.CharacterSkills, this.UsefulSkills, this.ActionSkills);
	};
	static CombatSkills = { '闪避': 4, '斗殴': 2, '斗殴(刀/剑/棒)': 2, '射击（手枪）': 3, '投掷': 1 };//1
	static CharacterSkills = {
		'信用評级': 4, '人类学': 1, '估價': 1, '考古学': 2, '语言': 1, '法律': 1, '博物学': 1, '物理学': 1
	};//1
	static UsefulSkills = { '克苏鲁神话': 10, '心理学': 4, '巧手': 3, '锁匠': 2, '机械修理': 1, '驾驶汽車': 2, '乔装': 2, '艺术/工艺（演技）': 3 }
	static ActionSkills = { '侦查': 4, '话术': 1, '取悦': 3, '恐吓': 2, '说服': 1, '攀爬': 1, '跳跃': 1, '聆听': 1 }//1-5

	static descriptionSet = ['肌肉发达', '毛发蓬松', '眼神狂野', '全身冒汗', '牙齿状況差', '非常高大', '非常「平凡」外表', '瘦骨嶙峋', '衣著整洁无瑕', '眯著眼睛', '深邃的眼睛', '下垂的', '多疤痕', '瘢痕累累', '眼睛眼距近', '有皱纹', '刺青', '高额头', '雕刻般的', '眼睛深陷', '有胡子', '下巴双层', '鼻子歪曲', '突出的眉骨', '秃头', '修剪整齐的指甲', '娇小', '消瘦', '超重', '长满老茧的手', '细薄的头发', '长指甲', '细长的', '苗条', '运动型', '沾满墨水的手指', '丰满的头发', '小手', '怪诞', '湿疹', '口臭', '全身同色的衣服', '缺指', '狭长的脸', '干燥的皮肤', '高挑的', '穿耳环的', '脸颊凹陷', '丰满', '单眼', '尸体般的', '面具', '腐烂的', '缺少一肢', '无毛的', '疾病缠身的', '缩小的', '虚弱的', '高耸的', '骨瘦如柴的', '贫血的', '弯曲的', '佝偻的', '灵巧的', '笨重的', '苍白的', '野兽般的', '蜡色的', '狐狸般的', '脸庞像小天使的', '憔悴的', '令人厌恶的', '不老的', '肉感的', '枯萎的', '青筋浮现的皮肤', '纤维状', '拋光过的', '绷紧的', '时髦的', '丑陋的', '肮脏的', '强壮的', '纤细的', '结实的', '眼镜', '有吸引力的', '不修边幅的', '独眼镜', '华丽的', '普通的外表', '一头白发', '阴森的笑容', '老式的', '堂堂皇皇的', '弯腰驼背的', '华美的', '迷人的', '猫眼状的', '闪亮的眼睛']

	static traitsSet = ['浪漫', '不友善的', '好色', '冷漠', '傲慢', '无情', '挑剔', '固執', '自負', '心不在焉', '反覆无常', '好鬥', '粗鄙', '虐待狂', '神经质', '过分講究', '揮霍', '强迫', '矯揉造作', '自戀', '猶豫', '吝嗇', '不穩定', '掠奪成性', '魯莽', '悲慘的', '嫉妒的', '无禮的', '武斷的', '快活的', '极端的', '精密计算的', '吹噓的', '殘忍的', '討厌的', '糟糕的', '著迷', '敏感的', '和藹可親的', '有耐心的', '敏銳的', '幽默的', '親切的', '活潑的', '机智的', '有秩序的', '整洁的', '好奇的', '清醒的', '受过教育的', '精確', '即興', '穩定', '有野心', '專制', '嚴厲', '要求多', '真誠', '欺騙', '忠誠', '粗魯', '好爭吵', '尖酸刻薄', '难以寬恕', '粗糙', '不耐煩', '强烈', '杀人的', '疯狂的', '无憂无慮', '嚴格', '狡猾', '心不在焉', '神祕', '不道德的', '尷尬', '冷靜', '挫折', '親切', '操控他人', '癮君子', '完美主義者', '放松', '驕傲', '諷刺', '保守', '紧张', '虚榮', '嗜血', '急躁', '謹慎', '精力充沛', '衝动', '物质主義', '輕浮', '做作', '冷酷', '偏執', '过度情緒', '无情緒'];


	static spellsSet = ['1d4+1', '1d6+1d4+2', '3d6+4', '4d6+10'];
	static SourcesOfPowerSet = [`神话生物
	与神话生物如深潛者，人面鼠，修格斯，星之吸血鬼等有某种形式的关联。
	为了某种形式的服務或犧牲，怪兽保護並幫助教派领袖。`,
		`文物
	賦予法术般的能力，防護，攻擊方式或类似的物品(如充当魔法点数或甚至POW点数的存儲装置)。該文物可能來自地球之外或遠古时代。`,
		`科技
	也許來自Xoth (Cthulhu在來到地球前的家)，可能來自另一个維度或另一个世界，这种装置可能提供法术般效能，存儲魔法点数，可能是魔法武器，或者如盔甲一般提供防護。`,
		`授予的力量
	某种形式的「祝福」，由Cthulhu或其僕從植入教派领袖的心灵中。这种力量可能复製相同或降低的法术效果(通常为一半)所消耗的魔法点数或POW。这种力量也可能是另外的形式。
	某种形式的物理或感官變化：觸手從脸部或身体上生长，某种形式的物理或感官變化：觸手從脸部或身体上生长，鱗状皮肤護甲，高度的感官等等。`]


	static CultWants = [`財富
	无論是海洋中的金子、金融預測，還是寶貴的古代文物，邪教都相信Cthulhu會賦予某种形式的財富。这可能是对个人或团体具有特定且有幫助的東西。不要低估金錢的力量——它可以驅使人們做出最卑劣的行为。`,
		`魔法力量
	了解强大的咒语和儀式。这樣的魔法可能提供寶貴的洞察宇宙（高等学问）的知識，或者可能是控制和/或杀死他人——通过魔法掌控生命的力量。揭示现实祕密是一种令人陶醉且引人入勝的酒，許多人都會希望饗飽其间。或許，獲得魔法力量是达成更大目标的手段。`,
		`慾望
	可能意指伴侶关係或身体慾望和欲望。世界上有很多孤独的人，他們幾乎可以为了与他人建立联繫而做任何事。有些人沉迷於极致的快感，在邪教中成为會员，可以使他們的行为和慾望合法化。`,
		`救贖
	Cthulhu的崛起將帶來前所未有的恐懼和破壞。有些人相信，通过安撫Cthulhu，他們將能夠從这場大災难中幸免於难，他們是那些將在Cthulhu的統治下开创新时代的被选擇者。现在邪教所做的是讓人們購買他們所謂的拯救。`,
		`權力控制他人
	控制其他人：个人，一个组织，一个社區，一个城市，一个國家等。使人們順從邪教的意志是其使命的关鍵。也許是通过魔法，洗腦，或是微妙的条件製造。邪教希望人們为他們效力，这可能是为了推动某种计劃，或者只是邪教所認为Cthulhu要求的。
	`,
		`宇宙理解
	真理的追尋者，无論这真理有多驚悚或詛咒。"真理"有时候是主观的 - 主观越强，创造一个吸引人的故事就越好。知識就是力量。誰知道深入探索神话之謎會帶來什么结果。`,
		`暴力
	有些人希望看到世界燃燒。这些邪教徒以Cthulhu的名義杀人和傷害人。他們將自己的行为視为最終的自由，放棄道德以在Cthulhu的桌旁獲得一席之地 - 他們相信他們是人类发展的下一階段的先驅。有些人可能使用暴力作为实施更大计劃的手段，而其他人则將其用作掩蓋更可怕真相的幌子。`,
		`尋找解決方案
	看似善意的目标，如治療疾病，清除腐败的權威，理解人类行为 - 这些目标卻被Cthulhu的影響扭曲和腐败。善意的願望走向了黑暗。`,
		`恶习上癮
	为了满足某种成癮，无論是平凡的(藥物，賭博，權力等)或是源自神话（魔法，知識，變革等）。对某物成癮的人可能更容易被控制——这个邪教想要控制它的成员。`,
		`愛
	不要与肉体的親密混淆，愛是大多数人的强大驅动力。一个邪教可能利用对家人，伴侶，或者友情的愛來控制人們。也許愛的目标已经以某种方式扭曲了。也許这个邪教是出於对人类的愛而行动，以非常错误的方式试圖「拯救」世界。`]
	//手指
	static CultMeans = [
		`犧牲
		为了某种目的，教派信徒犧牲活的人类和/或动物。这可能是为了證明他們的忠誠，作为某种力量的來源，或是大计劃的一部分。`,
		`儀式
		为了进行一种或多种形式的儀式，需要一小群或大量的參与者。儀式可能完全为教派服務，或者是满足Cthulhu的意志以完成某事（无論大小）。`,
		`集结
		可能是收集知識（神祕学典籍）, 特定的資源，甚至是特定的人。教派必須为了Cthulhu只知的理由收集「某物」。`,
		`服務
		通过服務神祕神灵—与Cthulhu有連结的一个， 教派正在满足Cthulhu的意志。作为回報，教派將以某种方式得到实体的幫助。或者，教派已深陷於此实体之中，必須服從其命令。也許这个实体与Cthulhu没有实際的連结，但它宣稱有連结只是为了对教派獲得更多的權力。`,
		`创造
	这个邪教被命令要建造些什么。这可能是一个魔法之門，一个神秘的工艺品，一个可以集中巨大力量的地方，或者是一个寺廟。也許它只是创建一个秘密網絡，以便有一天接管一个城鎮，一个城市，一个國家，或者是世界。`,
		`摧毀
	邪教被命令去摧毀某物——也許是那些阻礙，激怒，或者傷害Cthulhu的東西。这可能是摧毀一座古老的寺廟，一个神秘的屏障，或者是推翻一个与Cthulhu的目标相牴觸的政府或组织。`,
		`转變
	邪教徒必須进行转變——无論身体還是心灵。人类的能力有限，无法完成Cthulhu的目标，或者对於即將到來的世界太过脆弱，所以邪教徒尋求將自己转變成更强大的存在。这可能是人类進化的新階段，或者是与神话同化，就像深海族那樣。`,
		`追獵並杀死
	摧毀Cthulhu的敵人，如某些人类的派系或另一个像那些上古之物这樣的神话种族，他們的行为是对抗的。这樣的存在可能成为Cthulhu恐怖计劃的问题。也許在追捕和杀死他們的目标时，邪教會得到些回報：吃掉他們的杀戮能給他們提供神话力量或洞見等等。`]
}



const oldArr = [15, 20, 40, 50, 60, 70, 80]
const DebuffArr = [5, 0, 5, 10, 20, 40, 80]
const AppDebuffArr = [0, 0, 5, 10, 15, 20, 25]
const EDUincArr = [0, 1, 2, 3, 4, 4, 4]


const OldArr2020 = [7, 8, 9, 10, 11, 12, 13, 14]
const EDUincArr2020 = [5, 10, 15, 20, 25, 30, 35, 40]

const PersonalDescriptionArr = ['结实的', '英俊的', '粗鄙的', '机灵的', '迷人的', '娃娃脸的', '聰明的', '蓬头垢面的', '愚鈍的', '肮脏的', '耀眼的', '有書卷氣的', '青春洋溢的', '感覺疲憊的', '丰满的', '粗壮的', '毛发茂盛的', '苗条的', '優雅的', '邋遢的', '敦实的', '苍白的', '阴沉的', '平庸的', '脸色紅潤的', '皮肤黝黑色', '满脸皱纹的', '古板的', '有狐臭的', '狡猾的', '健壮的', '娇俏的', '筋肉发达的', '魁梧的', '遲鈍的', '虚弱的'];
const IdeologyBeliefsArr = ['虔誠信仰著某个神祈', '覺得人类不需要依靠宗教也可以好好生活', '覺得科学可以解釋所有事，並对某种科学领域有独特的興趣', '相信因果循环与命运', '是一个政黨、社群或秘密结社的成员', '覺得这个社會已经病了，而其中某些病灶需要被剷除', '是神秘学的信徒', '是積极參与政治的人，有特定的政治立場', '覺得金錢至上，且为了金錢不擇手段', '是一个激進主義分子，活跃於社會运动'];
const SignificantPeopleArr = ['他的父母', '他的祖父母', '他的兄弟姐妹', '他的孩子', '他的另一半', '那位曾经教導调查员最擅长的技能（点数最高的職業技能）的人', '他的兒时好友', '他心目中的偶像或是英雄', '在游戏中的另一位调查员', '一个由KP指定的NPC'];
const SignificantPeopleWhyArr = ['调查员在某种程度上受了他的幫助，欠了人情', '调查员從他那裡学到了些什么重要的東西', '他給了调查员生活的意義', '调查员曾经傷害过他，尋求他的原諒', '和他曾有过无可磨滅的经驗与回憶', '调查员想要对他證明自己', '调查员崇拜著他', '调查员对他有著某些使调查员后悔的过往', '调查员试圖證明自己和他不同，比他更出色', '他讓调查员的人生變得亂七八糟，因此调查员试圖復仇'];
const MeaningfulLocationsArr = ['过去就讀的学校', '他的故鄉', '与他的初戀之人相遇之處', '某个可以安靜沉思的地方', '某个类似酒吧或是熟人的家那樣的社交場所', '与他的信念息息相关的地方', '埋葬著某个对调查员別具意義的人的墓地', '他從小长大的那个家', '他生命中最快樂时的所在', '他的工作場所'];
const TreasuredPossessionsArr = ['一个与他最擅长的技能（点数最高的職業技能）相关的物品', '一件他的在工作上需要用到的必需品', '一个從他童年时就保存至今的寶物', '一樣由调查员最重要的人給予他的物品', '一件调查员珍視的蒐藏品', '一件调查员无意间发现，但不知道到底是什么的東西，调查员正努力尋找答案', '某种体育用品', '一把特別的武器', '他的寵物'];
const TraitsArr = ['慷慨大方的人', '对动物很友善的人', '善於夢想的人', '享樂主義者', '甘冒風險的賭徒或冒險者', '善於料理的人', '萬人迷', '忠心耿耿的人', '有好名聲的人', '充满野心的人'];

/**
 * COC恐懼表
 */
const cocmadnessrt = [
	['1) 失憶（Amnesia）：调查员完全忘記了自上个安全地点以來的所有記憶。对他們而言，似乎一瞬间還在享用早餐，下一瞬卻面对著可怕的怪物。'],
	['2) 假性殘疾（Psychosomatic Disability）：调查员经历著心理上的失明、失聰或肢体缺失感，陷入无法自拔的困境。'],
	['3) 暴力傾向（Violence）：调查员在一陣狂暴中失去理智，对周圍的敵人与友方展开毫不留情的攻擊。'],
	['4) 偏執（Paranoia）：调查员经历著深重的偏執妄想，感覺到每个人都在暗中对他們施加威脅！没有一个人可被信任！他們被无形的目光監視；有人將他們背叛；所見的一切皆是詭计，萬事皆虚。'],
	['5) 人際依賴（Significant Person）：守秘人细心检視调查员背景中的重要人物条目。调查员误將場景中的另一人視为其重要人物，並基於这种错误的認知行动。'],
	['6) 昏厥（Faint）：调查员突然失去意識，陷入短暫的昏迷。'],
	['7) 逃避行为（Flee in Panic）：调查员在极度恐慌中，无論如何都想逃離当前的境地，即使这意味著奪走唯一的交通工具而撇下他人。'],
	['8) 歇斯底里（Physical Hysterics or Emotional Outburst）：调查员在情緒的漩渦中崩潰，表现出无法控制的大笑、哭泣或尖叫等极端情感。'],
	['9) 恐懼（Phobia）：调查员突如其來地产生一种新的恐懼症，例如幽閉恐懼症、恶灵恐懼症或蟑螂恐懼症。即使恐懼的來源並不在場，他們在接下來的輪数中仍會想像其存在，所有行动都將受到惩罚骰的影響。'],
	['10) 狂躁（Mania）：调查员獲得一种新的狂躁症，例如嚴重的洁癖强迫症、非理性的说謊强迫症或異常喜愛蠕蟲的强迫症。在接下來的輪数內，他們會不斷追求满足这种狂躁，所有行动都將受到惩罚骰的影響。']
];

const cocmadnesssu = [
	['1) 失憶（Amnesia）：调查员回过神來，发现自己身處一个陌生的境地，完全忘記了自己的身份。記憶將隨著时间的推移逐漸恢復。'],
	['2) 被盜（Robbed）：调查员在恢復意識后，驚覺自己遭到盜竊，身体卻无恙。如果他們攜帶了珍貴之物（見调查员背景），则需进行幸运检定以決定是否被竊取。其他所有有價值的物品则自动消失。'],
	['3) 遍体鱗傷（Battered）：调查员在醒來后，发现自己满身是傷，瘀傷累累。生命值減少至疯狂前的一半，但不會造成重傷。他們並未遭到盜竊，傷害的來源由守秘人決定。'],
	['4) 暴力傾向（Violence）：调查员陷入一場强烈的暴力与破壞的狂潮。当他們回过神來时，可能會意識到自己所做的事情，也可能完全失去記憶。调查员施加暴力的对象，以及是否造成死亡或僅僅是傷害，均由守秘人決定。'],
	['5) 极端信念（Ideology/Beliefs）：查看调查员背景中的信仰与信念。调查员將以极端且疯狂的方式表现出某种信念。例如，一位虔誠的信徒可能會在地鐵上高聲傳道。'],
	['6) 重要之人（Significant People）：考慮调查员背景中对其至关重要的人物及其原因。在那1D10小时或更久的时间內，调查员曾不顧一切地接近那个人，並努力加深彼此的关係。'],
	['7) 被收容（Institutionalized）：调查员在精神病院病房或警察局牢房中醒來，慢慢回想起導致自己被关押的经过。'],
	['8) 逃避行为（Flee in panic）：调查员恢復意識时，发现自己身處遙遠的地方，可能迷失在荒野，或是在开往未知目的地的列車或长途巴士上。'],
	['9) 恐懼（Phobia）：调查员突然獲得一种新的恐懼症。掷1D100以決定具体的恐懼症状，或由守秘人选擇。调查员醒來后，會开始採取各种措施以避开恐懼的源头。'],
	['10) 狂躁（Mania）：调查员獲得一种新的狂躁症。在表中掷1D100以決定具体的狂躁症状，或由守秘人选擇。在这次疯狂的发作中，调查员將全然沉浸於新的狂躁症状中。該症状是否对他人可見则取決於守秘人和调查员。']

];

const cocPhobias = [
	['1) 沐浴癖（Ablutomania）：執著於清洗自己。'],
	['2) 猶豫癖（Aboulomania）：病態地猶豫不定。'],
	['3) 喜暗狂（Achluomania）：对黑暗的过度熱愛。'],
	['4) 喜高狂（Acromaniaheights）：狂熱迷戀高處。'],
	['5) 親切癖（Agathomania）：病態地对他人友好。'],
	['6) 喜曠症（Agromania）：强烈地傾向於待在开闊空间中。'],
	['7) 喜尖狂（Aichmomania）：痴迷於尖銳或鋒利的物体。'],
	['8) 戀猫狂（Ailuromania）：近乎病態地对猫友善。'],
	['9) 疼痛癖（Algomania）：痴迷於疼痛。'],
	['10) 喜蒜狂（Alliomania）：痴迷於大蒜。'],
	['11) 乘車癖（Amaxomania）：痴迷於乘坐車輛。'],
	['12) 欣快癖（Amenomania）：不正常地感到喜悦。'],
	['13) 喜花狂（Anthomania）：痴迷於花朵。'],
	['14) 计算癖（Arithmomania）：狂熱地痴迷於数字。'],
	['15) 消費癖（Asoticamania）：魯莽衝动地消費。'],
	['16) 隱居癖（Eremiomania）：过度地熱愛独自隱居。'],
	['17) 芭蕾癖（Balletmania）：痴迷於芭蕾舞。'],
	['18) 竊書癖（Biliokleptomania）：无法克制偷竊書籍的衝动。'],
	['19) 戀書狂（Bibliomania）：痴迷於書籍和/或閱讀'],
	['20) 磨牙癖（Bruxomania）：无法克制磨牙的衝动。'],
	['21) 灵臆症（Cacodemomania）：病態地堅信自己已被一个邪恶的灵体占據。'],
	['22) 美貌狂（Callomania）：痴迷於自身的美貌。'],
	['23) 地圖狂（Cartacoethes）：在何时何處都无法控制查閱地圖的衝动。'],
	['24) 跳跃狂（Catapedamania）：痴迷於從高處跳下。'],
	['25) 喜冷症（Cheimatomania）：对寒冷或寒冷的物体的反常喜愛。'],
	['26) 舞蹈狂（Choreomania）：无法控制地起舞或发顫。'],
	['27) 戀床癖（Clinomania）：过度地熱愛待在床上。'],
	['28) 戀墓狂（Coimetormania）：痴迷於墓地。'],
	['29) 色彩狂（Coloromania）：痴迷於某种顔色。'],
	['30) 小丑狂（Coulromania）：痴迷於小丑。'],
	['31) 恐懼狂（Countermania）：執著於经历恐怖的場面。'],
	['32) 杀戮癖（Dacnomania）：痴迷於杀戮。'],
	['33) 魔臆症（Demonomania）：病態地堅信自己已被恶魔附身。'],
	['34) 抓撓癖（Dermatillomania）：執著於抓撓自己的皮肤。'],
	['35) 正義狂（Dikemania）：痴迷於目睹正義被伸张。'],
	['36) 嗜酒狂（Dipsomania）：反常地渴求酒精。'],
	['37) 毛皮狂（Doramania）：痴迷於擁有毛皮。'],
	['38) 贈物癖（Doromania）：痴迷於贈送禮物。'],
	['39) 漂泊症（Drapetomania）：執著於逃離。'],
	['40) 漫游癖（Ecdemiomania）：執著於四處漫游。'],
	['41) 自戀狂（Egomania）：近乎病態地以自我爲中心或自我崇拜。'],
	['42) 職業狂（Empleomania）：对於工作的无盡病態渴求。'],
	['43) 臆罪症（Enosimania）：病態地堅信自己帶有罪孽。'],
	['44) 学識狂（Epistemomania）：痴迷於獲取学識。'],
	['45) 靜止癖（Eremiomania）：執著於保持安靜。'],
	['46) 乙醚上癮（Etheromania）：渴求乙醚。'],
	['47) 求婚狂（Gamomania）：痴迷於进行奇特的求婚。'],
	['48) 狂笑癖（Geliomania）：无法自製地，强迫性的大笑。'],
	['49) 巫术狂（Goetomania）：痴迷於女巫与巫术。'],
	['50) 寫作癖（Graphomania）：痴迷於將每一件事寫下來。'],
	['51) 裸体狂（Gymnomania）：執著於裸露身体。'],
	['52) 妄想狂（Habromania）：近乎病態地充满愉快的妄想（而不顧现实状况如何）。'],
	['53) 蠕蟲狂（Helminthomania）：过度地喜愛蠕蟲。'],
	['54) 枪械狂（Hoplomania）：痴迷於火器。'],
	['55) 飲水狂（Hydromania）：反常地渴求水分。'],
	['56) 喜魚癖（Ichthyomania）：痴迷於魚类。'],
	['57) 圖标狂（Iconomania）：痴迷於圖标与肖像'],
	['58) 偶像狂（Idolomania）：痴迷於甚至願獻身於某个偶像。'],
	['59) 信息狂（Infomania）：痴迷於積累各种信息与資訊。'],
	['60) 射击狂（Klazomania）：反常地執著於射击。'],
	['61) 偷竊癖（Kleptomania）：反常地執著於偷竊。'],
	['62) 噪音癖（Ligyromania）：无法自製地執著於製造響亮或刺耳的噪音。'],
	['63) 喜綫癖（Linonomania）：痴迷於綫繩。'],
	['64) 彩票狂（Lotterymania）：极端地執著於購買彩票。'],
	['65) 抑鬱症（Lypemania）：近乎病態的重度抑鬱傾向。'],
	['66) 巨石狂（Megalithomania）：当站在石环中或立起的巨石旁时，就會近乎病態地寫出各种奇怪的创意。'],
	['67) 旋律狂（Melomania）：痴迷於音樂或一段特定的旋律。'],
	['68) 作詩癖（Metromania）：无法抑制地想要不停作詩。'],
	['69) 憎恨癖（Misomania）：憎恨一切事物，痴迷於憎恨某个事物或团体。'],
	['70) 偏執狂（Monomania）：近乎病態地痴迷与專注某个特定的想法或创意。'],
	['71) 誇大癖（Mythomania）：以一种近乎病態的程度说謊或誇大事物。'],
	['72) 臆想症（Nosomania）：妄想自己正在被某种臆想出的疾病折磨。'],
	['73) 記錄癖（Notomania）：執著於記錄一切事物（例如攝影）'],
	['74) 戀名狂（Onomamania）：痴迷於名字（人物的、地点的、事物的）'],
	['75) 稱名癖（Onomatomania）：无法抑制地不斷重复某个詞语的衝动。'],
	['76) 剔指癖（Onychotillomania）：執著於剔指甲。'],
	['77) 戀食癖（Opsomania）：对某种食物的病態熱愛。'],
	['78) 抱怨癖（Paramania）：一种在抱怨时産生的近乎病態的愉悦感。'],
	['79) 面具狂（Personamania）：執著於佩戴面具。'],
	['80) 幽灵狂（Phasmomania）：痴迷於幽灵。'],
	['81) 謀杀癖（Phonomania）：病態的謀杀傾向。'],
	['82) 渴光癖（Photomania）：对光的病態渴求。'],
	['83) 背德癖（ASPD）：病態地渴求違背社會道德。'],
	['84) 求財癖（Plutomania）：对財富的强迫性的渴望。'],
	['85) 欺騙狂（Pseudomania）：无法抑制的執著於撒謊。'],
	['86) 縱火狂（Pyromania）：執著於縱火。'],
	['87) 提问狂（Questiong-Asking Mania）：執著於提问。'],
	['88) 挖鼻癖（Rhinotillexomania）：執著於挖鼻子。'],
	['89) 塗鴉癖（Scribbleomania）：沉迷於塗鴉。'],
	['90) 列車狂（Siderodromomania）：認爲火車或类似的依靠軌道交通的旅行方式充满魅力。'],
	['91) 臆智症（Sophomania）：臆想自己擁有难以置信的智慧。'],
	['92) 科技狂（Technomania）：痴迷於新的科技。'],
	['93) 臆咒狂（Thanatomania）：堅信自己已被某种死亡魔法所詛咒。'],
	['94) 臆神狂（Theomania）：堅信自己是一位神灵。'],
	['95) 抓撓癖（Titillomaniac）：抓撓自己的强迫傾向。'],
	['96) 手术狂（Tomomania）：对进行手术的不正常愛好。'],
	['97) 拔毛癖（Trichotillomania）：執著於拔下自己的头发。'],
	['98) 臆盲症（Typhlomania）：病理性的失明。'],
	['99) 嗜外狂（Xenomania）：痴迷於异國的事物。'],
	['100) 喜兽癖（Zoomania）：对待动物的態度近乎疯狂地友好。']
];

const cocManias = [
	['1) 洗澡恐懼症（Ablutophobia）：对於洗滌或洗澡的恐懼。'],
	['2) 恐高症（Acrophobia）：对於身處高處的恐懼。'],
	['3) 飛行恐懼症（Aerophobia）：对飛行的恐懼。'],
	['4) 廣場恐懼症（Agoraphobia）：对於开放的（擁擠）公共場所的恐懼。'],
	['5) 恐鶏症（Alektorophobia）：对鶏的恐懼。'],
	['6) 大蒜恐懼症（Alliumphobia）：对大蒜的恐懼。'],
	['7) 乘車恐懼症（Amaxophobia）：对於乘坐地面載具的恐懼。'],
	['8) 恐風症（Ancraophobia）：对風的恐懼。'],
	['9) 男性恐懼症（Androphobia）：对於成年男性的恐懼。'],
	['10) 恐英症（Anglophobia）：对英格蘭或英格蘭文化的恐懼。'],
	['11) 恐花症（Anthophobia）：对花的恐懼。'],
	['12) 截肢者恐懼症（Apotemnophobia）：对截肢者的恐懼。'],
	['13) 蜘蛛恐懼症（Arachnophobia）：对蜘蛛的恐懼。'],
	['14) 闪電恐懼症（Astraphobia）：对闪電的恐懼。'],
	['15) 废墟恐懼症（Atephobia）：对遺迹或殘址的恐懼。'],
	['16) 长笛恐懼症（Aulophobia）：对长笛的恐懼。'],
	['17) 细菌恐懼症（Bacteriophobia）：对细菌的恐懼。'],
	['18) 導彈/子彈恐懼症（Ballistophobia）：对導彈或子彈的恐懼。'],
	['19) 跌落恐懼症（Basophobia）：对於跌倒或摔落的恐懼。'],
	['20) 書籍恐懼症（Bibliophobia）：对書籍的恐懼。'],
	['21) 植物恐懼症（Botanophobia）：对植物的恐懼。'],
	['22) 美女恐懼症（Caligynephobia）：对美貌女性的恐懼。'],
	['23) 寒冷恐懼症（Cheimaphobia）：对寒冷的恐懼。'],
	['24) 恐鐘錶症（Chronomentrophobia）：对於鐘錶的恐懼。'],
	['25) 幽閉恐懼症（Claustrophobia）：对於處在封閉的空间中的恐懼。'],
	['26) 小丑恐懼症（Coulrophobia）：对小丑的恐懼。'],
	['27) 恐犬症（Cynophobia）：对狗的恐懼。'],
	['28) 恶魔恐懼症（Demonophobia）：对邪灵或恶魔的恐懼。'],
	['29) 人群恐懼症（Demophobia）：对人群的恐懼。'],
	['30) 牙科恐懼症①（Dentophobia）：对牙醫的恐懼。'],
	['31) 丟弃恐懼症（Disposophobia）：对於丟弃物件的恐懼（貯藏癖）。'],
	['32) 皮毛恐懼症（Doraphobia）：对动物皮毛的恐懼。'],
	['33) 过馬路恐懼症（Dromophobia）：对於过馬路的恐懼。'],
	['34) 教堂恐懼症（Ecclesiophobia）：对教堂的恐懼。'],
	['35) 镜子恐懼症（Eisoptrophobia）：对镜子的恐懼。'],
	['36) 針尖恐懼症（Enetophobia）：对針或大头針的恐懼。'],
	['37) 昆蟲恐懼症（Entomophobia）：对昆蟲的恐懼。'],
	['38) 恐猫症（Felinophobia）：对猫的恐懼。'],
	['39) 过橋恐懼症（Gephyrophobia）：对於过橋的恐懼。'],
	['40) 恐老症（Gerontophobia）：对於老年人或變老的恐懼。'],
	['41)恐女症（Gynophobia）：对女性的恐懼。'],
	['42) 恐血症（Haemaphobia）：对血的恐懼。'],
	['43) 宗教罪行恐懼症（Hamartophobia）：对宗教罪行的恐懼。'],
	['44) 觸摸恐懼症（Haphophobia）：对於被觸摸的恐懼。'],
	['45) 爬蟲恐懼症（Herpetophobia）：对爬行动物的恐懼。'],
	['46) 迷霧恐懼症（Homichlophobia）：对霧的恐懼。'],
	['47) 火器恐懼症（Hoplophobia）：对火器的恐懼。'],
	['48) 恐水症（Hydrophobia）：对水的恐懼。'],
	['49) 催眠恐懼症①（Hypnophobia）：对於睡眠或被催眠的恐懼。'],
	['50) 白袍恐懼症（Iatrophobia）：对醫生的恐懼。'],
	['51) 魚类恐懼症（Ichthyophobia）：对魚的恐懼。'],
	['52) 蟑螂恐懼症（Katsaridaphobia）：对蟑螂的恐懼。'],
	['53) 雷鳴恐懼症（Keraunophobia）：对雷聲的恐懼。'],
	['54) 蔬菜恐懼症（Lachanophobia）：对蔬菜的恐懼。'],
	['55) 噪音恐懼症（Ligyrophobia）：对刺耳噪音的恐懼。'],
	['56) 恐湖症（Limnophobia）：对湖泊的恐懼。'],
	['57) 机械恐懼症（Mechanophobia）：对机器或机械的恐懼。'],
	['58) 巨物恐懼症（Megalophobia）：对於庞大物件的恐懼。'],
	['59) 捆綁恐懼症（Merinthophobia）：对於被捆綁或紧縛的恐懼。'],
	['60) 流星恐懼症（Meteorophobia）：对流星或隕石的恐懼。'],
	['61) 孤独恐懼症（Monophobia）：对於一人独處的恐懼。'],
	['62) 不洁恐懼症（Mysophobia）：对污垢或污染的恐懼。'],
	['63) 粘液恐懼症（Myxophobia）：对粘液（史萊姆）的恐懼。'],
	['64) 尸体恐懼症（Necrophobia）：对尸体的恐懼。'],
	['65) 数字8恐懼症（Octophobia）：对数字8的恐懼。'],
	['66) 恐牙症（Odontophobia）：对牙齿的恐懼。'],
	['67) 恐夢症（Oneirophobia）：对夢境的恐懼。'],
	['68) 稱呼恐懼症（Onomatophobia）：对於特定詞语的恐懼。'],
	['69) 恐蛇症（Ophidiophobia）：对蛇的恐懼。'],
	['70) 恐鳥症（Ornithophobia）：对鳥的恐懼。'],
	['71) 寄生蟲恐懼症（Parasitophobia）：对寄生蟲的恐懼。'],
	['72) 人偶恐懼症（Pediophobia）：对人偶的恐懼。'],
	['73) 吞咽恐懼症（Phagophobia）：对於吞咽或被吞咽的恐懼。'],
	['74) 藥物恐懼症（Pharmacophobia）：对藥物的恐懼。'],
	['75) 幽灵恐懼症（Phasmophobia）：对鬼魂的恐懼。'],
	['76) 日光恐懼症（Phenogophobia）：对日光的恐懼。'],
	['77) 胡鬚恐懼症（Pogonophobia）：对胡鬚的恐懼。'],
	['78) 河流恐懼症（Potamophobia）：对河流的恐懼。'],
	['79) 酒精恐懼症（Potophobia）：对酒或酒精的恐懼。'],
	['80) 恐火症（Pyrophobia）：对火的恐懼。'],
	['81) 魔法恐懼症（Rhabdophobia）：对魔法的恐懼。'],
	['82) 黑暗恐懼症（Scotophobia）：对黑暗或夜晚的恐懼。'],
	['83) 恐月症（Selenophobia）：对月亮的恐懼。'],
	['84) 火車恐懼症（Siderodromophobia）：对於乘坐火車出行的恐懼。'],
	['85) 恐星症（Siderophobia）：对星星的恐懼。'],
	['86) 狭室恐懼症（Stenophobia）：对狭小物件或地点的恐懼。'],
	['87) 对稱恐懼症（Symmetrophobia）：对对稱的恐懼。'],
	['88) 活埋恐懼症（Taphephobia）：对於被活埋或墓地的恐懼。'],
	['89) 公牛恐懼症（Taurophobia）：对公牛的恐懼。'],
	['90) 電话恐懼症（Telephonophobia）：对電话的恐懼。'],
	['91) 怪物恐懼症①（Teratophobia）：对怪物的恐懼。'],
	['92) 深海恐懼症（Thalassophobia）：对海洋的恐懼。'],
	['93) 手术恐懼症（Tomophobia）：对外科手术的恐懼。'],
	['94) 十三恐懼症（Triskadekaphobia）：对数字13的恐懼症。'],
	['95) 衣物恐懼症（Vestiphobia）：对衣物的恐懼。'],
	['96) 女巫恐懼症（Wiccaphobia）：对女巫与巫术的恐懼。'],
	['97) 黄色恐懼症（Xanthophobia）：对黄色或「黄」字的恐懼。'],
	['98) 外语恐懼症（Xenoglossophobia）：对外语的恐懼。'],
	['99) 异域恐懼症（Xenophobia）：对陌生人或外國人的恐懼。'],
	['100) 动物恐懼症（Zoophobia）：对动物的恐懼。']

];


async function dpRecordSwitch({ onOff = false, groupid = "", channelid = "" }) {
	try {
		let result = await schema.developmentConductor.findOneAndUpdate({
			groupID: channelid || groupid
		}, {
			$set: {
				switch: onOff
			}
		}, {
			new: true,
			upsert: true,
			returnDocument: true
		}).catch(error => console.error('coc #673 mongoDB error: ', error.name, error.reson));
		return `现在这频道的COC 成长记录功能为 ${(result.switch) ? '开启' : '关閉'}
以后CC掷骰將 ${(result.switch) ? '會' : '不會'}进行记录`
	} catch (error) {
		console.error(`dpRecordSwitch ERROR ${error.message}`)
		return '发生错误';
	}
}

async function dpRecorder({ userID = "", groupid = "", channelid = "", skillName = "", skillPer = 0, skillPerStyle = "", skillResult = 0, userName = "" }) {
	if (!checkMongodb.isDbOnline()) return;
	try {
		let result = await schema.developmentConductor.findOne({
			groupID: channelid || groupid,
			switch: true
		}).catch(error => {
			console.error('coc #687 mongoDB error: ', error.name, error.reson)
			checkMongodb.dbErrOccurs();
		});
		if (!result) return;
		/**
		 * 	
	 * 检定成功 -> 检查有没有技能名字
	 * 有	检查有没有重复的名字 有则覆蓋时间 和記錄结果
	 * 没有则儲存十个
		 */
		if (skillName) {
			await schema.developmentRollingRecord.findOneAndUpdate({
				groupID: channelid || groupid,
				userID: userID,
				skillName: skillName,
				skillPerStyle: 'normal'
			}, {
				date: Date.now(),
				skillPer: skillPer,
				skillResult: skillResult
			},
				{
					new: true,
					upsert: true,
					returnDocument: true
				}).catch(error => console.error('coc #710 mongoDB error: ', error.name, error.reson));
		} else {
			await schema.developmentRollingRecord.create({
				groupID: channelid || groupid,
				userID: userID,
				skillName: "",
				skillPerStyle: 'normal',
				date: Date.now(),
				skillPer: skillPer,
				skillResult: skillResult
			}).catch(error => console.error('coc #720 mongoDB error: ', error.name, error.reson));
			let countNumber = await schema.developmentRollingRecord.find({
				groupID: channelid || groupid,
				userID: userID,
				skillName: "",
				skillPerStyle: 'normal',
			}).countDocuments().catch(error => console.error('coc #726 mongoDB error: ', error.name, error.reson));
			if (countNumber > 10) {
				let moreThanTen = await schema.developmentRollingRecord.find({
					groupID: channelid || groupid,
					userID: userID,
					skillName: "",
					skillPerStyle: 'normal',
				}).sort({ date: 1 }).limit(countNumber - 10).catch(error => console.error('coc #733 mongoDB error: ', error.name, error.reson));

				moreThanTen.forEach(async function (doc) {
					await schema.developmentRollingRecord.deleteOne({ _id: doc._id }).catch(error => console.error('coc #736 mongoDB error: ', error.name, error.reson));
				})
			}

		}

		/**
		  * 大成功大失败儲存
	 * 额外儲存十次大成功大失败的记录
		 */

		if (skillPerStyle == "criticalSuccess" || skillPerStyle == "fumble") {
			await schema.developmentRollingRecord.create({
				groupID: channelid || groupid,
				userID: userID,
				skillName: skillName,
				skillPerStyle: skillPerStyle,
				date: Date.now(),
				skillPer: skillPer,
				skillResult: skillResult,
				userName: userName
			}).catch(error => console.error('coc #757 mongoDB error: ', error.name, error.reson));
			let countNumber = await schema.developmentRollingRecord.find({
				groupID: channelid || groupid,
				userID: userID,
				skillPerStyle: skillPerStyle,
			}).countDocuments().catch(error => console.error('coc #762 mongoDB error: ', error.name, error.reson));
			if (countNumber > 10) {
				let moreThanTen = await schema.developmentRollingRecord.find({
					groupID: channelid || groupid,
					userID: userID,
					skillPerStyle: skillPerStyle,
				}).sort({ date: 1 }).limit(countNumber - 10).catch(error => console.error('coc #768 mongoDB error: ', error.name, error.reson));

				moreThanTen.forEach(async function (doc) {
					await schema.developmentRollingRecord.deleteOne({ _id: doc._id }).catch(error => console.error('coc #771 mongoDB error: ', error.name, error.reson));
				})
			}
		}


	} catch (error) {
		console.error(`dpRecordSwitch ERROR ${error.message}`)
		return '发生错误';
	}

	/**
	 * 行为
	 * 打开后就开始记录CC CC1~2 CCN1~2 的结果
	 * 
	 * 检定成功 -> 检查有没有技能名字
	 * 有	检查有没有重复的名字 有则覆蓋时间 和記錄结果
	 * 没有则儲存十个
	 * 
	 * 
	 * 大成功大失败儲存
	 * 额外儲存十次大成功大失败的记录
	 * 
	 */

}

function DevelopmentPhase(input) {
	let result = ''
	for (let index = 1; index < input.length; index++) {
		let target = '',
			text = '';
		if (!isNaN(input[index])) {
			target = input[index];
		}
		else continue;
		if (input[index + 1] && isNaN(input[index + 1])) {
			text = input[index + 1];
			index++;
		}
		result += everyTimeDevelopmentPhase(target, text) + '\n' + '\n'
	}
	return result;

}

function everyTimeDevelopmentPhase(target, text = '') {
	let result = '';
	target = Number(target);
	if (target > 1000) target = 1000;
	if (text == undefined) text = "";
	let skill = rollbase.Dice(100);
	let confident = (target <= 89);
	if (target > 95) target = 95;
	if (skill >= 96 || skill > target) {
		let improved = rollbase.Dice(10);
		result = "成长或增强检定: " + text + "\n1D100 > " + target + "\n掷出: " + skill + " → 成功!\n你的技能增加" + improved + "点，现在是" + (target + improved) + "点。";
		if (confident && ((target + improved) >= 90)) {
			result += `\n调查员的技能提升到90%以上，他的当前理智值增加2D6 > ${rollbase.Dice(6) + rollbase.Dice(6)}点。
这一项奖励显示他经由精通一项技能而獲得自信。`
		}
	} else {
		result = "成长或增强检定: " + text + "\n1D100 > " + target + "\n掷出: " + skill + " → 失败!\n你的技能没有變化!";
	}
	return result;
}
function ccrt() {
	let result = '';
	//let rollcc = Math.floor(Math.random() * 10);
	//let time = Math.floor(Math.random() * 10) + 1;
	//let PP = Math.floor(Math.random() * 100);
	let rollcc = rollbase.Dice(10) - 1
	let time = rollbase.Dice(10)
	let PP = rollbase.Dice(100) - 1
	if (rollcc <= 7) {
		result = cocmadnessrt[rollcc] + '\n症状持續' + time + '輪数';
	} else
		if (rollcc == 8) {
			result = cocmadnessrt[rollcc] + '\n症状持續' + time + '輪数' + ' \n' + cocManias[PP];
		} else
			if (rollcc == 9) {
				result = cocmadnessrt[rollcc] + '\n症状持續' + time + '輪数' + ' \n' + cocPhobias[PP];
			}
	return result;
}

function ccsu() {
	let result = '';
	let rollcc = rollbase.Dice(10) - 1
	let time = rollbase.Dice(10)
	let PP = rollbase.Dice(100) - 1
	if (rollcc <= 7) {
		result = cocmadnesssu[rollcc] + '\n症状持續' + time + '小时';
	} else
		if (rollcc == 8) {
			result = cocmadnesssu[rollcc] + '\n症状持續' + time + '小时' + ' \n' + cocManias[PP];
		} else
			if (rollcc == 9) {
				result = cocmadnesssu[rollcc] + '\n症状持續' + time + '小时' + ' \n' + cocPhobias[PP];
			}
	return result;
}


/**
 * COC6
 * @param {数字 如CB 80 的80} chack 
 * @param {后面的文字,如侦查} text 
 */
function coc6(chack, text) {
	let result = '';
	let temp = rollbase.Dice(100);
	if (temp == 100) result = 'ccb<=' + chack + '\n' + temp + ' → 啊！大失败！';
	else
		if (temp <= chack) result = 'ccb<=' + chack + '\n' + temp + ' → 成功';
		else result = 'ccb<=' + chack + '\n' + temp + ' → 失败';
	if (text)
		result += '；' + text;
	return result;
}

/**
 * COC7
 * @param {CC 80 的80} chack 
 * @param {攻擊等描述字眼} text 
 */


async function coc7({ chack, text = "", userid, groupid, channelid, userName }) {
	let result = '';
	let temp = rollbase.Dice(100);
	let skillPerStyle = "";
	let check = chack.split(',');
	let name = text.split(',');
	let checkNum = !check.some(i => !Number.isInteger(Number(i)));
	if (!checkNum) return;
	if (check.length >= 2) result += '联合检定\n'
	for (let index = 0; index < check.length; index++) {
		switch (true) {
			case (temp == 1): {
				result += '1D100 ≦ ' + check[index] + "　\n" + temp + ' → 恭喜！大成功！';
				skillPerStyle = "criticalSuccess";
				break;
			}
			case (temp == 100): {
				result = '1D100 ≦ ' + check[index] + "　\n" + temp + ' → 啊！大失败！';
				skillPerStyle = "fumble";
				break;
			}
			case (temp >= 96 && check[index] <= 49): {
				result += '1D100 ≦ ' + check[index] + "　\n" + temp + ' → 啊！大失败！';
				skillPerStyle = "fumble";
				break;
			}
			case (temp > check[index]): {
				result += '1D100 ≦ ' + check[index] + "　\n" + temp + ' → 失败';
				skillPerStyle = "failure";
				break;
			}
			case (temp <= check[index] / 5): {
				result += '1D100 ≦ ' + check[index] + "　\n" + temp + ' → 极限成功';
				skillPerStyle = "normal";
				break;
			}
			case (temp <= check[index] / 2): {
				result += '1D100 ≦ ' + check[index] + "　\n" + temp + ' → 困难成功';
				skillPerStyle = "normal";
				break;
			}
			case (temp <= check[index]): {
				result += '1D100 ≦ ' + check[index] + "　\n" + temp + ' → 通常成功';
				skillPerStyle = "normal";
				break;
			}
			default:
				break;
		}

		if (text[index]) result += '：' + (name[index] || '');
		result += '\n\n'
		if (userid && groupid && skillPerStyle !== "failure") {
			await dpRecorder({ userID: userid, groupid, channelid, skillName: name[index], skillPer: check[index], skillPerStyle, skillResult: temp, userName });
		}

	}


	return result;
}

async function coc7chack({ chack, temp, text = "", userid, groupid, channelid, userName, bpdiceNum }) {
	let result = '';
	let skillPerStyle = "";
	switch (true) {
		case (temp == 1): {
			result = temp + ' → 恭喜！大成功！';
			skillPerStyle = "criticalSuccess";
			break;
		}
		case (temp == 100): {
			result = temp + ' → 啊！大失败！';
			skillPerStyle = "fumble";
			break;
		}
		case (temp >= 96 && chack <= 49): {
			result = temp + ' → 啊！大失败！';
			skillPerStyle = "fumble";
			break;
		}
		case (temp > chack): {
			result = temp + ' → 失败';
			skillPerStyle = "failure";
			break;
		}
		case (temp <= chack / 5): {
			result = temp + ' → 极限成功';
			skillPerStyle = "success";
			break;
		}
		case (temp <= chack / 2): {
			result = temp + ' → 困难成功';
			skillPerStyle = "success";
			break;
		}
		case (temp <= chack): {
			result = temp + ' → 通常成功';
			skillPerStyle = "success";
			break;
		}
		default:
			break;
	}
	if (text) result += '：' + text;
	if (userid && groupid && skillPerStyle !== "failure" && bpdiceNum <= 0) {
		await dpRecorder({ userID: userid, groupid, channelid, skillName: text, skillPer: chack, skillPerStyle, skillResult: temp, userName });
	}
	return result;
}



async function coc7bp({ chack, text, userid, groupid, channelid, bpdiceNum, userName }) {
	try {
		let result = '';
		let temp0 = rollbase.Dice(10) - 1;
		let countStr = '';
		let check = chack.split(',');
		let name = (text && text.split(',')) || [];
		let checkNum = !check.some(i => !Number.isInteger(Number(i)));
		if (!checkNum) return;
		if (check.length >= 2) result += '联合检定\n'
		if (bpdiceNum > 0) {
			for (let i = 0; i <= bpdiceNum; i++) {
				let temp = rollbase.Dice(10);
				let temp2 = temp.toString() + temp0.toString();
				if (temp2 > 100) temp2 = parseInt(temp2) - 100;
				countStr = countStr + temp2 + '、';
			}
			countStr = countStr.substring(0, countStr.length - 1)
			let countArr = countStr.split('、');


			for (let index = 0; index < check.length; index++) {
				let finallyStr = countStr + ' → ' + await coc7chack(
					{ chack: check[index], temp: Math.min(...countArr), text: name[index], userid, groupid, channelid, userName, bpdiceNum }
				);
				result += '1D100 ≦ ' + check[index] + "　\n" + finallyStr + '\n\n';
			}


			return result;
		}
		if (bpdiceNum < 0) {
			for (let i = 0; i <= Math.abs(bpdiceNum); i++) {
				let temp = rollbase.Dice(10);
				let temp2 = temp.toString() + temp0.toString();
				if (temp2 > 100) temp2 = parseInt(temp2) - 100;
				countStr = countStr + temp2 + '、';
			}
			countStr = countStr.substring(0, countStr.length - 1)
			let countArr = countStr.split('、');

			for (let index = 0; index < check.length; index++) {
				let finallyStr = countStr + ' → ' + await coc7chack(
					{ chack: check[index], temp: Math.max(...countArr), text: name[index], userid, groupid, channelid, bpdiceNum }
				);
				result += '1D100 ≦ ' + check[index] + "  \n" + finallyStr + '\n\n';
			}
			return result;
		}
	} catch (error) {
		console.error('error coc #1536', error)
	}
}
function buildpulpchar() {
	let ReStr = 'Pulp CoC 不使用年齡调整\n';
	//讀取年齡
	ReStr += '\nＳＴＲ：' + rollbase.BuildDiceCal('3d6*5');
	ReStr += '\nＤＥＸ：' + rollbase.BuildDiceCal('3d6*5');
	ReStr += '\nＰＯＷ：' + rollbase.BuildDiceCal('3d6*5');

	ReStr += '\nＣＯＮ：' + rollbase.BuildDiceCal('3d4*5');
	ReStr += '\nＡＰＰ：' + rollbase.BuildDiceCal('3d6*5');
	ReStr += '\nＳＩＺ：' + rollbase.BuildDiceCal('(2d6+6)*5');
	ReStr += '\nＩＮＴ：' + rollbase.BuildDiceCal('(2d6+6)*5');


	ReStr += '\nＥＤＵ：' + rollbase.BuildDiceCal('(2d6+6)*5');
	ReStr += '\nＬＵＫ：' + rollbase.BuildDiceCal('(2d6+6)*5');
	ReStr += '\n核心属性：' + rollbase.BuildDiceCal('(1d6+13)*5');
	return ReStr;
}

/**
 * COC7傳統创角
 * @param {年齡} text
 */


/**
 * COC6傳統创角
 */



function build6char() {
	let ReStr = '六版核心创角：';
	ReStr += '\nＳＴＲ：' + rollbase.BuildDiceCal('3d6');
	ReStr += '\nＤＥＸ：' + rollbase.BuildDiceCal('3d6');
	ReStr += '\nＣＯＮ：' + rollbase.BuildDiceCal('3d6');
	ReStr += '\nＰＯＷ：' + rollbase.BuildDiceCal('3d6');
	ReStr += '\nＡＰＰ：' + rollbase.BuildDiceCal('3d6');
	ReStr += '\nＩＮＴ：' + rollbase.BuildDiceCal('(2d6+6)');
	ReStr += '\nＳＩＺ：' + rollbase.BuildDiceCal('(2d6+6)');
	ReStr += '\nＥＤＵ：' + rollbase.BuildDiceCal('(3d6+3)');
	ReStr += '\n年收入：' + rollbase.BuildDiceCal('(1d10)');
	ReStr += '\n调查员的最小起始年齡等於EDU+6，每比起始年齡年老十年，\n调查员增加一点EDU並且加20点職業技能点数。\n当超过40歲后，每老十年，\n從STR,CON,DEX,APP中选擇一个減少一点。';
	return ReStr;
}
//随机产生角色背景
function PcBG() {
	return '背景描述生成器（僅供娛樂用，不具实際參考價值）\n=======\n调查员是一个' + PersonalDescriptionArr[rollbase.Dice(PersonalDescriptionArr.length) - 1] + '人。\n【信念】：说到这个人，他' + IdeologyBeliefsArr[rollbase.Dice(IdeologyBeliefsArr.length) - 1] + '。\n【重要之人】：对他來说，最重要的人是' + SignificantPeopleArr[rollbase.Dice(SignificantPeopleArr.length) - 1] + '，这个人对他來说之所以重要，是因为' + SignificantPeopleWhyArr[rollbase.Dice(SignificantPeopleWhyArr.length) - 1] + '。\n【意義非凡之地】：对他而言，最重要的地点是' + MeaningfulLocationsArr[rollbase.Dice(MeaningfulLocationsArr.length) - 1] + '。\n【寶貴之物】：他最寶貴的東西就是' + TreasuredPossessionsArr[rollbase.Dice(TreasuredPossessionsArr.length) - 1] + '。\n【特徵】：总括來说，调查员是一个' + TraitsArr[rollbase.Dice(TraitsArr.length) - 1] + '。';
}

class SanCheck {
	constructor(mainMsg, botname) {
		this.mainMsg = mainMsg;
		this.rollDice = rollbase.Dice(100);
		this.currentSan = this.getSanity(mainMsg[1]);
		this.scMode = this.getScMode(mainMsg[2]);
		this.sc = this.getSc(mainMsg[2]);
		this.rollSuccess = this.getRollSuccess(this.sc);
		this.rollFail = this.getRollFail(this.sc);
		this.lossSan = this.calculateLossSanity(this.rollSuccess, this.rollFail);
		this.buttonCreate = ["ccrt", "ccsu"];
		this.botname = botname;
	}

	getSanity(mainMsg) {
		const sanityMatch = mainMsg.match(/^\d+$/);
		return sanityMatch ? sanityMatch[0] : null;
	}

	getScMode(mainMsg) {
		return (/\//).test(mainMsg || null);
	}

	getSc(mainMsg) {
		return this.scMode ? mainMsg && mainMsg.match(/^(.+)\/(.+)$/i) : null;
	}

	getRollSuccess(sc) {
		return sc && sc[1] ? sc[1].replace(/[^+\-*\dD]/ig, "") : null;
	}

	getRollFail(sc) {
		return sc && sc[2] ? sc[2].replace(/[^+\-*\dD]/ig, "") : null;
	}

	calculateLossSanity(rollSuccess = '', rollFail = '') {
		const parseRoll = (roll) => {
			try {
				return Math.max(rollbase.BuildDiceCal(roll).match(/\S+$/)?.[0], 0)
			} catch { }
			try {
				return Math.max(mathjs.evaluate(roll), 0);
			} catch { }
			return roll;
		};

		const rollSuccessLoss = parseRoll(rollSuccess) || 0;
		const rollFailLoss = parseRoll(rollFail) || 0;

		let rollFumbleLoss = rollFail;
		const regExp = /d/ig;
		try {
			rollFumbleLoss = mathjs.evaluate(rollFail.replace(regExp, '*'));
		} catch { }

		return {
			rollSuccessLoss,
			rollFailLoss,
			rollFumbleLoss
		};

	}
	runDiscord() {
		let arr = [];
		let str = `手动San Check模式 \n 请选擇要掷骰的方式\n  1d100 - 基本San Check\n`;
		this.scMode = this.getScMode(this.mainMsg[1]);
		this.sc = this.getSc(this.mainMsg[1]);
		this.rollSuccess = this.getRollSuccess(this.sc);
		this.rollFail = this.getRollFail(this.sc);
		if (this.rollSuccess) {
			str += ` ${this.rollSuccess} - 成功时San Check\n`;
			arr.push(this.rollSuccess);
		}
		if (this.rollFail) {
			str += ` ${this.rollFail} - 失败时San Check\n`;
			arr.push(this.rollFail);
		}
		this.buttonCreate.unshift("1d100", ...arr);
		return str;
	}
	run() {
		if (!this.currentSan && this.botname == "Discord") return this.runDiscord();
		if (!this.currentSan) return '请输入正確的San值，\n格式是 .sc 50 或 .sc 50 1/3 或 .sc 50 1d3+3/1d100';
		const diceFumble = (this.rollDice === 100) || (this.rollDice >= 96 && this.rollDice <= 100 && this.currentSan <= 49);
		const diceSuccess = this.rollDice <= this.currentSan;
		const diceFail = this.rollDice > this.currentSan;

		if (diceFumble) {
			return this.handleDiceFumble();
		} else if (diceSuccess) {
			return this.handleDiceSuccess();
		} else if (diceFail) {
			return this.handleDiceLoss();
		}

		//可接受输入: .sc 50	.sc 50 哈哈		.sc 50 1/3		.sc 50 1d3+3/1d100 
		//scMode 代表會扣SC 或有正常输入扣SAN的数字 

	}

	handleDiceFumble() {
		if (!this.scMode) {
			return `San Check\n1d100 ≦ ${this.currentSan}\n掷出:${this.rollDice} → 大失败!`;
		}
		if (this.rollFail) {
			let updatedSan = ((this.currentSan - this.lossSan.rollFumbleLoss) < 0) ? 0 : this.currentSan - this.lossSan.rollFumbleLoss;
			return `San Check\n1d100 ≦ ${this.currentSan}\n掷出:${this.rollDice} → 大失败!\n失去${this.rollFail}最大值 ${this.lossSan.rollFumbleLoss}点San\n现在San值是${updatedSan}点`.replace('是NaN点', ' 算式错误，未能计算');
		}
		return `San Check\n1d100 ≦ ${this.currentSan}\n掷出:${this.rollDice} → 大失败!`
	}
	handleDiceSuccess() {
		//成功
		if (!this.scMode) {
			return `San Check\n1d100 ≦ ${this.currentSan}\n掷出:${this.rollDice} → 成功!`
		}
		if (this.lossSan) {
			let updatedSan = ((this.currentSan - this.lossSan.rollSuccessLoss) < 0) ? 0 : this.currentSan - this.lossSan.rollSuccessLoss;
			return `San Check\n1d100 ≦ ${this.currentSan}\n掷出:${this.rollDice} → 成功!\n失去${this.rollSuccess} → ${this.lossSan.rollSuccessLoss}点San\n现在San值是${updatedSan}点`.replace('是NaN点', ' 算式错误，未能计算');
		} else
			return `San Check\n1d100 ≦ ${this.currentSan}\n掷出:${this.rollDice} → 成功!\n不需要減少San`

	}
	handleDiceLoss() {
		if (!this.scMode) {
			return `San Check\n1d100 ≦ ${this.currentSan}\n掷出:${this.rollDice} → 失败!`
		}
		if (this.lossSan) {
			let updatedSan = ((this.currentSan - this.lossSan.rollFailLoss) < 0) ? 0 : this.currentSan - this.lossSan.rollFailLoss;
			return `San Check\n1d100 ≦ ${this.currentSan}\n掷出:${this.rollDice} → 失败!\n失去${this.rollFail} → ${this.lossSan.rollFailLoss}点San\n现在San值是${updatedSan}点`.replace('是NaN点', ' 算式错误，未能计算');
		} else
			return `San Check\n1d100 ≦ ${this.currentSan}\n掷出:${this.rollDice} → 失败!\n但不需要減少San`

	}
	getButton() {
		return this.buttonCreate;
	}
}

function chase() {
	let rply = `CoC 7ed追逐戰产生器\n`;
	let round = rollbase.Dice(5) + 5;
	for (let index = 0; index < round; index++) {
		rply += `${chaseGenerator(index)}\n========\n`;
	}
	return rply;
}
function chaseGenerator(num) {
	let rply = "";
	let chase = rollbase.Dice(100);
	let dangerMode = (rollbase.Dice(2) == 1) ? true : false;
	switch (true) {
		case (chase >= 96): {
			rply = `地点${num + 1} 极限难度 ${dangerMode ? "險境" : "障礙"}
			`
			let itemsNumber = rollbase.DiceINT(2, 5);
			let result = shuffle(request);
			rply += `可能进行的检定: `;
			for (let index = 0; index < itemsNumber; index++) {
				rply += `${result[index]} `;
			}
			if (dangerMode) {
				rply += `
				失败失去1D10嚴重事故HP傷害
				及 失去（1D3）点行动点`;
			} else {
				let blockhp = shuffle(blockHard);
				rply += `
				障礙物 HP${blockhp[0]}`
			}
			//1D10嚴重事故
			//额外失去1（1D3）点行动点
			break;
		}
		case (chase >= 85): {
			rply = `地点${num + 1} 困难难度 ${dangerMode ? "險境" : "障礙"}
			`;
			let itemsNumber = rollbase.DiceINT(2, 5);
			let result = shuffle(request);
			rply += `可能进行检定: `;
			for (let index = 0; index < itemsNumber; index++) {
				rply += `${result[index]} `;
			}
			if (dangerMode) {
				rply += `
				失败失去1D6中度事故HP傷害
				及 失去（1D3）点行动点`;
			} else {
				let blockhp = shuffle(blockIntermediate);
				rply += `
				障礙物 HP${blockhp[0]}`
			}
			//1D6中度事故
			//额外失去1（1D3）点行动点
			break;
		}
		case (chase >= 60): {
			rply = `地点${num + 1} 一般难度 ${dangerMode ? "險境" : "障礙"}
			`
			let itemsNumber = rollbase.DiceINT(2, 5);
			let result = shuffle(request);
			rply += `可能进行检定: `;
			for (let index = 0; index < itemsNumber; index++) {
				rply += `${result[index]} `;
			}
			if (dangerMode) {
				rply += `
				失败失去1D3-1輕微事故HP傷害
				及 失去（1D3）点行动点`;
			} else {
				let blockhp = shuffle(blockEasy);
				rply += `
				障礙物 HP${blockhp[0]}`
			}
			//1D3-1輕微事故
			//额外失去1（1D3）点行动点
			break;
		}
		default: {
			rply = `地点${num + 1} 没有險境/障礙`
			break;
		}
	}
	return rply;
}

const request = ["攀爬", "游泳", "闪避", "力量", "敏捷", "跳跃", "锁匠",
	"攻擊", "戰技", "侦查", "幸运", "话术", "恐吓", "潛行", "心理学", "聆听"
]

const blockHard = [5, 5, 10, 10, 15, 15, 25, 50, 100];
const blockEasy = [5, 5, 5, 10, 10, 15]
const blockIntermediate = [5, 5, 10, 10, 15, 15, 25]

function shuffle(array) {
	let currentIndex = array.length, randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}

	return array;
}

function getOccupationSkill(state) {
	//state = [STR,DEX,....]
	let skillsPool = [];
	let skillResult = [];
	let CR = rollbase.Dice(8) - 1;
	for (let index = 0; index < 8; index++) {
		let temp = eval(state[index]);
		for (let index2 = 0; index2 < temp.length; index2++) {
			skillsPool.push(temp[index2]);
		}
		//skillsPool = ["戰鬥类", "醫療"] - 決定POOL有什么d
		//skillsPool (15) ['戰鬥类', '醫療', '戰鬥类', '醫療', '移动类', '隱密类', '戰鬥类
		if (index == CR) {
			skillResult.push("信譽");
		}
		skillResult.push(skillsPool[rollbase.Dice(skillsPool.length) - 1]);
		//


	}

	//skillResult (9) ['醫療', '醫療', '醫療', '信譽', '戰鬥类', '隱密类', '移动类', '隱密类', '戰鬥类']
	let finalOSkillList = [];
	let sortSkillList = [
		{ name: "移动类", sort: shuffle([...移动类]) },
		{ name: "隱密类", sort: shuffle([...隱密类]) },
		{ name: "職業興趣", sort: shuffle([...職業興趣]) },
		{ name: "调查类", sort: shuffle([...调查类]) },
		{ name: "戰鬥类", sort: shuffle([...戰鬥类]) },
		{ name: "醫療类", sort: shuffle([...醫療类]) },
		{ name: "语言类", sort: shuffle([...语言类]) },
		{ name: "学问类", sort: shuffle([...学问类]) },
		{ name: "交際类", sort: shuffle([...交際类]) },
	];
	for (let i = 0; i < skillResult.length; i++) {
		if (skillResult[i] == "信譽") {
			finalOSkillList.push("信譽");
			continue;
		}
		sortSkillList.forEach(v => {
			if (v.name == skillResult[i]) {
				finalOSkillList.push(v.sort[0].name);
				v.sort.shift();
			}
		})

	}


	let tempOtherSkillList = [];
	sortSkillList.forEach(element => {
		tempOtherSkillList.push(element.sort)
	});
	let tempFinalOtherSkillList = shuffle([...tempOtherSkillList.flat()])
	let finalOtherSkillList = []
	for (let index = 0; index < 4; index++) {
		finalOtherSkillList.push(tempFinalOtherSkillList[index]);
	}

	return { finalOSkillList, finalOtherSkillList };

	//

}
function checkState(state) {
	let result = [];
	result[0] = eightStateNumber[state.indexOf("STR")]
	result[1] = eightStateNumber[state.indexOf("DEX")]
	result[2] = eightStateNumber[state.indexOf("POW")]
	result[3] = eightStateNumber[state.indexOf("CON")]
	result[4] = eightStateNumber[state.indexOf("APP")]
	result[5] = eightStateNumber[state.indexOf("SIZ")]
	result[6] = eightStateNumber[state.indexOf("INT")]
	result[7] = eightStateNumber[state.indexOf("EDU")]
	return result;
}

const eightState = ["STR",
	"DEX",
	"POW",
	"CON",
	"APP",
	"SIZ",
	"INT",
	"EDU"];
const eightStateNumber = [
	80, 70, 70, 60, 50, 50, 50, 40];
const eightskillsNumber = [70, 60, 60, 50, 50, 50, 40, 40, 40];

const 交際类 = [
	{ name: "心理学", skill: 10 },
	{ name: "说服", skill: 10 },
	{ name: "话术", skill: 5 },
	{ name: "恐吓", skill: 15 },
	{ name: "取悦", skill: 15 }
]
const 移动类 =
	[{ name: "導航", skill: 10 },
	{ name: "生存", skill: 10 },
	{ name: "跳跃", skill: 20 },
	{ name: "攀爬", skill: 20 },
	{ name: "游泳", skill: 20 },
	{ name: "驾驶（汽車）", skill: 20 },
	{ name: "驾驶（其他）", skill: 1 },
	{ name: "潛水", skill: 1 },
	{ name: "騎术", skill: 5 }]

const 隱密类 = [
	{ name: "潛行", skill: 20 },
	{ name: "追蹤", skill: 10 },
	{ name: "乔装", skill: 5 },
	{ name: "锁匠", skill: 1 },
	{ name: "巧手", skill: 10 }
]

const 学问类 = [
	{ name: "會计", skill: 5 },
	{ name: "法律", skill: 5 },
	{ name: "神秘学", skill: 5 },
	{ name: "历史", skill: 5 },
	{ name: "自然学", skill: 10 },
	{ name: "人类学", skill: 1 },
	{ name: "考古学", skill: 1 },
	{ name: "司法科学", skill: 1 },
	{ name: "数学", skill: 1 },
	{ name: "动物学", skill: 1 },
	{ name: "電子学", skill: 1 },
	{ name: "天文学", skill: 1 },
	{ name: "地质学", skill: 1 },
	{ name: "生物学", skill: 1 },
	{ name: "物理", skill: 1 },
	{ name: "化学", skill: 1 },
	{ name: "密碼学", skill: 1 },
	{ name: "氣象学", skill: 1 },
	{ name: "植物学", skill: 1 },
	{ name: "学问:", skill: 1 }
]

const 语言类 = [
	{ name: "语言", skill: 1 },
	{ name: "语言", skill: 1 },
	{ name: "语言", skill: 1 },
	{ name: "语言", skill: 1 },
	{ name: "语言", skill: 1 },
	{ name: "语言", skill: 1 },
	{ name: "语言", skill: 1 }

]

const 職業興趣 = [
	{ name: "美术", skill: 5 },
	{ name: "偽造", skill: 5 },
	{ name: "表演", skill: 5 },
	{ name: "攝影", skill: 5 },
	{ name: "艺术／手艺(自选一项)", skill: 5 },
	{ name: "操作重机", skill: 1 },
	{ name: "机械維修", skill: 10 },
	{ name: "電器維修", skill: 10 },
	{ name: "電腦使用", skill: 5 },
	{ name: "动物馴養", skill: 5 },
]

const 调查类 = [
	{ name: "侦查", skill: 25 },
	{ name: "聆听", skill: 20 },
	{ name: "圖書館使用", skill: 20 },
	{ name: "估價", skill: 5 },
	{ name: "讀唇", skill: 1 },
]

const 戰鬥类 = [
	{ name: "闪避", skill: 0 },
	{ name: "斗殴", skill: 25 },
	{ name: "剑", skill: 20 },
	{ name: "投掷", skill: 20 },
	{ name: "弓", skill: 15 },
	{ name: "手枪", skill: 20 },
	{ name: "步枪／霰彈枪", skill: 25 },

]

const 醫療类 = [
	{ name: "精神分析", skill: 1 },
	{ name: "急救", skill: 30 },
	{ name: "醫学", skill: 1 },
	{ name: "藥学", skill: 1 },
	{ name: "催眠", skill: 1 }
]
const STR = ["戰鬥类", "醫療类"]
const DEX = ["移动类", "隱密类"]
const POW = ["職業興趣", "学问类"]
const CON = ["移动类", "戰鬥类"]
const APP = ["语言类", "交際类"]
const EDU = ["调查类", "醫療类", "学问类"]
const SIZ = ["戰鬥类", "交際类"]
const INT = ["隱密类", "職業興趣", "调查类"]
class MythoyCollection {
	constructor() { }

	static getMythos() {
		return `克苏鲁神话邪神:
		${this.getMythonData("god")}

		克苏鲁神话生物:
		${this.getMythonData("monster")}

		克苏鲁神话書籍:
		${this.getMythonData("MagicBook")}

		克苏鲁神话法术:
		${this.getMythonData("magic")}
		`
	}
	static getMythonData(dataType) {
		return this.cases[dataType] ? this.cases[dataType]() : this.cases._default();
	}
	static cases = {
		god: () => { return this.getRandomData(this.MythoyGodList) },
		monster: () => { return this.getRandomData(this.mosterList) },
		magic: () => { return this.getRandomData(this.Magic) },
		MagicBook: () => { return this.getRandomData(this.MagicBookList) },
		pushedCasting: () => {
			return `${this.getRandomData(this.pushedCastingRoll)}
			对於更强大的法术（例如召喚神灵或消耗POW的法术），副作用可能更嚴重：
			${this.getRandomData(this.pushedPowerfulCastingRoll)}
			`
		},
		_default: () => { return "没有找到符合的资料" }
	}
	static getRandomData(array) {
		return array[Math.floor(Math.random() * array.length)];
	}
	static mosterList = [
		"拜亞基", "鑽地魔蟲", "星之彩", "蠕行者", "达貢&海德拉（特殊深潜者）", "黑山羊幼崽", "深潜者", "混种深潜者", "巨噬蠕蟲", "空鬼", "古老者", "炎之精", "飛水螅", "无形眷族", "妖鬼", "食尸鬼", "格拉基之僕", "諾弗·刻", "伊斯之偉大种族", "庭达羅斯的獵犬", "恐怖獵手", "羅伊格爾", "米-戈", "夜魘", "人面鼠", "潜沙怪", "蛇人", "外神僕役", "夏蓋妖蟲", "夏塔克鳥", "修格斯", "修格斯主宰(人型)", "修格斯主宰(修格斯形態)", "克苏鲁的星之眷族", "星之精", "乔乔人", "耶庫伯人", "冷蛛", "昆揚人", "月兽", "空鬼", "潛沙怪", "冷原人", "圖姆哈人"
	];
	static MythoyGodList = ["阿布霍斯", "阿特拉克·納克亞", "阿薩托斯", "芭絲特", "昌格納·方庚", "克圖格亞", "偉大的克苏鲁", "賽伊格亞", "道羅斯", "埃霍特", "加塔諾托亞", "格拉基", "哈斯塔，不可名状者", "伊塔庫亞", "黄衣之王，哈斯塔的化身", "諾登斯", "奈亞拉托提普(人类形態)", "奈亞拉托提普(怪物形態)", "尼約格薩", "蘭-提格斯", "莎布-尼古拉斯", "修德梅爾", "撒托古亞", "圖爾茲查", "烏波·薩斯拉", "烏波·薩斯拉的子嗣", "伊戈羅納克", "伊波·茲特爾", "伊格", "猶格·索托斯", "佐斯·奧摩格"];
	static Magic = ["維瑞之印", "守衛术", "忘卻之波", "肢体凋萎术", "真言术", "折磨术", "灵魂分配术", "耶德·艾塔德放逐术", "束縛术", "祝福刀鋒术", "葛哥洛斯形体扭曲术", "深淵之息", "黄金蜂蜜酒釀造法", "透特之詠", "記憶模糊术", "紐格塔紧握术", "外貌濫用术", "致盲术/复明术", "创造納克-提特之障壁", "拉萊耶造霧术", "僵尸製造术", "腐烂外皮之詛咒", "致死术", "支配术", "阿撒托斯的恐怖詛咒", "蘇萊曼之塵", "舊印开光术", "綠腐术", "恐懼注入术", "血肉熔解术", "心理暗示术", "精神震爆术", "精神交換术", "精神转移术", "塔昆·阿提普之镜", "伊本-加茲之粉", "蒲林的埃及十字架", "修德·梅’爾之赤印", "復活术", "枯萎术", "哈斯塔之歌", "请神术", "联絡术", "通神术", "附魔术", "迷身术（迷惑犧牲者）", "邪眼术", "猶格-索托斯之拳", "血肉防護术", "时空門法术", "召喚术", "束縛术"];
	static MagicBookList = ["阿齐夫(死灵之書原版)", "死灵之書", "不可名状的教团", "拉萊耶文本", "格拉基啟示錄", "死灵之書", "戈爾·尼格拉爾", "伊波恩之書", "水中之喀特", "綠之書", "不可名状的教团", "伊波恩之書", "來自被詛咒者，或（关於古老而恐怖的教团的論文）", "死亡崇拜", "艾歐德之書", "蠕蟲之秘密", "食尸鬼教团", "伊波恩之書", "埃爾特当陶片", "暗黑儀式", "諾姆羊皮卷", "达爾西第四之書", "斯克洛斯之書", "斷罪處刑之書", "智者瑪格洛魯姆", "暗黑大典", "格哈恩殘篇", "納克特抄本", "不可名状的教团", "伊希之儀式", "刻萊諾殘篇", "狂僧克利薩努斯的懺悔", "迪詹之書", "达貢禱文", "反思錄", "怪物及其族类", "恶魔崇拜", "深淵棲息者", "鉉子七奧書", "亞洲的神秘奧跡，含有從《戈爾·尼格拉爾》中摘抄的注釋", "巨噬蠕蟲頌", "蓋夫抄本", "薩塞克斯手稿", "鑽地啟示錄", "《死灵之書》中的克苏鲁", "伊拉內克紙草", "卡納瑪戈斯聖約書", "水中之喀特", "海底的教团", "真实的魔法", "納斯編年史", "遠古的恐怖", "骷髏黑書", "伊斯提之歌", "來自被詛咒者", "波納佩聖典", "神秘学基礎", "置身高壓水域", "魔法与黑巫术", "黄衣之王", "黑之契经", "《波納佩聖典》所述的史前太平洋", "伊戈爾倫理学", "來自亞狄斯的幻象", "利誇利亞的傳说", "哈利湖啟示錄", "姆-拉斯紙草", "撒都該人的勝利", "新英格蘭樂土上的奇术異事", "混沌之魂", "猶基亞頌歌", "秘密窺視者", "約翰森的敘述", "致夏蓋的安魂彌撒", "艾歐德之書", "越过幻象", "关於新英格蘭的既往巫术", "阿撒托斯及其他", "黑色的疯狂之神", "伊波恩生平", "全能的奧蘇姆", "地底掘進者", "巨石的子民", "撒拉遜人的宗教儀式", "水鰭書", "波利尼西亞神话学，附有对克苏鲁傳说圈的記錄", "異界的監視者", "科学的奇跡", "薩波斯的卡巴拉", "贊蘇石板", "魚之書", "失落帝國的遺跡", "托斯卡納的宗教儀式", "夜之魍魎", "太平洋史前史：初步调查", "納卡爾之鑰", "宣福者美多迪烏斯", "翡翠石板", "金枝", "易经", "揭开面紗的伊西斯", "所羅門之鑰", "女巫之錘", "諾查丹瑪斯的預言", "西歐的异教巫术崇拜", "光明篇",]

	static pushedCastingRoll = [
		'1 .視力模糊或暫时失明。',
		'2: 殘缺不全的尖叫聲、聲音或其他噪音。',
		'3: 强烈的風或其他大氣效應。',
		'4: 流血——可能是由於施法者、在場其他人或环境（如牆壁）的出血。',
		'5: 奇異的幻象和幻覺。',
		'6: 周圍的小动物爆炸。',
		'7: 異臭的硫磺味。',
		'8: 不小心召喚了神话生物。'
	]
	static pushedPowerfulCastingRoll = ['1: 大地震动，牆壁破裂。',
		'2: 巨大的雷電聲。',
		'3: 血從天而降。',
		'4: 施法者的手被干枯和燒焦。',
		'5: 施法者不正常地老化（年齡增加2D10歲，並應用特徵修正，请參見老化規则）。',
		'6: 强大或眾多的神话生物出现，從施法者开始攻擊附近所有人！',
		'7: 施法者或附近的所有人被吸到遙遠的时间或地方。',
		'8: 不小心召喚了神话神明。',
	]

}



class BuilderRegistry {
	constructor() {
		this.builders = new Map();
	}

	registerBuilder(pattern, builderClass) {
		this.builders.set(pattern, new builderClass());
	}

	getBuilder(name) {
		return this.builders.get(name);
	}
}

class Build7Char {
	constructor() {
		this.builderRegistry = new BuilderRegistry();
		this.defaultRegistry;
	}
	defaultBuiler(builderClass) {
		this.defaultRegistry = new builderClass();
	}

	registerBuilder(name, builderClass) {
		this.builderRegistry.registerBuilder(name, builderClass);
	}

	build(text, age) {
		for (const [pattern, builderClass] of this.builderRegistry.builders) {
			if (text.match(pattern)) {
				return builderClass.build(text, age);
			}
		}

		return `你输入的指令不正確，指令为 
coc7版创角				： 启动语 .cc7build (歲数7-89)
coc7版随机创角			： 启动语 .cc7build random 或留空
coc7版自由分配点数创角	： 启动语 .cc7build .xyz (歲数15-89)

先以coc7版随机模式來创角
${this.defaultRegistry.build()}
`;
	}
}

class RandomBuilder {
	/**
	 * 該方案適合大家想要立刻掏枪上馬开桌的时候。
	 * 將４０、５０、５０、５０、６０、６０、７０、８０分配在属性上。
	 * 选擇職業和８个職業技能
	 * 將８个職業技能和信譽分別分配以下数额：１项７０％，２项６０％，３项５０％和３项４０％（直接假定这些技能就是这个数值，忽略掉技能初始值）。
	 * ４个非本職技能，將它們在基礎值上各增加２０％。								
	 * 
	 */
	constructor() {
	}
	static pattern() {
		return /^random$/i;
	}

	build() {
		//設定 因年齡減少的点数 和 EDU加骰次数
		let old = rollbase.DiceINT(15, 89);
		let ReStr = `
=======coc7版随机创角=======
调查员年齡設为：${old}\n`;
		let Debuff = 0;
		let AppDebuff = 0;
		let EDUinc = 0;
		for (let i = 0; old >= oldArr[i]; i++) {
			Debuff = DebuffArr[i];
			AppDebuff = AppDebuffArr[i];
			EDUinc = EDUincArr[i];
		}
		ReStr += '=======\n';
		switch (true) {
			case (old >= 15 && old <= 19):
				ReStr += '年齡调整：從STR或SIZ中減去' + Debuff + '点\n（请自行手动选擇计算）。\nEDU減去5点。LUK骰两次取高。';
				ReStr += '\n=======';
				ReStr += '\n（以下箭號两项，減值' + Debuff + '点。）';
				break;
			case (old >= 20 && old <= 39):
				ReStr += '年齡调整：可做' + EDUinc + '次EDU的成长掷骰。';
				ReStr += '\n=======';
				break;
			case (old >= 40 && old <= 49):
				ReStr += '年齡调整：從STR、DEX或CON中減去' + Debuff + '点\n（请自行手动选擇计算）。\nAPP減去' + AppDebuff + '点。进行' + EDUinc + '次EDU的成长掷骰。';
				ReStr += '\n=======';
				ReStr += '\n（以下箭號三项，自选減去' + Debuff + '点。）';
				break;
			case (old >= 50):
				ReStr += '年齡调整：從STR、DEX或CON中減去' + Debuff + '点\n（從一，二或全部三项中选擇）\n（请自行手动选擇计算）。\nAPP減去' + AppDebuff + '点。进行' + EDUinc + '次EDU的成长掷骰。';
				ReStr += '\n=======';
				ReStr += '\n（以下箭號三项，自选減去' + Debuff + '点。）';
				break;

			default:
				break;
		}
		/**
		 * 
		 * ＳＴＲ：(4+6+4) * 5 = 70 ←（可选）
		ＤＥＸ：(1+6+1) * 5 = 40
		ＰＯＷ：(2+2+2) * 5 = 30
		ＣＯＮ：(4+3+6) * 5 = 65
		ＡＰＰ：(2+1+1) * 5 = 20
		ＳＩＺ：((3+4)+6) * 5 = 65 ←（可选）
		ＩＮＴ：((6+2)+6) * 5 = 70
		ＥＤＵ：(((4+6)+6) * 5)-5 = 75
		 */
		let randomState = shuffle(eightState);
		let randomStateNumber = checkState(randomState);
		ReStr += '\nＳＴＲ：' + randomStateNumber[0];
		if (old >= 40) ReStr += ' ←（可选） ';
		if (old < 20) ReStr += ' ←（可选）';

		ReStr += '\nＤＥＸ：' + randomStateNumber[1];
		if (old >= 40) ReStr += ' ← （可选）';

		ReStr += '\nＰＯＷ：' + randomStateNumber[2];

		ReStr += '\nＣＯＮ：' + randomStateNumber[3];
		if (old >= 40) ReStr += ' ← （可选）'

		if (old >= 40) {
			ReStr += '\nＡＰＰ：' + `${randomStateNumber[4]}-${AppDebuff} = ${randomStateNumber[4] - AppDebuff}`;
		} else ReStr += '\nＡＰＰ：' + randomStateNumber[4];


		ReStr += '\nＳＩＺ：' + randomStateNumber[5];
		if (old < 20) {
			ReStr += ' ←（可选）';
		}

		ReStr += '\nＩＮＴ：' + randomStateNumber[6]

		if (old < 20) ReStr += '\nＥＤＵ：' + randomStateNumber[7];
		else {
			ReStr += '\n=======';
			ReStr += '\nＥＤＵ初始值：' + randomStateNumber[7]

			let tempEDU = + randomStateNumber[7]

			for (let i = 1; i <= EDUinc; i++) {
				let EDURoll = rollbase.Dice(100);
				ReStr += '\n第' + i + '次EDU成长 → ' + EDURoll;
				if (EDURoll > tempEDU) {
					let EDUplus = rollbase.Dice(10);
					ReStr += ' → 成长' + EDUplus + '点';
					tempEDU = tempEDU + EDUplus;
				} else {
					ReStr += ' → 没有成长';
				}
			}
			ReStr += '\n';
			ReStr += '\nＥＤＵ最終值：' + tempEDU;
		}
		ReStr += '\n=======';
		const tempBuildLuck = [rollbase.BuildDiceCal('3d6*5'), rollbase.BuildDiceCal('3d6*5')]
		const tempLuck = [tempBuildLuck[0].match(/\d+$/), tempBuildLuck[1].match(/\d+$/)]

		if (old < 20) {
			ReStr += '\nＬＵＫ第一次：' + `${tempBuildLuck[0]} \nＬＵＫ第二次： ${tempBuildLuck[1]}`;
			ReStr += '\nＬＵＫ最終值：' + Math.max(...tempLuck);
		}
		else {
			ReStr += '\nＬＵＫ：' + `${tempBuildLuck[0]} `;
		}

		//ReStr += '\nＬＵＫ：' + rollbase.BuildDiceCal('3d6*5');
		//if (old < 20) ReStr += '\nＬＵＫ加骰：' + rollbase.BuildDiceCal('3D6*5');
		ReStr += `\n==本職技能==`
		let occAndOtherSkills = getOccupationSkill(randomState);
		for (let index = 0; index < occAndOtherSkills.finalOSkillList.length; index++) {
			ReStr += `\n ${occAndOtherSkills.finalOSkillList[index]} ${eightskillsNumber[index]}`

		}
		ReStr += `\n==其他技能==`
		for (let index = 0; index < occAndOtherSkills.finalOtherSkillList.length; index++) {
			ReStr += `\n ${occAndOtherSkills.finalOtherSkillList[index].name} ${occAndOtherSkills.finalOtherSkillList[index].skill + 20}`

		}
		ReStr += `\n=======\n${PcBG()}`;
		return ReStr;
	}
}

class AgeBuilder {
	static pattern() {
		return /^\d+$/i;
	}

	build(text) {
		let old = "";
		let ReStr = "调查员年齡設为：";
		if (text) old = text.replace(/\D/g, '');
		if (old) {
			ReStr += old + '\n';
		}
		//設定 因年齡減少的点数 和 EDU加骰次数
		let Debuff = 0;
		let AppDebuff = 0;
		let EDUinc = 0;
		if (old < 7) {
			ReStr += '\n等等，核心規则或日本拓展没有適用小於7歲的人物哦。\n先当成15歲處理\n';
			old = 15;
		}

		if (old >= 7 && old <= 14) {
			ReStr += '\n等等，核心規则没有適用小於15歲的人物哦。\n先使用日本CoC 7th 2020 拓展 - 7到14歲的幼年调查员規则吧\n';
		}
		if (old >= 90) {
			ReStr += '\n等等，核心規则没有適用於90歲以上的人物哦。\n先当成89歲處理\n';
			old = 89;
		}
		for (let i = 0; old >= oldArr[i]; i++) {
			Debuff = DebuffArr[i];
			AppDebuff = AppDebuffArr[i];
			EDUinc = EDUincArr[i];
		}
		ReStr += '=======\n';
		switch (true) {
			case (old >= 7 && old <= 14):
				{
					if (old >= 7 && old <= 12) {
						ReStr += '\nＳＴＲ：' + rollbase.BuildDiceCal('3d4*5');
						ReStr += '\nＤＥＸ：' + rollbase.BuildDiceCal('3d6*5');
						ReStr += '\nＰＯＷ：' + rollbase.BuildDiceCal('3d6*5');

						ReStr += '\nＣＯＮ：' + rollbase.BuildDiceCal('3d4*5');
						ReStr += '\nＡＰＰ：' + rollbase.BuildDiceCal('3d6*5');
						ReStr += '\nＳＩＺ：' + rollbase.BuildDiceCal('(2d3+6)*5');
						ReStr += '\nＩＮＴ：' + rollbase.BuildDiceCal('(2d6+6)*5');

					}
					if (old >= 13 && old <= 14) {
						ReStr += '\nＳＴＲ：' + rollbase.BuildDiceCal('(2d6+1)*5');
						ReStr += '\nＤＥＸ：' + rollbase.BuildDiceCal('3d6*5');
						ReStr += '\nＰＯＷ：' + rollbase.BuildDiceCal('3d6*5');

						ReStr += '\nＣＯＮ：' + rollbase.BuildDiceCal('(2d6+1)*5');
						ReStr += '\nＡＰＰ：' + rollbase.BuildDiceCal('3d6*5');
						ReStr += '\nＳＩＺ：' + rollbase.BuildDiceCal('(2d4+6)*5');
						ReStr += '\nＩＮＴ：' + rollbase.BuildDiceCal('(2d6+6)*5');

					}
					for (let i = 0; old >= OldArr2020[i]; i++) {
						EDUinc = EDUincArr2020[i];
					}
					ReStr += '\nＥＤＵ：' + EDUinc;
					const tempBuildLuck = [rollbase.BuildDiceCal('3d6*5'), rollbase.BuildDiceCal('3d6*5')]
					const tempLuck = [tempBuildLuck[0].match(/\d+$/), tempBuildLuck[1].match(/\d+$/)]
					ReStr += '\nＬＵＫ第一次：' + `${tempBuildLuck[0]} \nＬＵＫ第二次： ${tempBuildLuck[1]}`;
					ReStr += '\nＬＵＫ最終值：' + Math.max(...tempLuck);
					ReStr += '\n\n幼年调查员的特性：' + rollbase.BuildDiceCal('2d6');
					ReStr += '\n幼年调查员的家境：' + rollbase.BuildDiceCal('1D100');
					ReStr += '\n幼年调查员可受「幫忙」的次数：' + Math.round((17 - old) / 3);
					return ReStr;
				}

			case (old >= 15 && old <= 19):
				ReStr += '年齡调整：從STR或SIZ中減去' + Debuff + '点\n（请自行手动选擇计算）。\nEDU減去5点。LUK骰两次取高。';
				ReStr += '\n=======';
				ReStr += '\n（以下箭號两项，減值' + Debuff + '点。）';
				break;
			case (old >= 20 && old <= 39):
				ReStr += '年齡调整：可做' + EDUinc + '次EDU的成长掷骰。';
				ReStr += '\n=======';
				break;
			case (old >= 40 && old <= 49):
				ReStr += '年齡调整：從STR、DEX或CON中減去' + Debuff + '点\n（请自行手动选擇计算）。\nAPP減去' + AppDebuff + '点。进行' + EDUinc + '次EDU的成长掷骰。';
				ReStr += '\n=======';
				ReStr += '\n（以下箭號三项，自选減去' + Debuff + '点。）';
				break;
			case (old >= 50):
				ReStr += '年齡调整：從STR、DEX或CON中減去' + Debuff + '点\n（從一，二或全部三项中选擇）\n（请自行手动选擇计算）。\nAPP減去' + AppDebuff + '点。进行' + EDUinc + '次EDU的成长掷骰。';
				ReStr += '\n=======';
				ReStr += '\n（以下箭號三项，自选減去' + Debuff + '点。）';
				break;

			default:
				break;
		}
		ReStr += '\nＳＴＲ：' + rollbase.BuildDiceCal('3d6*5');
		if (old >= 40) ReStr += ' ←（可选） ';
		if (old < 20) ReStr += ' ←（可选）';

		ReStr += '\nＤＥＸ：' + rollbase.BuildDiceCal('3d6*5');
		if (old >= 40) ReStr += ' ← （可选）';

		ReStr += '\nＰＯＷ：' + rollbase.BuildDiceCal('3d6*5');

		ReStr += '\nＣＯＮ：' + rollbase.BuildDiceCal('3d6*5');
		if (old >= 40) ReStr += ' ← （可选）'

		if (old >= 40) {
			ReStr += '\nＡＰＰ：' + rollbase.BuildDiceCal('(3d6*5)-' + AppDebuff)
		} else ReStr += '\nＡＰＰ：' + rollbase.BuildDiceCal('3d6*5');


		ReStr += '\nＳＩＺ：' + rollbase.BuildDiceCal('(2d6+6)*5');
		if (old < 20) {
			ReStr += ' ←（可选）';
		}

		ReStr += '\nＩＮＴ：' + rollbase.BuildDiceCal('(2d6+6)*5');

		if (old < 20) ReStr += '\nＥＤＵ：' + rollbase.BuildDiceCal('((2d6+6)*5)-5');
		else {
			let firstEDU = '(' + rollbase.BuildRollDice('2d6') + '+6)*5';
			ReStr += '\n=======';
			ReStr += '\nＥＤＵ初始值：' + firstEDU + ' = ' + eval(firstEDU);

			let tempEDU = eval(firstEDU);

			for (let i = 1; i <= EDUinc; i++) {
				let EDURoll = rollbase.Dice(100);
				ReStr += '\n第' + i + '次EDU成长 → ' + EDURoll;
				if (EDURoll > tempEDU) {
					let EDUplus = rollbase.Dice(10);
					ReStr += ' → 成长' + EDUplus + '点';
					tempEDU = tempEDU + EDUplus;
				} else {
					ReStr += ' → 没有成长';
				}
			}
			ReStr += '\n';
			ReStr += '\nＥＤＵ最終值：' + tempEDU;
		}
		ReStr += '\n=======';

		const tempBuildLuck = [rollbase.BuildDiceCal('3d6*5'), rollbase.BuildDiceCal('3d6*5')]
		const tempLuck = [tempBuildLuck[0].match(/\d+$/), tempBuildLuck[1].match(/\d+$/)]
		if (old < 20) {
			ReStr += '\nＬＵＫ第一次：' + `${tempBuildLuck[0]} \nＬＵＫ第二次： ${tempBuildLuck[1]}`;
			ReStr += '\nＬＵＫ最終值：' + Math.max(...tempLuck);
		}
		else {
			ReStr += '\nＬＵＫ：' + `${tempBuildLuck[0]} `;
		}


		//ReStr += '\nＬＵＫ：' + rollbase.BuildDiceCal('3d6*5');
		//if (old < 20) ReStr += '\nＬＵＫ加骰：' + rollbase.BuildDiceCal('3D6*5');
		ReStr += '\n=======\n煤油燈特徵: 1D6&1D20 → ' + rollbase.Dice(6) + ',' + rollbase.Dice(20);
		return ReStr;
	}
}

class XYZBuilder {
	static pattern() {
		return /^([.])/i;
	}

	build(text, age) {
		this.x = (text.match(/[.]\d+/i) && text[1]) || 5;
		this.y = (text.match(/[.]\d+/i) && text[2]) || 3;
		this.z = (text.match(/[.]\d+/i) && text[3]) || 0;
		this.age = age?.match(/^\d+/i) || 0;
		let ReStr = `自由分配属性点数创角方案
=======
`;
		for (let i = 0; i < this.x; i++) {
			ReStr += `${rollbase.BuildDiceCal('3d6*5')}\n`
		}
		if (this.x) ReStr += `=======\n`
		for (let i = 0; i < this.y; i++) {
			ReStr += `${rollbase.BuildDiceCal('(2d6+6)*5')}\n`
		}
		if (this.y) ReStr += `=======\n`
		for (let i = 0; i < this.z; i++) {
			ReStr += `${rollbase.BuildDiceCal('3d6*5')}\n`
		}
		if (this.z) ReStr += `=======\n`
		if (this.age && !isNaN(this.age)) {
			ReStr += `${this.ageAdjustment(this.age)}`
			//設定 因年齡減少的点数 和 EDU加骰次数
		} else {
			ReStr += `没有年齡调整\n如果在后面加上年齡，就會自动计算年齡调整 如 
.cc7build .533 40`;
			const tempBuildLuck = [rollbase.BuildDiceCal('3d6*5'), rollbase.BuildDiceCal('3d6*5')]
			ReStr += '\n=======\nＬＵＫ：' + `${tempBuildLuck[0]} `;
		}


		return ReStr;
	}
	ageAdjustment(age) {
		let Debuff = 0;
		let AppDebuff = 0;
		let EDUinc = 0;
		let ReStr = '';
		let newAge = age;
		if (newAge < 15) newAge = 15;
		if (newAge > 89) age = 89;
		for (let i = 0; newAge >= oldArr[i]; i++) {
			Debuff = DebuffArr[i];
			AppDebuff = AppDebuffArr[i];
			EDUinc = EDUincArr[i];
		}
		ReStr += '年齡：' + newAge + '\n';
		switch (true) {
			case (newAge >= 15 && newAge <= 19):
				ReStr += '年齡调整：從STR或SIZ中減去' + Debuff + '点\n（请自行手动选擇计算）。\nEDU減去5点。';
				ReStr += '\n=======';
				break;
			case (newAge >= 20 && newAge <= 39):
				ReStr += '年齡调整：可做' + EDUinc + '次EDU的成长掷骰。';
				ReStr += '\n=======';
				break;
			case (newAge >= 40 && newAge <= 49):
				ReStr += '年齡调整：從STR、DEX或CON中減去' + Debuff + '点\n（请自行手动选擇计算）。\nAPP減去' + AppDebuff + '点。进行' + EDUinc + '次EDU的成长掷骰。';
				ReStr += '\n=======';
				break;
			case (newAge >= 50):
				ReStr += '年齡调整：從STR、DEX或CON中減去' + Debuff + '点\n（從一，二或全部三项中选擇）\n（请自行手动选擇计算）。\nAPP減去' + AppDebuff + '点。进行' + EDUinc + '次EDU的成长掷骰。';
				ReStr += '\n=======';
				break;

			default:
				break;
		}
		for (let i = 1; i <= EDUinc; i++) {
			let EDURoll = rollbase.Dice(100);
			ReStr += '\n第' + i + '次EDU成长 → ' + EDURoll;

			let EDUplus = rollbase.Dice(10);
			ReStr += ' → 如果高於现有EDU，则成长' + EDUplus + '点';
		}
		const tempBuildLuck = [rollbase.BuildDiceCal('3d6*5'), rollbase.BuildDiceCal('3d6*5')]
		const tempLuck = [tempBuildLuck[0].match(/\d+$/), tempBuildLuck[1].match(/\d+$/)]
		if (newAge < 20) {
			ReStr += '\nＬＵＫ第一次：' + `${tempBuildLuck[0]} \nＬＵＫ第二次： ${tempBuildLuck[1]}`;
			ReStr += '\nＬＵＫ最終值：' + Math.max(...tempLuck);
		}
		else {
			ReStr += '\n=======\nＬＵＫ：' + `${tempBuildLuck[0]} `;
		}
		ReStr += '\n=======\n煤油燈特徵: 1D6&1D20 → ' + rollbase.Dice(6) + ',' + rollbase.Dice(20);
		return ReStr;
	}
}

const builder = new Build7Char();
builder.defaultBuiler(RandomBuilder);
builder.registerBuilder(RandomBuilder.pattern(), RandomBuilder);
builder.registerBuilder(XYZBuilder.pattern(), XYZBuilder);
builder.registerBuilder(AgeBuilder.pattern(), AgeBuilder);




