var Shopping = React.createClass({
    onBuy: function(shoppingItems){
        this.props.onCheckout(shoppingItems);
    },
    
    isInventoryEnough: function(shoppingItems){
        for(let i=0; i< this.props.inventory.length; i++){
            if (this.props.inventory[i].amount< shoppingItems[i].amount){
                return false;
            }
        }
        return true;
    },
    render: function(){
        return (
            <div>
                <ProductTable products={this.props.inventory}/>
                <br/>
                <ShoppingCart products={this.props.inventory} onBuy={this.onBuy}/>
            </div>
        );
    } 
});