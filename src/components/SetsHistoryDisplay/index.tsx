import React from "react";
import type { SetResult } from "../../types";
import { useAppSelector } from "../../redux/hooks";

const SetsHistoryDisplay: React.FC = () => {
  const setsHistory = useAppSelector((state) => state.gameSettings.setsHistory);
  const { player1, player2 } = useAppSelector((state) => state.gameSettings);

  const player1Name = player1 || "Играч 1";
  const player2Name = player2 || "Играч 2";

  if (!setsHistory || setsHistory.length === 0) {
    return <div>Још увек нема одиграних сетова</div>;
  }

  return (
    <div>
      <h3>Историја сетова:</h3>
      <ul>
        {setsHistory.map((set: SetResult, index: number) => (
          <li key={index}>
            Сет {index + 1}: {player1Name} {set.player1} – {set.player2}{" "}
            {player2Name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SetsHistoryDisplay;
