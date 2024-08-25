let MoveList;
if(!MoveList) MoveList = []; 
module.exports.MoveList = MoveList;

Array.prototype.push.apply(MoveList, [
	{
		"name": "雜耍", "alias": "アクロバット|Acrobatics",
		"power": "4*",
		"category": "physical",
		"type": "Flying",
		"tags": ["target|l|foe"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 4*",
		"effect": "如果使用者持有任何攜帶物品，则这个招式的傷害骰池將被扣除 2 顆骰子。",
		"desc": "使用者用快速而優雅的雜技动作攻擊敵人，如果没有礙手礙腳的東西，其动作會更加流利。"
	},
	{
		"name": "燕返", "alias": "つばめがえし|Aerial Ace",
		"power": "2",
		"category": "physical",
		"type": "Flying",
		"tags": ["target|l|foe", "effect|l|neverfail"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 2",
		"effect": "必中。",
		"desc": "寶可夢飛入高空，背对光源，在那一瞬间使敵人睜不开眼，接著快速俯衝攻擊对手。"
	},
	{
		"name": "氣旋攻擊", "alias": "エアロブラスト|Aeroblast",
		"power": "4",
		"category": "special",
		"type": "Flying",
		"tags": ["target|l|foe", "effect|l|lethal", "effect|l|crit"],
		"accuracy": "特殊 + 導引",
		"damage": "特殊 + 4",
		"effect": "致命傷害。容易擊中要害。",
		"desc": "受害者會被困在强大的氣旋中。强風使各种殘骸碎石四處飛揚。"
	},
	{
		"name": "空氣利刃", "alias": "エアカッター|Air Cutter",
		"power": "2",
		"category": "special",
		"type": "Flying",
		"tags": ["target|l|allfoe", "effect|l|crit"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 2",
		"effect": "以所有範圍內的敵人为目标。容易擊中要害。",
		"desc": "使用者釋放出一波鋒利風刃，能劃破任何接觸到它的東西。"
	},
	{
		"name": "空氣斬", "alias": "エアスラッシュ|Air Slash",
		"power": "3",
		"category": "special",
		"type": "Flying",
		"tags": ["target|l|foe", "frame|flinch||number|d3"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 3",
		"effect": "骰 3 顆机率骰以使敵人陷入「畏缩」状態。",
		"desc": "使用者將颳起剃刀般鋒利的風环繞在敵人周遭，可能會將其擊倒在地。"
	},
	{
		"name": "鳥嘴加農炮", "alias": "くちばしキャノン|Beak Blast",
		"power": "4",
		"category": "physical",
		"type": "Flying",
		"tags": ["target|l|foe", "effect|l|charge", "frame|priority||down|3", "frame|burn2||always"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 4",
		"effect": "遠程攻擊。蓄力招式。后制招式。如果使用者在这个招式蓄力期间被非遠程的物理攻擊給命中，则敵人將陷入「灼傷 2 级」状態。",
		"desc": "寶可夢準備用牠的鳥喙釋放出一陣滾燙的氣流。这发加農炮在发射时的爆破聲就彷彿火車的汽笛。"
	},
	{
		"name": "彈跳", "alias": "とびはねる|Bounce",
		"power": "3",
		"category": "physical",
		"type": "Flying",
		"tags": ["target|l|foe", "effect|l|charge", "frame|paralysis||number|d3"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 3",
		"effect": "蓄力招式。当这个招式在蓄力时，使用者將脫離所有招式的影響範圍。骰 3 顆机率骰以使敵人陷入「麻痺」状態。",
		"desc": "寶可夢會跳入30英尺高的空中，然后踩在敵人身上。使用者自己不會受到任何墜落傷害。"
	},
	{
		"name": "勇鳥猛攻", "alias": "ブレイブバード|Brave Bird",
		"power": "5",
		"category": "physical",
		"type": "Flying",
		"tags": ["target|l|foe", "effect|l|recoil"],
		"accuracy": "力量 + 斗殴",
		"damage": "力量 + 5",
		"effect": "反作用力傷害。",
		"desc": "寶可夢使用全速飛撞敵人，在相撞时牠們双方都會因此受到傷害。"
	},
	{
		"name": "喋喋不休", "alias": "おしゃべり|Chatter",
		"power": "2",
		"category": "special",
		"type": "Flying",
		"tags": ["target|l|foe", "effect|l|sound", "frame|confuse||number|d3"],
		"accuracy": "洞察 + 表演",
		"damage": "特殊 + 2",
		"effect": "骰 3 顆机率骰以使敵人陷入「混亂」状態。",
		"desc": "使用者开始用人类的语言说话並給敵人发號施令。这可能會讓敵人感到极度困惑。"
	},
	{
		"name": "清除濃霧", "alias": "きりばらい|Defog",
		"power": "-",
		"category": "support",
		"type": "Flying",
		"tags": ["target|l|field"],
		"accuracy": "洞察 + 自然",
		"damage": "-",
		"effect": "清除場上的所有屏障（像是〈光牆〉、〈反射壁〉）、入場危害（像是〈毒菱〉、〈隱形岩〉）、和場地效果（像是〈薄霧場地〉、〈電氣場地〉）。",
		"desc": "一股强勁的風吹走任何濃霧，甚至一些看不見的屏障。"
	},
	{
		"name": "畫龍点睛", "alias": "ガリョウテンセイ|Dragon Ascent",
		"power": "5",
		"category": "physical",
		"type": "Flying",
		"tags": ["target|l|foe", "effect|l|lethal", "frame|self|防禦|down|1", "frame|self|特防|down|1"],
		"accuracy": "力量 + 斗殴",
		"damage": "力量 + 5",
		"effect": "致命傷害。降低使用者的防禦和特防。",
		"desc": "使用者飛上雲端並在刹那间俯衝下來猛撞向敵人。这一擊对双方而言都相当野蠻。"
	},
	{
		"name": "啄鑽", "alias": "ドリルくちばし|Drill Peck",
		"power": "3",
		"category": "physical",
		"type": "Flying",
		"tags": ["target|l|foe"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 3",
		"desc": "使用者把喙如同鑽头一樣使用以刺穿敵人。这是一个很危險的招式。"
	},
	{
		"name": "羽毛舞", "alias": "フェザーダンス|Feather Dance",
		"power": "-",
		"category": "support",
		"type": "Flying",
		"tags": ["target|l|foe", "frame|target|力量|down|2"],
		"accuracy": "美丽 + 表演",
		"damage": "-",
		"effect": "降低敵人的力量。",
		"desc": "这种優美的舞蹈能夠撫慰观眾的心，降低牠們的進攻意圖。"
	},
	{
		"name": "飄飄墜落", "alias": "ふわふわフォール|Floaty Fall",
		"power": "3",
		"category": "physical",
		"type": "Flying",
		"tags": ["target|l|foe", "frame|flinch||number|d3"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 3",
		"effect": "骰 3 顆机率骰以使敵人陷入「畏缩」状態。如果这个招式的使用者處於最終進化階段，则这个招式自动失败。",
		"desc": "在氣球的幫助下，使用者可以跳到高處並從敵人正上方落下。雖说在戰鬥中使用氣球有点賴皮，但裁判還是會允許的。"
	},
	{
		"name": "飛翔", "alias": "そらをとぶ|Fly",
		"power": "3",
		"category": "physical",
		"type": "Flying",
		"tags": ["target|l|foe", "effect|l|charge"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 3",
		"effect": "蓄力招式。当这个招式在蓄力时，使用者將脫離除了〈暴風〉和〈打雷〉以外招式的影響範圍。",
		"desc": "使用者前一回合飛入高空，下一回合落下並攻擊。这隻寶可夢可以长时间飛行而不感到疲倦。"
	},
	{
		"name": "起風", "alias": "かぜおこし|Gust",
		"power": "2",
		"category": "special",
		"type": "Flying",
		"tags": ["target|l|foe"],
		"accuracy": "灵巧 + 導引",
		"damage": "特殊 + 2",
		"desc": "寶可夢拍打翅膀卷起陣風來攻擊敵人。"
	},
	{
		"name": "暴風", "alias": "ぼうふう|Hurricane",
		"power": "5",
		"category": "special",
		"type": "Flying",
		"tags": ["target|l|foe", "frame|accuracy||down|2", "effect|l|lethal", "frame|confuse||number|d3"],
		"accuracy": "特殊 + 導引",
		"damage": "特殊 + 5",
		"effect": "致命傷害。骰 3 顆机率骰以使敵人陷入「混亂」状態。如果当前天氣状態为下雨，则无視这个招式的命中率降低效果。",
		"desc": "使用者用藉著颳起能將对手捲入空中的狂風來攻擊目标。"
	},
	{
		"name": "鸚鵡学舌", "alias": "オウムがえし|Mirror Move",
		"power": "*",
		"category": "support",
		"type": "Flying",
		"tags": ["target|l|foe"],
		"accuracy": "意志 + 導引",
		"damage": "与被复製的招式相同。",
		"effect": "复製並使用敵人最后使用的傷害类招式。",
		"desc": "使用者集中精力並設法模仿敵人最后的招式。"
	},
	{
		"name": "死亡之翼", "alias": "デスウイング|Oblivion Wing",
		"power": "4",
		"category": "special",
		"type": "Flying",
		"tags": ["target|l|foe", "effect|l|lethal", "effect|l|crit"],
		"accuracy": "特殊 + 導引",
		"damage": "特殊 + 4",
		"effect": "致命傷害。容易擊中要害。",
		"desc": "闇風驟起，將所觸之物全部化为散落的塵土直到什么也不剩。人类、寶可夢、植物，所有東西都將如同久遠的記憶一樣消逝。"
	},
	{
		"name": "啄", "alias": "つつく|Peck",
		"power": "2",
		"category": "physical",
		"type": "Flying",
		"tags": ["target|l|foe"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 2",
		"desc": "寶可夢用牠的喙或角刺擊敵人，稍微有一点痛。"
	},
	{
		"name": "啄食", "alias": "ついばむ|Pluck",
		"power": "2",
		"category": "physical",
		"type": "Flying",
		"tags": ["target|l|foe", "effect|l|neverfail"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 2",
		"effect": "必中。如果目标持有樹果，使用者將吃掉該樹果並獲得它的效果。",
		"desc": "使用者使勁啄了敵人一下，可能會從敵人身上得到什么好吃的東西。"
	},
	{
		"name": "羽棲", "alias": "はねやすめ|Roost",
		"power": "-",
		"category": "support",
		"type": "Flying",
		"tags": ["target|l|self", "effect|l|heal"],
		"accuracy": "洞察 + 自然",
		"damage": "-",
		"effect": "基礎治癒。直到使用者採取下一个行动之前，牠將變得能被地面属性的招式給影響。",
		"desc": "寶可夢降落到地面上，稍作休息。"
	},
	{
		"name": "神鳥猛擊", "alias": "ゴッドバード|Sky Attack",
		"power": "6",
		"category": "physical",
		"type": "Flying",
		"tags": ["target|l|foe", "frame|accuracy||down|1", "effect|l|charge", "effect|l|lethal", "effect|l|crit", "frame|flinch||number|d3"],
		"accuracy": "力量 + 斗殴",
		"damage": "力量 + 6",
		"effect": "致命傷害。容易擊中要害。蓄力招式。骰 3 顆机率骰以使敵人陷入「畏缩」状態。",
		"desc": "寶可夢從空中俯衝而下，乘著强風做出優雅而致命的一擊，將敵人輾壓在地上。"
	},
	{
		"name": "自由落体", "alias": "フリーフォール|Sky Drop",
		"power": "2",
		"category": "physical",
		"type": "Flying",
		"tags": ["target|l|foe", "effect|l|charge"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 2",
		"effect": "蓄力招式。当这个招式在蓄力时，目标陷入「畏缩」状態。飛行属性的寶可夢免疫这个招式造成的傷害。使用者的力量將決定牠是否能將目标抓到空中。",
		"desc": "使用者將对手抓上天空，然后從高空將目标扔下。"
	},
	{
		"name": "順風", "alias": "おいかぜ|Tailwind",
		"power": "-",
		"category": "support",
		"type": "Flying",
		"tags": ["target|l|field", "frame|self|灵巧|up|2"],
		"accuracy": "洞察 + 自然",
		"damage": "-",
		"effect": "提升戰場上与使用者同一側的所有目标的灵巧。持續 4 輪。",
		"desc": "使用者拍动翅膀製造出一个風場，能幫助隊伍移动得更快。"
	},
	{
		"name": "翅膀攻擊", "alias": "つばさでうつ|Wing Attack",
		"power": "2",
		"category": "physical",
		"type": "Flying",
		"tags": ["target|l|foe"],
		"accuracy": "灵巧 + 斗殴",
		"damage": "力量 + 2",
		"desc": "使用者飛向敵人，並用翅膀打擊对方。"
	}
]);