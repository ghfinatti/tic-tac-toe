const game = (() => {
    let players = [];
    let gameboard = ["","","","","","","","",""];
  
    countX = gameboard.filter(marker => marker === "X").length
    countO = gameboard.filter(marker => marker === "O").length

    return { gameboard, players }

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
                console.log(game.gameboard);
            };
            if (countX > countO && square.textContent === ""){
                game.gameboard[squarePosition] = "O";
                square.textContent = "O"
                console.log(game.gameboard);
            };
            countX = game.gameboard.filter(marker => marker === "X").length
            countO = game.gameboard.filter(marker => marker === "O").length
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