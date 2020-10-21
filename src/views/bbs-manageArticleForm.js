import { ref } from 'vue'

// 帖子列表的管理类
function manageArticleForm () {
  alert('来了')
  const articleForm = ref([
    {
      title: '这是帖子标题',
      content: '帖子内容',
      sendTime: '2020-10-20'
    }
  ])
  // 依据页号加载帖子列表
  const sendArticle = () => {
    // 调用axios 向后端提交
    alert('假装发表成功了。。。')
  }
  return {
    articleForm,
    sendArticle
  }
}

export default {
  manageArticleForm
}
