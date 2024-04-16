// +++===============准备工作===================+++
//安装在根目录和自定义boService文件夹目录下都行。按住boService右键'在集成终端中打开'
//四大步骤
//1.cmd创建，初始化npm
//npm init --yes
//2.安装express框架
//npm i express
//3.创建接口
//4.终端cmd中输入node ServiceProxyApi.js 启动运行服务

//+++================开始开发==================+++

// 创建express框架服务，创建简易接口数据===>根目录/boService/ServiceProxyApi.js

//=》1.引入express
const expressBo = require('express');
//端口号
const expressServiceHost = 8888;
//=》2.创建应用对象
const myApp = expressBo();

// =====================中间件处理区=====响应前===============》

//=》3.使用 body-parser 中间件来解析数据

const bodyParser = require('body-parser');//设置json格式
const mycors = require('cors'); // 引入cors包，解决跨域
//这几个use（）也是中间件
myApp.use(bodyParser.urlencoded({ extended: false }));
myApp.use(bodyParser.json());

//===跨域设置方案1===配置方案1就注释方案2可以了
const corsOptions = {
    // origin: ['http://localhost:3000'], // 替换为您的前端应用地址
    // 或者使用通配符允许任何源（不推荐，仅用于测试）
    origin: '*',
    credentials: true, // 允许携带 cookie
};

myApp.use(mycors(corsOptions));
//===跨域设置方案2===
//------中间件：设置全局跨域中间件
// myApp.all("*", (req, res, next) => {
//     console.log('---中间件---跨域设置all-url:', req.url);
//     configCors(req, res);
//     if (req.method.toLowerCase() === 'options') {
//         res.send(200); // 让 options 尝试快速结束请求
//     } else {
//         next();
//     }
// })
// function configCors(req, res) {
//     try {    
//         console.log('---中间件---跨域设置-状态：', res.statusCode);
//         console.log('---中间件---配置内网-跨域设置-url:', req.url);

//         // res.setheader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type Accept");//最重要这句话
//         res.setHeader("Access-Control-Allow-Origin", "*");              	// 允许任意外源访问
//         res.setHeader("Access-Control-Allow-Headers", "*");		// 自定义请求首部字段，这里是通配符 设置所有类型
//         res.setHeader("Access-Control-Allow-Methods", "*");    		 	// 允许所有请求方法
//         res.setHeader("Access-Control-Allow-Credentials", "true");              	// 允许携带cookie
//         // res.setHeader("Content-Type", "application/json;charset=utf-8");	// 设置数据返回类型为json，字符集为utf8

//     } catch (error) {
//         console.log('---中间件---跨域设置-异常：', error);
//     }
// }
// =====================中间件处理区====================》

//=》4.创建路由规则
//request请求报文
//response响应报文

//===============================================接口代理和转发===================================================》
//====方案1===接口代理数据连接===============》
// 先安装 http-proxy-middleware库，终端命令：npm i http-proxy-middleware
const { createProxyMiddleware } = require('http-proxy-middleware');
//------中间件：请求前中间件
myApp.use('/api/proxyApi', (req, res, next) => {
    console.log('---代理请求--start:', req.url);
    next();
});

// 创建代理中间件
const proxy = createProxyMiddleware({
    //目标地址：https://www.wanandroid.com/banner/json
    //前端发出请求 http://localhost:8888/api/proxyApi/banner/json
    //pathRewrite:重写的路径，将/api/proxyApi/banner/json替换为'banner/json'
    target: 'https://www.wanandroid.com/',//目标服务器地址
    changeOrigin: true,//是否跨域
    pathRewrite: {
        '^/api/proxyApi': '', // 重写路径，api接口地址替换，为空直接将接口地址替换掉
    },
});

//------中间件：使用代理中间件
myApp.use('/api/proxyApi', proxy);
//=======接口代理数据连接===============》

//====方案2===接口转发请求数据连接===============》
// 先安装 axios库，终端命令：npm install axios
const axios = require('axios');

// 假设你想访问目标服务器的某个POST接口http://xxx/ccc
// 前端发出Get请求 http://localhost:8888/api/routeApi?routeParamsVal
// body: JSON.stringify(routeParamsVal)
// routeParamsVal={
// apiRequestType:'GET',
// apiRouteUrl：'详细转发的请求接口地址http://xxx/ccc'
// apiRouteParams:'{xxx:ccc}'
// apiRouteCookie:'xxxxxxxxx'
// }
myApp.all('/api/routeApi', async (req, res) => {
    try {
        console.log('--routeApi-请求全地址开始：' + req.url);
        console.log('--routeApi-请求body：' + JSON.stringify(req.body));
        const routeUrl = req.body.apiRouteUrl;
        const reqType = req.body.apiRequestType;
        console.log('--routeApi-请求转接地址：' + routeUrl);
        if (routeUrl == null || routeUrl == '' || routeUrl == undefined) {
            res.status(500).json({ error: '请求地址routeUrl异常' });
            return;
        }
        let responseResult;
        // ---post请求
        let paramsData = req.body.apiRouteParams;
        // console.log('--routeApi-请求转接的POST参数：' + paramsData);
        if (paramsData == null || paramsData == '' || paramsData == undefined) {
            paramsData = null
        }
        let cookieData = req.body.apiRouteCookie;
        // console.log('--routeApi-请求转接的POST参数：' + cookieData);
        if (cookieData == null || cookieData == '' || cookieData == undefined) {
            cookieData = null
        }
        // 构建转发请求的选项
        const options = {
            method: reqType.toLowerCase(),
            url: routeUrl, // 目标接口 URL
            headers: {
                // 添加 loginUserName cookie 到请求头
                Cookie: cookieData,
                // 可能还需要其他必要的请求头
            },
            data: paramsData, // 如果是 POST 请求，转发请求体
        };
        // 使用 Axios 发起转发请求
        responseResult = await axios(options)
            .then(response => {
                // 处理响应数据
                console.error('response：' + response);
                res.json(response.data);
            })
            .catch(errorMsg => {
                // 处理请求错误
                console.error('axios异常：' + errorMsg);
                res.status(500).json({ error: errorMsg });
            });
    } catch (error) {
        console.error('Error fetching from other server:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//===============================================接口代理和转发===================================================》

// =====================普通接口区====================》
//连接数据库 
var mysql = require('mysql');//引入mysql库
let connectionConfigDb = {
    host: 'localhost',
    user: 'root',
    password: '123456bo',
    database: 'mysql',//数据库名，我的就是安装时设置的‘mysql’
    connectTimeout: 1 * 60 * 60 * 1000,//连接超时时间1小时
};
//--单独连接数据库 
// var dbConnection = mysql.createConnection(connectionConfigDb);
// dbConnection.connect();

//--创建连接池连接数据库 
let dbpool = mysql.createPool(connectionConfigDb);

//执行数据库操作
function executeDatabaseSql(sql, params, callback) {
    dbpool.getConnection((err, dbConnection) => {
        if (err) {
            // 错误处理及重试
            if (err.code === 'ECONNRESET') {
                console.error('连接重置，稍后重试...');
                setTimeout(() => {
                    executeDatabaseSql(sql, params, callback);
                }, 5000); // 5秒后重试连接
            } else {
                console.error('数据库连接错误：', err);
            }
        } else {
            // 正常处理数据库操作...
            dbConnection.query(sql, params, callback);
            dbConnection.release(); // 使用完连接记得归还给连接池
        }
    });
}

myApp.get('/api/QueryAllUserInfo', (request, response) => {
    console.log('--get接收-开始');
    // //设置响应 send只能发送字符串
    // response.send("哈喽，你好呀--我是一条GET请求返回内容");
    try {
        executeDatabaseSql('SELECT * FROM userinfo', null, function (error, results, fields) {
            if (error) { throw error; }
            console.log('The results is:: ', results);
            response.json({ code: 1, message: `POST-请求所有`, data: results });
        });
    } catch (e) {
        response.json({ code: 0, message: `QueryAllUserInfo请求异常: ${e.message}`, data: {} });
    }
});

myApp.post('/api/QueryUserInfo', (request, response) => {
    console.log('--post接收-开始');
    // //设置响应头，设置允许跨域
    // response.setHeader('Access-Control-Allow-Origin', '*');
    // //响应所有类型请求头
    // response.setHeader('Access-Control-Allow-Headers', '*');
    try {
        console.log(request.body);
        const userName = request.body.UserName;
        console.log('--POST接收内容：' + userName);
        //json可以发送json对象
        // response.json({ message: `POST--返回请求内容，名字: ${userName}` });
        var modSql = 'SELECT * FROM userinfo where name = ?';
        var modSqlParams = [userName];
        executeDatabaseSql(modSql, modSqlParams, function (error, results, fields) {
            if (error) { throw error; }
            // console.log('The results is:: ', results[0].name);
            console.log('The results is: ', results);
            response.json({ code: 1, message: `POST-名字username: ${userName}`, data: results });
        });
    } catch (e) {
        response.json({ code: 0, message: `QueryUserInfo请求异常: ${e.message}`, data: {} });
        console.log('--POST请求异常：' + e);
    }
});

//all可以接收任意类型的请求get,post,put等
myApp.all('/api/AddUserInfo', (request, response) => {
    console.log('--post接收From-开始' + request.url);
    try {
        console.log(request.body);
        const userName = request.body.UserName;
        const userPwd = request.body.UserPwd;
        // //设置响应 send只能发送字符串

        var addSql = 'INSERT INTO userinfo(user_id,name,password) VALUES(0,?,?)';
        var addSqlParams = [userName, userPwd];
        executeDatabaseSql(addSql, addSqlParams, function (err, results) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }

            console.log('--------------------------INSERT----------------------------');
            //console.log('INSERT ID:',results.insertId);        
            console.log('INSERT ID:', results);
            console.log('-----------------------------------------------------------------\n\n');
            response.json({ code: 1, message: `POST-名字username: ${userName}`, data: results.body });
        });
    } catch (e) {
        response.json({ code: 0, message: `AddUserInfo请求异常: ${e.message}`, data: {} });
        console.log('--POST请求异常：' + e);
    }
});

//all可以接收任意类型的请求get,post,put等
myApp.all('/api/muxiInfoFrom', (request, response) => {
    console.log('--post接收From-开始' + request.url);
    try {
        console.log(request.body);
        const userName = request.body.UserName;
        // //设置响应 send只能发送字符串
        // response.send("--POST请求-哈喽，你好呀--返回内容：" + userName);
        // 根据表单数据构建新的URL
        const newUrl = `http://localhost:8080/test/test_http.html?username=${userName}`;
        // 返回新的URL作为响应
        response.status(200).send(newUrl);
    } catch (e) {
        response.status(500).send("POST请求异常:" + e);
        console.log('--POST请求异常：' + e);
    }
});
// =====================普通接口区====================》

// =====================中间件处理区===响应后=================》
// >1.放在前面意味着中间件是全局或共享的，对所有（包括/muxiInfo）路由生效。
// >2.放在post('/muxiInfo')内部作为第三个参数，则中间件只为这个特定路由服务。
// >3.若只是单纯地放在post('/muxiInfo')后面，则不直接影响该POST接口处理流程。
//------中间件：响应结束后
myApp.use((req, res, next) => {
    console.log('---中间件-代理请求end:', req.url);
    // 这里可以访问到代理请求的响应
    res.on('finish', () => {
        console.log('---中间件-响应完成:', res.statusCode);
    });
    next();
});

//------中间件：用于处理错误
myApp.use((err, req, res, next) => {
    console.error('---中间件-发生错误:', err);
    res.status(500).send('Internal Server Error' + err.message);
});
// =====================中间件处理区====================》

//=》5.监听端口，启动服务
var server = myApp.listen(expressServiceHost, () => {
    var host = server.address().address
    var port = server.address().port
    console.log('我的服务启动了，' + port + '端口监听中...');
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
//=》6.启动服务：当前目录boService文件夹下，右键'在集成终端中打开'，在终端cmd中输入node ServiceProxyApi.js运行