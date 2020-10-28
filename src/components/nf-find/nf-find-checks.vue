/**多选组，返回逗号连接的value值 */
<template>
  <a-checkbox-group
    v-model:value="findInfo.value"
    :options="meta.optionList"
  >
  </a-checkbox-group>
</template>

<script>
import { ref, watch, watchEffect, getCurrentInstance } from 'vue'
import { manageFind } from './nf-find.js'

export default {
  name: 'nf-find-checks',
  model: {
    prop: 'modelValue',
    event: 'input'
  },
  props: {
    modelValue: Object,
    meta: {
      type: Object,
      default: () => {
        return {
          controlId: Number, // 编号，区别同一个表单里的其他控件
          controlType: Number, // 用类型编号表示type
          colName: String, // 字段名称
          max: { // 最多选择数量，0表示不限制
            type: Number,
            default: 0
          },
          title: String // 中文名称
        }
      }
    }
  },
  setup (props, conext) {
    // 加载基础的查询管理类
    const { findInfo } = manageFind(props)

    // 默认查询方式
    findInfo.kind = 'in'
    findInfo.kindkey = 441

    return {
      findInfo
    }
  }
}
</script>
