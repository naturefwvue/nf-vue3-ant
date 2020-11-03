<!--查询控件-->
<template>
  <div class="home">
    <div style="background-color:#eee;height:50px;">
      <!--快捷查询，一行-->
      <div id="components-affix-demo-target"
        ref="container"
        class="scrollable-container"
      >
        <!--个性化查询方案-->
        <a-row type="flex">
          <a-col flex="80px">
            <div class="customer">
              <a-dropdown size="small">
                <template v-slot:overlay>
                  <a-menu @click="findControlFun.changeQuickFind">
                    <a-menu-item v-for="(item,key) in meta.findMeta.customer" :key="key">
                      <UserOutlined />{{item.name}}
                    </a-menu-item>
                  </a-menu>
                </template>
                <a-button style="margin-left: 2px" @click="findControlFun.clickQuickFind">快捷<DownOutlined /> </a-button>
              </a-dropdown>
            </div>
          </a-col>
          <!--快捷查询字段-->
          <template v-for="(meta,index) in findDataInfo.quickFindMeta" :key="'qf'+index">
            <a-col flex="auto">
              <nfInput v-model="findDataInfo.findValue[meta.colName]" :meta="meta" @getvalue="findDataFun.getvalue" />
            </a-col>
          </template>
          <a-col flex="80px">
            <!--更多按钮固定预留位置-->
            &nbsp;
          </a-col>
        </a-row>
        <!--更多按钮固定-->
        <div class="background">
          <a-affix :target="() => this.$refs.container">
            <a-button type="primary" @click="findControlFun.findAllisShow(true)">更多</a-button>
          </a-affix>
        </div>
      </div>
      <!--更多查询条件，用抽屉打开-->
      <a-drawer
        title="更多查询条件"
        placement="top"
        :closable="false"
        :visible="findControlInfo.findAllVisible"
        @close="findControlFun.findAllisShow(false)"
      >
        <div class="ant-table ant-table-body ant-table-default ant-table-bordered" >
          <table role="all">
            <tbody class="ant-table-tbody">
              <template v-for="(tr, index) in findDataInfo.arrMeta" :key="index"><!--循环行-tr-->
                <tr>
                  <template v-for="(meta, index2) in tr" :key="index+'-'+index2"><!--循环列-td-->
                    <td align="right" style="padding:3px 3px;height:20px">
                      {{meta.title}}：
                    </td>
                    <td :colspan="meta.tdCount" align="left" style="padding:3px 3px;height:20px">
                      <nfInput v-model="findDataInfo.findValue[meta.colName]" :meta="meta" @getvalue="findDataFun.getvalue" @click="findDataFun.getvalue2(meta.controlId)"/>
                    </td>
                  </template>
                </tr><!--循环行-tr 结束 -->
              </template>
            </tbody>
          </table>
        </div>
      </a-drawer>
    </div>
    <div style="clear:both"></div>
  </div>
</template>

<script>
import nfInput from './nf-find/nf-find-item.vue'
import { UserOutlined, DownOutlined } from '@ant-design/icons-vue'
import { manageFindControl } from './nf-find-control.js'
import { manageFindData } from './nf-find-data.js'

export default {
  name: 'nf-find',
  components: {
    // nfHelp,
    nfInput
  },
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    modelValue: Object,
    isReload: Boolean,
    meta: {
      type: Object,
      default: () => {
        return {
          findMeta: { // 控件自己的属性
            quickFind: Object, // 快速查询的字段key
            allFind: Object, // 全部字段的key
            colCount: Number, // 一行几列
            customer: Object // 个性化查询方案
          },
          findItem: Object // 成员控件的meta
        }
      }
    }
  },
  setup (props) {
    const { dicFindKind, dicFindWhere, findDataInfo, findDataFun } = manageFindData(props)
    const { findControlInfo, findControlFun } = manageFindControl(props, findDataInfo)

    // 把meta变成多行多列形式
    findDataFun.getFindTable()
    // 显示快捷查询
    findControlFun.clickQuickFind()

    return {
      dicFindKind,
      dicFindWhere,
      findDataInfo,
      findDataFun,
      findControlInfo,
      findControlFun
    }
  }
}
</script>

<style>
#components-affix-demo-target.scrollable-container {
  padding-right: 60px;
  height: 180px;
  overflow-x: scroll;
  height: 50px;
  overflow: hidden;
  position: relative;
  border: 1px solid #ebedf0;
  padding: 2px;
  background: #fafafa;
}
#components-affix-demo-target .background {
  width:60px;
  height: 80px;
  z-index:100;
  position:absolute;
  top:2px;
  right:10px;
  float:right;
  padding-right: 6px;
}
#components-affix-demo-target .customer {
  width:60px;
  height: 80px;
  z-index:100;
  position:absolute;
  top:2px;
  left:5px;
  float:left;
  padding-right: 6px;
}
</style>
