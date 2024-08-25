let MoveList;
if(!MoveList) MoveList = []; 
module.exports.MoveList = MoveList;

Array.prototype.push.apply(MoveList, [
	{
		"name": "芳香薄霧", "alias": "アロマミスト|Aromatic Mist",
		"power": "-",
		"category": "support",
		"type": "Fairy",
		"tags": ["target|l|ally", "frame|self|防禦|up|1", "frame|self|特防|up|1"],
		"accuracy": "洞察 + 自然",
		"damage": "-",
		"effect": "提升一名隊友的防禦和特防。",
		"desc": "寶可夢使一位同伴沐浴在能振奮精神的香氣中。"
	},
	{
		"name": "圓瞳", "alias": "つぶらなひとみ|Baby-Doll Eyes",
		"power": "-",
		"category": "support",
		"type": "Fairy",
		"tags": ["target|l|foe", "frame|priority|優先度|up|1", "frame|target|力量|down|1"],
		"accuracy": "可愛 + 誘惑",
		"damage": "-",
		"effect": "先制招式。降低敵人的力量。",
		"desc": "在戰鬥中的任何人採取行动前，使用者用牠最可愛的眼神注視著敵人。"
	},
	{
		"name": "撒娇", "alias": "あまえる|Charm",
		"power": "-",
		"category": "support",
		"type": "Fairy",
		"tags": ["target|l|foe"],
		"accuracy": "可愛 + 誘惑",
		"damage": "-",
		"effect": "降低敵人的力量。",
		"desc": "寶可夢利用可愛与无害的態度使敵人降低了警惕与攻擊性。"
	},
	{
		"name": "戏法防守", "alias": "トリックガード|Crafty Shield",
		"power": "-",
		"category": "support",
		"type": "Fairy",
		"tags": ["target|l|allally", "frame|priority|優先度|up|3", "effect|l|shield"],
		"accuracy": "洞察 + 自然",
		"damage": "-",
		"effect": "先制招式。護盾。使用者和牠的同伴們都不會受到變化招式的影響。",
		"desc": "寶可夢创造出一面魔法盾來保護所有人免受敵人的阴謀詭计。在这面盾牌后，所有人都能看穿謊言和邪恶的意圖。"
	},
	{
		"name": "魔法闪耀", "alias": "マジカルシャイン|Dazzling Gleam",
		"power": "3",
		"category": "special",
		"type": "Fairy",
		"tags": ["target|l|allfoe"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 3",
		"effect": "以所有範圍內的敵人为目标。",
		"desc": "使用者如同强光一樣闪耀，使所有看著牠的人們的眼睛受傷。"
	},
	{
		"name": "装飾", "alias": "デコレーション|Decorate",
		"power": "-",
		"category": "support",
		"type": "Fairy",
		"tags": ["target|l|ally", "frame|self|力量|up|2", "frame|self|特殊|up|2"],
		"accuracy": "美丽 + 自然",
		"damage": "-",
		"effect": "提升一个隊友的力量和特殊。",
		"desc": "寶可夢使用一些糖霜來装飾牠的夥伴，使牠看起來更大、更强、且无比美味！"
	},
	{
		"name": "魅惑之聲", "alias": "チャームボイス|Disarming Voice",
		"power": "2",
		"category": "special",
		"type": "Fairy",
		"tags": ["target|l|allfoe", "effect|l|sound", "effect|l|neverfail"],
		"accuracy": "洞察 + 表演",
		"damage": "特殊 + 2",
		"effect": "聲音类招式。必中。以所有範圍內的敵人为目标。",
		"desc": "使用者透过魅惑而动人的哭聲，对牠的对手造成情感上的傷害。这个招式总能讓目标感到难受。"
	},
	{
		"name": "吸取之吻", "alias": "ドレインキッス|Draining Kiss",
		"power": "2",
		"category": "special",
		"type": "Fairy",
		"tags": ["target|l|foe"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 2",
		"effect": "使用者回復等同造成傷害数值一半的HP，向下取整。",
		"desc": "使用者送出一个挑逗般的吻，敵人接住了这个飛吻卻因此被吸取了能量。"
	},
	{
		"name": "妖精之锁", "alias": "フェアリーロック|Fairy Lock",
		"power": "-",
		"category": "support",
		"type": "Fairy",
		"tags": ["target|l|field", "effect|l|block"],
		"accuracy": "洞察 + 自然",
		"damage": "-",
		"effect": "阻擋。持續一輪。",
		"desc": "使用者做出如同锁門一樣的动作。过了一會兒大家才會意識到自己不是真的被困住了。"
	},
	{
		"name": "妖精之風", "alias": "ようせいのかぜ|Fairy Wind",
		"power": "2",
		"category": "special",
		"type": "Fairy",
		"tags": ["target|l|foe"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 2",
		"desc": "寶可夢利用一陣披戴仙塵的强風造成打擊。这會導致发癢。"
	},
	{
		"name": "花朵加農炮", "alias": "フルールカノン|Fleur Cannon",
		"power": "6",
		"category": "special",
		"type": "Fairy",
		"tags": ["target|l|foe", "frame|accuracy|命中|down|1", "effect|l|lethal", "frame|self|特殊|down|2"],
		"accuracy": "特殊 + 導引",
		"damage": "特殊 + 6",
		"effect": "致命傷害。降低使用者的特殊。",
		"desc": "一道光束穿透戰場，它將造成毀滅性的傷害，但會留下新开的花朵而非焦土。使用者在这之后將感到異常疲憊。"
	},
	{
		"name": "花療", "alias": "ラワーヒール Floral Healing",
		"power": "-",
		"category": "support",
		"type": "Fairy",
		"tags": ["target|l|ally", "effect|l|heal"],
		"accuracy": "洞察 + 自然",
		"damage": "-",
		"effect": "基礎治癒。若場地處於青草場地状態，则这个招式變为 强效治癒。",
		"desc": "使用者做出一个能治癒佩戴者並使其感到放松的花环。在適当的条件下，这个招式還會创造出一个环繞著目标的花圃。"
	},
	{
		"name": "鮮花防守", "alias": "フラワーガード|Flower Shield",
		"power": "-",
		"category": "support",
		"type": "Fairy",
		"tags": ["target|l|field", "frame|target|防禦|up|1", "frame|self|防禦|up|1"],
		"accuracy": "洞察 + 自然",
		"damage": "-",
		"effect": "提升場地上所有草属性寶可夢的防禦。",
		"desc": "寶可夢使用神秘的力量使每个草属性寶可夢的身边开满鮮花。場地上的鮮花显得更具活力且美丽。"
	},
	{
		"name": "大地掌控", "alias": "ジオコントロール|Geomancy",
		"power": "-",
		"category": "support",
		"type": "Fairy",
		"tags": ["target|l|self", "effect|l|charge", "frame|self|灵巧|up|2", "frame|self|特殊|up|2", "frame|self|特防|up|2"],
		"accuracy": "洞察 + 自然",
		"damage": "-",
		"effect": "蓄力招式。使用者在蓄力后，接著在牠的下个回合使自己的灵巧、特殊、和特防各提升 2 点。",
		"desc": "透过一道神秘的联繫，寶可夢汲取大地的生命力量來增强自己的能力。"
	},
	{
		"name": "破滅之光", "alias": "はめつのひかり|Light of Ruin",
		"power": "6",
		"category": "special",
		"type": "Fairy",
		"tags": ["target|l|foe", "frame|accuracy|命中|down|1", "effect|l|lethal", "effect|l|recoil"],
		"accuracy": "特殊 + 導引",
		"damage": "特殊 + 6",
		"effect": "致命傷害。反作用力傷害。",
		"desc": "從永恆之花中汲取能量，寶可夢宣洩出牠所有的傷痛。一道美丽的光芒將會籠罩这片區域，但牠內心的痛苦依然存在。"
	},
	{
		"name": "薄霧場地", "alias": "ミストフィールド|Misty Terrain",
		"power": "-",
		"category": "support",
		"type": "Fairy",
		"tags": ["target|l|field"],
		"accuracy": "洞察 + 自然",
		"damage": "-",
		"effect": "站在戰場上的生物全都不會受到異常状態的影響。龍属性攻擊的傷害骰池无法獲得其招式威力的加值。持續 4 輪。",
		"desc": "使用者使戰場上环繞著一陣能讓人感到被保護的神秘迷霧。龍属性寶可夢將會感到有些不自在。"
	},
	{
		"name": "月亮之力", "alias": "ムーンフォース|Moonblast",
		"power": "3",
		"category": "special",
		"type": "Fairy",
		"tags": ["target|l|foe", "dice|l|3", "frame|target|特殊|down|1"],
		"accuracy": "特殊 + 導引",
		"damage": "特殊 + 3",
		"effect": "骰 3 顆机率骰以降低敵人的特殊。",
		"desc": "直接從月亮召喚力量，寶可夢使用光束射向敵人。"
	},
	{
		"name": "月光", "alias": "つきのひかり|Moonlight",
		"power": "-",
		"category": "support",
		"type": "Fairy",
		"tags": ["target|l|self", "effect|l|heal"],
		"accuracy": "洞察 + 自然",
		"damage": "-",
		"effect": "基礎治癒。若成功，则消耗 1 点意志点以使其生效。如果在夜晚、或当前天氣状態为大晴天，则这个招式變为 强效治癒。如果当前天氣状態为下雨或沙暴，则这个招式只會回復 1 点HP。",
		"desc": "使用者匯聚來自月光的力量，被吸收的能量將能夠治癒大部分的傷勢。"
	},
	{
		"name": "自然之怒", "alias": "しぜんのいかり|Nature's Madness",
		"power": "*",
		"category": "special",
		"type": "Fairy",
		"tags": ["target|l|foe", "frame|accuracy|命中|down|1"],
		"accuracy": "洞察 + 自然",
		"damage": "不定",
		"effect": "这个招式的傷害骰池等同於敵人剩餘HP的一半（最多10，向下取整）。如果敵人的剩餘HP只剩下 1 点，则这个招式自动失败。这个招式无視敵人的防禦和特防。",
		"desc": "大自然的力量发起攻勢，就仿佛它們有著自己的意志。水會嘗试淹没你，植物會困住你，闪電會從不知何處劈向你，甚至連你自己的身体都會背叛你。"
	},
	{
		"name": "嬉鬧", "alias": "じゃれつく|Play Rough",
		"power": "3",
		"category": "physical",
		"type": "Fairy",
		"tags": ["target|l|foe", "frame|accuracy|命中|down|1", "dice|l|1", "frame|target|力量|down|1"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 3",
		"effect": "骰 1 顆机率骰以降低敵人的力量。",
		"desc": "使用者和敵人开始玩鬧般的摔跤，但情況很快就變得不太妙。"
	},
	{
		"name": "亮亮風暴", "alias": "きらきらストーム|Sparkly Swirl",
		"power": "3",
		"category": "special",
		"type": "Fairy",
		"tags": ["target|l|foe", "frame|accuracy|命中|down|1", "target|l|allally", "frame|heal|治療状態|always"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 3",
		"effect": "若成功，治療使用者和所有隊友的所有異常状態。如果这个招式的使用者處於最終進化階段，则这个招式自动失败。",
		"desc": "寶可夢釋放出一陣闪亮亮，帶著好聞香味的能量風暴，能舒緩身体疲勞並具有治癒能力。"
	},
	{
		"name": "灵魂衝擊", "alias": "ソウルクラッシュ|Spirit Break",
		"power": "2",
		"category": "physical",
		"type": "Fairy",
		"tags": ["target|l|foe", "frame|target|特殊|down|1"],
		"accuracy": "洞察 + 斗殴",
		"damage": "力量 + 2",
		"effect": "若成功，降低敵人的力量。",
		"desc": "有时候言语比物理打擊更傷人，而这个招式两者兼具。"
	},
	{
		"name": "神奇蒸汽", "alias": "ワンダースチーム|Strange Steam",
		"power": "3",
		"category": "special",
		"type": "Fairy",
		"tags": ["target|l|foe", "frame|confuse|混亂|number|d2"],
		"accuracy": "特殊 + 導引",
		"damage": "特殊 + 3",
		"effect": "骰 2 顆机率骰以使敵人陷入「混亂」状態。",
		"desc": "使用者釋放出一种令人迷醉的芳香蒸汽，可不要上当，因为它不僅有毒，還有可怕的副作用。"
	},
	{
		"name": "天使之吻", "alias": "てんしのキッス|Sweet Kiss",
		"power": "-",
		"category": "support",
		"type": "Fairy",
		"tags": ["target|l|foe", "frame|accuracy|命中|down|2", "frame|confuse|混亂|always"],
		"accuracy": "可愛 + 誘惑",
		"damage": "-",
		"effect": "使敵人陷入「混亂」状態。",
		"desc": "寶可夢走向敵人並在对方脸上留下一个甜美的吻，接著调皮地離开。敵人將困惑茫然於其中的含義。"
	}
]);