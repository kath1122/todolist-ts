<template>
  <div class="inline-flex w-58 items-center p-5 fixed left-0 right-0 justify-center">
    <span class="text-red-400 font-bold">To Do: {{ notCompletedCount }}</span>&nbsp;/&nbsp;
    <span class="text-red-400 font-bold">Done: {{ completedCount }}</span>&nbsp;/&nbsp;
    <span class="font-bold">Total: {{ total }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTodoStore } from '../stores/todo'
import { storeToRefs } from 'pinia';

const todoStore = useTodoStore()
const { todoItems } = storeToRefs(todoStore)

const notCompletedCount = computed(() => {
  return todoItems.value.filter(item => !item.isComplete).length;
})

const completedCount = computed(() => {
  return todoItems.value.filter(item => item.isComplete).length;
})

const total = computed(() => {
  return todoItems.value.length
})

  </script>
