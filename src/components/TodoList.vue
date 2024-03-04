<template>
  <div class="todo-list">
    <ul v-for="(item, index) in items" :key="item.id">
      <li>
        {{item.text}}
        <button type="button" @click="deleteItem(index)">刪除</button>
      </li>
    </ul>
  </div>
  <hr>
  <div class="todo-footer">
    {{ cacheData }}
  </div>
</template>

<script lang="ts">
// defineProps<{
//   msg: string
// }>()
import { defineComponent, ref } from 'vue'
import { useTodoStore } from '../stores/todo'

export default defineComponent({
  name: 'TodoList',
  setup: () => {
    const todoStore = useTodoStore()
    let cacheData = {}
    const items = todoStore.todoItems
    
    const deleteItem = (index: number) => {
      todoStore.deleteItem(index)
    }
    // const saveItem = () => {

    // }
    
    return {
      items,
      cacheData,
      deleteItem,
    }
  }
})
</script>

<style scoped>
</style>
