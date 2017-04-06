import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ToggleButton />
      </div>
    );
  }
}

class ToggleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggled: false
    };
    this.clickToggleHandler = this.clickToggleHandler.bind(this);
  }

  clickToggleHandler() {
    this.setState(prevState => ({
      isToggled: !prevState.isToggled
    }));
  }

  render() {
    return (
      <div>
        {this.state.isToggled && <Clock />}
        <button onClick={this.clickToggleHandler}>Click Me</button>
      </div>
    )
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  render() {
    return (
      <div>
        <h1>Hello, World!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }

  tick() {
    this.setState(prevState => ({
      date: new Date()
    }));
  }

  componentDidMount() {
    this.timeId = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
}

export default App;
