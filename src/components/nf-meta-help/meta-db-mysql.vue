<!--生成建表的sql语句-->
<template>
  <div class="ant-table ant-table-body ant-table-default ant-table-bordered" >
    create table {{metaDataTable.name}} <br>
    <template v-for="(col,index) in metaColumn" :key="'col'+index">
      {{index}}-{{col.colName}}
    </template>
</div>
</template>

<script>

export default {
  name: 'meta-db-mysql',
  components: {
    // 注册组件
  },
  model: {
    prop: 'modelValue',
    event: 'input'
  },
  props: {
    modelValue: Object,
    metaDataTable: Object,
    metaColumn: Object
  },
  data: function () {
    return {
      testValue: '测试'
    }
  },
  created: function () {
    // 给data赋值
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
