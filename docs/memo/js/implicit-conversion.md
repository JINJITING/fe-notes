## JS 中的隐式转换
这里是 JS 隐式转换的习题，[原题](https://jsisweird.com/)

1. `true + false`
::: details 题解
Number(true) -> 1  
Number(false) -> 0  
1 + 0  -> 1 
:::

2. `[,,,].length`
::: details 题解
[,,,].length -> 3
:::

::: details 相关题目
[,] + [,] -> ""  
[] + [] === [,] + [,] -> true  
[,,,] + [,,,] -> ",,,,"  
([,,,] + [,,,]).length === [,,,,].length -> true  
:::

3. `[1, 2, 3] + [4, 5, 6]`
::: details 题解
[1, 2, 3,] + [4, 5, 6] -> "1,2,34,5,6"
:::

4. `0.2 + 0.1 === 0.3`
::: details 题解
0.2 + 0.1 -> 0.30000000000000004;
0.2 + 0.1 > 0.3 -> false
:::

::: details 相关题目
0.2 + 0.3 === 0.5 -> true
:::

5.  `10,2`
::: details 题解
10, 2 -> 2
1, 2, 3, 4 -> 4
42, "pineapple", true -> true
:::

6. `!!""`
::: details 题解
Boolean("") -> false
:::

7. `+!![]`
::: details 题解
Boolean([]) -> true
Number(true) -> 1
:::

8. `!!!true`
::: details 题解
!!!true -> false
:::

9. `true == "true"`
::: details 题解
Number(true) -> 1
Number("true") -> NaN
1 == NaN -> false
:::

10. `010 - 03`
::: details 题解
010 -> 8
03 -> 3
8 - 3 -> 5
:::

11. `"" - - ""`
::: details 题解
Number("") -> 0
0 - - 0 -> 0
:::

::: details 相关题目
- -"" -> 0
--"" -> SyntaxError
:::

12. `null + 0`
::: details 题解
Number(null) -> 0
0 + 0 -> 0
:::

13. `0/0`
::: details 题解
isNaN(0/0) -> true

:::

14. `1/0 > Math.pow(10, 1000)`
::: details 题解
1/0 -> Infinity
Math.pow(10, 1000) -> Infinity
Infinity > Infinity -> false
:::

15. `true++`
::: details 题解
1++ -> SyntaxError
"x"++ -> SyntaxError
undefined++ -> NaN
:::

16. `"" - 1`
::: details 题解
Number("") -> 0
0 - 1 -> -1;
:::

17. `(null - 0) + "0"`
::: details 题解
Number(null) - 0 -> 0
0 + "0" -> "00"
:::

18. `true + ("true" - 0)`
::: details 题解
Number("true") -> NaN
:::

19. `!5 + !5`
::: details 题解
Boolean(5) -> true
!true -> false
Number(false) -> 0
0 + 0 -> 0
:::

20. `[] + []`
::: details 题解
[].toString() -> ""
"" + "" -> ""
:::

::: details 相关题目
[] + [] === [,] + [,] -> true
[].length -> 0
[,].length -> 1
[].toString() === [,].toString() -> true
Number([]) === Number([,]) -> true
:::

21. `NaN === NaN`
::: details 题解
NaN === NaN -> false
:::

22. `NaN++`
::: details 题解
Object.is(NaN, NaN++) -> true
:::

23. `undefined + false`
::: details 题解
Number(false) -> 0
Number(undefined) -> NaN
NaN + 0 -> NaN
:::

24. `+0 === -0`
::: details 题解

:::

25. `- "" + + "1" * null - [,]`
::: details 题解
-"" -> -0
+"1" -> 1
Number(null) -> 0
Number([,]) -> 0
:::