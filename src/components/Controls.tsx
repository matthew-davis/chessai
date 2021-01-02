// Imports
import {Button, Grid, InputLabel, MenuItem, Select}      from "@material-ui/core";
import React                                             from "react";
import {useDispatch, useSelector}                        from "react-redux";

import {getGameStatus, takeMove}                         from "../chessLogic/Logic"
import {SetGameStatus, SetPosition, SetSearchDepthBlack} from "../redux/actions";
import {SetSearchDepthWhite, SetTime}                    from "../redux/actions";
import {IState}                                          from "../redux/types";

// Component
export const Controls = (props: any): React.ReactElement => {

  const dispatch = useDispatch();

  const positionCount = useSelector((s: IState) => s.positionCount);
  const time = useSelector((s: IState) => s.time);
  const positionsPerSec = useSelector((s: IState) => s.positionsPerSec);
  const gameStatus = useSelector((s: IState) => s.gameStatus);
  const searchDepthWhite = useSelector((s: IState) => s.searchDepthWhite);
  const searchDepthBlack = useSelector((s: IState) => s.searchDepthBlack);
  const gameSum = useSelector((s: IState) => s.gameSum);

  const setDepthWhite = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
    dispatch(SetSearchDepthWhite(event.currentTarget.value as number));
  }
  const setDepthBlack = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
    dispatch(SetSearchDepthBlack(event.currentTarget.value as number));
  }

  const handleStart = () => runChess(props.game, "w")

  const runChess = (game: any, colour: "w" | "b") => {
    if (!getGameStatus(game, {"w": "White", "b": "Black"}[colour]).gameOver) {
      dispatch(SetTime(window.setTimeout(() => {
        const status = takeMove(game, colour, searchDepthBlack, searchDepthWhite, gameSum);
        dispatch(SetGameStatus(status.message));
        dispatch(SetPosition(game.fen()));
        (colour === "w") ? colour = "b" : colour = "w";
        runChess(game, colour);
      }, 250)));
    }
  };

  return (
    <div className={"controls-container"}>
      <h2 className={"section-no-space"}>Game Status</h2>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {positionCount} positions evaluated in {time} seconds.<br />
          {positionsPerSec} positions per second.
        </Grid>
        <Grid item xs={6}>
          {gameStatus}
        </Grid>
      </Grid>
      <h2 className={"section-space"}>Opening Positions</h2>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button variant={"contained"} onClick={() => dispatch(SetPosition("start"))}>Start Position</Button>
        </Grid>
        <Grid item xs={8}>
          The starting formation for a game of Chess. A front row of pawns followed by a row of the higher value
          pieces behind: Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook.
        </Grid>
        <Grid item xs={4}>
          <Button variant={"contained"} onClick={() => dispatch(SetPosition("ruyLopez"))}>Ruy Lopez</Button>
        </Grid>
        <Grid item xs={8}>
          The Ruy Lopez also called the Spanish Opening or Spanish Game, is a chess opening characterised by the
          moves: 1. e4 e5, 2. Nf3 Nc6, 3. Bb5. The Ruy Lopez is named after 16th-century Spanish priest Ruy López
          de Segura.
        </Grid>
        <Grid item xs={4}>
          <Button variant={"contained"} onClick={() => dispatch(SetPosition("italianGame"))}>Italian Game</Button>
        </Grid>
        <Grid item xs={8}>
          The Italian Game is a family of chess openings beginning with the moves: 1. e4 e5, 2. Nf3 Nc6, 3. Bc4.
          The opening is defined by the development of the white bishop to c4 (the so-called "Italian bishop"),
          where it attacks Black's vulnerable f7-square.
        </Grid>
        <Grid item xs={4}>
          <Button variant={"contained"} onClick={() => dispatch(SetPosition("sicilianDefense"))}>Sicilian Defense</Button>
        </Grid>
        <Grid item xs={8}>
          The Sicilian Defence is a chess opening that begins with the following moves: 1. e4 c5. The Sicilian
          is the most popular and best-scoring response to White's first move 1.e4.
        </Grid>
        <Grid item xs={4}>
          <Button variant={"contained"} onClick={() => dispatch(SetPosition("scotchOpening"))}>Scotch Opening</Button>
        </Grid>
        <Grid item xs={8}>
          The Scotch Game, or Scotch Opening, is a chess opening that begins with the moves: 1. e4 e5 2. Nf3 Nc6
          3. d4. Ercole del Rio, in his 1750 treatise "Sopra il giuoco degli Scacchi, Osservazioni pratiche d’anonimo
          Autore Modenese", was the first author to mention what is now called the Scotch Game.
        </Grid>
        <Grid item xs={4}>
          <Button variant={"contained"} onClick={() => dispatch(SetPosition("queensGambit"))}>Queen's Gambit</Button>
        </Grid>
        <Grid item xs={8}>
          The Queen's Gambit is the chess opening that starts with the moves: 1. d4 d5 2. c4. It is one of the
          oldest openings and is still commonly played today.
        </Grid>
      </Grid>
      <h2 className={"section-space"}>Algorithm</h2>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <InputLabel id={"search-depth-white"} shrink={true}>Search Depth (White)</InputLabel>
          <Select labelId={"search-depth-white"} value={searchDepthWhite} onChange={setDepthWhite}>
            <MenuItem value={1}>One</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Three</MenuItem>
            <MenuItem value={4}>Four</MenuItem>
            <MenuItem value={5}>Five</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel id={"search-depth-black"} shrink={true}>Search Depth (Black)</InputLabel>
          <Select labelId={"search-depth-black"} value={searchDepthBlack} onChange={setDepthBlack}>
            <MenuItem value={1}>One</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Three</MenuItem>
            <MenuItem value={4}>Four</MenuItem>
            <MenuItem value={5}>Five</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={4}>
          <Button variant={"contained"} color={"primary"} onClick={handleStart}>Start Match</Button>
        </Grid>
      </Grid>
    </div>
  );
};
