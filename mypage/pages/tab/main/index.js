let tabObjData = {};
let loadDialog;
$(() => {
    //dom加载完成
    initData();
    onclickFun();
});
function onclickFun() {
    $("#tab-type-list").on("click", ".tab-type-item", function (result) {
        $(this).addClass("item-color-activite").siblings().removeClass("item-color-activite");
    })
}

function initData() {
    requestTab();
}
function requestTab() {
    //https://www.wanandroid.com/navi/json
    loadDialog.showLoadingDialog();
    fetch(`${base_url}/proxyApi/navi/json`, {
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
            var tabhtmlTem = template('tab-list-template', dataObj);
            $('#tab-type-list').html(tabhtmlTem);
            updataTypeDetailItem(dataObj.data[0])
            $(".tab-type-item:eq(0)").addClass("item-color-activite");
            // $(".tab-type-item:first").addClass("item-color-activite");
            // $(".tab-type-item")[0].classList.add("item-color-activite");
            // selectTypeItem(dataObj.data[0]);//不推荐
        }).finally(() => {
            // 在这里放置任何你想在请求完成（不论成功或失败）后执行的操作
            //必须在banner渲染完毕后设置
            loadDialog.hideLoadingDialog();
        })
        .catch(error => {
            console.log(error);
        });
}
// 废弃
function tabTypeItemClick(index) {
    let dataObj;
    try {
        dataObj = tabObjData.data[index];
    } catch (error) {
        console.error("Cannot parse data-objData as JSON:", error);
    }
    // $('.tab-info-item').empty();
    updataTypeDetailItem(dataObj)
}
function tabTypeItemClick2(itemobjStr) {
    let safeObjStr = deleteSanitizeForJson(itemobjStr); // 替换换行符为空字符串
    console.log(safeObjStr)
    let dataObj;
    try {
        dataObj = JSON.parse(safeObjStr);
    } catch (error) {
        console.error("Cannot parse data-objData as JSON:", error);
    }
    updataTypeDetailItem(dataObj)
}
function updataTypeDetailItem(objdata) {
    var tabinfohtmlTem = template('tab-info-template', objdata);
    $('.tab-info-item').html(tabinfohtmlTem);
    // 给所有.tab-info-link元素设置随机背景色
    $('.tab-info-link').each(function () {
        var randomColor = getRandomColor().toLowerCase();
        // 将'white'替换为'var(--text-color-blue)'，不区分大小写
        if (randomColor === 'white' || randomColor === '#ffffff' || randomColor === '#fff') {
            randomColor = 'var(--text-color-blue)';
        }
        $(this).css('background-color', randomColor);
    });
    // selectTypeItem(objdata);
}
//废弃
function selectTypeItem(itemObj) {
    let chapterId = itemObj.cid;
    console.log('chapterId=' + chapterId);
    $('.tab-type-item').each(function () {
        let itemCid = $(this).data('tabcid');
        console.log(itemCid);
        if (Number.parseInt(itemCid) === chapterId) {
            $(this).css('color', 'var(--text-color-blue)');
        } else {
            $(this).css('color', 'black');
        }
    });
}