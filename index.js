"use strict";

require('dotenv').config({ override: true });
const fs = require('fs');



fs.readdirSync(__dirname + '/modules/').forEach(function (file) {
  if (file.match(/\.js$/) && file.match(/^core-/)) {
    let name = file.replace('.js', '');
    exports[name] = require('./modules/' + file);
  }
});

process.on('warning', (warning) => {
  console.warn('warning', warning.name); // Print the warning name
  console.warn('warning', warning.message); // Print the warning message
  console.warn('warning', warning.stack); // Print the stack trace
});

process.stdout.on('error', function (err) {
  if (err.code == "EPIPE") {
    console.error('EPIPE err:', err);
  }
});
/*
流程解釋

首先这里会call modules/中的Discord line Telegram 三个檔案
如果在Heroku 有输入它们各自的TOKEN 的话
服务就会各自启动

Discord line Telegram三套BOT 都会统一呼叫analytics.js
再由analytics.js 呼叫roll/ 中各个的骰檔

所以基本上,要增加骰组
參考/roll中的DEMO骰组就好

以上, 有不明可以在GITHUB问我

另外, 使用或參考其中代码的话, 请保持开源
感謝

*/