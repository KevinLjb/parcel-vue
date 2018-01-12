`parcel-vue` 一个基于parcel打包工具的 vue急速开发脚手架解决方案,强烈建议使用node8.0以上

#### 初始化项目

```bash
// 安装脚手架
$ npm install parcel-vue -g
// 初始化
$ parcel-vue projectName
```

#### 安装依赖

```bash
$ cd projectName
$ npm install
```
其中`parcel-bundler`是主要的工具，对于`vue`结尾的单文件，需要单独处理文件类型，
`parcel-plugin-vue`这个插件会通过`vueify`来生成对应的代码，`parcel`会自动加载`parcel-plugin`开头的依赖。


#### 运行开发环境,运行成功打开浏览器http://localhost:1234即可查看项目

```bash
$ npm run dev
```

#### 打包编译
```bash
$ npm run build
```

#### 开发
目录结构
```js
src
├── router
    ├── index.js
├── assets
    ├── logo.png
├── components
	├── Hello
		├── index.js
	├── index.js
├── views
    ├── HelloWorld
        ├── images
            ├── logo.png
        ├── HelloWorld.vue
├── styles
	├── common.css
├── store
    ├── global
        ├── global.js
        ├── index.js
    ├── index.js
├── app.vue
├── index.js
```

只需要执行`npm run dev` 和 `npm run build` 就可以进行开发和构建。

#### 路由懒加载
只需将传统 import page from 'path' 方式改为 const page = () => import('path') 即可
```bash
// 此种方式路由不会懒加载
import HelloWorld from '../views/HelloWorld/HelloWorld.vue'
// 此种方式引入即可实现路由懒加载,打包时js文件自动拆分
const HelloWorld =  () => import('../views/HelloWorld/HelloWorld.vue')
```

#### nodejs版本升级,如果您的node版本低于8.0,我们强烈建议您升级node版本(命令行升级不支持windows)

```bash
$ npm install -g n
$ n stable
```

