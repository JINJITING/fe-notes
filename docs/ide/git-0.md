# Git 命令 —— 基础

## 1.配置 
```
git config --global user.name '[username]'       # 配置全局用户名
git config --global user.email '[email address]' # 配置全局邮箱
# 不使用 --global，配置当前仓库
``` 

## 2.创建仓库
``` 
git init <directory>    # 初始化仓库（本地创建）
git clone [repository] <directory> # 克隆仓库（远程克隆）
```

## 3.分支操作
```
git branch               # 列出本地分支
git branch -r            # 列出远程分支
git branch -a            # 列出所有分支
git branch -m [branch]   # 修改当前分支名
git branch [branch]      # 在当前分支基础上创建新分支，依然留着当前分支
git checkout -b [branch] # 在当前分支基础上创建新分支，并切换到新分支
git checkout [branch]    # 切换到指定分支
git branch --set-upstream [branch] [remote-branch] # 将指定分支关联到远程分支
git merge [branch]       # 合并指定分支到当前分支 
git branch -d [branch]   # 删除指定本地分支
git push -d origin [branch]    # 删除指定远程分支
git branch -dr [remote/branch] # 删除指定远程分支
```

## 4.同步远程仓库（代码拉取、推送） 
```
git remote -v            # 查看所有远程仓库
git remote show [remote] # 查看某个远程仓库
git remote add [remote] [url] # 添加远程仓库
git remote rm [remote]   # 删除某个远程仓库
git remote rename [old] [new] # 重命名某个远程仓库
git fetch <remote>       # 拉取远程仓库的修改
git pull <remote> <branch> # 拉取远程仓库的修改，并与本地分支合并，即 pull 等于 fetch+merge 
git push <remote> <branch> # 推送指定分支到远程仓库
```

## 5.提交修改文件
```
# git add 将 workspace 工作区中的修改提交到 Stage 暂存区
git add .               # 提交所有文件
git add [file1] [file2] # 提交指定文件
git add [dir]           # 提交指定目录
git commit -m [message] # 提交暂存区到本地仓库
git commit --amend -m [message] # 修改上一次的提交，如果代码变化则替换上一次的提交
```

## 6.查看信息
```
git status             # 显示变更文件的状态
git log                # 显示当前分支的提交历史
git log --stat         # 显示提交历史以及每次变更的文件
git log -S [keyword]   # 根据关键词搜索历史
git log -p [file]      # 显示指定文件的每一次 diff
git show               # 显示最新一次提交的具体修改
git diff               # 显示暂存区与工作区的差异
```

## 7.撤销操作
```
git reset --hard [commit] # 重置当前分支的 HEAD 为指定 commit，同时重置暂存区和工作区
git reset --keep [commit] # 重置当前分支的 HEAD 为指定 commit，但保持暂存区和工作区
git revert [commit]       # 新建一个 commit 来撤销指定 commit
```

## 8.标签
```
git tag              # 列出所有本地标签
git tag [tag]        # 基于最新提交创建标签
git tag -d [tag]     # 删除标签
```