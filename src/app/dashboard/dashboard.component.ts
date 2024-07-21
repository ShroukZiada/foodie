import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SizinghelperService } from '../shared/services/sizinghelper.service';
interface sideNavToggle{
  screenWidth:number;
  collapsed: boolean;
} 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private _sizingHelper: SizinghelperService) { }
  ngOnInit(): void {
    this._sizingHelper.manageDashBoardSizing(this.sideBar, this.mainSection, this.RouteOutlet);
    // this._sizingHelper.data.subscribe({
    //   next: (newData)=>{
    //     this.height = newData.parentHeight;
    //   }
    // })

    this.height = `${window.innerHeight}px`;
  }


  @ViewChild("sidebar", { static: true })
  sideBar!: ElementRef;
  @ViewChild("mainSection", { static: true })
  mainSection!: ElementRef;
  @ViewChild("RouteOutlet", { static: true })
  RouteOutlet!: ElementRef;

  height!: string;

  }



  


  


