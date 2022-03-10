import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  closeResult = '';
  formValue !: FormGroup;
  employeeData !: any;

  constructor(private ngbModal: NgbModal, private formBuilder: FormBuilder, private apiService: ApiServiceService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: [''],
    });
    this.getAllEmployees();
  }

  open(content: any) {
    this.ngbModal.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(result==='Submit') {
        this.onSubmit();
      }
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit() {
    this.apiService.storeEmployee(this.formValue.value).subscribe({
      next: (responseData) => {
        alert("Product Added Succesfully");
        this.formValue.reset();
      },
      error: (errorData) => {
        alert("Error While Adding");
        console.log(errorData);
      }
    });
    
  }

  getAllEmployees() {
    this.apiService.fetchEmployees().subscribe({
      next: (responseData) => {
        console.log(responseData);
        this.employeeData = responseData;
      },
      error: (errorData) => {
        console.log(errorData);
        alert("Error While Fetching Employees");
      }
    });
  }

}
