import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Card } from "models";
import { CardsFacade } from "store";
import {SpellService} from '../services/spell.service'

@Injectable({
  providedIn: "root"
})
export class CardsService {
  constructor(private cardFacade: CardsFacade, private spellService: SpellService) {}

  public checkingForMyCardsWithZeroOrMinusHP(array: Card[]): any {
    let that = this;
    array.forEach(function(card) {
      if (card.hp !== null && card.hp <= 0) {
        setTimeout(function() {that.cardFacade.deleteMyCardFromBattle(card.id)
        }, 1500);
    
      }
    });
  }

  public checkingEnemyMyCardsWithZeroOrMinusHP(array: Card[]): any {
    let that = this;
    array.forEach(function(card) {
      if (card.hp <= 0) {
        setTimeout(function() {that.cardFacade.deleteEnemyCardFromBattle(card.id)}, 1500);
      }
    });
  }
}
