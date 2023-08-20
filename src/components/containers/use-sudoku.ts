import { useEffect, useState } from "react";
import { Board } from "../../shared/types/i-board";
import { GameStatus } from "../../shared/constants/game-status";
import { BoardErrors } from "../../shared/types/i-board-errors";
import { baseInitialBoard } from "../../shared/constants/base-initial-board";
import { Difficulty } from "../../shared/constants/dificulty";

type UseSudokuHook = {
  board: Board;
  baseBoard: Board;
  resetGame: () => void;
  setBoard: (value: Board) => void;
  generateNewGame: (difficulty?: Difficulty) => void;
  isCustomBoardOpen: boolean;
  setIsCustomBoardOpen: (value: boolean) => void;
  difficulty: string;
  validateCellInput: (row: number, col: number, value: string) => boolean;
  error: { [key: string]: boolean };
};

type DosukuResponse = {
  newboard: {
    grids: [
      {
        value: Board;
        solution: Board;
        difficulty: string;
      }
    ];
    results: number;
    message: string;
  };
};

const SUDOKU_QUERY = `
  {
     newboard(limit:1) {
       grids {
        value,
        solution,
        difficulty,
       }
     }
  }`;

const ERROR_LIMIT = 5;

export function useSudoku(): UseSudokuHook {
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
      const response: DosukuResponse = await fetch(
        "https://sudoku-api.vercel.app/api/dosuku",
        {
          method: "GET",
          query: JSON.stringify({ query: SUDOKU_QUERY }),
        }
      ).then((response) => response.json() as DosukuResponse);

      console.log(response);

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

  async function resetGame() {
    setErrors({});
    setBoard(baseBoard);
  }

  function validateCellInput(row: number, col: number, value: string): boolean {
    if (!value) {
      return;
    }

    const parsedValue = Number(value);

    const validationKey = `${row}${col}`;

    if (parsedValue === solutionBoard[row][col]) {
      if (error[validationKey]) {
        setErrors((prevValue) => {
          return { ...prevValue, [validationKey]: false };
        });
      }

      return true;
    }

    setErrors((prevValue) => {
      return { ...prevValue, [validationKey]: true };
    });

    if (errorCounter + 1 === ERROR_LIMIT) {
      setGameStatus(GameStatus.FINISHED_LOSER);
    }

    setErrorCounter((prevState) => prevState + 1);

    return false;
  }

  useEffect(() => {
    // getBoardFromApi().then(
    //   () => {},
    //   () => {}
    // );
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prevState) => prevState + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
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
    validateCellInput,
    error,
  };
}
