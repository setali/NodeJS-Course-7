import io from "socket.io-client";
import { getAccessToken } from "../../tools/utils";
import { useQuery } from "@tanstack/react-query";
import request from "../../tools/request";
import "./chat.css";
import { useState } from "react";
import Chat from "./Chat";

const socket = io(import.meta.env.VITE_BASE_URL, {
  extraHeaders: {
    authorization: getAccessToken(),
  },
});

export default function ChatApp() {
  const [channel, setChannel] = useState();

  const { data: users } = useQuery({
    queryKey: ["people"],
    queryFn: () => request("/api/person").then(({ data }) => data),
  });

  console.log(channel);

  return (
    <div className="chat-app">
      <div className="users">
        {users?.map((user) => (
          <div
            className={`user ${user.id === channel?.id ? "active" : ""}`}
            key={user.id}
            onClick={() => setChannel(user)}
          >
            {user.username}
          </div>
        ))}
      </div>
      {channel ? (
        <Chat key={channel.id} channel={channel} socket={socket} />
      ) : (
        "Please Select a user"
      )}
    </div>
  );
}
