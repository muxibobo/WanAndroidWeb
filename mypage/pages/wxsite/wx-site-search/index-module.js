//type="module"模块是沙箱化的，这种es6模块导入方式导入组件。如果不想写type="module"就必须
// 采用传统方式实现组件的函数，即在html中引入js文件。
// 如：<script src="../../../../mypage/utils/DataConst.js">

import { createLoadDialog } from "../../../../mypage/components/loading-dialog.js";
// 创建createDialog对象
 loadDialog = createLoadDialog();

//window.localStorage,window.sessionStorage保存web唯一userid
// const userid = window.localStorage.getItem('userid');

$(() => {
    //dom加载完成
});
