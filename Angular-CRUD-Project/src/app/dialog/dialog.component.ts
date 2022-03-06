import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  freshnessList = [
    "Brand New",
    "Second Hand",
    "Refurbished"
  ]

  productForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  onSubmit() {
    if(this.productForm.valid) {
      this.apiService.storeProducts(this.productForm.value)
        .subscribe({
          next: (responseData) => {
            alert("Product Added Succesfully");
            this.productForm.reset();
            this.dialogRef.close();
          },
          error: (errorData) => {
            alert("Error While Adding")
          }
        });
    }
  }
}