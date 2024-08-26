"use strict";
const variables = {};
const { SlashCommandBuilder } = require("discord.js");
const Fuse = require("fuse.js");
const { randomInt } = require("mathjs");
const gameName = function () {
  return "【PokeRole】.poke ";
};
const gameType = function () {
  return "Dice:pokerole:骰娘爱你哦💖";
};

/*
 * 输入方式，
攻方  VS 防方
攻 (招式名，属性)  VS  防 (POKEMON名，POKEMON NO，属性1，属性2)
用name, alias XX|YY  得出type 
如用前者 输出相克及 accuracy ,damage ,effect,desc
----
POKEMON名=name |alias
POKEMON NO = id
image = info.image

 * @returns 
 * 
 */
const prefixs = function () {
  return [
    {
      first: /^\.poke$/i,
      second: null,
    },
  ];
};
const getHelpMessage = function () {
  return `【PokeRole】.poke
这是一个Pokemon的数据库，
进行小精灵，招式的查询以及 对战的属性相克结果，
.poke 可以查看更多指令
.poke mon (名称/编号)  可以查看小精灵的资料
.poke mon (名称/编号) (--d)  可以查看小精灵的招式表
.poke move (招式名称)  可以查看招式的资料
.poke vs 攻方(招式名称/属性) 防方(小精灵名称/编号/属性1,2)  可以进行对战模拟
--------------------
例子：
.poke mon 超梦
.poke mon 超梦 --d
.poke move 火焰轮
.poke vs 火之誓约 梦幻
.poke vs 火 100  
.poke vs 火 超能力 水
--------------------
资料来源：
https://hazmole.github.io/PokeRole/
及 免费开源TRPG中文化团队
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
  };
  switch (true) {
    case /^help$/i.test(mainMsg[1]) || !mainMsg[1]: {
      rply.text = this.getHelpMessage();
      rply.quotes = true;
      rply.buttonCreate = [
        ".poke",
        ".poke mon 超梦",
        ".poke move 火焰轮",
        ".poke vs 火之誓约 梦幻",
        ".poke vs 火 100",
        ".poke vs 火 超能力 水",
      ];
      return rply;
    }
    case /^vs$/.test(mainMsg[1]): {
      let text = commandVS(mainMsg).text;
      rply.quotes = true;
      rply.text = text;
      return rply;
    }
    case /^move$/.test(mainMsg[1]): {
      rply.quotes = true;
      rply.text = pokeMove.search(mainMsg.slice(2).join(" "));
      return rply;
    }
    case /^mon$/.test(mainMsg[1]): {
      rply.quotes = true;
      let check = removeAndCheck(mainMsg);
      let detail = check.detail;
      let name = !check.newMainMsg[2]
        ? randomInt(1, 890).toString()
        : check.newMainMsg.slice(2).join(" ");
      rply.text = pokeDex.search(name, detail);
      return rply;
    }
    default: {
      break;
    }
  }
};

class Pokemon {
  constructor(data) {
    this.pokemonData = data;
    this.fuse = new Fuse(this.pokemonData, {
      keys: ["name", "id", "alias"],
      includeScore: true,
      findAllMatches: true,
      threshold: 0.6,
    });
  }

  static init(link) {
    let data = [];
    require("fs")
      .readdirSync("./assets/pokemon/")
      .forEach(function (file) {
        if (file.match(/\.js$/) && file.match(new RegExp("^" + link, "i"))) {
          let importData = require("../assets/pokemon/" + file);
          data = data.concat(importData.Pokedex);
        }
      });
    return new Pokemon(data);
  }
  getVS(string) {
    if (typeof string === "number") {
      string = ("000" + string).slice(-3);
    }
    let result = this.fuse.search(string, { limit: 1 });
    if (result.length) return result[0].item;
    return undefined;
  }
  static findTypeByCht(value) {
    for (const key in typeName) {
      if (typeName[key] === value) {
        return [key];
      }
    }
    return [];
  }
  static findTypeByEng(value) {
    let result = [];
    for (const key in typeName) {
      for (let i = 0; i < value.length; i++) {
        if (key === value[i]) {
          result.push(typeName[key]);
        }
      }
    }
    return result;
  }
  static showPokemon(pokemon, detail = false) {
    let rply = "";
    try {
      rply += `#${pokemon.id} 【${pokemon.name}】 ${
        pokemon.alias
      } ${Pokemon.findTypeByEng(pokemon.type)} 
${pokemon.info.category} ${pokemon.info.height}m / ${pokemon.info.weight}kg
建议等级：${pokemon.rank}  基础HP：${pokemon.baseHP}  特性：${pokemon.ability} 
力量 ${displayValue(pokemon.attr.str.value, pokemon.attr.str.max)}
灵巧 ${displayValue(pokemon.attr.dex.value, pokemon.attr.dex.max)}
活力 ${displayValue(pokemon.attr.vit.value, pokemon.attr.vit.max)}
特殊 ${displayValue(pokemon.attr.spe.value, pokemon.attr.spe.max)}
洞察 ${displayValue(pokemon.attr.ins.value, pokemon.attr.ins.max)}
${pokemon.evolution.stage ? `进化阶段：${pokemon.evolution.stage}` : ""} ${
        pokemon.evolution.time ? `进化时间：${pokemon.evolution.time}` : ""
      }
`;
      if (detail) {
        rply += "------招式------\n";
        for (let index = 0; index < pokemon.moves.length; index++) {
          rply += `等级：${pokemon.moves[index].rank} 【${
            pokemon.moves[index].name
          }】 ${Pokemon.findTypeByEng([pokemon.moves[index].type])}
                    `;
        }
      }
      rply += `https://github.com/hktrpg/TG.line.Discord.Roll.Bot/raw/master/assets/pokemon/${pokemon.info.image}`;
    } catch (error) {
      console.error("pokemon #145 error", error);
    }
    return rply;
  }
  search(name, detail) {
    try {
      let result = this.fuse.search(name, { limit: 12 });
      let rply = "";
      if (result.length === 0) return "没有找到相关资料";
      if (result.length <= 2 || result[0].item.name === name) {
        rply = Pokemon.showPokemon(result[0].item, detail);
      } else {
        rply += "找到太多相关资料，请更精确的查询\n\n";
        for (let i = 0; i < result.length; i++) {
          rply += `${result[i].item.name}\n`;
        }
      }
      return rply;
    } catch (error) {
      console.error("pokemon error #166" + error);
      return "发生错误";
    }
  }
}

function removeAndCheck(mainMsg) {
  const patternDetail = /^--[dD]$/;
  return {
    detail: mainMsg.some(function (element) {
      return patternDetail.test(element);
    }),
    newMainMsg: mainMsg.filter(function (element) {
      return !patternDetail.test(element);
    }),
  };
}

class Moves {
  constructor(data) {
    this.pokemonData = data;
    this.fuse = new Fuse(this.pokemonData, {
      keys: ["name", "id", "alias"],
      includeScore: true,
      findAllMatches: false,
      threshold: 0.4,
    });
  }

  static init(link) {
    let data = [];
    require("fs")
      .readdirSync("./assets/pokemon/")
      .forEach(function (file) {
        if (file.match(/\.js$/) && file.match(new RegExp("^" + link, "i"))) {
          let importData = require("../assets/pokemon/" + file);
          data = data.concat(importData.MoveList);
        }
      });
    return new Moves(data);
  }
  getVS(string) {
    if (typeof string === "number") {
      string = ("000" + string).slice(-3);
    }
    let result = this.fuse.search(string, { limit: 1 });
    if (result) return result[0].item;
  }
  static findTypeByCht(value) {
    for (const key in typeName) {
      if (typeName[key] === value) {
        return key;
      }
    }
    return undefined;
  }
  static showMove(move) {
    let result = "";
    result += `【${move.name}】 ${move.alias} ${Pokemon.findTypeByEng([
      move.type,
    ])} 威力：${move.power}
命中：${move.accuracy}
招式伤害：${move.damage}
招式內容：${move.effect}
招式描述：${move.desc}`;
    return result;
  }
  search(name) {
    try {
      let result = this.fuse.search(name, { limit: 12 });
      let rply = "";
      if (result.length === 0) return "没有找到相关资料";
      if (result[0].item.name === name) {
        rply = Moves.showMove(result[0].item);
        return rply;
      }
      if (result.length <= 2) {
        for (let i = 0; i < result.length; i++) {
          rply += `${Moves.showMove(result[i].item)} \n
 `;
        }
      } else {
        rply += "找到太多相关资料，请更精确的查询\n\n";
        for (let i = 0; i < result.length; i++) {
          rply += `${result[i].item.name}\n`;
        }
      }
      return rply;
    } catch (error) {
      console.error("pokemon error #241", error);
      return "发生错误";
    }
  }
}
const pokeDex = Pokemon.init("pokedex-");
const pokeMove = Moves.init("moves-");
/**
 * 无效 = 0 = -999
 * 弱效 = 1 = -1
 * 普通 = 2 = 0
 * 克制 = 3 = 1
 */

const typeName = {
  Normal: "一般",
  Fight: "格斗",
  Flying: "飞行",
  Poison: "毒",
  Ground: "地面",
  Rock: "岩石",
  Bug: "虫",
  Ghost: "幽灵",
  Steel: "钢",
  Fire: "火",
  Water: "水",
  Grass: "草",
  Electric: "电",
  Psychic: "超能力",
  Ice: "冰",
  Dragon: "龙",
  Dark: "恶",
  Fairy: "妖精",
};

const typeChart = {
  Normal: {
    Normal: 0,
    Fight: 0,
    Flying: 0,
    Poison: 0,
    Ground: 0,
    Rock: -1,
    Bug: 0,
    Ghost: -999,
    Steel: -1,
    Fire: 0,
    Water: 0,
    Grass: 0,
    Electric: 0,
    Psychic: 0,
    Ice: 0,
    Dragon: 0,
    Dark: 0,
    Fairy: 0,
  },
  Fight: {
    Normal: 1,
    Fight: 0,
    Flying: -1,
    Poison: -1,
    Ground: 0,
    Rock: 1,
    Bug: -1,
    Ghost: -999,
    Steel: 1,
    Fire: 0,
    Water: 0,
    Grass: 0,
    Electric: 0,
    Psychic: -1,
    Ice: 1,
    Dragon: 0,
    Dark: 1,
    Fairy: -1,
  },
  Flying: {
    Normal: 0,
    Fight: 1,
    Flying: 0,
    Poison: 0,
    Ground: 0,
    Rock: -1,
    Bug: 1,
    Ghost: 0,
    Steel: -1,
    Fire: 0,
    Water: 0,
    Grass: 1,
    Electric: -1,
    Psychic: 0,
    Ice: 0,
    Dragon: 0,
    Dark: 0,
    Fairy: 0,
  },
  Poison: {
    Normal: 0,
    Fight: 0,
    Flying: 0,
    Poison: -1,
    Ground: -999,
    Rock: -1,
    Bug: 0,
    Ghost: -1,
    Steel: -999,
    Fire: 0,
    Water: 0,
    Grass: 1,
    Electric: 0,
    Psychic: 0,
    Ice: 0,
    Dragon: 0,
    Dark: 0,
    Fairy: 1,
  },
  Ground: {
    Normal: 0,
    Fight: 0,
    Flying: -999,
    Poison: 1,
    Ground: 0,
    Rock: 1,
    Bug: -1,
    Ghost: 0,
    Steel: 1,
    Fire: 1,
    Water: 0,
    Grass: -1,
    Electric: 1,
    Psychic: 0,
    Ice: 0,
    Dragon: 0,
    Dark: 0,
    Fairy: 0,
  },
  Rock: {
    Normal: 0,
    Fight: -1,
    Flying: 1,
    Poison: 0,
    Ground: -1,
    Rock: 0,
    Bug: 1,
    Ghost: 0,
    Steel: -1,
    Fire: 1,
    Water: 0,
    Grass: 0,
    Electric: 0,
    Psychic: 0,
    Ice: 1,
    Dragon: 0,
    Dark: 0,
    Fairy: 0,
  },
  Bug: {
    Normal: 0,
    Fight: -1,
    Flying: -1,
    Poison: -1,
    Ground: 0,
    Rock: 0,
    Bug: 0,
    Ghost: -1,
    Steel: -1,
    Fire: -1,
    Water: 0,
    Grass: 1,
    Electric: 0,
    Psychic: 1,
    Ice: 0,
    Dragon: 0,
    Dark: 1,
    Fairy: -1,
  },
  Ghost: {
    Normal: -999,
    Fight: 0,
    Flying: 0,
    Poison: 0,
    Ground: 0,
    Rock: 0,
    Bug: 0,
    Ghost: 1,
    Steel: 0,
    Fire: 0,
    Water: 0,
    Grass: 0,
    Electric: 0,
    Psychic: 1,
    Ice: 0,
    Dragon: 0,
    Dark: -1,
    Fairy: 0,
  },
  Steel: {
    Normal: 0,
    Fight: 0,
    Flying: 0,
    Poison: 0,
    Ground: 0,
    Rock: 1,
    Bug: 0,
    Ghost: 0,
    Steel: -1,
    Fire: -1,
    Water: -1,
    Grass: 0,
    Electric: -1,
    Psychic: 0,
    Ice: 1,
    Dragon: 0,
    Dark: 0,
    Fairy: 1,
  },
  Fire: {
    Normal: 0,
    Fight: 0,
    Flying: 0,
    Poison: 0,
    Ground: 0,
    Rock: -1,
    Bug: 1,
    Ghost: 0,
    Steel: 1,
    Fire: -1,
    Water: -1,
    Grass: 1,
    Electric: 0,
    Psychic: 0,
    Ice: 1,
    Dragon: -1,
    Dark: 0,
    Fairy: 0,
  },
  Water: {
    Normal: 0,
    Fight: 0,
    Flying: 0,
    Poison: 0,
    Ground: 1,
    Rock: 1,
    Bug: 0,
    Ghost: 0,
    Steel: 0,
    Fire: 1,
    Water: -1,
    Grass: -1,
    Electric: 0,
    Psychic: 0,
    Ice: 0,
    Dragon: -1,
    Dark: 0,
    Fairy: 0,
  },
  Grass: {
    Normal: 0,
    Fight: 0,
    Flying: -1,
    Poison: -1,
    Ground: 1,
    Rock: 1,
    Bug: -1,
    Ghost: 0,
    Steel: -1,
    Fire: -1,
    Water: 1,
    Grass: -1,
    Electric: 0,
    Psychic: 0,
    Ice: 0,
    Dragon: -1,
    Dark: 0,
    Fairy: 0,
  },
  Electric: {
    Normal: 0,
    Fight: 0,
    Flying: 1,
    Poison: 0,
    Ground: -999,
    Rock: 0,
    Bug: 0,
    Ghost: 0,
    Steel: 0,
    Fire: 0,
    Water: 1,
    Grass: -1,
    Electric: -1,
    Psychic: 0,
    Ice: 0,
    Dragon: -1,
    Dark: 0,
    Fairy: 0,
  },
  Psychic: {
    Normal: 0,
    Fight: 1,
    Flying: 0,
    Poison: 1,
    Ground: 0,
    Rock: 0,
    Bug: 0,
    Ghost: 0,
    Steel: -1,
    Fire: 0,
    Water: 0,
    Grass: 0,
    Electric: 0,
    Psychic: -1,
    Ice: 0,
    Dragon: 0,
    Dark: -999,
    Fairy: 0,
  },
  Ice: {
    Normal: 0,
    Fight: 0,
    Flying: 1,
    Poison: 0,
    Ground: 1,
    Rock: 0,
    Bug: 0,
    Ghost: 0,
    Steel: 1,
    Fire: -1,
    Water: -1,
    Grass: 1,
    Electric: 0,
    Psychic: 0,
    Ice: -1,
    Dragon: 1,
    Dark: 0,
    Fairy: 0,
  },
  Dragon: {
    Normal: 0,
    Fight: 0,
    Flying: 0,
    Poison: 0,
    Ground: 0,
    Rock: 0,
    Bug: 0,
    Ghost: 0,
    Steel: -1,
    Fire: 0,
    Water: 0,
    Grass: 0,
    Electric: 0,
    Psychic: 0,
    Ice: 0,
    Dragon: 1,
    Dark: 0,
    Fairy: -999,
  },
  Dark: {
    Normal: 0,
    Fight: -1,
    Flying: 0,
    Poison: 0,
    Ground: 0,
    Rock: 0,
    Bug: 0,
    Ghost: 1,
    Steel: 0,
    Fire: 0,
    Water: 0,
    Grass: 0,
    Electric: 0,
    Psychic: 1,
    Ice: 0,
    Dragon: 0,
    Dark: -1,
    Fairy: -1,
  },
  Fairy: {
    Normal: 0,
    Fight: 1,
    Flying: 0,
    Poison: -1,
    Ground: 0,
    Rock: 0,
    Bug: 0,
    Ghost: 0,
    Steel: -1,
    Fire: -1,
    Water: 0,
    Grass: 0,
    Electric: 0,
    Psychic: 0,
    Ice: 0,
    Dragon: 1,
    Dark: 1,
    Fairy: 0,
  },
};

const effect = {
  1: "效果绝佳，承受额外 1 点来自该攻击的伤害",
  2: "效果绝佳，承受额外 2 点来自该攻击的伤害",
  0: "正常",
  "-1": "效果不佳，减少 1 点受到的伤害",
  "-2": "效果不佳，减少 2 点受到的伤害",
};
// 定义函式
function checkEffectiveness(moveType, enemyType) {
  try {
    /**
     * @param {string} moveType - 技能的属性
     * @param {Array} enemyType - 敵人的两个属性
     * @return {number} effectiveness - 技能的威力
     *
     * @example
     * effectiveness = 0 表示技能的威力为 正常
     * effectiveness = -999 表示技能的威力为 免疫
     * effectiveness = 1,2 表示技能的威力为 效果絕佳
     * effectiveness = -1,-2 表示技能的威力为 效果絕佳
     */
    let enemyType1 = enemyType[0];
    let enemyType2 = enemyType[1];
    let effectiveness = 0;
    let level = typeChart[moveType][enemyType1];
    if (level == -999) return { effect: -999, script: "免疫该攻击伤害" };
    effectiveness += level;
    if (enemyType2) {
      level = typeChart[moveType][enemyType2];
      if (level == -999) return { effect: -999, script: "免疫该攻击伤害" };
      effectiveness += level;
    }
    let result = { value: effectiveness, script: effect[effectiveness] };
    return result;
  } catch (error) {
    console.error(error);
    return { value: -999, script: "出错，请回报问题或以后再试" };
  }
}

function commandVS(mainMsg) {
  try {
    let rply = {
      text: "",
    };
    //招式名,属性  VS  POKEMON名,POKEMON NO,属性1,属性2
    let attackerType = Moves.findTypeByCht(mainMsg[2]);
    let attacker = attackerType ? null : pokeMove.getVS(mainMsg[2]);
    if (attacker) {
      attackerType = attacker.type;
    }
    let defenderType = Pokemon.findTypeByCht(mainMsg[3]);
    let defender = defenderType.length ? null : pokeDex.getVS(mainMsg[3]);
    if (defender) {
      defenderType = defender.type;
    }

    if (mainMsg[4]) {
      let defenderType2 = Pokemon.findTypeByCht(mainMsg[4]);
      if (defenderType2) defenderType = defenderType.concat(defenderType2);
    }
    if (!defenderType.length || !attackerType) {
      rply.text += !attackerType
        ? "找不到攻方属性，请确认名称，你可以输入完整招式名称或属性\n"
        : "";
      rply.text += !defenderType.length
        ? "找不到防方属性，请确认名称，你可以输入小精灵名称，编号或属性\n"
        : "";
      return rply;
    }
    let typeEffect = checkEffectiveness(attackerType, defenderType);
    /**
     * 攻方属性：attackerType
     * 防方属性：defenderType
     * 属性效果：typeEffect.script
     * --------------------
     * 攻方招式：attacker.name
     * 攻方招式內容：attacker.effect desc
     * 攻方招式伤害：attacker.damage
     * --------------------
     * 防方小精灵：defender.name
     * 防方小精灵图片：defender.info.image
     */

    let attackerTypeChinese = Pokemon.findTypeByEng([attackerType]);
    let defenderTypeChinese = Pokemon.findTypeByEng(defenderType);
    rply.text += `攻方属性：${attackerTypeChinese}
防方属性：${defenderTypeChinese}
属性效果：${typeEffect.script}
`;
    rply.text += attacker
      ? `--------------------
攻方招式：【${attacker.name}】 威力：${attacker.power}
攻方命中：${attacker.accuracy}
攻方招式伤害：${attacker.damage}
攻方招式內容：${attacker.effect}
攻方招式描述：${attacker.desc}
`
      : "";
    rply.text += defender
      ? `--------------------
防方小精灵：${defender.name}
防方小精灵图片：https://github.com/hktrpg/TG.line.Discord.Roll.Bot/raw/master/assets/pokemon/${defender.info.image}
`
      : "";
    return rply;
  } catch (error) {
    rply.text = `输入错误，请输入正确的招式名称或小精灵名称\n${getHelpMessage()}`;
    return rply;
  }
}

function displayValue(current, total) {
  let result = "";
  for (let i = 0; i < current; i++) {
    result += "●";
  }
  for (let i = 0; i < total - current; i++) {
    result += "○";
  }
  return result;
}

const discordCommand = [];
module.exports = {
  rollDiceCommand,
  initialize,
  getHelpMessage,
  prefixs,
  gameType,
  gameName,
  discordCommand,
};
