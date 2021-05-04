# Git 命令（二）

## 查看提交的作者
```
git log --pretty=format:"%[xx]" [commit-hash] 
# 通用格式，[xx] 为具体的变量，[commit-hash] 为具体的提交记录 hash 值
```
<!-- ## 重写历史 —— filter-branch -->

## 本地同步远程更改
```sh
git remote show origin   # 查看远程 origin 的信息
git remote prune origin  # 移除远程仓库不存在的分支
```

## 重置仓库历史记录
```sh
# 1. 切换到新到无记录分支
git checkout --orphan new_branch

# 2. commit 所有的修改（commit the changes）
git add .
git commit -m 'commit message'

# 3. 删除原分支（delete target branch）
git branch -D old_branch

# 4. 将新分支改名为旧分支（rename the current branch）
git branch -m old_branch

# 5. 提交到远程（force update repository）
git push -f origin old_branch
```

## 批量删除
```sh
# 批量删除分支
git branch -a | grep { variable } | xargs git branch -D # 命令
git branch -a | grep hotfix | xargs git branch -D # 示例
```