<template>
  <div class="inline-flex items-center justify-between w-full">
    <div class="fixed-column">
        <el-tooltip v-if="isExpired"
          class="box-item"
          effect="dark"
          content="expired"
          placement="right-start"
        >
          <el-icon color="red"><WarningFilled /></el-icon>
        </el-tooltip>
    </div>
    <label class="inline-flex items-center justify-center w-6 h-6">
      <input class="form-checkbox w-full h-full" type="checkbox" :checked="props.item.isComplete" @change="switchCompleteStatus">
    </label>
    <div class="inline-flex items-center w-40">
      <span ref="spanRef" class="w-full px-3 my-1.5 py-1.5 overflow-hidden overflow-ellipsis" :class="{'text-gray-400': editData.isComplete }" v-show="!isEdit" @click="editItem">{{props.item?.text}}</span>
      <el-input ref="inputRef" :class="{'w-60': isEdit, 'flex-grow': !isEdit}"
        v-show="isEdit"
        type="text" 
        v-model="editData.text"
        @keyup.enter ="saveItem"
        @blur="saveItem">
      </el-input>
    </div>
    <div class="inline-flex items-center">
      <el-button class="bg-red-400 float-right" :icon="Delete" type="danger" @click="deleteItem">delete</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useTodoStore } from '../stores/todo'
import type { Todo } from '@/types/todo';
// TODO: tsconfig 加了compilerOptions還是有紅字
import { ElMessageBox } from "element-plus";
import {
  Delete, WarningFilled
} from '@element-plus/icons-vue'
import {
    putTaskItem,delTaskItem
  } from "@/api";

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

const isEdit = ref(false)
const todoStore = useTodoStore()
const isComplete = ref<boolean>(props.item.isComplete)
const editData = ref<Todo>({text: '', isComplete: isComplete.value, id: 0})
const expirationDate = new Date();
const inputRef = ref<HTMLInputElement | null>(null); 
const spanRef = ref<HTMLSpanElement | null>(null);

const isExpired = computed(() => {
  if (!props.item.date) return false;
  const createdDate = new Date(props.item.date);
  return createdDate < expirationDate;
});

const deleteItem = () => {
  ElMessageBox.confirm(`Confirm to delete?`, "Delete operation", {
    confirmButtonText: "Delete",
    cancelButtonText: "cancel",
    type: "warning",
  }).then(() => {
    todoStore.deleteItem(props.item.id ?? 0)
    delTaskItem(props.item.id ?? 0).then(() => {
      alert('This todo has been deleted')
    });
  });
}
const editItem = () => {
  isEdit.value = true
  editData.value.id = props.item.id
  editData.value.text = props.item.text
  editData.value.isComplete = props.item.isComplete
  nextTick(() => {
    if (inputRef.value !== null) {
      inputRef.value.focus();
    }
  });
}

const saveItem = () => {
  if(!editData.value.text){
      return
  }

  todoStore.updateItem(editData.value, props.item.id ?? 0)
  putTaskItem(editData.value, props.item.id ?? 0).then(({ data }) => {
    alert(data.message)
  });
  
  editData.value.text = ''
  isEdit.value = false
}

const switchCompleteStatus = (event: Event) => {
  const isChecked = (event.target as HTMLInputElement).checked;
  editData.value = {...props.item, isComplete: isChecked}
  todoStore.updateItem(editData.value, props.item.id ?? 0)
  putTaskItem(editData.value, props.item.id ?? 0).then(({ data }) => {
    alert(data.message)
  });
}
</script>
<style lang="postcss" scoped>
.button {
  @apply text-white mx-1 my-1.5 px-4 py-1.5 rounded;
}
.fixed-column {
  width: 30px;
}
</style>
