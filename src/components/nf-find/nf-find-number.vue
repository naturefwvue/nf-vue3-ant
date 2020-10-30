/** 数字 */
<template>
  <span class="ant-input-group-addon" style="vertical-align: top;">
    <!--查询方式-->
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
    <!--查询条件-->
    <span v-if="findInfo.isRange">
      <a-input-number
        :id="'c' + meta.controlId"
        :name="'c' + meta.controlId"
        v-model:value="findInfo.valueRange[0]"
        :size="findInfo.antSize"
        :placeholder="meta.placeholder"
        :title="meta.title"
        :min="meta.min"
        :max="meta.max"
        :step="meta.step"
        :key="'ckey_'+meta.controlId"/>&nbsp;~&nbsp;
      <a-input-number
        :id="'c2' + meta.controlId"
        :name="'c2' + meta.controlId"
        v-model:value="findInfo.valueRange[1]"
        :size="findInfo.antSize"
        :placeholder="meta.placeholder"
        :title="meta.title"
        :min="meta.min"
        :max="meta.max"
        :step="meta.step"
        :key="'ckey_'+meta.controlId"/>
     </span>
     <a-input-number v-else
      :id="'c' + meta.controlId"
      :name="'c' + meta.controlId"
      v-model:value="findInfo.value"
      :size="findInfo.antSize"
      :placeholder="meta.placeholder"
      :title="meta.title"
      :min="meta.min"
      :max="meta.max"
      :step="meta.step"
      :key="'ckey_'+meta.controlId"/>
  </span>
</template>

<script>
import { ref, watch, watchEffect, getCurrentInstance } from 'vue'
import { manageFind } from './nf-find.js'

export default {
  name: 'nf-find-number',
  model: {
    prop: 'modelValue',
    event: 'input'
  },
  props: {
    modelValue: String,
    meta: {
      type: Object,
      default: () => {
        return {
          // 通用
          controlId: Number, // 编号，区别同一个表单里的其他控件
          colName: String, // 中文名称
          controlType: Number, // 用类型编号表示type
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
          min: Number, // （允许）最小值
          max: Number, // （允许）最小值
          step: Number, // 步长，每次加减的数值间隔
          autocomplete: { // off
            type: String,
            default: 'on'
          }
        }
      }
    }
  },
  setup (props, conext) {
    // 加载基础的查询管理类
    const { dicFindKind, findInfo, findFun } = manageFind(props)

    // 默认查询方式
    findInfo.kind = '='
    findInfo.kindkey = 411

    // 监听两个查询关键字
    watch([() => findInfo.valueRange[0], () => findInfo.valueRange[1]],
      ([newVal1, newVal2], [oldVal1, oldVal2]) => {
        if (newVal1 !== '' && newVal2 !== '') {
          findInfo.value = [newVal1, newVal2]
        }
      })

    return {
      dicFindKind,
      findInfo,
      findFun
    }
  }
}
</script>
