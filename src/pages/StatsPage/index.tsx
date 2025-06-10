import { Card, Typography } from "antd";

const { Title, Text } = Typography;

export default function StatsPage() {
  return (
    <div>
      <Title level={3}>Статистика игре</Title>
      <Card>
        <Text>
          Овде ће бити приказани детаљни подаци и анализе игре, као што су поени
          играча, број освојених сетова, број направљених грешака и друга
          корисна статистика која ће помоћи да боље пратите ток меча и напредак
          играча.
        </Text>
      </Card>
    </div>
  );
}
