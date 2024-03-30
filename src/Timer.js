import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import ResetButton from "./reset";
import SettingsButton from "./SettingsButton";
import { useContext, useState, useEffect, useRef, useCallback } from "react";
import SettingsContext from "./SettingsContext";

const red = '#7469B6';
const green = '#4CA580'; // Adjusted green color
const blue = '#6495ED';

function Timer() {
  const settingsInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('promodoro');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  const getInitialSeconds = useCallback((mode) => {
    switch (mode) {
      case 'promodoro':
        return settingsInfo.workMinutes * 60;
      case 'shortBreak':
        return 5 * 60;
      case 'longBreak':
        return 30 * 60;
      default:
        return settingsInfo.workMinutes * 60;
    }
  }, [settingsInfo]);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  function handleReset() {
    const initialSeconds = getInitialSeconds(modeRef.current);
    setSecondsLeft(initialSeconds);
    secondsLeftRef.current = initialSeconds;
  }

  useEffect(() => {
    function switchMode() {
      let nextMode;
      if (modeRef.current === 'promodoro') {
        nextMode = 'shortBreak';
      } else if (modeRef.current === 'shortBreak') {
        nextMode = 'longBreak';
      } else {
        nextMode = 'promodoro';
        setCompletedPomodoros(prevCount => prevCount + 1);
      }

      const nextSeconds = getInitialSeconds(nextMode);

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    const initialSeconds = getInitialSeconds(mode);
    secondsLeftRef.current = initialSeconds;
    setSecondsLeft(initialSeconds);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo, getInitialSeconds, mode]);

  const totalSeconds = getInitialSeconds(mode);
  const percentage = Math.round(secondsLeft / totalSeconds * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = '0' + seconds;

  return (
    <div style={{ width: '500px', borderRadius: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', marginBottom: '20px', backgroundColor: '#CEDDDA', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <button
            style={{
              backgroundColor: mode === 'promodoro' ? red : 'transparent',
              color: mode === 'promodoro' ? 'white' : red,
              padding: '10px 20px',
              borderRadius: '5px',
              border: mode === 'promodoro' ? 'none' : `1px solid ${red}`,
              marginRight: '10px',
            }}
            onClick={() => {
              setMode('promodoro');
              modeRef.current = 'promodoro';
              const initialSeconds = getInitialSeconds('promodoro');
              setSecondsLeft(initialSeconds);
              secondsLeftRef.current = initialSeconds;
            }}
          >
            Promodoro
          </button>
          <button
            style={{
              backgroundColor: mode === 'shortBreak' ? green : 'transparent',
              color: mode === 'shortBreak' ? 'white' : green,
              padding: '10px 20px',
              borderRadius: '5px',
              border: mode === 'shortBreak' ? 'none' : `1px solid ${green}`,
              marginRight: '10px',
            }}
            onClick={() => {
              setMode('shortBreak');
              modeRef.current = 'shortBreak';
              const initialSeconds = getInitialSeconds('shortBreak');
              setSecondsLeft(initialSeconds);
              secondsLeftRef.current = initialSeconds;
            }}
          >
            Short Break
          </button>
          <button
            style={{
              backgroundColor: mode === 'longBreak' ? blue : 'transparent',
              color: mode === 'longBreak' ? 'white' : blue,
              padding: '10px 20px',
              borderRadius: '5px',
              border: mode === 'longBreak' ? 'none' : `1px solid ${blue}`,
            }}
            onClick={() => {
              setMode('longBreak');
              modeRef.current = 'longBreak';
              const initialSeconds = getInitialSeconds('longBreak');
              setSecondsLeft(initialSeconds);
              secondsLeftRef.current = initialSeconds;
            }}
          >
            Long Break
          </button>
        </div>
        <div style={{ width: '200px', height: '200px', position: 'relative' }}>
          <CircularProgressbar
            value={percentage}
            text={minutes + ':' + seconds}
            styles={buildStyles({
              textColor: '#EEEEEE',
              pathColor: mode === 'promodoro' ? red : mode === 'shortBreak' ? green : blue,
              tailColor: 'rgba(255,255,255,.2)',
            })}
          />
        </div>
        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
          {isPaused
            ? <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false; }} />
            : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true; }} />}
          <ResetButton onClick={handleReset} style={{ marginLeft: '10px', backgroundColor: '#6962AD' }} />
        </div>
        <div style={{ marginTop: '10px' }}>
          <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
        </div>
        <div style={{ marginTop: '5px', fontSize: "25px" }}>
          <p>Pomodoros: {completedPomodoros}</p>
        </div>
      </div>
    </div>
  );
}

export default Timer;
