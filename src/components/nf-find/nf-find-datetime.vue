/** 日期、时间、年月、周的选择 */
<template>
  <!--选择查询方法-->
  <span class1="ant-input-group-addon">
    <a-dropdown>
      <a class="ant-dropdown-link">{{kind}}</a>
      <template v-slot:overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item key="421">=</a-menu-item>
          <a-menu-item key="422">≠</a-menu-item>
          <a-menu-item key="432">在</a-menu-item>
          <a-menu-item key="423">></a-menu-item>
          <a-menu-item key="424">≥</a-menu-item>
          <a-menu-item key="425">&lt;</a-menu-item>
          <a-menu-item key="426">≤</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </span>
  <!--日期部分-->
  <span :title="meta.title">
    <!--范围查询-->
    <template v-if="isRange">
      <a-range-picker
        :id="'c' + meta.controlId"
        :name="'c' + meta.controlId"
        :value="value"
        :mode="mode"
        format="YYYY-MM-DD"
        :disabled="meta.disabled"
        size="small"
        @panelChange="handlePanelChange2"
        @change="myInput2"
      :key="'ckey_' + meta.controlId" />
    </template>
    <template v-else>{{ctlKind}}
      <!--非范围查询-->
      <a-date-picker v-if="ctlKind === '140'"
        :value="value"
        :id="'c' + meta.controlId"
        :name="'c' + meta.controlId"
        :disabled="meta.disabled"
        @change="myInput"
        :key="'ckey_' + meta.controlId" />
      <a-date-picker v-else-if="ctlKind === '141'"
        show-time
        :value="value"
        :id="'c' + meta.controlId"
        :name="'c' + meta.controlId"
        :disabled="meta.disabled"
        @change="myInput"
        :key="'ckey_' + meta.controlId" />
      <a-time-picker v-else-if="ctlKind === '142'"
        :id="'c' + meta.controlId"
        :name="'c' + meta.controlId"
        :mode="mode"
        :disabled="meta.disabled"
        @change="myInput"
       :key="'ckey_' + meta.controlId" />
      <a-month-picker v-else-if="ctlKind === '143'"
        :id="'c' + meta.controlId"
        :name="'c' + meta.controlId"
        :disabled="meta.disabled"
        @change="myInput"
       :key="'ckey_' + meta.controlId" />
      <a-week-picker v-else-if="ctlKind === '144'"
        :id="'c' + meta.controlId"
        :name="'c' + meta.controlId"
        :disabled="meta.disabled"
        @change="myInput"
        :key="'ckey_' + meta.controlId" />
    </template>
  </span>
  <!--选择日期类型-->
  <a-dropdown>
    <a class="ant-dropdown-link">{{kind2}}</a>
    <template v-slot:overlay>
      <a-menu @click="handleMenuClick2">
        <a-menu-item key="140">日期</a-menu-item>
        <a-menu-item key="143">年月</a-menu-item>
        <a-menu-item key="144">年周</a-menu-item>
        <a-menu-item key="142">时间</a-menu-item>
        <a-menu-item key="141">日时</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script>

export default {
  name: 'nf-find-datetime',
  props: {
    modelValue: String,
    meta: {
      type: Object,
      default: () => {
        return {
          controlId: Number, // 编号，区别同一个表单里的其他控件
          controlType: Number, // 用类型编号表示type
          colName: String, // 中文名称
          isClear: {
            // isClear  连续添加时是否恢复默认值
            type: Boolean,
            default: false
          },
          defaultValue: String, // 默认值
          autofocus: { // 是否自动获得焦点
            type: Boolean,
            default: false
          },
          disabled: {
            // 是否禁用
            type: Boolean,
            default: false
          },
          required: { // 必填
            type: Boolean,
            default: true
          },
          pattern: String, // 用正则做验证。
          class: String, // 'cssTxt input_t1'
          placeholder: String,
          title: String, // 提示信息
          readonly: { // 只读
            type: Boolean,
            default: false
          },
          min: String, // （允许）最小值 月和日要两位
          max: String, // （允许）最大值 月和日要两位
          step: Number // 步长，每次加减的数值间隔
        }
      }
    }
  },
  data: () => {
    return {
      value: '',
      value1: '',
      value2: '',
      kind: '=',
      kind2: '日期',
      kindkey: '432',
      mode: 'date',
      isRange: true,
      findKind: {
        421: '=', // 日期
        432: '在',
        422: '≠',
        423: '>',
        424: '≥',
        425: '<',
        426: '≤'
      },
      dateKind: {
        140: '日期', // 日期
        141: '日时', // 日期时间
        142: '时间', // 时间
        143: '年月', // 年月
        144: '年周' // 年周 time|date|month|year|decade
      },
      type: {
        140: 'date', // 日期
        141: 'datetime-local', // 日期时间
        142: 'time', // 时间
        143: 'month', // 年月
        144: 'week' // 年周
      },
      ctlKind: 141
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
    myInput: function (date, dateString) { // 非范围事件
      this.value = date
      this.send()
    },
    myInput2: function (date, dateString) { // 范围事件
      this.value = date
      this.value1 = dateString[0]
      this.value2 = dateString[1]
      this.send()
    },
    handleMenuClick (e) {
      // 切换查询条件
      this.kind = this.findKind[e.key]
      this.isRange = e.key === '432'
      console.log('click', e)
      // this.send()
    },
    handleMenuClick2 (e) {
      this.ctlKind = e.key
      // 切换日期、年周
      this.kind2 = this.dateKind[e.key]
      console.log('click', e)
      this.mode = [
        this.modeType[e.key],
        this.modeType[e.key]
      ]
      // this.send()
    },
    handlePanelChange2 (value, mode) {
      this.value = value
      this.mode2 = [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1]]
    },
    send: function () {
      // 向上级提交
      var returnValue = []
      returnValue.push(this.kindkey) // 压入查询方式
      if (this.kindkey === '432') {
        returnValue.push(this.value1) // 范围查询，依次压入两个值
        returnValue.push(this.value2)
      } else {
        returnValue.push(this.value) // 非范围，压入一个
      }
      var colName = this.meta.colName
      var id = this.meta.controlId
      this.$emit('update:modelValue', returnValue) // 返回给调用者
      this.$emit('getvalue', returnValue, colName, id) // 返回给中间组件
    }
  }
}
</script>
