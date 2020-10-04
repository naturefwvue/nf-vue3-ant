<template>
<div style="width:500px;float: left;">
  <a-form
    ref="ruleForm"
    :rules="rules"
    :model="modelValue"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item v-for="(meta, index) in metaInfo"
        :key="'form'+index"
        :ref="meta.colName"
        :label="meta.title"
        :name="meta.colName">
      <nfInput v-model="modelValue[meta.colName]"
        :meta="meta" @blur="myblur" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">
        Create
      </a-button>
      <a-button style="margin-left: 10px;" @click="resetForm">
        Reset
      </a-button>
    </a-form-item>
  </a-form>
<div align="left" style="background-color:#EEEEFF;height:600px;width:300px;float:left;">
    {<br>
    <span v-for="(item, key, index) in modelValue" :key="index">
        <span v-if="typeof item === 'number' && !isNaN(item)">&nbsp;&nbsp;"{{key}}": {{item}}, <br></span>
        <span v-if="typeof item === 'string'">&nbsp;&nbsp;"{{key}}": "{{item}}", <br></span>
        <span v-if="typeof(item) ==='boolean'">&nbsp;&nbsp;"{{key}}": {{item}}, <br></span>
        <span v-if="typeof(item) ==='object'">
        &nbsp;&nbsp;"{{key}}": [<br>
        <span v-for="(opt, index) in item" :key="'opt'+index">&nbsp;&nbsp;&nbsp;&nbsp;{{opt}}, <br></span>
        &nbsp;&nbsp;]
        </span>
    </span>
    }
</div>
</div>

<div style="width:500px;float: left;">
  <a-form
    ref="ruleForm2"
    :rules="rules2"
    :model="form"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item ref="name" label="Activity name" name="name">
      <a-input v-model:value="form.name" />
    </a-form-item>
    <a-form-item label="Activity zone" name="region">
      <a-select v-model:value="form.region" placeholder="please select your zone">
        <a-select-option value="shanghai">
          Zone one
        </a-select-option>
        <a-select-option value="beijing">
          Zone two
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="Activity time" required name="date1">
      <a-date-picker
        v-model:value="form.date1"
        show-time
        type="date"
        placeholder="Pick a date"
        style="width: 100%;"
      />
    </a-form-item>
    <a-form-item label="Instant delivery" name="delivery">
      <a-switch v-model:checked="form.delivery" />
    </a-form-item>
    <a-form-item label="Activity type" name="type">
      <a-checkbox-group v-model:value="form.type">
        <a-checkbox value="1" name="type">
          Online
        </a-checkbox>
        <a-checkbox value="2" name="type">
          Promotion
        </a-checkbox>
        <a-checkbox value="3" name="type">
          Offline
        </a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="Resources" name="resource">
      <a-radio-group v-model:value="form.resource">
        <a-radio value="1">
          Sponsor
        </a-radio>
        <a-radio value="2">
          Venue
        </a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="Activity form" name="desc">
      <a-textarea v-model:value="form.desc" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">
        Create
      </a-button>
      <a-button style="margin-left: 10px;" @click="resetForm">
        Reset
      </a-button>
    </a-form-item>
  </a-form>
</div>

</template>

<script>
import { ref, reactive } from 'vue'
import nfInput from '@/components/nf-form/nf-form-item.vue'

export default {
  name: 'ant-form',
  components: {
    nfInput
  },
  data () {
    return {
      modelValue: {},
      metaInfo: {},
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      other: '',
      form: {
        name: '',
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        companyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
          { min: 3, max: 5, message: '字数在3-5之间', trigger: 'blur' }
        ],
        companyCode: [{ required: true, message: '请输入邮编', trigger: 'blur' }],
        createDate: [
          { required: true, message: '请选择日期', trigger: 'change', type: 'string' }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change'
          }
        ],
        resource: [
          { required: true, message: 'Please select activity resource', trigger: 'change' }
        ],
        desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }]
      },
      rules2: {
        name: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
        ],
        region: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
        date1: [
          { required: true, message: 'Please pick a date', trigger: 'change', type: 'object' }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change'
          }
        ],
        resource: [
          { required: true, message: 'Please select activity resource', trigger: 'change' }
        ],
        desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }]
      }
    }
  },
  created: function () {
    const json = require('./json/FormDemo.json') // 加载meta信息，json格式
    this.modelValue = reactive({}) // 放数据的model
    this.metaInfo = reactive(json.company.formItem) // 表单需要的meta信息
    // 根据meta 设置model
    for (var key in this.metaInfo) {
      var meta = this.metaInfo[key]
      this.modelValue[meta.colName] = ''
    }
  },
  methods: {
    onSubmit () {
      this.$refs.ruleForm
        .validate()
        .then(() => {
          console.log('values', this.form)
        })
        .catch(error => {
          console.log('error', error)
        })
      this.$refs.ruleForm2
        .validate()
        .then(() => {
          console.log('values', this.form)
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
      this.$refs.ruleForm2.resetFields()
    },
    myblur: function () {
      // alert('blur')
    }
  }
}
</script>
