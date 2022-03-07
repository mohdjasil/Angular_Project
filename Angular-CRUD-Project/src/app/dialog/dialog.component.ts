import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required]
    });

    console.log(this.editData);
    if(this.editData) {
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }

  onSubmit() {
    if(!this.editData) {
      if(this.productForm.valid) {
        this.apiService.storeProducts(this.productForm.value)
          .subscribe({
            next: (responseData) => {
              alert("Product Added Succesfully");
              this.productForm.reset();
              this.dialogRef.close('save');
            },
            error: (errorData) => {
              alert("Error While Adding")
            }
          });
      }
    } else {
      this.updateProduct();
    } 
  }

  updateProduct() {
    if(this.productForm.valid) {
      this.apiService.updateProduct(this.productForm.value, this.editData.id)
        .subscribe({
          next: (responseData) => {
            alert("Product Updated Successfully");
            this.productForm.reset();
            this.dialogRef.close('update');
          },
          error: (errorData) => {
            console.log(errorData);
            alert("Error While Updating");
          }
        });
    }
  }
}
