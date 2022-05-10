/**
 * 经典模式出牌逻辑
 * 进来的牌在构造器内先从大到小排序
 */
import { Card } from "./CardsDeclare";
import { cardSort, isDecrease, isIncludeTwoAndJokers, isPlaneTools, isStraightN } from "./utils/CardUtils";


interface CheckCards {
    (cards: Array<Card>): boolean;
}

class ClassicLogic {
    private readonly cards: Array<Card>;

    constructor(cards: Array<Card>) {
        cardSort(cards);
        this.cards = cards;
    }

    //单张
    isSingle: CheckCards = () => {
        return this.cards.length === 1;
    };
    //对子
    isDouble: CheckCards = () => {
        if (this.cards.length === 2) {
            return this.cards[0].num === this.cards[1].num;
        } else return false;
    };
    //火箭(王炸)
    isRocket: CheckCards = () => {
        if (this.cards.length === 2) {
            const cardPoints = this.cards.map(v => v.num);
            return cardPoints.includes(14) && cardPoints.includes(15);
        } else return false;
    };

    //三条
    isTriple: CheckCards = () => {
        if (this.cards.length === 3) {
            const triple = this.cards.map(v => v.num);
            return triple.every(item => item === triple[0]);
        } else return false;
    };

    //三带一
    isTripleAndSingle: CheckCards = () => {
        if (this.cards.length === 4) {
            let triple = this.cards.map(v => v.num);
            const single = triple.splice(triple.length - 1);
            return triple[0] !== single[0] && triple.every(item => item === triple[0]);
        } else return false;
    };

    //三带一对
    isTripleAndDouble: CheckCards = () => {
        if (this.cards.length === 5) {
            let triple = this.cards.map(v => v.num);
            const _double = triple.splice(triple.length - 2);
            return triple[0] !== _double[0]
                && triple.every(item => item === triple[0])
                && _double[0] === _double[1];
        } else return false;
    };

    //炸弹(四张)
    isBomb: CheckCards = () => {
        if (this.cards.length === 4) {
            const quad = this.cards.map(v => v.num);
            return quad.every(item => item === quad[0]);
        } else return false;
    };

    //无翼飞机(N个连续数的三张, N>1)
    isNoWingPlane: CheckCards = () => {
        return isStraightN(3, this.cards);
    };

    //四带两张
    isQuadAndTwoSingle: CheckCards = () => {
        if (this.cards.length === 6) {
            let quad = this.cards.map(v => v.num);
            const others = quad.splice(quad.length - 2);
            return quad[0] !== others[0]
                && quad.every(item => item === quad[0])
                && others[0] === others[1];
        } else return false;
    };

    //四带两对
    isQuadAndTwoDouble: CheckCards = () => {
        if (this.cards.length === 8) {
            let quad = this.cards.map(v => v.num);
            const double1 = quad.splice(quad.length - 2);
            const double2 = quad.splice(quad.length - 2);
            return double1[0] === double1[1]
                && double2[0] === double2[1]
                && double1[0] !== double2[0]
                && quad.every(item => item === quad[0]);
        } else return false;
    };

    //顺子
    isStraight: CheckCards = () => {
        if (this.cards.length >= 5) {
            let straight = this.cards.map(v => v.num);
            if (isIncludeTwoAndJokers(straight)) return false;
            let flag = true;
            if (!isDecrease(straight, straight.length - 1)) {
                flag = false;
            }
            return flag;
        } else return false;
    };

    //连对
    isDoubleStraight: CheckCards = () => {
        return isStraightN(2, this.cards);
    };

    //小飞机(三带一*2N)
    isSmallPlane: CheckCards = () => {
        if (this.cards.length >= 8 && this.cards.length % 4 === 0) {
            let points: Array<number> = this.cards.map(v => v.num);
            if (isIncludeTwoAndJokers(points)) return false;
            let splicesArr: Array<Array<number>> = isPlaneTools(points);
            let tripleIndexes: Array<number> = [];
            let others: Array<Array<number>> = [];
            splicesArr.forEach(v => {
                v.length === 3 ? tripleIndexes.push(v[0]) : others.push(v);
            });
            //三条必须连续
            if (!isDecrease(tripleIndexes, tripleIndexes.length - 1)) return false;
            //单数必须与三条对数匹配
            return tripleIndexes.length === others.flat(1).length;
        } else return false;
    };
    //大飞机(三带二*2N)
    isBigPlane: CheckCards = () => {
        if (this.cards.length >= 10 && this.cards.length % 5 === 0) {
            let points: Array<number> = this.cards.map(v => v.num);
            if (isIncludeTwoAndJokers(points)) return false;
            let splicesArr: Array<Array<number>> = isPlaneTools(points);
            let tripleIndexes: Array<number> = [];
            let otherDoubles: Array<Array<number>> = [];
            splicesArr.forEach(v => {
                v.length === 3 ? tripleIndexes.push(v[0]) : otherDoubles.push(v);
            });
            //三条必须连续
            if (!isDecrease(tripleIndexes, tripleIndexes.length - 1)) return false;
            //其余牌必须全是对子
            for (let i = 0; i < otherDoubles.length; i++) {
                let toTest = otherDoubles[i];
                if (toTest.length !== 2) {
                    return false;
                } else if (toTest[0] !== toTest[1]) {
                    return false;
                }
            }
            //对子数必须与三条数匹配
            return tripleIndexes.length === otherDoubles.length;
        } else return false;
    };

    //无翼航天飞机
    isNoWingSpaceShuttle: CheckCards = () => {
        return isStraightN(4, this.cards);
    };

    //小航天飞机(N对四条+N或2N个单牌, N>2)
    isSmallSpaceShuttle: CheckCards = () => {
        if (this.cards.length >= 10 && (this.cards.length % 5 === 0 || this.cards.length % 6 === 0)) {
            let points: Array<number> = this.cards.map(v => v.num);
            if (isIncludeTwoAndJokers(points)) return false;
            let splicesArr: Array<Array<number>> = isPlaneTools(points);
            let quadIndexes: Array<number> = [];
            let others: Array<Array<number>> = [];
            splicesArr.forEach(v => {
                v.length === 4 ? quadIndexes.push(v[0]) : others.push(v);
            });
            //四条必须连续
            if (!isDecrease(quadIndexes, quadIndexes.length - 1)) return false;
            //单牌数N或2N必须与四条数匹配
            let othersLength = others.flat(1).length;
            return othersLength === quadIndexes.length * 2 || othersLength === quadIndexes.length;
        } else return false;
    };

    //大航天飞机(N对四条+N或2N个对子, N>2)
    isBigSpaceShuttle: CheckCards = () => {
        if (this.cards.length >= 12 && (this.cards.length % 6 === 0 || this.cards.length % 8 === 0)) {
            let points: Array<number> = this.cards.map(v => v.num);
            if (isIncludeTwoAndJokers(points)) return false;
            let splicesArr: Array<Array<number>> = isPlaneTools(points);
            let quadIndexes: Array<number> = [];
            let otherDoubles: Array<Array<number>> = [];
            splicesArr.forEach(v => {
                v.length === 4 ? quadIndexes.push(v[0]) : otherDoubles.push(v);
            });
            //四条必须连续
            if (!isDecrease(quadIndexes, quadIndexes.length - 1)) return false;
            //其余牌必须全是对子
            for (let i = 0; i < otherDoubles.length; i++) {
                let toTest = otherDoubles[i];
                if (toTest.length !== 2) {
                    return false;
                } else if (toTest[0] !== toTest[1]) {
                    return false;
                }
            }
            //对子数N或2N必须与四条数匹配
            return otherDoubles.length === quadIndexes.length * 2 || otherDoubles.length === quadIndexes.length;
        } else return false;
    };
}


export { ClassicLogic };
