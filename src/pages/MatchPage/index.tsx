import { Typography, Card, Button, Space } from "antd";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { playerScoresPoint } from "../../redux/slices/gameSettingsSlice";
import MissingPlayerData from "../../components/MissingPlayerData";
import { useNavigate } from "react-router-dom";
import PlayerScore from "../../components/PlayerScore";
import StatButtonsPanel from "../../components/StatButtonsPanel";
import { Collapse } from "antd";
import PlayerName from "../../components/PlayerName";
import SetsHistoryDisplay from "../../components/SetsHistoryDisplay";
import styles from "./MatchPage.module.css";
const { Panel } = Collapse;

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
      <Title className={styles.titlePage} level={3}>
        Тениски Меч
      </Title>
      <div className={styles.topSection}>
        <Collapse
          defaultActiveKey={["1"]}
          style={{ marginBottom: 24 }}
          className={styles.settingsCollapse}
        >
          <Panel header="Наставке игре" key="1">
            <Text>Играч 1: {settings.player1 || "-"}</Text>
            <br />
            <Text>Играч 2: {settings.player2 || "-"}</Text>
            <br />
            <Text>Проширена статистика: {settings.extendedStats || "-"}</Text>
            <br />
            <Text>Број сетова: {settings.sets || "-"}</Text>
            <br />
            <Text>
              <PlayerName
                prefix="Ко почиње: "
                playerKey={settings.whoStarts}
                strong
              />
            </Text>
          </Panel>
        </Collapse>
        <Card style={{ marginBottom: 24 }} className={styles.results}>
          <Title className={styles.subtitle} level={4}>
            Тренутни резултат
          </Title>
          {settings.isTiebreak && (
            <p style={{ color: "#7cd19f", fontWeight: "bold" }}>ТАЈБРЕЈК</p>
          )}
          <Space size="large">
            <PlayerScore player="player1" />
            <PlayerScore player="player2" />
          </Space>
        </Card>
      </div>
      <Card
        style={{
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        {settings.winner ? (
          <div className={styles.resultStatus}>
            <PlayerName
              prefix="🏆 Победник - "
              playerKey={settings.winner}
              strong
            />
            <Button
              type="primary"
              onClick={() => {
                navigate("/stats");
              }}
            >
              Погледајте статистику
            </Button>
          </div>
        ) : (
          <PlayerName
            className="text-center"
            prefix="🎾 Сервис - "
            playerKey={settings.server}
            strong
          />
        )}
      </Card>
      <div className={styles.buttonsPoints}>
        <Space>
          <Button
            onClick={() => onPlayerScore("player1")}
            disabled={hasWinner}
            className={styles.pointButton}
          >
            Поен {settings.player1 || "Играч 1"}
          </Button>
          <Button
            onClick={() => onPlayerScore("player2")}
            disabled={hasWinner}
            className={styles.pointButton}
          >
            Поен {settings.player2 || "Играч 2"}
          </Button>
        </Space>
        <Space>
          <Button onClick={() => navigate("/")} className={styles.outButton}>
            Почетна
          </Button>
        </Space>
      </div>
      <StatButtonsPanel />
      <SetsHistoryDisplay />
    </div>
  );
}
