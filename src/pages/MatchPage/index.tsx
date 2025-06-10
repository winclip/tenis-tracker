import { Typography, Card, Button, Space } from "antd";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { playerScoresPoint } from "../../redux/slices/gameSettingsSlice";
import MissingPlayerData from "../../components/MissingPlayerData";
import { useNavigate } from "react-router-dom";
import PlayerScore from "../../components/PlayerScore";

const { Title, Text } = Typography;

export default function MatchPage() {
  const settings = useAppSelector((state) => state.gameSettings);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onPlayerScore = (player: "player1" | "player2") => {
    dispatch(playerScoresPoint(player));
  };

  const isMissingData = !settings.player1 || !settings.player2;
  const hasWinner = Boolean(settings.winner);

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
          <PlayerScore player="player1" />
          <PlayerScore player="player2" />
        </Space>
      </Card>

      <Space>
        <Button onClick={() => onPlayerScore("player1")} disabled={hasWinner}>
          Поен {settings.player1 || "Играч 1"}
        </Button>
        <Button onClick={() => onPlayerScore("player2")} disabled={hasWinner}>
          Поен {settings.player2 || "Играч 2"}
        </Button>

        <Button onClick={() => navigate("/")}>Почетна</Button>
      </Space>

      {settings.winner && <h1>🏆 Победник - {settings.winner}</h1>}
      <h1>🎾 Сервис - {settings.server}</h1>
    </div>
  );
}
