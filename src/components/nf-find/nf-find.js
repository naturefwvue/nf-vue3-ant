import { reactive, watch, getCurrentInstance } from 'vue'

export function manageFind (props) {
  // props 组件参数
  // 上下文，向父组件传值用
  const { ctx } = getCurrentInstance()

  // 查询方式的字典， 内容不会变，不监控
  const dicFindKind = {
    401: '=', // 字符串
    402: '≠',
    403: '含',
    404: '不含',
    405: '起始',
    406: '结束', // 字符串

    411: '=', // 数字
    412: '≠',
    413: '>',
    414: '≥',
    415: '<',
    416: '≤',
    417: '从', // 范围

    421: '=', // 日期、年月、年周
    422: '≠',
    423: '>',
    424: '≥',
    425: '<',
    426: '≤',
    427: '从', // 范围

    431: '=', // 时间
    432: '≠',
    433: '>',
    434: '≥',
    435: '<',
    436: '≤',
    437: '从', // 范围

    441: 'in'
  }

  // 查询用的属性
  const findInfo = reactive(
    {
      antSize: 'small', // 统一控件大小
      isRange: true, // 是否是范围查询
      value: '', // 查询关键字，非范围查询用
      valueRange: ['', ''], // 用于范围查询，数组，开始和结束
      kind: '', // 当前查询方法的名称
      kindkey: '' // 当前查询方法的key
    }
  )

  // 根据meta，设置初始的查询方式

  // 查询的相关函数
  const findFun = {
    // 更改查询方式
    changeFindType: function (e) {
      findInfo.kindkey = e.key
      findInfo.kind = dicFindKind[e.key]
      findInfo.isRange = e.key === 417 || e.key === 427 || e.key === 437 // 范围查询
      findFun.sendQuery()
    },
    // 向上提交查询字段、查询方式和查询关键字。
    sendQuery: function () {
      const returnValue = [] // 格式：[findType,query]。query 可以是数组
      returnValue.push(findInfo.kindkey)
      returnValue.push(findInfo.value)
      var colName = props.meta.colName
      var id = props.meta.controlId
      ctx.$emit('update:modelValue', returnValue) // 返回给调用者，修改v-model属性
      ctx.$emit('getvalue', returnValue, colName, id) // 返回给中间组件
    },
    rangePropsChange: function () { alert('find内部调研') } // 回调函数
  }

  // 监控控件值的变化
  watch(() => findInfo.value, (value, prevValue) => {
    // alert('value的变化' + value + '_' + prevValue)
    findFun.sendQuery() // 向上层提交
  })

  // 监控属性变化，给控件赋值
  watch(() => props.modelValue, (value, prevValue) => {
    // alert('modelval的变化' + value + '_' + findInfo.kindkey)
    findInfo.kindkey = value[0]
    findInfo.kind = dicFindKind[value[0]]

    switch (findInfo.kindkey) {
      case 437: // 时间范围
      case 427: // 日期范围
        findFun.rangePropsChange()
        break
      case 417: // 数字范围
        findInfo.value = value[1]
        findInfo.value1 = value[1][0]
        findInfo.value2 = value[1][1]
        break
      default:
        findInfo.value = value[1]
        break
    }
  })

  return {
    dicFindKind,
    findInfo,
    findFun
  }
}
