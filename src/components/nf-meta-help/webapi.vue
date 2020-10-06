<!--接口说明-->
<!--后端接口名称，路径，参数，功能说明等
-->
<template>
  <div class="ant-table ant-table-body ant-table-default ant-table-bordered" >
    <table role="all">
    <tbody class="ant-table-tbody">
      <tr>
        <th>序号</th>
        <th>参数名</th>
        <th>参数类型</th>
        <th>参数大小</th>
        <th>范围</th>
        <th>说明</th>
      </tr>
      <tr v-for="(col,index) in metaColumn" :key="'col'+index">
        <td style="padding:5px 5px">
          {{col.colID}}
        </td>
        <td style="padding:5px 5px">
          {{col.colName}}
        </td>
        <td style="padding:5px 5px">
          {{paramType[col.colType]}}
        </td>
        <td style="padding:5px 5px">
          {{col.colSize}}
        </td>
        <td style="padding:5px 5px">
          {{col.description}}
        </td>
      </tr>
    </tbody>
    </table>
</div>
</template>

<script>

export default {
  name: 'nf-meta-datatable',
  components: {
    // 注册组件
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
