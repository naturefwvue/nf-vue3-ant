<template>
  <div class="home">
    <nfInput v-model="value" :meta="metaInfo"  /> {{value}}
    <nfHelp v-model="metaInfo" />
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from 'vue'
import nfHelp from '@/components/help-meta-form.vue'
import nfInput from '@/components/nf-form/nf-form-item.vue'

export default {
  name: 'FormHelp',
  components: {
    // nfFormItem,
    nfHelp,
    nfInput
  },
  setup () {
    const value = ref('')
    const metaInfo = ref({
      controlId: 100,
      controlType: 101,
      colName: 'controlId'
    })

    return {
      value,
      metaInfo
    }
  }
}
</script>
