// CONSTANTS

const COLORS = {
    '1' : 'green',
    'null': 'black',
    '-1': 'yellow'
}

//App state variables
let board, winner, turn; 
let winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let scores = {
    'green': 0,
    'yellow': 0
}

//Cache
let msg = document.getElementById('msg');
const scoreBoard = document.getElementById('score');

//Event Listeners
document.getElementById('board').addEventListener('click', handleClick);

document.getElementById('resetBtn').addEventListener('click', refresh);

//Init the game
init()

//Functions

function init() {
    turn = 1;
    winner = null;


    board = [null, null, null, null, null, null, null, null, null];

    setScore();
    render();
}

function handleClick(event) {
    //get the one that was clicked
    const clicked = event.target;

    //get the space index
    const squareIndex = parseInt(clicked.id.replace('s', ''));

    //return is square index is not a number or if there is a winner
    if (board[squareIndex] || winner) return;

    //update the board
    board[squareIndex] = turn;

    //update the turn
    turn *= -1;

    //set winner
    setWinner();

    //set score
    setScore();

    //render de board after click
    render();
}

function setWinner() {
    for (let i = 0; i < winningCombos.length; i++) {
        if (Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]]) === 3) {
            winner = board[winningCombos[i][0]];
        }
        if (winner) break;
    }
    if (winner) return winner;
    else if (board.includes(null)) {
            return null;
        } else {
            winner = 'T'
        }
    }

function render() {
    board.forEach((cell, squareIndex) => {
        const square = document.getElementById(`s${squareIndex}`);
        square.style.color = COLORS[cell]
        if (COLORS[cell] === 'green') {
            square.textContent = 'X'
            square.classList.add('green')
        } else if (COLORS[cell] === 'yellow') {
            square.textContent = 'O'
            square.classList.add('yellow')
        }
    })

    if (winner){
        if (winner === 'T') {
            msg.textContent = "It's a tie!"
        } else {
            const winnerColor = COLORS[winner];
            msg.innerHTML = `<span style="color:${winnerColor}">${winnerColor.toUpperCase()}</span> Wins! Yay!`;
        }
    } else {
        const turnColor = COLORS[turn];
        msg.innerHTML = `<span style="color:${turnColor}">${turnColor.toUpperCase()}</span>'s Turn`;
    }

    //setScore();
}

function setScore() {
    scoreBoard.innerHTML= `Score: <br /> Green: 0 <br /> Yellow: 0`;
    //for (let i = 0; i<; i++)
    if (winner) {
        if (winner === 'green') {
            scoreBoard.innerHTML= `Score: <br /> Green: ${scores[0].value + 1} <br /> Yellow: ${scores[1].value}`;
        }
        if (winner === 'yellow') {
            scoreBoard.innerHTML= `Score: <br /> Green: ${scores[0].value} <br /> Yellow: ${scores[1].value + 1}`;
        }
    }
}

function refresh() {
    const square = document.getElementById(`s${squareIndex}`);
    board.forEach(square => {
        square.style.color = COLORS[null]
        square.classList.remove('green')
        square.classList.remove('yellow')
    });

    init()
}