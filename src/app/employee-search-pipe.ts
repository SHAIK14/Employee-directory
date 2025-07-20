import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from './employee';

@Pipe({
  name: 'employeeSearch',
  standalone: true
})
export class EmployeeSearchPipe implements PipeTransform {

  transform(employees: Employee[], searchTerm: string): Employee[] {
    if (!employees || !searchTerm) {
      return employees;
    }

    searchTerm = searchTerm.toLowerCase().trim();

    return employees.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm) ||
      employee.email.toLowerCase().includes(searchTerm) ||
      employee.username.toLowerCase().includes(searchTerm) ||
      employee.company.name.toLowerCase().includes(searchTerm) ||
      employee.phone.toLowerCase().includes(searchTerm) ||
      employee.website.toLowerCase().includes(searchTerm)
    );
  }
}