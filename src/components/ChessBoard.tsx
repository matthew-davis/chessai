// Imports
import Chessboard                     from "chessboardjsx";
import React                          from "react";
import {useDispatch, useSelector}     from "react-redux";
import rough                          from "roughjs/bin/rough";

import {getGameSum}                   from "../chessLogic/Logic";
import whiteKing                      from "../images/wk.png";
import whiteQueen                     from "../images/wq.png";
import whiteRook                      from "../images/wr.png";
import whiteBishop                    from "../images/wb.png";
import whiteKnight                    from "../images/wn.png";
import whitePawn                      from "../images/wp.png";
import blackKing                      from "../images/bk.png";
import blackQueen                     from "../images/bq.png";
import blackRook                      from "../images/br.png";
import blackBishop                    from "../images/bb.png";
import blackKnight                    from "../images/bn.png";
import blackPawn                      from "../images/bp.png";
import {SetGameSum, SetHistory}       from "../redux/actions";
import {SetPosition, SetSquareStyles} from "../redux/actions";
import {SetTime}                      from "../redux/actions";
import {IState}                       from "../redux/types";

// Component
export const ChessBoard = (props: any): React.ReactElement => {

  const dispatch = useDispatch();
  const position = useSelector((s: IState) => s.position);
  const time = useSelector((s: IState) => s.time);
  const gamehistory = useSelector((s: IState) => s.history);
  const squareStyles = useSelector((s: IState) => s.squareStyles);
  const gameSum = useSelector((s: IState) => s.gameSum);

  React.useEffect(() => {
    const resetPosition = async () => {
      if (position === "ruyLopez") {
        await props.game.reset();
        await props.game.load("r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 1");
      } else if (position === "italianGame") {
        await props.game.reset();
        await props.game.load("r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 1");
      } else if (position === "sicilianDefense") {
        await props.game.reset();
        await props.game.load("rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1");
      } else if (position === "scotchOpening") {
        await props.game.reset();
        await props.game.load("r1bqkbnr/pppp1ppp/2n5/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq - 1 1");
      } else if (position === "queensGambit") {
        await props.game.reset();
        await props.game.load("rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 1 1");
      } else if (position === "start") {
        await props.game.reset();
        await props.game.load("start");
      } else {
        return;
      }

      dispatch(SetPosition(props.game.fen()));
      dispatch(SetGameSum(0));
      // remainingPieces = 32;

      if (time) {
        clearTimeout(time);
        dispatch(SetTime(null));
      }
    };

    resetPosition().then();
  }, [dispatch, position, time]);

  const width = ({screenWidth, screenHeight}: any) => Math.min(screenWidth, screenHeight) - 200;

  const calculateSquareStyling = (history: any) => {
    const len = history.length;
    const col = {backgroundColor: "rgba(255, 255, 0, 0.4)"}
    return {...(len && {[len && history[len - 1].from]: col}), ...(len && {[len && history[len - 1].to]: col})};
  };

  const onDrop = ({sourceSquare, targetSquare}: any) => {
    let move = props.game.move({from: sourceSquare, to: targetSquare, promotion: "q"});
    if (move === null) return;
    dispatch(SetGameSum(getGameSum(move, gameSum, "b")));
    dispatch(SetPosition(props.game.fen()));
    dispatch(SetHistory(props.game.history({verbose: true})));
    dispatch(SetSquareStyles(calculateSquareStyling(props.game.history({verbose: true}))));
  };

  const onMouseOutSquare = () => dispatch(SetSquareStyles(calculateSquareStyling(gamehistory)));

  const onMouseOverSquare = (square: any) => {
    let moves = props.game.moves({square, verbose: true});
    if (moves.length === 0) return;
    let squaresToHighlight = [];
    for (let i = 0; i < moves.length; i++) {squaresToHighlight.push(moves[i].to)}
    const highlightStyles = [square, ...squaresToHighlight].reduce(
      (a, c) => {
        return {
          ...a, ...{[c]: {background: "radial-gradient(circle, #fffc00 36%, transparent 40%)", borderRadius: "50%"}},
          ...calculateSquareStyling(gamehistory),
        };
      },
      {}
    );
    dispatch(SetSquareStyles({...squareStyles, ...highlightStyles}));
  };

  const pieceStyle = (w: number, x: boolean, y: string, z: string) => {
    return <img style={{width: x ? w * 1.2 : w * 0.9, height: x ? w * 1.2 : w * 0.9}} src={y} alt={z} />
  };

  const roughSquare = ({squareElement, squareWidth}: any) => {
    const rc = rough.svg(squareElement);
    const options = {stroke: "#5b5a56", strokeWidth: 2, roughness: 0.5, fill: "#cdcbc2", fillWeight: 5, hachureGap: 8};
    // noinspection JSSuspiciousNameCombination
    const chessSquare = rc.rectangle(0, 0, squareWidth, squareWidth, options);
    squareElement.appendChild(chessSquare);
  };

  return (
    <Chessboard
      boardStyle={{borderRadius: "5px", boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)"}}
      calcWidth={width}
      darkSquareStyle={{backgroundColor: "#5b5a56"}}
      id={"chess-board"}
      lightSquareStyle={{backgroundColor: "#cdcbc2"}}
      onDrop={onDrop}
      onMouseOutSquare={onMouseOutSquare}
      onMouseOverSquare={onMouseOverSquare}
      pieces={{
        wK: ({squareWidth, isDragging}: any) => pieceStyle(squareWidth, isDragging, whiteKing, "White King"),
        wQ: ({squareWidth, isDragging}: any) => pieceStyle(squareWidth, isDragging, whiteQueen, "White Queen"),
        wR: ({squareWidth, isDragging}: any) => pieceStyle(squareWidth, isDragging, whiteRook, "White Rook"),
        wB: ({squareWidth, isDragging}: any) => pieceStyle(squareWidth, isDragging, whiteBishop, "White Bishop"),
        wN: ({squareWidth, isDragging}: any) => pieceStyle(squareWidth, isDragging, whiteKnight, "White Knight"),
        wP: ({squareWidth, isDragging}: any) => pieceStyle(squareWidth, isDragging, whitePawn, "White Pawn"),
        bK: ({squareWidth, isDragging}: any) => pieceStyle(squareWidth, isDragging, blackKing, "Black King"),
        bQ: ({squareWidth, isDragging}: any) => pieceStyle(squareWidth, isDragging, blackQueen, "Black Queen"),
        bR: ({squareWidth, isDragging}: any) => pieceStyle(squareWidth, isDragging, blackRook, "Black Rook"),
        bB: ({squareWidth, isDragging}: any) => pieceStyle(squareWidth, isDragging, blackBishop, "Black Bishop"),
        bN: ({squareWidth, isDragging}: any) => pieceStyle(squareWidth, isDragging, blackKnight, "Black Knight"),
        bP: ({squareWidth, isDragging}: any) => pieceStyle(squareWidth, isDragging, blackPawn, "Black Pawn"),
      }}
      position={position}
      roughSquare={roughSquare}
      showNotation={false}
      squareStyles={squareStyles}
    />
  );
};
