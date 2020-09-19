<template>
  <div class="home">
    <h1>查询演示</h1>
    <div style="background-color:#dddddd;height:600px;width:100px;float:left;">
      <a href="#" @click="myClick('companyFind')">公司信息</a> <br>
      <a href="#" @click="myClick('personFind')">员工信息</a>
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
                      <a-menu @click="handleMenuClick">
                        <a-menu-item v-for="(item,key) in findMeta.customer" :key="key">
                          <UserOutlined />{{item.name}}</a-menu-item>
                      </a-menu>
                    </template>
                    <a-button style="margin-left: 8px"> 快捷 <DownOutlined /> </a-button>
                  </a-dropdown>
                </td>
                <template v-for="key in findMeta.quickFind" :key="key"><!--循环列-td
                  <td align="right" style="padding:3px 3px;height:20px">
                    {{findItem[key].title}}：
                  </td>-->
                  <td align="left" style="padding:3px 3px;height:20px" v-if="!isEnd(tr, td)">
                    <nfInput v-model="modelValue[getMeta2(key).colName]"
                    :meta="findItem[key]" />
                  </td>
                </template>
                <td><a-button type="primary" @click="showDrawer">更多</a-button></td>
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
        @close="onClose"
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
                      <nfInput v-model="modelValue[getMeta2(td).colName]"
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

export default {
  name: 'FindDemo',
  components: {
    // nfHelp,
    nfInput,
    UserOutlined,
    DownOutlined
  },
  setup () {
    // 抽屉
    const findVisible = ref(false)
    const json = require('./FindDemo.json') // 加载meta信息，json格式
    const modelValue = ref({}) // 放数据的model
    const findMeta = ref(json.companyFind.findMeta) // 查询表单的meta信息
    const findItem = ref(json.companyFind.findItem) // 表单需要的meta信息
    const findWhere = ref(json.findWhere) // 表单需要的meta信息
    const rowCount = ref(1) // 行数
    const tdCount = ref(1) // 控件数，遍历用
    const myClick = (key) => {
      // 更换表单的meta
      findItem.value = json[key].findItem
      findMeta.value = json[key].findMeta
      // 初始化
      tdCount.value = 1
      modelValue.value = {}
      // 创建model
      modelValue.value = {}
      for (var k in findItem.value) {
        var item = findItem.value[k]
        modelValue.value[item.colName] = ''
        tdCount.value += 1
      }
      // 计算行数
      rowCount.value = Math.ceil(findMeta.value.allFind.length / findMeta.value.colCount)
      // alert(rowCount.value)
    }
    myClick('companyFind')
    // 通过行、列计算meta的key
    const getMeta = (tr, td) => {
      var key = findMeta.value.allFind[(tr - 1) * findMeta.value.colCount + (td - 1)]
      return findItem.value[key]
    }
    const getMeta2 = (td) => {
      return findItem.value[td]
    }
    // 通过行、列计算是否结束
    const isEnd = (tr, td) => {
      var count = (tr - 1) * findMeta.value.colCount + (td - 1)
      // alert(tdCount.value)
      return count >= findMeta.value.allFind.length
    }
    // 新的计算方式
    const findTable = ref([]) // 二维数组存放meta的ID
    var tdCount1 = 0
    var td = []
    for (var index in findMeta.value.allFind) { // 遍历设定的meta的key的数组
      var key = findMeta.value.allFind[index]
      var meta = findItem.value[key]
      td.push(key)
      tdCount1 += 1 + meta.tdCount
      if (tdCount1 >= findMeta.value.colCount * 2) {
        findTable.value.push(td)
        td = []
        tdCount1 = 0
      }
    }
    if (td.length > 0) {
      findTable.value.push(td)
    }
    // 抽屉的事件
    const afterVisibleChange = (val) => {
      console.log('visible', val)
    }
    const showDrawer = () => {
      findVisible.value = true
    }
    const onClose = () => {
      findVisible.value = false
    }
    // 个性化方案
    const handleMenuClick = (e) => {
      alert(e.key)
      console.log('click', e)
    }
    return {
      findVisible,
      afterVisibleChange,
      showDrawer,
      onClose,
      handleMenuClick,
      modelValue,
      findItem,
      findMeta,
      findWhere,
      findTable,
      rowCount,
      tdCount,
      myClick,
      getMeta,
      getMeta2,
      isEnd
    }
  }
}
</script>
