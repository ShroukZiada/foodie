import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

interface IMenu {
  text: string,
  icon: string,
  link?: string,
  isActive: boolean,
}

interface sideNavToggle{
  screenWidth:number;
  collapsed: boolean;
} 
@Component({
  selector: 'app-sidebar',
  templateUrl:'./sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(private _AuthService: AuthService) { }

  opened: boolean = false;
  @ViewChild("parElm", { static: true }) parElm!: ElementRef;
  @ViewChild("sect", { static: true }) sect!: ElementRef;
  @Input() height!:string;
  

  ngOnInit(): void {

  }
  toggleSidebar() {
    this.parElm.nativeElement.classList.toggle("active-sidebar")
    this.opened = !this.opened;
  }

  isAdmin(): boolean {
    return this._AuthService.role == 'SuperAdmin' ? true : false;
  }
  isUser(): boolean {
    return this._AuthService.role == 'SystemUser' ? true : false;
  }
  menu: IMenu[] = [
    {
      text: 'home',
      icon: 'fa-solid fa-home',
      link: '/dashboard/home',
      isActive: this.isAdmin() || this.isUser()
    },

    {
      text: 'User',
      icon: 'fa-solid fa-user-group',
      link: '/dashboard/admin/users',
      isActive: this.isAdmin()
    },
    {
      text: 'Categories',
      icon: 'fa fa-calendar-days',
      link: '/dashboard/admin/categories',
      isActive: this.isAdmin()
    },
    {
      text: 'Recipes',
      icon: 'fa fa-receipt',
      link: '/dashboard/admin/recipes',
      isActive: this.isAdmin()
    },
    {
      text: 'User Recipes',
      icon: 'fa fa-heart',
      link: '/dashboard/user/user-recipe',
      isActive: this.isUser()
    },
    {
      text: 'Fav',
      icon: 'fa fa-receipt',
      link: '/dashboard/user/Fav',
      isActive: this.isUser()
    }, ]
}
