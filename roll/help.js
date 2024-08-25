"use strict";
const fs = require('node:fs');
const axios = require('axios');
const Dice = [],
	Tool = [],
	admin = [],
	funny = [],
	help = [],
	link = [];
const start = async () => {
	try {
		const commandFiles = fs.readdirSync('./roll/').filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			const tryFile = require(`../roll/${file}`);
			if (tryFile.gameType && tryFile.gameType()) {
				let type = require('./' + file).gameType().replace(/:.*/i, '')
				let name = file.replace('.js', '');
				exports[type + '_' + name] = await require('./' + file);
			}

		}
	} catch (error) {
		console.error('help.js error: ', error)
	}
	for (let name of Object.keys(exports)) {
		if (name.match(/^DICE/i)) {
			Dice.push(exports[name])
		}
		if (name.match(/^Tool/i)) {
			Tool.push(exports[name]);
		}
		if (name.match(/^admin/i)) {
			admin.push(exports[name]);
		}
		if (name.match(/^funny/i)) {
			funny.push(exports[name]);
		}
		if (name.match(/^help/i)) {
			help.push(exports[name]);
		}
		if (name.match(/^link/i)) {
			link.push(exports[name]);
		}
	}
}
start();
let variables = {};
//heroku labs:enable runtime-dyno-metadata -a <app name>




const gameName = function () {
	return '骰子机器人HKTRPG说明';
}

const gameType = function () {
	return 'bothelp:hktrpg'
}
const prefixs = function () {
	return [{
		first: /^bothelp$/i,
		second: null
	}]

}
const getHelpMessage = async function () {
	return `【暗骰功能】
在指令前输入dr 结果會私訊你
ddr dddr 可以私訊已設定的群組GM, 詳情可打.drgm查詢

【基本掷骰】1d100(khN|klN|dhN|dlN)
例如输入(2d6+1)*2 攻撃！
會输出）(2d6+1)*2：攻撃！  (10[5+5]+1)2 = 22
如上面一樣,在骰子数字后方隔空白位打字,可以进行发言。

.5 3D6 ：	分別骰出5次3d6 最多30次
((2d6+1)*2)-5/2>=10 支援括號加減乘除及大於小於(>,<,>=,<=)计算
支援kh|kl|dh|dl，k keep保留，d drop 放棄，h highest最高，l lowest最低
如3d6kh 保留最大的1粒骰，3d6dl2 放棄最小的2粒骰

【RPG Dice Roller掷骰】.rr
RPG Dice Roller 是英语系統常用掷骰功能
Foundry VTT也是使用它
和基本掷骰不同
有更多仔细的掷骰命令，如1d10r1 5d10!k2


掷骰指令请看
https://dice-roller.github.io/documentation/guide/notation/
 
 `
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
		text: '',
		quotes: true
	};
	//let result = {};
	switch (true) {
		case !mainMsg[1]:
			rply.text =
				`【骰娘爱你哦💖】(${await version.version()})
请问有什么可以帮助你?
请输入你想查询的项目名字.
或到 (https://bothelp.hktrpg.com/) 观看详细使用说明.
-------
bothelp ver		- 查询详细版本及公告
bothelp Base	- 查询trpg 基本掷骰指令🎲
bothelp Dice	- 查询trpg 不同系统掷骰指令💻
bothelp Tool	- 查询trpg 辅助工具🧰
bothelp admin	- 查询系统工具⚙️
bothelp funny	- 查询趣味功能😂
bothelp link	- 查询HKTRPG 不同平台连结🔗
bothelp privacy	- 查询HKTRPG 的隐私权条款🔒
bothelp about	- 查询HKTRPG 历史📜
`
			rply.buttonCreate = ['bothelp ver', 'bothelp Base', 'bothelp Dice', 'bothelp Tool', 'bothelp admin', 'bothelp funny', 'bothelp link', 'bothelp privacy', 'bothelp about']

			return rply;
		case /^ver$/i.test(mainMsg[1]):
			rply.text = `${await version.version()}
最近更新: 
2019/07/21 香港克警合作 黑ICON紀念
...前略...
2022/05 https://www.patreon.com/posts/hktrpg-wu-yue-66190934
2022/04	https://www.patreon.com/posts/hktrpg-4yue-geng-65565589
2022/03	https://www.patreon.com/posts/3yue-geng-xin-64158733
2022/02	https://www.patreon.com/posts/2yue-geng-xin-62329216
2022/01	https://www.patreon.com/posts/hktrpg-1yue-geng-60706957
`;
			return rply;
		case /^BASE/i.test(mainMsg[1]):
			rply.text = await getHelpMessage();
			rply.buttonCreate = ['dr 1d100', '2d6+10 攻擊', '.5 3d6', '.5 4d6dl1', '.rr 5d10!k2']
			return rply;
		case /^about$/i.test(mainMsg[1]):
			rply.text = `关於HKTRPG

HKTRPG來源自 机器鸭霸兽 https://docs.google.com/document/d/1dYnJqF2_QTp90ld4YXj6X8kgxvjUoHrB4E2seqlDlAk/edit	
最早由LarryLo Retsnimle开发，
是一个开放源碼骰子机器人计畫，供他人使用开发和使用。

现在的HKTRPG基礎是根據該计畫而开发，
感謝当时源碼大量的注釋，讓当时第一次接觸JS的我，
慢慢学到怎寫CODE。

现在HKTRPG 以GNU GENERAL PUBLIC LICENSE授權，
是被廣泛使用的自由軟体授權条款，給予了終端使用者运行、学习、共享和修改軟体的自由。
`
			return rply;
		case /^Dice/i.test(mainMsg[1]):
			if (mainMsg[1].match(/^DICE$/i)) {
				rply.text = '输入 bothelp Dice序號 如bothelp Dice1 即可看到內容\n'
				rply.buttonCreate = [];
				for (let num in Dice) {
					rply.text += num + ": " + Dice[num].gameName() + '\n';
					rply.buttonCreate.push('bothelp Dice' + num);
				}
			}
			if (mainMsg[1].match(/^Dice\d+$/i)) {
				let temp = mainMsg[1].replace(/^dice/i, '');
				if (!Dice[temp]) return;
				rply.text = await Dice[temp].getHelpMessage();
			}
			return rply;
		case /^Tool/i.test(mainMsg[1]):
			if (mainMsg[1].match(/^Tool$/i)) {
				rply.text = '输入 bothelp Tool序號 如bothelp Tool1 即可看到內容\n'
				rply.buttonCreate = [];
				for (let num in Tool) {
					rply.text += num + ": " + Tool[num].gameName() + '\n';
					rply.buttonCreate.push('bothelp Tool' + num);
				}
			}
			if (mainMsg[1].match(/^Tool\d+$/i)) {
				let temp = mainMsg[1].replace(/^Tool/i, '');
				if (!Tool[temp]) return;
				rply.text = await Tool[temp].getHelpMessage();
			}
			return rply;
		case /^privacy/i.test(mainMsg[1]): {
			rply.text = "隱私權聲明\nhttps://bothelp.hktrpg.com/hktrpg-guan-fang-shi-yong-jiao-xue/qi-ta-qing-bao/yin-si-quan-sheng-ming";
			return rply;
		}
		case /^admin/i.test(mainMsg[1]):
			if (mainMsg[1].match(/^admin$/i)) {
				rply.text = '输入 bothelp admin序號 如bothelp admin1 即可看到內容\n';
				rply.buttonCreate = [];
				for (let num in admin) {
					rply.text += num + ": " + admin[num].gameName() + '\n';
					rply.buttonCreate.push('bothelp admin' + num);
				}
			}
			if (mainMsg[1].match(/^admin\d+$/i)) {
				let temp = mainMsg[1].replace(/^admin/i, '');
				if (!admin[temp]) return;
				rply.text = await admin[temp].getHelpMessage();
			}
			return rply;

		case /^funny/i.test(mainMsg[1]):
			if (mainMsg[1].match(/^funny$/i)) {
				rply.text = '输入 bothelp funny序號 如bothelp funny1 即可看到內容\n';
				rply.buttonCreate = [];
				for (let num in funny) {
					rply.text += num + ": " + funny[num].gameName() + '\n';
					rply.buttonCreate.push('bothelp Funny' + num);
				}
			}
			if (mainMsg[1].match(/^funny\d+$/i)) {
				let temp = mainMsg[1].replace(/^funny/i, '');
				if (!funny[temp]) return;
				rply.text = await funny[temp].getHelpMessage();
			}
			return rply;

		case /^help/i.test(mainMsg[1]):
			if (mainMsg[1].match(/^help$/i)) {
				rply.text = '输入 bothelp help序號 如bothelp help1 即可看到內容\n';
				rply.buttonCreate = [];
				for (let num in help) {
					rply.text += num + ": " + help[num].gameName() + '\n';
					rply.buttonCreate.push('bothelp help' + num);
				}
			}
			if (mainMsg[1].match(/^help\d+$/i)) {
				let temp = mainMsg[1].replace(/^help/i, '');
				if (!help[temp]) return;
				rply.text = await help[temp].getHelpMessage();
			}
			return rply;

		case /^link/i.test(mainMsg[1]):
			rply.text = `TRPG百科 https://www.hktrpg.com/
Discord支援群 https://support.hktrpg.com
			
邀请HKTRPG 加入
Line 邀请連结 http://bit.ly/HKTRPG_LINE
Discord 邀请連结 https://discord.hktrpg.com
Telegram 邀请連结 http://t.me/hktrpg_bot
網頁版 邀请連结 https://rollbot.hktrpg.com/
簡易網上掷骰網頁 https://roll.hktrpg.com/
			
HKTRPG 研究社 Facebook https://www.facebook.com/groups/HKTRPG
解锁功能及贊助 https://www.patreon.com/HKTRPG 
源代碼 http://bit.ly/HKTRPG_GITHUB
`
			return rply;
		/**
	case /^report/i.test(mainMsg[1]):
		rply.text = await this.getHelpMessage();
		return rply;

		 */
		case /^req/i.test(mainMsg[1]):
			rply.text = `请到以下问卷填寫意見，所有意見內容將改善RollBot
			https://forms.gle/uXq6taCPGJ2M99Gp9`
			return rply;
		default:
			break;
	}
}

class Version {
	constructor() {
		this.repo = 'hktrpg/TG.line.Discord.Roll.Bot';
		this.filesCourt = 0;
		this.pullsNumber = 0;
		this.lastUpdate = '00000000';
	}
	async version() {
		await this.update();
		return `v1.${this.filesCourt}.${this.pullsNumber}.${this.lastUpdate}`
	}
	async update() {
		try {
			const {
				data
			} = await axios.get(`https://api.github.com/repos/${this.repo}/pulls?state=closed&sort=updated&direction=desc&per_page=1`);
			this.pullsNumber = data[0].number;
			this.lastUpdate = this.YYYYMMDD(data[0].merged_at);
		} catch (error) {
			console.log('help #302 version error: ', error)
		}
		this.filesCourt = Object.keys(exports).length;
	}
	YYYYMMDD(lastUpdateDate) {
		//2023-08-21T16:19:00Z
		const date = new Date(lastUpdateDate);
		const year = date.getFullYear().toString().slice(-2);
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		return `${year}${month}${day}`;

	}
}

const version = new Version();
/**
 * if (botname == "Line")
				rply.text += "\n因为Line的机制, 如掷骰时並无显示用家名字, 请到下列網址,和机器人任意说一句话,成为好友. \n https://line.me/R/ti/p/svMLqy9Mik\nP.S. Line 修改政策，免費帳號的Line Bot现在有每月500次的私訊限制，超过时DR等私訊功能會失效。(可以認为这功能在Line已失效，半天已400个DR私訊要求)"
 */
module.exports = {
	rollDiceCommand: rollDiceCommand,
	initialize: initialize,
	getHelpMessage: getHelpMessage,
	prefixs: prefixs,
	gameType: gameType,
	gameName: gameName,
	Version: Version

};



/**
bothelp

请问有什么可以幫你?
请输入你想查詢的项目名字.
-------
bothelp ver    - 查詢版本及公告(xxxx时间更新)
bothelp Dice   - 查詢trpg 不同系統掷骰指令
bothelp Tool   - 查詢trpg 輔助工具
bothelp admin  - 查詢系統工具
bothelp funny  - 查詢趣味功能
bothelp link   - 查詢hktrpg 不同平台連结
bothelp report - 意見提供
-----
输入 1 或 bothelp 公告 或 bothelp 版本
【HKTRPG掷骰BOT】" + version
及公告
------
输入 2 或 bothelp Dice
0: 【进阶掷骰】 .ca (计算)|D66(sn)|5B10 Dx|5U10 x y|.int x y
2: 【克苏鲁神话】 cc cc(n)1~2 ccb ccrt ccsu .dp .cc7build .cc6build .cc7bg
3: 【朱の孤塔】 .al (nALxp)
4: 【神我狩】 .kk (ET RT NT KT MTx)
5: 【迷宮王國】 .mk (nMK+m 及各种表)
6: 【亞俠必死的冒險】 .ss (nR>=x[y,z,c] SRx+y FumbleT)
7: 【忍神】 .sg (ST FT ET等各种表)
8: 【歌風】 .UK (nUK nUK@c or nUKc)
9: 【魔女狩獵之夜】.wn xDn+-y
10: 【DX2nd,3rd】 .dx (xDX+y@c ET)
11: 【命运Fate】 .4df(m|-)(加值)
12: 【永遠的后日談】 .nc (NM xNC+m xNA+m)
13: 【剑世界2.5】.sw (Kx Gr FT TT)
14: 【WOD黑暗世界】.xWDy
15: 【猫猫鬼差】.kc xDy z
------
输入 3 或 bothelp Tool
 (公測中)暗骰GM功能 .drgm (addgm del show) dr ddr dddr
 (公測中)角色卡功能 .char (add edit show delete use nonuse) .ch (set show showall)
 (公測中)儲存掷骰指令功能 .cmd (add del show 自定关鍵字)
------
输入 4 或 bothelp admin
.admin state
.admin
22: (公測中)掷骰开关功能 .bk (add del show)
------
输入 5 或 bothelp funny
1: 【趣味掷骰】 排序(至少3个选项) choice/随机(至少2个选项) 每日塔罗 运势 立flag .me
17: (公測中)经驗值功能 .level (show config LevelUpWord RankWord)
18: Wiki查詢/圖片搜索 .wiki .image
20: (公測中)自定義回應功能 .ra(p)(次数) (add del show 自定关鍵字)
23: (公測中)资料庫功能 .db(p) (add del show 自定关鍵字)
------
输入 6 或 bothelp link
DISCORD
TG
LINE
WWW
GITHUB
------
输入 7 或 bothelp report
可以立即回應東西
------
**/
