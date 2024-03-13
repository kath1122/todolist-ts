<template>
  <div class="inline-flex w-52 items-center">
    <span class="text-green-600 font-bold">Completed: {{ completeItems }}</span> / 
    <span class="font-bold">Total: {{ total }}</span>
  </div>
  <button class="bg-red-400 text-white mx-1 my-1.5 px-4 py-1.5 rounded" type="button" @click="clearCompletedTodos">Clear Task completed</button>
</template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { useTodoStore } from '../stores/todo'
  
  const completeItems = computed(() => useTodoStore().todoItems.filter(item => item.isComplete).length)
  const total = computed(() => useTodoStore().todoItems.length)
  
  const clearCompletedTodos = () => {
    useTodoStore().todoItems = useTodoStore().todoItems.filter(item => !item.isComplete)
  }
  </script>
  
  <style scoped>
  
  </style>
  