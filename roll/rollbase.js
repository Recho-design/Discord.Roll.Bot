"use strict";
const math = require("mathjs");
const { Random, nodeCrypto } = require("random-js");
const { DiceRoller, DiceRoll } = require("@dice-roller/rpg-dice-roller");
const random = new Random(nodeCrypto);
const { SlashCommandBuilder } = require("discord.js");
//value = random.integer(1, 100);
const BASIC_ROLL_REGEX = /(\d+)d(\d+)(kh|kl|dh|dl|k|)(\d+|)/i;
//let Sided = [];
//Sided[10000] = [];
const variables = {};

const gameName = function () {
  return "【基本掷骰】.z xDy kl dh";
};

const gameType = function () {
  return "dice:rollbase:骰娘爱你哦💖";
};
const TEMP_REGEX =
  /^(?=.*\d+d\d+)(?!.*\d+(l|h))(?!.*(k)$)(?!.*(l|h)(l|h|k|d))(?!.*(k|d)(k|d))(?!.*^[a-z])(?!.*[a-c])(?!.*[e-g])(?!.*[i-j])(?!.*[m-z])(?!.*(([d]|[+]|[-]|[*]|[/])([d]|[+]|[-]|[*]|[/])))(?!.*(^([d]|[+]|[-]|[*]|[/]|[<]|[>]|[=]|[)])))(?!.*([(][)]))(?!.*([<][<]))(?!.*([>][>]))(?!.*([<][>]))(?!.*([>][<]))(?!.*(\d+[d]+\d+[d]([^h|l]))|([)]\d))(?!.*(([d]|[+]|[-]|[*]|[/]|[<]|[>]|[=]|[(])$))(?!.*([@]|[!]|[#]|[$]|[%]|[&]|[_]|[~]|[`]|[']|[?]|\.))(?!.*([\u4e00-\u9fa5]))(?!.*([=].*[=]))(?!.*([+]|[-]|[*]|[/])[=])(?!.*[=]([+]|[-]|[*]|[/]|[>]|[<]))(?!.*(\d)[=](\d))(?!.*([-][>])|([-][<])|([<][-])|([>][-]))(?!.*(d)[(]).*$/gi;
const prefixs = function () {
  return [
    {
      first: TEMP_REGEX,
      second: null,
    },
    {
      first: /(^[1-9]$)|(^[1-2][0-9]$)|(^[3][0]$)/i,
      second: TEMP_REGEX,
    },
    {
      first: /^.rr$/i,
      second: null,
    },
  ];
};

///^(?=.*he)(?!.*da).*$/ig
const getHelpMessage = function () {
  return `【基本掷骰】1d100(khN|klN|dhN|dlN)
例如输入(2d6 1)*2  攻击！
会输出）(2d6 1)*2：攻击！  (10[5 5] 1)2 = 22
如上面一样,在骰子数字后方隔空白位打字,可以进行发言。
5 3D6 ：	分别骰出5次3d6 最多30次
((2d6 1)*2)-5/2>=10 支援括号加减乘除及大于小于(>,<,>=,<=)计算
支援kh|kl|dh|dl，k keep保留，d drop 放弃，h highest最高，l lowest最低
如3d6kh 保留最大的1粒骰，3d6dl2 放弃最小的2粒骰
`;
};
const initialize = function () {
  return variables;
};

const rollDiceCommand = function ({ mainMsg, inputStr }) {
  let rply = {
    default: "on",
    type: "text",
    text: "",
  };
  switch (true) {
    case /^\.rr$/i.test(mainMsg[0]): {
      try {
        const roll = new DiceRoll(inputStr.replace(/^[.]rr\s+/i, ""));
        rply.text = roll.output;
      } catch (err) {
        rply.text += `${err.name}  \n ${err.message}`;
        rply.text += `\n 掷骰说明 https://dice-roller.github.io/documentation/guide/notation/dice.html#standard-d-n`;
      }

      return rply;
    }

    default:
      try {
        rply.text = nomalDiceRoller(mainMsg[0], mainMsg[1], mainMsg[2]);
        return rply;
      } catch (error) {
        return rply;
      }
  }
};

/**
 * 掷骰子运算
 * @param {纯数字, 10即骰出1D100} diceSided
 */

const Dice = function (diceSided) {
  let result = "";
  result = random.integer(1, Math.floor(diceSided));
  return result;
};

const DiceINT = function (start, end) {
  let result = "";
  let points = [Math.floor(start), Math.floor(end)];
  points.sort(function (a, b) {
    return a - b;
  });
  result = random.integer(points[0], points[1]);
  return result;
};

const sortNumber = function (a, b) {
  return a - b;
};

const RollDice = function (inputStr) {
  // 先把inputStr变成字串（不知道为什么非这样不可）
  //kh kl dh dl
  //kh or khN Keeps highest N
  //kl or klN Keeps lowest N
  //dh or dhN Drops highest N
  //dl or dlN Drops lowest N
  let comStr = inputStr;
  //12d5kh5,12,5,kh,5
  let finalStr = "[";
  let temp = [];
  let temp2 = [];
  let totally = 0;
  if (!comStr[1] || !comStr[2]) return;

  for (let i = 0; i < comStr[1]; i++) {
    temp[i] = Dice(comStr[2]);
    temp2[i] = temp[i];
  }
  if (comStr[3]) {
    if (comStr[3].match(/^k$/i)) {
      comStr[3] = "kh";
    }
    //由大至细
    temp2.sort(function (a, b) {
      return b - a;
    });
  }
  if (!comStr[4]) comStr[4] = 1;
  switch (comStr[3].toLowerCase()) {
    case "kh": //khN Keeps highest N
      for (let i = 0; i < temp2.length; i++) {
        if (i < comStr[4]) totally += temp2[i];
      }
      break;
    case "kl": //klN Keeps lowest N
      for (let i = 0; i < temp2.length; i++) {
        if (i >= temp2.length - comStr[4]) totally += temp2[i];
      }
      break;
    case "dh": //Drops highest N
      for (let i = 0; i < temp2.length; i++) {
        if (i >= comStr[4]) totally += temp2[i];
      }
      break;
    case "dl": //dlN Drops lowest N
      for (let i = 0; i < temp2.length; i++) {
        if (i < temp2.length - comStr[4]) totally += temp2[i];
      }
      break;
    default:
      for (let i = 0; i < temp.length; i++) {
        totally += temp[i];
      }
      break;
  }
  //totally += temp
  //finalStr = finalStr + temp + '+'

  finalStr = finalStr + temp + "+";

  if (!comStr[3]) finalStr = finalStr.replace(/,/gi, "+");
  finalStr = finalStr.substring(0, finalStr.length - 1) + "]";
  finalStr = finalStr.replace("[", totally + "[");
  return finalStr;
};

const FunnyDice = function (diceSided) {
  return random.integer(0, Math.floor(diceSided)); // 猜拳，从0开始
};

const BuildDiceCal = function (inputStr) {
  // 首先判斷是否是误啟动（检查是否有符合骰子格式）
  if (inputStr.toLowerCase().match(/\d+d\d+/i) == null) return undefined;
  // 排除小数点
  if (inputStr.toString().match(/\./) != null) return undefined;
  // 先定义要输出的Str
  let finalStr = "";
  // 一般单次掷骰
  let DiceToRoll = inputStr.toString().toLowerCase();
  if (DiceToRoll.match("d") == null) return undefined;
  // 写出算式
  let equation = DiceToRoll;
  while (equation.match(/\d+d\d+/i) != null) {
    let tempMatch = equation.match(/\d+d\d+/i);
    if (tempMatch.toString().split("d")[0] > 200) return;
    //不支援200D以上掷骰

    if (
      tempMatch.toString().split("d")[1] == 1 ||
      tempMatch.toString().split("d")[1] > 500
    )
      return;
    equation = equation.replace(/\d+d\d+/i, BuildRollDice(tempMatch));
  }

  // 计算算式
  let answer = math
    .evaluate(equation.toString())
    .toString()
    .replace(/true/i, "成功")
    .replace(/false/i, "失败");
  finalStr = equation + " = " + answer;

  return finalStr;
};

const shuffleTarget = function (target) {
  return random.shuffle(target);
};

const BuildRollDice = function (inputStr) {
  // 先把inputStr变成字串（不知道为什么非这样不可）
  let comStr = inputStr.toString().toLowerCase();
  let finalStr = "(";

  for (let i = 1; i <= comStr.split("d")[0]; i++) {
    finalStr = finalStr + Dice(comStr.split("d")[1]) + "+";
  }
  finalStr = finalStr.substring(0, finalStr.length - 1) + ")";
  return finalStr;
};

/**
 * 普通ROLL
 * @param {1D100 || 5} text0
 * @param {文字描述 || 1D100} text1
 * @param {文字描述} text2
 */
const nomalDiceRoller = function (text0, text1, text2) {
  // 首先判斷是否是误啟动（检查是否有符合骰子格式）
  // if (inputStr.toLowerCase().match(/\d+d\d+/) == null) return undefined
  // 再来先把第一个分段拆出来，待会判斷是否是复数掷骰
  let mutiOrNot = text0.toLowerCase();
  // 排除小数点
  if (mutiOrNot.toString().match(/\./) != null) return;
  // 先定义要输出的Str
  let finalStr = "";
  let test1 = text0.match(/[(]/g) || "";
  let test2 = text0.match(/[)]/g) || "";
  if (test2.length != test1.length) return;
  //d h k l
  //for (i = 0; i < mutiOrNot; i++) {
  if (mutiOrNot.toString().match(/\D/i) == null && text1) {
    if (
      text1.replace(
        /\d|[+]|[-]|[*]|[/]|[(]|[)]|[d]|[>]|[<]|[=]|[k]|[h]|[l]/gi,
        ""
      )
    )
      return;
    finalStr = text0 + "次掷骰：\n" + text1 + " " + (text2 || "") + "\n";
    for (let i = 0; i < mutiOrNot; i++) {
      let answer = onetimeroll(text1);
      if (answer) finalStr += i + 1 + "# " + answer + "\n";
      else return;
    }
  } else {
    if (
      text0.replace(
        /\d|[+]|[-]|[*]|[/]|[(]|[)]|[d]|[>]|[<]|[=]|[k]|[h]|[l]/gi,
        ""
      )
    )
      return;
    finalStr = text0 + "：" + (text1 || "") + "\n";
    let answer = onetimeroll(text0);
    if (answer) finalStr += answer;
    else return;
  }
  return finalStr.replace(/[*]/g, " * ");
};

// 单次掷骰
function onetimeroll(text0) {
  try {
    let Str = "";
    // 写出算式
    let equation = text0;
    while (equation.match(BASIC_ROLL_REGEX) != null) {
      // let totally = 0
      let tempMatch = equation.match(BASIC_ROLL_REGEX);
      if (tempMatch[1] > 1000 || tempMatch[1] <= 0)
        return "不支持零颗以下及一千颗骰以上";
      if (tempMatch[2] < 1 || tempMatch[2] > 9000000000000000)
        return "不支持一以下及九千兆以上";
      equation = equation.replace(BASIC_ROLL_REGEX, RollDice(tempMatch));
    }
    // 计算算式
    let aaa = equation;
    aaa = aaa.replace(/\[.+?\]/gi, "");
    let answer = math
      .evaluate(aaa.toString())
      .toString()
      .replace(/true/i, "成功")
      .replace(/false/i, "失败");
    if (equation.match(/[\s\S]{1,250}/g).length > 1) {
      Str = answer + "（计算过程太长，仅显示结果）";
    } else {
      Str = equation + " = " + answer;
    }
    return Str;
  } catch (error) {
    console.error("rollbase error: onetimeroll - inputstr", text0);
    return "";
  }
}
const discordCommand = [
  {
    data: new SlashCommandBuilder()
      .setName("hk")
      .setDescription("最基本指令模式")
      .addStringOption((option) =>
        option
          .setName("text")
          .setDescription("输入平日的文字指令")
          .setRequired(true)
      ),
    async execute(interaction) {
      const text = interaction.options.getString("text");
      return `${text}`;
    },
  },
];
module.exports = {
  Dice: Dice,
  sortNumber: sortNumber,
  FunnyDice: FunnyDice,
  BuildDiceCal: BuildDiceCal,
  BuildRollDice: BuildRollDice,
  nomalDiceRoller: nomalDiceRoller,
  DiceINT: DiceINT,
  shuffleTarget: shuffleTarget,
  rollDiceCommand: rollDiceCommand,
  initialize: initialize,
  getHelpMessage: getHelpMessage,
  prefixs: prefixs,
  gameType: gameType,
  gameName: gameName,
  discordCommand,
};
