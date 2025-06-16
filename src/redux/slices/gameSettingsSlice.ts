import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { GameSettings, PlayerStats } from "../../types";
import { DEFAULT_GAME_SETTINGS } from "../../constants";

const initialState: GameSettings = DEFAULT_GAME_SETTINGS;

type AddStatPayload = {
  category: keyof PlayerStats;
  type: string;
};

const resetPointsAndAdvantages = (state: GameSettings) => {
  state.score.player1.points = 0;
  state.score.player2.points = 0;
  state.score.player1.advantage = false;
  state.score.player2.advantage = false;
};

const resetGames = (state: GameSettings) => {
  state.score.player1.games = 0;
  state.score.player2.games = 0;
};

const resetTiebreak = (state: GameSettings) => {
  state.isTiebreak = false;
  state.tiebreakTotalPoints = 0;
  state.score.player1.tiebreakPoints = 0;
  state.score.player2.tiebreakPoints = 0;
};

const switchServer = (state: GameSettings) => {
  state.server = state.server === "player1" ? "player2" : "player1";
};

const checkSetWin = (state: GameSettings, scorer: "player1" | "player2") => {
  const opponent = scorer === "player1" ? "player2" : "player1";
  const scorerGames = state.score[scorer].games;
  const opponentGames = state.score[opponent].games;

  if (scorerGames === 6 && opponentGames === 6) {
    state.isTiebreak = true;
    state.tiebreakTotalPoints = 0;
    return;
  }

  if (scorerGames >= 6 && scorerGames - opponentGames >= 2) {
    // ➕ Сохраняем результат сета
    state.setsHistory.push({
      player1: state.score.player1.games,
      player2: state.score.player2.games,
    });

    state.score[scorer].sets += 1;
    resetGames(state);
    resetPointsAndAdvantages(state);

    const setsToWin = Math.ceil(state.sets / 2);
    if (state.score[scorer].sets >= setsToWin) {
      state.winner = scorer;
    }
  }
};

const handleTiebreak = (state: GameSettings, scorer: "player1" | "player2") => {
  const opponent = scorer === "player1" ? "player2" : "player1";

  state.score[scorer].tiebreakPoints =
    (state.score[scorer].tiebreakPoints || 0) + 1;
  state.tiebreakTotalPoints = (state.tiebreakTotalPoints || 0) + 1;

  if (state.tiebreakTotalPoints === 1 || state.tiebreakTotalPoints % 2 === 1) {
    switchServer(state);
  }

  const scorerPoints = state.score[scorer].tiebreakPoints!;
  const opponentPoints = state.score[opponent].tiebreakPoints!;

  if (scorerPoints >= 7 && scorerPoints - opponentPoints >= 2) {
    // ➕ Сохраняем результат сета с тайбрейком
    state.setsHistory.push({
      player1: state.score.player1.tiebreakPoints!,
      player2: state.score.player2.tiebreakPoints!,
    });

    state.score[scorer].sets += 1;
    resetTiebreak(state);
    resetGames(state);

    const setsToWin = Math.ceil(state.sets / 2);
    if (state.score[scorer].sets >= setsToWin) {
      state.winner = scorer;
    } else {
      state.server = state.whoStarts || "player1";
    }
  }
};

const gameSettingsSlice = createSlice({
  name: "gameSettings",
  initialState,
  reducers: {
    addStat(state, action: PayloadAction<AddStatPayload>) {
      const { category, type } = action.payload;

      if (state.extendedStats === "none" || !state.extendedStatsData) return;
      const categoryData = state.extendedStatsData[category];

      if (categoryData && type in categoryData) {
        (categoryData as Record<string, number>)[type]++;
      }
    },

    setGameSettings(state, action: PayloadAction<Partial<GameSettings>>) {
      Object.assign(state, action.payload);
      state.score ||= initialState.score;
      state.setsHistory ||= []; // 🔧 гарантируем, что поле инициализировано

      if (action.payload.whoStarts) {
        state.server = action.payload.whoStarts;
      }
    },

    resetGameSettings: () => ({
      ...DEFAULT_GAME_SETTINGS,
      setsHistory: [], // 🔄 сброс истории сетов
    }),

    playerScoresPoint(state, action: PayloadAction<"player1" | "player2">) {
      const scorer = action.payload;
      const opponent = scorer === "player1" ? "player2" : "player1";
      const scorerScore = state.score[scorer];
      const opponentScore = state.score[opponent];

      if (state.isTiebreak) {
        handleTiebreak(state, scorer);
        return;
      }

      if (scorerScore.advantage) {
        scorerScore.games += 1;
        resetPointsAndAdvantages(state);
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

      scorerScore.games += 1;
      resetPointsAndAdvantages(state);
      switchServer(state);
      checkSetWin(state, scorer);
    },
  },
});

export const {
  setGameSettings,
  resetGameSettings,
  playerScoresPoint,
  addStat,
} = gameSettingsSlice.actions;

export default gameSettingsSlice.reducer;
