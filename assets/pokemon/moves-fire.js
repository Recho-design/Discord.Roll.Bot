let MoveList;
if (!MoveList) MoveList = [];
module.exports.MoveList = MoveList;

Array.prototype.push.apply(MoveList, [
  {
    name: "爆炸烈焰",
    alias: "ブラストバーン|Blast Burn",
    power: "6",
    category: "special",
    type: "Fire",
    tags: [
      "target|l|foe",
      "frame|accuracy||down|1",
      "effect|l|lethal",
      "effect|l|recharge",
    ],
    accuracy: "特殊   导引",
    damage: "特殊   6",
    effect: "必须重新充能。致命伤害。",
    desc: "宝可梦耗尽它的全身全力向敌人释放出地狱般的爆炸燃焰。但使用者在这之后将会筋疲力竭。",
  },
  {
    name: "火焰踢",
    alias: "ブレイズキック|Blaze Kick",
    power: "3",
    category: "physical",
    type: "Fire",
    tags: [
      "target|l|foe",
      "frame|accuracy||down|1",
      "effect|l|crit",
      "frame|burn2||number|d2",
    ],
    accuracy: "灵巧   斗殴",
    damage: "力量   3",
    effect: "容易击中要害。骰 2 颗概率骰以使敌人陷入「灼伤 2 级」状态。",
    desc: "使用者使出一记缠绕着火焰的强力踢击，可能会让对方留下难看的灼伤痕迹。",
  },
  {
    name: "青焰",
    alias: "あおいほのお|Blue Flare",
    power: "6",
    category: "special",
    type: "Fire",
    tags: ["target|l|foe", "frame|accuracy||down|2", "frame|burn3||number|d2"],
    accuracy: "特殊   导引",
    damage: "特殊   6",
    effect: "骰 2 颗概率骰以使敌人陷入「灼伤 3 级」状态。",
    desc: "伴随着惊天动地的爆炸，莱希拉姆释放出巨大的蓝色火焰缠绕自身，直接被这个攻击命中将可能使完全被火焰给吞没。",
  },
  {
    name: "燃尽",
    alias: "もえつきる|Burn Up",
    power: "7",
    category: "special",
    type: "Fire",
    tags: ["target|l|foe", "effect|l|lethal"],
    accuracy: "意志   导引",
    damage: "特殊   7",
    effect:
      "致命伤害。在造成伤害之后，使用者在当日期间将不再被视为火属性（如果它原本就只有火属性，那它将被视为无属性）。在当日期间，该宝可梦所使用的火属性招式将无法把招式的威力加到伤害骰池中。",
    desc: "使用者透过燃尽自身的火焰以释放出它所有的力量。尽管这个伤害是毁灭性的，但它在至少一天之内都将无法再生成任何火焰。",
  },
  {
    name: "火花",
    alias: "ひのこ|Ember",
    power: "2",
    category: "special",
    type: "Fire",
    tags: ["target|l|foe", "frame|burn1||number|d1"],
    accuracy: "灵巧   导引",
    damage: "特殊   2",
    effect: "骰 1 颗概率骰以使敌人陷入「灼伤 1 级」状态。",
    desc: "使用者向目标发射小型火焰，这可能会导致一级灼伤。",
  },
  {
    name: "喷火",
    alias: "ふんか|Eruption",
    power: "6*",
    category: "special",
    type: "Fire",
    tags: ["target|l|allfoe", "effect|l|lethal"],
    accuracy: "特殊   导引",
    damage: "特殊   6*",
    effect:
      "致命伤害。以所有范围内的敌人为目标。使用者每失去 1 点HP，这个招式的伤害骰池就会减少 1 颗骰子。这个方式最多会减少 5 颗骰子。",
    desc: "使用者猛烈喷发出熔岩来烧尽任何它所接触的东西。",
  },
  {
    name: "火之舞",
    alias: "ほのおのまい|Fiery Dance",
    power: "3",
    category: "special",
    type: "Fire",
    tags: ["target|l|foe", "dice|l|5", "frame|self|特殊|up|1"],
    accuracy: "灵巧   表演",
    damage: "特殊   3",
    effect: "骰 5 颗概率骰以提升使用者的特殊。",
    desc: "使用者将自己包裹于火焰之中，在优雅起舞的同时放射出火焰。",
  },
  {
    name: "大字爆炎",
    alias: "だいもんじ|Fire Blast",
    power: "5",
    category: "special",
    type: "Fire",
    tags: [
      "target|l|foe",
      "frame|accuracy||down|2",
      "effect|l|lethal",
      "frame|burn3||number|d3",
    ],
    accuracy: "特殊   导引",
    damage: "特殊   5",
    effect: "致命伤害。骰 3 颗概率骰以使目标陷入「灼伤 3 级」状态。",
    desc: "宝可梦喷出一个巨大的火球并在接触到敌人时爆炸，爆炸的火焰将呈现大字形状。",
  },
  {
    name: "火焰牙",
    alias: "ほのおのキバ|Fire Fang",
    power: "2",
    category: "physical",
    type: "Fire",
    tags: [
      "target|l|foe",
      "frame|accuracy||down|1",
      "frame|flinch||number|d2",
      "frame|burn1||number|d2",
    ],
    accuracy: "灵巧   斗殴",
    damage: "力量   2",
    effect:
      "骰 2 颗概率骰以使敌人陷入「畏缩」状态。骰 2 颗概率骰以使敌人陷入「灼伤 1 级」状态。",
    desc: "使用者在咬住目标的同时从口中喷出火焰吐息。",
  },
  {
    name: "火焰鞭",
    alias: "ほのおのムチ|Fire Lash",
    power: "3",
    category: "physical",
    type: "Fire",
    tags: ["target|l|foe", "frame|target|防御|down|1"],
    accuracy: "灵巧   斗殴",
    damage: "力量   3",
    effect: "降低敌人的防御。",
    desc: "利用燃烧的鞭子，宝可梦缠住它的敌人，使它们毫无防备，只能任其摆布。",
  },
  {
    name: "火之誓约",
    alias: "ほのおのちかい|Fire Pledge",
    power: "2",
    category: "special",
    type: "Fire",
    tags: ["target|l|area", "target|l|field"],
    accuracy: "灵巧   导引",
    damage: "特殊   2",
    effect:
      "范围攻击。所有战场上的可燃植物和物体都将化为熊熊火海。每个战斗轮结束时，骰 1 颗伤害骰以对战场上的所有人造成伤害。",
    desc: "宝可梦吟唱召唤火之力量的咒语。它的誓言得到回应，火焰吞噬了周围的一切。",
  },
  {
    name: "火焰拳",
    alias: "ほのおのパンチ|Fire Punch",
    power: "3",
    category: "physical",
    type: "Fire",
    tags: ["target|l|foe", "effect|l|fist", "frame|burn2||number|d1"],
    accuracy: "灵巧   斗殴",
    damage: "力量   3",
    effect: "拳头类招式。骰 1 颗概率骰以使目标陷入「灼伤 2 级」状态。",
    desc: "使用者可以短暂点燃自己的拳头，而不用担心承受灼伤的危险。但敌人或许就没那么幸运了。",
  },
  {
    name: "火焰旋涡",
    alias: "ほのおのうず|Fire Spin",
    power: "2",
    category: "special",
    type: "Fire",
    tags: ["target|l|foe", "frame|accuracy||down|2", "effect|l|block"],
    accuracy: "灵巧   导引",
    damage: "特殊   2",
    effect:
      "阻挡。每个战斗轮结束时，骰 2 颗伤害骰以对敌人造成伤害。持续 4 轮。",
    desc: "使用者在场上创造出漩涡状的旋转火焰，将敌人困在里面。",
  },
  {
    name: "烈焰溅射",
    alias: "はじけるほのお|Flame Burst",
    power: "3",
    category: "special",
    type: "Fire",
    tags: ["target|l|foe"],
    accuracy: "灵巧   导引",
    damage: "特殊   3",
    effect:
      "在造成伤害之后，使用者可以再骰 1 颗伤害骰以对另外二个目标造成伤害。",
    desc: "一种聚合浓缩的火球，会在接触到敌人时爆开，让小型烈焰纷飞四散。",
  },
  {
    name: "蓄能焰袭",
    alias: "ニトロチャージ|Flame Charge",
    power: "2",
    category: "physical",
    type: "Fire",
    tags: ["target|l|foe", "frame|self|灵巧|up|1"],
    accuracy: "灵巧   斗殴",
    damage: "力量   2",
    effect: "提升使用者的灵巧。",
    desc: "宝可梦利用自己的火焰作为推进力以冲撞对手。",
  },
  {
    name: "火焰轮",
    alias: "かえんぐるま|Flame Wheel",
    power: "2",
    category: "physical",
    type: "Fire",
    tags: ["target|l|foe", "frame|burn1||number|d1"],
    accuracy: "灵巧   斗殴",
    damage: "力量   2",
    effect: "骰 1 颗概率骰以使目标陷入「灼伤 1 级」状态。",
    desc: "使用者将自己包裹在火焰中，然后卷起身体翻滚着撞击目标。",
  },
  {
    name: "喷射火焰",
    alias: "かえんほうしゃ|Flamethrower",
    power: "3",
    category: "special",
    type: "Fire",
    tags: ["target|l|foe", "frame|burn2||number|d1"],
    accuracy: "灵巧   导引",
    damage: "特殊   3",
    effect: "骰 1 颗概率骰以使目标陷入「灼伤 2 级」状态。",
    desc: "使用者喷出一道强大的火焰，留下焦灼的痕迹。",
  },
  {
    name: "闪焰冲锋",
    alias: "フレアドライブ|Flare Blitz",
    power: "5",
    category: "physical",
    type: "Fire",
    tags: ["target|l|foe", "effect|l|recoil", "frame|burn3||number|d3"],
    accuracy: "力量   斗殴",
    damage: "力量   5",
    effect: "反作用力伤害。骰 3 颗概率骰以使目标陷入「灼伤 3 级」状态。",
    desc: "使用者点燃自己，然后不顾一切地向目标发起猛烈攻击。",
  },
  {
    name: "交错火焰",
    alias: "クロスフレイム|Fusion Flare",
    power: "4*",
    category: "special",
    type: "Fire",
    tags: ["target|l|foe", "effect|l|lethal"],
    accuracy: "特殊   导引",
    damage: "特殊   4*",
    effect:
      "致命伤害。如果这个战斗轮中已经有任何人使用了〈交错闪电〉招式，则这个招式的伤害骰池将额外增加 4 颗骰子。",
    desc: "宝可梦将目标困在一道旋转的火焰柱中，传说如果附近存在一种特殊的电流的话，火焰柱就会旋转得更快更高。",
  },
  {
    name: "高温重压",
    alias: "ヒートスタンプ|Heat Crash",
    power: "2*",
    category: "physical",
    type: "Fire",
    tags: ["target|l|foe"],
    accuracy: "力量   斗殴",
    damage: "力量   2*",
    effect:
      "使用者的体重每超过目标 50 公斤，这个招式的伤害骰池就可以额外增加 1 颗骰子。你最多可以透过这个方式增加 4 颗骰子。",
    desc: "使用者用它被火包裹的身体重压目标。",
  },
  {
    name: "热风",
    alias: "ねっぷう|Heat Wave",
    power: "3",
    category: "special",
    type: "Fire",
    tags: [
      "target|l|allfoe",
      "frame|accuracy||down|1",
      "frame|burn1||number|d1",
    ],
    accuracy: "灵巧   导引",
    damage: "特殊   3",
    effect:
      "以所有范围内的敌人为目标。骰 1 颗概率骰以使目标陷入「灼伤 1 级」状态。",
    desc: "使用者喷出一股巨大的炽热气浪，能点燃任何它所接触到的东西。",
  },
  {
    name: "烧尽",
    alias: "やきつくす|Incinerate",
    power: "2",
    category: "special",
    type: "Fire",
    tags: ["target|l|allfoe"],
    accuracy: "灵巧   导引",
    damage: "特殊   2",
    effect: "以所有范围内的敌人为目标。摧毁目标持有的任何树果。",
    desc: "宝可梦释放出一股火焰，能在瞬间烧掉任何小型的可燃物品。",
  },
  {
    name: "炼狱",
    alias: "れんごく|Inferno",
    power: "4",
    category: "special",
    type: "Fire",
    tags: [
      "target|l|foe",
      "frame|accuracy||down|3",
      "effect|l|lethal",
      "frame|burn3||always",
    ],
    accuracy: "灵巧   导引",
    damage: "特殊   4",
    effect: "致命伤害。使敌人陷入「灼伤 3 级」状态。",
    desc: "宝可梦将敌人点燃。这些窜起的火焰高可达 6 英尺。是一种相当危险的招式。",
  },
  {
    name: "喷烟",
    alias: "ふんえん|Lava Plume",
    power: "3",
    category: "special",
    type: "Fire",
    tags: ["target|l|area", "frame|burn1||number|d3"],
    accuracy: "灵巧   导引",
    damage: "特殊   3",
    effect: "范围攻击。骰 3 颗概率骰以使目标陷入「灼伤 1 级」状态。",
    desc: "使用者喷出炽热的火山黑烟，使其散落充斥在战场周遭。",
  },
  {
    name: "熔岩风暴",
    alias: "マグマストーム|Magma Storm",
    power: "4",
    category: "special",
    type: "Fire",
    tags: ["target|l|foe", "frame|accuracy||down|2", "effect|l|block"],
    accuracy: "特殊   导引",
    damage: "特殊   4",
    effect:
      "阻挡。每个战斗轮结束时，骰 3 颗伤害骰以对敌人造成伤害。持续 4 轮。",
    desc: "宝可梦朝它的敌人放射出炽热的熔岩之力。由于无法逃脱且被难以忍受的高温环绕，敌人可得冒很大的风险才能幸存。",
  },
  {
    name: "惊爆大头",
    alias: "ビックリヘッド|Mind Blown",
    power: "6",
    category: "special",
    type: "Fire",
    tags: ["target|l|area", "effect|l|recoil"],
    accuracy: "洞察   导引",
    damage: "特殊   6",
    effect: "范围攻击。反作用力伤害。",
    desc: "宝可梦度过了糟糕透顶的一天且头痛得厉害，尽量不要打扰它，因为它的头感觉随时会爆炸。",
  },
  {
    name: "魔法火焰",
    alias: "マジカルフレイム|Mystical Fire",
    power: "2",
    category: "special",
    type: "Fire",
    tags: ["target|l|foe", "frame|target|特殊|down|1"],
    accuracy: "灵巧   导引",
    damage: "特殊   2",
    effect: "降低敌人的特殊。",
    desc: "这种魔法火焰不只会灼烧对手，还会吸收它的力量。",
  },
  {
    name: "过热",
    alias: "オーバーヒート|Overheat",
    power: "6",
    category: "special",
    type: "Fire",
    tags: [
      "target|l|foe",
      "frame|accuracy||down|1",
      "effect|l|lethal",
      "frame|self|特殊|down|2",
    ],
    accuracy: "特殊   导引",
    damage: "特殊   6",
    effect: "致命伤害。降低使用者的特殊。",
    desc: "一股猛烈而焦灼烈焰热浪将会所有接触到的事物都烧成灰烬，这将让使用者筋疲力尽。",
  },
  {
    name: "火焰球",
    alias: "かえんボール|Pyro Ball",
    power: "5",
    category: "physical",
    type: "Fire",
    tags: ["target|l|foe", "frame|accuracy||down|1", "frame|burn2||number|d1"],
    accuracy: "力量   导引",
    damage: "力量   5",
    effect: "骰 1 颗概率骰以使目标陷入「灼伤 2 级」状态。",
    desc: "宝可梦点燃一块沉重的石头并在它熊熊燃烧时踢出。这一击原本就已经够疼的了，以至于上头的火焰只不过是锦上添花。",
  },
  {
    name: "神圣之火",
    alias: "せいなるほのお|Sacred Fire",
    power: "4",
    category: "physical",
    type: "Fire",
    tags: ["target|l|foe", "effect|l|lethal", "frame|burn3||number|d5"],
    accuracy: "灵巧   导引",
    damage: "力量   4",
    effect: "致命伤害。骰 5 颗概率骰以使目标陷入「灼伤 3 级」状态。",
    desc: "一道彩虹色泽的柱状烈焰席卷敌人，它能燃烧并净化敌人内心的邪恶。心地纯洁的人不应该为此害怕，因为他们不会因此受到伤害。",
  },
  {
    name: "火焰弹",
    alias: "かえんだん|Searing Shot",
    power: "5",
    category: "special",
    type: "Fire",
    tags: ["target|l|allfoe", "effect|l|lethal", "frame|burn2||number|d3"],
    accuracy: "特殊   导引",
    damage: "特殊   5",
    effect:
      "致命伤害。以所有范围内的敌人为目标。骰 3 颗概率骰以使目标陷入「灼伤 2 级」状态。",
    desc: "使用者的身边突然迸发出猩红色的烈焰并将周围的一切点燃。所有东西都会在几秒钟内化为乌有。",
  },
  {
    name: "陷阱甲壳",
    alias: "トラップシェル|Shell Trap",
    power: "6",
    category: "special",
    type: "Fire",
    tags: ["target|l|foe", "frame|priority||down|3", "effect|l|lethal"],
    accuracy: "灵巧   隐匿",
    damage: "特殊   6",
    effect:
      "后制招式。致命伤害。这个招式会在下一次使用者被非远程攻击的物理攻击命中时发动。",
    desc: "表面上宝可梦只是把自己埋在地下，但它其实悄悄的准备好引爆它的外壳：任何不幸踩到它的可怜虫都会被炸成碎片。",
  },
  {
    name: "熊熊火爆",
    alias: "めらめらバーン|Sizzly Slide",
    power: "3",
    category: "physical",
    type: "Fire",
    tags: ["target|l|foe", "frame|burn1||always"],
    accuracy: "灵巧   斗殴",
    damage: "力量   3",
    effect:
      "使敌人陷入「灼伤 1 级」状态。如果这个招式的使用者处于最终进化阶段，则这个招式自动失败。",
    desc: "使用者在地面上如同滑冰一样四处滑行，只不过它溜的不是冰，而是熊熊燃烧的大火。",
  },
  {
    name: "大晴天",
    alias: "にほんばれ|Sunny Day",
    power: "-",
    category: "support",
    type: "Fire",
    tags: ["target|l|field", "weather|l|sun"],
    accuracy: "特殊   自然",
    damage: "-",
    effect: "让天气状态在接下来 4 轮期间变为大晴天。",
    desc: "宝可梦会伴随着太阳提高环境的温度，但这在夜晚、室内、地下或水中都无法生效。",
  },
  {
    name: "Ｖ热焰",
    alias: "Ｖジェネレート|V-create",
    power: "7",
    category: "physical",
    type: "Fire",
    tags: [
      "target|l|foe",
      "frame|self|灵巧|down|1",
      "frame|self|防御|down|1",
      "frame|self|特防|down|1",
    ],
    accuracy: "力量   斗殴",
    damage: "力量   7",
    effect: "降低使用者的灵巧、防御、和特防。",
    desc: "使用者从前额释放V形火焰猛击敌人，并在受到冲击时引发恐怖的爆炸，并让使用者在这之后变得脆弱不堪。",
  },
  {
    name: "鬼火",
    alias: "おにび|Will-O-Wisp",
    power: "-",
    category: "support",
    type: "Fire",
    tags: ["target|l|foe", "frame|accuracy||down|2", "frame|burn1||always"],
    accuracy: "灵巧   导引",
    damage: "-",
    effect: "使敌人陷入「灼伤 1 级」状态。",
    desc: "使用者召唤出飘浮的火花来干扰敌人。",
  },
]);
