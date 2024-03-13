<template>
  <div class="todo-list">
    <ul v-for="(item, index) in todoItems" :key="`${item.id}${index}`">
      <TodoItem :item="item" :index="index"></TodoItem>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from '../stores/todo'
import { storeToRefs } from 'pinia';
import TodoItem from './TodoItem.vue'

const todoStore = useTodoStore()
const { todoItems } = storeToRefs(todoStore)
    
</script>

<style scoped>
.todo-list { margin-left: -40px;}
</style>
