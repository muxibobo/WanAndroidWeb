const createrTitleBarHtmlStyle = `<div id="title-bar-back">
<img src="../../../../img/tag64/gray/arrow-left.png" alt="返回" />
</div>
<span id="title-bar-name">
登录
</span>`
function addTitleBarHtml() {
    console.log("addTitleBarHtml--创建---");
    let rootElemContent = document.getElementById("title-bar");
    rootElemContent.innerHTML = createrTitleBarHtmlStyle;
    // $('#article-list-content').append(createrTitleBarHtmlStyle);
    console.log("addTitleBarHtml--创建结束");
    let backElem = document.getElementById("title-bar-back");
    backElem.onclick = function () {
        console.log("返回上一页");
        window.history.back();
    }
    // $('#title-bar-back').click(function () {
    //     //返回上一页
    //     window.history.back();
    // });
}
function setTitle(name) {
    let titleElem = document.getElementById("title-bar-name");
    titleElem.textContent = name;
}