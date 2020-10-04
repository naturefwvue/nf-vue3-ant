/**勾选框，返回true和false */
<template>
  <span>
    <label role="checkbox" v-for="item in meta.optionList"
      :class="meta.class"
      :key="'lblchks'+item.value">
        <input :id="'c'+meta.controlId"
          type="checkbox"
          :name="'c'+meta.controlId"
          :class="meta.class"
          :value="item.value"
          :checked="modelValue === 'true'||modelValue"
          :disabled="meta.disabled"
          :autofocus="meta.autofocus"
          :key="'chks'+item.value"
          @input="myInput"
        >
        <span>{{item.title}}</span>
    </label>
  </span>
</template>

<script>

export default {
  name: 'nf-form-check',
  model: {
    prop: 'modelValue',
    event: 'input'
  },
  props: {
    modelValue: Boolean,
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
          autofocus: { // 是否自动获得焦点
            type: Boolean,
            default: false
          },
          class: String,
          title: String // 中文名
        }
      }
    }
  },
  methods: {
    myInput: function (e) {
      var returnValue = event.target.checked
      var colName = this.meta.colName
      this.$emit('update:modelValue', returnValue) // 返回给调用者
      this.$emit('getvalue', returnValue, colName) // 返回给中间组件
    }
  }
}
</script>
