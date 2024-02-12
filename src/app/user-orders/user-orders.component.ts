// user-orders.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpService) {}

  componentName="User Orders"
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userID = params['id'];
      this.userID = userID;
      this.getOrderData();
    });
  }

  dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = ['product', 'sender', 'receiver','price'];

  userID = '';

  getOrderData() {
    this.http.getUserOrders(this.userID).subscribe(
      (data: any) => {
        if (data.status) {
          this.dataSource.data = data.data;
        } else {
          console.log('Error: ', data.message);
        }
      },
      (error) => {
        console.error('Error fetching user orders:', error);
      }
    );
  }
}
