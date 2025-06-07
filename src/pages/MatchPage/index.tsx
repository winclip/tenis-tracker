import React from "react";
import { Typography, Card } from "antd";
import { useAppSelector } from "../../redux/hooks";

const { Title, Text } = Typography;

export default function MatchPage() {
  // Берём настройки игры из Redux
  const settings = useAppSelector((state) => state.gameSettings);

  return (
    <div>
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
    </div>
  );
}
