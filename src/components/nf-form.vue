<!--表单控件-->
<template>
  <div style="width:500px;float: left;line-height:50px;">
    <a-form style="line-height:50px;"
      ref="ruleForm"
      :model="formValue"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item v-for="(meta, index) in arrMeta" style="margin-bottom: 4px"
          :key="'form'+index"
          :ref="meta.colName"
          :label="meta.title"
          :name="meta.colName">
        <nfInput v-model="formValue[meta.colName]" :meta="meta" @getvalue="getvalue"/>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">
          Create
        </a-button>
        <a-button style="margin-left: 10px;" @click="resetForm">
          Reset
        </a-button>
      </a-form-item>
    </a-form>
</div>
<div v-show="false" align="left" style="line-height:30px;background-color:#343434;height:600px;width:300px;float:left;">
    实体类：{<br>
    <template style="line-height:20px;" v-for="(item, key, index) in formValue" :key="index">
      <template v-if="typeof item === 'number' && !isNaN(item)">&nbsp;&nbsp;"{{key}}": {{item}}, <br></template>
      <template v-if="typeof item === 'string'">&nbsp;&nbsp;"{{key}}": "{{item}}", <br></template>
      <template v-if="typeof(item) ==='boolean'">&nbsp;&nbsp;"{{key}}": {{item}}, <br></template>
      <template v-if="typeof(item) ==='object'">
        &nbsp;&nbsp;"{{key}}": [<br>
        <template v-for="(opt, index) in item" :key="'opt'+index">&nbsp;&nbsp;&nbsp;&nbsp;{{opt}}, <br></template>
          &nbsp;&nbsp;]
        </template>
    </template>
    }
  </div>
</template>

<script>
import { ref } from 'vue'
import nfInput from './nf-form/nf-form-item.vue'
// import { UserOutlined, DownOutlined } from '@ant-design/icons-vue'

export default {
  name: 'nf-form',
  components: {
    nfInput
  },
  model: {
    prop: 'modelValue', // 外部属性，返回表单实体类
    isReload: false,
    event: 'input'
  },
  props: {
    modelValue: Object,
    isReload: Boolean,
    meta: {
      type: Object,
      default: () => {
        return {
          formMeta: { // 控件自己的属性
            state: 'add', // 表单状态，add、update、show
            allForm: [], // 需要的控件的ID
            colCount: Number, // 一行几列
            customer: Object // 个性化方案
          },
          formItem: Object, // 成员控件的meta
          rules: {} // 表单验证规则
        }
      }
    }
  },
  data () { // 内部属性
    return {
      formValue: {}, // 绑定控件的值
      returnValue: {}, // 返回给上层的实体类，和modelValue对应
      arrMeta: [], // 二维数组存放控件的meta，便于调整顺序
      labelCol: { span: 4 }, // 标签宽度，需要调整
      wrapperCol: { span: 18 }, // 字段宽度，需要调整
      other: '',
      rules: { // 表单验证规则
      }
    }
  },
  created: function () { // 初始化
    // 把表单子控件转换为多行多列的形式
    this.getFormTable()
  },
  watch: {
    isReload: function (newValue, oldVale) {
      this.getFormTable()
    }
  },
  methods: {
    // 把字段meta变成数组的形式，便于v-for
    getFormTable: function () {
      var flag = this.meta.formMeta.name
      this.formValue = {}
      this.arrMeta = []
      for (var index in this.meta.formMeta.allForm) { // 遍历子控件的meta的key的数组，便于排序
        var key = this.meta.formMeta.allForm[index] // 数组里面的meta的key
        var meta = this.meta.formItem[key] // 子控件的meta
        this.arrMeta.push(meta) // 把字段放入数组，便于循环
        this.formValue[meta.colName] = '' // 创建实体类
      }
    },
    // 获取控件值，向上返回
    getvalue: function (value, colName) {
      this.formValue[colName] = value
      // alert(this.value[colName])
      this.$emit('update:modelValue', this.formValue) // 返回给调用者
      this.$emit('getvalue', this.formValue, colName) // 返回给中间组件
    }
  }
}
</script>
