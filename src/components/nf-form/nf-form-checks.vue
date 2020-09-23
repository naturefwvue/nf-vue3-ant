/**多选组，返回逗号连接的value值 */
<template>
<div>
  <div style="float:left;width:90px;" v-for="item in meta.optionList" :key="'lblchks'+item.value">
    <a-checkbox :id="'c'+meta.controlId"
      type="checkbox"
      :name="'c'+meta.controlId"
      :class="meta.class"
      :value="item.value"
      :checked="(','+modelValue+',').indexOf(','+item.value+',') != -1"
      :disabled="meta.disabled"
      :autoFocus="meta.autofocus"
      :key="'chks'+item.value"
      @change="myCheck"
    >
      {{item.title}}
    </a-checkbox>
  </div>
</div>
</template>

<script>

export default {
  name: 'nf-form-checks',
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
          class: String, // 'cssTxt input_t1'
          title: String // 中文名称
        }
      }
    }
  },
  data: function () {
    return {
      value: '',
      optionsChecks: {}
    }
  },
  methods: {
    myCheck: function (e) {
      var returnValue = e.target.value
      var colName = this.meta.colName // event.target.getAttribute('colname')
      if (e.target.checked) {
        // 检查是否超过最大限制。
        if (this.meta.max > 0) {
          if (this.modelValue.split(',').length >= this.meta.max) {
            alert('超过了最大选择数量')
            e.target.checked = false
            return
          }
        }
        this.optionsChecks[returnValue] = 1
      } else {
        delete this.optionsChecks[returnValue]
      }
      console.log(this.optionsChecks)

      var arr = []
      for (var key in this.optionsChecks) {
        arr.push(key)
      }
      returnValue = arr.join(',')
      this.$emit('update:modelValue', returnValue)
      this.$emit('getvalue', returnValue, colName)
    }
  }
}
</script>
