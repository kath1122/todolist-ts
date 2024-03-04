<template>
  {{ msg }}
  <div class="todo-header">
    <input type="text" v-model="newItem">
    <button type="button" @click="addItem">新增</button>
  </div>
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
  </div>
</template>

<script lang="ts">
// defineProps<{
//   msg: string
// }>()
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'TodoList',
  props: {
    msg: {
      type: String,
      require: true
    }
  },
  setup: () => {
    const newItem = ref('')
    let cacheData = {}
    const items = ref([
      {
        id: 1,
        text: 'item1-aaaa'
      }
    ])
    const addItem = () => {
      if(!newItem.value.trim()) {
        console.log('請輸入值')
        return
      }
      const todo = {
        id: Date.now(),
        text: newItem.value
      }
      items.value.unshift(todo)
      newItem.value = ''
    }
    const deleteItem = (index: number) => {
      items.value.splice(index,1)
    }
    const saveItem = () => {

    }
    
    return {
      items,
      cacheData,
      newItem,
      addItem,
      deleteItem,
    }
  }
})
</script>

<style scoped>
</style>
