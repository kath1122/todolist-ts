<template>
  <div class="navbar fixed top-0 left-0 w-full h-16 flex items-center justify-center">
    <div class="mr-4">
      <RouterLink to="/">Home</RouterLink>
    </div>
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
  background-color: #fff;
  padding: 1rem 0;
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