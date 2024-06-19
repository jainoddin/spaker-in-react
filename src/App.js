import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVideos, setFilteredVideos] = useState([]);

  const handleMicrophoneClick = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setSearchQuery(speechResult);

      // Assuming 'filtered' is a variable you define elsewhere in your component logic
      const filtered = []; // Define your filtering logic here
      setFilteredVideos(filtered);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="App">
      <span>
        <FontAwesomeIcon
          icon={faMicrophone}
          onClick={handleMicrophoneClick}
          className={isListening ? 'microphone-listening' : 'microphone'}
        />
      </span>
      <h1>Listening Status: {isListening ? 'Listening...' : 'Click the microphone to start'}</h1>
      <h1>Search Query: {searchQuery}</h1>
    </div>
  );
}

export default App;



