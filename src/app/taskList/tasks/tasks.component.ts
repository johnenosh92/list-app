import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { TasksService } from '../services/tasks.service';
import { TasksList } from '../services/tasks.service';
import { Router } from '@angular/router';


/**
 * @title Table with selection
 */
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  displayedColumns: string[] = ['select', 'taskID', 'taskTitle', 'actions'];
  dataSource = new MatTableDataSource<TasksList>();
  selection = new SelectionModel<TasksList>(true, []);
  cellIndex: any;
  constructor(private tasksService: TasksService,private router: Router) {

  }
  ngOnInit(): void {
    let tasksListData = this.tasksService.getTasksList();
    if(tasksListData !== null){
      this.dataSource.data = tasksListData;
      this.tasksService.updateTasks(tasksListData);
    }
    else {
      this.dataSource.data = this.tasksService.taskData;
    }
    
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  selectedTasks() {
    return this.selection.selected;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: TasksList): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.taskID + 1}`;
  }

  onEdit(taskIndex: number) {
    this.tasksService.editIndex = taskIndex;
    this.router.navigate(['/add-edit/edit']);

  }

  onDelete(taskIndex:number) {
    let  currentData = this.dataSource.data;
    currentData.splice(taskIndex, 1);
    this.dataSource.data = currentData;
    this.tasksService.updateTasks(this.dataSource.data);
  }
  
  addTask() {
    this.router.navigate(['/add-edit/add']);
  }
  showConfirmation = false;
  showMultipleConfirmation = false;
  openConfirmation(i) {
    this.showConfirmation = true;
    this.cellIndex = i;
  }

  openMultipleConfirmation() {
    this.showMultipleConfirmation = true;
  }

  onDeleteConfirmed(confirmed: boolean) {
    if (confirmed) {
      this.onDelete(this.cellIndex);
      console.log('Item deleted!');
    }
    this.showConfirmation = false;
  }

  onDeleteMultipleConfirmed(confirmed: boolean) {
    if (confirmed) {
      this.deleteSelected();
    }
    this.showMultipleConfirmation = false;
  }
  deleteSelected() {
    this.selection.selected.forEach(sel => {
      this.onDelete(this.getTaskIndex(sel));
    })
  }

  getTaskIndex(task:TasksList) {
    return this.dataSource.data.findIndex(el => (el.taskID === task.taskID && el.taskDetails === task.taskDetails && el.taskTitle === task.taskTitle))
  }
}

