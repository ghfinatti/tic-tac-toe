const game = (() => {
    let players = [];
    let gameboard = ["","","","","","","","",""];
    let playPossible = true;
    let counter = 0;

    const checkForWinner = (gameArray) => {
        if (gameArray[0] != "" && gameArray[0] === gameArray[1] && gameArray[0] === gameArray[2]){
            return gameArray[0]
        }
        if (gameArray[3] != "" && gameArray[3] === gameArray[4] && gameArray[3] === gameArray[5]){
            return gameArray[3]
        }
        if (gameArray[6] != "" && gameArray[6] === gameArray[7] && gameArray[6] === gameArray[8]){
            return gameArray[6]
        }
        if (gameArray[0] != "" && gameArray[0] === gameArray[3] && gameArray[0] === gameArray[6]){
            return gameArray[0]
        }
        if (gameArray[1] != "" && gameArray[1] === gameArray[4] && gameArray[1] === gameArray[7]){
            return gameArray[1]
        }
        if (gameArray[2] != "" && gameArray[2] === gameArray[5] && gameArray[2] === gameArray[8]){
            return gameArray[2]
        }
        if (gameArray[0] != "" && gameArray[0] === gameArray[4] && gameArray[0] === gameArray[8]){
            return gameArray[0]
        }
        if (gameArray[2] != "" && gameArray[2] === gameArray[4] && gameArray[2] === gameArray[6]){
            return gameArray[2]
        }
        if (gameArray.filter(square => square === "").length === 0){
            return "tie"
        }else{
            return ""
        }
    }

    const resetGame = () => {
        game.gameboard = ["","","","","","","","",""];
        game.playPossible = true;
        game.counter = 0;
        displayController.boardSquares.forEach( square => {
            square.textContent = "";
        });
        displayController.playerTurn.textContent = `${game.players[0].name}'s turn!`;
        return gameboard, game.playPossible, game.counter;
    };

    return { gameboard, players, checkForWinner, playPossible, counter, resetGame }

})();

const displayController = (() => {
    const boardSquares = document.querySelectorAll('.board-squares');
    const startButton = document.querySelector('.start');
    const initialScreen = document.querySelector('.ask-players-container');
    const gameBoardDiv = document.querySelector('#game-board');
    const gameDiv = document.querySelector('.game');
    const playerOne = document.querySelector('#player1');
    const playerOneScore = document.querySelector('.player1-score')
    const playerTwo = document.querySelector('#player2');
    const playerTwoScore = document.querySelector('.player2-score')
    const playerTurn = document.querySelector('.player-turn');
    const playAgain = document.querySelector('.play-again');
    const changePlayers = document.querySelector('.change-players');

    boardSquares.forEach( (square) => {
        square.addEventListener('click', (e) => {
            squarePosition = e.target.dataset.square;

            if (game.playPossible === true){
                if (game.counter % 2 == 0 && square.textContent === ""){
                    game.gameboard[squarePosition] = "X";
                    square.textContent = "X"
                    playerTurn.textContent = `${game.players[1].name}'s turn!`
                };
                if (game.counter % 2 != 0 && square.textContent === ""){
                    game.gameboard[squarePosition] = "O";
                    square.textContent = "O"
                    playerTurn.textContent = `${game.players[0].name}'s turn!`
                };
                game.counter ++
            }
            
            let winner = game.checkForWinner(game.gameboard);
            
            if (winner != "" && game.playPossible == true){
                if (winner == "X"){
                    playerTurn.textContent = `${game.players[0].name} wins!`
                    game.players[0].score ++
                    playerOneScore.textContent = `${game.players[0].name}: ${game.players[0].score}`
                };
                if (winner == "O"){
                    playerTurn.textContent = `${game.players[1].name} wins!`
                    game.players[1].score ++
                    playerTwoScore.textContent = `${game.players[1].name}: ${game.players[1].score}`
                }
                if (winner == 'tie'){
                    playerTurn.textContent = `Tie!`
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
        game.players = [];
        if (playerOne.value == ""){
            game.players[0] = createPlayer('Player 1', 'X', 0);
        }else{
            game.players[0] = createPlayer(`${playerOne.value}`, 'X', 0);
        }
        if (playerTwo.value == ""){
            game.players[1] = createPlayer('Player 2', 'O', 0);
        }else{
            game.players[1] = createPlayer(`${playerTwo.value}`, 'O', 0);
        }
        // game.players[0] = createPlayer(`${playerOne.value}`, 'X', 0);
        // game.players[1] = createPlayer(`${playerTwo.value}`, 'O', 0);
        playerTurn.textContent = `${playerOne.value}'s Turn!`;
        playerOneScore.textContent = `${game.players[0].name}: ${game.players[0].score}`
        playerTwoScore.textContent = `${game.players[1].name}: ${game.players[1].score}`
        game.resetGame();
    })

    playAgain.addEventListener('click', game.resetGame);

    changePlayers.addEventListener('click', () => {
        gameDiv.style.visibility = 'hidden';
        initialScreen.style.animationName = 'slideIn';
        initialScreen.style.visibility = 'visible';
        initialScreen.animate([
            { // from
              opacity: 0,
            },
            { // to
              opacity: 1,
            }
          ], 1000);
    })

    return { boardSquares, playerTurn }

})();

const createPlayer = (name, marker, score) => {
    game.players.push({name, marker, score});

    return { name, marker, score }
};