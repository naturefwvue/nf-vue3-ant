/* 纯时间的选择 */
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
  <span :title="meta.title" style="vertical-align: top;">
    <!--时间的范围查询-->
    <template v-if="findInfo.isRange">
      <!--时间的范围查询-->
      <a-time-picker
        :id="'cRangetime1' + meta.controlId"
        :name="'cRangetime1' + meta.controlId"
        v-model:value="findTime.value1"
        :size="findInfo.antSize"
        :placeholder="meta.placeholder+'开始时间'"
        @change="myInput1"
        :key="'cRangetime1_' + meta.controlId" /> ~&nbsp;
      <a-time-picker
        :id="'cRangetime2' + meta.controlId"
        :name="'cRangetime2' + meta.controlId"
        v-model:value="findTime.value2"
        :size="findInfo.antSize"
        :placeholder="meta.placeholder+'结束时间'"
        @change="myInput2"
        :key="'cRangetime2_' + meta.controlId" />
    </template>
    <!--时间的非范围查询-->
    <template v-else>
      <a-time-picker
        :id="'c' + meta.controlId"
        :name="'c' + meta.controlId"
        v-model:value="findTime.value"
        :size="findInfo.antSize"
        :placeholder="meta.placeholder+'的时间'"
        @change="myInput"
       :key="'ckey3_' + meta.controlId" />
    </template>{{findTime.value1}}
  </span>
</template>

<script>
import { ref, watch, watchEffect, getCurrentInstance, reactive } from 'vue'
import { manageFind } from './nf-find.js'

import moment from 'moment'
import 'moment/locale/zh-cn'

export default {
  name: 'nf-find-time',
  props: {
    modelValue: Object,
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
  setup (props, conext) {
    // 加载基础的查询管理类
    const { dicFindKind, findInfo, findFun } = manageFind(props)

    // 默认查询方式
    findInfo.kind = '从'
    findInfo.kindkey = 437

    const findTime = reactive({
      value: null, // moment('00:00:00', 'HH:mm:ss'),
      value1: null, //  moment('00:00:00', 'HH:mm:ss'),
      value2: null //  moment('00:00:00', 'HH:mm:ss')
    })

    const myInput = function (date, dateString) { // 非范围事件
      // alert(date)
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
      if (findInfo.kindkey === 437) {
        findTime.value1 = moment(props.modelValue[1][0], 'HH:mm:ss')
        findTime.value2 = moment(props.modelValue[1][1], 'HH:mm:ss')
      } else {
        findTime.value = moment(props.modelValue[1], 'HH:mm:ss')
      }
    }

    return {
      dicFindKind,
      findInfo,
      findTime,
      myInput,
      myInput1,
      myInput2,
      findFun
    }
  }
}
</script>
