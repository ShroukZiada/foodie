import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  name: any;
  constructor(private _AuthService: AuthService) {
    this.name = localStorage.getItem('userName')
    console.log(this.name);
  }
}
