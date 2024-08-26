"use strict";
const fs = require("node:fs");
const axios = require("axios");
const Dice = [],
  Tool = [],
  admin = [],
  funny = [],
  help = [],
  link = [];
const start = async () => {
  try {
    const commandFiles = fs
      .readdirSync("./roll/")
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const tryFile = require(`../roll/${file}`);
      if (tryFile.gameType && tryFile.gameType()) {
        let type = require("./" + file)
          .gameType()
          .replace(/:.*/i, "");
        let name = file.replace(".js", "");
        exports[type + "_" + name] = await require("./" + file);
      }
    }
  } catch (error) {
    console.error("help.js error: ", error);
  }
  for (let name of Object.keys(exports)) {
    if (name.match(/^DICE/i)) {
      Dice.push(exports[name]);
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
};
start();
let variables = {};
//heroku labs:enable runtime-dyno-metadata -a <app name>

const gameName = function () {
  return "骰子机器人说明";
};

const gameType = function () {
  return "bothelp:骰娘爱你哦💖";
};
const prefixs = function () {
  return [
    {
      first: /^bothelp$/i,
      second: null,
    },
  ];
};
const getHelpMessage = async function () {
  return `【暗骰功能】
在指令前输入dr 结果会私信你
ddr dddr 可以私信已设定的社区GM, 详情可打.drgm查询

【基本掷骰】1d100(khN|klN|dhN|dlN)
例如输入(2d6+1)*2 攻击！
会输出）(2d6+1)*2：攻击！  (10[5+5]+1)2 = 22
如上面一样,在骰子数字后方隔空白位打字,可以进行发言。

.5 3D6 ：	分別骰出5次3d6 最多30次
((2d6+1)*2)-5/2>=10 支援括号加减乘除及大于小于(>,<,>=,<=)计算
支援kh|kl|dh|dl，k keep保留，d drop 放棄，h highest最高，l lowest最低
如3d6kh 保留最大的1粒骰，3d6dl2 放棄最小的2粒骰

【RPG Dice Roller掷骰】.rr
RPG Dice Roller 是英语系统常用掷骰功能
Foundry VTT也是使用它
和基本掷骰不同
有更多仔细的掷骰命令，如1d10r1 5d10!k2


掷骰指令请看
https://dice-roller.github.io/documentation/guide/notation/
 
 `;
};
const initialize = function () {
  return variables;
};

const rollDiceCommand = async function ({ mainMsg }) {
  let rply = {
    default: "on",
    type: "text",
    text: "",
    quotes: true,
  };
  //let result = {};
  switch (true) {
    case !mainMsg[1]:
      rply.text = `【骰娘爱你哦💖】
请问有什么可以帮助你?
请输入你想查询的项目名字.
或到 (https://bothelp.hktrpg.com/) 观看详细使用说明.
-------
bothelp Base	- 查询trpg 基本掷骰指令🎲
bothelp Dice	- 查询trpg 不同系统掷骰指令💻
bothelp Tool	- 查询trpg 辅助工具🧰
bothelp admin	- 查询系统工具⚙️
bothelp funny	- 查询趣味功能😂
`;
      rply.buttonCreate = [
        "bothelp Base",
        "bothelp Dice",
        "bothelp Tool",
        "bothelp admin",
        "bothelp funny",
      ];

      return rply;
    case /^BASE/i.test(mainMsg[1]):
      rply.text = await getHelpMessage();
      rply.buttonCreate = [
        "dr 1d100",
        "2d6+10 攻击",
        ".5 3d6",
        ".5 4d6dl1",
        ".rr 5d10!k2",
      ];
      return rply;
    case /^Dice/i.test(mainMsg[1]):
      if (mainMsg[1].match(/^DICE$/i)) {
        rply.text = "输入 bothelp Dice序号 如bothelp Dice1 即可看到內容\n";
        rply.buttonCreate = [];
        for (let num in Dice) {
          rply.text += num + ": " + Dice[num].gameName() + "\n";
          rply.buttonCreate.push("bothelp Dice" + num);
        }
      }
      if (mainMsg[1].match(/^Dice\d+$/i)) {
        let temp = mainMsg[1].replace(/^dice/i, "");
        if (!Dice[temp]) return;
        rply.text = await Dice[temp].getHelpMessage();
      }
      return rply;
    case /^Tool/i.test(mainMsg[1]):
      if (mainMsg[1].match(/^Tool$/i)) {
        rply.text = "输入 bothelp Tool序号 如bothelp Tool1 即可看到內容\n";
        rply.buttonCreate = [];
        for (let num in Tool) {
          rply.text += num + ": " + Tool[num].gameName() + "\n";
          rply.buttonCreate.push("bothelp Tool" + num);
        }
      }
      if (mainMsg[1].match(/^Tool\d+$/i)) {
        let temp = mainMsg[1].replace(/^Tool/i, "");
        if (!Tool[temp]) return;
        rply.text = await Tool[temp].getHelpMessage();
      }
      return rply;
    case /^admin/i.test(mainMsg[1]):
      if (mainMsg[1].match(/^admin$/i)) {
        rply.text = "输入 bothelp admin序号 如bothelp admin1 即可看到內容\n";
        rply.buttonCreate = [];
        for (let num in admin) {
          rply.text += num + ": " + admin[num].gameName() + "\n";
          rply.buttonCreate.push("bothelp admin" + num);
        }
      }
      if (mainMsg[1].match(/^admin\d+$/i)) {
        let temp = mainMsg[1].replace(/^admin/i, "");
        if (!admin[temp]) return;
        rply.text = await admin[temp].getHelpMessage();
      }
      return rply;

    case /^funny/i.test(mainMsg[1]):
      if (mainMsg[1].match(/^funny$/i)) {
        rply.text = "输入 bothelp funny序号 如bothelp funny1 即可看到內容\n";
        rply.buttonCreate = [];
        for (let num in funny) {
          rply.text += num + ": " + funny[num].gameName() + "\n";
          rply.buttonCreate.push("bothelp Funny" + num);
        }
      }
      if (mainMsg[1].match(/^funny\d+$/i)) {
        let temp = mainMsg[1].replace(/^funny/i, "");
        if (!funny[temp]) return;
        rply.text = await funny[temp].getHelpMessage();
      }
      return rply;

    case /^help/i.test(mainMsg[1]):
      if (mainMsg[1].match(/^help$/i)) {
        rply.text = "输入 bothelp help序号 如bothelp help1 即可看到內容\n";
        rply.buttonCreate = [];
        for (let num in help) {
          rply.text += num + ": " + help[num].gameName() + "\n";
          rply.buttonCreate.push("bothelp help" + num);
        }
      }
      if (mainMsg[1].match(/^help\d+$/i)) {
        let temp = mainMsg[1].replace(/^help/i, "");
        if (!help[temp]) return;
        rply.text = await help[temp].getHelpMessage();
      }
      return rply;
    default:
      break;
  }
};

module.exports = {
  rollDiceCommand: rollDiceCommand,
  initialize: initialize,
  getHelpMessage: getHelpMessage,
  prefixs: prefixs,
  gameType: gameType,
  gameName: gameName,
};

/**
bothelp

请问有什么可以帮你?
请输入你想查询的项目名字.
-------
bothelp ver    - 查询版本及公告(xxxx时间更新)
bothelp Dice   - 查询trpg 不同系统掷骰指令
bothelp Tool   - 查询trpg 輔助工具
bothelp admin  - 查询系统工具
bothelp funny  - 查询趣味功能
bothelp link   - 查询hktrpg 不同平台連结
bothelp report - 意见提供
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
9: 【魔女狩猎之夜】.wn xDn+-y
10: 【DX2nd,3rd】 .dx (xDX+y@c ET)
11: 【命运Fate】 .4df(m|-)(加值)
12: 【永远的后日談】 .nc (NM xNC+m xNA+m)
13: 【剑世界2.5】.sw (Kx Gr FT TT)
14: 【WOD黑暗世界】.xWDy
15: 【猫猫鬼差】.kc xDy z
------
输入 3 或 bothelp Tool
 (公测中)暗骰GM功能 .drgm (addgm del show) dr ddr dddr
 (公测中)角色卡功能 .char (add edit show delete use nonuse) .ch (set show showall)
 (公测中)储存掷骰指令功能 .cmd (add del show 自定关鍵字)
------
输入 4 或 bothelp admin
.admin state
.admin
22: (公测中)掷骰开关功能 .bk (add del show)
------
输入 5 或 bothelp funny
1: 【趣味掷骰】 排序(至少3个选项) choice/随机(至少2个选项) 每日塔罗 运势 立flag .me
17: (公测中)经验值功能 .level (show config LevelUpWord RankWord)
18: Wiki查询/图片搜索 .wiki .image
20: (公测中)自定义回应功能 .ra(p)(次数) (add del show 自定关鍵字)
23: (公测中)资料库功能 .db(p) (add del show 自定关鍵字)
------
输入 6 或 bothelp link
DISCORD
TG
LINE
WWW
GITHUB
------
输入 7 或 bothelp report
可以立即回应東西
------
**/
