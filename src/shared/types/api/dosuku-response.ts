import {Board} from "../i-board";

export type DosukuResponse = {
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