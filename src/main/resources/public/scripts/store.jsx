
var Shopping = React.createClass({
    onBuy: function(shoppingItems){
        this.props.onShoped(shoppingItems);
    },
    render: function(){
        return (
            <div>
                <ProductTable products={this.props.products}/>
                <br/>
                <ShoppingCart products={this.props.products} onBuy={this.onBuy}/>
            </div>
        );
    } 
});

var MyStore = React.createClass({
    getInitialState: function() {
        return {isShopping: true};
    },
    onShoped: function(buyingItems){
        this.setState({isShopping: false, buyingItems: buyingItems});

    },
    onContinueShopping: function(){
        this.setState({isShopping: true});
    },
    render: function() {
        var displaying = this.state.isShopping ? <Shopping products={this.props.products} onShoped={this.onShoped}/> : <Summary buyingItems={this.state.buyingItems} onContinue={this.onContinueShopping}/>;
        return (
            <div>
                {displaying}
            </div>
        );
    }
});


var PRODUCTS = [
  {amount: 49, name: 'Football'},
  {amount: 9, name: 'Baseball'},
  {amount: 29, name: 'Basketball'},
  {amount: 99, name: 'iPod Touch'},
  {amount: 399, name: 'iPhone 5'},
  {amount: 199, name: 'Nexus 7'}
];
 
var BUYINGITEMS = [
  {amount: 49, name: 'Football'},
  {amount: 9, name: 'Baseball'},
  {amount: 199, name: 'Nexus 7'}
];
ReactDOM.render(
  <MyStore products={PRODUCTS} />,
  document.getElementById('container')
);