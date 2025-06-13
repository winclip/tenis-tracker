export type ExtendedStats = "none" | "player1" | "player2";

export interface Score {
  points: number;
  advantage: boolean;
  games: number;
  sets: number;
  tiebreakPoints?: number;
}

export interface DirectionalShotStats {
  success: number;
  net: number;
  out: number;
}

export interface BasicShotStats {
  success: number;
  error: number;
}

export interface ServeStats {
  ace: number;
  fault1: number;
  doubleFault: number;
}

export interface BreakpointStats {
  received: number;
  converted: number;
  saved: number;
}

export interface PlayerStats {
  forehand: DirectionalShotStats;
  backhand: DirectionalShotStats;
  volley: DirectionalShotStats;
  smash: BasicShotStats;
  dropshot: BasicShotStats;
  slice: BasicShotStats;
  netApproach: BasicShotStats;
  serve: ServeStats;
  breakpoints: BreakpointStats;
}

type DirectionalShotOption = {
  key: keyof DirectionalShotStats;
  label: string;
};

type BasicShotOption = {
  key: keyof BasicShotStats;
  label: string;
};

type ServeOption = {
  key: keyof ServeStats;
  label: string;
};

type BreakpointOption = {
  key: keyof BreakpointStats;
  label: string;
};

export type StatButtonCategory =
  | {
      category: "forehand" | "backhand" | "volley";
      buttonLabel: string;
      options: DirectionalShotOption[];
    }
  | {
      category: "smash" | "dropshot" | "slice" | "netApproach";
      buttonLabel: string;
      options: BasicShotOption[];
    }
  | {
      category: "serve";
      buttonLabel: string;
      options: ServeOption[];
    }
  | {
      category: "breakpoints";
      buttonLabel: string;
      options: BreakpointOption[];
    };

export interface GameSettings {
  player1: string;
  player2: string;
  extendedStats: ExtendedStats;
  extendedStatsData: PlayerStats;
  sets: number;
  whoStarts: "player1" | "player2";
  server: "player1" | "player2";
  winner: "player1" | "player2" | null;
  isTiebreak?: boolean;
  tiebreakTotalPoints?: number;
  score: {
    player1: Score;
    player2: Score;
  };
}
