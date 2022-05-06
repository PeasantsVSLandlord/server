import { Card, SUIT, DealCards, CardMap } from "../CardsDeclare";

/**
 * 发牌
 * @param player 玩家人数，默认3人
 * @param cardBundleNum 发牌套数，默认1套
 * @param isShuffle 是否洗牌，默认洗
 */
export function dealCards(player: number = 3, cardBundleNum: number = 1, isShuffle: boolean = true): DealCards {
    //TODO 不洗牌
    //制牌
    let cardHeap: Array<Card> = [];   //牌堆
    for (let i = 0; i < cardBundleNum; i++) {
        Array.from({ length: 13 }, (length, i) => i).forEach(v => {
            [0, 1, 2, 3].forEach(k => {
                let card: Card = { name: CardMap[v + 1], num: v + 1, suit: SUIT[k] };
                cardHeap.push(card);
            });
        });
        cardHeap.push({ name: CardMap[14], num: 14, suit: SUIT[0] });
        cardHeap.push({ name: CardMap[15], num: 15, suit: SUIT[1] });
    }
    //发牌
    //WARNING：不能使用Array.fill快速填充空数组，否则会产生相同的引用
    //错误示范：new Array<Array<Card>>(player).fill([])
    let playerCards: Array<Array<Card>> = new Array<Array<Card>>(player).fill(undefined).map(() => []); //玩家的手牌
    //洗10轮牌
    for (let i = 0; i < 10; i++) {
        cardHeap.sort(() => {
            return (0.5 - Math.random());
        });
    }
    //取3张地主牌
    let lordCards = cardHeap.splice(0, 3);
    //发牌并排序
    cardHeap.forEach((v, i) => {
        playerCards[i % player].push(v);
    });
    playerCards.forEach(player => {
        cardSort(player);
    });
    cardSort(lordCards);
    console.log(lordCards)
    console.log(playerCards)
    return { playerCards, lordCards };
}

/**
 * 牌组排序
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
