import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Board from "./components/Board/Board";

function App() {
  return (
    <div className="App">
      <h1>Live Arrivals @ Great Portland Street</h1>
      <br/>
      <Board/>
    </div>
  );
}

export default App;
