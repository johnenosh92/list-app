import { Injectable } from '@angular/core';

export interface TasksList {
  taskID:number;
  taskTitle: string;
  taskDetails: string;
}


@Injectable({
  providedIn: 'root',
})

export class TasksService {
  
taskData: TasksList[] = [
  {taskID:1, taskTitle:"Login to",taskDetails:"Login to the portal manually"},
  {taskID:2, taskTitle:"Tasks for the day",taskDetails:"Work on your tasks assigned"},
  {taskID:3, taskTitle:"Log off",taskDetails:"Log off from the portal manually"}
];
  editIndex: number;
  updateTasks(taskList:TasksList[]) {
    localStorage.setItem("tasks", JSON.stringify(taskList));
    this.taskData = taskList;
  }

  getTasksList(): any {
    const item = localStorage.getItem("tasks");
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
