<template>
  <div class="home">
     <div style="background-color:#eee;height:600px;width:900px;float:left;">
      <!--快捷查询，一行-->
      <div
        :style="{
          height: '70px',
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid #ebedf0',
          borderRadius: '2px',
          padding: '2px',
          textAlign: 'left',
          background: '#fafafa',
        }"
      >
        <div class="ant-table ant-table-body ant-table-default ant-table-bordered" >
          <table role="all">
            <tbody class="ant-table-tbody">
              <tr>
                <td><!--个性化查询方案-->
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
                </td>
                <template v-for="key in quickFindKey" :key="key">
                  <td align="left" style="padding:3px 3px;height:20px">
                    <nfInput v-model="value" :meta="meta.findItem[key]" @getvalue="getvalue" />
                  </td>
                </template>
                <td><a-button type="primary" @click="findAllisShow(true)">更多</a-button></td>
              </tr>
            </tbody>
          </table>
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
              <template v-for="(tr, index) in findTable" :key="index"><!--循环行-tr-->
                <tr>
                  <template v-for="(td, index2) in tr" :key="index+'-'+index2"><!--循环列-td-->
                    <td align="right" style="padding:3px 3px;height:20px">
                      {{meta.findItem[td].title}}：
                    </td>
                    <td :colspan="meta.findItem[td].tdCount" align="left" style="padding:3px 3px;height:20px">
                      <nfInput v-model="value" :meta="meta.findItem[td]" @getvalue="getvalue"/>
                    </td>
                  </template>
                </tr><!--循环行-tr 结束 -->
              </template>
            </tbody>
          </table>
        </div>
      </a-drawer>
    </div>
  </div>
  结果：{{value}}<br>
  结果：{{returnValue}}
</template>

<script>
import nfInput from './nf-find/nf-find-item.vue'
// import { UserOutlined, DownOutlined } from '@ant-design/icons-vue'

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
      // 开关相关
      findAllVisible: false, // 更多查询条件
      quickFindKey: [], // 快速查询需要的key
      value: '', // 绑定控件的值
      returnValue: {}, // 返回给上层的实体类
      findTable: [], // 二维数组存放meta的ID
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
      },
      metaInfo1: {
        controlId: 1000,
        colName: 'companyName',
        controlType: 101,
        isClear: true,
        disabled: false,
        required: true,
        readonly: false,
        pattern: '',
        class: '',
        placeholder: '请输入公司名称',
        title: '公司名称',
        autocomplete: 'on',
        size: 30,
        maxlength: 100,
        optionList: []
      }
    }
  },
  created: function () {
    // 把表单子控件转换为多行多列的形式
    var tdCount = 0
    var td = []
    for (var index in this.meta.findMeta.allFind) { // 遍历子控件的meta的key的数组，便于排序
      var key = this.meta.findMeta.allFind[index] // 数组里面的meta的key
      var meta = this.meta.findItem[key] // 子控件的meta
      td.push(key)
      tdCount += 1 + meta.tdCount
      if (tdCount >= this.meta.findMeta.colCount * 2) { // 一行放满了，存到tr里面
        this.findTable.push(td)
        td = []
        tdCount = 0
      }
    }
    if (td.length > 0) { // 把不满行的td放入tr
      this.findTable.push(td)
    }

    // 把快捷key放进去
    this.quickFindKey = this.meta.findMeta.quickFind
  },
  updated: function () {
    console.log('Child', 'Updated')
  },
  methods: {
    // 获取控件值，向上返回
    getvalue: function (value, colName) {
      this.returnValue[colName] = value
      this.$emit('update:modelValue', this.returnValue) // 返回给调用者
      this.$emit('getvalue', this.returnValue, colName) // 返回给中间组件
    },
    // 控制是否显示相关函数
    findAllisShow: function (isShow) { // 更多查询的切换
      this.findAllVisible = isShow
    },
    // 更换个性化查询方案
    changeQuickFind: function (e) {
      this.quickFindKey = this.meta.findMeta.customer[e.key].keys
    },
    // 显示默认
    clickQuickFind: function (e) {
      this.quickFindKey = this.meta.findMeta.quickFind
    },
    // 返回查询子控件的meta
    getMeta2: function (td) {
      return ''
    },
    // 判断控件是否循环完毕
    isEnd: function (tr, td) {
      var count = (tr - 1) * this.meta.findMeta.colCount + (td - 1)
      // alert(tdCount.value)
      return count >= this.meta.findMeta.allFind.length
    }
  }
}
</script>
