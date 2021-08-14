const gameModule = (() => {
    let gameboard = [1,2,3,4,5,6,7,8,9];
    return {gameboard}
})();

const createPlayer = (name) => {
    const sayHello = () => {
        console.log(`hello ${name}`)
    }
    return { name, sayHello };
}

const gabriel = createPlayer('Gabriel');
const jonas = createPlayer(`Jonas`);