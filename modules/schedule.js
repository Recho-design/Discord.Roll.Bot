"use strict";
if (!process.env.mongoURL) {
    return;
}
const restartTime = '55 4 * * *';
const Agenda = require("agenda");
//const mongoConnectionString = "mongodb://127.0.0.1/agenda";
//const agenda = new Agenda({ mongo: mongoose.mongoose });

// Or override the default collection name:
const agenda = new Agenda({ db: { address: process.env.mongoURL, collection: 'agendaAtHKTRPG' }, maxConcurrency: 20000, defaultConcurrency: 2000 });

// or pass additional connection options:
// const agenda = new Agenda({db: {address: mongoConnectionString, collection: 'jobCollectionName', options: {ssl: true}}});

// or pass in an existing mongodb-native MongoClient instance
// const agenda = new Agenda({mongo: myMongoClient});



(async function () {
    // IIFE to give access to async/await
    try {
        await agenda.start()
        await agenda.every(restartTime, '0455restartdiscord');
    } catch (error) {
        console.error(`agenda start error #25`, error)
    }
})();


agenda.on("fail", (err, job) => {
    console.error(`#33 Job failed with error: ${err.message}`);
});
/**
 * 对schedule 中发佈的文字进行处理
 *
 * 先掷骰一次
 *
 * 有没有结果，也把內容进行REPLACE
 * 支援{}类置換，
 * 
 */

//discordSchedule.scheduleAtMessage


module.exports = {
    agenda
};