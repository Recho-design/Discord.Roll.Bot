
# RoboYabaso@HKTRPG

<p align="center">
    <p align="center"><a href="https://www.hktrpg.com" target="_blank" rel="noopener noreferrer"><img width="200" src="https://github.com/hktrpg/TG.line.Discord.Roll.Bot/raw/master/views/image.png" alt="HKTRPG logo"></a></p>
</p>

<p align="center">
    <a href="https://github.com/hktrpg/TG.line.Discord.Roll.Bot/fork"><img src="https://img.shields.io/github/forks/hktrpg/TG.line.Discord.Roll.Bot" alt="Forks"></a>
    <a href="https://github.com/hktrpg/TG.line.Discord.Roll.Bot/releases/latest"><img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/hktrpg/TG.line.Discord.Roll.Bot"></a>
    <a href="https://support.hktrpg.com" title="Join the discord server!"><img src="https://img.shields.io/discord/278202347165974529?logo=discord" alt="Discord invite button" /></a>
    <a href="https://patreon.com/HKTRPG" title="Donate to this project using Patreon"><img src="https://img.shields.io/badge/patreon-donate-red.svg" alt="Patreon donate button" /></a>
</p>

# 【HKTRPG掷骰BOT】

- 最后更新时间![最后更新时间](https://img.shields.io/github/last-commit/hktrpg/TG.line.Discord.Roll.Bot)

## HKTRPG掷骰子专用机械人 Roll Dice Robot

- HKTRPG是在Discord, Line, Telegram, Whatsapp, Plurk, API 和网页上都可以使用的骰子机械人！
  - 功能：暗骰, 各类TRPG骰子掷骰, 自定义骰子, 身份组管理, 频道经验值, 占卜, 先攻表, TRPG角色卡, 搜图, 翻译, Discord 聊天记录匯出, 数学计算, 做筆记, 随机抽选, wiki查询, 资料库快速查询功能, 定时发讯息功能, 每日笑话, 每日动漫, 每日一言, 每日黄历, 每日毒汤, 每日情话, 每日灵签, 每日大事, 每日(星座), 每日解答
- 使用方法请看 [HKTRPG 官方使用教学](https://bothelp.hktrpg.com/)
  - 歡迎加入[开发，求助及TRPG Discord 社区](https://support.hktrpg.com)
  - 邀请HKTRPG 加入
    - [Discord 邀请連结](https://discord.hktrpg.com)
    - [Telegram 邀请連结](http://t.me/hktrpg_bot)
    - [Line 邀请連结](http://bit.ly/HKTRPG_LINE)
    - [网页版 邀请連结](https://rollbot.hktrpg.com/)
    - [Plurk 邀请連结](https://www.plurk.com/HKTRPG)
    - [TRPG API 連结](https://api.hktrpg.com)
  - [HKTRPG 研究社 Facebook](https://www.facebook.com/groups/HKTRPG)
  - [TRPG 百科](https://www.HKTRPG.com/)
  - [名人堂](https://hktrpg.github.io/TG.line.Discord.Roll.Bot/CREDITS.html)
  - [贊助HKTRPG](https://www.patreon.com/HKTRPG)

# 鳴謝

- 最后感謝不同人的帮助，才可以完成这个BOT
  - LarryLo  Retsnimle - 写出如何建BOT的教程和开源程式，开始这个BOT的成长
  - 布大獅              - 教導我如何写好程式，還親手写出不同改进方式
  - LOKI Lokinen，木易 陳，Luo Ray，Vivian  -   因为有他们捐助，才可以把HKTRPG搬到更好的机子上
  - 以及其他一直帮助和意见的朋友

## 以下为旧版说明,将会废棄或修改

## 关于RoboYabaso

RoboYabaso最早由LarryLo  Retsnimle开发。  
是一个开放源码骰子机器人计畫。  
来源自 <https://docs.google.com/document/d/1dYnJqF2_QTp90ld4YXj6X8kgxvjUoHrB4E2seqlDlAk/edit>

现在改成三合一Line x Discord x Telegram。  
雖然是三合一，但可以单独使用，只是共用骰组，  
启动条件是在HEROUKU 输入BOT的 CHANNEL_SECRET

不然的话没这么多服务器开这么多ＢＯＴ。  
最期待Whatsapp快开放权限，香港都是比较多使用Whatsapp

这是建立在Heroku的免费服务器上，所以大家都可以按照下面的教程，客制化做一个自己的BOT！  
现支援普通掷骰，纯计算，趣味掷机掷骰，运势，克苏鲁神话  
朱の孤塔，神我狩，迷宮王國，亞俠必死的冒險，忍神，DX2nd,3rd  
命运Fate，永远的后日談，剑世界2.5，WOD黑暗世界，  
自定义骰子功能，储存掷骰指令功能，掷骰开关功能及资料库功能  

順便宣傳
<a href="http://www.goddessfantasy.net/bbs/index.php?board=1400.0">香港TRPG區</a>
<a href="https://www.hktrpg.com">TRPG百科</a>
招技术人员

### ToDo list

- [x] 暗骰同时把结果傳给指定对象
- [ ] 可以给非Admin GM权限
- [ ] 设定名字, 每次掷骰时显示
- [ ] 定时功能. GM 可以发佈任务, 定时提示时限, 玩家查询等等
- [ ] 投票功能
- [x] 存好指定掷骰方法, 输入指定即可快速打出来
- [ ] 选择图书式游戏(好像COC 单人TRPG 「向火独行」一样, 输入页码, 就会显示故事, 好像跑团一样,以后不怕没有同伴了,不过首先要有故事ORZ)
- [x] 增加 mee6式 LV 排名升级 功能(需修改觸发方法)
- [x] 增加 戰鬥轮回合功能 .round  next hide public init del
- [X] 增加 角色卡功能 .char set del
- [x] 增加 LOG功能 可以自动变成LOG

其他功能,歡迎留言建议

特色介紹
==

占卜运氣功能。  
支持大小阶。  
增加HELP功能。详情BOT內输入bothelp 查看说明  
支持直接 1d100 5d20。  
cc<= 改成 cc cc1 cc2 ccn1 ccn2。  
增加永远后日談的NC掷骰 来自Rainsting/TarotLineBot。  
增加wod 黑暗世界 DX3 SW2.0的掷骰。  
模组化设计。  

以下分別有Line Discord 和telegram 的说明  
用那个就看那个吧  
另外要申请一个mlab ACC, 教学遲些再写  

如何建立自己的Line骰子机器人
==

準備动作
--

- 先申请好Line账号（废话）

- 先申请好Github账号
- 先申请好Heroku账号  
以下全部选择用免费的服务就够了，请不要手殘选到付费。

Step1：先把这个专案Fork回去
--

- 到右上角的 ![Fork](http://i.imgur.com/g5VmzkC.jpg) 按钮嗎，按下去。  
把这个专案存到你的Github里。

Step2：建立lineBot賬号
--

- 到[https://developers.line.me/en/ ](https://developers.line.me/en/ )登入一个Line账号，  
点选「开始使用Messaging API」，按照指示注册你的line Bot賬号。  
![开始使用Messaging API](http://i.imgur.com/Zb2Oboy.jpg)

---

- 点下方那个「免费账号」

---

- 进入你剛注册的line Bot賬号

---

- 照著这个畫面设定,把Use webhooks 定为开启，Auto-reply messages  及Greeting messages 定为Disable  
![设定](http://i.imgur.com/PXf10Qs.jpg)

---

- 然后开著网页不要关。  
![LINE Developers](http://i.imgur.com/aks55p4.jpg)

---

Step3：将LineBot部署到Heroku
--

- 按一下下面这个按钮  
按它→[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/zeteticl/RoboYabaso)←按它

---

- 你会看到这个  
![Heroku](http://i.imgur.com/sbCVOcW.jpg)  
当然，先取一个App name，回到上个步驟的LINE Developers网页

Step4：取得Channel Access Token和Channel Secret
--

- 先取得Channel Secret，按右边的按钮  
![Channel Secret](http://i.imgur.com/oNN9gUx.jpg)  
把取得的字串复制到Step3的LINE_CHANNEL_SECRET

---

- 再取得Channel Access Token，按右边的按钮  
![Channel Access Token](http://i.imgur.com/UJ4AQlJ.jpg)  
把取得的字串复制到Step3的LINE_CHANNEL_ACCESSTOKEN  
接著，按下Deploy app，等他跑完之后按下Manage App  
距離部署完机器人只差一步啦！

Step5：鏈接Line与Heroku
--

- 点选settings  
![setting](http://i.imgur.com/9fEMoVh.jpg)

---

- 找到Domains and certificates这个条目，旁边会有个「Your app can be found at……」加一串网址，把网址复制起来。  
![Domain](http://i.imgur.com/dcgyeZa.jpg)

---

- 回到LINE Developers网页，选取最底下的edit，找到Webhook URL，把那串网址去除https://复制上去  
![webhook](http://i.imgur.com/tn2EN6l.jpg)

---

- 按下Save。看到在 Webhook URL 旁边有个 VERIFY 按钮嗎，按下去。  
如果出现 Success. 就表示你成功完成啦！  
![Success](http://i.imgur.com/yjlpIh8.jpg)

如何修改并上傳程式码咧
==

回到Heroku网页，点选上面的Deploy，你会看到四种配置程式码的方法。  
![Deploy](http://i.imgur.com/VVRpNLe.jpg)

我猜想如果你是会用第一种（Heroku Git）或是第四种（Container Registry）的人，应该是不会看这种教学文～所以我就不介紹了～  
絕、絕对不是我自己也不会的关係哦（眼神漂移）

以第二种（Github）来说的话，你可以綁定你的Github賬号——剛剛我们不是fork了一份程式码回去嗎？把它連接上去，这样你就可以在Github那边修改你要的程式码，再Deploy过来。  
或是你可以使用第三种（Dropbox），当你鏈接之后，它会自动帮你把你剛剛上線的程式码下载到你的dropbox里面。你修改完之后再上来Deploy就好咯。

準備动作
--

- 先申请好Discord账号（废话）

- 先申请好Github账号
- 先申请好Heroku账号  
以下全部选择用免费的服务就够了，请不要手殘选到付费。

Step1：先把这个专案Fork回去
--

- 到右上角的 ![Fork](http://i.imgur.com/g5VmzkC.jpg) 按钮嗎，按下去。  
把这个专案存到你的Github里。

Step2：建立DiscordBot賬号
--

- 到[http://discordapp.com/developers/applications/me](http://discordapp.com/developers/applications/me )登入一个Discord账号，  
点选「New Application」，按照指示注册你的Discord Bot。

---

- 记下那个「CLIENT ID」

- 进入左方Setting 的Bot

- 在BUILD-A-BOT中点选Add Bot->Yes Do It. 接著把「Token」复制(Copy)下来

Step3：将DiscordBot部署到Heroku
--

- 按一下下面这个按钮  
按它→[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/zeteticl/DiscordRollBot_HKTRPG)←按它

---

- 你会看到这个  
![Heroku](http://i.imgur.com/sbCVOcW.jpg)  
当然，先取一个App name，然后把以前记下的「Token」貼上.  
如果想要启动语,可以順便打上. 例如启动语!trpg 便会变成!trpg 1d100  
接著，按下Deploy app，等他跑完之后按下Manage App  
距離部署完机器人只差一步啦！

Step4：把机器人邀请到你的频道

--

- 剛剛复制了一个「CLIENT ID」把它取代到以下网址中间

[https://discordapp.com/oauth2/authorize?&client_id=CLIENTID&scope=bot&permissions=8](https://discordapp.com/oauth2/authorize?&client_id=CLIENTID&scope=bot&permissions=8)

- 点击然后选择你的频道
- 然后就可以在频道中使用你的Bot了.

---

测试功能  

```
npm install -g mocha
mocha .\test\analytics.test.js
```

Telegram......  
是最簡单的,和上面一样,先注册Telegram ACC  
然后到 <https://telegram.me/botfather>  
使用 /new bot 输入BotName 和UserName  
会得到Token 和邀请码，Token 就是输入到Heroku 中  
邀请码就是给Telegram 用家連到Bot的。

以上说明參考  
<https://github.com/zeteticl/TrpgLineBot-php>

下一部希望更新是

1. MONGODB (但好难啊....会有高手帮忙嗎....不想用GOOGLE SHEET.....
2. 骰组方法学习凍豆腐
3. Help的優化

更多更新资料放在Discord群上

【掷骰BOT】
--

暗骰功能 在指令前输入dr 结果会私信你  
例如输入2d6+1　攻击！  
会输出）2d6+1：攻击  9[6+3]+1 = 10  
如上面一样,在骰子数字后方隔空白位打字,可以进行发言。  
以下還有其他例子  
5 3D6 ：分別骰出5次3d6  
D66 D66s ：骰出D66 s小者固定在前  
5B10：不加总的掷骰
5B10S：不加总的掷骰，并按大至小排序  
5B10 8：如上,另外计算其中有多少粒大过8  
5U10 8：进行5D10 每骰出一粒8会有一粒奖励骰  
5U10 8 9：如上,另外计算其中有多少粒大过9  
Choice：启动语choice/随机/选项/选1  
(问题)(启动语)(问题)  (选项1) (选项2)  
例子 随机收到聖诞禮物数 1 2 3 >4  
  
随机排序：启动语　排序  
(问题)(启动语)(问题)  (选项1) (选项2)(选项3)  
例子 交換禮物排序 A君 C君 F君 G君

- COC 六版判定 CCb （目标値）：做出成功或失败的判定  
例）CCb 30　CCb 80
- COC 七版判定 CCx（目标値）  x：奖励骰/惩罚骰 (2～n2)。没有的话可以省略。  
例）CC 30　CC1 50　CCn2 75
- coc7 角色背景：启动语 coc7角色背景
- coc7 成长或增长检定：dp (技能) (名称)  
例）DP 80 侦查
- coc7 成长或增长检定：dp (技能) (名称)  
例）DP 80 侦查

现支援系统:
【了解骰组详情,请输入 bothelp (編号) 或 all 或 在指令后输入help 如 .sg help】  
0: 进阶掷骰 .ca (计算) D66(sn) 5B10 Dx 5U10 x y  
1: 趣味掷骰 排序(至少3个选项) choice/随机(至少2个选项) 每日塔罗 运势 立flag .me  
2: 克苏鲁神话 cc cc(n)1~2 ccb ccrt ccsu .dp .cc7build .cc6build .cc7bg  
3: 朱の孤塔 .al (nALx*p)  
4: DX2nd,3rd .dx (xDX+y@c ET)  
5: 命运Fate .4df(m|-)(加值)  
6: 神我狩 .kk (ET RT NT KT MTx)  
7: 迷宮王國 .mk (nMK+m 及各种表)  
8: 永远的后日談 .nc (NM xNC+m xNA+m)  
9: 亞俠必死的冒險 .ss (nR>=x[y,z,c] SRx+y FumbleT)  
10: 忍神 .sg (ST FT ET等各种表)  
11: 剑世界2.5 .sw (Kx Gr FT TT)  
12: 歌風 .UK (nUK nUK@c or nUKc)  
13: WOD黑暗世界 .xWDy  
14: 猫猫鬼差 .kc xDy z  
15: (公测中)Wiki查询/图片搜索/翻译 .wiki .image .tran  
16: (公测中)暗骰GM功能 .drgm (addgm del show) dr ddr dddr  
17: (公测中)经验值功能 .level (show config LevelUpWord RankWord)  
18: (公测中)自定义骰子功能 .ra(p)(次数) (add del show 自定关鍵字)  
19: (公测中)储存掷骰指令功能 .cmd (add del show 自定关鍵字)  
20: (公测中)掷骰开关功能 .bk (add del show)  
21: (公测中)资料库功能 .db(p) (add del show 自定关鍵字)

![image](https://cdn.midjourney.com/12db0d9b-1b9d-4707-a803-e06bfe9a8e3f/0_0.png)
