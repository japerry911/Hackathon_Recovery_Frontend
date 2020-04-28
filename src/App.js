import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import ShowPage from './ShowPage';
import AppBar from './AppBar';
import HomePage from './HomePage';

const App = () => {
  return (
    <div className="App">
      <AppBar />
      <Route 
        exact 
        path='/'
        component={HomePage}
      />
      <Route
        exact 
        path='/show-page/:id'
        component={ShowPage}
      />
    </div>
  );
}

export default App;
