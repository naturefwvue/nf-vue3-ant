<!--功能菜单，暂时-->
<template>
  <div style="width: 180px">
    <a-button type="primary" @click="toggleCollapsed" style="margin-bottom: 16px">
      <MenuUnfoldOutlined v-if="collapsed" />
      <MenuFoldOutlined v-else />
    </a-button>
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <a-menu-item key="1">
        <PieChartOutlined />
        <span>预留</span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <template v-slot:title>
          <span><MailOutlined /><span>辅助工具</span></span>
        </template>
        <a-menu-item key="5">Excel</a-menu-item>
        <a-menu-item key="6">数据库</a-menu-item>
        <a-menu-item key="7">表信息</a-menu-item>
        <a-menu-item key="8">项目信息</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template v-slot:title>
          <span><AppstoreOutlined /><span>功能演示</span></span>
        </template>
        <a-menu-item key="company">公司信息</a-menu-item>
        <a-menu-item key="person">员工信息</a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="11">
            Option 11
          </a-menu-item>
          <a-menu-item key="12">
            Option 12
          </a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined
} from '@ant-design/icons-vue'

export default {
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
    AppstoreOutlined
  },
  data () {
    return {
      collapsed: false,
      selectedKeys: ['1'],
      openKeys: ['sub1'],
      preOpenKeys: ['sub1']
    }
  },
  watch: {
    openKeys (val, oldVal) {
      this.preOpenKeys = oldVal
    },
    selectedKeys (val, oldVal) {
      this.$emit('menuclick', val) // 返回给中间组件
      // this.preOpenKeys = oldVal
    }
  },
  methods: {
    toggleCollapsed () {
      this.collapsed = !this.collapsed
      this.openKeys = this.collapsed ? [] : this.preOpenKeys
    }
  }
}
</script>
