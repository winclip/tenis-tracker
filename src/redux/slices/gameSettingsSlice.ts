import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { GameSettings } from "../../types";
import { DEFAULT_GAME_SETTINGS } from "../../constants";

const initialState: GameSettings = DEFAULT_GAME_SETTINGS;

const checkSetWin = (state: GameSettings, scorer: "player1" | "player2") => {
  const opponent = scorer === "player1" ? "player2" : "player1";
  const scorerGames = state.score[scorer].games;
  const opponentGames = state.score[opponent].games;

  if (scorerGames >= 6 && scorerGames - opponentGames >= 2) {
    state.score[scorer].sets += 1;

    state.score.player1.games = 0;
    state.score.player2.games = 0;

    state.score.player1.points = 0;
    state.score.player2.points = 0;
    state.score.player1.advantage = false;
    state.score.player2.advantage = false;

    const setsToWin = Math.ceil(state.sets / 2);

    if (state.score[scorer].sets >= setsToWin) {
      state.winner = scorer;
    }
  }
};

const switchServer = (state: GameSettings) => {
  state.server = state.server === "player1" ? "player2" : "player1";
};

const gameSettingsSlice = createSlice({
  name: "gameSettings",
  initialState,
  reducers: {
    setGameSettings(state, action: PayloadAction<Partial<GameSettings>>) {
      console.log(action.payload);

      Object.assign(state, action.payload);
      if (!state.score) {
        state.score = initialState.score;
      }
      if (action.payload.whoStarts) {
        state.server = action.payload.whoStarts;
      }
    },

    resetGameSettings() {
      return initialState;
    },

    playerScoresPoint(state, action: PayloadAction<"player1" | "player2">) {
      const scorer = action.payload;
      const opponent = scorer === "player1" ? "player2" : "player1";

      const scorerScore = state.score[scorer];
      const opponentScore = state.score[opponent];

      if (scorerScore.advantage) {
        scorerScore.games += 1;

        scorerScore.points = 0;
        scorerScore.advantage = false;
        opponentScore.points = 0;
        opponentScore.advantage = false;

        switchServer(state);
        checkSetWin(state, scorer);
        return;
      }

      if (opponentScore.advantage) {
        opponentScore.advantage = false;
        return;
      }

      if (scorerScore.points === 3 && opponentScore.points === 3) {
        scorerScore.advantage = true;
        return;
      }

      if (scorerScore.points < 3) {
        scorerScore.points += 1;
        return;
      }

      if (scorerScore.points === 3 && opponentScore.points < 3) {
        scorerScore.games += 1;

        scorerScore.points = 0;
        scorerScore.advantage = false;
        opponentScore.points = 0;
        opponentScore.advantage = false;

        switchServer(state);
        checkSetWin(state, scorer);
        return;
      }
    },
  },
});

export const { setGameSettings, resetGameSettings, playerScoresPoint } =
  gameSettingsSlice.actions;
export default gameSettingsSlice.reducer;
