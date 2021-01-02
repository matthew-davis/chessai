// Imports
import {ActionTypes} from "./types";

// Actions
export const SetPosition = (position: string) => ({type: ActionTypes.SET_POSITION, position});

export const SetTime = (time: number | null) => ({type: ActionTypes.SET_TIME, time});

export const SetHistory = (history: any) => ({type: ActionTypes.SET_HISTORY, history});

export const SetSquareStyles = (squareStyles: any) => ({type: ActionTypes.SET_SQUARE_STYLES, squareStyles});

export const SetGameStatus = (gameStatus: any) => ({type: ActionTypes.SET_GAME_STATUS, gameStatus});

export const SetGameSum = (gameSum: number) => ({type: ActionTypes.SET_GAME_SUM, gameSum});

export const SetSearchDepthBlack = (searchDepthBlack: number) => ({type: ActionTypes.SET_SEARCH_DEPTH_BLACK, searchDepthBlack});

export const SetSearchDepthWhite = (searchDepthWhite: number) => ({type: ActionTypes.SET_SEARCH_DEPTH_WHITE, searchDepthWhite});
