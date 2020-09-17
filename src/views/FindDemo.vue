<template>
  <div class="home">
    <h1>查询演示</h1>
    <div style="background-color:#dddddd;height:400px;width:100px;float:left;">
      <a href="#" @click="myClick('companyFind')">公司信息</a> <br>
      <a href="#" @click="myClick('personFind')">员工信息</a>
    </div>
    <div style="background-color:#eee;height:400px;width:900px;float:left;">
      <!--多列表单-->
      <div class="ant-table ant-table-body ant-table-default ant-table-bordered" >
        <table role="all">
          <tbody class="ant-table-tbody">
            <template v-for="tr in rowCount" :key="tr"><!--循环行-tr-->
              <tr>
                <template v-for="td in findInfo.colCount" :key="td"><!--循环列-td-->
                  <template  v-if="!isEnd(tr, td)"><!--判断meta是否循环完毕-->
                    <td align="right" style="padding:3px 3px;height:20px">
                      {{getMeta(tr,td).title}}：
                    </td>
                    <td align="left" style="padding:3px 3px;height:20px" v-if="!isEnd(tr, td)">
                      <nfInput v-model="modelValue[getMeta(tr,td).colName]"
                      :meta="getMeta(tr,td)" />
                    </td>
                  </template>
                  <template v-else><!--如果一行没满，补充缺失的 td-->
                    <td> </td><td> </td>
                  </template>
                </template>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <!--生成查询语句-->
      <div align="left" style="padding:15px">
        <span v-for="(item,key,index) in metaInfo" :key="index">
          <span v-if="modelValue[item.colName] !== ''">
            {{item.findKind}}
            <span v-if="item.findKind === '401'">
              {{item.colName}} = "{{modelValue[item.colName]}}"  and<br>
            </span>
            <span v-else-if="item.findKind === '402'">
              {{item.colName}} like "%{{modelValue[item.colName]}}%"  and<br>
            </span>
            <span v-else-if="item.findKind === '403'">
              {{item.colName}} like "{{modelValue[item.colName]}}%"  and<br>
            </span>
            <span v-else-if="item.findKind === '404'">
              {{item.colName}} like "%{{modelValue[item.colName]}}"  and<br>
            </span>
            <span v-else-if="item.findKind === '423'">
              {{item.colName}} between "{{modelValue[item.colName]}}" and "{{modelValue[item.colName]}}"<br>
            </span>
          </span>
        </span>
      </div>
    </div>
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
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
// import nfHelp from '@/components/nf-meta-help.vue'
import nfInput from '@/components/nf-find/nf-find-item.vue'

export default {
  name: 'FindDemo',
  components: {
    // nfHelp,
    nfInput
  },
  setup () {
    const json = require('./FindDemo.json') // 加载meta信息，json格式
    const modelValue = ref({}) // 放数据的model
    const findInfo = ref(json.companyFind.findMeta) // 查询表单的meta信息
    const findItem = ref(json.companyFind.findItem) // 表单需要的meta信息
    const rowCount = ref(1) // 行数
    const tdCount = ref(1) // 控件数，遍历用
    const myClick = (key) => {
      // 更换表单的meta
      findItem.value = json[key].findItem
      findInfo.value = json[key].findMeta
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
      rowCount.value = Math.ceil(findInfo.value.allFind.length / findInfo.value.colCount)
      // alert(rowCount.value)
    }
    myClick('companyFind')
    // 通过行、列计算meta的key
    const getMeta = (tr, td) => {
      var key = findInfo.value.allFind[(tr - 1) * findInfo.value.colCount + (td - 1)]
      return findItem.value[key]
    }
    // 通过行、列计算是否结束
    const isEnd = (tr, td) => {
      var count = (tr - 1) * findInfo.value.colCount + (td - 1)
      // alert(tdCount.value)
      return count >= findInfo.value.allFind.length
    }
    return {
      modelValue,
      findItem,
      findInfo,
      rowCount,
      tdCount,
      myClick,
      getMeta,
      isEnd
    }
  }
}
</script>
