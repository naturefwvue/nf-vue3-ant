<!--表单控件的维护-->
<!--表单和表单子控件-->
<!--
输入：字段meta
输出：表单meta
-->
<template>
  <div style="width:400px;float: left;" class="ant-table ant-table-body ant-table-default ant-table-bordered" >
    <table role="all">
      <tbody class="ant-table-tbody">
        <tr >
          <td align="right">列数：{{formMeta.colCount}}</td>
          <td><nfInput v-model="formMeta.colCount" :meta="platFormMeta[101]"/></td>
        </tr>
      </tbody>
    </table>
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
            <nfInput :key="'coltd'+index" v-if="true" v-model="testValue" :meta="formItemMeta[col.colID]"/>
          </td>
        </tr>
      </tbody>
    </table>
    <div >
      <formatMeta :model="formMeta"/>
      <formatMeta :model="formItemMeta"/>
    </div>
  </div>
  <div style="float: left;"  v-if="isShowFormItem">
    <nfForm v-model="metaInfo" :isReload="isReloadItem" @getvalue="sendValue"/>
  </div>
</template>

<script>
import formatMeta from '@/components/format/format-meta.vue'
import nfInput from '@/components/nf-form/nf-form-item.vue'
import nfForm from './meta-html-form-item.vue'

export default {
  name: 'meta-html-form',
  components: {
    // 注册组件
    formatMeta,
    nfInput,
    nfForm
  },
  model: {
    prop: ['metaColumn', 'metaForm'],
    event: 'input'
  },
  props: {
    metaColumn: Object, // 输入：字段的meta
    metaForm: Object, // 输出：表单meta
    isReload: Boolean // 需要重新加载
  },
  data: function () {
    return {
      isReloadItem: false, // 重写加载子控件
      isShowFormItem: false, // 是否显示子控件的mete
      testValue: '',
      platFormMeta: {}, // 平台的meta，
      formMeta: {
        allColumn: [], // 全部表单字段
        addState: 'add',
        colCount: 1 // 列数
      },
      formItemMeta: {}, // 表单子项的meta
      metaInfo: { // 选择的表单子控件的meta
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
  watch: {
    isReload: function (newValue, oldVale) {
      // 有更新，增加新字段的控件meta
      this.createFormMeta()
    }
  },
  methods: {
    createFormMeta: function () {
      // 依据外部的字段meta，生成表单子控件的meta
      // 判断有没有，如果没有按照控件类型生成
      const json = require('./json/help-meta-form-item.json')
      // 遍历字段meta
      for (var key in this.metaColumn) {
        var col = this.metaColumn[key] // 每个字段meta
        if (typeof this.formItemMeta[col.colID] === 'undefined') {
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
          // 新控件，加入表单子控件集合
          this.formItemMeta[col.colID] = newItem
          // 加入allFind
          this.formMeta.allColumn.push(col.colID)
          this.sendFormMeta()
        }
      }
    },
    colClick: function (key) {
      // 单击字段，切换meta
      this.isReloadItem = !this.isReloadItem
      this.isShowFormItem = true
      this.metaInfo = this.formItemMeta[key]
    },
    // 子控件返回子控件的meta
    sendValue: function (value, meta) {
      this.formItemMeta[value] = meta
      this.sendFormMeta()
    },
    sendFormMeta: function () {
      // 提交给父级组件
      var reMeta = {
        formMeta: this.formMeta,
        formItem: this.formItemMeta
      }
      this.$emit('update:metaForm', reMeta)
      this.$emit('sendmeta', reMeta)
    }
  }
}
</script>
