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
      @change="myInput"
      >
        <template v-slot:addonBefore>
          <a-dropdown>
            <a class="ant-dropdown-link">{{kind}}</a>
            <template v-slot:overlay>
              <a-menu @click="changeFindType">
                <a-menu-item v-for="item in meta.findKindList" :key="item" >{{findKind[item]}}</a-menu-item>
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
        406: '结束'
      }
    }
  },
  watch: {
    // 监控属性变化，重新赋值
    modelValue: function (newValue, oldValue) {
      // alert(newValue)
      this.value = ''
      if (typeof newValue === 'object') {
        if (newValue.length === 2) {
          this.kindkey = newValue[0]
          this.kind = this.findKind[this.kindkey] // 设置查询方式
          this.value = newValue[1] // 设置查询关键字
        }
      }
    }
  },
  methods: {
    myInput: function (e) {
      this.value = e.target.value
      this.sendQuery()
    },
    // 更改查询方式
    changeFindType (e) {
      this.kindkey = e.key
      this.kind = this.findKind[e.key]
      console.log('click', e)
      this.sendQuery()
    },
    // 向上提交查询字段、查询方式和查询关键字。
    sendQuery: function () {
      var returnValue = [] // 格式：[findType,query]
      returnValue.push(this.kindkey)
      returnValue.push(this.value)
      var colName = this.meta.colName
      var id = this.meta.controlId
      this.$emit('update:modelValue', returnValue) // 返回给调用者，修改v-model属性
      this.$emit('getvalue', returnValue, colName, id) // 返回给中间组件
    }
  }
}
</script>
