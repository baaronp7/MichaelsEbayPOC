var router = require('express').Router();
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var StaticRouter = require('react-router').StaticRouter;
var Redux = require('redux');
var ReactRouter = require('react-router-dom');
var Route = ReactRouter.Route;
var Provider = require('react-redux').Provider;
var Layout = require('../views/Layout.jsx');
var Home = require('../views/Index.jsx');
var NotFound = require('../views/NotFound.jsx');
var ebay = require("../app/js/ebay_int");

function reducer(state) { return state; }

router.get('/', function(request, response) {
    ebay.getProducts("paint", 10, 1, function(data) {
        var initialState = { 
            title: "Michaels Store",
            products: data
        };

        var store = Redux.createStore(reducer, initialState);

        var context = {};
        var html = ReactDOMServer.renderToString(
            <Provider store={store}>
                <StaticRouter location={request.url} context={context}>
                    {
                        <Layout>
                            <Route exact path='/' component={Home} />
                        </Layout>
                    }
                </StaticRouter>
            </Provider>
        );

        if (context.status >= 400) {
            response.status(context.status).send(html);
        } else if (context.url) {
            response.redirect(context.status, context.url);
        } else {
            response.send(html);
        }
    });
});

module.exports = router;
