import { Injectable } from '@angular/core';
import { Card, Coordinates } from 'models';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

import { SocketService } from './socket.service';

enum CardsActionTypes {
  LoadCardsFromSocket = '[cards] Load Cards From Socket',
  CardsLoadedFromSocket = '[cards] Cards Loaded From Socket',
  GetMyBattleCard = '[cards] Get My Battle Card',
  GotMyBattleCard = '[card] Got My Battle Card',
  GetEnemyBattleCard = '[cards] Get Enemy Battle Card',
  GotEnemyBattleCard = '[cards] Got Enemy Battle Card'
}

@Injectable()
export class CardsService {
  public loadCardsFromSocket$: Observable<Card[]>;
  public сardsLoadedFromSocket$: Observable<Card[]>;
  public gotMyActiveCard$: Observable<Card[]>;
  public gotEnemyActiveCard$: Observable<Card[]>;

  constructor(private socketService: SocketService, private socket: Socket) {
    this.loadCardsFromSocket$ = this.socket.fromEvent(CardsActionTypes.LoadCardsFromSocket);
    this.сardsLoadedFromSocket$ = this.socket.fromEvent(CardsActionTypes.CardsLoadedFromSocket);
    this.gotMyActiveCard$ = this.socket.fromEvent(CardsActionTypes.GotMyBattleCard);
    this.gotEnemyActiveCard$ = this.socket.fromEvent(CardsActionTypes.GotEnemyBattleCard);
  }

  public loadCardsFromSocket(): void {
    this.socket.emit(CardsActionTypes.LoadCardsFromSocket);
  }

  public getMyBattleCards(coordinates: Coordinates): void {
    this.socket.emit(CardsActionTypes.GetMyBattleCard, coordinates);
  }

  public getEnemyBattleCard(coordinates: Coordinates): void {
    this.socket.emit(CardsActionTypes.GetEnemyBattleCard, coordinates);
  }
}
