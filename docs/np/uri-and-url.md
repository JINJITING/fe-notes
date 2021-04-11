# URI、URL、URN  
+ URI：Uniform Resource Identifier，统一资源标识符。   
+ URL：Uniform Resource Locator，统一资源定位符。     
+ URN：Uniform Resource Name，统一资源名称。   
URL 和 URN 都是 URI 的子集。  
以身份证举例：家庭住址即 URL，身份证号码即 URN。  

## URL
URL 不仅标识了 Web 资源，还指定了操作或者获取方式，同时指出了主要访问机制和网络位置。  
例如：一般的网址等。    

### URL组成 
```JavaScript
// scheme:[//[user[:password]@]host[:port]][/path][?query][#fragment]
```
+ scheme：使用的协议，如 FTP、HTTP 
+ user[:password]：表示访问资源的用户名和密码，常见于 FTP 协议中 
+ host：主机，如 IP 地址或域名 
+ port：端口号，如 HTTP 默认为80端口 
+ path：访问资源的路径 
+ query：请求数据，以“?”开头
+ fragment：定位锚点，以“#”开头，可用于快速定位网页对应的段落 

## URN 
URN特定命名空间的名字标识资源。使用 URN 可以在不知道其网络位置及访问方式的情况下讨论资源。  
例如：ISBN

### URN组成
```JavaScript
// scheme:path
/** e.g.  
 * urn:issn<XSLT>:1535-3613</nowiki>
 * scheme==urn
 * path==issn<XSLT>:1535-3613</nowiki>
 */
```
+ scheme：采用的协议为 urn
+ path：路径 