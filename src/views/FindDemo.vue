<template>
  <div class="home">
    <h1>查询演示</h1>
    <div style="background-color:#dddddd;height:600px;width:100px;float:left;">
      <a href="#" @click="naviClick('company')">公司信息</a> <br>
      <a href="#" @click="naviClick('person')">员工信息</a>
    </div>
    <div style="background-color:#eee;height:600px;width:1100px;float:left;">
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
                      <a-menu @click="quickFindChange">
                        <a-menu-item v-for="(item,key) in findMeta.customer" :key="key">
                          <UserOutlined />{{item.name}}
                        </a-menu-item>
                      </a-menu>
                    </template>
                    <a-button style="margin-left: 8px" @click="quickFindClick"> 快捷 <DownOutlined /> </a-button>
                  </a-dropdown>
                </td>
                <template v-for="key in quickFindKey" :key="key">
                  <td align="left" style="padding:3px 3px;height:20px">
                    <nfInput v-model="modelValue[getMeta(key).colName]"
                    :meta="findItem[key]" />
                  </td>
                </template>
                <td><a-button type="primary" @click="moreFindShow(true)">更多</a-button></td>
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
        :visible="findVisible"
        @close="moreFindShow(false)"
      >
        <div class="ant-table ant-table-body ant-table-default ant-table-bordered" >
          <table role="all">
            <tbody class="ant-table-tbody">
              <template v-for="(tr, index) in findTable" :key="index"><!--循环行-tr-->
                <tr>
                  <template v-for="(td, index2) in tr" :key="index+'-'+index2"><!--循环列-td-->
                    <td align="right" style="padding:3px 3px;height:20px">
                      {{findItem[td].title}}：
                    </td>
                    <td :colspan="findItem[td].tdCount" align="left" style="padding:3px 3px;height:20px">
                      <nfInput v-model="modelValue[getMeta(td).colName]"
                      :meta="findItem[td]" />
                    </td>
                  </template>
                </tr><!--循环行-tr 结束 -->
              </template>
            </tbody>
          </table>
        </div>
      </a-drawer>
      <!--生成查询语句-->
      <div align="left" style="padding:100px 15px">
        <span v-for="(item,key,index) in modelValue" :key="index"><!--遍历model-->
          <template v-if="typeof item === 'object'"><!--判断是不是数组-->
            <template v-if="item.length == 2"> <!--判断数组长度-->
              {{key}} {{findWhere[item[0]].replace('{k}',item[1])}} and <br>
            </template>
            <template v-if="item.length == 3"> <!--判断数组长度-->
              {{key}} {{findWhere[item[0]].replace('{k1}',item[1]).replace('{k2}',item[2])}} and <br>
            </template>
          </template>
        </span>
      </div>
    </div>
    <!--model值-->
    <div align="left" style="background-color:#EEEEFF;height:600px;width:300px;clear:both">
      {<br>
        <span v-for="(item, key, index) in modelValue" :key="index">
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
    <div style="clear:both">
      {{modelValue}}
      {{findTable}}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import nfInput from '@/components/nf-find/nf-find-item.vue'
import { UserOutlined, DownOutlined } from '@ant-design/icons-vue'

// 查询组件管理
const findManage = () => {
  // 渲染查询条件，内容不会变，就不监控了
  const findWhere = {
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
  }
  // 加载meta信息，json格式
  const findMeta = ref({}) // 查询表单的meta信息
  const findItem = ref({}) // 表单需要的meta信息
  const modelValue = ref({}) // 放数据的model
  const quickFindKey = ref({}) // 存放快捷查询的key
  const findTable = ref([]) // 二维数组存放meta的ID
  // 把查询里的字段，变成多行多列的分布，二维数组
  const metaToTable = () => {
    // 初始化
    modelValue.value = {}
    // 创建model
    modelValue.value = {}
    for (var k in findItem.value) {
      var item = findItem.value[k]
      modelValue.value[item.colName] = ''
    }
    // 行列转换
    var tdCount = 0
    var td = []
    findTable.value = []
    for (var index in findMeta.value.allFind) { // 遍历设定的meta的key的数组
      var key = findMeta.value.allFind[index]
      var meta = findItem.value[key]
      td.push(key)
      tdCount += 1 + meta.tdCount
      if (tdCount >= findMeta.value.colCount * 2) {
        findTable.value.push(td)
        td = []
        tdCount = 0
      }
    }
    if (td.length > 0) {
      findTable.value.push(td)
    }
  }
  // 抽屉的事件
  const findVisible = ref(false)
  const moreFindShow = (isShow) => {
    findVisible.value = isShow
    // 清空查询条件
    modelValue.value = {}
  }
  return {
    modelValue,
    findMeta,
    findItem,
    quickFindKey,
    findWhere,
    findTable,
    metaToTable,
    findVisible,
    moreFindShow
  }
}

export default {
  name: 'FindDemo',
  components: {
    // nfHelp,
    nfInput,
    UserOutlined,
    DownOutlined
  },
  setup () {
    // 引入查询管理
    const { modelValue, findMeta, findItem, findWhere, quickFindKey, metaToTable, changeQuickFind, findTable, findVisible, moreFindShow } = findManage()
    // 加载查询用的meta
    const json = require('./json/FindDemo.json')
    // 切换其他查询模块 menu
    const naviClick = (key) => {
      // 清空查询条件
      modelValue.value = {}
      // 更换表单的meta
      findMeta.value = json[key].findMeta
      findItem.value = json[key].findItem
      // 加载快捷查询
      quickFindKey.value = json[key].findMeta.quickFind
      // 转换成行列的形式
      metaToTable()
    }
    // 设置默认模块
    naviClick('company')
    // 通过key获取meta
    const getMeta = (td) => {
      return findItem.value[td]
    }
    // 设置默认快捷
    const quickFindClick = () => {
      quickFindKey.value = findMeta.value.quickFind
      // 清空查询条件
      modelValue.value = {}
    }
    // 更换个性化查询方案
    const quickFindChange = (e) => {
      quickFindKey.value = findMeta.value.customer[e.key].keys
      // 清空查询条件
      modelValue.value = {}
    }
    return {
      findVisible,
      moreFindShow,
      changeQuickFind,
      modelValue,
      findItem,
      findMeta,
      quickFindKey,
      findWhere,
      findTable,
      naviClick,
      quickFindClick,
      quickFindChange,
      getMeta
    }
  }
}
</script>
