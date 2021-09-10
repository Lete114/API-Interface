<template>
  <router-view></router-view>
</template>

<script>
export default {
  components: {}
}
</script>

<style>
body {
  background: #f4f4f4;
}
#main {
  display: flex;
  padding: 60px;
  flex-direction: column;
  align-content: flex-start;
}
@media screen and (max-width: 900px) {
  #main {
    padding: 10px;
  }
}
</style>

