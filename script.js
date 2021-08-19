const game = (() => {
    let players = [];
    let gameboard = ["","","","","","","","",""];
    let playPossible = true;
  
    const updateCounter = () => {
        countX = gameboard.filter(marker => marker === "X").length
        countO = gameboard.filter(marker => marker === "O").length
        return countX, countO
    }
    
    updateCounter();

    const checkForWinner = () => {
        if (gameboard[0] != "" && gameboard[0] === gameboard[1] && gameboard[0] === gameboard[2]){
            return gameboard[0]
        }
        if (gameboard[3] != "" && gameboard[3] === gameboard[4] && gameboard[3] === gameboard[5]){
            return gameboard[3]
        }
        if (gameboard[6] != "" && gameboard[6] === gameboard[7] && gameboard[6] === gameboard[8]){
            return gameboard[6]
        }
        if (gameboard[0] != "" && gameboard[0] === gameboard[3] && gameboard[0] === gameboard[6]){
            return gameboard[0]
        }
        if (gameboard[1] != "" && gameboard[1] === gameboard[4] && gameboard[1] === gameboard[7]){
            return gameboard[1]
        }
        if (gameboard[2] != "" && gameboard[2] === gameboard[5] && gameboard[2] === gameboard[8]){
            return gameboard[2]
        }
        if (gameboard[0] != "" && gameboard[0] === gameboard[4] && gameboard[0] === gameboard[8]){
            return gameboard[0]
        }
        if (gameboard[2] != "" && gameboard[2] === gameboard[4] && gameboard[2] === gameboard[5]){
            return gameboard[2]
        }
        if (gameboard.filter(square => square === "").length === 0){
            return "tie"
        }
    }

    return { gameboard, players, checkForWinner, updateCounter, playPossible }

})();

const displayController = (() => {
    const boardSquares = document.querySelectorAll('.board-squares');
    const startButton = document.querySelector('.start');
    const initialScreen = document.querySelector('.ask-players-container');
    const gameBoardDiv = document.querySelector('#game-board');
    const gameDiv = document.querySelector('.game');
    const playerOne = document.querySelector('#player1');
    const playerTwo = document.querySelector('#player2');
    const playerTurn = document.querySelector('.player-turn');

    boardSquares.forEach( (square) => {
        square.addEventListener('click', (e) => {
            squarePosition = e.target.dataset.square;
            
            if (game.playPossible === true){
                if (countX === countO && square.textContent === ""){
                    game.gameboard[squarePosition] = "X";
                    square.textContent = "X"
                    playerTurn.textContent = `${game.players[1].name}'s turn!`
                };
                if (countX > countO && square.textContent === ""){
                    game.gameboard[squarePosition] = "O";
                    square.textContent = "O"
                    playerTurn.textContent = `${game.players[0].name}'s turn!`
                };
            }
            
            game.updateCounter();

            const winner = game.checkForWinner();
            
            if (winner != undefined){
                if (winner === "X"){
                    playerTurn.textContent = `${game.players[0].name} wins!`
                }else{
                    playerTurn.textContent = `${game.players[1].name} wins!`
                }
                game.playPossible = false;
            }
        });
    });

    startButton.addEventListener('click', (e) => {
        e.preventDefault();
        initialScreen.style.animationName = 'slideOut';
        setTimeout(() => {initialScreen.style.visibility = 'hidden'}, 1000);
        gameDiv.style.visibility = 'visible';
        createPlayer(`${playerOne.value}`, 'X');
        createPlayer(`${playerTwo.value}`, 'O');
        playerTurn.textContent = `${playerOne.value}'s Turn!`;
    })

    return { }

})();

const createPlayer = (name, marker) => {
    game.players.push({name, marker});

    return { name, marker }
};