let tabObjData = {};
let listAritcleObj = {};
let mTabID, parentChapterId;
let mTitleName;
let pageIndex = 0;
let isArticleLoading = false;
let isArticleMore = true;
let loadDialog;

$(() => {
    //dom加载完成
    initTemplateFun();
    initData();
});
function initData() {
    try {
        pageIndex = 0;
        isArticleMore = true;
        onclickFun();
        initView();
        let tabbarObjStr = sessionStorage.getItem('Key-MyTabBarData');
        console.log(tabbarObjStr);
        var urlParams = new URLSearchParams(window.location.search);
        mTabID = urlParams.get('tabId');
        parentChapterId = urlParams.get('tabParentId');
        mTitleName = urlParams.get('titleBarName');
        $('#title-bar-name').text(mTitleName);
        console.log("mTabID:" + mTabID + "tabParentId:" + parentChapterId + "-mTitleName:" + mTitleName);
        if (tabbarObjStr) {
            tabObjData = JSON.parse(deleteSanitizeForJson(tabbarObjStr))
            var tabhtmlTem = template('tab-list-template', tabObjData);
            $('#tab-type-list').html(tabhtmlTem);
            $(".tab-type-item:eq(0)").addClass("item-color-activite");
            // selectTypeItem(tabObjData.children[0]);//不推荐
            mTabID = tabObjData.children[0].id;
            parentChapterId = tabObjData.id;
            requestAritcle();
        } else {
            requestTab();
        }
    } catch (error) {
        requestTab();
    }
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

function initView() {
    // 获取body元素的高度
    // const bodyHeight = document.body.clientHeight;
    // const pagecontentView = document.getElementById("page-content");
    // const titlebarHeight = document.getElementById("title-bar").clientHeight;
    // const typelistrHeight = document.getElementById("tab-type-list").clientHeight;
    // pagecontentView.style.height = bodyHeight - titlebarHeight-typelistrHeight;
}
function onclickFun() {
    $("#tab-type-list").on("click", ".tab-type-item", function (result) {
        console.log("===" + result.currentTarget.innerText);
        $(this).addClass("item-color-activite").siblings().removeClass("item-color-activite");
    })
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
        var typebarheight = $('#tab-type-list').height();//类型导航的高度
        var DoMHeight = $('#article-list').height();//文档的高度
        // console.log('--scrollHeight=' + scrollHeight + '--height=' + wdheight + '--DoMHeight=' + DoMHeight);
        if (scrollHeight + wdheight - titlebarheight - typebarheight + 20 >= DoMHeight) {
            if (isArticleLoading || !isArticleMore) {
                return;
            }
            requestAritcle();
        }
    });

    $('#title-bar-back').click(function () {
        //返回上一页
        window.history.back();
    });
}

function tabTypeItemClick(position, id) {
    mTabID = id;
    pageIndex = 0;
    isArticleMore = true;
    requestAritcle();
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
    // selectTypeItem(dataObj)
    mTabID = dataObj.id;
    pageIndex = 0;
    isArticleMore = true;
    requestAritcle();
}
/**
 * 废弃了
 * @param {当前点击对象数据} itemObj 
 * @returns 
 */

function selectTypeItem(itemObj) {
    // 给所有.random-color-link元素设置随机背景色
    if (!itemObj || itemObj == undefined) {
        return;
    }
    let chapterId = itemObj.id;
    $('.tab-type-item').each(function () {
        let itemCid = $(this).data('tabcid');
        if (Number.parseInt(itemCid) === chapterId) {
            $(this).css('color', 'var(--text-color-blue)');
            $(this).css('font-weight', 'bold');
        } else {
            $(this).css('color', 'black');
            $(this).css('font-weight', 'normal');
        }
    });
}

function requestTab() {
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
            dataObj.data.forEach(elementData => {
                if (elementData.id + "" === parentChapterId) {
                    tabObjData = elementData;
                }
            });
            if (tabObjData == null || tabObjData == undefined || tabObjData.length == 0) {
                tabObjData = dataObj.data[0];
            }
            var tabhtmlTem = template('tab-list-template', tabObjData);
            $('#tab-type-list').html(tabhtmlTem);
            let itemSelectObj;
            tabObjData.children.forEach(elementData => {
                if (elementData.id + "" === mTabID) {
                    itemSelectObj = elementData;
                }
            });
            return itemSelectObj;
        }).then(tabObjData => {
            $(".tab-type-item:eq(0)").addClass("item-color-activite");
            // $(".tab-type-item:first").addClass("item-color-activite");
            // $(".tab-type-item")[0].classList.add("item-color-activite");
            // selectTypeItem(tabObjData);//不推荐
            mTabID = tabObjData.id;
            requestAritcle();
        }).finally(() => {
            // 在这里放置任何你想在请求完成（不论成功或失败）后执行的操作
            //必须在banner渲染完毕后设置
            loadDialog.hideLoadingDialog();
        })
        .catch(error => {
            console.log(error);
        });
}
function requestAritcle() {
    if (isArticleLoading) {
        return;
    }
    isArticleLoading = true;
    updateAritcleStateMsg('正在加载中...');
    //https://www.wanandroid.com/article/list/0/json?cid=150
    loadDialog.showLoadingDialog();
    fetch(`${base_url}/proxyApi/article/list/${pageIndex}/json?cid=${mTabID}&page_size=${pageSize}`, {
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
            var tabhtmlTem = template('article-list-template', listAritcleObj);
            $('#article-list').html(tabhtmlTem);
            // selectTypeItem(dataObj.data[0]);//不推荐
        }).finally(() => {
            // 在这里放置任何你想在请求完成（不论成功或失败）后执行的操作
            //必须在banner渲染完毕后设置
            isArticleLoading = false;
            loadDialog.hideLoadingDialog();
            updateAritcleStateMsg(isArticleMore ? '点击加载更多' : '暂无更多数据');
        })
        .catch(error => {
            console.log(error);
        });
}
function updateAritcleStateMsg(msg) {
    $('#article-load-more').text(msg);
}
//收藏结果回调
function collectResultCallBack(itemIndex, isCollect, artId, originId) {
    if (listAritcleObj.data.datas.length >= itemIndex) {
        listAritcleObj.data.datas[itemIndex].collect = isCollect;
    }
}