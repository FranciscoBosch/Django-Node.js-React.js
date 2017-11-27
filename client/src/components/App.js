import React, { Component } from 'react';
import './App.css';
import xComment from './xComment';
import {BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title"> xComment.io</h1>
          </header>
          <Route exact={true} path="/" component = {xComment}/>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
