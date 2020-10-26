<!--联动下拉列表框-->
<template>
  <a-cascader
    v-model:value="value"
    size="small"
    :options="options"
    :placeholder="meta.placeholder"
    @change="onChange"
    :load-data="loadData"
  />
</template>

<script>
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
          max: { // 最多选择数量，0表示不限制
            type: Number,
            default: 0
          },
          class: String,
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
  watch: {
    modelValue: function (newValue, oldValue) {
      // alert(newValue)
      this.value = ''
      if (typeof newValue === 'object') {
        if (newValue.length === 2) {
          this.value = newValue[1]
        }
      }
    }
  },
  methods: {
    onChange (value) {
      console.log(value)
      if (typeof this.meta.cascaderChager === 'function') {
        this.meta.cascaderChager(value, (data) => {
          alert('得到——' + data)
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
    myInput: function (value) {
      var returnValue = []
      var colName = this.meta.colName
      var id = this.meta.controlId
      // 判断value是否为数字
      if (typeof value === 'number') {
        returnValue.push(411)
        returnValue.push(parseInt(value))
      } else {
        returnValue.push(401)
        returnValue.push(value)
      }
      this.$emit('update:modelValue', returnValue) // 返回给调用者
      this.$emit('getvalue', returnValue, colName, id) // 返回给中间组件
      this.$emit('change', returnValue) // 返回给中间组件
    },
    loadData: function (selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      targetOption.loading = true
      const value = targetOption.label
      if (typeof this.meta.cascaderChager === 'function') {
        this.meta.cascaderChager(value, selectedOptions.length, (data) => {
          alert('得到——' + data)
          targetOption.loading = false
          targetOption.children = data
          this.options = [...this.options]
        })
      }
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
