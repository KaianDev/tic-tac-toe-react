import { checkPlayer } from "../helpers/checkPlayer";

type Props = {
  item: string;
  switchPlayer: (item: string) => string | undefined;
  checkGame: (player: string) => void;
};

export const SquareItem = ({ item, switchPlayer, checkGame }: Props) => {
  const handleClick = () => {
    if (item === "") {
      const player = switchPlayer(item);
      if (player) {
        checkGame(player);
      }
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white text-5xl sm:text-8xl duration-300 ease-linear hover:bg-white/40"
    >
      {checkPlayer(item)}
    </div>
  );
};
