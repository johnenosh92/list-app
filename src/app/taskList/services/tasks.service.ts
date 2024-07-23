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
  taskDataBackup: TasksList[] = [
    {taskID:1, taskTitle:"Check for Emails",taskDetails:"Check for any new emails you need to respond"},
    {taskID:2, taskTitle:"Tasks for the day",taskDetails:"Check for tasks that have been assigned for the day"},
    {taskID:3, taskTitle:"Attend meetings",taskDetails:"Check for meetings being scheduled and attend them"}
  ];

  taskData: TasksList[] = [
    {taskID:1, taskTitle:"Check for Emails",taskDetails:"Check for any new emails you need to respond"},
    {taskID:2, taskTitle:"Tasks for the day",taskDetails:"Check for tasks that have been assigned for the day"},
    {taskID:3, taskTitle:"Attend meetings",taskDetails:"Check for meetings being scheduled and attend them"}
  ];
  editIndex: number;
  //set tasks list data in local storage and local variable
  updateTasks(taskList:TasksList[]) {
    localStorage.setItem("tasks", JSON.stringify(taskList));
    this.taskData = taskList;
  }
  //get tasks from local storage
  getTasksList(): any {
    const item = localStorage.getItem("tasks");
    return item ? JSON.parse(item) : null;
  }
}
