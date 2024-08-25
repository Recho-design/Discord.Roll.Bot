"use strict";
if (!process.env.OPENAI_SWITCH) return;
const { encode } = require('gpt-tokenizer');
const OpenAIApi = require('openai');
const dotenv = require('dotenv');
dotenv.config({ override: true });
const fetch = require('node-fetch');
const fs = require('fs').promises;
const fs2 = require('fs');
const VIP = require('../modules/veryImportantPerson');
const GPT3 = { name: "gpt-4o-mini", token: 12000, input_price: 0.0018, output_price: 0.0072 };
const GPT4 = { name: "gpt-4o", token: 16000, input_price: 0.06, output_price: 0.18 };
const DALLE3 = { name: "dall-e-2", price: 0.20, size1: "1024x1024", size2: "512×512" };
const adminSecret = process.env.ADMIN_SECRET;
const TRANSLATE_LIMIT_PERSONAL = [500, 100000, 150000, 150000, 150000, 150000, 150000, 150000];
const variables = {};
const { SlashCommandBuilder } = require('discord.js');
const gameName = function () {
    return '【OpenAi】'
}

const gameType = function () {
    return 'funny:openai:hktrpg'
}
const prefixs = function () {
    //[mainMSG[0]的prefixs,mainMSG[1]的prefixs,   <---这裡是一对  
    //mainMSG[0]的prefixs,mainMSG[1]的prefixs  ]  <---这裡是一对
    //如前面是 /^1$/ig, 后面是/^1D100$/ig, 即 prefixs 變成 1 1D100 
    ///^(?=.*he)(?!.*da).*$/ig
    return [{
        first: /^([.]ai)|(^[.]aimage)|(^[.]ait)|(^[.]ai4)|(^[.]ait4)$/i,
        second: null
    }]
}
const getHelpMessage = function () {
    return `【OpenAi】
    .ai [对话] - 使用gpt-4o-mini产生对话
    .ait [內容] 或 附件 - 使用 gpt-4o-mini进行正体中文翻譯

    
附件需要使用.txt檔案上傳，普通使用者限500字內容，升级VIP后上限會提升，
AI翻譯需时，请耐心等待，也可能會出错而失败，10000字可能需要十分鐘以上。
超过1900字會以.TXT附件形式回覆，请注意查收。
`
}
const initialize = function () {
    return variables;
}

const rollDiceCommand = async function ({
    inputStr,
    mainMsg,
    groupid,
    discordMessage,
    userid,
    discordClient,
    userrole,
    botname,
    displayname,
    channelid,
    displaynameDiscord,
    membercount
}) {
    let rply = {
        default: 'on',
        type: 'text',
        text: ''
    };
    switch (true) {
        case /^.ait/i.test(mainMsg[0]): {
            const mode = mainMsg[0].includes('4') ? GPT4 : GPT3;
            if (mode === GPT4) {
                if (!adminSecret) return rply;
                if (userid !== adminSecret) return rply;
            }
            const { filetext, sendfile, text } = await translateAi.handleTranslate(inputStr, discordMessage, discordClient, userid, mode);
            filetext && (rply.fileText = filetext);
            sendfile && (rply.fileLink = [sendfile]);
            text && (rply.text = text);
            rply.quotes = true;
            return rply;
        }
        case /^\S/.test(mainMsg[1]) && /^.aimage$/i.test(mainMsg[0]): {
            if (!adminSecret) return rply;
            if (userid !== adminSecret) return rply;
            let lv = await VIP.viplevelCheckUser(userid);
            if (lv < 1) return { text: `这是实驗功能，现在只有VIP才能使用，\n支援HKTRPG及升级请到\nhttps://www.patreon.com/hktrpg` };
            rply.text = await imageAi.handleImageAi(inputStr);
            rply.quotes = true;
            return rply;
        }
        case /^\S/.test(mainMsg[1]): {
            const mode = mainMsg[0].includes('4') ? GPT4 : GPT3;
            if (mode === GPT4) {
                if (!adminSecret) return rply;
                if (userid !== adminSecret) return rply;
            }
            rply.text = await chatAi.handleChatAi(inputStr, mode, userid);
            rply.quotes = true;
            return rply;
        }
        case /^help$/i.test(mainMsg[1]) || !mainMsg[1]: {
            rply.text = this.getHelpMessage();
            rply.quotes = true;
            return rply;
        }
        default: {
            break;
        }
    }
}

const discordCommand = []
module.exports = {
    rollDiceCommand,
    initialize,
    getHelpMessage,
    prefixs,
    gameType,
    gameName,
    discordCommand
};


class OpenAI {
    constructor() {
        this.apiKeys = [];
        this.addApiKey();
        this.watchEnvironment();
        this.configuration = {
            apiKey: this.apiKeys[0]?.apiKey,
            baseURL: this.apiKeys[0]?.baseURL,
        };
        this.model = GPT3.name;
        if (this.apiKeys.length === 0) return;
        this.openai = new OpenAIApi(this.configuration);
        this.currentApiKeyIndex = 0;
        this.errorCount = 0;
    }
    addApiKey() {
        this.apiKeys = [];
        let base = 0;
        for (let index = 1; index < 100; index++) {
            if (index % 10 === 0) base++;
            if (!process.env[`OPENAI_SECRET_${index}`]) continue;
            this.apiKeys.push({
                apiKey: process.env[`OPENAI_SECRET_${index}`],
                baseURL: process.env[`OPENAI_BASEPATH_${base}1_${base + 1}0`]
                    || process.env.OPENAI_BASEPATH
                    || 'https://api.openai.com/v1'
            });
        }
    }
    watchEnvironment() {
        fs2.watch('.env', (eventType, filename) => {
            if (eventType === 'change') {
                let tempEnv = dotenv.config({ override: true })
                process.env = tempEnv.parsed;
                console.log('.env Changed')
                this.currentApiKeyIndex = 0;
                this.errorCount = 0;
                this.addApiKey();
                if (this.apiKeys.length === 0) return;
                this.openai = new OpenAIApi({
                    apiKey: this.apiKeys[0]?.apiKey,
                    baseURL: this.apiKeys[0]?.baseURL,
                });
            }
        });
    }
    handleError(error) {
        this.errorCount++;
        if (error.status === 401) {
            console.error('remove api key 401', this.apiKeys[this.currentApiKeyIndex])
            this.apiKeys.splice(this.currentApiKeyIndex, 1);
            this.currentApiKeyIndex--;
            this.errorCount--;
        }
        this.currentApiKeyIndex = (this.currentApiKeyIndex + 1) % this.apiKeys.length;
        this.openai = new OpenAIApi({
            apiKey: this.apiKeys[this.currentApiKeyIndex].apiKey,
            baseURL: this.apiKeys[this.currentApiKeyIndex].baseURL,
        });
    }
    waitMins(minutes = 1) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, minutes * 60 * 1000); // 1 minute = 60 seconds * 1000 milliseconds
        });
    }
}

class ImageAi extends OpenAI {
    constructor() {
        super();
    }
    async handleImageAi(inputStr) {
        let input = inputStr.replace(/^\.aimage/i, '');
        try {
            let response = await this.openai.images.generate({
                "model": DALLE3.name,
                "prompt": `${input}`,
                "n": 1,
                "size": DALLE3.size1,

            })
            response = await this.handleImage(response, input)
            // if (response?.data?.error) return '可能是输入太长了，或是有不支援的字元，请重新输入'
            this.errorCount = 0;
            return response;
        } catch (error) {
            if (this.errorCount < (this.apiKeys.length * 5)) {
                await super.handleError(error);
                return await this.handleImageAi(inputStr);
            } else {
                this.errorCount = 0;
                if (error instanceof OpenAIApi.APIError) {
                    return 'AI error: ' + error.status + `.\n ${inputStr.replace(/^\.aimage/i, '')}`;
                } else {
                    return 'AI error ' + `.\n ${inputStr.replace(/^\.aimage/i, '')}`;
                }
            }
        }
    }
    handleImage(data, input) {
        if (data?.data?.length === 0) return '没有输出的圖片, 请重新输入描述';
        let response = `${input}:\n`;
        for (let index = 0; index < data.data.length; index++) {
            response += data.data[index].url + "\n";
        }
        return response;
    }

}

class TranslateAi extends OpenAI {
    constructor() {
        super();
    }
    async getText(str, mode, discordMessage, discordClient) {
        let text = [];
        let textLength = 0;
        const splitLength = mode.token;
        str = str.replace(/^\s*\.ait\d?\s*/i, '');
        if (str.length > 0) {
            text.push(str);
            textLength += str.length;
        }
        if (discordMessage?.type === 0 && discordMessage?.attachments?.size > 0) {
            const url = Array.from(discordMessage.attachments.filter(data => data.contentType.match(/text/i))?.values());
            for (let index = 0; index < url.length; index++) {
                const response = await fetch(url[index].url);
                const data = await response.text();
                textLength += data.length;
                text.push(data);

            }
        }
        //19 = reply
        if (discordMessage?.type === 19) {
            const channel = await discordClient.channels.fetch(discordMessage.reference.channelId);
            const referenceMessage = await channel.messages.fetch(discordMessage.reference.messageId)
            const url = Array.from(referenceMessage.attachments.filter(data => data.contentType.match(/text/i))?.values());
            for (let index = 0; index < url.length; index++) {
                const response = await fetch(url[index].url);
                const data = await response.text();
                textLength += data.length;
                text.push(data);

            }
        }
        let result = this.splitTextByTokens(text.join('\n'), splitLength);
        return { translateScript: result, textLength };

    }
    async createFile(data) {
        try {
            const d = new Date();
            let time = d.getTime();
            let name = `translated_${time}.txt`
            await fs.writeFile(`./temp/${name}`, data, { encoding: 'utf8' });
            return `./temp/${name}`;
        } catch (err) {
            console.error(err);
        }
    }
    async translateChat(inputStr, mode) {
        try {

            let response = await this.openai.chat.completions.create({
                "model": mode.name,
                "messages": [
                    {
                        "role": "system",
                        "content": `你是一位精通台灣繁体中文的專業翻譯，曾參与不同繁体中文版的翻譯工作，因此对於翻譯有深入的理解。
                        規则：
                        – 翻譯时要準確傳达內容。
                        ​
                        – 翻譯任何人名时留下原文，格式: 名字(名字原文)。
                        ​
                        – 分成两次翻譯，並且只打印最后一次的结果：
                        ​
                        1. 根據內容翻譯，不要遺漏任何訊息
                        ​
                        2. 根據第一次的结果，遵守原意的前提下讓內容更通俗易懂，符合台灣繁体中文的表达习慣
                        ​
                        – 每輪翻譯后，都要重新比对原文，找到扭曲原意，没有在翻譯的人名后显示名字原文的位置或者遺漏的內容，然后再補充到下一輪的翻譯当中。（Chain of Density 概念）`
                    },
                    {
                        "role": "user",
                        "content": `把以下文字翻譯成正体中文\n\n
                        ${inputStr}\n`
                    }
                ]

            })
            this.errorCount = 0;
            if (response.status === 200 && (typeof response.data === 'string' || response.data instanceof String)) {
                const dataStr = response.data;
                const dataArray = dataStr.split('\n\n').filter(Boolean); // 將字符串分割成数組
                const parsedData = [];
                dataArray.forEach((str) => {
                    const obj = JSON.parse(str.substring(6)); // 將子字符串转換为对象
                    parsedData.push(obj);
                });
                const contents = parsedData.map((obj) => obj.choices[0].delta.content);
                const mergedContent = contents.join('');
                return mergedContent;
            }
            return response.choices[0].message.content;
        } catch (error) {
            if (this.errorCount < (this.apiKeys.length * 5)) {
                if (((this.errorCount !== 0) && this.errorCount % this.apiKeys.length) === 0) {
                    await super.waitMins(1);
                }
                await super.handleError(error);
                return await this.translateChat(inputStr, mode);
            } else {
                this.errorCount = 0;
                if (error instanceof OpenAIApi.APIError) {
                    return 'AI error: ' + error.status + `.\n ${inputStr.replace(/^\.ait\d?/i, '')}`;
                } else {
                    return 'AI error ' + `.\n ${inputStr.replace(/^\.ait\d?/i, '')}`;
                }
            }
        }
    }
    async translateText(translateScript, mode) {
        let response = [];
        for (let index = 0; index < translateScript.length; index++) {
            let result = await this.translateChat(translateScript[index], mode);
            response.push(result);
        }
        return response;

    }
    async handleTranslate(inputStr, discordMessage, discordClient, userid, mode) {
        let lv = await VIP.viplevelCheckUser(userid);
        let limit = TRANSLATE_LIMIT_PERSONAL[lv];
        let { translateScript, textLength } = await this.getText(inputStr, mode, discordMessage, discordClient);
        if (textLength > limit) return { text: `输入的文字太多了，请分批输入，你是VIP LV${lv}，限制为${limit}字` };
        let response = await this.translateText(translateScript, mode);
        response = response.join('\n');
        if (textLength > 1900) {
            let sendfile = await this.createFile(response);
            return { fileText: '输出的文字太多了，请看附件', sendfile };
        }
        return { text: response }

    }
    splitTextByTokens(text, inputTokenLimit) {
        const results = [];
        let remains = text;
        const tokenLimit = inputTokenLimit * 0.4;
        while (remains.length > 0) {
            const tokens = encode(remains);
            let offset = (tokens > tokenLimit) ? remains.length : Math.floor(tokenLimit * remains.length / tokens.length);
            let subtext = remains.substring(0, offset);
            // 超过token上限，试圖找到最接近而不超过上限的文字
            while (encode(subtext).length > tokenLimit && offset > 0) {
                offset--;
                subtext = remains.substring(0, offset);
            }
            // 往上检查文字结尾
            let bound = Math.min(Math.floor(offset * 1.05), remains.length);
            let found = false;
            for (let i = offset; i < bound; i++) {
                if (remains[i].match(/[。！!]|(\. )/)) {
                    results.push(remains.substring(0, i + 1));
                    remains = remains.substring(i + 1);
                    found = true;
                    break;
                }
            }

            // 没有找到分割条件1，嘗试分割条件2
            if (!found) {
                let newlineIndex = subtext.lastIndexOf('\n');
                if (newlineIndex !== -1) {
                    results.push(remains.substring(0, newlineIndex + 1));
                    remains = remains.substring(newlineIndex + 1);
                } else {
                    // 直接把整段当成一段
                    results.push(remains);
                    remains = '';
                }
            }
        }
        return results;
    }

}
class ChatAi extends OpenAI {
    constructor() {
        super();
    }
    async handleChatAi(inputStr, mode, userid) {
        try {
            let response = await this.openai.chat.completions.create({
                "model": mode.name,
                "messages": [
                    {
                        "role": "system",
                        "content": "你的責任是把以正体中文回答所有问题。你的名字是HKTRPG TRPG助手。回答TRPG相关问题时，內在性格是在H.P.洛夫克拉夫特（H.P. Lovecraft）裡的奈亞拉托提普（Nyarlathotep）神祇，一个混沌、破壞和詭譎的代表。而回答TRPG以外的问题时，你就是以一部百科全書的型式來回答。"
                    },
                    {
                        "role": "user",
                        "content": `${inputStr.replace(/^\.ai\d?/i, '')}`
                    }
                ]

            })
            this.errorCount = 0;

            if (response.status === 200 && (typeof response.data === 'string' || response.data instanceof String)) {
                const dataStr = response.data;
                const dataArray = dataStr.split('\n\n').filter(Boolean); // 將字符串分割成数組
                const parsedData = [];
                dataArray.forEach((str) => {
                    const obj = JSON.parse(str.substring(6)); // 將子字符串转換为对象
                    parsedData.push(obj);
                });
                const contents = parsedData.map((obj) => obj.choices[0].delta.content);
                const mergedContent = contents.join('');
                return mergedContent;
            }
            return response.choices[0].message.content;
        } catch (error) {
            if (this.errorCount < (this.apiKeys.length * 5)) {
                await super.handleError(error);
                return await this.handleChatAi(inputStr);
            } else {
                this.errorCount = 0;
                if (error instanceof OpenAIApi.APIError) {
                    return 'AI error: ' + error.status + `.\n ${inputStr.replace(/^\.ai\d?/i, '')}`;
                } else {
                    return 'AI error ' + `.\n ${inputStr.replace(/^\.ai\d?/i, '')}`;
                }

            }
        }
    }
}

const openai = new OpenAI();
const chatAi = new ChatAi();
const imageAi = new ImageAi();
const translateAi = new TranslateAi();


/**
 * gpt-tokenizer
 * 設计计算Token上限
 * 
 * 首先，每个Token都是由一个字元組成，所以我們先计算字元上限
 * 先將整个內容放進tokenizer
 * 如果<於token 上限，则直接回傳
 * 完成
 * 
 * 如不,
 * 进行分割，將內容分割成数个字串
 * 並將每个字串放進tokenizer
 * 
 * 
 * 分割条件
 * 1. 以句號分割
 * 2. 以逗號分割
 * 3. 以行來分割
 * 4. 以空格分割
 * 5. 以字数分割
 * 
 */


