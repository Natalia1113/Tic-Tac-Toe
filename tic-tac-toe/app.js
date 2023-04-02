// As users playing a two player game we want to:

//      enter our names and have them displayed
//      have our order chosen for us by the game
//      take turns placing our marks in empty spaces
//      not be able to place our marks in an occupied space
//      be told when a move causes a player to win, or to draw
//      start the game over without having to reset the browser
// As a user playing a one player game I want to:

// see the name 'Computer' displayed as my opponent
// have the Computer player make moves as if it were a human player with the correct mark in an empty space



//Constants
const XLetter = 'X';
const OLetter = 'O';
const eitherXorO = ['X', 'O'];

let currentValue = null;
let turns = 0;
let boxes = [];

let startButton = null;
let playerOne = '';
let playerTwo = '';

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

//DOM Selectors
const body = document.querySelector('body');
const playerElem = document.createElement('p');

//Variables
let title = document.getElementById('title');
let clearBtn = document.getElementById('clearBtn');
let playerFeedbackEl = null;

//Create Current Player Display
function createPlayerFeedbackContainer() {
    playerFeedbackEl = document.createElement('div');

    playerFeedbackEl.classList.add('players-feedback');
    body.appendChild(playerFeedbackEl);
}

//Title Element
function createTitle() {
    const titleH1 = document.createElement('h1');
    titleH1.id = 'title';
    titleH1.innerText = 'Tic-Tac-Toe';
    body.appendChild(titleH1);
}

//create game board
function createGameBoard() {
    const gameBoardEl = document.createElement('main');

    gameBoardEl.setAttribute('id', 'gameboard');
    gameBoardEl.innerHTML = `
    <div class="box" data-index= "0"></div>
    <div class="box" data-index= "1"></div>
    <div class="box" data-index= "2"></div>
    <div class="box" data-index= "3"></div>
    <div class="box" data-index= "4"></div>
    <div class="box" data-index= "5"></div>
    <div class="box" data-index= "6"></div>
    <div class="box" data-index= "7"></div>
    <div class="box" data-index= "8"></div>
    `;

    body.appendChild(gameBoardEl);
}
// make player name inputs
function playerInputArea() {
    const playerNames = document.createElement('div');

    playerNames.setAttribute('id', 'playerNames');

    playerNames.innerHTML = `
    <input placeholder= "Player 1 Name" id= 'player-one' />
    <input placeholder="Player 2 Name" id= 'player-two' />
    <button id= 'btn-start'></button>
    `;

    body.appendChild(playerNames);
    startButton= document.querySelector('#btn-start');
    startButton.innerText= 'Start Game'
    playerOne = document.querySelector('#player-one');
    playerTwo = document.querySelector('#player-two');
}

//check winner
function checkWinner(winningCombos, boxes) {
    console.log('boxes', boxes);

    for (let combination of winningCombos) {
        const [a, b, c] = combination;
        console.log(a);
        console.log(b);
        console.log(c);

        if (
            boxes[a].dataset.mark &&
            boxes[a].dataset.mark === boxes[b].dataset.mark &&
            boxes[a].dataset.mark === boxes[c].dataset.mark
        ) {
            return true;
        }
    }
    return false;
}
//display everything

const main = () => {
    createTitle();
    createGameBoard();
    playerInputArea();
    createPlayerFeedbackContainer();

    //start game
    const index = zeroOrOne();
    currentValue = eitherXorO[index];

    //select all the boxes
    boxes = document.querySelectorAll('.box');
    console.log(boxes.length);

    //boxes.forEach();

    for (let index = 0; index < boxes.length; index++) {
        boxes[index].addEventListener('click', boxClickerHandler);
    }

    startButton.addEventListener('click', startGame);
};

//click on box function 
function boxClickerHandler(event) {
    //const dataIndex = +event.target.getAttribute('data-index');

    if (playerOne.value === '' && playerTwo.value === '') {
        alert('Please enter player names');
        return;
    }
    const box = event.target;

    if (box.innerText.length === 1) {
        return;
    }

    if (turns === 0) {
        box.innerText = currentValue;
    } else {
        //change to opposite mark
        currentValue = currentValue === 'X' ? 'O' : 'X';
        box.innerText = currentValue;
    }

    //check for the winner
    box.dataset.mark = currentValue;

    if (checkWinner(winningCombos, boxes)) {
        setTimeout(() => {
            alert(`${currentValue} wins`);
            location.reload();
        }, 100)
    } else{ 

    }
    turns++;
};

function startGame() {
    const firstPlayerName = playerOne.value;
    const secondPlayerName = playerTwo.value;

    playerFeedbackEl.innerHTML = `
    <p>${currentValue} goes first!</p>
    <p>${firstPlayerName} : ${currentValue}</p>
    <p>${secondPlayerName} : ${currentValue === 'X' ? 'O' : 'X'}</p>
    `;
};

//randomize function
function zeroOrOne() {
    return Math.random() < 0.5 ? 0 : 1;
};

main();