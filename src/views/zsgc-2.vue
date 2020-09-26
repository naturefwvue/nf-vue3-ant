<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>增删改查的演示</a-layout-header>
      <a-layout>
        <a-layout-sider>
          <span @click="myClick('company')">公司信息</span> <br>
          <span @click="myClick('person')">员工信息</span>
        </a-layout-sider>
        <a-layout-content>
          <nfFind :meta="findMeta" :isReload='isReload' v-model="modelFindQuery" />
          <nfGrid :meta="formMeta" :isReload='isReload' v-model="modelForm" />
          <nfForm :meta="formMeta" :isReload='isReload' v-model="modelForm" />
          <div v-show="false" align="left" style="line-height:30px;background-color:#343434;height:600px;width:300px;float:left;">
            <!--生成查询语句-->
            <div align="left" style="padding:100px 15px">
              <span v-for="(item,key,index) in modelFindQuery" :key="index"><!--遍历model-->
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
            查询条件：{<br>
            <template style="line-height:20px;" v-for="(item, key, index) in modelFindQuery" :key="index">
              <template v-if="typeof item === 'number' && !isNaN(item)">&nbsp;&nbsp;"{{key}}": {{item}}, <br></template>
              <template v-if="typeof item === 'string'">&nbsp;&nbsp;"{{key}}": "{{item}}", <br></template>
              <template v-if="typeof(item) ==='boolean'">&nbsp;&nbsp;"{{key}}": {{item}}, <br></template>
              <template v-if="typeof(item) ==='object'">
                &nbsp;&nbsp;"{{key}}": [<br>
                <template v-for="(opt, index) in item" :key="'opt'+index">&nbsp;&nbsp;&nbsp;&nbsp;{{opt}}, <br></template>
                  &nbsp;&nbsp;]
                </template>
            </template>
            }
          </div>
        </a-layout-content>
      </a-layout>
      <a-layout-footer><br></a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import nfForm from '@/components/nf-form.vue'
import nfFind from '@/components/nf-find.vue'
import nfGrid from '@/components/nf-gridView.vue'
// import { UserOutlined, DownOutlined } from '@ant-design/icons-vue'

export default {
  name: 'zsgcDemo',
  components: {
    nfForm,
    nfFind
  },
  setup () {
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
    // 标示是否重新加载
    const isReload = ref(false)
    // 加载查询控件的meta信息，json格式
    const jsonFind = require('./FindDemo.json')
    const modelFindQuery = ref({}) // 记录用户输入的查询条件
    const findMeta = ref(jsonFind.company) // 查询表单的meta信息

    // 表单
    const jsonForm = require('./FormDemo.json')
    const modelForm = ref({})
    const formMeta = ref(jsonForm.company)

    // 菜单切换模块
    const myClick = (name) => {
      modelForm.value = {}
      modelFindQuery.value = {}
      formMeta.value = jsonForm[name]
      findMeta.value = jsonFind[name]
      isReload.value = !isReload.value
    }

    // 返回
    return {
      isReload,
      modelFindQuery,
      findMeta,
      formMeta,
      myClick,
      modelForm,
      findWhere
    }
  }
}
</script>

<style>
#components-layout-demo-basic {
  text-align: center;
}
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  background: #77d8f5fa;
  color: #fff;
}
#components-layout-demo-basic .ant-layout-footer {
  line-height: 1.5;
}
#components-layout-demo-basic .ant-layout-sider {
  background: #aeebf0;
  color: rgba(53, 41, 223, 0.479);
  line-height: 120px;
}
#components-layout-demo-basic .ant-layout-content {
  background: rgb(222, 222, 222);
  color: #fff;
  min-height: 120px;
  line-height: 120px;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
</style>
