# 快速开始

## 目录命名

活动项目目录命名规则：h5_act__[ones需求号]

## 部署路径

路径规则为：`act/[年月]/[活动标识]`，比如9月平台活动：`act/201909/platform`

定义好路径后需要把`abc.json`中的`act/199701/test`全部替换

## 安装&&启动

可以看`development.md`

## 开发相关

### 常用文件

- 活动配置统一管理在`config/index.js`
- 全局变量统一管理在`config/global_var.js`
- 业务数据埋点，`config/report.js`
- 异常数据埋点，`config/tracker.js`

### 常见问题

1、开发使用的编辑器需要安装`ESLint`插件，开发过程需要遵守相应[规范](http://doc.fe.jyb.com/book/style-guide/)

2、活动ID统一从`config/index.js`中获取，全局变量统一从`config/global_var.js`中获取

3、新的活动都需要从[数据接口平台](http://mock.fe.jyb.com)上面创建一个分组，然后修改`config/index.js`中的`mockAPI`为分组地址，这样`mock环境`下统一请求数据接口平台

4、业务数据埋点，可以修改`config/report.js`中的配置表，同时需要`index.hbs`中的`statEA`和`statEB`

5、异常数据埋点，可以去[前端监控系统](http://tracker.fe.jyb.com)申请项目ID，然后修改配置`config/tracker.js`

6、组件目录为`components`

7、boxes[使用文档](http://doc.fe.jyb.com/book/boxes-docs/index.html)

8、前端公共库，[common-lib](http://doc.fe.jyb.com/book/common-lib/index.html)，如果公共库没有的模块，可以自己实现，项目上线之后，再沉淀到公共库中

9、目前h5活动/h5产品都通过持续集成线上构建和自动创建上线单，提交和分支规范看[这里](http://doc.fe.jyb.com/book/jyb-ci/doc/QuickStart.html)，现在建议使用简洁提交规范
