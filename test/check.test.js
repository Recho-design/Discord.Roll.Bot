"use strict";

const chk = require('../modules/check');

const NOT_CHANNEL = "这里不是社区，这是频道功能，需要在频道上使用。\n\n";
const NOT_ADMIN = "你没有相关权限，禁止使用这功能，\n你需要有社区管理员权限。\n\n";
const NOT_MANAGER = "你没有相关权限，禁止使用这功能，\n你需要有管理此频道的权限或社区管理员权限。\n\n";
const NOT_DISCORD = "这是Discord限定功能。\n\n"

test('Test permissionErrMsg ChkGuild is not channel not admin', () => {
    let arg = {
        flag: chk.flag.ChkGuild,
        gid: 0,
        role: chk.role.ban,
    };
    expect(chk.permissionErrMsg(arg)).toBe(NOT_CHANNEL + NOT_ADMIN);
});

test('Test permissionErrMsg ChkGuild is channel not admin', () => {
    let arg = {
        flag: chk.flag.ChkGuild,
        gid: 1,
        role: chk.role.ban,
    };
    expect(chk.permissionErrMsg(arg)).toBe(NOT_ADMIN);
});

test('Test permissionErrMsg ChkGuild is not channel but admin', () => {
    let arg = {
        flag: chk.flag.ChkGuild,
        gid: 0,
        role: chk.role.admin,
    };
    expect(chk.permissionErrMsg(arg)).toBe(NOT_CHANNEL);
});

test('Test permissionErrMsg ChkGuild is channel and admin', () => {
    let arg = {
        flag: chk.flag.ChkGuild,
        gid: 0,
        role: chk.role.admin,
    };
    expect(chk.permissionErrMsg(arg)).toBe(NOT_CHANNEL);
});

test('Test permissionErrMsg ChkChannel is channel', () => {
    let arg = {
        flag: chk.flag.ChkChannel,
        gid: 1,
    };
    expect(chk.permissionErrMsg(arg)).toBe('');
});

test('Test permissionErrMsg ChkChannel not channel', () => {
    let arg = {
        flag: chk.flag.ChkChannel,
        gid: 0,
    };
    expect(chk.permissionErrMsg(arg)).toBe(NOT_CHANNEL);
});

test('Test permissionErrMsg ChkChannelManager is not channel and not Manager', () => {
    let arg = {
        flag: chk.flag.ChkChannelManager,
        gid: 0,
        role: chk.role.user,
    };
    expect(chk.permissionErrMsg(arg)).toBe(NOT_CHANNEL + NOT_MANAGER);
});

test('Test permissionErrMsg ChkChannelManager is channel but not Manager', () => {
    let arg = {
        flag: chk.flag.ChkChannelManager,
        gid: 1,
        role: chk.role.user,
    };
    expect(chk.permissionErrMsg(arg)).toBe(NOT_MANAGER);
});

test('Test permissionErrMsg ChkChannelManager is not channel but Manager', () => {
    let arg = {
        flag: chk.flag.ChkChannelManager,
        gid: 0,
        role: chk.role.dm,
    };
    expect(chk.permissionErrMsg(arg)).toBe(NOT_CHANNEL);
});

test('Test permissionErrMsg ChkChannelManager is channel and Manager', () => {
    let arg = {
        flag: chk.flag.ChkChannelManager,
        gid: 1,
        role: chk.role.dm,
    };
    expect(chk.permissionErrMsg(arg)).toBe('');
});

test('Test permissionErrMsg ChkChannelAdmin is not channel and not admin', () => {
    let arg = {
        flag: chk.flag.ChkChannelAdmin,
        gid: 0,
        role: chk.role.dm,
    };
    expect(chk.permissionErrMsg(arg)).toBe(NOT_CHANNEL + NOT_ADMIN);
});

test('Test permissionErrMsg ChkChannelAdmin is channel but not admin', () => {
    let arg = {
        flag: chk.flag.ChkChannelAdmin,
        gid: 1,
        role: chk.role.dm,
    };
    expect(chk.permissionErrMsg(arg)).toBe(NOT_ADMIN);
});

test('Test permissionErrMsg ChkChannelAdmin is not channel but admin', () => {
    let arg = {
        flag: chk.flag.ChkChannelAdmin,
        gid: 0,
        role: chk.role.admin,
    };
    expect(chk.permissionErrMsg(arg)).toBe(NOT_CHANNEL);
});

test('Test permissionErrMsg ChkChannelAdmin is channel and admin', () => {
    let arg = {
        flag: chk.flag.ChkChannelAdmin,
        gid: 1,
        role: chk.role.admin,
    };
    expect(chk.permissionErrMsg(arg)).toBe('');
});

test('Test permissionErrMsg ChkBot is not channel and not manager and not bot', () => {
    let arg = {
        flag: chk.flag.ChkBot,
        gid: 0,
        role: chk.role.user,
        name: '骰娘爱你哦💖',
    };
    expect(chk.permissionErrMsg(arg)).toBe(NOT_CHANNEL + NOT_MANAGER + NOT_DISCORD);
});

test('Test permissionErrMsg ChkBot is channel, manager and bot', () => {
    let arg = {
        flag: chk.flag.ChkBot,
        gid: 1,
        role: chk.role.dm,
        name: 'Discord',
    };
    expect(chk.permissionErrMsg(arg)).toBe('');
});

test('Test permissionErrMsg ChkBot is channel and not manager and not bot', () => {
    let arg = {
        flag: chk.flag.ChkBot,
        gid: 1,
        role: chk.role.user,
        name: '骰娘爱你哦💖',
    };
    expect(chk.permissionErrMsg(arg)).toBe(NOT_MANAGER + NOT_DISCORD);
});

test('Test permissionErrMsg ChkBot is channel and manager but not bot', () => {
    let arg = {
        flag: chk.flag.ChkBot,
        gid: 1,
        role: chk.role.dm,
        name: '骰娘爱你哦💖',
    };
    expect(chk.permissionErrMsg(arg)).toBe(NOT_DISCORD);
});

test('Test permissionErrMsg ChkBot is channel and bot but not manager', () => {
    let arg = {
        flag: chk.flag.ChkBot,
        gid: 1,
        role: chk.role.user,
        name: 'Discord',
    };
    expect(chk.permissionErrMsg(arg)).toBe(NOT_MANAGER);
});

test('Test permissionErrMsg ChkBot is not channel and manager but bot', () => {
    let arg = {
        flag: chk.flag.ChkBot,
        gid: 0,
        role: chk.role.user,
        name: 'Discord',
    };
    expect(chk.permissionErrMsg(arg)).toBe(NOT_CHANNEL + NOT_MANAGER);
});

test('Test permissionErrMsg ChkBot is not channel but manager and bot', () => {
    let arg = {
        flag: chk.flag.ChkBot,
        gid: 0,
        role: chk.role.dm,
        name: 'Discord',
    };
    expect(chk.permissionErrMsg(arg)).toBe(NOT_CHANNEL);
});

test('Test permissionErrMsg ChkBot is manager but not channel and bot', () => {
    let arg = {
        flag: chk.flag.ChkBot,
        gid: 0,
        role: chk.role.dm,
        name: '骰娘爱你哦💖',
    };
    expect(chk.permissionErrMsg(arg)).toBe(NOT_CHANNEL + NOT_DISCORD);
});

test('Test permissionErrMsg ChkManager is not manager', () => {
    let arg = {
        flag: chk.flag.ChkManager,
        role: chk.role.user,
    };
    expect(chk.permissionErrMsg(arg)).toBe(NOT_MANAGER);
});

test('Test permissionErrMsg ChkManager is manager', () => {
    let arg = {
        flag: chk.flag.ChkManager,
        role: chk.role.dm,
    };
    expect(chk.permissionErrMsg(arg)).toBe('');
});
