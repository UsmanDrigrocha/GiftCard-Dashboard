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

  isSidebarHidden: boolean = true;

  
  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
