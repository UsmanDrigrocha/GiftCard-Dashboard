import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userID = params['id'];
      this.userID = userID;
    });
    this.getOrderData();
  }

  userID = '';

  componentName = 'User Orders';

  getOrderData() {
    this.http.getUserOrders(this.userID).subscribe(
      (data: any) => {
        console.log(data);
        if (!data.status) {
          return this.utilityService.showSnackbar('Error !');
        }
      },
      (error) => {
        console.error('Error fetching user orders:', error);
      }
    );
  }
}

/*user mail/name
receiver mail/name
product name
brand name
 */
