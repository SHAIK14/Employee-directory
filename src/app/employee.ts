import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  private employees: Employee[] = [];

  constructor(private http: HttpClient) {
    this.loadEmployeesFromStorage();
  }

  fetchEmployeesFromApi(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  loadEmployeesFromStorage() {
    const stored = localStorage.getItem('employees');
    if (stored) {
      this.employees = JSON.parse(stored);
    } else {
      this.fetchEmployeesFromApi().subscribe(employees => {
        this.employees = employees;
        this.saveToStorage(employees);
      });
    }
  }

  getAllEmployees(): Employee[] {
    return [...this.employees];
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.employees.find(emp => emp.id === id);
  }

  addEmployee(employee: Employee): void {
    const newEmployee = { ...employee, id: this.generateNewId() };
    this.employees.push(newEmployee);
    this.saveToStorage(this.employees);
  }

  updateEmployee(employee: Employee): void {
    const index = this.employees.findIndex(emp => emp.id === employee.id);
    if (index !== -1) {
      this.employees[index] = employee;
      this.saveToStorage(this.employees);
    }
  }

  removeEmployee(id: number): void {
    this.employees = this.employees.filter(emp => emp.id !== id);
    this.saveToStorage(this.employees);
  }

  private generateNewId(): number {
    return this.employees.length > 0 ? Math.max(...this.employees.map(emp => emp.id)) + 1 : 1;
  }

  private saveToStorage(employees: Employee[]): void {
    localStorage.setItem('employees', JSON.stringify(employees));
  }
}