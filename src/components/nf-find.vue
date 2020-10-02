<template>
  <div class="home">
     <div style="background-color:#eee;height:60px;">
      <!--快捷查询，一行-->
      <div id="components-affix-demo-target"
        ref="container"
        class="scrollable-container"
        :style="{
          height: '180px',
          overflow: 'auto',
          position: 'relative',
          border: '1px solid #ebedf0',
          borderRadius: '2px',
          padding: '2px',
          textAlign: 'left',
          background: '#fafafa',
        }"
      >
        <!--个性化查询方案-->
        <div class="customer">
          <a-dropdown size="small">
            <template v-slot:overlay>
              <a-menu @click="changeQuickFind">
                <a-menu-item v-for="(item,key) in meta.findMeta.customer" :key="key">
                  <UserOutlined />{{item.name}}
                </a-menu-item>
              </a-menu>
            </template>
            <a-button style="margin-left: 2px" @click="clickQuickFind">快捷<DownOutlined /> </a-button>
          </a-dropdown>
        </div>
        <!--查询字段-->
        <div class="ant-table ant-table-body ant-table-default ant-table-bordered" style="padding-left:80px;">
          <table role="all">
            <tbody class="ant-table-tbody">
              <tr>
                <template v-for="(meta,index) in quickFindMeta" :key="'qf'+index">
                  <td align="left" style="padding:3px 3px;height:20px">
                    <nfInput v-model="findValue[meta.colName]" :meta="meta" @getvalue="getvalue" />
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
        <!--更多按钮固定-->
        <div class="background">
          <a-affix :target="() => this.$refs.container">
            <a-button type="primary" @click="findAllisShow(true)">更多</a-button>
          </a-affix>
        </div>
      </div>
      <!--更多查询条件，用抽屉打开-->
      <a-drawer
        title="更多查询条件"
        placement="top"
        :closable="false"
        :visible="findAllVisible"
        @close="findAllisShow(false)"
      >
        <div class="ant-table ant-table-body ant-table-default ant-table-bordered" >
          <table role="all">
            <tbody class="ant-table-tbody">
              <template v-for="(tr, index) in arrMeta" :key="index"><!--循环行-tr-->
                <tr>
                  <template v-for="(meta, index2) in tr" :key="index+'-'+index2"><!--循环列-td-->
                    <td align="right" style="padding:3px 3px;height:20px">
                      {{meta.title}}：
                    </td>
                    <td :colspan="meta.tdCount" align="left" style="padding:3px 3px;height:20px">
                      <nfInput v-model="findValue[meta.colName]" :meta="meta" @getvalue="getvalue" @click="getvalue2(meta.controlId)"/>
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
  data () {
    return {
      findAllVisible: false, // 更多查询条件开关相关
      quickFindKey: [], // 快速查询需要的key
      findValue: {}, // 绑定控件的值，创立全部的字段，用于绑定控件
      returnValue: {}, // 返回给上层的实体类，只返回有查询条件的字段
      arrMeta: [], // 二维数组存放meta，遍历全部查询
      quickFindMeta: [], // 二维数组存放meta，遍历快捷查询
      findWhere: { // 查询方式，其实前端不需要的
        401: ' = "{k}"',
        402: ' <> "{k}"',
        403: ' like "%{k}%"',
        404: ' not like "%{k}%"',
        405: ' like "{k}%"',
        406: ' like "%{k}"',
        411: ' ={k}',
        412: ' <>{k}',
        413: ' >{k}',
        414: ' >={k}',
        415: ' <{k}',
        416: ' <={k}',
        421: ' ="{k}"',
        431: ' between {k1} and {k2}',
        432: ' between "{k1}" and "{k2}" ',
        433: ' in ({k})'
      },
      findKind: { // 备选的查询方式
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
  created: function () { // 初始化
    // 把表单子控件转换为多行多列的形式
    this.getFindTable()
  },
  watch: {
    isReload: function (newValue, oldVale) {
      this.getFindTable()
    }
  },
  methods: {
    // 把表单子控件转换为多行多列的形式
    getFindTable: function () {
      var tdCount = 0
      var tr = []
      this.arrMeta = []
      this.findValue = {}
      this.returnValue = {}
      for (var index in this.meta.findMeta.allFind) { // 遍历子控件的meta的key的数组，便于排序
        var key = this.meta.findMeta.allFind[index] // 数组里面的meta的key
        var meta = this.meta.findItem[key] // 子控件的meta
        this.findValue[meta.colName] = '' // 创建实体类
        tr.push(meta) // 往一行里面放
        tdCount += 1 + meta.tdCount // 计算一行是否放满
        if (tdCount >= this.meta.findMeta.colCount * 2) { // 一行放满了，存入table
          this.arrMeta.push(tr)
          tr = []
          tdCount = 0
        }
      }
      if (tr.length > 0) { // 把不满行的tr放入table
        this.arrMeta.push(tr)
      }

      // 把快捷key放进去
      this.clickQuickFind()
    },
    // 快捷查询
    getvalue: function (value, colName, id) {
      this.findValue[colName] = value
      this.returnValue[colName] = value
      this.$emit('update:modelValue', this.returnValue) // 返回给调用者
      this.$emit('getvalue', this.returnValue, colName, id) // 返回给中间组件
    },
    // 更多查询
    getvalue2: function (id) {
      // 查找是否已经有了
      var have = false
      for (var i = 0; i < this.quickFindMeta.length; i += 1) {
        if (this.quickFindMeta[i].controlId === id) {
          have = true
        }
      }
      if (!have) {
        this.quickFindMeta.push(this.meta.findItem[id])
      }
      // this.getvalue()
    },
    // 显示更多查询
    findAllisShow: function (isShow) { // 更多查询的切换
      this.findAllVisible = isShow
      if (isShow) {
        this.quickFindMeta = [] // 清空快捷查询条件
      }
    },
    // 更换个性化查询方案
    changeQuickFind: function (e) {
      this.returnValue = {}
      this.quickFindKey = this.meta.findMeta.customer[e.key].keys
      this.quickFindMeta = []
      for (var i in this.meta.findMeta.customer[e.key].keys) {
        var key1 = this.meta.findMeta.customer[e.key].keys[i] // 数组里面的meta的key
        this.quickFindMeta.push(this.meta.findItem[key1])
      }
    },
    // 显示默认查询方案
    clickQuickFind: function (e) {
      this.returnValue = {} // 清空返回的查询关键字
      this.quickFindKey = this.meta.findMeta.quickFind
      this.quickFindMeta = []
      for (var index in this.meta.findMeta.quickFind) {
        var key = this.meta.findMeta.quickFind[index] // 数组里面的meta的key
        this.quickFindMeta.push(this.meta.findItem[key])
      }
    }
  }
}
</script>
<style>
#components-affix-demo-target.scrollable-container {
  padding-right: 60px;
  height: 180px;
  overflow-x: scroll;
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
