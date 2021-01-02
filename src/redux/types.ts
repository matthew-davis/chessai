// Enum
export enum ActionTypes {
  SET_POSITION = "SET_POSITION",
  SET_TIME = "SET_TIME",
  SET_HISTORY = "SET_HISTORY",
  SET_SQUARE_STYLES = "SET_SQUARE_STYLES",
  SET_GAME_STATUS = "SET_GAME_STATUS",
  SET_GAME_SUM = "SET_GAME_SUM",
  SET_SEARCH_DEPTH_WHITE = "SET_SEARCH_DEPTH_WHITE",
  SET_SEARCH_DEPTH_BLACK = "SET_SEARCH_DEPTH_BLACK",
}

// Interfaces
export interface IActions extends IState {
  type: ActionTypes,
}

export interface IState {
  gameStatus: string,
  gameSum: number,
  history: [],
  position: string,
  positionCount: number,
  positionsPerSec: number,
  searchDepthBlack: number,
  searchDepthWhite: number,
  squareStyles: {},
  time: number,
}
