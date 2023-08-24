import {Difficulty} from "../constants/dificulty";
import {SUDOKU_QUERY} from "../constants/api/sudoku-get-query";

export async function getSudokuBoard(difficulty?: Difficulty) {
  try {
    const response = await fetch(
      `https://sudoku-api.vercel.app/api/dosuku?query=${SUDOKU_QUERY}`,
      {
        method: "GET",
      }
    ).then((response) => response.json());

    return response
  } catch (error) {
    console.log(error);
  }
}