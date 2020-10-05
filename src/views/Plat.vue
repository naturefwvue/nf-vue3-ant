<!--平台：文档、meta生成、调整、-->
<template>
  <div class="home">
      <nfDataTable/>
  </div>
  <a-tabs type="card" @change="changeTabs">
    <a-tab-pane key="1" tab="数据库">
      生成建表语句
    </a-tab-pane>
    <a-tab-pane key="2" tab="接口">
      后端接口
    </a-tab-pane>
    <a-tab-pane key="3" tab="前端">
      前端增删改查
    </a-tab-pane>
    <a-tab-pane key="31" tab="前端查询">
      查询
    </a-tab-pane>
    <a-tab-pane key="32" tab="前端表单">
      表单
    </a-tab-pane>
    <a-tab-pane key="33" tab="前端列表">
      列表
    </a-tab-pane>
    <a-tab-pane key="34" tab="前端分页">
      分页
    </a-tab-pane>
    <a-tab-pane key="4" tab="后端">
      后端增删改查
    </a-tab-pane>
  </a-tabs>
</template>

<script>
// @ is an alias to /src
import { ref } from 'vue'
import nfDataTable from '@/components/nf-meta-help/meta-datatable.vue'

export default {
  name: 'Plat',
  components: {
    // nfFormItem,
    nfDataTable
  },
  setup () {
    const value = ref('')
    const metaInfo = ref({
      controlId: 100,
      controlType: 101,
      colName: 'controlId'
    })
    const changeTabs = (key) => {
      console.log(key)
    }

    return {
      value,
      metaInfo
    }
  }
}
</script>
