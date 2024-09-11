
import React from 'react';
import './App.css';
import LogoSmall from './logoSmall';
import LogoLarge from './logoLarge';

function App() {
  return (
      <header className="App-header">
        <h2>Small Logo:</h2>
        <LogoSmall />
        
        <h2>Large Logo:</h2>
        <LogoLarge />
      </header>
  );
}

export default App;
