# Mac Usage
+ 查看端口 `lsof -i:$port` 或 `lsof -i tcp:$port`，执行上述命令之一后，显示格式如下：  
```sh
COMMAND PID  USER   FD   TYPE   DEVICE SIZE/OFF NODE NAME
```

+ 关闭端口 `kill -9 PID` （PID 为查询到的端口进程）