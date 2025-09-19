import Message from "./models/message.mjs";

const map = new Map();

export default function chat(socket, io) {
  const user = socket.request.user;
  map.set(user.id, socket.id);

  socket.on("message", async (data) => {
    console.log(data);
    console.log(map.get(data.to));

    const message = new Message(data);
    await message.save();

    socket.to(map.get(data.to)).emit("message", message);
    socket.emit("message", message);
  });
}
