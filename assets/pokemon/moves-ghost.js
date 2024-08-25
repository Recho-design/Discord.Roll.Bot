let MoveList;
if(!MoveList) MoveList = []; 
module.exports.MoveList = MoveList;

Array.prototype.push.apply(MoveList, [
	{
		"name": "驚吓", "alias": "おどろかす|Astonish",
		"power": "1",
		"category": "physical",
		"type": "Ghost",
		"tags": ["target|l|foe", "frame|flinch||number|d3"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 1",
		"effect": "骰 3 顆机率骰以使敵人陷入「畏缩」状態。",
		"desc": "使用者偷偷靠近並吓唬敵人。"
	},
	{
		"name": "奇異之光", "alias": "あやしいひかり|Confuse Ray",
		"power": "-",
		"category": "support",
		"type": "Ghost",
		"tags": ["target|l|foe", "frame|confuse||always"],
		"accuracy": "洞察 + 自然",
		"damage": "-",
		"effect": "使敵人陷入「混亂」状態。",
		"desc": "使用者发出一道詭異的闪光，使目标失调並感到混亂。"
	},
	{
		"name": "詛咒", "alias": "のろい|Curse",
		"power": "-",
		"category": "support",
		"type": "Ghost",
		"tags": ["target|l|foe"],
		"accuracy": "意志 + 導引",
		"damage": "-",
		"effect": "骰等同於使用者HP一半的傷害骰以对自己造成傷害，无視防禦。直到这个詛咒解除，目标的所有掷骰中都將被扣除 1 顆成功骰。",
		"desc": "使用者念誦邪恶的咒语，这个詛咒只能透过灵媒或神性存在的干預來解除。"
	},
	{
		"name": "詛咒（非幽灵系的使用者）", "alias": "のろい|Curse",
		"power": "-",
		"category": "support",
		"type": "Ghost",
		"tags": ["target|l|self", "frame|self|力量|up|1", "frame|self|防禦|up|1", "frame|self|灵巧|down|1"],
		"accuracy": "意志 + 導引",
		"damage": "-",
		"effect": "提升使用者的力量和防禦，降低使用者的灵巧。这个效果只會作用於非幽灵属性的寶可夢身上。",
		"desc": "寶可夢準備透过念誦一些不適合孩子知道的咒语來施加或承受更多傷害。"
	},
	{
		"name": "同命", "alias": "みちづれ|Destiny Bond",
		"power": "-",
		"category": "support",
		"type": "Ghost",
		"tags": ["target|l|self"],
		"accuracy": "意志 + 導引",
		"damage": "-",
		"effect": "如果使用者在这个戰鬥輪期间因为戰鬥傷害而陷入瀕死状態，则对牠造成傷害的寶可夢也將在同时陷入瀕死状態。",
		"desc": "寶可夢与任何对自己造成傷害的对象建立起神秘的紐帶連结。无論使用者出了什么事，对方也都將受到同樣的遭遇。"
	},
	{
		"name": "怨念", "alias": "おんねん|Grudge",
		"power": "-",
		"category": "support",
		"type": "Ghost",
		"tags": ["target|l|foe"],
		"accuracy": "意志 + 導引",
		"damage": "-",
		"effect": "使用者陷入瀕死状態。敵人將失去所有的意志点，並失去任何因为消耗意志点而獲得的效果。敵人若想要繼續戰鬥，则必須在每輪结束时使用牠們的忠誠度來掷骰判定。每一輪所需的成功骰数將再增加 1 顆。",
		"desc": "使用者对敵人留下了深深的怨恨，这將讓目标變得不願意戰鬥。只有在更重要的事物遭受風險时，牠們才可能會願意繼續戰鬥。"
	},
	{
		"name": "禍不单行", "alias": "たたりめ|Hex",
		"power": "2*",
		"category": "special",
		"type": "Ghost",
		"tags": ["target|l|foe"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 2*",
		"effect": "如果目标正處於任何異常状態中，则这个招式的傷害骰池將额外增加 2 顆骰子。",
		"desc": "使用者对目标施加糟糕透頂的厄运詛咒，在目标虚弱时將发揮更强的威力。"
	},
	{
		"name": "舌舔", "alias": "したでなめる|Lick",
		"power": "1",
		"category": "physical",
		"type": "Ghost",
		"tags": ["target|l|foe", "frame|paralysis||number|d3"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 1",
		"effect": "骰 3 顆机率骰以使敵人陷入「麻痺」状態。",
		"desc": "使用者舔了舔敵人。牠的唾液能使大多数生物的身体麻木。"
	},
	{
		"name": "暗影之光", "alias": "シャドーレイ|Moongeist Beam",
		"power": "4",
		"category": "special",
		"type": "Ghost",
		"tags": ["target|l|foe", "effect|l|lethal"],
		"accuracy": "特殊 + 導引",
		"damage": "特殊 + 4",
		"effect": "致命傷害。如果敵方有任何能夠避免这个招式造成傷害的效果（例如寶可夢属性、特性、護盾招式、天氣状態、或屏障等），无視該效果。这个招式不能被对抗。",
		"desc": "月亮映照的寒光灑在目标身上，雖然这不會造成物理上的傷害，但那些直視光線的人將會直接崩潰。"
	},
	{
		"name": "黑夜魔影", "alias": "ナイトヘッド|Night Shade",
		"power": "*",
		"category": "special",
		"type": "Ghost",
		"tags": ["target|l|foe"],
		"accuracy": "洞察 + 導引",
		"damage": "不定",
		"effect": "根據使用者的階级決定这个招式的傷害骰池：新手 1 顆、初学者 2 顆、業餘者 3 顆、菁英 4 顆、專家为 5 顆。这个招式无視敵人的防禦。",
		"desc": "使用者將影子變化成恐怖的幻影來折磨目标。"
	},
	{
		"name": "恶夢", "alias": "あくむ|Nightmare",
		"power": "-",
		"category": "support",
		"type": "Ghost",
		"tags": ["target|l|foe", "frame|target|傷害|number|1"],
		"accuracy": "意志 + 導引",
		"damage": "-",
		"effect": "只有当目标處於「睡眠」状態时才能夠发揮效果。对敵人直接造成 1 点傷害。如果目标仍然處於「睡眠」状態，则接下來每个戰鬥輪开始时都會再次对目标直接造成 1 点傷害。",
		"desc": "使用者進入目标的夢境中並折磨对方。"
	},
	{
		"name": "奇異之風", "alias": "あやしいかぜ|Ominous Wind",
		"power": "2",
		"category": "special",
		"type": "Ghost",
		"tags": ["target|l|foe", "frame|self|力量|up|1", "frame|self|特殊|up|1", "frame|self|灵巧|up|1", "frame|self|防禦|up|1", "frame|self|特防|up|1"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 2",
		"effect": "骰 1 顆机率骰以提升使用者的力量、特殊、灵巧、防禦、和特防。",
		"desc": "寶可夢颳起一陣令人起鸡皮疙瘩，令人生厌的阴風，可能會讓使用者湧起一股邪恶的意念。"
	},
	{
		"name": "潛灵奇襲", "alias": "ゴーストダイブ|Phantom Force",
		"power": "3",
		"category": "physical",
		"type": "Ghost",
		"tags": ["target|l|foe", "effect|l|charge"],
		"accuracy": "力量 + 斗殴",
		"damage": "力量 + 3",
		"effect": "蓄力招式。当这个招式在蓄力时，使用者將不會受到任何其他招式的影響。如果目标使用了護盾招式，则該護盾將被摧毀且不會发揮任何效果。",
		"desc": "寶可夢消失並潛入一个黑暗的異次元，以穿透哪怕是最堅不可摧的防禦。牠可能會在牠的下个行动中再次现身。"
	},
	{
		"name": "暗影球", "alias": "シャドーボール|Shadow Ball",
		"power": "3",
		"category": "special",
		"type": "Ghost",
		"tags": ["target|l|foe", "dice|l|1", "frame|target|特防|down|1"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 3",
		"effect": "骰 1 顆机率骰以降低敵人的特防。",
		"desc": "寶可夢投射出一个由阴影和暗物质組成的球体來攻擊敵人。"
	},
	{
		"name": "暗影之骨", "alias": "シャドーボーン|Shadow Bone",
		"power": "3",
		"category": "physical",
		"type": "Ghost",
		"tags": ["target|l|foe", "dice|l|2", "frame|target|防禦|down|1"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 3",
		"effect": "骰 2 顆机率骰以降低敵人的防禦。",
		"desc": "这隻寶可夢当作武器的骨头上寄宿著一个灵魂，这个灵魂可能會附在受害者身上，为其主人创造攻擊的机會。"
	},
	{
		"name": "暗影爪", "alias": "シャドークロー|Shadow Claw",
		"power": "3",
		"category": "physical",
		"type": "Ghost",
		"tags": ["target|l|foe", "effect|l|crit"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 3",
		"effect": "容易擊中要害。",
		"desc": "爪子變为半虚体化，並能夠短暫地穿透盔甲、兽皮、皮肤和物体，讓这一擊可以攻擊目标身上的任何弱点。"
	},
	{
		"name": "暗影潛襲", "alias": "シャドーダイブ|Shadow Force",
		"power": "5",
		"category": "physical",
		"type": "Ghost",
		"tags": ["target|l|foe", "effect|l|lethal", "effect|l|charge"],
		"accuracy": "力量 + 斗殴",
		"damage": "力量 + 5",
		"effect": "致命傷害。蓄力招式。当这个招式在蓄力时，使用者將不會受到任何其他招式的影響。如果目标使用了護盾招式，则該護盾將被摧毀且不會发揮任何效果。这个招式造成的傷害在 24 小时內都无法被治癒。",
		"desc": "寶可夢消失並潛入一个黑暗的異次元並尋找机會攻擊牠的敵人。这一擊傷害的不是目标的身体，而是灵魂。"
	},
	{
		"name": "暗影拳", "alias": "シャドーパンチ|Shadow Punch",
		"power": "2",
		"category": "physical",
		"type": "Ghost",
		"tags": ["target|l|foe", "effect|l|fist", "effect|l|neverfail"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 2",
		"effect": "拳头类招式。必中。",
		"desc": "寶可夢透过自己的影子揮出一拳。拳擊會從敵人的影子中冒出來，就像傳送門一樣。"
	},
	{
		"name": "影子偷襲", "alias": "かげうち|Shadow Sneak",
		"power": "2",
		"category": "physical",
		"type": "Ghost",
		"tags": ["target|l|foe", "frame|priority||up|1"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 2",
		"effect": "先制招式。",
		"desc": "使用者潛入黑暗之中並從目标的影子跃出襲擊。寶可夢可以在影子中自由移动，仿佛牠是没有实体的一樣。"
	},
	{
		"name": "暗影偷盜", "alias": "シャドースチール|Spectral Thief",
		"power": "3",
		"category": "physical",
		"type": "Ghost",
		"tags": ["target|l|foe"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 3",
		"effect": "若成功，则在使用者造成傷害<b>之前</b>，偷取目标身上所有的特质增益。目标身上的特质減益會維持原樣。",
		"desc": "透过影子，使用者潛行到目标身边，竊取其生命力並消耗它，只把悲傷与失落留給牠的受害者。"
	},
	{
		"name": "縫影", "alias": "かげぬい|Spirit Shackle",
		"power": "3",
		"category": "physical",
		"type": "Ghost",
		"tags": ["target|l|foe", "effect|l|block"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 3",
		"effect": "阻擋。",
		"desc": "在攻擊时，使用者悄悄將敵人的影子給綁在地上，限制其移动，使其无法逃脫。"
	},
	{
		"name": "怨恨", "alias": "うらみ|Spite",
		"power": "-",
		"category": "support",
		"type": "Ghost",
		"tags": ["target|l|foe"],
		"accuracy": "意志 + 威吓",
		"damage": "-",
		"effect": "將敵人的意志減少到剩下 1 点。消除任何目标因消耗意志点而獲得的效果。",
		"desc": "目标將因为感受到的强烈恐懼感而被壓倒。"
	},
	{
		"name": "萬聖夜", "alias": "ハロウィン|Trick-or-Treat",
		"power": "-",
		"category": "support",
		"type": "Ghost",
		"tags": ["target|l|foe"],
		"accuracy": "意志 + 誘惑",
		"damage": "-",
		"effect": "使目标的属性追加幽灵属性（例如：喵喵的属性將變为「一般/幽灵」；噴火龍的属性將變为「火/飛行/幽灵」）。如果該寶可夢已经擁有第三个属性，则將該属性取代为幽灵属性。",
		"desc": "寶可夢邀请目标加入萬聖夜。目标將穿上一件没有灵媒的協助就无法脫下的幽灵装。"
	},
	{
		"name": "灵騷", "alias": "ポルターガイスト|Poltergeist",
		"power": "?",
		"category": "physical",
		"type": "Ghost",
		"tags": ["target|l|foe"],
		"accuracy": "? + ?",
		"damage": "?",
		"effect": "此招式尚未被列入規则中。",
		"desc": ""
	}
]);