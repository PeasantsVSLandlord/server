/**
 * 经典模式出牌逻辑
 * 进来的牌在构造器内先从大到小排序
 */
import { Card } from "./CardsDeclare";
import { cardSort, isGrowUp } from "./utils/CardUtils";

/**
 * 判断N连对
 * @param num 连对规则数（无翼飞机=3，连对=2...）
 * @param cards 牌组
 */
function isStraightN(num, cards) {
    if (cards.length >= 6 && cards.length % num === 0) {
        let points = cards.map(v => v.num);
        if (points.includes(13) || points.includes(14) || points.includes(15)) {
            return false;
        }
        let splicesArr = [];
        //3张牌切一组
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
        if (!isGrowUp(splicesIndex, splicesIndex.length - 1)) {
            flag = false;
        }
        return flag;
    } else return false;
}

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
            const single = triple.splice(0, 1);
            return triple[0] !== single[0] && triple.every(item => item === triple[0]);
        } else return false;
    };

    //三带一对
    isTripleAndDouble: CheckCards = () => {
        if (this.cards.length === 5) {
            let triple = this.cards.map(v => v.num);
            const _double = triple.splice(0, 2);
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

    //四带二
    isQuadAndTwoSingle: CheckCards = () => {
        if (this.cards.length === 6) {
            let quad = this.cards.map(v => v.num);
            const others = quad.splice(0, 2);
            return quad[0] !== others[0]
                && quad.every(item => item === quad[0])
                && others[0] === others[1];
        } else return false;
    };

    //四带两对
    isQuadAndTwoDouble: CheckCards = () => {
        if (this.cards.length === 8) {
            let quad = this.cards.map(v => v.num);
            const double1 = quad.splice(0, 2);
            const double2 = quad.splice(0, 2);
            return double1[0] === double1[1]
                && double2[0] === double1[1]
                && quad.every(item => item === quad[0]);
        } else return false;
    };

    //顺子
    isStraight: CheckCards = () => {
        if (this.cards.length >= 5) {
            let straight = this.cards.map(v => v.num);
            if (straight.includes(13) || straight.includes(14) || straight.includes(15)) {
                return false;
            }
            let flag = true;
            if (!isGrowUp(straight, straight.length - 1)) {
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
            let points = this.cards.map(v => v.num);
            if (points.includes(13) || points.includes(14) || points.includes(15)) {
                return false;
            }
            let splicesArr = [];
            //
        } else return false;
    };
}


export { ClassicLogic };
