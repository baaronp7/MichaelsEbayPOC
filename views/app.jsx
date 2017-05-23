var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = require('react-router-dom').BrowserRouter;
var NotFoundRoute = require('react-router-dom').NotFoundRoute;
var Switch = require('react-router-dom').Switch;
var Route = ReactRouter.Route;
var Layout = require('./Layout.jsx');
var Home = require('./Index.jsx');
var NotFound = require('./NotFound.jsx');
var browserHistory = ReactRouter.browserHistory;

module.exports = (
    <Layout>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path="*" component={NotFound} />
        </Switch>
    </Layout>
);
