// 使用createDialog...
let loadDialog;
let isLogin = false;
$(() => {
    //dom加载完成
    initData();
    initClick();
});
function initData() {
    if (sessionStorage.getItem(KeyUid) == null || sessionStorage.getItem(KeyUid) == undefined) {
        isLogin = false;
        $('#my-avatar-name').text('未登录');
        $('#go-login-out>span').text('立即注册');
    } else {
        isLogin = true;
        $('#my-avatar-name').text(sessionStorage.getItem(KeyUsername));
        $('#go-login-out>span').text('退出登录');
    }
}
function initClick() {
    $('#go-login-out').click(function () {
        if (isLogin) {
            showAlertDialog('你确定要退出吗？', 'login-out-dialog');
        } else {
            window.location.href = `../login/index.html?titleBarName=登录&IsLoginKey=${isLogin}`;//当前页面重定向打开
        }
    });
    $('#go-collect-list').click(function () {
        if (isLogin == false) {
            showAlertDialog('未登录，请先登录', 'go-login-dialog');
        } else {
            window.location.href = `../collect/index.html?titleBarName=我的收藏`;
        }
    });
    $('#go-about').click(function () {
        window.location.href = `../about/index.html?titleBarName=关于`;
    });
    $("body").on("click", "#my-avatar-name,#my-avatar-img", function () {
        if (isLogin == false) {
            showAlertDialog('未登录，请先登录', 'go-login-dialog');
        } else {
            window.location.href = `../collect/index.html?titleBarName=我的收藏`;
        }
    });
}
function sureAlertDialogCallback(dialogId) {
    if (dialogId == 'go-login-dialog' || dialogId == 'login-out-dialog') {
        sessionStorage.clear();
        document.cookie = '';
        console.log("isLogin0=" + isLogin)
        if (dialogId == 'go-login-dialog') {
            window.location.href = `../login/index.html?titleBarName=登录&IsLoginKey=${isLogin}`;//当前页面重定向打开
        } else {
            // 刷新当前页面
            window.location.reload();
        }
    }
}