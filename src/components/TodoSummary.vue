<template>
  <hr>
  <span class="fix-width">
    <span class="completed sum">已完成: {{ completeItems }}</span> / 
    <span class="sum">全部: {{ total }}</span>
  </span>
  <button type="button" @click="clearCompletedTodos">清除已完成</button>
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
  .completed {
    color: green;
  }
  .sum {
    font-weight: bold;
  }
  .fix-width{
    display: inline-block;
    width: 213px;
  }
  </style>
  