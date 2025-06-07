import type { GameSettings } from "../types";

export const SETS_OPTIONS = [1, 2, 3, 4, 5];

export const DEFAULT_GAME_SETTINGS: Partial<GameSettings> = {
  extendedStats: "none",
  sets: 3,
  whoStarts: "player1",
};
