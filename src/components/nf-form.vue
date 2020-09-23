<template>
  <div class="home">
     <div style="background-color:#eee;height:500px;">
       <div class="ant-table ant-table-body ant-table-default ant-table-bordered" >
          <table role="all">
            <colgroup><col style="width: 30%; min-width: 30%;"><col>
            </colgroup>
            <tbody class="ant-table-tbody">
              <template v-for="(tr, index) in formTable" :key="index"><!--循环行-tr-->
                <tr>
                  <template v-for="(td, index2) in tr" :key="index+'-'+index2"><!--循环列-td-->
                    <td align="right" style="padding:3px 3px;height:20px">
                      {{meta.formItem[td].title}}：{{td}}
                    </td>
                    <td :colspan="meta.formItem[td].tdCount" align="left" style="padding:3px 3px;height:20px">
                      {{getMetaColname(td)}}
                      <nfInput
                        :modelValue="value[getMetaColname(td)]"
                        :meta="meta.formItem[td]"
                        @getvalue="getvalue"/>
                    </td>
                  </template>
                </tr><!--循环行-tr 结束 -->
              </template>
            </tbody>
          </table>{{value}}<br>
        </div>
    </div>
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
    prop: 'modelValue',
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
            colCount: Number, // 一行几列
            customer: Object // 个性化方案
          },
          formItem: Object // 成员控件的meta
        }
      }
    }
  },
  data () { // 内部属性
    return {
      value1: '',
      value: ref({ _flag: false }), // 绑定控件的值
      returnValue: {}, // 返回给上层的实体类
      formTable: [], // 二维数组存放meta的ID
      formMeta: { // 控件自己的属性
        state: 'add', // 表单状态，add、update、show
        colCount: Number, // 一行几列
        customer: Object // 个性化方案
      },
      formItem: Object // 成员控件的meta
    }
  },
  created: function () { // 初始化
    // 把表单子控件转换为多行多列的形式
    this.getFormTable()
  },
  beforeUpdate: function () { // 外部修改属性值，需要重新计算
    // 把表单子控件转换为多行多列的形式
    this.getFormTable()
  },
  methods: {
    // 把表单子控件转换为多行多列的形式
    getFormTable: function () {
      var tdCount = 0
      this.formTable = []
      this.value = {}
      var td = []
      for (var index in this.meta.formMeta.allForm) { // 遍历子控件的meta的key的数组，便于排序
        var key = this.meta.formMeta.allForm[index] // 数组里面的meta的key
        var meta = this.meta.formItem[key] // 子控件的meta
        td.push(key)
        this.value[meta.colName] = ''
        // Vue.set(this.value, meta.colName, '')
        tdCount += 1 + meta.tdCount
        if (tdCount >= this.meta.formMeta.colCount * 2) { // 一行放满了，存到tr里面
          this.formTable.push(td)
          td = []
          tdCount = 0
        }
      }
      if (td.length > 0) { // 把不满行的td放入tr
        this.formTable.push(td)
      }
      this.value._flag = !this.value._flag
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
