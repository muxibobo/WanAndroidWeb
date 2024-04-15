let listAritcleObj = {};
let isArticleLoading = false;
let isArticleMore = true;
let pageIndex = 0;
let loadDialog;
$(() => {
    //dom加载完成
    initData();
    onclickFun();
});
function initData() {
    pageIndex = 0;
    isArticleMore = true;
    initTemplateFun();
    requestBanner();
    requestAritcle();
}
function onclickFun() {
    $('#article-load-more').click(function () {
        if (isArticleLoading || !isArticleMore) {
            return;
        }
        requestAritcle();
    });
    // setTimeout(() => {
    //原生方法，等待页面渲染和数据绑定后执行，获取到点击的item
    //     var listItem = document.getElementsByClassName("article-item");
    //     console.log('点击=33==dom加载完成cc：'+listItem.length);
    //     for (var i = 0; i < listItem.length; i++) {
    //         listItem[i].addEventListener('click', function () {
    //             console.log("aaaa");
    //             var items = this.dataset.itemobjdata;
    //             console.log('点击=40==：' + items);
    //             console.log('点击=4==：' + typeof items);
    //             var itemObj = JSON.parse(items);
    //             console.log('ItemObjData--this:' + itemObj);
    //             console.log('ItemObjData---jq:' + listItem[i].data('itemobjdata'));
    //         });
    //     }
    // }, 3000)


    $('#page-content').scroll(function () {
        // console.log('--scrollHeight=');
        var scrollHeight = $('#page-content').scrollTop();//滚动的高度
        var wdheight = $(window).height();//窗口的高度
        var DoMHeight = $('#article-list').height();//文档的高度
        // console.log('--scrollHeight=' + scrollHeight + '--height=' + wdheight + '--DoMHeight=' + DoMHeight);
        if (scrollHeight + wdheight + 20 >= DoMHeight) {
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
//---首页banner---
function requestBanner() {
    // 首页bannerhttps://www.wanandroid.com/banner/json
    fetch(`${base_url}/proxyApi/banner/json`, {
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
            var htmlTem = template('banner-list-template', dataObj);
            $('.banner-list-swiper').html(htmlTem);
        }).finally(() => {
            // 在这里放置任何你想在请求完成（不论成功或失败）后执行的操作
            //必须在banner渲染完毕后设置
            var bannerSwiper = new Swiper(".myBannerSwiper", {
                pagination: {
                    //小圆点分页器
                    el: ".swiper-pagination",
                    dynamicBullets: true,
                },
                // initialSlide: 0,//初始化显示的索引
                loop: true,
                // autoplay: true,//可选选项，自动滑动
                speed: 300,
                autoplay: {
                    delay: 1000,//单独停留时间
                }
                // rewind: false,//设置为true启用“倒带”模式。
            });
        })
        .catch(error => {
            console.log(error);
        });
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
    //无登录，无cookie状态可以使用proxyApi
    // fetch(`${base_url}/proxyApi/article/list/${pageIndex}/json?page_size=${pageSize}`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // })
    //     .then(response => {
    //         return response.json()
    //     }).then(dataObj => {
    //         console.log(dataObj);
    //         if (dataObj.data.datas.length == 0) {
    //             isArticleMore = false;
    //             return;
    //         }
    //         isArticleMore = true;
    //         if (pageIndex == 0) {
    //             listAritcleObj = dataObj;
    //         } else {
    //             //扩展运算符（...），添加数组的元素,
    //             listAritcleObj.data.datas.push(...dataObj.data.datas);
    //         }
    //         pageIndex++;
    //         var htmlTem = template('article-list-template', listAritcleObj);
    //         $('#article-list').html(htmlTem);
    //         updateAritcleStateMsg(isArticleMore ? '点击加载更多' : '暂无更多数据');
    //     }).finally(() => {
    //         // 在这里放置任何你想在请求完成（不论成功或失败）后执行的操作
    //         // 例如：隐藏加载动画
    //         isArticleLoading = false;
    //         loadDialog.hideLoadingDialog();
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });

    const routeParamsVal = {
        apiRequestType: 'get',
        apiRouteUrl: `https://www.wanandroid.com/article/list/${pageIndex}/json?page_size=${pageSize}`,
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
// banner列表点击-废弃
function bannerItemClick(e, linkStr) {
    window.open(linkStr, '_blank');//新标签页面窗口打开
}
// 文章列表点击-废弃
function articleItemClick0(e, itemDataStr) {
    //注意要小写key, console.log('ItemObjData:'+$('.article-item').data('itemobjdata'));
    //document.getElementById('.article-item').dataset.itemobjdata;
    let safeObjStr = deleteSanitizeForJson(itemDataStr); // 替换换行符为空字符串
    // console.log(safeObjStr)
    let dataObj;
    try {
        dataObj = JSON.parse(safeObjStr);
    } catch (error) {
        console.error("Cannot parse data-objData as JSON:", error);
    }
    // window.location.href = dataObj.link;//当前页面重定向打开
    window.open(dataObj.link, '_blank');//新标签页面窗口打开
}
// 文章列表点击-废弃
function articleItemClick(e, pagelink) {
    window.open(pagelink, '_blank');//新标签页面窗口打开
}