/** 编辑多记录的组件 */
<template>
  <table >
    <tr><td colspan="2">行数： <nfNumber v-model="optionNumber" :modelValue="optionNumber" @getvalue="sendValue" :meta="metaNumber"/> </td></tr>
    <tr><td>value</td><td>title</td></tr>
    <tr v-for="(item, index) in reOptions" :key="index">
      <td>
        <nfNumber :modelValue="item.value" @getvalue="sendValue" :meta="metaValue"/>
      </td>
      <td>
        <nfInput v-model="item.title" @input="myInput" :meta="metaTitle"/>
      </td>
    </tr>
  </table>
</template>

<script>
import nfInput from './nf-form-input.vue' // 100-107
import nfNumber from './nf-form-number.vue' // 131,132
// import nfCheck from '@/components/nf-form-check.vue' // 180
// import nfChecks from '@/components/nf-form-checks.vue' // 182
// import nfRadios from '@/components/nf-form-radios.vue' // 183

export default {
  name: 'nf-form-inputmore',
  components: {
    nfInput,
    // nfCheck,
    // nfChecks,
    // nfRadios,
    nfNumber
  },
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
          controlId: Number // 编号，区别同一个表单里的其他控件
        }
      }
    }
  },
  data: () => {
    return {
      // 行数的配置信息
      metaNumber: {
        controlId: 1101,
        controlType: 131,
        colName: '行数',
        min: 0,
        max: 200,
        step: 1
      },
      // value的配置信息
      metaValue: {
        controlId: 1102,
        controlType: 101,
        colName: '值',
        size: 4
      },
      // 标题的配置信息
      metaTitle: {
        controlId: 1103,
        controlType: 101,
        colName: '文字',
        size: 10
      },
      // 备选项的值
      optionNumber: 0,
      reOptions: [],
      type: {
        100: 'textarea' // 多行文本框
      }
    }
  },
  watch: {
    // 根据数量变化重新设置数组
    optionNumber: function (val) {
      this.reOptions = []
      for (var i = 0; i < parseInt(val); i++) {
        this.reOptions.push({
          value: i + 1,
          title: ''
        })
      }
    }
  },
  methods: {
    myInput: function (e) {
      var returnValue = this.reOptions
      var colName = this.meta.colName
      this.$emit('update:modelValue', returnValue) // 返回给调用者
      this.$emit('getvalue', returnValue, colName) // 返回给中间组件
    }
  }
}
</script>
