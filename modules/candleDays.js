/**
 * @file candleDays.js
 * @description 检查今天是否是指定日期，如果是的话，回傳指定的字串，否则回傳空字串，用於检查是否需要显示蜡燭，或是其他用途。
 * @example 在.env 中設定 CANDLE_DATES=2,14,🌷 12,25,🕯️
 * @example 在程式中使用：
 *          const candle = require('../modules/candleDays.js'); 
 *          candle.checker();
 * @example 以上設定會在每年的 6 月 4 日显示蜡燭，2 月 14 日显示🌷，12 月 25 日显示🕯️
 * @example 日期格式为：月,日,显示的字串，月和日必須为数字，显示的字串可以不填，預設为🕯️
 * @example 日期之间以空白隔开，可以設定多个日期，例如：CANDLE_DATES=2,14,🌷 12,25,🕯️
 * 
 */
const _DEFAULT_CANDLE = '🕯️';
class CandleChecker {
    constructor() {
        this.monthDays = [
        ];
        this.today = {};
        this.#importDates();
        this.#updateToday();
        this.#scheduleFunction();
        this.isCandleDay = false;
        this.todayCandle = '';
        this.#checkForCandle();
    }

    #checkForCandle() {
        this.isCandleDay = this.monthDays.some(({ month, day }) =>
            month === this.today.Month && day === this.today.Date
        )
        if (this.isCandleDay) {
            this.todayCandle = this.monthDays.find(({ month, day }) =>
                month === this.today.Month && day === this.today.Date
            ).candle || _DEFAULT_CANDLE;
        }
        else this.todayCandle = '';
        console.log(`[CandleChecker] Today is ${this.today.Month}/${this.today.Date}, isCandleDay: ${this.isCandleDay}, candle: ${this.checker()}`);
    }
    #importDates() {
        process.env.CANDLE_DATES?.split(/\s+/).forEach((date) => {
            const [month, day, candle] = date.split(',');
            this.monthDays.push({ month: Number(month), day: Number(day), candle: candle || '🕯️' });
        })
    }

    checker() {
        return this.todayCandle;
    }
    #scheduleFunction() {
        const now = new Date(); // 当前日期和时间
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1); // 明天日期
        const msUntilMidnight = tomorrow.getTime() - now.getTime() + 5000; // 距離明天 00:00 +1000 的毫秒数
        setTimeout(() => {
            this.#scheduleFunction(); // 設定下一次定时任務
            this.#updateToday(); // 更新今天的日期
            this.#checkForCandle();// 检查是否是指定日期，如果是的话，設定 this.isCandleDay 为 true
        }, msUntilMidnight); // 設定定时器等待到明天 00:00+5秒 后執行
    }
    #updateToday() {
        const today = new Date();
        this.today = {
            Month: today.getMonth() + 1,
            Date: today.getDate()
        }
    }
}

// 使用方法：
const candleChecker = new CandleChecker(); // 初始化
// 当日期改變后，使用此方法检查今天是否是指定日期
exports.checker = () => candleChecker.checker();

