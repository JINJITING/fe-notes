# HTTP 状态码（Status Code）

## 消息 1xx 
+ **100 Continue** 
+ **101 Switching Protocols** 
+ **103 Early Hints** 

## 成功 2xx 
+ **200 OK** 
  - 请求成功。 
+ **201 Created** 
  - 已创建。 
+ **202 Accepted** 
  - 已接收。 
+ **203 Non-Authoritative Information** 
  - 非授权信息。 
+ **204 No Content** 
  - 无内容。 
+ **205 Reset Content** 
  - 重置内容。 
+ **206 Partial Content** 
  - 部分内容。 

## 重定向 3xx 
+ **300 Multiple Choices** 
  - 多种选择。 
+ **301 Moved Permanently** 
  - 永久移动。 
+ **302 Found** 
  - 临时移动。 
+ **303 See Other** 
  - 查看其它地址。 
+ **304 Not Modified** 
  - 未修改。 
+ **305 Use Proxy** 
  - 使用代理。 
+ **307 Temporary Redirect** 
  - 临时重定向。 
+ **308 Permanent Redirect** 
  - 永久重定向。 

## 请求错误 4xx  
+ **400 Bad Request** 
  - 客户端请求的语法错误，服务器无法理解。 
+ **401 Unauthorized** 
  - 未授权。请求要求用户的身份认证。 
+ **403 Forbidden** 
  - 禁止。服务器理解客户端的请求，但是拒绝执行此请求。 
+ **404 Not Found** 
  - 服务器无法根据客户端的请求找到资源。 
+ **405 Method Not Allowed** 
  - 客户端请求中的方法被禁止。 
+ **406 Not Acceptable** 
  - 服务器无法根据客户端请求的内容特性完成请求。 
+ **407 Proxy Authentication Required** 
  - 请求要求代理的身份认证，与401类似，但请求者应当使用代理进行授权。 
+ **408 Request Timeout** 
  - 请求超时。 
+ **409 Conflict** 
+ **410 Gone** 
+ **411 Length Required** 
+ **412 Precondition Failed** 
+ **413 Request Entity Too Large** 
+ **414 Request-URI Too Long** 
+ **415 Unsupported Media Type** 
+ **416 Requested Range Not Satisfiable** 
+ **417 Expectation Failed** 
+ **418 I'm a teapot** 
+ **422 Unprocessable Entity** 
+ **425 Too Early** 
+ **426 Upgrade Required** 
+ **428 Precondition Required** 
+ **429 Too Many Requests** 
+ **431 Request Header Fields Too Large** 
+ **451 Unavailable For Legal Reasons**   

## 服务器错误 5xx
+ **500 Internal Server Error** 
  - 服务器内部错误，无法完成请求。 
+ **501 Not Implemented** 
  - 服务器不支持请求的功能，无法完成请求。 
+ **502 Bad Gateway** 
  - 作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应。 
+ **503 Service Unavailable** 
  - 由于超载或系统维护，服务器暂时无法处理请求。 
+ **504 Gateway Timeout** 
  - 充当网关或者代理的服务器，未及时从远端服务器获取请求。 
+ **505 HTTP Version Not Supported** 
  - 服务器不支持请求的HTTP协议的版本。 
+ **511 Network Authentication Required** 

<!-- 2019.08.24 创建 -->
