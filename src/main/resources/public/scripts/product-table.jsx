var ProductRow = React.createClass({
    render: function(){
        return(
            <tr>
                <td><span>{this.props.productName} :</span></td>
                <td><span>{this.props.amount} left </span></td>
            </tr>
        );
    }
});

var ProductTable = React.createClass({
  render: function() {
    var productRows = this.props.products.map(function(product) {
        return (
            <ProductRow productName={product.name} amount={product.amount} key={product.name} />
        );
    });
    return (
        <div>
            <h3>Currently available in our shop:</h3>
            <table>
                <tbody>
                    {productRows}
                </tbody>
            </table>
        </div>
    );
  }
});