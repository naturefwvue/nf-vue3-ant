<template>
  <div class="about">
    <h1 @click="myClick">This is an about page</h1>
    <a-input v-model:value="value" placeholder="companyCode" /> <br>
    {{value}}<br>
    <nfInput  @pressenter="myPressEnter" v-model="modelValue.name" :meta="metaInfo" /><br>
    外面：{{modelValue}}
  </div>
</template>

<script>
// @ is an alias to /src
import { ref, watch, registerRuntimeCompiler } from 'vue'
import nfInput from '@/components/nf-form-select.vue'

export default {
  name: 'About',
  components: {
    nfInput
  },
  setup () {
    const value = ref(140)
    const modelValue = ref({
      name: '2'
    })
    const metaInfo = ref({
      controlId: 1000,
      colName: 'companyName',
      controlType: 140,
      isClear: true,
      disabled: false,
      required: true,
      readonly: false,
      pattern: '',
      class: '',
      placeholder: '请输入公司名称',
      title: '公司名称',
      autocomplete: 'on',
      size: 30,
      cols: 100,
      maxlength: 100,
      optionList: [{
        value: '1',
        title: '选项一'
      },
      {
        value: '2',
        title: '选项二'
      }
      ]
    })
    watch(() => value.value, val => {
      console.log(`count is ${val}`)
      metaInfo.value.controlType = parseInt(val)
    })
    const isLoding = ref(false)
    const myClick = () => {
      isLoding.value = !isLoding.value
      modelValue.value.name = !modelValue.value.name
    }
    const myPressEnter = (e, colName) => {
      alert('外部')
      alert(e)
      alert(colName)
    }
    return {
      value,
      modelValue,
      metaInfo,
      isLoding,
      myClick,
      myPressEnter
    }
  }
}
</script>
