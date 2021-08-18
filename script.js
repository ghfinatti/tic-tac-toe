const game = (() => {
    let players = [];
    let gameboard = ["","","","","","","","",""];
  
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
    }

    return { gameboard, players, checkForWinner, updateCounter }

})();

const displayController = (() => {
    boardSquares = document.querySelectorAll('.board-squares');
    startButton = document.querySelector('.start');
    initialScreen = document.querySelector('.ask-players-container');
    gameBoardDiv = document.querySelector('#game-board');
    playerOne = document.querySelector('#player1')
    playerTwo = document.querySelector('#player2')
    
    // const fillBoard = (boardSquares) => {
    //     for (let i = 0; i < boardSquares.length; i++){
    //         boardSquares[i].textContent = game.gameboard[i];
    //     };
    // };

    boardSquares.forEach( (square) => {
        square.addEventListener('click', (e) => {
            squarePosition = e.target.dataset.square;

            if (countX === countO && square.textContent === ""){
                game.gameboard[squarePosition] = "X";
                square.textContent = "X"
            };
            if (countX > countO && square.textContent === ""){
                game.gameboard[squarePosition] = "O";
                square.textContent = "O"
            };
            
            game.updateCounter();

            const winner = game.checkForWinner();
            
            if (winner != undefined){
                console.log(winner + ' wins!')
            }

        });
    });

    startButton.addEventListener('click', (e) => {
        e.preventDefault();
        initialScreen.style.animationName = 'slideOut';
        setTimeout(() => {initialScreen.style.visibility = 'hidden'}, 1000);
        gameBoardDiv.style.visibility = 'visible';
        createPlayer(`${playerOne.value}`, 'X');
        createPlayer(`${playerTwo.value}`, 'O');
    })

    return { }

})();

const createPlayer = (name, marker) => {
    game.players.push({name, marker});

    return { name, marker }
};