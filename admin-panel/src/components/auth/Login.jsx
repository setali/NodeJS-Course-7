import { Button, Form, Input } from "antd";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  function onFinish(data) {
    setLoading(true);
    login(data).finally(() => setLoading(false));
  }

  return (
    <Form name="basic" onFinish={onFinish}>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Login;
