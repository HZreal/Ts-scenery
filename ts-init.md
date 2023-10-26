# Typescript 项目初始化

1. 创建空 nodejs 项目

   ```
   # 进入某个空文件夹（项目根目录）
   npm init -y
   
   # 安装某个版本的 typescript
   npm install -d typescript (也可以安装到全局)
   npm install -d ts-node (非必需，也可以安装到全局)
   ```

2. 初始化 ts 

   ```
   # 生成 tsconfig.json 配置文件
   tsc --init
   
   # 可手动创建
   
   # 详细配置见：https://aka.ms/tsconfig
   ```

3. 初始化 git

   ```
   git init
   ```

   新建 .gitignore 并添加如下内容：

   ```
   # compiled output
   /dist
   /node_modules
   
   # Logs
   logs
   *.log
   npm-debug.log*
   pnpm-debug.log*
   yarn-debug.log*
   yarn-error.log*
   lerna-debug.log*
   
   # OS
   .DS_Store
   
   # Tests
   /coverage
   /.nyc_output
   
   # IDEs and editors
   /.idea
   .project
   .classpath
   .c9/
   *.launch
   .settings/
   *.sublime-workspace
   
   # IDE - VSCode
   .vscode/*
   !.vscode/settings.json
   !.vscode/tasks.json
   !.vscode/launch.json
   !.vscode/extensions.json
   ```

   

   