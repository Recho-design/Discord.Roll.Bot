"use strict";
const schema = require('./schema.js');
const MAX_ERR_RETRY = 3;
const RETRY_TIME = 5 * 1000;// 每15秒更新;
const MAX_ERR_RESPAWN = 20;

let dbConnErr = {
    timeStamp: Date.now(),
    retry: 0
}

__init();



function dbErrOccurs() {
    dbConnErr.retry++;
    dbConnErr.timeStamp = Date.now();
    console.error('dbConnectionError dbErrOccurs #17 error times#', dbConnErr.retry);
}

function isDbOnline() {
    return (dbConnErr.retry < MAX_ERR_RETRY);
}

function isDbRespawn() {
    return (dbConnErr.retry > MAX_ERR_RESPAWN)
}

function __dbErrorReset() {
    if (dbConnErr.retry > 0) {
        dbConnErr.retry = 0;
        console.error('dbConnectionError dbErrorReset #25 dbConnErr.retry Reset');
    }
}

async function __updateRecords() {
    try {
        await schema.mongodbState.updateOne(
            {},
            {
                $set: {
                    errorDate: Date.now()
                }
            },
            {
                upsert: true
            }
        );

        __dbErrorReset();
    } catch (err) {
        console.error('dbConnectionError updateRecords #36 error: ', err.name);
        dbErrOccurs();
    }
}

function __init() {
    setInterval(
        async () => {
            if (!isDbOnline()) {
                await __updateRecords();
            }
        },
        RETRY_TIME
    );
}
function discordClientRespawn(discordClient, id) {
    discordClient.cluster.send({ respawn: true, id });
}

module.exports = {
    dbErrOccurs,
    isDbOnline,
    discordClientRespawn,
    isDbRespawn
};