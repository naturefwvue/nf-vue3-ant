import { ref } from 'vue'

// 帖子列表的管理类
export function manageArticleForm () {
  // const s = document.createElement('script'); s.type = 'text/javascript'; s.src = 'js地址'
  /*
  document.getElementsByTagName('head')[0].appendChild(script)
	// 引入成功
	script.onload = function () {
		console.log('js资源已加载成功了')
	}
	// 引入失败
	script.onerror = function () {
		console.log('js资源加载失败了')
  }
  */

  alert('来了')
  const modelForm = ref(
    {
      title: '这是帖子标题',
      content: '帖子内容',
      sendTime: '2020-10-20'
    }
  )
  // 依据页号加载帖子列表
  const sendArticle = () => {
    // 调用axios 向后端提交
    alert('假装发表成功了。。。')
  }
  return {
    articleForm: modelForm,
    sendArticle
  }
}
