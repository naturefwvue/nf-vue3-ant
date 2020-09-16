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
