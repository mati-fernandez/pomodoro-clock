import { useState, useRef, useEffect } from 'react';
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
  const audioRef = useRef(null);

  useEffect(() => {
    const intervalID = setInterval(() => {
      if (timeLeft && isRunning) {
        setTimeLeft(timeLeft - 1);
      }
    }, 200);
    resetTimer();
    console.log('useEffect');
    return () => clearInterval(intervalID);
  }, [timeLeft, isRunning]);

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
      if (timerLabel === 'Break') setTimeLeft((breakLength - 1) * 60);
    }
  };

  const handleBreakIncrease = () => {
    if (breakLength < 60 && !isRunning) {
      setBreakLength(breakLength + 1);
      if (timerLabel === 'Break') setTimeLeft((breakLength + 1) * 60);
    }
  };

  const handleSessionDecrease = () => {
    if (sessionLength > 1 && !isRunning) {
      setSessionLength(sessionLength - 1);
      if (timerLabel === 'Session') setTimeLeft((sessionLength - 1) * 60);
    }
  };

  const handleSessionIncrease = () => {
    if (sessionLength < 60 && !isRunning) {
      setSessionLength(sessionLength + 1);
      if (timerLabel === 'Session') setTimeLeft((sessionLength + 1) * 60);
    }
  };

  const handlePlay = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    if (!timeLeft && timerLabel === 'Session') {
      setTimeLeft(breakLength * 60);
      setTimerLabel('Break');
      audioRef.current.play();
    }
    if (!timeLeft && timerLabel === 'Break') {
      setTimeLeft(sessionLength * 60);
      setTimerLabel('Session');
      audioRef.current.play();
    }
  };

  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel('Session');
    setTimeLeft(25 * 60);
    setIsRunning(false);
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
          <div id="start_stop" onClick={handlePlay}>
            {isRunning ? (
              <FontAwesomeIcon icon={faCirclePause} cursor="pointer" />
            ) : (
              <FontAwesomeIcon icon={faCirclePlay} cursor="pointer" />
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
