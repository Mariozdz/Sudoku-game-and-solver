import clsx from "clsx";
import React from "react";
import { useTraceUpdate } from "../../shared/utils/use-trace-update";

type SudokuCellProps = {
  cellValue: number;
  originalValue?: number;
  hasError: boolean;
  isDisabled: boolean;
  row: number;
  col: number;
  onChangeValue: (event: any, row, col) => void;
};

function SudokuCellComponent({
  cellValue,
  isDisabled,
  hasError,
  row,
  col,
  onChangeValue,
}: SudokuCellProps) {
  useTraceUpdate({ cellValue, isDisabled, hasError, row, col, onChangeValue });

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
        value={cellValue !== 0 ? cellValue : ""}
        disabled={isDisabled}
        maxLength={1}
        onChange={(event) => onChangeValue(event, row, col)}
      />
    </div>
  );
}

export const SudokuCell = React.memo(SudokuCellComponent);
