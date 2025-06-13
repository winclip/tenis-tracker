import React from "react";
import { useAppSelector } from "../../redux/hooks";
import type { PlayerStats } from "../../types";

const StatsDisplay: React.FC = () => {
  const extendedStatsData = useAppSelector(
    (state) => state.gameSettings.extendedStatsData
  ) as PlayerStats | null;

  if (!extendedStatsData) {
    return <div>Статистика није доступна</div>;
  }

  const renderStats = (stats: any) => {
    return Object.entries(stats).map(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        return (
          <div
            key={key}
            style={{ marginLeft: 16, marginBottom: 8, width: "30%" }}
          >
            <strong>{key}:</strong>
            <div>{renderStats(value)}</div>
          </div>
        );
      }
      return (
        <div key={key} style={{ marginLeft: 32 }}>
          {key}: {String(value)}
        </div>
      );
    });
  };

  return (
    <div>
      <h3>Статистика играча</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {renderStats(extendedStatsData)}
      </div>
    </div>
  );
};

export default StatsDisplay;
