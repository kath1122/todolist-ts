<template>
  <div class="inline-flex w-58 items-center p-5 fixed bottom-0 left-0 right-0">
    <span class="text-red-400 font-bold">Not completed: {{ notCompletedCount }}</span>&nbsp;/&nbsp;
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
  return todoItems.value.filter(item => !item.isComplete && item.isShow).length
})

const total = computed(() => {
  return todoItems.value.filter(item => item.isShow).length
})

  </script>
