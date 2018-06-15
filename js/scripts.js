//Global Variables
var turn = 0;
var gameOver = false;
var spaceArray = [["","",""],["","",""],["","",""]];
var arrayCoordinates = [ ["00","01","02"],
                         ["10","11","12"],
                         ["20","21","22"],
                         ["00","10","20"],
                         ["01","11","21"],
                         ["02","12","22"],
                         ["00","11","22"],
                         ["02","11","20"] ];
var computerXIndex = -1;
var computerYIndex = -1;
var computerX = -1;
var computerY = -1;
//console.log(spaceArray);
//console.log(turn);

//Constructors
function Player(name) {
  this.name = name;
};

function Game (gameEnd) {
  this.gameEnd = gameEnd;
}

function Space (xCoordinate, yCoordinate) {
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
}

function Board (arrayBoard) {
  this.arrayBoard = arrayBoard;
}


//Functions
//Function that determines X or O
function toSymbol (turn) {
  if(turn%2 === 0){
    return "O";
  } else {
    return "X";
  }
}
//Function that displays who wins
function winMessage (){
  if(turn%2 === 0){
    $("#Player2-result").show();
  } else {
    $("#Player1-result").show();
  }
}
//Function that determines if 2 are in a row
function twoInRow (arrayBoard) {
  for (i = 0; i < arrayBoard.length; i++){
    newString = arrayBoard[i].join("");
    if (newString.includes(toSymbol(turn) + toSymbol(turn))){
      if (!newString.includes(toSymbol(turn + 1))){
        computerXIndex = i;
      }
    }
  }
}
//Functions that determine the win condition matrix
function findYIndex (cXIndex, allRowsArray) {
  computerYIndex = allRowsArray[cXIndex].indexOf("");
}
function getCoordinates (indexX,indexY) {
  var separateCoordinates = arrayCoordinates[indexX][indexY].split("");
  computerX = separateCoordinates[0];
  computerY = separateCoordinates[1];
  computerXIndex = -1;
  computerYIndex = -1;
}
function twoCheck (arrayBoard) {
  //Vertical Rows
  var arrayOfVertical = [];
  for (b = 0; b < arrayBoard.length; b ++) {
    for (a = 0; a < arrayBoard[b].length; a ++) {
      arrayOfVertical.push(arrayBoard[a][b]);
    }
  }
  var verticalToRows = []
  for (c = 0; c < arrayBoard.length; c++) {
    verticalToRows.push(arrayOfVertical.slice(c * arrayBoard.length, (c + 1) *  arrayBoard.length));
  }
  //Diagonal Rows
  var diagonalArray = [[],[]]
  for (i = 0; i < 3; i++) {
    diagonalArray[0].push(arrayBoard[i][i]);
  }
  for (j = 0; j < 3; j++) {
    diagonalArray[1].push(arrayBoard[j][2-j]);
  }
  //One array for all 2 in a rows
  var allRows = arrayBoard.concat(verticalToRows).concat(diagonalArray);
  //console.log(allRows);
  twoInRow(allRows);

  if (computerXIndex >= 0){
    //console.log(computerXIndex);
    findYIndex(computerXIndex, allRows);
    getCoordinates (computerXIndex, computerYIndex);
    //alert("play at " + computerX + ", " + computerY);
  }

}
//Function that plays a turn in the game
function turnSequence (arrayBoard, xCoordinate, yCoordinate) {
  if (arrayBoard[xCoordinate][yCoordinate] === "" && !gameOver) {
    if (turn%2 === 0) {
      arrayBoard[xCoordinate].splice(yCoordinate, 1, "X");
      $("#"+ xCoordinate +"-"+ yCoordinate).append("<img src='img/X.png' alt='x'>");
      turn++;
      $("#player2").show();
      $("#player1").hide();
      console.log(arrayBoard);
    } else {
      arrayBoard[xCoordinate].splice(yCoordinate, 1, "O");
      $("#"+ xCoordinate +"-"+ yCoordinate).append("<img src='img/O.png' alt='o'>");
      turn ++;
      $("#player2").hide();
      $("#player1").show();
      console.log(arrayBoard);
    }
  }
}
function turnSequenceComputer (arrayBoard, xCoordinate, yCoordinate) {
  if (arrayBoard[xCoordinate][yCoordinate] === "" && !gameOver) {
      arrayBoard[xCoordinate].splice(yCoordinate, 1, "O");
      $("#"+ xCoordinate +"-"+ yCoordinate).append("<img src='img/O.png' alt='o'>");
      turn++;
      $("#player2").show();
      $("#player1").hide();
      computerX = -1;
      computerY = -1;
  }
}
//Function that checks if anyone wins
function winCheck (arrayBoard, boolean) {
  //Horizontal
  if(arrayBoard[0][0] === toSymbol(turn) && arrayBoard[0][1] === toSymbol(turn) && arrayBoard[0][2] === toSymbol(turn)){
    winMessage();
    gameOver = true;
  }
  if(arrayBoard[1][0] === toSymbol(turn) && arrayBoard[1][1] === toSymbol(turn) && arrayBoard[1][2] === toSymbol(turn)){
    winMessage();
    gameOver = true;
  }
  if(arrayBoard[2][0] === toSymbol(turn) && arrayBoard[2][1] === toSymbol(turn) && arrayBoard[2][2] === toSymbol(turn)){
    winMessage();
    gameOver = true;
  }

  //Vertical
  if(arrayBoard[0][0] === toSymbol(turn) && arrayBoard[1][0] === toSymbol(turn) && arrayBoard[2][0] === toSymbol(turn)){
    winMessage();
    gameOver = true;
  }
  if(arrayBoard[0][1] === toSymbol(turn) && arrayBoard[1][1] === toSymbol(turn) && arrayBoard[2][1] === toSymbol(turn)){
    winMessage();
    gameOver = true;
  }
  if(arrayBoard[0][2] === toSymbol(turn) && arrayBoard[1][2] === toSymbol(turn) && arrayBoard[2][2] === toSymbol(turn)){
    winMessage();
    gameOver = true;
  }

  //Diagonal
  if(arrayBoard[0][0] === toSymbol(turn) && arrayBoard[1][1] === toSymbol(turn) && arrayBoard[2][2] === toSymbol(turn)){
    winMessage();
    gameOver = true;
  }
  if(arrayBoard[0][2] === toSymbol(turn) && arrayBoard[1][1] === toSymbol(turn) && arrayBoard[2][0] === toSymbol(turn)){
    winMessage();
    gameOver = true;
  }


  //Draw
  if(arrayBoard[0][0] !== "" && arrayBoard[0][1] !== "" && arrayBoard[0][2] !== "" &&  arrayBoard[1][0] !== "" && arrayBoard[1][1] !== "" && arrayBoard[1][2] !== "" && arrayBoard[2][0] !== "" && arrayBoard[2][1] !== "" && arrayBoard[2][2] !== "" && !gameOver){
    gameOver = true;
    $("#draw").show();
  }
  if (gameOver) {
    $(".btn").show();
  }
}
//Functions that determine if they can block
function twoCheckBlock (arrayBoard) {
  //Vertical Rows
  var arrayOfVertical = [];
  for (b = 0; b < arrayBoard.length; b ++) {
    for (a = 0; a < arrayBoard[b].length; a ++) {
      arrayOfVertical.push(arrayBoard[a][b]);
    }
  }
  var verticalToRows = []
  for (c = 0; c < arrayBoard.length; c++) {
    verticalToRows.push(arrayOfVertical.slice(c * arrayBoard.length, (c + 1) *  arrayBoard.length));
  }
  //Diagonal Rows
  var diagonalArray = [[],[]]
  for (i = 0; i < 3; i++) {
    diagonalArray[0].push(arrayBoard[i][i]);
  }
  for (j = 0; j < 3; j++) {
    diagonalArray[1].push(arrayBoard[j][2-j]);
  }
  //One array for all 2 in a rows
  var allRows = arrayBoard.concat(verticalToRows).concat(diagonalArray);
  console.log(allRows);
  twoInRowBlock(allRows);

  if (computerXIndex >= 0){
    findYIndex(computerXIndex, allRows);
    getCoordinates (computerXIndex, computerYIndex);
    //alert("play at " + computerX + ", " + computerY);
  }

}
function twoInRowBlock (arrayBoard) {
  for (i = 0; i < arrayBoard.length; i++){
    newString = arrayBoard[i].join("");
    if (newString.includes(toSymbol(turn + 1) + toSymbol(turn + 1))){
      if (!newString.includes(toSymbol(turn))){
        computerXIndex = i;
      }
    }
  }
}
//Function that checks for fork
function forkCheck (arrayBoard) {
  var testArray = arrayBoard.slice();
  var forkInstance = 0;
  var compX = 0;
  var compY = 0;
  //Loop to try each space

  for (a = 0; a < testArray.length; a++) {
    for (b = 0; b < testArray[a].length; b++) {
      if (forkInstance < 2) {
        if (testArray[a][b] === "") {
          testArray[a].splice(b, 1, toSymbol(turn + 1));

          //Turn into large array
          var arrayOfVertical = [];
          for (c = 0; c < testArray.length; c ++) {
            for (d = 0; d < testArray[c].length; d ++) {
              arrayOfVertical.push(testArray[d][c]);
            }
          }
          var verticalToRows = []
          for (e = 0; e < testArray.length; e++) {
            verticalToRows.push(arrayOfVertical.slice(e * testArray.length, (e + 1) *  testArray.length));
          }
          //Diagonal Rows
          var diagonalArray = [[],[]]
          for (i = 0; i < 3; i++) {
            diagonalArray[0].push(testArray[i][i]);
          }
          for (j = 0; j < 3; j++) {
            diagonalArray[1].push(testArray[j][2-j]);
          }


          //One array for all 2 in a rows
          var test2Array = testArray.slice();
          testArray[a].splice(b, 1, "");
          var allRows1 = test2Array.concat(verticalToRows).concat(diagonalArray);

          for (k = 0; k < allRows1.length; k++){
            var newString = allRows1[k].join("");
            if (newString.includes(toSymbol(turn + 1) + toSymbol(turn + 1))){
              if (!newString.includes(toSymbol(turn))){
                forkInstance ++;
              }
            }
          }
          if (forkInstance > 1) {
            compX = a;
            compY = b;
            // alert("fork at " + a + ", " + b);
          } else {
            forkInstance = 0;
          }
        }
      }
    }
  }
}
function forkCheckBlock (arrayBoard) {
  var testArray = arrayBoard.slice();
  var forkInstance = 0;
  var compX = 0;
  var compY = 0;
  //Loop to try each space

  for (a = 0; a < testArray.length; a++) {
    for (b = 0; b < testArray[a].length; b++) {
      if (forkInstance < 2) {
        if (testArray[a][b] === "") {
          testArray[a].splice(b, 1, toSymbol(turn));

          //Turn into large array
          var arrayOfVertical = [];
          for (c = 0; c < testArray.length; c ++) {
            for (d = 0; d < testArray[c].length; d ++) {
              arrayOfVertical.push(testArray[d][c]);
            }
          }
          var verticalToRows = []
          for (e = 0; e < testArray.length; e++) {
            verticalToRows.push(arrayOfVertical.slice(e * testArray.length, (e + 1) *  testArray.length));
          }
          //Diagonal Rows
          var diagonalArray = [[],[]]
          for (i = 0; i < 3; i++) {
            diagonalArray[0].push(testArray[i][i]);
          }
          for (j = 0; j < 3; j++) {
            diagonalArray[1].push(testArray[j][2-j]);
          }


          //One array for all 2 in a rows
          var test2Array = testArray.slice();
          testArray[a].splice(b, 1, "");
          var allRows1 = test2Array.concat(verticalToRows).concat(diagonalArray);

          for (k = 0; k < allRows1.length; k++){
            var newString = allRows1[k].join("");
            if (newString.includes(toSymbol(turn) + toSymbol(turn))){
              if (!newString.includes(toSymbol(turn + 1))){
                forkInstance ++;
              }
            }
          }
          if (forkInstance > 1) {
            compX = a;
            compY = b;
            // alert("block fork at " + a + ", " + b);
          } else {
            forkInstance = 0;
          }
        }
      }
    }
  }
}
//Functions that play on specific cells
function playCenter (arrayBoard) {
  if (arrayBoard[1][1] === "") {
    computerX = 1;
    computerY = 1;
  }
}
function playOppositeCorner (arrayBoard) {
  if (arrayBoard[0][0] === toSymbol(turn + 1) && arrayBoard[2][2] === "") {
    computerX = 2;
    computerY = 2;
  } else if (arrayBoard[2][2] === toSymbol(turn + 1) && arrayBoard[0][0] === "") {
    computerX = 0;
    computerY = 0;
  } else if (arrayBoard[0][2] === toSymbol(turn + 1) && arrayBoard[2][0] === "") {
    computerX = 2;
    computerY = 0;
  }
    else if (arrayBoard[2][0] === toSymbol(turn + 1) && arrayBoard[0][2] === "") {
    computerX = 0;
    computerY = 2;
  }
}
function playCorner (arrayBoard) {
  if (arrayBoard[0][0] === "") {
    computerX = 0;
    computerY = 0;
  } else if (arrayBoard[0][2] === "") {
    computerX = 0;
    computerY = 2;
  } else if (arrayBoard[2][0] === "") {
    computerX = 2;
    computerY = 0;
  } else if (arrayBoard[2][2] === "") {
    computerX = 2;
    computerY = 2;
  }
}
function playSide (arrayBoard) {
  if (arrayBoard[0][1] === "") {
    computerX = 0;
    computerY = 1;
  } else if (arrayBoard[1][0] === "") {
    computerX = 1;
    computerY = 0;
  } else if (arrayBoard[2][1] === "") {
    computerX = 2;
    computerY = 1;
  } else if (arrayBoard[1][2] === "") {
    computerX = 1;
    computerY = 2;
  }
}
//Function that determines the computer's actions
function computerChoice (arrayBoard) {
  if (!gameOver){
    //1. Win - computer has 2 in a row and finishes game
    if (computerX < 0) {
      twoCheck (arrayBoard);
    }
    //2. Block - computer blocks player that has 2 in a row
    if (computerX < 0) {
      twoCheckBlock (arrayBoard);
    }
    //3. Fork - computer plays where it can create a Fork
    if (computerX < 0) {
      forkCheck (arrayBoard);
    }
    //4. Fork Block - computer blocks a potential fork from opponent
    if (computerX < 0) {
      forkCheckBlock (arrayBoard);
    }
    //5. Middle - if middle is open, play on it
    if (computerX < 0) {
      playCenter (arrayBoard);
    }
    //6. Opposite Corner - play in an opposite corner of opponent
    if (computerX < 0) {
      playOppositeCorner (arrayBoard);
    }
    //7. Play in any corner - play in a Corner
    if (computerX < 0) {
      playCorner (arrayBoard);
    }
    //8. Play in any side - play in a side
    if (computerX < 0) {
      playSide (arrayBoard);
    }
  }
}
$(document).ready(function(){
  $(".btn").click(function(){
    turn = 0;
    gameOver = false;
    spaceArray = [["","",""],["","",""],["","",""]];
    $("#player2").hide();
    $("#player1").show();
    $("#Player1-result").hide();
    $("#Player2-result").hide();
    $("#draw").hide();
    $("td").empty();
    newBoard = new Board (spaceArray);
  });
  var newGame = new Game (gameOver);
  var newBoard = new Board (spaceArray);



  $("#0-0").click(function(){
    turnSequence(newBoard.arrayBoard, 0, 0);
    winCheck(newBoard.arrayBoard);
    computerChoice(newBoard.arrayBoard);
    turnSequenceComputer (newBoard.arrayBoard, computerX, computerY);
    winCheck(newBoard.arrayBoard);
  });
  $("#0-1").click(function(){
    turnSequence(newBoard.arrayBoard, 0, 1);
    winCheck(newBoard.arrayBoard);
    computerChoice(newBoard.arrayBoard);
    turnSequenceComputer (newBoard.arrayBoard, computerX, computerY);
    winCheck(newBoard.arrayBoard);
  });
  $("#0-2").click(function(){
    turnSequence(newBoard.arrayBoard, 0, 2);
    winCheck(newBoard.arrayBoard);
    computerChoice(newBoard.arrayBoard);
    turnSequenceComputer (newBoard.arrayBoard, computerX, computerY);
    winCheck(newBoard.arrayBoard);
  });
  $("#1-0").click(function(){
    turnSequence(newBoard.arrayBoard, 1, 0);
    winCheck(newBoard.arrayBoard);
    computerChoice(newBoard.arrayBoard);
    turnSequenceComputer (newBoard.arrayBoard, computerX, computerY);
    winCheck(newBoard.arrayBoard);
  });
  $("#1-1").click(function(){
    turnSequence(newBoard.arrayBoard, 1, 1);
    winCheck(newBoard.arrayBoard);
    computerChoice(newBoard.arrayBoard);
    turnSequenceComputer (newBoard.arrayBoard, computerX, computerY);
    winCheck(newBoard.arrayBoard);
  });
  $("#1-2").click(function(){
    turnSequence(newBoard.arrayBoard, 1, 2);
    winCheck(newBoard.arrayBoard);
    computerChoice(newBoard.arrayBoard);
    turnSequenceComputer (newBoard.arrayBoard, computerX, computerY);
    winCheck(newBoard.arrayBoard);
  });
  $("#2-0").click(function(){
    turnSequence(newBoard.arrayBoard, 2, 0);
    winCheck(newBoard.arrayBoard);
    computerChoice(newBoard.arrayBoard);
    turnSequenceComputer (newBoard.arrayBoard, computerX, computerY);
    winCheck(newBoard.arrayBoard);
  });
  $("#2-1").click(function(){
    turnSequence(newBoard.arrayBoard, 2, 1);
    winCheck(newBoard.arrayBoard);
    computerChoice(newBoard.arrayBoard);
    turnSequenceComputer (newBoard.arrayBoard, computerX, computerY);
    winCheck(newBoard.arrayBoard);
  });
  $("#2-2").click(function(){
    turnSequence(newBoard.arrayBoard, 2, 2);
    winCheck(newBoard.arrayBoard);
    computerChoice(newBoard.arrayBoard);
    turnSequenceComputer (newBoard.arrayBoard, computerX, computerY);
    winCheck(newBoard.arrayBoard);
  });
});
