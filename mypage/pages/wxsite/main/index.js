let tabObjData = {};
let loadDialog;

$(() => {
    //dom加载完成
    initData();
});
function initData() {
    requestTab();
}
function requestTab() {
    //https://wanandroid.com/wxarticle/chapters/json
    loadDialog.showLoadingDialog();
    fetch(`${base_url}/proxyApi/wxarticle/chapters/json`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'myHeaderName': 'test'//不能包含中文，要符合规范的 ISO-8859-1 编码
        },
        // body: JSON.stringify({ UserName: '李牛Promise' })
    })
        .then(response => {
            return response.json()
        }).then(dataObj => {
            tabObjData = dataObj;
            console.log(dataObj);
            var tabhtmlTem = template('wxsite-list-template', dataObj);
            $('#wxsite-type-list').html(tabhtmlTem);
        }).finally(() => {
            // 在这里放置任何你想在请求完成（不论成功或失败）后执行的操作
            //必须在banner渲染完毕后设置
            loadDialog.hideLoadingDialog();
            updataItemBgColor();
        })
        .catch(error => {
            console.log(error);
        });
}
function updataItemBgColor() {
    // 给所有.tab-info-link元素设置随机背景色
    $('.wxsite-list-item').each(function () {
        var randomColor = getRandomColor().toLowerCase();
        // 将'white'替换为'var(--text-color-blue)'，不区分大小写
        if (randomColor === 'white' || randomColor === '#ffffff' || randomColor === '#fff') {
            randomColor = 'var(--text-color-blue)';
        }
        $(this).css('background-color', randomColor);
    });
}
function wxSiteItemClick(itemDataStr) {
    let safeObjStr = deleteSanitizeForJson(itemDataStr); // 替换换行符为空字符串
    console.log(safeObjStr)
    let dataObj;
    try {
        dataObj = JSON.parse(safeObjStr);
        window.location.href = '../wx-site-search/index.html?wxSiteId=' + dataObj.id;
    } catch (error) {
        console.error("Cannot parse data-objData as JSON:", error);
    }
}