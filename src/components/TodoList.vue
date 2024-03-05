<template>
  <div class="todo-list">
    <ul v-for="(item, index) in items" :key="item.id">
      <TodoItem :item="item" :index="index"></TodoItem>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from '../stores/todo'
import TodoItem from './TodoItem.vue'

const todoStore = useTodoStore()
const items = todoStore.todoItems
    
</script>

<style scoped>
</style>
