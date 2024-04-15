let tabObjData;
let loadDialog;
$(() => {
    //dom加载完成
    initData();
});

function initData() {
    requestTypelist();
}
function requestTypelist() {
    //https://www.wanandroid.com/tree/json
    loadDialog.showLoadingDialog();
    fetch(`${base_url}/proxyApi/tree/json`, {
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
            console.log(dataObj);
            tabObjData = dataObj;
            var tabhtmlTem = template('type-info-template', dataObj);
            $('#tab-typeinfo-list').html(tabhtmlTem);
        }).finally(() => {
            // 在这里放置任何你想在请求完成（不论成功或失败）后执行的操作
            //必须在banner渲染完毕后设置
            loadDialog.hideLoadingDialog();
        })
        .catch(error => {
            console.log(error);
        });
}
function typeInfoItemClick(itemDataStr) {
    //注意要小写key, console.log('ItemObjData:'+$('.article-item').data('itemobjdata'));
    //document.getElementById('.article-item').dataset.itemobjdata);
    let safeObjStr = deleteSanitizeForJson(itemDataStr); // 替换换行符为空字符串
    console.log(safeObjStr)
    let dataObj;
    try {
        dataObj = JSON.parse(safeObjStr);
        sessionStorage.setItem('Key-MyTabBarData', safeObjStr);
        window.location.href = `../type-detail-list/index.html?tabId=${dataObj.children[0].id}&tabParentId=${dataObj.id}&titleBarName=${dataObj.name}`;
    } catch (error) {
        console.error("Cannot parse data-objData as JSON:", error);
    }
}