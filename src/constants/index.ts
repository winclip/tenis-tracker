import type { GameSettings, PlayerStats, StatButtonCategory } from "../types";

export const SETS_OPTIONS = [1, 2, 3, 4, 5];

export const DEFAULT_EXTENDED_STATS_DATA: PlayerStats = {
  forehand: { success: 0, net: 0, out: 0 },
  backhand: { success: 0, net: 0, out: 0 },
  volley: { success: 0, net: 0, out: 0 },
  smash: { success: 0, error: 0 },
  dropshot: { success: 0, error: 0 },
  slice: { success: 0, error: 0 },
  netApproach: { success: 0, error: 0 },
  serve: { ace: 0, fault1: 0, doubleFault: 0 },
  breakpoints: { received: 0, converted: 0, saved: 0 },
};

export const DEFAULT_GAME_SETTINGS: GameSettings = {
  player1: "",
  player2: "",
  extendedStats: "none",
  extendedStatsData: DEFAULT_EXTENDED_STATS_DATA,
  sets: 3,
  whoStarts: "player1",
  server: "player1",
  winner: null,
  score: {
    player1: { points: 0, advantage: false, games: 0, sets: 0 },
    player2: { points: 0, advantage: false, games: 0, sets: 0 },
  },
};

export const statButtonsConfig: StatButtonCategory[] = [
  {
    category: "forehand",
    buttonLabel: "Форхенд",
    options: [
      { key: "success", label: "Успешан" },
      { key: "net", label: "У мрежу" },
      { key: "out", label: "Напољу" },
    ],
  },
  {
    category: "backhand",
    buttonLabel: "Бекхенд",
    options: [
      { key: "success", label: "Успешан" },
      { key: "net", label: "У мрежу" },
      { key: "out", label: "Напољу" },
    ],
  },
  {
    category: "volley",
    buttonLabel: "Волеј",
    options: [
      { key: "success", label: "Успешан" },
      { key: "net", label: "У мрежу" },
      { key: "out", label: "Напољу" },
    ],
  },
  {
    category: "smash",
    buttonLabel: "Смеш",
    options: [
      { key: "success", label: "Успешан" },
      { key: "error", label: "Грешка" },
    ],
  },
  {
    category: "dropshot",
    buttonLabel: "Дроп-шот",
    options: [
      { key: "success", label: "Успешан" },
      { key: "error", label: "Грешка" },
    ],
  },
  {
    category: "slice",
    buttonLabel: "Слејс",
    options: [
      { key: "success", label: "Успешан" },
      { key: "error", label: "Грешка" },
    ],
  },
  {
    category: "netApproach",
    buttonLabel: "Удар са мреже",
    options: [
      { key: "success", label: "Успешан" },
      { key: "error", label: "Грешка" },
    ],
  },
  {
    category: "serve",
    buttonLabel: "Сервис",
    options: [
      { key: "ace", label: "Ејс" },
      { key: "fault1", label: "Прва грешка" },
      { key: "doubleFault", label: "Дупла грешка" },
    ],
  },
  {
    category: "breakpoints",
    buttonLabel: "Брејк поени",
    options: [
      { key: "received", label: "Примљени брејк поени" },
      { key: "converted", label: "Освојени брејк поени" },
      { key: "saved", label: "Спашени брејк поени" },
    ],
  },
];
