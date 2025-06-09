import React from "react";
import { Typography, Card, Button, Space } from "antd";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { playerScoresPoint } from "../../redux/slices/gameSettingsSlice";
import MissingPlayerData from "../../components/MissingPlayerData";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const pointsToDisplay = (points: number, advantage: boolean) => {
  if (advantage) return "Adv";
  switch (points) {
    case 0:
      return "0";
    case 1:
      return "15";
    case 2:
      return "30";
    case 3:
      return "40";
    default:
      return "";
  }
};

export default function MatchPage() {
  const settings = useAppSelector((state) => state.gameSettings);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onPlayerScore = (player: "player1" | "player2") => {
    dispatch(playerScoresPoint(player));
  };

  const isMissingData = !settings.player1 || !settings.player2;

  if (isMissingData) {
    return <MissingPlayerData />;
  }

  return (
    <div style={{ padding: 20 }}>
      <Title level={3}>Тениски Меч</Title>

      <Card style={{ marginBottom: 24 }}>
        <Title level={4}>Наставке игре</Title>
        <Text>Играч 1: {settings.player1 || "-"}</Text>
        <br />
        <Text>Играч 2: {settings.player2 || "-"}</Text>
        <br />
        <Text>Проширена статистика: {settings.extendedStats || "-"}</Text>
        <br />
        <Text>Број сетова: {settings.sets || "-"}</Text>
        <br />
        <Text>Ко почиње: {settings.whoStarts || "-"}</Text>
      </Card>

      <Card style={{ marginBottom: 24 }}>
        <Title level={4}>Тренутни резултат</Title>
        {settings.isTiebreak && (
          <p style={{ color: "red", fontWeight: "bold" }}>ТАЈБРЕЈК</p>
        )}
        <Space size="large">
          <div>
            <Title level={5}>{settings.player1 || "Играч 1"}</Title>
            <Text>Сетови: {settings.score.player1.sets}</Text>
            <br />
            <Text>Геймови у сету: {settings.score.player1.games}</Text>
            <br />
            <Text>
              Поени:{" "}
              {settings.isTiebreak
                ? settings.score.player1.tiebreakPoints ?? 0
                : pointsToDisplay(
                    settings.score.player1.points,
                    settings.score.player1.advantage
                  )}
            </Text>
          </div>

          <div>
            <Title level={5}>{settings.player2 || "Играч 2"}</Title>
            <Text>Сетови: {settings.score.player2.sets}</Text>
            <br />
            <Text>Геймови у сету: {settings.score.player2.games}</Text>
            <br />
            <Text>
              Поени:{" "}
              {settings.isTiebreak
                ? settings.score.player2.tiebreakPoints ?? 0
                : pointsToDisplay(
                    settings.score.player2.points,
                    settings.score.player2.advantage
                  )}
            </Text>
          </div>
        </Space>
      </Card>

      <Space>
        <Button onClick={() => onPlayerScore("player1")}>
          Поен {settings.player1 || "Играч 1"}
        </Button>
        <Button onClick={() => onPlayerScore("player2")}>
          Поен {settings.player2 || "Играч 2"}
        </Button>

        <Button onClick={() => navigate("/")}>Почетна</Button>
      </Space>

      {settings.winner && <h1>🏆 Победник - {settings.winner}</h1>}
      <h1>🎾 Сервис - {settings.server}</h1>
    </div>
  );
}
