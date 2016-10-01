

var MyStore = React.createClass({
    getInitialState: function() {
        return {nextPage: "shopping", inventory:[], buyingItems:[]};
    },
    componentDidMount: function() {
        this.loadInventoryFromServer();
    },

    loadInventoryFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({nextPage: "shopping", inventory:data, buyingItems:this.state.buyingItems});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
                this.setState({nextPage: "error", inventory: this.state.inventory, buyingItems:this.state.buyingItems, errorTitle: "Server Error", errorMessage:err.toString()});
    
            }.bind(this)
        });
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

 
ReactDOM.render(
  <MyStore url="/inventory.json"/>,
  document.getElementById('container')
);