import request from "@/utils/request";

export function getAllTasks() {
  return request({
    url: "/employees",
    method: "get",
  });
}

export function addNewTask(form) {
  return request({
    url: "/employee",
    method: "post",
    data: form 
  });
}

export function putTaskItem(form, id) {
  return request({
    url: `/employee/${id}`,
    method: "put",
    data: form 
  });
}

export function delTaskItem(id) {
  return request({
    url: `/employee/${id}`,
    method: "delete"
  });
}