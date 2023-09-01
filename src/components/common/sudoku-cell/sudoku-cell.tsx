import clsx from "clsx";
import React from "react";
import { useTraceUpdate } from "../../../shared/utils/use-trace-update";
import { useSudokuCell } from "./use-sudoku-cell";

type SudokuCellProps = {
  originalValue?: number;
  isDisabled: boolean;
  row: number;
  col: number;
};

function SudokuCellComponent({ isDisabled, row, col }: SudokuCellProps) {
  const { handleChangeCellValue, hasError, value } = useSudokuCell({
    row,
    col,
  });

  return (
    <div
      className={clsx(
        "border-b-2  border-black",
        (col + 1) % 3 !== 0 && "border-r-2",
        (row + 1) % 3 === 0 && row !== 8 && "border-b-4 ",
        (col + 1) % 3 === 0 && col !== 8 && "border-r-4 border-black"
      )}
    >
      <input
        className={clsx(
          "appearance-none text-center text-lg outline-none border-none w-14 h-14",
          isDisabled && "bg-orange-200",
          hasError && "bg-red-500"
        )}
        value={value !== 0 ? value : ""}
        disabled={isDisabled}
        maxLength={1}
        onChange={(event) => handleChangeCellValue(event, row, col)}
      />
    </div>
  );
}

export const SudokuCell = React.memo(SudokuCellComponent);
