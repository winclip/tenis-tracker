import { List, Typography } from 'antd';
import { StatEntry } from '../utils/statsUtils';

interface StatsListProps {
  stats: StatEntry[];
}

export default function StatsList({ stats }: StatsListProps) {
  return (
    <List
      size="small"
      header={<div>Список статистики</div>}
      bordered
      dataSource={stats}
      renderItem={(item) => (
        <List.Item>
          <Typography.Text>
            {item.type} - {item.result}
          </Typography.Text>
        </List.Item>
      )}
      locale={{ emptyText: 'Статистика пуста' }}
    />
  );
}