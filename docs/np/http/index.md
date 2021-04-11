# [HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP) 
HTTP（Hyper Text Transfer Protocol，超文本传输协议），是用传输超文本的应用层协议。遵循 C/S 模型，一种无状态的、应用层的、以请求/应答方式运行的协议。  

+ 协议：使用计算机能够理解的语言确立了一种计算机之间交流通信的规范，以及相关的各种控制和错误处理方式。
+ 传输：HTTP 协议是一个“双向协议”，数据传输过程中允许有“中间人”
+ 超文本：是文字、图片、音频和视频等的混合体，最关键的是含有“超链接”。
+ 无状态：(https://www.cnblogs.com/bellkosmos/p/5237146.html)当浏览器发送请求给服务器的时候，服务器响应，但是同一个浏览器再发送请求给服务器的时候，他会响应，但是他不知道你就是刚才那个浏览器，简单地说，就是服务器不会去记得你，所以是无状态。

## 基础知识
+ [HTTP 协议格式](./protocol-format.md)

## [HTTP2](https://http2.github.io/)
HTTP2 源自 SPDY2，与 SPDY2 不同的主要有：
1. HTTP2 支持明文 HTTP 传输，而 SPDY 强制使用 HTTPS
2. HTTP2 消息头的压缩算法采用 [HPACK](https://tools.ietf.org/html/rfc7541)，而 SPDY 使用 DELETE

### HTTP/2 与 HTTP/1.1 的差别
+ HTTP/2 是二进制协议，不再是文本协议；
+ 可发起多个请求，并行的请求能在同一个链接中处理，废弃了 HTTP/1.1 里的管道；
+ 压缩了 headers，使用专用算法压缩头部，减少数据传输量；
+ 允许服务器在客户端缓存中填充数据，通过一个叫服务器推送的机制来提前请求；
+ 增强了安全性，“事实上”要求加密通信。

## HTTPS
默认端口 443，
把 HTTP 下层的传输协议由 TCP/IP 换成了 SSL/TLS，由“HTTP over TCP/IP”变成了“HTTP over SSL/TLS”，让 HTTP 运行在了安全的 SSL/TLS 协议上。
收发报文不再使用 Socket API，而是调用专门的安全接口。

### SSL/TLS
TLS 由记录协议、握手协议、警告协议、变更密码规范协议、扩展协议等几个子协议组成，综合使用了对称加密、非对称加密、身份认证等许多密码学前沿技术。

#### 参考文档
+ [HTTP/1.1](https://tools.ietf.org/html/rfc2068)