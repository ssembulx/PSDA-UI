import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceAPIService } from '../service-api.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LandingPageComponent implements OnInit {
  platformList: any = [];
  selectedPlatform: any;
  PlatformName: any;
  id: any;
  timeList: any[];
  constructor(private apiService: ServiceAPIService, public router: Router) { }
  ngOnInit(): void {
    this.apiService.getEditQueryResult().subscribe((res: any) => {
      let pgmDetails = res.editQueryDetails.forEach((m: any) => {
        const newObjArr = [{ programName: m.programName }];
        this.platformList = [...this.platformList, ...newObjArr]
      });
      console.log(this.platformList);
    })
    this.getUserViewDetails();
  }
  userviewDetails;
  getUserViewDetails() {
    this.apiService.getUserViewCount().subscribe((res: any) => {
      this.userviewDetails = res.userviewDetails;
    })
  }

  platformRoute(platform: any) {
    this.router.navigate(['home'], { queryParams: { platform: platform } })
  }

  platformEdit(platform: any) {
    this.router.navigate(['query'], { queryParams: { platform: platform, operation: "EditQuery" } })
  }

  platformRemove(platform: any) {
    this.router.navigate(['query'], { queryParams: { platform: platform, operation: "RemoveQuery" } })
  }
}
