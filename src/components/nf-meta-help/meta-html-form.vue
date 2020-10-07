<!--表单控件的维护-->
<!--表单和表单子控件-->
<!--输入字段，输出表单meta-->
<template>
  <div style="width:300px;float: left;" class="ant-table ant-table-body ant-table-default ant-table-bordered" >
    <table role="all">
    <tbody class="ant-table-tbody">
      <tr >
        <td align="right">列数：{{formMeta.colCount}}</td>
        <td><nfInput v-model="formMeta.colCount" :meta="platFormMeta[101]"/></td>
      </tr>
    </tbody>
    </table>
  </div>
  <div style="width:400px;float: left;" class="ant-table ant-table-body ant-table-default ant-table-bordered" >
    <table role="all">
    <tbody class="ant-table-tbody">
      <tr>
        <th>序号</th>
        <th>字段名</th>
        <th>中文名</th>
        <th>控件</th>
      </tr>
      <tr v-for="(col,index) in metaColumn"
         :key="'col'+index"
         @click="colClick(col.colID)">
        <td style="padding:5px 5px">
          {{col.colID}}
        </td>
        <td style="padding:5px 5px">
          {{col.colName}}
        </td>
        <td style="padding:5px 5px">
          {{col.cnName}}
        </td>
         <td style="padding:5px 5px">
          <nfInput v-model="testValue" :meta="metaFormItem[col.colID]"/>
        </td>
      </tr>
    </tbody>
    </table>
  </div>
  <div style="float: left;">
    <nfForm v-model="metaInfo" @getvalue="sendValue"/>
  </div>
</template>

<script>
import nfInput from '@/components/nf-form/nf-form-item.vue'
import nfForm from './meta-html-form-item.vue'

export default {
  name: 'meta-html-form',
  components: {
    // 注册组件
    nfInput,
    nfForm
  },
  model: {
    prop: ['metaFind', 'metaColumn'],
    event: 'input'
  },
  props: {
    metaFind: Object, // 输出：查询的meta
    metaColumn: Object // 输入：基础表的说明
  },
  data: function () {
    return {
      testValue: '',
      formMeta: {
        quickFind: [], // 快捷查询字段
        allFind: [], // 全部查询字段
        colCount: 4, // 列数
        customer: {} // 个性化查询方案
      },
      platFormMeta: {}, // 平台的meta，
      metaFormItem: {}, // 表单子项的meta
      metaInfo: {
        controlId: 100,
        controlType: 101,
        colName: 'controlId'
      }
    }
  },
  created: function () {
    // 读取json
    const json = require('./json/help-meta-form.json')
    this.platFormMeta = json.platFormMeta
    this.createFormMeta()
  },
  mounted: function () {
    var meta = this.modelValue
  },
  methods: {
    createFormMeta: function () {
      // 依据外部的字段meta，生成表单的meta
      // 判断有没有，如果没有按照控件类型生成
      const json = require('./json/help-meta-form-item.json')
      // 遍历字段meta
      for (var key in this.metaColumn) {
        var col = this.metaColumn[key] // 每个字段meta
        // 循环配置
        var newItem = {} // 新的控件meta
        var arrAttribute = json.type[col.controlType] // 根据控件类型，加载需要的属性
        for (var i = 0; i < arrAttribute.length; i += 1) {
          var id = arrAttribute[i] // 控件ID
          var ctl = json.platFormMeta[id] // 控件meta
          switch (ctl.controlId) {
            case 101:
              newItem[ctl.colName] = col.colID
              break
            case 102:
              newItem[ctl.colName] = col.colName
              break
            case 103:
              newItem[ctl.colName] = col.controlType
              break
            case 105: // 默认值
              newItem[ctl.colName] = col.defaultValue
              break
            case 112: // placeholder
              newItem[ctl.colName] = '请输入' + col.cnName
              break
            case 113: // title
              newItem[ctl.colName] = col.cnName
              break
            case 115: // 字符宽度
              newItem[ctl.colName] = col.colSize
              break
            case 123: // optionList
              newItem[ctl.colName] = []
              break
            default:
              newItem[ctl.colName] = ctl.defaultValue
              break
          }
        }
        this.metaFormItem[col.colID] = newItem
      }
    },
    colClick: function (key) {
      // 单击字段，切换meta
      this.metaInfo = this.metaFormItem[key]
    },
    sendValue: function (value, meta) {
      this.metaFormItem[value] = meta
    },
    sendColumn: function (value, colName) {
      // 提交给父级组件
      this.$emit('update:metaColumn', this.metaFormItem)
    }
  }
}
</script>
