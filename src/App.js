import React, {Component} from 'react';
// import ReactDom from 'react-dom';
import './App.css';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.onHandleClick(this.props.index);
    }
    
    render() {
        return (
            <button 
                className="square"
                onClick={this.handleClick}
            >
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            isNextX: true
        };
        this.onHandleClick = this.onHandleClick.bind(this);
    }

    onHandleClick(key) {
        const squares = this.state.squares.slice();
        squares[key] = (this.state.isNextX) ? "X" : "O";
        this.setState((prev) => ({
            squares: squares,
            isNextX: !prev.isNextX
        }));
    }

    renderSquare(key) {
        return (
            <Square
                key={key}
                value={this.state.squares[key]}
                onHandleClick={this.onHandleClick}
                index={key}
            />
        );
    }

    render() {
        const status = "Next Player: " + ((this.state.isNextX) ? "X" : "O");
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