<!--数据库表-->
<!--序号、字段名、中文名、字段类型、字段大小、默认值、是否为空、控件类型、说明、外键表、外键字段
-->
<template>
  <div class="ant-table ant-table-body ant-table-default ant-table-bordered" >
    <table role="all">
    <tbody class="ant-table-tbody">
      <tr >
        <td align="right">表编号：</td>
        <td><nfInput v-model="tableMetaValue.id" :meta="tableMeta[101]" @getvalue="sendTable"/></td>
        <td align="right">表名：</td>
        <td><nfInput v-model="tableMetaValue.name" :meta="tableMeta[102]" @getvalue="sendTable"/></td>
        <td align="right">字段数量：</td>
        <td><nfInput v-model="trConut" :meta="tableMeta[104]"/></td>
      </tr>
      <tr >
        <td align="right">表说明：</td>
        <td colspan="5">
          <nfInput v-model="tableMetaValue.description" :meta="tableMeta[103]" @getvalue="sendTable"/>
        </td>
      </tr>
    </tbody>
    </table>
  </div>
  <div class="ant-table ant-table-body ant-table-default ant-table-bordered" >
    <table role="all">
    <tbody class="ant-table-tbody">
      <tr>
        <th>序号</th>
        <th>字段名</th>
        <th>中文名</th>
        <th>字段类型</th>
        <th>字段大小</th>
        <th>默认值</th>
        <th>空？</th>
        <th>控件类型</th>
        <th>说明</th>
      </tr>
      <tr v-for="(col,index) in columnMetaValue" :key="'col'+index">
        <td>{{index}}</td>
        <td style="padding:5px 5px" v-for="(meta,index) in columnMeta" :key="'cmeta'+index">
          <nfInput v-model="col[meta.colName]" :meta="meta" @getvalue="sendColumn"/>
        </td>
      </tr>
    </tbody>
    </table>
    <formatMeta v-if="false" :model="columnMetaValue"/>
</div>
</template>

<script>
import nfInput from '@/components/nf-html/nf-form-item.vue'
import formatMeta from '@/components/format/format-meta.vue'

export default {
  name: 'nf-meta-datatable',
  components: {
    // 注册组件
    nfInput,
    formatMeta
  },
  model: {
    prop: ['metaDataTable', 'metaColumn'],
    event: 'input'
  },
  props: {
    metaDataTable: Object,
    metaColumn: Object
  },
  data: function () {
    return {
      testValue: '测试',
      tableMeta: {}, // 表meta
      tableMetaValue: {
        id: 1000,
        name: 'tableName',
        description: '',
        columnCount: 1
      }, // 表meta
      columnMeta: {}, // 字段meta的控件的meta
      columnMetaValue: {}, // 字段meta
      trConut: 1 // 行数
    }
  },
  created: function () {
    // 读取json
    const json = require('./json/help-meta-datetable.json')
    // 表赋值
    this.tableMeta = json.tableMeta
    // 字段赋值
    this.columnMeta = json.columnMeta
    this.columnMeta[103].optionList = json.dic.ColumnTypeList
    this.columnMeta[107].optionList = json.dic.ControlTypeList
    this.columnMetaValue[1] = {
      colName: 'colName',
      cnName: '中文名',
      colType: 'narchar',
      colSize: 4,
      defaultValue: '',
      isNull: false,
      controlType: '101',
      description: ''
    }
  },
  mounted: function () {
    var meta = this.modelValue
  },
  watch: {
    trConut: function (newValue, oldVale) {
      // 增加一个字段
      if (newValue > oldVale) {
        this.columnMetaValue[newValue] = {
          colID: 1,
          colName: 'colName',
          cnName: '中文名',
          colType: 'narchar',
          colSize: 4,
          defaultValue: '',
          isNull: false,
          controlType: '101',
          description: ''
        }
        this.tableMeta.columnCount = newValue
      }
    }
  },
  methods: {
    sendTable: function (value, colName) {
      // 提交给父级组件
      this.$emit('update:metaDataTable', this.tableMetaValue)
    },
    sendColumn: function (value, colName) {
      // 提交给父级组件
      this.$emit('update:metaColumn', this.columnMetaValue)
    }
  }
}
</script>
