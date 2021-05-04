# CORS
跨源资源共享 (CORS) 是一种基于 HTTP 头的机制，该机制通过允许服务器标示除了它自己以外的其它origin（域，协议和端口），这样浏览器可以访问加载这些资源。

## 使用场景
协议[cross-origin sharing standard](https://fetch.spec.whatwg.org/)
+ 由 XMLHttpRequest 或 Fetch 发起的跨源 HTTP 请求。
+ Web 字体 (CSS 中通过 @font-face 使用跨源字体资源)，因此，网站就可以发布 TrueType 字体资源，并只允许已授权网站进行跨站调用。
+ WebGL 贴图
+ 使用 drawImage 将 Images/video 画面绘制到 canvas

### 简单请求和非简单请求
简单请求不会触发 CORS 预检请求，需要满足所有以下条件：
+ 使用方法为 GET｜HEAD｜POST 之一
+ 请求的头信息在以下集合中：
  - Accept
  - Accept-Language
  - Content-Language
  - Content-Type：只能是 text/plain｜multipart/form-data｜application/x-www-form-urlencoded 之一
  - DPR
  - Downlink
  - Save-Data
  - Viewport-Width
  - Width
+ 请求中的任意 XMLHttpRequestUpload 对象均没有注册任何事件监听器；XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问。
+ 请求中没有使用 ReadableStream 对象。

