import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
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
  @ViewChild(MatTable) table: MatTable<any>;

  displayedColumns: string[] = ['select', 'taskTitle', 'actions'];
  dataSource = new MatTableDataSource<TasksList>();
  selection = new SelectionModel<TasksList>(true, []);
  cellIndex: any;
  showConfirmation = false;
  showMultipleConfirmation = false;

  constructor(private tasksService: TasksService,private router: Router) {
  }
  //initialize table with default data
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
  // check if all are selected
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  //get selected tasks
  selectedTasks() {
    return this.selection.selected;
  }
  //toggle all funtionality
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }
  //get label
  checkboxLabel(row?: TasksList): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.taskID + 1}`;
  }
  //Edit task
  onEdit(taskIndex: number) {
    this.tasksService.editIndex = taskIndex;
    this.router.navigate(['/add-edit/edit']);
  }
  //delete tasks when delete confirmation is given
  onDelete(taskIndex:number) {
    let  currentData = this.dataSource.data;
    currentData.splice(taskIndex, 1);
    this.dataSource.data = currentData;
    this.tasksService.updateTasks(this.dataSource.data);
    this.clearSelections();
  }
  //clear tasks selections funtion
  clearSelections() {
    this.selection.clear();
    this.updateHeaderCheckbox();
  }
  //clear header selection
  updateHeaderCheckbox() {
    setTimeout(() => {
      const headerCheckbox = this.table["_headerRowDef"].headerRowContainer._headerRow._checkbox;
      if (headerCheckbox) {
        headerCheckbox.checked = false;
        headerCheckbox.indeterminate = false;
      }
    });
  }
  //routes to add/edit page
  addTask() {
    this.router.navigate(['/add-edit/add']);
  }
  //reset tasks to default
  resetTasks(){
    this.tasksService.updateTasks(this.tasksService.taskDataBackup);
    this.dataSource.data = this.tasksService.taskDataBackup.slice();
    this.clearSelections();
  }
  //open delete confirmation dialogue box
  openConfirmation(i) {
    this.showConfirmation = true;
    this.cellIndex = i;
  }
  //open delete multiple confirmation dialogue box
  openMultipleConfirmation() {
    this.showMultipleConfirmation = true;
  }
  //when user clicks Yes single task delete
  onDeleteConfirmed(confirmed: boolean) {
    if (confirmed) {
      this.onDelete(this.cellIndex);
    }
    this.showConfirmation = false;
  }
  // when user clicks for multiple task delete
  onDeleteMultipleConfirmed(confirmed: boolean) {
    if (confirmed) {
      this.deleteSelected();
    }
    this.showMultipleConfirmation = false;
  }
  //delete multiple functionality
  deleteSelected() {
    this.selection.selected.forEach(sel => {
      this.onDelete(this.getTaskIndex(sel));
    });
  }
  //find a seleted task and return index
  getTaskIndex(task:TasksList) {
    return this.dataSource.data.findIndex(el => (el.taskID === task.taskID && el.taskDetails === task.taskDetails && el.taskTitle === task.taskTitle))
  }
}

