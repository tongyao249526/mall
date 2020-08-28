<template>
  <div id="app">
    <VHeader></VHeader>
    <router-view></router-view>
  </div>
</template>
<script>
import VHeader from "./components/VHeader"
export default {
  name: 'App',
  components: {
    VHeader
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f5f7fc;
  min-height: 100vh;
  padding-bottom: 50px;
}
.fl {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}
.dir-c {
  /*纵向布局*/
  -webkit-box-orient: vertical;
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
}
.cen {
  /*横向纵向均居中*/
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}
.alic {
  /*垂直居中*/
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.jusc {
  /*水平居中*/
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}
.jusc-between {
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}
.pointer{
  cursor: pointer;
}
</style>
<style lang="less" scoped>

</style>
