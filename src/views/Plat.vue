<!--平台：文档、meta生成、调整、-->
<template>
  <div class="home"><!--数据表和字段-->
      <nfDataTable
        v-model:metaDataTable="metaDataTable"
        v-model:metaColumn="metaColumn"
        @addcolumn="addcolumn"/>
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
    <a-tab-pane key="31" tab="前端查询meta">
      <metaFind v-model:metaFind="findMeta" :metaColumn="metaColumn"/>
    </a-tab-pane>
    <a-tab-pane key="32" tab="前端表单meta">
      <metaForm
        v-model:metaForm="formMeta"
        :metaColumn="metaColumn"
        :isReload='isReload'
        @sendmeta="getFormMeta"/>
    </a-tab-pane>
    <a-tab-pane key="33" tab="前端列表meta">
      列表
    </a-tab-pane>
    <a-tab-pane key="34" tab="前端分页meta">
      分页
    </a-tab-pane>
    <a-tab-pane key="3" tab="前端增删改查">
      <!--表单-->
      <nfForm v-if="isShowForm"
        v-model="formModel"
        :meta="formMeta"
        :isReload='isReloadFormMeta'/>
    </a-tab-pane>
    <a-tab-pane key="4" tab="后端增删改查">
      后端增删改查
    </a-tab-pane>
  </a-tabs>
  {{formModel}}
</template>

<script>
// @ is an alias to /src
import { ref } from 'vue'
import formatMeta from '@/components/format/format-meta.vue'
import nfDataTable from '@/components/nf-meta-help/meta-datatable.vue'
import dataBaseSQL from '@/components/nf-meta-help/meta-db-mysql.vue'
import metaForm from '@/components/nf-meta-help/meta-html-form.vue'
import metaFind from '@/components/nf-meta-help/meta-html-find.vue'

import webapi from '@/components/nf-meta-help/webapi.vue'

import nfFind from '@/components/nf-find.vue'
import nfForm from '@/components/nf-form.vue'

export default {
  name: 'Plat',
  components: {
    // nfFormItem,
    nfDataTable,
    dataBaseSQL,
    metaFind,
    metaForm,
    webapi,
    // nfFind,
    nfForm,
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

    // 标示是否重新加载
    const isReload = ref(false)
    const isReloadFormMeta = ref(false)

    // 是否显示
    const isShowForm = ref(false) // 表单控件

    // 表单控件
    const formModel = ref({}) // 表单的model
    const formMeta = ref({}) // 表单的meta信息

    // 数据表和表字段，
    const metaDataTable = ref({})
    const metaColumn = ref({})
    const addcolumn = (tableMeta, columnMeta) => {
      // 数据表增加字段，更新表单和查询以及列表
      isReload.value = !isReload.value
    }
    // 表单meta
    const getFormMeta = (meta) => {
      isReloadFormMeta.value = !isReload.value
      isShowForm.value = true
      formMeta.value = meta
    }
    // 查询控件
    const modelFindQuery = ref({}) // 记录用户输入的查询条件
    const findMeta = ref({}) // 查询表单的meta信息

    return {
      isReload,
      isReloadFormMeta,
      // 数据库的表和字段
      metaDataTable,
      metaColumn,
      addcolumn,
      // 表单meta
      getFormMeta,
      // 查询
      modelFindQuery,
      findMeta,
      // 表单
      formMeta,
      formModel,
      isShowForm,
      // 列表
      // 分页
      // 后端
      value,
      metaInfo
    }
  }
}
</script>
