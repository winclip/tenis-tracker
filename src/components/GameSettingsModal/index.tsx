import React, { useEffect } from "react";
import { Modal, Form, Input, Radio, Button, Select } from "antd";
import { setGameSettings } from "../../redux/slices/gameSettingsSlice";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { isFormValid } from "../../utils/formUtils";
import type { GameSettings } from "../../types";
import { DEFAULT_GAME_SETTINGS, SETS_OPTIONS } from "../../constants";
import { gameSettingsRules } from "../../constants/validationRules";

type Props = {
  open: boolean;
  onClose: () => void;
};

const { Option } = Select;

export default function GameSettingsModal({ open, onClose }: Props) {
  const [form] = Form.useForm<GameSettings>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      form.resetFields();
    }
  }, [open, form]);

  const handleFinish = (values: GameSettings) => {
    dispatch(setGameSettings(values));
    form.resetFields();
    navigate("/match");
    onClose();
  };

  return (
    <Modal
      title="Подешавања игре"
      open={open}
      onCancel={() => {
        onClose();
      }}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={DEFAULT_GAME_SETTINGS}
      >
        <Form.Item
          label="Име играча 1"
          name="player1"
          rules={gameSettingsRules.player1}
        >
          <Input placeholder="Унесите име играча 1" />
        </Form.Item>

        <Form.Item
          label="Име играча 2"
          name="player2"
          rules={gameSettingsRules.player2}
        >
          <Input placeholder="Унесите име играча 2" />
        </Form.Item>

        <Form.Item
          label="Проширена статистика"
          name="extendedStats"
          rules={gameSettingsRules.extendedStats}
        >
          <Radio.Group>
            <Radio value="none">Ниједан</Radio>
            <Radio value="player1">Играч 1</Radio>
            <Radio value="player2">Играч 2</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Број сетова"
          name="sets"
          rules={gameSettingsRules.sets}
        >
          <Select>
            {SETS_OPTIONS.map((num) => (
              <Option key={num} value={num}>
                {num}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Ко почиње"
          name="whoStarts"
          rules={gameSettingsRules.whoStarts}
        >
          <Radio.Group>
            <Radio value="player1">Играч 1</Radio>
            <Radio value="player2">Играч 2</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              block
              disabled={!isFormValid(form)}
            >
              Почни
            </Button>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
}
