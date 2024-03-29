import React from 'react';
import './App.css';
import Timer from "./Timer";

import Settings from "./Settings";
import { useState } from "react";
import SettingsContext from "./SettingsContext";
import TodoList from './TodoList'; 

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (

    <main>
       <div class="container">
       <div className='try'>
      
      <header> <h1>Promofocus</h1></header>
   
      
      {/* Render Timer or Settings based on showSettings state */}
      <SettingsContext.Provider value={{ showSettings, setShowSettings, workMinutes, breakMinutes, setWorkMinutes, setBreakMinutes }}>
        {showSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
    </div>
  
    <div className="todo-section">
      <TodoList />
    </div>
    </div>
  </main>
  
   
  );
}

export default App;
