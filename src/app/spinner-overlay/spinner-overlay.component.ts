import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService, Loader } from 'ngx-ui-loader';

@Component({
  selector: 'app-spinner-overlay',
  templateUrl: './spinner-overlay.component.html',
  styleUrls: ['./spinner-overlay.component.css']
})
export class SpinnerOverlayComponent implements OnInit {
  loader: any;
  masterLoader: Loader;
  timers: any;
  constructor(private ngxUiLoaderService: NgxUiLoaderService) {
    this.masterLoader = this.ngxUiLoaderService.getLoader();
    this.loader = {
      "loaderId": "master",
      "bgsColor": "#0071c5",
      "bgsOpacity": 0.5,
      "bgsPosition": "center-center",
      "bgsSize": 70,
      "bgsType": "rectangle-bounce",
      "blur": 5,
      "delay": 0,
      "fastFadeOut": true,
      "fgsColor": "red",
      "fgsPosition": "center-center",
      "fgsSize": 60,
      "fgsType": "three-strings",
      "gap": 24,
      "logoPosition": "center-center",
      "logoSize": 120,
      "logoUrl": "./assets/image/Siv_white.png",
      "masterLoaderId": "master",
      "overlayBorderRadius": "0",
      "overlayColor": "rgba(40, 40, 40, 0.8)",
      "pbColor": "red",
      "pbDirection": "ltr",
      "pbThickness": 3,
      "hasProgressBar": true,
      "text": "Loading...",
      "textColor": "#ffffff",
      "textPosition": "center-center",
      "maxTime": -1,
      "minTime": 300
    };
  }

  ngOnInit(): void {
  }

}
