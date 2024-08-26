"use strict";
const rollbase = require("./rollbase.js");
let variables = {};
const fs = require("fs");
const { SlashCommandBuilder } = require("discord.js");
const axiosRetry = require("axios-retry");
const chineseConv = require("chinese-conv"); //繁簡转換
const axios = require("axios");
const cheerio = require("cheerio");
const wiki = require("wikijs").default;
const identity = "HKTRPG (https://www.hktrpg.com; admin@hktrpg.com) wiki.js";
const gameName = function () {
  return "【趣味掷骰】 排序(至少3个选项) choice/随机(至少2个选项) 运势 每日塔罗 每日笑话 每日动漫 每日一言 每日废话 每日黄历 每日毒汤 每日情话 每日灵签 每日浅草签 每日大事 每日(星座) 每日解答	立flag .me";
};

axiosRetry(axios, { retries: 3 });
const gameType = function () {
  return "funny:funny:骰娘爱你哦💖";
};
const prefixs = function () {
  return [
    {
      first:
        /^排序|排序$|^随机|随机$|^choice|^每日塔罗|^时间塔罗|^大十字塔罗|立flag|运势|鸭霸兽|^每日笑话$|^每日动漫$|^每日一言$|^每日废话$|^每日黄历$|^每日毒汤$|^每日情话$|^每日灵签$|^每日浅草签$|^每日大事$|^每日解答$|^每日白羊$|^每日牡羊$|^每日金牛$|^每日双子$|^每日巨蟹$|^每日狮子$|^每日处女$|^每日天秤$|^每日天平$|^每日天蝎$|^每日天蝎$|^每日射手$|^每日人马$|^每日摩羯$|^每日山羊$|^每日水瓶$|^每日宝瓶$|^每日双鱼$/i,
      second: null,
    },
  ];
};

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
`;
};
const initialize = function () {
  return variables;
};

const rollDiceCommand = async function ({
  inputStr,
  mainMsg,
  displayname,
  displaynameDiscord,
  tgDisplayname,
}) {
  let rply = {
    default: "on",
    type: "text",
    text: "",
  };
  //let result = {};
  //		if (trigger.match(/排序/) != null && mainMsg.length >= 3) return exports.funny.SortIt(inputStr, mainMsg);
  //choice 指令开始于此
  //	if (trigger.match(/choice|随机|选项|选1/) != null && mainMsg.length >= 3) return exports.funny.choice(inputStr, mainMsg);
  //tarot 指令
  /*
	if (trigger.match(/tarot|塔罗牌|塔罗/) != null) {
		if (trigger.match(/^单张|^每日|^daily/) != null) return exports.funny.NomalDrawTarot(mainMsg[1], mainMsg[2]); //预设抽 79 张
		if (trigger.match(/^时间|^time/) != null) return exports.funny.MultiDrawTarot(mainMsg[1], mainMsg[2], 1);
		if (trigger.match(/^大十字|^cross/) != null) return exports.funny.MultiDrawTarot(mainMsg[1], mainMsg[2], 2);
	}
	*/

  //FLAG指令开始于此
  //		if (trigger.match(/立flag|死亡flag/) != null) return exports.funny.BStyleFlagSCRIPTS();

  //鸭霸兽指令开始于此
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
      rply.buttonCreate = [
        "随机 跑团 温习 打游戏",
        "排序 A君 C君 F君 G君",
        ".re 签到",
        ".re 1d100",
        "今日运势",
        "每日塔罗",
        "立FLAG",
        "每日大事",
        "每日笑话",
        "每日废话",
        "每日一言",
        "每日黄历",
        "每日毒汤",
        "每日情话",
        "每日灵签",
        "每日浅草签",
        "每日动漫",
        "每日解答",
      ];
      return rply;
    case /^排序|排序$/i.test(mainMsg[0]) && mainMsg.length >= 4:
      rply.text = SortIt(inputStr, mainMsg);
      return rply;
    case /^随机|^choice|随机$|choice$/i.test(mainMsg[0]) && mainMsg.length >= 3:
      rply.text = choice(inputStr, mainMsg);
      return rply;
    case /^每日解答$/i.test(mainMsg[0]):
      rply.text = dailyAnswerChoice(inputStr);
      return rply;
    case /塔罗/i.test(mainMsg[0]):
      rply.quotes = true;
      if (mainMsg[0].match(/^每日塔罗/) != null)
        rply.text = NomalDrawTarot(mainMsg[1], mainMsg[2]); //预设抽 79 张
      if (mainMsg[0].match(/^时间塔罗/) != null)
        rply.text = MultiDrawTarot(mainMsg[1], mainMsg[2], 1);
      if (mainMsg[0].match(/^大十字塔罗/) != null)
        rply.text = MultiDrawTarot(mainMsg[1], mainMsg[2], 2);
      return rply;
    case /立flag$|^立flag/i.test(mainMsg[0]) &&
      mainMsg[0].toString().match(/[\s\S]{1,25}/g).length <= 1:
      rply.text = BStyleFlagSCRIPTS();
      return rply;
    case /^鸭霸兽$/i.test(mainMsg[0]):
      rply.text = randomReply();
      return rply;
    case /运势$|^运势/i.test(mainMsg[0]) &&
      mainMsg[0].toString().match(/[\s\S]{1,40}/g).length <= 1:
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
      rply.text = watchMusic.getRandomWatchMusic100();
      return rply;
    }
    case /^每日浅草签$/.test(mainMsg[0]): {
      rply.text = asakusa100.getRandomAsakusa100();
      return rply;
    }
    case /^每日废话$/.test(mainMsg[0]): {
      const name =
        mainMsg[1] ||
        displaynameDiscord ||
        tgDisplayname ||
        displayname ||
        "你";
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
        headers: { "User-Agent": identity },
        apiUrl: "https://zh.wikipedia.org/w/api.php",
        setpagelanguage: "zh-hant",
      })
        .page(`${month}月${day}日`)
        .then(async (page) => {
          let temp = await page.content();
          let answerFestival = temp.find((v) => {
            return v && v.title.match(/(节日)|(节日)|(习俗)|(假日)|(节假)/);
          });
          respond += `${
            answerFestival && answerFestival.title
              ? `${answerFestival.title}\n`
              : ""
          }${
            answerFestival && answerFestival.content
              ? `${answerFestival.content}\n`
              : ""
          }\n`;
          let answerBig = temp.find((v) => {
            return v && v.title.match(/(大事)/);
          });
          if (answerBig && answerBig.items) answerBig = answerBig.items;

          for (let index = 0; index < answerBig?.length; index++) {
            respond += `${answerBig[index].title}\n${answerBig[index].content}\n\n`;
          }
          return chineseConv.tify(respond);
        })
        .catch((error) => {
          if (error == "Error: No article found") return "没有此条目";
          else {
            console.error("每日大事error", error);
            console.error("每日大事 this.page", this.page);

            return "条目出错";
          }
        });
      return rply;
    }
    //白羊座、金牛座、双子座、巨蟹座、狮子座、处女座、天秤座、天蝎座、射手座、摩羯座、水瓶座、双鱼
    case /^每日白羊$/.test(mainMsg[0]) || /^每日牡羊$/.test(mainMsg[0]): {
      rply.text = await dailyAstro.getAstro("牡羊");
      if (!rply.text)
        rply.text = await axiosDaily(
          "https://ovooa.com/API/xz/api.php?msg=白羊&type=json"
        );
      return rply;
    }

    case /^每日金牛$/.test(mainMsg[0]): {
      rply.text = await dailyAstro.getAstro("金牛");
      if (!rply.text)
        rply.text = await axiosDaily(
          "https://ovooa.com/API/xz/api.php?msg=金牛&type=json"
        );
      return rply;
    }

    case /^每日双子$/.test(mainMsg[0]): {
      rply.text = await dailyAstro.getAstro("双子");
      if (!rply.text)
        rply.text = await axiosDaily(
          "https://ovooa.com/API/xz/api.php?msg=双子&type=json"
        );
      return rply;
    }

    case /^每日巨蟹$/.test(mainMsg[0]): {
      rply.text = await dailyAstro.getAstro("巨蟹");
      if (!rply.text)
        rply.text = await axiosDaily(
          "https://ovooa.com/API/xz/api.php?msg=巨蟹&type=json"
        );
      return rply;
    }

    case /^每日狮子$/.test(mainMsg[0]): {
      rply.text = await dailyAstro.getAstro("狮子");
      if (!rply.text)
        rply.text = await axiosDaily(
          "https://ovooa.com/API/xz/api.php?msg=狮子&type=json"
        );
      return rply;
    }

    case /^每日处女$/.test(mainMsg[0]): {
      rply.text = await dailyAstro.getAstro("处女");
      if (!rply.text)
        rply.text = await axiosDaily(
          "https://ovooa.com/API/xz/api.php?msg=处女&type=json"
        );
      return rply;
    }

    case /^每日天秤$/.test(mainMsg[0]) || /^每日天平$/.test(mainMsg[0]): {
      rply.text = await dailyAstro.getAstro("天秤");
      if (!rply.text)
        rply.text = await axiosDaily(
          "https://ovooa.com/API/xz/api.php?msg=天秤&type=json"
        );
      return rply;
    }

    case /^每日天蝎$/.test(mainMsg[0]) || /^每日天蝎$/.test(mainMsg[0]): {
      rply.text = await dailyAstro.getAstro("天蝎");
      if (!rply.text)
        rply.text = await axiosDaily(
          "https://ovooa.com/API/xz/api.php?msg=天蝎&type=json"
        );
      return rply;
    }

    case /^每日射手$/.test(mainMsg[0]) || /^每日人马$/.test(mainMsg[0]): {
      rply.text = await dailyAstro.getAstro("射手");
      if (!rply.text)
        rply.text = await axiosDaily(
          "https://ovooa.com/API/xz/api.php?msg=射手&type=json"
        );
      return rply;
    }

    case /^每日摩羯$/.test(mainMsg[0]) || /^每日山羊$/.test(mainMsg[0]): {
      rply.text = await dailyAstro.getAstro("摩羯");
      if (!rply.text)
        rply.text = await axiosDaily(
          "https://ovooa.com/API/xz/api.php?msg=摩羯&type=json"
        );
      return rply;
    }

    case /^每日水瓶$/.test(mainMsg[0]) || /^每日宝瓶$/.test(mainMsg[0]): {
      rply.text = await dailyAstro.getAstro("水瓶");
      if (!rply.text)
        rply.text = await axiosDaily(
          "https://ovooa.com/API/xz/api.php?msg=水瓶&type=json"
        );
      return rply;
    }
    case /^每日双鱼$/.test(mainMsg[0]): {
      rply.text = await dailyAstro.getAstro("双鱼");
      if (!rply.text)
        rply.text = await axiosDaily(
          "https://ovooa.com/API/xz/api.php?msg=双鱼&type=json"
        );
      return rply;
    }
    default:
      break;
  }
};

class FunnyRandom {
  constructor(txt) {
    this.random = FunnyRandom.convertArray(txt);
  }
  static convertArray(txt) {
    const data = fs.readFileSync(txt, "utf8").toString();
    return data.split("\n");
  }
  getFunnyRandomResult() {
    try {
      return this.random[rollbase.Dice(this.random.length) - 1];
    } catch (error) {
      console.error("Funny #330", error);
      return "出现问题，请以后再试";
    }
  }
}

/**
 * .ME
 */
function me(inputStr) {
  return inputStr.replace(/^[.]re/i, "");
}

const twelveAstro = [
  "牡羊",
  "金牛",
  "双子",
  "巨蟹",
  "狮子",
  "处女",
  "天秤",
  "天蝎",
  "射手",
  "摩羯",
  "水瓶",
  "双鱼",
];

class TwelveAstro {
  constructor() {
    this.Astro = [];
  }
  async getAstro(name) {
    try {
      let astroCode = twelveAstro.indexOf(name);
      if (
        !this.Astro[astroCode] ||
        this.Astro[astroCode].date !== this.getDate()
      ) {
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
    let res = await axios.get(
      `https://astro.click108.com.tw/daily_${code}.php?iAcDay=${date}&iAstro=${code}`
    );
    const $ = cheerio.load(res.data);
    this.Astro[code] = new Astro($, date);
  }
  getDate() {
    let year = new Date().getFullYear();
    let month = ("0" + (new Date().getMonth() + 1)).slice(-2);
    let day = ("0" + new Date().getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}

class Astro {
  constructor($, date) {
    //TODAY_CONTENT
    this.TODAY_CONTENT = $(".TODAY_CONTENT")
      .text()
      .replaceAll("                ", "");
    this.TODAY_WORD = $(".TODAY_WORD").text();
    this.TODAY_LUCKY_NUMBER = this.matchImgUrl($, 0);
    this.TODAY_LUCKY_COLOR = this.matchImgUrl($, 1);
    this.TODAY_LUCKY_DIRECTION = this.matchImgUrl($, 2);
    this.TODAY_LUCKY_TIME = this.matchImgUrl($, 3);
    this.TODAY_LUCKY_ASTRO = this.matchImgUrl($, 4);
    this.date = date;
  }
  matchImgUrl($, num) {
    const LUCKY = $(".TODAY_LUCKY .LUCKY").text().match(/\S+/g);
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
      console.error(error);
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
    let res = await axios.get(
      encodeURI(`https://tw.18dao.net/每日黄历/${date}`)
    );
    const $ = cheerio.load(res.data);
    this.Almanac = new Almanac($, date);
  }
  getDate() {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    return `${year}年${month}月${day}日`;
  }
}
class Almanac {
  constructor($, date) {
    //TODAY_CONTENT
    this.date = date;
    this.title = $(".fieldset").text();
    this.content = $(".right_column").text();
  }
}
const dailyAlmanac = new DailyAlmanac();
const dailyAstro = new TwelveAstro();
const joke = new FunnyRandom("./assets/joke.txt");
const acg = new FunnyRandom("./assets/acg.txt");
const slogan = new FunnyRandom("./assets/slogan.txt");
const blackjoke = new FunnyRandom("./assets/blackjoke.txt");
const mlove = new FunnyRandom("./assets/mlove.txt");

class Asakusa100 {
  constructor() {
    this.Asakusa100 = [];
  }
  getRandomAsakusa100() {
    let random = Math.floor(Math.random() * this.Asakusa100.length);
    return this.Asakusa100[random];
  }
  createAsakusa100() {
    const rawdata = fs.readFileSync("./assets/Asakusa100.json");
    const asakusa100 = JSON.parse(rawdata);
    this.Asakusa100 = asakusa100.json;
  }
}

const asakusa100 = new Asakusa100();
asakusa100.createAsakusa100();

class WatchMusic100 {
  constructor() {}
  getRandomWatchMusic100() {
    const random = ("00" + Math.floor(Math.random() * 100 + 1)).slice(-3);
    const WatchMusic = fs.readFileSync(
      `./assets/watchmusic100/观音百签${random}签.htm`,
      "utf8"
    );
    const $ = cheerio.load(WatchMusic);
    let chance = "";
    $("tr > td").each((i, elem) => {
      chance = $(elem).text().includes("观音一百签")
        ? $(elem).text().replaceAll(/^\s+/g, "").replaceAll(/\s+\n/g, "\n")
        : chance;
    });
    return chance;
  }
}
const watchMusic = new WatchMusic100();

/**
 * 占卜&其他
 */

function BStyleFlagSCRIPTS() {
  const rplyArr = [
    "\
「打完这仗我就回老家结婚（この戦いが终わったら、故郷に帰って结婚するんだ）」",
    "\
「打完这一仗后我请你喝酒」",
    "\
别怕！子弹还很多！",
    "\
「现在的我，已经战无不胜了！（今の俺は、负ける気がしねぇ！）",
    "\
这里是安全屋吧。",
    "\
「你、你要钱嗎！要什么我都能给你！\n我可以给你更多的钱！」",
    "\
「做完这次任务，我就要结婚了。」",
    "\
「干完这一票我就金盆洗手了。」",
    "\
「好想再试一次啊……」",
    "\
「已经没什么好害怕的了（もう何も恐くない）」",
    "\
「我一定会回来的（必ず帰る！）」",
    "\
「差不多该走了」",
    "\
「我只是希望你永远不要忘记我。」",
    "\
「我只是希望能永远和你在一起。」",
    "\
「啊啊…为什么会在这种时候、想起了那些无聊的事呢？」",
    "\
「能遇见你真是太好了。」",
    "\
「我终于…为你们報仇了！」",
    "\
「他们占尽优势。」",
    "\
「等到一切结束后，我有些话想跟你说！」",
    "\
「这段时间我过得很开心啊。」",
    "\
「待一切结束后记得还给我。」",
    "\
「真希望这份幸福可以永远持续下去。」",
    "\
「这工作结束后我们两人一起生活吧！」（この仕事が终わったら2人で暮らそう）",
    "\
「我们三个人要永永远远在一起！」",
    "\
「这是我女儿的照片，很可爱吧？」",
    "\
「请告诉他/她，我永远爱他/她」",
    "\
「听好，在我回来之前绝不要乱走动哦（いいか、俺が帰ってくるまでここを动くんじゃないぞ）」",
    "\
「要像一个乖孩子一样等着我回来」",
    "\
「我去去就来（先に行って、すぐ戻るから）」",
    "\
「快逃！(逃げろう！/早く逃げろう！)」",
    "\
「对方只有一个人，大家一起上啊」",
    "\
「我就不信，这么多人還杀不了他一个！」",
    "\
「干，干掉了嗎？（やったのか？）」",
    "\
「身体好轻」",
    "\
「可恶！你给我看着！（逃跑）」",
    "\
「躲在这里就应该不会被发现了吧。」",
    "\
「我不会让任何人死的。」",
    "\
「可恶！原来是这么回事！」",
    "\
「嘛 反正以后还有很多机会问的。」",
    "\
「你的生命已经如风中残烛。」",
    "\
「没有手牌场上也没卡，你还想要赢吗？」",
    "\
「跑这么远应该就行了。」",
    "\
「我已经什么都不怕了（もう何も恐くない）」",
    "\
「这東西是什么，怎么之前没见过（なんだこのXXX、见たことないな）」",
    "\
「什麽声音……？就去看一下吧（:「何の音だ？ちょっと见てくる」",
    "\
「是我的错觉吗？可能是我看错了」",
    "\
「成功了吗！？」",
    "\
「二十年后又是一条好汉！」",
    "\
「大人武运昌隆」",
    "\
「这次工作的报酬是以前无法比较的（「今度の仕事でまとまったカネが入るんだ」）",
    "\
「我才不要和罪犯呆在一起，我回自己的房间去了！（この中に杀人者がいるかもしれないのに、一緒に居られるか!俺は自分の部屋に戻るぞ!）」",
    "\
「其实我知道事情的真相…犯人就是……」",
    "\
「我已经天下无敌了~~」",
    "\
「大人！这边就交给小的吧，请快离开这边吧」",
    "\
「这就是我们流派的最终奥义。这一招我只会演示一次，你看好了！」",
    "\
「谁敢杀我？」",
    "\
「从来没有人能破解我这招。」",
    "\
「就算杀死也没问题吧？」",
    "\
「看我塔下强杀！」",
    "\
「骗人的吧，我们不是朋友吗？」",
    "\
「不需要大人出手，就交给在下吧」",
    "\
「原来只有这种水平吗」",
    "\
「操纵一切的黑手其实就是！」",
    "\
「没看过你呢，你是谁？」",
    "\
「外面怎么这么吵」",
    "\
「我老爸是....你有种就....」",
    "\
「战斗力只有五的渣渣。」",
    "\
「我真是HIGH到不行了啊！」",
    "\
「嗯？鞋带断了。」",
    "\
「这一招我只会演示一次，你看好了！」",
    "\
「过了明天就没事了。」",
    "\
「我出门了。」",
    "\
「你能走到这里很了不起……」",
    "\
「给我打，打出事来我负责」",
    "\
「我已经不是那个一无所知的我了！」",
    "\
「明天我会把所有事全部告诉你……」",
    "\
「只要击败你们两个，剩下的就很容易解决。」",
    "\
「我会变得比任何人都强，一生保护你。」",
    "\
「你可以继承这里吗，这孩子也说喜欢你。」",
    "\
「打倒了！他死掉了！」",
    "\
「来战个痛快，我和你最后的战斗！！」",
    "\
「我看你是个分身或是什么类似东西吧。」",
    "\
「谢谢你，你让我感到我不是孤单一人。」",
    "\
「我先去死了，你尽管加油。」",
    "\
「这次任务轻轻松松，训练时辛苦多了！」",
    "\
「我的这把刀可是涂满了毒药的毒刃！」\nhttp://takehana.cocolog-nifty.com/photos/uncategorized/2011/08/06/onesegpc_20110806_01041904.jpg",
    "\
「哈哈哈，今天又是幸运的一天，死里逃生了！」",
    "\
「我花费一生的实验终于完成了！」",
    "\
「什么寺庙什么神像，看我拆了它！」",
    "\
「世上怎会有鬼，都是吓小朋友啦。」",
    "\
「这个经过多重实验，保证不会发生意外。」",
    "\
「大哥……哥……。」",
    "\
「大哥哥，一起玩吧。」",
    "\
「接下来将会说明规则。」\n「够了，这种整人节目可以停了吧，我要走了。」",
    "\
「过不久我也要升级了！」",
    "\
「这是你的生日礼物，很有历史价值的」",
    "\
「哇，好呕心的液体！」",
    "\
「我已经死而无憾！」",
    "\
「好大件事呢，但这和我们也没什么关系。草」",
    "\
「回来后我会十倍奉还！」",
    "\
「雷达出现巨大的影子！」「雷达故障了吧。」",
    "\
「今天天气真好，是适合出海的日子！」",
    "\
「虽然被怪物咬了一口，但只是皮外伤而已！」",
    "\
「队长，这里看到一个人影……」「喂喂？你说什么」「……」",
    "\
「这里很安全」「这下放心了！」",
    "\
「前辈会停住他，别怕，去吧！」",
    "\
「我要将我超过５年的感情告诉她！」",
    "\
「换人吧，你太无聊了。」",
    "\
「只要他们幸福就好，我从心底祝福他们。」",
    "\
「我可以好好利用这件事」",
  ];

  //	rply.text = rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
  return rplyArr[rollbase.Dice(rplyArr.length) - 1];
}

function randomReply() {
  const rplyArr = [
    "\
	你们死定了呃呃呃不要纠结这些……所以是在纠结哪些？",
    "\
	在澳大利亚，每过一分钟就有一只鸭嘴兽被拔嘴。",
    "\
	呜恶恶恶恶恶恶，不要随便叫我。",
    "\
	干，你这学不会的猪！",
    "\
	嘎嘎嘎。",
    "\
	wwwwwwwwwwwwwwwww",
    "\
	为什么你们每天都可以一直玩；玩就算了还玩我。",
    "\
	好棒，整点了！咦？不是吗？",
    "\
	不要打扰我挖坑！",
    "好棒，误点了！",
    "\
	在南半球，一只鸭嘴兽拍打他的鳍，他的嘴就会掉下来。",
    "\
	什么东西你共三小。",
    "\
	哈哈哈哈哈哈哈哈！",
    "\
	一直叫，你4不4想拔嘴人家？",
    "\
	一直叫，你想被净滩吗？",
    "\
	帮主你也敢嘴？",
    "\
	拔嘴的话，我的嘴巴会长出触手，然后开花成四个花瓣哦 (´×`)",
    "\
	看看我！！我体内的怪物已经这么大了！！",
    "\
	传说中，凡是拔嘴过鸭嘴兽的人，有高概率在100年内死去。",
    "\
	人类每花60秒拔嘴，就减少一分钟的寿命。",
    "\
	嘴被拔，就会掉。",
    "\
	你在大声什么啦！！！！",
    "\
	公道价，八万一（伸手）。",
    "\
	你的嘴里有异音（指）",
    "\
	帮主说，有人打你的左脸，你就要用肉食性猛击咬断他的小腿。",
  ];
  //	rply.text = rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
  return rplyArr[rollbase.Dice(rplyArr.length) - 1];
}

function randomLuck(TEXT) {
  const rplyArr = [
    "超吉",
    "超级上吉",
    "大吉",
    "吉",
    "中吉",
    "小吉",
    "吉",
    "小吉",
    "吉",
    "吉",
    "中吉",
    "吉",
    "中吉",
    "吉",
    "中吉",
    "小吉",
    "末吉",
    "吉",
    "中吉",
    "小吉",
    "末吉",
    "中吉",
    "小吉",
    "小吉",
    "吉",
    "小吉",
    "末吉",
    "中吉",
    "小吉",
    "凶",
    "小凶",
    "没凶",
    "大凶",
    "很凶",
    "超凶",
    "你不要知道比较好呢",
    "命运在手中,何必问我",
  ];
  //	rply.text = TEXT[0] + ' ： ' + rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
  return TEXT[0] + " ： " + rplyArr[rollbase.Dice(rplyArr.length) - 1];
}

/**
 * Tarot塔罗牌
 */
function MultiDrawTarot(text, text2, type) {
  let returnStr = "";
  let cards = rollbase.shuffleTarget(TarotList2);

  const formatText = (prefix, text, text2) => {
    return `${prefix}\n${text ? "；" + text : ""}${text2 ? " " + text2 : ""}`;
  };

  switch (type) {
    case 1:
      returnStr = formatText("【时间塔罗】/每日塔罗/大十字塔罗", text, text2);
      returnStr += `过去: ${cards[0]}\n现在: ${cards[1]}\n未来: ${cards[2]}\n`;
      break;
    case 2:
      returnStr = formatText("【大十字塔罗】/每日塔罗/时间塔罗", text, text2);
      returnStr += `现况: ${cards[0]}\n助力: ${cards[1]}\n目标: ${cards[2]}\n基础: ${cards[3]}\n过去: ${cards[4]}\n未来: ${cards[5]}\n自我: ${cards[6]}\n环境: ${cards[7]}\n恐懼: ${cards[8]}\n结論: ${cards[9]}\n`;
      break;
    default:
      break;
  }
  return returnStr;
}

function NomalDrawTarot(text, text2) {
  let returnStr = "";
  returnStr = "【每日塔罗】/大十字塔罗/时间塔罗";
  returnStr += `${text ? "\n；" + text : ""}${text2 ? " " + text2 : ""}`;
  let ans = rollbase.shuffleTarget(TarotList);
  returnStr += "\n" + ans[0];
  return returnStr;
}

const TarotList = [
  "愚者 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/00.jpg",
  "魔术师 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/01.jpg",
  "女祭司 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/02.jpg",
  "女皇 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/03.jpg",
  "皇帝 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/04.jpg",
  "教皇 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/05.jpg",
  "恋人 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/06.jpg",
  "战车 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/07.jpg",
  "力量 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/08.jpg",
  "隐者 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/09.jpg",
  "命运之轮 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/10.jpg",
  "正义 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/11.jpg",
  "吊人 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/12.jpg",
  "死神 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/13.jpg",
  "节制 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/14.jpg",
  "恶魔 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/15.jpg",
  "高塔 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/16.jpg",
  "星星 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/17.jpg",
  "月亮 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/18.jpg",
  "太阳 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/19.jpg",
  "审判 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/20.jpg",
  "世界 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/21.jpg",
  "愚者 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/00-Re.jpg",
  "魔术师 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/01-Re.jpg",
  "女祭司 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/02-Re.jpg",
  "女皇 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/03-Re.jpg",
  "皇帝 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/04-Re.jpg",
  "教皇 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/05-Re.jpg",
  "恋人 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/06-Re.jpg",
  "战车 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/07-Re.jpg",
  "力量 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/08-Re.jpg",
  "隐者 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/09-Re.jpg",
  "命运之轮 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/10-Re.jpg",
  "正义 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/11-Re.jpg",
  "吊人 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/12-Re.jpg",
  "死神 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/13-Re.jpg",
  "节制 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/14-Re.jpg",
  "恶魔 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/15-Re.jpg",
  "高塔 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/16-Re.jpg",
  "星星 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/17-Re.jpg",
  "月亮 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/18-Re.jpg",
  "太阳 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/19-Re.jpg",
  "审判 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/20-Re.jpg",
  "世界 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/21-Re.jpg",
  "圣杯一 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_01.jpg",
  "圣杯二 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_02.jpg",
  "圣杯三 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_03.jpg",
  "圣杯四 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_04.jpg",
  "圣杯五 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_05.jpg",
  "圣杯六 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_06.jpg",
  "圣杯七 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_07.jpg",
  "圣杯八 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_08.jpg",
  "圣杯九 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_09.jpg",
  "圣杯十 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_10.jpg",
  "圣杯国王 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_KING.jpg",
  "圣杯骑士 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_KNIGHT.jpg",
  "圣杯侍者 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_PAGE.jpg",
  "圣杯皇后 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_QUEEN.jpg",
  "钱币一 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_01.jpg",
  "钱币二 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_02.jpg",
  "钱币三 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_03.jpg",
  "钱币四 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_04.jpg",
  "钱币五 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_05.jpg",
  "钱币六 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_06.jpg",
  "钱币七 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_07.jpg",
  "钱币八 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_08.jpg",
  "钱币九 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_09.jpg",
  "钱币十 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_10.jpg",
  "钱币国王 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_KING.jpg",
  "钱币骑士 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_KNIGHT.jpg",
  "钱币侍者 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_PAGE.jpg",
  "钱币皇后 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_QUEEN.jpg",
  "宝剑一 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_01.jpg",
  "宝剑二 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_02.jpg",
  "宝剑三 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_03.jpg",
  "宝剑四 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_04.jpg",
  "宝剑五 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_05.jpg",
  "宝剑六 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_06.jpg",
  "宝剑七 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_07.jpg",
  "宝剑八 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_08.jpg",
  "宝剑九 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_09.jpg",
  "宝剑十 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_10.jpg",
  "宝剑国王 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_KING.jpg",
  "宝剑骑士 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_KNIGHT.jpg",
  "宝剑侍者 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_PAGE.jpg",
  "宝剑皇后 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_QUEEN.jpg",
  "权杖一 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_01.jpg",
  "权杖二 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_02.jpg",
  "权杖三 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_03.jpg",
  "权杖四 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_04.jpg",
  "权杖五 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_05.jpg",
  "权杖六 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_06.jpg",
  "权杖七 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_07.jpg",
  "权杖八 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_08.jpg",
  "权杖九 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_09.jpg",
  "权杖十 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_10.jpg",
  "权杖国王 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_KING.jpg",
  "权杖骑士 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_KNIGHT.jpg",
  "权杖侍者 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_PAGE.jpg",
  "权杖皇后 ＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_QUEEN.jpg",
  "圣杯一 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_01-Re.jpg",
  "圣杯二 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_02-Re.jpg",
  "圣杯三 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_03-Re.jpg",
  "圣杯四 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_04-Re.jpg",
  "圣杯五 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_05-Re.jpg",
  "圣杯六 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_06-Re.jpg",
  "圣杯七 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_07-Re.jpg",
  "圣杯八 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_08-Re.jpg",
  "圣杯九 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_09-Re.jpg",
  "圣杯十 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_10-Re.jpg",
  "圣杯国王 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_KING-Re.jpg",
  "圣杯骑士 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_KNIGHT-Re.jpg",
  "圣杯侍者 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_PAGE-Re.jpg",
  "圣杯皇后 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_QUEEN-Re.jpg",
  "钱币一 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_01-Re.jpg",
  "钱币二 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_02-Re.jpg",
  "钱币三 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_03-Re.jpg",
  "钱币四 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_04-Re.jpg",
  "钱币五 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_05-Re.jpg",
  "钱币六 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_06-Re.jpg",
  "钱币七 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_07-Re.jpg",
  "钱币八 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_08-Re.jpg",
  "钱币九 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_09-Re.jpg",
  "钱币十 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_10-Re.jpg",
  "钱币国王 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_KING-Re.jpg",
  "钱币骑士 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_KNIGHT-Re.jpg",
  "钱币侍者 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_PAGE-Re.jpg",
  "钱币皇后 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_QUEEN-Re.jpg",
  "宝剑一 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_01-Re.jpg",
  "宝剑二 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_02-Re.jpg",
  "宝剑三 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_03-Re.jpg",
  "宝剑四 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_04-Re.jpg",
  "宝剑五 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_05-Re.jpg",
  "宝剑六 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_06-Re.jpg",
  "宝剑七 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_07-Re.jpg",
  "宝剑八 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_08-Re.jpg",
  "宝剑九 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_09-Re.jpg",
  "宝剑十 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_10-Re.jpg",
  "宝剑国王 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_KING-Re.jpg",
  "宝剑骑士 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_KNIGHT-Re.jpg",
  "宝剑侍者 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_PAGE-Re.jpg",
  "宝剑皇后 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_QUEEN-Re.jpg",
  "权杖一 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_01-Re.jpg",
  "权杖二 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_02-Re.jpg",
  "权杖三 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_03-Re.jpg",
  "权杖四 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_04-Re.jpg",
  "权杖五 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_05-Re.jpg",
  "权杖六 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_06-Re.jpg",
  "权杖七 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_07-Re.jpg",
  "权杖八 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_08-Re.jpg",
  "权杖九 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_09-Re.jpg",
  "权杖十 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_10-Re.jpg",
  "权杖国王 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_KING-Re.jpg",
  "权杖骑士 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_KNIGHT-Re.jpg",
  "权杖侍者 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_PAGE-Re.jpg",
  "权杖皇后 －\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_QUEEN-Re.jpg",
  "空白",
];

const TarotList2 = [
  "愚者 ＋",
  "魔术师 ＋",
  "女祭司 ＋",
  "女皇 ＋",
  "皇帝 ＋",
  "教皇 ＋",
  "恋人 ＋",
  "战车 ＋",
  "力量 ＋",
  "隐者 ＋",
  "命运之轮 ＋",
  "正义 ＋",
  "吊人 ＋",
  "死神 ＋",
  "节制 ＋",
  "恶魔 ＋",
  "高塔 ＋",
  "星星 ＋",
  "月亮 ＋",
  "太阳 ＋",
  "审判 ＋",
  "世界 ＋",
  "圣杯一 ＋",
  "圣杯二 ＋",
  "圣杯三 ＋",
  "圣杯四 ＋",
  "圣杯五 ＋",
  "圣杯六 ＋",
  "圣杯七 ＋",
  "圣杯八 ＋",
  "圣杯九 ＋",
  "圣杯十 ＋",
  "圣杯国王 ＋",
  "圣杯骑士 ＋",
  "圣杯侍者 ＋",
  "圣杯皇后 ＋",
  "钱币一 ＋",
  "钱币二 ＋",
  "钱币三 ＋",
  "钱币四 ＋",
  "钱币五 ＋",
  "钱币六 ＋",
  "钱币七 ＋",
  "钱币八 ＋",
  "钱币九 ＋",
  "钱币十 ＋",
  "钱币国王 ＋",
  "钱币骑士 ＋",
  "钱币侍者 ＋",
  "钱币皇后 ＋",
  "宝剑一 ＋",
  "宝剑二 ＋",
  "宝剑三 ＋",
  "宝剑四 ＋",
  "宝剑五 ＋",
  "宝剑六 ＋",
  "宝剑七 ＋",
  "宝剑八 ＋",
  "宝剑九 ＋",
  "宝剑十 ＋",
  "宝剑国王 ＋",
  "宝剑骑士 ＋",
  "宝剑侍者 ＋",
  "宝剑皇后 ＋",
  "权杖一 ＋",
  "权杖二 ＋",
  "权杖三 ＋",
  "权杖四 ＋",
  "权杖五 ＋",
  "权杖六 ＋",
  "权杖七 ＋",
  "权杖八 ＋",
  "权杖九 ＋",
  "权杖十 ＋",
  "权杖国王 ＋",
  "权杖骑士 ＋",
  "权杖侍者 ＋",
  "权杖皇后 ＋",
  "愚者 －",
  "魔术师 －",
  "女祭司 －",
  "女皇 －",
  "皇帝 －",
  "教皇 －",
  "恋人 －",
  "战车 －",
  "力量 －",
  "隐者 －",
  "命运之轮 －",
  "正义 －",
  "吊人 －",
  "死神 －",
  "节制 －",
  "恶魔 －",
  "高塔 －",
  "星星 －",
  "月亮 －",
  "太阳 －",
  "审判 －",
  "世界 －",
  "圣杯一 －",
  "圣杯二 －",
  "圣杯三 －",
  "圣杯四 －",
  "圣杯五 －",
  "圣杯六 －",
  "圣杯七 －",
  "圣杯八 －",
  "圣杯九 －",
  "圣杯十 －",
  "圣杯国王 －",
  "圣杯骑士 －",
  "圣杯侍者 －",
  "圣杯皇后 －",
  "钱币一 －",
  "钱币二 －",
  "钱币三 －",
  "钱币四 －",
  "钱币五 －",
  "钱币六 －",
  "钱币七 －",
  "钱币八 －",
  "钱币九 －",
  "钱币十 －",
  "钱币国王 －",
  "钱币骑士 －",
  "钱币侍者 －",
  "钱币皇后 －",
  "宝剑一 －",
  "宝剑二 －",
  "宝剑三 －",
  "宝剑四 －",
  "宝剑五 －",
  "宝剑六 －",
  "宝剑七 －",
  "宝剑八 －",
  "宝剑九 －",
  "宝剑十 －",
  "宝剑国王 －",
  "宝剑骑士 －",
  "宝剑侍者 －",
  "宝剑皇后 －",
  "权杖一 －",
  "权杖二 －",
  "权杖三 －",
  "权杖四 －",
  "权杖五 －",
  "权杖六 －",
  "权杖七 －",
  "权杖八 －",
  "权杖九 －",
  "权杖十 －",
  "权杖国王 －",
  "权杖骑士 －",
  "权杖侍者 －",
  "权杖皇后 －",
  "空白",
];

/**
 *  choice 及SORT
 */

function dailyAnswerChoice(input) {
  return input + " \n→ " + dailyAnswer[rollbase.Dice(dailyAnswer.length) - 1];
}
function choice(input, str) {
  let array = input.replace(str[0], "").match(/\S+/gi);
  return (
    str[0] +
    " [ " +
    array.join(" ") +
    " ] \n→ " +
    array[rollbase.Dice(array.length) - 1]
  );
}

function SortIt(input, mainMsg) {
  let a = input.replace(mainMsg[0], "").match(/\S+/gi);
  for (let i = a.length - 1; i >= 0; i--) {
    //let randomIndex = Math.floor(Math.random() * (i + 1));
    //3 -> 210 , 10, 0
    let randomIndex = rollbase.Dice(i + 1) - 1;
    //3 ->
    let itemAtIndex = a[randomIndex];
    a[randomIndex] = a[i];
    a[i] = itemAtIndex;
  }
  return mainMsg[0] + " \n→ [ " + a.join(", ") + " ]";
}
async function axiosDaily(url) {
  let reply = await fetchData(url);
  if (reply === "错误error") {
    reply = await fetchData(
      url.replace("https://ovooa.com", "http://lkaa.top")
    );
  }
  if (reply === "错误error") {
    reply = `服务器出现问题，请稍后再试。`;
  }
  return reply;
}

async function fetchData(url) {
  let reply = "";
  try {
    const response = await axios.get(encodeURI(url), { timeout: 20000 });
    const json = analyzeResponse(response);
    reply += `${json.title ? json.title + "\n" : ""}`;
    reply += `${json.text && json.text !== "获取成功" ? json.text + "\n" : ""}`;
    reply += `${json.data && json.data.title ? json.data.title + "\n" : ""}`;
    reply += `${json.data && json.data.text ? json.data.text + "\n" : ""}`;
    reply += `${json.data && json.data.Msg ? json.data.Msg + "\n" : ""}`;
    reply = chineseConv.tify(reply);
    reply += `${json.image ? json.image + "\n" : ""}`;
    reply += `${json.data && json.data.image ? json.data.image + "\n" : ""}`;
    reply = reply.replace(/\\r/g, "\n").replace(/\\n/g, "\n");
    return reply || "没有结果，请检查內容";
  } catch (error) {
    if (
      error.code !== "ETIMEDOUT" ||
      error.code !== "ECONNABORTED" ||
      error.code !== "ECONNRESET" ||
      error.code !== "undefined"
    ) {
      return "错误error";
    }
    //return `'服务器連線出现问题，请稍后再试，错误代码: ${error.code}`;
  }
}
function analyzeResponse(response) {
  switch (typeof response) {
    case "string":
      return { data: { text: response } };
    case "object":
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
/*来源自 https://ovooa.com
	
http://api.uuouo.cn/
http://ybapi.top/
http://weizhinb.top/
	
*/
const discordCommand = [
  {
    data: new SlashCommandBuilder()
      .setName("mee")
      .setDescription("【复述功能】 /mee 模拟骰娘说话 ")
      .addStringOption((option) =>
        option.setName("text").setDescription("复述內容").setRequired(true)
      ),
    async execute(interaction) {
      const text = interaction.options.getString("text");
      if (text !== null) {
        await interaction
          .reply({ content: "已进行模拟骰娘说话", ephemeral: true })
          .catch();
        return `.me ${text}`;
      } else
        return `需要输入內容\n 
			例子 /mee C君杀死了NPC 村民, 受到尼什村通缉!`;
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName("排序")
      .setDescription("进行随机排序")
      .addStringOption((option) =>
        option
          .setName("text")
          .setDescription("输入所有內容，以空格分隔 如 排序 选项A 选项B 选项C")
          .setRequired(true)
      ),
    async execute(interaction) {
      const text = interaction.options.getString("text");
      if (text !== null) return `排序 ${text}`;
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName("随机")
      .setDescription("进行随机抽选")
      .addStringOption((option) =>
        option
          .setName("text")
          .setDescription("输入所有內容，以空格分隔 如 选项A 选项B 选项C")
          .setRequired(true)
      ),
    async execute(interaction) {
      const text = interaction.options.getString("text");
      if (text !== null) return `随机 ${text}`;
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName("choice")
      .setDescription("进行随机抽选")
      .addStringOption((option) =>
        option
          .setName("text")
          .setDescription("输入所有內容，以空格分隔 如 选项A 选项B 选项C")
          .setRequired(true)
      ),
    async execute(interaction) {
      const text = interaction.options.getString("text");
      if (text !== null) return `随机 ${text}`;
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName("运势")
      .setDescription("进行随机抽选")
      .addStringOption((option) =>
        option.setName("text").setDescription("可选: 什么的运势")
      ),
    async execute(interaction) {
      //	console.log(interaction.options.getString('text'))
      const text = interaction.options.getString("text");
      if (text !== null) return `${text}的运势`;
      else return `今日运势`;
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName("塔罗")
      .setDescription("进行塔罗占卜")
      .addStringOption((option) =>
        option
          .setName("category")
          .setDescription("塔罗种类")
          .setRequired(true)
          .addChoices(
            { name: "每日塔罗(单张)", value: "每日塔罗" },
            { name: "大十字塔罗", value: "大十字塔罗" },
            { name: "时间塔罗", value: "时间塔罗" }
          )
      ),
    async execute(interaction) {
      const category = interaction.options.getString("category");
      if (category !== null) return `${category}`;
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName("立flag")
      .setDescription("立FLAG")
      .addStringOption((option) =>
        option.setName("text").setDescription("可选: 立什么FLAG")
      ),
    async execute(interaction) {
      const text = interaction.options.getString("text");
      if (text !== null) return `${text}立FLAG`;
      else return `立FLAG`;
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName("每日")
      .setDescription("进行每日功能")
      .addSubcommand((subcommand) =>
        subcommand
          .setName("星座")
          .setDescription("显示每日星座运程")
          .addStringOption((option) =>
            option
              .setName("star")
              .setDescription("哪个星座")
              .setRequired(true)
              .addChoices(
                { name: "白羊", value: "每日白羊" },
                { name: "金牛", value: "每日金牛" },
                { name: "巨蟹", value: "每日巨蟹" },
                { name: "狮子", value: "每日狮子" },
                { name: "双子", value: "每日双子" },
                { name: "处女", value: "每日处女" },
                { name: "天秤", value: "每日天秤" },
                { name: "天蝎", value: "每日天蝎" },
                { name: "射手", value: "每日射手" },
                { name: "摩羯", value: "每日摩羯" },
                { name: "水瓶", value: "每日水瓶" },
                { name: "双鱼", value: "每日双鱼" }
              )
          )
      )
      .addSubcommand((subcommand) =>
        subcommand.setName("塔罗").setDescription("抽取一张塔罗牌")
      )
      .addSubcommand((subcommand) =>
        subcommand.setName("一言").setDescription("显示一条金句")
      )
      .addSubcommand((subcommand) =>
        subcommand.setName("毒汤").setDescription("显示一条有毒的鸡汤")
      )
      .addSubcommand((subcommand) =>
        subcommand.setName("情话").setDescription("显示一条情话")
      )
      .addSubcommand((subcommand) =>
        subcommand.setName("灵签").setDescription("抽取一条观音签")
      )
      .addSubcommand((subcommand) =>
        subcommand.setName("浅草签").setDescription("抽取一条浅草签")
      )
      .addSubcommand((subcommand) =>
        subcommand.setName("大事").setDescription("显示今天历史上的大事")
      )
      .addSubcommand((subcommand) =>
        subcommand.setName("笑话").setDescription("显示一条笑话")
      )
      .addSubcommand((subcommand) =>
        subcommand.setName("动漫").setDescription("显示一条动漫金句")
      )
      .addSubcommand((subcommand) =>
        subcommand.setName("黄历").setDescription("显示今日黄历")
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName("废话")
          .setDescription("生产一条你或对像的废话")
          .addStringOption((option) =>
            option
              .setName("name")
              .setDescription("可选: 对像的名字，留白则使用你的名字")
          )
      ),

    async execute(interaction) {
      await interaction.deferReply({});
      const category = interaction.options.getString("category");
      const name = interaction.options.getString("name") || "";
      const subcommand = interaction.options.getSubcommand();
      const star = interaction.options.getString("star");
      if (star !== null) return `${star}`;
      if (subcommand !== null) return `每日${subcommand} ${name}`;
      if (category !== null) return `${category}`;
      return;
    },
  },
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
    let quotes = DailyFuckUp.randomSentence(DailyFuckUp.celebrityQuotes);
    quotes = quotes.replace(
      "曾经说过",
      DailyFuckUp.randomSentence(DailyFuckUp.formerFuck)
    );
    quotes = quotes.replace(
      "这不禁令我深思",
      DailyFuckUp.randomSentence(DailyFuckUp.afterFuck)
    );
    return quotes;
  }

  static genDiscuss(subject) {
    let sentence = DailyFuckUp.randomSentence(DailyFuckUp.discuss);
    sentence = sentence.replace(RegExp("主题", "g"), subject);
    return sentence;
  }

  static addParagraph(chapter) {
    if (chapter[chapter.length - 1] === " ") {
      chapter = chapter.slice(0, -2);
    }
    return "　　" + chapter + "。 ";
  }

  static generateArticles(subject) {
    let text = [];
    let chapter = "";
    let chapterLength = 0;
    while (chapterLength < 300) {
      let num = DailyFuckUp.randomNumber();
      if (num < 5 && chapter.length > 200) {
        chapter = DailyFuckUp.addParagraph(chapter) + "\n";
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

    let result = text.join("\n\n").replace("。。", "。");
    return result;
  }

  static discuss = [
    "现在，解决主题的问题，是非常非常重要的。 ",
    "主题的发生，到底需要如何做到，不主题的发生，又会如何产生。 ",
    "主题，到底应该如何实现。 ",
    "带着这些问题，我们来审视一下主题。 ",
    "所谓主题，关键是主题需要如何写。 ",
    "我们一般认为，抓住了问题的关键，其他一切则会迎刃而解。 ",
    "问题的关键究竟为何? ",
    "主题因何而发生?",
    "每个人都不得不面对这些问题。 在面对这种问题时， ",
    "一般来讲，我们都必须务必慎重的考虑考虑。 ",
    "要想清楚，主题，到底是一种怎么样的存在。 ",
    "了解清楚主题到底是一种怎么样的存在，是解决一切问题的关键。 ",
    "就我个人来说，主题对我的意义，不能不说非常重大。 ",
    "本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。 ",
    "主题，发生了会如何，不发生又会如何。 ",
    "在这种困难的抉择下，本人思来想去，寝食难安。 ",
    "生活中，若主题出现了，我们就不得不考虑它出现了的事实。 ",
    "这种事实对本人来说意义重大，相信对这个世界也是有一定意义的。 ",
    "我们都知道，只要有意义，那么就必须慎重考虑。 ",
    "在现今社会，一些重要的问题始终存在着。因此，我们需要关注这些问题并找到有效的解决方案。",
    "从长远来看，我们必须重视某些问题的影响，因为它们可能对我们的未来产生深远的影响。",
    "解决问题需要集中精力和全面的思考。只有这样，才能找到最佳解决方案。",
    "我们必须从多个角度来看待问题，因为问题的解决通常不是单一的方法。",
    "无论面对什么样的问题，我们都必须保持冷静和理性。只有这样，我们才能找到最好的解决方案。",
    "看似简单的问题，有时也可能是非常复杂的。因此，我们需要投入更多的时间和精力去理解问题。",
    "通过学习和经验，我们可以增强解决问题的能力。这不仅可以帮助我们应对当前的问题，还可以使我们更好地应对未来的挑战。",
    "寻找最佳解决方案需要勇气和创造力。我们必须敢于尝试新的思路和方法。",
    "某些问题可能会给我们带来挑战，但同时也可能带来机会。我们需要善加利用这些机会，以创造更好的未来。",
    "在解决问题的过程中，我们需要充分了解问题的本质和原因，以确保我们找到的解决方案是可行的。",
    "解决问题需要有一个清晰的目标和计划。只有这样，我们才能更有效地实现我们的目标。",
    "面对困难和挑战，我们必须坚持不懈，直到找到最佳解决方案。",
    "在解决问题的过程中，我们必须有耐心和毅力。只有这样，我们才能成功地克服所有的障碍。",
    "综观主题的历史，我们会发现，这是一个复杂且多变的问题。",
    "许多学者和专家已经对主题进行了深入的研究和分析，但仍有许多问题需要解决。",
    "与主题相关的议题越来越多，因此需要更多的研究和探讨。",
    "对于主题的讨论，人们常常持不同的观点和看法，这使得解决问题变得更加困难。",
    "面对主题，我们必须采取有效的措施，才能解决问题。",
    "许多人对主题感到困惑和无助，需要更多的指导和支援。",
    "主题涉及的范围非常广泛，需要进一步细化和区分。",
    "对于主题的处理，我们需要更好地运用科技和创新，才能取得更好的效果。",
    "解决主题需要全社会的参与和努力，不能单靠某一个群体或个人的力量。",
    "主题所带来的影响和后果是深远的，必须慎重对待。",
  ];

  static celebrityQuotes = [
    "马丁路德金曾经说过：“黑夜虽然会延迟，但白天一定会到来。这不禁令我深思",
    "贝多芬曾经说过：“人生就像一首交响乐，需要高低起伏才会有美妙的旋律。这不禁令我深思",
    "约翰·蓝侬曾经说过：“生命是发生在你身上的事情，当你忙于为其余的东西而忘了它时，它就会溜走。这不禁令我深思",
    "艾伦·德珍尼斯曾经说过：“生命中最困难的部分是不知道该怎么做，而最容易的部分是知道该怎么做却不去做。这不禁令我深思",
    "奥斯卡·王尔德曾经说过：“人生就像一场戏剧，演员们出场、扮演角色，但当灯光熄灭时，他们又得回到现实中来。这不禁令我深思",
    "约翰·华纳克尔曾经说过：“成功不是最终目的，失败也不是致命的，勇气继续前进才是最重要的。这不禁令我深思",
    "亚伯拉罕·林肯曾经说过：“你可以爱上你的工作，也可以恨你的工作，但你必须为它付出努力。这不禁令我深思",
    "比尔·盖茨曾经说过：“成功不是取决于你有多聪明，而是取决于你有多认真。这不禁令我深思",
    "纳尔逊·曼德拉曾经说过：“教育是改变世界的最强大的武器。这不禁令我深思",
    "史蒂夫·乔布斯曾经说过：“你的工作将占用你生命中大部分时间，为什么不要做你热爱的工作呢？这不禁令我深思",
    "伏尔泰曾经说过，不经巨大的困难，不会有伟大的事业。这不禁令我深思",
    "富勒曾经说过，苦难磨炼一些人，也毁灭另一些人。这不禁令我深思",
    "文森特·皮尔曾经说过，改变你的想法，你就改变了自己的世界。这不禁令我深思",
    "拿破仑·希尔曾经说过，不要等待，时机永远不会恰到好处。这不禁令我深思",
    "塞涅卡曾经说过，生命如同寓言，其价值不在与长短，而在与内容。这不禁令我深思",
    "奥普拉·温弗瑞曾经说过，你相信什么，你就成为什么样的人。这不禁令我深思",
    "吕凯特曾经说过，生命不可能有两次，但许多人连一次也不善于度过。这不禁令我深思",
    "莎士比亚曾经说过，人的一生是短的，但如果卑劣地过这一生，就太长了。这不禁令我深思",
    "笛卡儿曾经说过，我的努力求学没有得到别的好处，只不过是越来越发觉自己的无知。这不禁令我深思",
    "左拉曾经说过，生活的道路一旦选定，就要勇敢地走到底，决不回头。这不禁令我深思",
    "米歇潘曾经说过，生命是一条艰险的峡谷，只有勇敢的人才能通过。这不禁令我深思",
    "吉姆·罗恩曾经说过，要么你主宰生活，要么你被生活主宰。这不禁令我深思",
    "日本谚语曾经说过，不幸可能成为通向幸福的桥梁。这不禁令我深思",
    "海贝尔曾经说过，人生就是学校。在那里，与其说好的教师是幸福，不如说好的教师是不幸。这不禁令我深思",
    "杰纳勒尔·乔治·S·巴顿曾经说过，接受挑战，就可以享受胜利的喜悦。这不禁令我深思",
    "德谟克利特曾经说过，节制使快乐增加并使享受加强。这不禁令我深思",
    "裴斯泰洛齐曾经说过，今天应做的事没有做，明天再早也是耽误了。这不禁令我深思",
    "歌德曾经说过，决定一个人的一生，以及整个命运的，只是一瞬之间。这不禁令我深思",
    "卡耐基曾经说过，一个不注意小事情的人，永远不会成就大事业。这不禁令我深思",
    "卢梭曾经说过，浪费时间是一桩大罪过。这不禁令我深思",
    "康德曾经说过，既然我已经踏上这条道路，那么，任何东西都不应妨碍我沿着这条路走下去。这不禁令我深思",
    "克劳斯·莫瑟爵士曾经说过，教育需要花费钱，而无知也是一样。这不禁令我深思",
    "伏尔泰曾经说过，坚持意志伟大的事业需要始终不渝的精神。这不禁令我深思",
    "亚伯拉罕·林肯曾经说过，你活了多少岁不算什么，重要的是你是如何度过这些岁月的。这不禁令我深思",
    "韩非曾经说过，内外相应，言行相称。这不禁令我深思",
    "富兰克林曾经说过，你热爱生命吗？那么别浪费时间，因为时间是组成生命的材料。这不禁令我深思",
    "马尔顿曾经说过，坚强的信心，能使平凡的人做出惊人的事业。这不禁令我深思",
    "笛卡儿曾经说过，读一切好书，就是和许多高尚的人谈话。这不禁令我深思",
    "塞涅卡曾经说过，真正的人生，只有在经过艰难卓绝的斗争之后才能实现。这不禁令我深思",
    "易卜生曾经说过，伟大的事业，需要决心，能力，组织和责任感。这不禁令我深思",
    "歌德曾经说过，没有人事先了解自己到底有多大的力量，直到他试过以后才知道。这不禁令我深思",
    "达尔文曾经说过，敢于浪费哪怕一个钟头时间的人，说明他还不懂得珍惜生命的全部价值。这不禁令我深思",
    "佚名曾经说过，感激每一个新的挑战，因为它会锻造你的意志和品格。这不禁令我深思",
    "奥斯特洛夫斯基曾经说过，共同的事业，共同的斗争，可以使人们产生忍受一切的力量。　这不禁令我深思",
    "苏轼曾经说过，古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。这不禁令我深思",
    "王阳明曾经说过，故立志者，为学之心也；为学者，立志之事也。这不禁令我深思",
    "歌德曾经说过，读一本好书，就如同和一个高尚的人在交谈。这不禁令我深思",
    "乌申斯基曾经说过，学习是劳动，是充满思想的劳动。这不禁令我深思",
    "别林斯基曾经说过，好的书籍是最贵重的珍宝。这不禁令我深思",
    "富兰克林曾经说过，读书是易事，思索是难事，但两者缺一，便全无用处。这不禁令我深思",
    "鲁巴金曾经说过，读书是在别人思想的帮助下，建立起自己的思想。这不禁令我深思",
    "培根曾经说过，合理安排时间，就等于节约时间。这不禁令我深思",
    "屠格涅夫曾经说过，你想成为幸福的人吗？但愿你首先学会吃得起苦。这不禁令我深思",
    "莎士比亚曾经说过，抛弃时间的人，时间也抛弃他。这不禁令我深思",
    "叔本华曾经说过，普通人只想到如何度过时间，有才能的人设法利用时间。这不禁令我深思",
    "博曾经说过，一次失败，只是证明我们成功的决心还够坚强。 维这不禁令我深思",
    "拉罗什夫科曾经说过，取得成就时坚持不懈，要比遭到失败时顽强不屈更重要。这不禁令我深思",
    "莎士比亚曾经说过，人的一生是短的，但如果卑劣地过这一生，就太长了。这不禁令我深思",
    "俾斯麦曾经说过，失败是坚忍的最后考验。这不禁令我深思",
    "池田大作曾经说过，不要回避苦恼和困难，挺起身来向它挑战，进而克服它。这不禁令我深思",
    "莎士比亚曾经说过，那脑袋里的智慧，就像打火石里的火花一样，不去打它是不肯出来的。这不禁令我深思",
    "希腊曾经说过，最困难的事情就是认识自己。这不禁令我深思",
    "黑塞曾经说过，有勇气承担命运这才是英雄好汉。这不禁令我深思",
    "非洲曾经说过，最灵繁的人也看不见自己的背脊。这不禁令我深思",
    "培根曾经说过，阅读使人充实，会谈使人敏捷，写作使人精确。这不禁令我深思",
    "斯宾诺莎曾经说过，最大的骄傲于最大的自卑都表示心灵的最软弱无力。这不禁令我深思",
    "西班牙曾经说过，自知之明是最难得的知识。这不禁令我深思",
    "塞内加曾经说过，勇气通往天堂，怯懦通往地狱。这不禁令我深思",
    "赫尔普斯曾经说过，有时候读书是一种巧妙地避开思考的方法。这不禁令我深思",
    "笛卡儿曾经说过，阅读一切好书如同和过去最杰出的人谈话。这不禁令我深思",
    "邓拓曾经说过，越是没有本领的就越加自命不凡。这不禁令我深思",
    "爱尔兰曾经说过，越是无能的人，越喜欢挑剔别人的错儿。这不禁令我深思",
    "老子曾经说过，知人者智，自知者明。胜人者有力，自胜者强。这不禁令我深思",
    "歌德曾经说过，意志坚强的人能把世界放在手中像泥块一样任意揉捏。这不禁令我深思",
    "迈克尔·F·斯特利曾经说过，最具挑战性的挑战莫过于提升自我。这不禁令我深思",
    "爱迪生曾经说过，失败也是我需要的，它和成功对我一样有价值。这不禁令我深思",
    "罗素·贝克曾经说过，一个人即使已登上顶峰，也仍要自强不息。这不禁令我深思",
    "马云曾经说过，最大的挑战和突破在于用人，而用人最大的突破在于信任人。这不禁令我深思",
    "雷锋曾经说过，自己活着，就是为了使别人过得更美好。这不禁令我深思",
    "布尔沃曾经说过，要掌握书，莫被书掌握；要为生而读，莫为读而生。这不禁令我深思",
    "培根曾经说过，要知道对好事的称颂过于夸大，也会招来人们的反感轻蔑和嫉妒。这不禁令我深思",
    "莫扎特曾经说过，谁和我一样用功，谁就会和我一样成功。这不禁令我深思",
    "马克思曾经说过，一切节省，归根到底都归结为时间的节省。这不禁令我深思",
    "莎士比亚曾经说过，意志命运往往背道而驰，决心到最后会全部推倒。这不禁令我深思",
    "卡莱尔曾经说过，过去一切时代的精华尽在书中。这不禁令我深思",
    "培根曾经说过，深窥自己的心，而后发觉一切的奇迹在你自己。这不禁令我深思",
    "罗曼·罗兰曾经说过，只有把抱怨环境的心情，化为上进的力量，才是成功的保证。这不禁令我深思",
    "孔子曾经说过，知之者不如好之者，好之者不如乐之者。这不禁令我深思",
    "达·芬奇曾经说过，大胆和坚定的决心能够抵得上武器的精良。这不禁令我深思",
    "叔本华曾经说过，意志是一个强壮的盲人，倚靠在明眼的跛子肩上。这不禁令我深思",
    "黑格尔曾经说过，只有永远躺在泥坑里的人，才不会再掉进坑里。这不禁令我深思",
    "普列姆昌德曾经说过，希望的灯一旦熄灭，生活刹那间变成了一片黑暗。这不禁令我深思",
    "维龙曾经说过，要成功不需要什么特别的才能，只要把你能做的小事做得好就行了。这不禁令我深思",
    "郭沫若曾经说过，形成天才的决定因素应该是勤奋。这不禁令我深思",
    "洛克曾经说过，学到很多东西的诀窍，就是一下子不要学很多。这不禁令我深思",
    "西班牙曾经说过，自己的鞋子，自己知道紧在哪里。这不禁令我深思",
    "拉罗什福科曾经说过，我们唯一不会改正的缺点是软弱。这不禁令我深思",
    "亚伯拉罕·林肯曾经说过，我这个人走得很慢，但是我从不后退。这不禁令我深思",
    "美华纳曾经说过，勿问成功的秘诀为何，且尽全力做你应该做的事吧。这不禁令我深思",
    "俾斯麦曾经说过，对于不屈不挠的人来说，没有失败这回事。这不禁令我深思",
    "阿卜·日·法拉兹曾经说过，学问是异常珍贵的东西，从任何源泉吸收都不可耻。这不禁令我深思",
    "白哲特曾经说过，坚强的信念能赢得强者的心，并使他们变得更坚强。 这不禁令我深思",
    "查尔斯·史考伯曾经说过，一个人几乎可以在任何他怀有无限热忱的事情上成功。 这不禁令我深思",
    "贝多芬曾经说过，卓越的人一大优点是：在不利与艰难的遭遇里百折不饶。这不禁令我深思",
    "莎士比亚曾经说过，本来无望的事，大胆尝试，往往能成功。这不禁令我深思",
    "卡耐基曾经说过，我们若已接受最坏的，就再没有什么损失。这不禁令我深思",
    "德国曾经说过，只有在人群中间，才能认识自己。这不禁令我深思",
    "史美尔斯曾经说过，书籍把我们引入最美好的社会，使我们认识各个时代的伟大智者。这不禁令我深思",
    "冯学峰曾经说过，当一个人用工作去迎接光明，光明很快就会来照耀着他。这不禁令我深思",
    "吉格·金克拉曾经说过，如果你能做梦，你就能实现它。这不禁令我深思",
  ];

  static afterFuck = [
    "这不禁令我深思。 ",
    "带着这句话，我们还要更加慎重的审视这个问题： ",
    "这启发了我， ",
    "我希望诸位也能好好地体会这句话。 ",
    "这句话语虽然很短，但令我浮想联翩。 ",
    "无可否认，这句话带给我们极大的启示。",
    "我深深体会到这句话所蕴含的深意。",
    "这句话真正引起了我的共鸣。",
    "这句话不仅引发了我们的关注，也引起了我们的思考。",
    "我们需要认真对待这句话所提出的挑战。",
    "这句话所传达的信息绝对不容忽视。",
    "这句话令我们更加清晰地看到了问题的本质。",
    "这句话让我们看到了问题的另一面。",
    "我深信这句话会成为我们思考的重要起点。",
    "我们必须从这句话中学到更多的东西。",
    "这句话能够激发我们内心深处的共鸣。",
    "我们需要从这句话中学到一个重要的教训。",
    "这句话引起了我们对问题的关注，也启发了我们的思考。",
    "这句话不仅是一句警句，更是一个重要的提醒。",
    "这句话在我们思考的过程中发挥了重要的作用。",
    "这句话让我们看到了一个全新的视角。",
    "这句话可以帮助我们更好地理解问题的本质。",
    "我们必须从这句话中吸取更多的智慧和启示。",
    "这句话深刻地反映了现实的困境和挑战。",
    "这句话让我们更加明白了自己的不足之处。",
    "这句话揭示了问题的一个重要方面。",
    "这句话让我们更加认识到自己的责任和使命。",
    "这句话提醒我们要时刻保持警醒和警觉。",
    "这句话让我们更加坚定了自己的信念和决心。",
    "这句话可以帮助我们更好地理解自己和他人。",
    "这句话是一个重要的思想火花，可以引发更多的启示。",
    "这句话可以帮助我们更好地理解自己的身份和使命。",
    "这句话让我们更加明白了人生的真谛和意义。",
    "这句话可以激励我们更加努力地工作和生活。",
    "这句话是一个非常宝贵的启示和提醒。",
    "这句话让我们看到了问题的一个新的方向和出路。",
    "这句话可以帮助我们更好地面对人生的挑战和困境。",
    "这句话让我们更加明白了自己的优点和不足。",
    "这句话是一个非常实用的工作和生活的指导原则。",
    "这句话可以帮助我们更好地理解人性和社会。",
    "这句话让我们更加意识到自己的权利和义务。",
    "这句话让我们更加了解了一个文化或一个国家的特点和价值观。",
    "这句话可以启发我们更多的创造力和想象力。",
    "这句话让我们更加明白了生命的珍贵和脆弱。",
  ];

  static formerFuck = [
    "曾经说过",
    "在不经意间这样说过",
    "事先声明",
    "先说一声",
    "需要先强调",
    "需要先说明",
    "需要先说明一下",
    "必须说明的是",
    "讲过一个小故事",
    "讨论过这问题",
    "曾经稍微讲过背景",
    "曾经简单提过一下",
    "谈到这个话题",
    "想要先声明的是",
    "在关于这个问题",
    "根据自己的经验",
    "曾探讨过这个议题",
    "在谈论过这件事",
    "过交代过",
    "谈到这个事情时，说过",
    "在进入正题前，曾说过",
    "关于这个话题，曾说过",
    "交代过一下",
    "说过自己的立场",
    "阐述过想法",
    "探讨过这个问题",
    "谈论过这个主题",
    "曾分析过",
    "提过，一下问题的重要性",
    "曾深入探讨这个问题",
    "谈到这个议题",
  ];
}

const dailyAnswer = [
  "不一定",
  "需要别人的帮助",
  "需要慎重考虑",
  "相信你自己",
  "你是对的",
  "放弃吧",
  "听听别人的建议",
  "需要坚持",
  "不要放弃",
  "不要错过机会",
  "会有转机",
  "等待机会",
  "花更多时间来决定",
  "再多考虑",
  "你可能要放弃些东西",
  "考虑下别人的感受",
  "这事不靠谱",
  "别让它影响到你",
  "做能让你快乐的那个决定",
  "扫清障碍",
  "不要觉得忧虑",
  "主动一点",
  "时间会给你答案",
  "现在就开始",
  "别犹豫",
  "决定了就做",
  "显而易见的结果",
  "保存实力",
  "时机还不成熟",
  "你需要掌握更多的信息",
  "去找个人倾诉",
  "你需要去探索真相",
  "把握机会",
  "决定了就坚持",
  "很麻烦2现在比以往任何时候的情况都要好",
  "重新思考",
  "列出原因",
  "期待一下,令人期待的事情马上会发生",
  "培养一项新的爱好",
  "走容易走的路",
  "时间不对",
  "给自己点时间",
  "坦诚相告",
  "着眼未来",
  "信任",
  "别傻傻等待",
  "希望渺茫",
  "需要新的开始",
  "其实你已经有了答案",
  "听听别人的建议",
  "试着放弃",
  "不要犹豫",
  "趁早放弃",
  "再努力一些",
  "忘掉过去",
  "可以",
  "值得一试",
  "抓住机会",
  "不要尝试",
  "听长辈的建议",
  "不要坚持",
  "你可以的",
  "不靠谱",
  "打消念头",
  "等待机会",
  "重新计划",
  "重新开始",
  "摆脱现在的环境",
  "建议多次尝试",
  "需要休息一下再决定",
  "冷静思考再决定",
  "珍惜他或者她",
  "坦白一切",
  "努力一下",
  "主动出击",
  "不要太主动",
  "冷静处理",
  "谨慎做决定",
  "独立面对",
  "从过去寻找答案",
  "多和家人沟通",
  "多和朋友沟通",
  "暗中观察",
  "不太确定",
  "没太大可能",
  "没什么把握",
  "学会放弃",
  "放弃这个念头",
  "不值得一试",
  "风险很大",
  "不要再浪费时间",
  "做多重计划",
  "再坚持一下",
  "不能继续下去",
  "不会有结果",
  "结果不会让你满意",
  "结果出乎你的意料",
  "坚持就有结果",
  "付诸行动",
  "你会成功",
  "成功率很高",
  "没问题",
  "耐心处理",
  "不要主动出击",
  "好运马上来了",
  "会有变化",
  "无济于事",
  "是个好主意",
  "不太稳妥",
  "放空自己",
  "信任",
  "相信自己的判断",
  "坚持就能看见真理",
  "会有转折",
  "会有改变",
  "相信自己的第一直觉",
  "定下目标",
  "学会独立思考",
  "学会舍得",
  "继续前行",
  "不惧未来",
  "需要些时间",
  "还有更好的选择",
  "不合适",
  "结果不理想",
  "抓住新的机会",
  "寻找新的机会",
  "寻找更好的方法",
  "听取家人的建议",
  "接受它",
  "当面沟通",
  "多次尝试",
  "你一定会成功",
  "可以确定是的",
  "不重要",
  "错误的想法",
  "争取机会",
  "或许很难",
  "放心去尝试",
  "没有好结果",
  "花点时间处理",
  "坚持自己的想法",
  "多方面思考再决定",
  "别犹豫",
  "思考风险再决定",
  "有希望",
  "不要失去信心",
  "摆脱现在的关系",
  "十分困难",
  "需要一些准备",
  "需要条件",
  "改变自己再决定",
  "参考朋友的建议",
  "分享想法会有收获",
  "不算是",
  "考虑全面",
  "非常肯定",
  "也许希望很小",
  "不是最佳选择",
  "再找找别的办法",
  "趁早放弃",
  "一定要坚持",
  "时间会改变一切",
  "充实自己再做决定",
  "从回忆中找答案",
  "不可以尝试",
  "不要做让自己后悔的事",
  "不做你会后悔",
  "抓紧行动",
  "机不可失",
  "等待好机会",
  "整理思路",
  "可以确定",
  "控制自己",
  "做充分准备",
  "需要好的建议",
  "并没有那么好",
  "不是最好的选择",
  "不要抱太大希望",
  "完全正确",
  "很遗憾",
  "这不是一个好办法",
  "不能否认",
  "千真万确",
  "一定是",
  "完全肯定",
  "寻找可能",
  "细心观察",
  "勇于面对",
  "为未来做打算",
  "背向而驰",
  "凭藉自己的直觉",
  "深思熟虑再决定",
  "不是唯一的选择",
  "最好的选择",
  "找个人给你点意见",
  "请教你妈妈",
  "谁说的准呢先观望着",
  "把心踹怀里",
  "答案在镜子里",
  "这事儿不靠谱",
  "天上要掉馅饼了",
  "有好运",
  "要有耐心",
  "你需要知道真相",
  "还有另一种情况",
  "观望",
  "别让他影响到你",
  "照你想做的那样去",
  "但行好事莫问前程",
  "走容易走的路",
  "试试卖萌",
  "借助他人的经验",
  "再多考虑",
  "机会稍纵即逝",
  "制定一个新计划",
  "GO",
  "情况很快会发生变化",
  "转移你的注意力",
  "告诉自己什么是最重要的",
  "为什么不",
  "别傻等了",
  "不要忘记",
  "WHY",
  "NOT",
  "去解决",
  "寻找更多的选择8上帝为你关一扇门必定会为你开一扇窗",
  "随波逐流未必是好事",
  "问天问大地不如问问自己",
  "你就是答案",
  "去争取机会",
  "改变不了世界就改变自己",
  "主动一点人生会大不相同",
  "学会妥协",
  "掌握更多信息",
  "相信你的最初想法",
  "勿忘初心方得始终",
  "扫清障碍",
  "把重心放在工作学习上",
  "培养一项新的爱好",
  "对他人慷慨",
  "去做其他的事情",
  "观察形势",
  "休息休息一会儿",
  "这是你最后的机会",
  "再考虑一下",
  "并不明智",
  "等待更好的",
  "很快能解决",
  "重要",
  "去做",
  "不要过火",
  "事情开始变得有趣了",
  "保存你的实力",
  "不确定因素有点多",
  "结果不错,你可能不得不放弃其他东西",
  "不要忧虑",
  "不需要",
  "去倾诉,告诉别人这对你意味着什么",
  "无论你做何种选择结果都是对的",
  "保持头脑清醒",
  "克服困难",
  "实际一点",
  "你需要一点帮助",
  "协作",
  "寻找更多的选择",
  "负责",
  "阻止",
  "你必须现在就行动",
  "遵守规则",
  "坚持",
  "需要花点时间",
  "你不会失望",
  "不要迫于压力而改变初衷",
  "不要忽略身边的人",
  "抗拒",
  "不值得斗争",
  "玩得开心就好",
  "毋庸置疑",
  "你也许会失望",
  "去改变",
  "一个强有力的承诺将会换回更好的结果",
  "也许有更好的解决方案",
  "不要害怕",
  "想法太对选择太少",
  "一笑而过",
  "取决于你的选择",
  "随他去",
  "你需要考虑其他方面",
  "一年后就不那么重要了",
  "醒醒吧别做梦了",
  "意义非凡",
  "默数十秒再问我",
  "去行动",
  "发挥你的想象力",
  "保持冷静",
  "你必须弥补这个缺点",
  "你会后悔的",
  "毫无疑问",
  "当然",
  "现在比以往任何时候的情况都要好",
  "相信你的直觉",
  "这是一个机会",
  "去问你爸爸",
  "从来没有",
  "寻找一个指路人",
  "去尝试",
  "荒谬",
  "不赌",
  "不值得冒险",
  "不妥协",
  "关注你的家庭生活",
  "肯定",
  "不可预测",
  "绝对不",
  "我确定",
  "尽早完成,令人期待的事情马上就要发生",
  "你需要适应",
  "表示怀疑",
  "它会带来好运",
  "看看会发生什么",
  "记录下俩",
  "不宜在这个时候",
  "决定了就去做",
  "别要求太多",
  "放弃第一个方案",
  "Hold不住",
  "谨慎小心",
  "注意细节",
  "注意身后",
  "不要犹豫",
  "继续前行",
  "情况很快会发生改变",
  "不要被情绪左右",
  "转移注意力",
  "着眼未来",
  "问自己什么是最重要的",
  "不要等了",
  "保持乐观",
  "没有更好的选择",
  "你需要主动",
  "妥协",
  "有比这更重要的东西",
  "你需要掌握更多的信息",
  "删除记忆",
  "专注于你的工作",
  "你需要考虑其他的方面",
  "相信自己的直觉",
  "形势不明",
  "先让自己休息",
  "重新考虑",
  "不要做的太过分",
  "保持现状/有意料之外的事会发生不妨等待",
  "花更多的时间来决定",
  "你开心就好",
  "有风险但也有机会",
  "算了吧",
  "当然咯",
  "千万别傻,保持你的好奇心去挖掘真相",
  "把心揣怀里",
  "时机不对",
  "照你想做的那样去做",
  "量力而行",
  "抛弃首选方案",
  "最佳方案不一定可行",
  "注意细节",
  "说出来吧",
  "谁都不能保证",
  "不要陷得太深",
  "至关重要",
  "这是一定的",
  "不妨赌一把",
  "需要多思考一下",
  "这个问题确实不好回答",
  "其实都还不错",
  "你认为好的那个",
  "或许还没有",
  "没有足够的条件",
  "目前不满足",
  "可以接受",
  "停止",
  "对比一下再决定",
  "勿忘初心",
  "不重要",
  "多读书少思考",
  "放弃第一个选择",
  "不该坚持",
  "学会放弃",
  "舍得才有机会获得",
  "你是对的",
  "你值得这么做",
  "没有你想的那么简单",
  "不会更糟糕",
  "别骗自己",
  "想太多了",
  "睡一觉再决定",
  "不是最佳选择",
  "不合适",
  "把注意力转移一下",
  "不要强求",
  "时间会告诉你答案",
  "这件事不好回答",
  "要看你自己",
  "这个问题没有答案",
  "你懂得，不用问我",
  "用心去做",
  "不能言传",
  "改变自己",
  "无所谓",
  "全力以赴",
  "争取早日摆脱",
  "显而易见的道理",
  "没有理由拒绝",
  "想想未来吧",
  "开心就好",
  "及时行乐",
  "看情况再说",
  "不听老人言，吃亏在眼前",
  "无须多言",
  "熬过去就好",
  "一切都是好的",
  "是非难辨",
  "搞不清楚状况",
  "不要太乐观",
  "用心感受",
  "嗯",
  "明天就有变化",
  "等一周再说",
  "都可以",
  "都值得去做",
  "太早决定不好",
  "别怀疑自己",
  "你要果断一些",
  "静观其变",
  "看起来不靠谱",
  "放轻松",
  "不想要就趁早放弃",
  "寻找新的开始",
  "都可以",
  "放下吧",
  "忽略别人的看法",
  "不需要解释",
  "爱拼才会赢",
  "让他、她知道",
  "其他选择",
  "没有意义",
  "你的答案在心里",
  "换位思考",
  "尝试新的生活",
  "接受它",
  "一切都是最好的安排",
  "完美",
  "不要放纵自己",
  "跟随大众的审美",
  "不太满意的结果",
  "没有更好的选择",
  "坚持到底",
  "不要",
  "随心所欲",
  "大胆去做",
  "听人劝吃饱饭",
  "你还是不够努力",
  "不要欺骗自己",
  "注意细节",
  "珍惜现在",
  "让别人替你分担",
  "分享会有惊喜",
  "走下去",
  "淘汰它",
  "心诚则灵",
  "行与不行一试便知",
  "真心对待",
  "最后的决定",
  "二选一，选前者",
  "找人帮你做",
  "相信大家的眼光",
  "难得糊涂",
  "从现在开始努力",
  "回头是岸",
  "求同存异",
  "或许还不是时候",
  "先苦后甜",
  "树立信心再来一次",
  "过了这村没这店",
  "运气不佳不建议做",
  "别一条路走到黑",
  "别再委屈自己",
  "多看看外面的世界",
  "问下你们老师",
  "这是个问题嘛？",
  "无法回答",
  "相信科学",
  "少吃多动就会有收获",
  "干嘛想不开来笑一个",
  "谁也帮不了你",
  "了解自己的人会给你答案",
  "没效果",
  "言多必失",
  "敞开心扉",
  "梳理一下再决定",
  "想想得了",
  "最后的疼爱是手放开",
  "别想那么多没用的",
  "没用的",
  "不起作用",
  "适得其反",
  "空说无用",
  "没什么不妥",
  "长点心吧",
  "还有别的选择嘛？",
  "别往心里去",
  "控制自己",
  "今生无缘",
  "幸福快来了",
  "不是现在这个人、事、物",
  "再给自己一次机会",
  "未必适合你",
  "没问题的",
  "不计得失方能成功",
  "爱干嘛就干嘛",
  "分散注意力",
  "缓解压力继续前行",
  "说多无益",
  "别胆少",
  "直接点",
  "只有你最清楚",
  "问问你闺蜜或基友",
  "看样子是不行",
  "没什么差别",
  "摸着自己的胸再问一次",
  "亲爱的那是不可能的",
  "反正也不会实现",
  "无所谓了",
  "试一次就知道",
  "别怕麻烦",
  "自己拿主意吧",
  "别人说的话随便听一听",
  "我也帮不上忙",
  "和昨天一样",
  "别忘了你的承诺",
  "恐怕来不及",
  "反复无常",
  "不要自讨苦吃",
  "不要自讨没趣",
  "枉然",
  "取长补短",
  "不能硬来",
  "不明智的选择",
  "犯不着",
  "理清头绪答案就有了",
  "放轻松再问一遍",
  "你喜欢的就是好的",
  "如果有选择我选第一个",
  "做自己喜欢的事",
  "很重要的事情要花点功夫",
  "对自己好一点",
  "爱惜自己",
  "没有对比就没有伤害",
  "醒醒吧",
  "不要轻易放弃",
  "浪费功夫",
  "依赖别人也不是办法",
  "别人帮不了你",
  "没有办法感同身受",
  "不要好了伤疤忘了疼",
  "要矜持点",
  "简单易行的方式",
  "找值得信赖的人咨询",
  "少点套路",
  "什么都没有把握",
  "主意不错哦",
  "要有野心",
  "好景不长",
  "不要自寻烦恼",
  "清理自己的过去",
  "提高自己",
  "谁也做不了你的主",
  "这个还真不好说",
  "给自己一点压力",
  "别管对错去做吧",
  "你需要点套路",
  "懒得想不如简单点",
  "看开一点",
  "支持你",
  "不适合你的",
  "你这么好看说什么都对",
  "多读书少提问",
  "活在当下",
  "别灰心再试一下",
  "没有绝对的答案",
  "不存在优势",
  "抓住重点",
  "这跟我没关系",
  "好主意",
  "搞不定",
  "想想就好，别冲动",
  "鼓励一下，你行滴",
  "无疑是一个好选择",
  "看情况咯",
  "费尽心思也无济于事",
  "性格不合",
  "试试卖萌、耍酷",
  "冷静冷静",
  "主动联系",
  "一包辣条压压惊",
  "痛苦的选择",
  "离开",
  "顾及别人感受",
  "傻人有傻福",
  "一切从简",
  "重新考虑一下",
  "千万小心",
  "太天真",
  "别想太多啦",
  "忍一忍就过去了",
  "何必认真",
  "都是缘分",
  "提醒自己过去的事",
  "随你吧",
  "这不重要吧",
  "你说对了呢",
  "仁者见仁智者见智",
  "无解",
  "是个谜",
  "无所谓",
  "不要反复果断点",
  "不要感情用事",
  "放手一搏",
  "什么都不用做",
  "转机马上到了",
  "要敢于直面现实",
  "改变不了自己，就放弃",
  "接受现状",
  "可能不会有",
  "现实很残酷",
  "不知道啊",
  "你一定是对的",
  "跟以前一样",
  "还是老样子",
  "不如让自己开心一点",
  "糟糕",
  "猜不透就不猜",
  "别理睬",
  "忍",
  "阳光总在风雨后",
  "小心为上",
  "不提也罢",
  "不该问我，问问自己",
  "想不通就明天再想",
  "问你身边的异性",
  "问你身边的朋友",
  "问你身边的同性",
  "答案即将揭晓",
  "肯定没戏",
  "别抱太大希望",
  "慢慢来",
  "不必在乎",
  "没有准确答案",
  "如往常一样",
  "没什么不妥",
  "安心去做",
  "抓紧实现",
  "你搞不定",
  "这个问题没有答案",
  "需要找个专家问问",
  "乐观面对",
  "不要做鸵鸟",
  "清醒地认识自己",
  "摆脱一切干扰",
  "试试手气重新来过",
  "别让自己变得不像自己",
  "别着急，再好好想想",
  "问天问地不如问问自己",
  "毫无意义的事",
  "不要强加于人",
  "及时行乐",
  "与人沟通，会有收获",
  "乐趣在于探索",
  "找不到相关的信息",
  "大胆提出建议",
  "无话可说",
  "别忘了自己的梦想",
  "说好的独立解决呢",
  "拒绝回答一切问题",
  "不太想管你这种闲事",
  "安心的去做",
  "难道告诉你结果不妙嘛",
  "无聊的问题",
  "别人说的都对",
  "好人有好报",
  "祈祷一下，就会有奇迹",
  "不够虔诚，重新问一次",
  "不要骗自己",
  "很尴尬的局面",
  "没必要坚持",
  "放手一搏",
  "换个角度思考",
  "神仙都帮不了你",
  "心灵鸡汤救不了你",
  "远水救不了近火",
  "更多选择更多欢笑",
  "软硬兼施",
  "全面推进",
  "妥协吧",
  "只是时间问题罢了",
  "天时地利只欠人和",
  "等风来",
  "回家问你妈妈",
  "不一定是你满意的结果",
  "强扭的瓜不甜",
  "真的未必能做到",
  "没可能完成",
  "尝试三次不行就撤",
  "谁说你不行，去他打",
  "你怎样做都是错,真理永远掌握在少数人手中",
  "别犹豫加油做",
  "去吧，不然会后悔",
  "智者是不需要任何答案的",
  "反向思考",
  "淡定",
  "不知道",
  "找个人请教一下",
  "话听三分",
  "你的地盘你做主",
  "这个问题太深奥",
  "决定了就去做",
];

module.exports = {
  rollDiceCommand,
  initialize,
  getHelpMessage,
  prefixs,
  gameType,
  gameName,
  discordCommand,
};
