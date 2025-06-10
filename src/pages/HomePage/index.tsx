import { useState } from "react";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import GameSettingsModal from "../../components/GameSettingsModal";

const { Title } = Typography;

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className={styles.container}>
      <Title level={2}>Тениски Трекер</Title>
      <div className={styles.buttonGroup}>
        <Button type="primary" size="large" onClick={openModal}>
          Почни меч
        </Button>
        <Button size="large" onClick={() => navigate("/stats")}>
          Анализирај игру
        </Button>
      </div>

      <GameSettingsModal open={modalOpen} onClose={closeModal} />
    </div>
  );
}
