<template>
  <div class="home">
    <div style="background-color:#dddddd;height:600px;width:100px;float:left;">
      <a href="#" @click="myClick('companyFind')">公司信息</a> <br>
      <a href="#" @click="myClick('personFind')">员工信息</a>
    </div>
    <div style="background-color:#eee;height:600px;width:900px;float:left;">
      <nfFind v-model="modelFindQuery" :meta="findMeta"/>
      <br>外部：{{modelFindQuery}}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import nfFind from '@/components/nf-find.vue'
// import { UserOutlined, DownOutlined } from '@ant-design/icons-vue'

export default {
  name: 'zsgcDemo',
  components: {
    // nfHelp,
    nfFind
  },
  setup () {
    // 加载查询控件的meta信息，json格式
    const jsonFind = require('./FindDemo.json')
    // 记录用户输入的查询条件
    const modelFindQuery = ref({})
    // 查询表单的meta信息
    const findMeta = ref(jsonFind.companyFind)
    // 返回
    return {
      modelFindQuery,
      findMeta
    }
  }
}
</script>
