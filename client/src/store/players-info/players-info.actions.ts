import { Action } from '@ngrx/store';
import { PlayersInfoState } from './interfaces';

export enum PlayersInfoActionType {
    AddPlayers = "[PlayersInfo] add new player",
    RenamePlayer = "[PlayersInfo] change player name",
    LoadCollection = "[PlayersInfo] load player's cards collection",
    IncreasePlayerRate = "[PlayersInfo] increase player rate"
}

export class AddPlayers implements Action {
    public readonly type = PlayersInfoActionType.AddPlayers;

    constructor (public payload: PlayersInfoState) {}
}

export class RenamePlayer implements Action {
    public readonly type = PlayersInfoActionType.RenamePlayer;

    constructor (public payload: {name: string}) {}
}

export class LoadCollection implements Action {
    public readonly type = PlayersInfoActionType.LoadCollection;

    constructor (public payload: {collection: []}) {}
}

export class IncreasePlayerRate implements Action {
    public readonly type = PlayersInfoActionType.IncreasePlayerRate;

    constructor (public payload: { additionalRate: number}) {}
}

export type PlayersInfoActions = 
AddPlayers | RenamePlayer | LoadCollection | IncreasePlayerRate;