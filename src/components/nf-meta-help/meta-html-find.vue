<!--查询控件的维护-->
<!--查询表单和查询子控件-->
<!--输入字段，输出查询meta-->
<template>
  <div style="width:400px;" class="ant-table ant-table-body ant-table-default ant-table-bordered" >
    <table role="all">
    <tbody class="ant-table-tbody">
      <tr >
        <td align="right">列数：{{findMeta.colCount}}</td>
        <td><nfInput v-model="findMeta.colCount" :meta="platFindMeta[101]"/></td>
      </tr>
    </tbody>
    </table>
  </div>
  <div style="width:400px;" class="ant-table ant-table-body ant-table-default ant-table-bordered" >
    <table role="all">
    <tbody class="ant-table-tbody">
      <tr>
        <th>序号</th>
        <th>字段名</th>
      </tr>
      <tr v-for="(col,index) in metaColumn" :key="'col'+index">
        <td style="padding:5px 5px">
          {{col.colID}}
        </td>
        <td style="padding:5px 5px">
          {{col.colName}}
        </td>
      </tr>
    </tbody>
    </table>
  </div>
  <nfFind/>
</template>

<script>
import nfInput from '@/components/nf-form/nf-form-item.vue'
import nfFind from './meta-html-find-item.vue'

export default {
  name: 'meta-html-find',
  components: {
    // 注册组件
    nfInput,
    nfFind
  },
  model: {
    prop: ['metaDataTable', 'metaColumn'],
    event: 'input'
  },
  props: {
    metaDataTable: Object,
    metaFind: Object, // 输出：查询的meta
    metaColumn: Object // 输入：基础表的说明
  },
  data: function () {
    return {
      testValue: '测试',
      findMeta: {
        quickFind: [], // 快捷查询字段
        allFind: [], // 全部查询字段
        colCount: 4, // 列数
        customer: {} // 个性化查询方案
      },
      platFindMeta: {}, // 平台的meta
      findItem: {}, // 查询子项
      paramType: { // 数据库类型，转换成程序类型
        narchar: 'string',
        char: 'string',
        text: 'string',
        longtext: 'string',
        int: 'int',
        bigint: 'string',
        float: 'float',
        double: 'double',
        decimal: 'decimal',
        bit: 'bool',
        time: 'string',
        year: 'string',
        timestamp: 'int',
        date: 'string'
      }
    }
  },
  created: function () {
    // 读取json
    const json = require('./json/help-meta-find.json')
    this.platFindMeta = json.platFindMeta
  },
  mounted: function () {
    var meta = this.modelValue
  },
  methods: {
    sendColumn: function (value, colName) {
      // 提交给父级组件
      this.$emit('update:metaColumn', this.columnMetaValue)
    }
  }
}
</script>
