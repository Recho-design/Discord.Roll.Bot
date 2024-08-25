let Pokedex;
if(!Pokedex) Pokedex = []; 
module.exports.Pokedex= Pokedex;

Array.prototype.push.apply(Pokedex, [
  {
    "id": "810",
    "region": "galar",
    "name": "敲音猴",
    "alias": "Grookey",
    "type": [ "Grass" ],
    "info": {
      "image": "images/pokedex/810.png",
      "height": "0.3",
      "weight": "5",
      "category": "小猴寶可夢",
      "text": "牠們年輕的时候都在尋找能发出特定聲音的木棒，且之后會用这根木棒來敲奏出能夠使花草生长的节奏。敲音猴是一种熱情、善良、且熱愛音樂的生物。"
    },
    "evolution": {
      "stage": "first",
      "time": "medium"
    },
    "baseHP": 3,
    "rank": 0,
    "attr": {
      "str": { "value": 2, "max": 4 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 1, "max": 3 },
      "ins": { "value": 1, "max": 3 }
    },
    "ability": [
      "茂盛"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "抓" },
      { "rank": 0, "type": "Normal", "name": "叫聲" },
      { "rank": 1, "type": "Grass", "name": "木枝突刺" },
      { "rank": 1, "type": "Dark", "name": "挑釁" },
      { "rank": 2, "type": "Grass", "name": "飛葉快刀" },
      { "rank": 2, "type": "Normal", "name": "刺耳聲" },
      { "rank": 2, "type": "Dark", "name": "拍落" },
      { "rank": 2, "type": "Normal", "name": "摔打" },
      { "rank": 3, "type": "Normal", "name": "吵鬧" },
      { "rank": 3, "type": "Grass", "name": "木槌" },
      { "rank": 3, "type": "Normal", "name": "蠻幹" },
      { "rank": 4, "type": "Grass", "name": "草之誓約" },
      { "rank": 4, "type": "Normal", "name": "擊掌奇襲" },
      { "rank": 4, "type": "Grass", "name": "寄生种子" }
    ],
    "isNovice": true
  },
  {
    "id": "811",
    "region": "galar",
    "name": "啪咚猴",
    "alias": "Thwackey",
    "type": [
      "Grass"
    ],
    "info": {
      "image": "images/pokedex/811.png",
      "height": "0.7",
      "weight": "14",
      "category": "节拍寶可夢",
      "text": "啪咚猴相当熱衷於牠的节拍，牠們可能會过於沉浸在音樂中而甚至不會意識到戰鬥已经结束。牠們敲奏的速度越快，越是能獲得夥伴們的尊敬。"
    },
    "evolution": {
      "stage": "second",
      "time": "medium"
    },
    "baseHP": 4,
    "rank": 2,
    "attr": {
      "str": { "value": 2, "max": 5 },
      "dex": { "value": 2, "max": 5 },
      "vit": { "value": 2, "max": 5 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "茂盛"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "二連擊" },
      { "rank": 0, "type": "Normal", "name": "抓" },
      { "rank": 0, "type": "Normal", "name": "叫聲" },
      { "rank": 1, "type": "Grass", "name": "木枝突刺" },
      { "rank": 2, "type": "Dark", "name": "挑釁" },
      { "rank": 2, "type": "Grass", "name": "飛葉快刀" },
      { "rank": 2, "type": "Normal", "name": "刺耳聲" },
      { "rank": 2, "type": "Dark", "name": "拍落" },
      { "rank": 2, "type": "Normal", "name": "摔打" },
      { "rank": 3, "type": "Normal", "name": "吵鬧" },
      { "rank": 3, "type": "Grass", "name": "木槌" },
      { "rank": 3, "type": "Normal", "name": "蠻幹" },
      { "rank": 4, "type": "Flying", "name": "雜耍" },
      { "rank": 4, "type": "Normal", "name": "擊掌奇襲" },
      { "rank": 4, "type": "Grass", "name": "寄生种子" }
    ]
  },
  {
    "id": "812",
    "region": "galar",
    "name": "轟擂金剛猩",
    "alias": "Rillaboom",
    "type": [
      "Grass"
    ],
    "info": {
      "image": "images/pokedex/812.png",
      "height": "2.1",
      "weight": "90",
      "category": "鼓手寶可夢",
      "text": "牠們的首领擁有族群中最大的鼓，並有著最高超的打鼓技巧，能操縱樹根去攻擊牠的敵人。但牠們其实是性情温和，重視族群和諧相處的生物。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 6,
    "rank": 3,
    "attr": {
      "str": { "value": 3, "max": 7 },
      "dex": { "value": 2, "max": 5 },
      "vit": { "value": 2, "max": 5 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "茂盛"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "二連擊" },
      { "rank": 0, "type": "Grass", "name": "鼓擊" },
      { "rank": 1, "type": "Grass", "name": "青草場地" },
      { "rank": 1, "type": "Normal", "name": "戰吼" },
      { "rank": 2, "type": "Normal", "name": "抓" },
      { "rank": 2, "type": "Normal", "name": "叫聲" },
      { "rank": 2, "type": "Grass", "name": "木枝突刺" },
      { "rank": 2, "type": "Dark", "name": "挑釁" },
      { "rank": 2, "type": "Grass", "name": "飛葉快刀" },
      { "rank": 2, "type": "Normal", "name": "刺耳聲" },
      { "rank": 3, "type": "Dark", "name": "拍落" },
      { "rank": 3, "type": "Normal", "name": "摔打" },
      { "rank": 3, "type": "Normal", "name": "吵鬧" },
      { "rank": 3, "type": "Grass", "name": "木槌" },
      { "rank": 3, "type": "Normal", "name": "蠻幹" },
      { "rank": 3, "type": "Normal", "name": "爆音波" },
      { "rank": 4, "type": "Normal", "name": "生长" },
      { "rank": 4, "type": "Normal", "name": "自然之力" },
      { "rank": 4, "type": "Grass", "name": "疯狂植物" }
    ]
  },
  {
    "id": "813",
    "region": "galar",
    "name": "炎兔兒",
    "alias": "Scorbunny",
    "type": [ "Fire" ],
    "info": {
      "image": "images/pokedex/813.png",
      "height": "0.3",
      "weight": "4.5",
      "category": "兔子寶可夢",
      "text": "炎兔兒体型小巧且充满活力，牠們喜歡從寬廣場地的其中一边跑到另一边，持續好幾个小时並樂此不疲。牠腳底和鼻头上的肉球會在牠戰鬥或奔跑的时后散发出极度的高温。"
    },
    "evolution": {
      "stage": "first",
      "time": "medium"
    },
    "baseHP": 3,
    "rank": 0,
    "attr": {
      "str": { "value": 2, "max": 5 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 1, "max": 3 },
      "spe": { "value": 1, "max": 3 },
      "ins": { "value": 1, "max": 3 }
    },
    "ability": [
      "猛火"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 0, "type": "Normal", "name": "叫聲" },
      { "rank": 1, "type": "Fire", "name": "火花" },
      { "rank": 1, "type": "Normal", "name": "電光一闪" },
      { "rank": 2, "type": "Fight", "name": "二連踢" },
      { "rank": 2, "type": "Fire", "name": "蓄能焰襲" },
      { "rank": 2, "type": "Psychic", "name": "高速移动" },
      { "rank": 2, "type": "Normal", "name": "头鎚" },
      { "rank": 2, "type": "Fight", "name": "双倍奉還" },
      { "rank": 3, "type": "Flying", "name": "彈跳" },
      { "rank": 3, "type": "Normal", "name": "捨身衝撞" },
      { "rank": 4, "type": "Fire", "name": "火之誓約" },
      { "rank": 4, "type": "Ground", "name": "潑沙" },
      { "rank": 4, "type": "Normal", "name": "憤怒門牙" }
    ],
    "isNovice": true
  },
  {
    "id": "814",
    "region": "galar",
    "name": "騰蹴小將",
    "alias": "Raboot",
    "type": [ "Fire" ],
    "info": {
      "image": "images/pokedex/814.png",
      "height": "0.6",
      "weight": "9",
      "category": "兔子寶可夢",
      "text": "这隻寶可夢熱愛踢東西，並會每天訓練來鍛鍊自己的腳法。牠的体毛變得相当蓬松，有些人認为这是为了幫助牠抵禦寒冷氣候，也有人说这是为了讓牠产生出温度更高的火焰。"
    },
    "evolution": {
      "stage": "second",
      "time": "medium"
    },
    "baseHP": 4,
    "rank": 2,
    "attr": {
      "str": { "value": 2, "max": 5 },
      "dex": { "value": 2, "max": 5 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [ "猛火" ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 0, "type": "Normal", "name": "叫聲" },
      { "rank": 1, "type": "Fire", "name": "火花" },
      { "rank": 1, "type": "Normal", "name": "電光一闪" },
      { "rank": 2, "type": "Fight", "name": "二連踢" },
      { "rank": 2, "type": "Fire", "name": "蓄能焰襲" },
      { "rank": 2, "type": "Psychic", "name": "高速移动" },
      { "rank": 2, "type": "Normal", "name": "头鎚" },
      { "rank": 2, "type": "Fight", "name": "双倍奉還" },
      { "rank": 3, "type": "Flying", "name": "彈跳" },
      { "rank": 3, "type": "Normal", "name": "捨身衝撞" },
      { "rank": 4, "type": "Normal", "name": "自我激勵" },
      { "rank": 4, "type": "Fight", "name": "飛膝踢" },
      { "rank": 4, "type": "Dark", "name": "突襲" }
    ]
  },
  {
    "id": "815",
    "region": "galar",
    "name": "闪焰王牌",
    "alias": "Cinderace",
    "type": [ "Fire" ],
    "info": {
      "image": "images/pokedex/815.png",
      "height": "1.4",
      "weight": "33",
      "category": "前鋒寶可夢",
      "text": "牠們对自己的能力相当自信且自負。牠們會將小石头用腳挑起並点火，製造出缠繞著火焰的武器來踢向牠們的对手。如果听到聲援，牠們就會變得很自大。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 5,
    "rank": 3,
    "attr": {
      "str": { "value": 3, "max": 6 },
      "dex": { "value": 3, "max": 7 },
      "vit": { "value": 2, "max": 5 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [ "猛火" ],
    "moves": [
      { "rank": 0, "type": "Fire", "name": "火焰球" },
      { "rank": 0, "type": "Normal", "name": "佯攻" },
      { "rank": 1, "type": "Normal", "name": "撞擊" },
      { "rank": 1, "type": "Normal", "name": "叫聲" },
      { "rank": 2, "type": "Fight", "name": "二連踢" },
      { "rank": 2, "type": "Fire", "name": "蓄能焰襲" },
      { "rank": 2, "type": "Psychic", "name": "高速移动" },
      { "rank": 2, "type": "Fire", "name": "火花" },
      { "rank": 2, "type": "Normal", "name": "電光一闪" },
      { "rank": 3, "type": "Normal", "name": "头鎚" },
      { "rank": 3, "type": "Fight", "name": "双倍奉還" },
      { "rank": 3, "type": "Flying", "name": "彈跳" },
      { "rank": 3, "type": "Normal", "name": "捨身衝撞" },
      { "rank": 3, "type": "Normal", "name": "換場" },
      { "rank": 4, "type": "Fight", "name": "飛膝踢" },
      { "rank": 4, "type": "Normal", "name": "百萬噸重踢" },
      { "rank": 4, "type": "Fire", "name": "爆炸烈焰" }
    ]
  },
  {
    "id": "816",
    "region": "galar",
    "name": "淚眼蜥",
    "alias": "Sobble",
    "type": [ "Water" ],
    "info": {
      "image": "images/pokedex/816.png",
      "height": "0.3",
      "weight": "4",
      "category": "水蜥寶可夢",
      "text": "这隻害羞的寶可夢並不喜歡引來太多的注意。牠會躲在浅浅的水池中……当牠覺得受到威脅，牠會大哭且牠的淚水會釋放出能夠讓对手淚流不止的催淚成分。"
    },
    "evolution": {
      "stage": "first",
      "time": "medium"
    },
    "baseHP": 3,
    "rank": 1,
    "attr": {
      "str": { "value": 1, "max": 3 },
      "dex": { "value": 2, "max": 5 },
      "vit": { "value": 1, "max": 3 },
      "spe": { "value": 2, "max": 5 },
      "ins": { "value": 1, "max": 3 }
    },
    "ability": [ "激流" ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "拍擊" },
      { "rank": 0, "type": "Normal", "name": "叫聲" },
      { "rank": 1, "type": "Water", "name": "水枪" },
      { "rank": 1, "type": "Normal", "name": "綁紧" },
      { "rank": 2, "type": "Water", "name": "水之波动" },
      { "rank": 2, "type": "Normal", "name": "淚眼汪汪" },
      { "rank": 2, "type": "Dark", "name": "突襲" },
      { "rank": 2, "type": "Bug", "name": "急速折返" },
      { "rank": 3, "type": "Water", "name": "水流裂破" },
      { "rank": 3, "type": "Water", "name": "浸水" },
      { "rank": 3, "type": "Water", "name": "求雨" },
      { "rank": 4, "type": "Normal", "name": "影子分身" },
      { "rank": 4, "type": "Ice", "name": "白霧" },
      { "rank": 4, "type": "Water", "name": "水之誓約" }
    ],
    "isNovice": true
  },
  {
    "id": "817",
    "region": "galar",
    "name": "變澀蜥",
    "alias": "Drizzile",
    "type": [ "Water" ],
    "info": {
      "image": "images/pokedex/817.png",
      "height": "0.7",
      "weight": "12",
      "category": "水蜥寶可夢",
      "text": "牠的態度发生了劇烈變化，從害羞變得冷漠且懶散。牠能夠從手掌分泌出的水分做成水彈。牠的头腦相当聰明，並以會在野外設下陷阱來对付敵人而聞名。"
    },
    "evolution": {
      "stage": "second",
      "time": "medium"
    },
    "baseHP": 4,
    "rank": 2,
    "attr": {
      "str": { "value": 2, "max": 4 },
      "dex": { "value": 2, "max": 5 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 3, "max": 6 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [ "激流" ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "拍擊" },
      { "rank": 0, "type": "Normal", "name": "叫聲" },
      { "rank": 1, "type": "Water", "name": "水枪" },
      { "rank": 1, "type": "Normal", "name": "綁紧" },
      { "rank": 2, "type": "Water", "name": "水之波动" },
      { "rank": 2, "type": "Normal", "name": "淚眼汪汪" },
      { "rank": 2, "type": "Dark", "name": "突襲" },
      { "rank": 2, "type": "Bug", "name": "急速折返" },
      { "rank": 3, "type": "Water", "name": "水流裂破" },
      { "rank": 3, "type": "Water", "name": "浸水" },
      { "rank": 3, "type": "Water", "name": "求雨" },
      { "rank": 4, "type": "Normal", "name": "影子分身" },
      { "rank": 4, "type": "Ice", "name": "黑霧" },
      { "rank": 4, "type": "Water", "name": "水流噴射" }
    ]
  },
  {
    "id": "818",
    "region": "galar",
    "name": "千面避役",
    "alias": "Inteleon",
    "type": [
      "Water"
    ],
    "info": {
      "image": "images/pokedex/818.png",
      "height": "1.9",
      "weight": "45.2",
      "category": "特工寶可夢",
      "text": "牠的指尖能夠射出快得不可思議的水枪，这道水流甚至能夠射穿鐵板。牠通常會在高處狩獵，射击，然后滑翔而下去享用牠的獵物。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 5,
    "rank": 4,
    "attr": {
      "str": { "value": 2, "max": 5 },
      "dex": { "value": 3, "max": 7 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 3, "max": 7 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "激流"
    ],
    "moves": [
      { "rank": 0, "type": "Water", "name": "狙擊" },
      { "rank": 0, "type": "Flying", "name": "雜耍" },
      { "rank": 1, "type": "Normal", "name": "拍擊" },
      { "rank": 1, "type": "Normal", "name": "叫聲" },
      { "rank": 2, "type": "Water", "name": "水枪" },
      { "rank": 2, "type": "Normal", "name": "綁紧" },
      { "rank": 2, "type": "Water", "name": "水之波动" },
      { "rank": 2, "type": "Normal", "name": "淚眼汪汪" },
      { "rank": 2, "type": "Dark", "name": "突襲" },
      { "rank": 3, "type": "Bug", "name": "急速折返" },
      { "rank": 3, "type": "Water", "name": "水流裂破" },
      { "rank": 3, "type": "Water", "name": "浸水" },
      { "rank": 3, "type": "Water", "name": "求雨" },
      { "rank": 3, "type": "Water", "name": "水砲" },
      { "rank": 4, "type": "Ice", "name": "冰礫" },
      { "rank": 4, "type": "Bug", "name": "致命針刺" },
      { "rank": 4, "type": "Water", "name": "加農水炮" }
    ]
  },
  {
    "id": "819",
    "region": "galar",
    "name": "貪心栗鼠",
    "alias": "Skwovet",
    "type": [
      "Normal"
    ],
    "info": {
      "image": "images/pokedex/819.png",
      "height": "0.3",
      "weight": "2.5",
      "category": "貪吃寶可夢",
      "text": "牠們喜歡把樹果跟堅果塞满牠們的颊囊，如果颊囊没塞東西的话就會感到不安。如果你餵食了其中一隻，牠們就會跟著你並呼叫同伴好讓你也餵食牠們全部。"
    },
    "evolution": {
      "stage": "first",
      "time": "medium"
    },
    "baseHP": 3,
    "rank": 0,
    "attr": {
      "str": { "value": 2, "max": 4 },
      "dex": { "value": 1, "max": 3 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 1, "max": 3 },
      "ins": { "value": 1, "max": 3 }
    },
    "ability": [
      "颊囊"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 0, "type": "Normal", "name": "搖尾巴" },
      { "rank": 1, "type": "Dark", "name": "咬住" },
      { "rank": 1, "type": "Normal", "name": "大快朵頤" },
      { "rank": 2, "type": "Normal", "name": "蓄力" },
      { "rank": 2, "type": "Normal", "name": "吞下" },
      { "rank": 2, "type": "Normal", "name": "噴出" },
      { "rank": 2, "type": "Normal", "name": "泰山壓頂" },
      { "rank": 2, "type": "Psychic", "name": "睡覺" },
      { "rank": 2, "type": "Fight", "name": "双倍奉還" },
      { "rank": 2, "type": "Grass", "name": "种子机关枪" },
      { "rank": 3, "type": "Normal", "name": "憤怒門牙" },
      { "rank": 3, "type": "Poison", "name": "打嗝" },
      { "rank": 4, "type": "Normal", "name": "變圓" },
      { "rank": 4, "type": "Rock", "name": "滾动" },
      { "rank": 4, "type": "Dark", "name": "咬碎" }
    ],
    "isNovice": true
  },
  {
    "id": "820",
    "region": "galar",
    "name": "藏飽栗鼠",
    "alias": "Greedent",
    "type": [
      "Normal"
    ],
    "info": {
      "image": "images/pokedex/820.png",
      "height": "0.6",
      "weight": "6",
      "category": "貪慾寶可夢",
      "text": "牠們有点遲鈍，因为牠們腦中只想著吃。藏飽栗鼠會在尾巴裡囤積樹果，但許多樹果會從中掉落，並在隔年长成新的果樹。牠們的大牙相当强力。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 5,
    "rank": 2,
    "attr": {
      "str": { "value": 3, "max": 6 },
      "dex": { "value": 1, "max": 3 },
      "vit": { "value": 3, "max": 6 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "颊囊",
      "貪吃鬼"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "渴望" },
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 1, "type": "Normal", "name": "搖尾巴" },
      { "rank": 1, "type": "Dark", "name": "咬住" },
      { "rank": 2, "type": "Normal", "name": "大快朵頤" },
      { "rank": 2, "type": "Normal", "name": "蓄力" },
      { "rank": 2, "type": "Normal", "name": "吞下" },
      { "rank": 2, "type": "Normal", "name": "噴出" },
      { "rank": 2, "type": "Normal", "name": "泰山壓頂" },
      { "rank": 3, "type": "Psychic", "name": "睡覺" },
      { "rank": 3, "type": "Fight", "name": "双倍奉還" },
      { "rank": 3, "type": "Grass", "name": "种子机关枪" },
      { "rank": 3, "type": "Normal", "name": "憤怒門牙" },
      { "rank": 3, "type": "Poison", "name": "打嗝" },
      { "rank": 4, "type": "Normal", "name": "珍藏" },
      { "rank": 4, "type": "Normal", "name": "腹鼓" },
      { "rank": 4, "type": "Dark", "name": "咬碎" }
    ]
  },
  {
    "id": "821",
    "region": "galar",
    "name": "稚山雀",
    "alias": "Rookidee",
    "type": [
      "Flying"
    ],
    "info": {
      "image": "images/pokedex/821.png",
      "height": "0.2",
      "weight": "1.8",
      "category": "小鳥寶可夢",
      "text": "勇敢好鬥的小東西，稚山雀以會勇於对体型比自己巨大的对手发起挑戰而知名，且就算牠們被打败，牠們也不會放棄，並會在之后再试一次。牠們會利用自己的娇小体型來取得優勢。"
    },
    "evolution": {
      "stage": "first",
      "time": "medium"
    },
    "baseHP": 3,
    "rank": 1,
    "attr": {
      "str": { "value": 2, "max": 4 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 1, "max": 3 },
      "spe": { "value": 1, "max": 3 },
      "ins": { "value": 1, "max": 3 }
    },
    "ability": [
      "銳利目光",
      "紧张感"
    ],
    "moves": [
      { "rank": 0, "type": "Flying", "name": "啄" },
      { "rank": 0, "type": "Normal", "name": "瞪眼" },
      { "rank": 1, "type": "Dark", "name": "囂张" },
      { "rank": 1, "type": "Dark", "name": "磨爪" },
      { "rank": 2, "type": "Normal", "name": "亂擊" },
      { "rank": 2, "type": "Flying", "name": "啄食" },
      { "rank": 2, "type": "Dark", "name": "挑釁" },
      { "rank": 2, "type": "Normal", "name": "鬼面" },
      { "rank": 3, "type": "Flying", "name": "啄鑽" },
      { "rank": 3, "type": "Normal", "name": "虚张聲勢" },
      { "rank": 3, "type": "Flying", "name": "勇鳥猛攻" },
      { "rank": 4, "type": "Ghost", "name": "怨恨" },
      { "rank": 4, "type": "Flying", "name": "清除濃霧" },
      { "rank": 4, "type": "Ground", "name": "潑沙" }
    ],
    "isNovice": true
  },
  {
    "id": "822",
    "region": "galar",
    "name": "藍鴉",
    "alias": "Corvisquire",
    "type": [
      "Flying"
    ],
    "info": {
      "image": "images/pokedex/822.png",
      "height": "0.8",
      "weight": "16.0",
      "category": "烏鴉寶可夢",
      "text": "牠們头腦聰明，懂得在戰鬥中使用工具。曾有人目擊这些寶可夢撿起石头投向敵人、或用繩子將敵人捆住。牠們懂得謹慎地选擇戰鬥，且不會輕言撤退。"
    },
    "evolution": {
      "stage": "second",
      "time": "medium"
    },
    "baseHP": 4,
    "rank": 2,
    "attr": {
      "str": { "value": 2, "max": 4 },
      "dex": { "value": 2, "max": 5 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 1, "max": 3 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "銳利目光",
      "紧张感"
    ],
    "moves": [
      { "rank": 0, "type": "Flying", "name": "啄" },
      { "rank": 1, "type": "Normal", "name": "瞪眼" },
      { "rank": 1, "type": "Dark", "name": "囂张" },
      { "rank": 1, "type": "Dark", "name": "磨爪" },
      { "rank": 2, "type": "Normal", "name": "亂擊" },
      { "rank": 2, "type": "Flying", "name": "啄食" },
      { "rank": 2, "type": "Dark", "name": "挑釁" },
      { "rank": 2, "type": "Normal", "name": "鬼面" },
      { "rank": 3, "type": "Flying", "name": "啄鑽" },
      { "rank": 3, "type": "Normal", "name": "虚张聲勢" },
      { "rank": 3, "type": "Flying", "name": "勇鳥猛攻" },
      { "rank": 4, "type": "Flying", "name": "羽棲" },
      { "rank": 4, "type": "Flying", "name": "順風" },
      { "rank": 4, "type": "Fight", "name": "碎岩" }
    ]
  },
  {
    "id": "823",
    "region": "galar",
    "name": "鋼鎧鴉",
    "alias": "Corviknight",
    "type": [
      "Flying",
      "Steel"
    ],
    "info": {
      "image": "images/pokedex/823.png",
      "height": "2.2",
      "weight": "75.0",
      "category": "烏鴉寶可夢",
      "text": "靠著牠們優秀的飛行能力和极度聰明的头腦，这些寶可夢在伽勒爾地區的空中所向无敵。当牠們飛行时，牠們會在地面投下巨大的影子，使敵友双方都不禁畏懼三分。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 6,
    "rank": 3,
    "attr": {
      "str": { "value": 2, "max": 5 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 3, "max": 6 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "壓迫感",
      "镜甲"
    ],
    "moves": [
      { "rank": 1, "type": "Flying", "name": "啄" },
      { "rank": 1, "type": "Normal", "name": "瞪眼" },
      { "rank": 2, "type": "Steel", "name": "鋼翼" },
      { "rank": 2, "type": "Steel", "name": "鐵壁" },
      { "rank": 2, "type": "Steel", "name": "金属音" },
      { "rank": 2, "type": "Dark", "name": "囂张" },
      { "rank": 2, "type": "Dark", "name": "磨爪" },
      { "rank": 2, "type": "Normal", "name": "亂擊" },
      { "rank": 2, "type": "Flying", "name": "啄食" },
      { "rank": 3, "type": "Dark", "name": "挑釁" },
      { "rank": 3, "type": "Normal", "name": "鬼面" },
      { "rank": 3, "type": "Flying", "name": "啄鑽" },
      { "rank": 3, "type": "Normal", "name": "虚张聲勢" },
      { "rank": 3, "type": "Flying", "name": "勇鳥猛攻" },
      { "rank": 4, "type": "Flying", "name": "羽棲" },
      { "rank": 4, "type": "Flying", "name": "神鳥猛擊" },
      { "rank": 4, "type": "Steel", "name": "鐵蹄光線" }
    ]
  },
  {
    "id": "824",
    "region": "galar",
    "name": "索侦蟲",
    "alias": "Blipbug",
    "type": [
      "Bug"
    ],
    "info": {
      "image": "images/pokedex/824.png",
      "height": "0.4",
      "weight": "8",
      "category": "幼蟲寶可夢",
      "text": "经常能在田地裡被发现，索侦蟲會透过长在身体上的毛來感應周圍发生的事。牠們头腦相当地聰明且很好教，但力量方面就差了一些，也因此经常被其他寶可夢給欺負。"
    },
    "evolution": {
      "stage": "first",
      "time": "fast"
    },
    "baseHP": 3,
    "rank": 0,
    "attr": {
      "str": { "value": 1, "max": 3 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 1, "max": 3 },
      "spe": { "value": 1, "max": 3 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "蟲之預感",
      "复眼"
    ],
    "moves": [
      { "rank": 0, "type": "Bug", "name": "蟲之抵抗" },
      { "rank": 4, "type": "Bug", "name": "黏黏網" },
      { "rank": 4, "type": "Normal", "name": "超音波" },
      { "rank": 4, "type": "Bug", "name": "死缠烂打" }
    ],
    "isNovice": true
  },
  {
    "id": "825",
    "region": "galar",
    "name": "天罩蟲",
    "alias": "Dottler",
    "type": [
      "Bug",
      "Psychic"
    ],
    "info": {
      "image": "images/pokedex/825.png",
      "height": "0.4",
      "weight": "19",
      "category": "天線罩寶可夢",
      "text": "牠在堅硬的殼裡成长著做好進化的準備。牠幾乎從來不动，且在这段期间完全不吃不喝，因此很多人會误以为牠已经死亡，直到牠的超能力覺醒並开始与他人做精神感應溝通。"
    },
    "evolution": {
      "stage": "second",
      "time": "medium"
    },
    "baseHP": 4,
    "rank": 1,
    "attr": {
      "str": { "value": 1, "max": 3 },
      "dex": { "value": 1, "max": 3 },
      "vit": { "value": 2, "max": 5 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "蟲之預感",
      "复眼"
    ],
    "moves": [
      { "rank": 0, "type": "Bug", "name": "蟲之抵抗" },
      { "rank": 1, "type": "Psychic", "name": "念力" },
      { "rank": 2, "type": "Psychic", "name": "光牆" },
      { "rank": 2, "type": "Psychic", "name": "反射壁" },
      { "rank": 4, "type": "Bug", "name": "黏黏網" },
      { "rank": 4, "type": "Normal", "name": "超音波" },
      { "rank": 4, "type": "Bug", "name": "死缠烂打" }
    ]
  },
  {
    "id": "826",
    "region": "galar",
    "name": "以歐路普",
    "alias": "Orbeetle",
    "type": [
      "Bug",
      "Psychic"
    ],
    "info": {
      "image": "images/pokedex/826.png",
      "height": "0.4",
      "weight": "41",
      "category": "七星寶可夢",
      "text": "牠以头腦聰慧以及大大的腦袋而聞名。牠有著出眾的精神力量。牠們會像漂浮的哨兵一樣在自己的领地上巡邏，用光線照射任何入侵者，即使他們在数英哩外的範圍也一樣。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 5,
    "rank": 1,
    "attr": {
      "str": { "value": 2, "max": 4 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 3, "max": 6 },
      "spe": { "value": 2, "max": 5 },
      "ins": { "value": 3, "max": 7 }
    },
    "ability": [
      "蟲之預感",
      "察覺"
    ],
    "moves": [
      { "rank": 0, "type": "Bug", "name": "蟲之抵抗" },
      { "rank": 1, "type": "Psychic", "name": "念力" },
      { "rank": 1, "type": "Psychic", "name": "光牆" },
      { "rank": 1, "type": "Psychic", "name": "反射壁" },
      { "rank": 2, "type": "Ghost", "name": "奇異之光" },
      { "rank": 2, "type": "Psychic", "name": "魔法反射" },
      { "rank": 2, "type": "Psychic", "name": "高速移动" },
      { "rank": 2, "type": "Psychic", "name": "幻象光線" },
      { "rank": 2, "type": "Psychic", "name": "催眠术" },
      { "rank": 2, "type": "Psychic", "name": "交換場地" },
      { "rank": 2, "type": "Bug", "name": "蟲鳴" },
      { "rank": 2, "type": "Psychic", "name": "镜面反射" },
      { "rank": 3, "type": "Psychic", "name": "精神强念" },
      { "rank": 3, "type": "Normal", "name": "您先请" },
      { "rank": 3, "type": "Psychic", "name": "冥想" },
      { "rank": 3, "type": "Psychic", "name": "精神場地" },
      { "rank": 4, "type": "Bug", "name": "死缠烂打" },
      { "rank": 4, "type": "Normal", "name": "自我再生" },
      { "rank": 4, "type": "Psychic", "name": "封印" }
    ]
  },
  {
    "id": "827",
    "region": "galar",
    "name": "偷兒狐",
    "alias": "Nickit",
    "type": [
      "Dark"
    ],
    "info": {
      "image": "images/pokedex/827.png",
      "height": "0.6",
      "weight": "9",
      "category": "狐狸寶可夢",
      "text": "性情謹慎且狡猾，偷兒狐靠偷盜食物为生。牠會用尾巴擦掉自己的足跡，这讓牠的行蹤非常难以追蹤。牠們活跃在城市中，並會在夜晚偷走商店的東西。"
    },
    "evolution": {
      "stage": "first",
      "time": "medium"
    },
    "baseHP": 3,
    "rank": 1,
    "attr": {
      "str": { "value": 1, "max": 3 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 1, "max": 3 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "逃跑",
      "輕装"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "電光一闪" },
      { "rank": 0, "type": "Normal", "name": "搖尾巴" },
      { "rank": 1, "type": "Dark", "name": "圍攻" },
      { "rank": 1, "type": "Dark", "name": "磨爪" },
      { "rank": 2, "type": "Dark", "name": "大聲咆哮" },
      { "rank": 2, "type": "Dark", "name": "恶意追擊" },
      { "rank": 2, "type": "Dark", "name": "詭计" },
      { "rank": 2, "type": "Dark", "name": "突襲" },
      { "rank": 3, "type": "Dark", "name": "暗襲要害" },
      { "rank": 3, "type": "Normal", "name": "掃尾拍打" },
      { "rank": 3, "type": "Dark", "name": "欺詐" },
      { "rank": 4, "type": "Fairy", "name": "嬉鬧" },
      { "rank": 4, "type": "Dark", "name": "拍落" },
      { "rank": 4, "type": "Dark", "name": "假哭" }
    ],
    "isNovice": true
  },
  {
    "id": "828",
    "region": "galar",
    "name": "狐大盜",
    "alias": "Thievul",
    "type": [
      "Dark"
    ],
    "info": {
      "image": "images/pokedex/828.png",
      "height": "1.2",
      "weight": "20",
      "category": "狐狸寶可夢",
      "text": "牠們因为长期以來对人类聚落帶來的麻煩而被逐電犬群給追獵。牠們是偷盜食物和寶可夢蛋的專家，永遠不會留下自己的蹤跡。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 4,
    "rank": 2,
    "attr": {
      "str": { "value": 2, "max": 4 },
      "dex": { "value": 2, "max": 5 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 2, "max": 5 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "逃跑",
      "輕装"
    ],
    "moves": [
      { "rank": 1, "type": "Dark", "name": "小偷" },
      { "rank": 1, "type": "Normal", "name": "電光一闪" },
      { "rank": 1, "type": "Dark", "name": "磨爪" },
      { "rank": 2, "type": "Normal", "name": "搖尾巴" },
      { "rank": 2, "type": "Dark", "name": "圍攻" },
      { "rank": 2, "type": "Dark", "name": "大聲咆哮" },
      { "rank": 2, "type": "Dark", "name": "恶意追擊" },
      { "rank": 2, "type": "Dark", "name": "詭计" },
      { "rank": 2, "type": "Dark", "name": "突襲" },
      { "rank": 3, "type": "Dark", "name": "暗襲要害" },
      { "rank": 3, "type": "Normal", "name": "掃尾拍打" },
      { "rank": 3, "type": "Dark", "name": "欺詐" },
      { "rank": 3, "type": "Dark", "name": "拋下狠话" },
      { "rank": 4, "type": "Fight", "name": "快速防守" },
      { "rank": 4, "type": "Dark", "name": "恶之波动" },
      { "rank": 4, "type": "Flying", "name": "雜耍" }
    ]
  },
  {
    "id": "829",
    "region": "galar",
    "name": "幼棉棉",
    "alias": "Gossifleur",
    "type": [
      "Grass"
    ],
    "info": {
      "image": "images/pokedex/829.png",
      "height": "0.4",
      "weight": "2.2",
      "category": "花飾寶可夢",
      "text": "你能在野外发现牠們沐浴在陽光下，隨著微風一边转圈圈一边愉快地歌唱。牠們的花朵將在这之后成长綻放。这討人喜歡的表现讓牠在訓練家之中相当受歡迎。"
    },
    "evolution": {
      "stage": "first",
      "time": "medium"
    },
    "baseHP": 3,
    "rank": 1,
    "attr": {
      "str": { "value": 1, "max": 3 },
      "dex": { "value": 1, "max": 2 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 1, "max": 3 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "棉絮", "再生力"
    ],
    "moves": [
      { "rank": 0, "type": "Grass", "name": "樹葉" },
      { "rank": 0, "type": "Normal", "name": "唱歌" },
      { "rank": 1, "type": "Normal", "name": "高速旋转" },
      { "rank": 1, "type": "Normal", "name": "甜甜香氣" },
      { "rank": 2, "type": "Grass", "name": "飛葉快刀" },
      { "rank": 2, "type": "Normal", "name": "輪唱" },
      { "rank": 2, "type": "Grass", "name": "青草攪拌器" },
      { "rank": 2, "type": "Grass", "name": "光合作用" },
      { "rank": 3, "type": "Normal", "name": "巨聲" },
      { "rank": 3, "type": "Grass", "name": "芳香治療" },
      { "rank": 3, "type": "Grass", "name": "飛葉風暴" },
      { "rank": 4, "type": "Normal", "name": "生长" },
      { "rank": 4, "type": "Grass", "name": "寄生种子" },
      { "rank": 4, "type": "Poison", "name": "毒粉" }
    ],
    "isNovice": true
  },
  {
    "id": "830",
    "region": "galar",
    "name": "白蓬蓬",
    "alias": "Eldegoss",
    "type": [
      "Grass"
    ],
    "info": {
      "image": "images/pokedex/830.png",
      "height": "0.5",
      "weight": "2.5",
      "category": "棉飾寶可夢",
      "text": "牠产生的棉絮有著相当动人的光澤，因此用其製成的服装都貴的吓人。在自然界中，牠們是温和且无私的寶可夢，願意讓其他人從牠們头上的棉絮种子中獲取營養。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 4,
    "rank": 2,
    "attr": {
      "str": { "value": 2, "max": 4 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 2, "max": 5 },
      "spe": { "value": 2, "max": 5 },
      "ins": { "value": 3, "max": 7 }
    },
    "ability": [
      "棉絮", "再生力"
    ],
    "moves": [
      { "rank": 0, "type": "Grass", "name": "樹葉" },
      { "rank": 1, "type": "Grass", "name": "棉孢子" },
      { "rank": 1, "type": "Normal", "name": "唱歌" },
      { "rank": 1, "type": "Normal", "name": "高速旋转" },
      { "rank": 2, "type": "Normal", "name": "甜甜香氣" },
      { "rank": 2, "type": "Grass", "name": "飛葉快刀" },
      { "rank": 2, "type": "Normal", "name": "輪唱" },
      { "rank": 3, "type": "Grass", "name": "青草攪拌器" },
      { "rank": 3, "type": "Grass", "name": "光合作用" },
      { "rank": 3, "type": "Normal", "name": "巨聲" },
      { "rank": 3, "type": "Grass", "name": "芳香治療" },
      { "rank": 3, "type": "Grass", "name": "飛葉風暴" },
      { "rank": 3, "type": "Grass", "name": "棉花防守" },
      { "rank": 4, "type": "Grass", "name": "青草場地" },
      { "rank": 4, "type": "Fairy", "name": "撒娇" },
      { "rank": 4, "type": "Grass", "name": "寄生种子" }
    ]
  },
  {
    "id": "831",
    "region": "galar",
    "name": "毛辮羊",
    "alias": "Wooloo",
    "type": [
      "Normal"
    ],
    "info": {
      "image": "images/pokedex/831.png",
      "height": "0.6",
      "weight": "6",
      "category": "綿羊寶可夢",
      "text": "毛辮羊的体毛彈性十足，就算從懸崖上掉下去也可以做为緩衝墊讓自己不會受傷。牠們必須定期剃毛，不然牠們會因为毛长太重而不能动彈。用这些羊毛織成的毛衣结实到能夠陪伴你一輩子。"
    },
    "evolution": {
      "stage": "first",
      "time": "medium"
    },
    "baseHP": 3,
    "rank": 1,
    "attr": {
      "str": { "value": 1, "max": 3 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 1, "max": 3 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "毛茸茸",
      "逃跑"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 0, "type": "Normal", "name": "叫聲" },
      { "rank": 1, "type": "Normal", "name": "變圓" },
      { "rank": 1, "type": "Normal", "name": "仿效" },
      { "rank": 2, "type": "Psychic", "name": "防守平分" },
      { "rank": 2, "type": "Fight", "name": "二連踢" },
      { "rank": 2, "type": "Normal", "name": "头鎚" },
      { "rank": 2, "type": "Normal", "name": "猛撞" },
      { "rank": 3, "type": "Psychic", "name": "防守互換" },
      { "rank": 3, "type": "Fight", "name": "起死回生" },
      { "rank": 3, "type": "Grass", "name": "棉花防守" },
      { "rank": 3, "type": "Normal", "name": "捨身衝撞" },
      { "rank": 4, "type": "Normal", "name": "替身" },
      { "rank": 4, "type": "Psychic", "name": "睡覺" },
      { "rank": 4, "type": "Normal", "name": "夢话" }
    ],
    "isNovice": true
  },
  {
    "id": "832",
    "region": "galar",
    "name": "毛毛角羊",
    "alias": "Dubwool",
    "type": [
      "Normal"
    ],
    "info": {
      "image": "images/pokedex/832.png",
      "height": "1.3",
      "weight": "45",
      "category": "綿羊寶可夢",
      "text": "謙遜而温和，牠們的羊毛就像是彈簧墊一樣。在很久以前曾有國王下令用100隻毛毛角羊的体毛織成一张地毯，而当其完工，那些站上地毯的人都會在那瞬间被蹦彈出去。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 4,
    "rank": 2,
    "attr": {
      "str": { "value": 2, "max": 5 },
      "dex": { "value": 2, "max": 5 },
      "vit": { "value": 3, "max": 6 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "防彈",
      "不屈之心"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 1, "type": "Normal", "name": "叫聲" },
      { "rank": 1, "type": "Normal", "name": "變圓" },
      { "rank": 2, "type": "Normal", "name": "仿效" },
      { "rank": 2, "type": "Psychic", "name": "防守平分" },
      { "rank": 2, "type": "Fight", "name": "二連踢" },
      { "rank": 2, "type": "Normal", "name": "头鎚" },
      { "rank": 2, "type": "Normal", "name": "猛撞" },
      { "rank": 3, "type": "Psychic", "name": "防守互換" },
      { "rank": 3, "type": "Fight", "name": "起死回生" },
      { "rank": 3, "type": "Grass", "name": "棉花防守" },
      { "rank": 3, "type": "Normal", "name": "捨身衝撞" },
      { "rank": 3, "type": "Normal", "name": "珍藏" },
      { "rank": 4, "type": "Flying", "name": "彈跳" },
      { "rank": 4, "type": "Psychic", "name": "高速移动" },
      { "rank": 4, "type": "Normal", "name": "守住" }
    ]
  },
  {
    "id": "833",
    "region": "galar",
    "name": "咬咬龜",
    "alias": "Chewtle",
    "type": [
      "Water"
    ],
    "info": {
      "image": "images/pokedex/833.png",
      "height": "0.3",
      "weight": "8.5",
      "category": "咬住寶可夢",
      "text": "牠用牠头上的角做为主要武器，但什么都咬的特性卻更为知名。很显然这是因为牠的牙齦在长門牙的关係會癢的緣故，且只有咬東西能夠緩解。儘管牠个性有些古怪，但相对无害。"
    },
    "evolution": {
      "stage": "first",
      "time": "medium"
    },
    "baseHP": 3,
    "rank": 1,
    "attr": {
      "str": { "value": 2, "max": 4 },
      "dex": { "value": 1, "max": 3 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 1, "max": 3 },
      "ins": { "value": 1, "max": 3 }
    },
    "ability": [
      "强壮之顎",
      "硬殼盔甲"
    ],
    "moves": [
      { "rank": 0, "type": "Water", "name": "水枪" },
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 1, "type": "Normal", "name": "守住" },
      { "rank": 1, "type": "Dark", "name": "咬住" },
      { "rank": 2, "type": "Dark", "name": "紧咬不放" },
      { "rank": 2, "type": "Fight", "name": "双倍奉還" },
      { "rank": 2, "type": "Normal", "name": "头鎚" },
      { "rank": 3, "type": "Normal", "name": "泰山壓頂" },
      { "rank": 3, "type": "Water", "name": "水流裂破" },
      { "rank": 4, "type": "Dragon", "name": "龍尾" },
      { "rank": 4, "type": "Poison", "name": "胃液" },
      { "rank": 4, "type": "Ice", "name": "冰凍牙" }
    ],
    "isNovice": true
  },
  {
    "id": "834",
    "region": "galar",
    "name": "暴噬龜",
    "alias": "Drednaw",
    "type": [
      "Water",
      "Rock"
    ],
    "info": {
      "image": "images/pokedex/834.png",
      "height": "1",
      "weight": "115",
      "category": "紧咬寶可夢",
      "text": "牠會待在河川或湖泊附近一动也不动，將自己偽装成岩石，直到大口咬住毫无戒心的獵物。由於牠固執到不可思議的性情，一旦東西被牠銳利的牙齿給咬住，就再也拿不回來了。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 4,
    "rank": 2,
    "attr": {
      "str": { "value": 3, "max": 6 },
      "dex": { "value": 2, "max": 5 },
      "vit": { "value": 2, "max": 5 },
      "spe": { "value": 2, "max": 5 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "强壮之顎",
      "硬殼盔甲"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 1, "type": "Water", "name": "貝殼刃" },
      { "rank": 1, "type": "Water", "name": "水枪" },
      { "rank": 2, "type": "Normal", "name": "守住" },
      { "rank": 2, "type": "Rock", "name": "岩石打磨" },
      { "rank": 2, "type": "Rock", "name": "岩石封锁" },
      { "rank": 2, "type": "Fight", "name": "双倍奉還" },
      { "rank": 2, "type": "Normal", "name": "头鎚" },
      { "rank": 2, "type": "Dark", "name": "咬住" },
      { "rank": 3, "type": "Rock", "name": "双刃头錘" },
      { "rank": 3, "type": "Normal", "name": "泰山壓頂" },
      { "rank": 3, "type": "Water", "name": "水流裂破" },
      { "rank": 3, "type": "Dark", "name": "紧咬不放" },
      { "rank": 4, "type": "Normal", "name": "火箭头錘" },
      { "rank": 4, "type": "Dragon", "name": "龍尾" },
      { "rank": 4, "type": "Water", "name": "潛水" }
    ]
  },
  {
    "id": "835",
    "region": "galar",
    "name": "來電汪",
    "alias": "Yamper|ワンパチ",
    "type": [
      "Electric"
    ],
    "info": {
      "image": "images/pokedex/835.png",
      "height": "0.3",
      "weight": "13.5",
      "category": "小狗寶可夢",
      "text": "牠的活力和大大的笑容讓这隻寶可夢成为了相当受歡迎的牧羊犬。牠在奔跑的时候會從尾巴的根部製造出電能。牠熱愛接球，且如果你餵給牠一些零食的话牠就會愛你一輩子。"
    },
    "evolution": {
      "stage": "first",
      "time": "medium"
    },
    "baseHP": 3,
    "rank": 1,
    "attr": {
      "str": { "value": 2, "max": 4 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "撿球"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 0, "type": "Normal", "name": "搖尾巴" },
      { "rank": 1, "type": "Electric", "name": "蹭蹭脸颊" },
      { "rank": 1, "type": "Dark", "name": "咬住" },
      { "rank": 2, "type": "Normal", "name": "吼叫" },
      { "rank": 2, "type": "Electric", "name": "電光" },
      { "rank": 2, "type": "Fairy", "name": "撒娇" },
      { "rank": 2, "type": "Dark", "name": "咬碎" },
      { "rank": 2, "type": "Electric", "name": "充電" },
      { "rank": 3, "type": "Electric", "name": "疯狂伏特" },
      { "rank": 3, "type": "Fairy", "name": "嬉鬧" },
      { "rank": 4, "type": "Ground", "name": "潑沙" },
      { "rank": 4, "type": "Fire", "name": "蓄能焰襲" },
      { "rank": 4, "type": "Normal", "name": "长嚎" }
    ],
    "isNovice": true
  },
  {
    "id": "836",
    "region": "galar",
    "name": "逐電犬",
    "alias": "Boltund",
    "type": [
      "Electric"
    ],
    "info": {
      "image": "images/pokedex/836.png",
      "height": "1",
      "weight": "34",
      "category": "狗寶可夢",
      "text": "牠會將電能傳送到腳上來提升自己的速度，时速能夠輕易超过９０公里。如果你每天不帶牠們出去奔跑，牠們就會累積壓力並變得有破壞性，除卻这一点，牠們是相当隨和好親近的寶可夢。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 4,
    "rank": 2,
    "attr": {
      "str": { "value": 2, "max": 5 },
      "dex": { "value": 3, "max": 7 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 2, "max": 5 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "强壮之顎", "好勝"
    ],
    "moves": [
      { "rank": 0, "type": "Electric", "name": "输電" },
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 1, "type": "Normal", "name": "搖尾巴" },
      { "rank": 1, "type": "Electric", "name": "蹭蹭脸颊" },
      { "rank": 2, "type": "Dark", "name": "咬住" },
      { "rank": 2, "type": "Normal", "name": "吼叫" },
      { "rank": 2, "type": "Electric", "name": "電光" },
      { "rank": 2, "type": "Fairy", "name": "撒娇" },
      { "rank": 2, "type": "Dark", "name": "咬碎" },
      { "rank": 3, "type": "Electric", "name": "充電" },
      { "rank": 3, "type": "Electric", "name": "疯狂伏特" },
      { "rank": 3, "type": "Fairy", "name": "嬉鬧" },
      { "rank": 4, "type": "Electric", "name": "電氣場地" },
      { "rank": 4, "type": "Psychic", "name": "精神之牙" },
      { "rank": 4, "type": "Ground", "name": "挖洞" },
      { "rank": 4, "type": "Electric", "name": "雷電牙" }
    ]
  },
  {
    "id": "837",
    "region": "galar",
    "name": "小炭仔",
    "alias": "Rolycoly",
    "type": [
      "Rock"
    ],
    "info": {
      "image": "images/pokedex/837.png",
      "height": "0.3",
      "weight": "12",
      "category": "煤炭寶可夢",
      "text": "这隻寶可夢在煤礦坑中被人們发现。牠看起來就像是一团煤炭，只不过牠會像独輪車那樣移动。牠在憤怒的时候會发出熾熱的光芒，而当牠高興的时候则會发出柔和的噼啪聲，並維持穩定的温暖。"
    },
    "evolution": {
      "stage": "first",
      "time": "medium"
    },
    "baseHP": 3,
    "rank": 1,
    "attr": {
      "str": { "value": 1, "max": 3 },
      "dex": { "value": 1, "max": 3 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 1, "max": 3 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "蒸汽机",
      "耐熱"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 0, "type": "Normal", "name": "煙幕" },
      { "rank": 1, "type": "Normal", "name": "高速旋转" },
      { "rank": 1, "type": "Rock", "name": "擊落" },
      { "rank": 2, "type": "Rock", "name": "岩石打磨" },
      { "rank": 2, "type": "Rock", "name": "原始之力" },
      { "rank": 2, "type": "Fire", "name": "燒盡" },
      { "rank": 3, "type": "Rock", "name": "隱形岩" },
      { "rank": 3, "type": "Fire", "name": "高温重壓" },
      { "rank": 3, "type": "Rock", "name": "岩石爆擊" },
      { "rank": 4, "type": "Normal", "name": "挺住" },
      { "rank": 4, "type": "Ground", "name": "撒菱" },
      { "rank": 4, "type": "Normal", "name": "替身" }
    ],
    "isNovice": true
  },
  {
    "id": "838",
    "region": "galar",
    "name": "大炭車",
    "alias": "Carkol",
    "type": [
      "Rock",
      "Fire"
    ],
    "info": {
      "image": "images/pokedex/838.png",
      "height": "1.1",
      "weight": "78",
      "category": "煤炭寶可夢",
      "text": "牠能旋转自己的腳，讓牠的重量製造出能讓牠在洞穴和隧道中高速移动的軌跡。在过去，人們會使用大炭車的煤炭当作燃料，因为这些煤炭的火焰可以維持很长的时间。"
    },
    "evolution": {
      "stage": "second",
      "time": "medium"
    },
    "baseHP": 4,
    "rank": 2,
    "attr": {
      "str": { "value": 2, "max": 4 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 2, "max": 5 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "蒸汽机",
      "火焰之軀"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 0, "type": "Normal", "name": "煙幕" },
      { "rank": 1, "type": "Fire", "name": "蓄能焰襲" },
      { "rank": 1, "type": "Normal", "name": "高速旋转" },
      { "rank": 2, "type": "Rock", "name": "擊落" },
      { "rank": 2, "type": "Rock", "name": "岩石打磨" },
      { "rank": 2, "type": "Rock", "name": "原始之力" },
      { "rank": 2, "type": "Fire", "name": "燒盡" },
      { "rank": 2, "type": "Rock", "name": "隱形岩" },
      { "rank": 3, "type": "Fire", "name": "高温重壓" },
      { "rank": 3, "type": "Rock", "name": "岩石爆擊" },
      { "rank": 3, "type": "Fire", "name": "燃盡" },
      { "rank": 4, "type": "Ground", "name": "十萬馬力" },
      { "rank": 4, "type": "Water", "name": "熱水" },
      { "rank": 4, "type": "Steel", "name": "鐵壁" }
    ]
  },
  {
    "id": "839",
    "region": "galar",
    "name": "巨炭山",
    "alias": "Coalossal",
    "type": [
      "Rock",
      "Fire"
    ],
    "info": {
      "image": "images/pokedex/839.png",
      "height": "2.8",
      "weight": "310",
      "category": "煤炭寶可夢",
      "text": "牠們平时性情温和，如果牠們認为你是好人，那牠們就會跟你分享温暖。但如果你激怒牠們，你就會面对被燒成灰燼的危險。牠們噴出的瀝青状物质相当容易燃燒。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 6,
    "rank": 3,
    "attr": {
      "str": { "value": 2, "max": 5 },
      "dex": { "value": 1, "max": 3 },
      "vit": { "value": 3, "max": 7 },
      "spe": { "value": 2, "max": 5 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "蒸汽机",
      "引火"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 1, "type": "Normal", "name": "煙幕" },
      { "rank": 1, "type": "Fire", "name": "蓄能焰襲" },
      { "rank": 2, "type": "Rock", "name": "瀝青射击" },
      { "rank": 2, "type": "Normal", "name": "高速旋转" },
      { "rank": 2, "type": "Rock", "name": "擊落" },
      { "rank": 2, "type": "Rock", "name": "岩石打磨" },
      { "rank": 2, "type": "Rock", "name": "原始之力" },
      { "rank": 3, "type": "Fire", "name": "燒盡" },
      { "rank": 3, "type": "Rock", "name": "隱形岩" },
      { "rank": 3, "type": "Fire", "name": "高温重壓" },
      { "rank": 3, "type": "Rock", "name": "岩石爆擊" },
      { "rank": 3, "type": "Fire", "name": "燃盡" },
      { "rank": 4, "type": "Fire", "name": "过熱" },
      { "rank": 4, "type": "Ground", "name": "重踏" },
      { "rank": 4, "type": "Steel", "name": "重磅衝撞" }
    ]
  },
  {
    "id": "840",
    "region": "galar",
    "name": "啃果蟲",
    "alias": "Applin",
    "type": [
      "Grass",
      "Dragon"
    ],
    "info": {
      "image": "images/pokedex/840.png",
      "height": "0.2",
      "weight": "0.5",
      "category": "蘋果居寶可夢",
      "text": "这隻小小的蜥蜴寶可夢一出生的时候，牠就會鑽進蘋果來保護自己來躲避鳥类和其他天敵。这顆蘋果同时也是牠的食物來源，且蘋果的味道會決定牠的進化方向。"
    },
    "evolution": {
      "stage": "first",
      "with": "蘋果"
    },
    "baseHP": 3,
    "rank": 1,
    "attr": {
      "str": { "value": 2, "max": 4 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "熟成",
      "貪吃鬼"
    ],
    "moves": [
      { "rank": 0, "type": "Water", "name": "缩入殼中" },
      { "rank": 0, "type": "Ghost", "name": "驚吓" },
      { "rank": 4, "type": "Normal", "name": "變圓" },
      { "rank": 4, "type": "Rock", "name": "滾动" },
      { "rank": 4, "type": "Normal", "name": "回收利用" }
    ],
    "isNovice": true
  },
  {
    "id": "841",
    "region": "galar",
    "name": "蘋裹龍",
    "alias": "Flapple",
    "type": [
      "Grass",
      "Dragon"
    ],
    "info": {
      "image": "images/pokedex/841.png",
      "height": "0.3",
      "weight": "1",
      "category": "蘋果翅寶可夢",
      "text": "牠在酸蘋果中成长，並因此能夠吐出足以造成灼傷的强酸性液体。牠能用切开的蘋果皮的翅膀飛翔、或用來偽装成发臭的蘋果。他們生性孤僻，因为很少人會喜歡牠們的长相和味道。"
    },
    "evolution": {
      "stage": "final",
      "by": "酸酸蘋果"
    },
    "baseHP": 4,
    "rank": 3,
    "attr": {
      "str": { "value": 3, "max": 6 },
      "dex": { "value": 2, "max": 5 },
      "vit": { "value": 2, "max": 5 },
      "spe": { "value": 3, "max": 6 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "熟成",
      "活力"
    ],
    "moves": [
      { "rank": 0, "type": "Water", "name": "缩入殼中" },
      { "rank": 1, "type": "Ghost", "name": "驚吓" },
      { "rank": 1, "type": "Flying", "name": "翅膀攻擊" },
      { "rank": 1, "type": "Normal", "name": "回收利用" },
      { "rank": 2, "type": "Normal", "name": "生长" },
      { "rank": 2, "type": "Dragon", "name": "龍捲風" },
      { "rank": 2, "type": "Poison", "name": "酸液炸彈" },
      { "rank": 2, "type": "Flying", "name": "雜耍" },
      { "rank": 2, "type": "Grass", "name": "寄生种子" },
      { "rank": 2, "type": "Normal", "name": "守住" },
      { "rank": 2, "type": "Dragon", "name": "龍息" },
      { "rank": 3, "type": "Dragon", "name": "龍之舞" },
      { "rank": 3, "type": "Dragon", "name": "龍之波动" },
      { "rank": 3, "type": "Grass", "name": "萬有引力" },
      { "rank": 3, "type": "Steel", "name": "鐵壁" },
      { "rank": 3, "type": "Flying", "name": "飛翔" },
      { "rank": 3, "type": "Dragon", "name": "龍之俯衝" },
      { "rank": 4, "type": "Dark", "name": "突襲" },
      { "rank": 4, "type": "Dragon", "name": "逆鱗" },
      { "rank": 4, "type": "Dragon", "name": "流星群" }
    ]
  },
  {
    "id": "842",
    "region": "galar",
    "name": "丰蜜龍",
    "alias": "Appletun",
    "type": [
      "Grass",
      "Dragon"
    ],
    "info": {
      "image": "images/pokedex/842.png",
      "height": "0.4",
      "weight": "13",
      "category": "蘋果汁寶可夢",
      "text": "吃了甜蘋果會使牠進化成这个樣子。牠會從体內发出甜甜的香味，引誘牠狩獵的蟲寶可夢上鉤，但这也會吸引其他想吃掉牠背部皮的寶可夢。"
    },
    "evolution": {
      "stage": "final",
      "by": "甜甜蘋果"
    },
    "baseHP": 5,
    "rank": 3,
    "attr": {
      "str": { "value": 2, "max": 5 },
      "dex": { "value": 1, "max": 3 },
      "vit": { "value": 2, "max": 5 },
      "spe": { "value": 3, "max": 6 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "熟成",
      "厚脂肪"
    ],
    "moves": [
      { "rank": 0, "type": "Water", "name": "缩入殼中" },
      { "rank": 1, "type": "Ghost", "name": "驚吓" },
      { "rank": 1, "type": "Normal", "name": "头鎚" },
      { "rank": 1, "type": "Normal", "name": "回收利用" },
      { "rank": 2, "type": "Normal", "name": "生长" },
      { "rank": 2, "type": "Normal", "name": "甜甜香氣" },
      { "rank": 2, "type": "Ghost", "name": "詛咒" },
      { "rank": 2, "type": "Normal", "name": "踩踏" },
      { "rank": 2, "type": "Grass", "name": "寄生种子" },
      { "rank": 2, "type": "Normal", "name": "守住" },
      { "rank": 2, "type": "Grass", "name": "种子机关枪" },
      { "rank": 3, "type": "Normal", "name": "自我再生" },
      { "rank": 3, "type": "Grass", "name": "蘋果酸" },
      { "rank": 3, "type": "Normal", "name": "泰山壓頂" },
      { "rank": 3, "type": "Steel", "name": "鐵壁" },
      { "rank": 3, "type": "Dragon", "name": "龍之波动" },
      { "rank": 3, "type": "Grass", "name": "能量球" },
      { "rank": 4, "type": "Grass", "name": "終极吸取" },
      { "rank": 4, "type": "Grass", "name": "日光束" },
      { "rank": 4, "type": "Dragon", "name": "流星群" }
    ]
  },
  {
    "id": "843",
    "region": "galar",
    "name": "沙包蛇",
    "alias": "Silicobra",
    "type": [
      "Ground"
    ],
    "info": {
      "image": "images/pokedex/843.png",
      "height": "2.2",
      "weight": "8",
      "category": "沙蛇寶可夢",
      "text": "沙包蛇看起來相当兇猛，但牠們其实只不过是想要不被打擾。牠們會從鼻孔噴射出沙子，趁敵人看不清的时候躲進地底下藏身。"
    },
    "evolution": {
      "stage": "first",
      "time": "slow"
    },
    "baseHP": 4,
    "rank": 2,
    "attr": {
      "str": { "value": 2, "max": 4 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 2, "max": 5 },
      "spe": { "value": 1, "max": 3 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "吐沙",
      "蛻皮"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "紧束" },
      { "rank": 1, "type": "Ground", "name": "潑沙" },
      { "rank": 1, "type": "Normal", "name": "變小" },
      { "rank": 2, "type": "Dark", "name": "狂舞揮打" },
      { "rank": 2, "type": "Ground", "name": "重踏" },
      { "rank": 2, "type": "Normal", "name": "摔打" },
      { "rank": 2, "type": "Normal", "name": "大蛇瞪眼" },
      { "rank": 2, "type": "Ground", "name": "挖洞" },
      { "rank": 2, "type": "Rock", "name": "沙暴" },
      { "rank": 3, "type": "Normal", "name": "头鎚" },
      { "rank": 3, "type": "Poison", "name": "盤蜷" },
      { "rank": 3, "type": "Ground", "name": "流沙地獄" },
      { "rank": 4, "type": "Ground", "name": "掷泥" },
      { "rank": 4, "type": "Poison", "name": "毒尾" },
      { "rank": 4, "type": "Normal", "name": "珍藏" }
    ],
    "isNovice": true
  },
  {
    "id": "844",
    "region": "galar",
    "name": "沙螺蟒",
    "alias": "Sandaconda",
    "type": [
      "Ground"
    ],
    "info": {
      "image": "images/pokedex/844.png",
      "height": "3.8",
      "weight": "65",
      "category": "沙蛇寶可夢",
      "text": "牠有著能夠容納最多200磅沙土的沙囊，牠盤繞自己身体的方式能讓牠更有效率地把沙子噴向敵人。如果没有了沙子，牠就會變得懦弱且抑鬱。牠們不算友善，但並不是很有攻擊性。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 6,
    "rank": 3,
    "attr": {
      "str": { "value": 3, "max": 6 },
      "dex": { "value": 2, "max": 5 },
      "vit": { "value": 3, "max": 7 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "吐沙",
      "沙隱"
    ],
    "moves": [
      { "rank": 1, "type": "Normal", "name": "紧束" },
      { "rank": 1, "type": "Ground", "name": "潑沙" },
      { "rank": 1, "type": "Normal", "name": "火箭头錘" },
      { "rank": 2, "type": "Normal", "name": "變小" },
      { "rank": 2, "type": "Dark", "name": "狂舞揮打" },
      { "rank": 2, "type": "Ground", "name": "重踏" },
      { "rank": 2, "type": "Normal", "name": "头鎚" },
      { "rank": 3, "type": "Normal", "name": "大蛇瞪眼" },
      { "rank": 3, "type": "Ground", "name": "挖洞" },
      { "rank": 3, "type": "Rock", "name": "沙暴" },
      { "rank": 3, "type": "Normal", "name": "摔打" },
      { "rank": 3, "type": "Poison", "name": "盤蜷" },
      { "rank": 3, "type": "Ground", "name": "流沙地獄" },
      { "rank": 4, "type": "Flying", "name": "暴風" },
      { "rank": 4, "type": "Dragon", "name": "龍之俯衝" },
      { "rank": 4, "type": "Normal", "name": "終极衝擊" }
    ]
  },
  {
    "id": "845",
    "region": "galar",
    "name": "古月鳥",
    "alias": "Cramorant",
    "type": [
      "Flying",
      "Water"
    ],
    "info": {
      "image": "images/pokedex/845.png",
      "height": "0.8",
      "weight": "18",
      "category": "一口吞寶可夢",
      "text": "古月鳥會從附近的海岸和湖泊捕魚寶可夢來吃。牠們经常會嘗试一口吞下太大的獵物，结果卻卡在了喉嚨裡。牠們記性很差，且经常會忘記自己在幹嘛。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 4,
    "rank": 2,
    "attr": {
      "str": { "value": 2, "max": 5 },
      "dex": { "value": 2, "max": 5 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 2, "max": 5 },
      "ins": { "value": 3, "max": 6 }
    },
    "ability": [
      "一口飛彈"
    ],
    "moves": [
      { "rank": 0, "type": "Poison", "name": "打嗝" },
      { "rank": 1, "type": "Flying", "name": "啄" },
      { "rank": 1, "type": "Normal", "name": "蓄力" },
      { "rank": 1, "type": "Normal", "name": "吞下" },
      { "rank": 2, "type": "Normal", "name": "噴出" },
      { "rank": 2, "type": "Water", "name": "水枪" },
      { "rank": 2, "type": "Normal", "name": "亂擊" },
      { "rank": 2, "type": "Flying", "name": "啄食" },
      { "rank": 3, "type": "Water", "name": "潛水" },
      { "rank": 3, "type": "Flying", "name": "啄鑽" },
      { "rank": 3, "type": "Psychic", "name": "瞬间失憶" },
      { "rank": 3, "type": "Normal", "name": "大鬧一番" },
      { "rank": 3, "type": "Water", "name": "水砲" },
      { "rank": 4, "type": "Flying", "name": "羽棲" },
      { "rank": 4, "type": "Water", "name": "水流环" },
      { "rank": 4, "type": "Flying", "name": "羽毛舞" }
    ]
  },
  {
    "id": "846",
    "region": "galar",
    "name": "刺梭魚",
    "alias": "Arrokuda",
    "type": [
      "Water"
    ],
    "info": {
      "image": "images/pokedex/846.png",
      "height": "0.5",
      "weight": "1",
      "category": "突擊寶可夢",
      "text": "牠們會推進自己向前，以超高速度狩獵牠們的獵物。吃飽了之后动作會變得极度遲緩，且很容易讓自己被吃掉。牠們以自己尖銳的下巴为傲。"
    },
    "evolution": {
      "stage": "first",
      "time": "medium"
    },
    "baseHP": 3,
    "rank": 2,
    "attr": {
      "str": { "value": 2, "max": 4 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 1, "max": 3 },
      "spe": { "value": 1, "max": 3 },
      "ins": { "value": 1, "max": 3 }
    },
    "ability": [
      "悠游自如",
      "螺旋尾鰭"
    ],
    "moves": [
      { "rank": 0, "type": "Flying", "name": "啄" },
      { "rank": 0, "type": "Water", "name": "水流噴射" },
      { "rank": 1, "type": "Normal", "name": "亂擊" },
      { "rank": 1, "type": "Dark", "name": "咬住" },
      { "rank": 2, "type": "Psychic", "name": "高速移动" },
      { "rank": 2, "type": "Water", "name": "潛水" },
      { "rank": 2, "type": "Normal", "name": "磨礪" },
      { "rank": 2, "type": "Dark", "name": "咬碎" },
      { "rank": 3, "type": "Water", "name": "水流裂破" },
      { "rank": 3, "type": "Normal", "name": "捨身衝撞" },
      { "rank": 4, "type": "Normal", "name": "劈开" },
      { "rank": 4, "type": "Ground", "name": "直衝鑽" },
      { "rank": 4, "type": "Ice", "name": "冰凍牙" }
    ],
    "isNovice": true
  },
  {
    "id": "847",
    "region": "galar",
    "name": "戽斗尖梭",
    "alias": "Barraskewda",
    "type": [
      "Water"
    ],
    "info": {
      "image": "images/pokedex/847.png",
      "height": "1.3",
      "weight": "30",
      "category": "穿刺寶可夢",
      "text": "这隻寶可夢有著像长矛一樣尖銳、像鋼鐵般堅硬的下巴。據说戽斗尖梭的肉好吃得驚人。当牠們狩獵时，牠們會以超过１００节的高速貫穿獵物。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 4,
    "rank": 2,
    "attr": {
      "str": { "value": 3, "max": 7 },
      "dex": { "value": 3, "max": 7 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "悠游自如",
      "螺旋尾鰭"
    ],
    "moves": [
      { "rank": 0, "type": "Flying", "name": "啄" },
      { "rank": 1, "type": "Water", "name": "水流噴射" },
      { "rank": 2, "type": "Normal", "name": "亂擊" },
      { "rank": 2, "type": "Dark", "name": "咬住" },
      { "rank": 2, "type": "Psychic", "name": "高速移动" },
      { "rank": 2, "type": "Water", "name": "潛水" },
      { "rank": 2, "type": "Normal", "name": "磨礪" },
      { "rank": 2, "type": "Dark", "name": "地獄突刺" },
      { "rank": 3, "type": "Dark", "name": "咬碎" },
      { "rank": 3, "type": "Water", "name": "水流裂破" },
      { "rank": 3, "type": "Normal", "name": "捨身衝撞" },
      { "rank": 4, "type": "Dark", "name": "暗襲要害" },
      { "rank": 4, "type": "Poison", "name": "毒擊" },
      { "rank": 4, "type": "Normal", "name": "終极衝擊" }
    ]
  },
  {
    "id": "848",
    "region": "galar",
    "name": "毒電嬰",
    "alias": "Toxel",
    "type": [
      "Electric",
      "Poison"
    ],
    "info": {
      "image": "images/pokedex/848.png",
      "height": "0.4",
      "weight": "11",
      "category": "嬰兒寶可夢",
      "text": "毒電嬰會從皮肤分泌出毒素，牠越接近進化，牠皮肤的顏色就會變得更亮。牠們需要大量的照護，但因为牠們的壞脾氣和没禮貌，所以没有多少人會願意接下这个任務。"
    },
    "evolution": {
      "stage": "first",
      "time": "slow"
    },
    "baseHP": 3,
    "rank": 2,
    "attr": {
      "str": { "value": 1, "max": 3 },
      "dex": { "value": 1, "max": 3 },
      "vit": { "value": 1, "max": 3 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 1, "max": 3 }
    },
    "ability": [
      "膽怯",
      "靜電"
    ],
    "moves": [
      { "rank": 0, "type": "Electric", "name": "蹭蹭脸颊" },
      { "rank": 0, "type": "Normal", "name": "淚眼汪汪" },
      { "rank": 0, "type": "Normal", "name": "叫聲" },
      { "rank": 1, "type": "Normal", "name": "抓狂" },
      { "rank": 1, "type": "Poison", "name": "溶解液" },
      { "rank": 2, "type": "Poison", "name": "打嗝" },
      { "rank": 4, "type": "Normal", "name": "再來一次" },
      { "rank": 4, "type": "Psychic", "name": "睡覺" },
      { "rank": 4, "type": "Normal", "name": "輪唱" }
    ],
    "isNovice": true
  },
  {
    "id": "849",
    "region": "galar",
    "name": "顫弦蠑螈 (高调)",
    "alias": "Toxtricity",
    "type": [
      "Electric",
      "Poison"
    ],
    "info": {
      "image": "images/pokedex/849.png",
      "height": "1.6",
      "weight": "40",
      "category": "庞克寶可夢",
      "text": "通常被稱作「高调型態」，牠的性格會決定牠的進化方向。如果毒電嬰是外向的性格，牠就會進化成脾氣暴躁的顫弦蠑螈。牠們會釋放出高音频的聲音，並釋放出强大的電流來激怒他人。"
    },
    "evolution": {
      "stage": "final",
      "by": "外向的性格"
    },
    "baseHP": 4,
    "rank": 2,
    "attr": {
      "str": { "value": 3, "max": 6 },
      "dex": { "value": 2, "max": 5 },
      "vit": { "value": 2, "max": 5 },
      "spe": { "value": 3, "max": 6 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "庞克搖滾",
      "正電"
    ],
    "moves": [
      { "rank": 0, "type": "Electric", "name": "蹭蹭脸颊" },
      { "rank": 1, "type": "Normal", "name": "叫聲" },
      { "rank": 1, "type": "Electric", "name": "電光" },
      { "rank": 1, "type": "Electric", "name": "怪異電波" },
      { "rank": 2, "type": "Normal", "name": "抓狂" },
      { "rank": 2, "type": "Normal", "name": "淚眼汪汪" },
      { "rank": 2, "type": "Electric", "name": "電擊" },
      { "rank": 2, "type": "Poison", "name": "溶解液" },
      { "rank": 2, "type": "Normal", "name": "瞪眼" },
      { "rank": 2, "type": "Poison", "name": "酸液炸彈" },
      { "rank": 2, "type": "Electric", "name": "充電" },
      { "rank": 2, "type": "Normal", "name": "戰吼" },
      { "rank": 2, "type": "Normal", "name": "鬼面" },
      { "rank": 2, "type": "Electric", "name": "電擊波" },
      { "rank": 2, "type": "Poison", "name": "毒液衝擊" },
      { "rank": 2, "type": "Dark", "name": "挑釁" },
      { "rank": 3, "type": "Poison", "name": "打嗝" },
      { "rank": 3, "type": "Normal", "name": "刺耳聲" },
      { "rank": 3, "type": "Normal", "name": "虚张聲勢" },
      { "rank": 3, "type": "Poison", "name": "劇毒" },
      { "rank": 3, "type": "Electric", "name": "放電" },
      { "rank": 3, "type": "Poison", "name": "毒擊" },
      { "rank": 3, "type": "Electric", "name": "破音" },
      { "rank": 3, "type": "Normal", "name": "爆音波" },
      { "rank": 3, "type": "Steel", "name": "換檔" },
      { "rank": 4, "type": "Fight", "name": "增强拳" },
      { "rank": 4, "type": "Steel", "name": "金属音" },
      { "rank": 4, "type": "Normal", "name": "輪唱" }
    ]
  },
  {
    "id": "849-low",
    "region": "galar",
    "name": "顫弦蠑螈 (低调)",
    "alias": "Toxtricity",
    "type": [
      "Electric",
      "Poison"
    ],
    "info": {
      "image": "images/pokedex/849-low.png",
      "height": "1.6",
      "weight": "40",
      "category": "庞克寶可夢",
      "text": "通常被稱作「低调型態」，牠的性格會決定牠的進化方向。如果毒電嬰是內向的性格，牠就會進化成个性冷淡的顫弦蠑螈。牠們會釋放出低音频的聲音，並會看不起那些嘗试激怒牠的人們。"
    },
    "evolution": {
      "stage": "final",
      "by": "內向的性格"
    },
    "baseHP": 4,
    "rank": 2,
    "attr": {
      "str": { "value": 3, "max": 6 },
      "dex": { "value": 2, "max": 5 },
      "vit": { "value": 2, "max": 5 },
      "spe": { "value": 3, "max": 6 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "庞克搖滾",
      "負電"
    ],
    "moves": [
      { "rank": 0, "type": "Electric", "name": "蹭蹭脸颊" },
      { "rank": 1, "type": "Normal", "name": "叫聲" },
      { "rank": 1, "type": "Electric", "name": "電光" },
      { "rank": 1, "type": "Electric", "name": "怪異電波" },
      { "rank": 2, "type": "Normal", "name": "抓狂" },
      { "rank": 2, "type": "Normal", "name": "淚眼汪汪" },
      { "rank": 2, "type": "Electric", "name": "電擊" },
      { "rank": 2, "type": "Poison", "name": "溶解液" },
      { "rank": 2, "type": "Normal", "name": "瞪眼" },
      { "rank": 2, "type": "Poison", "name": "酸液炸彈" },
      { "rank": 2, "type": "Electric", "name": "充電" },
      { "rank": 2, "type": "Normal", "name": "戰吼" },
      { "rank": 2, "type": "Normal", "name": "鬼面" },
      { "rank": 2, "type": "Electric", "name": "電擊波" },
      { "rank": 2, "type": "Poison", "name": "毒液衝擊" },
      { "rank": 2, "type": "Dark", "name": "挑釁" },
      { "rank": 3, "type": "Poison", "name": "打嗝" },
      { "rank": 3, "type": "Normal", "name": "刺耳聲" },
      { "rank": 3, "type": "Normal", "name": "虚张聲勢" },
      { "rank": 3, "type": "Poison", "name": "劇毒" },
      { "rank": 3, "type": "Electric", "name": "放電" },
      { "rank": 3, "type": "Poison", "name": "毒擊" },
      { "rank": 3, "type": "Electric", "name": "破音" },
      { "rank": 3, "type": "Normal", "name": "爆音波" },
      { "rank": 3, "type": "Steel", "name": "換檔" },
      { "rank": 4, "type": "Fight", "name": "增强拳" },
      { "rank": 4, "type": "Steel", "name": "金属音" },
      { "rank": 4, "type": "Normal", "name": "輪唱" }
    ]
  },
  {
    "id": "850",
    "region": "galar",
    "name": "燒火蚣",
    "alias": "Sizzlipede",
    "type": [
      "Fire",
      "Bug"
    ],
    "info": {
      "image": "images/pokedex/850.png",
      "height": "0.7",
      "weight": "1",
      "category": "发熱寶可夢",
      "text": "牠把可燃氣体儲存在体內來发熱。牠肚子上的黄色部分會變得非常熱。牠會用滾燙的身体勒紧獵物，然后一口口把獵物吃得一点也不剩。"
    },
    "evolution": {
      "stage": "first",
      "time": "slow"
    },
    "baseHP": 3,
    "rank": 2,
    "attr": {
      "str": { "value": 2, "max": 4 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "引火",
      "白色煙霧"
    ],
    "moves": [
      { "rank": 0, "type": "Fire", "name": "火花" },
      { "rank": 0, "type": "Normal", "name": "煙幕" },
      { "rank": 1, "type": "Normal", "name": "紧束" },
      { "rank": 1, "type": "Dark", "name": "咬住" },
      { "rank": 2, "type": "Fire", "name": "火焰輪" },
      { "rank": 2, "type": "Bug", "name": "蟲咬" },
      { "rank": 2, "type": "Poison", "name": "盤蜷" },
      { "rank": 2, "type": "Normal", "name": "摔打" },
      { "rank": 2, "type": "Fire", "name": "火焰旋渦" },
      { "rank": 3, "type": "Dark", "name": "咬碎" },
      { "rank": 3, "type": "Fire", "name": "火焰鞭" },
      { "rank": 3, "type": "Bug", "name": "猛撲" },
      { "rank": 4, "type": "Fire", "name": "燃盡" },
      { "rank": 4, "type": "Dark", "name": "拍落" },
      { "rank": 4, "type": "Bug", "name": "蟲之抵抗" },
      { "rank": 4, "type": "Poison", "name": "毒液衝擊" }
    ],
    "isNovice": true
  },
  {
    "id": "851",
    "region": "galar",
    "name": "焚焰蚣",
    "alias": "Centiskorch",
    "type": [
      "Fire",
      "Bug"
    ],
    "info": {
      "image": "images/pokedex/851.png",
      "height": "0.7",
      "weight": "1",
      "category": "发熱寶可夢",
      "text": "牠會像鞭子那樣弯曲身体，然后把自己甩向敵人。儘管牠燒燙的身体已经相当危險，这极具攻擊性的寶可夢也具有銳利无比的大大獠牙。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 5,
    "rank": 3,
    "attr": {
      "str": { "value": 3, "max": 6 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 2, "max": 5 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "引火",
      "白色煙霧"
    ],
    "moves": [
      { "rank": 0, "type": "Fire", "name": "火花" },
      { "rank": 0, "type": "Normal", "name": "煙幕" },
      { "rank": 1, "type": "Normal", "name": "紧束" },
      { "rank": 1, "type": "Dark", "name": "咬住" },
      { "rank": 2, "type": "Fire", "name": "火焰輪" },
      { "rank": 2, "type": "Bug", "name": "蟲咬" },
      { "rank": 2, "type": "Poison", "name": "盤蜷" },
      { "rank": 2, "type": "Normal", "name": "摔打" },
      { "rank": 2, "type": "Fire", "name": "火焰旋渦" },
      { "rank": 2, "type": "Dark", "name": "咬碎" },
      { "rank": 3, "type": "Fire", "name": "火焰鞭" },
      { "rank": 3, "type": "Bug", "name": "猛撲" },
      { "rank": 3, "type": "Fire", "name": "燃盡" },
      { "rank": 4, "type": "Fire", "name": "火焰牙" },
      { "rank": 4, "type": "Water", "name": "熱水" },
      { "rank": 4, "type": "Electric", "name": "雷電牙" }
    ]
  },
  {
    "id": "852",
    "region": "galar",
    "name": "拳拳蛸",
    "alias": "Clobbopus",
    "type": [
      "Fight"
    ],
    "info": {
      "image": "images/pokedex/852.png",
      "height": "0.6",
      "weight": "4",
      "category": "缠人寶可夢",
      "text": "牠像兒童一樣，且擁有旺盛的好奇心，但牠调查東西的方式是试著用觸手打一打再说。儘管如此，这些觸手经常斷掉，但不用太擔心，因为它們在幾天內就會重新长回來。"
    },
    "evolution": {
      "stage": "first",
      "time": "medium"
    },
    "baseHP": 3,
    "rank": 1,
    "attr": {
      "str": { "value": 2, "max": 4 },
      "dex": { "value": 1, "max": 3 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "柔軟",
      "技术高手"
    ],
    "moves": [
      { "rank": 0, "type": "Fight", "name": "碎岩" },
      { "rank": 0, "type": "Normal", "name": "瞪眼" },
      { "rank": 1, "type": "Normal", "name": "佯攻" },
      { "rank": 1, "type": "Normal", "name": "綁紧" },
      { "rank": 2, "type": "Fight", "name": "看穿" },
      { "rank": 2, "type": "Fight", "name": "劈瓦" },
      { "rank": 2, "type": "Fight", "name": "健美" },
      { "rank": 2, "type": "Fight", "name": "地獄翻滾" },
      { "rank": 2, "type": "Dark", "name": "挑釁" },
      { "rank": 3, "type": "Fight", "name": "起死回生" },
      { "rank": 3, "type": "Fight", "name": "蠻力" },
      { "rank": 4, "type": "Water", "name": "浸水" },
      { "rank": 4, "type": "Fight", "name": "巴投" },
      { "rank": 4, "type": "Fight", "name": "地球上投" }
    ],
    "isNovice": true
  },
  {
    "id": "853",
    "region": "galar",
    "name": "八爪武師",
    "alias": "Grapploct",
    "type": [
      "Fight"
    ],
    "info": {
      "image": "images/pokedex/853.png",
      "height": "1.6",
      "weight": "39",
      "category": "柔术寶可夢",
      "text": "全身都是肌肉的身体讓牠觸手的威力无与倫比。牠們會登上陸地尋找对手，一旦戰鬥结束后就會回到海裡。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 4,
    "rank": 2,
    "attr": {
      "str": { "value": 3, "max": 6 },
      "dex": { "value": 1, "max": 3 },
      "vit": { "value": 2, "max": 5 },
      "spe": { "value": 2, "max": 5 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "柔軟",
      "技术高手"
    ],
    "moves": [
      { "rank": 0, "type": "Fight", "name": "碎岩" },
      { "rank": 0, "type": "Normal", "name": "瞪眼" },
      { "rank": 1, "type": "Normal", "name": "佯攻" },
      { "rank": 1, "type": "Normal", "name": "綁紧" },
      { "rank": 2, "type": "Fight", "name": "看穿" },
      { "rank": 2, "type": "Fight", "name": "劈瓦" },
      { "rank": 2, "type": "Fight", "name": "健美" },
      { "rank": 2, "type": "Fight", "name": "地獄翻滾" },
      { "rank": 2, "type": "Dark", "name": "挑釁" },
      { "rank": 2, "type": "Fight", "name": "蛸固" },
      { "rank": 2, "type": "Water", "name": "章魚桶炮" },
      { "rank": 3, "type": "Fight", "name": "起死回生" },
      { "rank": 3, "type": "Fight", "name": "蠻力" },
      { "rank": 3, "type": "Dark", "name": "顛倒" },
      { "rank": 4, "type": "Fight", "name": "近身戰" },
      { "rank": 4, "type": "Water", "name": "水流裂破" },
      { "rank": 4, "type": "Dark", "name": "狂舞揮打" }
    ]
  },
  {
    "id": "854",
    "region": "galar",
    "name": "來悲茶",
    "alias": "Sinistea",
    "type": [
      "Ghost"
    ],
    "info": {
      "image": "images/pokedex/854.png",
      "height": "0.1",
      "weight": "0.2",
      "category": "紅茶寶可夢",
      "text": "據说这隻寶可夢是因为孤单寂寞的灵魂住進了涼透的喝剩紅茶而诞生的。它會吸走飲用者的精氣，但大家都會因为牠太难喝而馬上把牠吐出來。"
    },
    "evolution": {
      "stage": "first",
      "with": "破裂的茶壺"
    },
    "baseHP": 3,
    "rank": 1,
    "attr": {
      "str": { "value": 2, "max": 4 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 2, "max": 5 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "碎裂鎧甲",
      "詛咒之軀"
    ],
    "moves": [
      { "rank": 0, "type": "Ghost", "name": "驚吓" },
      { "rank": 0, "type": "Water", "name": "缩入殼中" },
      { "rank": 1, "type": "Fairy", "name": "芳香薄霧" },
      { "rank": 1, "type": "Grass", "name": "超级吸取" },
      { "rank": 2, "type": "Normal", "name": "守住" },
      { "rank": 2, "type": "Dark", "name": "突襲" },
      { "rank": 2, "type": "Grass", "name": "芳香治療" },
      { "rank": 2, "type": "Grass", "name": "終极吸取" },
      { "rank": 2, "type": "Ghost", "name": "暗影球" },
      { "rank": 3, "type": "Dark", "name": "詭计" },
      { "rank": 3, "type": "Dark", "name": "臨別禮物" },
      { "rank": 3, "type": "Normal", "name": "破殼" },
      { "rank": 4, "type": "Normal", "name": "替身" },
      { "rank": 4, "type": "Dark", "name": "欺詐" },
      { "rank": 4, "type": "Psychic", "name": "戏法" }
    ],
    "isNovice": true
  },
  {
    "id": "855",
    "region": "galar",
    "name": "怖思壺",
    "alias": "Polteageist",
    "type": [
      "Ghost"
    ],
    "info": {
      "image": "images/pokedex/855.png",
      "height": "0.1",
      "weight": "0.2",
      "category": "紅茶寶可夢",
      "text": "这个物种住在古董茶壺裡。牠們很难找到真貨，因为现在大多数茶具都是贗品。永遠別把你的茶放著不管，否则怖思壺很有可能會來把自己倒進去。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 4,
    "rank": 2,
    "attr": {
      "str": { "value": 2, "max": 4 },
      "dex": { "value": 2, "max": 5 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 3, "max": 7 },
      "ins": { "value": 3, "max": 6 }
    },
    "ability": [
      "碎裂鎧甲",
      "詛咒之軀"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "茶會" },
      { "rank": 0, "type": "Ghost", "name": "驚吓" },
      { "rank": 0, "type": "Water", "name": "缩入殼中" },
      { "rank": 1, "type": "Fairy", "name": "芳香薄霧" },
      { "rank": 1, "type": "Grass", "name": "超级吸取" },
      { "rank": 2, "type": "Normal", "name": "守住" },
      { "rank": 2, "type": "Dark", "name": "突襲" },
      { "rank": 2, "type": "Grass", "name": "芳香治療" },
      { "rank": 2, "type": "Grass", "name": "終极吸取" },
      { "rank": 2, "type": "Ghost", "name": "暗影球" },
      { "rank": 3, "type": "Dark", "name": "詭计" },
      { "rank": 3, "type": "Dark", "name": "臨別禮物" },
      { "rank": 3, "type": "Normal", "name": "破殼" },
      { "rank": 3, "type": "Grass", "name": "吸取力量" },
      { "rank": 4, "type": "Ghost", "name": "灵騷" },
      { "rank": 4, "type": "Psychic", "name": "輔助力量" },
      { "rank": 4, "type": "Normal", "name": "自爆" }
    ]
  },
  {
    "id": "856",
    "region": "galar",
    "name": "迷布莉姆",
    "alias": "Hatenna",
    "type": [
      "Psychic"
    ],
    "info": {
      "image": "images/pokedex/856.png",
      "height": "0.4",
      "weight": "3.4",
      "category": "寧靜寶可夢",
      "text": "透过头部的突起物來感應生物的情感。如果你的性格不夠温和，那牠就永遠不會对你敞开心扉。牠們在人多的地方會感到不知所措，更喜歡独自躲起來。"
    },
    "evolution": {
      "stage": "first",
      "time": "medium"
    },
    "baseHP": 3,
    "rank": 1,
    "attr": {
      "str": { "value": 1, "max": 3 },
      "dex": { "value": 1, "max": 3 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "治癒之心",
      "危險預知"
    ],
    "moves": [
      { "rank": 0, "type": "Psychic", "name": "念力" },
      { "rank": 0, "type": "Normal", "name": "和睦相處" },
      { "rank": 1, "type": "Water", "name": "生命水滴" },
      { "rank": 1, "type": "Fairy", "name": "魅惑之聲" },
      { "rank": 2, "type": "Grass", "name": "芳香治療" },
      { "rank": 2, "type": "Psychic", "name": "幻象光線" },
      { "rank": 2, "type": "Psychic", "name": "治癒波动" },
      { "rank": 2, "type": "Fairy", "name": "魔法闪耀" },
      { "rank": 2, "type": "Psychic", "name": "冥想" },
      { "rank": 3, "type": "Psychic", "name": "精神强念" },
      { "rank": 3, "type": "Psychic", "name": "治癒之願" },
      { "rank": 4, "type": "Electric", "name": "蹭蹭脸颊" },
      { "rank": 4, "type": "Normal", "name": "您先请" },
      { "rank": 4, "type": "Fairy", "name": "芳香薄霧" }
    ],
    "isNovice": true
  },
  {
    "id": "857",
    "region": "galar",
    "name": "提布莉姆",
    "alias": "Hattrem",
    "type": [
      "Psychic"
    ],
    "info": {
      "image": "images/pokedex/857.png",
      "height": "0.6",
      "weight": "4.8",
      "category": "肅靜寶可夢",
      "text": "牠也許看起來很友善，但他实際上相当孤僻。无論你是誰，只要你情緒激昂起來，牠就會使用头上的辮子攻擊你，用粗暴的方式使你沉默。牠不喜歡人多的地方。"
    },
    "evolution": {
      "stage": "second",
      "time": "medium"
    },
    "baseHP": 4,
    "rank": 2,
    "attr": {
      "str": { "value": 1, "max": 3 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 2, "max": 5 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "治癒之心",
      "危險預知"
    ],
    "moves": [
      { "rank": 0, "type": "Psychic", "name": "念力" },
      { "rank": 0, "type": "Normal", "name": "和睦相處" },
      { "rank": 1, "type": "Water", "name": "生命水滴" },
      { "rank": 1, "type": "Fairy", "name": "魅惑之聲" },
      { "rank": 2, "type": "Grass", "name": "芳香治療" },
      { "rank": 2, "type": "Psychic", "name": "幻象光線" },
      { "rank": 2, "type": "Psychic", "name": "治癒波动" },
      { "rank": 2, "type": "Fairy", "name": "魔法闪耀" },
      { "rank": 2, "type": "Psychic", "name": "冥想" },
      { "rank": 2, "type": "Dark", "name": "狂舞揮打" },
      { "rank": 2, "type": "Psychic", "name": "治癒之願" },
      { "rank": 3, "type": "Psychic", "name": "精神强念" },
      { "rank": 4, "type": "Dark", "name": "延后" },
      { "rank": 4, "type": "Electric", "name": "蹭蹭脸颊" },
      { "rank": 4, "type": "Normal", "name": "挺住" }
    ]
  },
  {
    "id": "858",
    "region": "galar",
    "name": "布莉姆温",
    "alias": "Hatterene",
    "type": [
      "Psychic",
      "Fairy"
    ],
    "info": {
      "image": "images/pokedex/858.png",
      "height": "2.1",
      "weight": "5.1",
      "category": "寂靜寶可夢",
      "text": "如果你在牠附近大吵大鬧，那么你就是在冒著被牠用觸手上的爪子撕碎的風險。这隻寶可夢又被稱为森林魔女。牠对於他人的情緒相当敏感，如果牠感受到敵意、恐懼、或憤怒，那牠就會立即攻擊你。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 5,
    "rank": 3,
    "attr": {
      "str": { "value": 2, "max": 5 },
      "dex": { "value": 1, "max": 3 },
      "vit": { "value": 3, "max": 6 },
      "spe": { "value": 3, "max": 7 },
      "ins": { "value": 3, "max": 6 }
    },
    "ability": [
      "治癒之心",
      "危險預知"
    ],
    "moves": [
      { "rank": 0, "type": "Psychic", "name": "念力" },
      { "rank": 0, "type": "Normal", "name": "和睦相處" },
      { "rank": 1, "type": "Water", "name": "生命水滴" },
      { "rank": 1, "type": "Fairy", "name": "魅惑之聲" },
      { "rank": 2, "type": "Grass", "name": "芳香治療" },
      { "rank": 2, "type": "Psychic", "name": "幻象光線" },
      { "rank": 2, "type": "Psychic", "name": "治癒波动" },
      { "rank": 2, "type": "Fairy", "name": "魔法闪耀" },
      { "rank": 2, "type": "Psychic", "name": "冥想" },
      { "rank": 3, "type": "Dark", "name": "狂舞揮打" },
      { "rank": 3, "type": "Psychic", "name": "精神利刃" },
      { "rank": 3, "type": "Psychic", "name": "精神强念" },
      { "rank": 3, "type": "Psychic", "name": "治癒之願" },
      { "rank": 3, "type": "Psychic", "name": "魔法粉" },
      { "rank": 4, "type": "Dark", "name": "恶之波动" },
      { "rank": 4, "type": "Fire", "name": "魔法火焰" },
      { "rank": 4, "type": "Psychic", "name": "光牆" }
    ]
  },
  {
    "id": "110-G",
    "region": "galar",
    "name": "双彈瓦斯 (伽勒爾的樣子)",
    "alias": "Weezing",
    "type": [
      "Poison",
      "Fairy"
    ],
    "info": {
      "image": "images/pokedex/110-G.png",
      "height": "3",
      "weight": "16",
      "category": "毒氣寶可夢",
      "text": "这隻寶可夢會吸收大氣中的污染成分，然后吐出新鮮的空氣。牠在伽勒爾的特殊型態最早是於过去工廠林立、空氣嚴重污染的时代被发现。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 4,
    "rank": 2,
    "attr": {
      "str": { "value": 2, "max": 5 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 3, "max": 7 },
      "spe": { "value": 2, "max": 5 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "飄浮",
      "化学變化氣体"
    ],
    "moves": [
      { "rank": 0, "type": "Poison", "name": "毒瓦斯" },
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 1, "type": "Fairy", "name": "妖精之風" },
      { "rank": 1, "type": "Fairy", "name": "芳香薄霧" },
      { "rank": 1, "type": "Poison", "name": "清除之煙" },
      { "rank": 1, "type": "Poison", "name": "濁霧" },
      { "rank": 1, "type": "Normal", "name": "煙幕" },
      { "rank": 2, "type": "Ice", "name": "黑霧" },
      { "rank": 2, "type": "Flying", "name": "清除濃霧" },
      { "rank": 2, "type": "Normal", "name": "二連擊" },
      { "rank": 2, "type": "Dark", "name": "恶意追擊" },
      { "rank": 2, "type": "Poison", "name": "污泥攻擊" },
      { "rank": 2, "type": "Grass", "name": "芳香治療" },
      { "rank": 2, "type": "Normal", "name": "自爆" },
      { "rank": 2, "type": "Poison", "name": "污泥炸彈" },
      { "rank": 2, "type": "Poison", "name": "劇毒" },
      { "rank": 2, "type": "Poison", "name": "打嗝" },
      { "rank": 3, "type": "Normal", "name": "大爆炸" },
      { "rank": 3, "type": "Fairy", "name": "神奇蒸汽" },
      { "rank": 3, "type": "Ghost", "name": "同命" },
      { "rank": 3, "type": "Dark", "name": "臨別禮物" },
      { "rank": 3, "type": "Fairy", "name": "薄霧場地" },
      { "rank": 4, "type": "Fire", "name": "噴射火焰" },
      { "rank": 4, "type": "Normal", "name": "蓄力" },
      { "rank": 4, "type": "Normal", "name": "吞下" }
    ]
  },
  {
    "id": "859",
    "region": "galar",
    "name": "搗蛋小妖",
    "alias": "Impidimp",
    "type": [
      "Dark",
      "Fairy"
    ],
    "info": {
      "image": "images/pokedex/859.png",
      "height": "0.4",
      "weight": "5",
      "category": "捉弄寶可夢",
      "text": "牠們會透过鼻子吸收人类或寶可夢情緒糟糕时产生的負能量，並從中獲取活力。牠們喜歡拿走不属於牠們的東西。"
    },
    "evolution": {
      "stage": "first",
      "time": "medium"
    },
    "baseHP": 3,
    "rank": 1,
    "attr": {
      "str": { "value": 2, "max": 4 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 1, "max": 3 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 1, "max": 3 }
    },
    "ability": [
      "恶作劇之心",
      "察覺"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "擊掌奇襲" },
      { "rank": 0, "type": "Normal", "name": "密语" },
      { "rank": 1, "type": "Dark", "name": "咬住" },
      { "rank": 1, "type": "Dark", "name": "吹捧" },
      { "rank": 2, "type": "Dark", "name": "假哭" },
      { "rank": 2, "type": "Dark", "name": "恶意追擊" },
      { "rank": 2, "type": "Normal", "name": "虚张聲勢" },
      { "rank": 2, "type": "Dark", "name": "突襲" },
      { "rank": 2, "type": "Dark", "name": "无理取鬧" },
      { "rank": 2, "type": "Dark", "name": "恶之波动" },
      { "rank": 3, "type": "Dark", "name": "詭计" },
      { "rank": 3, "type": "Fairy", "name": "嬉鬧" },
      { "rank": 3, "type": "Dark", "name": "欺詐" },
      { "rank": 4, "type": "Bug", "name": "吸血" },
      { "rank": 4, "type": "Dark", "name": "挑釁" },
      { "rank": 4, "type": "Psychic", "name": "戏法" }
    ],
    "isNovice": true
  },
  {
    "id": "860",
    "region": "galar",
    "name": "詐唬魔",
    "alias": "Morgrem",
    "type": [
      "Dark",
      "Fairy"
    ],
    "info": {
      "image": "images/pokedex/860.png",
      "height": "0.8",
      "weight": "12",
      "category": "壞心眼寶可夢",
      "text": "当牠下跪像是要乞求原諒的时候，牠其实是在誘騙对手好讓自己能用尖如长矛的头发刺向对手。牠會把人們引誘到深夜的森林中以搶劫他們並使他們迷路。"
    },
    "evolution": {
      "stage": "second",
      "time": "medium"
    },
    "baseHP": 4,
    "rank": 2,
    "attr": {
      "str": { "value": 2, "max": 4 },
      "dex": { "value": 2, "max": 5 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 2, "max": 5 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "恶作劇之心",
      "察覺"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "擊掌奇襲" },
      { "rank": 0, "type": "Normal", "name": "密语" },
      { "rank": 1, "type": "Dark", "name": "咬住" },
      { "rank": 1, "type": "Dark", "name": "吹捧" },
      { "rank": 2, "type": "Dark", "name": "假哭" },
      { "rank": 2, "type": "Dark", "name": "恶意追擊" },
      { "rank": 2, "type": "Normal", "name": "虚张聲勢" },
      { "rank": 2, "type": "Dark", "name": "突襲" },
      { "rank": 2, "type": "Dark", "name": "无理取鬧" },
      { "rank": 2, "type": "Dark", "name": "假跪真撞" },
      { "rank": 2, "type": "Dark", "name": "恶之波动" },
      { "rank": 3, "type": "Dark", "name": "詭计" },
      { "rank": 3, "type": "Dark", "name": "欺詐" },
      { "rank": 3, "type": "Fairy", "name": "嬉鬧" },
      { "rank": 4, "type": "Bug", "name": "吸血" },
      { "rank": 4, "type": "Normal", "name": "揮指" },
      { "rank": 4, "type": "Psychic", "name": "戏法" }
    ]
  },
  {
    "id": "861",
    "region": "galar",
    "name": "长毛巨魔",
    "alias": "Grimmsnarl",
    "type": [
      "Dark",
      "Fairy"
    ],
    "info": {
      "image": "images/pokedex/861.png",
      "height": "1.5",
      "weight": "61",
      "category": "健美寶可夢",
      "text": "牠的毛发能发揮肌肉纤维般的作用。当牠的毛发伸展开來时會像觸手那樣把对手缠繞起來。牠們经常會把別人絆倒或倒吊好嘲笑他們。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 5,
    "rank": 3,
    "attr": {
      "str": { "value": 3, "max": 7 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 3, "max": 6 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "恶作劇之心",
      "察覺"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "擊掌奇襲" },
      { "rank": 0, "type": "Normal", "name": "密语" },
      { "rank": 1, "type": "Dark", "name": "咬住" },
      { "rank": 1, "type": "Dark", "name": "吹捧" },
      { "rank": 2, "type": "Dark", "name": "假哭" },
      { "rank": 2, "type": "Dark", "name": "恶意追擊" },
      { "rank": 2, "type": "Normal", "name": "虚张聲勢" },
      { "rank": 2, "type": "Dark", "name": "突襲" },
      { "rank": 2, "type": "Dark", "name": "无理取鬧" },
      { "rank": 2, "type": "Dark", "name": "假跪真撞" },
      { "rank": 2, "type": "Dark", "name": "恶之波动" },
      { "rank": 2, "type": "Fairy", "name": "灵魂衝擊" },
      { "rank": 2, "type": "Fight", "name": "增强拳" },
      { "rank": 2, "type": "Fight", "name": "健美" },
      { "rank": 3, "type": "Dark", "name": "詭计" },
      { "rank": 3, "type": "Dark", "name": "欺詐" },
      { "rank": 3, "type": "Fairy", "name": "嬉鬧" },
      { "rank": 3, "type": "Fight", "name": "臂錘" },
      { "rank": 4, "type": "Fairy", "name": "吸取之吻" },
      { "rank": 4, "type": "Normal", "name": "守住" },
      { "rank": 4, "type": "Psychic", "name": "反射壁" }
    ]
  },
  {
    "id": "263-G",
    "region": "galar",
    "name": "蛇纹熊 (伽勒爾的樣子)",
    "alias": "Zigzagoon",
    "type": [
      "Dark",
      "Normal"
    ],
    "info": {
      "image": "images/pokedex/263-G.png",
      "height": "0.4",
      "weight": "17",
      "category": "豆狸寶可夢",
      "text": "在伽勒爾长大的蛇纹熊變得庞克起來。如果发现了其他的寶可夢，牠們就會故意撞上去挑起事端。唯一讓牠們冷靜下來的方式就是製造大量的噪音。"
    },
    "evolution": {
      "stage": "first",
      "time": "medium"
    },
    "baseHP": 3,
    "rank": 1,
    "attr": {
      "str": { "value": 1, "max": 3 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 1, "max": 3 },
      "spe": { "value": 1, "max": 3 },
      "ins": { "value": 1, "max": 3 }
    },
    "ability": [
      "撿拾",
      "貪吃鬼"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 0, "type": "Normal", "name": "瞪眼" },
      { "rank": 1, "type": "Ground", "name": "潑沙" },
      { "rank": 1, "type": "Ghost", "name": "舌舔" },
      { "rank": 1, "type": "Normal", "name": "猛撞" },
      { "rank": 2, "type": "Dark", "name": "大聲咆哮" },
      { "rank": 2, "type": "Fairy", "name": "圓瞳" },
      { "rank": 2, "type": "Bug", "name": "飛彈針" },
      { "rank": 2, "type": "Normal", "name": "头鎚" },
      { "rank": 3, "type": "Normal", "name": "鬼面" },
      { "rank": 3, "type": "Fight", "name": "双倍奉還" },
      { "rank": 3, "type": "Dark", "name": "挑釁" },
      { "rank": 3, "type": "Normal", "name": "捨身衝撞" },
      { "rank": 4, "type": "Dark", "name": "拍落" },
      { "rank": 4, "type": "Dark", "name": "拋下狠话" },
      { "rank": 4, "type": "Fight", "name": "快速防守" }
    ],
    "isNovice": true
  },
  {
    "id": "264-G",
    "region": "galar",
    "name": "直衝熊 (伽勒爾的樣子)",
    "alias": "Linoone",
    "type": [
      "Dark",
      "Normal"
    ],
    "info": {
      "image": "images/pokedex/264-G.png",
      "height": "0.5",
      "weight": "32.5",
      "category": "猛衝寶可夢",
      "text": "牠會用长舌头挑釁对手。一旦敵人被激怒，这隻寶可夢便會猛烈地衝撞上去。牠們很没禮貌，喜歡四處胡鬧。"
    },
    "evolution": {
      "stage": "second",
      "time": "medium"
    },
    "baseHP": 4,
    "rank": 2,
    "attr": {
      "str": { "value": 2, "max": 5 },
      "dex": { "value": 3, "max": 6 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "撿拾",
      "貪吃鬼"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 0, "type": "Normal", "name": "瞪眼" },
      { "rank": 1, "type": "Ground", "name": "潑沙" },
      { "rank": 1, "type": "Ghost", "name": "舌舔" },
      { "rank": 1, "type": "Normal", "name": "猛撞" },
      { "rank": 1, "type": "Dark", "name": "挑釁" },
      { "rank": 2, "type": "Dark", "name": "大聲咆哮" },
      { "rank": 2, "type": "Fairy", "name": "圓瞳" },
      { "rank": 2, "type": "Bug", "name": "飛彈針" },
      { "rank": 2, "type": "Normal", "name": "头鎚" },
      { "rank": 2, "type": "Dark", "name": "掉包" },
      { "rank": 2, "type": "Normal", "name": "亂抓" },
      { "rank": 2, "type": "Dark", "name": "磨爪" },
      { "rank": 2, "type": "Dark", "name": "暗襲要害" },
      { "rank": 3, "type": "Normal", "name": "鬼面" },
      { "rank": 3, "type": "Fight", "name": "双倍奉還" },
      { "rank": 3, "type": "Normal", "name": "捨身衝撞" },
      { "rank": 3, "type": "Psychic", "name": "睡覺" },
      { "rank": 4, "type": "Dark", "name": "以牙還牙" },
      { "rank": 4, "type": "Ground", "name": "跺腳" },
      { "rank": 4, "type": "Ghost", "name": "暗影爪" }
    ]
  },
  {
    "id": "862",
    "region": "galar",
    "name": "堵攔熊",
    "alias": "Obstagoon",
    "type": [
      "Dark",
      "Normal"
    ],
    "info": {
      "image": "images/pokedex/862.png",
      "height": "1.6",
      "weight": "46",
      "category": "停止寶可夢",
      "text": "牠的音量相当驚人，是隻吵鬧又粗魯的寶可夢。堵攔熊有著會对目标大叫，並擺出威吓姿勢的傾向。牠們鮮少會認真看待事情。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 5,
    "rank": 3,
    "attr": {
      "str": { "value": 2, "max": 5 },
      "dex": { "value": 3, "max": 6 },
      "vit": { "value": 3, "max": 6 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "捨身",
      "毅力"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 0, "type": "Normal", "name": "瞪眼" },
      { "rank": 1, "type": "Ground", "name": "潑沙" },
      { "rank": 1, "type": "Ghost", "name": "舌舔" },
      { "rank": 1, "type": "Normal", "name": "猛撞" },
      { "rank": 1, "type": "Dark", "name": "挑釁" },
      { "rank": 2, "type": "Dark", "name": "大聲咆哮" },
      { "rank": 2, "type": "Fairy", "name": "圓瞳" },
      { "rank": 2, "type": "Bug", "name": "飛彈針" },
      { "rank": 2, "type": "Normal", "name": "头鎚" },
      { "rank": 2, "type": "Dark", "name": "掉包" },
      { "rank": 2, "type": "Normal", "name": "亂抓" },
      { "rank": 2, "type": "Dark", "name": "磨爪" },
      { "rank": 2, "type": "Dark", "name": "暗襲要害" },
      { "rank": 2, "type": "Fight", "name": "地獄翻滾" },
      { "rank": 2, "type": "Dark", "name": "攔堵" },
      { "rank": 3, "type": "Normal", "name": "鬼面" },
      { "rank": 3, "type": "Fight", "name": "双倍奉還" },
      { "rank": 3, "type": "Normal", "name": "捨身衝撞" },
      { "rank": 3, "type": "Psychic", "name": "睡覺" },
      { "rank": 3, "type": "Fight", "name": "十字劈" },
      { "rank": 4, "type": "Poison", "name": "垃圾射击" },
      { "rank": 4, "type": "Steel", "name": "鐵壁" },
      { "rank": 4, "type": "Normal", "name": "巨聲" }
    ]
  },
  {
    "id": "052-G",
    "region": "galar",
    "name": "喵喵 (伽勒爾的樣子)",
    "alias": "Meowth",
    "type": [
      "Steel"
    ],
    "info": {
      "image": "images/pokedex/052-G.png",
      "height": "0.4",
      "weight": "4",
      "category": "妖怪猫寶可夢",
      "text": "额头上的硬幣已经生鏽。喵喵被帶上了維京船在海上长途旅行，在这嚴酷的环境下生活了这个长的时间使牠變得更加勇猛，以至於牠身体的各个地方都變成了黑鐵。"
    },
    "evolution": {
      "stage": "first",
      "time": "medium"
    },
    "baseHP": 3,
    "rank": 1,
    "attr": {
      "str": { "value": 2, "max": 4 },
      "dex": { "value": 1, "max": 3 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 1, "max": 3 },
      "ins": { "value": 1, "max": 3 }
    },
    "ability": [
      "撿拾",
      "硬爪"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "擊掌奇襲" },
      { "rank": 0, "type": "Normal", "name": "叫聲" },
      { "rank": 0, "type": "Normal", "name": "抓" },
      { "rank": 1, "type": "Dark", "name": "磨爪" },
      { "rank": 1, "type": "Normal", "name": "聚寶功" },
      { "rank": 2, "type": "Steel", "name": "金属爪" },
      { "rank": 2, "type": "Dark", "name": "挑釁" },
      { "rank": 2, "type": "Normal", "name": "虚张聲勢" },
      { "rank": 2, "type": "Normal", "name": "亂抓" },
      { "rank": 2, "type": "Normal", "name": "刺耳聲" },
      { "rank": 3, "type": "Normal", "name": "劈开" },
      { "rank": 3, "type": "Steel", "name": "金属音" },
      { "rank": 3, "type": "Normal", "name": "大鬧一番" },
      { "rank": 4, "type": "Dark", "name": "暗襲要害" },
      { "rank": 4, "type": "Steel", "name": "鐵蹄光線" },
      { "rank": 4, "type": "Ghost", "name": "詛咒" }
    ],
    "isNovice": true
  },
  {
    "id": "863",
    "region": "galar",
    "name": "喵头目",
    "alias": "Perrserker",
    "type": [
      "Steel"
    ],
    "info": {
      "image": "images/pokedex/863.png",
      "height": "0.8",
      "weight": "28",
      "category": "維京寶可夢",
      "text": "头上像鐵头盔一樣的東西其实是牠硬化后的体毛。与喵喵的其他進化型不同，喵头目並不想要財富和奢华，而喜愛著戰鬥、戶外活动、以及海上旅行。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 4,
    "rank": 2,
    "attr": {
      "str": { "value": 3, "max": 6 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 3, "max": 6 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "戰鬥盔甲",
      "硬爪"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "擊掌奇襲" },
      { "rank": 0, "type": "Normal", "name": "叫聲" },
      { "rank": 1, "type": "Normal", "name": "抓" },
      { "rank": 1, "type": "Dark", "name": "磨爪" },
      { "rank": 2, "type": "Normal", "name": "聚寶功" },
      { "rank": 2, "type": "Steel", "name": "金属爪" },
      { "rank": 2, "type": "Dark", "name": "挑釁" },
      { "rank": 2, "type": "Normal", "name": "虚张聲勢" },
      { "rank": 2, "type": "Normal", "name": "亂抓" },
      { "rank": 2, "type": "Normal", "name": "刺耳聲" },
      { "rank": 2, "type": "Steel", "name": "鐵头" },
      { "rank": 2, "type": "Steel", "name": "鐵壁" },
      { "rank": 3, "type": "Normal", "name": "劈开" },
      { "rank": 3, "type": "Steel", "name": "金属音" },
      { "rank": 3, "type": "Normal", "name": "大鬧一番" },
      { "rank": 3, "type": "Steel", "name": "金属爆炸" },
      { "rank": 4, "type": "Normal", "name": "剑舞" },
      { "rank": 4, "type": "Normal", "name": "捨身衝撞" },
      { "rank": 4, "type": "Dark", "name": "地獄突刺" }
    ]
  },
  {
    "id": "222-G",
    "region": "galar",
    "name": "太陽珊瑚 (伽勒爾的樣子)",
    "alias": "Corsola",
    "type": [
      "Ghost"
    ],
    "info": {
      "image": "images/pokedex/222-G.png",
      "height": "0.6",
      "weight": "5",
      "category": "珊瑚寶可夢",
      "text": "当你行走在浅海海灘时，注意的你的腳步，因为这隻寶可夢看起來就跟石头一樣，且如果你踢到牠的话就會遭到牠的詛咒。劇烈的温度變化滅絕了这种遠古太陽珊瑚。"
    },
    "evolution": {
      "stage": "first",
      "time": "medium"
    },
    "baseHP": 3,
    "rank": 2,
    "attr": {
      "str": { "value": 2, "max": 4 },
      "dex": { "value": 1, "max": 3 },
      "vit": { "value": 3, "max": 6 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 3, "max": 6 }
    },
    "ability": [
      "碎裂鎧甲",
      "詛咒之軀"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 0, "type": "Normal", "name": "變硬" },
      { "rank": 1, "type": "Ghost", "name": "驚吓" },
      { "rank": 1, "type": "Normal", "name": "定身法" },
      { "rank": 2, "type": "Ghost", "name": "怨恨" },
      { "rank": 2, "type": "Rock", "name": "原始之力" },
      { "rank": 2, "type": "Ghost", "name": "禍不单行" },
      { "rank": 2, "type": "Ghost", "name": "詛咒" },
      { "rank": 2, "type": "Grass", "name": "吸取力量" },
      { "rank": 3, "type": "Rock", "name": "力量寶石" },
      { "rank": 3, "type": "Ghost", "name": "黑夜魔影" },
      { "rank": 3, "type": "Ghost", "name": "怨念" },
      { "rank": 3, "type": "Psychic", "name": "镜面反射" },
      { "rank": 4, "type": "Water", "name": "水之波动" },
      { "rank": 4, "type": "Rock", "name": "双刃头錘" },
      { "rank": 4, "type": "Ghost", "name": "同命" }
    ]
  },
  {
    "id": "864",
    "region": "galar",
    "name": "魔灵珊瑚",
    "alias": "Cursola",
    "type": [
      "Ghost"
    ],
    "info": {
      "image": "images/pokedex/864.png",
      "height": "1",
      "weight": "0.4",
      "category": "珊瑚寶可夢",
      "text": "灵体被用來保護著牠的灵魂，千萬不要觸摸到，否则你就會像石头一樣动彈不得。这隻寶可夢思念著珊瑚礁充满生机的昔日，並对摧毀这一切的对象心懷怨恨。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 4,
    "rank": 3,
    "attr": {
      "str": { "value": 3, "max": 6 },
      "dex": { "value": 1, "max": 3 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 4, "max": 8 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "碎裂鎧甲",
      "滅亡之軀"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 0, "type": "Normal", "name": "變硬" },
      { "rank": 1, "type": "Ghost", "name": "驚吓" },
      { "rank": 1, "type": "Normal", "name": "定身法" },
      { "rank": 2, "type": "Ghost", "name": "怨恨" },
      { "rank": 2, "type": "Rock", "name": "原始之力" },
      { "rank": 2, "type": "Ghost", "name": "禍不单行" },
      { "rank": 2, "type": "Ghost", "name": "詛咒" },
      { "rank": 2, "type": "Grass", "name": "吸取力量" },
      { "rank": 3, "type": "Rock", "name": "力量寶石" },
      { "rank": 3, "type": "Ghost", "name": "黑夜魔影" },
      { "rank": 3, "type": "Ghost", "name": "怨念" },
      { "rank": 3, "type": "Psychic", "name": "镜面反射" },
      { "rank": 3, "type": "Normal", "name": "滅亡之歌" },
      { "rank": 4, "type": "Water", "name": "水流裂破" },
      { "rank": 4, "type": "Steel", "name": "鐵壁" },
      { "rank": 4, "type": "Ghost", "name": "同命" }
    ]
  },
  {
    "id": "083-G",
    "region": "galar",
    "name": "大蔥鴨 (伽勒爾的樣子)",
    "alias": "Farfetch’d",
    "type": [
      "Fight"
    ],
    "info": {
      "image": "images/pokedex/083-G.png",
      "height": "0.8",
      "weight": "42",
      "category": "黄嘴鴨寶可夢",
      "text": "伽勒爾地區的大蔥更粗也更长，这讓大蔥鴨过得比他們关都地區的表親還要更好。这也讓牠們變得更堅强、更像是戰士。不过牠們仍然相当美味。"
    },
    "evolution": { "stage": "first", "time": "", "method": "other" },
    "baseHP": 3,
    "rank": 1,
    "attr": {
      "str": { "value": 2, "max": 5 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "不屈之心",
      "膽量"
    ],
    "moves": [
      { "rank": 0, "type": "Flying", "name": "啄" },
      { "rank": 0, "type": "Ground", "name": "潑沙" },
      { "rank": 1, "type": "Normal", "name": "瞪眼" },
      { "rank": 1, "type": "Bug", "name": "連斬" },
      { "rank": 1, "type": "Fight", "name": "碎岩" },
      { "rank": 2, "type": "Dark", "name": "狂舞揮打" },
      { "rank": 2, "type": "Fight", "name": "看穿" },
      { "rank": 2, "type": "Dark", "name": "拍落" },
      { "rank": 2, "type": "Flying", "name": "清除濃霧" },
      { "rank": 2, "type": "Fight", "name": "劈瓦" },
      { "rank": 2, "type": "Normal", "name": "摔打" },
      { "rank": 3, "type": "Normal", "name": "剑舞" },
      { "rank": 3, "type": "Grass", "name": "葉刃" },
      { "rank": 3, "type": "Fight", "name": "搏命" },
      { "rank": 3, "type": "Flying", "name": "勇鳥猛攻" },
      { "rank": 4, "type": "Grass", "name": "日光刃" },
      { "rank": 4, "type": "Steel", "name": "鋼翼" },
      { "rank": 4, "type": "Flying", "name": "羽毛舞" }
    ]
  },
  {
    "id": "865",
    "region": "galar",
    "name": "蔥游兵",
    "alias": "Sirfetch’d",
    "type": [
      "Fight"
    ],
    "info": {
      "image": "images/pokedex/865.png",
      "height": "0.8",
      "weight": "117",
      "category": "黄嘴鴨寶可夢",
      "text": "只有历经过无数戰鬥的大蔥鴨才能進化成这个樣子。牠們对自己的蔥枪和葉盾感到驕傲，当这隻寶可夢的大蔥枯萎了，牠就會退出戰場。"
    },
    "evolution": {
      "stage": "final",
      "method": "other"
    },
    "baseHP": 4,
    "rank": 2,
    "attr": {
      "str": { "value": 3, "max": 7 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 2, "max": 5 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "不屈之心",
      "膽量"
    ],
    "moves": [
      { "rank": 0, "type": "Flying", "name": "啄" },
      { "rank": 0, "type": "Ground", "name": "潑沙" },
      { "rank": 1, "type": "Normal", "name": "瞪眼" },
      { "rank": 1, "type": "Bug", "name": "連斬" },
      { "rank": 2, "type": "Fight", "name": "碎岩" },
      { "rank": 2, "type": "Dark", "name": "狂舞揮打" },
      { "rank": 2, "type": "Fight", "name": "看穿" },
      { "rank": 2, "type": "Dark", "name": "拍落" },
      { "rank": 2, "type": "Flying", "name": "清除濃霧" },
      { "rank": 2, "type": "Fight", "name": "劈瓦" },
      { "rank": 2, "type": "Normal", "name": "摔打" },
      { "rank": 3, "type": "Normal", "name": "剑舞" },
      { "rank": 3, "type": "Grass", "name": "葉刃" },
      { "rank": 3, "type": "Fight", "name": "搏命" },
      { "rank": 3, "type": "Flying", "name": "勇鳥猛攻" },
      { "rank": 3, "type": "Bug", "name": "迎头一擊" },
      { "rank": 3, "type": "Steel", "name": "鐵壁" },
      { "rank": 4, "type": "Fight", "name": "流星突擊" },
      { "rank": 4, "type": "Normal", "name": "单純光束" },
      { "rank": 4, "type": "Normal", "name": "挺住" },
      { "rank": 4, "type": "Normal", "name": "聚氣" }
    ]
  },
  {
    "id": "618-G",
    "region": "galar",
    "name": "泥巴魚 (伽勒爾的樣子)",
    "alias": "Stunfisk",
    "type": [
      "Ground",
      "Steel"
    ],
    "info": {
      "image": "images/pokedex/618-G.png",
      "height": "0.7",
      "weight": "20.5",
      "category": "陷阱寶可夢",
      "text": "泥巴魚棲息在富含鐵质的泥巴裡，这些營養素使牠的身体變成了鋼属性。泥巴魚的嘴唇在泥巴中很难被辨識，但如果有人踩到了牠，牠就會用鋸齿般的鋼鰭將牠的獵物紧紧夾住。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 4,
    "rank": 1,
    "attr": {
      "str": { "value": 2, "max": 5 },
      "dex": { "value": 1, "max": 3 },
      "vit": { "value": 3, "max": 6 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "拟態"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 0, "type": "Ground", "name": "掷泥" },
      { "rank": 1, "type": "Water", "name": "水枪" },
      { "rank": 1, "type": "Steel", "name": "金属爪" },
      { "rank": 1, "type": "Normal", "name": "挺住" },
      { "rank": 2, "type": "Ground", "name": "泥巴射击" },
      { "rank": 2, "type": "Fight", "name": "報復" },
      { "rank": 2, "type": "Steel", "name": "金属音" },
      { "rank": 2, "type": "Dark", "name": "突襲" },
      { "rank": 2, "type": "Steel", "name": "鐵壁" },
      { "rank": 2, "type": "Flying", "name": "彈跳" },
      { "rank": 2, "type": "Water", "name": "濁流" },
      { "rank": 3, "type": "Grass", "name": "捕兽夾" },
      { "rank": 3, "type": "Normal", "name": "抓狂" },
      { "rank": 3, "type": "Ground", "name": "地裂" },
      { "rank": 4, "type": "Rock", "name": "隱形岩" },
      { "rank": 4, "type": "Normal", "name": "綁紧" },
      { "rank": 4, "type": "Fight", "name": "双倍奉還" }
    ]
  },
  {
    "id": "122-G",
    "region": "galar",
    "name": "魔牆人偶 (伽勒爾的樣子)",
    "alias": "Mr. Mime",
    "type": [
      "Ice",
      "Psychic"
    ],
    "info": {
      "image": "images/pokedex/122-G.png",
      "height": "1.4",
      "weight": "57",
      "category": "舞蹈寶可夢",
      "text": "熬过伽勒爾地區嚴寒氣候的魔尼尼將能夠创造出瞬间變成冰的隱形牆，而当牠們進化，牠們將能夠製造出冰之地板來讓牠們跳踢踏舞，而这也是牠們最为熱衷的活动。"
    },
    "evolution": {
      "stage": "second",
      "time": "medium"
    },
    "baseHP": 4,
    "rank": 2,
    "attr": {
      "str": { "value": 2, "max": 4 },
      "dex": { "value": 3, "max": 6 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 2, "max": 5 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "幹勁",
      "除障"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "拍擊" },
      { "rank": 0, "type": "Normal", "name": "高速旋转" },
      { "rank": 1, "type": "Normal", "name": "接棒" },
      { "rank": 1, "type": "Ice", "name": "冰礫" },
      { "rank": 1, "type": "Psychic", "name": "念力" },
      { "rank": 1, "type": "Psychic", "name": "交換場地" },
      { "rank": 2, "type": "Ice", "name": "冰凍之風" },
      { "rank": 2, "type": "Fight", "name": "二連踢" },
      { "rank": 2, "type": "Normal", "name": "仿效" },
      { "rank": 2, "type": "Normal", "name": "再來一次" },
      { "rank": 2, "type": "Psychic", "name": "扮演" },
      { "rank": 2, "type": "Normal", "name": "守住" },
      { "rank": 2, "type": "Normal", "name": "回收利用" },
      { "rank": 2, "type": "Normal", "name": "模仿" },
      { "rank": 2, "type": "Psychic", "name": "光牆" },
      { "rank": 2, "type": "Psychic", "name": "反射壁" },
      { "rank": 2, "type": "Ice", "name": "冰凍光束" },
      { "rank": 2, "type": "Psychic", "name": "催眠术" },
      { "rank": 2, "type": "Psychic", "name": "镜面反射" },
      { "rank": 3, "type": "Dark", "name": "突襲" },
      { "rank": 3, "type": "Ice", "name": "冷凍干燥" },
      { "rank": 3, "type": "Psychic", "name": "精神强念" },
      { "rank": 3, "type": "Normal", "name": "神秘守護" },
      { "rank": 3, "type": "Fairy", "name": "魔法闪耀" },
      { "rank": 3, "type": "Fairy", "name": "薄霧場地" },
      { "rank": 3, "type": "Normal", "name": "搖晃舞" },
      { "rank": 4, "type": "Water", "name": "求雨" },
      { "rank": 4, "type": "Ice", "name": "冰雹" }
    ]
  },
  {
    "id": "866",
    "region": "galar",
    "name": "踏冰人偶",
    "alias": "Mr. Rime",
    "type": [
      "Ice",
      "Psychic"
    ],
    "info": {
      "image": "images/pokedex/866.png",
      "height": "1.5",
      "weight": "58",
      "category": "喜劇演员寶可夢",
      "text": "牠是踢踏舞的达人。會適时揮动手中的冰杖，幽默的动作使牠獲得了眾人的喜愛，且牠也熱愛表演給小朋友看。牠的精神力量全都是從腹部的圖案釋放出來的。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 5,
    "rank": 2,
    "attr": {
      "str": { "value": 2, "max": 5 },
      "dex": { "value": 2, "max": 5 },
      "vit": { "value": 2, "max": 5 },
      "spe": { "value": 3, "max": 6 },
      "ins": { "value": 3, "max": 6 }
    },
    "ability": [
      "蹣跚",
      "除障"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "偷懶" },
      { "rank": 0, "type": "Normal", "name": "您先请" },
      { "rank": 0, "type": "Normal", "name": "擋路" },
      { "rank": 0, "type": "Normal", "name": "高速旋转" },
      { "rank": 1, "type": "Normal", "name": "接棒" },
      { "rank": 1, "type": "Ice", "name": "冰礫" },
      { "rank": 1, "type": "Psychic", "name": "念力" },
      { "rank": 1, "type": "Psychic", "name": "交換場地" },
      { "rank": 2, "type": "Ice", "name": "冰凍之風" },
      { "rank": 2, "type": "Fight", "name": "二連踢" },
      { "rank": 2, "type": "Normal", "name": "仿效" },
      { "rank": 2, "type": "Normal", "name": "再來一次" },
      { "rank": 2, "type": "Psychic", "name": "扮演" },
      { "rank": 2, "type": "Normal", "name": "守住" },
      { "rank": 2, "type": "Normal", "name": "回收利用" },
      { "rank": 2, "type": "Normal", "name": "模仿" },
      { "rank": 2, "type": "Psychic", "name": "光牆" },
      { "rank": 2, "type": "Psychic", "name": "反射壁" },
      { "rank": 2, "type": "Ice", "name": "冰凍光束" },
      { "rank": 2, "type": "Psychic", "name": "催眠术" },
      { "rank": 2, "type": "Psychic", "name": "镜面反射" },
      { "rank": 3, "type": "Dark", "name": "假哭" },
      { "rank": 3, "type": "Ice", "name": "冷凍干燥" },
      { "rank": 3, "type": "Psychic", "name": "精神强念" },
      { "rank": 3, "type": "Normal", "name": "神秘守護" },
      { "rank": 3, "type": "Fairy", "name": "魔法闪耀" },
      { "rank": 3, "type": "Fairy", "name": "薄霧場地" },
      { "rank": 3, "type": "Normal", "name": "搖晃舞" }
    ]
  },
{
  "id": "554-G",
  "region": "galar",
  "name": "火紅不倒翁 (伽勒爾的樣子)",
  "alias": "Darumaka",
  "type": [
    "Ice"
  ],
  "info": {
    "image": "images/pokedex/554-G.png",
    "height": "0.7",
    "weight": "40",
    "category": "不倒翁寶可夢",
    "text": "因为居住在積雪深厚的地域，火囊也因此冷卻而改为製造冷氣。火紅不倒翁利用低温当作能量，这讓牠在冬天时特別有活力。牠愛玩且喜歡丟雪球。"
  },
  "evolution": {
    "stage": "first",
    "with": "冰之石"
  },
  "baseHP": 3,
  "rank": 1,
  "attr": {
    "str": { "value": 2, "max": 5 },
    "dex": { "value": 2, "max": 4 },
    "vit": { "value": 2, "max": 4 },
    "spe": { "value": 1, "max": 3 },
    "ins": { "value": 2, "max": 4 }
  },
  "ability": [
    "活力",
    "精神力"
  ],
  "moves": [
    { "rank": 0, "type": "Normal", "name": "撞擊" },
    { "rank": 0, "type": "Dark", "name": "挑釁" },
    { "rank": 1, "type": "Dark", "name": "咬住" },
    { "rank": 1, "type": "Ice", "name": "细雪" },
    { "rank": 2, "type": "Ice", "name": "雪崩" },
    { "rank": 2, "type": "Normal", "name": "自我激勵" },
    { "rank": 2, "type": "Ice", "name": "冰凍牙" },
    { "rank": 2, "type": "Normal", "name": "头鎚" },
    { "rank": 2, "type": "Ice", "name": "冰凍拳" },
    { "rank": 2, "type": "Normal", "name": "吵鬧" },
    { "rank": 3, "type": "Normal", "name": "腹鼓" },
    { "rank": 3, "type": "Ice", "name": "暴風雪" },
    { "rank": 3, "type": "Normal", "name": "大鬧一番" },
    { "rank": 3, "type": "Fight", "name": "蠻力" },
    { "rank": 4, "type": "Dark", "name": "投掷" },
    { "rank": 4, "type": "Normal", "name": "替身" },
    { "rank": 4, "type": "Fire", "name": "熱風" }
  ],
  "isNovice": true
},
{
  "id": "555-G",
  "region": "galar",
  "name": "达摩狒狒 (伽勒爾的樣子)",
  "alias": "Darmanitan",
  "type": [
    "Ice"
  ],
  "info": {
    "image": "images/pokedex/555-G.png",
    "height": "1.7",
    "weight": "120",
    "category": "不倒翁寶可夢",
    "text": "达摩狒狒在伽勒爾的樣子。牠們會在暴風雪的日子來到人类居住的村落偷走食物。儘管达摩狒狒看起來很兇，但牠們实際上温和且害羞。"
  },
  "evolution": {
    "stage": "final"
  },
  "baseHP": 4,
  "rank": 2,
  "attr": {
    "str": { "value": 3, "max": 7 },
    "dex": { "value": 3, "max": 6 },
    "vit": { "value": 2, "max": 4 },
    "spe": { "value": 1, "max": 3 },
    "ins": { "value": 2, "max": 4 }
  },
  "ability": [
    "一猩一意",
    "达摩模式"
  ],
  "moves": [
    { "rank": 0, "type": "Normal", "name": "撞擊" },
    { "rank": 0, "type": "Dark", "name": "挑釁" },
    { "rank": 1, "type": "Dark", "name": "咬住" },
    { "rank": 1, "type": "Ice", "name": "细雪" },
    { "rank": 2, "type": "Ice", "name": "雪崩" },
    { "rank": 2, "type": "Normal", "name": "自我激勵" },
    { "rank": 2, "type": "Ice", "name": "冰凍牙" },
    { "rank": 2, "type": "Normal", "name": "头鎚" },
    { "rank": 2, "type": "Ice", "name": "冰凍拳" },
    { "rank": 2, "type": "Normal", "name": "吵鬧" },
    { "rank": 3, "type": "Normal", "name": "腹鼓" },
    { "rank": 3, "type": "Ice", "name": "暴風雪" },
    { "rank": 3, "type": "Normal", "name": "大鬧一番" },
    { "rank": 3, "type": "Fight", "name": "蠻力" },
    { "rank": 3, "type": "Ice", "name": "冰柱墜擊" },
    { "rank": 4, "type": "Dark", "name": "小偷" },
    { "rank": 4, "type": "Ground", "name": "重踏" },
    { "rank": 4, "type": "Ice", "name": "冷凍干燥" }
  ]
},
{
  "id": "555-ZenG",
  "region": "galar",
  "name": "达摩狒狒 (伽勒爾的樣子)(达摩模式)",
  "alias": "Darmanitan",
  "type": [
    "Ice",
    "Fire"
  ],
  "info": {
    "image": "images/pokedex/555-Zen-G.png",
    "height": "1.7",
    "weight": "120",
    "category": "不倒翁寶可夢",
    "text": "当达摩狒狒憤怒时，原本退化的火囊將重新点燃。这隻寶可夢將胡亂噴火並在所到之處大鬧一番。牠們的怒火必須被平息，否则牠們的高温甚至會融化自己的身体。"
  },
  "evolution": {
    "stage": "final"
  },
  "baseHP": 4,
  "rank": 2,
  "attr": {
    "str": { "value": 3, "max": 7 },
    "dex": { "value": 3, "max": 6 },
    "vit": { "value": 2, "max": 4 },
    "spe": { "value": 1, "max": 3 },
    "ins": { "value": 2, "max": 4 }
  },
  "ability": [
    "一猩一意",
    "达摩模式"
  ],
  "moves": [
    { "rank": 0, "type": "Normal", "name": "撞擊" },
    { "rank": 0, "type": "Dark", "name": "挑釁" },
    { "rank": 1, "type": "Dark", "name": "咬住" },
    { "rank": 1, "type": "Ice", "name": "细雪" },
    { "rank": 2, "type": "Ice", "name": "雪崩" },
    { "rank": 2, "type": "Normal", "name": "自我激勵" },
    { "rank": 2, "type": "Ice", "name": "冰凍牙" },
    { "rank": 2, "type": "Normal", "name": "头鎚" },
    { "rank": 2, "type": "Ice", "name": "冰凍拳" },
    { "rank": 2, "type": "Normal", "name": "吵鬧" },
    { "rank": 3, "type": "Normal", "name": "腹鼓" },
    { "rank": 3, "type": "Ice", "name": "暴風雪" },
    { "rank": 3, "type": "Normal", "name": "大鬧一番" },
    { "rank": 3, "type": "Fight", "name": "蠻力" },
    { "rank": 3, "type": "Ice", "name": "冰柱墜擊" },
    { "rank": 4, "type": "Fire", "name": "大晴天" },
    { "rank": 4, "type": "Fire", "name": "闪焰衝鋒" },
    { "rank": 4, "type": "Fire", "name": "火焰牙" }
  ]
},
{
  "id": "562-G",
  "region": "galar",
  "name": "哭哭面具 (伽勒爾的樣子)",
  "alias": "Yamask",
  "type": [
    "Ghost"
  ],
  "info": {
    "image": "images/pokedex/562-G.png",
    "height": "0.5",
    "weight": "1.5",
    "category": "魂寶可夢",
    "text": "據说牠是古代黏土板被帶有强烈怨念的灵魂吸引后诞生的寶可夢。黏土板似乎吸收了哭哭面具的力量，所以才會那么苍白。"
  },
  "evolution": {
    "stage": "first",
    "near": "符文繪畫"
  },
  "baseHP": 3,
  "rank": 2,
  "attr": {
    "str": { "value": 2, "max": 4 },
    "dex": { "value": 1, "max": 3 },
    "vit": { "value": 2, "max": 5 },
    "spe": { "value": 1, "max": 3 },
    "ins": { "value": 2, "max": 4 }
  },
  "ability": [
    "游魂"
  ],
  "moves": [
    { "rank": 0, "type": "Ghost", "name": "驚吓" },
    { "rank": 0, "type": "Normal", "name": "守住" },
    { "rank": 1, "type": "Ice", "name": "黑霧" },
    { "rank": 1, "type": "Ghost", "name": "黑夜魔影" },
    { "rank": 2, "type": "Normal", "name": "定身法" },
    { "rank": 2, "type": "Dark", "name": "狂舞揮打" },
    { "rank": 2, "type": "Fairy", "name": "戏法防守" },
    { "rank": 2, "type": "Ghost", "name": "禍不单行" },
    { "rank": 2, "type": "Normal", "name": "黑色目光" },
    { "rank": 2, "type": "Normal", "name": "摔打" },
    { "rank": 2, "type": "Ghost", "name": "詛咒" },
    { "rank": 2, "type": "Ghost", "name": "暗影球" },
    { "rank": 3, "type": "Ground", "name": "地震" },
    { "rank": 3, "type": "Psychic", "name": "力量平分" },
    { "rank": 3, "type": "Psychic", "name": "防守平分" },
    { "rank": 3, "type": "Ghost", "name": "同命" },
    { "rank": 4, "type": "Rock", "name": "沙暴" },
    { "rank": 4, "type": "Psychic", "name": "精神强念" },
    { "rank": 4, "type": "Dark", "name": "臨別禮物" }
  ],
  "isNovice": true
},
{
  "id": "867",
  "region": "galar",
  "name": "死神板",
  "alias": "Runerigus",
  "type": [
    "Ghost",
    "Ground"
  ],
  "info": {
    "image": "images/pokedex/867.png",
    "height": "1.6",
    "weight": "66",
    "category": "怨念寶可夢",
    "text": "强烈詛咒注入了古代繪畫，在詛咒吸收了哭哭面具的灵魂之后，牠就會進化成死灵板。千萬不要觸摸牠那影子般的身体，否则你將會看到印刻在牠畫中的恐怖記憶。"
  },
  "evolution": {
    "stage": "final",
    "method": "other"
  },
  "baseHP": 4,
  "rank": 3,
  "attr": {
    "str": { "value": 3, "max": 6 },
    "dex": { "value": 1, "max": 3 },
    "vit": { "value": 4, "max": 8 },
    "spe": { "value": 2, "max": 4 },
    "ins": { "value": 3, "max": 6 }
  },
  "ability": [
    "游魂"
  ],
  "moves": [
    { "rank": 0, "type": "Ghost", "name": "驚吓" },
    { "rank": 0, "type": "Normal", "name": "守住" },
    { "rank": 1, "type": "Ice", "name": "黑霧" },
    { "rank": 1, "type": "Ghost", "name": "黑夜魔影" },
    { "rank": 2, "type": "Normal", "name": "定身法" },
    { "rank": 2, "type": "Dark", "name": "狂舞揮打" },
    { "rank": 2, "type": "Fairy", "name": "戏法防守" },
    { "rank": 2, "type": "Ghost", "name": "禍不单行" },
    { "rank": 2, "type": "Normal", "name": "黑色目光" },
    { "rank": 2, "type": "Ghost", "name": "暗影爪" },
    { "rank": 2, "type": "Normal", "name": "鬼面" },
    { "rank": 2, "type": "Normal", "name": "摔打" },
    { "rank": 2, "type": "Ghost", "name": "詛咒" },
    { "rank": 2, "type": "Ghost", "name": "暗影球" },
    { "rank": 3, "type": "Psychic", "name": "力量平分" },
    { "rank": 3, "type": "Ground", "name": "地震" },
    { "rank": 3, "type": "Ghost", "name": "同命" },
    { "rank": 3, "type": "Psychic", "name": "防守平分" },
    { "rank": 4, "type": "Steel", "name": "鐵壁" },
    { "rank": 4, "type": "Dark", "name": "臨別禮物" },
    { "rank": 4, "type": "Rock", "name": "隱形岩" }
  ]
},
  {
    "id": "868",
    "region": "galar",
    "name": "小仙奶",
    "alias": "Milcery",
    "type": [
      "Fairy"
    ],
    "info": {
      "image": "images/pokedex/868.png",
      "height": "0.2",
      "weight": "0.3",
      "category": "鮮奶油寶可夢",
      "text": "这隻寶可夢是從空氣中甜甜香氣的粒子中诞生，牠的身体由鮮奶油構成。在你家廚房发现牠意味著好运。把樹果給牠們，並用攪拌器輕撫，这樣牠們就能夠進化。"
    },
    "evolution": {
      "stage": "first",
      "with": "樹果&糖飾"
    },
    "baseHP": 3,
    "rank": 0,
    "attr": {
      "str": { "value": 1, "max": 3 },
      "dex": { "value": 1, "max": 3 },
      "vit": { "value": 1, "max": 3 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "甜幕", "芳香幕"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 0, "type": "Fairy", "name": "芳香薄霧" },
      { "rank": 1, "type": "Fairy", "name": "天使之吻" },
      { "rank": 1, "type": "Normal", "name": "甜甜香氣" },
      { "rank": 2, "type": "Fairy", "name": "吸取之吻" },
      { "rank": 2, "type": "Grass", "name": "芳香治療" },
      { "rank": 2, "type": "Normal", "name": "迷人" },
      { "rank": 2, "type": "Poison", "name": "溶化" },
      { "rank": 2, "type": "Fairy", "name": "魔法闪耀" },
      { "rank": 3, "type": "Normal", "name": "自我再生" },
      { "rank": 3, "type": "Fairy", "name": "薄霧場地" },
      { "rank": 3, "type": "Normal", "name": "找夥伴" },
      { "rank": 4, "type": "Fairy", "name": "撒娇" },
      { "rank": 4, "type": "Normal", "name": "幫助" },
      { "rank": 4, "type": "Dark", "name": "投掷" }
    ],
    "isNovice": true
  },
  {
    "id": "869",
    "region": "galar",
    "name": "霜奶仙",
    "alias": "Alcremie",
    "type": [
      "Fairy"
    ],
    "info": {
      "image": "images/pokedex/869.png",
      "height": "0.3",
      "weight": "0.5",
      "category": "鮮奶油寶可夢",
      "text": "有相当多数量的食譜能讓小仙奶進化成霜奶仙，並影響牠們的顏色和口味。有些甜美、有些酸爽，但牠們全都相当美味。在牠們幫助下製作的蛋糕可以賣到相当高的價錢。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 4,
    "rank": 1,
    "attr": {
      "str": { "value": 2, "max": 4 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 2, "max": 5 },
      "spe": { "value": 3, "max": 6 },
      "ins": { "value": 3, "max": 7 }
    },
    "ability": [
      "甜幕", "芳香幕"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 0, "type": "Fairy", "name": "芳香薄霧" },
      { "rank": 1, "type": "Normal", "name": "甜甜香氣" },
      { "rank": 1, "type": "Fairy", "name": "装飾" },
      { "rank": 2, "type": "Fairy", "name": "天使之吻" },
      { "rank": 2, "type": "Grass", "name": "芳香治療" },
      { "rank": 2, "type": "Fairy", "name": "吸取之吻" },
      { "rank": 2, "type": "Poison", "name": "溶化" },
      { "rank": 2, "type": "Normal", "name": "迷人" },
      { "rank": 3, "type": "Normal", "name": "自我再生" },
      { "rank": 3, "type": "Fairy", "name": "魔法闪耀" },
      { "rank": 3, "type": "Normal", "name": "找夥伴" },
      { "rank": 3, "type": "Fairy", "name": "薄霧場地" },
      { "rank": 4, "type": "Fire", "name": "魔法火焰" },
      { "rank": 4, "type": "Normal", "name": "替身" },
      { "rank": 4, "type": "Dark", "name": "假哭" }
    ]
  },
  {
    "id": "077-G",
    "region": "galar",
    "name": "小火馬 (伽勒爾的樣子)",
    "alias": "Ponyta",
    "type": [
      "Psychic"
    ],
    "info": {
      "image": "images/pokedex/077-G.png",
      "height": "0.8",
      "weight": "24",
      "category": "一角寶可夢",
      "text": "伽勒爾古老的魔法森林讓小火馬发展出了神秘的性质。牠們神奇的角能夠治癒大部分的傷口並感應你的心灵是否純洁。如果你抱持著邪恶的思想，那么你永遠也不可能在野外遇到这种寶可夢。"
    },
    "evolution": {
      "stage": "first",
      "time": "medium"
    },
    "baseHP": 3,
    "rank": 2,
    "attr": {
      "str": { "value": 2, "max": 5 },
      "dex": { "value": 2, "max": 5 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "逃跑",
      "粉彩護幕"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 0, "type": "Normal", "name": "叫聲" },
      { "rank": 1, "type": "Normal", "name": "搖尾巴" },
      { "rank": 1, "type": "Psychic", "name": "念力" },
      { "rank": 1, "type": "Fairy", "name": "妖精之風" },
      { "rank": 2, "type": "Psychic", "name": "高速移动" },
      { "rank": 2, "type": "Psychic", "name": "幻象光線" },
      { "rank": 2, "type": "Normal", "name": "猛撞" },
      { "rank": 2, "type": "Psychic", "name": "治癒波动" },
      { "rank": 2, "type": "Normal", "name": "踩踏" },
      { "rank": 3, "type": "Psychic", "name": "精神强念" },
      { "rank": 3, "type": "Fairy", "name": "魔法闪耀" },
      { "rank": 3, "type": "Psychic", "name": "治癒之願" },
      { "rank": 4, "type": "Psychic", "name": "交換場地" },
      { "rank": 4, "type": "Psychic", "name": "預知未來" },
      { "rank": 4, "type": "Normal", "name": "守住" }
    ]
  },
  {
    "id": "078-G",
    "region": "galar",
    "name": "烈焰馬 (伽勒爾的樣子)",
    "alias": "Rapidash",
    "type": [
      "Psychic",
      "Fairy"
    ],
    "info": {
      "image": "images/pokedex/078-G.png",
      "height": "1.7",
      "weight": "80",
      "category": "一角寶可夢",
      "text": "那些內心邪恶的人將會被这驕傲而美丽的寶可夢給蔑視。牠能运用精神力量在空中奔馳。傳说只有真正的公主能夠騎乘在伽勒爾地區的烈焰馬身上。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 4,
    "rank": 3,
    "attr": {
      "str": { "value": 3, "max": 6 },
      "dex": { "value": 3, "max": 6 },
      "vit": { "value": 2, "max": 5 },
      "spe": { "value": 2, "max": 5 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "逃跑",
      "粉彩護幕"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 0, "type": "Normal", "name": "叫聲" },
      { "rank": 1, "type": "Normal", "name": "搖尾巴" },
      { "rank": 1, "type": "Psychic", "name": "念力" },
      { "rank": 2, "type": "Fairy", "name": "妖精之風" },
      { "rank": 2, "type": "Psychic", "name": "高速移动" },
      { "rank": 2, "type": "Psychic", "name": "幻象光線" },
      { "rank": 2, "type": "Normal", "name": "猛撞" },
      { "rank": 2, "type": "Psychic", "name": "治癒波动" },
      { "rank": 2, "type": "Normal", "name": "踩踏" },
      { "rank": 2, "type": "Psychic", "name": "精神利刃" },
      { "rank": 3, "type": "Psychic", "name": "精神强念" },
      { "rank": 3, "type": "Fairy", "name": "魔法闪耀" },
      { "rank": 3, "type": "Psychic", "name": "治癒之願" },
      { "rank": 3, "type": "Bug", "name": "超级角擊" },
      { "rank": 4, "type": "Ground", "name": "十萬馬力" },
      { "rank": 4, "type": "Psychic", "name": "魔法空间" },
      { "rank": 4, "type": "Flying", "name": "彈跳" }
    ]
  },
  {
    "id": "870",
    "region": "galar",
    "name": "列陣兵",
    "alias": "Falinks",
    "type": [
      "Fight"
    ],
    "info": {
      "image": "images/pokedex/870.png",
      "height": "3",
      "weight": "62",
      "category": "陣形寶可夢",
      "text": "六隻为一体的寶可夢，由一个头头和五个跟班組成。头头的命令不可違抗，牠們是完美的团隊，並能夠變換陣形來更好地適應戰鬥。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 5,
    "rank": 2,
    "attr": {
      "str": { "value": 3, "max": 6 },
      "dex": { "value": 2, "max": 5 },
      "vit": { "value": 3, "max": 6 },
      "spe": { "value": 2, "max": 5 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "戰鬥盔甲",
      "不服输"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 0, "type": "Normal", "name": "守住" },
      { "rank": 1, "type": "Fight", "name": "碎岩" },
      { "rank": 1, "type": "Normal", "name": "聚氣" },
      { "rank": 2, "type": "Normal", "name": "头鎚" },
      { "rank": 2, "type": "Fight", "name": "健美" },
      { "rank": 2, "type": "Normal", "name": "挺住" },
      { "rank": 2, "type": "Fight", "name": "起死回生" },
      { "rank": 2, "type": "Bug", "name": "迎头一擊" },
      { "rank": 2, "type": "Fight", "name": "背水一戰" },
      { "rank": 3, "type": "Steel", "name": "鐵壁" },
      { "rank": 3, "type": "Fight", "name": "近身戰" },
      { "rank": 3, "type": "Bug", "name": "超级角擊" },
      { "rank": 3, "type": "Fight", "name": "双倍奉還" },
      { "rank": 4, "type": "Normal", "name": "剑舞" },
      { "rank": 4, "type": "Steel", "name": "鐵头" },
      { "rank": 4, "type": "Poison", "name": "毒擊" }
    ]
  },
  {
    "id": "871",
    "region": "galar",
    "name": "啪嚓海膽",
    "alias": "Pincurchin",
    "type": [
      "Electric"
    ],
    "info": {
      "image": "images/pokedex/871.png",
      "height": "0.3",
      "weight": "1",
      "category": "海膽寶可夢",
      "text": "这隻安靜的寶可夢以海藻为食，會用銳利的牙齿將海藻刮取下來。牠的每根刺裡都儲存著電力。即使是折斷的刺也能夠持續放電好幾个小时。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 4,
    "rank": 2,
    "attr": {
      "str": { "value": 3, "max": 6 },
      "dex": { "value": 1, "max": 2 },
      "vit": { "value": 3, "max": 6 },
      "spe": { "value": 2, "max": 5 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "避雷針",
      "電氣製造者"
    ],
    "moves": [
      { "rank": 0, "type": "Flying", "name": "啄" },
      { "rank": 0, "type": "Electric", "name": "電擊" },
      { "rank": 1, "type": "Water", "name": "水枪" },
      { "rank": 1, "type": "Electric", "name": "充電" },
      { "rank": 2, "type": "Normal", "name": "亂擊" },
      { "rank": 2, "type": "Electric", "name": "電光" },
      { "rank": 2, "type": "Water", "name": "泡沫光線" },
      { "rank": 2, "type": "Normal", "name": "自我再生" },
      { "rank": 2, "type": "Ghost", "name": "詛咒" },
      { "rank": 2, "type": "Electric", "name": "電氣場地" },
      { "rank": 3, "type": "Poison", "name": "毒擊" },
      { "rank": 3, "type": "Electric", "name": "麻麻刺刺" },
      { "rank": 3, "type": "Normal", "name": "点穴" },
      { "rank": 3, "type": "Electric", "name": "放電" },
      { "rank": 4, "type": "Dark", "name": "突襲" },
      { "rank": 4, "type": "Poison", "name": "毒菱" },
      { "rank": 4, "type": "Ground", "name": "撒菱" }
    ]
  },
  {
    "id": "872",
    "region": "galar",
    "name": "雪吞蟲",
    "alias": "Snom",
    "type": [
      "Bug",
      "Ice"
    ],
    "info": {
      "image": "images/pokedex/872.png",
      "height": "0.3",
      "weight": "4",
      "category": "蟲寶寶寶可夢",
      "text": "能吐出帶著冷氣的絲，並用來把自己掛在樹枝上，一边装成冰柱一边睡覺。牠只會吃地面上的積雪，如果積雪融化，牠會將其再次凍起來然后繼續進食。"
    },
    "evolution": {
      "stage": "first",
      "happiness": 5
    },
    "baseHP": 3,
    "rank": 0,
    "attr": {
      "str": { "value": 1, "max": 3 },
      "dex": { "value": 1, "max": 3 },
      "vit": { "value": 1, "max": 3 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 1, "max": 3 }
    },
    "ability": [
      "鱗粉",
      "冰鱗粉"
    ],
    "moves": [
      { "rank": 0, "type": "Ice", "name": "细雪" },
      { "rank": 1, "type": "Bug", "name": "蟲之抵抗" },
      { "rank": 4, "type": "Psychic", "name": "睡覺" },
      { "rank": 4, "type": "Normal", "name": "打鼾" },
      { "rank": 4, "type": "Bug", "name": "蟲咬" }
    ],
    "isNovice": true
  },
  {
    "id": "873",
    "region": "galar",
    "name": "雪絨蛾",
    "alias": "Frosmoth",
    "type": [
      "Bug",
      "Ice"
    ],
    "info": {
      "image": "images/pokedex/873.png",
      "height": "1.3",
      "weight": "42",
      "category": "冰蛾寶可夢",
      "text": "絕不放过破壞山野和雪原环境的人。牠會用冰冷的翅膀四處飛翔，製造出暴風雪來趕走他們。除此之外的情況，牠就是隻相当高貴且温雅的寶可夢。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 4,
    "rank": 2,
    "attr": {
      "str": { "value": 2, "max": 4 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 3, "max": 7 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "鱗粉",
      "冰鱗粉"
    ],
    "moves": [
      { "rank": 0, "type": "Ice", "name": "细雪" },
      { "rank": 0, "type": "Bug", "name": "蟲之抵抗" },
      { "rank": 1, "type": "Ice", "name": "冰凍之風" },
      { "rank": 1, "type": "Normal", "name": "幫助" },
      { "rank": 2, "type": "Normal", "name": "迷人" },
      { "rank": 2, "type": "Grass", "name": "麻痺粉" },
      { "rank": 2, "type": "Bug", "name": "死缠烂打" },
      { "rank": 2, "type": "Ice", "name": "白霧" },
      { "rank": 2, "type": "Flying", "name": "清除濃霧" },
      { "rank": 2, "type": "Flying", "name": "羽毛舞" },
      { "rank": 2, "type": "Ice", "name": "极光束" },
      { "rank": 2, "type": "Ice", "name": "冰雹" },
      { "rank": 2, "type": "Bug", "name": "蟲鳴" },
      { "rank": 2, "type": "Ice", "name": "极光幕" },
      { "rank": 3, "type": "Ice", "name": "暴風雪" },
      { "rank": 3, "type": "Flying", "name": "順風" },
      { "rank": 3, "type": "Rock", "name": "廣域防守" },
      { "rank": 3, "type": "Bug", "name": "蝶舞" },
      { "rank": 4, "type": "Fairy", "name": "魔法闪耀" },
      { "rank": 4, "type": "Psychic", "name": "镜面反射" },
      { "rank": 4, "type": "Flying", "name": "暴風" }
    ]
  },
  {
    "id": "874",
    "region": "galar",
    "name": "巨石丁",
    "alias": "Stonjourner",
    "type": [
      "Rock"
    ],
    "info": {
      "image": "images/pokedex/874.png",
      "height": "2.5",
      "weight": "520",
      "category": "巨石寶可夢",
      "text": "牠們幾乎終其一生都保持不动，看起來就像是顆不显眼的石头，但每年會有一次，牠們會聚集在一起排成一个圈，維持好幾天之后，然后在一夜之间消失不見。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 6,
    "rank": 2,
    "attr": {
      "str": { "value": 3, "max": 7 },
      "dex": { "value": 2, "max": 5 },
      "vit": { "value": 3, "max": 7 },
      "spe": { "value": 1, "max": 3 },
      "ins": { "value": 1, "max": 3 }
    },
    "ability": [
      "能量点"
    ],
    "moves": [
      { "rank": 0, "type": "Rock", "name": "落石" },
      { "rank": 0, "type": "Normal", "name": "擋路" },
      { "rank": 1, "type": "Normal", "name": "踩踏" },
      { "rank": 1, "type": "Rock", "name": "岩石封锁" },
      { "rank": 2, "type": "Psychic", "name": "重力" },
      { "rank": 2, "type": "Rock", "name": "岩石打磨" },
      { "rank": 2, "type": "Rock", "name": "隱形岩" },
      { "rank": 2, "type": "Rock", "name": "岩崩" },
      { "rank": 2, "type": "Normal", "name": "泰山壓頂" },
      { "rank": 2, "type": "Rock", "name": "廣域防守" },
      { "rank": 3, "type": "Steel", "name": "重磅衝撞" },
      { "rank": 3, "type": "Rock", "name": "尖石攻擊" },
      { "rank": 3, "type": "Normal", "name": "百萬噸重踢" },
      { "rank": 4, "type": "Fire", "name": "高温重壓" },
      { "rank": 4, "type": "Rock", "name": "原始之力" },
      { "rank": 4, "type": "Ground", "name": "跺腳" }
    ]
  },
  {
    "id": "875",
    "region": "galar",
    "name": "冰砌鵝",
    "alias": "Eiscue",
    "type": [
      "Ice"
    ],
    "info": {
      "image": "images/pokedex/875.png",
      "height": "1.4",
      "weight": "89",
      "category": "企鵝寶可夢",
      "text": "这隻寶可夢隨时都用冰塊冰鎮著自己的脸。牠會把头頂上的毛垂到海裡釣食物吃。当牠們游累的时候，牠們會就这么讓自己的冰塊腦袋帶牠們漂浮在海上。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 4,
    "rank": 2,
    "attr": {
      "str": { "value": 2, "max": 5 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 3, "max": 6 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "结凍头"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 0, "type": "Ice", "name": "白霧" },
      { "rank": 1, "type": "Ice", "name": "细雪" },
      { "rank": 1, "type": "Ice", "name": "冰凍之風" },
      { "rank": 2, "type": "Normal", "name": "氣象球" },
      { "rank": 2, "type": "Normal", "name": "头鎚" },
      { "rank": 2, "type": "Psychic", "name": "瞬间失憶" },
      { "rank": 2, "type": "Ice", "name": "冰雹" },
      { "rank": 2, "type": "Ice", "name": "冷凍干燥" },
      { "rank": 3, "type": "Ice", "name": "极光幕" },
      { "rank": 3, "type": "Water", "name": "衝浪" },
      { "rank": 3, "type": "Ice", "name": "暴風雪" },
      { "rank": 4, "type": "Rock", "name": "双刃头錘" },
      { "rank": 4, "type": "Water", "name": "水流环" },
      { "rank": 4, "type": "Normal", "name": "腹鼓" }
    ]
  },
  {
    "id": "875-noice",
    "region": "galar",
    "name": "冰砌鵝 (解凍头型態)",
    "alias": "Eiscue",
    "type": [
      "Ice"
    ],
    "info": {
      "image": "images/pokedex/875-noice.png",
      "height": "1.4",
      "weight": "89",
      "category": "企鵝寶可夢",
      "text": "冰砌鵝的「解凍」型態实際上才是牠原本的型態。没有了冰塊的保護，你可以看見牠一脸惆悵的表情，而这也讓人为之著迷。牠现在能夠更怪地移动，但你可以看出到牠變得更焦躁。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 4,
    "rank": 2,
    "attr": {
      "str": { "value": 2, "max": 5 },
      "dex": { "value": 3, "max": 7 },
      "vit": { "value": 2, "max": 5 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "结凍头"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 0, "type": "Ice", "name": "白霧" },
      { "rank": 1, "type": "Ice", "name": "细雪" },
      { "rank": 1, "type": "Ice", "name": "冰凍之風" },
      { "rank": 2, "type": "Normal", "name": "氣象球" },
      { "rank": 2, "type": "Normal", "name": "头鎚" },
      { "rank": 2, "type": "Psychic", "name": "瞬间失憶" },
      { "rank": 2, "type": "Ice", "name": "冰雹" },
      { "rank": 2, "type": "Ice", "name": "冷凍干燥" },
      { "rank": 3, "type": "Ice", "name": "极光幕" },
      { "rank": 3, "type": "Water", "name": "衝浪" },
      { "rank": 3, "type": "Ice", "name": "暴風雪" },
      { "rank": 4, "type": "Rock", "name": "双刃头錘" },
      { "rank": 4, "type": "Water", "name": "水流环" },
      { "rank": 4, "type": "Normal", "name": "腹鼓" }
    ]
  },
  {
    "id": "876",
    "region": "galar",
    "name": "愛管侍",
    "alias": "Indeedee",
    "type": [
      "Psychic",
      "Normal"
    ],
    "info": {
      "image": "images/pokedex/876.png",
      "height": "0.9",
      "weight": "28",
      "category": "感情寶可夢",
      "text": "这些高度智能的寶可夢能透过夥伴间角与角的互碰來彼此交換訊息。牠們喜歡協助並为人們服務，这是因为牠們能收集感謝之情來獲得能量。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 4,
    "rank": 0,
    "attr": {
      "str": { "value": 2, "max": 4 },
      "dex": { "value": 3, "max": 6 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 3, "max": 6 },
      "ins": { "value": 3, "max": 6 }
    },
    "ability": [
      "精神力",
      "同步"
    ],
    "moves": [
      { "rank": 0, "type": "Psychic", "name": "輔助力量" },
      { "rank": 0, "type": "Normal", "name": "和睦相處" },
      { "rank": 1, "type": "Normal", "name": "再來一次" },
      { "rank": 1, "type": "Normal", "name": "接棒" },
      { "rank": 1, "type": "Fairy", "name": "魅惑之聲" },
      { "rank": 2, "type": "Psychic", "name": "幻象光線" },
      { "rank": 2, "type": "Normal", "name": "幫助" },
      { "rank": 2, "type": "Normal", "name": "看我嘛" },
      { "rank": 2, "type": "Normal", "name": "您先请" },
      { "rank": 2, "type": "Grass", "name": "芳香治療" },
      { "rank": 3, "type": "Psychic", "name": "冥想" },
      { "rank": 3, "type": "Psychic", "name": "精神强念" },
      { "rank": 3, "type": "Psychic", "name": "力量平分" },
      { "rank": 3, "type": "Psychic", "name": "防守平分" },
      { "rank": 3, "type": "Normal", "name": "珍藏" },
      { "rank": 3, "type": "Psychic", "name": "治癒之願" },
      { "rank": 3, "type": "Psychic", "name": "精神場地" },
      { "rank": 4, "type": "Normal", "name": "擊掌奇襲" },
      { "rank": 4, "type": "Ghost", "name": "暗影球" },
      { "rank": 4, "type": "Psychic", "name": "奇妙空间" }
    ]
  },
  {
    "id": "877",
    "region": "galar",
    "name": "莫魯貝可",
    "alias": "Morpeko",
    "type": [
      "Electric",
      "Dark"
    ],
    "info": {
      "image": "images/pokedex/877.png",
      "height": "0.3",
      "weight": "3",
      "category": "双面寶可夢",
      "text": "牠的满腹花纹模式相当友善且愛玩，喜歡收集食物和零嘴。但肚子餓扁时的飢餓感會使牠變得极端凶暴，且牠颊囊中的電能转化成了恶属性的能量。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 4,
    "rank": 1,
    "attr": {
      "str": { "value": 3, "max": 6 },
      "dex": { "value": 3, "max": 6 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 2, "max": 5 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "飽了又餓"
    ],
    "moves": [
      { "rank": 0, "type": "Electric", "name": "電擊" },
      { "rank": 0, "type": "Normal", "name": "搖尾巴" },
      { "rank": 1, "type": "Normal", "name": "瞪眼" },
      { "rank": 1, "type": "Dark", "name": "囂张" },
      { "rank": 1, "type": "Normal", "name": "電光一闪" },
      { "rank": 2, "type": "Dark", "name": "吹捧" },
      { "rank": 2, "type": "Dark", "name": "咬住" },
      { "rank": 2, "type": "Electric", "name": "電光" },
      { "rank": 2, "type": "Dark", "name": "无理取鬧" },
      { "rank": 2, "type": "Psychic", "name": "高速移动" },
      { "rank": 2, "type": "Grass", "name": "种子机关枪" },
      { "rank": 3, "type": "Dark", "name": "咬碎" },
      { "rank": 3, "type": "Electric", "name": "氣場輪" },
      { "rank": 3, "type": "Normal", "name": "大鬧一番" },
      { "rank": 4, "type": "Normal", "name": "憤怒門牙" },
      { "rank": 4, "type": "Electric", "name": "疯狂伏特" },
      { "rank": 4, "type": "Dragon", "name": "逆鱗" }
    ]
  },
  {
    "id": "878",
    "region": "galar",
    "name": "銅象",
    "alias": "Cufant",
    "type": [
      "Steel"
    ],
    "info": {
      "image": "images/pokedex/878.png",
      "height": "1.2",
      "weight": "100",
      "category": "像銅寶可夢",
      "text": "如果有需要力量的工作时，这隻寶可夢能夠表现出色。牠銅质的身体會因雨水而生鏽，转變成鮮豔的綠色。牠的鼻子特別善於挖地，在野外牠們會用來挖出樹根來吃。"
    },
    "evolution": {
      "stage": "first",
      "time": "medium"
    },
    "baseHP": 3,
    "rank": 1,
    "attr": {
      "str": { "value": 2, "max": 5 },
      "dex": { "value": 1, "max": 3 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 1, "max": 3 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "强行",
      "重金属"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 0, "type": "Normal", "name": "叫聲" },
      { "rank": 1, "type": "Rock", "name": "滾动" },
      { "rank": 1, "type": "Fight", "name": "碎岩" },
      { "rank": 2, "type": "Ground", "name": "重踏" },
      { "rank": 2, "type": "Normal", "name": "踩踏" },
      { "rank": 2, "type": "Ground", "name": "挖洞" },
      { "rank": 2, "type": "Steel", "name": "鐵壁" },
      { "rank": 2, "type": "Normal", "name": "怪力" },
      { "rank": 2, "type": "Steel", "name": "鐵头" },
      { "rank": 2, "type": "Fairy", "name": "嬉鬧" },
      { "rank": 3, "type": "Ground", "name": "十萬馬力" },
      { "rank": 3, "type": "Fight", "name": "蠻力" },
      { "rank": 4, "type": "Rock", "name": "隱形岩" },
      { "rank": 4, "type": "Psychic", "name": "意念头鎚" },
      { "rank": 4, "type": "Ground", "name": "地裂" }
    ],
    "isNovice": true
  },
  {
    "id": "879",
    "region": "galar",
    "name": "大王銅象",
    "alias": "Copperajah",
    "type": [
      "Steel"
    ],
    "info": {
      "image": "images/pokedex/879.png",
      "height": "3",
      "weight": "650",
      "category": "像銅寶可夢",
      "text": "牠們是在很久以前從其他地區过來的，与人类一起工作建造新的道路和城市。牠們通常很温和且喜歡陪伴牠的家族。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 6,
    "rank": 2,
    "attr": {
      "str": { "value": 3, "max": 7 },
      "dex": { "value": 1, "max": 3 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 2, "max": 5 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "强行",
      "重金属"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 0, "type": "Normal", "name": "叫聲" },
      { "rank": 1, "type": "Rock", "name": "滾动" },
      { "rank": 1, "type": "Fight", "name": "碎岩" },
      { "rank": 2, "type": "Ground", "name": "重踏" },
      { "rank": 2, "type": "Normal", "name": "踩踏" },
      { "rank": 2, "type": "Ground", "name": "挖洞" },
      { "rank": 2, "type": "Steel", "name": "鐵壁" },
      { "rank": 2, "type": "Normal", "name": "怪力" },
      { "rank": 2, "type": "Steel", "name": "鐵头" },
      { "rank": 2, "type": "Fairy", "name": "嬉鬧" },
      { "rank": 3, "type": "Ground", "name": "十萬馬力" },
      { "rank": 3, "type": "Fight", "name": "蠻力" },
      { "rank": 3, "type": "Steel", "name": "重磅衝撞" },
      { "rank": 4, "type": "Ground", "name": "地裂" },
      { "rank": 4, "type": "Grass", "name": "强力鞭打" },
      { "rank": 4, "type": "Dragon", "name": "逆鱗" }
    ]
  },
  {
    "id": "880",
    "region": "galar",
    "name": "雷鳥龍",
    "alias": "",
    "type": [
      "Dragon",
      "Electric"
    ],
    "info": {
      "image": "images/pokedex/880.png",
      "height": "1.8",
      "weight": "190",
      "category": "化石寶可夢",
      "text": "在復活过程中混合的DNA導致了这个生物的诞生。構成牠下半部身体的超强壮生物很有可能會捕食構成上半部身体的小型生物。有时候牠會嘗试逃離自己。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 4,
    "rank": 3,
    "attr": {
      "str": { "value": 3, "max": 6 },
      "dex": { "value": 2, "max": 5 },
      "vit": { "value": 2, "max": 5 },
      "spe": { "value": 2, "max": 5 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "蓄電",
      "活力"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 0, "type": "Electric", "name": "電擊" },
      { "rank": 1, "type": "Electric", "name": "充電" },
      { "rank": 1, "type": "Flying", "name": "燕返" },
      { "rank": 2, "type": "Rock", "name": "原始之力" },
      { "rank": 2, "type": "Flying", "name": "啄食" },
      { "rank": 2, "type": "Dragon", "name": "龍尾" },
      { "rank": 2, "type": "Normal", "name": "踩踏" },
      { "rank": 2, "type": "Normal", "name": "摔打" },
      { "rank": 2, "type": "Electric", "name": "放電" },
      { "rank": 3, "type": "Electric", "name": "電喙" },
      { "rank": 3, "type": "Dragon", "name": "龍之波动" },
      { "rank": 3, "type": "Dragon", "name": "龍之俯衝" },
      { "rank": 4, "type": "Dragon", "name": "廣域破壞" },
      { "rank": 4, "type": "Electric", "name": "疯狂伏特" },
      { "rank": 4, "type": "Dragon", "name": "流星群" }
    ]
  },
  {
    "id": "881",
    "region": "galar",
    "name": "雷鳥海兽",
    "alias": "Arctozolt",
    "type": [
      "Electric",
      "Ice"
    ],
    "info": {
      "image": "images/pokedex/881.png",
      "height": "2.3",
      "weight": "150",
      "category": "化石寶可夢",
      "text": "这隻DNA混合兽非常不擅长走路。組成牠下半部的寶可夢來自极地區域而上半部则住在温暖的叢林地帶。这可憐的生物总是在顫抖並不受控制地打噴嚏。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 5,
    "rank": 3,
    "attr": {
      "str": { "value": 3, "max": 6 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 2, "max": 5 },
      "spe": { "value": 2, "max": 5 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "蓄電",
      "靜電"
    ],
    "moves": [
      { "rank": 0, "type": "Ice", "name": "细雪" },
      { "rank": 0, "type": "Electric", "name": "電擊" },
      { "rank": 1, "type": "Electric", "name": "充電" },
      { "rank": 1, "type": "Normal", "name": "回聲" },
      { "rank": 2, "type": "Rock", "name": "原始之力" },
      { "rank": 2, "type": "Flying", "name": "啄食" },
      { "rank": 2, "type": "Ice", "name": "雪崩" },
      { "rank": 2, "type": "Ice", "name": "冷凍干燥" },
      { "rank": 2, "type": "Normal", "name": "摔打" },
      { "rank": 2, "type": "Electric", "name": "放電" },
      { "rank": 3, "type": "Electric", "name": "電喙" },
      { "rank": 3, "type": "Ice", "name": "冰柱墜擊" },
      { "rank": 3, "type": "Ice", "name": "暴風雪" },
      { "rank": 4, "type": "Ice", "name": "冰雹" },
      { "rank": 4, "type": "Electric", "name": "疯狂伏特" },
      { "rank": 4, "type": "Ground", "name": "跺腳" }
    ]
  },
  {
    "id": "882",
    "region": "galar",
    "name": "鰓魚龍",
    "alias": "Dracovish",
    "type": [
      "Dragon",
      "Water"
    ],
    "info": {
      "image": "images/pokedex/882.png",
      "height": "2.3",
      "weight": "215",
      "category": "化石寶可夢",
      "text": "结合了两种頂级掠食者的DNA，牠能以驚人的高速奔跑並用尖銳的下顎撕碎幾乎任何東西。然而难过的是，这隻寶可夢只能在水中呼吸，且游泳能力很烂。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 5,
    "rank": 3,
    "attr": {
      "str": { "value": 2, "max": 5 },
      "dex": { "value": 2, "max": 5 },
      "vit": { "value": 3, "max": 6 },
      "spe": { "value": 2, "max": 5 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "儲水",
      "强壮之顎"
    ],
    "moves": [
      { "rank": 0, "type": "Normal", "name": "撞擊" },
      { "rank": 0, "type": "Water", "name": "水枪" },
      { "rank": 1, "type": "Normal", "name": "守住" },
      { "rank": 1, "type": "Dark", "name": "狂舞揮打" },
      { "rank": 2, "type": "Rock", "name": "原始之力" },
      { "rank": 2, "type": "Dark", "name": "咬住" },
      { "rank": 2, "type": "Dragon", "name": "龍息" },
      { "rank": 2, "type": "Normal", "name": "踩踏" },
      { "rank": 3, "type": "Normal", "name": "憤怒門牙" },
      { "rank": 3, "type": "Dark", "name": "咬碎" },
      { "rank": 3, "type": "Water", "name": "鰓咬" },
      { "rank": 3, "type": "Dragon", "name": "龍之波动" },
      { "rank": 3, "type": "Dragon", "name": "龍之俯衝" },
      { "rank": 4, "type": "Dragon", "name": "流星群" },
      { "rank": 4, "type": "Psychic", "name": "精神之牙" },
      { "rank": 4, "type": "Water", "name": "潮旋" }
    ]
  },
  {
    "id": "883",
    "region": "galar",
    "name": "鰓魚海兽",
    "alias": "Arctovish",
    "type": [
      "Water",
      "Ice"
    ],
    "info": {
      "image": "images/pokedex/883.png",
      "height": "2",
      "weight": "175",
      "category": "化石寶可夢",
      "text": "DNA的混合讓这隻穩固的生物能夠在寒冷水域中移动、呼吸、並抵抗寒冷。唯一的问题是牠的头上下顛倒了。那牠没辦法自己狩獵，因此如果没有被餵養的话，牠會在幾天內因为飢餓而死掉。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 4,
    "rank": 3,
    "attr": {
      "str": { "value": 2, "max": 5 },
      "dex": { "value": 2, "max": 4 },
      "vit": { "value": 3, "max": 6 },
      "spe": { "value": 2, "max": 5 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [
      "儲水",
      "冰凍之軀"
    ],
    "moves": [
      { "rank": 0, "type": "Ice", "name": "细雪" },
      { "rank": 0, "type": "Water", "name": "水枪" },
      { "rank": 1, "type": "Normal", "name": "守住" },
      { "rank": 1, "type": "Ice", "name": "冰凍之風" },
      { "rank": 2, "type": "Rock", "name": "原始之力" },
      { "rank": 2, "type": "Dark", "name": "咬住" },
      { "rank": 2, "type": "Ice", "name": "极光幕" },
      { "rank": 2, "type": "Ice", "name": "冷凍干燥" },
      { "rank": 2, "type": "Normal", "name": "憤怒門牙" },
      { "rank": 3, "type": "Water", "name": "鰓咬" },
      { "rank": 3, "type": "Ice", "name": "冰柱墜擊" },
      { "rank": 3, "type": "Ice", "name": "暴風雪" },
      { "rank": 4, "type": "Water", "name": "水流裂破" },
      { "rank": 4, "type": "Steel", "name": "鐵壁" },
      { "rank": 4, "type": "Psychic", "name": "精神之牙" }
    ]
  },
  {
    "id": "884",
    "region": "galar",
    "name": "鋁鋼龍",
    "alias": "Duraludon",
    "type": [
      "Dragon",
      "Steel"
    ],
    "info": {
      "image": "images/pokedex/884.png",
      "height": "1.8",
      "weight": "40",
      "category": "合金寶可夢",
      "text": "牠的身体猶如打磨过的闪亮金属，雖然輕而堅硬，卻有著容易生鏽的弱点。牠居住在氣候干燥的洞穴深處，因为下雨和湿氣會使牠變得暴躁。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 4,
    "rank": 3,
    "attr": {
      "str": { "value": 3, "max": 6 },
      "dex": { "value": 2, "max": 5 },
      "vit": { "value": 3, "max": 6 },
      "spe": { "value": 3, "max": 7 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "輕金属",
      "重金属"
    ],
    "moves": [
      { "rank": 0, "type": "Steel", "name": "金属爪" },
      { "rank": 0, "type": "Normal", "name": "瞪眼" },
      { "rank": 1, "type": "Fight", "name": "碎岩" },
      { "rank": 1, "type": "Dark", "name": "磨爪" },
      { "rank": 2, "type": "Steel", "name": "金属音" },
      { "rank": 2, "type": "Dragon", "name": "廣域破壞" },
      { "rank": 2, "type": "Dragon", "name": "龍尾" },
      { "rank": 2, "type": "Steel", "name": "鐵壁" },
      { "rank": 2, "type": "Normal", "name": "磨礪" },
      { "rank": 2, "type": "Dragon", "name": "龍爪" },
      { "rank": 3, "type": "Steel", "name": "加農光炮" },
      { "rank": 3, "type": "Steel", "name": "金属爆炸" },
      { "rank": 3, "type": "Normal", "name": "破壞光線" },
      { "rank": 4, "type": "Dragon", "name": "流星群" },
      { "rank": 4, "type": "Steel", "name": "鐵蹄光線" },
      { "rank": 4, "type": "Psychic", "name": "镜面反射" }
    ]
  },
  {
    "id": "885",
    "region": "galar",
    "name": "多龍梅西亞",
    "alias": "Dreepy",
    "type": [
      "Dragon",
      "Ghost"
    ],
    "info": {
      "image": "images/pokedex/885.png",
      "height": "0.5",
      "weight": "2",
      "category": "哀怨寶可夢",
      "text": "在重生为幽灵寶可夢后，多龍梅西亞仍然會在生前於古代大海棲息的住處徘徊。儘管单独一隻无法構成什么威脅，但如果牠們聚集起來，那你就麻煩大了。"
    },
    "evolution": {
      "stage": "first",
      "time": "slow"
    },
    "baseHP": 3,
    "rank": 0,
    "attr": {
      "str": { "value": 2, "max": 4 },
      "dex": { "value": 2, "max": 5 },
      "vit": { "value": 1, "max": 3 },
      "spe": { "value": 1, "max": 3 },
      "ins": { "value": 1, "max": 3 }
    },
    "ability": [
      "恆淨之軀",
      "穿透"
    ],
    "moves": [
      { "rank": 0, "type": "Ghost", "name": "驚吓" },
      { "rank": 0, "type": "Bug", "name": "死缠烂打" },
      { "rank": 1, "type": "Normal", "name": "電光一闪" },
      { "rank": 2, "type": "Dark", "name": "咬住" },
      { "rank": 4, "type": "Normal", "name": "替身" },
      { "rank": 4, "type": "Dragon", "name": "龍尾" },
      { "rank": 4, "type": "Normal", "name": "影子分身" }
    ],
    "isNovice": true
  },
  {
    "id": "886",
    "region": "galar",
    "name": "多龍奇",
    "alias": "Drakloak",
    "type": [
      "Dragon",
      "Ghost"
    ],
    "info": {
      "image": "images/pokedex/886.png",
      "height": "1.4",
      "weight": "11",
      "category": "保母寶可夢",
      "text": "牠會与多龍梅西亞一起戰鬥，且直到牠們進化为止都會细心照顧。如果没讓自己在照顧的多龍梅西亞乘在自己头上的话就靜不下心來，牠甚至會因此试圖把別的寶可夢放到头上。"
    },
    "evolution": {
      "stage": "second",
      "time": "slow"
    },
    "baseHP": 4,
    "rank": 3,
    "attr": {
      "str": { "value": 2, "max": 5 },
      "dex": { "value": 3, "max": 6 },
      "vit": { "value": 2, "max": 4 },
      "spe": { "value": 2, "max": 4 },
      "ins": { "value": 2, "max": 4 }
    },
    "ability": [
      "恆淨之軀",
      "穿透"
    ],
    "moves": [
      { "rank": 0, "type": "Ghost", "name": "驚吓" },
      { "rank": 0, "type": "Bug", "name": "死缠烂打" },
      { "rank": 1, "type": "Normal", "name": "電光一闪" },
      { "rank": 1, "type": "Dark", "name": "咬住" },
      { "rank": 2, "type": "Normal", "name": "锁定" },
      { "rank": 2, "type": "Dark", "name": "恶意追擊" },
      { "rank": 2, "type": "Ghost", "name": "禍不单行" },
      { "rank": 2, "type": "Psychic", "name": "高速移动" },
      { "rank": 2, "type": "Normal", "name": "二連擊" },
      { "rank": 2, "type": "Bug", "name": "急速折返" },
      { "rank": 2, "type": "Dragon", "name": "龍之舞" },
      { "rank": 2, "type": "Dragon", "name": "龍之波动" },
      { "rank": 3, "type": "Ghost", "name": "潛灵奇襲" },
      { "rank": 3, "type": "Normal", "name": "猛撞" },
      { "rank": 3, "type": "Dragon", "name": "龍之俯衝" },
      { "rank": 3, "type": "Normal", "name": "捨身衝撞" },
      { "rank": 3, "type": "Normal", "name": "珍藏" },
      { "rank": 4, "type": "Ghost", "name": "奇異之光" },
      { "rank": 4, "type": "Dark", "name": "突襲" },
      { "rank": 4, "type": "Dragon", "name": "流星群" }
    ]
  },
  {
    "id": "887",
    "region": "galar",
    "name": "多龍巴魯托",
    "alias": "Dragapult",
    "type": [ "Dragon", "Ghost" ],
    "info": {
      "image": "images/pokedex/887.png",
      "height": "3",
      "weight": "50",
      "category": "隱形寶可夢",
      "text": "没有在戰鬥的时候，牠會讓多龍梅西亞住在自己角上的洞裡。一旦戰鬥开始，牠會把多龍梅西亞如同超音速飛彈一樣射出去。这些小寶可夢似乎满心期待著能被射出去，且會自行回來装填。"
    },
    "evolution": {
      "stage": "final"
    },
    "baseHP": 6,
    "rank": 4,
    "attr": {
      "str": { "value": 3, "max": 7 },
      "dex": { "value": 3, "max": 7 },
      "vit": { "value": 2, "max": 5 },
      "spe": { "value": 3, "max": 6 },
      "ins": { "value": 2, "max": 5 }
    },
    "ability": [ "恆淨之軀", "穿透" ],
    "moves": [
      { "rank": 0, "type": "Ghost", "name": "驚吓" },
      { "rank": 0, "type": "Bug", "name": "死缠烂打" },
      { "rank": 1, "type": "Normal", "name": "電光一闪" },
      { "rank": 1, "type": "Dark", "name": "咬住" },
      { "rank": 2, "type": "Normal", "name": "锁定" },
      { "rank": 2, "type": "Normal", "name": "二連擊" },
      { "rank": 2, "type": "Bug", "name": "急速折返" },
      { "rank": 2, "type": "Dark", "name": "恶意追擊" },
      { "rank": 2, "type": "Dragon", "name": "龍息" },
      { "rank": 2, "type": "Dragon", "name": "龍之舞" },
      { "rank": 2, "type": "Dragon", "name": "龍箭" },
      { "rank": 2, "type": "Ghost", "name": "禍不单行" },
      { "rank": 2, "type": "Psychic", "name": "高速移动" },
      { "rank": 3, "type": "Normal", "name": "捨身衝撞" },
      { "rank": 3, "type": "Normal", "name": "猛撞" },
      { "rank": 3, "type": "Normal", "name": "珍藏" },
      { "rank": 3, "type": "Dark", "name": "突襲" },
      { "rank": 3, "type": "Dragon", "name": "龍之俯衝" },
      { "rank": 3, "type": "Ghost", "name": "潛灵奇襲" },
      { "rank": 4, "type": "Dragon", "name": "流星群" },
      { "rank": 4, "type": "Psychic", "name": "光牆" },
      { "rank": 4, "type": "Psychic", "name": "反射壁" },
    ]
  },
  {
    "id": "888",
    "region": "galar",
    "name": "苍響",
    "alias": "Zacian",
    "type": [
      "Fairy"
    ],
    "info": {
      "image": "images/pokedex/888.png",
      "height": "2.8",
      "weight": "110",
      "category": "无资料",
      "text": "被稱为傳说中的英雄，祂透过純粹的力量揮舞著英雄之剑，擊败了巨大的邪恶。"
    },
    "evolution": {
      "stage": "unknown"
    },
    "baseHP": 5,
    "rank": 5,
    "attr": {
      "str": { "value": 7, "max": 7 },
      "dex": { "value": 7, "max": 7 },
      "vit": { "value": 6, "max": 6 },
      "spe": { "value": 5, "max": 5 },
      "ins": { "value": 6, "max": 6 }
    },
    "ability": [
      "不撓之剑"
    ],
    "moves": [
      { "rank": 5, "type": "Fight", "name": "聖剑" },
      { "rank": 5, "type": "Fight", "name": "快速防守" },
      { "rank": 5, "type": "Steel", "name": "金属爪" },
      { "rank": 5, "type": "Normal", "name": "长嚎" },
      { "rank": 5, "type": "Normal", "name": "電光一闪" },
      { "rank": 5, "type": "Dark", "name": "咬住" },
      { "rank": 5, "type": "Normal", "name": "劈开" },
      { "rank": 5, "type": "Normal", "name": "剑舞" },
      { "rank": 5, "type": "Steel", "name": "鐵头" },
      { "rank": 5, "type": "Normal", "name": "磨礪" },
      { "rank": 5, "type": "Dark", "name": "咬碎" },
      { "rank": 5, "type": "Fairy", "name": "月亮之力" },
      { "rank": 5, "type": "Fight", "name": "近身戰" },
      { "rank": 5, "type": "Normal", "name": "終极衝擊" },
      { "rank": 5, "type": "Flying", "name": "空氣斬" },
      { "rank": 5, "type": "Psychic", "name": "精神利刃" },
      { "rank": 5, "type": "Grass", "name": "日光刃" }
    ],
    "isLegend": true
  },
  {
    "id": "888-sword",
    "region": "galar",
    "name": "苍響 (剑之王)",
    "alias": "Zacian",
    "type": [
      "Fairy",
      "Steel"
    ],
    "info": {
      "image": "images/pokedex/888-sword.png",
      "height": "2.8",
      "weight": "110",
      "category": "无资料",
      "text": "傳说中能斬斷世间萬物的聖剑，也被稱为妖精王之剑，讓敵友都对牠敬畏不已。"
    },
    "evolution": {
      "stage": "unknown"
    },
    "baseHP": 5,
    "rank": 5,
    "attr": {
      "str": { "value": 9, "max": 9 },
      "dex": { "value": 8, "max": 8 },
      "vit": { "value": 6, "max": 6 },
      "spe": { "value": 5, "max": 5 },
      "ins": { "value": 6, "max": 6 }
    },
    "ability": [
      "不撓之剑"
    ],
    "moves": [
      { "rank": 5, "type": "Fight", "name": "聖剑" },
      { "rank": 5, "type": "Fight", "name": "快速防守" },
      { "rank": 5, "type": "Steel", "name": "金属爪" },
      { "rank": 5, "type": "Normal", "name": "长嚎" },
      { "rank": 5, "type": "Normal", "name": "電光一闪" },
      { "rank": 5, "type": "Dark", "name": "咬住" },
      { "rank": 5, "type": "Normal", "name": "劈开" },
      { "rank": 5, "type": "Normal", "name": "剑舞" },
      { "rank": 5, "type": "Steel", "name": "鐵头" },
      { "rank": 5, "type": "Normal", "name": "磨礪" },
      { "rank": 5, "type": "Dark", "name": "咬碎" },
      { "rank": 5, "type": "Fairy", "name": "月亮之力" },
      { "rank": 5, "type": "Fight", "name": "近身戰" },
      { "rank": 5, "type": "Normal", "name": "終极衝擊" },
      { "rank": 5, "type": "Flying", "name": "空氣斬" },
      { "rank": 5, "type": "Psychic", "name": "精神利刃" },
      { "rank": 5, "type": "Grass", "name": "日光刃" },
      { "rank": 5, "type": "Steel", "name": "鐵蹄光線" },
      { "rank": 5, "type": "Steel", "name": "巨兽斬" }
    ],
    "isLegend": true
  },
  {
    "id": "889",
    "region": "galar",
    "name": "藏瑪然特",
    "alias": "Zamazenta",
    "type": [
      "Fight"
    ],
    "info": {
      "image": "images/pokedex/889.png",
      "height": "2.9",
      "weight": "210",
      "category": "无资料",
      "text": "被稱为傳说中的英雄，祂透过純粹的力量高舉著英雄之盾，保護人們不受巨大的邪恶侵害。"
    },
    "evolution": {
      "stage": "unknown"
    },
    "baseHP": 5,
    "rank": 5,
    "attr": {
      "str": { "value": 7, "max": 7 },
      "dex": { "value": 7, "max": 7 },
      "vit": { "value": 6, "max": 6 },
      "spe": { "value": 5, "max": 5 },
      "ins": { "value": 6, "max": 6 }
    },
    "ability": [
      "不屈之盾"
    ],
    "moves": [
      { "rank": 5, "type": "Steel", "name": "金属爆炸" },
      { "rank": 5, "type": "Rock", "name": "廣域防守" },
      { "rank": 5, "type": "Steel", "name": "金属爪" },
      { "rank": 5, "type": "Normal", "name": "长嚎" },
      { "rank": 5, "type": "Normal", "name": "電光一闪" },
      { "rank": 5, "type": "Dark", "name": "咬住" },
      { "rank": 5, "type": "Normal", "name": "劈开" },
      { "rank": 5, "type": "Normal", "name": "剑舞" },
      { "rank": 5, "type": "Steel", "name": "鐵头" },
      { "rank": 5, "type": "Normal", "name": "磨礪" },
      { "rank": 5, "type": "Dark", "name": "咬碎" },
      { "rank": 5, "type": "Fairy", "name": "月亮之力" },
      { "rank": 5, "type": "Fight", "name": "近身戰" },
      { "rank": 5, "type": "Normal", "name": "終极衝擊" },
      { "rank": 5, "type": "Psychic", "name": "光牆" },
      { "rank": 5, "type": "Psychic", "name": "反射壁" },
      { "rank": 5, "type": "Normal", "name": "神秘守護" }
    ],
    "isLegend": true
  },
  {
    "id": "889-shield",
    "region": "galar",
    "name": "藏瑪然特 (盾之王)",
    "alias": "Zamazenta",
    "type": [
      "Fight",
      "Steel"
    ],
    "info": {
      "image": "images/pokedex/889-shield.png",
      "height": "2.9",
      "weight": "210",
      "category": "无资料",
      "text": "傳说中能反彈一切攻擊的聖盾，也被稱为格鬥王之盾，哪怕是最最庞大的巨兽也无法越雷池一步。"
    },
    "evolution": {
      "stage": "unknown"
    },
    "baseHP": 5,
    "rank": 5,
    "attr": {
      "str": { "value": 7, "max": 7 },
      "dex": { "value": 7, "max": 7 },
      "vit": { "value": 8, "max": 8 },
      "spe": { "value": 5, "max": 5 },
      "ins": { "value": 8, "max": 8 }
    },
    "ability": [
      "不屈之盾"
    ],
    "moves": [
      { "rank": 5, "type": "Steel", "name": "金属爆炸" },
      { "rank": 5, "type": "Rock", "name": "廣域防守" },
      { "rank": 5, "type": "Steel", "name": "金属爪" },
      { "rank": 5, "type": "Normal", "name": "长嚎" },
      { "rank": 5, "type": "Normal", "name": "電光一闪" },
      { "rank": 5, "type": "Dark", "name": "咬住" },
      { "rank": 5, "type": "Normal", "name": "劈开" },
      { "rank": 5, "type": "Normal", "name": "剑舞" },
      { "rank": 5, "type": "Steel", "name": "鐵头" },
      { "rank": 5, "type": "Normal", "name": "磨礪" },
      { "rank": 5, "type": "Dark", "name": "咬碎" },
      { "rank": 5, "type": "Fairy", "name": "月亮之力" },
      { "rank": 5, "type": "Fight", "name": "近身戰" },
      { "rank": 5, "type": "Normal", "name": "終极衝擊" },
      { "rank": 5, "type": "Psychic", "name": "光牆" },
      { "rank": 5, "type": "Psychic", "name": "反射壁" },
      { "rank": 5, "type": "Normal", "name": "神秘守護" },
      { "rank": 5, "type": "Steel", "name": "鐵蹄光線" },
      { "rank": 5, "type": "Steel", "name": "巨兽彈" }
    ],
    "isLegend": true
  },
  {
    "id": "890",
    "region": "galar",
    "name": "无极汰那",
    "alias": "Eternatus",
    "type": [
      "Dragon",
      "Poison"
    ],
    "info": {
      "image": "images/pokedex/890.png",
      "height": "20",
      "weight": "950",
      "category": "无资料",
      "text": "在二萬年前一顆巨大的隕石墜落到伽勒爾地區，從那时候起大地就时不时會湧现出能使寶可夢极巨化的能量，这个现象在近幾年變得越來越频繁。"
    },
    "evolution": {
      "stage": "unknown"
    },
    "baseHP": 10,
    "rank": 5,
    "attr": {
      "str": { "value": 5, "max": 5 },
      "dex": { "value": 7, "max": 7 },
      "vit": { "value": 6, "max": 6 },
      "spe": { "value": 8, "max": 8 },
      "ins": { "value": 6, "max": 6 }
    },
    "ability": [
      "壓迫感"
    ],
    "moves": [
      { "rank": 5, "type": "Poison", "name": "毒尾" },
      { "rank": 5, "type": "Ghost", "name": "奇異之光" },
      { "rank": 5, "type": "Dragon", "name": "龍尾" },
      { "rank": 5, "type": "Psychic", "name": "高速移动" },
      { "rank": 5, "type": "Poison", "name": "劇毒" },
      { "rank": 5, "type": "Poison", "name": "毒液衝擊" },
      { "rank": 5, "type": "Dragon", "name": "龍之舞" },
      { "rank": 5, "type": "Poison", "name": "十字毒刃" },
      { "rank": 5, "type": "Dragon", "name": "龍之波动" },
      { "rank": 5, "type": "Fire", "name": "噴射火焰" },
      { "rank": 5, "type": "Dragon", "name": "极巨炮" },
      { "rank": 5, "type": "Psychic", "name": "宇宙力量" },
      { "rank": 5, "type": "Normal", "name": "自我再生" },
      { "rank": 5, "type": "Normal", "name": "破壞光線" },
      { "rank": 5, "type": "Dragon", "name": "无极光束" },
      { "rank": 5, "type": "Psychic", "name": "光牆" },
      { "rank": 5, "type": "Psychic", "name": "反射壁" },
      { "rank": 5, "type": "Normal", "name": "守住" }
    ],
    "isLegend": true
  }
]);