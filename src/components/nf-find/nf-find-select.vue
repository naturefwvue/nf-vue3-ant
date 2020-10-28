/** 下拉列表框，多选的那个再考虑考虑 */
<template>
  <a-select :id="'c'+meta.controlId"
    style="width:98%"
    v-model:value="findInfo.value"
    :name="'c'+meta.controlId"
    :placeholder="meta.placeholder"
    :size="findInfo.antSize"
    @change="myInput">
      <a-select-option value="-2">全部{{meta.placeholder}}</a-select-option>
      <a-select-option v-for="(item,index) in meta.optionList"
        :key="index"
        :value="item.value" >
          {{item.title}}
      </a-select-option>
    </a-select>
</template>

<script>
import { ref, watch, watchEffect, getCurrentInstance } from 'vue'
import { manageFind } from './nf-find.js'

export default {
  name: 'nf-find-select',
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    modelValue: String,
    meta: {
      type: Object,
      default: () => {
        return {
          controlId: Number, // 编号，区别同一个表单里的其他控件
          controlType: Number, // 用类型编号表示type
          colName: [String, Object], // 字段名称
          placeholder: String,
          max: { // 最多选择数量，0表示不限制
            type: Number,
            default: 0
          },
          optionList: Object,
          title: String // 中文名称
        }
      }
    }
  },
  setup (props, conext) {
    // 加载基础的查询管理类
    const { dicFindKind, findInfo, findFun } = manageFind(props)

    // 默认查询方式
    findInfo.kind = '含'
    findInfo.kindkey = 403

    return {
      dicFindKind,
      findInfo,
      findFun
    }
  },
  methods: {
    myInput: function (value) {
      var returnValue = []
      var colName = this.meta.colName
      var id = this.meta.controlId
      // 判断value是否为数字
      if (typeof value === 'number') {
        returnValue.push(411)
        returnValue.push(parseInt(value))
      } else {
        returnValue.push(401)
        returnValue.push(value)
      }
      this.$emit('update:modelValue', returnValue) // 返回给调用者
      this.$emit('getvalue', returnValue, colName, id) // 返回给中间组件
      this.$emit('change', returnValue) // 返回给中间组件
    }
  }
}
</script>
