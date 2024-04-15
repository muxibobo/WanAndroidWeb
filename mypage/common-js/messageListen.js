// 监听信息
window.addEventListener('message', receiveMessage);
function receiveMessage(event) {
  if (event.origin !== 'http://aaa.com') return;
  if (event.data === 'Hello World') {
    event.source.postMessage('Hello', event.origin);//回复消息
    //监听登录信息，改变登录状态

    /// 父窗口打开一个子窗口
// var popup = window.open('http://bbb.com', 'title');
// // 父窗口向子窗口发消息
// popup.postMessage('Hello World!', 'http://bbb.com');

  } else {
    console.log(event.data);
  }
}

1. 监听信息

javascript
window.addEventListener('message', receiveMessage);
此行代码为当前窗口（即 window 对象）注册了一个事件监听器，用于监听 'message' 事件。当接收到其他窗口（如 iframe 或通过 window.open() 打开的子窗口）发送的消息时，会触发该事件。receiveMessage 函数被指定为事件处理器，负责处理接收到的消息。
2. 定义消息处理器函数 receiveMessage

javascript
function receiveMessage(event) {
  // ...
}
receiveMessage 函数接收一个参数 event，它是 message 事件触发时传递的事件对象，包含了关于接收到的消息及其来源的信息。
3. 检查消息来源并作出相应处理

javascript
if (event.origin !== 'http://aaa.com') return;
首先检查消息的来源（event.origin），如果其值不是 'http://aaa.com'，则直接返回，不再进行后续处理。这一步用于确保仅处理来自特定源（在此例中为 'http://aaa.com'）的消息，防止恶意或无关消息的干扰。
4. 处理特定消息

javascript
if (event.data === 'Hello World') {
  event.source.postMessage('Hello', event.origin); // 回复消息
  // ... （注释部分省略）
} else {
  console.log(event.data);
}
接下来判断接收到的消息内容（event.data）。若消息内容为字符串 'Hello World'，则执行以下操作：

回复消息：使用 event.source.postMessage() 方法向发送消息的窗口回送一条消息 'Hello'，同时指定消息发送的目标源（event.origin），确保消息能正确送达。

注释部分：这部分代码被注释掉了，原本的功能是：

打开子窗口：使用 window.open() 方法打开一个新窗口，指向 URL 'http://bbb.com'，并给新窗口指定标题 'title'。
向子窗口发送消息：使用 popup.postMessage() 向刚打开的子窗口发送消息 'Hello World!'，并指定目标源 'http://bbb.com'。