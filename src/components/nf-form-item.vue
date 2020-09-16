/** 表单元素的综合组件，根据类型自动加载相应的组件 */
<template>
  <span class="hello">
    <nfInput v-if="meta.controlType == 100" :modelValue="modelValue" @getvalue="sendValue" :meta="meta"/>
    <nfArea v-else-if="meta.controlType <= 119" :modelValue="modelValue" @getvalue="sendValue" :meta="meta"/>
    <nfNumber v-else-if="meta.controlType <= 139" :modelValue="modelValue" @getvalue="sendValue" :meta="meta"/>
    <nfDatetime v-else-if="meta.controlType <= 149" :modelValue="modelValue" @getvalue="sendValue" :meta="meta"/>
    <nfUpload v-else-if="meta.controlType <= 159" :modelValue="modelValue" @getvalue="sendValue" :meta="meta"/>
    <nfColor v-else-if="meta.controlType === 160" :modelValue="modelValue" @getvalue="sendValue" :meta="meta"/>
    <nfCheck v-else-if="meta.controlType === 180" :modelValue="modelValue" @getvalue="sendValue" :meta="meta"/>
    <nfChecks v-else-if="meta.controlType === 182" :modelValue="modelValue" @getvalue="sendValue" :meta="meta"/>
    <nfRadios v-else-if="meta.controlType === 183" :modelValue="modelValue" @getvalue="sendValue" :meta="meta"/>
    <nfSelect v-else-if="meta.controlType <= 191" :modelValue="modelValue" @change="myChange" @getvalue="sendValue" :meta="meta"/>
    <nfInputMore v-else-if="meta.controlType === 200" :modelValue="modelValue" @getvalue="sendValue" :meta="meta"/>
  </span>
</template>

<script>
import nfInput from '@/components/nf-form-textarea.vue' // 100-107
import nfArea from '@/components/nf-form-input.vue' // 100-107
import nfNumber from '@/components/nf-form-number.vue' // 131,132
import nfDatetime from '@/components/nf-form-datetime.vue' // 140-144
import nfUpload from '@/components/nf-form-upload.vue' // 150-151
import nfColor from '@/components/nf-form-color.vue' // 160
import nfCheck from '@/components/nf-form-check.vue' // 180
import nfChecks from '@/components/nf-form-checks.vue' // 182
import nfRadios from '@/components/nf-form-radios.vue' // 183
import nfSelect from '@/components/nf-form-select.vue' // 190
import nfInputMore from '@/components/nf-form-inputmore.vue' // 200

export default {
  name: 'nf-form-item',
  components: {
    nfInput,
    nfArea,
    nfNumber,
    nfDatetime,
    nfUpload,
    nfColor,
    nfCheck,
    nfChecks,
    nfRadios,
    nfSelect,
    nfInputMore
  },
  props: {
    modelValue: Object,
    meta: Object
  },
  methods: {
    myInput: function (e) {
      var returnValue = event.target.value
      this.$emit('update:modelValue', returnValue)
      this.$emit('getvalue', returnValue) // 返回给中间组件
    },
    myRadioCheck: function (e) {
      // alert(typeof e.target.value)
      var check = e.target.checked
      this.$emit('update:modelValue', check)
    },
    myChange: function (value) {
      this.$emit('change', value)
      this.$emit('update:modelValue', value)
    },
    sendValue: function (value, colName) {
      // alert(colName)
      this.$emit('update:modelValue', value)
      this.$emit('getvalue', value, colName) // 返回给中间组件
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
