import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormGroup,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {ServiceAPIService} from '../service-api.service';
import { NotifierService } from 'angular-notifier';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { array } from '@amcharts/amcharts4/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
  
@Component({
  selector: 'app-platform-onboarding',
  templateUrl: './platform-onboarding.component.html',
  styleUrls: ['./platform-onboarding.component.css']
})
export class PlatformOnboardingComponent implements OnInit {
  chosenWeekDate: Date;
  isShow = false;
  platformName: any;
  addQuery: { ModuleId: number; ProgramName: string; QueryID: string; PowerBI: string; QRCQuery: string; PowerOn: string; PreAlpha: string; POE: string; Beta: string; PV: string; };
  QueryID: any;
  PowerBI: string;
  QRCQuery: string;
  PowerOn: string;
  PreAlpha: string;
  alpha: string;
  POE: string;
  Beta: string;
  PV: string;
  id: any;
  programName: any;
  editQuery: any;
  moduleID: any;
  moduleid: any;
  operation: any;
  Operation: any;
  operationval: any;
  enable_cslp: any;
  myform: FormGroup;
  infoButtonData = [];

  constructor( private http: HttpClient ,public router : Router,private aRouter: ActivatedRoute,private apiService: ServiceAPIService,private notifier: NotifierService) {
    this.notifier = notifier;
    this.myform = new FormGroup({
      moduleID: new FormControl(''),
      ProgramName: new FormControl(	'',	[Validators.required]),
      QueryID: new FormControl(	'',	[Validators.required]),
      PowerBI: new FormControl(	''),
      QRCQuery: new FormControl(	''),
      PowerOn: new FormControl(	''),
      PreAlpha: new FormControl(	''),
      alpha: new FormControl(	''),
      POE: new FormControl(	''),
      Beta: new FormControl(	''),
      PV: new FormControl(	''),
      operation: new FormControl(	''),
      enable_cslp: new FormControl( ''),
    });  
    console.log(this.myform)
  }

  ngOnInit() {
    this.aRouter.queryParamMap.subscribe((data: any) => {

      if (JSON.stringify(data.params) != '{}') {
        this.platformName = data.params.platform;
        this.Operation = data.params.operation;
        this.operationval = this.Operation;
        this.operation = this.operationval
        console.log(this.Operation)
      }
     
      else{
        
      }
      this.apiService.getEditQueryResult().subscribe((res : any) =>{
        console.log(this.id)
        let value = res.editQueryDetails;
        console.log(value[this.id-1]);
        let passVal = value[this.id-1];
        console.log(passVal.queryID)
        this.programName = passVal.programName;
        this.QueryID = passVal.queryID;
        this.PowerBI = passVal.powerBI;
        this.QRCQuery = passVal.qrcQuery;
        this.PowerOn = passVal.powerOn;
        this.PreAlpha = passVal.preAlpha;
        this.alpha = passVal.alpha;
        this.POE = passVal.poe;
        this.Beta = passVal.beta;
        this.PV = passVal.pv;
        this.enable_cslp = passVal.enable_cslp;
         
        //this.enable_cslp = passVal.pv;
      
       })

    })

    this.apiService.GetCalculations().subscribe((res :any) => {
      this.infoButtonData = res.platformQueryInfo;
      console.log(this.infoButtonData);
    })
    this.apiService.getEditQueryResult().subscribe((res : any) =>{
      this.editQuery = res.editQueryDetails;
      console.log(this.editQuery);
      let passVal = this.editQuery;
      let currentPlatform = this.platformName
      console.log(this.platformName);
     
      function progName(objval){
        return objval.programName === currentPlatform;
      }
      console.log(passVal.findIndex(progName));
      let selectarr = passVal.findIndex(progName);
      let currentVal = this.editQuery[selectarr];
      this.moduleID = -1;
      this.moduleID = currentVal.moduleID;
      this.programName = currentVal.programName;
      this.QueryID = currentVal.queryID;
      this.PowerBI = currentVal.powerBI;
      this.QRCQuery = currentVal.qrcQuery;
      this.PowerOn = currentVal.powerOn;
      this.PreAlpha = currentVal.preAlpha;
      this.alpha = currentVal.alpha;
      this.POE = currentVal.poe;
      this.Beta = currentVal.beta;
      this.PV = currentVal.pv;
      this.operation = this.operationval;
      let value = currentVal.enable_cslp;
 
      if (value == "true"){
        this.enable_cslp = "true";
      }
      else{
        this.enable_cslp = "";
      }
      //this.enable_cslp = currentVal.enable_cslp;
      console.log(this.operation)
     })
  }
  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
	}

  get formData() { return this.myform.controls; };
  
  validateForm() { 
 
 for(let i in this.myform.controls)
     this.myform.controls[i].markAsTouched();
 
 }
 
 onSubmit (user: any): void  {
   console.log(user);
   //console.log(this.myform);    
     if (this.myform.valid) {
       if(user.enable_cslp == true){
         user.enable_cslp = "true"
       }
       user.operation="AddQuery";
       let value =  user;
       console.log(user.enable_cslp)
       console.log(value)
       this.apiService.getAddQueryDetails(value).subscribe((res : any) =>{
         console.log(this.myform)
        console.log(res);
      
       })
       this.showNotification( 'info', 'Form submitted successfully!' );
   }
   else{this.validateForm()}
   }
   toggleDisplay() {
    this.isShow = !this.isShow;
  }
}
