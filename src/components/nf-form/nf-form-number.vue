/** 数字 */
<template>
  <span>
    <a-input-number :id="'c' + meta.controlId"
      :name="'c' + meta.controlId"
      :value="value"
      :autoFocus="meta.autoFocus"
      :disabled="meta.disabled"
      size="small"
      :readonly="meta.readonly"
      :class="meta.class"
      :placeholder="meta.placeholder"
      :title="meta.title"
      :min="meta.min"
      :max="meta.max"
      :step="meta.step"
      :autocomplete="meta.autocomplete"
      @change="myInput"
    :key="'ckey_'+meta.controlId"/>
  </span>
</template>

<script>

export default {
  name: 'nf-form-number',
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
          // 通用
          controlId: Number, // 编号，区别同一个表单里的其他控件
          colName: String, // 中文名称
          controlType: Number, // 用类型编号表示type
          isClear: {
            // isClear  连续添加时是否恢复默认值
            type: Boolean,
            default: false
          },
          defaultValue: String, // 默认值
          autofocus: { // 是否自动获得焦点
            type: Boolean,
            default: false
          },
          disabled: {
            // 是否禁用
            type: Boolean,
            default: false
          },
          required: { // 必填
            type: Boolean,
            default: true
          },
          pattern: String, // 用正则做验证。
          class: String, // 'cssTxt input_t1'
          placeholder: String,
          title: String, // 提示信息
          readonly: { // 只读
            type: Boolean,
            default: false
          },
          min: Number, // （允许）最小值
          max: Number, // （允许）最小值
          step: Number, // 步长，每次加减的数值间隔
          autocomplete: { // off
            type: String,
            default: 'on'
          }
        }
      }
    }
  },
  data: () => {
    return {
      value: '',
      type: {
        131: 'number', // 数字
        132: 'range' // 滑块
      }
    }
  },
  created: function () {
    this.resetVaule()
  },
  beforeUpdate: function () { // 外部修改属性值，需要重新计算
    this.resetVaule()
  },
  methods: {
    myInput: function (value) {
      var returnValue = value
      if (returnValue.length > 0) {
        returnValue = parseFloat(returnValue)
      }
      this.value = returnValue
      var colName = this.meta.colName // event.target.getAttribute('colname')
      this.$emit('update:modelValue', returnValue) // 返回给调用者
      this.$emit('getvalue', returnValue, colName) // 返回给中间组件
    },
    // 通过属性，设置内部变量值，用于绑定控件
    resetVaule: function () {
      this.value = this.modelValue
    }
  }
}
</script>
