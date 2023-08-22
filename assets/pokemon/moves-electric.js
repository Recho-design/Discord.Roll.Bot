let MoveList;
if(!MoveList) MoveList = []; 
module.exports.MoveList = MoveList;

Array.prototype.push.apply(MoveList, [
	{
		"name": "氣場輪", "alias": "オーラぐるま|Aura Wheel",
		"power": "4",
		"category": "physical",
		"type": "Electric",
		"tags": ["target|l|foe", "frame|self|靈巧|up|1"],
		"accuracy": "靈巧 + 鬥毆",
		"damage": "力量 + 4",
		"effect": "若成功，提升使用者的靈巧。若使用者處於「空腹」花紋型態，則這個招式將會被視作惡屬性。",
		"desc": "寶可夢開心地用電氣纏饒而成的跑滾輪來攻擊敵人。如果使用者餓了，則滾輪的能量將會被黑暗氣場所取代。"
	},
	{
		"name": "電喙", "alias": "でんげきくちばし|Bolt Beak",
		"power": "2*",
		"category": "physical",
		"type": "Electric",
		"tags": ["target|l|foe"],
		"accuracy": "靈巧 + 鬥毆",
		"damage": "力量 + 2*",
		"effect": "若目標在這個戰鬥輪中還沒有進行過牠的回合，則這個招式的傷害骰池額外增加 2 顆骰子。",
		"desc": "寶可夢給牠的喙充電並啄向牠的敵人，如果敵人速度不夠快，那牠將會被強烈的電流給衝擊。"
	},
	{
		"name": "雷擊", "alias": "らいげき|Bolt Strike",
		"power": "6",
		"category": "physical",
		"type": "Electric",
		"tags": ["target|l|foe", "frame|accuracy||down|2", "frame|paralysis||number|d2"],
		"accuracy": "力量 + 鬥毆",
		"damage": "力量 + 6",
		"effect": "骰 2 顆機率骰以使敵人陷入「麻痺」狀態。",
		"desc": "捷克羅姆讓強大的電流覆蓋全身並猛撞敵人。無論是因為電流還是撞擊，敵人都將因此難以移動。"
	},
	{
		"name": "麻麻電擊", "alias": "びりびりエレキ|Buzzy Buzz",
		"power": "3",
		"category": "special",
		"type": "Electric",
		"tags": ["target|l|foe", "frame|paralysis||always"],
		"accuracy": "靈巧 + 導引",
		"damage": "特殊 + 3",
		"effect": "使敵人陷入「麻痺」狀態。如果這個招式的使用者處於最終進化階段，則這個招式自動失敗。",
		"desc": "寶可夢的毛皮釋放出一股靜電，發出一種可愛的哢嚓聲。這一切都是如此愉快有趣，直到有人因此滋滋麻痹。"
	},
	{
		"name": "充電", "alias": "じゅうでん|Charge",
		"power": "-",
		"category": "support",
		"type": "Electric",
		"tags": ["target|l|self"],
		"accuracy": "洞察 + 自然",
		"damage": "-",
		"effect": "使用者下一次使用的電屬性傷害類招式的傷害骰池將額外增加 2 顆骰子。",
		"desc": "使用者積蓄牠體內的所有電力等待之後爆發。"
	},
	{
		"name": "充電光束", "alias": "チャージビーム|Charge Beam",
		"power": "2",
		"category": "special",
		"type": "Electric",
		"tags": ["target|l|foe", "frame|accuracy||down|1", "dice|l|5", "frame|self|特殊|up|1"],
		"accuracy": "靈巧 + 導引",
		"damage": "特殊 + 2",
		"effect": "骰 5 顆機率骰以提升使用者的特殊。",
		"desc": "寶可夢射出一道電力光束，並使用餘電來強化自己的力量。"
	},
	{
		"name": "放電", "alias": "ほうでん|Discharge",
		"power": "3",
		"category": "special",
		"type": "Electric",
		"tags": ["target|l|area", "frame|paralysis||number|d3"],
		"accuracy": "靈巧 + 導引",
		"damage": "特殊 + 3",
		"effect": "範圍攻擊。骰 3 顆機率骰以使目標陷入「麻痺」狀態。",
		"desc": "使用者向著四面八方釋放儲存的電能。"
	},
	{
		"name": "怪異電波", "alias": "かいでんぱ|Eerie Impulse",
		"power": "-",
		"category": "support",
		"type": "Electric",
		"tags": ["target|l|foe", "frame|target|特殊|down|2"],
		"accuracy": "洞察 + 自然",
		"damage": "-",
		"effect": "降低敵人的特殊。",
		"desc": "使用者輻射出原本環繞在自己身邊的電波，敵人在攻擊前可得好好考慮一下了。"
	},
	{
		"name": "電氣場地", "alias": "エレキフィールド|Electric Terrain",
		"power": "-",
		"category": "support",
		"type": "Electric",
		"tags": ["target|l|field"],
		"accuracy": "洞察 + 自然",
		"damage": "-",
		"effect": "在接下來 4 輪中，所有電屬性攻擊的傷害骰池都將額外增加 1 顆骰子。任何站在戰場上的生物的「睡眠」狀態都將被解除。",
		"desc": "使用者給場地充電，你根本不可能躺在上面睡個好覺。"
	},
	{
		"name": "輸電", "alias": "そうでん|Electrify",
		"power": "-",
		"category": "support",
		"type": "Electric",
		"tags": ["target|l|foe"],
		"accuracy": "洞察 + 自然",
		"damage": "-",
		"effect": "目標下一次攻擊造成的傷害將變成電屬性。",
		"desc": "使用者向目標射出電氣彈，敵人會因此充滿電力，直到牠進行下一次攻擊將其釋放為止。"
	},
	{
		"name": "電球", "alias": "エレキボール|Electro Ball",
		"power": "2*",
		"category": "special",
		"type": "Electric",
		"tags": ["target|l|foe"],
		"accuracy": "靈巧 + 導引",
		"damage": "特殊 + 2*",
		"effect": "使用者的靈巧每超過目標一點，這個招式的傷害骰池就可以額外增加 1 顆骰子。你最多可以透過這個方式增加 4 顆骰子。",
		"desc": "寶可夢創造出一個小型的帶電球體並擲向目標，使用者速度越快，衝擊力越大。"
	},
	{
		"name": "電網", "alias": "エレキネット|Electroweb",
		"power": "2",
		"category": "special",
		"type": "Electric",
		"tags": ["target|l|allfoe", "frame|target|靈巧|down|1"],
		"accuracy": "靈巧 + 導引",
		"damage": "特殊 + 2",
		"effect": "以所有範圍內的敵人為目標。降低目標的靈巧。",
		"desc": "朝著所有敵人射出電網來限制牠們的移動。想走出這張電網可痛苦的呢。"
	},
	{
		"name": "交錯閃電", "alias": "クロスサンダー|Fusion Bolt",
		"power": "4*",
		"category": "physical",
		"type": "Electric",
		"tags": ["target|l|foe", "effect|l|lethal"],
		"accuracy": "力量 + 導引",
		"damage": "力量 + 4*",
		"effect": "致命傷害。如果這個戰鬥輪中已經有任何人使用了〈交錯火焰〉招式，則這個招式的傷害骰池將額外增加 4 顆骰子。",
		"desc": "寶可夢使出極具毀滅性的電能衝擊，傳說如果附近存在一種特殊的火焰的話，它的威力會變得更強。"
	},
	{
		"name": "等離子浴", "alias": "プラズマシャワー|Ion Deluge",
		"power": "-",
		"category": "support",
		"type": "Electric",
		"tags": ["target|l|field"],
		"accuracy": "洞察 + 自然",
		"damage": "-",
		"effect": "在這個場景期間，一般屬性的招式將如同它是電屬性的招式一樣造成傷害。",
		"desc": "使用者增強環境中帶電粒子的能量，結果會讓人不只一「電」震驚！"
	},
	{
		"name": "電磁漂浮", "alias": "でんじふゆう|Magnet Rise",
		"power": "-",
		"category": "support",
		"type": "Electric",
		"tags": ["target|l|self"],
		"accuracy": "洞察 + 自然",
		"damage": "-",
		"effect": "在接下來 4 輪中，使用者將獲得對地面屬性招式的免疫。",
		"desc": "寶可夢利用磁場來將自己推離地面，使自己飄浮一小段時間。"
	},
	{
		"name": "磁場操控", "alias": "じばそうさ|Magnetic Flux",
		"power": "-",
		"category": "support",
		"type": "Electric",
		"tags": ["target|l|allally", "frame|self|防禦|up|1", "frame|self|特防|up|1"],
		"accuracy": "洞察 + 自然",
		"damage": "-",
		"effect": "提升使用者和所有電屬性或鋼屬性隊友的防禦和特防。",
		"desc": "寶可夢扭曲了身邊的磁場。這同樣會影響那些對於磁場敏感的夥伴們。"
	},
	{
		"name": "蹭蹭臉頰", "alias": "ほっぺすりすり|Nuzzle",
		"power": "1",
		"category": "physical",
		"type": "Electric",
		"tags": ["target|l|foe", "frame|paralysis||always"],
		"accuracy": "靈巧 + 鬥毆",
		"damage": "力量 + 1",
		"effect": "使敵人陷入「麻痺」狀態。",
		"desc": "寶可夢用牠帶電的臉頰蹭蹭敵人，儘管這看起來很可愛，但實際上非常危險。"
	},
	{
		"name": "破音", "alias": "オーバードライブ|Overdrive",
		"power": "3",
		"category": "special",
		"type": "Electric",
		"tags": ["target|l|allfoe", "effect|l|sound"],
		"accuracy": "靈巧 + 表演",
		"damage": "特殊 + 3",
		"effect": "以所有範圍內的敵人為目標。聲音類招式。",
		"desc": "寶可夢用自己的身體作為擴音器，發出充滿能量的電音。"
	},
	{
		"name": "抛物面充電", "alias": "パラボラチャージ|Parabolic Charge",
		"power": "2",
		"category": "special",
		"type": "Electric",
		"tags": ["target|l|area"],
		"accuracy": "靈巧 + 導引",
		"damage": "特殊 + 2",
		"effect": "範圍攻擊。使用者回復等同於造成傷害一半的HP（尾數捨去）。",
		"desc": "寶可夢從體內釋放出大量的電荷，並回收變得更多的電荷。"
	},
	{
		"name": "閃閃雷光", "alias": "ピカピカサンダー|Pika Papow",
		"power": "0*",
		"category": "special",
		"type": "Electric",
		"tags": ["target|l|foe"],
		"accuracy": "靈巧 + 導引",
		"damage": "特殊 + 0*(最多+5)",
		"effect": "使用者的每 1 點幸福度都會使這個招式的傷害骰池額外增加 1 顆骰子。如果這個招式的使用者處於最終進化階段，則這個招式自動失敗。",
		"desc": "使用者以落雷的形式釋放能量，使用者越幸福，這個招式的能量就會越大。"
	},
	{
		"name": "等離子閃電拳", "alias": "プラズマフィスト|Plasma Fists",
		"power": "4",
		"category": "physical",
		"type": "Electric",
		"tags": ["target|l|foe", "effect|l|fist"],
		"accuracy": "靈巧 + 鬥毆",
		"damage": "力量 + 4",
		"effect": "拳頭類招式。若成功，則直到這個場景結束之前，使用者的所有一般屬性招式都將變為電屬性。",
		"desc": "使用者讓牠的拳頭纏繞電流，隨著衝擊，這些電荷將變成等離子，使牠的所有一般屬性招式附帶電屬性。"
	},
	{
		"name": "電擊波", "alias": "でんげきは|Shock Wave",
		"power": "2",
		"category": "special",
		"type": "Electric",
		"tags": ["target|l|foe", "effect|l|neverfail"],
		"accuracy": "靈巧 + 導引",
		"damage": "特殊 + 2",
		"effect": "必中。",
		"desc": "使用者快速釋放出電流，釋放速度過快以致於他人反應不及。"
	},
	{
		"name": "電光", "alias": "スパーク|Spark",
		"power": "2",
		"category": "physical",
		"type": "Electric",
		"tags": ["target|l|foe", "frame|paralysis||number|d3"],
		"accuracy": "靈巧 + 鬥毆",
		"damage": "力量 + 2",
		"effect": "骰 3 顆機率骰以使敵人陷入「麻痺」狀態。",
		"desc": "使用者撞擊敵人，並在接觸時釋放出強力的電火花。"
	},
	{
		"name": "打雷", "alias": "かみなり|Thunder",
		"power": "5",
		"category": "special",
		"type": "Electric",
		"tags": ["target|l|foe", "frame|accuracy||down|2", "effect|l|lethal", "frame|paralysis||number|d3"],
		"accuracy": "特殊 + 導引",
		"damage": "特殊 + 5",
		"effect": "致命傷害。骰 3 顆機率骰以使敵人陷入「麻痺」狀態。如果當前天氣狀態為大晴天，則這個招式的命中率降低效果將改為 -3；如果當前天氣狀態為下雨，則無視這個招式的命中率降低效果。",
		"desc": "寶可夢命令一道巨大的閃電劈中地面上的某個特定點。這實在太危險了。"
	},
	{
		"name": "雷電牙", "alias": "かみなりのキバ|Thunder Fang",
		"power": "2",
		"category": "physical",
		"type": "Electric",
		"tags": ["target|l|foe", "frame|flinch||number|d2", "frame|paralysis||number|d2"],
		"accuracy": "靈巧 + 鬥毆",
		"damage": "力量 + 2",
		"effect": "骰 2 顆機率骰以使敵人陷入「畏縮」狀態。骰 2 顆機率骰以使敵人陷入「麻痺」狀態。",
		"desc": "使用者給予敵人纏繞著電流的啃咬。這股直流電可能會大大地影響敵人的行動。"
	},
	{
		"name": "雷電拳", "alias": "かみなりパンチ|Thunder Punch",
		"power": "3",
		"category": "physical",
		"type": "Electric",
		"tags": ["target|l|foe", "effect|l|fist", "frame|paralysis||number|d1"],
		"accuracy": "靈巧 + 鬥毆",
		"damage": "力量 + 3",
		"effect": "拳頭類招式。骰 1 顆機率骰以使敵人陷入「麻痺」狀態。",
		"desc": "這一記帶電的拳擊可能會造成衝擊性的打擊。"
	},
	{
		"name": "電擊", "alias": "でんきショック|Thunder Shock",
		"power": "2",
		"category": "special",
		"type": "Electric",
		"tags": ["target|l|foe", "frame|paralysis||number|d1"],
		"accuracy": "靈巧 + 導引",
		"damage": "特殊 + 2",
		"effect": "骰 1 顆機率骰以使敵人陷入「麻痺」狀態。",
		"desc": "這一股輕微的電擊能使敵人觸電並讓牠肌肉抽搐。一些被這個招式命中的電子設備可能會因此短路故障。"
	},
	{
		"name": "電磁波", "alias": "でんじは|Thunder Wave",
		"power": "-",
		"category": "support",
		"type": "Electric",
		"tags": ["target|l|foe", "frame|accuracy||down|1", "frame|paralysis||always"],
		"accuracy": "洞察 + 自然",
		"damage": "-",
		"effect": "使敵人陷入「麻痺」狀態。",
		"desc": "一道波紋般的明亮電流從地面竄向敵人，目標的身體將會痙攣數小時。"
	},
	{
		"name": "十萬伏特", "alias": "10まんボルト|Thunderbolt",
		"power": "3",
		"category": "special",
		"type": "Electric",
		"tags": ["target|l|foe", "frame|paralysis||number|d1"],
		"accuracy": "靈巧 + 導引",
		"damage": "特殊 + 3",
		"effect": "骰 1 顆機率骰以使敵人陷入「麻痺」狀態。",
		"desc": "這一擊強力的帶電攻擊能使敵人觸電並受到傷害。它能摧毀大部分的電子設備。"
	},
	{
		"name": "伏特替換", "alias": "ボルトチェンジ|Volt Switch",
		"power": "2",
		"category": "special",
		"type": "Electric",
		"tags": ["target|l|foe", "effect|l|switcher"],
		"accuracy": "靈巧 + 導引",
		"damage": "特殊 + 2",
		"effect": "替換招式。使用者在造成傷害之後被換下場，替換的寶可夢將在有所準備的狀況下上場，擲骰決定牠的先攻。",
		"desc": ""
	},
	{
		"name": "伏特攻擊", "alias": "ボルテッカー|Volt Tackle",
		"power": "5",
		"category": "physical",
		"type": "Electric",
		"tags": ["target|l|foe", "effect|l|recoil", "frame|paralysis||number|d1"],
		"accuracy": "力量 + 鬥毆",
		"damage": "力量 + 5",
		"effect": "反作用力傷害。骰 1 顆機率骰以使敵人陷入「麻痺」狀態。",
		"desc": "使用者驅使大量電流環繞自身，然後衝撞敵人。"
	},
	{
		"name": "瘋狂伏特", "alias": "ワイルドボルト|Wild Charge",
		"power": "3",
		"category": "physical",
		"type": "Electric",
		"tags": ["target|l|foe", "effect|l|recoil"],
		"accuracy": "靈巧 + 鬥毆",
		"damage": "力量 + 3",
		"effect": "反作用力傷害。",
		"desc": "寶可夢用狂野的閃電環繞自身，然後肆無忌憚地發起攻擊。"
	},
	{
		"name": "電磁炮", "alias": "でんじほう|Zap Cannon",
		"power": "5",
		"category": "special",
		"type": "Electric",
		"tags": ["target|l|foe", "frame|accuracy||down|3", "effect|l|lethal", "frame|paralysis||always"],
		"accuracy": "靈巧 + 導引",
		"damage": "特殊 + 5",
		"effect": "致命傷害。使敵人陷入「麻痺」狀態。",
		"desc": "使用者發射出一道威力極強的電磁炮。任何被命中的對象都會在長時間內無法移動。"
	},
	{
		"name": "麻麻刺刺", "alias": "びりびりちくちく|Zing Zap",
		"power": "3",
		"category": "physical",
		"type": "Electric",
		"tags": ["target|l|foe", "frame|flinch||number|d3"],
		"accuracy": "靈巧 + 鬥毆",
		"damage": "力量 + 3",
		"effect": "骰 3 顆機率骰以使敵人陷入「畏縮」狀態。",
		"desc": "使用者蜷縮成一個之字型迅速滾動的帶電滾球，並在撞上目標後爆炸，這將使敵人在幾秒鐘內無法動彈。"
	},
	{
		"name": "電電加速", "alias": "ばちばちアクセル|Zippy Zap",
		"power": "2",
		"category": "physical",
		"type": "Electric",
		"tags": ["target|l|foe", "frame|priority||up|2"],
		"accuracy": "靈巧 + 鬥毆",
		"damage": "力量 + 2",
		"effect": "先制招式。這個招式永遠會擊中要害，並獲得相應的獎勵傷害骰。如果這個招式的使用者處於最終進化階段，則這個招式自動失敗。",
		"desc": "使用者迅速地左右四竄以攻擊敵人，速度之快彷彿瞬間移動，敵人幾乎沒有任何時間作出反應。"
	}
]);