import { useSudoku } from "./use-sudoku";
import { Modal } from "../common/modal";
import { SudokuCell } from "../common/sudoku-cell";
import { ActionButton } from "../common/action-button";

export function Sudoku() {
  // Pending: discard this and use board to render the board and its dimensions
  const baseArray = Array<number>(0, 1, 2, 3, 4, 5, 6, 7, 8);

  const {
    board,
    baseBoard,
    generateNewGame,
    setBoard,
    resetGame,
    isCustomBoardOpen,
    setIsCustomBoardOpen,
    error,
    handleChangeCellValue,
  } = useSudoku();

  return (
    <div className="flex flex-col h-full w-full items-center justify-center px-10">
      {/* Move this to an independent component*/}
      {/*<Modal isOpen={isCustomBoardOpen} />*/}
      {/*<Modal*/}
      {/*  isOpen*/}
      {/*  primaryAction={() => generateNewGame()}*/}
      {/*  primaryActionLabel="Create new game"*/}
      {/*  title="Create a new game to continue"*/}
      {/*/>*/}

      {/* Move this section to an independent component after context is implemented
        receive actions as an array of objects with label and action */}
      <div className="flex flex-row space-x-8">
        <ActionButton label="Generate" onClick={generateNewGame} />
        <ActionButton
          label="Create custom"
          onClick={() => setIsCustomBoardOpen(true)}
        />
        <ActionButton label="Auto solve" onClick={generateNewGame} />
        <ActionButton label="reset" onClick={resetGame} />
      </div>

      {/*
      Check which value is changing for every cell, re rendering even after using memo

      pending to try: discard lambda as function passed, it could re render every time due this,
      refactor so every cell handle row and col in their own component instead of using values from
      mapping
      */}
      <div className="flex flex-col mt-10 border-black border-4">
        {baseArray.map((row) => {
          return (
            <div key={`container[${row}]`} className="flex flex-row">
              {baseArray.map((col) => {
                return (
                  <SudokuCell
                    key={`row[${row}][${col}]`}
                    cellValue={board[row][col]}
                    isDisabled={baseBoard[row][col] !== 0}
                    hasError={error[`${row}${col}`]}
                    row={row}
                    col={col}
                    onChangeValue={(event) => {
                      handleChangeCellValue(event, row, col);
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
