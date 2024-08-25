let MoveList;
if(!MoveList) MoveList = []; 
module.exports.MoveList = MoveList;

Array.prototype.push.apply(MoveList, [
	{
		"name": "溶解液", "alias": "ようかいえき|Acid",
		"power": "2",
		"category": "special",
		"type": "Poison",
		"tags": ["target|l|allfoe", "dice|l|1", "frame|target|特防|down|1"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 2",
		"effect": "以所有範圍內的敵人为目标。骰 1 顆机率骰以降低目标的特防。",
		"desc": "寶可夢將腐蝕性酸液潑向敵人，灼燒感可能會为其他攻擊製造出破綻。"
	},
	{
		"name": "溶化", "alias": "とける|Acid Armor",
		"power": "-",
		"category": "support",
		"type": "Poison",
		"tags": ["target|l|self", "frame|self|防禦|up|2"],
		"accuracy": "特殊 + 自然",
		"damage": "-",
		"effect": "提升使用者的防禦。",
		"desc": "酸液流过寶可夢的身体，將其转變成液体一般的型態，这些酸液將能夠防止敵人对寶可夢进行全力攻擊。"
	},
	{
		"name": "酸液炸彈", "alias": "アシッドボム|Acid Spray",
		"power": "2",
		"category": "special",
		"type": "Poison",
		"tags": ["target|l|foe", "frame|target|特殊|down|2"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 2",
		"effect": "降低敵人的特殊。",
		"desc": "使用者吐出腐蝕性物质，灼燒感使对方无法專注在攻擊上。"
	},
	{
		"name": "碉堡", "alias": "トーチカ|Baneful Bunker",
		"power": "-",
		"category": "support",
		"type": "Poison",
		"tags": ["target|l|self", "frame|priority||up|4", "effect|l|shield", "frame|poison||always"],
		"accuracy": "活力 + 自然",
		"damage": "-",
		"effect": "先制招式。護盾。若敵人对使用者使用了非遠程的物理招式攻擊，则敵人將因此陷入「中毒」状態。敵人的傷害骰池將減少 3 顆骰子。",
		"desc": "使用者將自己封入堅硬、帶有毒刺的殼中。若毒刺螫中敵人的皮肤，傷口會受到感染。"
	},
	{
		"name": "打嗝", "alias": "ゲップ|Belch",
		"power": "5",
		"category": "special",
		"type": "Poison",
		"tags": ["target|l|foe", "frame|accuracy||down|1"],
		"accuracy": "特殊 + 導引",
		"damage": "特殊 + 5",
		"effect": "使用者必須在使用这个招式之前先吃点東西。",
		"desc": "使用者对目标打一个可怕的大嗝，空氣中瀰漫著的毒氣將造成嚴重的傷害。"
	},
	{
		"name": "清除之煙", "alias": "クリアスモッグ|Clear Smog",
		"power": "2",
		"category": "special",
		"type": "Poison",
		"tags": ["target|l|foe", "effect|l|neverfail"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 2",
		"effect": "必中。重置敵人身上的所有特质增益或減益。",
		"desc": "使用者吸入所有氣体以清除一切的雜质，目标將受到傷害並感到些微头暈。"
	},
	{
		"name": "盤蜷", "alias": "とぐろをまく|Coil",
		"power": "-",
		"category": "support",
		"type": "Poison",
		"tags": ["target|l|self", "frame|self|力量|up|1", "frame|self|防禦|up|1", "frame|self|命中|up|1"],
		"accuracy": "强壮 + 威吓",
		"damage": "-",
		"effect": "提升使用者的力量、防禦、和命中。",
		"desc": "寶可夢蜷缩自己的身体，做出冷靜但凶狠的姿態準備好发动攻擊。"
	},
	{
		"name": "十字毒刃", "alias": "クロスポイズン|Cross Poison",
		"power": "3",
		"category": "physical",
		"type": "Poison",
		"tags": ["target|l|foe", "effect|l|crit", "frame|poison||number|d1"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 3",
		"effect": "容易擊中要害。骰 1 顆机率骰以使敵人陷入「中毒」状態。",
		"desc": "寶可夢將毒素浸染自己的螯爪並凶暴地劈向敵人。"
	},
	{
		"name": "胃液", "alias": "いえき|Gastro Acid",
		"power": "-",
		"category": "support",
		"type": "Poison",
		"tags": ["target|l|foe"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "无效任何敵人的特性會产生的效果。这个效果將持續直到該場景结束。",
		"desc": "使用者吐出自己一部分的胃液，这种酸液將阻止对手使用自己的特殊能力。"
	},
	{
		"name": "垃圾射击", "alias": "ダストシュート|Gunk Shot",
		"power": "5",
		"category": "physical",
		"type": "Poison",
		"tags": ["target|l|foe", "frame|accuracy||down|2", "frame|poison||number|d3"],
		"accuracy": "力量 + 斗殴",
		"damage": "力量 + 5",
		"effect": "遠程攻擊。骰 3 顆机率骰以使敵人陷入「中毒」状態。",
		"desc": "寶可夢自己製造出最具毒性的物质來射出一連串帶有腐蝕性的垃圾。光是聞到臭味就會讓人感到十分不舒服。"
	},
	{
		"name": "劇毒牙", "alias": "どくどくのキバ|Poison Fang",
		"power": "2",
		"category": "physical",
		"type": "Poison",
		"tags": ["target|l|foe", "frame|poison2||number|d5"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 2",
		"effect": "骰 5 顆机率骰以使敵人陷入「劇毒」状態。",
		"desc": "寶可夢咬向敵人並透过自己的毒牙直接注入毒液。在这之后，牠只需要等待毒液慢慢收拾敵人就好。"
	},
	{
		"name": "毒瓦斯", "alias": "どくガス|Poison Gas",
		"power": "-",
		"category": "support",
		"type": "Poison",
		"tags": ["target|l|allfoe", "frame|accuracy||down|1", "frame|poison||always"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "以所有範圍內的敵人为目标。使目标陷入「中毒」状態。",
		"desc": "寶可夢釋放出庞大的毒氣雲霧，任何吸入的人都會开始劇烈咳嗽並且需要立即尋求醫療協助。"
	},
	{
		"name": "毒擊", "alias": "どくづき|Poison Jab",
		"power": "3",
		"category": "physical",
		"type": "Poison",
		"tags": ["target|l|foe", "frame|poison||number|d3"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 3",
		"effect": "骰 3 顆机率骰以使敵人陷入「中毒」状態。",
		"desc": "寶可夢用螫刺或觸手插入对手並注入毒液。"
	},
	{
		"name": "毒粉", "alias": "どくのこな|Poison Powder",
		"power": "-",
		"category": "support",
		"type": "Poison",
		"tags": ["target|l|foe", "frame|accuracy||down|2", "frame|poison||always"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "使敵人陷入「中毒」状態。",
		"desc": "使用者灑出一小片毒粉塵構成的雲霧，立即導致咳嗽和发燒。"
	},
	{
		"name": "毒針", "alias": "どくばり|Poison Sting",
		"power": "1",
		"category": "physical",
		"type": "Poison",
		"tags": ["target|l|foe", "frame|poison||number|d3"],
		"accuracy": "灵巧 + 導引",
		"damage": "力量 + 1",
		"effect": "遠程攻擊。骰 3 顆机率骰以使敵人陷入「中毒」状態。",
		"desc": "使用者射出细小的針來向对手注入毒素。"
	},
	{
		"name": "毒尾", "alias": "ポイズンテール|Poison Tail",
		"power": "2",
		"category": "physical",
		"type": "Poison",
		"tags": ["target|l|foe", "effect|l|crit", "frame|poison||number|d1"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 2",
		"effect": "容易擊中要害。骰 1 顆机率骰以使敵人陷入「中毒」状態。",
		"desc": "寶可夢的尾巴鋒利有如刀刃，牠劈砍进行攻擊，並能夠透过尾巴釋放毒素。"
	},
	{
		"name": "淨化", "alias": "じょうか|Purify",
		"power": "-",
		"category": "support",
		"type": "Poison",
		"tags": ["target|l|foe", "frame|heal|治療状態|always", "frame|heal||heal|1"],
		"accuracy": "特殊 + 自然",
		"damage": "-",
		"effect": "治療目标的異常状態，若你这么做，使用者將可以回復 1 HP。",
		"desc": "寶可夢的身体披覆著能用來治療異常状態的黏液，寶可夢也能將黏液当作某种營養來源。"
	},
	{
		"name": "污泥攻擊", "alias": "ヘドロこうげき|Sludge",
		"power": "2",
		"category": "special",
		"type": "Poison",
		"tags": ["target|l|foe", "frame|poison||number|d3"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 2",
		"effect": "骰 3 顆机率骰以使敵人陷入「中毒」状態。",
		"desc": "敵人身上覆蓋著噁心的污泥，散发出的恶臭和毒素會讓任何人感到噁心。"
	},
	{
		"name": "污泥炸彈", "alias": "ヘドロばくだん|Sludge Bomb",
		"power": "3",
		"category": "special",
		"type": "Poison",
		"tags": ["target|l|foe", "frame|poison||number|d3"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 3",
		"effect": "骰 3 顆机率骰以使敵人陷入「中毒」状態。",
		"desc": "使用者掷出一团有毒的污泥，在命中时爆炸並覆蓋在目标身上。"
	},
	{
		"name": "污泥波", "alias": "ヘドロウェーブ|Sludge Wave",
		"power": "3",
		"category": "special",
		"type": "Poison",
		"tags": ["target|l|area", "frame|poison||number|d1"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 3",
		"effect": "範圍攻擊。骰 1 顆机率骰以使目标陷入「中毒」状態。",
		"desc": "寶可夢创造出一道巨大的泥漿浪潮吞没浸泡周圍的一切，这味道可相当不好聞。"
	},
	{
		"name": "濁霧", "alias": "スモッグ|Smog",
		"power": "1",
		"category": "special",
		"type": "Poison",
		"tags": ["target|l|foe", "frame|accuracy||down|2", "frame|poison||number|d4"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 1",
		"effect": "骰 4 顆机率骰以使敵人陷入「中毒」状態。",
		"desc": "目标被一团噴出的肮脏氣体給攻擊。"
	},
	{
		"name": "劇毒", "alias": "どくどく|Toxic",
		"power": "-",
		"category": "support",
		"type": "Poison",
		"tags": ["target|l|foe", "frame|accuracy||down|1", "frame|poison2||always"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "使敵人陷入「劇毒」状態。",
		"desc": "透过噁心的飲食与鍛鍊，使用者学會如何將自己的体液转變成劇毒。"
	},
	{
		"name": "毒菱", "alias": "どくびし|Toxic Spikes",
		"power": "-",
		"category": "support",
		"type": "Poison",
		"tags": ["target|l|field", "frame|poison||always", "frame|poison2||number|d1"],
		"accuracy": "灵巧 + 隱匿",
		"damage": "-",
		"effect": "入場危害。敵方寶可夢在換上場时會陷入「中毒」状態，骰 1 顆机率骰以改使敵人陷入「劇毒」状態。",
		"desc": ""
	},
	{
		"name": "毒絲", "alias": "どくのいと|Toxic Thread",
		"power": "-",
		"category": "support",
		"type": "Poison",
		"tags": ["target|l|foe", "frame|target|灵巧|down|1", "frame|poison||always"],
		"accuracy": "灵巧 + 導引",
		"damage": "-",
		"effect": "降低敵人的灵巧。使敵人陷入「中毒」状態。",
		"desc": "使用者射出黏稠的絲線缠繞敵人，絲線上含有的毒素會讓碰到的敵人中毒。"
	},
	{
		"name": "毒液陷阱", "alias": "ベノムトラップ|Venom Drench",
		"power": "-",
		"category": "support",
		"type": "Poison",
		"tags": ["target|l|allfoe", "frame|target|力量|down|1", "frame|target|特殊|down|1", "frame|target|灵巧|down|1"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "以所有範圍內的敵人为目标。如果目标已经處於「中毒」或「劇毒」状態，则降低目标的力量、特殊、和灵巧。",
		"desc": "敵人被詭異的毒液給浸染，这种毒液會以牠們已经虚弱无力的免疫系統为目标。"
	},
	{
		"name": "毒液衝擊", "alias": "ベノムショック|Venoshock",
		"power": "2*",
		"category": "special",
		"type": "Poison",
		"tags": ["target|l|foe"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 2*",
		"effect": "如果敵人已经處於「中毒」或「劇毒」状態，则这个招式的傷害骰池额外增加 2 顆骰子。",
		"desc": "寶可夢射出一种特殊的毒液，如果敵人已经因为毒素而虚弱，则这种毒液將會产生更加劇烈的反應。"
	}
]);