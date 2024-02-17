# 安居链微前端基座

本项目同时支持微容器 wujie 和微模块 hel-micro, 使用方法见目录 [micro](./src/micro/README.md)

## 技术栈

vite + vue3 + unocss + scss + primevue + pinia + axios + @tansack/vue-query + vueuse + wujie + hel-micro

开发推荐使用 vue-query 做请求, 后续会提供封装案例

推荐使用 unocss 进行样式开发, 但保留了 scss 的形式

primevue 提供了多达 90 个组件, 超过多数 ui 库

## 目录结构

-   public
    -   assets
        -   icons 只存放矢量图
        -   imgs 只存放位图
-   src
    -   components 公共组件
    -   constant 常量
    -   directives 自定义指令
    -   helpers 存放一些逻辑, 第三方改造的东西, 需单例导出的东西
    -   i18n
    -   micro 微前端的内容
    -   pages 所有业务的视图, 会是内容最多的目录, 一个业务板块一个子目录
        -   业务1
        -   业务2
        -   业务3
    -   router 路由
    -   store 全局状态
    -   styles 公共样式

## 开发准备

为保证开发上风格一致, 推荐使用 vscode, [先安装推荐插件](https://blog.csdn.net/bianliuzhu/article/details/129286833), 这是一个 vue3 项目, [需要禁用自带的 typescript](https://cn.vuejs.org/guide/typescript/overview.html#volar-takeover-mode)

为方便开发，在 .vscode/snippet.json 中, 自定义了一个 v snippet, 可自行取用, [如何添加 snippet?](https://juejin.cn/post/6844903601685397512?searchId=20240217144320857F942847EE8BE2B124)

## 开发规范

-   目录/文件名一律使用中划线小写, 多使用有意义的文件名, 不要弄一堆 index.vue, 文件取名不要偷懒, index 一般只作导出
-   pages 会成为最大的目录, 所有业务的视图都放在此处, 一个业务板块一个子目录, 业务的子组件新建 \_comps 的目录存放, 如果多处公用才提出到 src/components 中
-   多用 export {a, b, c} 等具名形式, 少用 export default
-   scss 开发, 不允许使用 .first .second 这样毫无意义的类名, 太难维护了
-   typescript
    -   业务代码的类型书写用 type, 不用 interface
        -   [直接说结论](https://juejin.cn/post/7304867327752912906)
        -   [Tidy TypeScript: Prefer type aliases over interfaces](https://fettblog.eu/tidy-typescript-prefer-type-aliases/)
    -   类型的写法, 以字母 <strong>I</strong> 开头，如 type IUser, type IUserList, type IUserCollection
    -   类型命名多用单数如 type IUserList, type IUserCollection; 少用复数如 type IUsers, 末尾的小写 <strong>s</strong> 在大型的业务代码中难以辨认, 也不方便做全局替换
    -   [使用联合类型, 而不是 enum](https://fettblog.eu/tidy-typescript-avoid-enums/)
-   矢量图直接放 icons
-   关于位图
    -   figma 上的图片下载选 3x 倍
    -   少存放静态资源到 public, 多用 OSS
    -   图片凡超过 100 KB 的, 要进行压缩, 压缩工具使用 [Imagine](https://github.com/meowtec/Imagine)
    -   多用 webp 和 svg, 少用 jpg, 尤其少用 png
    -   在 imgs 底下新建业务子目录, 按照业务存放

## GIT规范

项目安装了 [cz-git](https://cz-git.qbb.sh/zh/), 在命令行直接 <strong>cz</strong> 进行提交

为保证分支干净整洁, 一律使用 rebase 的方式获取最新代码

遵守 git-flow 流程, 提交 PR 供他人 review

> 根据安居链统一的 git 要求, pre 充当原 release 分支, dev 作为原 develop 分支, test 充当原 main 分支, 从 pre 发正式版, test 发测试版, dev 一直往前开发

-   功能分支可以以人名开头, 不允许使用无意义的分支名, gyy sby 等一律禁止, 但可以使用 gyy-add-user-page
-   代码提交必须填写 commit, 不允许提交无意义的 commit, 如 123 等, commit 可以用 openAI 来写, [传送门](https://cz-git.qbb.sh/zh/recipes/openai)
-   PR 标题要写清楚
-   git flow 的几个参考
    -   [git-flow 的工作流程](https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/git-flow)
    -   [持续交付之基于Git Flow代码分支策略实践](https://bbs.huaweicloud.com/blogs/301173)

## 🚧 下一步

-   统一的后台端点
-   统一的请求接口
-   封装 vue-query
-   统一的 layout
-   路由权限（公共路由、私有路由等）
