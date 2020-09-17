/** 表单meta的辅助生成工具 */
<template>
  <div class="home">
    <div><h1>表单元素组件meta生成工具</h1></div>
    <div style="background-color:#dddddd;height:800px;width:400px;float:left;">
        <!--表单-->
        <div class="ant-table ant-table-body ant-table-default ant-table-bordered" >
            <table>
                <colgroup><col style="width: 25%; min-width: 25%;"><col>
                </colgroup>
                <tbody class="ant-table-tbody">
                    <tr v-for="(item,index) in trList" :key="index"><!--遍历需要的meta-->
                        <td align="right" style="padding:5px 5px;height:20px">{{helpMeta[item].colName}}：<!--名称-->
                        </td>
                        <td align="left" style="padding:5px 5px;height:20px"><!--控件-->
                            <nfInput :modelValue="modelValue[helpMeta[item].colName]" :meta="helpMeta[item]" @getvalue="sendValue"/>
                            {{helpMeta[item].title}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div align="left" style="padding:5px;background-color:#FFFFEE;height:600px;width:400px;float:left;">
        <!--效果和json-->
        效果：<nfInput v-model="testValue" :meta="baseMeta"  /> ——> {{testValue}}
        <div align="left" style="padding:15px;background-color:#FFEEEE;height:500px;width:400px;clear:both">
            "{{tmpMeta.controlId}}": {<br>
            <span v-for="(item, key, index) in tmpMeta" :key="index">
                <span v-if="typeof item === 'number' && !isNaN(item)">&nbsp;&nbsp;"{{key}}": {{item}}, <br></span>
                <span v-if="typeof item === 'string'">&nbsp;&nbsp;"{{key}}": "{{item}}", <br></span>
                <span v-if="typeof(item) ==='boolean'">&nbsp;&nbsp;"{{key}}": {{item}}, <br></span>
                <span v-if="typeof(item) ==='object'">
                &nbsp;&nbsp;"{{key}}": [<br>
                <span v-for="(opt, index) in item" :key="'opt'+index">&nbsp;&nbsp;&nbsp;&nbsp;{{opt}}, <br></span>
                &nbsp;&nbsp;]<br>
                </span>
            </span>
            }
        </div>
    </div>
    <div align="left" style="clear:both;background-color:#EEEEFF;height:600px;width:400px;clear:both">
    <!--标准属性-->
    {<br>
        <span v-for="(item, key, index) in baseMeta" :key="index">
        <span v-if="typeof item === 'number' && !isNaN(item)">&nbsp;&nbsp;"{{key}}": {{item}}, <br></span>
        <span v-if="typeof item === 'string'">&nbsp;&nbsp;"{{key}}": "{{item}}", <br></span>
        <span v-if="typeof(item) ==='boolean'">&nbsp;&nbsp;"{{key}}": {{item}}, <br></span>
        <span v-if="typeof(item) ==='object'">
            &nbsp;&nbsp;"{{key}}": [<br>
            <span v-for="(opt, index) in item" :key="'opt'+index">&nbsp;&nbsp;&nbsp;&nbsp;{{opt}}, <br></span>
            &nbsp;&nbsp;]
        </span>
        </span>
    }
    </div>
  </div>
</template>

<script>
import nfInput from '@/components/nfComponents/nf-form-item.vue'

export default {
  name: 'nf-meta-help',
  components: {
    // 注册组件
    nfInput
  },
  model: {
    prop: 'modelValue',
    event: 'input'
  },
  props: {
    modelValue: Object
  },
  data: function () {
    return {
      testValue: '测试',
      helpMeta: {}, // 创建表单需要的meta
      baseMeta: { // 固定属性的
        controlId: 101,
        colName: 'abc',
        controlType: 101,
        isClear: true,
        defaultValue: '',
        autofocus: false,
        disabled: false,
        required: true,
        readonly: false,
        pattern: '',
        class: '',
        placeholder: '请输入',
        title: '',
        autocomplete: 'on',
        size: 10,
        maxlength: 10,
        min: 0,
        max: 9999,
        step: 1,
        rows: 5,
        cols: 50,
        optionKey: 'beixuan',
        optionList: []
      },
      tmpMeta: {}, // 按需生成属性的
      trList: [103],
      type: {}, // 各种组件类型需要的属性ID数组
      numberList: []
    }
  },
  created: function () {
    // 读取json
    const json = require('@/components/help-meta-form.json')
    // 给data赋值
    this.helpMeta = json.helpMeta
    this.helpMeta[103].optionList = json.dic.ControlTypeList
    this.type = json.type
    this.trList = this.type[103] // 默认使用文本框的属性
  },
  mounted: function () {
    var meta = this.modelValue
    // 外部属性给内部固定模板赋值
    for (var key in meta) {
      this.baseMeta[key] = meta[key]
    }
    // 根据类型拼接临时meta
    this.tmpMeta = {}
    this.trList = this.type[meta.controlType] // 根据外部控件类型设置需要的属性
    for (var i = 0; i < this.trList.length; i += 1) {
      var item = this.trList[i]
      var key1 = this.helpMeta[item].colName
      this.tmpMeta[key1] = this.baseMeta[key1]
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!', this.form)
    },
    sendValue: function (value, colName) {
      // 根据字段名判断，设置需要的属性
      if (colName === 'controlType') {
        this.trList = this.type[value]
      }
      // 给对应属性赋值
      this.baseMeta[colName] = value

      // 根据类型拼接对象
      this.tmpMeta = {}
      for (var i = 0; i < this.trList.length; i += 1) {
        var item = this.trList[i]
        var key = this.helpMeta[item].colName
        this.tmpMeta[key] = this.baseMeta[key]
      }
      // 提交给父级组件
      this.$emit('update:modelValue', this.tmpMeta)
    }
  }
}
</script>
