//----数据和使用方法---模仿小程序导航栏--
{/* <script>
        const listView = document.querySelectorAll('#bottom-tabbar > div');
        const listPage = document.querySelectorAll('#all-page > div');
        const listTabBarData = {
            "color": "#000000",
            "selectedColor": "#1A8CFE",
            "listTabBar": [{
                "pagePath": "pages/home/home",
                "text": "首页",
                "iconPath": "../img/black128/zhuyexian.png",
                "selectedIconPath": "../img/blue128/zhuyexian.png"
            }, {
                "pagePath": "pages/home/home",
                "text": "体系",
                "iconPath": "../img/black128/faxianxian.png",
                "selectedIconPath": "../img/blue128/faxianxian.png"
            }, {
                "pagePath": "pages/home/home",
                "text": "我的",
                "iconPath": "../img/black128/wodexian.png",
                "selectedIconPath": "../img/blue128/wodexian.png"
            }]
        }

        function switchToPageData(position) {
            switchToPage(position, listTabBarData, listView, listPage);
        }
        switchToPageData(0); */}

//----CSS----- 
// #page-root {
//     height: 100%;
//     display: flex;
//     flex-direction: column;
//     justify-content: end;
//     align-content: center;
// }
// #all-page {
//     height: 100%;
// }    
// #bottom-tabbar {
//     height: 0.48rem;
//     border-top: 1px solid rgb(138, 136, 135);
//     display: flex;
//     flex-direction: row;
//     justify-content: space-around;
//     align-items: center;
//     background-color: white;
//     overflow: hidden;
// }
// #bottom-tabbar>div {
//     padding: 0;
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     font-size: 0.13rem;
// }
// #bottom-tabbar>div>img {
//     width: 0.28rem;
//     height: 0.28rem;
//     background: no-repeat center;
// }


//----html-----     
{/* <div id="page-root">
        <div id="all-page">
            <!-- 首页模块 -->
            <div id="home-page" class="visible">首页</div>
            <!-- 体系类型模块 -->
            <div id="typelist-page" class="hidden">体系</div>
            <!-- 我的页面 -->
            <div id="my-page" class="hidden">我的</div>
        </div>
        <div id="bottom-tabbar">
            <div id="home-page-bar" class="default-color" onclick="switchToPageData(0)">
                <img id="home-page-img" src="../img/blue128/zhuyexian.png" alt="首页" />
                <p>首页</p>
            </div>
            <div id="typelist-page-bar" class="default-color" onclick="switchToPageData(1)">
                <img id="typelist-page-img" src="../img/black128/faxianxian.png" alt="体系" />
                <p>体系</p>
            </div>
            <div id="my-page-bar" class="default-color" onclick="switchToPageData(2)">
                <img id="my-page-img" src="../img/black128/wodexian.png" alt="我的" />
                <p>我的</p>
            </div>
        </div> */}
function switchToPage(position, listTabBarData = null, listView = null, listPage = null) {
    console.log(position);
    // listView = listView ? listView : document.querySelectorAll('#bottom-tabbar > div');
    // listPage = listPage ? listPage : document.querySelectorAll('#all-page > div');
    // 验证输入是否有效，避免全局污染，使用默认值作为回退
    listView = listView || document.querySelectorAll('#bottom-tabbar > div');
    listPage = listPage || document.querySelectorAll('#all-page > div');

    listView.forEach((tabbar, index) => {
        const imgIcon = tabbar.querySelector('img');
        const textTitle = tabbar.querySelector('p');

        const page = listPage[index];
        if (index === position) {
            page.style.display = 'block';
            tabbar.style.color = listTabBarData.selectedColor;
            if (imgIcon) {
                imgIcon.src = listTabBarData.listTabBar[index].selectedIconPath;
            }

        } else {
            page.style.display = 'none';
            tabbar.style.color = listTabBarData.color;
            if (imgIcon) {
                imgIcon.src = listTabBarData.listTabBar[index].iconPath;
            }
        }
        if (textTitle) {
            // textTitle.style.color = listTabBarData.listTabBar[index].selectedColor;
            textTitle.style.textDecoration = 'none';
            textTitle.innerText = listTabBarData.listTabBar[index].text;
        }
    });
}