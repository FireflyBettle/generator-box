# 开发文档

## 安装

全局安装，如果有安装，可以直接跳过

```shell
npm i @jyb/jfet-solution-h5boxes -g
npm i concurrently cross-env -g
```

当前目录执行：

```shell
npm i
```

## 本地mock数据开发

`process.env.NODE_ENV`为`mock`

```shell
npm run mock
```

## 本地开发

`process.env.NODE_ENV`为`local`

```shell
npm run dev
```

## 发布集成测试环境

目前已经接入持续集成，开发者不需要关注该步骤

`process.env.NODE_ENV`为`test`

```shell
npm run build:test
```

如果需要访问构建打包后的文件，可以执行`npm run serve:build`

## 发布预发布/正式环境

目前已经接入持续集成，开发者不需要关注该步骤

`process.env.NODE_ENV`为`production`

```shell
npm run build:prod
```

如果需要访问构建打包后的文件，可以执行`npm run serve:build`

## 图片压缩

一般在build之后执行，目前已经接入持续集成，开发者不需要关注该步骤

```shell
npm run image
```

## 目录结构

[目录规范](http://doc.fe.jyb.com/book/boxes-docs/docs/framework/AppSpec.html)

## abc.json配置

配置查看：[jfet-solution-h5boxes](http://git.jtjr.com/boxes/jfet-solution-h5boxes)

数据接口代理配置：[jfet-server](http://doc.fe.jyb.com/book/jfet-website/plugin/jfet-server.html)

## 开发注意

- `pages`目录下，除了layouts,partials目录之外，每一个目录为一个页面，约定模板名称为`index.hbs`,入口名称为`index.js`，其中模板中的`cssFile,jsFile`直接填写`页面目录名称`
- 如果需要在`pages`下的hbs模板中直接引入图片，可以先在`index.js`中把图片引入，然后使用`require`引入，这点以后会做相应的优化
