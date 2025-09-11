import { useMutation } from "@tanstack/react-query";
import { Button, Input } from "antd";
import { Form } from "antd";
import request from "../../tools/request";
import { useNavigate } from "react-router";
import { message } from "antd";
import Uploader from "../utils/Uploader";

function createArticle(data) {
  return request.post("/api/article", data);
}

export default function Add() {
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: createArticle,
  });

  function onSubmit(data) {
    console.log(data);
    mutateAsync(data)
      .then(() => navigate("/article"))
      .catch(() => message.error("error"));
  }

  return (
    <div>
      <Form name="basic" onFinish={onSubmit}>
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Text" name="text" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>

        <Uploader />

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
