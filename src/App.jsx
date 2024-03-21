import { useState, useRef } from 'react';
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
  const [title, setTitle] = useState('25 + 5 Clock');
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalID, setIntervalID] = useState(null);
  const audioRef = useRef(null);

  const handleTitle = () => {
    if (title === '25 + 5 Clock') {
      setTitle('Pomodoro Clock');
    } else {
      setTitle('25 + 5 Clock');
    }
  };

  const handleBreakDecrease = () => {
    if (breakLength > 1 && !isRunning) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleBreakIncrease = () => {
    if (breakLength < 60 && !isRunning) setBreakLength(breakLength + 1);
  };

  const handleSessionDecrease = () => {
    if (sessionLength > 1 && !isRunning) {
      setSessionLength(sessionLength - 1);
      setTimeLeft((sessionLength - 1) * 60);
    }
  };

  const handleSessionIncrease = () => {
    if (sessionLength < 60 && !isRunning) {
      setSessionLength(sessionLength + 1);
      setTimeLeft((sessionLength + 1) * 60);
    }
  };

  const handlePlay = () => {
    if (!isRunning) {
      setIsRunning(true);
      const interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft === 0) {
            audioRef.current.play();
            const labelState = setTimerLabel((prevTimerLabel) => {
              if (prevTimerLabel === 'Session') {
                return 'Break';
              } else {
                return 'Session';
              }
            });
            if (labelState === 'Session') {
              return breakLength * 60;
            } else {
              return sessionLength * 60;
            }
          } else {
            return prevTimeLeft - 1;
          }
        });
      }, 200);
      setIntervalID(interval);
    } else {
      setIsRunning(false);
      clearInterval(intervalID);
    }
  };

  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel('Session');
    setTimeLeft(25 * 60);
    setIsRunning(false);
    clearInterval(intervalID);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div id="App">
      <img src="leaf.png" id="leaf"></img>
      <div id="tomato">
        <h1 onClick={handleTitle}>{title}</h1>
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
            <p id="timer-label">{timerLabel}</p>
            <div id="time-left" className="numbers">
              {timeFormatter()}
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
            {isRunning ? (
              <FontAwesomeIcon
                icon={faCirclePause}
                cursor="pointer"
                onClick={handlePlay}
              />
            ) : (
              <FontAwesomeIcon
                icon={faCirclePlay}
                cursor="pointer"
                onClick={handlePlay}
              />
            )}
          </div>
          <div id="reset">
            <FontAwesomeIcon
              icon={faArrowsRotate}
              cursor="pointer"
              onClick={handleReset}
            />
          </div>
        </div>
      </div>
      <audio src="beep.mp3" preload="auto" id="beep" ref={audioRef}></audio>
    </div>
  );
}

export default App;
