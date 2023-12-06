import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../Models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url:string;

  constructor(private http: HttpClient) 
  {
    this.url =  "https://localhost:44339/api/employee";
  }

  getData(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url);
  }

  create(employee: Object) {
    return this.http.post(this.url, employee);
  }
}
