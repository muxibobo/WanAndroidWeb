// 使用createDialog...
let loadDialog;
let mTitleName;
let isLogin = false;
$(() => {
    //dom加载完成
    initData();
    initClick();
});
//window.onload事件在整个页面及其所有资源（包括图像、样式表、脚本等）加载完毕后触发。
//DOMContentLoaded事件在HTML文档结构（DOM树）解析完毕后触发，此时不等待样式表、图像和其他外部资源加载完成。
document.addEventListener('DOMContentLoaded', function () {
    const loginDisplace = document.getElementById('login-displace');
    const imgElement = loginDisplace.querySelector('img');

    // 鼠标事件
    loginDisplace.addEventListener('mousedown', function () {
        imgElement.classList.add('active');
    });
    loginDisplace.addEventListener('mouseup', function () {
        imgElement.classList.remove('active');
    });

    // 触摸事件
    loginDisplace.addEventListener('touchstart', function () {
        imgElement.classList.add('active');
    });
    loginDisplace.addEventListener('touchend', function () {
        imgElement.classList.remove('active');
    });
});
function initData() {
    try {
        var urlParams = new URLSearchParams(window.location.search);
        mTitleName = urlParams.get('titleBarName');
        let loginVal = urlParams.get('IsLoginKey');
        console.log("isLogin10=" + loginVal)
        isLogin = eval(loginVal);
        console.log("sessionStorage=" + sessionStorage.getItem(KeyUid))
        console.log("isLogin1=" + isLogin + mTitleName)

        console.log("isLogin2=" + isLogin)
        initView();
    } catch (error) {

    }
}
function initView() {
    console.log("isLogin3=" + isLogin)
    if (isLogin) {
        console.log("isLogin4=" + isLogin)
        mTitleName = '登录';
        $("#my-info-list .my-info-item:eq(2)").removeClass("show-with-transition");
        $("#my-info-list .my-info-item:eq(2)").addClass("hidden-with-transition");

        $("#my-info-list .my-info-item:eq(2) img").removeClass("show-img-transition");
        $("#my-info-list .my-info-item:eq(2) img").addClass("hidden-img-transition");
        $('#login-displace>span').text('注册');
    } else {
        mTitleName = '注册';
        $('#login-displace>span').text('登录');
        $("#my-info-list .my-info-item:eq(2)").removeClass("hidden-with-transition");
        $("#my-info-list .my-info-item:eq(2)").addClass("show-with-transition");

        $("#my-info-list .my-info-item:eq(2) img").removeClass("hidden-img-transition");
        $("#my-info-list .my-info-item:eq(2) img").addClass("show-img-transition");
    }
    setTitle(mTitleName);
    $('#login-title').text(mTitleName);
    $('#login-btn').val(mTitleName);
}
function initClick() {
    $('#login-btn').click(function (event) {
        event.preventDefault(); // 阻止表单默认提交行为
        // 获取用户输入数据
        console.log("注册：点击");
        const username = $("#my-username").val();
        const password = $("#my-password").val();
        const confirmPassword = isLogin ? null : $("#my-confirm-password").val();

        elemHide($("#my-username-tip"));
        elemHide($("#my-password-tip"));
        elemHide($("#my-confirmpassword-tip"));

        // 基本的前端验证（示例）
        if (username == null || username == '') {
            elemShow($("#my-username-tip"));
            return;
        }
        if (password == null || password == '') {
            elemShow($("#my-password-tip"));
            return;
        }
        if (password !== confirmPassword && isLogin == false) {
            $("#my-confirmpassword-tip").text("两次输入的密码不一致，请重新输入");
            elemShow($("#my-confirmpassword-tip"));
            return;
        }
        requestRegister(username, password, confirmPassword);
    });
    $('#login-displace').click(function () {
        isLogin = !isLogin;
        console.log("isLogin5=" + isLogin)
        initView();
    });
}
/**
 * 判断显示
 * @param {节点对象} $elem 
 */
function elemHide($elem) {
    if ($elem.hasClass('css-visible')) {
        // $elem.removeClass("css-visible");
        // $elem.addClass("css-hidden");
        $elem.toggleClass("css-visible css-hidden");
    }
}
/**
 * 判断显示
 * @param {节点对象} $elem 
 */
function elemShow($elem) {
    if ($elem.hasClass('css-hidden')) {
        // $elem.removeClass("css-hidden");
        // $elem.addClass("css-visible");
        $elem.toggleClass("css-hidden css-visible");
    }
}
function requestRegister(myUsername, myPassword, myConfirmPassword) {
    //https://www.wanandroid.com/user/register， username,password,repassword
    //https://www.wanandroid.com/user/login

    loadDialog.showLoadingDialog();
    // const paramVal = { username: myUsername, password: myPassword, repassword: myConfirmPassword };
    let registerParams = (myConfirmPassword == null || myConfirmPassword == undefined) ? "" : `&repassword=${myConfirmPassword}`;
    const proxyRegistParamsVal = `user/${isLogin ? 'login' : 'register'}?username=${myUsername}&password=${myPassword}${registerParams}`;
    console.log(document.cookie)
    fetch(`${base_url}/proxyApi/${proxyRegistParamsVal}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'myHeaderName': 'test'//不能包含中文，要符合规范的 ISO-8859-1 编码
        },
    }).then(response => {
        return response.json()
    }).then(dataObj => {
        console.log(dataObj);
        //{data: null, errorCode: -1, errorMsg: '用户名已经被注册！'}
        //{
        //     "data": {
        //         "admin": false,
        //         "chapterTops": [],
        //         "coinCount": 0,
        //         "collectIds": [],
        //         "email": "",
        //         "icon": "",
        //         "id": 160170,
        //         "nickname": "muxibobo3",
        //         "password": "",
        //         "publicName": "muxibobo3",
        //         "token": "",
        //         "type": 0,
        //         "username": "muxibobo3"
        //     },
        //     "errorCode": 0,
        //     "errorMsg": ""
        // }

        //// 保存数据到 sessionStorage
        // sessionStorage.setItem("key", "value");
        // // 从 sessionStorage 获取数据
        // let data = sessionStorage.getItem("key");
        // // 从 sessionStorage 删除保存的数据
        // sessionStorage.removeItem("key");
        // // 从 sessionStorage 删除所有保存的数据
        // sessionStorage.clear();

        if (dataObj.errorCode == 0) {
            sessionStorage.setItem(KeyUid, dataObj.data.id);
            sessionStorage.setItem(KeyUsername, dataObj.data.username);
            sessionStorage.setItem(KeyUserPws, myPassword);

            //手动设置浏览器cookie
            // var expirationDate = new Date();
            // expirationDate.setDate(expirationDate.getDate() + 7); // 7 days from now
            // var cookieNameStr = `loginUserName=${dataObj.data.username}; expires=${expirationDate.toUTCString()}; path=/`;
            // var cookiePwsStr = `loginUserPassword=${myPassword}; expires=${expirationDate.toUTCString()}; path=/`;
            // document.cookie = cookieNameStr;
            // document.cookie = cookiePwsStr;

            window.history.back();
        } else {
            $("#my-confirmpassword-tip").text(dataObj.errorMsg);
            elemShow($("#my-confirmpassword-tip"));
        }
    }).finally(() => {
        // 在这里放置任何你想在请求完成（不论成功或失败）后执行的操作
        //必须在banner渲染完毕后设置
        loadDialog.hideLoadingDialog();
    })
        .catch(error => {
            console.log(error);
        });
}