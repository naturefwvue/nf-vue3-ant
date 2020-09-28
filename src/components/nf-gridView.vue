<template>
  <a-table :columns="columns" :data-source="datas" bordered>
    <template v-slot:name="{ text }">
      <a>11{{ text }}</a>
    </template>
  </a-table>
</template>

<script>
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    slots: { customRender: 'name' }
  },
  {
    title: 'Cash Assets',
    className: 'column-money',
    dataIndex: 'money'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  }
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park'
  }
]

export default {
  name: 'nf-gird-view',
  components: {
  },
  model: {
    prop: ['meta', 'data'], // 外部属性，返回表单实体类
    isReload: false,
    event: 'input'
  },
  props: {
    isReload: Boolean, // 是否重新加载meta
    meta: {
      type: Object,
      default: () => {
        return {
          gridMeta: { // 控件自己的属性
            allColmun: [], // 需要的控件的ID
            customer: Object // 个性化方案
          },
          gridItem: Object, // 成员控件的meta
          rules: {} // 表单验证规则
        }
      }
    }
  },
  data () {
    return {
      datas: [], // 演示数据
      columns: []
    }
  },
  created: function () { // 初始化
    // 把表单子控件转换为多行多列的形式
    this.getFormTable()
  },
  watch: {
    isReload: function (newValue, oldVale) {
      this.getFormTable()
    }
  },
  methods: {
    // 把字段meta变成数组的形式，便于v-for
    getFormTable: function () {
      // 根据meta，生成columns
      var tmpData = []
      this.columns = []
      for (var index in this.meta.gridMeta.allColmun) { // 遍历子控件的meta的key的数组，便于排序
        var key = this.meta.gridMeta.allColmun[index] // 数组里面的meta的key
        var meta = this.meta.gridItem[key] // 子控件的meta
        this.columns.push({
          title: meta.title,
          dataIndex: meta.colName
        })
        // 把字段放入数组，便于循环
        tmpData.push(meta.colName) // 创建实体类
      }

      this.datas = []
      for (var d = 0; d < 20; d += 1) {
        var t = {}
        for (var k = 0; k < tmpData.length; k += 1) {
          t[tmpData[k]] = tmpData[k] + d
        }
        this.datas.push(t)
      }
    },
    // 获取控件值，向上返回
    getvalue: function (value, colName) {
      this.formValue[colName] = value
      // alert(this.value[colName])
      this.$emit('update:modelValue', this.formValue) // 返回给调用者
      this.$emit('getvalue', this.formValue, colName) // 返回给中间组件
    }
  }
}
</script>

<style>
th.column-money,
td.column-money {
  text-align: right !important;
}
</style>
