const gameModule = (() => {
    let gameboard = [1,2,3,4,5,6,7,8,9];
    return {gameboard}
})();

const createPlayer = (name) => {
    players = [];
    players.push(name);
    const sayHello = () => {
        console.log(`hello ${players[0]}`)
    }
    return { name, players, sayHello };
}

const gabriel = createPlayer('Gabriel');
console.log(gabriel.name);
gabriel.sayHello();