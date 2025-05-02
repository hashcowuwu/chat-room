import { useState, useEffect } from "react";

import io from "socket.io-client";

let socket;

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  const [inputMessage, setInputMessage] = useState("");
  useEffect(() => {
    socket = io("http://localhost:4000");
    socket.on("connect", () => {
      console.log("Connected to the socket.io server");
      setIsConnected(true);

      socket.on("message", (messages) => {
        setMessages((prevMessages) => {
          return [...prevMessages, JSON.parse(messages)];
        });
      });
    });
  }, []);

  const handleSendMessage = (e) => {
    if (e.key === "Enter") {
      socket.emit("message", inputMessage);
      setMessages((prevMessages) => {
        return [
          ...prevMessages,
          {
            user: "Me",
            message: inputMessage,
          },
        ];
      });
      setInputMessage("");
    }
  };
  return (
    <div className="min-h-screen bg-slate-300 flex flex-col">
      <div className="text-xs text-center bg-green-500"> Connected</div>

      <h1 className="text-center text-3xl font-bold py-8">Simple Chat Room</h1>

      <div className="flex-1 p-4">
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              {message.user}:{message.message}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4">
        <input
          type="text"
          className="bg-white text-xl rounded px-2 py-2 shadow w-full outline-none focus:ring-2 ring-slate-500"
          value={inputMessage}
          onChange={(e) => {
            setInputMessage(e.target.value);
          }}
          onKeyDown={handleSendMessage}
        />
      </div>
    </div>
  );
}
