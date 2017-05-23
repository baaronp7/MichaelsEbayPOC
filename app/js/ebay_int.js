var request = require("request");
var config = require('../../config.json');

exports.getProducts = function(query, maxEntries, page, callback) {
    var options = {
        method: 'GET',
        url: 'http://open.api.ebay.com/shopping',
        qs: 
        {
            callname: 'FindProducts',
            responseencoding: 'JSON',
            appid: config.ebay.app_id,
            siteid: '0',
            MaxEntries: maxEntries,
            PageNumber: page,
            QueryKeywords: query,
            version: '713' 
        },
        headers: { 'cache-control': 'no-cache' } 
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        callback(body);
    });
}