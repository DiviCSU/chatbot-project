import { useState } from 'react'
import reactLogo from './assets/react.svg'
import axios from "axios";
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    const newChat = [...chat, { sender: "You", message: userInput }];
    setChat(newChat);
    setUserInput("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", { user_input: userInput });
      setChat([...newChat, { sender: "Chatbot", message: response.data.response }]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="chat-container">
      <h2>Chatbot</h2>
      <div className="chat-box">
        {chat.map((msg, index) => (
          <p key={index}><b>{msg.sender}:</b> {msg.message}</p>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;