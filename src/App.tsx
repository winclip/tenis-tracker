import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MatchPage from "./pages/MatchPage";
import StatsPage from "./pages/StatsPage";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/match" element={<MatchPage />} />
      <Route path="/stats" element={<StatsPage />} />
    </Routes>
  );
}
