import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { EmployeeService, Employee } from '../employee';
import { EmployeeSearchPipe } from '../employee-search-pipe';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatCardModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatDialogModule,
    EmployeeSearchPipe
  ],
  templateUrl: './employees.html',
  styleUrls: ['./employees.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  searchTerm = '';
  currentUser = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = localStorage.getItem('currentUser') || 'User';
    this.loadEmployees();
  }

  loadEmployees() {
    this.employees = this.employeeService.getAllEmployees();
  }

  goToAddEmployeePage() {
    this.router.navigate(['/employee-form']);
  }

  openEditEmployeeForm(employee: Employee) {
    this.router.navigate(['/employee-form', employee.id]);
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.removeEmployee(id);
      this.loadEmployees();
    }
  }

  signOut() {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth']);
  }
}