<template>
  <div class="inline-flex w-52 items-center">
    <span class="text-green-600 font-bold">Completed: {{ completeItems }}</span> /
    <span class="font-bold">Total: {{ total }}</span>
  </div>
  <button class="del-button" type="button" @click="clearCompletedTodos">Clear Task completed</button>
  <button class="del-button" type="button" @click="selectItem">Checked ALL</button>
</template>

  <script setup lang="ts">
  import { computed } from 'vue';
  import { useTodoStore } from '../stores/todo'

  const completeItems = computed(() => {
    const items = useTodoStore().todoItems
    return items ? items.filter(item => item && item.isComplete).length : 0;
  })
  const total = computed(() => {
    const items = useTodoStore().todoItems
    return items? items.length : 0
  })

  const clearCompletedTodos = () => {
    useTodoStore().todoItems = useTodoStore().todoItems.filter(item => !item.isComplete)
  }

  const selectItem = () => {
    useTodoStore().todoItems.forEach(item => item.isComplete = true)
  }

  </script>

<style lang="postcss" scoped>
.del-button {
  @apply bg-red-400 text-white mx-1 my-1.5 px-4 py-1.5 rounded;
}
</style>