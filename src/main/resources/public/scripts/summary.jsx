var SummaryLine = React.createClass({
    render: function(){
        return(
            <tr>
                <td><span>{this.props.itemName} :</span></td>
                <td><span>{this.props.amount} </span></td>
            </tr>
        );
    }
});

var Summary = React.createClass({
    onContinue: function(e){
        e.preventDefault();
        this.props.onContinue();
    },
    render: function(){
        var summaryLines = this.props.buyingItems.map(function(item) {
            return (
                <SummaryLine itemName={item.name} amount={item.amount} key={item.name} />
            );
        });
        return(
            <div>
                <h3> Shopping summary:</h3>
                <table>
                    <tbody>
                        {summaryLines}
                    </tbody>
                </table>
                <button onClick={this.onContinue} >Continune Shopping</button>
            </div>
        );
    } 
});