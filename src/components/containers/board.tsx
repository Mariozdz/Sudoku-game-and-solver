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
      OnChangeValue is generating the re render try moving onChangeValue function to children and separate its logic from the board component
      Investigate if key needs a better way to be set
      Change baseArray var for board in context implementation

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
                    onChangeValue={handleChangeCellValue}
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
