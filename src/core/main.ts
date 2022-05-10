import { dealCards } from "./CardsManage/DealCards";
import { ClassicLogic } from "./ClassicLogic";
import { cardSort, isDecrease } from "./utils/CardUtils";

// console.log(dealCards())


let cards = [
    { name: 'A', num: 12, suit: 'DIAMOND' },
    { name: 'A', num: 12, suit: 'DIAMOND' },
    { name: 'A', num: 12, suit: 'DIAMOND' },
    { name: 'A', num: 12, suit: 'DIAMOND' },
    { name: 'K', num: 11, suit: 'DIAMOND' },
    { name: 'K', num: 11, suit: 'DIAMOND' },
    { name: 'K', num: 11, suit: 'DIAMOND' },
    { name: 'K', num: 11, suit: 'DIAMOND' },
    // { name: 'Q', num: 10, suit: 'HEART' },
    { name: 'Q', num: 10, suit: 'HEART' },
    { name: 'Q', num: 10, suit: 'HEART' },
    { name: 'J', num: 9, suit: 'HEART' },
    { name: 'J', num: 9, suit: 'HEART' },
    { name: '10', num: 8, suit: 'HEART' },
    { name: '10', num: 8, suit: 'HEART' },
    { name: '9', num: 7, suit: 'HEART' },
    { name: '9', num: 7, suit: 'HEART' },
];
const baseLogic = new ClassicLogic(cards);

Object.getOwnPropertyNames(baseLogic).forEach(k => {
    if (k !== "cards") console.log(k, baseLogic[k]());
});

baseLogic.isSmallPlane(cards)
