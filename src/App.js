import React, {Component} from 'react';
// import ReactDom from 'react-dom';
import './App.css';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            value: ""
        };
    }

    handleClick(event) {
        this.setState((prevState) => ({
            value: "X"
        }))
        event.preventDefault();
    }
    render() {
        return (
            <button 
                className="square"
                onClick={this.handleClick}
            >
                {this.state.value}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(key) {
        return (
            <Square
                key={key}
                id={key}
            />
        );
    }

    render() {
        const status = "Next Player: X";
        return (
            <div>
                <div className="status">{status}</div>
                <div className="boardRow">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="boardRow">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="boardRow">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}
class TicToeGame extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="gameBoard">
                    <Board />
                </div>
                <div className="gameInfo"></div>
            </div>
        )
    }
}
class App extends Component {
    render() {
        return (
            <div className="appContainer">
                <TicToeGame />
            </div>
        )
    }
}
export default App;