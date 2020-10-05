<!--生成建表的sql语句-->
<template>
  <div class="ant-table ant-table-body ant-table-default ant-table-bordered" >
      <template v-for="(col,index) in columnMetaValue" :key="'col'+index">
        <td>{{index}}</td>
        <td v-for="(meta,index) in columnMeta" :key="'cmeta'+index">
          <nfInput v-model="col[meta.colName]" :meta="meta"/>
        </td>
      </template>
    {{columnMetaValue}}
</div>
</template>

<script>

export default {
  name: 'nf-meta-datatable',
  components: {
    // 注册组件
  },
  model: {
    prop: 'modelValue',
    event: 'input'
  },
  props: {
    modelValue: Object,
    meta: Object
  },
  data: function () {
    return {
      testValue: '测试',
      tableMeta: {}, // 表meta
      columnMeta: {}, // 字段meta的控件的meta
      columnMetaValue: {}, // 字段meta
      trConut: 1 // 行数
    }
  },
  created: function () {
    // 给data赋值
    this.columnMeta = this.meta.columnMeta
    this.columnMetaValue[1] = {
      colName: '',
      cnName: '',
      colType: '',
      colSize: 4,
      defaultValue: '',
      isNull: false,
      controlType: '',
      description: ''

    }
  },
  mounted: function () {
    var meta = this.modelValue
  },
  methods: {
    sendValue: function (value, colName) {
      // 提交给父级组件
      this.$emit('update:modelValue', this.columnMetaValue)
    }
  }
}
</script>
