/** 数字 */
<template>
  <span>
    <a-dropdown>
      <a class="ant-dropdown-link">{{kind}}</a>
      <template v-slot:overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item key="401">=</a-menu-item>
          <a-menu-item key="402">≠</a-menu-item>
          <a-menu-item key="403">含</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <a-input-number :id="'c' + meta.controlId"
      :name="'c' + meta.controlId"
      :value="modelValue"
      size="small"
      :placeholder="meta.placeholder"
      :title="meta.title"
      :min="meta.min"
      :max="meta.max"
      :step="meta.step"
      @change="myInput"
      :key="'ckey_'+meta.controlId"/>
  </span>
</template>

<script>

export default {
  name: 'nf-find-number',
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
          // 通用
          controlId: Number, // 编号，区别同一个表单里的其他控件
          colName: String, // 中文名称
          controlType: Number, // 用类型编号表示type
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
          min: Number, // （允许）最小值
          max: Number, // （允许）最小值
          step: Number, // 步长，每次加减的数值间隔
          autocomplete: { // off
            type: String,
            default: 'on'
          }
        }
      }
    }
  },
  data: () => {
    return {
      value: '',
      kind: '包含',
      findKind: {
        401: '=', // 字符串
        402: '≠',
        403: '包含',
        404: '不包含',
        405: '起始',
        406: '结束',
        411: '=', // 数字
        412: '≠',
        413: '>',
        414: '≥',
        415: '<',
        416: '≤',
        421: '=', // 日期
        422: '≠',
        423: '>',
        424: '≥',
        425: '<',
        426: '≤',
        431: '在',
        432: '在',
        433: '在'
      },
      type: {
        131: 'number', // 数字
        132: 'range' // 滑块
      }
    }
  },
  methods: {
    myInput: function (value) {
      var returnValue = value
      if (returnValue.length > 0) {
        returnValue = parseFloat(returnValue)
      }
      var colName = this.meta.colName // event.target.getAttribute('colname')
      this.$emit('update:modelValue', returnValue) // 返回给调用者
      this.$emit('getvalue', returnValue, colName) // 返回给中间组件
    },
    handleMenuClick (e) {
      this.kind = this.findKind[e.key]
      console.log('click', e)
    }
  }
}
</script>
