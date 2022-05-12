import { Card } from "../CardsDeclare";
import { cardSort, getCardType } from "../utils/CardUtils";

/**
 * 判断牌组点数大小(是否能压)
 */
class BaseCardPointCompare {
    get thisCards(): Array<Card> {
        return this._thisCards;
    }

    get lastCards(): Array<Card> {
        return this._lastCards;
    }

    get thisCardsType(): string {
        return this._thisCardsType;
    }

    get lastCardsType(): string {
        return this._lastCardsType;
    }

    private readonly _thisCards: Array<Card>;
    private readonly _lastCards: Array<Card>;
    private readonly _thisCardsType: string;
    private readonly _lastCardsType: string;

    /**
     * 初始化比较器
     * @param thisCards 本次出牌
     * @param lastCards 上家出牌
     */
    constructor(thisCards: Array<Card>, lastCards: Array<Card>) {
        cardSort(thisCards);
        cardSort(lastCards);
        this._thisCards = thisCards;
        this._lastCards = lastCards;
        this._thisCardsType = getCardType(this._thisCards);
        this._lastCardsType = getCardType(this._lastCards);
    }

    compare = () => {
        //火箭不能被管
        if (this._lastCardsType.includes("isRocket")) return false;
        //上家出炸弹，本家没火箭
        if (this._lastCardsType.includes("isBomb") && !this._thisCardsType.includes("isRocket")) {
            if (this._thisCardsType.includes("isBomb")) {
                //炸弹比大小
                return this._thisCards[0].num > this._lastCards[0].num;
            } else return false;
        } else {
            if (this._thisCardsType.includes(this._lastCardsType)) {
                //同牌型比大小
                switch (this._thisCardsType) {
                    case "isSingle":
                    case "isDouble":
                    case "isTriple":
                    case "isBomb":
                        return this._thisCards[0].num > this._lastCards[0].num;
                    case "isTripleAndSingle":

                    case "isTripleAndDouble":
                }
            } else return false;
        }
    };


}


export { BaseCardPointCompare };
