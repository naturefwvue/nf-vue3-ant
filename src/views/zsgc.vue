<template>
  <a-layout id="components-layout-demo-responsive">
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <nfMenu @menuclick="myClick"/>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <nfFind :meta="findMeta" :isReload='isReload' v-model="modelFindQuery" />
          <a-button type="primary" @click="openForm"> 添加 </a-button>
          <nfGrid :meta="gridMeta" :isReload='isReload'/>
        </div>
      </a-layout-content>
      <a-layout-footer style="textAlign: center">
        {{modelFindQuery}}自然框架 文档驱动 ©2020 Created by Vue + Ant + natureFramework
      </a-layout-footer>
    </a-layout>
  </a-layout>
  <div id="components-modal-demo-position">
    <a-modal
      v-model:visible="isFormShow"
      title="添加数据"
      centered
      @ok="isFormShow = false"
    >
      <p><nfForm :meta="formMeta" :isReload='isReload' v-model="modelForm" /></p>
    </a-modal>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import nfMenu from '@/components/nf-menu.vue'
import nfForm from '@/components/nf-form.vue'
import nfFind from '@/components/nf-find.vue'
import nfGrid from '@/components/nf-gridView.vue'
// import { UserOutlined, DownOutlined } from '@ant-design/icons-vue'
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons-vue'

export default {
  name: 'zsgcDemo',
  components: {
    nfMenu,
    nfForm,
    nfFind,
    nfGrid
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
    const jsonFind = require('./json/FindDemo.json')
    const modelFindQuery = ref({}) // 记录用户输入的查询条件
    const findMeta = ref(jsonFind.company) // 查询表单的meta信息
    // 加级联的事件
    findMeta.value.findItem['1010'].cascaderChager = (value, level, callback1) => {
      // alert('zsgc获得数据:' + value + 'level:' + level)
      // 根据层数和选定值，获取下级选项的数据，然后通过回调函数设置值。
      callback1([
        {
          label: `${value}1 _ ${level}`,
          value: 'dynamic1' + level,
          isLeaf: level > 2
        },
        {
          label: `${value}2 _ ${level}`,
          value: 'dynamic2' + level,
          isLeaf: level > 2
        }
      ])
    }
    // alert(findMeta.value.findItem['1010'])

    // 表单
    const isFormShow = ref(false) // 表单状态
    const jsonForm = require('./json/FormDemo.json')
    const modelForm = ref({})
    const formMeta = ref(jsonForm.company)
    const openForm = () => {
      isFormShow.value = true
      var arr = document.getElementsByClassName('ant-modal-mask')
    }

    // 数据列表
    const jsonGrid = require('./json/GridDemo.json')
    const gridMeta = ref(jsonGrid.company)

    // 菜单切换模块
    const myClick = (name) => {
      modelForm.value = {}
      modelFindQuery.value = {}
      formMeta.value = jsonForm[name]
      findMeta.value = jsonFind[name]
      gridMeta.value = jsonGrid[name]
      isReload.value = !isReload.value

      // 加级联的事件
      findMeta.value['1010'].cascaderChager = (value) => {
        alert('级联事件')
      }
      alert(findMeta.value['1010'].cascaderChager)
    }

    // 返回
    return {
      isReload,
      isFormShow,
      findMeta,
      formMeta,
      gridMeta,
      myClick,
      openForm,
      modelFindQuery,
      modelForm,
      findWhere
    }
  }
}
</script>

<style>
#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
#components-layout-demo-responsive {
  text-align: left;
}
#components-layout-demo-basic {
  text-align: left;
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
