import { Card } from "../CardsDeclare";
import { BaseCardTypeChecker } from "../logics/BaseCardTypeChecker";

export function isNotUndefined(obj: any): boolean {
    return typeof obj !== "undefined";
}

/**
 * 牌组排序, 从大到小
 * @param cards 牌组(手牌、地主牌等)
 */
export function cardSort(cards: Array<Card>) {
    // 原地排序强于冒泡排序，所以ts-ignore大于bubbleSort()
    // @ts-ignore
    cards.sort((a, b) => {
        if (a.num > b.num) {
            return -1;
        } else if (a.num < b.num) {
            return 1;
        } else return 0;
    });
}

/**
 * 递归判断数组是否递减
 * @param arr 原数组
 * @param i 初值应为数组.length-1
 */
export function isDecrease(arr: number[], i: number) {
    if (i == 0) {
        return true;
    } else {
        if (arr[i] < arr[i - 1] && arr[i - 1] - arr[i] === 1) {
            return isDecrease(arr, i - 1);
        } else {
            return false;
        }
    }
}

/**
 * 递归判断数组是否递增
 * @param arr 原数组
 * @param i 初值应为数组.length-1
 */
export function isIncrease(arr: number[], i: number) {
    if (i == 0) {
        return true;
    } else {
        if (arr[i] > arr[i - 1] && arr[i] - arr[i - 1] === 1) {
            return isIncrease(arr, i - 1);
        } else {
            return false;
        }
    }
}

/**
 * 判断N连对
 * @param num 连对规则数（航天飞机=4，无翼飞机=3，连对=2...）
 * @param cards 牌组
 * @param rate 初始牌基底倍
 */
export function isStraightN(num: number, cards: Array<Card>) {
    let switcher = 6;
    if (num === 4) switcher = 8;
    if (cards.length >= switcher && cards.length % num === 0) {
        let points = cards.map(v => v.num);
        if (isIncludeTwoAndJokers(points)) return false;
        let splicesArr = [];
        //N张牌切一组
        while (points.length > 0) {
            let splices = points.splice(0, num);
            splicesArr.push(splices);
        }
        let flag = true;
        //判断是否有非N条
        splicesArr.forEach(v => {
            if (!v.every(item => item === v[0])) {
                flag = false;
            }
        });
        //判断所有N连牌是否递减
        let splicesIndex = splicesArr.map(v => v[0]);
        if (!isDecrease(splicesIndex, splicesIndex.length - 1)) {
            flag = false;
        }
        return flag;
    } else return false;
}

/**
 * 判断X带Y牌型
 * @param cards 牌组
 * @param x 主带牌张
 * @param y 被带牌张
 * @param sum 满足规则的最小牌数
 * @param a x需要几组
 * @param b b需要几组
 */
export function isXWithY(cards: Array<Card>, x: number, y: number, sum: number = x + y, a: number = 1, b: number = 1): boolean {
    if (cards.length === sum) {
        let res = checkCardsN(cards);
        if (isNotUndefined(res[x.toString()]) && isNotUndefined(res[y.toString()])) {
            return res[x.toString()].length === a && res[y.toString()].length === b;
        }
    } else return false;
}

/**
 * 判断飞机手牌切割
 * @param points
 */
export function isPlaneTools(points): Array<Array<number>> {
    let sArr: Array<Array<number>> = [];
    points.forEach(v => {
        if (sArr.length === 0) {
            sArr.push([v]);
        } else {
            let temp: Array<number> = sArr[sArr.length - 1];
            if (v === temp[temp.length - 1]) {
                temp.push(v);
            } else sArr.push([v]);
        }
    });
    return sArr;
}

/**
 * 判断是否包含2和大小王
 * @param points
 */
export function isIncludeTwoAndJokers(points: Array<number>): boolean {
    return points.includes(13) || points.includes(14) || points.includes(15);
}

/**
 * 检测牌组类别(单、对子、炸弹...)
 * @param cards
 */
export function getCardType(cards: Array<Card>): string {
    const cardsChecker = new BaseCardTypeChecker(cards);
    let cardType: string;
    Object.getOwnPropertyNames(cardsChecker).forEach(k => {
        if (k !== "cards") {
            if (cardsChecker[k]()) cardType = k;
        }
    });
    return cardType;
}

//查询数字在数组中出现次数
export function searchFrequency(arr: Array<number>, index: number): number {
    return arr.lastIndexOf(index) - arr.indexOf(index) + 1;
}

/**
 * 列举牌组的N对子明细(最多四张)
 * 如 10,10,10,10,10,10会被认为4张10加一组对子10
 */
export function checkCardsN(cards: Array<Card>) {
    cardSort(cards);
    const points = cards.map(v => v.num);
    let cacheArr: Array<number> = [];
    let results = {};
    points.forEach((num, index) => {
        if (index === 0) {
            cacheArr.push(num);
        } else if (index === points.length - 1) {
            if (num === cacheArr[cacheArr.length - 1]) {
                cacheArr.push(num);
            } else {
                if (typeof results[1] === "undefined") {
                    results[1] = [];
                }
                results[1].push([num]);
            }
            if (typeof results[cacheArr.length] === "undefined") {
                results[cacheArr.length] = [];
            }
            results[cacheArr.length].push(cacheArr);
        } else {
            if (cacheArr.length < 4 && num === cacheArr[cacheArr.length - 1]) {
                cacheArr.push(num);
            } else {
                if (typeof results[cacheArr.length] === "undefined") {
                    results[cacheArr.length] = [];
                }
                results[cacheArr.length].push(cacheArr);
                cacheArr = [num];
            }
        }
    });
    return results;
}
