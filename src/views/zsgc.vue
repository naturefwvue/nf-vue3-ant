<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>增删改查的演示</a-layout-header>
      <a-layout>
        <a-layout-sider>
          <span @click="myClick('company')">公司信息</span> <br>
          <span @click="myClick('person')">员工信息</span>
        </a-layout-sider>
        <a-layout-content>
          <nfFind :meta="findMeta" :isReload='isReload' v-model="modelFindQuery" />
          <nfForm :meta="formMeta" :isReload='isReload' v-model="modelFind" />
        </a-layout-content>
      </a-layout>
      <a-layout-footer><br>外部：{{formMeta}}</a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import nfForm from '@/components/nf-form.vue'
import nfFind from '@/components/nf-find.vue'
// import { UserOutlined, DownOutlined } from '@ant-design/icons-vue'

export default {
  name: 'zsgcDemo',
  components: {
    nfForm,
    nfFind
  },
  setup () {
    // 标示是否重新加载
    const isReload = ref(false)
    // 加载查询控件的meta信息，json格式
    const jsonFind = require('./FindDemo.json')
    const modelFindQuery = ref({}) // 记录用户输入的查询条件
    const findMeta = ref(jsonFind.company) // 查询表单的meta信息

    // 表单
    const jsonForm = require('./FormDemo.json')
    const modelForm = ref({})
    const formMeta = ref(jsonForm.company)

    // 菜单切换模块
    const myClick = (name) => {
      modelForm.value = {}
      modelFindQuery.value = {}
      formMeta.value = jsonForm[name]
      findMeta.value = jsonFind[name]
      isReload.value = !isReload.value
    }

    // 返回
    return {
      isReload,
      modelFindQuery,
      findMeta,
      formMeta,
      myClick,
      modelForm
    }
  }
}
</script>

<style>
#components-layout-demo-basic {
  text-align: center;
}
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  background: #77d8f5fa;
  color: #fff;
}
#components-layout-demo-basic .ant-layout-footer {
  line-height: 1.5;
}
#components-layout-demo-basic .ant-layout-sider {
  background: #aeebf0;
  color: rgba(53, 41, 223, 0.479);
  line-height: 120px;
}
#components-layout-demo-basic .ant-layout-content {
  background: rgb(222, 222, 222);
  color: #fff;
  min-height: 120px;
  line-height: 120px;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
</style>
