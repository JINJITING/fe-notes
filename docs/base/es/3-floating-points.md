# JS 中的浮点数

## 浮点数
> **浮点**（floating point，FP）是一种对于实数的近似值数值表现法，由一个有效数字（即尾数，mantissa）加上幂数来表示，通常是乘以某个基数的整数次指数得到。以这种表示法表示的数值，称为**浮点数**（floating-point number）。利用浮点进行运算，称为**浮点计算**，这种运算通常伴随着因为无法精确表示而进行的近似或舍入。
> 一个浮点数 a 由两个数 m 和 e 来表示：a = m × b<sup>e</sup>。在任意一个这样的系统中，我们选择一个基数b（记数系统的基）和精度p（即使用多少位来存储）。m（即尾数）是形如 ±d.ddd...ddd 的 p 位数（每一位是一个介于 0 到 b-1 之间的整数，包括 0 和 b-1）。如果 m 的第一位是非 0 整数，m 称作**正规化**的。有一些描述使用一个单独的符号位（s 代表 + 或者 -）来表示正负，这样 m 必须是正的。e 是指数。
> 浮点数表示法通常还包括一些特别的数值：+∞ 和 −∞（正负无穷大）以及 NaN（'Not a Number'）。 ... 其中，无穷大，可表示为 inf，在内存中的值是阶码为全 1，尾数全 0。而 NaN 在内存中的值则是阶码全 1，尾数不全 0。  

> 对于任意一个二进制数 N，可用 N=M×2^P 表示，其中 M 为尾数，P 为阶码，2 为阶码的底，M、P 都用二进制数表示，M 表示 N 的全部有效数字，P 指明小数点的位置。当阶码为固定值时，数的这种表示法称为定点表示，这样的数称为“定点数”；当阶码为可变时，数的这种表示法称为浮点表示，这样的数称为“浮点数”。  

π 的浮点数表示如下：3.14 x 10⁰（十进制），1.1001000 x 2¹，其中 1001000 是尾数，1 为 指数。  

## IEEE 754
ES 中所有数值都以 IEEE 754 64 位格式存储。如下：   
| S  | Exp | Fraction |
| 1  | 11  | 52       |

+ S，sign 为符号位，第 63 位，用来表示正负号。
+ Exp，exponent 为指数位，第 62 至 52 位，用来表示次方数。用偏正值形式表示，偏正值为实际的指数大小与一个固定值（64位的情况是 1023，二进制即 11 1111 1111）的和。双精度的指数部分是 −1022～+1023 加上 1023，指数值的大小从 1～2046（0（2 进位全为0）和2047（2 进位全为1）是特殊值）。浮点小数计算时，指数值减去偏正值将是实际的指数大小。  
+ Fraction 为有效数位，51 至 0 位（从右边开始为 0），用来表示精确度。  
```js
0  011 1111 1111  0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 // 1.0 
1  011 1111 1111  0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 // -1.0
0  111 1111 1111  0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 // +Infinity
1  111 1111 1111  0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 // -Infinity
```

所以 js 中的 `0.1 + 0.2`，
```js
0  011 1111 1011  1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1010 // 0.1
0  011 1111 1100  1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1010 // 0.2

0  011 1111 1100  0100 1100 1100 1100 1100 1100 1100 1100 1100 1100 1100 1100 1101 // 对阶
0  011 1111 1100  1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1010 
/*            */1 0110 0110 0110 0110 0110 0110 0110 0110 0110 0110 0110 0110 0111 // 尾数和，
/* 若浮点数的尾数形式为 00.0××…×× 或 11.1××…××，应利用向左规格化使其变为规格化浮点数，尾数每算术左移 1 位，阶码减 1，直到浮点数的尾数变成规格化形式。
 * 若浮点数的尾数形式为 01.××…×× 或 10.××…××，表示尾数求和的结果发生溢出，应利用向右规格化使其变为规格化浮点数，尾数算术右移 1 位，阶码加 1，此时浮点数的尾数就变成了规格化形式。
 */
0  011 1111 1101  0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0100 // 0.1 + 0.2 
``` 

