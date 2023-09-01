import { useEffect, useState } from "react";
import { Board } from "../../shared/types/i-board";
import { GameStatus } from "../../shared/constants/game-status";
import { BoardErrors } from "../../shared/types/i-board-errors";
import { baseInitialBoard } from "../../shared/constants/base-initial-board";
import { Difficulty } from "../../shared/constants/dificulty";
import { getSudokuBoard } from "../../shared/api/get-sudoku-board";
import { useBoardContext } from "../../shared/context/board-context";

type UseSudokuHook = {
  baseBoard: Board;
  resetGame: () => void;
  generateNewGame: (difficulty?: Difficulty) => void;
  isCustomBoardOpen: boolean;
  setIsCustomBoardOpen: (value: boolean) => void;
};

const ERROR_LIMIT = 5;

export function useSudoku(): UseSudokuHook {
  const { getNewBoard, resetGame, originalGameBoard } = useBoardContext();

  const [isCustomBoardOpen, setIsCustomBoardOpen] = useState(false);

  useEffect(() => {
    getNewBoard().then(
      () => {},
      () => {}
    );
  }, []);

  return {
    baseBoard: originalGameBoard,
    isCustomBoardOpen,
    setIsCustomBoardOpen,
    generateNewGame: getNewBoard,
    resetGame,
  };
}
