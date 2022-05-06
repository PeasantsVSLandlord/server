// shuffle洗牌,cut切牌,deal发牌,sort理牌,draw摸牌,play打出,discard弃牌

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
 * 牌值映射
 */
export const CardMap = ["", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "2", "LJoker", "BJoker"];

/**
 * 扑克定义
 */
export interface Card {
    name: string, //显示点数
    num: number,  //实际点数
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
