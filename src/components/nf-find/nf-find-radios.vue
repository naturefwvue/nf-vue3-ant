/** 多选组，返回选择的value */
<template>
  <a-radio-group name="radioGroup" v-model:value="value" :default-value="-2">
    <a-radio checked="true" value="-2" @change="myInput" >全部</a-radio>
    <a-radio v-for="item in meta.optionList" :key="item.value"
      @change="myInput"
      :value="item.value">
        {{item.title}}
    </a-radio>
  </a-radio-group>
</template>

<script>

export default {
  name: 'nf-find-radio',
  model: {
    prop: 'modelValue',
    event: 'input'
  },
  props: {
    modelValue: String,
    meta: {
      type: Object,
      default: () => {
        return {
          controlId: Number, // 编号，区别同一个表单里的其他控件
          controlType: Number, // 用类型编号表示type
          colName: String, // 字段名称
          title: String // 中文名称
        }
      }
    }
  },
  data () {
    return {
      value: -2
    }
  },
  methods: {
    myInput: function (e) {
      var value = event.target.value
      var colName = this.meta.colName
      var returnValue = []
      // 判断value是否为数字
      if (typeof value === 'number') {
        returnValue.push(411)
        returnValue.push(parseInt(value))
      } else {
        if (!isNaN(value)) {
          returnValue.push(411)
          returnValue.push(parseInt(value))
        } else {
          returnValue.push(401)
          returnValue.push(value)
        }
      }
      this.$emit('update:modelValue', returnValue) // 返回给调用者
      this.$emit('getvalue', returnValue, colName) // 返回给中间组件
    }
  }
}
</script>
