<!--论坛演示-->
<template>
  <div>
      论坛列表
      <div v-for="(item, index) in articleList" :key="'articleList' + index">
        {{index}}:{{item.title}}
        {{item.viewCount}}
      </div>
      <div>
        <a-pagination v-model:current="acticleCurrent" :total="50" show-less-items />
      </div>
  </div>
  <div style="width:400px">
      发个帖子
      标题：<a-input v-model:value="articleForm.title"/>
      内容：<a-input v-model:value="articleForm.content"/>
      <a-button type="dashed" @click="sendArticle" >发表帖子</a-button>
      {{articleForm}}
  </div>
  <div @click="changeState">
    {{valReactive}}
    {{valReactive.c}}
  </div>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import { manageArticleForm } from './bbs-manageArticleForm.js'

// 帖子列表的管理类
const manageArticleList = () => {
  const articleList = ref([
    {
      title: '这是帖子',
      viewCount: 100,
      sendTime: '2020-10-20'
    }
  ])

  // 依据页号加载帖子列表
  const loagActicleListByPage = (pageIndex) => {
    // alert(pageIndex)
    articleList.value = [
      {
        title: '这是新加载的帖子帖子',
        viewCount: 100 + parseInt(pageIndex),
        sendTime: '2020-10-20'
      }
    ]
  }

  return {
    articleList,
    loagActicleListByPage
  }
}

// 分页管理类
const manageActiclePage = () => {
  const acticleCurrent = ref(0)

  return {
    acticleCurrent
  }
}

export default {
  setup () {
    const value = ref(0)
    const valReactive = reactive({})
    const changeState = () => {
      // alert('state')
      console.log(valReactive)
      valReactive.a += '2'
      valReactive.c = '3'
    }
    // 引入查询管理
    const { articleList, loagActicleListByPage } = manageArticleList()
    const { acticleCurrent } = manageActiclePage()

    // 表单
    const { articleForm, sendArticle } = manageArticleForm()

    // 监听页号变化，加载数据
    watch(acticleCurrent, (newValue, oldValue) => {
      // alert(newValue)
      loagActicleListByPage(newValue)
    })

    // 返回给view
    return {
      articleList,
      acticleCurrent,
      valReactive,
      changeState,
      articleForm,
      sendArticle,
      value
    }
  }
}
</script>
