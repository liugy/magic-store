var ShoppingCartRow = React.createClass({
    handleAmountChange: function(e){
        this.props.onAmountChange({name: e.target.name, amount:e.target.value});
    },
    render: function(){
       return(
        <tr>
            <td><span> {this.props.productName} </span></td>
            <td><input type="text" placeholder="input amount" name={this.props.productName} onChange={this.handleAmountChange} /></td>
        </tr>
       );
    } 
});

var ShoppingCart = React.createClass({
    
    handleSubmit: function(e){
        e.preventDefault();
        this.props.onBuy(this.state.shoppingItems);
        this.setState(this.getInitialState());
    },
    modifyAmount: function(changingItem){
        var newShoppingItems = this.state.shoppingItems;
        newShoppingItems.map(function(item){
            if(item.name == changingItem.name){
                item.amount=changingItem.amount;
            }
        });        
    },
    clearShoppingItems: function(){
        var ret = [];
        this.props.products.map(function(product){
            var newItem = {};
            newItem.name = product.name;
            newItem.amount=0;   
            ret.push(newItem);
        });
        return ret;
    },
    getInitialState: function() {
        return {shoppingItems: this.clearShoppingItems()};
    },
    render: function() {
        var me = this;
        var cartItems = this.props.products.map(function(product) {
            return (
                <ShoppingCartRow productName={product.name} onAmountChange={me.modifyAmount} key={product.name}/>
            );
        });

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
