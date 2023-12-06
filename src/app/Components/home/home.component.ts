import { Component,EventEmitter,OnInit, Output } from '@angular/core';
import { Employee } from '../../Models/Employee';
import { EmployeeService } from '../../Services/Employee/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  citizens: Employee[];
  displayedColumns: string[] = ['id','employeeId','firstName','lastName','age','dateOfBirth'];
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    ) 
    {
      this.citizens = new Array<Employee>();
    }

    ngOnInit() {
      this.employeeService.getData().subscribe((res: any[])=>{
        this.citizens= res;
      })   
    }

    create(){
      this.router.navigate(['create']);
    }


}
