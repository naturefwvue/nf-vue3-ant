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
          <nfFind :meta="findMeta" :isReload='isReload' v-model="modelFindQuery"/>
          <nfForm :meta="formMeta" :isReload='isReload' v-model="modelForm" />
        </a-layout-content>
      </a-layout>
      <a-layout-footer><br>外部：{{findMeta.findMeta.quickFind}}</a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import nfFind from '@/components/nf-find.vue'
import nfForm from '@/components/nf-form.vue'
// import { UserOutlined, DownOutlined } from '@ant-design/icons-vue'

// 倒计时逻辑的Composition Function
const useCountdown = (initialCount) => {
  const count = ref(initialCount)
  const state = ref(false)
  const start = (initCount) => {
    state.value = true
    if (initCount > 0) {
      count.value = initCount
    }
    if (!count.value) {
      count.value = initialCount
    }
    const interval = setInterval(() => {
      if (count.value === 0) {
        clearInterval(interval)
        state.value = false
      } else {
        count.value--
      }
    }, 1000)
  }
  return {
    count,
    start,
    state
  }
}

export default {
  name: 'zsgcDemo',
  components: {
    // nfHelp,
    nfFind,
    nfForm
  },
  setup () {
    const { count, start, state } = useCountdown(10)
    const onClick = () => {
      start()
    }

    const isReload = ref(false)
    // 加载查询控件的meta信息，json格式
    const jsonFind = require('./json/FindDemo.json')
    // 记录用户输入的查询条件
    const modelFindQuery = ref({})
    // 查询表单的meta信息
    const findMeta = ref(jsonFind.company)

    // 表单
    const jsonForm = require('./json/FormDemo.json')
    const modelForm = ref({})
    const formMeta = reactive(jsonForm.company)

    // 菜单切换模块
    const myClick = (name) => {
      isReload.value = !isReload.value
      modelFindQuery.value = {}
      modelForm.value = {}
      formMeta.value = {} // jsonForm[name]
      findMeta.value = jsonFind[name]
    }

    // 返回
    return {
      count,
      onClick,
      state,
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
