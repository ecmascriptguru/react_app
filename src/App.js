import React, {Component} from 'react';
import ReactDom from 'react-dom';
import logo from './logo.svg';
import './App.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleStockedOnlyChange = this.handleStockedOnlyChange.bind(this);
    }

    handleFilterTextChange(event) {
        this.props.onFilterTextChange(event.target.value);
    }

    handleStockedOnlyChange(event) {
        this.props.onStockOnlyChange(event.target.checked);
    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange}
                />
                <p>
                    <input
                        type="checkbox"
                        checked={this.props.isStockedOnly}
                        onChange={this.handleStockedOnlyChange}
                    />
                    {" "}
                    Only Show Products in stock.
                </p>
            </form>
        );
    }
}

class ProductCategoryRow extends React.Component {
    render() {
        return (
            <tr>
                <th colSpan="2">{this.props.category}</th>
            </tr>
        );
    }
}

class ProductRow extends React.Component {
    render() {
        let name = (this.props.product.stocked) ?
            this.props.product.name :
            <span style={{color: "red"}}>
                {this.props.product.name}
            </span>;

        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
}

class ProductTable extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        let rows = [];
        let lastCategory = null;
        this.props.products.forEach((product) => {
            if (product.name.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1 || (this.props.isStockedOnly && !product.stocked)) {
                return;
            }
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }
            rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
        });
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            isStockedOnly: false
        };
        this.filterChanged = this.filterChanged.bind(this);
        this.stockOnlyChanged = this.stockOnlyChanged.bind(this);
    }

    filterChanged(value) {
        this.setState(prevState => ({
            filterText: value
        }));
    }

    stockOnlyChanged(value) {
        this.setState(prevState => ({
            isStockedOnly: value
        }));
    }

    render() {
        return (
            <div>
                <SearchBar 
                    filterText={this.state.filterText}
                    isStockedOnly={this.state.isStockedOnly}
                    onFilterTextChange={this.filterChanged}
                    onStockOnlyChange={this.stockOnlyChanged}
                />
                <ProductTable 
                    products={this.props.products}
                    filterText={this.state.filterText}
                    isStockedOnly={this.state.isStockedOnly}
                />
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

ReactDom.render(
    <App />,
    document.getElementById('container')
);

export default App;