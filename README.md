# 状态
目前正处于开发过程，每天都会实现一点功能，所以可能会有一些bug出现。遇到bug不要急着喷，会解决的。

# 介绍文档
https://zhuanlan.zhihu.com/p/257183503 

https://www.cnblogs.com/jyk/p/13728371.html 

# 功能
## 表单metaHelp 
生成meta的工具，通过他可以快速实现meta

## 表单demo
单独的测试表单功能，非独立组件

## 查询组件
单独的测试查询功能，非独立组件

## 增删改查
完整的增删改查的demo，目前实现查询和表单功能

## ant表单
体验antDV的form表单

# nf-vue3-ant
vue3.0 + Ant Design Vue + 文档驱动 = 无代码的增删改查。

# 安装

$ npm install -g @vue/cli

$ npm i --save ant-design-vue@next

$ npm i --save ant-design-vue

# 环境

vue 3.0

less-loader 

ant design 2.X

完整引入

~~~
import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/antd.css';

const app = createApp();
app.config.productionTip = false;

app.use(Antd);
~~~
