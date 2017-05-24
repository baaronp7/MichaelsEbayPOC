var React = require('react');
var connect = require('react-redux').connect;
var createReactClass = require('create-react-class');

var Index = createReactClass({
    render: function() {
        var custom = this.props.custom;
        return (
            <div className={"productContainer"}>
                {JSON.parse(custom.products).findItemsByKeywordsResponse[0].searchResult[0].item.map(product =>
                    <div key={product.itemId} className={"productTile"}>
                        <h2>{product.title}</h2>
                        <img src={product.galleryURL}/>
                        <div className={"productPrice"}>${parseFloat(product.sellingStatus[0].currentPrice[0].__value__).toFixed(2)}</div>
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