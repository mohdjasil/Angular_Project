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
}
