<!--平台：文档、meta生成、调整、-->
<template>
  <div class="home">
      <nfDataTable v-model:metaDataTable="metaDataTable" v-model:metaColumn="metaColumn"/>
  </div>
  <a-tabs type="card" @change="changeTabs">
    <a-tab-pane key="11" tab="表、字段meta">
      <formatMeta :model="metaDataTable"/>
      <formatMeta :model="metaColumn"/>
    </a-tab-pane>
    <a-tab-pane key="1" tab="数据库">
      <dataBaseSQL :metaDataTable="metaDataTable" :metaColumn="metaColumn"/>
    </a-tab-pane>
    <a-tab-pane key="2" tab="接口">
      <webapi :metaDataTable="metaDataTable" :metaColumn="metaColumn"/>
    </a-tab-pane>
    <a-tab-pane key="3" tab="前端">
      前端增删改查1
      <nfFind :meta="findMeta" :isReload='isReload' v-model="modelFindQuery" />
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
import formatMeta from '@/components/format/format-meta.vue'
import dataBaseSQL from '@/components/nf-meta-help/meta-db-mysql.vue'
import webapi from '@/components/nf-meta-help/webapi.vue'

import nfFind from '@/components/nf-find.vue'

export default {
  name: 'Plat',
  components: {
    // nfFormItem,
    nfDataTable,
    dataBaseSQL,
    webapi,
    nfFind,
    formatMeta
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

    // 数据表和表字段，
    const metaDataTable = ref({})
    const metaColumn = ref({})

    // 标示是否重新加载
    const isReload = ref(false)

    // 查询控件
    const modelFindQuery = ref({}) // 记录用户输入的查询条件
    const findMeta = ref({}) // 查询表单的meta信息

    return {
      isReload,
      // 数据库的表和字段
      metaDataTable,
      metaColumn,
      // 查询
      modelFindQuery,
      findMeta,
      value,
      metaInfo
    }
  }
}
</script>
