/** 多选组，返回选择的value */
<template>
  <a-radio-group
    name="radioGroup"
    v-model:value="findInfo.value"
    :default-value="modelValue"
  >
    <a-radio checked="true" value="-2" >全部</a-radio>
    <a-radio
      v-for="item in meta.optionList"
      :key="item.value"
      :value="item.value"
    >
        {{item.label}}
    </a-radio>
  </a-radio-group>
</template>

<script>
import { ref, watch, watchEffect, getCurrentInstance } from 'vue'
import { manageFind } from './nf-find.js'

export default {
  name: 'nf-find-radios',
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
          optionList: Object,
          title: String // 中文名称
        }
      }
    }
  },
  setup (props, conext) {
    // 加载基础的查询管理类
    const { findInfo } = manageFind(props)

    // 默认查询方式
    findInfo.kind = '='
    findInfo.kindkey = 411

    return {
      findInfo
    }
  },
  methods: {
    myInput: function (e) {
      var value = event.target.value
      var colName = this.meta.colName
      var id = this.meta.controlId
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
      this.$emit('getvalue', returnValue, colName, id) // 返回给中间组件
    }
  }
}
</script>
