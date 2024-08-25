let MoveList;
if(!MoveList) MoveList = []; 
module.exports.MoveList = MoveList;

Array.prototype.push.apply(MoveList, [
	{
		"name": "极光束", "alias": "オーロラビーム|Aurora Beam",
		"power": "2",
		"category": "special",
		"type": "Ice",
		"tags": ["target|l|foe", "dice|l|1", "frame|target|力量|down|1"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 2",
		"effect": "骰 1 顆机率骰以降低敵人的力量。",
		"desc": "寶可夢射出美丽的虹彩光束，可能會讓敵人为其大吃一驚。"
	},
	{
		"name": "极光幕", "alias": "オーロラベール|Aurora Veil",
		"power": "-",
		"category": "support",
		"type": "Ice",
		"tags": ["target|l|allally", "frame|self|受傷|number|-1"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "如果当前天氣状態不为冰雹，则这个招式將自动失败。物理和特殊招式对使用者和所有隊友造成的傷害將減少 1 点，持續 4 輪，即使冰雹天氣提前结束也一樣。",
		"desc": "极光和冰雹以寶可夢和牠的隊友們为中心迴旋，將攻擊偏折开來。"
	},
	{
		"name": "雪崩", "alias": "ゆきなだれ|Avalanche",
		"power": "2*",
		"category": "physical",
		"type": "Ice",
		"tags": ["target|l|foe", "frame|priority||down|4"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 2*",
		"effect": "后制招式。如果目标在这个戰鬥輪中已经对使用者造成过的傷害，则这个招式的傷害骰池额外增加 2 顆骰子。",
		"desc": "使用者的周圍會堆積著冰雪，如果有任何東西擾动到積雪，積雪就會像雪崩一樣落在攻擊者身上。"
	},
	{
		"name": "暴風雪", "alias": "ふぶき|Blizzard",
		"power": "5",
		"category": "special",
		"type": "Ice",
		"tags": ["target|l|allfoe", "frame|accuracy||down|2", "frame|frozen||number|d1"],
		"accuracy": "特殊 + 導引",
		"damage": "特殊 + 5",
		"effect": "以所有範圍內的敵人为目标。骰 1 顆机率骰以使目标陷入「冰凍」状態。如果当前天氣状態为大晴天，则这个招式的命中率降低效果將改为 -3；如果当前天氣状態为冰雹，则无視这个招式的命中率降低效果，且这个招式將无法被闪避。",
		"desc": "使用者呼喚猛烈的暴風雪盤旋再敵人周遭，儘管这陣暴雪不會持續很长时间，但它異常兇猛。"
	},
	{
		"name": "冷凍干燥", "alias": "フリーズドライ|Freeze-Dry",
		"power": "3",
		"category": "special",
		"type": "Ice",
		"tags": ["target|l|foe"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 3",
		"effect": "对水属性寶可夢使用时將造成 2 点额外的傷害。",
		"desc": "使用者凍结环境中的所有水分，水属性的寶可夢將會成受极大的痛苦。"
	},
	{
		"name": "冰凍伏特", "alias": "フリーズボルト|Freeze Shock",
		"power": "6",
		"category": "physical",
		"type": "Ice",
		"tags": ["target|l|foe", "frame|accuracy||down|1", "effect|l|charge", "effect|l|lethal", "frame|paralysis||number|d3"],
		"accuracy": "特殊 + 導引",
		"damage": "力量 + 6",
		"effect": "致命傷害。蓄力招式。遠程攻擊。骰 3 顆机率骰以使敵人陷入「麻痺」状態。",
		"desc": "使用者彷彿變成了一大塊冰塊，接著牠伴隨著毀滅性的電流爆发將自己從冰塊中釋放出來。爆发四散的冰塊碎片和强烈闪電遍佈了整个戰場。"
	},
	{
		"name": "冰冰霜凍", "alias": "こちこちフロスト|Freezy Frost",
		"power": "3",
		"category": "special",
		"type": "Ice",
		"tags": ["target|l|foe", "frame|accuracy||down|1"],
		"accuracy": "特殊 + 導引",
		"damage": "特殊 + 3",
		"effect": "若成功，解除敵人身上所有特质和能力的增益或減益。如果这个招式的使用者處於最終進化階段，则这个招式自动失败。",
		"desc": "使用者在跟敵人玩紅綠燈游戏时觸碰对方，令人驚訝的是，当使用者喊出「停(Freeze!)」的时候，敵人就會被凍成冰塊。当牠們意識到这只是在玩耍时，冰塊就會溶解成霧。"
	},
	{
		"name": "冰息", "alias": "こおりのいぶき|Frost Breath",
		"power": "2",
		"category": "special",
		"type": "Ice",
		"tags": ["target|l|foe", "frame|accuracy||down|1"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 2",
		"effect": "这个招式永遠會擊中要害，並獲得相應的奖励傷害骰。",
		"desc": "使用者向目标吹出令人脊椎发冷的氣息，突然變化的温度能夠讓任何人屈服。"
	},
	{
		"name": "冰封世界", "alias": "こごえるせかい|Glaciate",
		"power": "2",
		"category": "special",
		"type": "Ice",
		"tags": ["target|l|allfoe", "effect|l|lethal", "frame|target|灵巧|down|1"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 2",
		"effect": "致命傷害。以所有範圍內的敵人为目标。降低目标的灵巧。",
		"desc": "空氣冰冷到就連稍微动彈、看清周圍、以及呼吸都會受傷。你的当務之急應該是趕快逃跑，因为待在这裡的每分每秒都會讓你的生命慢慢枯竭。"
	},
	{
		"name": "冰雹", "alias": "あられ|Hail",
		"power": "-",
		"category": "support",
		"type": "Ice",
		"tags": ["target|l|field", "weather|l|hail"],
		"accuracy": "特殊 + 自然",
		"damage": "-",
		"effect": "讓天氣状態在接下來 4 輪期间變为冰雹。",
		"desc": "使用者召喚出會在戰場上持續一陣子的冰雹。"
	},
	{
		"name": "黑霧", "alias": "くろいきり|Haze",
		"power": "-",
		"category": "support",
		"type": "Ice",
		"tags": ["target|l|field"],
		"accuracy": "特殊 + 自然",
		"damage": "-",
		"effect": "解除戰場上所有人的所有特质或能力的增益和減益。",
		"desc": "使用者釋放出黑霧擾亂所有參与戰鬥的寶可夢，这也能夠遮蔽所有裡头的生物。"
	},
	{
		"name": "冰球", "alias": "アイスボール|Ice Ball",
		"power": "1*",
		"category": "physical",
		"type": "Ice",
		"tags": ["target|l|foe", "frame|accuracy||down|1", "effect|l|sact_5"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 1*",
		"effect": "連續行动。若使用者前一次施展的〈冰球〉攻擊命中，则这一次攻擊的傷害骰池將额外增加 1 顆骰子。如果使用者在該戰鬥輪已经使用过了〈變圓〉，则每一擊的傷害骰池都再额外增加 1 顆骰子。",
		"desc": "使用者蜷缩成一个雪球，滾动撞向敵人。雪球會隨著滾动變得越來越大。"
	},
	{
		"name": "冰凍光束", "alias": "れいとうビーム|Ice Beam",
		"power": "3",
		"category": "special",
		"type": "Ice",
		"tags": ["target|l|foe", "frame|frozen||number|d1"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 3",
		"effect": "骰 1 顆机率骰以使敵人陷入「冰凍」状態。",
		"desc": "使用者射出冰凍射線，大幅降低任何擊中事物的温度。"
	},
	{
		"name": "极寒冷焰", "alias": "コールドフレア|Ice Burn",
		"power": "6",
		"category": "special",
		"type": "Ice",
		"tags": ["target|l|foe", "frame|accuracy||down|1", "effect|l|charge", "effect|l|lethal", "frame|burn1||number|d3"],
		"accuracy": "特殊 + 導引",
		"damage": "特殊 + 6",
		"effect": "致命傷害。蓄力招式。遠程攻擊。骰 3 顆机率骰以使敵人陷入「灼傷 1 级」状態。",
		"desc": "使用者彷彿變成了一大塊冰塊，接著牠伴隨著毀滅性的爆炸將自己從冰塊中釋放出來。爆发四散的冰塊碎片和烈火遍佈了整个戰場。"
	},
	{
		"name": "冰凍牙", "alias": "こおりのキバ|Ice Fang",
		"power": "2",
		"category": "physical",
		"type": "Ice",
		"tags": ["target|l|foe", "frame|accuracy||down|1", "frame|flinch||number|d2", "frame|frozen||number|d2"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 2",
		"effect": "骰 2 顆机率骰以使敵人陷入「畏缩」状態。骰 2 顆机率骰以使敵人陷入「冰凍」状態。",
		"desc": "使用者咬住敵人並從口中釋放出霜凍冰冷的氣息。"
	},
	{
		"name": "冰錘", "alias": "アイスハンマー|Ice Hammer",
		"power": "4",
		"category": "physical",
		"type": "Ice",
		"tags": ["target|l|foe", "frame|accuracy||down|1", "frame|self|灵巧|down|1"],
		"accuracy": "力量 + 斗殴",
		"damage": "力量 + 4",
		"effect": "降低使用者的灵巧。",
		"desc": "寶可夢揮舞牠强状冰冷的手臂給予敵人狠狠的一擊。"
	},
	{
		"name": "冰凍拳", "alias": "れいとうパンチ|Ice Punch",
		"power": "3",
		"category": "physical",
		"type": "Ice",
		"tags": ["target|l|foe", "effect|l|fist", "frame|frozen||number|d1"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 3",
		"effect": "拳头类招式。骰 1 顆机率骰以使敵人陷入「冰凍」状態。",
		"desc": "寶可夢揮出帶有寒氣的拳擊。使用者的手可以凍结任何它所接觸到的東西。"
	},
	{
		"name": "冰礫", "alias": "こおりのつぶて|Ice Shard",
		"power": "2",
		"category": "physical",
		"type": "Ice",
		"tags": ["target|l|foe", "frame|priority||up|1"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 2",
		"effect": "先制招式。遠程攻擊。",
		"desc": "使用者瞬间凝结出冰塊並將向目标投掷而出。"
	},
	{
		"name": "冰柱墜擊", "alias": "つららおとし|Icicle Crash",
		"power": "3",
		"category": "physical",
		"type": "Ice",
		"tags": ["target|l|foe", "frame|accuracy||down|1", "frame|flinch||number|d3"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 3",
		"effect": "骰 3 顆机率骰以使敵人陷入「畏缩」状態。",
		"desc": "使用者將巨大冰柱砸向对手，这股衝擊有时會使对手暈眩。"
	},
	{
		"name": "冰錐", "alias": "つららばり|Icicle Spear",
		"power": "1",
		"category": "physical",
		"type": "Ice",
		"tags": ["target|l|foe", "effect|l|sact_5"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 1",
		"effect": "遠程攻擊。連續行动。",
		"desc": "使用者朝著目标发射一波小巧而尖銳的冰錐。"
	},
	{
		"name": "冰凍之風", "alias": "こごえるかぜ|Icy Wind",
		"power": "2",
		"category": "special",
		"type": "Ice",
		"tags": ["target|l|allfoe", "frame|target|灵巧|down|1"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 2",
		"effect": "以所有範圍內的敵人为目标。降低目标的灵巧。",
		"desc": "这陣寒風是如此冰冷，把目标凍到骨子裡使其难以行动。"
	},
	{
		"name": "白霧", "alias": "しろいきり|Mist",
		"power": "-",
		"category": "support",
		"type": "Ice",
		"tags": ["target|l|allally"],
		"accuracy": "特殊 + 自然",
		"damage": "-",
		"effect": "在接下來 4 个戰鬥輪期间，使用者和隊友的特质和能力都不會被降低。",
		"desc": "使用者將自己及其盟友籠罩在具有神秘性质的寒冷白霧中，它能夠遮蔽所有附近的生物。"
	},
	{
		"name": "细雪", "alias": "こなゆき|Powder Snow",
		"power": "2",
		"category": "special",
		"type": "Ice",
		"tags": ["target|l|allfoe", "frame|frozen||number|d1"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 2",
		"effect": "以所有範圍內的敵人为目标。骰 1 顆机率骰以使敵人陷入「冰凍」状態。",
		"desc": "使用者颳起满是雪花的微風，將接觸到的一切都凍结。这些雪塵能夠輕易讓房间结冰。"
	},
	{
		"name": "絕对零度", "alias": "ぜったいれいど|Sheer Cold",
		"power": "-",
		"category": "special",
		"type": "Ice",
		"tags": ["target|l|foe", "frame|accuracy||down|5"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "直接造成等同於目标剩餘HP的傷害，外加 1 点致命傷害。",
		"desc": "使用者從內而外凍结敵人，这个攻擊的受害者將會需要接受紧急的醫療救護。"
	}
]);