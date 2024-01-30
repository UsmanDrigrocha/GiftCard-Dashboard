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
  constructor(
    private http: HttpService,
    private utilityService: UtilityService
  ) {}

  usersArray: any[] = [];

  displayedColumns: string[] = ['name', 'email', 'profilePic', 'giftCardPoints'];
  dataSource = new MatTableDataSource<any>(this.usersArray);

  ngOnInit(): void {
    this.getUsersData();
  }

  getUsersData() {
    this.http.getUsers().subscribe(
      (data: any) => {
        this.usersArray = data.data;
        this.dataSource.data = this.usersArray;
        this.utilityService.showSnackbar('User Fetched Successfully !');
      },
      (error: any) => {
        this.utilityService.showSnackbar('Error Getting Users !');
      }
    );
  }
}
