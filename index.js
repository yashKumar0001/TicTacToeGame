const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

let winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// lets create a funtion to initialise the game 

function intiGame () {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // green color ko bhi remove karna hai 
        box.classList = `box box${index+1}`; 
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

intiGame();

function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "0";
    }
    else {
        currentPlayer = "X";
    }

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";
    winningPositions.forEach((position) => {
        // all 3 boxes should be non-empty and exactly same in value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
            // check if winner is X or 0
            if(gameGrid[position[0]] === "X")
                answer = "X";
            else 
                answer = "0";

            // disable ponter event

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            // now we have X/0 is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }

    });

    // it means we have a winer
    if(answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // let check winner there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++;
    });

    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}

function handleClick (index) {
    if(gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap karo trun ko
        swapTurn();
        // check kri jeet toh nahi gya
        checkGameOver();
    }
}
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})

newGameBtn.addEventListener("click", intiGame);