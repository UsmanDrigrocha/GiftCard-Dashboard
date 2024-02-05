import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../services/http.service';
import { UtilityService } from '../services/utility.service';

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

  constructor(
    private http: HttpService,
    private utilityService: UtilityService,
  ) {}

  ngOnInit(): void {
    this.getUsersData();
  }

  getUsersData() {
    this.http.getUsers().subscribe(
      (data: any) => {
        this.usersArray = data.data;
        this.dataSource.data = this.usersArray;
      },
      (error: any) => {
        this.utilityService.showSnackbar('Error Getting Users !');
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload()
  }

  logUserId(userId: string) {
    console.log('Clicked User ID:', userId);
  }
}
