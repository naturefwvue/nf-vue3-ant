<template>
  <div class="components-input-demo-presuffix">
    <a-input
      :id="'id' + meta.controlId"
      :name="'c' + meta.controlId"
      :value="value"
      :autofocus="meta.autofocus"
      :disabled="meta.disabled"
      :readonly="meta.readonly"
      :placeholder="meta.placeholder"
      :title="meta.title"
      :maxlength="meta.maxlength"
      :autocomplete="meta.autocomplete"
      :key="'ckey_'+meta.controlId"
      size="small"
      @input="myInput"
      >
    </a-input>
  </div>
</template>

<script>
export default {
  name: 'nf-form-input',
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
          controlId: Number, // 编号，区别同一个表单里的其他控件
          colName: String, // 字段名称
          controlType: Number, // 用类型编号表示type
          isClear: { // 连续添加时是否恢复默认值
            type: Boolean,
            default: false
          },
          defaultValue: String, // 默认值
          autofocus: { // 是否自动获得焦点
            type: Boolean,
            default: false
          },
          required: { // 必填
            type: Boolean,
            default: true
          },
          disabled: {
            // 是否禁用
            type: Boolean,
            default: false
          },
          readonly: { // 只读
            type: Boolean,
            default: false
          },
          pattern: String, // 用正则做验证。
          placeholder: String,
          title: String, // 提示信息
          maxlength: Number, // 最大字符数
          autocomplete: { // off
            type: String,
            default: 'on'
          }
        }
      }
    }
  },
  data () {
    return {
      value: ''
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
      var returnValue = e.target.value
      var colName = this.meta.colName
      this.value = returnValue
      this.$emit('update:modelValue', returnValue) // 返回给调用者
      this.$emit('getvalue', returnValue, colName) // 返回给中间组件
      this.$emit('blur', returnValue) // 用于验证
    },
    // 通过属性，设置内部变量值，用于绑定控件
    resetVaule: function () {
      this.value = this.modelValue
    }
  }
}
</script>
