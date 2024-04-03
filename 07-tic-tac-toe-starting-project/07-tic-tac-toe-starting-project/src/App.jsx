import { useState } from "react";

//I am just importing my player component from its file in order to use the players name and symbol
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null ,null, null],
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

      if (gameTurns.length > 0 && gameTurns[0].player === "X"){
        currentPlayer = "O";
      }
      return currentPlayer
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }
    return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol == secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {

  const [players, setPlayers] = useState(PLAYERS);

  const [gameTurns, setGameTurns] = useState([]);

  // This line below is redundent and not needed
  // const [hasWinner, setHasWinner] = useState(false);

  // const [activePlayer, setActivePlayer] = useState("X");

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns)

  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === "X" ? "O" : "X");
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{ square: { row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns];

      return updatedTurns;
    }); 
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers, 
        [symbol]: newName
      }
    });
  }

  return (
    <main>
      <div id="game-container">
        {/*an order list (ol) becuase order matters with first and second player
        both of the id's are for styling*/}
        <ol id="players" className="highlight-player">
          {/*This is a place holder for the players names and their given symbol and it is written as 
          a self closing component becuase its not built to pass any data
          When clicking edit only one player changes and not both. We are using/reusing the same component 
          React with create a new isolated instance and they work isolated from eachother*/}
          {/* Isolated instances use the same logic but on their own and is an important feature in React and is one fo the most 
          powerfull features becuase we can build reswuable components that dont interfier with eachother*/}
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange}/>
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange}/>
          {/* This below was all moved to player.js becuase it is repeating and is a good indicator to 
          create a seperate component becuase when it is changed then it has to be done in two places 
          and can lead to errors*/}
          {/* <li>
                <span className="player">
                //player-name and player-symbol are styling options in the css file
                    <span className="player-name">Player 1</span>
                    <span className="player-symbol">X</span>
                </span>
                <button>Edit</button>
            </li>
            <li>
                <span className="player">
                    <span className="player-name">Player 2</span>
                    <span className="player-symbol">O</span>
                </span> 
                <button>Edit</button>
            </li>*/}
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
