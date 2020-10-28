/** 日期、时间、年月、周的选择 */
<template>
  <!--选择查询方法-->
  <span class="ant-input-group-addon">
    <a-dropdown>
      <a class="ant-dropdown-link">{{findInfo.kind}}</a>
      <template v-slot:overlay>
        <a-menu @click="findFun.changeFindType">
          <a-menu-item v-for="item in meta.findKindList" :key="item" >{{dicFindKind[item]}}</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </span>
  <!--日期部分-->
  <span :title="meta.title" style="vertical-align: top;">
    <!--范围查询-->
    <template v-if="findInfo.isRange">
      <template v-if="controlModeKey === '144'" >
        <!--年周的范围查询-->
        <a-week-picker
          :id="'cRangeweek1' + meta.controlId"
          :name="'cRangeweek1' + meta.controlId"
          v-model:value="findDate.value1"
          :size="findInfo.antSize"
          :placeholder="meta.placeholder+'开始周'"
          @change="myInput1"
          :key="'cRangeweek1' + meta.controlId" /> ~&nbsp;
        <a-week-picker
          :id="'cRangeweek2' + meta.controlId"
          :name="'cRangeweek2' + meta.controlId"
          v-model:value="findDate.value2"
          :size="findInfo.antSize"
          :placeholder="meta.placeholder+'结束周'"
          :disabled="meta.disabled"
          @change="myInput2"
          :key="'cRangeweek2_' + meta.controlId" />
      </template>
      <template v-else-if="controlModeKey === '143'">
        <!--年月的范围查询-->
        <a-month-picker
          :id="'cRangemonth1' + meta.controlId"
          :name="'cRangemonth1' + meta.controlId"
          v-model:value="findDate.value1"
          :size="findInfo.antSize"
          :placeholder="meta.placeholder+'开始月'"
          :disabled="meta.disabled"
          @change="myInput1"
        :key="'cRangemonth1_' + meta.controlId" /> ~&nbsp;
        <a-month-picker
          :id="'cRangemonth2' + meta.controlId"
          :name="'cRangemonth2' + meta.controlId"
          v-model:value="findDate.value2"
          :size="findInfo.antSize"
          :placeholder=" meta.placeholder+'结束月'"
          @change="myInput2"
        :key="'cRangemonth2_' + meta.controlId" />
      </template>
      <a-range-picker v-else
        :id="'c' + meta.controlId"
        :name="'c' + meta.controlId"
        v-model:value="findDate.valueRange"
        :size="findInfo.antSize"
        :placeholder="[meta.placeholder+'开始日期',meta.placeholder+'结束日期']"
        :show-time = "controlModeKey === '141'"
        @change="myInput"
      :key="'ckey0_' + meta.controlId" />
    </template>
    <template v-else>
      <!--非范围查询-->
      <a-date-picker v-if="controlModeKey < 142"
        :show-time="controlModeKey === '141'"
        :id="'c141' + meta.controlId"
        :name="'c141' + meta.controlId"
        v-model:value="findDate.value"
        :size="findInfo.antSize"
        :placeholder="meta.placeholder+'的日期'"
        @change="myInput"
        :key="'c141_' + meta.controlId" />
      <a-month-picker v-else-if="controlModeKey === '143'"
        :id="'c143' + meta.controlId"
        :name="'c143' + meta.controlId"
        v-model:value="findDate.value"
        :size="findInfo.antSize"
        format="YYYY-MM"
        :placeholder="meta.placeholder+'的月份'"
        @change="myInput"
       :key="'c143_' + meta.controlId" />
      <a-week-picker v-else-if="controlModeKey === '144'"
        :id="'c144' + meta.controlId"
        :name="'c144' + meta.controlId"
        v-model:value="findDate.value"
        :size="findInfo.antSize"
        format="YYYY-wo"
        :placeholder="meta.placeholder+'的周'"
        @change="myInput"
        :key="'c144_' + meta.controlId" />
    </template>
  </span>
  <!--选择日期类型-->
  <span style="vertical-align: top;">
    <a-dropdown>
      <a class="ant-dropdown-link">{{controlName}}</a>
      <template v-slot:overlay>
        <a-menu @click="changeControlMode">
          <a-menu-item key="140">日期</a-menu-item>
          <a-menu-item key="143">年月</a-menu-item>
          <a-menu-item key="144">年周</a-menu-item>
          <a-menu-item key="141">日时</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </span>
</template>

<script>
import { ref, watch, watchEffect, getCurrentInstance, reactive } from 'vue'
import { manageFind } from './nf-find.js'

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
          placeholder: String,
          title: String, // 提示信息
          min: String, // （允许）最小值 月和日要两位
          max: String, // （允许）最大值 月和日要两位
          step: Number // 步长，每次加减的数值间隔
        }
      }
    }
  },
  data () {
    return {
      controlModeKey: '140', // 控件类型的mode的key
      controlName: '日期', // 控件类型的名称
      controlKind: {
        140: '日期', // 日期
        141: '日时', // 日期时间
        142: '时间', // 时间
        143: '年月', // 年月
        144: '年周' // 年周 time|date|month|year|decade
      }
    }
  },
  setup (props, conext) {
    // 加载基础的查询管理类
    const { dicFindKind, findInfo, findFun } = manageFind(props)

    // 默认查询方式
    findInfo.kind = '从'
    findInfo.kindkey = 427

    const findDate = reactive({
      value: null, // moment('00:00:00', 'HH:mm:ss'),
      valueRange: [], // 日期的范围
      value1: null, //  moment('00:00:00', 'HH:mm:ss'),
      value2: null //  moment('00:00:00', 'HH:mm:ss')
    })

    const myInput = function (date, dateString) { // 非范围事件
      findInfo.value = dateString
    }
    const myInputRange = function (date, dateString) { // 日期范围事件
      findInfo.value = dateString
    }
    const myInput1 = function (date, dateString) { // 范围事件
      findInfo.valueRange[0] = dateString
      if (findInfo.valueRange[0] !== '' && findInfo.valueRange[1] !== '') {
        findInfo.value = findInfo.valueRange
        alert(findInfo.value)
      }
    }
    const myInput2 = function (date, dateString) { // 范围事件
      findInfo.valueRange[1] = dateString
      if (findInfo.valueRange[0] !== '' && findInfo.valueRange[1] !== '') {
        findInfo.value = findInfo.valueRange
      }
    }

    findFun.rangePropsChange = () => {
      // 设置默认值
      findDate.valueRange = props.modelValue[1] // moment(props.modelValue[1], 'yyyy-MM-dd HH:mm:ss')

      if (findInfo.kindkey === 427) {
        findDate.value1 = moment(props.modelValue[1][0], 'yyyy-MM-dd HH:mm:ss')
        findDate.value2 = moment(props.modelValue[1][1], 'yyyy-MM-dd HH:mm:ss')
      } else {
        findDate.valueRange = props.modelValue[1] // moment(props.modelValue[1], 'yyyy-MM-dd HH:mm:ss')
      }
    }

    return {
      dicFindKind,
      findInfo,
      findDate,
      myInput,
      myInputRange,
      myInput1,
      myInput2,
      findFun
    }
  },
  methods: {
    // 更改范围查询的控件类型
    changeControlMode (e) {
      this.controlModeKey = e.key
      // 切换日期、年周
      this.controlName = this.controlKind[e.key]
    }
  }
}
</script>
