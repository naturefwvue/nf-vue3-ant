/** 数字和滑块 */
<template>
  <div class="ant-input-number-input-wrap">
    <input :id="'c' + meta.controlId"
    :type="type[meta.controlType]"
    :name="'c' + meta.controlId"
    :value="modelValue"
    :disabled="meta.disabled"
    :readonly="meta.readonly"
    :class="meta.class"
    :placeholder="meta.placeholder"
    :title="meta.title"
    :min="meta.min"
    :max="meta.max"
    :step="meta.step"
    :autocomplete="meta.autocomplete"
    @input="myInput"
    :key="'ckey_'+meta.controlId">
  </div>
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
      type: {
        131: 'number', // 数字
        132: 'range' // 滑块
      }
    }
  },
  methods: {
    myInput: function (e) {
      var returnValue = event.target.value
      if (returnValue.length > 0) {
        returnValue = parseFloat(returnValue)
      }
      var colName = this.meta.colName // event.target.getAttribute('colname')
      this.$emit('update:modelValue', returnValue) // 返回给调用者
      this.$emit('getvalue', returnValue, colName) // 返回给中间组件
    }
  }
}
</script>
