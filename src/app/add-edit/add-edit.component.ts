import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../taskList/services/tasks.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit{
  myForm: FormGroup;
  action: any;
  taskToEdit: import("/Users/johnenosh/Desktop/list-of-tasks-app/src/app/taskList/services/tasks.service").TasksList;
  pageTitle: string;

  constructor(private route: ActivatedRoute,private fb: FormBuilder, private taskService:TasksService,private router:Router) {
    this.action = this.route.snapshot.params['action'];
  }
  ngOnInit() {
    this.myForm = this.fb.group({
      taskTitle: ['', [Validators.required]],
      taskDetails: ['', [Validators.required]]
    });
    
    if(this.action === "edit"){
      this.pageTitle = "Edit Task";
      this.taskToEdit = this.taskService.taskData[this.taskService.editIndex];
      this.myForm.setValue({
        taskTitle: this.taskToEdit.taskTitle,
        taskDetails: this.taskToEdit.taskDetails
      });
    }
    else {
      this.pageTitle = "Add New Task";

    }

  }

  submitForm() {
    if (this.myForm.valid) {
    if(this.action === "edit"){

      this.taskToEdit.taskTitle = this.myForm.value.taskTitle;
      this.taskToEdit.taskDetails = this.myForm.value.taskDetails;
      this.taskService.taskData[this.taskService.editIndex] = this.taskToEdit;
      this.taskService.updateTasks(this.taskService.taskData);
      console.log('Form submitted with:', this.myForm.value);
      this.router.navigate(['']);
    }
    else {
      let newTaskDetails = this.myForm.value;
      console.log(newTaskDetails)
      newTaskDetails["taskID"] = this.taskService.taskData.length + 1;
      this.taskService.taskData.push(newTaskDetails);

      this.taskService.updateTasks(this.taskService.taskData);
      console.log(this.taskService.taskData)

      this.router.navigate(['']);
      
    }
    }
  }

}
