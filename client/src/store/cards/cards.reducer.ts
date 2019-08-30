import { Card, CardForStart, Status } from 'models';

import { CardsActionTypes, CardsActions } from './cards.action';
import { initialState } from './cards.initial';
import { CardsState } from './interfaces';

export const cardsReducer = (
  state: CardsState = initialState,
  action: CardsActions
): CardsState => {
  switch (action.type) {
    case CardsActionTypes.LoadCards:
      return {
        ...state,
        status: Status.Init
      };

    case CardsActionTypes.LoadCardsSuccess:
      return {
        ...state,
        status: Status.Success,
        myCards: action.payload,
        enemyCards: [...state.cards, ...action.payload]
      };

    case CardsActionTypes.LoadCardsError:
      return {
        ...state,
        status: Status.Error
      };

    case CardsActionTypes.GetMyNewCards:
      const cardsArrToMe = state.deck.splice(
        state.deck.length - action.payload.amount,
        action.payload.amount
      );
      return {
        ...state,
        deck: state.deck
      };

    case CardsActionTypes.GetMyFirstCards:
      const cardsForChosen = state.myCards.splice(
        state.myCards.length - action.payload,
        action.payload
      );
      console.log(cardsForChosen)
      const cardsInPopUp: CardForStart[] = [];
      cardsForChosen.forEach(function(card: Card): void {
        const newCardInPopUp: CardForStart = { card, isChosen: false };
        cardsInPopUp.push(newCardInPopUp);
      });
      console.log(cardsInPopUp)
      return {
        ...state,
        myCardsForChoosingAtStart: [...cardsInPopUp]
      };

    case CardsActionTypes.ChangeMyFirstCards:
      const myNewDeck = state.myCards;
      const cardsThatIWantToChange = action.payload.filter(
        (item, index, array) => {
          return item.isChosen === true;
        }
      );

      const cardsThatIWantToKeep = action.payload.filter(
        (item, index, array) => {
          return item.isChosen === false;
        }
      );

      cardsThatIWantToChange.forEach(card => myNewDeck.unshift(card.card)); // temporary algoritn, requires to random place item adding
      cardsThatIWantToKeep.forEach(card => myNewDeck.push(card.card));
      return {
        ...state,
        myCards: [...myNewDeck],
        myCardsForChoosingAtStart: [...state.myCardsForChoosingAtStart, ...[]]
      };

    case CardsActionTypes.GetEnemyNewCards:
      return {
        ...state,
        deck: state.deck,
        enemyCardCount: state.enemyCardCount + action.payload.amount
      };

    case CardsActionTypes.MoveMyCardsWithinArray:
      return {
        ...state,
        myCardsInHand: [
          ...state.myCardsInHand.splice(
            action.payload.currentIndex,
            0,
            state.myCardsInHand.splice(action.payload.previousIndex, 1)[0]
          ),
          ...state.myCardsInHand
        ]
      };

    case CardsActionTypes.MoveEnemyCardsWithinArray:
      return {
        ...state,
        enemyCards: [
          ...state.enemyCards.splice(
            action.payload.currentIndex,
            0,
            state.enemyCards.splice(action.payload.previousIndex, 1)[0]
          ),
          ...state.enemyCards
        ]
      };

    case CardsActionTypes.MoveMyActiveCardsWithinArray:
      console.log('move with array')
      console.log(event)
      return {
        ...state,
        myActiveCards: [
          ...state.myActiveCards.splice(
            action.payload.currentIndex,
            0,
            state.myActiveCards.splice(action.payload.previousIndex, 1)[0]
          ),
          ...state.myActiveCards
        ]
      };

    case CardsActionTypes.MoveEnemyActiveCardsWithinArray:
      return {
        ...state,
        enemyActiveCards: [
          ...state.enemyActiveCards.splice(
            action.payload.currentIndex,
            0,
            state.enemyActiveCards.splice(action.payload.previousIndex, 1)[0]
          ),
          ...state.enemyActiveCards
        ]
      };

    case CardsActionTypes.GetMyCardInHand:
      const myHandCard = state.myCards.filter(
        (item, index, array) => item === array[array.length - 1]
      );

      const myDeckCardsArray = state.myCards.filter((item, index, array) => {
        return item !== myHandCard[0];
      });
      return {
        ...state,
        myCardsInHand: [...state.myCardsInHand, ...myHandCard].reverse(),
        myCards: myDeckCardsArray
      };

    case CardsActionTypes.GetMyBattleCard:
     
      const myActiveCardsArray = state.myCardsInHand.filter(
        (item, index, array) => {
          return array.indexOf(item) === action.payload.event.previousIndex;
        }
      );
      const myUpdatedCards = state.myCardsInHand.filter(
        (item, index, array) => {
          return array.indexOf(item) !== action.payload.event.previousIndex;
        }
      );
      myActiveCardsArray[0].effects.cardWasAddedOnMove = action.payload.move;

     let myActiveCardsCopy = [...state.myActiveCards]
     myActiveCardsCopy.splice(action.payload.event.currentIndex,0,myActiveCardsArray[0])
     console.log(myActiveCardsCopy)
      return {
        ...state,
        myActiveCards: myActiveCardsCopy,
        myCardsInHand: myUpdatedCards
        
      };

    case CardsActionTypes.GetEnemyBattleCard:
      const enemyCardArray = state.enemyCards.filter(item => {
        return item.hp > 0;
      });
      const temporaryEnemyBattleCards = enemyCardArray.splice(0, 5);

      //  const enemyActiveCardsArray = state.enemyCards.filter(
      //     (item, index, array) => {
      //      return array.indexOf(item) === action.payload.previousIndex;
      //    }
      //  );

      //  const enemyUpdatedCards = state.enemyCards.filter(
      //    (item, index, array) => {
      //     return array.indexOf(item) !== action.payload.previousIndex;
      //    }
      //  );
      return {
        ...state,
        /*[
          ...state.enemyActiveCards,
    /     ...enemyActiveCardsArray
        ].reverse()*/
        enemyActiveCards: temporaryEnemyBattleCards,
        //  enemyCards: enemyUpdatedCards
        enemyCards: enemyCardArray
      };

    case CardsActionTypes.IncreaceMyCardAttack:
    
      return {
        ...state,
        myActiveCards: action.payload.array
      };

    /*   case CardsActionTypes.DecreaceEnemyCardHP:
      const myAttackCard = state.myActiveCards.filter(item => {
        return item._id === action.payload.myCardId;
      });
      const enemyAttackedCard = state.enemyActiveCards.filter(item => {
        return item._id === action.payload.enemyCardId;
      });

      let enemyActiveCardsNewState = state.enemyActiveCards;   //переделать, мутирует стейт
      enemyActiveCardsNewState[
        enemyActiveCardsNewState.indexOf(enemyAttackedCard[0])
      ].hp =
        enemyActiveCardsNewState[
          enemyActiveCardsNewState.indexOf(enemyAttackedCard[0])
        ].hp - myAttackCard[0].damage;

      enemyActiveCardsNewState = enemyActiveCardsNewState.filter(item => {
        return item.hp > 0;
      });
      return {
        ...state,
        enemyActiveCards: enemyActiveCardsNewState
      };*/

    case CardsActionTypes.DecreaceMyCardHPWithMyAttack:
      const myCard = state.myActiveCards.filter(item => {
        return item._id === action.payload.myCardId;
      });
      const enemyCard = state.enemyActiveCards.filter(item => {
        return item._id === action.payload.enemyCardId;
      });

      const otherEnemyActiveCards = state.enemyActiveCards.filter(item => {
        return item._id !== action.payload.enemyCardId;
      });
      const enemyCardIndex = state.enemyActiveCards.indexOf(enemyCard[0]);
      const myCardIndex = state.myActiveCards.indexOf(myCard[0]);
      const otherActiveCards = state.myActiveCards.filter(item => {
        return item._id !== action.payload.myCardId;
      });
console.log(myCardIndex)
      myCard[0].hp = myCard[0].hp - enemyCard[0].damage;
      otherActiveCards.splice(myCardIndex, 0, myCard[0]);

      enemyCard[0].hp = enemyCard[0].hp - myCard[0].damage;
      otherEnemyActiveCards.splice(enemyCardIndex, 0, enemyCard[0]);

      return {
        ...state,
        myActiveCards: otherActiveCards,
        enemyActiveCards: otherEnemyActiveCards
      };

    case CardsActionTypes.DeleteMyCardFromBattle:
      const myPrunedIds = state.myActiveCards.filter(item => {
        return item.id !== action.payload.id;
      });
      return {
        ...state,
        myActiveCards: myPrunedIds
      };

    case CardsActionTypes.DeleteEnemyCardFromBattle:
      const enemyPrunedIds = state.enemyActiveCards.filter(item => {
        return item.id !== action.payload.id;
      });
      return {
        ...state,
        enemyActiveCards: enemyPrunedIds
      };

    case CardsActionTypes.DecrementEnemyCardCount:
      if (state.enemyCardCount > 0) {
        const enemyPrunedIds = state.enemyCardCount--;
        return {
          ...state,
          enemyCardCount: enemyPrunedIds
        };
      }
      return {
        ...state
      };

    case CardsActionTypes.DeleteCardSuccess:
      const prunedId = state.myCards.filter(item => {
        return item.id !== action.payload.id;
      });
      let id: number;
      if (state.myCards[0].id === action.payload.id) {
        if (!state.myCards[1]) {
          id = 100;
        } else {
          id = state.myCards[1].id;
        }
      } else {
        id = state.myCards[0].id;
      }
      return {
        ...state,
        myCards: prunedId,
        selectedCardId: id
      };

    case CardsActionTypes.UploadCardSuccess:
      const newCard = action.payload.card;
      return {
        ...state,
        myCards: [...state.myCards, newCard],
        selectedCardId: newCard.id
      };

    case CardsActionTypes.UpdateCardSuccess:
      return {
        ...state,
        status: Status.Success
      };

    case CardsActionTypes.ChangeSelectedCardId:
      const newSelectedCardId = action.payload.id;
      return {
        ...state,
        selectedCardId: newSelectedCardId
      };

    // case CardsActionTypes.ChangeCardEffects:
    //   return {
    //     ...state,
    //     myActiveCards: state.myActiveCards.map(card => {
    //       if (card.id === action.payload.id) {
    //         return { ...card, effects: action.payload.effects }
    //       }
    //       return card
    //     })
    //   }

    default:
      return state;
  }
};
