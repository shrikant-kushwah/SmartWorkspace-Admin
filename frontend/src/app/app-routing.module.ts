import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [

  // auth module (login, forgot, reset, etc.)
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule),
  },

  // admin 
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then(m => m.AdminModule),
    canLoad: [RoleGuard],
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] },
  },

  // manager
  {
    path: 'manager',
    loadChildren: () =>
      import('./modules/manager/manager.module').then(m => m.ManagerModule),
    canLoad: [RoleGuard],
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['manager'] },
  },

  // employee 
  {
    path: 'employee',
    loadChildren: () =>
      import('./modules/employee/employee.module').then(
        m => m.EmployeeModule
      ),
    canActivate: [AuthGuard],
  },

  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
