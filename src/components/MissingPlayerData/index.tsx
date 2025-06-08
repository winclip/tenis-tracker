import React from "react";
import { Alert, Button } from "antd";
import { useNavigate } from "react-router-dom";

const MissingPlayerData: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 24 }}>
      <Alert
        message="Недостају имена играча"
        description="Молимо унесите имена оба играча пре него што започнете меч."
        type="warning"
        showIcon
      />
      <Button
        type="primary"
        style={{ marginTop: 16 }}
        onClick={() => navigate("/")}
      >
        Врати се на почетни екран
      </Button>
    </div>
  );
};

export default MissingPlayerData;
