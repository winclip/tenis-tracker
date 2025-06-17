import React from "react";
import type { SetResult } from "../../types";
import { useAppSelector } from "../../redux/hooks";
import styles from "./SetsHistoryDisplay.module.css";

const SetsHistoryDisplay: React.FC = () => {
  const setsHistory = useAppSelector((state) => state.gameSettings.setsHistory);
  const { player1, player2 } = useAppSelector((state) => state.gameSettings);

  const player1Name = player1 || "Играч 1";
  const player2Name = player2 || "Играч 2";

  if (!setsHistory || setsHistory.length === 0) {
    return <h2 className={styles.title}>Још увек нема одиграних сетова</h2>;
  }

  return (
    <div className={styles.historyDisplay}>
      <h2 className={styles.title}>Историја сетова:</h2>
      <ul className={styles.setsList}>
        {setsHistory.map((set: SetResult, index: number) => (
          <li key={index} className={styles.setItem}>
            <span className={styles.setLabel}>Сет {index + 1}:</span>
            <span>
              {player1Name} {set.player1} – {set.player2} {player2Name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SetsHistoryDisplay;
