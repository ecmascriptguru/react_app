import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChanges = this.handleChanges.bind(this);
  }

  handleChanges(event) {
    this.props.onTemperatureChange(event.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter Temperature in {scaleNames[scale]}:</legend>
        <input 
          value={temperature}
          onChange={this.handleChanges}
        />
      </fieldset>
    )
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 'c',
      temperature: ''
    };

    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
  }

  toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
  }

  toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
  }

  handleCelsiusChange(temperature) {
    this.setState({
      scale: 'c',
      temperature: temperature
    });
  }

  handleFahrenheitChange(temperature) {
    this.setState({
      scale: 'f',
      temperature: temperature
    });
  }

  tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return "";
    }

    const output = convert(input);
    const rounded = Math.round(output * 100) / 100;

    return rounded.toString();
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;

    const celsius = (scale === "f") ? this.tryConvert(temperature, this.toCelsius) : temperature;
    const fahrenheit = (scale === "c") ? this.tryConvert(temperature, this.toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput 
          scale='c' 
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TemperatureInput 
          scale='f'
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Calculator />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ToggleButton />
      </div>
    );
  }
}

// class BoilVerdict extends React.Component {
//   render() {
//     if (this.props.celsius >= 100) {
//       return (<p>The water would boil</p>);
//     } else {
//       return (<p>The water would not boil.</p>);
//     }
//   }
// }

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
