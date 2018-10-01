module.exports = function solveSudoku(matrix) {
  const findEmptyCells = (matrix) =>{
    const empty = [];
    for (let row = 0; row < 9; row++){
      for (let col = 0; col < 9; col++){
        if (matrix[row][col] === 0) empty.push([row, col]); 
      }
    }
    return empty;
  };
  //check rows, columns & squares
  const checkValues = (matrix, row, col, number) =>{
    const checkRow = (matrix, row, number) =>{
      return !(matrix[row].some((cell) => cell === number)); 
    };
    const checkColumn = (matrix, col, number) =>{
      for (let row = 0; row < 9; row++){
        if (matrix[row][col] === number) return false;
      } 
      return true;
    };
    const checkSquare = (matrix, row, col, number) =>{
      let upperRow = 0;
      let leftCol = 0;
      while(row >= upperRow + 3)  upperRow += 3;
      while(col >= leftCol + 3) leftCol += 3;
      
      for (let row = upperRow, lastRow = upperRow + 3; row < lastRow; row++){
        for (let col = leftCol, lastCol = leftCol + 3; col < lastCol; col++){
          if (matrix[row][col] === number) return false;
        }
      }
      return true;
    };
    
    return(checkRow(matrix, row, number) 
      && checkColumn(matrix, col, number) 
      && checkSquare(matrix, row, col, number)
    );
  };

  const findNumber = (matrix, row, col, number) =>{
    let found = false;
    while (number < 10){
      found = checkValues(matrix, row, col, number);
      if (found) return number;
      number++;
    }
    return 0;
  };

  const solve = (matrix) => {
    const emptyCells = findEmptyCells(matrix);
    const maxTry = emptyCells.length;
    let i = 0;
    while (i < maxTry){
      const coordinates = emptyCells[i];
      const row = coordinates[0];
      const col = coordinates[1];
      const number = matrix[row][col] + 1;
      const foundForCell = findNumber(matrix, row, col, number);
      matrix[row][col] = foundForCell;
      if(foundForCell) i++;
      else i--;
    }
    return matrix;
  };

const innerMatrix = matrix;
const solution = solve(innerMatrix);
return solution;
}
