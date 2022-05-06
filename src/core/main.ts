import { cardSort, dealCards } from "./CardsManage/DealCards";
import { BaseLogic } from "./ClassicLogic";




// dealCards()


let cards = [
    { name: "Q", num: 10, suit: "SPADE" },
    // { name: "2", num: 13, suit: "CLUB" },
    { name: "Q", num: 10, suit: "DIAMOND" },
    { name: "Q", num: 10, suit: "CLUB" }
];
cardSort(cards)


let baseLogic = new BaseLogic();
console.log(baseLogic.isSingle(cards))

