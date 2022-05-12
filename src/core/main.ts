import { dealCards } from "./CardsManage/DealCards";
import { BaseCardTypeChecker } from "./logics/BaseCardTypeChecker";
import { cardSort, getCardType, isDecrease } from "./utils/CardUtils";
import { BaseCardPointCompare } from "./logics/BaseCardPointCompare";

// console.log(dealCards())


let cards = [
    { name: "A", num: 12, suit: "DIAMOND" },
    { name: "A", num: 12, suit: "DIAMOND" },
    { name: "A", num: 12, suit: "DIAMOND" },
    { name: "A", num: 12, suit: "DIAMOND" },
    { name: "K", num: 11, suit: "DIAMOND" },
    { name: "K", num: 11, suit: "DIAMOND" },
    { name: "K", num: 11, suit: "DIAMOND" },
    { name: "K", num: 11, suit: "DIAMOND" },
    // { name: 'Q', num: 10, suit: 'HEART' },
    { name: "Q", num: 10, suit: "HEART" },
    { name: "Q", num: 10, suit: "HEART" },
    { name: "J", num: 9, suit: "HEART" },
    { name: "J", num: 9, suit: "HEART" },
    { name: "10", num: 8, suit: "HEART" },
    { name: "10", num: 8, suit: "HEART" },
    { name: "9", num: 7, suit: "HEART" },
    { name: "9", num: 7, suit: "HEART" }
];
let cards1 = [
    { name: "A", num: 12, suit: "DIAMOND" },
    { name: "A", num: 12, suit: "DIAMOND" },
    { name: "A", num: 12, suit: "DIAMOND" },
    { name: "A", num: 12, suit: "DIAMOND" },
];
let cards2 = [
    { name: "Q", num: 10, suit: "HEART" },
    { name: "Q", num: 10, suit: "HEART" },
    { name: "Q", num: 10, suit: "HEART" },
    // { name: "Q", num: 10, suit: "HEART" },
    { name: "J", num: 9, suit: "DIAMOND" },
    { name: "J", num: 9, suit: "DIAMOND" },
    { name: "J", num: 9, suit: "DIAMOND" },
    // { name: "J", num: 9, suit: "DIAMOND" },
    { name: "10", num: 8, suit: "HEART" },
    { name: "9", num: 7, suit: "HEART" },

]
console.log(getCardType(cards2))
// const compare = new BaseCardPointCompare(cards, cards1)
// console.log(compare.compare())

