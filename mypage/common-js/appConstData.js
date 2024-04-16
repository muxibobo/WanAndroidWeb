const base_url = 'http://localhost:8888/api';

const pageSize = 10;//取值为[1-40]

const KeyUid = 'key_uid';
const KeyUsername = 'key_user_name';
const KeyUserPws = 'key_user_password';
const mCookie = `loginUserName=${sessionStorage.getItem(KeyUsername)}; loginUserPassword=${sessionStorage.getItem(KeyUserPws)}`