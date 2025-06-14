import { Typography } from "antd";
import { useAppSelector } from "../../redux/hooks";

const { Text } = Typography;

interface PlayerNameProps {
  playerKey: "player1" | "player2";
  defaultName?: string;
  prefix?: React.ReactNode;
  className?: string;
  strong?: boolean;
}

export default function PlayerName({
  playerKey,
  defaultName = `Играч ${playerKey === "player1" ? "1" : "2"}`,
  prefix = null,
  className = "",
  strong = false,
}: PlayerNameProps) {
  const playerName = useAppSelector(
    (state) => state.gameSettings[playerKey] || defaultName
  );

  return (
    <Text strong={strong} className={className}>
      {prefix && <>{prefix} </>}
      {playerName}
    </Text>
  );
}
