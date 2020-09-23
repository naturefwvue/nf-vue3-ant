/** 日期、时间、年月、周的选择 */
<template>
  <span :title="meta.title">
    <a-date-picker v-if="meta.controlType === 140"
      :id="'c' + meta.controlId"
      :name="'c' + meta.controlId"
      :value="modelValue"
      :disabled="meta.disabled"
      @change="myInput"
    :key="'ckey_' + meta.controlId" />
    <a-date-picker v-else-if="meta.controlType === 141"
      show-time
      :id="'c' + meta.controlId"
      :name="'c' + meta.controlId"
      :disabled="meta.disabled"
      @change="myInput"
    :key="'ckey_' + meta.controlId" />
    <a-time-picker v-else-if="meta.controlType === 142"
      :id="'c' + meta.controlId"
      :name="'c' + meta.controlId"
      :disabled="meta.disabled"
      @change="myInput"
    :key="'ckey_' + meta.controlId" />
    <a-month-picker v-else-if="meta.controlType === 143"
      :id="'c' + meta.controlId"
      :name="'c' + meta.controlId"
      :disabled="meta.disabled"
      @change="myInput"
    :key="'ckey_' + meta.controlId" />
    <a-week-picker v-else-if="meta.controlType === 144"
      :id="'c' + meta.controlId"
      :name="'c' + meta.controlId"
      :disabled="meta.disabled"
      @change="myInput"
    :key="'ckey_' + meta.controlId" />
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
      value: '',
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
    myInput: function (date, dateString) {
      var returnValue = dateString
      // alert(date)
      // alert(dateString)
      var colName = this.meta.colName
      this.value = returnValue
      this.$emit('update:modelValue', returnValue) // 返回给调用者
      this.$emit('getvalue', returnValue, colName) // 返回给中间组件
    }
  }
}
</script>
