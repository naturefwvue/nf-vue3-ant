<template>
  <div id="app">
    <div id="nav">
      <router-link to="/bbs">BBS</router-link>|
      <router-link to="/formMetaHelp">表单metaHelp</router-link>|
      <router-link to="/formDemo">表单demo</router-link>|
      <router-link to="/findDemo">查询组件</router-link>|
      <router-link to="/zsgc">增删改查</router-link>|
      <router-link to="/Plat">支撑平台</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      axiosInfo: ''
    }
  },
  created: function () {
    this.axios.defaults.baseURL = 'http://localhost:8001/api/'
    /*
    const instance = this.axios.create({
      baseURL: 'http://localhost:8001/api1/',
      timeout: 1000,
      headers: { 'X-Custom-Header': 'foobar' }
    })
    this.axiosInfo = instance
    */
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
