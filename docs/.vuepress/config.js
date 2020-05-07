/**
 * 基本配置：https://vuepress.vuejs.org/zh/config/#基本配置
 * 主题配置：https://vuepress.vuejs.org/zh/theme/default-theme-config.html#首页
 */
const path = require('path');

module.exports = {
  base: '/front-end-road/',
  title: '前端之路',
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
    // nav: [
    //   { text: '浏览器', link: '/browser/' },
    //   { text: 'HTTP', link: '/http/' },
    //   { text: 'JS', link: '/js/' },
    // ],
    sidebar: {
      '/browser/': [
        { title: '浏览器架构简介', path: '/browser/architecture.md'},
        { title: '浏览器工作流程', path: '/browser/browser-work-process.md'}
      ],
      '/http/': [
        { title: 'URI/URL/URN', path: '/http/uri-and-url.md'},
        { title: 'HTTP 简介', path: '/http/http.md' },
        { title: 'HTTP 状态码', path: '/http/http-status-code.md' },
        { title: 'HTTP 消息头', path: '/http/http-headers.md' }
      ],
      '/js/': [
        { title: 'this 指向', path: '/js/this.md'},
        { title: '防抖与节流', path: '/js/debounce-and-throttle.md'},
        { title: 'JS 执行机制', path: '/js/JS执行机制.md'}
      ]
    },
    lastUpdated: '最后更新',
  },

  markdown: {
    lineNumbers: true // boolean => 在每个代码块的左侧显示行号
  },
}
