import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditComponent } from './add-edit/add-edit.component';
import { TasksComponent } from './taskList/tasks/tasks.component';

const routes: Routes = [
  { path: 'add-edit/:action', component: AddEditComponent },
  { path: '', component: TasksComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }