import { Action } from '@ngrx/store';

import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { Card, Coordinates } from 'models';

export enum CardsActionTypes {
  LoadCards = '[cards] Load Cards',
  LoadCardsSuccess = '[cards] Load Cards (Success)',
  LoadCardsError = '[cards] Load Cards (Error)',
  LoadCardsFromSocket = '[cards] Load Cards From Socket',
  CardsLoadedFromSocket = '[cards] Cards Loaded From Socket',
  MoveMyCardsWithinArray = '[cards] Move My Cards Within Array',
  MoveEnemyCardsWithinArray = '[cards] Move Enemy Cards Within Array',
  MoveMyActiveCardsWithinArray = '[cards] Move My Active Cards Within Array',
  MoveEnemyActiveCardsWithinArray = '[cards] Move Enemy Active Cards Within Array',
  GetMyBattleCard = '[cards] Get My Battle Card',
  GotMyBattleCard = '[card] Got My Battle Card',
  GetEnemyBattleCard = '[cards] Get Enemy Battle Card',
  GotEnemyBattleCard = '[cards] Got Enemy Battle Card'
}

export class LoadCards implements Action {
  public readonly type = CardsActionTypes.LoadCards;
}

export class LoadCardsSuccess implements Action {
  public readonly type = CardsActionTypes.LoadCardsSuccess;

  constructor(public payload: Card[]) { }
}

export class LoadCardsError implements Action {
  public readonly type = CardsActionTypes.LoadCardsError;

  constructor(public payload: Error) { }
}

export class LoadCardsFromSocket implements Action {
  public readonly type = CardsActionTypes.LoadCardsFromSocket;

  constructor() { }
}

export class CardsLoadedFromSocket implements Action {
  public readonly type = CardsActionTypes.CardsLoadedFromSocket;

  constructor(public payload: Card[]) { }
}

export class MoveMyCardsWithinArray implements Action {
  public readonly type = CardsActionTypes.MoveMyCardsWithinArray;

  constructor(public payload: CdkDragDrop<Card[]>) { }
}

export class MoveEnemyCardsWithinArray implements Action {
  public readonly type = CardsActionTypes.MoveEnemyCardsWithinArray;

  constructor(public payload: CdkDragDrop<Card[]>) { }
}

export class MoveMyActiveCardsWithinArray implements Action {
  public readonly type = CardsActionTypes.MoveMyActiveCardsWithinArray;

  constructor(public payload: CdkDragDrop<Card[]>) { }
}

export class MoveEnemyActiveCardsWithinArray implements Action {
  public readonly type = CardsActionTypes.MoveEnemyActiveCardsWithinArray;

  constructor(public payload: CdkDragDrop<Card[]>) { }
}

export class GetMyBattleCard implements Action {
  public readonly type = CardsActionTypes.GetMyBattleCard;

  constructor(public payload: Coordinates) { }
}

export class GotMyBattleCard implements Action {
  public readonly type = CardsActionTypes.GotMyBattleCard;

  constructor(public payload: Card[]) { }
}

export class GetEnemyBattleCard implements Action {
  public readonly type = CardsActionTypes.GetEnemyBattleCard;

  constructor(public payload: Coordinates) { }
}

export class GotEnemyBattleCard implements Action {
  public readonly type = CardsActionTypes.GotEnemyBattleCard;

  constructor(public payload: Card[]) { }
}

export type CardsActions =
  | LoadCards
  | LoadCardsSuccess
  | LoadCardsError
  | LoadCardsFromSocket
  | CardsLoadedFromSocket
  | MoveMyCardsWithinArray
  | MoveEnemyCardsWithinArray
  | MoveMyActiveCardsWithinArray
  | MoveEnemyActiveCardsWithinArray
  | GetMyBattleCard
  | GotMyBattleCard
  | GetEnemyBattleCard
  | GotEnemyBattleCard;
