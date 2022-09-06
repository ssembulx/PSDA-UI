import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import {Inject} from '@angular/core';
import { DataService } from 'src/app/data.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ServiceAPIService } from 'src/app/service-api.service';
import { NotifierService } from 'angular-notifier';
import {formatDate } from '@angular/common';
@Component({
  selector: 'app-editdialog',
  templateUrl: './editdialog.component.html',
  styleUrls: ['./editdialog.component.css']
})
export class EditdialogComponent implements OnInit {
  today= new Date();
  jstoday = '';
  registerForm: FormGroup;
  dataValue: any;
  next_step: any;
  next_step_orvalue: any;
  id: any; 
  promoted_ID: any; 
  title: any; 
  status: any; 
  exposure: any; 
  domain: any; 
  domain_debug: any; 
  reason: any; 
  sysdebug_forum: any; 
  count: any; 
  suspected_Ingredient: any; 
  target: any; 
  progress: any; 
  isolated:any; 

  priority:any; 
  component:any; 
  owner: any; 
  days_open: any; 
  board: any; 
  regression: any; 
  from_subject: any; 
  submitted_by: any; 
  ext_access: any; 
  submitter_org: any; 
  soc_stepping: any; 
  target_impact: any; 
  impact: any; 
  submitted_date: any; 
  closed_date: any; 
  sysdebug_forum_orvalue:any
  closed_reason: any; 
  repro_on_rvp: any; 
  open_date: any; 
  sysdebug: any; 
  implemented_date: any; 
  verified_date: any; 
  days_triage: any; 
  qrc_vector: any; 
  days_decimal_triage: any; 
  days_validating: any; 
  days_development: any; 
  days_decimal_debugging: any; 
  tag: any; 
  ingredient: any; 
  platform: any;
  esService: { requests: { command: string; command_args: { filter_keys: {}; }; var_args: any[]; tran_id: string; api_client: string; }[]; };
  loginUser: any;
  title_orvalue :any;
  domain_orvalue :any;
  domain_debug_orvalue :any;
  domain_affected: any;
  comments: any;
  esService1: { requests: { tran_id: string; command: string; command_args: { id: string; }; var_args: any[]; }[]; };
  constructor(private notifier: NotifierService,private apiService: ServiceAPIService,private dialogReffer: MatDialog,private formBuilder: FormBuilder,public dialogRef: MatDialogRef<EditdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.id = data.id;
      this.title = data.title;
      this.status = data.status; 
      this.exposure = data.exposure; 
      this.domain = data.domain; 
      this.domain_debug = data.domain_debug; 
      this.reason = data.reason; 
      this.sysdebug_forum = data.sysdebug_forum; 
      this.count = data.count; 
      this.suspected_Ingredient = data.suspected_Ingredient; 
      this.target = data.target; 
      this.progress = data.progress; 
      this.isolated =data.isolated; 
      this.priority =data.priority; 
      this.component =data.component; 
      this.owner = data.owner; 
      this.days_open = data.days_open; 
      this.board = data.board; 
      this.regression = data.regression; 
      this.from_subject = data.from_subject; 
      this.submitted_by = data.submitted_by; 
      this.ext_access = data.ext_access; 
      this.submitter_org = data.submitter_org; 
      this.soc_stepping = data.soc_stepping; 
      this.target_impact = data.target_impact; 
      this.impact = data.impact; 
      this.submitted_date = data.submitted_date; 
      this.closed_date = data.closed_date; 
      this.closed_reason = data.closed_reason; 
      this.repro_on_rvp = data.repro_on_rvp; 
      this.open_date = data.open_date; 
      this.sysdebug = data.sysdebug; 
      this.implemented_date = data.implemented_date; 
      this.verified_date = data.verified_date; 
      this.days_triage = data.days_triage; 
      this.qrc_vector = data.qrc_vector; 
      this.days_decimal_triage = data.days_decimal_triage; 
      this.days_validating = data.days_validating; 
      this.days_development = data.days_development; 
      this.days_decimal_debugging = data.days_decimal_debugging; 
      this.tag = data.tag; 
      this.ingredient = data.ingredient; 
      this.platform = data.platform;
      this.promoted_ID = data.promoted_ID;
      this.next_step = data.next_step;

      this.title_orvalue = data.title;
      this.domain_orvalue = data.domain;
      this.domain_debug_orvalue = data.domain_debug;
      this.sysdebug_forum_orvalue = data.sysdebug_forum;
      this.next_step_orvalue = data.next_step;
     }
  ngOnInit(): void {
    //this.showNotification( 'success', 'Mail has been sent successfully' );
    //throw new Error('Method not implemented.');
    
    this.registerForm = this.formBuilder.group({
      title: ['', ],
      id: ['', ],
      promoted_ID: ['', ],
      status: ['', ],
      domain: ['', ],
      domain_debug: ['', ],
      reason: ['', ],
      sysdebug_forum: ['', ],
      suspected_Ingredient: ['', ],
      count: ['', ],
      next_step: ['', ],
   });

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
      this.loginUser = res.responses[0].result_table[0].idsid
    })
    this.esService1 =  {
      "requests": [
          {
              "tran_id": "1234",
              "command": "get_record_by_id",
              "command_args": {
                  "id": this.id
              },
              "var_args": []
          }

      ]

  }
    this.apiService.esService(this.esService1).subscribe((res: any) => {
      this.domain_affected = res.responses[0].result_table[0].domain_affected;
      //this.comments = res.responses[0].result_table[0].comments;
      console.log("test" + this.comments);
    })
    let valueComments =  {
      "requests": [
        {
          "command": "get_comments_by_record_id",
          "command_args": {
            "filter_keys": {},
            "id": this.id,
            "tenant": "client_platf"
          },
          "var_args": [],
          "tran_id": "B2DBEC42-DDDD-460B-84FF-24F617D1C5BA",
          "api_client": "SWAT:swat-article"
        }
      ]
    }
    this.apiService.esService(valueComments).subscribe((res: any) => {
      // this.domain_affected = res.responses[0].result_table[0].domain_affected;
      this.comments = res.responses[0].result_table;


      // console.log("test" + this.comments);
      // this.comments.forEach((submitted_by) => {
      //     return this.comments.push(
      //     { image: submitted_by })
      // });

      // const arrWithColor = this.comments.map(object => {
      //   let userName =
      //   {
      //     "username": object.Submitted_by
      //   }
      //   this.apiService.getUserDetails(userName).subscribe((res: any) => {
      //     let name = res.userModelDetails[0].name;
      //     //this.getValue = res.userModelDetails[0].wwid;
      //     let avatarurl = res.userModelDetails[0].avatarURL;
      //     //console.log(this.getValue)
      //   return {...object, image: avatarurl};
      //   })
      // });
      // console.log(arrWithColor)
    })
  }
  
formControl = new FormControl('', [
Validators.required
// Validators.email,
]);

getErrorMessage() {
return this.formControl.hasError('required') ? 'Required field' :
this.formControl.hasError('email') ? 'Not a valid email' :
'';
}
submit(){

}


stopEdit(): void {
//this.dataService.updateIssue(this.data);
}
public showNotification( type: string, message: string ): void {
  this.notifier.notify( type, message );
}
onSubmit() {
  //this.submitted = true;
  //this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
  this.jstoday = [
  this.today.getFullYear(),
  '-',
  ('0' + (this.today.getMonth() + 1)).slice(-2),
  '-',
  ('0' + this.today.getDate()).slice(-2),
  ' ',
  this.today.getHours(),
  ':',
  this.today.getMinutes(),
  ':',
  this.today.getSeconds(),
  ':',
  this.today.getMilliseconds()
].join('');
  console.log(this.jstoday)
  let data: any;
  // stop here if form is invalid
  if (this.registerForm.invalid) {
      console.log("not valid")
  }
  else{
    console.log("valid")
    console.log(this.domain_affected + this.domain)
    let totalValue = this.domain_affected + ',' + this.domain;
    console.log(totalValue)
    let obj = {
      ...(this.title != this.title_orvalue) && {'title': this.title},
      ...(this.domain != this.domain_orvalue) && {'domain': this.domain},
      ...(this.domain != this.domain_orvalue) && {'domain_affected': totalValue},
      ...(this.domain_debug != this.domain_debug_orvalue) && {'client_platf.bug.domain_debug': this.domain_debug},
      ...(this.sysdebug_forum != this.sysdebug_forum_orvalue) && {'client_platf.bug.sysdebug_forum': this.sysdebug_forum},
      ...(this.next_step != this.next_step_orvalue) && {'client_platf.bug.next_step': this.next_step},
      ...(true) && {'send_mail': 'true'}
    }
    const out  = Object.entries(obj).map(([k, v]) => ({ [k]: v }));
     let data = {
        "requests": [
          {
            "command": "update_record_with_fetch",
            "command_args": {
              "filter_keys": {},
              "id": this.id,
              "tenant": "client_platf",
              "subject": "bug",
              "rev": ""
            },
            "var_args": out,
            "tran_id": "74B928A9-1D69-478B-AFA4-13173AF2370B",
            "api_client": "SWAT:swat-article"
          }
        ]
      }
      console.log(data);
      
    this.apiService.esService(data).subscribe((res: any) => {
      console.log(res)
      if(res){
        this.dialogReffer.closeAll();
        this.showNotification( 'success', 'HSDES data has been update successfully' );
        
      }else{
        console.log("error")
      }
  });
let UpdateDataDetails = {
  "UpdateDataDetails":[{
    "id": this.id,
    "title":this.title,
    "domain":this.domain,
    "domain_debug":this.domain_debug,
    "sysdebug_forum": this.sysdebug_forum,
    "next_step": this.next_step,
    "PlatformName":this.platform,
    "updated_by":this.loginUser,
    "updated_date":this.jstoday
    }]
  }
  console.log(UpdateDataDetails)
  this.apiService.UpdateDataHSDES(UpdateDataDetails).subscribe((res: any) => {
    console.log(res)
    if(res){
      this.dialogReffer.closeAll();
    }else{
      console.log("error")
    }
});

  }
}
fullScreenFlag = false;
/* get full screen view */
getfullScreen() {
  this.fullScreenFlag = !this.fullScreenFlag
}

}
