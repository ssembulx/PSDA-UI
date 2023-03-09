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

  userOnboardInfo:any;
  userOnboardName:any;

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
      this.getUserOnboardInfo();
      console.log(this.name,"dfghjk")
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
      debugger
      this.loginUser = res.responses[0].result_table[0].idsid;
      console.log(this.loginUser)
      this.userName =
      {
        "username": this.loginUser
      }

      this.apiService.getUserDetails(this.userName).subscribe((res: any) => {
        this.name = res.userModelDetails[0].name;
        this.getUserOnboardInfo();
        console.log(this.name,"fhhhhhhhhhhhhh")
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

  refreshPage() {
    let paylod = {
      "platformName": this.selectedPlatform
    }
    this.apiService.refreshPlatform(paylod).subscribe((res: any) => {
      if (res.result.message == 'Refreshed Successfully.') {
        location.reload();
        // this.showNotification('success', res.result.message);
      }
    });
  }

  ngOnInit(): void {
    
    this.appTitleBar = this.appBaseName;


    /* local server config */
    this.localServer();
    /* cloud server config */
    // this.cloudServer();

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
      debugger
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
user:boolean = false;

  getUserOnboardInfo(){
    this.apiService.GetUserOnboardInfo().subscribe((res:any) =>{
      debugger
       this.userOnboardInfo = res.userOnboardInfo;
      this.userOnboardInfo.forEach((element:any) => {
         if(element.userName === this.name){
          this.user = true;
         }
      });
      // this.userOnboardName = res?.userOnboardInfo[0].userName;
    })
  }
}
