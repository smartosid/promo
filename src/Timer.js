import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import ResetButton from "./reset";
import SettingsButton from "./SettingsButton";
import { useContext, useState, useEffect, useRef } from "react";
import SettingsContext from "./SettingsContext";

const red = '#7469B6';
const green = '#4aec8c';

function Timer() {
  const settingsInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('work');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  function handleReset() {
    const initialSeconds = mode === 'work' ? settingsInfo.workMinutes * 60 : settingsInfo.breakMinutes * 60;
    setSecondsLeft(initialSeconds);
    secondsLeftRef.current = initialSeconds;
  }

  useEffect(() => {

    function switchMode() {
      const nextMode = modeRef.current === 'work' ? 'break' : 'work';
      const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;

      if (nextMode === 'work') {
        setCompletedPomodoros(prevCount => prevCount + 1);
      }
    }

    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

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
  }, [settingsInfo]);

  const totalSeconds = mode === 'work'
    ? settingsInfo.workMinutes * 60
    : settingsInfo.breakMinutes * 60;
  const percentage = Math.round(secondsLeft / totalSeconds * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if(seconds < 10) seconds = '0'+seconds;

  return (
    <div style={{ width: '500px', borderRadius: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', marginBottom: '20px', backgroundColor: '#CEDDDA', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '200px', height: '200px', position: 'relative' }}>
          <CircularProgressbar
            value={percentage}
            text={minutes + ':' + seconds}
            styles={buildStyles({
              textColor:'#EEEEEE',
              pathColor:mode === 'work' ? red : green,
              tailColor:'rgba(255,255,255,.2)',
            })} />
        </div>
        <div style={{marginTop:'20px', display: 'flex', alignItems: 'center' }}>
          {isPaused
            ? <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false; }} />
            : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true; }} />}
          <ResetButton onClick={handleReset} style={{marginLeft: '10px',backgroundColor:'#6962AD'}} />
        </div>
        <div style={{marginTop:'10px'}}>
          <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
        </div>
        <div style={{marginTop:'5px',fontSize:"25px"}}>
          <p>Pomodoros: {completedPomodoros}</p>
        </div>
      </div>
    </div>
  );
}

export default Timer;
