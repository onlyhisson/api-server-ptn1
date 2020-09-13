
const request = require('request');
const querystring = require('querystring');
const md5 = require("md5");

const ACCESS_KEY = "7pXD6obW4SO7pXD6obW4DP";            // 22자
const SECRET_KEY = "e056e1fd46ac7884d7febfe14cb08000"   // 32자

//reqApi('post', '/test', {});
reqApi('get', '/test', {key1:'value1', key2:'value2'});

function reqApi (method, uri, bindVal) {
    const timeStamp = +new Date();
    const sign = md5(ACCESS_KEY + timeStamp + SECRET_KEY);
    const HOST = 'http://127.0.0.1:3000'
    const BASE_PATH = '';
    let OPTIONS = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Apiid': ACCESS_KEY,
            'Timestamp': timeStamp,
            'Sign': sign
        },
        url: null,
        body: null,
        query : null
    };

    OPTIONS.url = HOST + BASE_PATH + uri;

    if (method === 'get') {
        var url_qs = querystring.stringify(bindVal);
        OPTIONS.url = OPTIONS.url + '?' + url_qs;
        request.get(OPTIONS, function (err, res, result) {
            try {
                //console.log(res);
                console.log(result);
            } catch (e) {
                console.log(e);
            }
        });
    } else if (method === 'post') {
        request.post(OPTIONS, function (err, res, result) {
            if(err) {
                console.log(err)
                return;
            }
            try {
                console.log(result)
            } catch (e) {
                console.log(e);
            }
        });
    } else {

    }
}

