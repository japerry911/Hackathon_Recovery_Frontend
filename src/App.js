import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import ShowPage from './ShowPage';

const App = () => {
  return (
    <div className="App">
      <Route
        exact 
        path='/'
        component={ShowPage}
      />
    </div>
  );
}

export default App;
