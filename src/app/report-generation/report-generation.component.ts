import { Component, OnInit,ViewChild,Input, Output } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormGroup,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {ServiceAPIService} from '../service-api.service';
import { ModelpopupComponent } from '../modelpopup/modelpopup.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SuccesspopupComponent } from '../successpopup/successpopup.component';
import { saveAs } from 'file-saver';
import { HomeComponent } from '../home/home.component';
@Component({
  selector: 'app-report-generation',
  templateUrl: './report-generation.component.html',
  styleUrls: ['./report-generation.component.css']
})
export class ReportGenerationComponent implements OnInit {
  @ViewChild(HomeComponent, {static: false})
  @Output() item = 'hai this is rah';
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
  
  report_title: any;
  mile_stone: any;
  num_lines_sysdebug: string;
  ingredient_exposure: string;
  no_los_graph: string;

  query_for_config_gen: any;
  query_for_report_gen: any;
  platform_name: any;
  //report_name: any;
  Title: any;
  power_bi_link: any;
  power_bi_summary_table: any;
  generated_summary_table: any;
  power_bi_summary_trend: any;
  generated_summary_trend: any;
  trend_start_date: any;
  qrc_by_milestone_table: any;
  qrc_by_target_list: any;
  high_open_by_qrc_vector: any;
  No_of_keyIngredients: any;
  n_lines_of_sysdebug_forum: any;
  n_key_ingredients: any;
  no_los_n_key_ingredients: any;
  0: any;
  mmf_indicator: any;
  milestone_for_mmf: any;
  milestone_start_date: any;
  1: any;
  program_first_use: any;
  superset_excel_path: any;
  version: any;
  email_to_send: any;
  report_name: "Windows Platform SysDebug Report";
  toggleDisplay() {
    this.isShow = !this.isShow;
  }
  myform: FormGroup;

  constructor( private http: HttpClient ,public router : Router,private aRouter: ActivatedRoute,private apiService: ServiceAPIService,public dialogRef: MatDialog,public dialog: MatDialogModule ) {
    this.myform = new FormGroup({
      moduleID: new FormControl(''),
      query_for_config_gen: new FormControl(	'',	[Validators.required]),
      query_for_report_gen: new FormControl(	''),
      platform_name: new FormControl(	'',	[Validators.required]),
      report_name: new FormControl(	''),
      Title: new FormControl(	''),
      power_bi_link: new FormControl(	''),
      power_bi_summary_table: new FormControl(	''),
      generated_summary_table: new FormControl(	''),
      power_bi_summary_trend: new FormControl(	''),
      generated_summary_trend: new FormControl(	''),
      trend_start_date: new FormControl(	''),
      qrc_by_milestone_table: new FormControl(	''),
      qrc_by_target_list: new FormControl(	''),
      high_open_by_qrc_vector: new FormControl(	''),
      No_of_keyIngredients: new FormControl(	''),
      n_lines_of_sysdebug_forum: new FormControl( ''),
      n_key_ingredients: new FormControl( ''),
      no_los_n_key_ingredients:new FormControl( ''),
      mmf_indicator: new FormControl( ''),
      milestone_for_mmf: new FormControl( ''),
      milestone_start_date: new FormControl( ''),
      operation: new FormControl(	''),
      email_to_send: new FormControl(	'')
    });  
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
      // this.apiService.getEditQueryResult().subscribe((res : any) =>{
      //   console.log(this.id)
      //   let value = res.editQueryDetails;
      //   console.log(value[this.id-1]);
      //   let passVal = value[this.id-1];
      //   //console.log(passVal.queryID)
      //   // this.QueryID = passVal.queryID;
      //   this.QRCQuery = passVal.qrcQuery;
      //   this.programName = passVal.programName;
      //   this.platform_name = passVal.programName;
      //    
      //   this.report_name = "Windows Platform SysDebug Report";
      //   this.report_title = "System Integration and Validation";
      //   this.PowerBI = passVal.powerBI;
      //   this.mile_stone = passVal.powerBI;
      //   this.num_lines_sysdebug = "1";
      //   this.ingredient_exposure = "10";
      //   this.no_los_graph = "10";
      //  })

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
      this.query_for_report_gen = currentVal.queryID;
      this.query_for_config_gen = currentVal.qrcQuery;
      this.programName = currentVal.programName;
      this.platform_name = currentVal.programName;
      this.report_name = "Windows Platform SysDebug Report";
      this.Title = "System Integration and Validation";
      this.PowerBI = currentVal.powerBI;
      this.qrc_by_target_list ="beta";
      this.No_of_keyIngredients = 7;
      this.num_lines_sysdebug = "1";
      this.ingredient_exposure = "10";
      this.no_los_graph = "10";
      this.PowerOn = currentVal.powerOn;
      this.PreAlpha = currentVal.preAlpha;
      this.alpha = currentVal.alpha;
      this.POE = currentVal.poe;
      this.Beta = currentVal.beta;
      this.PV = currentVal.pv;
      this.operation = this.operationval;
      this.email_to_send = "";
      console.log(this.operation)
     })
  }

  
  get formData() { return this.myform.controls; };
  
  validateForm() { 
 
 for(let i in this.myform.controls)
     this.myform.controls[i].markAsTouched();
 
 }
//  runExe(){
//   let MyObject = new ActiveXObject( "WScript.Shell" )  

//      MyObject.Run("file:C:\Users\jayarahx\OneDrive - Intel Corporation\Documents\EXEFILES\EXEFILES") ;  
 
//  }
//  save() {
//   const blob = new Blob([user]);
//   saveAs(blob, 'out.txt');
// }
 onSubmit (user: any): void  {
    
  const blob = new Blob ([JSON.stringify(this.myform.value)]);
  saveAs(blob, 'out.txt');
  let formValue = this.myform.value;
  localStorage.setItem('users', JSON.stringify(formValue))
   console.log(user);
   console.log(this.myform.value);    
     if (this.myform.valid) {
      //  window.alert("Report data is sent successfully")
       let url = "https://reqres.in/api/users";     
        // const headers = new HttpHeaders()
          // .set('Authorization', 'my-auth-token')
          // .set('Content-Type', 'application/json');
          console.log(this.myform)
      this.http.post(url, user).subscribe(res => this.dialogRef.open(SuccesspopupComponent));
      //  this.apiService.getAddQueryDetails(user).subscribe((res : any) =>{
      //    console.log(this.myform)
      //   console.log(res);
      //   window.alert("successfully submitted");
      //  })
      
   }
   else{this.validateForm()}
   }
 }

