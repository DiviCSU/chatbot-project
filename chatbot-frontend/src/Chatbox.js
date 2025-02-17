// src/Chatbox.js
import React, { useState } from 'react';

const Chatbox = () => {
  const [messages, setMessages] = useState([]);  // Store messages in state
  const [userInput, setUserInput] = useState('');  // Store the user's input
  
  // Function to handle sending the message
  const sendMessage = async () => {
    if (userInput.trim()) {
      const newMessages = [...messages, { text: userInput, sender: 'user' }];
      setMessages(newMessages);
      setUserInput('');

      // Simulate a response from the bot (e.g., you could fetch from your backend)
      const botResponse = await fetchBotResponse(userInput);  // Custom function for backend interaction

      setMessages([...newMessages, { text: botResponse, sender: 'bot' }]);
    }
  };

  // Simulate a response from the backend
  const fetchBotResponse = async (userInput) => {
    // Send user input to Flask backend (or whatever backend you're using)
    const response = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_input: userInput }),
    });

    const data = await response.json();
    return data.response || 'Sorry, I didn\'t understand that.';
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <h2>Chat with Us!</h2>
      </div>
      <div className="chatbox-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="chatbox-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbox;
