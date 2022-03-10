import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from '../api-service.service';
import { EmployeeModel } from '../Employee.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  closeResult = '';
  formValue !: FormGroup;
  employeeData !: any;
  showAddButton !: boolean;
  showUpdateButton !: boolean;
  employeeObj: EmployeeModel = new EmployeeModel();

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
    this.showAddButton = true;
    this.showUpdateButton = false;
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
        this.getAllEmployees();
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
        this.employeeData = responseData;
      },
      error: (errorData) => {
        alert("Error While Fetching Employees");
      }
    });
  }

  openEditModal(content: any, employee: EmployeeModel) {
    this.showAddButton = false;
    this.showUpdateButton = true;
    this.employeeObj.id = employee.id;
    this.ngbModal.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.formValue.patchValue({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      mobile: employee.mobile,
      salary: employee.salary
    });
    // this.formValue.controls['firstName'].setValue(employee.firstName);
    // this.formValue.controls['lastName'].setValue(employee.lastName);
    // this.formValue.controls['email'].setValue(employee.email);
    // this.formValue.controls['mobile'].setValue(employee.mobile);
    // this.formValue.controls['salary'].setValue(employee.salary);
  }

  onEditEmployee() {
    this.employeeObj.firstName = this.formValue.value.firstName;
    this.employeeObj.lastName = this.formValue.value.lastName;
    this.employeeObj.email = this.formValue.value.email;
    this.employeeObj.mobile = this.formValue.value.mobile;
    this.employeeObj.salary = this.formValue.value.salary;
    this.apiService.updateEmployee(this.formValue.value, this.employeeObj.id).subscribe({
      next: (responseData) => {
        alert("Employee Details Updated Succesfully");
        this.formValue.reset();
        this.ngbModal.dismissAll();
        this.getAllEmployees();
      },
      error: (errorData) => {
        alert("Error Occured While Updating");
        console.log(errorData);
      }
    });
  }

  deleteEmployee(employee: EmployeeModel) {
    this.apiService.deleteEmployee(employee.id).subscribe({
      next: (responseData) => {
        alert("Succesfully Deleted Employee");
        this.getAllEmployees();
      },
      error: (errorData) => {
        alert("Error While Deleting");
      }
    });
  }


}
