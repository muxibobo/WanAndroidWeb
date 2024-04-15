let mTitleName;
$(() => {
    //dom加载完成
    initData();
    initClick();
})
function initData() {
    try {
        var urlParams = new URLSearchParams(window.location.search);
        mTitleName = urlParams.get('titleBarName');
        initView();
    } catch (error) {

    }
}
function initView() {
    setTitle(mTitleName);
}
function initClick() {

}