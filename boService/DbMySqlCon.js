//连接数据库 
var mysql = require('mysql');//引入mysql库
var dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456bo',
    database: 'mysql'//数据库名，我的就是安装时设置的‘mysql’
});

dbConnection.connect();
dbConnection.query('SELECT * FROM userinfo', function (error, results, fields) {
    if (error) { connection.end(); throw error; }
    // console.log('The first name is: ', results[0].name);
    console.log('The first name is: ', results);
});
connection.end(); 