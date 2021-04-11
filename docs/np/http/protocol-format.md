# HTTP（一）——协议格式

## HTTP 消息结构
### 客户端请求消息
```
GET / HTTP/1.1
Host:localhost
User-Agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36
Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
...
Connection: keep-alive

request data
```
请求消息由以下元素构成:
+ 请求方法
+ 要获取的资源路径:通常是没有 protocol、domain、port 的 URL
+ HTTP 协议版本号
+ 请求头部（headers）：以“key:value”格式表达
+ 请求数据
(请求头部和请求数据间有空行)

### 服务端响应消息
```
HTTP/1.1 200 OK
Date: xxxxx
Server: xxxx
...
Content-Type: text/html; charset=utf-8

<html>
<head>
<title>HTTP响应示例<title>
</head>
<body>
Hello HTTP!
</body>
</html>
```
响应消息由以下元素构成:
+ HTTP 协议版本号。
+ 状态码：告知对应请求执行成功或失败，以及失败的原因
+ 状态信息：即状态码表达的含义
+ 响应头部（headers）：和请求的头部类似
+ 响应数据
(响应头部和响应数据间有空行)

## HTTP 请求方法（request methods）
+ CONNECT：建立一个到由目标资源标识的服务器的通道。
+ DELETE：删除指定的资源。
+ GET：获取指定资源。应该只被用于获取数据。
+ HEAD：获取与 GET 请求相同的响应报头，没有响应体。
+ OPTIONS：请求目标资源的可用通信选项。
+ PATCH：对指定资源进行部分修改
+ POST：提交数据到指定资源。通常导致在服务器上的状态变化。
+ PUT：提交请求数据替换目标资源。
+ TRACE：沿着目标资源路径执行一个消息环回测试。

其中，GET、HEAD、PUT、DELETE、OPTIONS、TRACE 方法具有幂等性（无论请求次数，返回同样的结果），POST、CONNECT、PATCH 方法不具有幂等性。

（幂等性：对于同一操作发起的一次请求或者多次请求的结果是一致的，不会因为多次点击而产生了副作用。）

