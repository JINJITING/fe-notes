# [rollup](http://rollupjs.org/guide/en/)/[rollup 中文](https://www.rollupjs.com/)

## [配置文件](http://rollupjs.org/guide/en/#big-list-of-options)
```js
// rollup.config.js
export default {
  // 核心选项
  input,     // 必须
  external,
  plugins,

  // 额外选项
  onwarn,

  // danger zone
  acorn,
  context,
  moduleContext,
  legacy

  output: {  // 必须 (如果要输出多个，可以是一个数组)
    // 核心选项
    file,    // 必须
    format,  // 必须
    name,
    globals,

    // 额外选项
    paths,
    banner,
    footer,
    intro,
    outro,
    sourcemap,
    sourcemapFile,
    interop,

    // 高危选项
    exports,
    amd,
    indent
    strict
  },
};
```

## 插件/[rollup plugins](https://github.com/rollup/plugins)

## rollup 好处
+ Tree Shaking：自动移除未使用的代码, 输出更小的文件
+ Scope Hoisting: 所有模块构建在一个函数内, 执行效率更高
+ Config 文件支持通过 ESM 模块格式书写
+ 可以一次输出多种格式:IIFE, AMD, CJS, UMD, ESM
+ Development 与 production 版本：.js, .min.js
