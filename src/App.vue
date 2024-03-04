<script lang="ts">
// 引入 defineComponent() 以正确推断 setup() 组件的参数类型
import { defineComponent } from 'vue'
import TodoHeader from './components/TodoHeader.vue'
import TodoList from './components/TodoList.vue'

export default defineComponent({
  name: 'App',
  components: {
    TodoHeader,
    TodoList,
  },
})
</script>

<template>
  <TodoHeader msg="ToDoList"></TodoHeader>
  <TodoList></TodoList>
</template>

<style scoped>

</style>