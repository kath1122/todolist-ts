<template>
  <div class="todo-list">
    <ul v-for="(item, index) in items" :key="item.id">
      <li>
        {{item.text}}
        <button type="button" @click="editItem(item, index)">編輯</button>
        <button type="button" @click="deleteItem(index)">刪除</button>
      </li>
    </ul>
  </div>
  <hr>
  <div class="todo-footer">
    <input type="text" v-model="cacheData.text">
    <button type="button" @click="saveItem">保存</button>
  </div>
</template>

<script lang="ts">
// defineProps<{
//   msg: string
// }>()
import { defineComponent, ref } from 'vue'
import { useTodoStore } from '../stores/todo'

import type { Todo, CacheData } from '@/types/todo'

export default defineComponent({
  name: 'TodoList',
  setup: () => {
    let cacheData = ref<CacheData>({id: 0, text: '', index: 0})
    const todoStore = useTodoStore()
    const items = todoStore.todoItems
    
    const deleteItem = (index: number) => {
      todoStore.deleteItem(index)
    }
    const editItem = (item: Todo, index: number) => {
      cacheData.value = {...item, index}
    }

    const saveItem = () => {
      if(!cacheData.value.text){
        return
      }
      todoStore.updateItem(cacheData.value.text, cacheData.value.index)
      cacheData.value.text = ''
    }
    
    return {
      items,
      cacheData,
      deleteItem,
      editItem,
      saveItem
    }
  }
})
</script>

<style scoped>
</style>
