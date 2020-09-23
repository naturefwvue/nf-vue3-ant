/**勾选框，返回 true 或 false */
<template>
  <a-checkbox v-for="item in meta.optionList"
    :id="'c'+meta.controlId"
    :name="'c'+meta.controlId"
    :key="'chks'+item.value"
    :class="meta.class"
    :value="item.value"
    :disabled="meta.disabled"
    :autoFocus="meta.autofocus"
    :checked="value === 'true'||modelValue"
    @change="myInput">
      {{item.title}}
  </a-checkbox>
</template>

<script>

export default {
  name: 'nf-form-check',
  model: {
    prop: 'modelValue',
    event: 'input'
  },
  props: {
    modelValue: Boolean,
    meta: {
      type: Object,
      default: () => {
        return {
          controlId: Number, // 编号，区别同一个表单里的其他控件
          controlType: Number, // 用类型编号表示type
          colName: String, // 字段名称
          isClear: { // isClear  连续添加时是否恢复默认值
            type: Boolean,
            default: false
          },
          disabled: { // 是否禁用
            type: Boolean,
            default: false
          },
          autofocus: { // 是否自动获得焦点
            type: Boolean,
            default: false
          },
          class: String,
          title: String // 中文名
        }
      }
    }
  },
  data: () => {
    return {
      value: '',
      autosize: { minRows: 2, maxRows: 6 }
    }
  },
  created: function () {
    this.resetVaule()
  },
  beforeUpdate: function () { // 外部修改属性值，需要重新计算
    this.resetVaule()
  },
  methods: {
    myInput: function (e) {
      var returnValue = event.target.checked
      var colName = this.meta.colName
      this.value = returnValue
      this.$emit('update:modelValue', returnValue) // 返回给调用者
      this.$emit('getvalue', returnValue, colName) // 返回给中间组件
    },
    // 通过属性，设置内部变量值，用于绑定控件
    resetVaule: function () {
      this.value = this.modelValue
      if (typeof this.meta.rows !== 'undefined') {
        this.autosize.minRows = this.meta.min
      }
      if (typeof this.meta.cols !== 'undefined') {
        this.autosize.maxRows = this.meta.max
      }
    }
  }
}
</script>
