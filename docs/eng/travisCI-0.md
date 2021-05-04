# Travis CI 简介及使用
Travis CI 提供的是持续集成服务（Continuous Integration）。绑定 Github 上的项目，自动抓取新的代码，执行测试，完成构建，部署到服务器。  
持续集成指的是只要有代码变更，就自动运行构建和测试，反馈运行结果。确保符合预期后，再将新代码“集成”到主干。

## Travis CI 的使用
Travis CI 只支持 github，所以需要在 github 上有项目，并且项目里包含构建或测试脚本，以及可运行的代码。  
准备步骤（傻瓜式教程）：
1. 在 github 上的用户设置（点击头像出现的 Settings），点击“Developer settings”，点击“Personal access tokens”；  
2. 点击“Generate new token”，在“Note”输入框中输入备注名，勾选“repo”，生成一个新的 token 并复制；  
3. 用该账号登录[官方网站](https://travis-ci.com/)；  
4. 进入用户设置（点击头像出现的 Settings），选择一个仓库并点击 Settings，找到“Environment Variables”下的输入框，输入复制的 token；  
5. 为选择的仓库添加 .travis.yml。（.travis.yml 是 Travis 的配置文件，代码仓库有新的 Commit 时，Travis 就会执行该文件里面的命令。）  

## Travis CI 生命周期/运行流程
[官方文档](https://docs.travis-ci.com/user/job-lifecycle/)。  
### 完整的工作流程
1. OPTIONAL Install ```apt addons```
2. OPTIONAL Install ```cache components```
3. ```before_install```
4. ```install```
5. ```before_script```
6. ```script```
7. OPTIONAL ```before_cache``` (for cleaning up cache)
8. ```after_success``` or ```after_failure```
9. OPTIONAL ```before_deploy```
10. OPTIONAL ```deploy```
11. OPTIONAL ```after_deploy```
12. ```after_script```


### 示例
```yaml
language: node_js
node_js:
  - v12.10.0
install:
  - yarn install
script:
  - yarn build
deploy: # 下面是 Travis CI 部署到 GitHub Pages 的配置 https://docs.travis-ci.com/user/deployment/pages/
  provider: pages
  skip_cleanup: true # 防止 Travis CI 重置工作目录
  local_dir: dist    # 当前目录的路径
  github_token: ${travis_token} # 在 GitHub 中生成，用于允许 Travis 向仓库推送代码
  repo: # 推送的目的仓库名
  target_branch: # 目标分支，默认 gh-pages
  keep_history: true # 保持 commit 记录
  fqdn: # 设置自定义域名，默认不支持
  project_name: # 默认 fqdn 的值或者 repo slug
  email: # 提交者的信息，默认 deploy@travis-ci.org
  name: # 提交者，默认 Deployment Bot
  committer_from_gh: # 用 token 所有者的信息提交，会覆盖 name 和 email 选项，默认 false
  allow_empty_commit: # 在 keep_history: true 时启用，默认 false
  github_url: 
  verbose: # 内部步骤的详细，默认 false
  deployment_file: # 启用创建依赖信息文件，默认 false
  on:
    branch: master
```

+ language：指定默认环境，[官方文档](https://docs.travis-ci.com/user/languages)  
+ install：必经阶段一，安装依赖阶段。
  ```yaml
  install: skip # 跳过安装脚本
  install: ./project-dependencies.sh # 项目的依赖脚本，需要加可操作权限
  install: # 多个步骤的脚本命令
    - step1
    - step2
  ``` 
+ script：必经阶段二，构建阶段。
  ```yaml
  script: true # 不执行任何脚本
  ``` 
+ deploy：可选阶段——部署。这个阶段，会使用持续部署提供商部署代码到不同平台。
