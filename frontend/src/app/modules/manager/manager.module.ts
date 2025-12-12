import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ManagerDashboardComponent } from './managerDashboard.component';
import { ManagerTeamComponent } from './managerTeam.component';
import { ManagerTasksComponent } from './managerTasks.component';

const routes: Routes = [
  { path: '', component: ManagerDashboardComponent },
  { path: 'team', component: ManagerTeamComponent },
  { path: 'tasks', component: ManagerTasksComponent },
];

@NgModule({
  declarations: [
    ManagerDashboardComponent,
    ManagerTeamComponent,
    ManagerTasksComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class ManagerModule {}
