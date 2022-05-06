/**
 * 花色声明
 */
export enum SUIT {
    SPADE, //黑桃
    HEART, //红心
    CLUB,  //梅花
    DIAMOND //方块
}

/**
 * 特殊花色
 * X = 10, S = 小王, Z = 大王
 */
export enum SpecialCardName {
    A = 1,
    X = 10,
    J, Q, K,
    S = 14, Z = 15
}

/**
 * 扑克定义
 */
export interface Card {
    num: number,  //点数
    suit: string,   //花色
    isUniversal?: boolean  //是否赖子
}

/**
 * 发牌结构
 */
export interface DealCards {
    playerCards: Array<Array<Card>>,  //玩家手牌
    lordCards: Array<Card>,  //地主牌
}
