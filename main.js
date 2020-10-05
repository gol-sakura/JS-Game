const symX = 'x';
const symO = 'o';

const gameCells = document.querySelectorAll('[game-cell]');
let oTurn;
const board = document.getElementById('game-board');

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const message = document.getElementById('WindrawModal');

const gameMessage = document.querySelector('[text]');
const restartGame = document.getElementById('reset');


gameStart();

restartGame.addEventListener('click', gameStart);

function gameStart() {
    oTurn = false;
    gameCells.forEach(cell => {
        cell.classList.remove(symX);
        cell.classList.remove(symO);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true});
    });
    switchTurnHover();
    message.classList.remove('display-modal');
}

function handleClick(e) {
    
    // console.log('clicked');

    const cell = e.target;
    const currentSymbol = oTurn ? symO : symX;
    placedSymbol(cell, currentSymbol);

    if (Winner(currentSymbol)) {
        // console.log('winner');
        gameFinished(false)
    } else if (isTied()) {
        gameFinished(true)
    } else {
        switchTurn();  
        switchTurnHover();
    }
   
}



function gameFinished(draw) {
    if (draw) {
        gameMessage.innerText = 'Draw!';
    } else {
        gameMessage.innerText = `${oTurn ? "Peace" : "Flower"}  is Winner!`;
    }
    message.classList.add('display-modal');
}




function isTied() {
    return [...gameCells].every(cell => {
        return cell.classList.contains(symX) || cell.classList.contains(symO);
    });
}



function placedSymbol(cell, currentSymbol) {
    cell.classList.add(currentSymbol)   
}

function switchTurn() {
    oTurn = !oTurn;
}

function switchTurnHover() {
    board.classList.remove(symX);
    board.classList.remove(symO);
    if (oTurn) {
        board.classList.add(symO);
    } else {
        board.classList.add(symX);
    }
}

function Winner(currentSymbol) {
    return winConditions.some(combination => {
        return combination.every(index => {
            return gameCells[index].classList.contains(currentSymbol);
        });
    });
}