<!--联动下拉列表框-->
<template>
  <a-cascader
    v-model:value="findInfo.value"
    :size="findInfo.antSize"
    :options="meta.optionList"
    :placeholder="meta.placeholder"
    @change="onChange"
    :load-data="loadData"
  />
</template>

<script>
import { ref, reactive, watch, watchEffect, getCurrentInstance } from 'vue'
import { manageFind } from './nf-find.js'

export default {
  name: 'nf-find-cascader',
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    modelValue: String,
    meta: {
      type: Object,
      default: () => {
        return {
          controlId: Number, // 编号，区别同一个表单里的其他控件
          controlType: Number, // 用类型编号表示type
          colName: String, // 字段名称
          placeholder: String,
          optionList: Object,
          title: String // 中文名称
        }
      }
    }
  },
  data () {
    return {
      value: [],
      options: [
        {
          value: '浙江',
          label: '浙江',
          isLeaf: false,
          children: [
            {
              value: '杭州',
              label: '杭州',
              children: [
                {
                  value: '西湖',
                  label: '西湖',
                  isLeaf: false
                }
              ]
            }
          ]
        },
        {
          value: '江苏',
          label: '江苏',
          isLeaf: false,
          children: [
            {
              value: '南京',
              label: '南京',
              children: [
                {
                  value: '中华门',
                  label: '中华门',
                  isLeaf: false
                }
              ]
            }
          ]
        }
      ]
    }
  },
  setup (props, conext) {
    // 加载基础的查询管理类
    const { dicFindKind, findInfo, findFun } = manageFind(props)

    // 默认查询方式
    findInfo.kind = '='
    findInfo.kindkey = 401

    // 定义内部option
    const myOptions = ref({})
    // 转换option的item
    if (props.meta.optionKind === 1) {
      // myOptions.value = props.meta.optionList
    }

    // change
    const onChange = function (value, selectedOptions) {
      alert('onChange')
      // 当前level的控件
      const targetOption = selectedOptions[selectedOptions.length - 1]
      // 加载状态
      // targetOption.loading = true
      // targetOption.children = props.meta.optionList2
      console.log(targetOption.children)
      // targetOption.loading = false
    }
    // 动态加载
    const loadData = function (selectedOptions) {
      alert('loadData')
      // 当前level的控件
      const targetOption = selectedOptions[selectedOptions.length - 1]
      // 加载状态
      targetOption.loading = true
      // 父级ID
      const value = targetOption.value
      // alert(typeof value)
      switch (props.meta.optionKind) {
        case 1:
          // 直接
          break
        case 2:
          // 内部 filter
          targetOption.loading = false
          targetOption.children = props.meta.optionList2.filter(item => item.parent === value)
          break
        case 3:
          // 内部ajax
          break
        case 4:
          // 外部处理
          // 外部加载 检查外部是否设置回调函数
          if (typeof this.meta.cascaderChager1 === 'function') {
            this.meta.cascaderChager(value, selectedOptions.length, (data) => {
              // alert('得到——' + data)
              targetOption.loading = false
              targetOption.children = data
            })
          }
          break
      }
    }

    const myInput = function (date, dateString) { // 非范围事件
      findInfo.value = dateString
    }

    findFun.rangePropsChange = () => {
      // 设置默认值
    }

    return {
      dicFindKind,
      findInfo,
      myOptions,
      myInput,
      onChange,
      loadData,
      findFun
    }
  },
  methods: {
    onChange1 (value) {
      console.log(value)
      if (typeof this.meta.cascaderChager === 'function') {
        this.meta.cascaderChager(value, (data) => {
          // alert('得到——' + data)
        })
      }
      // this.$emit('selectchange', value, 1)
      /*
      this.axios.get('user?ID=12345')
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      */
      /*
      this.axios({
        method: 'post',
        url: '/user/12345',
        data: {
          firstName: 'Fred',
          lastName: 'Flintstone'
        }
      })
      this.axios.post('/user', {
        firstName: 'Fred',
        lastName: 'Flintstone'
      })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      */
    },
    loadData1: function (selectedOptions) {
      // load options lazily
      /*
      setTimeout(() => {
        targetOption.loading = false
        targetOption.children = [
          {
            label: `${targetOption.label} Dynamic 1`,
            value: 'dynamic1',
            isLeaf: false
          },
          {
            label: `${targetOption.label} Dynamic 2`,
            value: 'dynamic2',
            isLeaf: false
          }
        ]
        this.options = [...this.options]
      }, 500)
      */
    }
  }
}
</script>
