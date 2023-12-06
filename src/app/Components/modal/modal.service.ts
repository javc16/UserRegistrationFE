import {
  ComponentFactoryResolver,
  Inject,
  Injectable,
  Injector,
  TemplateRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ModalComponent } from './modal.component';
import { DOCUMENT } from '@angular/common';
import { EmployeeService } from '../../Services/Employee/employee.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalNotifier?: Subject<string>;
  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private employeeService: EmployeeService,
    private router: Router,

    @Inject(DOCUMENT) private document: Document
  ) {}

  open(content: TemplateRef<any>, objectTosSave:Object,options?: { size?: string; title?: string }) {
    const modalComponentFactory = this.resolver.resolveComponentFactory(
      ModalComponent
    );
    const contentViewRef = content.createEmbeddedView(null);
    const modalComponent = modalComponentFactory.create(this.injector, [
      contentViewRef.rootNodes,
    ]);

    modalComponent.instance.size = options?.size;
    modalComponent.instance.title = options?.title;
    modalComponent.instance.closeEvent.subscribe(() => this.closeModal());
    modalComponent.instance.submitEvent.subscribe(() => this.submitModal(objectTosSave));

    modalComponent.hostView.detectChanges();

    this.document.body.appendChild(modalComponent.location.nativeElement);
    this.modalNotifier = new Subject();
    return this.modalNotifier?.asObservable();
  }

  closeModal() {
    this.modalNotifier?.complete();
  }

  submitModal(objectTosSave:object) {
    this.employeeService.create(objectTosSave)
    .subscribe((res: any) => {
      console.log("Added");
      this.router.navigate(['']).then(() => {
        window.location.reload();
      });
    })
    this.modalNotifier?.next('confirm');
    this.closeModal();
  }
}
