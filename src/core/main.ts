import { cardSort, dealCards } from "./CardsManage/DealCards";
import { ClassicLogic } from "./ClassicLogic";


// dealCards()


let cards = [
    { name: "Q", num: 10, suit: "SPADE" },
    // { name: "2", num: 13, suit: "CLUB" },
    { name: "Q", num: 10, suit: "DIAMOND" },
    { name: "Q", num: 10, suit: "CLUB" }
];
cardSort(cards);


let baseLogic = new ClassicLogic();
Object.getOwnPropertyNames(baseLogic).forEach(k => {
    console.log(k, baseLogic[k](cards));
});

