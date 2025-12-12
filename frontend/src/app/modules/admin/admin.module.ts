import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { AdminDashboardComponent } from './adminDashboard.component';
import { AdminUsersComponent } from './adminUsers.component';
import { AdminProjectsComponent } from './adminProjects.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'users', component: AdminUsersComponent },
  { path: 'projects', component: AdminProjectsComponent },
  { path: 'analytics', component: AdminDashboardComponent },
];

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminUsersComponent,
    AdminProjectsComponent,
  ],
  imports: [
    SharedModule, 
    RouterModule.forChild(routes)
  ],
})
export class AdminModule {}
