import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  isSidebarHidden: boolean = false;

  
  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
