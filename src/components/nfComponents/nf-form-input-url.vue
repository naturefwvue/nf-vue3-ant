<template>
    <div style="margin-bottom: 16px">
      <a-input v-model:value="value">
        <template v-slot:addonBefore>
          <a-select v-model:value="http" style="width: 90px">
            <a-select-option value="Http://">
              Http://
            </a-select-option>
            <a-select-option value="Https://">
              Https://
            </a-select-option>
          </a-select>
        </template>
      </a-input>
    </div>
</template>

<script>
export default {
  name: 'nf-form-input-url',
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
          readonly: { // 只读
            type: Boolean,
            default: false
          },
          pattern: String, // 用正则做验证。
          class: String, // 'cssTxt input_t1'
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
      value: 'mysite',
      http: 'Http://',
      com: '.com'
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
    this.value = this.modelValue
  },
  methods: {
    myInput: function (e) {
      var returnValue = this.value
      var colName = this.meta.colName // event.target.getAttribute('colname')
      this.$emit('update:modelValue', returnValue) // 返回给调用者
      this.$emit('getvalue', returnValue, colName) // 返回给中间组件
    }
  }
}
</script>
