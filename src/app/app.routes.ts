import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth';
import { EmployeesComponent } from './employees/employees';
import { EmployeeFormComponent } from './employee-form/employee-form';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'employees', component: EmployeesComponent, canActivate: [authGuard] },
  { path: 'employee-form', component: EmployeeFormComponent, canActivate: [authGuard] },
  { path: 'employee-form/:id', component: EmployeeFormComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/auth' }
];