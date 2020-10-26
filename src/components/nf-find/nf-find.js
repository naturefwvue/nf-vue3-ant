import { reactive, watch, watchEffect, computed, getCurrentInstance } from 'vue'

export function manageFind (props) {
  const { ctx } = getCurrentInstance()
  // const _props = props

  // 查询方式的字典， 内容不会变，不监控
  const findKindDic = {
    401: '=', // 字符串
    402: '≠',
    403: '含',
    404: '不含',
    405: '起始',
    406: '结束',
    411: '=', // 数字
    412: '≠',
    413: '>',
    414: '≥',
    415: '<',
    416: '≤',
    431: '从'
  }

  // 查询用的属性
  const findInfo = reactive(
    {
      value: '', // 查询关键字1
      value2: '', // 查询关键字2，用于范围查询
      kind: '', // 当前查询方法的名称
      kindkey: '' // 当前查询方法的key
    }
  )

  // 查询的相关函数
  const findFun = {
    // 更改查询方式
    changeFindType: function (e) {
      findInfo.kindkey = e.key
      findInfo.kind = findKindDic[e.key]
      findFun.sendQuery()
    },
    // 向上提交查询字段、查询方式和查询关键字。
    sendQuery: function () {
      const returnValue = [] // 格式：[findType,query]
      returnValue.push(findInfo.kindkey)
      returnValue.push(findInfo.value)
      var colName = props.meta.colName
      var id = props.meta.controlId
      ctx.$emit('update:modelValue', returnValue) // 返回给调用者，修改v-model属性
      ctx.$emit('getvalue', returnValue, colName, id) // 返回给中间组件
    }
  }

  // 监控控件值的变化
  // watchEffect(() => {
  //   alert(props.meta.colName + '_value的变化:' + findInfo.value)
  //   findFun.sendQuery() // 值有变化，向上层提交
  // })
  const val = computed(() => findInfo.value)
  watch(val, (value, prevValue) => {
    /* ... */
    alert('value的变化' + value + '_' + prevValue)
    if (value !== prevValue) {
      findFun.sendQuery() // 值有变化，向上层提交
    } else {
      alert('value不等')
    }
  })

  // 监控属性变化
  const modelval = computed(() => props.modelValue)
  watch(modelval, (value, prevValue) => {
    /* ... */
    alert('modelval的变化' + value + '_' + prevValue)
    if (value.length === 2) {
      findInfo.kindkey = value[0]
      findInfo.kind = findKindDic[value[0]]
      findInfo.value = value[1]
    }
  })
  /*
  watchEffect(() => {
    alert('watchEffect' + props.modelValue)
    // 拆分属性值。
    const val = props.modelValue
    if (val.length === 2) {
      findInfo.kindkey = val[0]
      findInfo.kind = findKindDic[val[0]]
      findInfo.value = val[1]
    }
  })
  */

  return {
    findKindDic,
    findInfo,
    findFun
  }
}
