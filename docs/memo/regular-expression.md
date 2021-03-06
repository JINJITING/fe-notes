# 正则表达式  

## 语法  

| 字符 | 功能描述 |
| :-- | :-- |
|  ^  | 标记字符串开始位置 |
|  $  | 标记字符串结束位置 |
|  () | 标记子表达式的开始和结束位置 |
|  [] | 标记方括号表达式的开始和结束 |
|  {} | 标记限定符表达式的开始和结束 |
| {n} | n 非负整数，匹配前面子表达式 n 次 |
| {n,}| n 非负整数，匹配前面子表达式至少 n 次 |
|{m,n}| m、n 非负整数，m < n，匹配前面子表达式至少 m 次，至多 n 次 |
|  *  | 匹配前面子表达式 0 次或多次 |
|  +  | 匹配前面子表达式 1 次或多次 |
|  ?  | 匹配前面子表达式 0 次或 1 次，等价{0,1} |
|  .  | 匹配除换行符 \n 外的任何单字符 |
|  \  | 转义字符 |
| \|  | 表示或，指明两项之间的选择 |
| \b  | 匹配一个单词边界，即与空格的位置，不匹配任何字符 |
| \B  | 匹配非单词边界 |
| \d  | 匹配数字字符，等价[0-9] |
| \D  | 匹配非数字字符，等价[^0-9] |
| \f  | 匹配一个换页符 |
| \n  | 匹配一个换行符 |
| \r  | 匹配一个回车符 |
| \s  | 匹配任何空白符，包括空格、制表符等 |
| \S  | 匹配任何非空白字符 |
| \t  | 匹配一个制表符 |
| \v  | 匹配一个垂直制表符 |
| \w  | 匹配字母、数字、下划线 |
| \W  | 匹配非字母、数字、下划线 |
|  (pattern)  | 匹配 pattern 并获取匹配结果 |
| (?:pattern) | 匹配 pattern 但不获取匹配结果 |
| (?=pattern) | 正向肯定预查，在任何匹配 pattern 的字符串开始处匹配查找字符串 |
| (?!pattern) | 正向否定预查，在任何不匹配 pattern 的字符串开始处匹配查找字符串 |
| (?<=pattern)| 反向（look behind）肯定预查，同正向肯定预查方向相反 |
| (?<!pattern)| 反向否定预查，同正向否定预查方向相反 |