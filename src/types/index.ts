export type GameSettings = {
  player1: string;
  player2: string;
  extendedStats: "none" | "player1" | "player2";
  sets: number;
  whoStarts: "player1" | "player2";
};
