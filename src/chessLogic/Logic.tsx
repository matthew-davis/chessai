// Imports
import React                           from "react";

import {pieceWeights, pstPlayer2, pstPlayer1} from "./Constants";

// Functions
export const getGameStatus = (game: any, color: string) => {
  if (game.inCheckmate()) {
    return {message: <React.Fragment><b>Checkmate!</b> Oops, <b>{color}</b> lost.</React.Fragment>, gameOver: true};
  } else if (game.insufficientMaterial()) {
    return {message: <React.Fragment>It's a <b>draw!</b> (Insufficient Material)</React.Fragment>, gameOver: true};
  } else if (game.inThreefoldRepetition()) {
    return {message: <React.Fragment>It's a <b>draw!</b> (Threefold Repetition)</React.Fragment>, gameOver: true};
  } else if (game.inStalemate()) {
    return {message: <React.Fragment>It's a <b>draw!</b> (Stalemate)</React.Fragment>, gameOver: true};
  } else if (game.inDraw()) {
    return {message: <React.Fragment>It's a <b>draw!</b> (50-move Rule)</React.Fragment>, gameOver: true};
  } else if (game.inCheck()) {
    return {message: <React.Fragment>Oops, <b>{color}</b> is in <b>check!</b></React.Fragment>, gameOver: false};
  } else {
    return {message: <React.Fragment>No check, checkmate, or draw.</React.Fragment>, gameOver: false};
  }
};

export const takeMove = (game: any, colour: "w" | "b", searchDepthBlack: number, searchDepthWhite: number, gameSum: number) => {
  let move: any = [];

  if (colour === "b") {
    move = findMove(game, colour, searchDepthBlack, searchDepthWhite, gameSum)[0];
  } else {
    move = findMove(game, colour, searchDepthBlack, searchDepthWhite, gameSum)[0];
  }

  game.move(move);

  if (colour === "b") {
    return getGameStatus(game, "black");
  } else {
    return getGameStatus(game, "white");
  }
};

const findMove = (game: any, colour: "w" | "b", searchDepthBlack: number, searchDepthWhite: number, gameSum: number) => {
  let depth = 3;

  if (colour === "b") {
    depth = searchDepthBlack;
  } else {
    depth = searchDepthWhite;
  }

  return minimax(game, depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, true, gameSum, colour);
};

const minimax = (game: any, depth: number, alpha: any, beta: any, isMaximizingPlayer: boolean, sum: number, color: "w" | "b") => {

  var children = game.moves({verbose: true});
  children.sort((a: any, b: any) => 0.5 - Math.random());
  let currMove;

  if (depth === 0 || children.length === 0) {
    return [null, sum]
  }

  let maxValue = Number.NEGATIVE_INFINITY;
  let minValue = Number.POSITIVE_INFINITY;
  let bestMove;

  for (var i = 0; i < children.length; i++) {
    currMove = children[i];

    const currPrettyMove = game.move(currMove);
    const newSum = getGameSum(currPrettyMove, sum, color);
    const [childBestMove, childValue] = minimax(game, depth - 1, alpha, beta, !isMaximizingPlayer, newSum, color);

    game.undo();

    if (isMaximizingPlayer) {
      if (childValue > maxValue) {
        maxValue = childValue;
        bestMove = currPrettyMove;
        console.log(childBestMove);
      }

      if (childValue > alpha) alpha = childValue;
    } else {
      if (childValue < minValue) {
        minValue = childValue;
        bestMove = currPrettyMove;
      }

      if (childValue < beta) beta = childValue;
    }

    if (alpha >= beta) break;
  }

  if (isMaximizingPlayer) {
    return [bestMove, maxValue]
  } else {
    return [bestMove, minValue];
  }
};

export const getGameSum = (move: any, prevSum: number, color: string) => {
  const from = [8 - parseInt(move.from[1]), move.from.charCodeAt(0) - "a".charCodeAt(0)];
  const to = [8 - parseInt(move.to[1]), move.to.charCodeAt(0) - "a".charCodeAt(0)];

  let captured = move.captured as "p" | "n" | "b" | "r" | "q" | "k" | "k_e";
  let piece = move.piece as "p" | "n" | "b" | "r" | "q" | "k" | "k_e";
  const moveColour = move.color as "w" | "b";

  if (prevSum < -1500) {
    if (piece === "k") {
      piece = "k_e";
    } else if (captured === "k") {
      captured = "k_e";
    }
  }

  if (move.captured !== undefined) {
    if (moveColour === color) {
      prevSum += (pieceWeights[captured] + pstPlayer2[moveColour][captured][to[0]][to[1]]);
    } else {
      prevSum -= (pieceWeights[captured] + pstPlayer1[moveColour][captured][to[0]][to[1]]);
    }
  }

  if (move.flags.includes("p")) {
    if (moveColour === color) {
      prevSum -= (pieceWeights[piece] + pstPlayer1[moveColour][piece][from[0]][from[1]]);
      prevSum += (pieceWeights["q"] + pstPlayer1[moveColour]["q"][to[0]][to[1]]);
    } else {
      prevSum += (pieceWeights[piece] + pstPlayer1[moveColour][piece][from[0]][from[1]]);
      prevSum -= (pieceWeights["q"] + pstPlayer1[moveColour]["q"][to[0]][to[1]]);
    }
  } else {
    if (move.color !== color) {
      prevSum += pstPlayer1[moveColour][piece][from[0]][from[1]];
      prevSum -= pstPlayer1[moveColour][piece][to[0]][to[1]];
    } else {
      prevSum -= pstPlayer1[moveColour][piece][from[0]][from[1]];
      prevSum += pstPlayer1[moveColour][piece][to[0]][to[1]];
    }
  }

  return prevSum;
}
