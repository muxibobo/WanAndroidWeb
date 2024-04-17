**WanAndroidWeb是一个web版实现，移动端H5页面展示的项目。** 

该项目是我个人基于鸿洋大神的[玩android开放API](https://www.wanandroid.com/blog/show/2)开发的一款高颜值的web项目。这个项目拥有漂亮的界面和实用的功能，全项目使用基础的web端知识搭建
，项目实现了rem适配，可以任意调节窗口，页面内容节点控件自适应大小。只需下载好项目导入到Visual Studio Code运行即可观看真实效果。

该项目由“前端+后端”两部分代码组成。

**后端：** 内部维护开发了一个node.js写的后端代码，用于创建代理服务获取数据，并返回给客户端，完美实现跨域请求的需求。因为鸿洋大神的开放api收藏和登录等操作需要携带用户密码等cookie信息，
所以接口实现了'/api/routeApi'和'/api/proxyApi'两种方式。'/api/proxyApi'实现接口请求代理，'/api/routeApi'则可以携带cookie后转发二次请求。
+ 后端代码运行条件：  
1.[运行环境node.js安装](https://blog.csdn.net/m0_60416689/article/details/135349451?spm=1001.2014.3001.5506)    
2.cmd创建，初始化npm  
npm init --yes  
3.安装插件  
安装 express接口框架，终端命令：npm i express  
安装 http-proxy-middleware库，终端命令：npm i http-proxy-middleware  
安装 axios库，终端命令：npm install axios  
引入cors包，解决跨域，终端命令：npm install cors  
引入body-parser 中间件来解析数据，终端命令：npm install body-parser  
安装 mysql库，终端命令：npm install mysql  
4.创建接口  
5.点击ServiceProxyApi.js文件后右键“在集成终端中打开”，终端cmd中输入node ServiceProxyApi.js 启动服务  
你要做的是确保步骤1,2,3,5就行，当然你要写自己的新接口，可以自己找到ServiceProxyApi.js文件依葫芦画瓢添加。  

**前端：** 主要是原生写法。Html5+CSS3+JavaScript+jQuery的技术实现。使用了[模板引擎art-template.js](https://github.com/aui/art-template)实现数据和页面绑定显示，[Swiper轮播图组件库](https://www.swiper.com.cn/index.html)实现首页轮播图，在此非常感谢该这些开源库的作者。
项目内部注释较多，是自己学习和习惯也方便小伙伴的阅读。

如果你有一些更好的想法或建议，可以在GitHub里提交给我。  
项目是开源的，不收取任何费用，如果这个项目有帮到你，或者你觉得很赞，也很感谢能够得到你的赞赏与支持!  

<img src="https://github.com/muxibobo/WanAndroidWeb/assets/28428639/6c2bf83a-7635-4395-b6b9-cf0c07e6b7c5" width="250px">  
<img src="https://github.com/muxibobo/WanAndroidWeb/assets/28428639/d2c83b21-ff85-4b76-8951-bc9c4959774e" width="250px">  

**项目整体展示**

![1](https://github.com/muxibobo/WanAndroidWeb/assets/28428639/9e7f4c4c-8432-422f-8fe3-de4321c7be8d)
![2](https://github.com/muxibobo/WanAndroidWeb/assets/28428639/ec0845e9-ebde-4dab-8d1b-90a46a68aed8)
![3](https://github.com/muxibobo/WanAndroidWeb/assets/28428639/4b100faf-f7b4-48bd-924c-d31c17829f7b)
![4](https://github.com/muxibobo/WanAndroidWeb/assets/28428639/77e0f570-fb3a-4adf-9151-fa9bc0392cac)
![5](https://github.com/muxibobo/WanAndroidWeb/assets/28428639/0fa9dd44-ea4d-48d9-9ecb-f11a1cc54c73)
![6](https://github.com/muxibobo/WanAndroidWeb/assets/28428639/b14a330f-adeb-4e6b-b9b6-a2570df06945)

**gif动图演示**

![GIF 2024-4-16 9-55-40](https://github.com/muxibobo/WanAndroidWeb/assets/28428639/e1a5fa46-69e6-4bda-ae59-d1494945bca4)

**项目代码结构**

![11](https://github.com/muxibobo/WanAndroidWeb/assets/28428639/05c0fc43-69f5-4018-8d00-2a3efc4fb2f6)
