//Global Variables
var turn = 0;
var gameOver = false;
var spaceArray = [["","",""],["","",""],["","",""]];
console.log(spaceArray);
console.log(turn);

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
function toSymbol (turn) {
  if(turn%2 === 0){
    return "O";
  } else {
    return "X";
  }
}
function winMessage (){
  if(turn%2 === 0){
    $("#Player2-result").show();
  } else {
    $("#Player1-result").show();
  }
}
function twoInRow (arrayBoard) {
  for (i = 0; i < arrayBoard.length; i++){
    newString = arrayBoard[i].join("");
    if (newString.includes(toSymbol(turn) + toSymbol(turn))){
      alert("2 in a row");
      if (newString.includes(toSymbol(turn + 1))){
        alert("but it's blocked");
      }
    }
  }
}
function twoInVertical (arrayBoard) {
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
  console.log(verticalToRows);
  twoInRow(verticalToRows);
}

function turnSequence (arrayBoard, xCoordinate, yCoordinate) {
  if (arrayBoard[xCoordinate][yCoordinate] === "" && !gameOver) {
    if (turn%2 === 0) {
      arrayBoard[xCoordinate].splice(yCoordinate, 1, "X");
      $("#"+ xCoordinate +"-"+ yCoordinate).append("<img src='img/X.png' alt='x'>");
      turn++;
      $("#player2").show();
      $("#player1").hide();
      console.log(arrayBoard);
      console.log(turn);
    } else {
      arrayBoard[xCoordinate].splice(yCoordinate, 1, "O");
      $("#"+ xCoordinate +"-"+ yCoordinate).append("<img src='img/O.png' alt='o'>");
      turn ++;
      $("#player2").hide();
      $("#player1").show();
      console.log(arrayBoard);
      console.log(turn);
    }
  }
}
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
    var xIndex = 0;
    var yIndex = 0;
    var newSpace = new Space (xIndex, yIndex);
    turnSequence(newBoard.arrayBoard, newSpace.xCoordinate, newSpace.yCoordinate);
    twoInRow(newBoard.arrayBoard);
    twoInVertical(newBoard.arrayBoard);
    winCheck(newBoard.arrayBoard);
  });
  $("#0-1").click(function(){
    var xIndex = 0;
    var yIndex = 1;
    var newSpace = new Space (xIndex, yIndex);
    turnSequence(newBoard.arrayBoard, newSpace.xCoordinate, newSpace.yCoordinate);
    twoInRow(newBoard.arrayBoard);
    twoInVertical(newBoard.arrayBoard);
    winCheck(newBoard.arrayBoard);
  });
  $("#0-2").click(function(){
    var xIndex = 0;
    var yIndex = 2;
    var newSpace = new Space (xIndex, yIndex);
    turnSequence(newBoard.arrayBoard, newSpace.xCoordinate, newSpace.yCoordinate);
    twoInRow(newBoard.arrayBoard);
    twoInVertical(newBoard.arrayBoard);
    winCheck(newBoard.arrayBoard);
  });
  $("#1-0").click(function(){
    var xIndex = 1;
    var yIndex = 0;
    var newSpace = new Space (xIndex, yIndex);
    turnSequence(newBoard.arrayBoard, newSpace.xCoordinate, newSpace.yCoordinate);
    twoInRow(newBoard.arrayBoard);
    twoInVertical(newBoard.arrayBoard);
    winCheck(newBoard.arrayBoard);
  });
  $("#1-1").click(function(){
    var xIndex = 1;
    var yIndex = 1;
    var newSpace = new Space (xIndex, yIndex);
    turnSequence(newBoard.arrayBoard, newSpace.xCoordinate, newSpace.yCoordinate);
    twoInRow(newBoard.arrayBoard);
    twoInVertical(newBoard.arrayBoard);
    winCheck(newBoard.arrayBoard);
  });
  $("#1-2").click(function(){
    var xIndex = 1;
    var yIndex = 2;
    var newSpace = new Space (xIndex, yIndex);
    turnSequence(newBoard.arrayBoard, newSpace.xCoordinate, newSpace.yCoordinate);
    twoInRow(newBoard.arrayBoard);
    twoInVertical(newBoard.arrayBoard);
    winCheck(newBoard.arrayBoard);
  });
  $("#2-0").click(function(){
    var xIndex = 2;
    var yIndex = 0;
    var newSpace = new Space (xIndex, yIndex);
    turnSequence(newBoard.arrayBoard, newSpace.xCoordinate, newSpace.yCoordinate);
    twoInRow(newBoard.arrayBoard);
    twoInVertical(newBoard.arrayBoard);
    winCheck(newBoard.arrayBoard);
  });
  $("#2-1").click(function(){
    var xIndex = 2;
    var yIndex = 1;
    var newSpace = new Space (xIndex, yIndex);
    turnSequence(newBoard.arrayBoard, newSpace.xCoordinate, newSpace.yCoordinate);
    twoInRow(newBoard.arrayBoard);
    twoInVertical(newBoard.arrayBoard);
    winCheck(newBoard.arrayBoard);
  });
  $("#2-2").click(function(){
    var xIndex = 2;
    var yIndex = 2;
    var newSpace = new Space (xIndex, yIndex);
    turnSequence(newBoard.arrayBoard, newSpace.xCoordinate, newSpace.yCoordinate);
    twoInRow(newBoard.arrayBoard);
    twoInVertical(newBoard.arrayBoard);
    winCheck(newBoard.arrayBoard);
  });

});

//Vertical








//   var cell0 = $("#00").val();
//   var cell1 = $("#01").val();
//   var cell2 = $("#02").val();
//   var cell3 = $("#10").val();
//   var cell4 = $("#11").val();
//   var cell5 = $("#12").val();
//   var cell6 = $("#20").val();
//   var cell7 = $("#21").val();
//   var cell8 = $("#22").val();
//   var cells = [cell0, cell1, cell2, cell3, cell4, cell5, cell5, cell6, cell7, cell8]
// });
