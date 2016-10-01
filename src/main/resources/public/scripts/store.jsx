

var MyStore = React.createClass({
    getInitialState: function() {
        return {nextPage: "shopping", inventory:[], buyingItems:[]};
    },
    componentDidMount: function() {
        this.loadInventoryFromServer();
    },

    loadInventoryFromServer: function() {
        $.ajax({
            url: this.props.inventoryUrl,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({nextPage: "shopping", inventory:data, buyingItems:this.state.buyingItems});
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({nextPage: "error", inventory: this.state.inventory, buyingItems:this.state.buyingItems, errorTitle: xhr.responseJSON.error, errorMessage:xhr.responseJSON.message});
            }.bind(this)
        });
    },

    checkout: function(buyingItems){
        $.ajax({
            url: this.props.checkoutUrl,
            dataType: 'json',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(buyingItems),
            success: function(newInventory) {
                this.setState({nextPage: "summary", inventory: newInventory, buyingItems: buyingItems});
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({nextPage: "error", inventory: this.state.inventory, buyingItems:this.state.buyingItems, errorTitle: xhr.responseJSON.error, errorMessage:xhr.responseJSON.message});
            }.bind(this)
        });
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
                display = <Shopping inventory={this.state.inventory} onCheckout={this.checkout} onOutOfInventory={this.onOutOfInventory}/>
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
  <MyStore inventoryUrl="/inventory.json" checkoutUrl="/checkout.json"/>,
  document.getElementById('container')
);