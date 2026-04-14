import { useEffect, useState } from "react";
import {
  createConversation,
  getMessages,
  sendMessage,
} from "../api/api";

const Chat = ({ teamId, members }) => {
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const init = async () => {
      try {
        if (!teamId) return;

        const res = await createConversation({
          teamId,
          members: members?.map((m) => m._id) || [],
        });

        console.log("CHAT:", res.data);

        setChat(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    init();
  }, [teamId]);

  // ✅ LOAD MESSAGES
  useEffect(() => {
    const load = async () => {
      if (!chat?._id) return;

      try {
        const res = await getMessages(chat._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    load();
  }, [chat]);

  // ✅ SEND MESSAGE
  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      const res = await sendMessage({
        conversationId: chat._id,
        text,
      });

      setMessages((prev) => [...prev, res.data]);
      setText("");
    } catch (err) {
      console.log(err);
    }
  };

  // 🔴 UI STATES
  if (!teamId) return <h3>No teamId</h3>;
  if (!chat) return <h3>Loading chat...</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h3>Chat</h3>

      <div style={{ minHeight: "300px", border: "1px solid gray", padding: "10px" }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <b>{msg.sender?.name || "User"}:</b> {msg.text}
          </div>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
      />

      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chat;