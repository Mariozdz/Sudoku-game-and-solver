import React, { useContext, useEffect, useState } from "react";
import { Board } from "../types/i-board";
import { baseInitialBoard } from "../constants/base-initial-board";
import { getSudokuBoard } from "../api/get-sudoku-board";
import { Difficulty } from "../constants/dificulty";

type ContextType = {
  board: Board;
  solutionBoard: Board;
  originalGameBoard: Board;
  getNewBoard: (difficulty?: Difficulty) => Promise<void>;
  resetGame: () => void;
  updateBoard: (board: Board) => void;
};

const BoardContext = React.createContext<ContextType>({
  board: baseInitialBoard(),
  solutionBoard: baseInitialBoard(),
  originalGameBoard: baseInitialBoard(),
  getNewBoard: () => new Promise((resolve) => {}),
  resetGame: () => {},
  updateBoard: (board: Board) => {},
});

export function BoardContextProvider({ children }) {
  const [currentBoard, setCurrentBoard] = useState<Board>(baseInitialBoard());
  const [originalGameBoard, setOriginalGameBoard] = useState<Board>(
    baseInitialBoard()
  );
  const [solutionBoard, setSolutionBoard] = useState<Board>(baseInitialBoard());
  const [difficulty, setDifficulty] = useState<string>("");

  function updateBoard(board: Board) {
    setCurrentBoard(board);
  }

  function resetGame() {
    setCurrentBoard(originalGameBoard);
  }

  async function getNewBoard(difficulty?: Difficulty) {
    try {
      const response = await getSudokuBoard();

      if (response.newboard.grids.length > 0) {
        const { value, solution, difficulty } = response.newboard.grids[0];

        setCurrentBoard(value);
        setOriginalGameBoard(value);
        setSolutionBoard(solution);
        setDifficulty(difficulty);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSudokuBoard().then(
      () => {},
      () => {}
    );
  }, []);

  return (
    <BoardContext.Provider
      value={{
        board: currentBoard,
        solutionBoard,
        originalGameBoard,
        updateBoard,
        getNewBoard,
        resetGame,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export function useBoardContext(): ContextType {
  const contextProperties = useContext<ContextType>(BoardContext);
  return { ...contextProperties };
}
