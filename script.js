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
        if (gameboard[0] === gameboard[1] && gameboard[0] === gameboard[2]){
            console.log('you win')
        }
    }

    return { gameboard, players, checkForWinner, updateCounter }

})();

const displayController = (() => {
    boardSquares = document.querySelectorAll('.board-squares');
    
    const fillBoard = (boardSquares) => {
        for (let i = 0; i < boardSquares.length; i++){
            boardSquares[i].textContent = game.gameboard[i];
        }
    }

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

        });
    });

    return { fillBoard }

})();

const createPlayer = (name, marker) => {
    game.players.push({name, marker});

    return { name, marker }
}

const gabriel = createPlayer('Gabriel', 'X');
const jonas = createPlayer('Jonas', 'O');