<!--查询控件的维护-->
<!--查询表单和查询子控件-->
<!--
输入：字段meta
输出：查询meta
-->
<template>
  <div style="width:400px;float: left;" class="ant-table ant-table-body ant-table-default ant-table-bordered" >
    <table role="all">
      <tbody class="ant-table-tbody">
        <tr >
          <td align="right">列数：{{findMeta.colCount}}</td>
          <td><nfInput v-model="findMeta.colCount" :meta="platFindMeta[101]"/></td>
        </tr>
        <tr >
          <td align="right">快捷：</td>
          <td>{{findMeta.quickFind}}</td>
        </tr>
        <tr >
          <td align="center" colspan="2">个性化方案：</td>
        </tr>
        <tr >
          <td align="right">方案一：</td>
          <td>{{findMeta.quickFind}}</td>
        </tr>
      </tbody>
    </table>
    <table role="all">
      <tbody class="ant-table-tbody">
        <tr>
          <th>快捷</th>
          <th>序号</th>
          <th>字段名</th>
        </tr>
        <tr v-for="(col,index) in metaColumn"
          :key="'col'+index"
          @click="colClick(col.colID)">
          <td style="padding:5px 5px">
            <input type="checkbox" value="col.colID">
          </td>
          <td style="padding:5px 5px">
            {{col.colID}}
          </td>
          <td style="padding:5px 5px">
            {{col.colName}}
          </td>
        </tr>
      </tbody>
    </table>
    {{findItemMeta}}
  </div>
  <div style="float: left;"  v-if="isShowFindItem">
    <nfFind v-model="metaInfo" :isReload="isReloadItem" @getvalue="sendValue"/>
  </div>
</template>

<script>
import formatMeta from '@/components/format/format-meta.vue'
import nfInput from '@/components/nf-form/nf-form-item.vue'
import nfFind from './meta-html-find-item.vue'

export default {
  name: 'meta-html-find',
  components: {
    // 注册组件
    nfInput,
    nfFind
  },
  model: {
    prop: ['metaColumn', 'metaFind'],
    event: 'input'
  },
  props: {
    metaFind: Object, // 输出：查询的meta
    metaColumn: Object, // 输入：基础表的说明
    isReload: Boolean // 需要重新加载

  },
  data: function () {
    return {
      isReloadItem: false, // 重写加载子控件
      isShowFindItem: false, // 是否显示子控件的mete
      testValue: '',
      platFindMeta: {}, // 平台的meta
      findMeta: {
        quickFind: [], // 快捷查询字段
        allFind: [], // 全部查询字段
        colCount: 4, // 列数
        customer: {} // 个性化查询方案
      },
      findItemMeta: {}, // 查询子项
      metaInfo: { // 选择的表单子控件的meta
        controlId: 100,
        controlType: 101,
        colName: 'controlId'
      }
    }
  },
  created: function () {
    // 读取json
    const json = require('./json/help-meta-find.json')
    this.platFindMeta = json.platFindMeta
    this.createFindMeta()
  },
  watch: {
    isReload: function (newValue, oldVale) {
      // 有更新，增加新字段的控件meta
      this.createFindMeta()
    }
  },
  methods: {
    createFindMeta: function () {
      // 依据外部的字段meta，生成表单子控件的meta
      // 判断有没有，如果没有按照控件类型生成
      const json = require('./json/help-meta-find-item.json')
      // 遍历字段meta
      for (var key in this.metaColumn) {
        var col = this.metaColumn[key] // 每个字段meta
        if (typeof this.findItemMeta[col.colID] === 'undefined') {
          // 循环配置
          var newItem = {} // 新的控件meta
          var arrAttribute = json.type[col.controlType] // 根据控件类型，加载需要的属性
          for (var i = 0; i < arrAttribute.length; i += 1) {
            var id = arrAttribute[i] // 控件ID
            var ctl = json.platFindMeta[id] // 控件meta
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
          this.findItemMeta[col.colID] = newItem
          // 加入allFind
          this.findMeta.allFind.push(col.colID)
          this.sendFindMeta()
        }
      }
    },
    colClick: function (key) {
      // 单击字段，切换meta
      this.isReloadItem = !this.isReloadItem
      this.isShowFindItem = true
      this.metaInfo = this.findItemMeta[key]
    },
    // 子控件返回子控件的meta
    sendValue: function (value, meta) {
      this.findItemMeta[value] = meta
      this.sendFindMeta()
    },
    sendFindMeta: function () {
      // 提交给父级组件
      var reMeta = {
        findMeta: this.findMeta,
        findItem: this.findItemMeta
      }
      this.$emit('update:metaFind', reMeta)
      this.$emit('sendmeta', reMeta)
    }
  }
}
</script>
