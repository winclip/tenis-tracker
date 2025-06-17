import React from "react";
import { useAppSelector } from "../../redux/hooks";
import type { PlayerStats } from "../../types";
import styles from "./StatsDisplay.module.css";

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
          <div key={key} className={styles.statCard}>
            <div className={styles.statTitle}>{key}</div>
            {renderStats(value)}
          </div>
        );
      }
      return (
        <div key={key} className={styles.statRow}>
          <span>{key}:</span>
          <span>{String(value)}</span>
        </div>
      );
    });
  };

  return (
    <div className={styles.statsWrapper}>
      <h3 className={styles.title}>Статистика играча</h3>
      <div className={styles.grid}>{renderStats(extendedStatsData)}</div>
    </div>
  );
};

export default StatsDisplay;
