import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Employee } from '../employee';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import {Complaint} from "../Complaint";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit  {

  employee: Employee = new Employee();
  complaint : Complaint =new Complaint();
  submitted = false;
  complaintResponse : any;
  taskSummaryList :any;
  jbpmHtml: string;
  srcDocContent:string;
 // @ViewChild('iframe', { static: true }) iframe: ElementRef;

  constructor(private employeeService: EmployeeService,private http: HttpClient,
    private router: Router) { }

  ngOnInit() {
  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }

   newComplaint(): void {
    this.submitted = false;
    this.complaint = new Complaint();
  }

  save() {

    this.employeeService.createComplaint(this.complaint)
    .subscribe(data => {
      console.log("Response from amar System"+data)
      this.complaintResponse=data;
      this.getTaskList(this.complaintResponse);
   //   document.getElementById("content").innerHTML = data;
      // alert(this.jbpmHtml);
    }
    //this.complaint=data;
      , error => console.log(error));
    this.complaint = new Complaint();
    this.gotoList();

  }

  onSubmit() {
    this.submitted = true;
    this.save();
  //  this.getTaskList()

  }

  gotoList() {
    this.router.navigate(['/add']);
  }

  getTaskList(complaint: Object) {
    // from employee to complaint
    //this.employeeService.createEmployee(this.complaint)
    this.complaintResponse=complaint;
    this.employeeService.createComplaintTaskList(complaint)
      .subscribe(data => {
          console.log("Response from amar System against Complaint"+data);
        //  debugger;
          this.complaintResponse=data;
          console.log(this.complaintResponse);
          this.taskSummaryList= this.complaintResponse.taskSummaryList.taskDetails;

        }
        , error => console.log(error));

  }


  complaintDetails(id){

    debugger;

    this.getTask(id);

   // let params = new HttpParams().set('taskId', id);

   // this.getTaskList(complaint);



    /*this.http.get('http://192.168.0.101:8888/springboot-crud-rest/api/v1/GetTaskFormContect', {responseType: 'text',params: params})
      .subscribe(data => {
        console.log("Html"+data);

      }, error => {
        console.log(error);
      });*/

    /*this.employeeService.getTaskFormConent(complaint)
      .subscribe(data => {
          console.log("Response from Amar HTML"+data);
          //  debugger;
          this.jbpmHtml=data.toString();
          document.getElementById("content").innerHTML = this.jbpmHtml;
          debugger;
        }
        , error => console.log(error));
*/
      this.gotoList();
   // this.router.navigate(['/employee']);
  }

  getTask(id) {


   // const reqHeader = new HttpHeaders({'Authorization': 'Basic bWFjaWVrOm1hY2llaw=='});
  //  reqHeader.append('Content-Type', 'application/json');
    //http.get('http://192.168.0.101:8080/kie-server/services/rest/server/containers/testproject_1.0.0/forms/tasks/'+id+'/content', {headers: reqHeader});
    const reqHeader = new HttpHeaders({'Authorization': 'Basic bWFjaWVrOm1hY2llaw=='});
    reqHeader.append('Content-Type', 'application/json');
   // alert(id);

    var site = 'http://192.168.0.101:8080/kie-server/services/rest/server/containers/testproject_1.0.0/forms/tasks/'+id+'/content';
    document.getElementById('iframe').setAttribute('src',site);

    /*this.http.get('http://192.168.0.101:8080/kie-server/services/rest/server/containers/testproject_1.0.0/forms/tasks/'+id+'/content', {headers: reqHeader})
      .subscribe(data => {
        console.log("Html"+data);
        var site = 'http://192.168.0.101:8080/kie-server/services/rest/server/containers/testproject_1.0.0/forms/tasks/'+id+'/content';
        document.getElementById('iframe').setAttribute('src',site);
        /!*let doc =  this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
        doc.open();
        doc.write(data);
        doc.close();*!/


        //  this.srcDocContent=data;
        // alert(this.jbpmHtml);
      }, error => {
        console.log(error);
      });
*/
    /*this.employeeService.getRequest('http://192.168.0.101:8080/kie-server/services/rest/server/containers/testproject_1.0.0/forms/tasks/'+id+'/content')
      .subscribe(data => {
          console.log("Response from Amar HTML"+data);
          //  debugger;
          this.jbpmHtml=data.toString();
          document.getElementById("content").innerHTML = this.jbpmHtml;
          debugger;
        }
        , error => console.log(error));
*/

    //window.postMessage({ type: "BASIC_AUTH", url:"http://localhost:8080/kie-server/services/rest/server/containers/testproject_1.0.0/forms/tasks/173/content", username:"maciek", password:"maciek" }, "*");
    /*axios.get('http://192.168.0.101:8080/kie-server/services/rest/server/containers/testproject_1.0.0/forms/tasks/'+id+'/content',options)
      .then((response) => {
        //alert(response.data);
        let doc =  this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
        doc.open();
        doc.write(response.data);
        doc.close();
       // document.getElementById("content").innerHTML = response.data;
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
      });*/
  }

 /*ngAfterViewInit(): void {
    console.log("---ngAfterViewInit() Demo---");

  }*/

  refreshRecord(id){

    let params = new HttpParams().set('caseInstanceID', id);

    // this.getTaskList(complaint);
    this.http.get('http://192.168.0.101:8888/springboot-crud-rest/api/v1/GetCaseTasks', {params: params})
      .subscribe(data => {

      //  console.log("Data"+data);
        this.complaintResponse=data;
        console.log(this.complaintResponse);
        this.taskSummaryList= this.complaintResponse.taskSummaryList.taskDetails;

        /*this.taskSummaryList.taskDetails= data;
        console.log(this.taskSummaryList.taskDetails);*/

      }, error => {
        console.log(error);
      });

  }


}
