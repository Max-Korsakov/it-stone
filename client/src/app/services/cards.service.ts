import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { Card } from 'models';
import { Observable } from 'rxjs';

import { SocketService } from './socket.service';

@Injectable()

export class CardsService {

  public moveMyCardsWithinArray$: Observable<any>;
  public moveEnemyCardsWithinArray$: Observable<any>;
  public getMyActiveCard$: Observable<any>;
  public getEnemyActiveCard$: Observable<any>;
  public moveEnemyActiveCardsWithinarray$: Observable<any>;
  public moveMyActiveCardsWithinArray$: Observable<any>;

  constructor(private socketService: SocketService) {
    this.moveMyCardsWithinArray$ = this.socketService.listen('[card] Move My Cards Within Array');
    this.moveEnemyCardsWithinArray$ = this.socketService.listen('[card] Move Enemy Cards Within Array');
    this.getMyActiveCard$ = this.socketService.listen('[cards] Get My Battle Card');
    this.getEnemyActiveCard$ = this.socketService.listen('[cards] Get Enemy Battle Card');
    this.moveMyActiveCardsWithinArray$ = this.socketService.listen('[card] Move My Active Cards Within Array');
    this.moveEnemyActiveCardsWithinarray$ = this.socketService.listen('[card] Move Enemy Active Cards Within Array');
  }

  public moveMyCardsWithinArray(event: CdkDragDrop<Card[]>): void {
    this.socketService.emit('[card] Move My Cards Within Array', event);
  }

  public moveEnemyCardsWithinArray(event: CdkDragDrop<Card[]>): void {
    this.socketService.emit('[card] Move Enemy Cards Within Array', event);
  }

  public getMyActiveCard(event: CdkDragDrop<Card[]>): void {
    this.socketService.emit('[cards] Get My Battle Card', event);
  }

  public getEnemyActiveCard(event: CdkDragDrop<Card[]>): void {
    this.socketService.emit('[cards] Get Enemy Battle Card', event);
  }

  public moveMyActiveCardsWithinArray(event: CdkDragDrop<Card[]>): void {
    this.socketService.emit('[card] Move My Active Cards Within Array', event);
  }

  public moveEnemyActiveCardsWithinarray(event: CdkDragDrop<Card[]>): void {
    this.socketService.emit('[card] Move Enemy Active Cards Within Array', event);
  }
}

/*
  LoadCardsSuccess = '[cards] Load Cards (Success)
  MoveMyCardsWithinArray = '[card] Move My Cards Within Array',
  MoveEnemyCardsWithinArray = '[card] Move Enemy Cards Within Array',
  MoveMyActiveCardsWithinArray = '[card] Move My Active Cards Within Array',
  MoveEnemyActiveCardsWithinArray = '[card] Move Enemy Active Cards Within Array',
  GetMyBattleCard = '[cards] Get My Battle Card',
  GetEnemyBattleCard = '[cards] Get Enemy Battle Card',
*/
