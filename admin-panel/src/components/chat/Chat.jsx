import { Button, Form, Input, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import useAuth from "../../hooks/useAuth";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import request from "../../tools/request";

export default function Chat({ socket, channel }) {
  const [form] = useForm();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const listRef = useRef();
  const wrapperListRef = useRef();

  useLayoutEffect(() => {
    listRef.current.scrollIntoView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages[messages.length - 1]]);

  useEffect(() => {
    loadMessages();
    socket.on("message", (data) => setMessages((s) => [...s, data]));
  }, [socket]);

  function handleSubmit({ message }) {
    socket.emit("message", { message, from: user.id, to: channel.id });
    form.resetFields();
  }

  function loadMessages() {
    const prevScrollHeigh = wrapperListRef.current.scrollHeight;
    console.log(prevScrollHeigh);

    request("/api/message", {
      params: { user, channel: channel.id, lastMessage: messages[0]?.id },
    }).then(({ data }) => {
      setMessages((s) => [...data.reverse(), ...s]);
      setTimeout(() => {
        const f = wrapperListRef.current.scrollHeight - prevScrollHeigh;
        wrapperListRef.current.scrollTop = f;
      }, 50);
    });
  }

  function handelScroll(e) {
    if (e.target.scrollTop === 0) {
      loadMessages();
    }
  }

  return (
    <div className="chat-box">
      <div
        className="message-wrapper"
        ref={wrapperListRef}
        onScroll={handelScroll}
      >
        <ul className="messages-list">
          {messages.map((message) => (
            <li
              key={message.id}
              className={`message ${message.from == user?.id ? "owner" : ""} `}
            >
              <div className="text">{message.message}</div>
              <div className="time">{message.createdAt}</div>
            </li>
          ))}
          <li ref={listRef}></li>
        </ul>
      </div>
      <Form onFinish={handleSubmit} form={form}>
        <Space.Compact className="chat-form">
          <Form.Item name="message" className="chat-input">
            <Input autoFocus />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Send
            </Button>
          </Form.Item>
        </Space.Compact>
      </Form>
    </div>
  );
}
