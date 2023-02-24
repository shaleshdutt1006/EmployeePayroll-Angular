import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{Observable} from 'rxjs';
import { Employee } from '../model/employee';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http : HttpClient) { }


  baseUrl = "http://localhost:8081/payroll"


  getEmployeeData(): Observable<any> {   
    return this.http.get(this.baseUrl + "/get-all");
  }


  addEmployeeData(body: any): Observable<any> {
    return this.http.post(this.baseUrl + "/add", body);

  }
  public deleteEmployee(employeeId:number): Observable<any> {   
    return this.http.delete(this.baseUrl+"/delete/"+employeeId);
  }
  public updateEmployee(employeeId:number,employee: Employee): Observable<any> {
    return this.http.put(this.baseUrl+"/update/"+employeeId,employee);
  }

}
