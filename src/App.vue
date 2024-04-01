<template>
  <div class="navBar">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/todo">TodoList</RouterLink>
  </div>
  <router-view></router-view>
</template>
<style>
.navBar {
  width: 100%;
  font-size: 12px;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: #fff;
}
.navBar a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid #000;
}

.navBar a:first-of-type {
  border: 0;
}
</style>