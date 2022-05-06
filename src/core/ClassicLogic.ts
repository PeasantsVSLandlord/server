/**
 * 经典模式出牌逻辑
 * 进来的牌要先从大到小排过序
 */
import { Card } from "./CardsDeclare";

interface CheckCards {
    (cards: Array<Card>): boolean;
}

/**
 * 递归判断数组是否连续
 * @param arr 原数组
 * @param i 初值应为数组.length-1
 */
function isGrowUp(arr: number[], i: number) {
    if (i == 0) {
        return true;
    } else {
        if (arr[i] > arr[i - 1] && arr[i] - arr[i - 1] === 1) {
            return isGrowUp(arr, i - 1);
        } else {
            return false;
        }
    }
}

//单张
const isSingle: CheckCards = cards => {
    return cards.length === 1;
};

//对子
const isDouble: CheckCards = cards => {
    if (cards.length === 2) {
        return cards[0].num === cards[1].num;
    } else return false;
};

//火箭(王炸)
const isRocket: CheckCards = cards => {
    if (cards.length === 2) {
        const cardPoints = cards.map(v => v.num);
        return cardPoints.includes(14) && cardPoints.includes(15);
    } else return false;
};

//三条
const isTriple: CheckCards = cards => {
    if (cards.length === 3) {
        const triple = cards.map(v => v.num);
        return triple.every(item => item === triple[0]);
    } else return false;
};

//三带一
const isTripleAndSingle: CheckCards = cards => {
    if (cards.length === 4) {
        let triple = cards.map(v => v.num);
        let single = triple.splice(0, 1);
        return triple[0] !== single[0] && triple.every(item => item === triple[0]);
    } else return false;
};

//三带一对
const isTripleAndDouble: CheckCards = cards => {
    if (cards.length === 5) {
        let triple = cards.map(v => v.num);
        let _double = triple.splice(0, 2);
        return triple[0] !== _double[0]
            && triple.every(item => item === triple[0])
            && _double[0] === _double[1];
    } else return false;
};

//炸弹(四张)
const isBomb: CheckCards = cards => {
    if (cards.length === 4) {
        const quad = cards.map(v => v.num);
        return quad.every(item => item === quad[0]);
    } else return false;
};

//无翼飞机(N个连续数的三张, N>1)
const isNoWingPlane: CheckCards = cards => {
    if (cards.length >= 6 && cards.length % 3 === 0) {
        let points = cards.map(v => v.num);
        let splicesArr = [];
        //3张牌切一组
        while (points.length > 0) {
            let splices = points.splice(0, 3);
            splicesArr.push(splices);
        }
        let flag = true;
        //判断是否有非三条
        splicesArr.forEach(v => {
            if (!v.every(item => item === v[0])) {
                flag = false;
            }
        });
        //判断所有三连牌是否递增
        let splicesIndex = splicesArr.map(v => v[0]);
        console.log(splicesIndex);
        if (!isGrowUp(splicesIndex, splicesIndex.length - 1)) {
            flag = false;
        }
        return flag;
    } else return false;
};

