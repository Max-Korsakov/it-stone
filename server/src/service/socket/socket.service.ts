import { injectable, inject } from 'inversify';
import SocketIO from 'socket.io';
import { CardRepository } from '../card';
import { Card } from './../../models'

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

interface DataFromFront {
  myCards: number[];
  enemyCardCount?: number;
  myActiveCards: number[];
  enemyActiveCards: number[];
  myHp: number;
  enemyHp: number;
}

interface User {
  cards: Card[];
  deck: number[];
  enemyCardCount: number;
  myCards: number[];
  enemyActiveCards: number[];
  myActiveCards: number[];
}

interface Coordinates {
  currentIndex: number;
  previousIndex: number;
};

function getBattleCards(cardsArray: Card[], coordinates: Coordinates): Card[] {
  return cardsArray.filter((card, index, array) => {
    return array.indexOf(card) === coordinates.previousIndex;
  });
}

function updateCards(cardsArray: Card[], coordinates: Coordinates): Card[] {
  return cardsArray.filter((card, index, array) => {
    return array.indexOf(card) !== coordinates.previousIndex;
  });
}

@injectable()
export class SocketService {
  private static instance: SocketService;
  private clients: SocketIO.Socket[] = [];

  private constructor(
    @inject(CardRepository) private cardRepository: CardRepository
  ) {
    if (SocketService.instance) {
      throw new Error('You try to destroy singleton');
    }
  }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService(new CardRepository());
    }
    return SocketService.instance;
  }

  public async setSocket(socketIO: SocketIO.Server): Promise<void | Response> {

    socketIO.on('connection', async (client: SocketIO.Socket) => {
      let cards = await this.cardRepository.getCards();
      let myCards = cards;
      let enemyCards = cards;

      this.clients.push(client);

      const states = await this.createDefaultState(15, 5);

      client.on('join', (room) => {
        client.join(room);
      });

      client.on(CardsActionTypes.LoadCardsFromSocket, () => {
        socketIO.emit(CardsActionTypes.CardsLoadedFromSocket, cards);
      });

      client.on(CardsActionTypes.GetMyBattleCard, (coordinates) => {
        let myBattleCards: Card[] = getBattleCards(cards, coordinates);
        let myUpdatedCards: Card[] = updateCards(cards, coordinates);

        socketIO.emit(CardsActionTypes.GotMyBattleCard, myBattleCards);
        socketIO.emit(CardsActionTypes.CardsLoadedFromSocket, myUpdatedCards);
      });

      client.on(CardsActionTypes.GetEnemyBattleCard, (coordinates) => {
        let enemyBattleCards = getBattleCards(cards, coordinates);
        let enemyUpdatedCards = updateCards(cards, coordinates)

        socketIO.emit(CardsActionTypes.GotEnemyBattleCard, enemyBattleCards);
        socketIO.emit(CardsActionTypes.CardsLoadedFromSocket, enemyUpdatedCards);
      });

      client.on('disconnect', () => this.onDisconnect(client));
    });
  }

  public notifyOtherUser(client: SocketIO.Socket, data: DataFromFront): void {
    const otherClient = this.clients.find(c => c.id !== client.id);
    const newDate = this.swapStepData(data);
    otherClient.emit('onStepChange', newDate);
  }

  private onDisconnect(client: SocketIO.Socket): void {
    this.clients.splice(this.clients.indexOf(client), 1);
  }

  private swapStepData(data: DataFromFront): DataFromFront {
    const enemyActiveCards = data.myActiveCards.slice(
      0,
      data.myActiveCards.length
    );
    const myActiveCards = data.enemyActiveCards.slice(
      0,
      data.enemyActiveCards.length
    );

    data.myActiveCards = myActiveCards;
    data.enemyActiveCards = enemyActiveCards;
    data.enemyCardCount = data.myCards.length - 1;

    const tmp = data.myHp;
    data.myHp = data.enemyHp;
    data.enemyHp = tmp;

    return data;
  }

  private generateRndCards(amount: number, interval: number) {
    let Arr: number[] = new Array(amount);

    for (let i = 0; i < amount; i++) {
      Arr.push(Math.floor(Math.random() * interval));
    }

    return Arr;
  }

  private getCardFromDeck(arrFrom: number[], amount: number) {
    let arr: number[] = [];

    for (let i = 0; i < amount; i++) {
      arr.push(...arrFrom.splice(arrFrom.length - 1, 1));
    };

    return arr;
  }

  private async createDefaultState(
    deckLength: number,
    userCardsAmount: number
  ): Promise<User[]> {
    let cards = await this.cardRepository.getCards();
    let cardId = 0;
    cards = cards.map((card: Card) => {
      return {
        id: cardId++,
        name: card.name,
        image: card.image,
        hp: card.hp,
        superSkill: card.superSkill,
        ignore: card.ignore,
        damage: card.hp * 2
      } as Card;
    });

    const firstDeck: number[] = this.generateRndCards(deckLength, cards.length);
    const secondDeck: number[] = this.generateRndCards(
      deckLength,
      cards.length
    );

    let myCardArr: number[] = [];
    let enemyCardArr: number[] = [];

    myCardArr.push(...this.getCardFromDeck(firstDeck, userCardsAmount));
    enemyCardArr.push(...this.getCardFromDeck(secondDeck, userCardsAmount));

    const firstUser: User = {
      cards: cards as Card[],
      deck: firstDeck,
      enemyCardCount: userCardsAmount,
      myCards: myCardArr,
      enemyActiveCards: [],
      myActiveCards: [],
    };

    const secondUser: User = {
      cards: cards as Card[],
      deck: secondDeck,
      enemyCardCount: userCardsAmount,
      myCards: enemyCardArr,
      enemyActiveCards: [],
      myActiveCards: [],
    };

    return [firstUser, secondUser];
  }
}
