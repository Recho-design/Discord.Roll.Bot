"use strict";
if (!process.env.mongoURL) {
    return;
}
const mongoose = require('./db-connector.js').mongoose;
//const Schema = mongoose.Schema;
//const Message = mongoose.model('Message', schema);

const chattest = mongoose.model('chattest', {
    default: String,
    text: String,
    type: String
});
const block = mongoose.model('block', {
    groupid: String,
    blockfunction: Array
});

const randomAns = mongoose.model('randomAns', {
    groupid: String,
    randomAnsfunction: Array
});

const randomAnsPersonal = mongoose.model('randomAnsPersonal', {
    userid: String,
    title: String,
    answer: Array,
    serial: Number
});

//cancel
const randomAnsAllgroup = mongoose.model('randomAnsAllgroup', {
    randomAnsAllgroup: Array
});

const randomAnsServer = mongoose.model('randomAnsServer', {
    title: String,
    answer: Array,
    serial: Number
});


const trpgDatabase = mongoose.model('trpgDatabase', {
    groupid: String,
    trpgDatabasefunction: [{
        topic: String,
        contact: String
    }]
});

const trpgDatabaseAllgroup = mongoose.model('trpgDatabaseAllgroup', {
    trpgDatabaseAllgroup: [{
        topic: String,
        contact: String
    }]
});
const GroupSetting = mongoose.model('GroupSetting', {
    groupid: String,
    togm: Array,
    user: [{
        userid: {
            type: String,
            required: true
        },
        name: String,
        date: {
            type: Date,
            default: Date.now
        },
        limit: Number,
        Permission: String,
        Abiliy: Array
    }]
});
const trpgCommand = mongoose.model('trpgCommand', {
    groupid: String,
    trpgCommandfunction: [{
        topic: String,
        contact: String
    }]
});
const trpgLevelSystem = mongoose.model('trpgLevelSystem', {
    groupid: String,
    LevelUpWord: String,
    //在这社区升级时的升级语
    RankWord: String,
    //在这社区查询等级时的回应
    Switch: {
        type: String
    },
    //是否启动功能 config 1X 则1
    Hidden: {
        type: String
    },
    SwitchV2: {
        type: Boolean
    },
    //是否启动功能 config 1X 则1
    HiddenV2: {
        type: Boolean
    },
    //大于此Lvl即为称号.
    Title: Array,
    //是否显示升级语 config X1 则1
    trpgLevelSystemfunction: [{
        userid: String,
        name: String,
        EXP: Number,
        //现在经验值
        Level: String,
        //等级
        LastSpeakTime: {
            type: Date,
            default: Date.now
            //最后说话时间, 间隔一分钟才提升经验
        }
    }]
});
const trpgLevelSystemMember = mongoose.model('trpgLevelSystemMember', {
    groupid: String,
    userid: String,
    name: String,
    EXP: Number,
    TitleName: String,
    //现在经验值
    Level: Number,
    //等级
    multiEXPTimes: Number,
    multiEXP: Number,
    stopExp: Number,
    decreaseEXP: Number,
    decreaseEXPTimes: Number,
    //EVENT事件
    /**
     * 4. 停止得到经验(X分钟內)
     * 5. 发言经验减少X(X分钟內)
     * 6. 发言经验增加X(X分钟內)
    7. 吸收对方经验(X分钟內)
    8. 对方得到经验值 X 倍(X分钟內)
     */
    LastSpeakTime: {
        type: Date,
        default: Date.now
        //最后说话时间, 间隔一分钟才提升经验
    }
});
const trpgDarkRolling = mongoose.model('trpgDarkRolling', {
    groupid: String,
    trpgDarkRollingfunction: [{
        userid: String,
        diyName: String,
        displayname: String
    }]
});
//
//目的: 记錄发言数量及掷骰数量
//记录掷骰结果
//每日上傳一次
//同时每500次显示一次
//
const RealTimeRollingLog = mongoose.model('RealTimeRollingLog', {
    RealTimeRollingLogfunction: {
        //第一次运行记录RollingLogfunction的时间
        StartTime: String,
        //一小时一次
        LastTimeLog: Date,
        //RealTimeLog
        LogTime: String,
        DiscordCountRoll: Number,
        DiscordCountText: Number,
        LineCountRoll: Number,
        LineCountText: Number,
        TelegramCountRoll: Number,
        TelegramCountText: Number,
        WWWCountRoll: Number,
        WWWCountText: Number,
        WhatsappCountRoll: Number,
        WhatsappCountText: Number,
        PlurkCountRoll: Number,
        PlurkCountText: Number,
        ApiCountRoll: Number,
        ApiCountText: Number
    }
});

const RollingLog = mongoose.model('RollingLog', {
    RollingLogfunction: {
        LogTime: String,
        DiscordCountRoll: Number,
        DiscordCountText: Number,
        LineCountRoll: Number,
        LineCountText: Number,
        TelegramCountRoll: Number,
        TelegramCountText: Number,
        WWWCountRoll: Number,
        WWWCountText: Number,
        WhatsappCountRoll: Number,
        WhatsappCountText: Number,
        PlurkCountRoll: Number,
        PlurkCountText: Number
    }
});
const veryImportantPerson = mongoose.model('veryImportantPerson', new mongoose.Schema({
    gpid: String,
    id: String,
    level: Number,
    startDate: Date,
    endDate: Date,
    name: String,
    notes: String,
    code: String,
    switch: Boolean
}));
const codelist = mongoose.model('codelist', new mongoose.Schema({
    code: String,
    level: Number,
    endDate: Date,
    renew: Number,
    allowTime: Number,
    usedTime: Number,
    usedGpid: Array,
    usedId: Array,
    name: String,
    notes: String,
}));


const characterGpSwitch = mongoose.model('characterGpSwitch', new mongoose.Schema({
    gpid: Array,
    id: String,
    name: String,
    cardId: String
}));
const accountPW = mongoose.model('accountPW', new mongoose.Schema({
    id: String,
    userName: String,
    password: String,
    channel: [{
        id: String,
        botname: String,
        titleName: String
    }]
}));

const allowRolling = mongoose.model('allowRolling', new mongoose.Schema({
    id: String,
    botname: String,
    titleName: String
}));


const chatRoom = mongoose.model('chatRoom', new mongoose.Schema({
    name: { // 欄位名称
        type: String, // 欄位资料型別
        required: true, // 必须要有值
        maxlength: 50
    },
    msg: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    roomNumber: {
        type: String,
        required: true,
        maxlength: 50
    }
}));

const characterCard = mongoose.model('characterCard', new mongoose.Schema({
    id: String,
    public: Boolean,
    name: {
        type: String,
        maxlength: 50
    },
    nameShow: Boolean,
    state: [{
        name: {
            type: String,
            maxlength: 50
        },
        itemA: {
            type: String,
            maxlength: 50
        },
        itemB: {
            type: String,
            maxlength: 50
        }
    }],
    roll: [{
        name: {
            type: String,
            maxlength: 50
        },
        itemA: {
            type: String,
            maxlength: 150
        }
    }],
    notes: [{
        name: {
            type: String,
            maxlength: 50
        },
        itemA: {
            type: String,
            maxlength: 1500
        }
    }]
}));

const exportGp = mongoose.model('exportGp', new mongoose.Schema({
    groupID: String,
    lastActiveAt: Date
}));

const exportUser = mongoose.model('exportUser', new mongoose.Schema({
    userID: String,
    lastActiveAt: Date,
    times: Number
}));
const init = mongoose.model('init', new mongoose.Schema({
    groupID: String,
    list: [{
        name: String,
        result: Number,
        formula: String
    }]
}));

//个人新增event 时的记录。eventList会使用ID 来记录
const eventMember = mongoose.model('eventMember', new mongoose.Schema({
    userID: String,
    userName: String,
    earnedEXP: Number,
    totailEarnedEXP: Number,
    energy: Number,
    lastActiveAt: Date,
    eventList: [{
        title: String,
        eventID: String
    }],
    activityList: [{
        date: Date,
        activityDetail: String
    }]
}));

//整个event 列表，会从这里进行抽取
const eventList = mongoose.model('eventList', new mongoose.Schema({
    title: String,
    chainTitle: String,
    userID: String,
    userName: String,
    expName: String,
    detail: [{
        event: String,
        result: Number
    }]
}));


//成长的开关控制
const developmentConductor = mongoose.model('developmentConductor', new mongoose.Schema({
    groupID: String,
    switch: Boolean
}));

//成长的每一个掷骰结果
const developmentRollingRecord = mongoose.model('developmentRollingRecord', new mongoose.Schema({
    userID: String,
    groupID: String,
    date: Date,
    skillName: String,
    skillPer: Number,
    skillResult: Number,
    skillPerStyle: String,
    userName: String
    //成功,失败,大成功,大失败
}));

//.schedule Cron
//限制30次?
const agendaAtHKTRPG = mongoose.model('agendaAtHKTRPG', new mongoose.Schema({
    name: String,
    data: Object,
    priority: Number,
    type: String,
    nextRunAt: Date,
    lastModifiedBy: String,
    roleName: String,
    imageLink: String

}, { collection: "agendaAtHKTRPG" }));
const firstTimeMessage = mongoose.model('firstTimeMessage', new mongoose.Schema({
    userID: String,
    botname: String
}));

const theNewsMessage = mongoose.model('theNewsMessage', new mongoose.Schema({
    userID: String,
    botname: String,
    switch: Boolean
}));

const myName = mongoose.model('myName', new mongoose.Schema({
    userID: String,
    name: String,
    shortName: String,
    imageLink: String
}));

const whatsapp = mongoose.model('whatsapp', new mongoose.Schema({
    sessionData: String
}));

const roleReact = mongoose.model('roleReact', new mongoose.Schema({
    message: String,
    messageID: String,
    groupid: String,
    serial: Number,
    detail: [{
        roleID: String,
        emoji: String,
    }]

}));

const roleInvites = mongoose.model('roleInvites', new mongoose.Schema({
    roleID: String,
    invitesLink: String,
    groupid: String,
    serial: Number
}));

const translateChannel = mongoose.model('translateChannel', new mongoose.Schema({
    groupid: String,
    channelid: String,
    switch: Boolean
}));

const bcdiceRegedit = mongoose.model('bcdiceRegedit', new mongoose.Schema({
    botname: String,
    channelid: String,
    trpgId: String
}));

const multiServer = mongoose.model('multiServer', new mongoose.Schema({
    channelid: String,
    multiId: String,
    guildName: String,
    channelName: String,
    guildID: String,
    botname: String
}));



const mongodbState = async () => {
    try {
        let ans = await mongoose.connection.db.command({ serverStatus: 1 });
        return ans;
    } catch (error) { }
}


module.exports = {
    mongodbState,
    randomAns,
    multiServer,
    block,
    chattest,
    randomAnsAllgroup,
    GroupSetting,
    trpgDatabaseAllgroup,
    trpgDatabase,
    trpgCommand,
    trpgLevelSystem,
    trpgLevelSystemMember,
    trpgDarkRolling,
    RealTimeRollingLog,
    RollingLog,
    characterCard,
    veryImportantPerson,
    characterGpSwitch,
    codelist,
    chatRoom,
    exportGp,
    exportUser,
    accountPW,
    allowRolling,
    init,
    eventMember,
    eventList,
    developmentConductor,
    developmentRollingRecord,
    agendaAtHKTRPG,
    firstTimeMessage,
    theNewsMessage,
    myName,
    whatsapp,
    roleInvites,
    roleReact,
    randomAnsServer,
    randomAnsPersonal,
    translateChannel,
    bcdiceRegedit,
    mongodbState
}
//const Cat = mongoose.model('Cat', { name: String });
//const kitty = new Cat({ name: 'Zildjian' });
/*
module.exports = new Schema({
    default: String,
    text: String,
    type: String

});
*/