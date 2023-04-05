import './App.css'
import React, { useState } from 'react';
import Chat from './components/chat'
import Header from "./components/header";

function App() {
  const [showBegin, setShowBegin] = useState(true);
  return (
    <div className="body">
      { showBegin ? (
        <div className='begin'>
          <h1>Strive</h1>
          <div className='box'>
            <h3>Hey there! Welcome to Strive, an AI chatbot here to guide you in achieving your career and wellbeing goals.</h3>
          </div>
          <button className="begin-button"onClick={() => setShowBegin(false)}>Lets Begin!</button>
        </div>
      ) : (
        <> 
          <Header/>
          <Chat />
        </>
      )}
    </div>
  );
}

export default App;

