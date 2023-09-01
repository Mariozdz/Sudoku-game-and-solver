import { GameStatus } from "../../../shared/constants/game-status";
import { useBoardContext } from "../../../shared/context/board-context";
import { useState } from "react";
import { ObjectUtils } from "../../../shared/helpers/object-utils";
import { Board } from "../../../shared/types/i-board";

type UseSudokuCellHook = {
  handleChangeCellValue: (event: any, row: number, col: number) => void;
  hasError: boolean;
  value: number;
};

type UseSudokuCellProps = {
  row: number;
  col: number;
};

export function useSudokuCell({
  row,
  col,
}: UseSudokuCellProps): UseSudokuCellHook {
  const { board, updateBoard, solutionBoard } = useBoardContext();

  const [error, setError] = useState(false);

  function validateCellInput(row: number, col: number, value: string) {
    const validationKey = `${row}${col}`;

    if (!value) {
      // Reset error when the input is empty
      setError(false);
      return true;
    }

    const parsedValue = Number(value);

    // Reset Error if value is valid
    if (parsedValue === solutionBoard[row][col]) {
      if (error[validationKey]) {
        setError(false);
      }

      return true;
    }

    // Set error if input is invalid
    setError(true);

    // Add tries limit ...
    // if (errorCounter + 1 === ERROR_LIMIT) {
    //   setGameStatus(GameStatus.FINISHED_LOSER);
    // }
    //
    // setErrorCounter((prevState) => prevState + 1);

    return false;
  }

  // Move this function to SudokuCell, its not board's responsibility to handle input change and validation
  function handleChangeCellValue(event: any) {
    const inputValue = event.target.value;

    const modifiedBoard = ObjectUtils.deepCopyHelper<Board>(board);

    modifiedBoard[row][col] = Number(inputValue);

    updateBoard(modifiedBoard);

    validateCellInput(row, col, event.target.value);
  }

  return {
    handleChangeCellValue,
    hasError: error,
    value: board[row][col],
  };
}
