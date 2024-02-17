# 基于无界和 hel-micro 将服务微化

## [无界](https://wujie-micro.github.io/doc/guide/start.html)

无界的介绍网上有很多, 可自行查看
项目里已经配置好，打开 setupWujie 的注释即可

## [hel-micro](https://helmicro.com/hel/)

hel-micro是一个模块联邦的微模块方案，如果无界是框架级的集成，hel-micro就是组件级的集成，具体可参考 hel-micro 首页下方的几个远程库加载示例

如要使用模块联邦, 将 micro/main.ts 替换 src/main.ts 即可

> ⚠️ 注意：hel-micro 模块联邦只能同框架，如在 react 应用调用 react 的组件，有跨端需求可以先创建一个 vue 的子应用，在子应用中模块联邦，最后用无界挂载到主应用中。

### [原理](https://juejin.cn/post/7162539136577404964)

### [实例](https://github.com/fantasticsoul/wujie-and-hel/commit/766c774a342d5edf26960dd531fae62558f181da#diff-a99f918363312acd5f12b426951691ba61caec0a1d38065d51f8deec2965881f)

### [作者博客](https://juejin.cn/user/1732486056649880/posts)
