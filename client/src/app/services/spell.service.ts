import { Injectable } from "@angular/core";
import { CardsFacade } from "store";
import { Card } from "../../models";
import { BreakpointObserver } from "@angular/cdk/layout";

@Injectable()
export class SpellService {
  public constructor(public cardFacade: CardsFacade) {}

  public checkAndApplySpellServices(myActiveCards: Card[]): void {
    const cardClassArray = myActiveCards.map(card => {
      return card.class;
    });

    if (cardClassArray.includes("Spell")) {
      this.disableOtherCardsWhenSpellCardInUse(myActiveCards);
    } else {
      const isDisabledArray = myActiveCards.map( card => {return card.effects.disableWhenSpellInUse}) 
      if(isDisabledArray.includes(true)) {
this.enableOtherCardsWhenSpellCardInUse(myActiveCards)
      }
    }

    if (cardClassArray.includes("HR")) {
      this.doHRSpellWithMyCards(myActiveCards)
    }
    
  }






  public doHRSpellWithMyCards(myActiveCards: Card[]): void {
    const HRArray = myActiveCards.map(card => {
      if (card.class === 'HR')
      { return card;}
     
    });
    HRArray.forEach( card => {
      if(card) {
        let arrayWithoutThisHr = myActiveCards.filter(_card => {
          return (
            _card.id !== myActiveCards[HRArray.indexOf(card)].id &&
            (!_card.effects ||
              !_card.effects.teambuilding ||
              !_card.effects.teambuilding.includes(myActiveCards[HRArray.indexOf(card)].id))
          );
        });
        console.log(arrayWithoutThisHr)
      }
     

    })
  


    /*if (false) {
      const arrauWithEffect = arrayWithoutThisHr.map(_card => {
        const newEffects = _card.effects ? { ..._card.effects } : {};
        newEffects.teambuilding
          ? (newEffects.teambuilding = [
              ...newEffects.teambuilding,
              myActiveCards[indexOfHrCrad].id
            ])
          : (newEffects.teambuilding = [myActiveCards[indexOfHrCrad].id]);
        return _card;
      });
      console.log(arrauWithEffect);
      this.cardFacade.increaceMyCardAttack([
        ...arrauWithEffect,
        ...[myActiveCards[indexOfHrCrad]]
      ]);
    }*/
  }

  public disableOtherCardsWhenSpellCardInUse(myActiveCards: Card[]): void {
    const spellCard = myActiveCards.filter(card => {
      return card.class === "Spell";
    });
    const cardsWithoutSpell = myActiveCards.filter(card => {
      return card.class !== "Spell";
    });

    if (spellCard.length) {
      const enabledArray = cardsWithoutSpell.map(card => {
        return card.effects.disableWhenSpellInUse;
      });
      if (enabledArray.length && enabledArray.includes(false)) {
        const cardArray = cardsWithoutSpell.map(card => {
          card.effects.disableWhenSpellInUse = true;
          return card;
        });
        this.cardFacade.increaceMyCardAttack([...cardArray, ...spellCard]);
      }
    }
  }

  public enableOtherCardsWhenSpellCardInUse(myActiveCards: Card[]): void {
    const cardsWithoutSpell = myActiveCards.filter(card => {
      return card.class !== "Spell";
    });

    const disabledArray = cardsWithoutSpell.map(card => {
      return card.effects.disableWhenSpellInUse;
    });
    if (disabledArray.includes(true)) {
      const arrayForStore = cardsWithoutSpell.map(card => {
        card.effects.disableWhenSpellInUse = false;
        return card;
      });
      if (arrayForStore.length) {
        this.cardFacade.increaceMyCardAttack(arrayForStore);
      }
    }
  }
  /*  public deleteSpellWithMyCards(myActiveCards: Card[]): void {
    myActiveCards.filter(cardInArray => {
        return (
          cardInArray.effects &&
          cardInArray.effects.teambuilding &&
          cardInArray.effects.teambuilding.length > 0
        );
      })
      .forEach(cardInArray => {
        cardInArray.effects.teambuilding.forEach(id => {
          if (!myActiveCards.find(_card => _card.id === id)) {
            const newEffects = { ...cardInArray.effects };
            newEffects.teambuilding = newEffects.teambuilding.filter(
              id => id === cardInArray.id
            );

            this.cardFacade.increaceMyCardAttack(
              cardInArray.id,
              -1,
              newEffects
            );
          }
        });
      });

    myActiveCards.forEach(card => {
        if (card.class !== 'Spell') 
        
       { myActiveCards .forEach(card => {
          const newEffects = { ...card.effects } 
          newEffects.disableWhenSpellInUse = false
       
          this.cardFacade.increaceMyCardAttack(card.id, 0, newEffects);
        })
  
        }
      });

  }
}
*/
}
