import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { EmployeeDashboardComponent } from './employeeDashboard.component';
import { EmployeeWorkComponent } from './employeeWork.component';
import { EmployeeProfileComponent } from './employeeProfile.component';

const routes: Routes = [
  { path: '', component: EmployeeDashboardComponent },
  { path: 'work', component: EmployeeWorkComponent },
  { path: 'profile', component: EmployeeProfileComponent },
];

@NgModule({
  declarations: [
    EmployeeDashboardComponent,
    EmployeeWorkComponent,
    EmployeeProfileComponent,
  ],
  imports: [
    SharedModule, 
    RouterModule.forChild(routes)
  ],
})
export class EmployeeModule {}
