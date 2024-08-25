let MoveList;
if(!MoveList) MoveList = []; 
module.exports.MoveList = MoveList;

Array.prototype.push.apply(MoveList, [
	{
		"name": "衝岩", "alias": "アクセルロック|Accelerock",
		"power": "2",
		"category": "physical",
		"type": "Rock",
		"tags": ["target|l|foe", "frame|priority||up|1"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 2",
		"effect": "先制招式。",
		"desc": "寶可夢以高速衝刺，在撞擊时运用自己身上的岩石打擊敵人。"
	},
	{
		"name": "原始之力", "alias": "げんしのちから|Ancient Power",
		"power": "2",
		"category": "special",
		"type": "Rock",
		"tags": ["target|l|foe", "frame|self|力量|up|1", "frame|self|特殊|up|1", "frame|self|灵巧|up|1", "frame|self|防禦|up|1", "frame|self|特防|up|1"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 2",
		"effect": "骰 1 顆机率骰以提升使用者的力量、特殊、灵巧、防禦、和特防。",
		"desc": "寶可夢呼喚來自遠古时代的能量來攻擊敵人，且可能會讓使用者的身体因此充盈著原初之力。"
	},
	{
		"name": "鑽石風暴", "alias": "ダイヤストーム|Diamond Storm",
		"power": "4",
		"category": "physical",
		"type": "Rock",
		"tags": ["target|l|allfoe", "dice|l|5", "frame|self|防禦|up|2"],
		"accuracy": "灵巧 + 導引",
		"damage": "力量 + 4",
		"effect": "遠程攻擊。骰 5 顆机率骰以提升使用者的防禦。",
		"desc": "寶可夢召喚出席捲整个戰場的鑽石風暴，这些鑽石同时能做为屏障为使用者提供掩護。"
	},
	{
		"name": "双刃头錘", "alias": "もろはのずつき|Head Smash",
		"power": "6",
		"category": "physical",
		"type": "Rock",
		"tags": ["target|l|foe", "frame|accuracy||down|2", "effect|l|recoil"],
		"accuracy": "力量 + 斗殴",
		"damage": "力量 + 6",
		"effect": "反作用力傷害。",
		"desc": "使用者將力量集中在头上衝鋒以攻擊敵人，这个攻擊对双方都會造成傷害。"
	},
	{
		"name": "力量寶石", "alias": "パワージェム|Power Gem",
		"power": "3",
		"category": "special",
		"type": "Rock",
		"tags": ["target|l|foe"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 3",
		"desc": "使用者從体內的寶石射出一道光束进行攻擊。"
	},
	{
		"name": "岩石爆擊", "alias": "ロックブラスト|Rock Blast",
		"power": "1",
		"category": "physical",
		"type": "Rock",
		"tags": ["target|l|foe", "frame|accuracy||down|1", "effect|l|sact_5"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 1",
		"effect": "遠程攻擊。連續行动。",
		"desc": "寶可夢噴射出小巧石塊，會在接觸到敵人时爆破成碎片。"
	},
	{
		"name": "岩石打磨", "alias": "ロックカット|Rock Polish",
		"power": "-",
		"category": "support",
		"type": "Rock",
		"tags": ["target|l|self", "frame|self|灵巧|up|2"],
		"accuracy": "灵巧 + 導引",
		"damage": "-",
		"effect": "提升使用者的灵巧。",
		"desc": "使用者打磨自己岩石身軀上的粗糙表面，使其能更輕松快速地移动。"
	},
	{
		"name": "岩崩", "alias": "いわなだれ|Rock Slide",
		"power": "3",
		"category": "physical",
		"type": "Rock",
		"tags": ["target|l|allfoe", "frame|accuracy||down|1", "frame|flinch||number|d3"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 3",
		"effect": "以所有範圍內的敵人为目标。骰 3 顆机率骰以使敵人陷入「畏缩」状態。",
		"desc": "寶可夢製造出一波落石攻擊敵人，使牠們被壓在岩石堆下。"
	},
	{
		"name": "落石", "alias": "いわおとし|Rock Throw",
		"power": "2",
		"category": "physical",
		"type": "Rock",
		"tags": ["target|l|foe", "frame|accuracy||down|1"],
		"accuracy": "灵巧 + 導引",
		"damage": "力量 + 2",
		"effect": "遠程攻擊。",
		"desc": "使用者撿起岩石或石头並丟向敵人。"
	},
	{
		"name": "岩石封锁", "alias": "がんせきふうじ|Rock Tomb",
		"power": "2",
		"category": "physical",
		"type": "Rock",
		"tags": ["target|l|foe", "frame|accuracy||down|1", "frame|target|灵巧|down|1"],
		"accuracy": "灵巧 + 導引",
		"damage": "力量 + 2",
		"effect": "遠程攻擊。降低敵人的灵巧。",
		"desc": "寶可夢將使敵人埋進石头和岩石中，使牠无法任意行动。"
	},
	{
		"name": "岩石炮", "alias": "がんせきほう|Rock Wrecker",
		"power": "6",
		"category": "physical",
		"type": "Rock",
		"tags": ["target|l|foe", "frame|accuracy||down|1", "effect|l|lethal", "effect|l|recharge"],
		"accuracy": "力量 + 導引",
		"damage": "力量 + 6",
		"effect": "遠程攻擊。必須重新充能。致命傷害。",
		"desc": "使用者射出如同砲彈一般，甚至能夠擊穿厚实牆壁的巨大石塊。然而，这个招式將會消耗使用者大量的能量。"
	},
	{
		"name": "滾动", "alias": "ころがる|Rollout",
		"power": "1*",
		"category": "physical",
		"type": "Rock",
		"tags": ["target|l|foe", "frame|accuracy||down|1", "effect|l|sact_5"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 1*",
		"effect": "連續行动。若使用者前一次施展的〈滾动〉攻擊命中，则这一次攻擊的傷害骰池將额外增加 1 顆骰子。如果使用者在該戰鬥輪已经使用过了〈變圓〉，则每一擊的傷害骰池都再额外增加 1 顆骰子。",
		"desc": "使用者蜷缩成一个球，滾动撞向敵人，輾过路上所有東西。"
	},
	{
		"name": "沙暴", "alias": "すなあらし|Sandstorm",
		"power": "-",
		"category": "support",
		"type": "Rock",
		"tags": ["target|l|field", "weather|l|sand"],
		"accuracy": "特殊 + 自然",
		"damage": "-",
		"effect": "讓天氣状態在接下來 4 輪期间變为沙暴。",
		"desc": "寶可夢颳起帶有无数粗糙沙粒的狂風。"
	},
	{
		"name": "擊落", "alias": "うちおとす|Smack Down",
		"power": "2",
		"category": "physical",
		"type": "Rock",
		"tags": ["target|l|foe"],
		"accuracy": "灵巧 + 導引",
		"damage": "力量 + 2",
		"effect": "遠程攻擊。使敵人不再免疫於地面属性的攻擊。",
		"desc": "使用者扔出物体，通常是沉重的巨岩，來把敵人擊落在地上，讓牠在这之后无法再離开地表。"
	},
	{
		"name": "隱形岩", "alias": "ステルスロック|Stealth Rock",
		"power": "-",
		"category": "support",
		"type": "Rock",
		"tags": ["target|l|field"],
		"accuracy": "灵巧 + 隱匿",
		"damage": "-",
		"effect": "入場危害。敵方寶可夢在換上場时會失去 1 点HP，这个效果不會疊加。",
		"desc": "寶可夢把尖銳鋒利的岩石藏在敵方戰場上的各个角落。"
	},
	{
		"name": "尖石攻擊", "alias": "ストーンエッジ|Stone Edge",
		"power": "4",
		"category": "physical",
		"type": "Rock",
		"tags": ["target|l|foe", "frame|accuracy||down|2", "effect|l|lethal", "effect|l|crit"],
		"accuracy": "力量 + 導引",
		"damage": "力量 + 4",
		"effect": "遠程攻擊。致命傷害。容易擊中要害。",
		"desc": "使用者將尖銳的岩石砸向敵人。岩石的速度和重量將會造成嚴重的傷害。"
	},
	{
		"name": "瀝青射击", "alias": "タールショット|Tar Shot",
		"power": "-",
		"category": "support",
		"type": "Rock",
		"tags": ["target|l|foe", "frame|target|灵巧|down|1"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "降低敵人的灵巧。直到該場景结束前，火属性招式將对敵人造成效果絕佳的傷害。",
		"desc": "寶可夢向敵人射出大量黏稠的漆黑瀝青。那个不幸的敵人將因此难以行动且需要遠離火源，因为瀝青极度易燃。"
	},
	{
		"name": "廣域防守", "alias": "ワイドガード|Wide Guard",
		"power": "-",
		"category": "support",
		"type": "Rock",
		"tags": ["target|l|allally", "frame|priority||up|3", "effect|l|shield"],
		"accuracy": "活力 + 斗殴",
		"damage": "-",
		"effect": "先制招式。護盾。傷害类招式对使用者和隊友造成的傷害減少 3 点。对使用者和隊友會造成固定傷害的招式的傷害將被降低为 0 点。",
		"desc": "寶可夢用牠的整个身軀当作掩護來保護牠的隊友抵禦來襲的攻擊。"
	}
]);