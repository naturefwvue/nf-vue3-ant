/** 数字 */
<template>
  <span>
    <!--查询方式-->
    <a-dropdown>
      <a class="ant-dropdown-link">{{kind}}</a>
      <template v-slot:overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item key="411">=</a-menu-item>
          <a-menu-item key="431">在</a-menu-item>
          <a-menu-item key="412">≠</a-menu-item>
          <a-menu-item key="413">></a-menu-item>
          <a-menu-item key="414">≥</a-menu-item>
          <a-menu-item key="415">&lt;</a-menu-item>
          <a-menu-item key="416">≤</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <!--查询条件-->
    <a-input-number :id="'c' + meta.controlId"
      :name="'c' + meta.controlId"
      :value="value"
      size="small"
      :placeholder="meta.placeholder"
      :title="meta.title"
      :min="meta.min"
      :max="meta.max"
      :step="meta.step"
      @change="myInput"
      :key="'ckey_'+meta.controlId"/>
    <a-input-number :id="'c2' + meta.controlId" v-show="kindkey === '431'"
        :name="'c2' + meta.controlId"
        :value="value2"
        size="small"
        :placeholder="meta.placeholder"
        :title="meta.title"
        :min="meta.min"
        :max="meta.max"
        :step="meta.step"
        @change="myInput2"
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
      value2: '',
      kind: '=',
      kindkey: '411',
      findKind: {
        411: '=', // 数字
        412: '≠',
        413: '>',
        414: '≥',
        415: '<',
        416: '≤',
        431: '在'
      }
    }
  },
  methods: {
    myInput: function (value) {
      this.value = value
      if (this.value.length > 0) {
        this.value = parseFloat(this.value)
      }
      this.send()
    },
    myInput2: function (value) {
      this.value2 = value
      if (this.value2.length > 0) {
        this.value2 = parseFloat(this.value2)
      }
      this.send()
    },
    handleMenuClick (e) {
      this.kindkey = e.key
      this.kind = this.findKind[e.key]
      this.send()
    },
    send: function () {
      var returnValue = []
      returnValue.push(this.kindkey)
      returnValue.push(this.value)
      if (this.kindkey === '431') {
        returnValue.push(this.value2)
      }
      var colName = this.meta.colName
      this.$emit('update:modelValue', returnValue) // 返回给调用者
      this.$emit('getvalue', returnValue, colName) // 返回给中间组件
    }
  }
}
</script>
