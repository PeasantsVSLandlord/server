import { Card } from "../CardsDeclare";
import { BaseCardTypeChecker } from "../logics/BaseCardTypeChecker";

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
export function isStraightN(num, cards) {
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
    console.log(sArr)
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
