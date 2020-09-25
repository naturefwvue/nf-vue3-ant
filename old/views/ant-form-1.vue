<template>
  <a-form
    :model="form"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item label="姓名">
      <a-input v-model:value="form.name" />
    </a-form-item>
    <a-form-item label="班级">
      <a-select v-model:value="form.region" placeholder="选择你的班级">
        <a-select-option value="1">
          班级一 11
        </a-select-option>
        <a-select-option value="2">
          班级二
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="生日">
      <a-date-picker
        v-model:value="form.date1"
        show-time
        type="date"
        placeholder="选择日期"
        style="width: 100%;"
      />
    </a-form-item>
    <a-form-item label="是否同意">
      <a-switch v-model:checked="form.delivery" />
    </a-form-item>
    <a-form-item label="可以多选">
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
    <a-form-item label="只能单选">
      <a-radio-group v-model:value="form.resource">
        <a-radio value="1">
          Sponsor
        </a-radio>
        <a-radio value="2">
          Venue
        </a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="再说点啥">
      <a-input v-model:value="form.desc" type="textarea" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">
        提交
      </a-button>
      <a-button style="margin-left: 10px;">
        不干了
      </a-button>
    </a-form-item>
  </a-form>
  {{form}}
</template>

<script>
const formMeta = {
  title: ''
}
export default {
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: '',
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!', this.form)
    }
  }
}
</script>
