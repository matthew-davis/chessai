// Imports
import produce                         from "immer";

import {INITIAL_STATE}                 from "./initialState";
import {ActionTypes, IActions, IState} from "./types";

// Reducer
export const reducers = (state: IState = INITIAL_STATE, action: IActions): IState =>
  produce(state, (draft: IState) => {
    
    switch(action.type) {
      
      case ActionTypes.SET_POSITION:
        draft.position = action.position;
        break;

      case ActionTypes.SET_TIME:
        draft.time = action.time;
        break;

      case ActionTypes.SET_HISTORY:
        draft.history = action.history;
        break;

      case ActionTypes.SET_SQUARE_STYLES:
        draft.squareStyles = action.squareStyles;
        break;

      case ActionTypes.SET_GAME_STATUS:
        draft.gameStatus = action.gameStatus;
        break;

      case ActionTypes.SET_GAME_SUM:
        draft.gameSum = action.gameSum;
        break;

      case ActionTypes.SET_SEARCH_DEPTH_BLACK:
        draft.searchDepthBlack = action.searchDepthBlack;
        break;

      case ActionTypes.SET_SEARCH_DEPTH_WHITE:
        draft.searchDepthWhite = action.searchDepthWhite;
        break;
    }
  });
