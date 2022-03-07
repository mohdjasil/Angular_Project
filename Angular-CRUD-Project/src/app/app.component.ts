import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular-CRUD-Project';
  displayedColumns: string[] = ['productName', 'category', 'price', 'date', 'freshness', 'comment', 'action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private dialog: MatDialog, private apiService: ApiService) {}

  ngOnInit(): void {
      this.getProducts();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%',
      height: '85%'
    }).afterClosed().subscribe(val => {
      if(val==='save') {
        this.getProducts();
      }
    });
  }

  getProducts() {
    this.apiService.fetchProduct()
      .subscribe({
        next: (responseData) => {
          this.dataSource = new MatTableDataSource(responseData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (errorData) => {
          console.log(errorData);
        }
      });
  }

  editProduct(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val==='update') {
        this.getProducts();
      }
    });
  }

  deleteProduct(id: number) {
    this.apiService.deleteProduct(id).subscribe({
      next: (response) => {
        alert("Product Deleted Successfully");
        this.getProducts();
      },
      error: () => {
        alert("Error Occured While Deleting");
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
