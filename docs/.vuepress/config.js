/**
 * 基本配置：https://vuepress.vuejs.org/zh/config/#基本配置
 * 主题配置：https://vuepress.vuejs.org/zh/theme/default-theme-config.html#首页
 */
const path = require('path')

module.exports = {
  base: '/fe-notes/',
  title: '前端笔记',
  description: 'JINJITING 的前端学习笔记。',
  // head: ['link', { rel: 'icon', href: '/logo.png' }],
  host: '0.0.0.0',
  port: 8686,
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, './assets')
      }
    }
  },
  dest: 'dist',
  themeConfig: {
    nav: [
      // { text: '浏览器', link: '/base/browser/' },
      { text: 'HTTP', link: '/base/np/http/' },
      { text: 'ES', link: '/base/es/' },
      { text: '工程化', link: '/eng/' },
      { text: '备忘录', link: '/memo/' },
    ],
    sidebar: {
      '/base/browser/': [
        { title: '浏览器架构简介', path: '/base/browser/architecture.md' },
        { title: '浏览器工作流程', path: '/base/browser/browser-work-process.md' }
      ],
      '/base/np/': [
        { title: '协议格式', path: '/base/np/http/protocol-format.md' },
        { title: 'URI/URL/URN', path: '/base/np/uri-and-url.md' },
        { title: '状态码', path: '/base/np/http/status-code.md' },
        { title: '消息头', path: '/base/np/http/headers.md' }
      ],
      '/base/es/': [
        '',
        {
          title: '变量和作用域',
          children: [
            { title: '变量', path: '/base/es/1-variables' }
          ]
        },
        {
          title: '面向对象',
          children: [
            { title: '原型', path: '/base/es/2-prototypes' },
            { title: '创建对象', path: '/base/es/1-object-creation' },
            { title: '继承', path: '/base/es/1-inheritance' },
            { title: '类', path: '/base/es/1-classes' },
          ]
        },
        {
          title: '函数',
          children: [
            { title: '闭包', path: '/base/es/0-closures' },
          ]
        },
      ],
      '/eng/': [
        { title: 'Git 基础命令', path: '/eng/git/1.md' },
        { title: 'Git 命令（二）', path: '/eng/git/2.md' },
        { title: 'travisCI', path: '/eng/travisCI-0.md' },
      ],
      '/memo/': [
        { title: 'JS 中的隐式转换', path: '/memo/js/implicit-conversion.md' },
        { title: '常用 Unicode 字符集', path: '/memo/common-unicode.md' },
        { title: '正则表达式', path: '/memo/regular-expression.md' },
      ]
    },
    lastUpdated: '最后更新',
  },
  markdown: {
    lineNumbers: true // boolean => 在每个代码块的左侧显示行号
  },
}
