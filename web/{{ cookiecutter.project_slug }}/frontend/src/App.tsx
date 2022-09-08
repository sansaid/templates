import React from 'react';
import './App.css';
import { CodeTxt } from './components/CodeTxt'
import { FormHero } from './components/FormHero'

function App() {
  return (
    <div className="App">
      <p>
        👋 I'm <CodeTxt>binboi</CodeTxt> and I can remind you of your next bin collection day.
      </p>
      <FormHero/>
    </div>
  );
}

export default App;
