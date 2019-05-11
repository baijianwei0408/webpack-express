const express = require('express');

/**
 * 创建服务器
 */
const app = express();
/**
 * 获取配置信息
 */

/**定位静态文件*/
app.use('/', express.static('./dist'));

app.get("*", function (request, response) {
    response.end("404 - NOT FOUND!");
});
app.all('*', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-type', 'text/html');
});

app.listen(3000, function () {
    console.log('started server on port 3000!!!!')
})