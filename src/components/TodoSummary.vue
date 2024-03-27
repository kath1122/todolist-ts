<template>
  <div class="inline-flex w-52 items-center">
    <span class="text-green-600 font-bold">Not completed: {{ notCompletedCount }}</span> /
    <span class="font-bold">Total: {{ total }}</span>
  </div>
  <el-button class="del-button" type="primary" @click="clearCompletedTodos">Clear Task completed</el-button>
</template>

  <script setup lang="ts">
  import { computed } from 'vue';
  import { useTodoStore } from '../stores/todo'
  import { storeToRefs } from 'pinia';

  const todoStore = useTodoStore()
  const { todoItems } = storeToRefs(todoStore)

  const notCompletedCount = computed(() => {
    const items = todoItems.value
    return items.filter(item => item && !item.isComplete).length
  })
  const total = computed(() => {
    const items = todoItems.value
    return items.length
  })

  const clearCompletedTodos = () => {
    todoItems.value.forEach((item) => {
      if (item.isComplete) {
        item.isShow = false
      }
    })
  }
  </script>

<style lang="postcss" scoped>
.del-button {
  @apply bg-red-400 text-white mx-1 my-1.5 rounded;
}
</style>
