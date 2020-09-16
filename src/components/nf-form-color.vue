<template>
  <span>
    <input :id="'c' + meta.controlId"
      :type="type[meta.controlType]"
      :name="'c' + meta.controlId"
      :value="modelValue"
      :disabled="meta.disabled"
      :readonly="meta.readonly"
      :class="meta.class"
      :title="meta.title"
      @input="myInput"
      :key="'ckey_'+meta.controlId">
  </span>
</template>

<script>

export default {
  name: 'nf-form-color',
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
          colName: String, // 中文名称
          isClear: {
            // isClear  连续添加时是否恢复默认值
            type: Boolean,
            default: false
          },
          // 通用
          disabled: {
            // 是否禁用
            type: Boolean,
            default: false
          },
          required: { // 必填
            type: Boolean,
            default: true
          },
          class: String, // 'cssTxt input_t1'
          title: String // 提示信息
        }
      }
    }
  },
  data: () => {
    return {
      type: {
        160: 'color'
      }
    }
  },
  methods: {
    myInput: function (e) {
      var returnValue = event.target.value
      var colName = this.meta.colName // event.target.getAttribute('colname')
      this.$emit('update:modelValue', returnValue) // 返回给调用者
      this.$emit('getvalue', returnValue, colName) // 返回给中间组件
    }
  }
}
</script>
