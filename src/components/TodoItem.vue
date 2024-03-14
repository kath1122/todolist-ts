<template>
    <li class="inline-flex">
      <div class="inline-flex w-52 items-center">
        <input class="form-checkbox text-green-500 h-5 w-5" type="checkbox" :checked="editData.isComplete" @change="switchCompleteStatus">
        <span class="w-48 my-1.5 px-4 py-1.5" :class="{'text-gray-400': editData.isComplete }" v-show="!isEdit">{{props.item?.text}}</span>
        <input class="border border-gray-300 rounded-l focus:border-green-500 focus:outline-none" v-show="isEdit" type="text" v-model="editData.text">
      </div>
      <button class="bg-green-600 button" v-show="isEdit" type="button" @click="saveItem">save</button>
      <button class="bg-yellow-400 button" v-show="!isEdit" type="button" @click="editItem">edit</button>
      <button class="bg-red-400 button" type="button" @click="deleteItem">delete</button>
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
const editData = ref<CurItem>({text: '', isComplete: isComplete})

const deleteItem = () => {
  todoStore.deleteItem(index)
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
  todoStore.updateItem(editData.value, index)
  editData.value.text = ''
  isEdit.value = false
}

const switchCompleteStatus = (event) => {
  const isChecked = (event.target as HTMLInputElement).checked;
  editData.value = {...item, isComplete: isChecked}
  todoStore.updateItem(editData.value, index)
}
</script>
<style lang="postcss" scoped>
.button {
  @apply text-white mx-1 my-1.5 px-4 py-1.5 rounded;
}
</style>
