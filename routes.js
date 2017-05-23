const routes = require('express').Router();
var ebay = require("./app/js/ebay_int.js");

routes.get('/', (req, res) => {
    ebay.getProducts("paint", function(data) {
        res.status(200).json(data);
    })
});

module.exports = routes;