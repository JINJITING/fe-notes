# Shell
Shell 是 C 语言编写的程序，一般说的 shell 指的是 shell script 脚本。

## Shell 环境
环境要求：文本编辑器、脚本解释器。  
Linux 的常见 Shell：
+ Bourne Shell（/usr/bin/sh 或 /bin/sh）
+ Bourne Again Shell（/bin/bash），大多数 Linux 系统默认，
+ C Shell（/usr/bin/csh）
+ K Shell（/usr/bin/ksh）
+ Shell for Root（/sbin/sh）
```sh
#!/bin/bash
```
\#! 是约定标记，告诉系统执行脚本的解释器（使用哪种 Shell）。一般并不区分 Bourne Shell 和 Bourne Again Shell，#!/bin/sh 同样也可以改为 #!/bin/bash。
### Shell 执行
1. 作为可执行程序。打开相应的执行目录，使用相对路径执行脚本 shell.sh
```sh
chmod +x ./shell.sh # 添加脚本的执行权限
./shell.sh          # 执行脚本
```
2. 直接运行解释器
```
/bin/sh shell.sh
```

## Shell 变量
变量名和等号之间不能有空格；Shell 变量命名规则：
+ 命名只能使用英文字母、数字和下划线
+ 首个字符不能以数字开头，中间不能有空格，可以使用下划线（_）
+ 不能使用标点符号
+ 不能使用bash里的关键字（可用help命令查看保留关键字）
```sh
variable1=alpha
variable2=beta
echo variable1
echo ${variable1}   # 使用变量
readonly variable1  # readonly 只读变量，只读变量的值不能被改变
unset variable2     # unset 可以删除变量，变量被删除后不能使用，不能删除只读变量，
```
**变量类型**：
+ 1）局部变量：在脚本或命令中定义，仅在当前shell实例中有效。
+ 2）环境变量。
+ 3）shell 变量：由shell程序设置的特殊变量，可以是局部变量，也可以是环境变量。

## Shell 传递参数
脚本内获取参数的格式为：$n，n为数字，$1代表第一个参数，$0为执行的文件名。
```sh
$ ./test.sh this is test  # 命令行
echo $0;  # ./test.sh
echo $1;  # 第一个参数 => this
echo $#;  # 传递到脚本的参数个数 => 3
echo $*;  # 以字符串显示所有参数 => this is test
echo $$;  # 脚本运行的当前进程 ID 号 => 10596
echo $!;  # 后台运行的最后一个进程的ID号 => 
echo $@;  # 以字符串显示所有参数 => this is test
echo $-;  # 显示Shell使用的当前选项，与set命令功能相同 => hB
echo $?;  # 显示最后命令的退出状态（0表示没有错误，其他值表示有错误） => 0 
:<<EOF 
$* 与 $@ 的区别：
1）引用所有的参数转成字符串
2）引用多个参数时，如：a、b、c =>
  $* 等价于 "a b c"（1个参数）；
  $@ 等价于 "a" "b" "c"（3个参数）
EOF  # :EOF~EOF 是多行注释
```
## Shell 字符串
+ 单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的。
单引号字串中不能出现单独的单引号（使用转义符也不行），可成对出现，作为字符串拼接使用。
+ 双引号里可以有变量，可以出现转义字符。
+ 获取字符串长度
+ 截取字符串
```sh
variable1='string'
variable2='$variable1'
variable3='string1'$variable2'string2' # 拼接字符串
variable4="$variable1"
string="alpha"
echo $variable3    # string1$variable1string2
echo ${variable4} 
echo ${#string}    # 获取字符串长度 => 5
echo ${string:1:3} # 截取字符串 lph
```
## Shell 数组
+ 用括号表示数组，元素用空格分开。
```sh
array=(A B C);
echo ${array[0]}  # A
echo ${array[*]}  # 获取所有的元素 => A B C
echo ${array[@]}  # 获取所有的元素 => A B C 
echo ${#array[*]} # 获取数组长度 => 3
echo ${#array[@]} # 获取数组长度 => 3
```
## Shell 运算符
原生 bash 不支持简单的运算，要借助 expr 表达式计算工具。
```sh
val=`expr 2 + 2`  # 注意！使用反引号，表达式和运算符间要有空格
echo ${val}       # 4
```
### 运算符表格
| 运算符 | 说明 | 运算符 | 说明    |
|:-----:|-----|:-----:|--------|
|   +   | 加  |   !   | 非      |
|   -   | 减  |  -o   | 或      |
|   *   | 乘  |  -a   | 且      |
|   /   | 除  |  &&   | 且      |
|   %   | 取余 | \|\| | 或      |
|   =   | 赋值 |  $   | 字符串不为空返回 true |
|   ==  | 相等 |
|   !=  | 不等 |

## Shell test 命令
|  参数  | 说明 |
|:-----:|------|
|   -eq   | 相等 |
|   -ne   | 不等 |
|   -gt   | 大于 |
|   -lt   | 小于 |
|   -ge   | 大于等于 |
|   -le   | 小于等于 |
| -n str  | 检测字符串长度不为0返回 true |
| -z str  | 检测字符串长度为0返回 true |
| -b file | 文件是块设备文件返回 true |
| -c file | 文件是字符设备文件返回 true |
| -d file | 文件是目录返回 true |
| -f file | 文件是普通文件返回 true |
| -g file | 文件设置了 SGID 位返回 true |
| -k file | 文件设置了粘着位返回 true |
| -p file | 文件是有名管道返回 true |
| -u file | 文件设置了 SUID 位返回 true |
| -r file | 文件可读返回 true |
| -w file | 文件可写返回 true |
| -x file | 文件可执行返回 true |
| -s file | 文件大小大于0 返回 true |
| -e file | 文件、目录存在返回 true |
```sh
if test -e ./zero
then echo '存在'
else echo '不存在'
fi
```
## Shell 语句
sh 的流程控制不能为空。循环语句可以用 break 跳出全部循环，continue 跳出当前循环。
### if 语句
```sh
if condition1
then 
echo "condition1"
elif condition2
then
echo "condition2"
else echo "else"
```
### for 语句
语法1：for var in item0 item1 ... itemN
```sh
array=(1 2 3 o p); # 语法2
for((i=0;i<5;i++));
do
echo ${array[i]}
done
```
### while、until 语句
```sh
while condition1
do
  command1
done
until condition1
do
  command2
done
```
### case 语句
取值后面必须为单词in，每一模式必须以右括号结束。取值可以为变量或常数。匹配发现取值符合某一模式后，其间所有命令开始执行直至“;;”。
取值将检测匹配的每一个模式。一旦模式匹配，则执行完匹配模式相应命令后不再继续其他模式。
如果无一匹配模式，使用星号 * 捕获该值，再执行后面的命令。
```sh
case value in
case1)
  command1
  ...
  commandN
  ;;
case2)
  command2
  ...
  commandN2
  ;;
*)
  echo "default"
  ;;
esac
```
## Shell 函数
+ 可以带function fun() 定义，也可以直接 fun() 定义,不带任何参数。
+ 参数返回，可以显式加 return 返回；如果不加，将以最后一条命令运行结果，作为返回值。return后跟数值
+ 执行函数要在声明函数之后。
## Shell 引用文件
引用的文件不需要加权限。
```sh
. filename      # 方式1：“.”和文件名中间有空格
source filename # 方式2
```