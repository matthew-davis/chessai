// Imports
import {IState} from "./types";

// INITIAL_STATE
export const INITIAL_STATE: IState = {
  gameStatus: "No check, checkmate, or draw.",
  gameSum: 0,
  history: [],
  position: "start",
  positionCount: 0,
  positionsPerSec: 0,
  searchDepthBlack: 2,
  searchDepthWhite: 2,
  squareStyles: {},
  time: 0,
};
