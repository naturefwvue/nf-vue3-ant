/** 查询元素的综合组件，根据类型自动加载相应的组件 */
<template>
  <span class="hello">
    <nfInput v-if="meta.controlType <= 119" :modelValue="modelValue" @getvalue="sendValue" :meta="meta"/>
    <nfNumber v-else-if="meta.controlType <= 139" :modelValue="modelValue" @getvalue="sendValue" :meta="meta"/>
    <nfDatetime v-else-if="meta.controlType <= 148" :modelValue="modelValue" @getvalue="sendValue" :meta="meta"/>
    <nfTime v-else-if="meta.controlType === 149" :modelValue="modelValue" @getvalue="sendValue" :meta="meta"/>
    <nfInput v-else-if="meta.controlType <= 159" :modelValue="modelValue" @getvalue="sendValue" :meta="meta"/>
    <nfInput v-else-if="meta.controlType === 160" :modelValue="modelValue" @getvalue="sendValue" :meta="meta"/>
    <nfSelect v-else-if="meta.controlType === 180" :modelValue="modelValue" @getvalue="sendValue" :meta="meta"/>
    <nfChecks v-else-if="meta.controlType === 182" :modelValue="modelValue" @getvalue="sendValue" :meta="meta"/>
    <nfRadios v-else-if="meta.controlType === 183" :modelValue="modelValue" @getvalue="sendValue" :meta="meta"/>
    <nfSelect v-else-if="meta.controlType <= 191" :modelValue="modelValue" @getvalue="sendValue" :meta="meta"/>
    <nfCascader v-else-if="meta.controlType === 200" :modelValue="modelValue" @getvalue="sendValue" :meta="meta"/>
  </span>
</template>

<script>
// import nfArea from './nf-form-textarea.vue' // 100
// import nfUrl from './nf-form-input-url.vue' // 105
// import nfSlider from './nf-form-numslider.vue' // 132
// import nfUpload from './nf-form-upload.vue' // 150-151
// import nfColor from './nf-form-color.vue' // 160
// import nfCheck from './nf-form-check.vue' // 180
// import nfInputMore from './nf-form-inputmore.vue' // 200
import nfInput from './nf-find-input.vue' // 100-107
import nfNumber from './nf-find-number.vue' // 131
import nfDatetime from './nf-find-datetime.vue' // 140-144
import nfTime from './nf-find-time.vue' // 140-144
import nfChecks from './nf-find-checks.vue' // 182
import nfRadios from './nf-find-radios.vue' // 183
import nfSelect from './nf-find-select.vue' // 190
import nfCascader from './nf-find-cascaders.vue' // 200

export default {
  name: 'nf-find-item',
  components: {
    nfInput,
    nfNumber,
    nfDatetime,
    nfTime,
    nfChecks,
    nfRadios,
    nfSelect,
    nfCascader
  },
  props: {
    modelValue: [String, Number, Boolean, Array, Object, Date],
    meta: Object
  },
  methods: {
    myChange: function (value) {
      this.$emit('change', value)
      this.$emit('update:modelValue', value)
    },
    sendValue: function (value, colName, id) {
      // alert(colName)
      this.$emit('update:modelValue', value)
      this.$emit('getvalue', value, colName, id) // 返回给中间组件
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
