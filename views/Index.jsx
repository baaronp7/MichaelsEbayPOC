var React = require('react');
var connect = require('react-redux').connect;
var createReactClass = require('create-react-class');

var Index = createReactClass({

    previous: function() {
        if(this.props.custom.page > 1) {
            this.props.custom.page -= 1;
            var url = window.location.href;
            url =  url.slice(0, url.lastIndexOf('&'));
            window.location = url + "&page=" + this.props.custom.page;
        }
    },

    next: function() {
        if(this.props.custom.page < this.props.custom.pages) {
            this.props.custom.page += 1;
            var url = window.location.href;
            url =  url.slice(0, url.lastIndexOf('&'));
            window.location = url + "&page=" + this.props.custom.page;
        }
    },
        
    render: function() {
        var custom = this.props.custom;
        var products = JSON.parse(custom.products).findItemsByKeywordsResponse[0].searchResult[0].item;
        return (
            <div className={"productContainer"}>
                {products.map(product =>
                    <div key={Math.random()} className={"productTile"}>
                        <h2>{product.title}</h2>
                        <img src={product.galleryURL}/>
                        <div className={"productPrice"}>${parseFloat(product.sellingStatus[0].currentPrice[0].__value__).toFixed(2)}</div>
                    </div>
                )}
                <div className={"pageController"}>
                    <button className={"pagePrev"} onClick={this.previous}>Prev</button>
                    <button className={"pageNext"} onClick={this.next}>Next</button>
                </div>
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