let msgCnt = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let newGame = document.querySelector("#new-game");
let resetGame = document.querySelector("#reset-btn");
let boxes = document.querySelectorAll(".box");

let turnO = true;
let count = 0;

let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box was clicked");
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }

    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      drawGame();
    }
  });
});

let checkWinner = () => {
  for (let pattern of winningPattern) {
    let pos1Val1 = boxes[pattern[0]].innerText;
    let pos2Val2 = boxes[pattern[1]].innerText;
    let pos3Val3 = boxes[pattern[2]].innerText;

    if (pos1Val1 != "" && pos2Val2 != "" && pos3Val3 != "") {
      if (pos1Val1 === pos2Val2 && pos2Val2 === pos3Val3) {
        showWinner(pos1Val1);
        return true;
      }
    }
  }
  return false;
};

let showWinner = (winner) => {
  msg.innerText = `Congratulations, the winner is ${winner}`;
  msgCnt.classList.remove("hide");
  msgCnt.scrollIntoView({ behavior: "smooth", block: "center" });
  disableBoxes();
};

let disableBoxes = () => {
  for (const box of boxes) {
    box.disabled = true;
  }
};

let enableBoxes = () => {
  for (const box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const drawGame = () => {
  msg.innerText = "Game was a Draw";
  msgCnt.classList.remove("hide");
  msgCnt.scrollIntoView({ behavior: "smooth", block: "center" });
  disableBoxes();
};

const resetGameHandler = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgCnt.classList.add("hide");
};

newGame.addEventListener("click", resetGameHandler);
resetGame.addEventListener("click", resetGameHandler);
