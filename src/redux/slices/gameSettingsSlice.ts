import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ExtendedStats = "none" | "player1" | "player2";

export interface GameSettings {
  player1: string;
  player2: string;
  extendedStats: ExtendedStats;
  sets: number;
  whoStarts: "player1" | "player2";
}

const initialState: GameSettings = {
  player1: "",
  player2: "",
  extendedStats: "none",
  sets: 3,
  whoStarts: "player1",
};

const gameSettingsSlice = createSlice({
  name: "gameSettings",
  initialState,
  reducers: {
    setGameSettings(state, action: PayloadAction<GameSettings>) {
      console.log(action);

      return { ...action.payload };
    },
    resetGameSettings() {
      return initialState;
    },
  },
});

export const { setGameSettings, resetGameSettings } = gameSettingsSlice.actions;
export default gameSettingsSlice.reducer;
