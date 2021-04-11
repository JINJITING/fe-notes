/**
 * 基本配置：https://vuepress.vuejs.org/zh/config/#基本配置
 * 主题配置：https://vuepress.vuejs.org/zh/theme/default-theme-config.html#首页
 */
const path = require('path');

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
      // { text: '浏览器', link: '/browser/' },
      { text: 'HTTP', link: '/np/http/' },
      { text: 'ES', link: '/es/' },
      { text: 'IDE', link: '/ide/0' },
      { text: '扩展', link: '/extension/ISO-8859-1' },
    ],
    sidebar: {
      '/browser/': [
        { title: '浏览器架构简介', path: '/browser/architecture.md' },
        { title: '浏览器工作流程', path: '/browser/browser-work-process.md' }
      ],
      '/np/': [
        { title: 'HTTP 协议格式', path: '/np/http/protocol-format.md' },
        { title: 'URI/URL/URN', path: '/np/uri-and-url.md' },
        { title: 'HTTP 状态码', path: '/np/http/status-code.md' },
        { title: 'HTTP 消息头', path: '/np/http/headers.md' }
      ],
      '/es/': [
        '',
        {
          title: '变量和作用域',
          children: [
            { title: '变量', path: '/es/1-variables' }
          ]
        },
        {
          title: '面向对象',
          children: [
            { title: '原型', path: '/es/2-prototypes' },
            { title: '创建对象', path: '/es/1-object-creation' },
            { title: '继承', path: '/es/1-inheritance' },
            { title: '类', path: '/es/1-classes' },
          ]
        },
        {
          title: '函数',
          children: [
            { title: '闭包', path: '/es/0-closures' },
          ]
        },
        { title: 'this 指向', path: '/es/this.md'},
        { title: '防抖与节流', path: '/es/debounce-and-throttle.md'},
        { title: 'JS 执行机制', path: '/es/JS执行机制.md'}
      ],
      '/ide/': [
        { title: 'Git 基础命令', path: '/ide/git/1.md' },
        { title: 'Git 命令（二）', path: '/ide/git/2.md' },
        { title: 'Shell', path: '/ide/shell-0.md' },
        { title: 'travisCI', path: '/ide/travisCI-0.md' },
      ]
    },
    lastUpdated: '最后更新',
  },

  markdown: {
    lineNumbers: true // boolean => 在每个代码块的左侧显示行号
  },
}
