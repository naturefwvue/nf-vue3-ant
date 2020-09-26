<template>
  <div style="width:160px;" class="components-input-demo-presuffix">
    <a-input
      :id="'id' + meta.controlId"
      :name="'c' + meta.controlId"
      :value="value"
      :placeholder="meta.placeholder"
      :title="meta.title"
      :maxlength="meta.maxlength"
      :autocomplete="meta.autocomplete"
      :key="'ckey_'+meta.controlId"
      size="small"
      @input="myInput"
      >
        <template v-slot:addonBefore>
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
        </template>
    </a-input>
  </div>
</template>

<script>

export default {
  name: 'nf-find-input',
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
          colName: String, // 字段名称
          controlType: Number, // 用类型编号表示type
          placeholder: String,
          title: String, // 提示信息
          maxlength: Number, // 最大字符数
          autocomplete: { // off
            type: String,
            default: 'on'
          }
        }
      }
    }
  },
  data () {
    return {
      value: '',
      kind: '含',
      kindkey: '403',
      findKind: {
        401: '=', // 字符串
        402: '≠',
        403: '含',
        404: '不含',
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
      }
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
    myInput: function (e) {
      this.value = e.target.value
      this.send()
    },
    handleButtonClick (e) {
      console.log('click left button', e)
    },
    handleMenuClick (e) {
      this.kindkey = e.key
      this.kind = this.findKind[e.key]
      console.log('click', e)
      this.send()
    },
    send: function () {
      var returnValue = []
      returnValue.push(this.kindkey)
      returnValue.push(this.value)
      var colName = this.meta.colName
      this.$emit('update:modelValue', returnValue) // 返回给调用者
      this.$emit('getvalue', returnValue, colName) // 返回给中间组件
    }
  }
}
</script>
