//import ReactSlider from 'react-slider';
import './slider.css'
import SettingsContext from "./SettingsContext";
import {useContext} from "react";
import BackButton from "./BackButton";


function Settings() {
  const settingsInfo = useContext(SettingsContext);
  return (
    <div
      style={{
        width: '500px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: '#CEDDDA',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        border: '#6962AD',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <label style={{ fontSize: '30px', fontFamily: 'cursive', color: '#1F2544', marginRight: '10px' }}>
          Work:
        </label>
        <input
          type="number"
          value={settingsInfo.workMinutes}
          onChange={(event) => settingsInfo.setWorkMinutes(parseInt(event.target.value))}
          min={1}
          max={120}
          style={{ fontSize: '24px', padding: '5px', width: '80px' }}
        />
        <span style={{ fontSize: '24px', marginLeft: '10px' }}>minutes</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ fontSize: '30px', fontFamily: 'cursive', color: '#ff0000', marginRight: '10px' }}>
          Break:
        </label>
        <input
          type="number"
          value={settingsInfo.breakMinutes}
          onChange={(event) => settingsInfo.setBreakMinutes(parseInt(event.target.value))}
          min={1}
          max={120}
          style={{ fontSize: '24px', padding: '5px', width: '80px' }}
        />
        <span style={{ fontSize: '24px', marginLeft: '10px' }}>minutes</span>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <BackButton onClick={() => settingsInfo.setShowSettings(false)} />
      </div>
    </div>
  );
}
export default Settings;