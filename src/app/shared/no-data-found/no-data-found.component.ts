import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-no-data-found',
  templateUrl: './no-data-found.component.html',
  styleUrls: ['./no-data-found.component.scss']
})
export class NoDataFoundComponent implements OnInit {
  notFoundFullHeight: boolean = false;
  constructor(private _ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (this._ActivatedRoute.snapshot.data[0]) {
      this.notFoundFullHeight = !this.notFoundFullHeight;
    }
  }
}
