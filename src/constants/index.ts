import type { GameSettings } from "../types";

export const SETS_OPTIONS = [1, 2, 3, 4, 5];

export const DEFAULT_GAME_SETTINGS: GameSettings = {
  player1: "",
  player2: "",
  extendedStats: "none",
  sets: 3,
  whoStarts: "player1",
  server: "player1",
  winner: null,
  score: {
    player1: { points: 0, advantage: false, games: 0, sets: 0 },
    player2: { points: 0, advantage: false, games: 0, sets: 0 },
  },
};
