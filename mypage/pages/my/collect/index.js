let pageIndex = 0;
let listAritcleObj = {};
let isArticleLoading = false;
let isArticleMore = true;
let loadDialog;
let mTitleName;
$(() => {
    //dom加载完成
    initData();
    onclickFun();
});
function initView() {
    setTitle(mTitleName);
    // 获取body元素的高度
    // const bodyHeight = document.body.clientHeight;
    // const pagecontentView = document.getElementById("page-content");
    // const titlebarHeight = document.getElementById("wx-search-bar").clientHeight;
    // pagecontentView.style.height = bodyHeight - titlebarHeight;
}
function initData() {
    try {
        var urlParams = new URLSearchParams(window.location.search);
        mTitleName = urlParams.get('titleBarName');
        initView();
    } catch (error) {

    }
    pageIndex = 0;
    isArticleMore = true;
    initTemplateFun();
    requestAritcle();
}
function onclickFun() {
    $('#article-load-more').click(function () {
        if (isArticleLoading || !isArticleMore) {
            return;
        }
        requestAritcle();
    });

    $('#article-list-content').scroll(function () {
        // console.log('--scrollHeight=');
        var scrollHeight = $('#article-list-content').scrollTop();//滚动的高度
        // var wdheight = $(window).height();//窗口的高度
        var wdheight = $('body').height();//窗口的高度
        var titlebarheight = $('#title-bar').height();//标题栏的高度
        var DoMHeight = $('#article-list').height();//文档的高度
        // console.log('--scrollHeight=' + scrollHeight + '--height=' + wdheight + '--DoMHeight=' + DoMHeight);
        if (scrollHeight + wdheight - titlebarheight + 20 >= DoMHeight) {
            if (isArticleLoading || !isArticleMore) {
                return;
            }
            requestAritcle();
        }
    });
}
function initTemplateFun() {
    //js代码中调用
    // template.defaults.escape = false;//模板引擎不转义，不解析富文本text内容
    template.defaults.imports.$dateFormatFun = function (date1, date2, format) {
        if (date1) {
            return date1;
        } else {
            console.log('date:' + date1 + '--format:' + format);
            return timestampToDate(date2, format);
        }
    };
}

// 获取文章列表
function requestAritcle() {
    //使用promise
    if (isArticleLoading) {
        return;
    }
    isArticleLoading = true;
    loadDialog.showLoadingDialog();
    updateAritcleStateMsg('正在加载中...');
    // https://www.wanandroid.com/lg/collect/list/0/json
    const routeParamsVal = {
        apiRequestType: 'get',
        apiRouteUrl: `https://www.wanandroid.com/lg/collect/list/${pageIndex}/json?page_size=${pageSize}`,
        // apiRouteParams: JSON.stringify(paramVal),
        apiRouteCookie: mCookie,
    };
    fetch(`${base_url}/routeApi`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(routeParamsVal)
    }).then(response => {
        return response.json()
    }).then(dataObj => {
        console.log(dataObj);
        if (dataObj.data.datas.length == 0) {
            isArticleMore = false;
            return;
        }
        dataObj.data.datas.forEach(element => {
            element.collect=true;
        });
        isArticleMore = true;
        if (pageIndex == 0) {
            listAritcleObj = dataObj;
        } else {
            //扩展运算符（...），添加数组的元素,
            listAritcleObj.data.datas.push(...dataObj.data.datas);
        }
        pageIndex++;
        var htmlTem = template('article-list-template', listAritcleObj);
        $('#article-list').html(htmlTem);
    }).finally(() => {
        // 在这里放置任何你想在请求完成（不论成功或失败）后执行的操作
        // 例如：隐藏加载动画
        isArticleLoading = false;
        loadDialog.hideLoadingDialog();
        updateAritcleStateMsg(isArticleMore ? '点击加载更多' : '暂无更多数据');
    }).catch(error => {
        console.log(error);
    });
}
function updateAritcleStateMsg(msg) {
    $('#article-load-more').text(msg);
}
//收藏结果回调
function collectResultCallBack(itemIndex, isCollect, artId, originId) {
    if (listAritcleObj.data.datas.length>=itemIndex) {
        listAritcleObj.data.datas[itemIndex].collect=isCollect;
    }
}
// 文章列表点击
function articleItemClick(e, itemDataStr) {
    //注意要小写key, console.log('ItemObjData:'+$('.article-item').data('itemobjdata'));
    //document.getElementById('.article-item').dataset.itemobjdata);
    let dataObj;
    try {
        dataObj = JSON.parse(itemDataStr);
    } catch (error) {
        console.error("Cannot parse data-objData as JSON:", error);
    }
    window.open(dataObj.link, '_blank');//新标签页面窗口打开
}