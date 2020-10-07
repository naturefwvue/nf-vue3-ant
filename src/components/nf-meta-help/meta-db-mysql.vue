<!--生成建表的sql语句-->
<template>
  <div id="sql" >
    <pre>
    <span class="code">CREATE TABLE </span> `{{metaDataTable.name}}` (
      `ID` <span class="code">PRIMARY KEY</span> <span class="code">AUTO_INCREMENT</span>,
    <template v-for="(col,index) in metaColumn" :key="'col'+index">
      `{{col.colName}}` <span class="code2">{{col.colType}}</span>{{showSize(col)}} <span class="code">DEFAULT</span> '' <span class="code">COMMENT</span> '{{col.description}}',</template>
    )
    <span class="code">ENGINE</span> = <span class="code">InnoDB</span>
    <span class="code">DEFAULT CHARACTER SET</span> = utf8mb4
    <span class="code">COLLATE</span> = utf8mb4_bin
    <span class="code">COMMENT</span> = '测试';
    </pre>
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
      testValue: '测试',
      size: {
        VARCHAR: '(s)',
        INT: 's',
        TIMESTAMP: '(14)'
      }
    }
  },
  created: function () {
    // 给data赋值
  },
  methods: {
    // 显示字段大小
    showSize: function (meta) {
      var re = this.size[meta.colType]
      if (typeof re === 'undefined') {
        re = meta.colSize
      } else {
        re = re.replace('s', meta.colSize)
      }
      return re
    },
    // 显示默认值
    showDefault: function (meta) {
      var re = this.size[meta.colType]
      if (typeof re === 'undefined') {
        re = meta.colSize
      } else {
        re = re.replace('s', meta.colSize)
      }
      return re
    },
    sendValue: function (value, colName) {
      // 提交给父级组件
      this.$emit('update:modelValue', this.columnMetaValue)
    }
  }
}
</script>

<style>
#sql .code {
  color: rgb(43, 43, 219)
}
#sql .code2 {
  color: rgb(230, 174, 21)
}
#sql {
  text-align: left;
}
</style>
