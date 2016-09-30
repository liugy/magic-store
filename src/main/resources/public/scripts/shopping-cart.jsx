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
        console.log(this.shoppingItems);
        this.props.onBuy(this.shoppingItems);
    },
    shoppingItems:[],
    modifyAmount: function(changingItem){
        if (this.shoppingItems.length==0){
            var newData = this.shoppingItems;
            this.props.products.map(function(product){
                var newItem = {};
                newItem.name = product.name;
                if(newItem.name == changingItem.name){
                    newItem.amount=changingItem.amount;
                }else{
                    newItem.amount=0;   
                }
                newData.push(newItem);
            });
        }else{
            this.shoppingItems.map(function(item){
                if(item.name == changingItem.name){
                    item.amount=changingItem.amount;
                }
            });            
        }
    },
    getInitialState: function() {
        return {data: []};
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
