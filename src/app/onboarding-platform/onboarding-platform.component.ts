import { Component, OnInit } from '@angular/core';
import { ServiceAPIService } from '../service-api.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '../helper.service';
import { deflate } from 'zlib';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { BroadCastServiceService } from '../broad-cast-service.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-onboarding-platform',
  templateUrl: './onboarding-platform.component.html',
  styleUrls: ['./onboarding-platform.component.css']
})
export class OnboardingPlatformComponent implements OnInit {
  onBoardingPlatform = new FormGroup({
    platform : new FormControl('', [Validators.required]),
    originalquery : new FormControl('', [Validators.required]),
    qrcqueryurl : new FormControl(''),
    generatequery : new FormControl('', [Validators.required]),
    generatequeryId : new FormControl('', [Validators.required])
  })
  platformData:any;
  platformList:any;
  infoList:any;
  searchText = '';
  modalReference:any;

  PlatformName ='';
  OriginalQueryUrl='';
  QrcQueryUrl='';
  GeneratedQueryUrl='';
  GeneratedQueryId='';
  isCslp='False';
  PowerOn='';
  PreAlpha='';
  Alpha='';
  Poe='';
  Beta='';
  Pv='';
  CreatedBy='';
  Type='';
  Data : any = '';

  rowValue:any;

  Addpopupmsg:any;
  AddErrorpopupmsg:any;
  isAddpopupmsg:boolean = false;
  isAddErrorpopupmsg:boolean = false;

  Updatepopupmsg:any;
  UpdateErrorpopupmsg:any;
  isUpdatepopupmsg:boolean = false;
  isUpdateErrorpopupmsg:boolean = false;

  Deletepopupmsg:any;
  DeleteErrorpopupmsg:any;
  isDeletepopupmsg:boolean = false;
  isDeleteErrorpopupmsg:boolean = false;

  modal: any = {
    id:'',
    platformName: '',
    originalQueryUrl: '',
    qrcQueryUrl: '',
    generatedQueryUrl: '',
    generatedQueryId: '',
    isCslp: '',
    powerOn:'',
    preAlpha:'',
    alpha: '',
    poe: '',
    beta: '',
    pv:''
  };
  
  UserDetails:any;

  constructor(private apiService: ServiceAPIService, private modalService:NgbModal,config: NgbModalConfig,private helper: HelperService,
    private broadcastService: BroadCastServiceService,public router: Router) 
  { 
    config.backdrop = 'static';
    config.size = 'md';
  }

  ngOnInit(): void {
    this.getUserDetails();
    this.getOnboardingPlatformData();
  }

  getUserDetails(){
    this.helper.GetUser().subscribe(user => {
      this.UserDetails = user;
      console.log(this.UserDetails,"user details=====")
      }
    );
  }
  getOnboardingPlatformData(){
    this.apiService.getOnboardingPlatformData().subscribe((res:any) => {
      debugger
        this.platformData = res;
        this.platformList = this.platformData.platformList;
        console.log("platform data",this.platformList)
        console.log("platform data",this.platformData)
        this.infoList = this.platformData.informationList;
        let list : any = [];
        
        //list = this.infoList;
        debugger
        for(let i=0;i<this.infoList.length;i++){
          list[i] = this.infoList[i].description;
          let arr = [];
          let array = [];
          arr = list[i]
          for(let i=0;i<arr.length;i++){
          if(arr[i] != '&'){
           array[i] = arr[i];
          }
          else{
           array[i] = '\n'
          }
          }
          array.join('');
          list[i] = array.join('');
          this.infoList[i].description = list[i];
        }
    })
  }

  restForm(){
    this.onBoardingPlatform.reset();
  }
  //*** calling add paltform data modal popup ****//
  AddRow(addmodal:any){
    this.onBoardingPlatform.reset();
    this.modalReference=this.modalService.open(addmodal)  
  }

  //**** Validate platform input field ***//
  // invalidInput: boolean = false;
  // isValid: boolean = false;

  // validateInput(PlatformName: string) {
  //   const regex = /^[a-zA-Z0-9_]+$/;
  //   if (!regex.test(PlatformName)) {
  //     this.invalidInput = true;
  //     // alert("Please enter only capital letters, small letters, numbers, and underscores.");
  //     // this.myInput = '';
  //   }
  //   else{
  //     this.invalidInput = false;
  //   }
  //   this.isValid = this.PlatformName.trim().length >= 3;
  // }

  // invalidInput: boolean = false;
  // validateInput() {
  //   const pattern = /^[a-zA-Z0-9]+$/;
  //   if (!pattern.test(this.PlatformName)) {
  //     this.invalidInput = true;
  //   } else {
  //     this.invalidInput = false;
  //   }
  // }

  //*** adding paltform data ****//
  AddPlatform(){
    debugger
    const regex = /^[a-zA-Z0-9_]+$/;
    if (regex.test(this.PlatformName) && this.PlatformName != null) {
      // this.invalidInput = true;
    
    debugger
    let req = {
  		"platformName": this.PlatformName,
  		"originalQueryUrl": this.OriginalQueryUrl,
  		"qrcQueryUrl": this.QrcQueryUrl,
  		"generatedQueryUrl": this.GeneratedQueryUrl,
  		"generatedQueryId": this.GeneratedQueryId,
  		"isCSLP": this.isCslp,
  		"powerOn": this.PowerOn,
  		"preAlpha": this.PreAlpha,
  		"alpha": this.Alpha,
  		"poe": this.Poe,
  		"beta": this.Beta,
  		"pv": this.Pv,
  		"createdBy": this.UserDetails.name,
  		"type": 'C'
   }
    this.apiService.getAddPlatformDetails(req).subscribe((res:any) =>{
      debugger
      console.log("table data",res);
       if(res.result.status == false){
        this.AddErrorpopupmsg = res.result.message;
        this.isAddErrorpopupmsg = true;
       }
       else{
        this.Addpopupmsg = res.result.message;
        this.isAddpopupmsg = true; 
        setTimeout(() =>{
          this.isAddpopupmsg = false; 
          this.modalReference.close();
          this.restForm();
         },3000); 
       }
       this.getOnboardingPlatformData();
    })
    // this.modalReference.close();
    this.closeResponseMessage();
    // this.modalReference.close();
  }
  // else{
  //   this.invalidInput = false;
  //   // alert("invalid input")

  // }
}

  //**** Close response message method****//
  closeResponseMessage(){
     setTimeout(() =>{
       this.isAddpopupmsg = false; 
       this.isAddErrorpopupmsg = false;
       this.isUpdatepopupmsg = false;
       this.isUpdateErrorpopupmsg = false;
       this.isDeletepopupmsg = false;
       this.isDeleteErrorpopupmsg = false;
      //  this.modalReference.close()
      },3000); 
      // this.modalReference.close();
     }

     //**** for edit onboarding platform form*****//
     EditPlatformRow(editmodal: any, id: any){
        debugger;
        this.platformList.forEach((element: any) => {
          if (element.id == id) {
            debugger;
            this.modal['id'] = element.id;
            this.modal['platformName'] = element.platformName;
            this.modal['originalQueryUrl'] = element.originalQueryUrl;
            this.modal['qrcQueryUrl'] = element.qrcQueryUrl;
            this.modal['generatedQueryUrl'] = element.generatedQueryUrl;
            this.modal['generatedQueryId'] = element.generatedQueryId;
            this.modal['isCslp'] = element.isCSLP;
            this.modal['powerOn'] = element.powerOn;
            this.modal['preAlpha'] = element.preAlpha;
            this.modal['alpha'] = element.alpha;
            this.modal['poe'] = element.poe;
            this.modal['beta'] = element.beta;
            this.modal['pv'] = element.pv;
          }
        });
        this.modalReference = this.modalService.open(editmodal);
     }

     //**** for update onboarding platform form*****//
     UpdateTable(){
      let req = {
        "id": this.modal.id,
        "platformName": this.modal.platformName,
        "originalQueryUrl": this.modal.originalQueryUrl,
        "qrcQueryUrl": this.modal.qrcQueryUrl,
        "generatedQueryUrl": this.modal.generatedQueryUrl,
        "generatedQueryId": this.modal.generatedQueryId,
        "isCSLP": this.modal.isCslp,
        "powerOn": this.modal.powerOn,
        "preAlpha": this.modal.preAlpha,
        "alpha": this.modal.alpha,
        "poe": this.modal.poe,
        "beta": this.modal.beta,
        "pv": this.modal.pv,
        "modifiedBy": this.UserDetails.name,
        "type": "U"
      }
     this.apiService.getUpdatePlatformDetails(req).subscribe((res:any) => {
      if(res.result.status == false){
        this.UpdateErrorpopupmsg = res.result.message;
        this.isUpdateErrorpopupmsg = true;
        setTimeout(() =>{
          this.isUpdateErrorpopupmsg = false; 
          this.modalReference.close();
         },3000);
       }
      //  else{
      //   this.isUpdatepopupmsg = true; 
      //   this.Updatepopupmsg = res.result.message;
      //  }
       else{
        this.isUpdatepopupmsg = true; 
        this.Updatepopupmsg = res.result.message;
        setTimeout(() =>{
          this.isUpdatepopupmsg = false; 
          this.modalReference.close();
         },3000); 
       
       }
       this.getOnboardingPlatformData();
     })
      this.closeResponseMessage();
     }

   //**** for delete onboarding platform*****//
    DeleteRow(deletemodal:any,id:any){
      this.rowValue = id;
      this.modalReference=this.modalService.open(deletemodal)
    }

     //**** for delete confiramtion onboarding platform*****//
    ConfirmDelete(){
    let req = {
        "id": this.rowValue,
         "deletedBy": this.UserDetails.name,
         "type": "D"
    }
   this.apiService.getDeletePlatformDetails(req).subscribe((res:any) =>{
    if(res.result.status == false){
      this.DeleteErrorpopupmsg = res.result.message;
      this.isDeleteErrorpopupmsg = true;
      setTimeout(() =>{
        this.isDeleteErrorpopupmsg = false; 
        this.modalReference.close();
       },3000); 
     }
     else{
      this.isDeletepopupmsg = true; 
      this.Deletepopupmsg = res.result.message;
      setTimeout(() =>{
        this.isDeletepopupmsg = false; 
        this.modalReference.close();
       },3000); 
     
     }
     this.getOnboardingPlatformData();
   })
    this.closeResponseMessage();
  }

   //*** calling add paltform data modal popup ****//
   Addinfo(infomodal:any){
    this.modalReference=this.modalService.open(infomodal)  
    this.getOnboardingPlatformData();
  }

  //****for clearing the input from search field****//
  clearInput(arg) {
    this[arg] = '';
  }

//*** Click platform name from table it will redirect to particular cahrt page ****//
  selectedPlat: any;
  platformChange(value:any) {
    debugger
    // this.PlatformValues = value;
    this.selectedPlat = value;
    let payload = {
      "platform": value,
    }
    this.router.navigate(['/home'],{ queryParams: { platform: value }})
    this.broadcastService.broadcast("APICALL", payload);
  }

 
}
