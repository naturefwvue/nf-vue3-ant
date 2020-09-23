/** 多行文本框 */
<template>
  <div style="margin: 24px 0" >
    <a-textarea
      :id="'c' + meta.controlId"
      :name="'c' + meta.controlId"
      :value="value"
      :placeholder="meta.placeholder"
      :disabled="meta.disabled"
      :readonly="meta.readonly"
      :class="meta.class"
      :title="meta.title"
      :auto-size="autosize"
      @pressEnter="myPressEnter"
    />
  </div>
</template>

<script>

export default {
  name: 'nf-form-textarea',
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
          colName: String, // 字段名称
          controlType: Number, // 用类型编号表示type
          isClear: { // isClear  连续添加时是否恢复默认值
            type: Boolean,
            default: true
          },
          defaultValue: String, // 默认值
          autofocus: { // 是否自动获得焦点
            type: Boolean,
            default: false
          },
          disabled: { // 是否禁用
            type: Boolean,
            default: false
          },
          required: { // 必填
            type: Boolean,
            default: true
          },
          readonly: { // 只读
            type: Boolean,
            default: false
          },
          pattern: String, // 用正则做验证。
          class: String, // 'cssTxt input_t1'
          placeholder: String, // 内部提示
          title: String, // 提示信息
          // 多行文本
          rows: Number, // 行数
          cols: Number, // 列数
          maxlength: Number // 最大字符数
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
  watch: {
    value: function (val) {
      var colName = this.meta.colName
      this.$emit('update:modelValue', val) // 返回给调用者
      this.$emit('getvalue', val, colName) // 返回给中间组件
    }
  },
  created: function () {
    this.resetVaule()
  },
  beforeUpdate: function () { // 外部修改属性值，需要重新计算
    this.resetVaule()
  },
  methods: {
    myPressEnter: function (e) {
      var returnValue = event.target.value
      var colName = this.meta.colName
      this.value = returnValue
      this.$emit('pressenter', returnValue, colName) // 返回给中间组件
    },
    // 通过属性，设置内部变量值，用于绑定控件
    resetVaule: function () {
      this.value = this.modelValue
      if (typeof this.meta.rows !== 'undefined') {
        this.autosize.minRows = this.meta.rows
      }
      if (typeof this.meta.cols !== 'undefined') {
        this.autosize.maxRows = this.meta.cols
      }
    }
  }
}
</script>
