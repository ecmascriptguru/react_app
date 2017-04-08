import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class SearchBar extends React.Component {
    render() {
        return (
            <div>
            </div>
        );
    }
}

class ProductTable extends React.Component {
    render() {
        return (
            <div>
            </div>
        );
    }
}

class FilterableProductTable extends React.Component {
    render() {
        return (
            <div>
                <SearchBar />
                <ProductTable products={this.props.products} />
            </div>
        )
    }
}

const mockProducts = [
        {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
        {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
        {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
        {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
        {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
        {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
    ];

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to Products List.</h2>
                </div>
                <FilterableProductTable products={mockProducts} />
            </div>
        )
    }
}

export default App;