## Commit message

### Commit message 格式
#### 1、Header
Header 包含 type、scope、subject。

**1）type** （必需）
+ feat：新功能（feature）
+ fix：修改 bug
+ docs：文档（documentation）
+ style：格式，不影响代码运行的改动
+ refactor：重构，不是 feat 和 fix 的代码变动
+ test：增加测试
+ chore：构建过程或辅助工具的变动

**2）scope** （可选）
用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

**3）subject** （必需）
commit 目的的简短描述，不超过50个字符。
+ 以动词开头，使用第一人称现在
+ 第一个字母小写
+ 结尾不加句号

#### 2、Body
Body 部分是对本次 commit 的详细描述，可以分成多行。有两个注意点：
1. 使用第一人称现在时
2. 应该说明代码变动的动机，以及与以前行为的对比

#### 3、Footer
只用于两种情况：
**1）不兼容变动e**：如果当前代码与上一个版本不兼容，则 Footer 部分以BREAKING CHANGE开头，后面是对变动的描述、以及变动理由和迁移方法。
**2）关闭 Issue**：如果当前 commit 针对某个issue，那么可以在 Footer 部分关闭这个 issue 。

#### 4、Revert
如果当前 commit 用于撤销以前的 commit，则必须以`revert:`开头，后面跟着被撤销 Commit 的 Header。  
Body部分的格式是固定的，必须写成`This reverts commit <hash>.`，其中的 hash 是被撤销 commit 的 SHA 标识符。  
如果当前 commit 与被撤销的 commit，在同一个发布（release）里面，那么它们都不会出现在 Change log 里面。如果两者在不同的发布，那么当前 commit，会出现在 Change log 的 Reverts 小标题下面。  