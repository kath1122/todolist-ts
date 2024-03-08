<template>
    <li class="flex">
        <input type="checkbox" :checked="editData.isComplete" @change="switchCompleteStatus">
        <span class="fix-width" v-show="!isEdit">{{props.item?.text}}</span>
        <input class="fix-width" v-show="isEdit" type="text" v-model="editData.text">
        <button v-show="isEdit" type="button" @click="saveItem">保存</button>
        <button v-show="!isEdit" type="button" @click="editItem">編輯</button>
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

  const {item} = props
  const isEdit = ref(false)
  const todoStore = useTodoStore()
  const isComplete = ref<boolean>(item.isComplete)
  const editData = ref<CurItem>({text: '', isComplete: isComplete})
    
  const deleteItem = () => {
    todoStore.deleteItem(item.id)
  }
  const editItem = () => {
    isEdit.value = true
    editData.value.text = item.text
    editData.value.isComplete = item.isComplete
  }

  const saveItem = () => {
    if(!editData.value.text){
        return
    }
    todoStore.updateItem(editData.value, item.id)
    editData.value.text = ''
    isEdit.value = false
  }
      
  const switchCompleteStatus = (event) => {
    const isChecked = (event.target as HTMLInputElement).checked;
    editData.value = {...item, isComplete: isChecked}
    todoStore.updateItem(editData.value, item.id)
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
  