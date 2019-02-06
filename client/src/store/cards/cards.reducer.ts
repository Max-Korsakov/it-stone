import { Status } from 'models';

import { CardsActionTypes, CardsActions } from './cards.action';
import { initialState } from './cards.initial';
import { CardsState } from './interfaces';

export const cardsReducer = (
  state: CardsState = initialState,
  action: CardsActions
): CardsState => {
  switch (action.type) {
    case CardsActionTypes.LoadCardsFromSocket:
      return {
        ...state
      };

    case CardsActionTypes.CardsLoadedFromSocket:
      return {
        ...state,
        myCards: action.payload,
        enemyCards: action.payload
      };

    case CardsActionTypes.MoveMyCardsWithinArray:
      return {
        ...state,
        myCards: [...state.myCards.splice(
          action.payload.currentIndex, 0, state.myCards.splice(action.payload.previousIndex, 1)[0]
        ), ...state.myCards]
      };

    case CardsActionTypes.MoveEnemyCardsWithinArray:
      return {
        ...state,
        enemyCards: [...state.enemyCards.splice(
          action.payload.currentIndex, 0, state.enemyCards.splice(action.payload.previousIndex, 1)[0]
        ), ...state.enemyCards]
      };

    case CardsActionTypes.MoveMyActiveCardsWithinArray:
      return {
        ...state,
        myActiveCards: [...state.myActiveCards.splice(
          action.payload.currentIndex, 0, state.myActiveCards.splice(action.payload.previousIndex, 1)[0]
        ), ...state.myActiveCards]
      };

    case CardsActionTypes.MoveEnemyActiveCardsWithinArray:
      return {
        ...state,
        enemyActiveCards: [...state.enemyActiveCards.splice(
          action.payload.currentIndex, 0, state.enemyActiveCards.splice(action.payload.previousIndex, 1)[0]
        ), ...state.enemyActiveCards]
      };

    case CardsActionTypes.GotMyBattleCard:
      return {
        ...state,
        myActiveCards: [...state.myActiveCards, ...action.payload]
      };

    case CardsActionTypes.GotEnemyBattleCard:
      return {
        ...state,
        enemyActiveCards: [...state.enemyActiveCards, ...action.payload]
      };

      case CardsActionTypes.DeleteCard:
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

      case CardsActionTypes.UploadCard:
      const newCard = action.payload.card;
      return {
        ...state,
        myCards: [...state.myCards, newCard],
        selectedCardId: newCard.id
      };

      case CardsActionTypes.ChangeSelectedCardId:
      const newSelectedCardId = action.payload.id;
      return {
        ...state,
        selectedCardId: newSelectedCardId
      };

    default:
      return state;
  }
};
