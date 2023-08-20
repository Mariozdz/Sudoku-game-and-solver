export function useSudokuSolver() {

  const checkRow = (
    board: number[][],
    row: number,
    value: number
  ): boolean => {
    for (let i = 0; i < board[row].length; i++) {
      if (board[row][i] === value) {
        return false;
      }
    }

    return true;
  };

  const checkColumn = (
    board: number[][],
    column: number,
    value: number
  ): boolean => {
    for (let i = 0; i < board.length; i++) {
      if (board[i][column] === value) {
        return false;
      }
    }

    return true;
  };

  const checkSquare = (
    board: number[][],
    row: number,
    column: number,
    value: number
  ): boolean => {
    const boxRow: number = Math.floor(row / 3) * 3;
    const boxCol: number = Math.floor(column / 3) * 3;

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (board[boxRow + r][boxCol + c] === value) return false;
      }
    }

    return true;
  };
}