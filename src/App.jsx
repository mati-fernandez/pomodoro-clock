import { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronDown,
  faCircleChevronUp,
  faCirclePause,
  faCirclePlay,
} from '@fortawesome/free-solid-svg-icons';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  const handleBreakDecrease = () => {
    if (breakLength > 0) setBreakLength(breakLength - 1);
  };

  const handleBreakIncrease = () => {
    if (breakLength < 60) setBreakLength(breakLength + 1);
  };

  const handleSessionDecrease = () => {
    if (sessionLength > 0) setSessionLength(sessionLength - 1);
  };

  const handleSessionIncrease = () => {
    if (sessionLength < 25) setSessionLength(sessionLength + 1);
  };

  return (
    <div id="App">
      <img src="leaf.png" id="leaf"></img>
      <div id="container">
        <h1>25 + 5 Clock</h1>
        <div id="buttons">
          <div id="break-label">
            <div>Break Length</div>
            <div id="break-length">{breakLength}</div>
            <FontAwesomeIcon
              id="break-decrement"
              icon={faCircleChevronDown}
              size="2x"
              cursor="pointer"
              onClick={handleBreakDecrease}
            />
            {/* <button id="break-decrement">BD</button> */}
            <FontAwesomeIcon
              id="break-increment"
              icon={faCircleChevronUp}
              size="2x"
              cursor="pointer"
              onClick={handleBreakIncrease}
            />
            {/* <button id="break-increment">BI</button> */}
          </div>
          <div id="session-label">
            <div>Session Length</div>
            <div id="session-length">{sessionLength}</div>
            <FontAwesomeIcon
              id="break-decrement"
              icon={faCircleChevronDown}
              size="2x"
              cursor="pointer"
              onClick={handleSessionDecrease}
            />
            {/* <button id="session-decrement">SD</button> */}
            <FontAwesomeIcon
              id="session-increment"
              icon={faCircleChevronUp}
              size="2x"
              cursor="pointer"
              onClick={handleSessionIncrease}
            />
            {/* <button id="session-increment">SI</button> */}
          </div>
        </div>
        <div id="timer-label">Session</div>
        <div id="time-left">
          Paused or running, the value in this field should always be displayed
          in mm:ss format (i.e. 25:00).
        </div>
        <div id="buttons-2">
          <button id="start_stop">
            <FontAwesomeIcon icon={faCirclePlay} />
            <FontAwesomeIcon icon={faCirclePause} />
          </button>

          <button id="reset">Reset</button>
        </div>
      </div>
      <audio src="beep.mp3" preload="auto" id="beep"></audio>
    </div>
  );
}

export default App;
