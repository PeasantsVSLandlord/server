import {Card, SUIT, SpecialCardName} from "../CardsDeclare";
import {Random} from "../utils/Random";

/**
 * 发牌
 * @param player 玩家人数，默认3人
 * @param cardBundleNum 发牌套数，默认1套
 * @param isShuffle 是否洗牌，默认洗
 * @param hasUniversal 是否赖子，默认否
 */
function dealCards(player: number = 3, cardBundleNum: number = 1, isShuffle: boolean = true, hasUniversal: boolean = false): Array<Array<Card>> {
    //TODO 赖子玩法、不洗牌
    //制牌
    let cardHeap: Array<Card> = [];   //牌堆
    for (let i = 0; i < cardBundleNum; i++) {
        Array.from({length: 13}, (length, i) => i).forEach(v => {
            [0, 1, 2, 3].forEach(k => {
                let card: Card = {num: v + 1, suit: SUIT[k]};
                cardHeap.push(card);
            })
        })
        cardHeap.push({num: 14, suit: SUIT[0]});
        cardHeap.push({num: 15, suit: SUIT[1]});
    }
    //发牌
    let playerCards: Array<Array<Card>> = new Array<Array<Card>>(player)  //玩家的手牌
    //WARNING：不能使用Array.fill快速填充空数组，否则会产生相同的引用
    for (let i = 0; i < playerCards.length; i++) {
        playerCards[i] = []
    }
    //洗牌
    for (let i = 0; i < 10; i++) {
        cardHeap.sort(function () {
            return (0.5 - Math.random());
        });
    }
    //发牌
    cardHeap.forEach((v, i) => {
        playerCards[i % player].push(v);
    })

    //TODO 排序
    console.log(playerCards)
    return playerCards;
}

dealCards()
