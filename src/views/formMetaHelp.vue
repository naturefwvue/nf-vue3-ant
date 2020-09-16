<template>
  <div class="components-input-demo-presuffix" style="width:400px">
    <h1>表单测试</h1>
    <nfInput v-model="modelValue.companyName" :meta="metaInfo[1000]" />{{modelValue}}
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from 'vue'
import nfInput from '@/components/nf-form-input.vue'

export default {
  name: 'formMetaHelp',
  components: {
    nfInput
  },
  setup () {
    const json = require('./FormDemo.json') // 加载meta信息，json格式
    const modelValue = ref({}) // 放数据的model
    const metaInfo = ref(json.companyForm) // 表单需要的meta信息
    const rowCount = ref(1) // 行数，遍历用，计算得出
    const colCount = ref(3) // 列数，遍历用，直接给定
    const tdCount = ref(1) // 控件数，遍历用
    const metaArr = ref([]) // 数组形式的meta
    const colNameArr = ref([]) // 数组形式的字段名
    const getName = (row, col) => {
      return colNameArr.value[(row - 1) * 3 + Math.floor(col / 2) - 1]
    }
    const myClick = (key) => {
      // 更换表单的meta
      metaInfo.value = json[key]
      // 初始化
      tdCount.value = 1
      metaArr.value = []
      colNameArr.value = []
      // 创建model
      modelValue.value = {}
      rowCount.value = 0
      for (var k in metaInfo.value) {
        var item = metaInfo.value[k]
        modelValue.value[item.colName] = '2'
        tdCount.value += 1
        metaArr.value.push(item)
        colNameArr.value.push(item.colName)
        // colNameArr.value.push(item.colName)
      }
      // 计算行数
      rowCount.value = Math.ceil(tdCount.value / colCount.value)
      // alert(rowCount.value)
    }
    myClick('companyForm')
    return {
      modelValue,
      metaInfo,
      rowCount,
      colCount,
      tdCount,
      metaArr,
      colNameArr,
      myClick,
      getName
    }
  }
}
</script>
