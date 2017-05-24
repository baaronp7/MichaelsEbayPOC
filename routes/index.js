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
    var query;
    var pageSize;
    var page;
    
    if(typeof request.query.q == "undefined")
        query = "paint";
    else
        query = request.query.q;
    if(typeof request.query.pageSize == "undefined")
        pageSize = 8;
    else
        pageSize = parseInt(request.query.pageSize);
    if(typeof request.query.page == "undefined")
        page = 1;
    else
        page = parseInt(request.query.page);

    ebay.getProducts(query, pageSize, page, function(data) {
        var initialState = { 
            title: "Michaels Store",
            products: data,
            pageSize: pageSize,
            page: page,
            pages: parseInt(JSON.parse(data).findItemsByKeywordsResponse[0].paginationOutput[0].totalPages[0])
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
