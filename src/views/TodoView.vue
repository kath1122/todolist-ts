<script setup lang="ts">
import TodoInput from '@/components/TodoInput.vue'
import TodoList from '@/components/TodoList.vue'
import TodoSummary from '@/components/TodoSummary.vue'
</script>

<template>
  <div class="flex-col justify-center items-center">
    <TodoInput></TodoInput>
    <TodoList></TodoList>
    <TodoSummary></TodoSummary>
  </div>
</template>