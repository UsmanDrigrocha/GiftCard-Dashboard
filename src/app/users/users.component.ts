import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../services/http.service';
import { UtilityService } from '../services/utility.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  componentName = 'Users';

  usersArray: any[] = [];

  displayedColumns: string[] = [
    'name',
    'email',
    'profilePic',
    'giftCardPoints',
    'gender',
    'age',
    'phone',
  ];
  dataSource = new MatTableDataSource<any>(this.usersArray);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private http: HttpService,
    private utilityService: UtilityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsersData();
  }

  getUsersData() {
    this.http.getUsers().subscribe(
      (data: any) => {
        this.usersArray = data.data.users;
        this.dataSource.data = this.usersArray;
        this.totalCount = data.data.totalCount;
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => {
        this.utilityService.showSnackbar('Error Getting Users !');
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  getUserOrders(userId: string) {
    this.router.navigate(['/orders/', userId]);
  }

  // Assuming you have a data array and pagination parameters
  data: any[] = [];
  pageSizeOptions: number[] = [ 5, 10, 25, 75, 100];
  pageSize: number = 5;
  pageIndex: number = 0;
  totalCount: number = 0;

  fetchData() {
    this.http
      .fetchData(this.pageIndex, this.pageSize)
      .subscribe((response: any) => {
        this.data = response.data;
      });
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchData();
  }
}
