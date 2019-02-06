import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Card, Coordinates } from 'models';

import {
  ChangeSelectedCardId,
  CheckNewCardDataLoss,
  DeleteCard,
  GetEnemyBattleCard,
  GetMyBattleCard,
  GotEnemyBattleCard,
  GotMyBattleCard,
  LoadCards,
  LoadCardsFromSocket,
  MoveEnemyActiveCardsWithinArray,
  MoveEnemyCardsWithinArray,
  MoveMyActiveCardsWithinArray,
  MoveMyCardsWithinArray,
  ShowDeleteCardPopup,
  ShowNewCardPopup,
  UploadCard
} from './cards.action';
import { cardsQuery } from './cards.selectors';
import { CardsState } from './interfaces';

@Injectable()
export class CardsFacade {
  public allCards$ = this.store.select(cardsQuery.getCards);
  public deck$ = this.store.select(cardsQuery.getDeck);
  public myCards$ = this.store.select(cardsQuery.getMyCards);
  public enemyCards$ = this.store.select(cardsQuery.getEnemyCards);
  public enemyCardCount$ = this.store.select(cardsQuery.getEnemyCardCount);
  public myActiveCards$ = this.store.select(cardsQuery.getMyActiveCards);
  public enemyActiveCards$ = this.store.select(cardsQuery.getEnemyActiveCards);
  public selectedCard$ = this.store.select(cardsQuery.getSelectedCard);
  public selectedCardId$ = this.store.select(cardsQuery.getSelectedCardId);

  public constructor(private store: Store<CardsState>) { }

  public loadCards(): void {
    this.store.dispatch(new LoadCards());
  }

  public loadcardsFromSocket(): void {
    this.store.dispatch(new LoadCardsFromSocket());
  }

  public moveMyCardsWithinArray(event: CdkDragDrop<Card[]>): void {
    this.store.dispatch(new MoveMyCardsWithinArray(event));
  }

  public moveEnemyCardsWithinArray(event: CdkDragDrop<Card[]>): void {
    this.store.dispatch(new MoveEnemyCardsWithinArray(event));
  }

  public moveMyActiveCardsWithinArray(event: CdkDragDrop<Card[]>): void {
    this.store.dispatch(new MoveMyActiveCardsWithinArray(event));
  }

  public moveEnemyActiveCardsWithinArray(event: CdkDragDrop<Card[]>): void {
    this.store.dispatch(new MoveEnemyActiveCardsWithinArray(event));
  }

  public getMyBattleCard(coordinates: Coordinates): void {
    this.store.dispatch(new GetMyBattleCard(coordinates));
  }

  public gotMyBattleCard(card: Card[]): void {
    this.store.dispatch(new GotMyBattleCard(card));
  }

  public getEnemyBattleCard(coordinates: Coordinates): void {
    this.store.dispatch(new GetEnemyBattleCard(coordinates));
  }

  public gotEnemyBattleCard(card: Card[]): void {
    this.store.dispatch(new GotEnemyBattleCard(card));
  }

  public deleteCard(id: number): void {
    this.store.dispatch(new DeleteCard({ id }));
  }

  public uploadCard(card: Card): void {
    this.store.dispatch(new UploadCard({ card }));
  }

  public changeSelectedCardId(id: number, card?: Card): void {
    this.store.dispatch(new ChangeSelectedCardId({ id, card }));
  }

  public showDeleteCardPopup(title: string, text: string, id: number): void {
    this.store.dispatch(new ShowDeleteCardPopup({ title, text, id }));
  }

  public showNewCardPopup(title: string, text: string, id: number, card: Card): void {
    this.store.dispatch(new ShowNewCardPopup({ title, text, id, card }));
  }

  public checkNewCardDataLoss(title: string, text: string, id: number, form: NgForm, card?: Card): void {
    this.store.dispatch(new CheckNewCardDataLoss({ title, text, id, card, form }));
  }
}
