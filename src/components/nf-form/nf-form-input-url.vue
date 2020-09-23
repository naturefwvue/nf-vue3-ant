<template>
    <div>
      <a-input :value="value" @input="myInput">
        <template v-slot:addonBefore>
          <a-select :value="http" style="width: 90px"  @change="myChange">
            <a-select-option value="http://">
              http://
            </a-select-option>
            <a-select-option value="https://">
              https://
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
      value: '',
      http: 'http://',
      com: '.com'
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
      this.value = e.target.value
      this.send()
    },
    myChange: function (value) {
      this.http = value
      this.send()
    },
    send: function () {
      var returnValue = this.http + this.value
      var colName = this.meta.colName
      this.$emit('update:modelValue', returnValue) // 返回给调用者
      this.$emit('getvalue', returnValue, colName) // 返回给中间组件
    },
    // 通过属性，设置内部变量值，用于绑定控件
    resetVaule: function () {
      var t = this.modelValue
      if (t.indexOf('http://') > -1) {
        this.http = 'http://'
        this.value = t.replace('http://', '')
      } else if (t.indexOf('https://') > -1) {
        this.http = 'https://'
        this.value = t.replace('https://', '')
      }
    }
  }
}
</script>
