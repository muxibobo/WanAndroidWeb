const createrListHtmlStyle = `<div id="article-list">
<script id="article-list-template" type="text/html">
{{each data.datas itemData index}} 
 <div class="article-item" data-link="{{itemData.link}}"">
    <div class="article-item-title">
        <span class="article-item-person">
            <img src="../../../../img/icon_user_boy.png" alt="">
            <span>{{itemData.author ?itemData.author:itemData.shareUser}}</span>
        </span>
        <span class="article-item-source">{{itemData.superChapterName ?itemData.superChapterName+'/'+itemData.chapterName:itemData.chapterName}}</span>
    </div>
    <div class="article-item-content">{{itemData.title}} </div>
    <div class="article-item-date">
        <span>{{itemData.niceDate,itemData.publishTime | $dateFormatFun}}</span>
        {{if itemData.collect}}
          <span class="article-collect collect-active" data-itemIndex="{{index}}" data-artid="{{itemData.id}}" data-originId="{{itemData.originId}}" alt="">
        {{else}}
          <span class="article-collect collect-default" data-itemIndex="{{index}}" data-artid="{{itemData.id}}" data-originId="{{itemData.originId}}" alt="">
        {{/if}}
    </div>
 </div>
{{/each}} 
</script>
</div>
<p id="article-load-more" class="">点击加载更多</p><div class="my-alert-dialog-root"></div>`
function addArticleListHtml() {
  console.log("addArticleListHtml--创建---");
  let rootElemContent = document.getElementById("article-list-content");
  rootElemContent.innerHTML = createrListHtmlStyle;
  // $('#article-list-content').append(createrListHtmlStyle);
  console.log("addArticleListHtml--创建结束");


  $("body").on("click", ".article-collect", function (event) {
    event.stopPropagation();
    let isLogin = false;
    if (sessionStorage.getItem(KeyUid) == null || sessionStorage.getItem(KeyUid) == undefined) {
      isLogin = false;
    } else {
      isLogin = true;
    }
    if (!isLogin) {
      showAlertDialog('未登录，请先登录', 'go-login-dialog');
    } else {
      collect($(this));//收藏操作
    }
  });

  $("body").on("click", ".article-item", function () {
    let pagelink = $(this).attr("data-link");
    window.open(pagelink, '_blank');//新标签页面窗口打开
  });
}

function sureAlertDialogCallback(dialogId) {
  if (dialogId == 'go-login-dialog' || dialogId == 'login-out-dialog') {
    sessionStorage.clear();
    document.cookie = '';
    window.location.href = `../../my/login/index.html?titleBarName=登录&IsLoginKey=${false}`;//当前页面重定向打开
  }
}