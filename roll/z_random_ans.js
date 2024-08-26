"use strict";
if (!process.env.mongoURL) {
  return;
}
const checkMongodb = require("../modules/dbWatchdog.js");
const adminSecret = process.env.ADMIN_SECRET;
const rollbase = require("./rollbase.js");
const schema = require("../modules/schema.js");
const checkTools = require("../modules/check.js");
exports.z_Level_system = require("./z_Level_system");
const opt = {
  upsert: true,
  runValidators: true,
};

const VIP = require("../modules/veryImportantPerson");
const FUNCTION_LIMIT = [30, 200, 200, 500, 500, 500, 500, 500];
const FUNCTION_LIMIT_PERSONAL = [2, 200, 200, 500, 500, 500, 500, 500];
const gameName = function () {
  return "【自定义骰子/回应功能】 .ra(p)(s)(次数) (add del show 自定骰子名称)";
};
const gameType = function () {
  return "funny:randomAns:hktrpg";
};
const prefixs = function () {
  return [
    {
      first: /(^[.](r|)ra(\d+|p|p\d+|s|s\d+|)$)/gi,
      second: null,
    },
  ];
};
const getHelpMessage = async function () {
  return `【自定义骰子/回应功能】
这是根据骰子名称来随机抽选功能,只要符合内容,以后就会随机掷骰

输入.ra add (骰子名称) (选项1) (选项2) (选项3)即可增加骰子
重复输入，可以增加选项，总共上限3000字

输入.ra show 显示所有骰子名称及编号
输入.ra show (骰子名称)显示内容
输入.ra del (骰子名称) 即可删除
输入.ra(次数,最多30次) (骰子名称1/编号)(骰子名称2)(骰子名称n) 即可不重复随机抽选 
输入.rra(次数,最多30次) (骰子名称1/编号)(骰子名称2)...(骰子名称n) 即可重复随机抽选

如使用.ra  是社区版, 供整个社区共用 
如使用.ras 是公开版, 在整个HKTRPG可以看到 
如使用.rap 是个人专用版, 只有自己可以使用 

例如输入 .ras10 圣晶石召唤 即可十连抽了 

例如输入 .ra add 九大阵营 守序善良 (...太长省略) 中立邪恶 混乱邪恶 
再输入.ra 九大阵营  就会输出 九大阵营中其中一个
如果输入.ra3 九大阵营  就会输出 3次九大阵营
如果输入.ra3 九大阵营 天干 地支 就会输出 3次九大阵营 天干 地支
如果输入.rra3 九大阵营 就会输出3次有可能重复的九大阵营
add 后面第一个是骰子名称, 可以是汉字,数字和英文或emoji

骰子名称可用数字代替, 如编号5,可以轮入 .ra 5

新增指令 - 输入.ras newType 可以观看效果
* {br}          <--隔一行
* {ran:100}     <---随机1-100
* {random:5-20} <---随机5-20
* {server.member_count}  <---现在频道中总人数 
* {my.name}     <---显示掷骰者名字

以下需要开启.level 功能
* {allgp.name}  <---随机全GP其中一人名字
* {allgp.title}  <---随机全GP其中一种称号
* {my.RankingPer}  <---现在排名百分比 
* {my.Ranking}  <---显示掷骰者现在排名 
* {my.exp}      <---显示掷骰者经验值
* {my.title}    <---显示掷骰者称号
* {my.level}    <---显示掷骰者等级
`;
};
const initialize = function () {
  return;
};
/**
 * {ran:100} <---随机1-100
 * {random:5-20} <---随机5-20
 * {allgp.name} <---随机全GP其中一人名字
 * {allgp.title}<---随机全GP其中一人称号
 * {server.member_count}<---现在频道中总人数 \
 * {my.RankingPer}<---现在排名百分比 \
 * {my.Ranking}<---显示掷骰者现在排名 \
 * {my.exp}<---显示掷骰者经验值
 * {my.name} <---显示掷骰者名字
 * {my.title}<---显示掷骰者称号
 * {my.level}<---显示掷骰者等级
 */
const rollDiceCommand = async function ({
  mainMsg,
  groupid,
  userrole,
  userid,
  displayname,
  displaynameDiscord,
  membercount,
}) {
  let rply = {
    default: "on",
    type: "text",
    text: "",
  };
  let times = [];
  let lv;
  let limit = FUNCTION_LIMIT[0];
  let getData;
  let check;
  let temp;
  let filter;
  if (!checkMongodb.isDbOnline()) return;
  switch (true) {
    case /^help$/i.test(mainMsg[1]) || !mainMsg[1]:
      rply.text = await this.getHelpMessage();
      rply.quotes = true;
      return rply;
    case /(^[.](r|)ra(\d+|)$)/i.test(mainMsg[0]) &&
      /^add$/i.test(mainMsg[1]) &&
      /^(?!(add|del|show)$)/gi.test(mainMsg[2]): {
      try {
        //
        //增加自定义关鍵字
        // .ra[0] add[1] 标题[2] 随机1[3] 随机2[4]
        /*
                只限四张角色卡.
                使用VIPCHECK
                */
        lv = await VIP.viplevelCheckGroup(groupid);
        limit = FUNCTION_LIMIT[lv];
        if (!mainMsg[2]) rply.text += " 没有输入骰子名称.";
        if (!mainMsg[3]) rply.text += " 没有输入骰子內容.";
        if (
          (rply.text += checkTools.permissionErrMsg({
            flag: checkTools.flag.ChkChannelManager,
            gid: groupid,
            role: userrole,
          }))
        ) {
          return rply;
        }

        getData = await schema.randomAns
          .findOne({ groupid: groupid })
          .catch((error) =>
            console.error(
              "randomans #137 mongoDB error: ",
              error.name,
              error.reson
            )
          );
        let update = false;
        let findIndex =
          getData &&
          getData.randomAnsfunction.findIndex((e) => {
            return e && e[0] && e[0].toLowerCase() == mainMsg[2].toLowerCase();
          });
        if (findIndex >= 0 && findIndex != null) {
          let tempCheck =
            getData.randomAnsfunction[findIndex].join("") +
            mainMsg.slice(3).join("");
          if (tempCheck.length > 3000) {
            rply.text = "更新失败. 总內容不得超过3000字";
            return rply;
          } else {
            update = true;
            getData.randomAnsfunction.set(findIndex, [
              ...getData.randomAnsfunction[findIndex],
              ...mainMsg.slice(3),
            ]);
          }
        }
        if (update) {
          await getData.save();
          rply.text = `更新成功\n输入.ra ${mainMsg[2]} \n即可使用`;
          return rply;
        }
        if (getData && getData.randomAnsfunction.length >= limit) {
          rply.text =
            "社区骰子上限" +
            limit +
            "个";
          return rply;
        }
        temp = {
          randomAnsfunction: mainMsg.slice(2),
        };
        check = await schema.randomAns
          .updateOne(
            {
              groupid: groupid,
            },
            {
              $push: temp,
              new: true,
            },
            opt
          )
          .catch((error) =>
            console.error(
              "randomans #168 mongoDB error: ",
              error.name,
              error.reson
            )
          );
        if (check.modifiedCount || check.upsertedCount) {
          rply.text = `新增成功: \n输入 .ra ${mainMsg[2]}  \n即可使用\n再输入.ra add ${mainMsg[2]} 可以添加內容`;
        } else rply.text = "新增失败";

        return rply;
      } catch (error) {
        console.error(error);
      }
    }
    case /(^[.](r|)ra(\d+|)$)/i.test(mainMsg[0]) && /^del$/i.test(mainMsg[1]):
      //
      //刪除自定义关鍵字
      //
      if (!mainMsg[2]) rply.text += "没有骰子名称. ";
      if (
        (rply.text += checkTools.permissionErrMsg({
          flag: checkTools.flag.ChkChannelManager,
          gid: groupid,
          role: userrole,
        }))
      ) {
        return rply;
      }

      filter = {
        groupid: groupid,
      };
      getData = await schema.randomAns
        .findOne(filter)
        .catch((error) =>
          console.error(
            "randomans #189 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      if (!getData) {
        rply.text += "没有此骰子. ";
        return rply;
      }
      temp = getData.randomAnsfunction.filter(
        (e) => e[0].toLowerCase() === mainMsg[2].toLowerCase()
      );
      if (temp.length == 0) {
        rply.text +=
          "没有此骰子. \n现在已更新刪除方式, 刪除请输入 .ra del 名字";
        return rply;
      }
      temp.forEach((f) =>
        getData.randomAnsfunction.splice(
          getData.randomAnsfunction.findIndex((e) => e[0] === f[0]),
          1
        )
      );
      check = await getData.save();
      if (check) {
        rply.text += "刪除成功\n" + temp;
      }
      return rply;
    case /(^[.](r|)ra(\d+|)$)/i.test(mainMsg[0]) && /^show$/i.test(mainMsg[1]):
      //
      //显示列表
      //
      if (!groupid) {
        rply.text += "此功能必须在社区中使用. ";
        return rply;
      }
      rply.quotes = true;
      getData = await schema.randomAns
        .findOne({ groupid: groupid })
        .catch((error) =>
          console.error(
            "randomans #214 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      if (!getData || getData.randomAnsfunction.length == 0) {
        rply.text =
          "没有已设定的骰子.\n本功能已改版，\n.rap 转成个人专用的骰组，\n原全服社区(.rap)变成.ras\n .ra => random answer (group) \n.rap => random answer personal \n .ras => random answer server";
        return rply;
      }
      if (mainMsg[2]) {
        temp = getData.randomAnsfunction.find(
          (e) => e[0].toLowerCase() == mainMsg[2].toLowerCase()
        );
        for (let i in temp) {
          rply.text += i == 0 ? "社区自定义骰子 " + temp[i] + "\n" : "";
          rply.text +=
            i % 2 && i != 1 && i !== 0
              ? "\n" + i + ": " + temp[i] + "        "
              : i == 0
              ? ""
              : i + ": " + temp[i] + "        ";
        }
      }
      if (rply.text) {
        return rply;
      }
      rply.text += "社区自定义骰子列表:";
      for (let a in getData.randomAnsfunction) {
        rply.text +=
          (a % 2 && a != 1) || a == 0
            ? "\n" + a + ": " + getData.randomAnsfunction[a][0]
            : "     " + a + ": " + getData.randomAnsfunction[a][0];
      }
      //显示自定义关鍵字
      rply.text = rply.text
        .replace(/^([^(,)\1]*?)\s*(,)\s*/gm, "$1: ")
        .replace(/,/gm, ", ");
      rply.text +=
        "\n\n在.ra show 后面输入骰子名称, 可以显示详细內容\n输入 .ra (列表序号或骰子名称) 可以进行随机掷骰";
      return rply;
    case /(^[.](r|)ra(\d+|)$)/i.test(mainMsg[0]) &&
      /\S/i.test(mainMsg[1]) &&
      /^(?!(add|del|show)$)/gi.test(mainMsg[1]):
      //
      //RA使用抽选功能
      //
      if (!groupid) {
        rply.text = "此功能必须在社区中使用. ";
      }
      times = /^[.](r|)ra(\d+|)/i.exec(mainMsg[0])[2] || 1;
      check = /^[.](r|)ra(\d+|)/i.exec(mainMsg[0])[1] || "";
      if (times > 30) times = 30;
      if (times < 1) times = 1;
      getData = await schema.randomAns
        .findOne({ groupid: groupid })
        .catch((error) =>
          console.error(
            "randomans #248 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      if (!getData) return;
      for (let i in mainMsg) {
        if (i == 0) continue;
        temp = getData.randomAnsfunction.find(
          (e) => e[0].toLowerCase() == mainMsg[i].toLowerCase()
        );
        if (!temp && mainMsg[i].match(/^\d+$/)) {
          temp = getData.randomAnsfunction[mainMsg[i]];
        }
        if (!temp) continue;
        if (check) {
          //repeat mode
          rply.text += temp[0] + " → ";
          for (let num = 0; num < times; num++) {
            let randomNumber = rollbase.Dice(temp.length) - 1;
            rply.text +=
              num == 0 ? temp[randomNumber] : ", " + temp[randomNumber];
            rply.text += num == times - 1 ? "\n" : "";
          }
        } else {
          //not repeat mode
          rply.text += temp[0] + " → ";
          let items = [];
          let tempItems = [...temp];
          tempItems.splice(0, 1);
          if (tempItems.length === 0) continue;
          while (items.length < times) {
            items = tempItems
              .map((a) => ({
                sort: Math.random(),
                value: a,
              }))
              .sort((a, b) => a.sort - b.sort)
              .map((a) => a.value)
              .concat(items);
          }
          for (let num = 0; num < times; num++) {
            rply.text += num == 0 ? items[num] : ", " + items[num];
            rply.text += num == times - 1 ? "\n" : "";
          }
        }
      }
      rply.text = await replaceAsync(rply.text, /{(.*?)}/gi, replacer);
      return rply;

    case /(^[.](r|)rap(\d+|)$)/i.test(mainMsg[0]) &&
      /^add$/i.test(mainMsg[1]) &&
      /^(?!(add|del|show)$)/gi.test(mainMsg[2]): {
      //
      //增加自定义关鍵字
      // .rap[0] add[1] 标题[2] 随机1[3] 随机2[4]
      lv = await VIP.viplevelCheckUser(userid);
      limit = FUNCTION_LIMIT_PERSONAL[lv];
      if (!mainMsg[2]) rply.text += " 没有输入骰子名称.";
      if (!mainMsg[3]) rply.text += " 没有输入骰子內容.";
      if (!userid) rply.text += " 此功能必须使用聊天软件，在个人身份中使用.";
      if (rply.text) {
        rply.text = "新增失败.\n" + rply.text;
        return rply;
      }
      getData = await schema.randomAnsPersonal
        .findOne({
          title: {
            $regex: new RegExp("^" + escapeRegExp(mainMsg[2]) + "$", "i"),
          },
          userid: userid,
        })
        .catch((error) =>
          console.error(
            "randomans #306 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      const [, , , ...rest] = mainMsg;
      const answerLength = getData && getData.answer.join("").length;

      if (getData && answerLength + rest.length > 2000) {
        rply.text = "更新失败. 总內容不得超过2000字";
        return rply;
      }
      if (getData && getData.answer) {
        getData.answer.push.apply(getData.answer, rest);
        let result = await getData.save({ new: true });
        rply.text = `更新成功  \n序号: ${result.serial}\n标题: ${result.title}\n內容: ${result.answer}\n\n输入 .rap ${result.title}\n或 .rap ${result.serial} \n即可使用`;
        return rply;
      }

      let list = await schema.randomAnsPersonal
        .find({ userid: userid }, "serial")
        .catch((error) =>
          console.error(
            "randomans #321 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      if (list && list.length >= limit) {
        rply.text =
          "个人骰子上限" +
          limit +
          "个";
        return rply;
      }
      let newAnswer = new schema.randomAnsPersonal({
        title: mainMsg[2],
        answer: rest,
        userid: userid,
        serial: findTheNextSerial(list),
      });
      try {
        let checkResult = await newAnswer.save();
        rply.text = `新增成功  \n序号: ${checkResult.serial}\n标题: ${checkResult.title}\n內容: ${checkResult.answer}\n\n输入 .rap ${checkResult.title}\n或 .rap ${checkResult.serial} \n再输入.rap add ${mainMsg[2]} 可以添加內容`;
      } catch (error) {
        rply.text = "新增失败, 请稍后再试";
        console.error(
          "randomans #331 mongoDB error: ",
          error.name,
          error.reson
        );
      }
      return rply;
    }
    case /(^[.](r|)rap(\d+|)$)/i.test(mainMsg[0]) && /^show$/i.test(mainMsg[1]):
      //
      //显示列表
      //
      rply.quotes = true;
      if (mainMsg[2]) {
        temp = await schema.randomAnsPersonal
          .findOne({
            title: {
              $regex: new RegExp("^" + escapeRegExp(mainMsg[2]) + "$", "i"),
            },
            userid: userid,
          })
          .catch((error) =>
            console.error(
              "randomans #346 mongoDB error: ",
              error.name,
              error.reson
            )
          );
        if (!temp) {
          rply.text = "找不到该骰子名称, 请重新检查";
          return rply;
        }
        rply.text += `自定义骰子  \n标题: ${temp.title} \n`;
        let tempanswer = temp.answer;
        for (let i in tempanswer) {
          rply.text += i == 0 ? "#" + i + ": " + tempanswer[i] + "\n" : "";
          rply.text +=
            i % 2 && i != 1 && i !== 0
              ? "\n" + "#" + i + ": " + tempanswer[i] + "        "
              : i == 0
              ? ""
              : "#" + i + ": " + tempanswer[i] + "        ";
        }
        return rply;
      }
      getData = await schema.randomAnsPersonal
        .find({ userid: userid })
        .catch((error) =>
          console.error(
            "randomans #359 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      if (!getData || getData.length == 0) {
        rply.text =
          "没有已设定的骰子.\n本功能已改版，\n.rap 转成个人专用的骰组，\n原全服社区(.rap)变成.ras\n .ra => random answer (group) \n.rap => random answer personal \n .ras => random answer server";
        return rply;
      }
      rply.text += "个人自定义骰子列表";
      for (let a in getData) {
        rply.text +=
          (a % 2 && a != 1) || a == 0
            ? "\n" + "#" + getData[a].serial + ": " + getData[a].title
            : "     " + "#" + getData[a].serial + ": " + getData[a].title;
      }
      //显示自定义关鍵字
      rply.text = rply.text
        .replace(/^([^(,)\1]*?)\s*(,)\s*/gm, "$1: ")
        .replace(/,/gm, ", ");
      rply.text +=
        "\n\n在.rap show 后面输入骰子名称, 可以显示详细內容\n\n输入 .rap (列表序号或骰子名称) 可以进行随机掷骰";
      return rply;

    case /(^[.]rap$)/i.test(mainMsg[0]) && /^del$/i.test(mainMsg[1]): {
      const [, , ...target] = escapeRegExp(mainMsg);
      let dataList = await schema.randomAnsPersonal
        .deleteMany({
          title: { $regex: new RegExp("^(" + target.join("|") + ")$", "i") },
          userid: userid,
        })
        .catch((error) =>
          console.error(
            "randomans #378 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      rply.text = dataList.n + " 项已已刪除";
      return rply;
    }
    case /(^[.](r|)rap(\d+|)$)/i.test(mainMsg[0]) &&
      /\S/i.test(mainMsg[0]) &&
      /^(?!(add|del|show)$)/gi.test(mainMsg[1]): {
      //
      //rap使用抽选功能
      //
      times = /^[.](r|)rap(\d+|)/i.exec(mainMsg[0])[2] || 1;
      let repeat = /^[.](r|)rap(\d+|)/i.exec(mainMsg[0])[1] || "";
      if (times > 30) times = 30;
      if (times < 1) times = 1;
      const [, ...target] = escapeRegExp(mainMsg);
      getData = await schema.randomAnsPersonal
        .find({
          userid: userid,
          $or: [
            { title: { $regex: new RegExp(`^(${target.join("|")})$`, "i") } },
            { serial: isNumber(target) },
          ],
        })
        .catch((error) =>
          console.error(
            "randomans #398 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      if (!getData || getData.length == 0) {
        rply.text =
          "没有这骰子, 请重新再试.\n本功能已改版，\n.rap 转成个人专用的骰组，\n原全服社区(.rap)变成.ras\n .ra => random answer (group) \n.rap => random answer personal \n .ras => random answer server";
        return rply;
      }
      for (let index = 0; index < getData.length; index++) {
        let temp = getData[index];
        if (repeat) {
          //repeat mode
          rply.text += temp.title + " → ";
          for (let num = 0; num < times; num++) {
            let randomNumber = rollbase.Dice(temp.answer.length) - 1;
            rply.text +=
              num == 0
                ? temp.answer[randomNumber]
                : ", " + temp.answer[randomNumber];
            rply.text += num == times - 1 ? "\n" : "";
          }
        } else {
          //not repeat mode
          rply.text += temp.title + " → ";
          let items = [];
          let tempItems = [...temp.answer];
          if (tempItems.length === 0) continue;
          while (items.length < times) {
            items = tempItems
              .map((a) => ({
                sort: Math.random(),
                value: a,
              }))
              .sort((a, b) => a.sort - b.sort)
              .map((a) => a.value)
              .concat(items);
          }
          for (let num = 0; num < times; num++) {
            rply.text += num == 0 ? items[num] : ", " + items[num];
            rply.text += num == times - 1 ? "\n" : "";
          }
        }
      }
      rply.text = await replaceAsync(rply.text, /{(.*?)}/gi, replacer);
      return rply;
    }

    case /(^[.](r|)ras(\d+|)$)/i.test(mainMsg[0]) &&
      /^add$/i.test(mainMsg[1]) &&
      /^(?!(add|del|show)$)/gi.test(mainMsg[2]): {
      //
      //增加自定义关鍵字
      // .ras[0] add[1] 标题[2] 随机1[3] 随机2[4]
      if (!mainMsg[2]) rply.text += " 没有输入骰子名称.";
      if (!mainMsg[3]) rply.text += " 没有输入骰子內容.";
      if (!mainMsg[4]) rply.text += " 没有自定义骰子回应內容,至少两个.";
      if (rply.text) {
        rply.text = "新增失败.\n" + rply.text;
        return rply;
      }
      getData = await schema.randomAnsServer
        .findOne({
          title: {
            $regex: new RegExp("^" + escapeRegExp(mainMsg[2]) + "$", "i"),
          },
        })
        .catch((error) =>
          console.error(
            "randomans #451 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      if (getData) {
        rply.text = "新增失败. 和现存的骰子重复了名称";
        return rply;
      }

      const [, , , ...rest] = mainMsg;
      let list = await schema.randomAnsServer.find({}, "serial");
      let newAnswer = new schema.randomAnsServer({
        title: mainMsg[2],
        answer: rest,
        serial: findTheNextSerial(list),
      });
      if (list && list.length >= 100) {
        rply.text = "公用骰子上限" + limit + "个";
        return rply;
      }
      try {
        let checkResult = await newAnswer.save();
        rply.text = `新增成功  \n序号: ${checkResult.serial}\n标题: ${checkResult.title}\n內容: ${checkResult.answer}\n\n输入 .ras ${checkResult.title}\n或 .ras ${checkResult.serial} \n即可使用`;
      } catch (error) {
        rply.text = "新增失败";
        console.error(
          "randomans #463 mongoDB error: ",
          error.name,
          error.reson
        );
      }
      return rply;
    }
    case /(^[.](r|)ras(\d+|)$)/i.test(mainMsg[0]) && /^show$/i.test(mainMsg[1]):
      //
      //显示列表
      //
      rply.quotes = true;
      if (mainMsg[2]) {
        temp = await schema.randomAnsServer
          .findOne({
            title: {
              $regex: new RegExp("^" + escapeRegExp(mainMsg[2]) + "$", "i"),
            },
          })
          .catch((error) =>
            console.error(
              "randomans #482 mongoDB error: ",
              error.name,
              error.reson
            )
          );
        if (!temp) {
          rply.text = "找不到这骰子名称, 请重新检查";
          return rply;
        }
        rply.text += `自定义骰子  \n标题: ${temp.title} \n`;
        let tempanswer = temp.answer;
        for (let i in tempanswer) {
          rply.text += i == 0 ? "#" + i + ": " + tempanswer[i] + "\n" : "";
          rply.text +=
            i % 2 && i != 1 && i !== 0
              ? "\n" + "#" + i + ": " + tempanswer[i] + "        "
              : i == 0
              ? ""
              : "#" + i + ": " + tempanswer[i] + "        ";
        }
        return rply;
      }
      getData = await schema.randomAnsServer
        .find({})
        .catch((error) =>
          console.error(
            "randomans #495 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      if (!getData || getData.length == 0) {
        rply.text =
          "没有已设定的骰子.\n本功能已改版，\n.rap 转成个人专用的骰组，\n原全服社区(.rap)变成.ras\n .ra => random answer (group) \n.rap => random answer personal \n .ras => random answer server";
        return rply;
      }
      rply.text += "全自定义骰子列表";
      for (let a in getData) {
        rply.text +=
          (a % 2 && a != 1) || a == 0
            ? "\n" + "#" + getData[a].serial + ": " + getData[a].title
            : "     " + "#" + getData[a].serial + ": " + getData[a].title;
      }
      //显示自定义关鍵字
      rply.text = rply.text
        .replace(/^([^(,)\1]*?)\s*(,)\s*/gm, "$1: ")
        .replace(/,/gm, ", ");
      rply.text +=
        "\n\n在.ras show 后面输入骰子名称, 可以显示详细內容\n输入 .ras (列表序号或骰子名称) 可以进行随机掷骰";
      return rply;
    case /(^[.](r|)ras(\d+|)$)/i.test(mainMsg[0]) &&
      /^(change)$/i.test(mainMsg[1]): {
      if (!adminSecret) return rply;
      if (userid !== adminSecret) return rply;
      let allData = await schema.randomAnsAllgroup
        .findOne({})
        .catch((error) =>
          console.error(
            "randomans #512 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      let dataList = allData.randomAnsAllgroup;

      for (let index = 0; index < dataList.length; index++) {
        //randomAnsServer
        const [, ...rest] = dataList[index];
        let newAnswer = new schema.randomAnsServer({
          title: dataList[index][0],
          answer: rest,
          serial: index + 1,
        });
        await newAnswer
          .save()
          .catch((error) =>
            console.error(
              "randomans #523 mongoDB error: ",
              error.name,
              error.reson
            )
          );
      }
      rply.text = dataList.length + " Done";
      return rply;
    }
    case /(^[.]ras$)/i.test(mainMsg[0]) && /^(delete)$/i.test(mainMsg[1]): {
      if (!adminSecret) return rply;
      if (userid !== adminSecret) return rply;
      const [, , ...target] = mainMsg;
      let dataList = await schema.randomAnsServer
        .deleteMany({
          serial: isNumber(target),
        })
        .catch((error) =>
          console.error(
            "randomans #538 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      rply.text = dataList.n + " Done";
      return rply;
    }
    case /(^[.](r|)ras(\d+|)$)/i.test(mainMsg[0]) &&
      /\S/i.test(mainMsg[0]) &&
      /^(?!(add|del|show)$)/gi.test(mainMsg[1]): {
      //
      //ras使用抽选功能
      //
      times = /^[.](r|)ras(\d+|)/i.exec(mainMsg[0])[2] || 1;
      let repeat = /^[.](r|)ras(\d+|)/i.exec(mainMsg[0])[1] || "";
      if (times > 30) times = 30;
      if (times < 1) times = 1;
      const [, ...target] = escapeRegExp(mainMsg);
      getData = await schema.randomAnsServer
        .find({
          $or: [
            { title: { $regex: new RegExp(`^(${target.join("|")})$`, "i") } },
            { serial: isNumber(target) },
          ],
        })
        .catch((error) =>
          console.error(
            "randomans #557 mongoDB error: ",
            error.name,
            error.reson
          )
        );
      if (!getData || getData.length == 0) {
        rply.text =
          "没有这骰子名称, 请重新再试.\n本功能已改版，\n.rap 转成个人专用的骰组，\n原全服社区(.rap)变成.ras\n .ra => random answer (group) \n.rap => random answer personal \n .ras => random answer server";
        return rply;
      }
      for (let index = 0; index < getData.length; index++) {
        let temp = getData[index];
        if (repeat) {
          //repeat mode
          rply.text += temp.title + " → ";
          for (let num = 0; num < times; num++) {
            let randomNumber = rollbase.Dice(temp.answer.length) - 1;
            rply.text +=
              num == 0
                ? temp.answer[randomNumber]
                : ", " + temp.answer[randomNumber];
            rply.text += num == times - 1 ? "\n" : "";
          }
        } else {
          //not repeat mode
          rply.text += temp.title + " → ";
          let items = [];
          let tempItems = [...temp.answer];
          if (tempItems.length === 0) continue;
          while (items.length < times) {
            items = tempItems
              .map((a) => ({
                sort: Math.random(),
                value: a,
              }))
              .sort((a, b) => a.sort - b.sort)
              .map((a) => a.value)
              .concat(items);
          }
          for (let num = 0; num < times; num++) {
            rply.text += num == 0 ? items[num] : ", " + items[num];
            rply.text += num == times - 1 ? "\n" : "";
          }
        }
      }
      rply.text = await replaceAsync(rply.text, /{(.*?)}/gi, replacer);
      return rply;
    }
    default:
      break;
  }

  async function replacer(first, second) {
    let temp = "",
      num = 0,
      temp2 = "";
    switch (true) {
      case /^ran:\d+/i.test(second):
        temp = /^ran:(\d+)/i.exec(second);
        if (!temp || !temp[1]) return " ";
        return rollbase.Dice(temp[1]) || " ";
      case /^random:\d+/i.test(second):
        temp = /^random:(\d+)-(\d+)/i.exec(second);
        if (!temp || !temp[1] || !temp[2]) return " ";
        return rollbase.DiceINT(temp[1], temp[2]) || " ";
      case /^allgp.name$/i.test(second):
        temp = await findGpMember(groupid);
        if (!temp) return " ";
        num = rollbase.DiceINT(0, temp.length - 1);
        num = num < 1 ? 0 : num;
        temp = temp && temp[num] && temp[num].name ? temp[num].name : " ";
        return temp || " ";
      // * {allgp.name} <---随机全GP其中一人名字
      case /^allgp.title$/i.test(second):
        temp = await findGp(
          groupid,
          userid,
          displayname,
          displaynameDiscord,
          membercount
        );
        if (!temp) return " ";
        if (temp.Title.length == 0) {
          temp.Title = exports.z_Level_system.Title();
        }
        temp2 = await temp.Title.filter(function (item) {
          return item;
        });
        num = rollbase.DiceINT(0, temp2.length - 1);
        num = num < 1 ? 0 : num;
        temp = temp2 && temp2[num] ? temp2[num] : " ";
        return temp;
      // * {allgp.title}<---随机全GP其中一种称号
      case /^server.member_count$/i.test(second):
        temp = await findGpMember(groupid);
        num =
          temp && temp.length
            ? Math.max(membercount, temp.length)
            : membercount;
        return num || " ";
      //  {server.member_count} 现在频道中总人数 \
      case /^my.RankingPer$/i.test(second): {
        //* {my.RankingPer} 现在排名百分比 \
        // let userRankingPer = Math.ceil(userRanking / usermember_count * 10000) / 100 + '%';
        let gpMember = await findGpMember(groupid);
        temp2 = await ranking(userid, gpMember);
        if (!temp2) return " ";
        num =
          temp && gpMember.length
            ? Math.max(membercount, gpMember.length)
            : membercount;
        temp2 = Math.ceil((temp2 / num) * 10000) / 100 + "%";
        return temp2 || " ";
      }
      case /^my.Ranking$/i.test(second): {
        let gpMember = await findGpMember(groupid);
        //* {my.Ranking} 显示掷骰者现在排名 \
        if (!gpMember) return " ";
        return (await ranking(userid, gpMember)) || " ";
      }
      case /^my.exp$/i.test(second):
        //* {my.exp} 显示掷骰者经验值
        temp = await findGp(
          groupid,
          userid,
          displayname,
          displaynameDiscord,
          membercount
        );
        temp2 = await findUser(groupid, userid);
        if (!temp || !temp2 || !temp2.EXP) return " ";
        return temp2.EXP || " ";
      case /^my.name$/i.test(second):
        //* {my.name} <---显示掷骰者名字
        return displaynameDiscord || displayname || "无名";
      case /^my.title$/i.test(second):
        // * {my.title}<---显示掷骰者称号
        temp = await findGp(
          groupid,
          userid,
          displayname,
          displaynameDiscord,
          membercount
        );
        temp2 = await findUser(groupid, userid);
        if (!temp || !temp2 || !temp2.Level || !temp.Title) return " ";
        //   let userTitle = await this.checkTitle(userlevel, trpgLevelSystemfunction.trpgLevelSystemfunction[i].Title);
        return (
          (await exports.z_Level_system.checkTitle(temp2.Level, temp.Title)) ||
          " "
        );
      case /^my.level$/i.test(second):
        //* {my.level}<---显示掷骰者等级
        temp2 = await findUser(groupid, userid);
        if (!temp2 || !temp2.Level) return " ";
        return temp2.Level || " ";
      case /^br$/i.test(second):
        temp = "\n";
        return temp || " ";
      default:
        break;
    }
  }
};

async function findGp(groupid) {
  if (!process.env.mongoURL || !groupid) {
    return;
  }
  //1. 检查GROUP ID 有没有开启CONFIG 功能 1
  let gpInfo = await schema.trpgLevelSystem
    .findOne({
      groupid: groupid,
    })
    .catch((error) =>
      console.error("randomans #696 mongoDB error: ", error.name, error.reson)
    );
  if (!gpInfo || gpInfo.SwitchV2 != 1) return;
  // userInfo.name = displaynameDiscord || displayname || '无名'
  return gpInfo;
  //6 / 7 * LVL * (2 * LVL * LVL + 30 * LVL + 100)
}
async function findGpMember(groupid) {
  if (!process.env.mongoURL || !groupid) {
    return;
  }
  //1. 检查GROUP ID 有没有开启CONFIG 功能 1
  let gpInfo = await schema.trpgLevelSystemMember
    .find({
      groupid: groupid,
    })
    .catch((error) =>
      console.error("randomans #709 mongoDB error: ", error.name, error.reson)
    );
  // userInfo.name = displaynameDiscord || displayname || '无名'
  return gpInfo;
  //6 / 7 * LVL * (2 * LVL * LVL + 30 * LVL + 100)
}

async function findUser(groupid, userid) {
  if (!groupid || !userid) return;
  let userInfo = await schema.trpgLevelSystemMember
    .findOne({
      groupid: groupid,
      userid: userid,
    })
    .catch((error) =>
      console.error("randomans #720 mongoDB error: ", error.name, error.reson)
    );
  // userInfo.name = displaynameDiscord || displayname || '无名'
  return userInfo;
  //6 / 7 * LVL * (2 * LVL * LVL + 30 * LVL + 100)
}

async function ranking(who, data) {
  let array = [];
  let answer = "0";
  for (let key in data) {
    await array.push(data[key]);
  }
  array.sort(function (a, b) {
    return b.EXP - a.EXP;
  });
  let rank = 1;
  for (let i = 0; i < array.length; i++) {
    if (i > 0 && array[i].EXP < array[i - 1].EXP) {
      rank++;
    }
    array[i].rank = rank;
  }
  for (let b = 0; b < array.length; b++) {
    if (array[b].userid == who) answer = b + 1;
  }
  return answer;
}

async function replaceAsync(str, regex, asyncFn) {
  const promises = [];
  str.replace(regex, (match, ...args) => {
    const promise = asyncFn(match, ...args);
    promises.push(promise);
  });
  const data = await Promise.all(promises);
  return str.replace(regex, () => data.shift());
}

function findTheNextSerial(list) {
  if (list.length === 0) return 1;
  let serialList = [];
  for (let index = 0; index < list.length; index++) {
    serialList.push(list[index].serial);
  }
  serialList.sort(function (a, b) {
    return a - b;
  });
  //[1,2,4,5]
  for (let index = 0; index < serialList.length - 1; index++) {
    if (serialList[index] !== index + 1) {
      return index + 1;
    }
  }
  return serialList[list.length - 1] + 1;
}

function isNumber(list) {
  let numberlist = [];
  for (let index = 0; index < list.length; index++) {
    let n = list[index];
    if (/^(?!0)\d+?$/.test(n)) numberlist.push(n);
  }
  return numberlist;
}

function escapeRegExp(target) {
  if (typeof target == "string")
    return target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
  if (Array.isArray(target)) {
    for (let index = 0; index < target.length; index++) {
      target[index] = target[index].replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    return target;
  }
}
module.exports = {
  rollDiceCommand: rollDiceCommand,
  initialize: initialize,
  getHelpMessage: getHelpMessage,
  prefixs: prefixs,
  gameType: gameType,
  gameName: gameName,
};
