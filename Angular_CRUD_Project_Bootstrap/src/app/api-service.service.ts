import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeModel } from './Employee.model';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  storeEmployee(data: EmployeeModel) {
    return this.http.post('http://localhost:3000/employees/', data);
  }

  fetchEmployees() {
    return this.http.get('http://localhost:3000/employees/');
  }

  deleteEmployee(id: number) {
    return this.http.delete('http://localhost:3000/employees/'+id);
  }

  updateEmployee(data: EmployeeModel, id: number) {
    return this.http.put('http://localhost:3000/employees/'+id, data);
  }
}
