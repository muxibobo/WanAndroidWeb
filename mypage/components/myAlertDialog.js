//使用前提，在页面添加 class='my-alert-dialog-root'根类元素
//页面自定义创建两个回调函数，cancelAlertDialogCallback();sureAlertDialogCallback();
let dialogMsg = '你确定吗？';
let mDialogId = 0;
function showAlertDialog(msg, dialogId) {
    // 获取或创建loading dialog元素
    dialogMsg = msg ? msg : dialogMsg;
    mDialogId = dialogId;
    var $loadDialog = $('.my-alert-dialog');
    var $loadDialogRoot = $('.my-alert-dialog-root');
    if ($loadDialog.length === 0) {
        createAlertDialog();
        $loadDialogRoot = $('.my-alert-dialog-root');
    }

    // 显示loading dialog
    // $loadDialogRoot.css('display', 'flex');
    // $loadDialogRoot.css('transition', 'all 1s');
    // $loadDialogRoot.css('opacity', '1');
    $loadDialogRoot.removeClass('alert-hidden');
    $loadDialogRoot.addClass('alert-show');
    $('.my-alert-dialog-msg').text(dialogMsg);
}
function hideAlertDialog() {
    // 获取或创建loading dialog元素
    var $loadDialog = $('.my-alert-dialog');
    if ($loadDialog.length != 0) {
        // 隐藏loading dialog
        var $loadDialogRoot = $('.my-alert-dialog-root');
        // $loadDialogRoot.css('display', 'none');
        // $loadDialogRoot.css('transition', 'all 1s');
        // $loadDialogRoot.css('opacity', '0');
        $loadDialogRoot.addClass('alert-hidden');
        $loadDialogRoot.removeClass('alert-show');
    }
}
const createrAlertDialogStyle = `
<style type="text/css">
.my-alert-dialog-root {
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(17, 5, 1, 0.3);
    z-index: 1000;
    transition: all 0.8s;
}
.alert-show{display:flex;opacity: 1;}
.alert-hidden{display:none;opacity: 0;}
.my-alert-dialog {
    font-size: 0.16rem;
    width: 2.4rem;
    background-color: white;
    border-radius: 0.05rem;
    display: flex;
    flex-direction: column;
}.my-alert-dialog-title {
    height: 0.36rem;
    line-height: 0.36rem;
    margin-top:0.1rem;
    text-align: center;
}.my-alert-dialog-msg {
    padding: 0.1rem;
    text-align: center;
    margin-bottom: 0.12rem;
}.my-alert-dialog-btn {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    border-top: 1px solid #ccc;
}.my-alert-right-btn{
    border-left:1px solid #ccc;
}.my-alert-right-btn,.my-alert-left-btn {
    width: 0.5rem;
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: center;
    flex: 1;
    cursor: pointer;
}
.my-alert-right-btn:active,.my-alert-left-btn:active {color:gray;background-color:rgba(255, 255, 255, 0.5);}
</style>
<div class="my-alert-dialog">
<div class="my-alert-dialog-title">温馨提示</div>
<div class="my-alert-dialog-msg">${dialogMsg}</div>
<div class="my-alert-dialog-btn">
<span class="my-alert-left-btn">取消</span>
<span class="my-alert-right-btn">确定</span>
</div>
</div>
`;
// 创建一个Dialog函数
function createAlertDialog() {
    $('.my-alert-dialog-root').append(createrAlertDialogStyle);
    $('.my-alert-left-btn').click(function () {
        try {
            hideAlertDialog();
            cancelAlertDialogCallback(mDialogId);
        } catch (error) {

        }
    });
    $('.my-alert-right-btn').click(function () {
        try {
            hideAlertDialog();
            sureAlertDialogCallback(mDialogId);
        } catch (error) {

        }
    });
}