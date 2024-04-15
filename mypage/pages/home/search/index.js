let pageIndex = 0;
let wxSearchStr = '';
let listAritcleObj = {};
let isArticleLoading = false;
let isArticleMore = true;
let loadDialog;
$(() => {
    //dom加载完成
    initView();
    initData();
    onclickFun();
});
function initView() {
    // 获取body元素的高度
    // const bodyHeight = document.body.clientHeight;
    // const pagecontentView = document.getElementById("page-content");
    // const titlebarHeight = document.getElementById("wx-search-bar").clientHeight;
    // pagecontentView.style.height = bodyHeight - titlebarHeight;
}
function initData() {
    pageIndex = 0;
    isArticleMore = true;
    var urlParams = new URLSearchParams(window.location.search);

    initTemplateFun();
    requestAritcle();
}
function onclickFun() {
    $('#search-start-btn').click(function () {
        if (isArticleLoading) {
            return;
        }
        pageIndex = 0;
        console.log('wxSearchStr');
        wxSearchStr = $('#search-input').val();
        console.log(wxSearchStr);
        requestAritcle();
    });
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

    $('#wx-search-bar-back').click(function () {
        //返回上一页
        window.history.back();
    });
}
function initTemplateFun() {
    //js代码中调用
    template.defaults.escape = false;//模板引擎不转义，输出内容不编码，不解析富文本text内容
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
    //https://www.wanandroid.com/article/query/0/json
    fetch(`${base_url}/proxyApi/article/query/${pageIndex}/json?k=${wxSearchStr}&page_size=${pageSize}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            return response.json()
        }).then(dataObj => {
            console.log(dataObj);
            if (dataObj.data.datas.length == 0) {
                isArticleMore = false;
                return;
            }
            if (pageIndex == 0) {
                listAritcleObj = dataObj;
            } else {
                //扩展运算符（...），添加数组的元素,
                listAritcleObj.data.datas.push(...dataObj.data.datas);
            }
            if (dataObj.data.datas.length < pageSize) {
                isArticleMore = false;
            } else {
                isArticleMore = true;
                pageIndex++;
            }

            var htmlTem = template('article-list-template', listAritcleObj);
            $('#article-list').html(htmlTem);
        }).finally(() => {
            // 在这里放置任何你想在请求完成（不论成功或失败）后执行的操作
            // 例如：隐藏加载动画
            isArticleLoading = false;
            loadDialog.hideLoadingDialog();
            updateAritcleStateMsg(isArticleMore ? '点击加载更多' : '暂无更多数据');
        })
        .catch(error => {
            console.log(error);
        });
}
//收藏结果回调
function collectResultCallBack(itemIndex, isCollect, artId, originId) {
    if (listAritcleObj.data.datas.length>=itemIndex) {
        listAritcleObj.data.datas[itemIndex].collect=isCollect;
    }
}
function updateAritcleStateMsg(msg) {
    $('#article-load-more').text(msg);
}