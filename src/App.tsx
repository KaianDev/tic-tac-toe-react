import { useState } from "react";
import { SquareItem } from "./components/SquareItem";
import { square } from "./data/square";
import { checkPlayer } from "./helpers/checkPlayer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [player, setPlayer] = useState("1");
  const [start, setStart] = useState(true);
  const [squareGame, setSquareGame] = useState(square);

  const gameStart = () => setStart(true);
  const endGame = () => setStart(false);

  const switchPlayer = (item: string, row: number, col: number) => {
    if (start) {
      if (item === "") {
        player === "1" ? setPlayer("2") : setPlayer("1");
        square[row][col] = player;
      }
      return player;
    }
  };

  const resetGame = () => {
    const resetSquare = [...square];
    for (let i in resetSquare) {
      for (let j in resetSquare[i]) {
        resetSquare[i][j] = "";
      }
    }
    gameStart();
    setSquareGame(resetSquare);
  };

  const checkATie = () => {
    return square.every((row) => row.every((item) => item !== ""));
  };

  const checkPlayerWin = (player: string) => {
    if (
      (square[0][0] === player &&
        square[0][1] === player &&
        square[0][2] === player) ||
      (square[1][0] === player &&
        square[1][1] === player &&
        square[1][2] === player) ||
      (square[2][0] === player &&
        square[2][1] === player &&
        square[2][2] === player) ||
      (square[0][0] === player &&
        square[1][0] === player &&
        square[2][0] === player) ||
      (square[0][1] === player &&
        square[1][1] === player &&
        square[2][1] === player) ||
      (square[0][2] === player &&
        square[1][2] === player &&
        square[2][2] === player) ||
      (square[0][0] === player &&
        square[1][1] === player &&
        square[2][2] === player) ||
      (square[2][0] === player &&
        square[1][1] === player &&
        square[0][2] === player)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkGame = (player: string) => {
    const aTie = checkATie();
    if (start && !aTie || checkPlayerWin(player)) {
      if (checkPlayerWin(player)) {
        toast.success(`O jogador ${checkPlayer(player)} ganhou!`, {
          autoClose: 1000,
          position: "top-center",
        });
        endGame();
      }
    } else {
      toast("O jogo empatou", {
        autoClose: 1000,
        position: "top-center",
      });
      endGame();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 px-6 pb-6">
      <div className="mx-auto h-full w-full max-w-lg">
        <h1 className="mb-3 rounded-md border-b p-6 text-center text-xl font-bold tracking-widest text-white">
          <span className="text-red-500">#</span>JOGO DA VELHA👵🏻
        </h1>
        <div className="mb-6 flex justify-between">
          <p className="my-2 text-xl text-white">
            Jogador atual {checkPlayer(player)}
          </p>
          <button
            className="rounded-md border-2 bg-red-500 px-4 py-1 text-lg font-semibold tracking-widest text-white  duration-200 ease-in hover:border-red-500 hover:bg-slate-900 hover:text-red-500"
            onClick={resetGame}
          >
            Reset
          </button>
        </div>
        <div className="grid grid-cols-3 grid-rows-3 gap-6">
          {squareGame.map((rows, rowIndex) =>
            rows.map((item, colIndex) => (
              <SquareItem
                key={`${rowIndex}${colIndex}`}
                switchPlayer={() => switchPlayer(item, rowIndex, colIndex)}
                item={item}
                checkGame={checkGame}
              />
            )),
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
