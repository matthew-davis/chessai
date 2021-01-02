// Imports
import {Chess}    from "@lubert/chess.ts";
import React        from "react";

import {ChessBoard} from "./ChessBoard";
import {Controls}   from "./Controls";
import {Header}     from "./Header";

// Component
export const App = (): React.ReactElement => {

  const game = new Chess();
  
  return (
    <React.Fragment>
      <Header />
      <div className={"chess-container"}>
        <Controls game={game} />
        <ChessBoard game={game} />
      </div>
    </React.Fragment>
  );
};
