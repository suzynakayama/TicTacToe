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

document.getElementById('resetBtn').addEventListener('click', init);

//Init the game
init()

//Functions

function init() {
    turn = 1;
    winner = null;


    board = [null, null, null, null, null, null, null, null, null];

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
    if (winner) {
        scores[COLORS[winner]]++
    }

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
        } else {
            square.textContent = ''
            square.classList.remove('green')
            square.classList.remove('yellow')
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

    scoreBoard.innerHTML= `Score: <br /> Green: ${scores['green']} <br /> Yellow: ${scores['yellow']}`;
}