import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent {
  notFoundFullHeight: boolean = false;
  constructor(private _ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (this._ActivatedRoute.snapshot.data[0]) {
      this.notFoundFullHeight = !this.notFoundFullHeight;
    }
  }
}
