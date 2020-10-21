# vue3.0 的 Composition API

举一个例子来讨论一下Composition API的一种用法。

> 假如我们要做一个论坛的讨论列表和分页。  
以前是把需要的数据都放在data里面，事件都放在methods 里面，代码少的话还好分辨，如果代码多了，看着就头疼了。

现在vue3.0可以按照业务关系分成多个管理类来管理这些代码。

比如帖子列表我们可以写一个管理类，包含帖子列个的数据，和依据页号加载数据的方法。
代码如下

```js
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
```

再写一个分页的管理类（使用antdv的a-pagination），代码如下

```js
// 分页管理类
const manageActiclePage = () => {
  const acticleCurrent = ref(0)

  return {
    acticleCurrent
  }
}
```

最后我们可以在setup里面把这两个管理类给结合起来，一起返回给view。
```js
export default {
  setup () {
    const value = ref(0)

    // 引入查询管理
    const { articleList, loagActicleListByPage } = manageArticleList()
    // 引入分页管理
    const { acticleCurrent } = manageActiclePage()

    // 监听页号变化，加载数据
    watch(acticleCurrent, (newValue, oldValue) => {
      loagActicleListByPage(newValue)
    })
    // 返回给view
    return {
      articleList,
      acticleCurrent,
      // articleForms,
      // sendArticles,
      value
    }
  }
}
```
监听 acticleCurrent 页号变化，调用manageArticleList的loagActicleListByPage事件，加载数据。
当然也可以有其他的组合方式，这里只是举个简单的例子。

这样代码可以根据业务逻辑分散开，便于扩展和维护，比如我们要加一个查询功能，那么可以在manageArticleList里面加个loagActicleListByQUery的事件。

