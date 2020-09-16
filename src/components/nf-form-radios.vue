/** 多选组，返回选择的value */
<template>
  <span>
    <label role="radio" v-for="item in meta.optionList" :key="item.id">
      <input type="radio"
        :class="meta.class"
        :checked="item.check"
        :name="'c'+meta.controlId"
        :value="item.value"
        :disabled="meta.disabled"
        @input="myInput"
      >
      <span>{{item.title}}</span>
    </label>
  </span>
</template>

<script>

export default {
  name: 'nf-form-radio',
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
          class: String,
          title: String // 中文名称
        }
      }
    }
  },
  methods: {
    myInput: function (e) {
      var returnValue = event.target.value
      var colName = this.meta.colName
      this.$emit('update:modelValue', returnValue) // 返回给调用者
      this.$emit('getvalue', returnValue, colName) // 返回给中间组件
    }
  }
}
</script>
