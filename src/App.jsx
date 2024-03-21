import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('25 + 5 Clock');
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    console.log('useEffect of isRunning');
    if (!isRunning) return;
    const intervalID = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 200);
    return () => clearInterval(intervalID);
  }, [isRunning]);

  useEffect(() => {
    console.log('useEffect of timeLeft');
    if (!timeLeft) {
      audioRef.current.play();
      setTimerLabel((l) => {
        if (l === 'Session') {
          setTimeLeft(breakLength * 60);
          return 'Break';
        } else {
          setTimeLeft(sessionLength * 60);
          return 'Session';
        }
      });
    }
  }, [timeLeft, breakLength, sessionLength]);

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

  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel('Session');
    setTimeLeft(25 * 60);
    setIsRunning(false);
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
            <i
              className="fa-solid fa-circle-chevron-up"
              id="break-increment"
              onClick={handleBreakIncrease}
            ></i>
            <div id="break-length" className="numbers">
              {breakLength}
            </div>
            <i
              className="fa-solid fa-circle-chevron-down"
              id="break-decrement"
              onClick={handleBreakDecrease}
            ></i>
          </div>
          <div id="display">
            <p id="timer-label">{timerLabel}</p>
            <div id="time-left" className="numbers">
              {timeFormatter()}
            </div>
          </div>
          <div id="session-label">
            <p>Session Length</p>
            <i
              id="session-increment"
              className="fa-solid fa-circle-chevron-up"
              onClick={handleSessionIncrease}
            ></i>
            <div id="session-length" className="numbers">
              {sessionLength}
            </div>
            <i
              id="session-decrement"
              className="fa-solid fa-circle-chevron-down"
              onClick={handleSessionDecrease}
            ></i>
          </div>
        </div>
        <div id="buttons-2">
          <div id="start_stop" onClick={handlePlay}>
            {isRunning ? (
              <i className="fa-solid fa-circle-pause" />
            ) : (
              <i className="fa-solid fa-circle-play" />
            )}
          </div>
          <div id="reset">
            <i className="fa-solid fa-arrows-rotate" onClick={handleReset} />
          </div>
        </div>
      </div>
      <audio src="beep.mp3" preload="auto" id="beep" ref={audioRef}></audio>
    </div>
  );
}

export default App;
