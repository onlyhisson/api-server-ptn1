const express = require('express');
const app = express();
const md5 = require("md5");

const SECRET_KEY = "e056e1fd46ac7884d7febfe14cb08000"   // 32자

app.set('port', process.env.PORT || 3000);

app.get("/test", (req, res, next) => {
    const headers = req.headers || {};
    const apiKey = headers.apiid || '';
    const timestamp = headers.timestamp || '';
    const clientSign = headers.sign || '';
    const serverSign = md5(apiKey + timestamp + SECRET_KEY);
    
    const body  = req.query;    // { key1: 'value1', key2: 'value2' }

    if(clientSign == serverSign) {
        res.json({
            result: 'SUCCESS'
        });
    } else {
        res.json({
            result: 'FAILED'
        });
    }
});

app.post("/test", (req, res, next) => {
    const headers = req.headers || {};
    const apiKey = headers.apiid || '';
    const timestamp = headers.timestamp || '';
    const clientSign = headers.sign || '';
    const serverSign = md5(apiKey + timestamp + SECRET_KEY);

    const body  = req.body;

    if(clientSign == serverSign) {
        res.json({
            result: 'SUCCESS'
        });
    } else {
        res.json({
            result: 'FAILED'
        });
    }
});

app.use((err, req, res, next) => {
    res.json({
        result: 'FAILED',
        msg: 'SERVER_ERROR'
    });
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});