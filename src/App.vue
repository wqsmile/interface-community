<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
@import '~@/assets/css/reset.css';
@import '~@/assets/css/font.css';
body {
  min-width: 300px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.app-enter,
.app-leave-to {
  opacity: 0;
  transform: translateX(-300px);
}
.app-enter-active,
.app-leave-active {
  transition: all .3s ease;
}
.app-enter-to,
.app-leave {
  opacity: 1;
  transform: translateX(0px);
}
</style>
