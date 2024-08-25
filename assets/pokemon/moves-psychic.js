let MoveList;
if(!MoveList) MoveList = []; 
module.exports.MoveList = MoveList;

Array.prototype.push.apply(MoveList, [
	{
		"name": "高速移動", "alias": "こうそくいどう|Agility",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|self", "frame|self|靈巧|up|2"],
		"accuracy": "靈巧 + 運動",
		"damage": "-",
		"effect": "提升使用者的靈巧。",
		"desc": "使用者放鬆並使身體變輕以更快速地移動。"
	},
	{
		"name": "交換場地", "alias": "サイドチェンジ|Ally Switch",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|ally", "effect|l|switcher"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "替換招式。使用者被換下場。選擇另一个寶可夢來取代牠的位置，該寶可夢將在下一个戰鬥輪時準備好戰鬥。",
		"desc": "使用者瞬間移動，與某人交換自己所在的位置。"
	},
	{
		"name": "瞬間失憶", "alias": "ドわすれ|Amnesia",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|self", "frame|self|特防|up|2"],
		"accuracy": "洞察 + 警覺",
		"damage": "-",
		"effect": "提升使用者的特防。",
		"desc": "做为心靈超越物質的絕佳範例。使用者暫時性淨空心靈，讓自己變得更加強韌。"
	},
	{
		"name": "屏障", "alias": "バリアー|Barrier",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|self", "frame|self|防禦|up|2"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "提升使用者的防禦。",
		"desc": "使用者在自己周圍施展出一个防護力場。"
	},
	{
		"name": "冥想", "alias": "めいそう|Calm Mind",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|self", "frame|self|特殊|up|1", "frame|self|特防|up|1"],
		"accuracy": "洞察 + 導引",
		"damage": "-",
		"effect": "提升使用者的特殊和特防。",
		"desc": "使用者沉澱自己的靈魂來強化心靈和肉體。"
	},
	{
		"name": "念力", "alias": "ねんりき|Confusion",
		"power": "2",
		"category": "special",
		"type": "Psychic",
		"tags": ["target|l|foe", "frame|confuse||number|d1"],
		"accuracy": "靈巧 + 導引",
		"damage": "特殊 + 2",
		"effect": "骰 1 顆機率骰以使敵人陷入「混亂」狀態。",
		"desc": "目標的心靈被微弱的精神念力給擊中，讓他們無法確定自己是否正被隱形的敵人給攻擊。有時候這會讓敵人看到不存在的事物。"
	},
	{
		"name": "宇宙力量", "alias": "コスモパワー|Cosmic Power",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|self", "frame|self|防禦|up|1", "frame|self|特防|up|1"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "提升使用者的防禦和特防。",
		"desc": "使用者吸收來自宇宙的力量。這隻寶可夢在這之後將閃爍著帶有能量的微弱光芒。"
	},
	{
		"name": "食夢", "alias": "ゆめくい|Dream Eater",
		"power": "4",
		"category": "special",
		"type": "Psychic",
		"tags": ["target|l|foe"],
		"accuracy": "特殊 + 導引",
		"damage": "特殊 + 4",
		"effect": "目標必須處於「睡眠」狀態，否則這个招式將會自動失敗。使用者回復等同於造成傷害一半的HP（尾数捨去）。",
		"desc": "使用者吃掉熟睡目標的夢。當敵人醒转時，牠將會感到虛弱和空虛。"
	},
	{
		"name": "神通力", "alias": "じんつうりき|Extrasensory",
		"power": "3",
		"category": "special",
		"type": "Psychic",
		"tags": ["target|l|foe", "frame|flinch||number|d1"],
		"accuracy": "靈巧 + 導引",
		"damage": "特殊 + 3",
		"effect": "骰 1 顆機率骰以使敵人陷入「畏縮」狀態。",
		"desc": "使用者以幾乎看不見的神奇力量进行攻擊。"
	},
	{
		"name": "預知未來", "alias": "みらいよち|Future Sight",
		"power": "5",
		"category": "special",
		"type": "Psychic",
		"tags": ["target|l|foe"],
		"accuracy": "洞察 + 導引",
		"damage": "特殊 + 5",
		"effect": "這个招式將在下一个戰鬥輪結束時造成傷害。它將無視任何護盾招式或掩護的效果。如果目標無法戰鬥或被換下場，則傷害目標將會變为下一个對手或牠的其中一个同伴。",
		"desc": "使用者預知到將有某種恐怖的事情臨到目標身上。牠能夠毫無風險地看見自己未來的畫面。"
	},
	{
		"name": "嘩嘩氣場", "alias": "どばどばオーラ|Glitzy Glow",
		"power": "3",
		"category": "special",
		"type": "Psychic",
		"tags": ["target|l|foe"],
		"accuracy": "特殊 + 導引",
		"damage": "特殊 + 3",
		"effect": "若成功，則在接下來 4 个戰鬥輪期間，特殊攻擊對使用者和所有隊友造成的傷害都將減少 1 點。這个效果並不會疊加。如果這个招式的使用者處於最終進化階段，則這个招式自動失敗。",
		"desc": "使用者讓自己身邊環繞著迷人的光芒，並將其化成精神衝擊釋放出去。殘留在場上散發著柔和光輝的粒子將會維持使用者的魅力。"
	},
	{
		"name": "重力", "alias": "じゅうりょく|Gravity",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|field"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "具有漂浮特性或飛行屬性的寶可夢將能夠被地面屬性的招式命中。持續 4 輪。",
		"desc": "重力被增強，使所有人屈膝跪地。飛行屬性的寶可夢將被拉到地面上。"
	},
	{
		"name": "防守平分", "alias": "ガードシェア|Guard Split",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|foe"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "將使用者的防禦和特防各自與敵人相加後取平均。",
		"desc": "使用者施展超能力均分自己與敵人的強韌。雙方將會覺得彼此有著相同的身體耐性。"
	},
	{
		"name": "防守互換", "alias": "ガードスワップ|Guard Swap",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|foe"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "將你的防禦和特防和敵人交換。",
		"desc": "寶可夢施展超能力，讓對手覺得自己變得跟你一樣脆弱，而讓使用者覺得自己得到了目標的強韌。"
	},
	{
		"name": "回復封鎖", "alias": "かいふくふうじ|Heal Block",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|area"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "所有人都無法回復任何失去的HP。持續 4 輪。",
		"desc": "使用者利用自己強大的超能力強迫所有人的傷口維持開放狀態。"
	},
	{
		"name": "治癒波動", "alias": "いやしのはどう|Heal Pulse",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|ally", "effect|l|heal"],
		"accuracy": "意志 + 導引",
		"damage": "-",
		"effect": "以一个隊友为目標。基礎治癒。若成功，則消耗 1 點意志點以使其生效。",
		"desc": "使用者放射出能量波動來治療同伴的傷勢。"
	},
	{
		"name": "治癒之願", "alias": "いやしのねがい|Healing Wish",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|ally"],
		"accuracy": "意志 + 導引",
		"damage": "-",
		"effect": "使用者陷入瀕死狀態。其中一个隊友將回復所有HP並解除所有異常狀態。",
		"desc": "大愛與犧牲的力量。使用者許下願望，以自己的健康为代價來治癒所有傷勢和疾病以拯救他人的性命。"
	},
	{
		"name": "愛心印章", "alias": "ハートスタンプ|Heart Stamp",
		"power": "2",
		"category": "physical",
		"type": "Psychic",
		"tags": ["target|l|foe", "frame|flinch||number|d3"],
		"accuracy": "洞察 + 誘惑",
		"damage": "力量 + 2",
		"effect": "骰 3 顆機率骰以使敵人陷入「畏縮」狀態。",
		"desc": "這个招式能控制目標的情感，使牠感到被愛與安全。使用者或許能因此立即再次攻擊。"
	},
	{
		"name": "心靈互換", "alias": "ハートスワップ|Heart Swap",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|foe"],
		"accuracy": "洞察 + 誘惑",
		"damage": "-",
		"effect": "使用者與目標交換彼此身上的任何数值增益和減益。",
		"desc": "使用者和目標互換牠們彼此感受到的力量和虛弱、不安和勇氣、愛意和憎恨。任何能力上的強化也都將被交換。"
	},
	{
		"name": "異次元洞", "alias": "いじげんホール|Hyperspace Hole|",
		"power": "3",
		"category": "special",
		"type": "Psychic",
		"tags": ["target|l|foe", "effect|l|neverfail"],
		"accuracy": "洞察 + 導引",
		"damage": "特殊 + 3",
		"effect": "無視防禦和特防。必中。這个招式能夠無視敵人身上的任何護盾招式的效果。",
		"desc": "使用者知道那束縛牠同時出現在不同場所、並禁止牠與其他物體同時佔據相同空間的物理法則。但牠選擇無視這些法則的權威。"
	},
	{
		"name": "催眠術", "alias": "さいみんじゅつ|Hypnosis",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|foe", "frame|accuracy||down|4", "frame|sleep||always"],
		"accuracy": "洞察 + 誘惑",
		"damage": "-",
		"effect": "使目標陷入「睡眠」狀態。惡屬性的寶可夢仍然會受到這个招式的影響。",
		"desc": "施加能夠引發睡意的暗示，讓目標昏昏欲睡並陷入深沉睡眠。如果目標處於安全的環境下，這个招式的效果會更好。"
	},
	{
		"name": "封印", "alias": "ふういん|Imprison",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|foe"],
		"accuracy": "聰明 + 導引",
		"damage": "-",
		"effect": "敵人無法使用任何使用者已經學會的招式。持續一天。",
		"desc": "這个招式將阻斷使用者所熟知的特定記憶片段，包括招式、技術、名稱、場所、人物、或情境。目標將無法回想起那些記憶。"
	},
	{
		"name": "號令", "alias": "さいはい|Instruct",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|foe"],
		"accuracy": "聰明 + 表演",
		"damage": "-",
		"effect": "被選擇的目標將會重複牠們在這个戰鬥輪最後使用的招式，並把〈號令〉的命中判定結果當成是牠們使用該招式的命中判定結果。目標在這之前必須於這一个戰鬥輪中成功使出一个招式，否則〈號令〉將自動失敗。",
		"desc": "寶可夢對其中一个同伴或敵人傳送精神指令，好讓牠們重覆进行牠們的上一个行動。"
	},
	{
		"name": "折彎湯匙", "alias": "スプーンまげ|Kinesis",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|foe", "frame|target|命中|down|1"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "敵人的所有命中判定將被扣除 1 顆成功骰。",
		"desc": "一種能夠對物體施加力量的基本精神能量。你可以透過觸碰、移動、擠壓、和影響簡單的物體來分散他人的注意力。"
	},
	{
		"name": "光牆", "alias": "ひかりのかべ|Light Screen",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|allally", "frame|self|受傷|minus|1"],
		"accuracy": "特殊 + 導引",
		"damage": "",
		"effect": "特殊攻擊對使用者和所有隊友造成的傷害將減少 1 點，持續 4 輪。",
		"desc": ""
	},
	{
		"name": "新月舞", "alias": "みかづきのまい|Lunar Dance",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|allally"],
		"accuracy": "洞察 + 表演",
		"damage": "-",
		"effect": "使用者陷入瀕死狀態。其中一个陷入瀕死的隊友將恢復意識，回復所有HP並解除所有異常狀態。如果該名隊友不在戰鬥中，則牠將被替換上場並準備好戰鬥。",
		"desc": "月亮在最黑暗的時刻閃耀，反射著太陽散發的生命之光，照耀那些於黑夜中殞落的人們，救贖牠們失去的靈魂。"
	},
	{
		"name": "潔淨光芒", "alias": "ラスターパージ|Luster Purge",
		"power": "2",
		"category": "special",
		"type": "Psychic",
		"tags": ["target|l|foe", "dice|l|5", "frame|target|特防|down|1"],
		"accuracy": "特殊 + 導引",
		"damage": "特殊 + 2",
		"effect": "骰 5 顆機率骰以降低敵人的特防。這个效果可以在每个目標身上疊加最多三次。",
		"desc": "使用者讓炫目強光籠罩自身，並朝著敵人射出光束，這道強光將使敵人再也無力抵抗任何人。"
	},
	{
		"name": "魔法反射", "alias": "マジックコート|Magic Coat",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|foe", "frame|priority||up|4"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "先制招式。將所有會影響使用者或使用者方的戰場的變化類招式效果改为導向敵方。（例如：敵方使用了〈隱形岩〉，而〈魔法反射〉將使該招式改为影響敵方場地，而非我方的場地。）",
		"desc": "使用者迅速創造出屏障，能夠反彈任何敵人打算使用的弱小攻擊、異常狀態、或其他陰險伎倆。"
	},
	{
		"name": "魔法粉", "alias": "まほうのこな|Magic Powder",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|foe"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "將目標的屬性變更为超能力屬性。",
		"desc": "寶可夢誦唸一段咒語並朝目標吹出一朵粉紅色的粉塵雲。在這之後目標將變得非常擅長猜出你從牌堆中抽出了哪張牌。"
	},
	{
		"name": "魔法空間", "alias": "マジックルーム|Magic Room",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|field"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "所有人都無法使用牠們的攜帶物品或任何其他物品。持續 4 輪。",
		"desc": "在魔法空間的影響下，需要手動使用的科技產品、工具、和道具都無法生效。自動化科技仍然能如常運作。"
	},
	{
		"name": "瑜伽姿勢", "alias": "ヨガのポーズ|Meditate",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|self", "frame|self|力量|up|1"],
		"accuracy": "意志 + 導引",
		"damage": "-",
		"effect": "提升使用者的力量。",
		"desc": "寶可夢透過瑜珈來解放沉睡在使用者體內的力量。"
	},
	{
		"name": "奇跡之眼", "alias": "ミラクルアイ|Miracle Eye",
		"power": "*",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|self"],
		"accuracy": "洞察 + 警覺",
		"damage": "-",
		"effect": "使用者將能夠使用超能力屬性招式命中惡屬性的寶可夢，無視閃避的增益，且對手將無法降低使用者的命中。",
		"desc": "使用者的視線將看透血肉之軀，並能直接看見周圍所有人最深處的心靈存在。隱藏起來的敵人將被發現。"
	},
	{
		"name": "鏡面反射", "alias": "ミラーコート|Mirror Coat",
		"power": "*",
		"category": "special",
		"type": "Psychic",
		"tags": ["target|l|foe"],
		"accuracy": "靈巧 + 導引",
		"damage": "不定",
		"effect": "這个招式只有在敵人剛使用過特殊攻擊後才會生效。這个招式的傷害骰池等同於你敵人最後使用的傷害骰池再額外增加 2 顆骰子。無視敵人的防禦。",
		"desc": "使用者偏折引導受到的能量傷害，並朝著其源頭反射回去。"
	},
	{
		"name": "薄霧球", "alias": "ミストボール|Mist Ball",
		"power": "2",
		"category": "special",
		"type": "Psychic",
		"tags": ["target|l|foe", "dice|l|5", "frame|target|特殊|down|1"],
		"accuracy": "特殊 + 導引",
		"damage": "特殊 + 2",
		"effect": "骰 5 顆機率骰以降低敵人的特殊。這个效果可以在每个目標身上疊加最多三次。",
		"desc": "使用者用厚重的濃霧淹沒敵人，這股柔順的迷霧將阻止邪念從敵人的心底浮現。"
	},
	{
		"name": "光子噴涌", "alias": "フォトンゲイザー|Photon Geyser",
		"power": "4",
		"category": "hybrid",
		"type": "Psychic",
		"tags": ["target|l|foe"],
		"accuracy": "靈巧 + 導引",
		"damage": "力量/特殊 + 4",
		"effect": "這个招式的傷害骰池可以使用力量或特殊特質，並分別造成物理或特殊傷害。由使用者選擇。",
		"desc": "寶可夢透過出現在敵人位置的巨大光柱进行攻擊，無論是它熾烈的能量或強勁的衝擊都足以擊倒任何人。"
	},
	{
		"name": "力量平分", "alias": "パワーシェア|Power Split",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|foe"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "將使用者的力量和特殊特質各自與敵人相加後取平均。",
		"desc": "使用者施展超能力均分自己與敵人的力量。雙方將會覺得彼此有著相同的力量。"
	},
	{
		"name": "力量互換", "alias": "パワースワップ|Power Swap",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|foe"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "將你的力量和特殊特質和敵人交換。",
		"desc": "寶可夢施展超能力，讓對手覺得自己變得跟你一樣虛弱，而讓使用者覺得自己得到了目標的力量。"
	},
	{
		"name": "力量戲法", "alias": "パワートリック|Power Trick",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|self"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "將使用者的力量和防禦交換，特殊和特防交換。",
		"desc": "使用者愚弄自己的心靈，使自己相信自己的力量來自身體活力，而體質就等同於自己的力量。"
	},
	{
		"name": "稜鏡鐳射", "alias": "プリズムレーザー|Prismatic Laser",
		"power": "6",
		"category": "special",
		"type": "Psychic",
		"tags": ["target|l|foe", "effect|l|lethal", "effect|l|recharge"],
		"accuracy": "靈巧 + 導引",
		"damage": "特殊 + 6",
		"effect": "必須重新充能。致命傷害。",
		"desc": "透過稜鏡，使用者發射出能夠射穿任何一切的強聚雷射光束。這个行動將會讓使用者的精神耗弱。"
	},
	{
		"name": "幻象光線", "alias": "サイケこうせん|Psybeam",
		"power": "2",
		"category": "special",
		"type": "Psychic",
		"tags": ["target|l|foe", "frame|confuse||number|d1"],
		"accuracy": "靈巧 + 導引",
		"damage": "特殊 + 2",
		"effect": "骰 1 顆機率骰以使敵人陷入「混亂」狀態。",
		"desc": "以一道能夠直擊目標心靈的精神能量光束發動攻擊。"
	},
	{
		"name": "精神強念", "alias": "サイコキネシス|Psychic",
		"power": "3",
		"category": "special",
		"type": "Psychic",
		"tags": ["target|l|foe", "dice|l|1", "frame|target|特防|down|1"],
		"accuracy": "靈巧 + 導引",
		"damage": "特殊 + 3",
		"effect": "骰 1 顆機率骰以降低敵人的特防。",
		"desc": "使用者的念動力足以對目標造成嚴重傷害，這道精神念力可不怎麼纖細。"
	},
	{
		"name": "精神之牙", "alias": "サイコファング|Psychic Fangs",
		"power": "3",
		"category": "physical",
		"type": "Psychic",
		"tags": ["target|l|foe"],
		"accuracy": "靈巧 + 鬥毆",
		"damage": "力量 + 3",
		"effect": "如果敵方設有任何屏障（像是〈光牆〉、〈反射壁〉），摧毀屏障。",
		"desc": "寶可夢露出獠牙咬向敵人，精神能量將在獠牙觸碰到物體之前率先貫穿它。"
	},
	{
		"name": "精神場地", "alias": "サイコフィールド|Psychic Terrain",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|field"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "在接下來 4 輪中，所有超能力屬性攻擊的傷害骰池都將額外增加 1 顆骰子。任何站在戰場上的生物都將無法使用先制招式。",
		"desc": "戰場開始輻射出精神波動。所有人都將因为腦內的雜訊而變得思考遲鈍，所有行動都將花費更多的時間。"
	},
	{
		"name": "精神突進", "alias": "サイコブースト|Psycho Boost",
		"power": "6",
		"category": "special",
		"type": "Psychic",
		"tags": ["target|l|foe", "frame|accuracy||down|1", "effect|l|lethal", "frame|self|特殊|down|2"],
		"accuracy": "靈巧 + 導引",
		"damage": "特殊 + 6",
		"effect": "致命傷害。降低使用者的特殊。",
		"desc": "寶可夢將自己所有的匯聚集中的精神能量並釋放出一陣毀滅性的爆炸，使用者在這之後將會感到極度疲憊。"
	},
	{
		"name": "精神利刃", "alias": "サイコカッター|Psycho Cut",
		"power": "3",
		"category": "physical",
		"type": "Psychic",
		"tags": ["target|l|foe", "effect|l|crit"],
		"accuracy": "靈巧 + 鬥毆",
		"damage": "力量 + 3",
		"effect": "容易擊中要害。",
		"desc": "創造出精神能量的利刃來將敵人一刀两斷。"
	},
	{
		"name": "精神转移", "alias": "サイコシフト|Psycho Shift",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|foe"],
		"accuracy": "聰明 + 導引",
		"damage": "-",
		"effect": "將使用者身上的異常狀態转移到目標身上。使用者將因此解除所有的異常狀態。",
		"desc": "用超能力施加暗示，目標將感覺自己被使用者身上的異常狀態給折磨。"
	},
	{
		"name": "精神衝擊", "alias": "サイコショック|Psyshock",
		"power": "3",
		"category": "special",
		"type": "Psychic",
		"tags": ["target|l|foe"],
		"accuracy": "靈巧 + 導引",
		"damage": "特殊 + 3",
		"effect": "在抵抗這个招式的傷害時，使用敵人的防禦來取代敵人的特防。",
		"desc": "將精神波動實體化後，以真實物理衝擊來推撞目標。"
	},
	{
		"name": "精神擊破", "alias": "サイコブレイク|Psystrike",
		"power": "4",
		"category": "special",
		"type": "Psychic",
		"tags": ["target|l|foe"],
		"accuracy": "靈巧 + 導引",
		"damage": "特殊 + 4",
		"effect": "在抵抗這个招式的傷害時，使用敵人的防禦來取代敵人的特防。",
		"desc": "透過純粹的超能力，使用者將牠的能量實體化後對目標进行強力打擊。"
	},
	{
		"name": "精神波", "alias": "サイコウェーブ|Psywave",
		"power": "*",
		"category": "special",
		"type": "Psychic",
		"tags": ["target|l|foe"],
		"accuracy": "洞察 + 導引",
		"damage": "不定",
		"effect": "根據使用者的階級決定這个招式的傷害骰池：新手 1 顆、初學者 2 顆、業餘者 3 顆、菁英 4 顆、專家为 5 顆。這个招式無視敵人的防禦。",
		"desc": "釋放出心靈的內在能量來產生出能夠傷害目標的精神波。"
	},
	{
		"name": "反射壁", "alias": "リフレクター|Reflect",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|allally", "frame|self|受傷|minus|1"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "物理攻擊對使用者和所有隊友造成的傷害將減少 1 點，持續 4 輪。",
		"desc": "使用者將其精神能量釋放到這个世界，創造出隱形的牆壁和地面來阻擋物質穿越。"
	},
	{
		"name": "睡覺", "alias": "ねむる|Rest",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|self", "frame|sleep||always", "effect|l|c_heal"],
		"accuracy": "活力 + 自然",
		"damage": "-",
		"effect": "強效治癒。若成功，則消耗 1 點意志點以使其生效。使用者將陷入「睡眠」狀態並持續一整个戰鬥輪的時間（從戰鬥輪開始到結束）。",
		"desc": "使用者陷入沉睡。在這段期間內，牠的身體將處於超高速自癒的狀態。"
	},
	{
		"name": "扮演", "alias": "なりきり|Role Play",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|foe"],
		"accuracy": "聰明 + 表演",
		"damage": "-",
		"effect": "複製目標的特性。下列特性無法被複製：花之禮、幻覺、變身者、戰鬥切換、神奇守護、以及其他與形態變化有關的特性。",
		"desc": "使用者模仿目標，並從牠的角色上獲得大部分的基礎特性。"
	},
	{
		"name": "特性互換", "alias": "スキルスワップ|Skill Swap",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|foe"],
		"accuracy": "聰明 + 表演",
		"damage": "-",
		"effect": "與敵人交換彼此的特性。下列特性無法被交換：花之禮、幻覺、變身者、戰鬥切換、神奇守護、以及其他與形態變化有關的特性。",
		"desc": "使用者和目標互換身分，使雙方都覺得自己變成了對方的同類。"
	},
	{
		"name": "速度互換", "alias": "スピードスワップ|Speed Swap",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|foe"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "將你的靈巧特質和敵人交換。",
		"desc": "寶可夢施展牠的超能力使對手對週遭事物發生速度的感覺變得更快或更慢，取決於使用者的速度。"
	},
	{
		"name": "輔助力量", "alias": "アシストパワー|Stored Power",
		"power": "1*",
		"category": "special",
		"type": "Psychic",
		"tags": ["target|l|foe"],
		"accuracy": "靈巧 + 導引",
		"damage": "特殊 + 1*",
		"effect": "使用者身上的每一點特質增益都將使這个招式的傷害骰池額外增加 1 顆骰子。你最多可以透過這个方式增加 7 顆骰子。（例如：皮皮的防禦和特防各增加了 1 點，則這个招式的傷害骰池將因此 +2 骰子）",
		"desc": "這个招式能讓使用者釋放出自己的力量，如果使用者擁有任何強化，這个招式的傷害也將隨之增加。"
	},
	{
		"name": "同步干擾", "alias": "シンクロノイズ|Synchronoise",
		"power": "5",
		"category": "special",
		"type": "Psychic",
		"tags": ["target|l|area", "effect|l|sound"],
		"accuracy": "特殊 + 表演",
		"damage": "特殊 + 5",
		"effect": "範圍攻擊。聲音類招式。選擇一个屬性（火、毒、鋼等等），這个招式只會影響該屬性的目標。",
		"desc": "使用者讓特定屬性的能量開始振動共鳴，周遭所有該屬性的生物和物體都將受到傷害。"
	},
	{
		"name": "意念移物", "alias": "テレキネシス|Telekinesis",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|foe"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "所有對目標进行的攻擊都將獲得「必中」效果。目標將免疫於地面屬性招式的影響。持續 2 輪。",
		"desc": "使用者能夠透過意念來操控物體和生物，寶可夢和人類因为移動受限而變得容易被擊中。"
	},
	{
		"name": "瞬間移動", "alias": "テレポート|Teleport",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|self"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "若在野外使用，則戰鬥直接結束。若在正式對戰中使用，則視为該寶可夢被換下場。瞬間移動的距離取決於特殊特質的数值以及說書人的裁斷。",
		"desc": "將使用者和一个生物傳送到一處安寧且與超能力高度共振的場所，比如寶可夢中心。天花板和牆壁會阻礙這个招式的效果"
	},
	{
		"name": "戲法", "alias": "トリック|Trick",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|foe"],
		"accuracy": "特殊 + 誘惑",
		"damage": "-",
		"effect": "敵人和使用者互換彼此的持有道具。",
		"desc": "控制目標的思想來完成一件無害的行为，比如說四處走動或交出道具。"
	},
	{
		"name": "戲法空間", "alias": "トリックルーム|Trick Room",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|field"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "反转先攻的順序。持續 4 輪。",
		"desc": "這个能扭转現實的招式可以操控時間，讓緩慢的生物變得迅速，迅速的生物變得遲緩。"
	},
	{
		"name": "奇妙空間", "alias": "ワンダールーム|Wonder Room",
		"power": "-",
		"category": "support",
		"type": "Psychic",
		"tags": ["target|l|field"],
		"accuracy": "特殊 + 導引",
		"damage": "-",
		"effect": "防禦和特防將會使用洞察特質來计算，而非活力特質。持續 4 輪。",
		"desc": "在奇妙空間內，強健的心智會造就強健的肉體，且堅韌的肉體也將產生堅韌的意志。然而，如果心智薄弱，那麼肉體也會跟著虛弱，反之亦然。"
	},
	{
		"name": "意念頭鎚", "alias": "しねんのずつき|Zen Headbutt",
		"power": "3",
		"category": "physical",
		"type": "Psychic",
		"tags": ["target|l|foe", "frame|accuracy||down|1", "frame|flinch||number|d3"],
		"accuracy": "靈巧 + 鬥毆",
		"damage": "力量 + 3",
		"effect": "骰 3 顆機率骰以使敵人陷入「畏縮」狀態。",
		"desc": "使用者將意志力匯聚在自己頭上並用頭錘發動攻擊。"
	}
]);