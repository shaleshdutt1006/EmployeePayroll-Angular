import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  
})
export class AddEmployeeComponent implements OnInit{
  
  public employee: Employee = new Employee();  

  employeeForm!: FormGroup;


  departments: Array<any> = [
    { id: 1, name: "HR", value: "HR", checked: false },
    { id: 2, name: "Sales", value: "Sales", checked: false },
    { id: 3, name: "Finance", value: "Finance", checked: false  },
    { id: 4, name: "Engineer", value: "Engineer", checked: false },
    { id: 5, name: "Other", value: "Other", checked: false }
  ]


  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,private httpService:HttpService) {
                      
    this.employeeForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required,
                                Validators.maxLength(30),
                                Validators.minLength(3)]),
      profilePic: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      department: new FormArray([], Validators.required),
      salary: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),      
      note: new FormControl('', Validators.required)
    })
   }
 
  
  ngOnInit(): void {
  }


  onDepartmentChange(event: any){
    const departmentValue = event.source.value
    const selectedDepartment = event.checked
    const departmentArray: FormArray = this.employeeForm.get('department') as FormArray;


    if (selectedDepartment) {
      departmentArray.push(new FormControl(departmentValue));
    } else {
      const index = departmentArray.controls.findIndex(x => x.value === departmentValue);
      departmentArray.removeAt(index);
    }
  }


  // /**
  //  * To read Salary value from slider
  //  */
  // salary: number = 400000;
  // updateSetting(event: any) {
  //   this.salary = event.value;
  // }

  // formatLabel(value: number): string {
  //   if (value >= 1000) {
  //     return Math.round(value / 1000) + 'k';
  //   }
  //   return value.toString();
  // }
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  // To get the controls of the form
  get formControls(){
    return this.employeeForm.controls
  }


  public myError = (controlName: string, errorName: string) => {
    return this.employeeForm.controls[controlName].hasError(errorName)
  }


  get fullName(): FormControl{
    return this.employeeForm.get('name') as FormControl
  }


  submitForm(){      
    this.employee=this.employeeForm.value
    console.log(this.employee)    
    this.httpService.addEmployeeData(this.employee).subscribe(response => {
      console.log(response)
      this.router.navigate(['home-page'])
    })
   }


  resetForm(){
    this.employeeForm.reset()
  }
}