<template>
  <div style="width:160px;" class="components-input-demo-presuffix">
    <a-input
      :id="'id' + meta.controlId"
      :name="'c' + meta.controlId"
      v-model:value="findInfo.value"
      :placeholder="meta.placeholder"
      :title="meta.title"
      :maxlength="meta.maxlength"
      :autocomplete="meta.autocomplete"
      :key="'ckey_'+meta.controlId"
      size="small"
    >
        <template v-slot:addonBefore>
          <a-dropdown>
            <a class="ant-dropdown-link">{{findInfo.kind}}</a>
            <template v-slot:overlay>
              <a-menu @click="findFun.changeFindType">
                <a-menu-item v-for="item in meta.findKindList" :key="item" >{{findKindDic[item]}}</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
    </a-input>
  </div>
</template>

<script>
import { ref, watch, watchEffect, getCurrentInstance } from 'vue'
import { manageFind } from './nf-find.js'

export default {
  name: 'nf-find-input',
  model: {
    prop: 'modelValue',
    event: 'input'
  },
  props: {
    modelValue: Object,
    meta: {
      type: Object,
      default: () => {
        return {
          controlId: Number, // 编号，区别同一个表单里的其他控件
          colName: String, // 字段名称
          controlType: Number, // 用类型编号表示type
          placeholder: String,
          title: String, // 提示信息
          maxlength: Number, // 最大字符数
          autocomplete: { // off
            type: String,
            default: 'on'
          }
        }
      }
    }
  },
  setup (props, conext) {
    const { ctx } = getCurrentInstance()
    const { findKindDic, findInfo, findFun } = manageFind(props)

    findInfo.kind = '含'
    findInfo.kindkey = 403

    return {
      findKindDic,
      findInfo,
      findFun
    }
  }
}
</script>
