/* 查询控件，处理现实的类 */
import { reactive, watch } from 'vue'

export function manageFindControl (props, findDataInfo) {
  // props 组件参数
  // findDataInfo 查询用到的数据

  // 查询现实方面用的属性
  const findControlInfo = reactive(
    {
      antSize: 'small', // 统一控件大小
      findAllVisible: false // 更多查询条件开关相关
    }
  )

  // 查询的相关函数
  const findControlFun = {
    // 显示更多查询
    findAllisShow: function (isShow) { // 更多查询的切换
      findControlInfo.findAllVisible = isShow
      if (isShow) {
        findDataInfo.quickFindMeta = [] // 清空快捷查询条件
      }
    },
    // 更换个性化查询方案
    changeQuickFind: function (e) {
      findDataInfo.returnValue = {}
      findDataInfo.quickFindKey = props.meta.findMeta.customer[e.key].keys
      findDataInfo.quickFindMeta = []
      for (var i in props.meta.findMeta.customer[e.key].keys) {
        var key1 = props.meta.findMeta.customer[e.key].keys[i] // 数组里面的meta的key
        findDataInfo.quickFindMeta.push(props.meta.findItem[key1])
      }
    },
    // 显示默认查询方案
    clickQuickFind: function (e) {
      findDataInfo.returnValue = {} // 清空返回的查询关键字
      findDataInfo.quickFindKey = props.meta.findMeta.quickFind
      findDataInfo.quickFindMeta = []
      for (var index in props.meta.findMeta.quickFind) {
        var key = props.meta.findMeta.quickFind[index] // 数组里面的meta的key
        findDataInfo.quickFindMeta.push(props.meta.findItem[key])
      }
    }
  }

  // 监控全部查询状态，变成false的时候判断有无快捷，如果没有设置默认快捷查询字段
  watch(() => findControlInfo.findAllVisible, (value) => {
    if (!value && findDataInfo.quickFindMeta.length === 0) {
      findControlFun.clickQuickFind()
    }
  })

  return {
    findControlInfo,
    findControlFun
  }
}
