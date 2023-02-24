import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { HttpService } from 'src/app/service/http.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

  employeeCount: number = 0;
  employeeList: Employee[] = []
  

  constructor(private httpService: HttpService,private router:Router) { }

 

  ngOnInit(): void {
    this.httpService.getEmployeeData().subscribe(response => {      
      this.employeeList = response          
        console.log(response)
      this.employeeCount = this.employeeList.length
      console.log(this.employeeList.length)
    })
  }  
    
    deleteEmployee(employee: any) {
      if (confirm("Are you sure you want to delete this employee?")) {
        const index = this.employeeList.indexOf(employee);
        this.employeeList.splice(index, 1);
        this.employeeCount--;
        this.httpService.deleteEmployee(employee.id);    }
    }
    updateEmployee(employee:any){
      this.router.navigate(['add-employee'])
      this.httpService.updateEmployee(employee.id,employee)
    }



  remove(empId: number): void {
    console.log(empId)
    this.httpService.deleteEmployee(empId).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    });
  }


}
