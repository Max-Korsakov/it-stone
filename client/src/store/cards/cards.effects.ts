import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { CardsService } from 'app/services';
import { Card } from 'models';

import * as cardActions from './cards.action';

@Injectable()
export class CardsEffects {
  public baseUrl = 'http://www.mocky.io/v2/5bf699c63200009b005d1005';
  public secondUrl = 'http://www.mocky.io/v2/5be983f82e00005f00f14631';

  @Effect() public loadCards$: Observable<Action> = this.actions$.pipe(
    ofType<cardActions.LoadCards>(cardActions.CardsActionTypes.LoadCards),
    switchMap((action: cardActions.LoadCards) =>
      this.http.get(this.baseUrl).pipe(
        map((data: Card[]) => new cardActions.LoadCardsSuccess(data)),
        catchError(error => of(new cardActions.LoadCardsError(error)))
      )
    )
  );

  @Effect() public cardsLoadedFromsSocket$: Observable<Action> = this.actions$.pipe(
    ofType<cardActions.LoadCardsFromSocket>(cardActions.CardsActionTypes.LoadCardsFromSocket),
    tap(() => this.cardsService.loadCardsFromSocket()),
    switchMap(() => this.cardsService.сardsLoadedFromSocket$.pipe(
      map((data: Card[]) => new cardActions.CardsLoadedFromSocket(data),
      )
    ))
  );

  @Effect({ dispatch: false }) public getMyBattleCard$ = this.actions$.pipe(
    ofType<cardActions.GetMyBattleCard>(cardActions.CardsActionTypes.GetMyBattleCard),
    map((action: cardActions.GetMyBattleCard) => action.payload),
    tap((coordinates) => this.cardsService.getMyBattleCards(coordinates))
  );

  @Effect() public gotMyBattleCard$: Observable<Action> = this.actions$.pipe(
    ofType<cardActions.GetMyBattleCard>(cardActions.CardsActionTypes.GetMyBattleCard),
    switchMap(() => this.cardsService.gotMyActiveCard$.pipe(
      map((cards: Card[]) => new cardActions.GotMyBattleCard(cards))
    ))
  );

  @Effect({ dispatch: false }) public getEnemyBattleCard$ = this.actions$.pipe(
    ofType<cardActions.GetEnemyBattleCard>(cardActions.CardsActionTypes.GetEnemyBattleCard),
    map((action: cardActions.GetEnemyBattleCard) => action.payload ),
    tap((coordinates) => this.cardsService.getEnemyBattleCard(coordinates))
  );

  @Effect() public gotEnemyBattleCard$: Observable<Action> = this.actions$.pipe(
    ofType<cardActions.GetEnemyBattleCard>(cardActions.CardsActionTypes.GetEnemyBattleCard),
    switchMap(() => this.cardsService.gotEnemyActiveCard$.pipe(
      map((cards: Card[]) => new cardActions.GotEnemyBattleCard(cards))
    ))
  );

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private cardsService: CardsService
  ) {
  }
}
