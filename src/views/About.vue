<template>
  <div class="about">
    <h1 @click="myClick">This is an about page</h1>
    <a-input v-model:value="modelValue.name" placeholder="companyCode" /> <br>
    {{value}}<br>{{modelValue.name}}

    <nfInput  @pressenter="myPressEnter" v-model="modelValue.companyName" :meta="metaInfo" />{{modelValue}}
  </div>
</template>

<script>
// @ is an alias to /src
import { ref, registerRuntimeCompiler } from 'vue'
import nfInput from '@/components/nf-form-textarea.vue'

export default {
  name: 'About',
  components: {
    nfInput
  },
  setup () {
    const value = ref('11')
    const modelValue = ref({
      name: '2222'
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
      optionList: []
    })
    const isLoding = ref(false)
    const myClick = () => {
      isLoding.value = !isLoding.value
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
