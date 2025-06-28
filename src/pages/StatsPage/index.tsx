import { useNavigate } from "react-router-dom";
import SetsHistoryDisplay from "../../components/SetsHistoryDisplay";
import StatsDisplay from "../../components/StatsDisplay";
import { Button } from "antd";

export default function StatsPage() {
  const navigate = useNavigate();

  return (
    <>
      <SetsHistoryDisplay />
      <StatsDisplay />
      <Button
        type="primary"
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </Button>
    </>
  );
}
