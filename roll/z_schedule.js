"use strict";
if (!process.env.mongoURL) {
  return;
}
const VIP = require("../modules/veryImportantPerson");
const checkMongodb = require("../modules/dbWatchdog.js");
const FUNCTION_AT_LIMIT = [5, 25, 50, 200, 200, 200, 200, 200];
const schema = require("../modules/schema");
const FUNCTION_CRON_LIMIT = [2, 15, 30, 45, 99, 99, 99, 99];
const moment = require("moment");
const agenda = require("../modules/schedule");
const CRON_REGEX =
  /^(\d\d)(\d\d)((?:-([1-9]?[1-9]|((mon|tues|wed(nes)?|thur(s)?|fri|sat(ur)?|sun)(day)?))){0,1})/i;
const VALID_DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const checkTools = require("../modules/check.js");

const gameName = function () {
  return "【定时发讯功能】.at /.cron  mins hours delete show";
};

const gameType = function () {
  return "funny:schedule:骰娘爱你哦💖";
};
const prefixs = function () {
  return [
    {
      first: /^\.at$|^\.cron$/i,
      second: null,
    },
  ];
};
const getHelpMessage = function () {
  return `【定时任务功能】
    两种模式
    【at】  指定一个时间
    如 20220604 1900  (年月日 时间)
    .at 5mins  (五分钟后)
    .at 5hours (五小时后)
    会发布指定一个信息
    可以掷骰 使用[[]]包着指令就可
    如.at 9mins [[CC 60]]

    【cron】 每天指定一个时间可以发布一个信息
    如 1230  2200 (24小时制)
    或 1230-2 2200-Sun
    可运行六个月, 然后会自动删除
    
    .cron 0831 每天八时三十一分 
    嚎叫吧!

    .cron 1921-2
    我将会每隔两天的晚上7时21分发一次信息

    .cron 1921-wed-mon
    我将会每个星期一和三发一次信息

    .cron 1921-2-wed-sun
    我将会每隔二天，如果是星期三或星期日就发一次信息

    .cron  1921 
    每天晚上七时二十一分掷 
    [[CC 80 幸运]]

    星期代码: Sun Mon Tue Wed thu fri Sat
    
    .cron / .at show 可以显示已新增的定时信息

    .cron / .at delete (序号) 可以删除指定的定时信息
    如 .at delete 1   请使用.at show 查询序号


    自定发讯者名字和图片(需要Webhook权限)
    
    示例
    .cron 2258 
    name=Sad
    link=https://cdn.midjourney.com/12db0d9b-1b9d-4707-a803-e06bfe9a8e3f/0_0.png
    wwwww
    [[2d3]]
    hello world
    `;
};
const initialize = function () {
  return "";
};

const rollDiceCommand = async function ({
  inputStr,
  mainMsg,
  groupid,
  userid,
  userrole,
  botname,
  //displayname,
  channelid,
  // displaynameDiscord,
  //membercount
}) {
  let rply = {
    default: "on",
    type: "text",
    text: "",
  };
  if (!differentPeformAt(botname)) {
    rply.text = "此功能只能在Discord, Telegram中使用";
    return rply;
  }
  switch (true) {
    case /^help$/i.test(mainMsg[1]) || !mainMsg[1]: {
      rply.text = this.getHelpMessage();
      rply.quotes = true;
      return rply;
    }
    case /^\.at+$/i.test(mainMsg[0]) && /^show$/i.test(mainMsg[1]): {
      if (!checkMongodb.isDbOnline()) return;
      if (!groupid) {
        rply.text = "此功能必须在社区中使用";
        return rply;
      }
      let check = {};
      if (botname == "Discord" && userrole < 3) {
        check = {
          name: differentPeformAt(botname),
          "data.channelid": channelid,
          "data.groupid": groupid,
        };
      } else
        check = {
          name: differentPeformAt(botname),
          "data.groupid": groupid,
        };
      const jobs = await agenda.agenda
        .jobs(check)
        .catch((error) =>
          console.error("agenda error: ", error.name, error.reson)
        );
      rply.text = showJobs(jobs);
      if (userrole == 3 && botname == "Discord") {
        rply.text = `\n本频道列表\n\n${rply.text}`;
        check = {
          name: differentPeformAt(botname),
          "data.groupid": groupid,
        };
        const jobs = await agenda.agenda
          .jobs(check)
          .catch((error) =>
            console.error("agenda error: ", error.name, error.reson)
          );
        rply.text = `本社区列表\n\n${showJobs(jobs)} \n\n${rply.text} `;
      }
      return rply;
    }
    case /^\.at+$/i.test(mainMsg[0]) && /^delete$/i.test(mainMsg[1]): {
      if (!checkMongodb.isDbOnline()) return;
      if (!groupid) {
        rply.text = "此功能必须在社区中使用";
        return rply;
      }
      if (!mainMsg[2] || !/\d+/i.test(mainMsg[2])) {
        rply.text = "移除定时讯息指令为 .at delete (序号) \n 如 .at delete 1";
        return rply;
      }
      let check = {};
      if (botname == "Discord" && userrole < 3) {
        check = {
          name: differentPeformAt(botname),
          "data.channelid": channelid,
          "data.groupid": groupid,
        };
      } else
        check = {
          name: differentPeformAt(botname),
          "data.groupid": groupid,
        };
      const jobs = await agenda.agenda
        .jobs(check)
        .catch((error) =>
          console.error("agenda error: ", error.name, error.reson)
        );
      try {
        let data = jobs[Number(mainMsg[2]) - 1];
        await jobs[Number(mainMsg[2]) - 1].remove();
        rply.text = `已刪除序号#${Number(mainMsg[2])} \n${
          data.attrs.data.replyText
        }`;
      } catch (e) {
        console.error(
          "Remove at Error removing job from collection. input: ",
          inputStr
        );
        rply.text = "找不到该序号, 请使用.at show重新检查";
        return rply;
      }
      return rply;
    }
    case /^\.at+$/i.test(mainMsg[0]): {
      if (!checkMongodb.isDbOnline()) return;
      if (!groupid) {
        rply.text = "此功能必须在社区中使用";
        return rply;
      }
      let lv = await VIP.viplevelCheckUser(userid);
      let gpLv = await VIP.viplevelCheckGroup(groupid);
      lv = gpLv > lv ? gpLv : lv;
      let limit = FUNCTION_AT_LIMIT[lv];
      let check = {
        name: differentPeformAt(botname),
        "data.groupid": groupid,
      };
      let checkGroupid = await schema.agendaAtHKTRPG
        .countDocuments(check)
        .catch((error) =>
          console.error(
            "schedule  #171 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      if (checkGroupid >= limit) {
        rply.text = ".at 整个社区上限" + limit + "个";
        return rply;
      }
      let roleName = getAndRemoveRoleNameAndLink(inputStr);
      inputStr = roleName.newText;

      let checkTime = checkAtTime(mainMsg[1], mainMsg[2]);
      if (!checkTime || checkTime.time == "Invalid Date") {
        rply.text = `输入出错\n ${this.getHelpMessage()}`;
        return rply;
      }
      let text = checkTime.threeColum
        ? inputStr.replace(/^\s?\S+\s+\S+\s+\S+\s+/, "")
        : inputStr.replace(/^\s?\S+\s+\S+\s+/, "");
      let date = checkTime.time;
      if (roleName.roleName || roleName.imageLink) {
        if (lv === 0) {
          rply.text = `.at里的角色发言功能只供Patreoner使用，请支持服务器运作，或自建Server`;
          return rply;
        }
        if (!roleName.roleName || !roleName.imageLink) {
          rply.text = `请完整设定名字和图片网址
                    格式为
                    .at 时间
                    name=名字
                    link=www.sample.com/sample.jpg
                    XXXXXX信息一堆`;
          return rply;
        }
      }

      let callBotname = differentPeformAt(botname);
      await agenda.agenda
        .schedule(date, callBotname, {
          imageLink: roleName.imageLink,
          roleName: roleName.roleName,
          replyText: text,
          channelid: channelid,
          quotes: true,
          groupid: groupid,
          botname: botname,
          userid: userid,
        })
        .catch((error) =>
          console.error("agenda error: ", error.name, error.reson)
        );
      rply.text = `已新增排定內容\n将于${date
        .toString()
        .replace(/:\d+\s.*/, "")}运行`;
      return rply;
    }
    case /^\.cron+$/i.test(mainMsg[0]) && /^show$/i.test(mainMsg[1]): {
      if (!checkMongodb.isDbOnline()) return;
      if (
        (rply.text = checkTools.permissionErrMsg({
          flag: checkTools.flag.ChkChannelManager,
          gid: groupid,
          role: userrole,
        }))
      ) {
        return rply;
      }

      let check = {};
      if (botname == "Discord" && userrole < 3) {
        check = {
          name: differentPeformCron(botname),
          "data.channelid": channelid,
          "data.groupid": groupid,
        };
      } else
        check = {
          name: differentPeformCron(botname),
          "data.groupid": groupid,
        };
      const jobs = await agenda.agenda
        .jobs(check)
        .catch((error) =>
          console.error("agenda error: ", error.name, error.reson)
        );
      rply.text = showCronJobs(jobs);
      if (userrole == 3 && botname == "Discord") {
        rply.text = `\n本频道列表\n\n${rply.text}`;
        check = {
          name: differentPeformCron(botname),
          "data.groupid": groupid,
        };
        const jobs = await agenda.agenda
          .jobs(check)
          .catch((error) =>
            console.error("agenda error: ", error.name, error.reson)
          );
        rply.text = `本社区列表\n\n${showCronJobs(jobs)} \n\n${rply.text} `;
      }
      return rply;
    }
    case /^\.cron$/i.test(mainMsg[0]) && /^delete$/i.test(mainMsg[1]): {
      if (
        (rply.text = checkTools.permissionErrMsg({
          flag: checkTools.flag.ChkChannelManager,
          gid: groupid,
          role: userrole,
        }))
      ) {
        return rply;
      }

      if (!mainMsg[2] || !/\d+/i.test(mainMsg[2])) {
        rply.text =
          "移除定时讯息指令为 .cron delete (序号) \n 如 .cron delete 1";
        return rply;
      }
      let check = {};
      if (botname == "Discord" && userrole < 3) {
        check = {
          name: differentPeformCron(botname),
          "data.channelid": channelid,
          "data.groupid": groupid,
        };
      } else
        check = {
          name: differentPeformCron(botname),
          "data.groupid": groupid,
        };
      const jobs = await agenda.agenda.jobs(check);
      try {
        let data = jobs[Number(mainMsg[2]) - 1];
        await jobs[Number(mainMsg[2]) - 1].remove();
        rply.text = `已刪除序号#${Number(mainMsg[2])} \n${
          data.attrs.data.replyText
        } `;
      } catch (e) {
        console.error(
          "Remove Cron Error removing job from collection, input: ",
          inputStr
        );
        rply.text = "找不到该序号, 请使用.cron show 重新检查";
        return rply;
      }
      return rply;
    }
    case /^\.cron+$/i.test(mainMsg[0]): {
      rply.text = checkTools.permissionErrMsg({
        flag: checkTools.flag.ChkChannelManager,
        gid: groupid,
        role: userrole,
      });
      if (!mainMsg[2]) rply.text += "未有內容";
      if (rply.text) return rply;

      let lv = await VIP.viplevelCheckUser(userid);
      let gpLv = await VIP.viplevelCheckGroup(groupid);
      lv = gpLv > lv ? gpLv : lv;
      let limit = FUNCTION_CRON_LIMIT[lv];
      let check = {
        name: differentPeformCron(botname),
        "data.groupid": groupid,
      };
      let checkGroupid = await schema.agendaAtHKTRPG
        .countDocuments(check)
        .catch((error) =>
          console.error(
            "schedule #278 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      if (checkGroupid >= limit) {
        rply.text = ".cron 整个社区上限" + limit + "个";
        return rply;
      }
      let roleName = getAndRemoveRoleNameAndLink(inputStr);
      inputStr = roleName.newText;

      let checkTime = checkCronTime(mainMsg[1]);
      if (!checkTime || !checkTime.min || !checkTime.hour) {
        rply.text = `输入出错\n ${this.getHelpMessage()} `;
        return rply;
      }
      if (roleName.roleName || roleName.imageLink) {
        if (lv === 0) {
          rply.text = `.cron里的角色发言功能只供Patreoner使用，请支持服务器运作，或自建Server`;
          return rply;
        }
        if (!roleName.roleName || !roleName.imageLink) {
          rply.text = `请完整设定名字和图片网址
                    格式为
                    .cron 时间
                    name=名字
                    link=www.sample.com/sample.jpg
                    XXXXXX信息一堆`;
          return rply;
        }
      }

      let text = inputStr.replace(/^\s?\S+\s+\S+\s+/, "");
      // "0 6 * * *"
      let date = `${checkTime.min} ${checkTime.hour} *${
        checkTime.days ? `/${checkTime.days}` : ""
      } * ${checkTime.weeks.length ? checkTime.weeks : "*"}`;

      let callBotname = differentPeformCron(botname);
      const job = agenda.agenda.create(callBotname, {
        imageLink: roleName.imageLink,
        roleName: roleName.roleName,
        replyText: text,
        channelid: channelid,
        quotes: true,
        groupid: groupid,
        botname: botname,
        userid: userid,
        createAt: new Date(Date.now()),
      });
      job.repeatEvery(date);

      try {
        await job.save();
      } catch (error) {
        console.error("schedule #301 Error saving job to collection");
      }

      rply.text = `已新增排定內容\n将于${
        checkTime.days ? `每隔${checkTime.days}天` : ""
      }  ${checkTime.weeks.length ? `每个星期的${checkTime.weeks}` : ""}${
        !checkTime.weeks && !checkTime.days ? `每天` : ""
      } ${checkTime.hour}:${checkTime.min} (24小时制)运行`;
      return rply;
    }
    default: {
      break;
    }
  }
};
function differentPeformAt(botname) {
  switch (botname) {
    case "Discord":
      return "scheduleAtMessageDiscord";

    case "Telegram":
      return "scheduleAtMessageTelegram";

    case "Whatsapp":
      return "scheduleAtMessageWhatsapp";

    default:
      break;
  }
}
function getAndRemoveRoleNameAndLink(input) {
  let roleName = input.match(/^name=(.*)\n/im)
    ? input.match(/^name=(.*)\n/im)[1]
    : null;
  let imageLink = input.match(/^link=(.*)\n/im)
    ? input.match(/^link=(.*)\n/im)[1]
    : null;
  return {
    newText: input.replace(/^link=.*\n/im, "").replace(/^name=.*\n/im, ""),
    roleName,
    imageLink,
  };
}

function differentPeformCron(botname) {
  switch (botname) {
    case "Discord":
      return "scheduleCronMessageDiscord";

    case "Telegram":
      return "scheduleCronMessageTelegram";

    case "Line":
      return "scheduleCronMessageLine";

    default:
      break;
  }
}
function checkAtTime(first, second) {
  //const date = new Date(2012, 11, 21, 5, 30, 0);
  //const date = new Date(Date.now() + 5000);
  //   如 20220604 1900 < 年月日 时间
  //5mins  (五分钟后)
  //5hours (五小时后)
  switch (true) {
    case /^\d+mins$/i.test(first): {
      let time = first.match(/^(\d+)mins$/i)[1];
      if (time > 44640) time = 44640;
      if (time < 1) time = 1;
      time = moment().add(time, "minute").toDate();
      return { time: time, threeColum: false };
    }
    case /^\d+hours$/i.test(first): {
      let time = first.match(/^(\d+)hours$/i)[1];
      if (time > 744) time = 744;
      if (time < 1) time = 1;
      time = moment().add(time, "hour").toDate();
      return { time: time, threeColum: false };
    }
    case /^\d+days$/i.test(first): {
      let time = first.match(/^(\d+)days$/i)[1];
      if (time > 31) time = 31;
      if (time < 1) time = 1;
      time = moment().add(time, "day").toDate();
      return { time: time, threeColum: false };
    }
    case /^\d{8}$/i.test(first) && /^\d{4}$/i.test(second): {
      let time = moment(`${first} ${second}`, "YYYYMMDD hhmm").toDate();
      return { time: time, threeColum: true };
    }
    default:
      break;
  }
}
function checkCronTime(text) {
  //const date = {hour: 14, minute: 30}
  //@{text} - 1133  / 1155-wed / 1125-(1-99)
  let hour = text.match(CRON_REGEX) && text.match(CRON_REGEX)[1];
  let min = text.match(CRON_REGEX) && text.match(CRON_REGEX)[2];
  let days =
    (text.match(CRON_REGEX) &&
      !text.match(CRON_REGEX)[6] &&
      text.match(CRON_REGEX)[4]) ||
    null;
  //let weeks = text.match(CRON_REGEX) && text.match(CRON_REGEX)[6] || null;
  let weeks = [];
  if (hour == 24) {
    hour = "00";
  }
  if (min == 60) {
    min = "00";
  }
  for (let index = 0; index < VALID_DAYS.length; index++) {
    text.toLowerCase().indexOf(VALID_DAYS[index]) >= 0
      ? weeks.push(index)
      : null;
  }

  if (min >= 0 && min <= 60 && hour >= 0 && hour <= 24)
    return { min, hour, days, weeks };
  else return;
}

function showJobs(jobs) {
  let reply = "";
  if (jobs && jobs.length > 0) {
    for (let index = 0; index < jobs.length; index++) {
      let job = jobs[index];
      reply += `序号#${index + 1} 下次运行时间 ${job.attrs.nextRunAt
        .toString()
        .replace(/:\d+\s.*/, "")}\n${job.attrs.data.replyText}\n`;
    }
  } else reply = "没有找到定时任务";
  return reply;
}
function showCronJobs(jobs) {
  let reply = "";
  if (jobs && jobs.length > 0) {
    for (let index = 0; index < jobs.length; index++) {
      let job = jobs[index];
      let createAt = job.attrs.data.createAt;
      let time = job.attrs.repeatInterval.match(/^(\d+) (\d+)/);
      reply += `序号#${index + 1} 创建时间 ${createAt
        .toString()
        .replace(/:\d+\s.*/, "")}\n每天运行时间 ${
        (time && time[2]) || "error"
      } ${(time && time[1]) || "error"}\n${job.attrs.data.replyText}\n`;
    }
  } else reply = "没有找到定时任务";
  return reply;
}

module.exports = {
  rollDiceCommand: rollDiceCommand,
  initialize: initialize,
  getHelpMessage: getHelpMessage,
  prefixs: prefixs,
  gameType: gameType,
  gameName: gameName,
};
