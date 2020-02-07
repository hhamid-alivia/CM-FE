import { Component, OnInit } from '@angular/core';

import { Observable } from "rxjs";
import { EmployeeService } from "../employee.service";
import { Employee } from "../employee";
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Observable<Employee[]>;
  jbpmHtml: string;
  private jbpmUrl = 'http://localhost:8080/kie-server/services/rest/server/containers/testproject_1.0.0/forms/tasks/189/content';
  private localBootUrl = 'http://localhost:8888/springboot-crud-rest/api/v1/test';
  private JbpmServer = 'http://192.168.0.101:8080/springbootwildfly/test';
 // private http: any;
  constructor(private employeeService: EmployeeService,private http: HttpClient,
    private router: Router) {}

  ngOnInit() {
   // this.jbpmHtml= this.employeeService.getHtmlForm();
    /*const reqHeader = new HttpHeaders({'Authorization': 'Basic bWFjaWVrOm1hY2llaw=='});
    reqHeader.append('Content-Type', 'application/xml');*/
   /* this.http.get<any>('http://localhost:8080/kie-server/services/rest/server/containers/testproject_1.0.0/forms/tasks/189/content', { reqHeader }).subscribe(data => {
      this.jbpmHtml = data.total;
    })*/
  //  console.log("HTML statement "+ this.jbpmHtml);
    const reqHeader = new HttpHeaders({'Authorization': 'Basic bWFjaWVrOm1hY2llaw=='});
    reqHeader.append('Content-Type', 'application/json');
   // return
    /*this.employeeService.getHtmlForm().subscribe((data: any[])=>{
      console.log("Data Html "+data);
    //  this.jbpmHtml = data;
    })*/
    this.http.get(this.JbpmServer, {responseType: 'text'})
      .subscribe(data => {
        console.log("Html"+data);
        this.jbpmHtml=data;
        document.getElementById("content").innerHTML = data;
       // alert(this.jbpmHtml);
      }, error => {
        console.log(error);
      });
    /*=this.employeeService.getRequest('http://localhost:8080/kie-server/services/rest/server/containers/testproject_1.0.0/forms/tasks/189/content')
      .subscribe(data => {
        console.log("Html"+data);

      }, error => {
        console.log(error);
      });*/
  //  this.http.get( this.jbpmUrl, {headers: reqHeader});

   // this.employeeService.getHtmlForm();
  //  alert(this.jbpmHtml);
    this.reloadData();
  }

  reloadData() {
    this.employees = this.employeeService.getEmployeesList();

      /*this.http.get(this.jbpmUrl)
      .toPromise()
      .then(resp => resp.text())
      .catch(error=>console.log(error));
      //this.employeeService.getHtmlForm();*/

   // console.log( +  this.jbpmHtml);
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  employeeDetails(id: number){
    this.router.navigate(['details', id]);
  }

  employeeDetailsUpdate(id: number){
    this.router.navigate(['update', id]);
  }




}
