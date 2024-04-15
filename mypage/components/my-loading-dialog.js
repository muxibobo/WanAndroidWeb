//直接导入JavaScript函数创建加载框-没用上
let loadingMsg='加载中...';
function showLoadingDialog(msg) {
    // 获取或创建loading dialog元素
    loadingMsg=msg?msg:loadingMsg;
    var $loadDialog = $('.load-dialog');
    if ($loadDialog.length === 0) {
        createLoadingDialog();
        $loadDialog = $('.load-dialog');
    }

    // 显示loading dialog
    $loadDialog.css('display', 'block');
}
function hideLoadingDialog() {
    // 获取或创建loading dialog元素
    var $loadDialog = $('.load-dialog');
    if ($loadDialog.length === 0) {
        createLoadingDialog();
        $loadDialog = $('.load-dialog');
    }

    // 隐藏loading dialog
    $loadDialog.css('display', 'none');
}
// 创建一个showLoadingDialog函数
function createLoadingDialog() {
    $('body').append(`
    <style type="text/css">@keyframes imgRotateAnimation {
        0% {transform: rotate(0deg);}
      100% {transform: rotate(360deg);}
    }</style>
    <div class="load-dialog" style="color: #949494;font-size: 0.14rem; display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0.48rem; z-index: 9999; background-color: rgba(0,0,0,0.1);">
        <div class="load-dialog-content" style="display: flex; width: 100%; height: 100%; flex-direction: column; justify-content: center; align-items: center;">
            <img src="../../../img/black128/loading.png" style="width: 0.8rem; height: 0.8rem; animation: imgRotateAnimation 1s linear infinite; opacity: 0.3;" alt="">
            <p style="margin-top: 0.1rem;">${loadingMsg}</p>
        </div>
    </div>
`);
}