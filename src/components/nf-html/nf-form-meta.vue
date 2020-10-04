/** 提供meta工具需要的json */
<template>
  <span>
    <input type="text" :value="modelValue" @input="myInput">
  </span>
</template>

<script>

export default {
  name: 'nf-meta-help',
  model: {
    prop: 'modelValue',
    event: 'input'
  },
  props: {
    modelValue: Object,
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
          class: String, // 'cssTxt input_t1'
          title: String // 提示信息
        }
      }
    }
  },
  data: function () {
    return {
      aa: '111'
    }
  },
  created: function () {
    alert('created:' + this.aa)
    this.$emit('update:modelValue', '返回的json') // 返回给调用者
  },
  methods: {
    myInput: function (e) {
      alert(this.aa)
      // alert('属性：' + modelValue)
      this.$emit('update:modelValue', this.aa) // 返回给调用者
    }
  }
}
</script>
