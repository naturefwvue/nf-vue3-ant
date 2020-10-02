/** 日期、时间、年月、周的选择 */
<template>
  <!--选择查询方法-->
  <span class1="ant-input-group-addon">
    <a-dropdown>
      <a class="ant-dropdown-link">{{findName}}</a>
      <template v-slot:overlay>
        <a-menu @click="changeFindKind">
          <a-menu-item key="421">=</a-menu-item>
          <a-menu-item key="422">≠</a-menu-item>
          <a-menu-item key="432">从</a-menu-item>
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
      <template v-if="controlModeKey === '144'" >
        <!--年周的范围查询-->
        <a-week-picker
          :id="'cRangeweek1' + meta.controlId"
          :name="'cRangeweek1' + meta.controlId"
          placeholder="开始周"
          :disabled="meta.disabled"
          @change="myInput21"
          :key="'cRangeweek1' + meta.controlId" /> ~&nbsp;
        <a-week-picker
          :id="'cRangeweek2' + meta.controlId"
          :name="'cRangeweek2' + meta.controlId"
          placeholder="结束周"
          :disabled="meta.disabled"
          @change="myInput22"
          :key="'cRangeweek2_' + meta.controlId" />
      </template>
      <template v-else-if="controlModeKey === '143'">
        <!--年月的范围查询-->
        <a-month-picker
          :id="'cRangemonth1' + meta.controlId"
          :name="'cRangemonth1' + meta.controlId"
          placeholder="开始月份"
          :disabled="meta.disabled"
          @change="myInput21"
        :key="'cRangemonth1_' + meta.controlId" /> ~&nbsp;
        <a-month-picker
          :id="'cRangemonth2' + meta.controlId"
          :name="'cRangemonth2' + meta.controlId"
          placeholder="结束月份"
          :disabled="meta.disabled"
          @change="myInput22"
        :key="'cRangemonth2_' + meta.controlId" />
      </template>
      <template v-else-if="controlModeKey === '142'">
        <!--时间的范围查询-->
        <a-time-picker
        :id="'cRangetime1' + meta.controlId"
        :name="'cRangetime1' + meta.controlId"
        placeholder="开始时间"
        :disabled="meta.disabled"
        @change="myInput21"
       :key="'cRangetime1_' + meta.controlId" /> ~&nbsp;
       <a-time-picker
        :id="'cRangetime2' + meta.controlId"
        :name="'cRangetime2' + meta.controlId"
        placeholder="结束时间"
        :disabled="meta.disabled"
        @change="myInput22"
       :key="'cRangetime2_' + meta.controlId" />
      </template>
      <a-range-picker v-else
        :id="'c' + meta.controlId"
        :name="'c' + meta.controlId"
        :mode="mode"
        :placeholder="mode"
        :show-time = "controlModeKey === '141'"
        :disabled="meta.disabled"
        size="small"
        @change="myInput2"
      :key="'ckey0_' + meta.controlId" />
    </template>
    <template v-else>
      <!--非范围查询-->
      <a-date-picker v-if="controlModeKey === '140'"
        :value="value"
        placeholder="选择日期"
        :id="'c' + meta.controlId"
        :name="'c' + meta.controlId"
        :disabled="meta.disabled"
        @change="myInput"
        :key="'ckey1_' + meta.controlId" />
      <a-date-picker v-else-if="controlModeKey === '141'"
        show-time
        :value="value"
        placeholder="选择日期时间"
        :id="'c' + meta.controlId"
        :name="'c' + meta.controlId"
        :disabled="meta.disabled"
        @change="myInput"
        :key="'ckey2_' + meta.controlId" />
      <a-time-picker v-else-if="controlModeKey === '142'"
        :id="'c' + meta.controlId"
        :name="'c' + meta.controlId"
        placeholder="选择时间"
        :disabled="meta.disabled"
        @change="myInput"
       :key="'ckey3_' + meta.controlId" />
      <a-month-picker v-else-if="controlModeKey === '143'"
        :id="'c' + meta.controlId"
        :name="'c' + meta.controlId"
        placeholder="选择月份"
        :disabled="meta.disabled"
        @change="myInput"
       :key="'ckey4_' + meta.controlId" />
      <a-week-picker v-else-if="controlModeKey === '144'"
        :id="'c' + meta.controlId"
        :name="'c' + meta.controlId"
        placeholder="选择周"
        :disabled="meta.disabled"
        @change="myInput"
        :key="'ckey5_' + meta.controlId" />
    </template>
  </span>
  <!--选择日期类型-->
  <a-dropdown>
    <a class="ant-dropdown-link">{{controlName}}</a>
    <template v-slot:overlay>
      <a-menu @click="changeControlMode">
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
import moment from 'moment'
import 'moment/locale/zh-cn'

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
          defaultValue: String, // 默认值
          class: String, // 'cssTxt input_t1'
          placeholder: String,
          title: String, // 提示信息
          min: String, // （允许）最小值 月和日要两位
          max: String, // （允许）最大值 月和日要两位
          step: Number // 步长，每次加减的数值间隔
        }
      }
    }
  },
  data: () => {
    return {
      value: '', // 非范围查询的值
      arrValue: [null, null], // 范围查询的值
      value0: '', // 返回的日期
      value1: '', // 范围查询第一个值
      value2: '', // 范围查询第二个值
      findkey: '432', // 当前查询方法的key
      findName: '从', // 当前查询方法的名称
      isRange: true, // 范围查询
      controlModeKey: '140', // 控件类型的mode的key
      controlName: '日期', // 控件类型的名称
      mode: ['date', 'date'], // 范围查询控件的类型mode
      findKind: {
        421: '=', // 日期
        432: '从',
        422: '≠',
        423: '>',
        424: '≥',
        425: '<',
        426: '≤'
      },
      controlKind: {
        140: '日期', // 日期
        141: '日时', // 日期时间
        142: '时间', // 时间
        143: '年月', // 年月
        144: '年周' // 年周 time|date|month|year|decade
      },
      controlMode: {
        140: 'date', // 日期
        141: 'datetime-local', // 日期时间
        142: 'time', // 时间
        143: 'month', // 年月
        144: 'week' // 年周
      }
    }
  },
  watch: {
    modelValue: function (newValue, oldValue) {
      // 上级赋值，修改内部控件的值。会导致重复执行，不过值都一致了就停止重复了。
      this.value = ''
      this.arrValue = [null, null]
      if (typeof newValue === 'object') {
        if (newValue.length === 2) {
          this.value = newValue[1]
        } else if (newValue.length === 3) {
          this.value1 = newValue[1]
          this.value2 = newValue[1]
        }
      }
    }
  },
  methods: {
    myInput: function (date, dateString) { // 非范围事件
      // alert(date)
      this.value = date
      this.value0 = dateString // 返回值
      this.send()
    },
    myInput2: function (date, dateString) { // 范围事件
      this.arrValue = date
      this.value1 = dateString[0]
      this.value2 = dateString[1]
      this.send()
    },
    myInput21: function (date, dateString) { // 范围事件周和时间
      this.arrValue[0] = date
      this.value1 = dateString
      this.send()
    },
    myInput22: function (date, dateString) { // 范围事件周和时间
      this.arrValue[1] = date
      this.value2 = dateString
      this.send()
    },
    changeFindKind (e) { // 切换查询方式
      this.findkey = e.key
      this.findName = this.findKind[e.key]
      this.isRange = e.key === '432' // 设置是否是范围查询
      this.send()
    },
    // 更改范围查询的控件类型
    changeControlMode (e) {
      this.controlModeKey = e.key
      // 切换日期、年周
      this.value = ''
      this.arrValue = []
      this.value0 = ''
      this.value1 = ''
      this.value2 = ''
      this.controlName = this.controlKind[e.key]
      console.log('click', e)
      this.mode = [
        this.controlMode[e.key],
        this.controlMode[e.key]
      ]
      this.send()
    },
    send: function () {
      // 向上级提交
      var returnValue = []
      returnValue.push(this.findkey) // 压入查询方式
      if (this.findkey === '432') {
        returnValue.push(this.value1) // 范围查询，依次压入两个值
        returnValue.push(this.value2)
      } else {
        returnValue.push(this.value0) // 非范围，压入一个
      }
      var id = this.meta.controlId
      var colName = this.meta.colName
      this.$emit('update:modelValue', returnValue) // 返回给调用者
      this.$emit('getvalue', returnValue, colName, id) // 返回给中间组件
    }
  }
}
</script>
