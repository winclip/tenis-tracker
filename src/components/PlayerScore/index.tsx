import React from "react";
import { Typography } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { pointsToDisplay } from "../../utils/tennisScoreUtils";

const { Text } = Typography;

interface PlayerScoreProps {
  player: "player1" | "player2";
}

const PlayerScore: React.FC<PlayerScoreProps> = ({ player }) => {
  const settings = useAppSelector((state) => state.gameSettings);
  const playerData = settings.score[player];
  const playerName =
    settings[player] || `Играч ${player === "player1" ? 1 : 2}`;

  return (
    <div>
      <Typography.Title level={5}>{playerName}</Typography.Title>
      <Text>Сетови: {playerData.sets}</Text>
      <br />
      <Text>Геймови у сету: {playerData.games}</Text>
      <br />
      <Text>
        Поени:{" "}
        {settings.isTiebreak
          ? playerData.tiebreakPoints ?? 0
          : pointsToDisplay(playerData.points, playerData.advantage)}
      </Text>
    </div>
  );
};

export default PlayerScore;
