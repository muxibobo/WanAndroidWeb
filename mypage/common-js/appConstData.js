const base_url = 'http://localhost:8888/api';
// const base_url ='https://5o690r1070.vicp.fun/api';//内网穿透必须的域名，使用内网穿透提供外网连接，同时在网页请求中免去了配置https证书问题

const pageSize = 10;//取值为[1-40]

const KeyUid = 'key_uid';
const KeyUsername = 'key_user_name';
const KeyUserPws = 'key_user_password';
const mCookie = `loginUserName=${sessionStorage.getItem(KeyUsername)}; loginUserPassword=${sessionStorage.getItem(KeyUserPws)}`