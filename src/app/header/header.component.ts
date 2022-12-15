import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { Component, OnInit } from '@angular/core';
import { ServiceAPIService } from '../service-api.service';
import { BroadCastServiceService } from '../broad-cast-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../helper.service';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userDetails: any;
  userModelDetails: any;
  appBaseName = "Platform Sysdebug Assist";
  appTitleBar: string;
  ddList: any;
  Payload: { platform: string; };
  selectedPlatform: any;
  platformName: any;
  id: any;
  loginUser: any;
  esService: { requests: { command: string; command_args: { filter_keys: {}; }; var_args: any[]; tran_id: string; api_client: string; }[]; };
  userName: { username: string; };
  name: any;
  lastDataTime: any;
  timeQuery: any;
  currentVal: any;
  timelog: any;
  platformList: any = [];
  selectedPlat: any;
  getValue: any;
  avatarurl: any;
  constructor(private apiService: ServiceAPIService, private broadcastService: BroadCastServiceService,
    public router: Router, private aRouter: ActivatedRoute, private helper: HelperService, private notifier: NotifierService) {
    this.notifier = notifier;
  }
  openReleaseNotes() {
    //  this.modalService.open(content, { size: 'lg' });
  }
  releaseNote;
  techInfo;
  link;

  async cloudServer() {
    let userToken: any = await this.apiService.GetToken();
    console.log("usertoken", userToken);
    const payload = { "userToken": userToken.token }
    const userinfo: any = await this.apiService.getUserDetailByIAM(payload)
    console.log("userinfo", userinfo);
    if (userinfo) {
      /*   this.helper.setToken(userToken.token)
        this.helper.SetUser(userinfo); */
      this.name = userinfo.name;
      this.helper.SetUser(userinfo);
      //this.getValue = res.userModelDetails[0].wwid;
      this.avatarurl = userinfo.avatarURL;
    } else {
      // this.router.navigate(['/AccessDenied']);
    }
  }

  localServer() {
    this.esService = {
      "requests": [
        {
          "command": "who_am_i",
          "command_args": {
            "filter_keys": {

            }
          },
          "var_args": [

          ],
          "tran_id": "9878AE6D-AA8F-45E5-90D8-D0A16EDFDA38",
          "api_client": "SWAT:swat-article"
        }
      ]
    }


    this.apiService.esService(this.esService).subscribe((res: any) => {
      this.loginUser = res.responses[0].result_table[0].idsid;
      console.log(this.loginUser)
      this.userName =
      {
        "username": this.loginUser
      }

      this.apiService.getUserDetails(this.userName).subscribe((res: any) => {
        this.name = res.userModelDetails[0].name;
        this.helper.SetUser(res.userModelDetails[0]);
        //this.getValue = res.userModelDetails[0].wwid;
        this.avatarurl = res.userModelDetails[0].avatarURL;
        //console.log(this.getValue)
      })
    })
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }


  firstClick = true;
  refreshPage() {
    if (this.firstClick) {
      /* let txt = "The " + this.selectedPlatform + " platform refresh has begun"
      this.showNotification('success', txt); */
      let paylod = {
        "platformName": this.selectedPlatform
      }
      this.Completed = false;
      this.InProgress = true;
      this.setInterFunc();
      this.apiService.refreshPlatform(paylod).subscribe((res: any) => {
        if (res.result.message == 'Refreshed Successfully.') {
          this.Completed = true;
          this.InProgress = false;
          location.reload();
          //  this.showNotification('success', res.result.message);
        } else {
          // this.showNotification('success', res.result.message);
        }
      });
      //  this.firstClick = false;
    }
    /*  else if (!this.firstClick) {
       this.firstClick = false;
       let paylod = {
         "platformName": this.selectedPlatform
       }
       this.apiService.refreshPlatform(paylod).subscribe((res: any) => {
         if (res.result.message == 'Refreshed Successfully.') {
           location.reload();
           this.showNotification('success', res.result.message);
         } else {
           this.showNotification('success', res.result.message);
         }
       });
     } */
  }
  setInterFunc() {

    let setInter = setInterval(() => {
      if (this.selectedPlatform != undefined || this.selectedPlatform != null) {
        let paylod = {
          "platformName": this.selectedPlatform
        }
        this.apiService.refreshStatusInformation(paylod).subscribe((res: any) => {
          if (res.refreshStatus[0].status == "Completed") {
            this.Completed = true;
            this.InProgress = false;
            // location.reload();
            clearInterval(setInter);
            //  this.showNotification('success', res.result.message);
          } else if (res.refreshStatus[0].status == "InProgress") {
            this.Completed = false;
            this.InProgress = true;
            // this.showNotification('success', res.result.message);
          }
        });
      }
    }, 20000);
  }
  Completed = true;
  InProgress = false;
  ngOnInit(): void {
    this.setInterFunc();
    this.appTitleBar = this.appBaseName;


    /* local server config */
    // this.localServer();
    /* cloud server config */
     this.cloudServer();

    // let getPhoto = {
    //   "requests": [
    //     {
    //       "command": "get_user_info",
    //       "command_args": {
    //         "filter_keys": {},
    //         "idsid": this.loginUser
    //       },
    //       "var_args": [],
    //       "tran_id": "9ECAADAF-8EE8-4BC5-8FE0-8125AEB90AAE",
    //       "api_client": "SWAT:swat-article"
    //     }
    //   ]
    // }
    // this.apiService.esService(getPhoto).subscribe((res: any) => {
    //   console.log(res)
    // })


    this.aRouter.queryParamMap.subscribe((data: any) => {

      if (JSON.stringify(data.params) != '{}') {
        console.log(this.platformName = data.params.platform);
        this.platformName = data.params.platform;
        this.platformName = this.platformName;
        this.selectedPlatform = this.platformName;
        this.firstClick = true;
        console.log(this.platformName, "time stamp")

        this.apiService.getLastDataTime().subscribe((res: any) => {
          this.timeQuery = res.timeLogInfo;
          console.log(this.timeQuery);
          this.timelog = this.timeQuery.find(d => d.platformName == this.platformName).timeLog;
          console.log(this.timelog)

        })
      }
    })
    this.apiService.getEditQueryResult().subscribe((res: any) => {
      let pgmDetails = res.editQueryDetails.forEach((m: any) => {
        const newObjArr = [{ programName: m.programName }];
        this.platformList = [...this.platformList, ...newObjArr]
      });
      this.ddList = this.platformList;
    })


    /* get release note */
    this.apiService.GetVersion().subscribe((res: any) => {
      if (res) {
        this.releaseNote = res.version;
        this.link = res.technologyDetails[0].technologyInfo.split(": ");
        this.techInfo = res.technologyDetails;
        this.releaseNote.forEach((d, index) => {
          d.releaseIteam = d.releaseItems.split(".");
        });
      }
    })

  }

  selectedPtl;
  platformChange(value) {
    this.setInterFunc();
    this.selectedPlat = value;
    let payload = {
      "platform": value,
    }
    this.router.navigate(['home'], { queryParams: { platform: value } })
    this.broadcastService.broadcast("APICALL", payload);
  }
  platformAdd() {
    this.router.navigate(['query'], { queryParams: { operation: "AddQuery" } })
  }
  goHome() {
    this.selectedPlatform = '';
  }
  report() {

    this.router.navigate(['report'], { queryParams: { platform: this.selectedPlatform, operation: "EditQuery" } })
  }
  tableDetails(filter) {
    let t = this.router.serializeUrl(this.router.createUrlTree(['component_mapped']))
    window.open("#" + t, '_blank')
  }
  tableDetails1(filter) {
    let t = this.router.serializeUrl(this.router.createUrlTree(['component_unmapped']))
    window.open("#" + t, '_blank')
  }
  platformEdit(platform: any) {
    this.router.navigate(['query'], { queryParams: { platform: platform, operation: "EditQuery" } })
  }

  platformRemove(platform: any) {
    this.router.navigate(['query'], { queryParams: { platform: platform, operation: "RemoveQuery" } })
  }
}
