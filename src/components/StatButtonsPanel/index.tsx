import React from "react";
import { statButtonsConfig } from "../../constants";
import StatButton from "../StatButton";

const StatButtonsPanel: React.FC = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
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
