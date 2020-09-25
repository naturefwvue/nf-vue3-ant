<template>
  <div style="width:500px;float: left;">
    <a-form
      ref="ruleForm"
      :rules="rules"
      :model="formItem"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item v-for="(meta, index) in arrMeta"
          :key="'form'+index"
          :ref="meta.colName"
          :label="meta.title"
          :name="meta.colName">
        <nfInput v-model="formValue[meta.colName]"
          :meta="meta" @blur="myblur" />
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
<div align="left" style="line-height:30px;background-color:#343434;height:600px;width:400px;float:left;">
    实体类：{{arrMeta}} <br> {<br>
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
    event: 'input'
  },
  props: {
    modelValue: Object,
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
      value1: '',
      formValue: {}, // 绑定控件的值
      returnValue: {}, // 返回给上层的实体类，和modelValue对应
      arrMeta: [], // 二维数组存放控件的meta，便于调整顺序
      formMeta: { // 控件自己的属性
        state: 'add', // 表单状态，add、update、show
        allForm: [], // 需要的控件的ID
        colCount: Number, // 一行几列
        customer: Object // 个性化方案
      },
      formItem: Object, // 成员控件的meta
      labelCol: { span: 4 }, // 标签宽度，需要调整
      wrapperCol: { span: 18 }, // 字段宽度，需要调整
      other: '',
      rules: { // 表单验证规则
        companyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
          { min: 3, max: 5, message: '字数在3-5之间', trigger: 'blur' }
        ],
        companyCode: [{ required: true, message: '请输入邮编', trigger: 'blur' }],
        createDate: [
          { required: true, message: '请选择日期', trigger: 'change', type: 'string' }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change'
          }
        ],
        resource: [
          { required: true, message: 'Please select activity resource', trigger: 'change' }
        ],
        desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }]
      }
    }
  },
  created: function () { // 初始化
    // 把表单子控件转换为多行多列的形式
    alert('create')
    this.getFormTable()
  },
  beforeUpdate: function () { // 外部修改属性值，需要重新计算
    // 把表单子控件转换为多行多列的形式
    alert('beforeUpdate')
    // this.getFormTable()
  },
  methods: {
    // 把字段meta变成数组的形式，便于v-for
    getFormTable: function () {
      alert(this.meta.formMeta.allForm)
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
      this.value[colName] = value
      // alert(this.value[colName])
      this.value._flag = !this.value._flag
      // this.returnValue[colName] = value
      this.$emit('update:modelValue', this.value) // 返回给调用者
      this.$emit('getvalue', this.value, colName) // 返回给中间组件
    },
    // 返回查询子控件的meta
    getMetaColname: function (td) {
      return this.meta.formItem[td].colName
    },
    // 判断控件是否循环完毕
    isEnd: function (tr, td) {
      var count = (tr - 1) * this.meta.formMeta.colCount + (td - 1)
      // alert(tdCount.value)
      return count >= this.meta.formMeta.allForm.length
    }
  }
}
</script>
