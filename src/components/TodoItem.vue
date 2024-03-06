<template>
    <li class="flex">
        <input :disabled="!isEdit" type="checkbox" v-model="editData.isComplete">
        <span class="fix-width" v-show="!isEdit">{{props.item?.text}}</span>
        <input class="fix-width" v-show="isEdit" type="text" v-model="editData.text">
        <button v-show="isEdit" type="button" @click="saveItem">保存</button>
        <button v-show="!isEdit" type="button" @click="editItem(item)">編輯</button>
        <button type="button" @click="deleteItem">刪除</button>
    </li>
</template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useTodoStore } from '../stores/todo'
  import type { Todo,CurItem } from '@/types/todo';
  
  const props = defineProps({
    item: {
        type: Object as () => Todo,
        required: true
    },
    index: {
        type: Number,
        required: true
    }
  })

  const {item, index} = props
  const isEdit = ref(false)
  const todoStore = useTodoStore()
  const isComplete = ref<boolean>(item.isComplete)
  const editData = ref<CurItem>({text: '', isComplete})
  const curIdx = ref<number>(0)

    
  const deleteItem = () => {
    todoStore.deleteItem(props.index)
  }
  const editItem = (item: Todo) => {
    isEdit.value = true
    curIdx.value = todoStore.todoItems.findIndex(function(todo){
      return todo.id === item.id;
    })
    editData.value.text = item.text
    editData.value.isComplete = item.isComplete
  }

  const saveItem = () => {
    if(!editData.value.text){
        return
    }
    todoStore.updateItem(editData.value, curIdx.value)
    editData.value.text = ''
    isEdit.value = false
  }
      
  </script>
  
  <style scoped>
  .flex{
    display: flex;
  }
  .fix-width{
    display: inline-block;
    width: 200px;
  }
  </style>
  