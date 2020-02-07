import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})

export class EmployeeService {

  private baseUrl = 'http://localhost:8888/springboot-crud-rest/api/v1/employees';
  private jbpmUrl = 'http://localhost:8080/kie-server/services/rest/server/containers/testproject_1.0.0/forms/tasks/189/content';
  private localBootUrl = 'http://localhost:8888/springboot-crud-rest/api/v1/test';
  private postBaseUrl = 'http://192.168.0.101:8080/springboot-crud-rest/test';
  private createComplaintUrl = 'http://192.168.0.101:8888/springboot-crud-rest/api/v1/CreateComplaint';
  private JbpmServer = 'http://192.168.0.101:8888/springboot-crud-rest/api/v1/CreateComplaint';
  // http://192.168.0.105:8080/springboot-crud-rest/test
  constructor(private http: HttpClient) { }

  getEmployee(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createEmployee(employee: Object): Observable<Object> {
    console.log("send info" + employee);
    return this.http.post(`${this.baseUrl}`, employee);
  }

  updateEmployee(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getEmployeesList(): Observable<any> {
    return  this.http.get(`${this.baseUrl}`);
    //this.http.get(`${this.baseUrl}`);
  }

  getHtmlForm(): any {
    this.getRequest('http://localhost:8080/kie-server/services/rest/server/containers/testproject_1.0.0/forms/tasks/189/content');
    /*const reqHeader = new HttpHeaders({'Authorization': 'Basic bWFjaWVrOm1hY2llaw=='});
    reqHeader.append('Content-Type', 'application/xml');
  //  return this.http.get(this.getBEAPIServer() + url, {headers: reqHeader});
    /!*this.http.get('https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS', {responseType: 'text'})
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });;*!/
    return this.http.get(`${this.jbpmUrl}`,{headers: reqHeader});*/
  }

  getRequest(url: any) {

      this.http.get(this.localBootUrl, {responseType: 'text'})
      .subscribe(data => {
        //console.log("Html"+data);

      }, error => {
        console.log(error);
      });
  }

  createComplaint(complaint: Object): Observable<Object> {
    console.log("send info" + complaint);
    alert(complaint);
   // http://192.168.0.105:8080/springbootwildfly/api/v1/CreateComplaint
    return this.http.post(`${this.JbpmServer}`, complaint);
  }


  createComplaintTaskList(complaint: Object): Observable<Object> {
  //  console.log("send info" + complaint);
    alert(complaint);
    // http://192.168.0.105:8080/springbootwildfly/api/v1/CreateComplaint
   // http://192.168.0.105:8888/springboot-crud-rest/api/v1/GetComplaintTasks
    return this.http.post(`http://192.168.0.101:8888/springboot-crud-rest/api/v1/GetComplaintTasks`, complaint);
  }



  getTaskFormConent(complaint: Object): Observable<Object> {
    //  console.log("send info" + complaint);
   // alert(complaint);
    // http://192.168.0.105:8080/springbootwildfly/api/v1/CreateComplaint
    // http://192.168.0.105:8888/springboot-crud-rest/api/v1/GetComplaintTasks
    return this.http.post(`http://192.168.0.101:8888/springboot-crud-rest/api/v1/GetTaskFormContect`, complaint);
  }
 /* postRequest(url: any, _params: any) {
    const reqHeader = new HttpHeaders({'Authorization': 'Bearer ' + atob(this.getToken())});
    reqHeader.append('Content-Type', 'application/json');
    return this.http.post(this.getBEAPIServer() + url, _params, {headers: reqHeader});
  }*/

  /*getRequest(url: any) {
    const reqHeader = new HttpHeaders({'Authorization': 'Basic bWFjaWVrOm1hY2llaw=='});
    reqHeader.append('Content-Type', 'application/json');
    return this.http.get( url, {headers: reqHeader});
  }*/


}
