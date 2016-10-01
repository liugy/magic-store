var ShoppingCartRow = React.createClass({
    handleAmountChange: function(e){
        if (isNaturalNumber(e.target.value)){
            this.setState(this.getInitialState());
            this.props.onAmountChange({name: e.target.name, amount:e.target.value});                
        }else{
            this.setState({errorMsg: "Only nature number allowed here."});
            this.props.onAmountChange({name: e.target.name, amount:0});                
        }
    },
    getInitialState: function() {
        return {errorMsg: ""};
    },
    render: function(){
       return(
        <tr>
            <td><span> {this.props.productName} </span></td>
            <td><input type="text" placeholder="input amount" name={this.props.productName} onChange={this.handleAmountChange} /></td>
            <td>{this.state.errorMsg}</td>
        </tr>
       );
    } 
});

var ShoppingCart = React.createClass({
    
    handleSubmit: function(e){
        e.preventDefault();
        this.props.onBuy(this.shoppingItems);
        this.clearShoppingItems();
    },
    modifyAmount: function(changingItem){
        this.shoppingItems.map(function(item){
            if(item.name == changingItem.name){
                item.amount=changingItem.amount;
            }
        });        
    },
    clearShoppingItems: function(){
        this.shoppingItems = [];
        this.props.products.map(function(product){
            var newItem = {};
            newItem.name = product.name;
            newItem.amount=0;   
            this.shoppingItems.push(newItem);
        }.bind(this));
        console.log(this.shoppingItems);
    },
    componentDidMount: function() {
        this.clearShoppingItems();
    },
    componentDidUpdate(prevProps, prevState){
        this.clearShoppingItems();
    },
    render: function() {
        var cartItems = this.props.products.map(function(product) {
            return (
                <ShoppingCartRow productName={product.name} onAmountChange={this.modifyAmount} key={product.name}/>
            );
        }.bind(this));

        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Your shopping:</h3>
                <table>
                    <tbody>
                        {cartItems}
                    </tbody>
                </table>
                <input type="submit" value="Buy" />
            </form>
        );
    }
});
