/** 日期、时间、年月、周的选择 */
<template>
  <span>
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
    @input="myInput"
    :key="'ckey_' + meta.controlId">
  </span>
</template>

<script>

export default {
  name: 'nf-form-datetime',
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
          min: String, // （允许）最小值 月和日要两位
          max: String, // （允许）最大值 月和日要两位
          step: Number // 步长，每次加减的数值间隔
        }
      }
    }
  },
  data: () => {
    return {
      type: {
        140: 'date', // 日期
        141: 'datetime-local', // 日期时间
        142: 'time', // 时间
        143: 'month', // 年月
        144: 'week' // 年周
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
