var React = require('react');
var connect = require('react-redux').connect;
var createReactClass = require('create-react-class');

var Index = createReactClass({
    render: function() {
        var custom = this.props.custom;
        return (
            <div className={"productContainer"}>
                {JSON.parse(custom.products).Product.map(product =>
                    <div key={product.ProductID[0].Value} className={"productTile"}>
                        <h2>{product.Title}</h2>
                        <img src={product.StockPhotoURL}/>
                    </div>
                )}
            </div>
        );
    }
});

var wrapper = connect(
    function(state) {
        return { custom: state };
    }
);

module.exports = wrapper(Index);