<!--联动下拉列表框-->
<template>
  <a-cascader
    v-model:value="value"
    :options="options"
    placeholder="Please select"
    @change="onChange"
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
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake'
                }
              ]
            }
          ]
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men'
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
    }
  }
}
</script>
