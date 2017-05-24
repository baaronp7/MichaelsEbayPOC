var request = require("request");
var config = require('../../config.json');

exports.getProducts = function(query, maxEntries, page, callback) {
    var options = { 
        method: 'GET',
        url: 'https://svcs.ebay.com/services/search/FindingService/v1',
        qs: 
        { 
            'SECURITY-APPNAME': 'RyanRife-Michaels-PRD-169dbd521-5b2dd715',
            'OPERATION-NAME': 'findItemsByKeywords',
            'SERVICE-VERSION': '1.0.0',
            'RESPONSE-DATA-FORMAT': 'JSON',
            'REST-PAYLOAD': '',
            keywords: 'paint',
            'paginationInput.entriesPerPage': maxEntries,
            'GLOBAL-ID': 'EBAY-US',
            siteid: '0' 
        },
        headers: { 'cache-control': 'no-cache' } 
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        callback(body);
    });
    /*
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
    */
}