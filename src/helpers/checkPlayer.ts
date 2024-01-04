export const checkPlayer = (player: string) => {
  if (player === "1") {
    return "⭕";
  } else if (player === "2") {
    return "❌";
  }
  return "";
};
