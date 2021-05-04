# RESTful 规范  
REST（Representational State Transfer），即表现层状态转移，RESTful 表示满足这些条件和原则的程序或应用。  
REST 设计一般符合以下条件：
+ 程序或应用的事物都应该被抽象为资源。 
+ 每个资源对应唯一的 URI。 
+ 使用统一的接口对资源进行操作。 
+ 对资源的各种操作不会改变资源标识。 
+ 所有操作都是无状态的。 

对于一般的增删改查操作，在非 RESTful 架构中，设计如下：
```
https://testapi.com/addUser    //POST 方法，请求发送新增用户信息
https://testapi.com/delUser    //POST 方法，请求发送用户的 ID
https://testapi.com/updateUser //POST 方法，请求发送用户 ID 和修改信息
https://testapi.com/getUser    //GET 方法，请求发送用户 ID
```
基于 RESTful 架构的设计，只提供唯一的 URI：https://testapi.com/user，设计如下：
```
https://testapi.com/user       //POST 方法，请求发送新增用户信息，增
https://testapi.com/user/:id   //DELETE 方法，用户 ID 是 URI 的一部分，删
https://testapi.com/user/:id   //PUT 方法，请求发送用户信息，用户 ID 是 URI 的一部分，改
https://testapi.com/user/:id   //GET 方法，用户 ID 是 URI 的一部分，查
```

<!-- 2019.08.22 创建 -->