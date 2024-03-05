<template>
    <li class="flex">
        <span class="fix-width" v-show="!isEdit">{{props.item?.text}}</span>
        <input class="fix-width" v-show="isEdit" type="text" v-model="textEdit">
        <button v-show="isEdit" type="button" @click="saveItem">保存</button>
        <button v-show="!isEdit" type="button" @click="editItem">編輯</button>
        <button type="button" @click="deleteItem">刪除</button>
    </li>
</template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useTodoStore } from '../stores/todo'
  
  const props = defineProps({
    item: {
        type: Object,
        require: true
    },
    index: {
        type: Number,
        require: true
    }
  })

  const isEdit = ref(false)
  const todoStore = useTodoStore()
  const textEdit = ref('')
    
  const deleteItem = () => {
    todoStore.deleteItem(props.index)
  }
  const editItem = () => {
    isEdit.value = true
    textEdit.value = props.item?.text
  }

  const saveItem = () => {
    if(!textEdit.value){
        return
    }
    todoStore.updateItem(textEdit.value, props.index)
    textEdit.value = ''
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
  