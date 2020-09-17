<template>
  <div class="about">
    <h1 @click="myClick">This is an about page</h1>
    <a-input v-model:value="value" placeholder="companyCode" /> <br>
    {{value}}<br>
    <nfInput  @pressenter="myPressEnter" v-model="modelValue.name" :meta="metaInfo" /><br>
    外面：{{modelValue}}
<div class="ant-table ant-table-default ant-table-bordered ant-table-scroll-position-left">
<div class="ant-table-content">
    <div class="ant-table-body">
      <table class="">
        <colgroup><col style="width: 30%; min-width: 30%;"><col><col><col>
        </colgroup>
        <tbody class="ant-table-tbody">
          <tr data-row-key="1" class="ant-table-row ant-table-row-level-0">
            <td class="ant-table-row-cell-break-word">
              <a>John Brown</a>
            </td>
            <td class="ant-table-row-cell-break-word">
              32
            </td>
          </tr>
          <tr data-row-key="2" class="ant-table-row ant-table-row-level-0">
            <td class="ant-table-row-cell-break-word"><!----><!---->
              <a>Jim Green</a>
            </td>
            <td class="ant-table-row-cell-break-word"><!----><!---->42</td>
          </tr>
          <tr data-row-key="3" class="ant-table-row ant-table-row-level-0">
            <td class="ant-table-row-cell-break-word"><!----><!---->
              <a>Joe Black</a>
            </td>
            <td class="ant-table-row-cell-break-word"><!----><!---->32</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  </div>
  <!---->
    <div class="ant-table-body">
      <table class="">
        <colgroup>
        <col>
        <col>
        <col>
        <col>
        <col>
        </colgroup>
        <thead class="ant-table-thead">
          <tr>
            <th class="">
              <span class="ant-table-header-column">
                <div class="">
                  <span class="ant-table-column-title"><span>
                    <span role="img" aria-label="smile" class="anticon anticon-smile">
                      <svg class="" data-icon="smile" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896" focusable="false">
                        <path d="M288 421a48 48 0 1096 0 48 48 0 10-96 0zm352 0a48 48 0 1096 0 48 48 0 10-96 0zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2A370.4 370.4 0 01248.9 775c-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8A370.4 370.4 0 01249 248.9c34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2A370.4 370.4 0 01775.1 249c34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8A368.89 368.89 0 01775 775zM664 533h-48.1c-4.2 0-7.8 3.2-8.1 7.4C604 589.9 562.5 629 512 629s-92.1-39.1-95.8-88.6c-.3-4.2-3.9-7.4-8.1-7.4H360a8 8 0 00-8 8.4c4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6a8 8 0 00-8-8.4z">
                        </path>
                      </svg>
                    </span> Name</span>
                  </span>
                  <span class="ant-table-column-sorter"><!---->
                  </span>
                </div>
              </span><!---->
            </th>
            <th class="">
              <span class="ant-table-header-column">
                <div class="">
                  <span class="ant-table-column-title">Age</span>
                  <span class="ant-table-column-sorter"><!----></span>
                </div>
              </span><!----></th>
            <th class="">
              <span class="ant-table-header-column">
                <div class="">
                  <span class="ant-table-column-title">Address</span>
                  <span class="ant-table-column-sorter"><!----></span>
                </div>
              </span><!---->
            </th>
            <th class="">
              <span class="ant-table-header-column">
                <div class="">
                  <span class="ant-table-column-title">Tags</span>
                  <span class="ant-table-column-sorter"><!----></span>
                </div>
              </span><!---->
            </th>
            <th class="ant-table-row-cell-last">
              <span class="ant-table-header-column">
                <div class="">
                  <span class="ant-table-column-title">Action</span>
                  <span class="ant-table-column-sorter"><!----></span>
                </div>
              </span><!---->
            </th>
          </tr>
        </thead>
        <tbody class="ant-table-tbody">
          <tr data-row-key="1" class="ant-table-row ant-table-row-level-0">
            <td class="">
              <a>John Brown</a>
            </td>
            <td class="">
              32
            </td>
            <td class="">
              New York No. 1 Lake Park
            </td>
            <td class=""><!----><!---->
              <span>
                <span class="ant-tag ant-tag-green">NICE
                </span>
                <span class="ant-tag ant-tag-geekblue">DEVELOPER<!----></span>
              </span>
            </td>
            <td class=""><!----><!---->
              <span>
                <a>Invite 一 John Brown</a>
                <div class="ant-divider ant-divider-vertical" role="separator"><!----></div>
                <a>Delete</a>
                <div class="ant-divider ant-divider-vertical" role="separator"><!----></div>
                <a class="ant-dropdown-link"> More actions
                  <span role="img" aria-label="down" class="anticon anticon-down">
                    <svg class="" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896" focusable="false">
                      <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z">
                      </path>
                    </svg>
                  </span>
                </a>
              </span>
            </td>
          </tr>
          <tr data-row-key="2" class="ant-table-row ant-table-row-level-0">
            <td class=""><!----><!---->
              <a>Jim Green</a>
            </td>
            <td class=""><!----><!---->42</td>
            <td class="">
              London No. 1 Lake Park
            </td>
            <td class="">
              <span>
                <span class="ant-tag ant-tag-volcano">
                  LOSER<!---->
                </span>
              </span>
            </td>
            <td class=""><!----><!---->
              <span>
                <a>Invite 一 Jim Green</a>
                <div class="ant-divider ant-divider-vertical" role="separator"></div>
                <a>Delete</a>
                <div class="ant-divider ant-divider-vertical" role="separator"></div>
                <a class="ant-dropdown-link">
                  More actions
                  <span role="img" aria-label="down" class="anticon anticon-down">
                    <svg class="" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896" focusable="false">
                      <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z">
                      </path>
                    </svg>
                  </span>
                </a>
              </span>
            </td>
          </tr>
          <tr data-row-key="3" class="ant-table-row ant-table-row-level-0">
            <td class=""><!----><!---->
              <a>Joe Black</a>
            </td>
            <td class=""><!----><!---->32</td>
            <td class=""><!----><!---->Sidney No. 1 Lake Park</td>
            <td class=""><!----><!---->
              <span>
                <span class="ant-tag ant-tag-green">COOL<!----></span>
                <span class="ant-tag ant-tag-geekblue">TEACHER<!----></span>
              </span>
            </td>
            <td class=""><!----><!---->
              <span>
                <a>Invite 一 Joe Black</a>
                <div class="ant-divider ant-divider-vertical" role="separator"><!----></div>
                <a>Delete</a>
                <div class="ant-divider ant-divider-vertical" role="separator"><!----></div>
                <a class="ant-dropdown-link"> More actions
                  <span role="img" aria-label="down" class="anticon anticon-down">
                    <svg class="" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896" focusable="false">
                      <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z">
                      </path>
                    </svg>
                  </span>
                </a>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref, watch, registerRuntimeCompiler } from 'vue'
import nfInput from '@/components/nf-form-select.vue'
import antForm from '@/components/ant-form.vue'

export default {
  name: 'About',
  components: {
    nfInput
  },
  setup () {
    const value = ref(140)
    const modelValue = ref({
      name: '5'
    })
    const metaInfo = ref({
      controlId: 1000,
      colName: 'companyName',
      controlType: 140,
      isClear: true,
      disabled: false,
      required: true,
      readonly: false,
      pattern: '',
      class: '',
      placeholder: '请输入公司名称',
      title: '公司名称',
      autocomplete: 'on',
      size: 30,
      cols: 100,
      mix: 1,
      max: 100,
      step: 1,
      maxlength: 100,
      optionList: [{
        value: '1',
        title: '选项一'
      },
      {
        value: '2',
        title: '选项二'
      }
      ]
    })
    watch(() => value.value, val => {
      console.log(`count is ${val}`)
      metaInfo.value.controlType = parseInt(val)
    })
    const isLoding = ref(false)
    const myClick = () => {
      isLoding.value = !isLoding.value
      modelValue.value.name = !modelValue.value.name
    }
    const myPressEnter = (e, colName) => {
      alert('外部')
      alert(e)
      alert(colName)
    }

    return {
      value,
      modelValue,
      metaInfo,
      isLoding,
      myClick,
      myPressEnter
    }
  }
}
</script>
