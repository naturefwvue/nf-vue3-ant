/**多选组，返回逗号连接的value值 */
<template>
<div>
  <div style="float:left;width:90px;" v-for="item in meta.optionList" :key="'lblchks'+item.value">
    <a-checkbox :id="'c'+meta.controlId"
      type="checkbox"
      :name="'c'+meta.controlId"
      :class="meta.class"
      :value="item.value"
      :checked="(','+value+',').indexOf(','+item.value+',') != -1"
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
  name: 'nf-find-checks',
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
          max: { // 最多选择数量，0表示不限制
            type: Number,
            default: 0
          },
          title: String // 中文名称
        }
      }
    }
  },
  data: function () {
    return {
      optionsChecks: {}
    }
  },
  watch: {
    modelValue: function (newValue, oldValue) {
      // alert(newValue)
      this.value = ''
      if (typeof newValue === 'object') {
        if (newValue.length === 2) {
          this.value = newValue[1]
        }
      }
    }
  },
  methods: {
    myCheck: function (e) {
      var value = e.target.value
      var colName = this.meta.colName
      var id = this.meta.controlId
      if (e.target.checked) { // 选中，记录
        this.optionsChecks[value] = 1
      } else { // 没选，删除
        delete this.optionsChecks[value]
      }
      console.log(this.optionsChecks)

      var arr = []
      for (var key in this.optionsChecks) {
        arr.push(key)
      }
      var returnValue = []
      // in 的查询方式
      returnValue.push(433)
      returnValue.push(arr.join(','))
      this.$emit('update:modelValue', returnValue)
      this.$emit('getvalue', returnValue, colName, id)
    }
  }
}
</script>
