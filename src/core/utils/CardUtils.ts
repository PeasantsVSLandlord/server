import { Card } from "../CardsDeclare";

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
 * 递归判断数组是否连续
 * @param arr 原数组
 * @param i 初值应为数组.length-1
 */
export function isGrowUp(arr: number[], i: number) {
    if (i == 0) {
        return true;
    } else {
        if (arr[i] < arr[i - 1] && arr[i - 1] - arr[i] === 1) {
            return isGrowUp(arr, i - 1);
        } else {
            return false;
        }
    }
}
