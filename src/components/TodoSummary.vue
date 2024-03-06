<template>
      <span class="completed sum">已完成: {{ completeItems }}</span> / 
      <span class="sum">全部: {{ total }}</span>
</template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { useTodoStore } from '../stores/todo'
  
  const completeItems = computed(() => useTodoStore().completeItemsLength);
  const total = computed(() => useTodoStore().todoItems.length)
  </script>
  
  <style scoped>
  .completed {
    color: green;
  }
  .sum {
    font-weight: bold;
  }
  </style>
  