/** 下拉列表框，多选的那个再考虑考虑 */
<template>
  <a-select :id="'c'+meta.controlId"
    :name="'c'+meta.controlId"
    :class="meta.class"
    :multiple="meta.controlType === 191"
    :disabled="meta.disabled"
    @change="myInput"
    >
      <a-select-option
        v-for="(item,index) in meta.optionList"
        :key="index"
        :value="item.value"
        :selected="modelValue==item.value">
          {{item.title}}
      </a-select-option>
    </a-select>
</template>

<script>

export default {
  name: 'nf-form-select',
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
          required: { // 必填
            type: Boolean,
            default: true
          },
          max: { // 最多选择数量，0表示不限制
            type: Number,
            default: 0
          },
          class: String,
          title: String // 中文名称
        }
      }
    }
  },
  methods: {
    myInput: function (value) {
      var returnValue = value
      var colName = this.meta.colName
      this.$emit('update:modelValue', returnValue) // 返回给调用者
      this.$emit('getvalue', returnValue, colName) // 返回给中间组件
    }
  }
}
</script>
