import { useState } from 'react'
import reactLogo from './assets/react.svg'
import axios from "axios";
import viteLogo from '/vite.svg'
import './App.css'
import Chatbox from './Chatbox';  // Import the Chatbox component

function App() {
  return (
    <div className="App">
      <Chatbox />  {/* Render the Chatbox component */}
    </div>
  );
}

export default App;