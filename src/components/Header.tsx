// Imports
import {Button}      from "@material-ui/core";
import React         from "react";
import {useDispatch} from "react-redux";

import {SetPosition} from "../redux/actions";

// Component
export const Header = (): React.ReactElement => {

  const dispatch = useDispatch();
  const handleClick = () => dispatch(SetPosition("start"));

  return (
    <header>
      <h1>Homegrown Chess AI</h1>
      <h3>Using Minimax and Alpha-Beta Pruning</h3>
      <Button className={"stop-reset-button"} variant={"contained"} color={"secondary"} onClick={handleClick}>Stop & Reset</Button>
    </header>
  );
};
