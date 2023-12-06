import { Component,TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from '../../Services/Modal/modal.service';

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
    private modalService: ModalService
  ) {}

  cancel() {
    this.router.navigate(['']);
  }

  onSubmit():void{  
    this.isSubmitted =true;
  }

  openModal(modalTemplate: TemplateRef<any>) {
    this.modalService
      .open(modalTemplate,this.registerEmployee.value, { size: 'lg', title: 'Saving' })
      .subscribe((action) => {
        console.log('modalAction', action);
      });
      this.onSubmit()
  }

}

  