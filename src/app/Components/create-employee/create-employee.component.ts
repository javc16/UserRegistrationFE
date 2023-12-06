import { Component} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { EmployeeService } from '../../Services/Employee/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.scss'
})
export class CreateEmployeeComponent {
registerEmployee = this.fb.group({
  employeeId:['', Validators.required],
  firstName:['', Validators.required],
  lastName:['', Validators.required],
  dateOfBirth:['',Validators.required],
})
isSubmitted = false;
  constructor
  ( 
    private router: Router,
    private fb:FormBuilder,
    private employeeService: EmployeeService,
  ) {}

  cancel() {
    this.router.navigate(['']);
  }

  onSubmit():void{
    this.employeeService.create(this.registerEmployee.value)
    .subscribe((res: any) => {
      console.log("Added");
      this.router.navigate(['']).then(() => {
        window.location.reload();
      });
    })
    this.isSubmitted =true;
  }

}

  