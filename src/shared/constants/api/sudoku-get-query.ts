export const SUDOKU_QUERY = `
  {
     newboard(limit:1) {
       grids {
        value,
        solution,
        difficulty,
       }
     }
  }`;