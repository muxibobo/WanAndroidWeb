//由于浏览器不直接支持ES6模块，除非你已经配置了相应的模块加
// 载器（如SystemJS或通过<script type="module">标签加载），否则不能直
// 接在HTML文件中的<script>标签内使用import语法。

//在JavaScript模块系统中，每个<script type="module">都是一个独立的模块作用域，这意味着在一个模块中定义的变量在其他模块作用域中不可见。

//eg:
//<script type="module">
// import { createLoadDialog } from "../common/loading-dialog.js";
// const myDialog = createLoadDialog();
// // 显示对话框
// myDialog.showLoadingDialog();
// // 隐藏对话框
// myDialog.hideLoadingDialog();
//</script>
export const createLoadDialog = (loadingInitMsg = '加载中...') => {
    let dialogEl = null;
    let dialogTips = null;
    let loadingMsg = '加载中...';
    // 创建对话框元素

    const createDialogContent0 = `
    <style type="text/css">
    @keyframes imgRotateAnimation {
        0% {transform: rotate(0deg);}
      100% {transform: rotate(360deg);}
    }
    .load-dialog-wrapper{color: #949494;font-size: 0.14rem; display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 9999; background-color: rgba(192, 192, 192, 0.3);}
    #load-dialog-content{display: flex; width: 100%; height: 100%; flex-direction: column; justify-content: center; align-items: center;}
    #load-dialog-icon{width: 0.5rem; height: 0.5rem; animation: imgRotateAnimation 1s linear infinite; opacity: 0.3;}
    #load-dialog-tips{margin-top: 0.05rem;font-size: 0.14rem;color: #666;}
    </style>
  <div id="load-dialog-content">
      <img src="../../../../img/black128/loading.png" id="load-dialog-icon" alt="">
      <p id="load-dialog-tips">${loadingInitMsg}</p>
  </div>
  `;

    const createDialogContent1 = `
    <style type="text/css">
    #loader-img {
        width: 50px;
        aspect-ratio: 1;
        display: grid;
        border-radius: 50%;
        background:
          linear-gradient(0deg, rgb(0 0 0/50%) 30%, #0000 0 70%, rgb(0 0 0/100%) 0) 50%/8% 100%,
          linear-gradient(90deg, rgb(0 0 0/25%) 30%, #0000 0 70%, rgb(0 0 0/75%) 0) 50%/100% 8%;
        background-repeat: no-repeat;
        animation: l23 1s infinite steps(12);
      }
  
      #loader-img::before,
      #loader-img::after {
        content: "";
        grid-area: 1/1;
        border-radius: 50%;
        background: inherit;
        opacity: 0.915;
        transform: rotate(30deg);
      }
  
      #loader-img::after {
        opacity: 0.83;
        transform: rotate(60deg);
      }
  
      @keyframes l23 {
        100% {
          transform: rotate(1turn)
        }
      }
    .load-dialog-wrapper{color: #949494;font-size: 0.14rem; display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 9999; background-color: rgba(192, 192, 192, 0.3);}
    #load-dialog-content{display: flex; width: 100%; height: 100%; flex-direction: column; justify-content: center; align-items: center;}
    #load-dialog-icon{width: 0.5rem; height: 0.5rem; animation: imgRotateAnimation 1s linear infinite; opacity: 0.3;}
    #load-dialog-tips{margin-top: 0.05rem;font-size: 0.14rem;color: #666;}
    </style>
  <div id="load-dialog-content">
      <div id="loader-parent"><div id="loader-img"></div></div>
      <p id="load-dialog-tips">${loadingInitMsg}</p>
  </div>
  `;

    const createDialogContent2 = `
  <style type="text/css">
  #loader-img {
    width: 50px;
    height: 50px;
    aspect-ratio: 1;
    display: grid;
    border: 4px solid #0000;
    border-radius: 50%;
    border-color: #ccc #0000;
    animation: l16 1s infinite linear;
  }

  #loader-img::before,
  #loader-img::after {
    content: "";
    grid-area: 1/1;
    margin: 2px;
    border: inherit;
    border-radius: 50%;
  }

  #loader-img::before {
    border-color: #f03355 #0000;
    animation: inherit;
    animation-duration: .5s;
    animation-direction: reverse;
  }

  #loader-img::after {
    margin: 8px;
  }

  @keyframes l16 {
    100% {
      transform: rotate(1turn)
    }
  }
  .load-dialog-wrapper{color: #949494;font-size: 0.14rem; display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 9999; background-color: rgba(192, 192, 192, 0.3);}
  #load-dialog-content{display: flex; width: 100%; height: 100%; flex-direction: column; justify-content: center; align-items: center;}
  #load-dialog-icon{width: 0.5rem; height: 0.5rem; animation: imgRotateAnimation 1s linear infinite; opacity: 0.3;}
  #load-dialog-tips{margin-top: 0.05rem;font-size: 0.14rem;color: #666;}
  </style>
<div id="load-dialog-content">
    <div id="loader-parent"><div id="loader-img"></div></div>
    <p id="load-dialog-tips">${loadingInitMsg}</p>
</div>
`;

    const createDialogContent3 = `
<style type="text/css">
#loader-img {
    --d: 22px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    color: #1A8CFE;
    box-shadow:
      calc(1*var(--d)) calc(0*var(--d)) 0 0,
      calc(0.707*var(--d)) calc(0.707*var(--d)) 0 1px,
      calc(0*var(--d)) calc(1*var(--d)) 0 2px,
      calc(-0.707*var(--d)) calc(0.707*var(--d)) 0 3px,
      calc(-1*var(--d)) calc(0*var(--d)) 0 4px,
      calc(-0.707*var(--d)) calc(-0.707*var(--d))0 5px,
      calc(0*var(--d)) calc(-1*var(--d)) 0 6px;
    animation: l27 1s infinite steps(8);
  }
  
  @keyframes l27 {
    100% {
      transform: rotate(1turn)
    }
  }
.load-dialog-wrapper{color: #949494;font-size: 0.14rem; display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 9999; background-color: rgba(192, 192, 192, 0.3);}
#load-dialog-content{display: flex; width: 100%; height: 100%; flex-direction: column; justify-content: center; align-items: center;}
#load-dialog-tips{margin-top: 0.3rem;font-size: 0.14rem;color: #666;}
</style>
<div id="load-dialog-content">
  <div id="loader-parent"><div id="loader-img"></div></div>
  <div id="load-dialog-tips">${loadingInitMsg}</div>
</div>
`;

    const createDialogContent4 = `
<style type="text/css">
#loader-img {
    width: 50px;
    height: 50px;
    aspect-ratio: 1;
    display: grid;
    -webkit-mask: conic-gradient(from 15deg, #0000, #000);
    animation: l426 1s infinite steps(12);
  }

  #loader-img,
  #loader-img:before,
  #loader-img:after {
    background:
      radial-gradient(closest-side at 50% 12.5%,
        #1A8CFE 96%, #0000) 50% 0/20% 80% repeat-y,
      radial-gradient(closest-side at 12.5% 50%,
        #1A8CFE 96%, #0000) 0 50%/80% 20% repeat-x;
  }

  #loader-img:before,
  #loader-img:after {
    content: "";
    grid-area: 1/1;
    transform: rotate(30deg);
  }

  #loader-img:after {
    transform: rotate(60deg);
  }

  @keyframes l426 {
    100% {
      transform: rotate(1turn)
    }
  }
.load-dialog-wrapper{color: #949494;font-size: 0.14rem; display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 9999; background-color: rgba(192, 192, 192, 0.3);}
#load-dialog-content{display: flex; width: 100%; height: 100%; flex-direction: column; justify-content: center; align-items: center;}
#load-dialog-tips{margin-top: 0.05rem;font-size: 0.14rem;color: #666;}
</style>
<div id="load-dialog-content">
  <div id="loader-parent"><div id="loader-img"></div></div>
  <div id="load-dialog-tips">${loadingInitMsg}</div>
</div>
`;
    // 初始化对话框
    const init = () => {
        if (!dialogEl || !document.body.contains(dialogEl)) {
            dialogEl = document.createElement('div');
            dialogEl.className = 'load-dialog-wrapper';
            dialogEl.innerHTML = createDialogContent0;
            document.body.appendChild(dialogEl);
            // 在appendChild后面这里获取元素
            dialogTips = document.getElementById('load-dialog-tips')[0];
        }
        console.log('初始化一个dialog');
    };

    // 显示对话框
    const showLoadingDialog = (msg) => {
        init();
        loadingMsg = msg ? msg : loadingMsg;
        if (dialogTips && msg) {
            dialogTips.textContent = loadingMsg;
        }
        if (dialogEl) {
            dialogEl.style.display = 'block';
        }
    };

    // 隐藏对话框
    const hideLoadingDialog = () => {
        if (dialogTips) {
            dialogTips.textContent = loadingInitMsg;
        }
        if (dialogEl) {
            dialogEl.style.display = 'none';
        }
    };

    // 返回公共接口
    return {
        showLoadingDialog,
        hideLoadingDialog
    };
};
