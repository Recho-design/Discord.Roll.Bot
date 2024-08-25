let MoveList;
if(!MoveList) MoveList = []; 
module.exports.MoveList = MoveList;

Array.prototype.push.apply(MoveList, [
	{
		"name": "廣域破壞", "alias": "ワイドブレイカー|Breaking Swipe",
		"power": "2",
		"category": "physical",
		"type": "Dragon",
		"tags": ["target|l|allfoe", "frame|target|力量|down|1"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 2",
		"effect": "以所有範圍內的敵人为目标。降低目标的力量。",
		"desc": "寶可夢用牠的尾巴对敵人进行高强度的猛掃。隨著碎裂聲響起，敵人在这之后將只能艱难跛行。"
	},
	{
		"name": "鱗片噪音", "alias": "スケイルノイズ|Clanging Scales",
		"power": "4",
		"category": "special",
		"type": "Dragon",
		"tags": ["target|l|allfoe", "frame|self|防禦|down|1", "effect|l|sound"],
		"accuracy": "灵巧 + 表演",
		"damage": "特殊 + 4",
		"effect": "聲音类招式。以所有範圍內的敵人为目标。降低使用者的防禦。",
		"desc": "寶可夢震动牠盔甲般的鱗片並在區域內製造出刺耳的噪音。不过牠的一些鱗片也因此脫落，使一部份的身軀暴露了出來。"
	},
	{
		"name": "魂舞烈音爆", "alias": "ソウルビート|Clangorous Soul",
		"power": "-",
		"category": "support",
		"type": "Dragon",
		"tags": ["target|l|self", "frame|self|力量|up|1", "frame|self|特殊|up|1", "frame|self|灵巧|up|1", "frame|self|防禦|up|1", "frame|self|特防|up|1"],
		"accuracy": "强壮 + 表演",
		"damage": "-",
		"effect": "使用者对自己造成等同於他自己总HP一半的傷害（尾数捨去）。提升使用者的力量、特殊、灵巧、防禦、和特防。",
		"desc": "寶可夢擺动牠的鱗片，使之變得鋒利、脫落、並重新排列。这个过程雖然很疼，但寶可夢卻能因此更專注於戰鬥。"
	},
	{
		"name": "核心惩罚者", "alias": "コアパニッシャー|Core Enforcer",
		"power": "4",
		"category": "special",
		"type": "Dragon",
		"tags": ["target|l|foe"],
		"accuracy": "特殊 + 導引",
		"damage": "特殊 + 4",
		"effect": "若这个招式使用成功，且目标在这个戰鬥輪期间已经造成过傷害，则在这个場景期间消除敵人的特性（以下这些特性为例外：牽絆變身、絕对睡眠、畫皮、多属性、群聚變形、AR系統、魚群、戰鬥切換、界限盾殼）",
		"desc": "基格爾德從牠的核心中射出一道足以裂解目标的光束，使其无法維持最基本的特性。"
	},
	{
		"name": "流星群", "alias": "龍星群|りゅうせいぐん|Draco Meteor",
		"power": "6",
		"category": "special",
		"type": "Dragon",
		"tags": ["target|l|foe", "frame|accuracy||down|1", "effect|l|lethal", "frame|self|特殊|down|2"],
		"accuracy": "特殊 + 導引",
		"damage": "特殊 + 6",
		"effect": "致命傷害。降低使用者的特殊。",
		"desc": "寶可夢從空中呼喚流星墜落以造成巨大的傷害。这个壮舉會大大浩劫使用者的体力。"
	},
	{
		"name": "龍息", "alias": "りゅうのいぶき|Dragon Breath",
		"power": "2",
		"category": "special",
		"type": "Dragon",
		"tags": ["target|l|foe", "frame|paralysis||number|d3"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 2",
		"effect": "骰 3 顆机率骰以使敵人陷入「麻痺」状態。",
		"desc": "使用者呼出一陣神秘的綠色吐息，任何接觸到龍息的傢伙的移动都將被阻礙。"
	},
	{
		"name": "龍爪", "alias": "ドラゴンクロー|Dragon Claw",
		"power": "3",
		"category": "physical",
		"type": "Dragon",
		"tags": ["target|l|foe"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 3",
		"desc": "寶可夢使用牠强状的利爪猛烈撕扯对方。"
	},
	{
		"name": "龍之舞", "alias": "りゅうのまい|Dragon Dance",
		"power": "-",
		"category": "support",
		"type": "Dragon",
		"tags": ["target|l|self", "frame|self|力量|up|1", "frame|self|灵巧|up|1"],
		"accuracy": "强壮 + 表演",
		"damage": "-",
		"effect": "提升使用者的力量和灵巧。",
		"desc": "使用者跳起一种神秘且充满活力的舞蹈，激发牠的戰鬥之魂与本能反應。"
	},
	{
		"name": "龍箭", "alias": "ドラゴンアロー|Dragon Darts",
		"power": "2",
		"category": "physical",
		"type": "Dragon",
		"tags": ["target|l|foe", "effect|l|sact_2"],
		"accuracy": "灵巧 + 導引",
		"damage": "力量 + 2",
		"effect": "遠程攻擊。双重行动。",
		"desc": "这隻寶可夢的头部同时也是養育牠族群初生寶可夢的巢穴，这些小傢伙有时會被当作導彈发射出去。"
	},
	{
		"name": "龍錘", "alias": "ドラゴンハンマー|Dragon Hammer",
		"power": "3",
		"category": "physical",
		"type": "Dragon",
		"tags": ["target|l|foe"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 3",
		"desc": "寶可夢像个錘子一樣擺动自己的身体並把敵人釘在龜裂的地面上。"
	},
	{
		"name": "龍之波动", "alias": "りゅうのはどう|Dragon Pulse",
		"power": "3",
		"category": "special",
		"type": "Dragon",
		"tags": ["target|l|foe"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 3",
		"desc": "使用者张开嘴並釋放一陣强大的能量波。"
	},
	{
		"name": "龍之怒", "alias": "りゅうのいかり|Dragon Rage",
		"power": "-",
		"category": "special",
		"type": "Dragon",
		"tags": ["target|l|foe", "frame|target|傷害|number|2"],
		"accuracy": "灵巧 + 導引",
		"damage": "-",
		"effect": "直接造成 2 点固定傷害。",
		"desc": "这陣双色火焰总是在其接觸到的每件東西上留下相同的燃燒痕跡。"
	},
	{
		"name": "龍之俯衝", "alias": "ドラゴンダイブ|Dragon Rush",
		"power": "4",
		"category": "physical",
		"type": "Dragon",
		"tags": ["target|l|foe", "frame|accuracy||down|2", "frame|flinch||number|d2"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 4",
		"effect": "骰 2 顆机率骰以使敵人陷入「畏缩」状態。",
		"desc": "使用者疾馳向敵人衝鋒。这記打擊可能會讓目标喘不过氣。"
	},
	{
		"name": "龍尾", "alias": "ドラゴンテール|Dragon Tail",
		"power": "2",
		"category": "physical",
		"type": "Dragon",
		"tags": ["target|l|foe", "frame|priority||down|1", "frame|accuracy||down|1", "effect|l|switcher"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 2",
		"effect": "后制招式。替換招式。目标被擊中后將被暈眩並打回牠訓練家的位置，强迫訓練家派出另一隻寶可夢來替換。若在野外使用，目标將因此被趕走。",
		"desc": "这記强力的尾擊足以將任何人打飛到 100 英尺遠！"
	},
	{
		"name": "二連劈", "alias": "ダブルチョップ|Dual Chop",
		"power": "2",
		"category": "physical",
		"type": "Dragon",
		"tags": ["target|l|foe", "frame|accuracy||down|1", "effect|l|sact_2"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 2",
		"effect": "双重行动。",
		"desc": "寶可夢施展两記野蠻的劈斬來猛擊敵人。"
	},
	{
		"name": "极巨炮", "alias": "ダイマックスほう|Dynamax Cannon",
		"power": "4*",
		"category": "special",
		"type": "Dragon",
		"tags": ["target|l|foe", "effect|l|lethal"],
		"accuracy": "特殊 + 導引",
		"damage": "特殊 + 4*",
		"effect": "若敵人正處於极巨化状態，则这个招式變为致命傷害，且傷害骰池额外增加 4 顆骰子。",
		"desc": "寶可夢射出一道强力的光束，如果对手正處於极巨化状態，牠身上的所有能量就會凝聚並在目标身上爆炸。"
	},
	{
		"name": "无极光束", "alias": "ムゲンダイビーム|Eternabeam",
		"power": "7",
		"category": "special",
		"type": "Dragon",
		"tags": ["target|l|foe", "frame|accuracy||down|1", "effect|l|lethal", "effect|l|recharge"],
		"accuracy": "特殊 + 導引",
		"damage": "特殊 + 7",
		"effect": "必須重新充能。致命傷害。",
		"desc": "寶可夢向天空射出一道威力无比的光束，这道被釋放出的能量也許在数千年后仍能繼續穿梭於浩瀚宇宙中。"
	},
	{
		"name": "逆鱗", "alias": "げきりん|Outrage",
		"power": "5",
		"category": "physical",
		"type": "Dragon",
		"tags": ["target|l|rfoe", "effect|l|rampage"],
		"accuracy": "力量 + 斗殴",
		"damage": "力量 + 5",
		"effect": "狂暴。以随机敵人为目标。",
		"desc": "使用者喚醒牠身为龍的原始本能，並釋放出无法控制的憤怒，摧毀牠前方的一切。在那之后，寶可夢將會迷惑並陷入混亂。"
	},
	{
		"name": "时光咆哮", "alias": "ときのほうこう|Roar of Time",
		"power": "6",
		"category": "special",
		"type": "Dragon",
		"tags": ["target|l|foe", "frame|accuracy||down|1", "effect|l|lethal"],
		"accuracy": "特殊 + 導引",
		"damage": "特殊 + 6",
		"effect": "致命傷害﹒若成功，则目标直到下个行动輪前都无法採取任何行动。",
		"desc": "在令人畏懼的咆哮中，帝牙盧卡將时间的力量限制在一个區域內，可憐的目标將會被困在一个扭曲的时间中，並在幾秒鐘內變老。"
	},
	{
		"name": "亞空裂斬", "alias": "あくうせつだん|Spacial Rend",
		"power": "4",
		"category": "special",
		"type": "Dragon",
		"tags": ["target|l|foe", "effect|l|lethal", "effect|l|crit"],
		"accuracy": "特殊 + 導引",
		"damage": "特殊 + 4",
		"effect": "致命傷害。容易擊中要害。",
		"desc": "伴隨著龍爪綻放的闪光，帕路奇亞碎裂了敵人周圍的空间。那些倖存下來的也很少有能保持原來形状的。"
	},
	{
		"name": "龍捲風", "alias": "たつまき|Twister",
		"power": "2",
		"category": "special",
		"type": "Dragon",
		"tags": ["target|l|allfoe", "frame|flinch||number|d2"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 2",
		"effect": "骰 2 顆机率骰以使敵人陷入「畏缩」状態。",
		"desc": "寶可夢颳出一陣环繞敵人的旋風。牠們直到從这可怕的龍捲風中脫身之前都无法行动。"
	}
]);