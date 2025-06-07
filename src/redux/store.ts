import { configureStore } from "@reduxjs/toolkit";
import gameSettingsReducer from "./slices/gameSettingsSlice";

export const store = configureStore({
  reducer: {
    gameSettings: gameSettingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
