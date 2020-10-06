<!--格式化显示meta-->
<template>
  <div align="left" style="background-color:#EEEEFF;height:600px;width:300px;float:left;">
      {<br>
        <span v-for="(item, key, index) in model" :key="index">
          <span v-if="typeof item === 'number' && !isNaN(item)">&nbsp;&nbsp;"{{key}}": {{item}}, <br></span>
          <span v-if="typeof item === 'string'">&nbsp;&nbsp;"{{key}}": "{{item}}", <br></span>
          <span v-if="typeof(item) ==='boolean'">&nbsp;&nbsp;"{{key}}": {{item}}, <br></span>
          <span v-if="typeof(item) ==='object' && typeof(item.length) !== 'undefined'">
            &nbsp;&nbsp;"{{key}}": [<br>
            <span v-for="(opt, index) in item" :key="'opt'+index">&nbsp;&nbsp;&nbsp;&nbsp;{{opt}}, <br></span>
            &nbsp;&nbsp;]
          </span>
          <span v-if="typeof(item) ==='object'">
            &nbsp;&nbsp;"{{key}}": {<br>
            <span v-for="(opt,key, index) in item" :key="'opt'+index">
              &nbsp;&nbsp;&nbsp;&nbsp;{{key}}:{{opt}}, <br>
            </span>
            &nbsp;&nbsp;}<br>
          </span>
        </span>
      }
    </div>
</template>

<script>

export default {
  name: 'format-meta',
  components: {
    // 注册组件
  },
  model: {
    prop: 'model'
  },
  props: {
    model: Object
  },
  data: function () {
    return {
      testValue: '测试'
    }
  },
  methods: {
    sendValue: function (value, colName) {
      // 提交给父级组件
      this.$emit('update:modelValue', this.columnMetaValue)
    }
  }
}
</script>
