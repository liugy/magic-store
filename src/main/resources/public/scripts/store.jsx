var Shopping = React.createClass({
    onBuy: function(shoppingItems){
        if (this.isInventoryEnough(shoppingItems)){
            this.props.onShoped(shoppingItems);
        }else{
            this.props.onOutOfInventory(shoppingItems, []);
        }
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

var MyStore = React.createClass({
    getInitialState: function() {
        return {nextPage: "shopping", inventory:this.props.inventory, buyingItems:[]};
    },
    calculateInventory: function(currentInventory, buyingItems){
        if(!buyingItems || buyingItems.lenght==0){
            console.log("error: buyingItem should not be empty.")
            return currentInventory;
        }
        if(currentInventory.length != buyingItems.length){
            console.log("error: lengh of buyingItems should same with inventory lengh.");
            return currentInventory;
        }
        for(let i=0; i<currentInventory.length; i++){
            currentInventory[i].amount -=buyingItems[i].amount;
        }
        return currentInventory;
    },
    onShoped: function(buyingItems){
        var newInventory = this.calculateInventory(this.state.inventory, buyingItems);
        this.setState({nextPage: "summary", inventory: newInventory, buyingItems: buyingItems});

    },
    onOutOfInventory: function(){
        this.setState({nextPage: "error", inventory: this.state.inventory, buyingItems:this.state.buyingItems, errorTitle: "Out of inventory", errorMessage:"Please check the numbers in your shopping cart."});
    },
    continueShopping: function(){
        this.setState({nextPage: "shopping", inventory: this.state.inventory});
    },
    render: function() {
        var display;
        switch (this.state.nextPage) {
          case "summary": 
                display = <Summary buyingItems={this.state.buyingItems} onContinue={this.continueShopping}/>
                break;
          case "error": 
                display= <Error title={this.state.errorTitle} message={this.state.errorMessage} onBack={this.continueShopping}/>;
                break;
          case "shopping":
          default:
                display = <Shopping inventory={this.state.inventory} onShoped={this.onShoped} onOutOfInventory={this.onOutOfInventory}/>
                break;
        }
                
        return (
            <div>
                {display}
            </div>
        );
    }
});


var INVENTORY = [
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
  <MyStore inventory={INVENTORY} />,
  document.getElementById('container')
);