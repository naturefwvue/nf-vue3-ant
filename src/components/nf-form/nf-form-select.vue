/** 下拉列表框，多选的那个再考虑考虑 */
<template>
  <a-select :id="'c'+meta.controlId"  style="width:98%"
    :name="'c'+meta.controlId"
    :disabled="meta.disabled"
    :placeholder="meta.placeholder"
    size="small"
    @change="myInput">
      <a-select-option v-for="(item,index) in meta.optionList" :key="index"
        :value="item.value"
        :checked="item.value == modelValue"
        >
          {{item.title}}
      </a-select-option>
    </a-select>
</template>

<script>

export default {
  name: 'nf-form-select',
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    modelValue: String,
    meta: {
      type: Object,
      default: () => {
        return {
          controlId: Number, // 编号，区别同一个表单里的其他控件
          controlType: Number, // 用类型编号表示type
          colName: String, // 字段名称
          optionList: {
            type: Object,
            default: () => [{
              value: [String, Number],
              title: String
            }]
          },
          isClear: { // isClear  连续添加时是否恢复默认值
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
          max: { // 最多选择数量，0表示不限制
            type: Number,
            default: 0
          },
          placeholder: String,
          class: String,
          title: String // 中文名称
        }
      }
    }
  },
  data () {
    window.test = this
    return {
      value: ''
    }
  },
  methods: {
    focus () {
      console.log('focus')
    },
    myInput: function (value) {
      // alert(value)
      var returnValue = value
      var colName = this.meta.colName
      this.value = returnValue
      this.$emit('update:modelValue', returnValue) // 返回给调用者
      this.$emit('getvalue', returnValue, colName) // 返回给中间组件
      this.$emit('change', returnValue) // 返回给中间组件
    }
  }
}
</script>
