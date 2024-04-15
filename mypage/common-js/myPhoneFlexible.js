; (function (doc, win) {
    if (doc == null || !doc.addEventListener) {
        return;
    }
    // 适配rem的js代码函数，适用于移动web开发界面比例适配
    var supportsOrientationChange = "onorientationchange" in win ? "orientationchange" : "resize";
    var timeoutId;
    function setRem() {
        //----设计稿的宽度为375px，整个公式计算，只需要按不同设计稿修改这个值---
        const DESIGN_WIDTH = 375;

        //设备宽度限制常量，用于适配最大宽度
        const MAX_CLIENT_WIDTH = 750;

        //也可以乘以其他值如50，但是为了好计算，一般设置为10或100，这样，
        //我们只需要把设计稿宽度如 width=50px，除以10或100，改为5rem或0.5rem就好了。
        const UI_REM = 100;

        //获取并调整设备宽度
        var clWidth = doc.documentElement.clientWidth;
        ////1rem=fontSize
        //===方案A——更灵活
        if (clWidth > MAX_CLIENT_WIDTH) {
            doc.documentElement.style.fontSize = "100px";
        } else {
            clWidth = clWidth >= MAX_CLIENT_WIDTH ? MAX_CLIENT_WIDTH : clWidth;

            console.log("clientWidth=" + clWidth);

            //最后假设设备是375px，设计稿是375px，那么设置html的 font-size= 移动设备 / 设计稿宽度 * 100  = 100px，那么 1rem = 100px
            //一个按钮200px*200px,则为2rem*2rem，不同设备按rem比例自动缩放
            const fontPX = (clWidth / DESIGN_WIDTH) * UI_REM;
            doc.documentElement.style.fontSize = fontPX + "px";
        }
        //===方案B——vw适配，假如计算得1px=0.02vw=1rem,如果一个按钮200px,则为200*fontSize=200*0.02=4rem，不同设备按rem比例自动缩放
        // const fontPX = 100/DESIGN_WIDTH;
        // doc.documentElement.style.fontSize = fontPX + "vw";
    }
    console.log("初始化设置rem，" + supportsOrientationChange);
    setRem();//设置rem

    function setBodyFontSize() {
        //设置body的字体大小
        var dpr = win.devicePixelRatio || 1
        console.log('dpr=' + dpr)
        if (document.body) {
            document.body.style.fontSize = (12 * dpr) + 'px'
        }
        else {
            document.addEventListener('DOMContentLoaded', setBodyFontSize)
        }
    }
    setBodyFontSize();
    
    //supportsOrientationChange 变量用于判断浏览器是否支持 orientationchange 事件，如果支持，
    //则使用该事件进行窗口大小的监听，否则使用 resize 事件
    win.addEventListener(supportsOrientationChange, function () {
        try {
            console.log("监听到变化");
            // 防抖延迟时间，节流函数，防止页面频繁刷新
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setRem();
                setBodyFontSize();
            }, 300)
        } catch (error) {
            console.log("监听到变化，但出错了：" + error)
        }
    }, false)
}(document, window))