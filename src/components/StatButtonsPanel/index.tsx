import React from "react";
import { statButtonsConfig } from "../../constants";
import StatButton from "../StatButton";
import styles from "./StatButtonsPanel.module.css";

const StatButtonsPanel: React.FC = () => {
  return (
    <div className={styles.panel}>
      {statButtonsConfig.map(({ category, buttonLabel, options }) => (
        <StatButton
          key={category}
          category={category}
          buttonLabel={buttonLabel}
          options={options}
        />
      ))}
    </div>
  );
};

export default StatButtonsPanel;
