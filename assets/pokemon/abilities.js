let AbilityList;
if (!AbilityList) AbilityList = [];

Array.prototype.push.apply(AbilityList, [
  {
    name: "适应力",
    alias: "てきおうりょく|Adaptability",
    tags: [
      "target|l|self",
      "nftext|l|使用同属性攻击时",
      "frame|self|伤害|plus|d1",
    ],
    effect:
      "每当这只宝可梦使用了属性与自己相同的伤害招式，该攻击的伤害骰池额外增加 1 颗骰子。",
    desc: "宝可梦可以轻易适应周遭环境，它能够轻易穿越任何地形。",
  },
  {
    name: "飞行皮肤",
    alias: "スカイスキン|Aerilate",
    tags: [
      "target|l|self",
      "text|l|一般招式|Normal",
      "text|l|飞行招式|Flying",
      "frame|self|伤害|plus|d1",
    ],
    effect:
      "这只宝可梦使用的一般属性攻击将会如同它是飞行属性的招式一样造成伤害，并适用属性一致加成、弱点和抗性。飞行属性招式的伤害骰池额外增加 1 颗骰子。",
    desc: "这只宝可梦永不落地，可以感觉到一阵永不止息的旋风环绕在它的身边。",
  },
  {
    name: "引爆",
    alias: "ゆうばく|Aftermath",
    tags: [
      "nftext|l|因为物理攻击而濒死时",
      "target|l|foe",
      "frame|target|伤害|number|2",
    ],
    effect:
      "如果这只宝可梦因为非远程的物理攻击而陷入濒死状态，则该攻击的使用者将会受到 2 点伤害。",
    desc: "当受伤或生气时，这只宝可梦会准备爆发。如果受到足够的打击，它将会在接触时爆炸。",
  },
  {
    name: "气闸",
    alias: "エアロック|Air Lock",
    tags: ["target|l|field", "text|l|无效天气"],
    effect:
      "无效战场上所有天气状态的效果。如果战场上没有任何天气状态，则天气状态将无法透过任何招式或特性而被发动。如果已经有正在发动的天气状态，则它不会消失不见，只是不会发挥任何效果。",
    desc: "这只宝可梦的身边环绕着真空空间。雨天、沙尘、或冰雹的粒子都会静止悬浮在它身边，就连热气都无法穿过。",
  },
  {
    name: "分析",
    alias: "アナライズ|Analytic",
    tags: [
      "target|l|self",
      "nftext|l|先攻顺序低于敌人时",
      "frame|self|伤害|plus|d1",
    ],
    effect:
      "如果这只宝可梦的先攻顺序比它的目标还要后面，则它的所有伤害骰池额外增加 1 颗骰子。",
    desc: "这只宝可梦永远不会鲁莽冲锋，它会花点时间思考如何在任何情境下采取最佳决策。",
  },
  {
    name: "愤怒穴位",
    alias: "いかりのつぼ|Anger Point",
    tags: ["target|l|self", "nftext|l|被击中要害之后", "frame|self|力量|up|3"],
    effect: "如果敌人对这只宝可梦造成击中要害，则这只宝可梦的力量提升 3 点。",
    desc: "这只宝可梦会轻易地变得凶猛侵略。几乎不用多加挑衅，它就会开始大发脾气，把所有一切都撕成碎片。",
  },
  {
    name: "危险预知",
    alias: "きけんよち|Anticipation",
    tags: [
      "target|l|self",
      "nftext|l|发出警告:",
      "effect|l|lethal",
      "text|l|效果绝佳",
    ],
    effect:
      "如果敌人拥有能够造成致命伤害、或对这只宝可梦效果绝佳的招式，那它会警告它的训练家。",
    desc: "这只宝可梦总是警界着威胁，并鲜少坐下来放松。如果它察觉到了潜在的危险，它将会变得焦躁并开始颤抖。",
  },
  {
    name: "沙穴",
    alias: "ありじごく|Arena Trap",
    tags: ["target|l|allfoe", "effect|l|block"],
    effect:
      "位于地面的敌方宝可梦被阻挡，只要这只宝可梦仍在战场上，它们就无法逃跑或被替换。",
    desc: "这只宝可梦的周遭地面变得相当松软且难以行走。当遭遇危险时，它会使周遭的地面下沉，创造出一个流沙坑。",
  },
  {
    name: "芳香幕",
    alias: "アロマベール|Aroma Veil",
    tags: ["target|l|allally"],
    effect:
      "使用者和范围内的队友将免疫于这些招式的效果：〈挑衅〉、〈无理取闹〉、〈迷人〉、〈定身法〉、〈再来一次〉、〈回复封锁〉。",
    desc: "这只宝可梦会释放出一种美妙的气味，让你们即使在紧张情势下仍能保持放松。",
  },
  {
    name: "气场破坏",
    alias: "オーラブレイク|Aura Break",
    tags: ["nftext|l|反转暗黑气场和妖精气场的效果"],
    effect:
      "反转「暗黑气场」和「妖精气场」特性对它们使用者的效果。如果该特性会增加它们使用者的伤害骰池，那么它将改为减少骰池。",
    desc: "当接近这只宝可梦时，任何散发出特别邪恶气场的人将会被净化，任何有着纯净气场的人也将被邪恶腐化。",
  },
  {
    name: "梦魇",
    alias: "ナイトメア|Bad Dreams",
    tags: [
      "target|l|area",
      "nftext|l|对处于睡眠状态的目标",
      "frame|target|伤害|number|1",
    ],
    effect:
      "在每个战斗轮结束时，对战场上任何处于「睡眠」状态的对象造成 1 点伤害。",
    desc: "这只宝可梦能够透过梦境世界传送它邪恶的意图，造成破坏，并将恐惧带到那些陷入沉睡的人们心中。",
  },
  {
    name: "捡球",
    alias: "たまひろい|Ball Fetch",
    tags: ["target|l|self"],
    effect:
      "每当你向野生宝可梦丢出精灵球，如果收服判定失败，则该精灵球不会坏掉，而是改为让这只宝可梦在该场景结束时把它带回给你。",
    desc: "这只宝可梦有些沉迷于「丢接球」的游戏中，它可以玩上好几个小时，乐此不疲。",
  },
  {
    name: "蓄电池",
    alias: "バッテリー|Battery",
    tags: [
      "target|l|allally",
      "frame|self|特殊|up|1",
      "nftext|l|使用特殊攻击时",
      "frame|self|伤害|plus|d1",
    ],
    effect:
      "使范围内所有队友宝可梦的特殊提升 1 点。所有队友宝可梦的特殊招式的伤害骰池也会额外增加 1 颗骰子。",
    desc: "这只宝可梦的存在创造了一股电力场，能使电子产品充能，并什至让他人感到精力充沛。",
  },
  {
    name: "战斗盔甲",
    alias: "カブトアーマー|Battle Armor",
    tags: ["target|l|foe", "frame|target|要害奖励|never"],
    effect:
      "如果敌人对这只宝可梦造成了击中要害，则它不会因为击中要害而获得任何额外的奖励骰。",
    desc: "这只宝可梦的表面被被坚韧材质构成的盔甲给包覆，像是岩石、钢铁、或外骨骼。",
  },
  {
    name: "牵绊变身",
    alias: "きずなへんげ|Battle Bond",
    tags: ["target|l|self"],
    effect:
      "在敌人被这只宝可梦给击败<b>之后</b>，如果它的忠诚度为 5 点，则它会变化为「战斗牵绊型态」持续直到该场景结束，或直到它或它的训练家陷入拼死状态。每个队伍只能有一个拥有这个特性的宝可梦。拥有这个特性的宝可梦不能持有超级石。<br><b>战斗牵绊型态：</b><ul><li>宝可梦的力量和特殊的上限增加 2 点。</li><li>依照你的判断为战斗牵绊型态重新分配阶级给予的特质点数。</li><li>你所选择的一个招式的威力增加 1 点。</li><li>让，并解除所有异常状态。</li><li>当处于战斗牵绊型态时，所有该宝可梦受到的战斗伤害也都会伤害到它的训练家。</li></ul>",
    desc: "这只宝可梦与那跟它一起经历过最激烈战斗的伙伴建立了紧密的联系。在赢得胜利之后，因为他们之间的友谊，一股强大的力量涌现了。",
  },
  {
    name: "异兽提升",
    alias: "ビーストブースト|Beast Boost",
    tags: [
      "target|l|self",
      "nftext|l|让敌人陷入濒死状态后",
      "frame|self|特质|up|1",
    ],
    effect:
      "如果敌人因为这只异兽的攻击而陷入濒死状态，将这只异兽上限最高的特质提升 1 点。你最多可以透过这个方式提升 3 点。只有异兽能够拥有这个特性。异兽提升特性无法被交换或复制。",
    desc: "一种可怕的满足感会在这只生物造成破坏时涌现，让它随着每一个倒下的敌人而变得越来越野蛮。",
  },
  {
    name: "怒火冲天",
    alias: "ぎゃくじょう|Berserk",
    tags: [
      "target|l|self",
      "nftext|l|HP降到一半或以下时",
      "frame|self|特殊|up|1",
    ],
    effect: "当这只宝可梦的HP剩一半或以下，它的特殊特质提升 1 点。",
    desc: "这只宝可梦的行为举止通常相当冷静，但当它的性命或它在乎的对象陷入危险，肾上腺素的冲击将把它变成一头狂怒的野兽。",
  },
  {
    name: "健壮胸肌",
    alias: "はとむね|Big Pecks",
    tags: ["target|l|self", "frame|self|防御|down|never"],
    effect: "这只宝可梦的防御特质不会被降低。",
    desc: "这只顽强的宝可梦利用它的胸肌来弥补它的弱点。",
  },
  {
    name: "猛火",
    alias: "もうか|Blaze",
    tags: [
      "target|l|self",
      "nftext|l|HP降到一半或以下时",
      "text|l|火系招式|Fire",
      "frame|self|伤害|plus|d1",
    ],
    effect:
      "当这只宝可梦的HP剩一半或以下，它火属性招式的伤害骰池并不会因为疼痛惩罚而被扣除成功骰，且它火属性招式的伤害骰池会额外增加 1 颗骰子。",
    desc: "这只宝可梦身上的火焰会在消散前更猛烈地熊熊燃烧。",
  },
  {
    name: "防弹",
    alias: "ぼうだん|Bulletproof",
    tags: ["target|l|self", "text|l|远程攻击", "frame|self|受伤|minus|1"],
    effect: "所有特殊攻击和远程物理攻击对这只宝可梦造成的伤害减少 1 点。",
    desc: "这只宝可梦身上的护甲能保护它不受投射物或小型爆炸的伤害。",
  },
  {
    name: "颊囊",
    alias: "ほおぶくろ|Cheek Pouch",
    tags: [
      "target|l|self",
      "nftext|l|使用树果解除异常状态时",
      "frame|heal||heal|2",
    ],
    effect:
      "每当这只宝可梦吃掉一个不具有回复HP效果的树果时（例如桃桃果、利木果），这只宝可梦可以额外回复 2 HP。",
    desc: "这只宝可梦能把食物和物品储存在它弹性十足的颊囊中，以便日后使用。",
  },
  {
    name: "叶绿素",
    alias: "ようりょくそ|Chlorophyll",
    tags: ["target|l|self", "weather|l|sun", "frame|self|灵巧|up|2"],
    effect: "如果当前天气状态为大晴天，则这只宝可梦的灵巧特质提升 2 点。",
    desc: "这只宝可梦能够行光合作用来获得能量。如果它持续待在日照充足的环境，它将变得很少需要进食。",
  },
  {
    name: "恒净之躯",
    alias: "クリアボディ|Clear Body",
    tags: [
      "target|l|foe",
      "frame|self|特质|up|never",
      "frame|self|特质|down|never",
    ],
    effect:
      "其他宝可梦将无法提升或降低这只宝可梦的特质。这只宝可梦仍然能够提升或降低自己的特质。",
    desc: "这只宝可梦极度注意它身边的整个环境，想要偷偷接近它将会变得极度困难。",
  },
  {
    name: "无关天气",
    alias: "ノーてんき|Cloud Nine",
    tags: ["target|l|self", "text|l|免疫天气"],
    effect: "无效任何作用于这只宝可梦的天气状态效果。",
    desc: "这只宝可梦很容易被满足，且它往往表现得比其他人还要快乐。无论晴天雨天，它都不会感到阴郁。",
  },
  {
    name: "变色",
    alias: "へんしょく|Color Change",
    tags: ["target|l|self", "text|l|改变属性"],
    effect:
      "当这只宝可梦受到伤害时，它将暂时把自己的属性改变成与刚刚命中自己招式相同的属性。这个效果会在宝可梦退出战场时结束。",
    desc: "这只宝可梦能够改变自己的体色和能量来伪装并融入周遭环境。",
  },
  {
    name: "绝对睡眠",
    alias: "ぜったいねむり|Comatose",
    tags: ["target|l|self", "frame|sleep||always", "text|l|免疫异常"],
    effect:
      "这只宝可梦永远处于「睡眠」状态，但它免疫于该状态的效果。这只宝可梦不会陷入其他异常状态。能够影响处于「睡眠」状态宝可梦的招式和特性仍然能如常作用于这只宝可梦。",
    desc: "出于某些原因，这只宝可梦永远处于沉睡状态且完全不会醒来。然而，它仍然能够理解训练家的命令，并能如同它在梦游一般采取行动。",
  },
  {
    name: "好胜",
    alias: "かちき|Competitive",
    tags: ["target|l|self", "nftext|l|当特质降低时", "frame|self|特殊|up|2"],
    effect:
      "当这只宝可梦在战斗中第一次被敌人降低特质时，使它自己的特殊特质提升 2 点。",
    desc: "这只宝可梦的决心会在逆境中成长，它总是尝试与周围的所有人竞争。",
  },
  {
    name: "复眼",
    alias: "ふくがん|Compound Eyes",
    tags: [
      "target|l|self",
      "frame|accuracy||down|x",
      "frame|self|命中|plus|d2",
    ],
    effect:
      "这只宝可梦在使用任何带有「降低命中率」标志的招式时，其命中判定将额外获得 2 颗骰子。",
    desc: "这只宝可梦有着环绕式视觉，让它能够以更好的精确度来锁定目标的位置。",
  },
  {
    name: "唱反调",
    alias: "あまのじゃく|Contrary",
    tags: [
      "target|l|self",
      "nftext|l|两者互换",
      "frame|self|特质|down|x",
      "frame|self|特质|up|x",
    ],
    effect:
      "如果有任何效果会降低这只宝可梦的特质，改为将其提升；如果有任何效果会提升这只宝可梦的特质，改为将其降低。",
    desc: "在大部分情况下，这只宝可梦会想要去做那些与你所想相反的事情。有时它什至会因此做出自相矛盾的行为。",
  },
  {
    name: "腐蚀",
    alias: "ふしょく|Corrosion",
    tags: ["target|l|self", "nftext|l|忽略其他宝可梦对毒属性的免疫"],
    effect:
      "忽略任何敌人身上任何对毒属性伤害以及「中毒」和「剧毒」状态的免疫。",
    desc: "这只宝可梦的毒液能够腐蚀金属、木头、和大部分有机无机的物质。小心不要碰到它！",
  },
  {
    name: "棉絮",
    alias: "わたげ|Cotton Down",
    tags: ["target|l|area", "frame|target|灵巧|down|1"],
    effect:
      "如果这只宝可梦被非远程的物理攻击给命中，则降低附近所有宝可梦的灵巧 1 点。",
    desc: "这只宝可梦身上的棉绒经常会脱落飘散，这些棉絮可以被拿来制作漂亮的衣物，但沾上它们也将妨碍行动。",
  },
  {
    name: "诅咒之躯",
    alias: "のろわれボディ|Cursed Body",
    tags: ["target|l|foe", "frame|disabled||number|d3"],
    effect:
      "每当这只宝可梦因某个招式而受到伤害，骰 3 颗概率骰以使对方陷入「定身法」状态。这个方式可以禁用一个以上的招式。",
    desc: "这只宝可梦的体内带有一种诅咒。跟这只宝可梦作对可不是什么好主意。",
  },
  {
    name: "迷人之躯",
    alias: "メロメロボディ|Cute Charm",
    tags: [
      "target|l|foe",
      "nftext|l|当被物理攻击命中时",
      "frame|love||number|d3",
    ],
    effect:
      "当这只宝可梦被敌人以非远程物理攻击给命中时，骰 3 颗概率骰以使敌人陷入「着迷」状态。",
    desc: "也许是因为它动人的双眸、或是它红润的脸颊，但无论如何，其他人和宝可梦都会为了赢得这只宝可梦的芳心而努力。",
  },
  {
    name: "湿气",
    alias: "しめりけ|Damp",
    tags: ["target|l|area"],
    effect:
      "在这只宝可梦周围，没有任何队友或敌人能够使用〈自爆〉和〈大爆炸〉招式。",
    desc: "这只宝可梦会将空气中的水汽聚集在它身边。在它附近要点燃火花或让火焰持续燃烧都会变得相当困难。",
  },
  {
    name: "舞者",
    alias: "おどりこ|Dancer",
    tags: ["target|l|self"],
    effect:
      "每当其他宝可梦使用了名字带有「舞」关键词的招式（例如〈龙之舞〉、〈花瓣舞〉）时，这只宝可梦能够马上紧接着以一个自由动作使用相同的招式，并自动成功（仍必须掷伤害骰）。",
    desc: "每当有人起舞，这只宝可梦也会随之舞蹈。它透过这小巧的舞蹈表达自己的感情和交流。",
  },
  {
    name: "暗黑气场",
    alias: "ダークオーラ|Dark Aura",
    tags: ["target|l|field", "text|l|恶系招式|Dark", "frame|self|伤害|plus|d2"],
    effect:
      "场上所有宝可梦的恶属性招式的伤害骰池全都额外增加 2 颗骰子。这个效果不会叠加。场上的宝可梦和训练家将不会彼此合作。",
    desc: "一股强大的黑色气场从这只宝可梦身上涌出，让黑暗笼罩战场，并使邪恶、自私、和腐化渗入所有人的心中。",
  },
  {
    name: "不屈之盾",
    alias: "ふくつのたて|Dauntless Shield",
    tags: ["target|l|self", "frame|self|防御|up|2"],
    effect:
      "当这只宝可梦进入战斗时，使它自己的防御提升 2 点。在战斗之外的情况，这只宝可梦免疫物理伤害。",
    desc: "这只宝可梦的英勇决心让它能透过纯粹的意志使自己不受物理伤害。它的存在本身可能会使人胆怯不安。",
  },
  {
    name: "鲜艳之躯",
    alias: "ビビッドボディ|Dazzling",
    tags: ["target|l|foe", "frame|priority||up|never"],
    effect: "敌人无法对这只宝可梦使用先制招式。",
    desc: "它美丽的鳞片能如同镜子一样反射光辉。一旦瞥见这只宝可梦，就没有人能够移开他们的视线。",
  },
  {
    name: "软弱",
    alias: "よわき|Defeatist",
    tags: [
      "target|l|self",
      "nftext|l|HP降到一半或以下时",
      "frame|self|力量|down|2",
      "frame|self|特殊|down|2",
    ],
    effect:
      "当这只宝可梦的HP降到一半或以下时，为这只宝可梦的每个行动进行忠诚度的判定。若判定失败，则这只宝可梦在该行动的力量和特殊特质将被视作降低 2 点。若判定成功，则它的特质保持不变。",
    desc: "这只宝可梦是个天生的悲观主义者。当情况变得艰难，它将会第一个放弃。",
  },
  {
    name: "不服输",
    alias: "まけんき|Defiant",
    tags: ["target|l|self", "nftext|l|当特质降低时", "frame|self|力量|up|2"],
    effect:
      "当这只宝可梦在战斗中第一次被敌人降低特质时，使它自己的力量特质提升 2 点。",
    desc: "这只宝可梦绝不会屈服，情况变得越艰难，它的斗志就会变得更高昂。然而，这也可能使它表现的有点叛逆。",
  },
  {
    name: "德尔塔气流",
    alias: "デルタストリーム|Delta Stream",
    tags: ["target|l|field", "weather|l|wind"],
    effect:
      "当这只宝可梦出场时，天气状态将会自动变为乱流。这个效果将会在这只宝可梦退场时结束。（若效果互相冲突，则由意志较高的宝可梦影响天气状态。）",
    desc: "整个战场刮起强风乱流，不知道如何飞行的宝可梦可能会被远远吹飞出去。",
  },
  {
    name: "终结之地",
    alias: "おわりのだいち|Desolate Land",
    tags: ["target|l|field", "weather|l|sun2"],
    effect:
      "当这只宝可梦出场时，天气状态将会自动变为大日照。这个效果将会在这只宝可梦退场时结束。（若效果互相冲突，则由意志较高的宝可梦影响天气状态。）",
    desc: "烈日焦灼是如此酷热，你的皮肤开始发红起泡，所有的水分都被蒸发殆尽，且这只宝可梦的每一步都会使地表熔化成岩浆。",
  },
  {
    name: "画皮",
    alias: "ばけのかわ|Disguise",
    tags: [
      "target|l|self",
      "nftext|l|第一次受到的攻击只会造成",
      "frame|target|伤害|number|0",
    ],
    effect:
      "这只宝可梦在战斗中第一次要受到伤害时，将该伤害降低到零。入场危害、天气状态、和异常状态并不会触发这个特性。",
    desc: "这只宝可梦穿着一件其他宝可梦外观的可信伪装。当它受到伤害时，伪装将会被破坏，看起来就像是它承受了致命伤势一样。",
  },
  {
    name: "下载",
    alias: "ダウンロード|Download",
    tags: [
      "target|l|self",
      "frame|self|力量|up|1",
      "nftext|l|或",
      "frame|self|特殊|up|1",
    ],
    effect:
      "当这只宝可梦出场时，它将会扫描它的敌人并提供关于对方的情报。接着它将会在说书人的裁断下提升 1 点力量或 1 点特殊特质。",
    desc: "这只宝可梦能够扫描敌人，连上电脑中的数据并将其下载到它自己体内。太过大量的资料可能会让它感到有些沉重。",
  },
  {
    name: "降水",
    alias: "あめふらし|Drizzle",
    tags: ["target|l|field", "weather|l|rain"],
    effect:
      "当这只宝可梦出场时，天气状态将会自动变为下雨。这个效果将会在这只宝可梦退场时结束。（若效果互相冲突，则由意志较高的宝可梦影响天气状态。）",
    desc: "只要这只宝可梦这么希望，天空就会在仿佛永不停息的风暴中持续不断降水。",
  },
  {
    name: "日照",
    alias: "ひでり|Drought",
    tags: ["target|l|field", "weather|l|sun"],
    effect:
      "当这只宝可梦出场时，天气状态将会自动变为大晴天。这个效果将会在这只宝可梦退场时结束。（若效果互相冲突，则由意志较高的宝可梦影响天气状态。）",
    desc: "只要这只宝可梦这么希望，日照将会变得无比猛烈并提升场上的温度。",
  },
  {
    name: "干燥皮肤",
    alias: "かんそうはだ|Dry Skin",
    tags: [
      "target|l|self",
      "weather|l|sun",
      "frame|self|伤害|number|1",
      "text|l|火系招式|Fire",
      "frame|self|受伤|plus|1",
      "text|l|水系招式|Water",
      "frame|heal||heal|1",
    ],
    effect:
      "如果当前天气状态为大晴天，则这只宝可梦将在每个战斗轮结束时受到 1 点伤害。火属性招式对这只宝可梦将造成额外 1 点伤害。水属性招式可能会使这只宝可梦回复 1 点HP，而非造成伤害。",
    desc: "这只宝可梦的肌肤需要特别的照料，它需要持续保湿并防范高温。",
  },
  {
    name: "早起",
    alias: "はやおき|Early Bird",
    tags: ["target|l|self", "frame|sleep||number|½"],
    effect:
      "这只宝可梦处于「睡眠」状态的时间减少一半，它只需要在洞察掷骰判定中累积获得 2 颗或以上的成功骰就能在战斗中从「睡眠」状态下清醒过来。这个效果并不适用于招式〈睡觉〉造成的「睡眠」状态。",
    desc: "拥有这个特性的宝可梦是个很容易从沉睡中清醒的浅眠者。它们只需要数个小时的睡眠时间就能充满精神的醒过来。",
  },
  {
    name: "孢子",
    alias: "ほうし|Effect Spore",
    tags: [
      "target|l|foe",
      "nftext|l|当被物理攻击命中时，随机造成",
      "frame|poison||number|d3",
      "frame|paralysis||number|d3",
      "frame|sleep||number|d3",
    ],
    effect:
      "当被非远程攻击的物理攻击给命中时，这只宝可梦将骰 3 颗概率骰以随机使敌人陷入「中毒」、「麻痹」、或「睡眠」状态。",
    desc: "当遭受压力时，这只宝可梦将透过身体释放出孢子，使其遍布四周并导致严重的过敏反应。",
  },
  {
    name: "电气制造者",
    alias: "エレキメイカー|Electric Surge",
    tags: ["target|l|field", "text|l|电气场地|Electric"],
    effect:
      "当这只宝可梦出场时，它将自动发动招式〈电气场地〉的效果。（若效果互相冲突，则由意志较高的宝可梦胜出。）",
    desc: "这只宝可梦能够创造出环绕自己的电气场地，使空气充满紧绷的氛围，也让每个人都感到紧张不安。",
  },
  {
    name: "危险回避",
    alias: "ききかいひ|Emergency Exit",
    tags: [
      "target|l|self",
      "nftext|l|HP降到一半或以下时",
      "effect|l|switcher",
      "target|l|ally",
    ],
    effect:
      "每当这只宝可梦的HP降到一半或以下时，它将会回到自己的精灵球，并换上一名队友来代替它。如果没有其他队友，则战斗直接结束。这个特性的效果不会被「阻挡」给影响。",
    desc: "这只宝可梦会在情势升级失控时采取战术性撤退，尽管你可以强迫它进行战斗，但它可不会喜欢这么做。",
  },
  {
    name: "妖精气场",
    alias: "フェアリーオーラ|Fairy Aura",
    tags: [
      "target|l|field",
      "text|l|妖精招式|Fairy",
      "frame|self|伤害|plus|d2",
    ],
    effect:
      "场上所有宝可梦的妖精属性招式的伤害骰池全都额外增加 2 颗骰子。这个效果不会叠加。场上的宝可梦和训练家将不会攻击这个特性的使用者。",
    desc: "一股强大的粉红色气场从这只宝可梦身上散发而出，使摇曳的微光笼罩着战场，让所有人的心中充满和平、希望、和爱。",
  },
  {
    name: "过滤",
    alias: "フィルター|Filter",
    tags: [
      "target|l|self",
      "nftext|l|当被效果绝佳的攻击命中时",
      "frame|self|受伤|minus|1",
    ],
    effect:
      "如果敌人对这只宝可梦使用了会造成效果绝佳的伤害的招式，则使该攻击造成的总伤害减少 1 点。",
    desc: "这只宝可梦运用着一股看不见的能量力场来过滤任何伤害性的能量和物质。",
  },
  {
    name: "火焰之躯",
    alias: "ほのおのからだ|Flame Body",
    tags: [
      "target|l|foe",
      "nftext|l|当被物理攻击命中时",
      "frame|burn1||number|d3",
    ],
    effect:
      "当这只宝可梦被非远程攻击的物理攻击给命中时，骰 3 颗概率骰以使敌人陷入「灼伤 1 级」状态。",
    desc: "这只宝可梦可以随心所欲点燃自己的身躯，且不会因此受到任何伤害。接触到这只宝可梦的物体可能会起火燃烧。",
  },
  {
    name: "受热激升",
    alias: "ねつぼうそう|Flare Boost",
    tags: [
      "target|l|self",
      "frame|burn1||always",
      "frame|burn2||always",
      "frame|burn3||always",
      "frame|self|特殊|up|2",
    ],
    effect: "如果这只宝可梦陷入任何「灼伤」状态，则它的特殊特质提升 2 点。",
    desc: "拥有这个特性的宝可梦能从火焰产生的极端高热中受益，这可能会让它有点像是纵火狂。",
  },
  {
    name: "引火",
    alias: "もらいび|Flash Fire",
    tags: [
      "target|l|self",
      "nftext|l|免疫",
      "text|l|火系招式|Fire",
      "nftext|l|的伤害",
      "frame|self|伤害|plus|d1",
    ],
    effect:
      "当这只宝可梦第一次被火属性招式命中，则直到该场景结束前，这只宝可梦所使用的火属性招式的伤害骰池都将额外增加 1 颗骰子。火属性招式不会对这只宝可梦造成伤害。",
    desc: "这只宝可梦能够吸收其他火源并将其化为己用。对它来说，走过余烬、火焰、岩浆、和炼狱都只不过像是清风吹拂。",
  },
  {
    name: "花之礼",
    alias: "フラワーギフト|Flower Gift",
    tags: [
      "target|l|allally",
      "text|l|型态变化",
      "weather|l|sun",
      "frame|self|力量|up|2",
      "frame|self|特防|up|2",
    ],
    effect:
      "如果当前天气状态为大晴天，则这只宝可梦和它队友的力量和特防特质都将提升 2 点。",
    desc: "这只宝可梦的花瓣将在阳光普照时散发出满满的能量，这股能量能让周遭的人们感到更强大。",
  },
  {
    name: "花幕",
    alias: "フラワーベール|Flower Veil",
    tags: ["target|l|allally", "frame|self|特质|down|never", "text|l|免疫异常"],
    effect:
      "使用者和队友的特质不会被降低，且不会陷入任何异常状态。在这之前被影响的特质或异常状态仍会保留。",
    desc: "这只宝可梦能使花朵盛开，并保护周遭的其他宝可梦不受伤害。",
  },
  {
    name: "毛茸茸",
    alias: "もふもふ|Fluffy",
    tags: [
      "target|l|self",
      "text|l|物理攻击",
      "frame|self|受伤|minus|2",
      "text|l|火系招式|Fire",
      "frame|self|受伤|plus|2",
    ],
    effect:
      "所有物理攻击对这只宝可梦造成的伤害降低 2 点。所有火属性攻击对这只宝可梦造成的伤害增加 2 点。",
    desc: "这只宝可梦的毛皮蓬松到能让人溺死在里面。它是如此柔软而舒适，仿佛在邀请你拥抱它一样。请使用无温烘干机干燥，不可熨烫。",
  },
  {
    name: "阴晴不定",
    alias: "てんきや|Forecast",
    tags: ["target|l|self", "text|l|型态变化"],
    effect:
      "这只宝可梦的属性会根据当前的天气状态而改变：大晴天时变为火属性、下雨时变为水属性、冰雹时变为冰属性、沙暴时变为岩石属性。",
    desc: "这只宝可梦能够吸收周遭环境的元素而适应变化，让它什至能在极端环境下生存。",
  },
  {
    name: "预知梦",
    alias: "よちむ|Forewarn",
    tags: [
      "target|l|rfoe",
      "nftext|l|发出警告:",
      "effect|l|lethal",
      "text|l|高威力",
    ],
    effect:
      "在战斗中，这只宝可梦会警告它的训练家关于其中一个敌人所拥有的最强招式的情报。说书人必须秘密地将情报告知这只宝可梦的训练家。",
    desc: "当这只宝可梦感觉到恶意或灾难的接近，它将会透过心灵感应警告它的训练家。训练家必须使用洞察进行判定来接收这个信息。",
  },
  {
    name: "友情防守",
    alias: "フレンドガード|Friend Guard",
    tags: [
      "target|l|self",
      "nftext|l|当被队友命中时",
      "frame|self|受伤|minus|2",
    ],
    effect: "如果这只宝可梦被队友施展的招式给命中，则降低 2 点自己受到的伤害。",
    desc: "这只宝可梦相当可爱，并能唤醒他人心中的母性。它的每个同伴都会试图保护好它。",
  },
  {
    name: "察觉",
    alias: "おみとおし|Frisk",
    tags: ["target|l|rfoe", "nftext|l|揭露持有的物品"],
    effect:
      "当这只宝可梦进入战场时，说书人必须把它其中一个敌人持有的物品告诉这只宝可梦的训练家。",
    desc: "这只宝可梦能够看穿其他人携带的道具，即使对方试图把它藏起来也一样。",
  },
  {
    name: "金属防护",
    alias: "メタルプロテクト|Full Metal Body",
    tags: ["target|l|self", "frame|self|特质|down|never"],
    effect:
      "其他宝可梦将无法使这只宝可梦的特质降低。然而，这只宝可梦仍然能够降低自己的特质。",
    desc: "这只宝可梦的身体就是厚重的金属护甲，闪亮的外壳没有一点污瑕。如果往里面注视，那么你可能会被那烈日般的光辉给照瞎。",
  },
  {
    name: "毛皮大衣",
    alias: "ファーコート|Fur Coat",
    tags: [
      "target|l|self",
      "nftext|l|当被物理攻击命中时",
      "frame|self|受伤|minus|2",
    ],
    effect: "所有物理攻击对这只宝可梦造成的伤害降低 2 点。",
    desc: "这只宝可梦毛茸茸的外在相当柔软、可爱想抱、且不会让人过敏，它同时还能做为抵御强大打击的缓冲。",
  },
  {
    name: "疾风之翼",
    alias: "はやてのつばさ|Gale Wings",
    tags: ["target|l|self", "text|l|飞行招式|Flying", "frame|priority||up|1"],
    effect: "这只宝可梦的所有飞行属性招式全都获得「先制度+1」的效果。",
    desc: "这只宝可梦的羽翼构造经过完美设计，让它能轻松驾驭最恶劣的狂风。",
  },
  {
    name: "电气皮肤",
    alias: "エレキスキン|Galvanize",
    tags: [
      "target|l|self",
      "text|l|一般招式|Normal",
      "text|l|电系招式|Electric",
      "frame|self|伤害|plus|d1",
    ],
    effect:
      "这只宝可梦使用的一般属性攻击将会如同它是电属性的招式一样造成伤害，并适用属性一致加成、弱点和抗性。电属性招式的伤害骰池额外增加 1 颗骰子。",
    desc: "这只宝可梦的身躯环绕着电流，这让它无论做什么事都显得充满能量。",
  },
  {
    name: "贪吃鬼",
    alias: "くいしんぼう|Gluttony",
    tags: ["target|l|self"],
    effect:
      "这只宝可梦可以食用任何类型的食物、药物、或草药，而不会承受任何负面效果。这只宝可梦可以在战斗中的任何时候以一个自由动作吃掉它所持有的树果。",
    desc: "这只宝可梦可以吃上一整天，它完全不用担心找不到食物来源，因为它超级不挑食。",
  },
  {
    name: "粘滑",
    alias: "ぬめぬめ|Gooey",
    tags: [
      "target|l|foe",
      "nftext|l|当被物理攻击命中时",
      "frame|target|灵巧|down|1",
    ],
    effect:
      "当敌人第一次以非远程攻击的物理攻击命中这只宝可梦时，使敌人的灵巧特质降低 1 点。",
    desc: "这只宝可梦的粘性分泌物会粘在任何接触它的人身上，并可能会在行动上造成相当程度的负担。往好处想，这可是纯天然的有机胶水耶！",
  },
  {
    name: "一猩一意",
    alias: "ごりむちゅう|Gorilla Tactics",
    tags: [
      "target|l|self",
      "frame|self|力量|up|1",
      "nftext|l|只能进行闪避和使用一个招式",
    ],
    effect:
      "在战斗开始时，选择一个招式。这只宝可梦的力量特质提升 1 点，且它每个战斗轮都只能使用所选择的招式或进行闪避。这个效果会在这只宝可梦被从战斗中收回时重置。",
    desc: "这只宝可梦的仪态有许多待改进的空间，它野蛮而粗俗，且面对难题的唯一手段就是「砸了它！」",
  },
  {
    name: "草之毛皮",
    alias: "くさのけがわ|Grass Pelt",
    tags: ["target|l|self", "text|l|青草场地|Grass", "frame|self|防御|up|2"],
    effect: "如果〈青草场地〉正在发挥效果，则这只宝可梦的防御提升 2 点。",
    desc: "这只宝可梦披着一层茂盛的草皮来保护自己的身体，即使你将其割除，它也会在几天内就重新长回来。",
  },
  {
    name: "青草制造者",
    alias: "グラスメイカー|Grassy Surge",
    tags: ["target|l|field", "text|l|青草场地|Grass"],
    effect:
      "当这只宝可梦出场时，它将自动发动招式〈青草场地〉的效果。（若效果互相冲突，则由意志较高的宝可梦胜出。）",
    desc: "这只宝可梦能够创造出环绕自己的青草场地，让它更容易在阳光下放松发懒。",
  },
  {
    name: "一口飞弹",
    alias: "うのミサイル|Gulp Missile",
    tags: [
      "target|l|self",
      "text|l|型态变化",
      "frame|target|伤害|number|d2",
      "frame|target|防御|down|1",
      "frame|paralysis||always",
    ],
    effect:
      "如果这只宝可梦使用了招式〈冲浪〉或〈潜水〉，则它会在造成伤害后改变型态。如果它的HP还剩下超过一半，则变为「一口吞型态」；如果它的HP还剩下一半或以下，则变为「大口吞型态」。当这只宝可梦在处于其中任意一个型态期间受到敌人造成的伤害，它将骰 2 颗伤害骰以对敌人造成伤害，并根据型态造成额外效果（「一口吞型态」将使敌人的防御降低 1 点；「大口吞型态」将使敌人陷入「麻痹」状态），在这之后，这只宝可梦将会恢复原本的型态。",
    desc: "这只宝可梦是个出色的猎手，它总是能在潜入水池后带着猎物飞翔而出，且它有时候会把猎物当作武器使用……",
  },
  {
    name: "毅力",
    alias: "こんじょう|Guts",
    tags: ["target|l|self", "nftext|l|处于异常状态时", "frame|self|力量|up|2"],
    effect: "当处于异常状态时，这只宝可梦的力量特质提升 2 点。",
    desc: "这只宝可梦敢于做出所有他人不敢为之的行动，且不会轻易失去它的决心，尽管这可能会让它显得有些鲁莽。",
  },
  {
    name: "收获",
    alias: "しゅうかく|Harvest",
    tags: ["target|l|self", "nftext|l|重新长出树果"],
    effect:
      "如果这只宝可梦在战斗期间以持有物品的形式消耗了一棵树果，则该树果会在该日结束时重新长回来。",
    desc: "这只宝可梦天生就能够在短时间内生长出可食用的水果，如果它被喂食了树果，那它也将能够生长出它们。",
  },
  {
    name: "治愈之心",
    alias: "いやしのこころ|Healer",
    tags: ["target|l|ally", "frame|heal|治疗状态|number|d3"],
    effect:
      "如果战场上的某个队友处于异常状态，则在该战斗轮结束时，这只宝可梦可以骰 3 颗概率骰以治疗该状态。",
    desc: "这只宝可梦拥有治疗之力，且它会毫不犹豫地运用这股力量来帮助他人。",
  },
  {
    name: "耐热",
    alias: "たいねつ|Heatproof",
    tags: [
      "target|l|self",
      "frame|burn1||never",
      "text|l|火系招式|Fire",
      "frame|self|受伤|minus|2",
    ],
    effect:
      "「灼伤 1 级」状态不会对这只宝可梦造成伤害。如果这只宝可梦被火属性的攻击命中，减少 2 点受到的伤害。",
    desc: "这只宝可梦能够毫无困难的抵抗高温。",
  },
  {
    name: "重金属",
    alias: "ヘヴィメタル|Heavy Metal",
    tags: ["target|l|self", "nftext|l|体重变为两倍"],
    effect:
      "这只宝可梦的重量变为原本的两倍。基于宝可梦体重的招式的伤害将根据这个变化产生相应的调整。",
    desc: "包裹着这只宝可梦身体的金属是如此厚重，以至于它能轻易使这只宝可梦的重量变为原本的两倍。",
  },
  {
    name: "采蜜",
    alias: "みつあつめ|Honey Gather",
    tags: ["target|l|self", "nftext|l|让你获得甜甜蜜"],
    effect:
      "一小罐甜甜蜜能够卖到最高 $100 的价钱。甜甜蜜能够吸引野生的宝可梦，且把甜甜蜜喂食给宝可梦将能让它快乐。",
    desc: "这只宝可梦能够自己制造出蜂蜜，你每天都能够得到一小罐高质量的甜蜜蜜。",
  },
  {
    name: "大力士",
    alias: "ちからもち|Huge Power",
    tags: ["target|l|self", "frame|self|力量|up|1"],
    effect: "这只宝可梦的力量特质永久提升 1 点。",
    desc: "除了它的身体外表，这只宝可梦还拥有着一股超自然的力量之源。",
  },
  {
    name: "饱了又饿",
    alias: "はらぺこスイッチ|Hunger Switch",
    tags: ["target|l|self", "text|l|型态变化"],
    effect:
      "只有莫鲁贝可能够使用这个特性。这个特性无法被复制或交换。在战斗轮结束时，切换这只宝可梦的型态（「满腹型态」／「空腹型态」）。",
    desc: "这只宝可梦会在感到饥饿时变得相当暴躁，除非你经常给它零食，否则它将会抓狂咬人。",
  },
  {
    name: "活力",
    alias: "はりきり|Hustle",
    tags: [
      "target|l|self",
      "nftext|l|物理攻击获得",
      "frame|accuracy||down|1",
      "frame|self|伤害|plus|d2",
    ],
    effect:
      "这只宝可梦的所有物理攻击都将获得额外的「降低命中率」标志，且伤害骰池获得额外 2 颗骰子。",
    desc: "这只宝可梦会兴冲冲的采取所有行动，这通常会让它的行为变得有些草率。",
  },
  {
    name: "湿润之躯",
    alias: "うるおいボディ|Hydration",
    tags: ["target|l|self", "weather|l|rain", "frame|heal|治疗状态|always"],
    effect:
      "如果当前天气状态为下雨，则这只宝可梦会在战斗轮结束时治疗自己的所有异常状态。",
    desc: "这只宝可梦的身体会吸收水分并利用其来维持自己的健康状态。",
  },
  {
    name: "怪力钳",
    alias: "かいりきバサミ|Hyper Cutter",
    tags: ["target|l|self", "frame|self|力量|down|never"],
    effect: "这只宝可梦的力量特质不会被任何方式降低。",
    desc: "这只宝可梦的钳爪相当锋利，不会变钝。",
  },
  {
    name: "冰冻之躯",
    alias: "アイスボディ|Ice Body",
    tags: ["target|l|self", "weather|l|hail", "frame|heal||heal|1"],
    effect:
      "如果当前天气状态为冰雹，则这只宝可梦可以在战斗轮结束时回复 1 点HP。这只宝可梦免疫冰雹天气造成的伤害。",
    desc: "这只宝可梦的身体仿佛结冻，零度以下的温度对它来说就像是老家一样。",
  },
  {
    name: "结冻头",
    alias: "アイスフェイス|Ice Face",
    tags: ["target|l|self", "weather|l|hail", "text|l|型态变化"],
    effect:
      "当这只宝可梦处于「结冻头型态」时，这只宝可梦拥有 2 点额外HP。如果结冻头受到 2 点伤害，则这只宝可梦将变为「解冻头型态」。要重新变回「结冻头型态」，这只宝可梦必须在冰雹天气状态中待上一整轮的时间。",
    desc: "这只宝可梦的头部被厚实的冰块给遮盖，形成一道保护自己的屏障。如果它被破坏，那它会需要相当寒冷的温度才能使冰块重新成形。",
  },
  {
    name: "冰鳞粉",
    alias: "こおりのりんぷん|Ice Scales",
    tags: [
      "target|l|self",
      "nftext|l|当被特殊攻击命中时",
      "frame|self|受伤|minus|2",
    ],
    effect: "所有特殊攻击对这只宝可梦造成的伤害将减少 2 点。",
    desc: "这只宝可梦的身躯被冰晶鳞片给覆盖。总是散发着寒气，它能够轻易用体表偏折掉大多数的投射物、能量、光线。",
  },
  {
    name: "发光",
    alias: "はっこう|Illuminate",
    tags: ["target|l|self"],
    effect:
      "提升遭遇野生宝可梦的概率。如果存在任何会降低能见度的环境挑战，则这只宝可梦和它的队友将免疫其效果。",
    desc: "这只宝可梦能够自然地让它的身体发出光芒。其他宝可梦会在看见这道光芒时好奇地接近。",
  },
  {
    name: "幻觉",
    alias: "イリュージョン|Illusion",
    tags: ["target|l|self", "nftext|l|改变自己的外观"],
    effect:
      "当这只宝可梦出场时，它会以队伍中的另一只宝可梦的外型登场；它会在受到伤害时变回它原本的外型。当它变为人类的外观时，它不会说话，且它的尾巴仍可能会露出来。",
    desc: "这只宝可梦会对自己施加幻象，让它看起来就像另外一只它曾经看过的生物。这道幻象与本尊几乎毫无区别。",
  },
  {
    name: "免疫",
    alias: "めんえき|Immunity",
    tags: ["target|l|self", "frame|poison||never", "frame|poison2||never"],
    effect: "「中毒」和「剧毒」异常状态不会对这只宝可梦造成任何伤害。",
    desc: "这只宝可梦拥有非常强大的免疫系统，且它很少会生病。它什至能够食用腐烂的食物而不至于得病。",
  },
  {
    name: "变身者",
    alias: "かわりもの|Imposter",
    tags: ["target|l|self", "nftext|l|自动使用〈变身〉招式"],
    effect: "当这只宝可梦进入战斗时，它将直接受到〈变身〉招式的效果影响。",
    desc: "这只宝可梦能够以极快的速度改变它自己的细胞结构，变身成另一个生物的克隆体。",
  },
  {
    name: "穿透",
    alias: "すりぬけ|Infiltrator",
    tags: ["target|l|self"],
    effect:
      "这只宝可梦能够忽略护盾招式、〈神秘守护〉、〈替身〉、〈光墙〉、和〈反射壁〉的效果。",
    desc: "这只宝可梦的行动相当隐匿，它天生就比其他人还要更难以被察觉。",
  },
  {
    name: "飞出的内在物",
    alias: "とびだすなかみ|Innards Out",
    tags: ["target|l|foe", "frame|target|伤害|number|n"],
    effect:
      "如果某个攻击将使这只宝可梦陷入濒死状态，则它会对敌人造成等同于自己剩余HP的伤害。",
    desc: "由于缺少四肢，这只宝可梦会吐出自己的内脏来当作肢体使用、或用来保护自己不受伤害。恶心但有用。",
  },
  {
    name: "精神力",
    alias: "せいしんりょく|Inner Focus",
    tags: ["target|l|self", "frame|flinch||never"],
    effect:
      "这只宝可梦不会陷入「畏缩」状态，且不会被威吓。（「威吓」特性不会对这只宝可梦产生任何效果）",
    desc: "这只宝可梦极度认真且专注在它所做的任何事情上。即使受了重伤，它也会保持冷静，绝不退缩。",
  },
  {
    name: "不眠",
    alias: "ふみん|Insomnia",
    tags: ["target|l|self", "frame|sleep||never"],
    effect: "这只宝可梦不会陷入「睡眠」状态。",
    desc: "这只宝可梦不需要睡觉，它无论何时都会维持清醒。",
  },
  {
    name: "威吓",
    alias: "いかく|Intimidate",
    tags: ["target|l|allfoe", "frame|target|力量|down|1"],
    effect:
      "当这只宝可梦出场时，使范围内所有敌人的力量降低 1 点。只要这只宝可梦在场上，这个效果就会持续。降低遭遇野生宝可梦的概率。",
    desc: "这只宝可梦散发着压倒性的存在威压，能激起他人的恐惧和敬重。",
  },
  {
    name: "不挠之剑",
    alias: "ふとうのけん|Intrepid Sword",
    tags: ["target|l|self", "frame|self|力量|up|2"],
    effect:
      "当这只宝可梦进入战斗时，使它自己的力量提升 2 点。在战斗之外的情况，这只宝可梦可以切穿任何表面。",
    desc: "这只大胆的宝可梦无惧于任何挑战，它的力量能透过纯粹的意志来增长。它的存在本身可能就相当危险。",
  },
  {
    name: "铁刺",
    alias: "てつのトゲ|Iron Barbs",
    tags: [
      "target|l|foe",
      "nftext|l|当被物理攻击命中时",
      "frame|target|伤害|number|d1",
    ],
    effect:
      "每当这只宝可梦被非远程攻击的物理攻击给命中时，骰 1 颗伤害骰以对攻击者造成伤害。",
    desc: "这只宝可梦覆有尖锐的铁棘，能刺伤任何粗鲁碰触它的家伙。",
  },
  {
    name: "铁拳",
    alias: "てつのこぶし|Iron Fist",
    tags: ["target|l|self", "effect|l|fist", "frame|self|伤害|plus|d1"],
    effect: "拳头类招式的伤害骰池额外增加 1 颗骰子。",
    desc: "这只宝可梦的双手相当强壮且沉重，当握紧成拳，它们可以击穿几乎所有一切。",
  },
  {
    name: "正义之心",
    alias: "せいぎのこころ|Justified",
    tags: ["target|l|self", "text|l|恶系招式|Dark", "frame|self|力量|up|1"],
    effect:
      "当这只宝可梦第一次被恶属性攻击命中、或当它目睹了某个它认为不公义的事件时，这只宝可梦的力量特质提升 1 点。",
    desc: "这只宝可梦有着天生的正义感，恶行将会使它感到非常愤怒。",
  },
  {
    name: "锐利目光",
    alias: "するどいめ|Keen Eye",
    tags: ["target|l|self", "frame|self|命中|down|never"],
    effect:
      "这只宝可梦的命中判定的成功骰不会因为招式、道具、或特性的影响而被扣除。但疼痛惩罚和难度惩罚仍会适用。",
    desc: "这只宝可梦拥有卓越的视觉，锁定渺小或位于遥远距离外的目标将会变得容易许多。",
  },
  {
    name: "笨拙",
    alias: "ぶきよう|Klutz",
    tags: ["target|l|self", "nftext|l|免疫持有物品的效果"],
    effect: "这只宝可梦的持有物品不会对自己造成任何效果。",
    desc: "这只宝可梦不懂得如何正确的使用工具，且通常会以意想不到的方式使用它们。",
  },
  {
    name: "叶子防守",
    alias: "リーフガード|Leaf Guard",
    tags: ["target|l|self", "weather|l|sun", "text|l|免疫异常"],
    effect:
      "如果当前天气状态为大晴天，则这只宝可梦不会陷入任何异常状态。在这之前陷入的异常状态仍会保留。",
    desc: "这只宝可梦身上的叶片随着阳光延展以遮盖自己的身体。",
  },
  {
    name: "飘浮",
    alias: "ふゆう|Levitate",
    tags: ["target|l|self", "nftext|l|免疫", "text|l|地面招式|Ground"],
    effect:
      "地面属性的招式和地面上的效果都不会影响这只宝可梦。如果这只宝可梦使用了会把它自己束缚在地面上的招式，则这个效果将会消失，直到它再次脱离地表。",
    desc: "这只宝可梦飘浮在空中四处移动而无须接触地表。",
  },
  {
    name: "自由者",
    alias: "リベロ|Libero",
    tags: ["target|l|self", "text|l|改变属性"],
    effect:
      "每当这只宝可梦使用了一个招式，把它的属性先改变为该招式的属性。若该招式为攻击招式且会造成伤害，则适用属性一致加成。",
    desc: "这只宝可梦在比赛中总有自己的计划。它喜欢居于守势，并在最后进攻时做出最棒的特殊传球。",
  },
  {
    name: "轻金属",
    alias: "ライトメタル|Light Metal",
    tags: ["target|l|self", "nftext|l|体重变轻"],
    effect:
      "这只宝可梦的重量变为原本的50%~75%。基于宝可梦体重的招式的伤害将根据这个变化产生相应的调整。",
    desc: "包裹着这只宝可梦身体的金属仿佛羽毛一样轻盈，使这只宝可梦的体重变为原本的 50% 到 75%。",
  },
  {
    name: "避雷针",
    alias: "ひらいしん|Lightning Rod",
    tags: [
      "target|l|self",
      "nftext|l|吸引并免疫",
      "text|l|电系招式|Electric",
      "frame|self|伤害|plus|d1",
    ],
    effect:
      "如果有任何人使用了单一目标的电属性招式，则该招式的目标将会引导变更为这只宝可梦；这只宝可梦免疫任何电属性招式的伤害。当这只宝可梦第一次被电属性招式命中，这只宝可梦的特殊特质提升 1 点。",
    desc: "这只宝可梦能够把闪电和电流吸引到自身，以供自己充能。",
  },
  {
    name: "柔软",
    alias: "じゅうなん|Limber",
    tags: ["target|l|self", "frame|paralysis||never"],
    effect: "这只宝可梦不会陷入「麻痹」状态。",
    desc: "这只宝可梦的肌肉灵活地令人惊异且有弹性，使它能轻松地行动，迅捷且优雅。",
  },
  {
    name: "污泥浆",
    alias: "ヘドロえき|Liquid Ooze",
    tags: ["target|l|foe"],
    effect:
      "如果这只宝可梦被会吸收它生命能量的招式给命中（比如说〈寄生种子〉、〈食梦〉、〈吸收拳〉等），则该招式会改为对使用者造成等量的伤害。",
    desc: "这只宝可梦的身体会产生出一种有害且带毒素的分泌物，不要尝试吃了它！",
  },
  {
    name: "湿润之声",
    alias: "うるおいボイス|Liquid Voice",
    tags: [
      "target|l|self",
      "effect|l|sound",
      "nftext|l|变为",
      "text|l|水系招式|Water",
    ],
    effect: "这只宝可梦使用的所有声音类招式都将被视为水属性。",
    desc: "嗓音中的声波将使空气中的水分化作水体，就仿佛从无中召唤出水珠、降水、或什至瀑布流水。",
  },
  {
    name: "远隔",
    alias: "えんかく|Long Reach",
    tags: ["target|l|self", "text|l|所有招式", "nftext|l|变为远程招式"],
    effect: "这只宝可梦进行的所有攻击都被视为远程攻击。",
    desc: "这只宝可梦能够攻击物体和敌人的影子，并同时让真正的目标承受伤害。",
  },
  {
    name: "魔法镜",
    alias: "マジックミラー|Magic Bounce",
    tags: ["target|l|foe", "nftext|l|反弹变化系招式"],
    effect:
      "所有以这只宝可梦或它那一方的战场为目标的变化系招式全都会改为以敌人为目标。",
    desc: "这只宝可梦会对他的敌人施展精神控制来让它间接伤害它自己，使其看起来就像魔法一样。",
  },
  {
    name: "魔法防守",
    alias: "マジックガード|Magic Guard",
    tags: ["target|l|self"],
    effect:
      "这只宝可梦不会受到来自 异常状态、反作用力伤害、持有物品、或天气状态　的伤害。",
    desc: "这只宝可梦身上包覆着微弱的能量，能够阻止任何可能发生的微小伤害。",
  },
  {
    name: "魔术师",
    alias: "マジシャン|Magician",
    tags: ["target|l|self", "nftext|l|偷走敌人的持有物品"],
    effect: "这只宝可梦会偷走它击中的敌人身上的持有物品。",
    desc: "这只宝可梦擅于表演简单的魔术技俩来让其他人感到惊艳，像是变出小东西，或把附近的东西在眨眼间变不见。",
  },
  {
    name: "熔岩铠甲",
    alias: "マグマのよろい|Magma Armor",
    tags: ["target|l|self", "frame|frozen||never"],
    effect: "这只宝可梦不会陷入「冰冻」状态。",
    desc: "这只宝可梦的身躯总是灼热难触，它只需要站在大房间里头就能够让其变得温暖，且它可以忍受高温环境。",
  },
  {
    name: "磁力",
    alias: "じりょく|Magnet Pull",
    tags: ["target|l|field", "text|l|钢属性|Steel", "effect|l|block"],
    effect: "所有战场上的钢属性宝可梦都被「阻挡」。",
    desc: "这只宝可梦能够发动它周遭的磁场来吸引各种各样的金属。",
  },
  {
    name: "神奇鳞片",
    alias: "ふしぎなうろこ|Marvel Scale",
    tags: ["target|l|self", "nftext|l|陷入异常状态时", "frame|self|防御|up|2"],
    effect: "如果这只宝可梦陷入异常状态，则它的防御提升 2 点。",
    desc: "这只宝可梦身上的美丽鳞片会在它的身体感到压力时硬化。",
  },
  {
    name: "超级发射器",
    alias: "メガランチャー|Mega Launcher",
    tags: ["target|l|self", "frame|self|伤害|plus|d2"],
    effect:
      "这只宝可梦使用的每个名字带有「波动」或「波导」关键词的招式，其伤害骰池／治疗骰池都将额外增加 2 颗骰子。",
    desc: "这只宝可梦身上的大炮能让它发射出极端猛烈的炮火。",
  },
  {
    name: "不仁不义",
    alias: "ひとでなし|Merciless",
    tags: [
      "target|l|self",
      "nftext|l|对",
      "frame|poison||always",
      "frame|poison2||always",
      "target|l|foe",
      "nftext|l|永远击中要害",
    ],
    effect:
      "如果敌人处于「中毒」或「剧毒」状态，则这只宝可梦对它使用的所有招式都将视为击中要害。根据说书人的判断，这只宝可梦在使用会造成致命伤害的招式时将不会「手下留情」。",
    desc: "一旦这只宝可梦查觉到对方的虚弱，它就会开始顺从自己的残忍天性行事。在没有自知之明的情况下，它们可能会表现的无比残酷。",
  },
  {
    name: "拟态",
    alias: "ぎたい|Mimicry",
    tags: ["target|l|self", "nftext|l|根据场地", "text|l|改变属性"],
    effect:
      "如果有任何场地招式正在生效（像是〈电气场地〉、〈精神场地〉等），则这只宝可梦的主要属性将会变为与该场地相符的属性。如果该场地效果结束，则它的主要属性也会变回原样。",
    desc: "这只宝可梦的身体能够完美地伪装融入地面，有时会很容易把它搞丢，但你总是能在某个不幸的受害者踩到它时找到它。",
  },
  {
    name: "负电",
    alias: "マイナス|Minus",
    tags: [
      "target|l|self",
      "nftext|l|若有「正电」特性的队友",
      "frame|self|特殊|up|2",
    ],
    effect:
      "如果战场上有宝可梦队友的特性为「正电」，则这只宝可梦的特殊特质提升 2 点。",
    desc: "这只宝可梦身上带有天生的负电荷。它会吸引正电荷，并排斥其他的负电荷。它们很容易感到蓝色忧郁。",
  },
  {
    name: "镜甲",
    alias: "ミラーアーマー|Mirror Armor",
    tags: ["target|l|self", "nftext|l|反弹", "frame|self|特质|down|n"],
    effect:
      "所有以这只宝可梦或它那一方的战场为目标，会降低特质的效果都将被反弹，改为以敌人为目标。",
    desc: "这只宝可梦的身躯被闪亮的镜甲给包覆，这套铠甲能够击退并反弹任何意图弱化它的事物。",
  },
  {
    name: "薄雾制造者",
    alias: "ミストメイカー|Misty Surge",
    tags: ["target|l|field", "text|l|薄雾场地|Fairy"],
    effect:
      "当这只宝可梦出场时，它将自动发动招式〈薄雾场地〉的效果。（若效果互相冲突，则由意志较高的宝可梦胜出。）",
    desc: "这只宝可梦能够创造出环绕自己的薄雾场地，这里异常宁静，使人感觉和平且舒缓，但也同时寂寞与孤独。",
  },
  {
    name: "破格",
    alias: "かたやぶり|Mold Breaker",
    tags: ["target|l|self", "nftext|l|忽略其他宝可梦的免疫能力"],
    effect:
      "如果敌人拥有任何属性、特性、或其他免疫能力能阻止这只宝可梦使用某个招式对其进行攻击，将其忽略。",
    desc: "这只宝可梦将找出不寻常的手段来达成它的目的。它们善于创新，绕过难题。",
  },
  {
    name: "心情不定",
    alias: "ムラっけ|Moody",
    tags: [
      "target|l|self",
      "nftext|l|随机",
      "frame|self|特质|up|1",
      "frame|self|特质|down|1",
    ],
    effect:
      "在每个战斗轮结束时，重置「心情不定」造成的特质调整，接着让一个随机特质降低 1 点，并让另一个随机特质提升 1 点。",
    desc: "这只宝可梦的情绪起伏剧烈，且大多数时候都喜怒无常。但愿这只是暂时性的问题。",
  },
  {
    name: "电气引擎",
    alias: "でんきエンジン|Motor Drive",
    tags: [
      "target|l|self",
      "nftext|l|免疫",
      "text|l|电系招式|Electric",
      "nftext|l|的伤害",
      "frame|self|灵巧|up|1",
    ],
    effect:
      "当这只宝可梦第一次被电属性招式命中，这只宝可梦的灵巧将因此提升 1 点。电属性招式不会对这只宝可梦造成伤害。",
    desc: "这只宝可梦会吸收电力并将其能量储存起来，让它能跑得更快。",
  },
  {
    name: "自信过度",
    alias: "じしんかじょう|Moxie",
    tags: [
      "target|l|self",
      "nftext|l|让敌人陷入濒死状态后",
      "frame|self|力量|up|1",
    ],
    effect:
      "如果敌人因为这只宝可梦的攻击而陷入濒死状态，则这只宝可梦的力量提升 1 点。你最多可以透过这个方式提升 3 点。",
    desc: "这只宝可梦天性凶猛无比，且会尝试借着击败群体中的老大来取得权力地位。",
  },
  {
    name: "多重鳞片",
    alias: "マルチスケイル|Multiscale",
    tags: ["target|l|self", "nftext|l|当自己满HP时", "frame|self|受伤|minus|1"],
    effect:
      "如果这只宝可梦的HP全满，则这只宝可梦因为被攻击而受到的伤害将减少 1 点。",
    desc: "这只宝可梦被两层坚硬的鳞片给覆盖，如果其中一层鳞片破损，则它们会脱落并在稍后重新长回来。",
  },
  {
    name: "多属性",
    alias: "マルチタイプ|Multitype",
    tags: ["target|l|self", "text|l|改变属性"],
    effect:
      "这只宝可梦能够在任何时候自由的改变自己的属性。这个特性无法被任何手段给复制、交换、改变、忽略、或无效。",
    desc: "创造出这个宇宙的所有能量都在这只宝可梦的体内流窜，且它能够驾驭最符合当前所需的能量类型。",
  },
  {
    name: "木乃伊",
    alias: "ミイラ|Mummy",
    tags: [
      "target|l|foe",
      "nftext|l|当用物理攻击命中这只宝可梦时",
      "text|l|改变特性",
    ],
    effect:
      "当这只宝可梦被非远程物理攻击命中、或使用非远程物理攻击命中敌人时，将敌人的特性变为「木乃伊」。",
    desc: "这只宝可梦会诅咒任何胆敢对它造成伤害的事物，这个诅咒什至可能会持续好几个世代，且会需要灵媒的协助才能将其解除。",
  },
  {
    name: "自然回复",
    alias: "しぜんかいふく|Natural Cure",
    tags: ["target|l|self", "frame|heal|治疗状态|number|d3"],
    effect:
      "在每个战斗轮结束时，如果这只宝可梦处于任何异常状态，则骰 3 颗概率骰以治疗自己。",
    desc: "这只宝可梦的身体能够制造物质来治疗自己。它们的这个特性也能被用来生产药物。",
  },
  {
    name: "脑核之力",
    alias: "ブレインフォース|Neuroforce",
    tags: [
      "target|l|self",
      "nftext|l|效果绝佳的招式",
      "frame|self|伤害|plus|1",
    ],
    effect:
      "这只宝可梦使用的任何会对敌人造成效果绝佳伤害的招式，都将自动造成 1 点伤害。",
    desc: "这只宝可梦的超能力是如此强大，即使站在附近都能感觉到那股压倒性。它会利用任何它在你心中找到的弱点。",
  },
  {
    name: "化学变化气体",
    alias: "かがくへんかガス|Neutralizing Gas",
    tags: ["target|l|allfoe", "nftext|l|无效所有目标的特性"],
    effect: "只要这只宝可梦在战场上，范围内所有敌人的特性效果都会被无效。",
    desc: "这只宝可梦身边环绕着带有甜味香气的有毒气体。尽管如此，大部分人们和宝可梦都会忍不住停下来并嗅闻这些气体。",
  },
  {
    name: "无防守",
    alias: "ノーガード|No Guard",
    tags: [
      "target|l|self",
      "nftext|l|忽略",
      "frame|accuracy||down|X",
      "nftext|l|但无法闪避",
    ],
    effect:
      "你可以在战斗轮开始时宣告自己不会进行任何闪避动作。如果你这么做，则这只宝可梦在为它的所有招式进行命中判定时将视作没有任何「降低命中率」标志。",
    desc: "这只宝可梦能够完美地专注于攻击，但同时也对它的敌人门户大开，就仿佛它除了专注于精准命中之外完全不在乎其他事情。",
  },
  {
    name: "一般皮肤",
    alias: "ノーマルスキン|Normalize",
    tags: [
      "target|l|self",
      "text|l|所有属性",
      "text|l|一般招式|Normal",
      "frame|self|伤害|plus|d1",
    ],
    effect:
      "这只宝可梦的所有招式都被视为一般属性，并适用属性一致加成、弱点和抗性。一般属性招式的伤害骰池额外增加 1 颗骰子。",
    desc: "这只宝可梦的行动从来不会让人惊艳，总是枯燥无华，且似乎从来没完成过任何出乎意料的事情。",
  },
  {
    name: "迟钝",
    alias: "どんかん|Oblivious",
    tags: ["target|l|self", "frame|love||never"],
    effect:
      "这只宝可梦不会陷入「着迷」状态，且它免疫任何会影响它情绪的招式的效果，像是〈挑衅〉、〈撒娇〉、〈诱惑〉等等",
    desc: "这只宝可梦很少会做出令人满意的社交互动，它太只顾自己，以至于会忽略掉任何期待它做出什么反应的暗示。",
  },
  {
    name: "防尘",
    alias: "ぼうじん|Overcoat",
    tags: ["target|l|self", "nftext|l|免疫天气状态造成的伤害"],
    effect: "这只宝可梦不会被天气状态所伤害。",
    desc: "这只宝可梦有着一层环绕它身体的防护性外壳，能让它在最极端的天气状态下存活下来。",
  },
  {
    name: "茂盛",
    alias: "しんりょく|Overgrow",
    tags: [
      "target|l|self",
      "nftext|l|HP降到一半或以下时",
      "text|l|草系招式|Grass",
      "frame|self|伤害|plus|d1",
    ],
    effect:
      "当这只宝可梦的HP剩一半或以下，它草属性招式的伤害骰池并不会因为疼痛惩罚而被扣除成功骰，且它草属性招式的伤害骰池会额外增加 1 颗骰子。",
    desc: "当这只宝可梦受伤时，它的体内会长出巨大的植物来保卫自己；这个植物相当强劲但凋萎很快。",
  },
  {
    name: "我行我素",
    alias: "マイペース|Own Tempo",
    tags: ["target|l|self", "frame|confuse||never"],
    effect: "这只宝可梦不会陷入「混乱」状态。",
    desc: "这只宝可梦以自己的步调做事，忽略所有同侪压力。它的行为举止出于本能，且相当冷静……或许有点太冷静了。",
  },
  {
    name: "亲子爱",
    alias: "おやこあい|Parental Bond",
    tags: ["target|l|self", "nftext|l|骰二次伤害骰并取高"],
    effect:
      "这只宝可梦的所有伤害骰池都可以骰二次。选择较好的掷骰结果以对敌人造成伤害。",
    desc: "这只宝可梦与它幼崽的关系相当紧密，它们所有事情都会一起做。做母亲的非常保护它的孩子。",
  },
  {
    name: "粉彩护幕",
    alias: "パステルベール|Pastel Veil",
    tags: ["target|l|allally", "frame|poison||never", "frame|poison2||never"],
    effect:
      "使用者和所有范围内的队友都将免疫于「中毒」和「剧毒」状态。如果这些异常状态是在这只宝可梦出场之前造成的，则它仍会保留。",
    desc: "这只宝可梦被柔和的微光包围着。这股能量感觉起来相当纯洁且天真，不可玷污，超凡俗世。",
  },
  {
    name: "灭亡之躯",
    alias: "ほろびのボディ|Perish Body",
    tags: [
      "target|l|foe",
      "nftext|l|当使用物理攻击命中时，在三轮后陷入濒死状态",
    ],
    effect:
      "如果这只宝可梦被非远程物理攻击给命中，则除非敌人脱离战斗，否则敌人将会在三个战斗轮之后受到等同于它剩余HP的伤害并陷入濒死状态。",
    desc: "这只宝可梦会无声地诅咒任何胆敢冒犯它的对象，让他们的灵魂承受它所遭受的痛苦。试着避开这只宝可梦，以免你承受它降下的怨恨。",
  },
  {
    name: "捡拾",
    alias: "ものひろい|Pick up",
    tags: ["target|l|self"],
    effect:
      "如果这只宝可梦待在精灵球外面，则在该场景结束时，看看它为你找到了什么东西（由说书人决定）。",
    desc: "这只宝可梦会经常收集东西，并堆成一个可能会与你分享的小宝物堆。",
  },
  {
    name: "顺手牵羊",
    alias: "わるいてぐせ|Pickpocket",
    tags: ["target|l|foe", "nftext|l|在这只宝可梦使用物理攻击后偷走持有物品"],
    effect:
      "如果这只宝可梦没有持有任何物品，则它会在以非远程物理攻击命中敌人时偷走它身上的持有物品。",
    desc: "这只宝可梦会本能地从他人身上顺手牵羊。在没有人注意的时候，它会偷走任何它能偷的东西。",
  },
  {
    name: "妖精皮肤",
    alias: "フェアリースキン|Pixilate",
    tags: [
      "target|l|self",
      "text|l|一般招式|Normal",
      "text|l|妖精招式|Fairy",
      "frame|self|伤害|plus|d1",
    ],
    effect:
      "这只宝可梦使用的一般属性攻击将会如同它是妖精属性的招式一样造成伤害，并适用属性一致加成、弱点和抗性。妖精属性招式的伤害骰池额外增加 1 颗骰子。",
    desc: "这只宝可梦散撒着能为心灵带来快乐想法的妖精尘。它所做的一切行为看起来都非常可爱。",
  },
  {
    name: "正电",
    alias: "プラス|Plus",
    tags: [
      "target|l|self",
      "nftext|l|若有「负电」特性的队友",
      "frame|self|特殊|up|2",
    ],
    effect:
      "如果战场上有宝可梦队友的特性为「负电」，则这只宝可梦的特殊特质提升 2 点。",
    desc: "这只宝可梦身上带有天生的正电荷。它会吸引负电荷，并排斥其他的正电荷。它们的脸颊总是带着热情的红色。",
  },
  {
    name: "毒疗",
    alias: "ポイズンヒール|Poison Heal",
    tags: [
      "target|l|self",
      "frame|poison||always",
      "frame|poison2||always",
      "frame|heal||heal|1",
    ],
    effect:
      "如果这只宝可梦处于「中毒」或「剧毒」状态，则它会在每个战斗轮结束时回复 1 点HP，而非受到伤害。这些毒素会在三个战斗轮之后被完全吸收。",
    desc: "这只宝可梦具有能抵抗任何毒素的免疫系统，且能够把毒液吸收当成能量来源。",
  },
  {
    name: "毒刺",
    alias: "どくのトゲ|Poison Point",
    tags: ["target|l|foe", "frame|poison||number|d3"],
    effect:
      "当这只宝可梦被非远程攻击的物理攻击给命中时，骰 3 颗概率骰以使对方陷入「中毒」状态。",
    desc: "这只宝可梦身上的棘刺或鳞片能够释放毒素，感染任何胆敢粗鲁碰触它们的家伙。对付它们时最好戴上手套。",
  },
  {
    name: "毒手",
    alias: "どくしゅ|Poison Touch",
    tags: ["target|l|foe", "frame|poison||number|d2"],
    effect:
      "当这只宝可梦使用非远程攻击的物理攻击命中敌人时，骰 2 颗概率骰以使对方陷入「中毒」状态。",
    desc: "有毒物质会从这只宝可梦的身体表面渗出，如果不小心让它碰到了你，你将会变得病恹恹的。",
  },
  {
    name: "群聚变形",
    alias: "スワームチェンジ|Power Construct",
    tags: ["target|l|self", "text|l|型态变化"],
    effect:
      "在战斗轮结束时，如果这只宝可梦的HP低于或等于一半，则它将会变化成下一个阶段的型态。当这只宝可梦的型态发生改变，它将解除任何异常状态，且将HP和意志点回复至全满。这个特性无法被复制、交换、或改变。<ul><li>基格尔德(核心) → 基格尔德(10%)</li><li>基格尔德(10%) → 基格尔德(50%)</li><li>基格尔德(50%) → 基格尔德(100%)</li></ul>",
    desc: "微小的细胞会聚集在这只宝可梦身边，并被吸收进它的体内。随着更多的细胞群聚在一起，它将会变得越来越大也越来越强。",
  },
  {
    name: "化学之力",
    alias: "かがくのちから|Power of Alchemy",
    tags: ["target|l|self", "text|l|改变特性", "target|l|foe"],
    effect:
      "这只宝可梦将会复制一个陷入濒死状态的敌人宝可梦的特性，持续24小时。这个方式能够同时复制多个特性，但在战斗期间只能有一个特性可以发挥作用。（在说书人的判断下，某些特性可能会无法被复制。）",
    desc: "这只宝可梦可以吸收它所触碰的任何事物的精髓。将其与化学成分和什至丢弃垃圾的基因融合在一起。",
  },
  {
    name: "能量点",
    alias: "パワースポット|Power Spot",
    tags: ["target|l|ally", "frame|self|伤害|plus|d1"],
    effect:
      "其中一个队友的招式的伤害骰池将额外增加 1 颗骰子。如果有复数个宝可梦使用这个特性，这个效果也不会叠加在同一个队友身上。",
    desc: "这只宝可梦会释放出一种神秘的能量，它会干扰电子设备和指南针的运作，但也能够让你感到活力充沛。",
  },
  {
    name: "恶作剧之心",
    alias: "いたずらごころ|Prankster",
    tags: ["target|l|self", "text|l|变化招式", "frame|priority||up|1"],
    effect: "这只宝可梦的所有变化类招式的先制+1。",
    desc: "这只宝可梦的双眼总是闪烁着调皮的光芒，这附近没有任何人能够逃过它的恶作剧。",
  },
  {
    name: "压迫感",
    alias: "プレッシャー|Pressure",
    tags: ["target|l|allfoe", "frame|target|意志|down|½"],
    effect: "当这只宝可梦出场时，将所有敌人的意志点减半（尾数舍去）。",
    desc: "待在这只宝可梦附近会让人感到压迫而紧张，即使是最勇敢的人都会不由得感到犹豫。",
  },
  {
    name: "始源之海",
    alias: "はじまりのうみ|Primordial Sea",
    tags: ["target|l|field", "weather|l|rain2"],
    effect:
      "当这只宝可梦出场时，天气状态将会自动变为暴风雨。这个效果将会在这只宝可梦退场时结束。（若效果互相冲突，则由意志较高的宝可梦影响天气状态。）",
    desc: "狂风暴雨几乎让你喘不过气，地面很快就被淹没，你必须奋力游泳才能够浮在水面上。在这种时候，任何火焰都点不着。",
  },
  {
    name: "棱镜装甲",
    alias: "プリズムアーマー|Prism Armor",
    tags: [
      "target|l|self",
      "nftext|l|效果绝佳的伤害",
      "frame|self|受伤|minus|X",
    ],
    effect: "无效任何效果绝佳招式对这只宝可梦造成的额外伤害。",
    desc: "这只宝可梦的身体就是惊人坚韧的盔甲。它能够抵御那些什至能将它毁成碎片的冲击。",
  },
  {
    name: "螺旋尾鳍",
    alias: "スクリューおびれ|Propeller Tail",
    tags: ["target|l|self", "nftext|l|忽略任何会重新引导目标的招式或特性"],
    effect:
      "忽略任何会将这只宝可梦的招式引导到其他目标的招式或特性效果。（像是〈看我嘛〉或「避雷针」特性。）",
    desc: "这只宝可梦的尾鳍能够让它在水中非常轻易地四处移动。它能够毫无困难地做出急转弯来追赶或抓捕它的猎物。",
  },
  {
    name: "变幻自如",
    alias: "へんげんじざい|Protean",
    tags: ["target|l|self", "text|l|改变属性"],
    effect:
      "每当这只宝可梦使用了一个招式，把它的属性先改变为该招式的属性。若该招式为攻击招式且会造成伤害，则适用属性一致加成。",
    desc: "这只宝可梦多才多艺的身体使它能熟练掌握几乎所有它要做的事情。",
  },
  {
    name: "精神制造者",
    alias: "サイコメイカー|Psychic Surge",
    tags: ["target|l|field", "text|l|精神场地|Psychic"],
    effect:
      "当这只宝可梦出场时，它将自动发动招式〈精神场地〉的效果。（若效果互相冲突，则由意志较高的宝可梦胜出。）",
    desc: "这只宝可梦能够创造出环绕自己的精神场地，这将使所有人停下动作，听见不存在此处的事物。",
  },
  {
    name: "庞克摇滚",
    alias: "パンクロック|Punk Rock",
    tags: [
      "target|l|self",
      "effect|l|sound",
      "frame|self|伤害|plus|d1",
      "frame|self|受伤|minus|2",
    ],
    effect:
      "这只宝可梦使用的声音类招式的伤害骰池额外增加 1 颗骰子。声音类招式对这只宝可梦造成的伤害将减少 2 点。",
    desc: "这只宝可梦热爱音乐和大声喧哗，它经常弹奏着它的空气吉他，并能够轻易地从无中生有，即兴创作曲目。",
  },
  {
    name: "瑜伽之力",
    alias: "ヨガパワー|Pure Power",
    tags: ["target|l|self", "frame|self|力量|up|1"],
    effect: "这只宝可梦的力量特质永久提升 1 点。",
    desc: "这只宝可梦能够利用它的超能力来移动数倍大小的物体。",
  },
  {
    name: "女王的威严",
    alias: "じょおうのいげん|Queenly Majesty",
    tags: ["target|l|foe", "frame|priority||up|never"],
    effect: "敌人无法对这只宝可梦使用任何先制招式。",
    desc: "这只宝可梦的存在本身就能让人敬畏与尊敬，其他人别无选择，只能遵循她的话语。任何打算僭越她的人都将感受到她的不悦。",
  },
  {
    name: "飞毛腿",
    alias: "はやあし|Quick Feet",
    tags: ["target|l|self", "nftext|l|陷入异常状态时", "frame|self|灵巧|up|2"],
    effect:
      "当这只宝可梦陷入任何异常状态时，它的灵巧特质提升 2 点。这只宝可梦仍会陷入「麻痹」状态，但这个特性将避免其效果发挥作用。",
    desc: "这只宝可梦在大部分时候看起来都相当匆忙。当处于压力下时，它移动的速度会比原本还要更快。",
  },
  {
    name: "雨盘",
    alias: "あめうけざら|Rain Dish",
    tags: ["target|l|self", "weather|l|rain", "frame|heal||heal|1"],
    effect: "如果当前天气状态为下雨，则这只宝可梦可以在每轮结束时回复 1 点HP。",
    desc: "这只宝可梦会储存雨水以供饮用或滋养所需。",
  },
  {
    name: "胆怯",
    alias: "びびり|Rattled",
    tags: [
      "target|l|self",
      "nftext|l|当被",
      "text|l|虫系招式|Bug",
      "text|l|恶系招式|Dark",
      "text|l|幽灵招式|Ghost",
      "nftext|l|命中时",
      "frame|self|灵巧|up|1",
    ],
    effect:
      "当这只宝可梦第一次被虫、恶、或幽灵属性的攻击命中时，这只宝可梦的灵巧特质将提升 1 点。",
    desc: "当这只胆战心惊的宝可梦感到害怕或受惊吓时，它将加速以匆忙逃离危险。",
  },
  {
    name: "接球手",
    alias: "レシーバー|Receiver",
    tags: ["target|l|self", "text|l|改变特性", "target|l|ally"],
    effect:
      "如果一个队友在战斗中陷入濒死状态，这只宝可梦能够复制它的特性并持续24小时。这个方式同时只能复制一个特性。（在说书人的判断下，某些特性可能会无法被复制。）",
    desc: "这只宝可梦向来擅于学习其他与它之间有着羁绊的宝可梦的战术行为。",
  },
  {
    name: "舍身",
    alias: "すてみ|Reckless",
    tags: ["target|l|self", "effect|l|recoil", "frame|self|伤害|plus|d2"],
    effect:
      "当这只宝可梦使用带有「反作用力伤害」标志的招式时，该招式的伤害骰池额外增加 2 颗骰子。",
    desc: "为了得到它想要的事物，这只宝可梦经常搅入危险的情境。它们很容易不考虑后果就冒着生命危险。",
  },
  {
    name: "冰冻皮肤",
    alias: "フリーズスキン|Refrigerate",
    tags: [
      "target|l|self",
      "text|l|一般招式|Normal",
      "text|l|冰系招式|Ice",
      "frame|self|伤害|plus|d1",
    ],
    effect:
      "这只宝可梦使用的一般属性攻击将会如同它是冰属性的招式一样造成伤害，并适用属性一致加成、弱点和抗性。冰属性招式的伤害骰池额外增加 1 颗骰子。",
    desc: "这只宝可梦的身体就如同冷冻装置一样，它能透过单纯的触碰来使东西冻结。",
  },
  {
    name: "再生力",
    alias: "さいせいりょく|Regenerator",
    tags: ["target|l|self", "frame|heal||heal|4", "frame|heal||c_heal|2"],
    effect:
      "这只宝可梦每天都可以自行回复最多 4 点伤害或最多 2 点致命伤害。这只宝可梦必须脱离战斗才能得到这个效果的好处。",
    desc: "这只宝可梦的身体能够以非常快的速度自我再生，需要好几天才能恢复的伤势只需要几个小时就能明显好转。",
  },
  {
    name: "熟成",
    alias: "じゅくせい|Ripen",
    tags: ["target|l|self"],
    effect:
      "使用树果来增加效果的招式（例如〈自然之恩〉）的伤害骰池将额外增加 2 颗骰子。在说书人的判断下，树果的治疗效果也可能会有所提升。",
    desc: "这只宝可梦能够使水果或树果在短时间内熟成，使它们增添额外的甜度和风味，树果的治疗效果也将获得提升。",
  },
  {
    name: "斗争心",
    alias: "とうそうしん|Rivalry",
    tags: ["target|l|self", "frame|self|力量|up|1", "frame|self|力量|down|1"],
    effect:
      "如果这只宝可梦的敌人为同性，则它的力量提升 1 点。如果这只宝可梦的敌人为异性，则它的力量降低 1 点。",
    desc: "为了证明自己是群体中的老大，这只宝可梦会与其他同性进行相当激烈的竞争。然而，它会试图赢得每一个配偶候选人的青睐。",
  },
  {
    name: "ＡＲ系统",
    alias: "ＡＲシステム|RKS System",
    tags: ["target|l|self", "text|l|改变属性"],
    effect:
      "这只宝可梦的属性会变更为与其持有的记忆碟相符的属性。（例如：「电子记忆碟」会使这只宝可梦变为电属性。）",
    desc: "这只宝可梦的生理型态会根据插入它ＡＲ系统的记忆碟而产生变化。记忆碟一共有17种，每个属性各一种。（没有一般属性的记忆碟。）",
  },
  {
    name: "坚硬脑袋",
    alias: "いしあたま|Rock Head",
    tags: [
      "target|l|self",
      "nftext|l|免疫",
      "effect|l|recoil",
      "nftext|l|的伤害",
    ],
    effect: "这只宝可梦不会受到反作用力伤害。",
    desc: "这只宝可梦的头和身体是如此坚硬，以至于它们几乎感觉不到任何痛楚。小心点，它们可能什至不会意识到自己有撞到东西。",
  },
  {
    name: "粗糙皮肤",
    alias: "さめはだ|Rough Skin",
    tags: [
      "target|l|foe",
      "nftext|l|当被物理攻击命中时",
      "frame|target|伤害|number|d1",
    ],
    effect:
      "当这只宝可梦被非远程攻击的物理攻击给命中时，骰 1 颗伤害骰以对敌人造成伤害。",
    desc: "在触碰这只宝可梦时请务必保护好你的双手，因为它的身体覆盖着能够割伤肌肤的锋利鳞片或棘刺。",
  },
  {
    name: "逃跑",
    alias: "にげあし|Run Away",
    tags: ["target|l|self", "nftext|l|免疫于", "effect|l|block"],
    effect:
      "这只宝可梦不会被阻挡。根据说书人的判断，它在为从战斗中逃跑或逃离囚禁时进行的判定也可能会得到额外的奖励骰。",
    desc: "这只宝可梦是逃跑大师，它相当难以捕捉，且什至能够钻进最狭窄的隙缝来逃出生天。",
  },
  {
    name: "沙之力",
    alias: "すなのちから|Sand Force",
    tags: [
      "target|l|self",
      "weather|l|sand",
      "text|l|地系招式|Ground",
      "text|l|岩系招式|Rock",
      "text|l|钢系招式|Steel",
      "frame|self|伤害|plus|d1",
      "nftext|l|免疫沙暴伤害",
    ],
    effect:
      "如果当前天气状态为沙暴，则这只宝可梦地面、岩石、和钢属性招式的伤害骰池都会额外增加 1 颗骰子。这只宝可梦免疫沙暴天气造成的伤害。",
    desc: "这只宝可梦能控制战场周遭的沙尘微粒以增强它的攻击。",
  },
  {
    name: "拨沙",
    alias: "すなかき|Sand Rush",
    tags: [
      "target|l|self",
      "weather|l|sand",
      "frame|self|灵巧|up|1",
      "nftext|l|免疫沙暴伤害",
    ],
    effect:
      "如果当前天气状态为沙暴，则这只宝可梦的灵巧特质提升 1 点。这只宝可梦免疫沙暴天气造成的伤害。",
    desc: "当沙尘横扫这个战场，这只宝可梦能够穿梭其中，如鱼得水。",
  },
  {
    name: "吐沙",
    alias: "すなはき|Sand Spit",
    tags: ["target|l|field", "nftext|l|当被物理攻击命中时", "weather|l|sand"],
    effect:
      "当这只宝可梦被非远程攻击的物理攻击给命中时，它将把天气状态变为沙暴。这个效果将持续 4 轮。",
    desc: "这只宝可梦蜿蜒穿过沙漠中的沙土，并在过程中吃掉一些沙子。如果它被击中（或打了个喷嚏），则它将喷出一股沙尘暴。",
  },
  {
    name: "扬沙",
    alias: "すなおこし|Sand Stream",
    tags: ["target|l|field", "weather|l|sand"],
    effect:
      "当这只宝可梦出场时，天气状态将会自动变为沙暴。这个效果将会在这只宝可梦退场时结束。（若效果互相冲突，则由意志较高的宝可梦影响天气状态。）",
    desc: "这只宝可梦能够让它周围刮起可怕的沙尘暴，且只要它想要就能不断持续下去。",
  },
  {
    name: "沙隐",
    alias: "すながくれ|Sand Veil",
    tags: [
      "target|l|self",
      "weather|l|sand",
      "frame|self|闪避|up|1",
      "nftext|l|免疫沙暴伤害",
    ],
    effect:
      "如果当前天气状态为沙暴，则这只宝可梦的闪避技能提升 1 点。这只宝可梦免疫沙暴天气造成的伤害。",
    desc: "这只宝可梦的身体能轻易地被空气中的沙尘粒子给遮蔽。",
  },
  {
    name: "食草",
    alias: "そうしょく|Sap Sipper",
    tags: [
      "target|l|self",
      "nftext|l|免疫",
      "text|l|草系招式|Grass",
      "nftext|l|的伤害",
      "frame|self|力量|up|1",
    ],
    effect:
      "当这只宝可梦第一次被草属性招式命中，这只宝可梦的力量将因此提升 1 点，而非造成伤害。草属性招式不会对这只宝可梦造成伤害。",
    desc: "这只宝可梦完全以植物为食，它特别喜欢摄食植物的鲜甜汁液以获取养分。",
  },
  {
    name: "鱼群",
    alias: "ぎょぐん|Schooling",
    tags: ["target|l|self", "text|l|型态变化"],
    effect:
      "只有弱丁鱼能够使用这个特性。当它的HP剩一半或以下，它的鱼群同伴将会在一段时间后抵达。当它们抵达后，将弱丁鱼的数据取代为满HP的「弱丁鱼（鱼群型态）」，并将其阶级提升到「专家」。在战斗结束后，弱丁鱼将变回原本的型态。<br/>．若位于海洋/河流，鱼群将在该轮结束时抵达。<br/>．若位于公路/城镇，鱼群将在第二轮结束时抵达。<br/>．若位于洞窟/城市，鱼群将在第三轮结束时抵达。<br/>．若位于沙漠/雪地，鱼群将在第四轮结束时抵达。<br/>．若位于火山，鱼群将在第五轮结束时抵达。<br/>（治疗／陷入濒死／替换宝可梦将会阻碍鱼群抵达的时间）",
    desc: "当这只宝可梦受到威胁时，它会唤来数千名同伴以集合成一只不受控的大怪物。它越接近海洋，鱼群就会越快抵达。",
  },
  {
    name: "胆量",
    alias: "きもったま|Scrappy",
    tags: [
      "target|l|self",
      "text|l|一般招式|Normal",
      "text|l|格斗招式|Fight",
      "nftext|l|可以命中",
      "text|l|幽灵属性|Ghost",
    ],
    effect:
      "这只宝可梦得到能以一般和格斗属性招式命中幽灵属性宝可梦的能力，并无视其免疫能力以造成伤害。如果该宝可梦拥有第二属性，则如常应用其抗性或弱点。",
    desc: "这只宝可梦完全不相信幽灵的存在。",
  },
  {
    name: "除障",
    alias: "バリアフリー|Screen Cleaner",
    tags: ["target|l|field"],
    effect:
      "当这只宝可梦出场时，移除双方场上存在的任何屏障（例如〈光墙〉、〈反射壁〉等）。",
    desc: "这只宝可梦总是不断在清洁看不见的屏幕，它清理的手法是如此高超，什至连真正的玻璃墙都会在它清洁完成时消失不见。",
  },
  {
    name: "天恩",
    alias: "てんのめぐみ|Serene Grace",
    tags: ["target|l|self", "pdice|l|2"],
    effect:
      "这只宝可梦造成的所有效果都将额外增加 2 颗概率骰。（例如：一个会骰 3 颗概率骰以使敌人陷入「畏缩」状态的招式，将会变成骰 5 颗概率骰。）",
    desc: "这只宝可梦会带来好运，就仿佛它被上天祝福一样。它的存在能让人感到抚慰，使你感到平静且充满喜悦。",
  },
  {
    name: "幻影防守",
    alias: "ファントムガード|Shadow Shield",
    tags: ["target|l|self", "nftext|l|当自己满HP时", "frame|self|受伤|minus|2"],
    effect:
      "如果这只宝可梦的HP全满，则这只宝可梦因为被攻击而受到的伤害将减少 2 点。这个特性无法被招式或特性给忽略。",
    desc: "当在充满力量的状态下，这只宝可梦鬼魅般的身体将不会被任何东西给碰触或刺穿，它什至能够穿透墙壁，就仿佛它不存在这个世界上一样。",
  },
  {
    name: "踩影",
    alias: "かげふみ|Shadow Tag",
    tags: ["target|l|allfoe", "effect|l|block"],
    effect: "所有敌人被阻挡。幽灵属性和相同特性的宝可梦将免疫这个效果。",
    desc: "这只宝可梦踩住对手的影子，不让对方离自己太远。",
  },
  {
    name: "蜕皮",
    alias: "だっぴ|Shed Skin",
    tags: ["target|l|self", "frame|heal|治疗状态|number|d3"],
    effect:
      "在每个战斗轮结束时，如果这只宝可梦正处于异常状态，则骰 3 颗概率骰以治疗自己的异常状态。",
    desc: "这只宝可梦的身体总是不断长出新的外皮，并在旧的表皮损坏时将其蜕去。",
  },
  {
    name: "强行",
    alias: "ちからずく|Sheer Force",
    tags: ["target|l|self", "nftext|l|忽略概率骰", "frame|self|伤害|plus|d2"],
    effect:
      "每当这只宝可梦进行一个使用概率骰造成额外效果的攻击时，你可以忽略这些概率骰，以使该招式的伤害骰池额外增加 2 颗骰子。",
    desc: "这只宝可梦只对展现它那惊人的战斗能力有兴趣。",
  },
  {
    name: "硬壳盔甲",
    alias: "シェルアーマー|Shell Armor",
    tags: ["target|l|foe", "frame|target|要害奖励|never"],
    effect:
      "如果敌人对这只宝可梦造成了击中要害，则它不会因为击中要害而获得任何额外的奖励骰。",
    desc: "这只宝可梦的硬壳保护着它的脆弱弱点不被对手所伤。",
  },
  {
    name: "鳞粉",
    alias: "りんぷん|Shield Dust",
    tags: ["target|l|self", "nftext|l|免疫概率骰造成的额外效果"],
    effect:
      "如果这只宝可梦被带有会造成额外效果的概率骰的攻击给命中，则它不会受到该额外效果的影响。",
    desc: "这只宝可梦总是不断产生鳞粉来遮蔽并保护自己。",
  },
  {
    name: "界限盾壳",
    alias: "リミットシールド|Shields Down",
    tags: ["target|l|self", "text|l|型态变化"],
    effect:
      "只有小陨星能够使用这个特性。当它的HP剩一半或以下，将小陨星的数据取代为满HP的「小陨星（核心型态）」。若要恢复其原本的型态，小陨星（核心型态）必须被放生，并在数天后等它回来后再重新捕捉。",
    desc: "这只宝可梦的核心被一层坚硬的盾壳给保护，如果盾壳被击碎，这只宝可梦的行动将变得疯狂起来。",
  },
  {
    name: "单纯",
    alias: "たんじゅん|Simple",
    tags: ["target|l|self", "frame|self|特质|down|-1", "frame|self|特质|up|+1"],
    effect:
      "若这只宝可梦的特质将被降低，则该特质额外降低 1 点。若这只宝可梦的特质将被提升，则该特质额外提升 1 点。",
    desc: "这只宝可梦天真的心灵很容易被自己和外在的影响给动摇。它总是能找到把事情简单化的方法。",
  },
  {
    name: "连续攻击",
    alias: "スキルリンク|Skill Link",
    tags: [
      "target|l|self",
      "effect|l|sact_2",
      "effect|l|sact_5",
      "frame|self|命中|plus|d2",
    ],
    effect:
      "当使用双重行动或连续行动招式时，该招式的命中判定将额外增加 2 颗骰子。",
    desc: "这只宝可梦可以熟练地连锁施展一系列猛攻。它同时也喜欢重复且连续的行动。",
  },
  {
    name: "慢启动",
    alias: "スロースタート|Slow Start",
    tags: ["target|l|self", "nftext|l|前五轮的先攻顺序为最后"],
    effect:
      "在战斗的前五个战斗轮期间，这只宝可梦的先攻顺序永远会是最后一个。在经过这五个战斗轮之后，这只宝可梦的力量和灵巧特质提升 2 点，且它的先攻顺序改成永远会是第一个。这个效果会在这只宝可梦脱离战斗时重置。",
    desc: "这只宝可梦已经沉睡了数千年，它的动作缓慢而沉重。最好在它释放全力之前逃跑！",
  },
  {
    name: "拨雪",
    alias: "ゆきかき|Slush Rush",
    tags: [
      "target|l|self",
      "weather|l|hail",
      "frame|self|灵巧|up|1",
      "nftext|l|免疫冰雹伤害",
    ],
    effect:
      "如果当前天气状态为冰雹，则这只宝可梦的灵巧特质提升 1 点。这只宝可梦免疫冰雹天气造成的伤害。",
    desc: "这只宝可梦相当习惯于在冰雪环境中奔跑狩猎，什至能够在狂风暴雪中于雪地迅速移动。",
  },
  {
    name: "狙击手",
    alias: "スナイパー|Sniper",
    tags: ["target|l|self", "frame|self|要害奖励|plus|d1"],
    effect:
      "当这只宝可梦击中要害时，它地伤害骰池将会增加 3 颗骰子，而非原本的 2 颗骰子。",
    desc: "这只宝可梦将悄悄地让自己位处优势位置，好狠狠打击敌人的弱点。",
  },
  {
    name: "雪隐",
    alias: "ゆきがくれ|Snow Cloak",
    tags: [
      "target|l|self",
      "weather|l|hail",
      "frame|self|闪避|up|1",
      "nftext|l|免疫冰雹伤害",
    ],
    effect:
      "如果当前天气状态为冰雹，则这只宝可梦的闪避技能提升 1 点。这只宝可梦免疫冰雹天气造成的伤害。",
    desc: "这只宝可梦的外表能很好地融入冰天雪地之中，你很难辨识出它的身影。",
  },
  {
    name: "降雪",
    alias: "ゆきふらし|Snow Warning",
    tags: ["target|l|field", "weather|l|hail"],
    effect:
      "当这只宝可梦出场时，天气状态将会自动变为冰雹。这个效果将会在这只宝可梦退场时结束。（若效果互相冲突，则由意志较高的宝可梦影响天气状态。）",
    desc: "这只宝可梦能够凭意志换来可怕的雹暴。白雪将覆盖整个战场，尖锐的冰雹块将从天空倾盆而下。",
  },
  {
    name: "太阳之力",
    alias: "サンパワー|Solar Power",
    tags: [
      "target|l|self",
      "weather|l|sun",
      "frame|self|伤害|1",
      "frame|self|特殊|up|2",
    ],
    effect:
      "在天气状态为大晴天的期间，这只宝可梦的特殊提升 2 点，但这只宝可梦也会在每个战斗轮结束时受到 1 点伤害。",
    desc: "这只宝可梦能够运用来自太阳的能量使自己过载充能，使它变得更强大，但也同时让自己的身体遭受损伤。",
  },
  {
    name: "坚硬岩石",
    alias: "ハードロック|Solid Rock",
    tags: [
      "target|l|self",
      "nftext|l|效果绝佳的招式",
      "frame|self|受伤|minus|1",
    ],
    effect:
      "如果这只宝可梦被会造成效果绝佳伤害的招式给命中，减少 1 点受到的伤害。",
    desc: "这只宝可梦的身体是由极度坚硬的岩石所构成，保护它不受任何事物伤害──就算是它的弱点也一样。",
  },
  {
    name: "魂心",
    alias: "ソウルハート|Soul-Heart",
    tags: [
      "target|l|self",
      "nftext|l|让敌人陷入濒死状态后",
      "frame|self|特殊|up|1",
    ],
    effect:
      "如果敌人因为这只宝可梦的攻击而陷入濒死状态，则这只宝可梦的特殊提升 1 点。你最多可以透过这个方式提升 3 点。",
    desc: "这只宝可梦有着关怀与养育他人的天性，如果它所爱的人们受到威胁，它的灵魂将会因为爱而变得更强大。",
  },
  {
    name: "隔音",
    alias: "ぼうおん|Soundproof",
    tags: ["target|l|self", "nftext|l|免疫", "effect|l|sound"],
    effect: "这只宝可梦免疫于声音类招式造成的伤害和效果。",
    desc: "这只宝可梦的身体结构能保护它不受噪音的干扰。所以它不是故意无视你，它只是没听到而已。",
  },
  {
    name: "加速",
    alias: "かそく|Speed Boost",
    tags: ["target|l|self", "frame|self|灵巧|up|1"],
    effect:
      "在每个战斗轮结束时，这只宝可梦的灵巧特质提升 1 点。你最多可以透过这个方式提升 3 点。",
    desc: "这只宝可梦将开始不断加速的势头高速机动，它将仿佛瞬间移动一般从这个地方移动到另一个地方。",
  },
  {
    name: "监视",
    alias: "はりこみ|Stakeout",
    tags: ["target|l|foe", "frame|target|伤害|plus|1"],
    effect:
      "每当敌方宝可梦被换上场时，这只宝可梦对它进行的第一次成功的攻击将额外造成 1 点伤害。",
    desc: "这只宝可梦总是监看着周遭环境，找寻可能的猎物，并在它们最为脆弱的瞬间发起攻势。",
  },
  {
    name: "慢出",
    alias: "あとだし|Stall",
    tags: ["target|l|self", "nftext|l|先攻顺序永远为最后"],
    effect: "这只宝可梦的先攻顺序永远为最后一个。",
    desc: "这只宝可梦优柔寡断，总是在他人先行动之后才决定自己该做什么。",
  },
  {
    name: "坚毅",
    alias: "すじがねいり|Stalwart",
    tags: ["target|l|self", "nftext|l|忽略任何会重新引导目标的招式或特性"],
    effect:
      "忽略任何会将这只宝可梦的招式引导到其他目标的招式或特性效果。（像是〈看我嘛〉或「避雷针」特性。）",
    desc: "这只宝可梦天生具有高度的责任感和忠诚心，一旦你交付它某个任务，则直到完成任务之前它都不会偏离原路。",
  },
  {
    name: "持久力",
    alias: "じきゅうりょく|Stamina",
    tags: ["target|l|self", "frame|self|防御|up|1", "frame|self|特防|up|1"],
    effect: "这只宝可梦在战斗中第一次受到伤害时，提升它的防御和特防各 1 点。",
    desc: "这只宝可梦不会疲惫。它会在感到虚弱时恢复坚毅，即使它几乎不吃不睡也一样。",
  },
  {
    name: "战斗切换",
    alias: "バトルスイッチ|Stance Change",
    tags: ["target|l|self", "text|l|型态变化"],
    effect:
      "只有坚盾剑怪能够使用这个特性。在每个战斗轮开始时，从「剑型态」和「盾型态」中选择一个型态。当处于「剑型态」时，它只能使用攻击招式；当处于「盾型态」时，它只能使用变化类招式。根据阶级和特质上限调整它各个形态的特质。",
    desc: "这只宝可梦能够改变型态，变成一面坚毅的盾牌或一把强力的宝剑，它的特质属性会随着型态切换而改变。",
  },
  {
    name: "静电",
    alias: "せいでんき|Static",
    tags: [
      "target|l|foe",
      "nftext|l|当被物理攻击命中时",
      "frame|paralysis||number|d3",
    ],
    effect:
      "当这只宝可梦被非远程攻击的物理攻击给命中时，骰 3 颗概率骰以使对方陷入「麻痹」状态。",
    desc: "这只宝可梦的身体总是准备好在哪怕是最轻微的触碰下释放出一道静电。",
  },
  {
    name: "不屈之心",
    alias: "ふくつのこころ|Steadfast",
    tags: ["target|l|self", "frame|flinch||always", "frame|self|灵巧|up|1"],
    effect: "当这只宝可梦第一次陷入「畏缩」状态时，它的灵巧提升 1 点。",
    desc: "当逆境来袭，这只宝可梦将会变得更加可靠。",
  },
  {
    name: "蒸汽机",
    alias: "じょうききかん|Steam Engine",
    tags: [
      "target|l|self",
      "nftext|l|当被",
      "text|l|火系招式|Fire",
      "text|l|水系招式|Water",
      "nftext|l|命中时",
      "frame|self|灵巧|up|3",
    ],
    effect: "当这只宝可梦第一次被火或水属性招式命中时，它的灵巧提升 3 点。",
    desc: "这只宝可梦就如同一座蒸汽炉，只要一点点的火或水，它就能以极快的速度移动任何东西。煤炭是它最爱的食物。",
  },
  {
    name: "钢能力者",
    alias: "はがねつかい|Steelworker",
    tags: ["target|l|self", "text|l|钢系招式|Steel", "frame|self|伤害|plus|d1"],
    effect: "这只宝可梦使用的钢属性招式的伤害骰池将额外增加 1 颗骰子。",
    desc: "这只宝可梦能够融塑并吃食钢铁，赋予它触碰的任何金属新的外型和更锋利的边缘。",
  },
  {
    name: "钢之意志",
    alias: "はがねのせいしん|Steely Spirit",
    tags: [
      "target|l|allally",
      "text|l|钢系招式|Steel",
      "frame|self|伤害|plus|d1",
    ],
    effect:
      "这只宝可梦和它队友使用的钢属性招式的伤害骰池都将额外增加 1 颗骰子。",
    desc: "这只宝可梦在大部分时候都有着执着倔强的表现。如果它下定了决心去做某事，那它就会去做，这个姿态将能激励鼓舞他人。",
  },
  {
    name: "恶臭",
    alias: "あくしゅう|Stench",
    tags: [
      "target|l|foe",
      "nftext|l|当被物理攻击命中时",
      "frame|flinch||number|d1",
    ],
    effect:
      "当这只宝可梦被非远程攻击的物理攻击给命中时，骰 1 颗概率骰以使敌人陷入「畏缩」状态。降低遭遇野生宝可梦的概率。",
    desc: "这只宝可梦能够发出一股足以赶走其他人或宝可梦的可怕恶臭。",
  },
  {
    name: "粘着",
    alias: "ねんちゃく|Sticky Hold",
    tags: ["target|l|self", "nftext|l|持有物品不会被偷走/交换"],
    effect: "这只宝可梦持有的物品不会被招式或特性的效果给移除、偷走、或交换。",
    desc: "这只宝可梦的身体总是分泌着粘性物质，如果有什么东西被粘住，那要把它拔出来可会相当困难。",
  },
  {
    name: "引水",
    alias: "よびみず|Storm Drain",
    tags: [
      "target|l|self",
      "nftext|l|吸引并免疫",
      "text|l|水系招式|Water",
      "frame|self|伤害|plus|d1",
    ],
    effect:
      "如果有任何人使用了单一目标的水属性招式，则该招式的目标将会引导变更为这只宝可梦；这只宝可梦免疫任何水属性招式的伤害。当这只宝可梦第一次被水属性招式命中，这只宝可梦的特殊特质提升 1 点。",
    desc: "这只宝可梦能像海绵一样吸收水分和液体，接着利用它们来增强自己的力量，并让自己能在没有水的环境下待上更长的时间。",
  },
  {
    name: "强壮之颚",
    alias: "がんじょうあご|Strong Jaw",
    tags: ["target|l|self", "frame|self|伤害|plus|d1"],
    effect:
      "如果这只宝可梦使用了名字带有「牙」或「咬」关键词的招式，则该招式的伤害骰池将额外增加 1 颗骰子。",
    desc: "这只宝可梦强壮的下颚赋予它无与伦比的咬合力。它的牙齿能够撕开几乎所有一切。",
  },
  {
    name: "结实",
    alias: "がんじょう|Sturdy",
    tags: ["target|l|self"],
    effect:
      "当这只宝可梦第一次因为伤害类招式而将要陷入濒死状态时，改为将它维持在 1 点HP的状态。异常状态和自己造成的伤害仍然会导致它陷入濒死状态。这只宝可梦必须休息至少一个小时才能够再次使用这个特性的效果。",
    desc: "这只宝可梦的身体在面对伤害时能表现出极端强韧的性质，它可以忍受几乎所有一切。",
  },
  {
    name: "吸盘",
    alias: "きゅうばん|Suction Cups",
    tags: ["target|l|self", "nftext|l|免疫", "effect|l|swither"],
    effect: "这只宝可梦免疫于强制替换宝可梦下场的效果。",
    desc: "这只宝可梦的肢体有着能帮助它根植在原地的吸盘。它可以吸附在任何表面上，什至倒挂在天花板上。",
  },
  {
    name: "超幸运",
    alias: "きょううん|Super Luck",
    tags: ["target|l|self", "effect|l|crit"],
    effect:
      "这只宝可梦使用的攻击招式获得「高要害率」效果。如果该招式已经拥有「高要害率」效果，则这只宝可梦只需要比需求成功骰数还要多 1 颗成功骰的掷骰结果（而非原本的 2 颗）就能够击中要害。",
    desc: "这只宝可梦有着不可思议的好运，经常会有好事发生。",
  },
  {
    name: "冲浪之尾",
    alias: "サーフテール|Surge Surfer",
    tags: ["target|l|self", "text|l|电气场地|Electric", "frame|self|灵巧|up|2"],
    effect: "如果〈电气场地〉正在发挥效果，则这只宝可梦的灵巧特质提升 2 点。",
    desc: "这只宝可梦的磁场使它能够乘着电流冲浪，就仿佛它飘浮着一样。",
  },
  {
    name: "虫之预感",
    alias: "むしのしらせ|Swarm",
    tags: [
      "target|l|self",
      "nftext|l|HP降到一半或以下时",
      "text|l|虫系招式|Bug",
      "frame|self|伤害|plus|d1",
    ],
    effect:
      "当这只宝可梦的HP剩一半或以下，它虫属性招式的伤害骰池并不会因为疼痛惩罚而被扣除成功骰，且它虫属性招式的伤害骰池会额外增加 1 颗骰子。",
    desc: "这只宝可梦将在命悬一线时进入虫巢意志状态，变得更凶猛且侵略性。",
  },
  {
    name: "甜幕",
    alias: "スイートベール|Sweet Veil",
    tags: ["target|l|allally", "frame|sleep||never"],
    effect:
      "这只宝可梦和它的队友免疫于「睡眠」状态。提升遭遇野生宝可梦的概率。",
    desc: "这只宝可梦甜美的香气将唤醒所有附近宝可梦的食欲。",
  },
  {
    name: "悠游自如",
    alias: "すいすい|Swift Swim",
    tags: ["target|l|self", "weather|l|rain", "frame|self|灵巧|up|2"],
    effect: "如果当前天气状态为下雨，则这只宝可梦的灵巧特质提升 2 点。",
    desc: "这只宝可梦在水中能够移动的比在陆地上还要快，即使是在道路中的水坑都能让它发挥全速。",
  },
  {
    name: "共生",
    alias: "きょうせい|Symbiosis",
    tags: ["target|l|ally", "nftext|l|把持有物品交给队友"],
    effect:
      "当某个队友失去或消耗掉自己的持有物品时，这只宝可梦将立刻以一个自由动作把自己的持有物品交给该队友。",
    desc: "这只宝可梦喜欢与任何跟它搭档的队友共组一个互利的羁绊关系。",
  },
  {
    name: "同步",
    alias: "シンクロ|Synchronize",
    tags: ["target|l|foe", "frame||异常状态|always"],
    effect:
      "如果敌人使这只宝可梦陷入异常状态，则敌人也将陷入相同的异常状态（除非敌人免疫该异常状态）。",
    desc: "这只宝可梦可以与他人共享它的情绪、感觉、和感官，尤其是与那些对它施加痛苦的家伙。",
  },
  {
    name: "蹒跚",
    alias: "ちどりあし|Tangled Feet",
    tags: [
      "target|l|foe",
      "frame|accuracy||down|2",
      "nftext|l|当这只宝可梦",
      "frame|confuse||always",
    ],
    effect:
      "当这只宝可梦处于「混乱」状态时，敌人以这只宝可梦为目标的所有招式都将追加「降低命中率」的标志。",
    desc: "这只宝可梦在晕眩或混乱时会以一种奇怪且特别的方式移动，这通常能反过来成为它的优势。",
  },
  {
    name: "卷发",
    alias: "カーリーヘアー|Tangling Hair",
    tags: [
      "target|l|foe",
      "nftext|l|当用物理攻击命中这只宝可梦时",
      "frame|target|灵巧|down|1",
    ],
    effect:
      "当敌人第一次以非远程物理攻击命中这只宝可梦时，该敌人的灵巧特质降低 1 点。",
    desc: "这只宝可梦的头发又粗又硬，很容易缠上任何接近它的家伙。建议每天梳理两次，让秀发保持丝滑光泽。",
  },
  {
    name: "技术高手",
    alias: "テクニシャン|Technician",
    tags: [
      "target|l|self",
      "nftext|l|使用威力1或2的招式时",
      "frame|self|伤害|plus|d1",
    ],
    effect: "所有威力为 2 或以下的招式的伤害骰池都将额外增加 1 颗骰子。",
    desc: "在执行那些其他人会散漫粗略处理的任务时，这只宝可梦会展现出精确而一丝不苟的态度。",
  },
  {
    name: "心灵感应",
    alias: "テレパシー|Telepathy",
    tags: ["target|l|self", "nftext|l|免疫队友造成的伤害"],
    effect: "这只宝可梦不会受到它队友施展的招式造成的伤害。",
    desc: "这只宝可梦可以透过心灵感应沟通。它可以传讯给其他生物，但没有办法反过来接收信息。",
  },
  {
    name: "兆级电压",
    alias: "テラボルテージ|Teravolt",
    tags: ["target|l|self"],
    effect:
      "如果有任何招式、物品、或特性会阻止这只宝可梦以某个敌人为目标、或造成任何效果，将其忽略。（例如：「免疫」特性的宝可梦仍然会陷入「中毒」状态、「飘浮」特性仍会被地面属性招式给命中。）",
    desc: "一团青色闪电球从这只宝可梦中射出，阻止它的敌人离开它的触及范围，无论你做什么，霹雳都将临到你身上。",
  },
  {
    name: "厚脂肪",
    alias: "あついしぼう|Thick Fat",
    tags: [
      "target|l|self",
      "text|l|火系招式|Fire",
      "text|l|冰系招式|Ice",
      "frame|self|受伤|minus|1",
    ],
    effect: "火属性和冰属性招式对这只宝可梦造成的伤害减少 1 点。",
    desc: "这只宝可梦的体表包覆着一层厚重的脂肪层，能够保护它对抗严酷的温度。",
  },
  {
    name: "有色眼镜",
    alias: "いろめがね|Tinted Lens",
    tags: ["target|l|self", "text|l|忽略抗性"],
    effect:
      "如果敌人对这只宝可梦使用的招式拥有抗性，则改为让该攻击如常造成伤害。如果敌人对这只宝可梦使用的招式拥有双重抗性，则改为视同对方只拥有一个抗性。",
    desc: "这只宝可梦护目镜般的双眼能够在每个恶劣情境中找到好的那一面，就算完全没有也一样。",
  },
  {
    name: "激流",
    alias: "げきりゅう|Torrent",
    tags: [
      "target|l|self",
      "nftext|l|HP降到一半或以下时",
      "text|l|水系招式|Water",
      "frame|self|伤害|plus|d1",
    ],
    effect:
      "当这只宝可梦的HP剩一半或以下，它水属性招式的伤害骰池并不会因为疼痛惩罚而被扣除成功骰，且它水属性招式的伤害骰池会额外增加 1 颗骰子。",
    desc: "这只宝可梦能增强水压来射出水柱。当这股压力失去控制时，它将会透过无法控制的激流被释放出来。",
  },
  {
    name: "硬爪",
    alias: "かたいツメ|Tough Claws",
    tags: ["target|l|self", "text|l|物理招式", "frame|self|伤害|plus|d1"],
    effect:
      "每当这只宝可梦使用了非远程攻击的物理攻击，该招式的伤害骰池将额外增加 1 颗骰子。",
    desc: "这只宝可梦的利爪是如此坚实，它能够把几乎所有一切都撕成两半。",
  },
  {
    name: "中毒激升",
    alias: "どくぼうそう|Toxic Boost",
    tags: [
      "target|l|self",
      "frame|poison||always",
      "frame|poison2||always",
      "frame|self|力量|up|2",
    ],
    effect:
      "如果这只宝可梦陷入「中毒」或「剧毒」状态，则它的力量特质提升 2 点。",
    desc: "每当这只宝可梦受到毒素折磨时，它的血液将会沸腾并使他进入凶猛无比的狂暴状态中。",
  },
  {
    name: "复制",
    alias: "トレース|Trace",
    tags: ["target|l|self", "text|l|复制特性", "target|l|rfoe"],
    effect:
      "这只宝可梦会在出场时复制一个随机敌人的特性。这个效果会在这只宝可梦脱离战斗时终止。下列特性无法被复制：花之礼、幻觉、变身者、战斗切换、神奇守护、以及其他与形态变化有关的特性。",
    desc: "这只宝可梦模仿着他人的特殊性质，使它们看起来就像是同类一样。",
  },
  {
    name: "先行治疗",
    alias: "ヒーリングシフト|Triage",
    tags: [
      "target|l|self",
      "effect|l|heal",
      "frame|heal|治疗状态|always",
      "frame|priority||up|1",
    ],
    effect: "这只宝可梦所有能够回复HP或治疗异常状态的变化类招式的先制+1。",
    desc: "这只宝可梦感受到治疗伤者的急迫性；它同时能极快地完成缝纫和包扎这类经常用于快速处理伤势的技能。",
  },
  {
    name: "懒惰",
    alias: "なまけ|Truant",
    tags: ["target|l|self"],
    effect:
      "每过两个回合，骰这只宝可梦的忠诚度进行掷骰判定，并取得至少 2 颗成功骰。若判定失败，则这只宝可梦将会拒绝行动。若判定成功，则它将如常行动。",
    desc: "这只宝可梦极度懒惰，它连最微小的努力都不会去尝试，且即使在最激烈的战斗中也会偷懒。",
  },
  {
    name: "涡轮火焰",
    alias: "ターボブレイズ|Turboblaze",
    tags: ["target|l|self"],
    effect:
      "如果有任何招式、物品、或特性会阻止这只宝可梦以某个敌人为目标、或造成任何效果，将其忽略。（例如：「免疫」特性的宝可梦仍然会陷入「中毒」状态、「飘浮」特性仍会被地面属性招式给命中。）",
    desc: "这只宝可梦创造出一个旋转不停的巨大火球包围着一切，阻止它的敌人离开它的触及范围。没有任何人能够从高热中逃脱。",
  },
  {
    name: "纯朴",
    alias: "てんねん|Unaware",
    tags: [
      "target|l|self",
      "nftext|l|忽略",
      "frame|target|特质|up|n",
      "frame|target|特质|down|n",
    ],
    effect: "在双方攻击和承受伤害时，这只宝可梦忽略任何敌人提升或降低的特质。",
    desc: "这只宝可梦总是会忽略周遭环境中的许多细节，它很少会注意到正在发生的事情。",
  },
  {
    name: "轻装",
    alias: "かるわざ|Unburden",
    tags: [
      "target|l|self",
      "nftext|l|失去或消耗持有物品时",
      "frame|self|灵巧|up|2",
    ],
    effect:
      "当这只宝可梦第一次失去或消耗掉它持有的物品，且它不再持有任何物品时，它的灵巧特质提升 2 点。",
    desc: "在从随身携带的东西中解放的瞬间就是这只宝可梦感到最为舒适的时候。它乐于不受拘束地四处乱跑。",
  },
  {
    name: "紧张感",
    alias: "きんちょうかん|Unnerve",
    tags: ["target|l|foe", "nftext|l|无法食用树果"],
    effect: "当这只宝可梦在场上时，对手将无法吃掉它持有的树果。",
    desc: "也许是因为它迫力十足的瞪视、又或许是因为它凶狠的存在，这只宝可梦附近的其他人将变得相当紧张，什至到失去食欲的程度。",
  },
  {
    name: "胜利之星",
    alias: "しょうりのほし|Victory Star",
    tags: ["target|l|allally", "effect|l|neverfail"],
    effect:
      "在这只宝可梦处于战场期间，这只宝可梦和它的所有队友的伤害类招式全都获得「必中」标志。这个特性无法被交换或改变。",
    desc: "这只宝可梦的存在本身就是对士气的惊人鼓舞。那些受到它青睐的将被引导往胜利的方向前进。",
  },
  {
    name: "干劲",
    alias: "やるき|Vital Spirit",
    tags: ["target|l|self", "frame|sleep||never"],
    effect: "这只宝可梦免疫于「睡眠」状态。",
    desc: "这只宝可梦异常的活跃且充满元气。它必须经常活动并锻炼，否则它将做出破坏性的行动。它从来不睡觉。",
  },
  {
    name: "蓄电",
    alias: "ちくでん|Volt Absorb",
    tags: [
      "target|l|self",
      "nftext|l|免疫",
      "text|l|电系招式|Electric",
      "nftext|l|的伤害",
      "frame|heal||heal|1",
    ],
    effect:
      "当这只宝可梦被电属性招式命中时，这只宝可梦可以回复 1 点HP而非受到伤害。电属性招式不会对这只宝可梦造成伤害。",
    desc: "实际上这只宝可梦的身体就是个电池，永远乐于把电充满。",
  },
  {
    name: "游魂",
    alias: "さまようたましい|Wandering Spirit",
    tags: [
      "target|l|self",
      "nftext|l|当使用物理攻击命中敌人时",
      "target|l|foe",
      "text|l|交换特性",
    ],
    effect:
      "如果这只宝可梦使用非远程物理攻击命中敌人，则它将与敌人交换特性。根据说书人的判断，某些特性将无法被交换（例如「花之礼」、「幻觉」、「战斗切换」、「神奇守护」等）。",
    desc: "这只宝可梦是个脸上总挂着哀伤表情的游魂。它不会听从你的呼唤，且可能会在漫无目的的飘浮中迷失方向。最好找个灵媒来治疗它。",
  },
  {
    name: "储水",
    alias: "ちょすい|Water Absorb",
    tags: [
      "target|l|self",
      "nftext|l|免疫",
      "text|l|水系招式|Water",
      "nftext|l|的伤害",
      "frame|heal||heal|1",
    ],
    effect:
      "当这只宝可梦被水属性招式命中时，这只宝可梦可以回复 1 点HP而非受到伤害。水属性招式不会对这只宝可梦造成伤害。",
    desc: "这只宝可梦的身体大部分都是由水构成，它能够将水储存在体内，并利用它作为营养。",
  },
  {
    name: "水泡",
    alias: "すいほう|Water Bubble",
    tags: [
      "target|l|self",
      "frame|burn1||never",
      "frame|burn2||never",
      "text|l|火系招式|Fire",
      "frame|self|受伤|minus|1",
      "text|l|水系招式|Water",
      "frame|self|伤害|plus|d2",
    ],
    effect:
      "这只宝可梦免疫于「灼伤 1 级」和「灼伤 2 级」状态。火属性招式对这只宝可梦造成的伤害减少 1 点。这只宝可梦使用的水属性招式的伤害骰池额外增加 2 颗骰子。",
    desc: "这只宝可梦被泡泡给保护着。奇怪的是，这个泡泡里头并不是空气，而是纯净的水。",
  },
  {
    name: "遇水凝固",
    alias: "みずがため|Water Compaction",
    tags: [
      "target|l|self",
      "nftext|l|免疫",
      "text|l|水系招式|Water",
      "nftext|l|的伤害",
      "frame|self|防御|up|2",
    ],
    effect:
      "当这只宝可梦第一次被水属性招式命中，它的防御提升 2 点而非受到伤害。水属性招式不会对这只宝可梦造成伤害。",
    desc: "这只宝可梦的身体能够已经人的速度吸收水分，它的身躯也会在迅速干燥的同时变得坚硬无比。",
  },
  {
    name: "水幕",
    alias: "みずのベール|Water Veil",
    tags: [
      "target|l|self",
      "frame|burn1||never",
      "frame|burn2||never",
      "frame|burn3||never",
    ],
    effect: "这只宝可梦免疫于所有「灼伤」状态。",
    desc: "这只宝可梦总是潮湿且会制造水分以让它保持湿润。多亏于此，这只宝可梦能够长时期离开水体生活。",
  },
  {
    name: "碎裂铠甲",
    alias: "くだけるよろい|Weak Armor",
    tags: [
      "target|l|self",
      "nftext|l|当被物理攻击命中时",
      "frame|self|灵巧|up|1",
      "frame|self|防御|down|1",
    ],
    effect:
      "当这只宝可梦第一次被任何物理攻击命中时，它的灵巧特质提升 1 点，但防御降低 1 点。",
    desc: "这只宝可梦的外层防护可以被脱下来，让它能更自由灵活的移动。",
  },
  {
    name: "白色烟雾",
    alias: "しろいけむり|White Smoke",
    tags: ["target|l|foe", "frame|self|特质|down|never"],
    effect:
      "敌人无法降低这只宝可梦的任何特质。然而，这只宝可梦仍然能够降低自己的特质。",
    desc: "这只宝可梦总是不断释放着白色烟雾，使敌人难以看见它。它能够利用这些烟雾来隐藏自己的身影。",
  },
  {
    name: "跃跃欲逃",
    alias: "にげごし|Wimp Out",
    tags: ["target|l|self", "nftext|l|HP降到一半或以下时", "effect|l|switcher"],
    effect:
      "每当这只宝可梦的HP降到最大值的一半或以下时，它就会回到自己的精灵球内，并派出另一个队友来代替它。如果它没有任何其他队友，则战斗可能会因此结束。这个特性的效果不会被「阻挡」给影响。",
    desc: "每当它的外骨骼被削弱时，这只宝可梦就会承受莫大的压力，出于纯粹的怯懦，它会从任何情境中逃之夭夭。",
  },
  {
    name: "神奇守护",
    alias: "ふしぎなまもり|Wonder Guard",
    tags: ["target|l|self", "nftext|l|免疫所有除了效果绝佳伤害以外的伤害源"],
    effect:
      "这只宝可梦只会受到来自异常状态、以及能对它造成效果绝佳伤害的招式的伤害。这只宝可梦免疫于其他来源的伤害，像是天气状态和入场危害。",
    desc: "这只宝可梦的身体被一种神奇的超自然气场给保护。大部分的东西都会穿过它，就仿佛那里什么东西都没有一样。",
  },
  {
    name: "奇迹皮肤",
    alias: "ミラクルスキン|Wonder Skin",
    tags: ["target|l|foe", "mdice|l|2"],
    effect:
      "其他人对这只宝可梦的所有效果都将减少 2 颗概率骰。（例如：招式〈火花〉会骰 1 颗概率骰以使敌人陷入「灼伤」状态，在对这只宝可梦使用时将会变成 0 颗概率骰。）",
    desc: "这只宝可梦的皮肤披覆着一层薄薄的保护膜，能够帮助它减轻危害的威胁。",
  },
  {
    name: "达摩模式",
    alias: "ダルマモード|Zen Mode",
    tags: ["target|l|self", "text|l|型态变化"],
    effect:
      "只有达摩狒狒能够使用这个特性。当它的HP剩一半或以下，它将会在该战斗轮结束时变化成「达摩形态」，在这之后，使用它达摩形态的数据，并根据阶级和特质上限调整它各个形态的特质。",
    desc: "在极端压力下，这只宝可梦将会透过冥想解放它隐藏的超能力。它会在隔天变回原本的模样。",
  },
]);
//console.log(AbilityList.filter(a=>!(a.tags[0].indexOf("unknown"))).length, "remain..");
