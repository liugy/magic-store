var Error = React.createClass({
    onBack: function(e){
        e.preventDefault();
        this.props.onBack();
    },
    render: function(){
        return (
            <div>
                <h3>{this.props.title}</h3>
                <span>{this.props.message}</span>
                <br></br>
                <button onClick={this.onBack} >Back to shopping</button>

            </div>
        );
    }
});