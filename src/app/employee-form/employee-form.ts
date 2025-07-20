import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeService, Employee } from '../employee';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
  ],
  templateUrl: './employee-form.html',
  styleUrls: ['./employee-form.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEditMode = false;
  employeeId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.employeeForm = this.createEmployeeForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.employeeId = +params['id'];
        this.loadEmployeeData();
      }
    });
  }

  createEmployeeForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      website: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipcode: ['', [Validators.required]]
    });
  }

  loadEmployeeData() {
    if (this.employeeId) {
      const employee = this.employeeService.getEmployeeById(this.employeeId);
      if (employee) {
        this.employeeForm.patchValue({
          name: employee.name,
          username: employee.username,
          email: employee.email,
          phone: employee.phone,
          website: employee.website,
          companyName: employee.company.name,
          street: employee.address.street,
          city: employee.address.city,
          zipcode: employee.address.zipcode
        });
      }
    }
  }

  saveEmployee() {
    if (this.employeeForm.valid) {
      const formValue = this.employeeForm.value;
      const employee: Employee = {
        id: this.isEditMode ? this.employeeId! : 0,
        name: formValue.name,
        username: formValue.username,
        email: formValue.email,
        phone: formValue.phone,
        website: formValue.website,
        company: {
          name: formValue.companyName
        },
        address: {
          street: formValue.street,
          city: formValue.city,
          zipcode: formValue.zipcode
        }
      };

      if (this.isEditMode) {
        this.employeeService.updateEmployee(employee);
      } else {
        this.employeeService.addEmployee(employee);
      }

      this.router.navigate(['/employees']);
    }
  }

  goBackToEmployeeList() {
    this.router.navigate(['/employees']);
  }

  getFieldErrorMessage(fieldName: string): string {
    const field = this.employeeForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${fieldName} is required`;
    }
    if (field?.hasError('email')) {
      return 'Enter a valid email';
    }
    if (field?.hasError('minlength')) {
      return `${fieldName} must be at least ${field.errors?.['minlength'].requiredLength} characters`;
    }
    return '';
  }
}