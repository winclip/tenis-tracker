export type ExtendedStats = "none" | "player1" | "player2";

export interface Score {
  points: number;
  advantage: boolean;
  games: number;
  sets: number;
}

export interface GameSettings {
  player1: string;
  player2: string;
  extendedStats: ExtendedStats;
  sets: number;
  whoStarts: "player1" | "player2";
  server: "player1" | "player2";
  winner: "player1" | "player2" | null;
  score: {
    player1: Score;
    player2: Score;
  };
}
