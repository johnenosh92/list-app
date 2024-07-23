import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TasksComponent } from './taskList/tasks/tasks.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { TasksService } from './taskList/services/tasks.service';
import { AppRoutingModule } from './app-routing.module'; // Import your routing module
import { ConfirmationDialogComponent } from './taskList/confirm-dialogue/confirmation-dialog.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule, 
    MatCheckboxModule,
    MatIconModule,
    AppRoutingModule
  ],
  declarations: [AppComponent, TasksComponent, AddEditComponent, ConfirmationDialogComponent],
  bootstrap: [AppComponent],
  providers: [TasksService]
})
export class AppModule {}
