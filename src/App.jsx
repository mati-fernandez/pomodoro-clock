import { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from 'react-fontawesome';

function App() {
  return (
    <div id="App">
      <img src="leaf.png" id="leaf"></img>
      <div id="container">
        <h1>25 + 5 Clock</h1>
        <div id="buttons">
          <div id="break-label">
            <p>Break Length</p>
            <div id="break-length">State variable here, default 5</div>
            <FontAwesomeIcon icon="fa-solid fa-circle-chevron-up" />
            <button id="break-decrement">BD</button>
            <button id="break-increment">BI</button>
          </div>
          <div id="session-label">
            <p>Session Length</p>
            <div id="session-length">State variable here, default 25</div>
            <button id="session-decrement">SD</button>
            <button id="session-increment">SI</button>
          </div>
        </div>
        <div id="timer-label">Session</div>
        <div id="time-left">
          Paused or running, the value in this field should always be displayed
          in mm:ss format (i.e. 25:00).
        </div>
        <div id="buttons-2">
          <button id="start_stop">Start/Stop</button>
          <button id="reset">Reset</button>
        </div>
      </div>
      <audio src="beep.mp3" preload="auto" id="beep"></audio>
    </div>
  );
}

export default App;
