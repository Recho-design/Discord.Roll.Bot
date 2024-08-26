"use strict";

const __notChannel = "这里不是社区，这是频道功能，需要在频道上使用。\n\n";
const __notAdmin = "你没有相关权限，禁止使用这功能，\n你需要有社区管理员权限。\n\n";
const __notManager = "你没有相关权限，禁止使用这功能，\n你需要有管理此频道的权限或社区管理员权限。\n\n";
const __notDiscord = "这是Discord限定功能。\n\n"

const role = {
    ban: -1,
    nothing: 0,
    user: 1,
    dm: 2,
    admin: 3,
    superAdmin: 4,
}

const __flag = {
    Channel: 0x1,
    Admin: 0x2,
    Manager: 0x4,
    Discord: 0x8,
}

const flag = {
    ChkGuild: __flag.Channel | __flag.Admin,
    ChkChannel: __flag.Channel,
    ChkChannelManager: __flag.Channel | __flag.Manager,
    ChkChannelAdmin: __flag.Channel | __flag.Admin,
    ChkBot: __flag.Channel | __flag.Manager | __flag.Discord,
    ChkManager: __flag.Manager,
}

function __isChannel(gid) {
    return !!gid;
}

function __isAdmin(user) {
    return (user === role.admin) ||
        (user === role.superAdmin);
}

function __isManager(user) {
    return (user === role.dm) ||
        (user === role.admin) ||
        (user === role.superAdmin);
}

function __isDiscord(botName) {
    return (botName === "Discord");
}

function permissionErrMsg(arg) {
    let msg = "";

    if ((arg.flag & 0x1) && !__isChannel(arg.gid))
        msg += __notChannel;

    if ((arg.flag & 0x2) && !__isAdmin(arg.role))
        msg += __notAdmin;

    if ((arg.flag & 0x4) && !__isManager(arg.role))
        msg += __notManager;

    if ((arg.flag & 0x8) && !__isDiscord(arg.name))
        msg += __notDiscord;

    return msg;
}

module.exports = {
    role,
    flag,
    permissionErrMsg,
};