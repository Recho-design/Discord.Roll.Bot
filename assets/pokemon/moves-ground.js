let MoveList;
if(!MoveList) MoveList = []; 
module.exports.MoveList = MoveList;

Array.prototype.push.apply(MoveList, [
	{
		"name": "骨棒", "alias": "ホネこんぼう|Bone Club",
		"power": "2",
		"category": "physical",
		"type": "Ground",
		"tags": ["target|l|foe", "frame|accuracy||down|2", "frame|flinch||number|d2"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 2",
		"effect": "骰 2 顆机率骰以使敵人陷入「畏缩」状態。",
		"desc": "使用者用骨头狠狠擊打目标，可能會在目标头上留下一个腫包。"
	},
	{
		"name": "骨棒亂打", "alias": "ボーンラッシュ|Bone Rush",
		"power": "1",
		"category": "physical",
		"type": "Ground",
		"tags": ["target|l|foe", "frame|accuracy||down|1", "effect|l|sact_5"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 1",
		"effect": "連續行动。",
		"desc": "使用者使用骨棒迅速地擊打敵人，一下接著一下，接連不斷。"
	},
	{
		"name": "骨头迴力鏢", "alias": "ホネブーメラン|Bonemerang",
		"power": "2",
		"category": "physical",
		"type": "Ground",
		"tags": ["target|l|foe", "frame|accuracy||down|1", "effect|l|sact_2"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 2",
		"effect": "遠程攻擊。双重行动。",
		"desc": "寶可夢扔出一根骨头擊打敵人。骨头像會像回力鏢一樣，攻擊两次。"
	},
	{
		"name": "重踏", "alias": "じならし|Bulldoze",
		"power": "2",
		"category": "physical",
		"type": "Ground",
		"tags": ["target|l|area", "frame|target|灵巧|down|1"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 2",
		"effect": "範圍攻擊。降低目标的灵巧。",
		"desc": "使用者用力踩踏地面，踏碎石头、樹木和附近的一切。"
	},
	{
		"name": "挖洞", "alias": "あなをほる|Dig",
		"power": "3",
		"category": "physical",
		"type": "Ground",
		"tags": ["target|l|foe", "effect|l|charge"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 3",
		"effect": "蓄力招式。当这个招式在蓄力时，使用者將脫離招式的影響範圍。但是〈地震〉、〈震级〉和其他类似招式仍然可以命中使用者。",
		"desc": "使用者在地上挖出一条通向地下的通道，並從地底冒出攻擊。"
	},
	{
		"name": "直衝鑽", "alias": "ドリルライナー|Drill Run",
		"power": "3",
		"category": "physical",
		"type": "Ground",
		"tags": ["target|l|foe", "effect|l|crit"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 3",
		"effect": "容易擊中要害。",
		"desc": "使用者旋转身体，如同鑽头一樣撞向敵人。这种攻擊可以輕松而精確地穿透牆壁和地板。"
	},
	{
		"name": "大地之力", "alias": "だいちのちから|Earth Power",
		"power": "3",
		"category": "special",
		"type": "Ground",
		"tags": ["target|l|foe", "dice|l|1", "frame|target|特防|down|1"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 3",
		"effect": "骰 1 顆机率骰以降低敵人的特防。",
		"desc": "使用者送出一股從地底傳導的震动波，並在地面上的目标腳下迸发出來。仿佛地面就是按照寶可夢的意願而塑造的一樣。"
	},
	{
		"name": "地震", "alias": "じしん|Earthquake",
		"power": "4",
		"category": "physical",
		"type": "Ground",
		"tags": ["target|l|area"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 4",
		"effect": "範圍攻擊。遠程攻擊。",
		"desc": "寶可夢集中力量震动地面，周圍的所有人都會像布娃娃一樣搖搖晃晃。"
	},
	{
		"name": "地裂", "alias": "じわれ|Fissure",
		"power": "-",
		"category": "physical",
		"type": "Ground",
		"tags": ["target|l|foe", "frame|accuracy||down|5"],
		"accuracy": "力量 + 斗殴",
		"damage": "-",
		"effect": "直接造成等同於目标剩餘HP的傷害，外加 1 点致命傷害。",
		"desc": "使用者用恐怖的力量震裂地面，如果敵人掉進裂縫中，可能需要派出一整个救援隊才能把牠救出來。"
	},
	{
		"name": "十萬馬力", "alias": "１０まんばりき|High Horsepower",
		"power": "3",
		"category": "physical",
		"type": "Ground",
		"tags": ["target|l|foe"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 3",
		"desc": "寶可夢衝向牠的目标，毫不留情地踐踏对方。"
	},
	{
		"name": "大地神力", "alias": "グランドフォース|Land's Wrath",
		"power": "3",
		"category": "physical",
		"type": "Ground",
		"tags": ["target|l|allfoe", "effect|l|lethal"],
		"accuracy": "力量 + 導引",
		"damage": "力量 + 3",
		"effect": "致命傷害。遠程攻擊。以所有範圍內的敵人为目标。",
		"desc": "視野內没有攻擊者，大地卻自己震动起來。地层崩塌，地表塌陷吞噬它的受害者。废墟之中，茂盛的大樹會在短时间之后长成。"
	},
	{
		"name": "震级", "alias": "マグニチュード|Magnitude",
		"power": "*",
		"category": "physical",
		"type": "Ground",
		"tags": ["target|l|area"],
		"accuracy": "灵巧 + 導引",
		"damage": "力量 + 不定",
		"effect": "遠程攻擊。骰 1 顆骰子來決定这个招式的威力。",
		"desc": "使用者震动那裡的地面板塊。有些板塊會比其他板塊更容易松动。"
	},
	{
		"name": "泥巴炸彈", "alias": "どろばくだん|Mud Bomb",
		"power": "2",
		"category": "special",
		"type": "Ground",
		"tags": ["target|l|foe", "frame|accuracy||down|2", "dice|l|3", "frame|target|命中|down|1"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 2",
		"effect": "骰 3 顆机率骰以降低敵人的命中。",
		"desc": "寶可夢射出一顆由泥漿製成的球來攻擊目标，这些泥漿可能會濺到牠的眼睛上。"
	},
	{
		"name": "泥巴射击", "alias": "マッドショット|Mud Shot",
		"power": "2",
		"category": "special",
		"type": "Ground",
		"tags": ["target|l|foe", "frame|target|灵巧|down|1"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 2",
		"effect": "降低敵人的灵巧。",
		"desc": "寶可夢射出一道泥漿覆蓋目标的身体，妨礙牠的行动。"
	},
	{
		"name": "掷泥", "alias": "どろかけ|Mud-Slap",
		"power": "1",
		"category": "special",
		"type": "Ground",
		"tags": ["target|l|foe", "frame|target|命中|down|1"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 1",
		"effect": "降低敵人的命中。",
		"desc": "使用者往敵人的脸上投掷泥巴，使牠无法清楚看見。"
	},
	{
		"name": "玩泥巴", "alias": "どろあそび|Mud Sport",
		"power": "-",
		"category": "support",
		"type": "Ground",
		"tags": ["target|l|field"],
		"accuracy": "特殊 + 自然",
		"damage": "-",
		"effect": "在接下來 4 个戰鬥輪期间，電属性攻擊的傷害骰池將无法獲得其招式威力的加值。",
		"desc": "使用者用泥巴覆蓋所有東西，降低場上電属性攻擊的效果。"
	},
	{
		"name": "斷崖之剑", "alias": "だんがいのつるぎ|Precipice Blades",
		"power": "5",
		"category": "physical",
		"type": "Ground",
		"tags": ["target|l|allfoe", "frame|accuracy||down|2", "effect|l|lethal"],
		"accuracy": "力量 + 導引",
		"damage": "力量 + 5",
		"effect": "致命傷害。遠程攻擊。",
		"desc": "使用者每走一步，就會有巨大的石刃從地面迸出。如果你不小心被命中，那幾乎不可能存活下來。"
	},
	{
		"name": "耕地", "alias": "たがやす|Rototiller",
		"power": "-",
		"category": "support",
		"type": "Ground",
		"tags": ["target|l|field", "frame|self|力量|up|1", "frame|self|特殊|up|1", "frame|target|力量|up|1", "frame|target|特殊|up|1"],
		"accuracy": "特殊 + 自然",
		"damage": "-",
		"effect": "提升戰場上所有草属性寶可夢的力量和特殊。",
		"desc": "寶可夢四處挖掘，翻耕土壤，使其成为植物生长的理想場所。"
	},
	{
		"name": "潑沙", "alias": "すなかけ|Sand Attack",
		"power": "-",
		"category": "support",
		"type": "Ground",
		"tags": ["target|l|foe", "frame|target|命中|down|1"],
		"accuracy": "灵巧 + 導引",
		"damage": "-",
		"effect": "敵人的所有命中判定將被扣除 1 顆成功骰。",
		"desc": "使用者撥起沙子射向敵人的眼睛。"
	},
	{
		"name": "流沙地獄", "alias": "すなじごく|Sand Tomb",
		"power": "2",
		"category": "physical",
		"type": "Ground",
		"tags": ["target|l|foe", "frame|accuracy||down|2", "effect|l|block"],
		"accuracy": "灵巧 + 導引",
		"damage": "力量 + 2",
		"effect": "遠程攻擊。阻擋。每个戰鬥輪结束时，骰 2 顆傷害骰以对敵人造成傷害。持續 4 輪。",
		"desc": "寶可夢在敵人周圍製造一个流沙坑，使牠无法逃脫。"
	},
	{
		"name": "集沙", "alias": "すなあつめ|Shore Up",
		"power": "-",
		"category": "support",
		"type": "Ground",
		"tags": ["target|l|self", "effect|l|heal"],
		"accuracy": "洞察 + 自然",
		"damage": "-",
		"effect": "基礎治癒。如果当前天氣状態为沙暴，则这个招式變为 强效治癒。",
		"desc": "寶可夢在自己的身边聚集沙子來重塑身体。"
	},
	{
		"name": "撒菱", "alias": "まきびし|Spikes",
		"power": "-",
		"category": "support",
		"type": "Ground",
		"tags": ["target|l|field"],
		"accuracy": "特殊 + 自然",
		"damage": "-",
		"effect": "入場危害。敵方寶可夢在換上場时會失去 1 点HP，这个效果不會疊加。飛行属性或飄浮特性的寶可夢免疫这个效果。",
		"desc": "寶可夢往敵人周圍的場地射出尖銳的石子或荊棘，对任何出場的敵人造成損害。"
	},
	{
		"name": "跺腳", "alias": "じだんだ|Stomping Tantrum",
		"power": "3*",
		"category": "physical",
		"type": "Ground",
		"tags": ["target|l|foe"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 3*",
		"effect": "如果使用者上次施展的招式的命中判定失败，则这个招式的傷害骰池將额外增加 2 顆骰子。",
		"desc": "寶可夢四處撒氣，如果之前有什么事情讓牠沮喪，牠的脾氣就會變得更糟。"
	},
	{
		"name": "千箭齐发", "alias": "サウザンアロー|Thousand Arrows",
		"power": "3",
		"category": "physical",
		"type": "Ground",
		"tags": ["target|l|allfoe", "effect|l|lethal"],
		"accuracy": "力量 + 導引",
		"damage": "力量 + 3",
		"effect": "致命傷害。遠程攻擊。若成功，在这个場景期间，飛行属性或飄浮特性的寶可夢將能夠被地面属性的招式命中。",
		"desc": "不知從何處射出的密密麻麻的尖銳碎片，從空中朝著敵人們如雨般落下，就算是在空中的生物們在被擊中后也會摔落到地面上。找个掩護吧，这還挺疼的。"
	},
	{
		"name": "千波激盪", "alias": "サウザンウェーブ|Thousand Waves",
		"power": "3",
		"category": "physical",
		"type": "Ground",
		"tags": ["target|l|allfoe", "effect|l|block"],
		"accuracy": "特殊 + 斗殴",
		"damage": "力量 + 3",
		"effect": "阻擋。遠程攻擊。以所有範圍內的敵人为目标。",
		"desc": "固体地表化成了流沙，裂开的土壤逐步接近並拉住你的腿，就彷彿这片大地本身想要困住你一樣。視線內完全看不見攻擊者或任何的逃跑路線。"
	}
]);