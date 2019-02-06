import { Injectable } from '@angular/core';
import { Card, Coordinates } from 'models';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

import { SocketService } from './socket.service';

enum CardsActionTypes {
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

@Injectable()
export class CardsService {
  public loadCardsFromSocket$: Observable<any>;
  public сardsLoadedFromSocket$: Observable<Card[]>;
  public gotMyActiveCard$: Observable<any>;
  public gotEnemyActiveCard$: Observable<any>;

  constructor(private socketService: SocketService, private socket: Socket) {
    this.loadCardsFromSocket$ = this.socket.fromEvent(CardsActionTypes.LoadCardsFromSocket);
    this.сardsLoadedFromSocket$ = this.socket.fromEvent(CardsActionTypes.CardsLoadedFromSocket);
    this.gotMyActiveCard$ = this.socket.fromEvent(CardsActionTypes.GotMyBattleCard);
    this.gotEnemyActiveCard$ = this.socket.fromEvent(CardsActionTypes.GotEnemyBattleCard);
  }

  public loadCardsFromSocket(): void {
    this.socketService.emit(CardsActionTypes.LoadCardsFromSocket);
  }

  public getMyBattleCards(coordinates: Coordinates): void {
    this.socketService.emit(CardsActionTypes.GetMyBattleCard, coordinates);
  }

  public getEnemyBattleCard(coordinates: Coordinates): void {
    this.socketService.emit(CardsActionTypes.GetEnemyBattleCard, coordinates);
  }
}
