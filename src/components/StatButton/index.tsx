import React, { useState } from "react";
import { Popover, Button, List } from "antd";
import { useAppDispatch } from "../../redux/hooks";
import { addStat } from "../../redux/slices/gameSettingsSlice";
import type { PlayerStats } from "../../types";

interface StatButtonProps {
  category: keyof PlayerStats;
  buttonLabel: string;
  options: { key: string; label: string }[];
}

const StatButton: React.FC<StatButtonProps> = ({
  category,
  buttonLabel,
  options,
}) => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);

  const handleSelect = (type: string) => {
    dispatch(addStat({ category, type }));
    setVisible(false);
  };

  const content = (
    <List
      size="small"
      bordered
      dataSource={options}
      renderItem={(item) => (
        <List.Item
          style={{ cursor: "pointer" }}
          onClick={() => handleSelect(item.key)}
        >
          {item.label}
        </List.Item>
      )}
    />
  );

  return (
    <Popover
      content={content}
      title={buttonLabel}
      trigger="click"
      open={visible}
      onOpenChange={setVisible}
      placement="bottom"
    >
      <Button>{buttonLabel}</Button>
    </Popover>
  );
};

export default StatButton;
