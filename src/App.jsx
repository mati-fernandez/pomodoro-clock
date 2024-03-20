import { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronDown,
  faCircleChevronUp,
  faCirclePause,
  faCirclePlay,
  faArrowsRotate,
} from '@fortawesome/free-solid-svg-icons';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timer, setTimer] = useState(sessionLength);
  const [isRunning, setIsRunning] = useState(false);

  const handleBreakDecrease = () => {
    if (breakLength > 0 && !isRunning) setBreakLength(breakLength - 1);
  };

  const handleBreakIncrease = () => {
    if (breakLength < 60 && !isRunning) setBreakLength(breakLength + 1);
  };

  const handleSessionDecrease = () => {
    if (sessionLength > 0 && !isRunning) setSessionLength(sessionLength - 1);
  };

  const handleSessionIncrease = () => {
    if (sessionLength < 60 && !isRunning) setSessionLength(sessionLength + 1);
  };

  return (
    <div id="App">
      <img src="leaf.png" id="leaf"></img>
      <div id="tomato">
        <h1>25 + 5 Clock</h1>
        <div id="buttons">
          <div id="break-label">
            <p>Break Length</p>
            <FontAwesomeIcon
              id="break-increment"
              icon={faCircleChevronUp}
              cursor="pointer"
              onClick={handleBreakIncrease}
            />
            <div id="break-length" className="numbers">
              {breakLength}
            </div>
            <FontAwesomeIcon
              id="break-decrement"
              icon={faCircleChevronDown}
              cursor="pointer"
              onClick={handleBreakDecrease}
            />
          </div>
          <div id="display">
            <p id="timer-label">Session</p>
            <div id="time-left" className="numbers">
              {timer}
            </div>
          </div>
          <div id="session-label">
            <p>Session Length</p>
            <FontAwesomeIcon
              id="session-increment"
              icon={faCircleChevronUp}
              cursor="pointer"
              onClick={handleSessionIncrease}
            />
            <div id="session-length" className="numbers">
              {sessionLength}
            </div>
            <FontAwesomeIcon
              id="session-decrement"
              icon={faCircleChevronDown}
              cursor="pointer"
              onClick={handleSessionDecrease}
            />
          </div>
        </div>
        <div id="buttons-2">
          <div id="start_stop">
            <FontAwesomeIcon icon={faCirclePlay} />
            <FontAwesomeIcon icon={faCirclePause} />
          </div>
          <div id="reset">
            <FontAwesomeIcon icon={faArrowsRotate} />
          </div>
        </div>
      </div>
      <audio src="beep.mp3" preload="auto" id="beep"></audio>
    </div>
  );
}

export default App;
