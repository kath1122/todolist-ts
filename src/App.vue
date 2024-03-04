<script lang="ts">
// 引入 defineComponent() 以正确推断 setup() 组件的参数类型
import { defineComponent } from 'vue'
import TodoList from './components/TodoList.vue'

export default defineComponent({
  name: 'App',
  components: {
    TodoList,
  },
})
</script>

<template>
  <TodoList msg="ToDoList"></TodoList>
</template>

<style scoped>

</style>./components/TodoList.vue
