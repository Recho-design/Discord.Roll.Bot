let MoveList;
if(!MoveList) MoveList = []; 
module.exports.MoveList = MoveList;

Array.prototype.push.apply(MoveList, [
	{
		"name": "攻擊指令", "alias": "こうげきしれい|Attack Order",
		"power": "3",
		"category": "physical",
		"type": "Bug",
		"tags": ["target|l|foe", "effect|l|crit"],
		"accuracy": "强壮 + 自然",
		"damage": "力量 + 3",
		"effect": "容易擊中要害。遠程攻擊。",
		"desc": "使用者召集她的蜂群並下令來对付你。不管你跑哪兒，牠們都會包圍你。希望你不會对蜜蜂过敏。"
	},
	{
		"name": "蟲咬", "alias": "Bug Bite|むしくい",
		"power": "2",
		"category": "physical",
		"type": "Bug",
		"tags": ["target|l|foe"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 2",
		"effect": "如果目标寶可夢持有樹果，使用者會吃掉它並得到樹果的效果。",
		"desc": "寶可夢囓咬牠的敵人，一旦发现了什么好吃的就會立刻吃掉。它可能會嘗试吃掉任何東西。"
	},
	{
		"name": "蟲鳴", "alias": "むしのさざめき|Bug Buzz",
		"power": "3",
		"category": "special",
		"type": "Bug",
		"tags": ["target|l|foe", "effect|l|sound", "dice|l|1", "frame|target|特防|down|1"],
		"accuracy": "特殊 + 表演",
		"damage": "特殊 + 2",
		"effect": "聲音类招式。骰 1 顆机率骰以降低敵人的特防。",
		"desc": "寶可夢使用牠的翅膀或其他身体部分來製造出能傷害並影響目标的聲波。"
	},
	{
		"name": "防禦指令", "alias": "ぼうぎょしれい|Defend Order",
		"power": "-",
		"category": "support",
		"type": "Bug",
		"tags": ["target|l|self", "frame|self|防禦|up|1", "frame|self|特防|up|1"],
		"accuracy": "强壮 + 自然",
		"damage": "-",
		"effect": "使用者提升自己的防禦和特防。",
		"desc": "一大群飛蟲环繞在使用者身边，为这隻寶可夢创造出一个屏障以抵禦傷害。"
	},
	{
		"name": "致命針刺", "alias": "とどめばり|Fell Stinger",
		"power": "1",
		"category": "physical",
		"type": "Bug",
		"tags": ["target|l|foe", "frame|self|力量|up|1"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 1",
		"effect": "如果敵人因为这次攻擊的傷害而陷入瀕死状態，则提高使用者的力量。",
		"desc": "寶可夢刺擊目标，如果敵人虚弱到无法移动，牠將吸取敵人一部分的力量。"
	},
	{
		"name": "迎头一擊", "alias": "であいがしら|First Impression",
		"power": "3",
		"category": "physical",
		"type": "Bug",
		"tags": ["target|l|foe", "frame|priority|優先度|up|2"],
		"accuracy": "力量 + 威吓",
		"damage": "力量 + 3",
		"effect": "先制招式。这个招式只在該寶可夢進入戰鬥后的第一輪有效。從第二輪开始，这个招式自动失败。",
		"desc": "寶可夢戏劇性地進入戰鬥場地，使牠的敵人驚訝於牠真正的对手究竟是誰。"
	},
	{
		"name": "連斬", "alias": "れんぞくぎり|Fury Cutter",
		"power": "1",
		"category": "physical",
		"type": "Bug",
		"tags": ["target|l|foe", "effect|l|sact_5"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 1",
		"effect": "連續行动。",
		"desc": "寶可夢使用牠的爪子或鐮肢盡可能地做出多次斬擊。"
	},
	{
		"name": "回復指令", "alias": "かいふくしれい|Heal Order",
		"power": "-",
		"category": "support",
		"type": "Bug",
		"tags": ["target|l|self", "effect|l|heal"],
		"accuracy": "强壮 + 自然",
		"damage": "-",
		"effect": "基礎治癒。",
		"desc": "寶可夢命令牠的蜂群为牠帶來一些治癒蜂蜜。"
	},
	{
		"name": "死缠烂打", "alias": "まとわりつく|Infestation",
		"power": "1",
		"category": "special",
		"type": "Bug",
		"tags": ["target|l|foe", "effect|l|block"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 1",
		"effect": "阻擋。每个戰鬥輪结束时，骰 2 顆傷害骰以对敵人造成傷害。持續 4 輪。",
		"desc": "寶可夢召喚大群蟲子來阻止敵人逃跑。有时蟲群能夠傷害到敵人。这个呼喚能擴及百碼之遠。"
	},
	{
		"name": "吸血", "alias": "きゅうけつ|Leech Life",
		"power": "3",
		"category": "physical",
		"type": "Bug",
		"tags": ["target|l|foe"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 3",
		"effect": "使用者回復等同於造成傷害一半的HP（尾数捨去）。",
		"desc": "使用者攻擊敵人的弱点並吸取牠的生命力。"
	},
	{
		"name": "猛撲", "alias": "とびかかる|Lunge",
		"power": "3",
		"category": "physical",
		"type": "Bug",
		"tags": ["target|l|foe", "frame|target|力量|down|1"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 3",
		"effect": "降低敵人的力量。",
		"desc": "使用者全力向敵人衝鋒，不僅將对方撞倒，還能用牠的許多肢体束縛敵人"
	},
	{
		"name": "超级角擊", "alias": "メガホーン|Megahorn",
		"power": "5",
		"category": "physical",
		"type": "Bug",
		"tags": ["target|l|foe", "frame|accuracy|命中|down|2", "effect|l|lethal"],
		"accuracy": "力量 + 斗殴",
		"damage": "力量 + 5",
		"effect": "致命傷害。",
		"desc": "寶可夢用牠强壮的角來穿刺敵人並且造成巨量傷害。"
	},
	{
		"name": "飛彈針", "alias": "ミサイルばり|Pin Missile",
		"power": "1",
		"category": "physical",
		"type": "Bug",
		"tags": ["target|l|foe", "effect|l|sact_5"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 1",
		"effect": "遠程攻擊，連續行动。",
		"desc": "寶可夢用下雨般密集的螫針或棘刺像針一般貫穿敵人。"
	},
	{
		"name": "花粉团", "alias": "かふんだんご|Pollen Puff",
		"power": "3*",
		"category": "special",
		"type": "Bug",
		"tags": ["target|l|foe", "target|l|ally", "frame|heal|治療|heal|1"],
		"accuracy": "特殊 + 導引",
		"damage": "特殊 + 3",
		"effect": "*若对隊友使用这个招式，则改为回復 1 点HP，而非造成傷害。",
		"desc": "寶可夢製造出一团花粉並丟到敵人脸上炸开，使对方陷入可怕的过敏反應。当吃下这团花粉时會发现它又甜又有營養。"
	},
	{
		"name": "粉塵", "alias": "ふんじん|Powder",
		"power": "-",
		"category": "support",
		"type": "Bug",
		"tags": ["target|l|foe"],
		"accuracy": "洞察 + 自然",
		"damage": "-",
		"effect": "下一个命中該目标的火属性招式，其傷害將會增加 3 顆傷害骰。",
		"desc": "敵人被易燃的粉塵覆蓋全身，一小搓火源就會將其点燃並引发爆炸。"
	},
	{
		"name": "蝶舞", "alias": "ちょうのまい|Quiver Dance",
		"power": "-",
		"category": "support",
		"type": "Bug",
		"tags": ["target|l|self", "frame|self|灵巧|up|1", "frame|self|特殊|up|1", "frame|self|特防|up|1"],
		"accuracy": "美丽 + 表演",
		"damage": "-",
		"effect": "提升使用者的灵巧、特殊、和特防。",
		"desc": "神秘而優美的舞蹈提升了寶可夢的敏捷和專注。"
	},
	{
		"name": "憤怒粉", "alias": "いかりのこな|Rage Powder",
		"power": "-",
		"category": "support",
		"type": "Bug",
		"tags": ["target|l|self", "frame|priority|優先度|up|2"],
		"accuracy": "洞察 + 威吓",
		"damage": "-",
		"effect": "在这个戰鬥輪期间，所有敵人使用的傷害招式都必須以使用者为目标。",
		"desc": "寶可夢釋放一种刺激性粉塵來惹惱並激怒敵人进行攻擊。"
	},
	{
		"name": "信號光束", "alias": "シグナルビーム|Signal Beam",
		"power": "3",
		"category": "special",
		"type": "Bug",
		"tags": ["target|l|foe", "frame|confuse|混亂|number|d1"],
		"accuracy": "特殊 + 導引",
		"damage": "特殊 + 3",
		"effect": "骰 1 顆机率骰以使敵人陷入「混亂」状態。",
		"desc": "使用者发出一道强光來傷害敵人，並可能使敵人像飛蛾一樣目眩。"
	},
	{
		"name": "銀色旋風", "alias": "ぎんいろのかぜ|Silver Wind",
		"power": "2",
		"category": "special",
		"type": "Bug",
		"tags": ["target|l|foe", "frame|self|力量|up|1", "frame|self|灵巧|up|1", "frame|self|特殊|up|1", "frame|self|防禦|up|1", "frame|self|特防|up|1"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 2",
		"effect": "骰 1 顆机率骰以提升使用者的力量、灵巧、特殊、防禦、和特防。",
		"desc": "寶可夢吹出一陣美丽的銀色旋風來傷害敵人，这場表演也許會大大激发使用者的自信。"
	},
	{
		"name": "蛛網", "alias": "クモのす|Spider Web",
		"power": "-",
		"category": "support",
		"type": "Bug",
		"tags": ["target|l|field", "effect|l|block"],
		"accuracy": "洞察 + 隱匿",
		"damage": "-",
		"effect": "阻擋。",
		"desc": "使用者悄悄地在場地上釋放了一面蛛網。所有的敵人都將被困住。"
	},
	{
		"name": "疯狂滾壓", "alias": "ハードローラー|Steamroller",
		"power": "2",
		"category": "physical",
		"type": "Bug",
		"tags": ["target|l|foe", "frame|flinch|畏缩|number|d3"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 2",
		"effect": "骰 3 顆机率骰以使敵人陷入「畏缩」状態。",
		"desc": "使用者蜷起身体並以全速滾壓敵人。这可能使目标被碾在地上。"
	},
	{
		"name": "黏黏網", "alias": "ねばねばネット|Sticky Web",
		"power": "-",
		"category": "support",
		"type": "Bug",
		"tags": ["target|l|field", "frame|target|灵巧|down|1"],
		"accuracy": "洞察 + 自然",
		"damage": "-",
		"effect": "入場危害。敵方寶可夢在進入戰場时會降低灵巧。具有漂浮特性或飛行属性的寶可夢免疫这个效果。",
		"desc": "寶可夢快速地用黏性蛛網覆蓋整个場地，新進場的敵人將會难以輕易动彈。"
	},
	{
		"name": "吐絲", "alias": "いとをはく|String Shot",
		"power": "-",
		"category": "support",
		"type": "Bug",
		"tags": ["target|l|foe", "frame|target|灵巧|down|1"],
		"accuracy": "洞察 + 自然",
		"damage": "-",
		"effect": "降低目标的灵巧。",
		"desc": "使用者吐出絲線缠繞並限制敵人的移动。"
	},
	{
		"name": "蟲之抵抗", "alias": "むしのていこう|Struggle Bug",
		"power": "1",
		"category": "physical",
		"type": "Bug",
		"tags": ["target|l|foe", "frame|target|特殊|down|1"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 1",
		"effect": "降低敵人的特殊。",
		"desc": "这隻寶可夢躺臥著与敵人掙扎搏鬥，分散敵人的注意力。"
	},
	{
		"name": "螢火", "alias": "ほたるび|Tail Glow",
		"power": "-",
		"category": "support",
		"type": "Bug",
		"tags": ["target|l|self", "frame|self|特殊|up|3"],
		"accuracy": "洞察 + 自然",
		"damage": "-",
		"effect": "提升使用者的特殊。",
		"desc": "使用者发出一道强光。这隻寶可夢會盯著牠的光亮並進入出神状態。"
	},
	{
		"name": "双針", "alias": "ダブルニードル|Twineedle",
		"power": "1",
		"category": "physical",
		"type": "Bug",
		"tags": ["target|l|foe", "effect|l|sact_2", "frame|poison|中毒|number|d2"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 1",
		"effect": "双重行动。遠程攻擊。每次命中时骰 2 顆机率骰以使敵人陷入「中毒」状態。",
		"desc": "寶可夢用牠藏毒的棘刺、利爪、或螫針刺向敵人。"
	},
	{
		"name": "急速折返", "alias": "とんぼがえり|U-turn",
		"power": "3",
		"category": "physical",
		"type": "Bug",
		"tags": ["target|l|foe", "effect|l|switcher"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 3",
		"effect": "替換招式。使用者在造成傷害之后被換下場，替換的寶可夢將在有所準備的状況下上場，掷骰決定牠的先攻。",
		"desc": "使用者擊打敵人，然后快速撤退至安全區域，讓隊伍中的另一隻寶可夢頂替牠的位置。"
	},
	{
		"name": "十字剪", "alias": "シザークロス|X-Scissor",
		"power": "3",
		"category": "physical",
		"type": "Bug",
		"tags": ["target|l|foe"],
		"accuracy": "力量 + 斗殴",
		"damage": "力量 + 3",
		"desc": "寶可夢用牠那像剪刀一般的鐮肢或利爪來剪斷敵人。"
	}
]);