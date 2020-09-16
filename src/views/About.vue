<template>
  <div class="about">
    <h1 @click="myClick">This is an about page</h1>
    <a-input v-model:value="modelValue.name" placeholder="companyCode" /> <br>
    {{value}}<br>{{modelValue.name}}<br>
    <nfInput  @pressenter="myPressEnter" v-model="modelValue.name" :meta="metaInfo" /><br>
    外面：{{modelValue}}
  </div>
</template>

<script>
// @ is an alias to /src
import { ref, registerRuntimeCompiler } from 'vue'
import nfInput from '@/components/nf-form-check.vue'

export default {
  name: 'About',
  components: {
    nfInput
  },
  setup () {
    const value = ref(true)
    const modelValue = ref({
      name: true
    })
    const metaInfo = ref({
      controlId: 1000,
      colName: 'companyName',
      controlType: 101,
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
        value: 1,
        title: '选项一'
      }]
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
