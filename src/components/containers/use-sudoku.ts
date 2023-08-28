import { useEffect, useState } from "react";
import { Board } from "../../shared/types/i-board";
import { GameStatus } from "../../shared/constants/game-status";
import { BoardErrors } from "../../shared/types/i-board-errors";
import { baseInitialBoard } from "../../shared/constants/base-initial-board";
import { Difficulty } from "../../shared/constants/dificulty";
import { getSudokuBoard } from "../../shared/api/get-sudoku-board";

type UseSudokuHook = {
  board: Board;
  baseBoard: Board;
  resetGame: () => void;
  setBoard: (value: Board) => void;
  generateNewGame: (difficulty?: Difficulty) => void;
  isCustomBoardOpen: boolean;
  setIsCustomBoardOpen: (value: boolean) => void;
  difficulty: string;
  error: { [key: string]: boolean };
  handleChangeCellValue: (event: any, row: number, col: number) => void;
};

const ERROR_LIMIT = 5;

export function useSudoku(): UseSudokuHook {
  // Replace for board attributes to context in src/context/board-context.tsx,
  // that way sudoku-cell is not gonna need repetitive props to validate inputs

  const [board, setBoard] = useState<Board>(baseInitialBoard());
  const [baseBoard, setBaseBoard] = useState<Board>(baseInitialBoard());
  const [solutionBoard, setSolutionBoard] = useState<Board>(baseInitialBoard());
  const [difficulty, setDifficulty] = useState<string>("");

  const [error, setErrors] = useState<BoardErrors>({});
  const [errorCounter, setErrorCounter] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>();

  const [isCustomBoardOpen, setIsCustomBoardOpen] = useState(false);

  const [counter, setCounter] = useState(0);

  async function getBoardFromApi(difficulty?: Difficulty) {
    try {
      const response = await getSudokuBoard();

      if (response.newboard.grids.length > 0) {
        const { value, solution, difficulty } = response.newboard.grids[0];

        setBoard(value);
        setBaseBoard(value);
        setSolutionBoard(solution);
        setDifficulty(difficulty);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function resetGame() {
    setErrors({});
    setBoard(baseBoard);
  }

  // Move this function to SudokuCell, its not board's responsibility to handle input change and validation
  function validateCellInput(row: number, col: number, value: string) {
    const validationKey = `${row}${col}`;

    if (!value) {
      // Reset error when the input is empty
      setErrors((prevValue) => {
        return { ...prevValue, [validationKey]: false };
      });
      return true;
    }

    const parsedValue = Number(value);

    // Reset Error if value is valid
    if (parsedValue === solutionBoard[row][col]) {
      if (error[validationKey]) {
        setErrors((prevValue) => {
          return { ...prevValue, [validationKey]: false };
        });
      }

      return true;
    }

    // Set error if input is invalid
    setErrors((prevValue) => {
      return { ...prevValue, [validationKey]: true };
    });

    if (errorCounter + 1 === ERROR_LIMIT) {
      setGameStatus(GameStatus.FINISHED_LOSER);
    }

    setErrorCounter((prevState) => prevState + 1);

    return false;
  }

  // Move this function to SudokuCell, its not board's responsibility to handle input change and validation
  function handleChangeCellValue(event: any, row: number, col: number) {
    const inputValue = event.target.value;

    const modifiedBoard = JSON.parse(JSON.stringify(board));

    modifiedBoard[row][col] = Number(inputValue);

    setBoard(modifiedBoard);

    validateCellInput(row, col, event.target.value);
  }

  useEffect(() => {
    getBoardFromApi().then(
      () => {},
      () => {}
    );
  }, []);

  return {
    board,
    baseBoard,
    isCustomBoardOpen,
    setIsCustomBoardOpen,
    difficulty,
    setBoard,
    generateNewGame: getBoardFromApi,
    resetGame,
    handleChangeCellValue,
    error,
  };
}
