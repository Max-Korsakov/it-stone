import { PlayersInfoState } from './interfaces';
import { PlayersInfoActions, PlayersInfoActionType } from './players-info.actions';
import { playersInfoInitialState } from './players-info.initial';
import { state } from '@angular/animations';

export const playersInfoReducer = (state: PlayersInfoState = playersInfoInitialState,
    action: PlayersInfoActions): PlayersInfoState => {
    switch (action.type) {
        case PlayersInfoActionType.AddPlayers:
            return {
                ...state,
                myCollection: action.payload.myCollection,
                name: action.payload.name,
                rate: action.payload.rate
            };
        case PlayersInfoActionType.IncreasePlayerRate:
            return {
                ...state,
                rate: state.rate + action.payload.additionalRate
            };

        case PlayersInfoActionType.LoadCollection:
            return {
                ...state,
                myCollection: state.myCollection
            };
            case PlayersInfoActionType.RenamePlayer:
                return {
                    ...state,
                    name: action.payload.name
                };
                default: return state;
    }
};