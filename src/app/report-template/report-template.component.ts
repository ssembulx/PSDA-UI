import { AfterViewInit, Component, OnInit, ViewEncapsulation, QueryList, ViewChildren, ChangeDetectorRef, Input, TemplateRef, ViewChild, PipeTransform, Pipe } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ServiceAPIService } from '../service-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BroadCastServiceService } from '../broad-cast-service.service';

import { saveAs } from 'file-saver';
import { SpinnerOverlayComponent } from '../spinner-overlay/spinner-overlay.component';
import { SpinnerOverlayService } from '../spinner-overlay.service';
import html2PDF from 'jspdf-html2canvas';
import { NotifierService } from 'angular-notifier';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FormControl, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelect } from '@angular/material/select';
import * as svg from 'save-svg-as-png';
import html2canvas from 'html2canvas';
import JSZip from "jszip";
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'highlight'
})
export class HighlightSearch implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(value: any, args: any): any {
    if (!args) {
      return value;
    }
    // Match in a case insensitive maneer
    const re = new RegExp(args, 'gi');
    const match = value.match(re);

    // If there's no match, just return the original value.
    if (!match) {
      return value;
    }

    const replacedValue = value.replace(re, "<mark>" + match[0] + "</mark>")
    return this.sanitizer.bypassSecurityTrustHtml(replacedValue)
  }
}
@Component({
  selector: 'app-report-template',
  templateUrl: './report-template.component.html',
  styleUrls: ['./report-template.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ReportTemplateComponent implements OnInit, AfterViewInit {
  @ViewChildren('checkBox') checkBox: QueryList<any>;
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  @ViewChild('callAPIDialog1') callAPIDialog1: TemplateRef<any>;
  //@ViewChild('registerForm') myform;
  objectName = {

    implemented_BKC: "",

    ingrediant: "",

    qrc_vector: "",

    total: "",

    verified_on_eng_OWR: "",

    wssDebug: ""

  }
  duration: any;
  countWords = 200;
  readMoreFlag = true;
  readLessFlag = false;
  countType: any;
  // lessWordFlag = true;
  mYear: any;
  getSightingsInfo: any;
  defectsAndRegressionInfo: any;
  activeCount: any;
  exposureCount: any;
  daysCount: any;
  percentageInfo: any;
  sceCount: any;
  dcrCount: any;
  totalCount: any;
  avgNew: any;
  avgClosed: any;
  closedCount: any;
  exposureClosedCount: any;
  closedCountPercentages: any;
  getTargetWiseCounts: any = []; target: any; target_count: any;
  getDomainWiseCounts: any = []; domain: any; domain_count: any;
  getDomainDebugCounts: any = [];
  critical: any;
  high: any;
  medium: any;
  low: any;
  critical_c: any;
  high_c: any;
  medium_c: any;
  low_c: any;
  domainName: any; exposure: any;
  ingredient: any; chartType: any;
  Ingredient: any; Exposure: any;
  getIngredientWiseCounts: any = []; getIngredientWiseHSDESInfo: any;
  getImplementedReasonCounts: any = [];
  getOpenStatusExposureCounts: any = [];
  cumulativeStatusCount: any;
  cumulativeImplementedCount: any;
  cumulativeCriticalCount: any;
  cumulativeHighCount: any;
  cumulativeMediumCount: any;
  cumulativeLowCount: any;
  cumulativeClosedCount: any;
  getCriticalQRCvectorData: any;
  getCritical_qrcvector: any = [];
  getCriticalQRCvectorData1: any;
  getHighQRCvector: any;
  cumulativeDCRCount: any;
  cumulativeSCECount: any;
  cumulativeTotalCount: any;
  getCriticalDefectsvector: any;
  getHighDefectsvector: any;
  Payload: { platform: string; ChartNo: string; Filter: string; status: string };
  ddList: any;
  platformName: any;
  totalPayload: { platform: any; };
  domainExposure: { platform: any; DomainName: string; Exposure: string; CHARTTYPE: any; };
  defectRegression: { platform: any; Ingredient: string; ChartType: string; CHARTTYPE: any; }
  getTargetWiseData: { platform: any; target: string; };
  getDomainWiseDate: { platform: any; domain: string; type: string; };
  getDomainDebugDate: { platform: any; domain: string; type: string; };
  getIngredientData: { platform: any; ingredient: string; };
  getReasonData: { platform: any; Reason: string; };
  getOpenStatusExposure: { platform: any; exposure: string; };
  getCumulativeStatus: { platform: any; status: string; exposure: string; };
  ingredientExposure: { platform: any; Ingredient: any; Exposure: any; CHARTTYPE: any; };
  chartdetails: { platform: any; COUNTTYPE: any; CHARTDATE: any; CHARTTYPE: any; };
  criticalQRC: { platform: any; QRCVector: string; DefectFactor: string; Type: string; Exposure: string; };
  criticalQRC1: { qrc_vector: any; ingrediant: string; wssDebug: string; verified_on_eng_OWR: string; implemented_BKC: string; total: string; };
  criticalQRCtable: { qrc_vector: any; ingrediant: string; wssDebug: string; verified_on_eng_OWR: string; implemented_BKC: string; total: string; }
  highQRC: { platform: any; QRCVector: string; DefectFactor: string; Type: string; Exposure: string; };
  highQRCDefect: { platform: any; QRCVector: string; DefectFactor: string; Type: string; Exposure: string; };
  criticalQRCDefect: { platform: any; QRCVector: string; DefectFactor: string; Type: string; Exposure: string; };
  trendStatus: { platform: any, ChartType: string; target: string; }
  noLoscritical: { platform: any, exposure: string }
  noLoshigh: { platform: any, exposure: string }
  objd: { platform: any, ChartType: any, FromDate: any }
  mail_value: { listOfIssuesStatus: any, platform: any, topCount: any, reportTitle: any, reportName: any, mailTo: any, target: any, query: any }
  verifiedPayload: { platform: any }
  //chartImage: { daysOpen: any, sivDatachart1: any, sivDatachart2: any, openClosetrend : any, openClose : any, openSightings : any, criticalNolos : any, criticalHighlos : any};
  chartImage = [];
  myChartvalue: { ActiveCountChart: any, ClosedCountChart: any, TotalSightingChart: any, OpenCloseTrendChart: any, OpenCloseChart: any, IngredientsExposureChart: any, CriticalChart: any, HighChart: any };
  keyFailing: { platform: any, topCount: any }
  issueList: { platform: any, exposure: any, target: any }
  issueListhigh: { platform: any, exposure: any, target: any }
  getFunctionalDefectsCount: any;
  editQuery: any;
  programName: any;
  powerBI: any;
  powerBurl: any;
  QueryID: any;
  QRCQuery: any;
  trend_milestone: any;
  displayProgressSpinner = true;
  select_all: boolean = false;
  show_chart: boolean = true;
  hide_emailcontent = true;
  show_emailcontent = false;
  hide_contentall = true;
  qrc_milestone_table = true;
  high_qrc_milestone_table = true;
  implemented_qrc_milestone_table = true;
  implemented_table = true;
  serial_no = false;
  workWeek: any;
  listIssue: any;
  critical_defectsBugs: any;
  critical_dpmO_DPMT: any;
  critical_pnP: any;
  critical_hlk: any;
  critical_prechecksRequiremnt: any;
  critical_tpv: any;
  critical_customer_must_fix: any;
  critical_other: any;
  high_defectsBugs: any;
  high_dpmO_DPMT: any;
  high_pnP: any;
  high_hlk: any;
  high_prechecksRequiremnt: any;
  high_tpv: any;
  high_customer_must_fix: any;
  implemented: any;
  high_other: any;
  contents: string;
  chartdataurl1: any;
  Title: string = "Windows Platform SysDebug Report"
  // defaultColumns: string[] = ['Header', 'open/close chart', 'qrc_vectors', 'open_sightings',];
  public columnShowHideList: any = [];
  public sendCollist: any = [];
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  moduleID: number;
  query_for_report_gen: any;
  query_for_config_gen: any;
  platform_name: any;
  report_name: string;
  qrc_by_target_list: any = [];
  No_of_keyIngredients: string;
  num_lines_sysdebug: string;
  ingredient_exposure: any;
  no_los_graph: string;
  trend_start_date: string;
  chartTypeOpen: any = [];
  chartTypeOpen1: any = [];
  chartTypeOpenfiltered: any;
  trendChartFiltered: any;
  trendChartType: any = [];
  overAlling: any = [];
  getKey_ing: any = [];
  getingValue: any = [];
  getingOpenValue: any = [];
  getingValue1: any;
  getingOpenValue1: any;
  ingNew: any;
  ingClosedCount: any;
  ingimplemented: any;
  ingopen: any;
  ingtotal: any;
  mileTrend_start: any;
  GFX_value: any;
  BIOS_value: any;
  IFWI_value: any;
  uCode_value: any;
  Tool_value: any;
  Board_value: any;
  HW_value: any;
  BIOS_Openvalue: any;
  IFWI_Openvalue: any;
  uCode_Openvalue: any;
  Tool_Openvalue: any;
  Board_Openvalue: any;
  HW_Openvalue: any;
  GFX_Openvalue: any;
  mailto: any;
  verifiedCount: any;
  dataSource = new MatTableDataSource();
  dataSource1 = new MatTableDataSource();
  dataSource2 = new MatTableDataSource();
  dataSource3 = new MatTableDataSource();
  dataSource4 = new MatTableDataSource();
  dataSource5 = new MatTableDataSource();
  dataSource6 = new MatTableDataSource();
  dataSource7 = new MatTableDataSource();
  dataSource00 = new MatTableDataSource();
  dataSource01 = new MatTableDataSource();
  dataSource02 = new MatTableDataSource();
  dataSource03 = new MatTableDataSource();
  dataSource04 = new MatTableDataSource();
  dataSource05 = new MatTableDataSource();
  dataSource06 = new MatTableDataSource();
  dataSource07 = new MatTableDataSource();
  dataSource000 = new MatTableDataSource();
  dataSource001 = new MatTableDataSource();
  dataSource002 = new MatTableDataSource();

  registerForm: FormGroup;
  submitted = false;
  //userListMatTabDataSource: any = new MatTableDataSource<User>();
  // defaultColumns: string[] = [ 'selection_column', 'id', 'title','exposure', 'domain','reproducibility','sysdebug_forum', 'suspected_Ingredient', 'promoted_ID','status', 'domain_debug', 'reason'
  //   , 'target', 'progress', 'regression', 'priority', 'component', 'qrc_vector', 'days_open', 'tag', 'isolated', 'owner', 'next_step',
  //   'board', 'from_subject', 'submitted_by', 'ext_access', 'submitter_org', 'soc_stepping', 'target_impact',
  //   'impact', 'submitted_date', 'open_date', 'closed_date', 'closed_reason', 'repro_on_rvp', 'implemented_date', 'verified_date',
  //   'days_triage', 'days_decimal_triage', 'days_validating', 'days_development', 'days_decimal_debugging',
  //   'ingredient','updated_by', 'updated_date','processor','customer_impact','customer_summary','count'];

  defaultColumns: string[];
  // defaultColumns: string[] = ['selection_column', 'id', 'title', 'exposure', 'domain', 'reproducibility', 'sysdebug_forum', 'suspected_Ingredient', 'promoted_ID', 'customer_impact', 'customer_summary', 'days_open', 'target'];

  displayedColumns: string[] = ['selection_column', 'id','promoted_ID', 'title', 'exposure', 'domain', 'reproducibility', 'sysdebug_forum', 'suspected_Ingredient','days_open'];
  trendStatusinitial: { platform: any; ChartType: string; target: string; };
  Countobj: {};
  Countobj2: {};
  selctedIndex: any;
  flag: any;
  milestoneMustFix:any =false;
  checkValue(event: any){
    debugger;
    console.log(event.target.checked);
    if(event.target.checked){
      this.chartTypeOpenfilteredCheck = false;
    } else{
      this.chartTypeOpenfilteredCheck = true;
    }
 }
  constructor(private formBuilder: FormBuilder, private apiService: ServiceAPIService, private router: Router, private broadcastService: BroadCastServiceService,
    private aRouter: ActivatedRoute, private Spinnerservice: SpinnerOverlayService, private notifier: NotifierService, private dialogRef: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {
    this.notifier = notifier;

    this.broadcastService.subscribe("APICALL", (payload) => {
      console.log(payload)
      this.platformName = payload.platform;
      this.onValChange('Week');
    });
    this.selectedValToggleGroup = 'Active';
    this.flag = 1;
  }
  selectedValToggleGroup: any;
  onValChangeToggleGroup(data) {
    this.selectedValToggleGroup = data;
    if (this.selectedValToggleGroup == "Total Sighting") {
      let payload = {
        "platform": this.platformName,
        "ChartNo": "1",
        "Filter": ""
      }

      this.apiService.getActiveCount(payload).subscribe((res: any) => {
        this.activeCount = res.activeCount[0].activeCount;
        this.exposureCount = res.exposureCount;

        this.daysCount = res.daysCount;
        this.percentageInfo = res.percentageInfo;
        console.log(res.percentageInfo);
        console.log(res);
        this.exposureBarChat(this.daysCount);
        this.exposurePieChat(this.percentageInfo);
      })
    } else if (this.selectedValToggleGroup == "Active") {

      let payload = {
        "platform": this.platformName,
        "ChartNo": "1",
        "Filter": "",
        "status": "open,implemented,verified"
      }

      this.apiService.getActiveCount(payload).subscribe((res: any) => {
        this.activeCount = res.activeCount[0].activeCount;
        this.exposureCount = res.exposureCount;

        this.daysCount = res.daysCount;
        this.percentageInfo = res.percentageInfo;
        console.log(res.percentageInfo);
        console.log(res);
        this.exposureBarChat(res.daysStatusCount);
        this.exposurePieChat(this.percentageInfo);
      })
    }

  }
  ngOnInit(): void {
    this.workweek()
    //this.sendCollist = this.defaultColumns[];
    this.defaultcolumns();
    // this.initializeColumnProperties();
    //this.initializeColumnProperties();
    this.aRouter.queryParamMap.subscribe((data: any) => {

      if (JSON.stringify(data.params) != '{}') {
        console.log(this.platformName = data.params.platform);
        this.platformName = this.platformName;
      }
      this.Payload = {
        "platform": this.platformName,
        "ChartNo": "1",
        "Filter": "",
        "status": "open,implemented,verified"
      }
      this.totalPayload = {
        "platform": this.platformName
      }

    })
    /*     this.apiService.getEditQueryResult().subscribe((res: any) => {
           
          this.editQuery = res.editQueryDetails;
          console.log(this.editQuery);
          let passVal = this.editQuery;
          let currentPlatform = this.platformName
          console.log(this.platformName);
    
          function progName(objval) {
            return objval.programName === currentPlatform;
          }
          console.log(passVal.findIndex(progName));
          let selectarr = passVal.findIndex(progName);
          let currentVal = this.editQuery[selectarr];
          this.programName = currentVal.programName;
          this.powerBI = currentVal.powerBI;
          this.powerBurl = this.powerBI;
          this.QueryID = currentVal.queryID;
          this.QRCQuery = currentVal.qrcQuery;
          console.log(this.powerBurl)
          console.log(this.QueryID)
        }) */

    this.apiService.getEditQueryResult().subscribe((res: any) => {
      // 
      this.editQuery = res.editQueryDetails;
      console.log(this.editQuery);
      let passVal = this.editQuery;
      let currentPlatform = this.platformName
      console.log(this.platformName);

      function progName(objval) {
        return objval.programName === currentPlatform;
      }
      console.log(passVal.findIndex(progName));
      let selectarr = passVal.findIndex(progName);
      let currentVal = this.editQuery[selectarr];
      this.moduleID = -1;
      this.moduleID = currentVal.moduleID;
      this.query_for_report_gen = currentVal.generateReportQueryId;
      this.query_for_config_gen = currentVal.queryID;
      this.programName = currentVal.programName;
      this.platform_name = currentVal.programName;
      this.report_name = "Windows Platform SysDebug Report";
      this.Title = "System Integration and Validation";
      this.qrc_by_target_list = "pc/pv";
      this.trend_milestone = "beta,alpha,pv/pc";
      this.No_of_keyIngredients = "7";
      this.num_lines_sysdebug = "1";
    })
    this.objd =
    {
      "platform": this.platformName,
      "ChartType": "week",
      "FromDate": "2020-03-22"
    }
    this.apiService.getOpenCloseTrendInfoReport(this.objd).subscribe((res: any) => {

      let chartTypeOpen = res.getOpenCloseTrendInfo;
      if (chartTypeOpen != null) {

        var trendChartType = chartTypeOpen.map(function (o) { return o.chartType; });
        console.log("index of 'fn': " + trendChartType);
        let pgmDetails = res.getOpenCloseTrendInfo.forEach((m: any) => {
          const newObjArr = [{ chartTypeOpen: m.chartType }];
          this.chartTypeOpen = [...this.chartTypeOpen, ...newObjArr]

        })
      }

      console.log(this.chartTypeOpen)
    })
    this.trendStatusinitial = {
      "platform": this.platformName,
      "ChartType": "week",
      "target": "beta",
    }
    this.apiService.GetOpenCloseTrendStatus(this.trendStatusinitial).subscribe((res: any) => {
      //  
      console.log("getOpenCloseTrendStatus", res.getOpenCloseTrendStatusInfo);
      let chartTypeOpen1 = res.getOpenCloseTrendStatusInfo;
      if (chartTypeOpen1 != null) {
        var trendChartType = chartTypeOpen1.map(function (o) { return o.chartType; });
        console.log("index of 'fn': " + trendChartType);
        let pgmDetails = res.getOpenCloseTrendStatusInfo.forEach((m: any) => {
          const newObjArr = [{ chartTypeOpen1: m.chartType }];
          this.chartTypeOpen1 = [...this.chartTypeOpen1, ...newObjArr]

        })
      }
      console.log(this.chartTypeOpen1)

    })
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]]
    });
  }

  openClosedData(value) {
    this.duration = value;
    let obj =
    {
      "platform": this.platformName,
      "ChartType": this.duration
    }
    this.apiService.getOpenCloseTrendInfo(obj).subscribe((res: any) => {
      this.renderChar(res.getOpenCloseTrendInfo);
    })
  }
  fullScreenFlag = false;
  fullScreenFlag2 = false;
  fullScreenFlag3 = false;
  /* get full screen view */
  getfullScreen() {
    this.fullScreenFlag = !this.fullScreenFlag
  }
  fullScreenFlag1 = false;
  getfullScreen1() {
    this.fullScreenFlag1 = !this.fullScreenFlag1;
  }
  getfullScreen2() {
    this.fullScreenFlag2 = !this.fullScreenFlag2;
  }
  getfullScreen3() {
    this.fullScreenFlag3 = !this.fullScreenFlag3;
  }


  onValChange(value) {
    this.duration = value;

    this.Payload = {
      "platform": this.platformName,
      "ChartNo": "1",
      "Filter": "",
      "status": "open,implemented,verified"
    }
    this.totalPayload = {
      "platform": this.platformName
    }
    let obj =
    {
      "platform": this.platformName,
      "ChartType": this.duration
    }

    this.chartdetails =
    {
      "platform": this.platformName,
      "COUNTTYPE": this.countType,
      "CHARTDATE": this.countType,
      "CHARTTYPE": this.duration
    }

    this.defectRegression =
    {
      "platform": this.platformName,
      "Ingredient": this.ingredient,
      "ChartType": this.chartType,
      "CHARTTYPE": this.duration
    }
    this.ingredientExposure =
    {

      "platform": this.platformName,
      "Ingredient": this.Ingredient,
      "Exposure": this.Exposure,
      "CHARTTYPE": this.duration
    }

    this.getDomainWiseDate = {
      "platform": this.platformName,
      "domain": "debug",
      "type": "domain"
    }
    this.getDomainDebugDate = {
      "platform": this.platformName,
      "domain": "debug",
      "type": "domain_debug"
    }

    this.getIngredientData = {
      "platform": this.platformName,
      "ingredient": "BIOS"
    }
    this.getReasonData = {
      "platform": this.platformName,
      "Reason": "await_user_verify"
    }

    this.getOpenStatusExposure = {
      "platform": this.platformName,
      "exposure": "1-critical"
    }

    this.getCumulativeStatus = {
      "platform": this.platformName,
      "status": "open",
      "exposure": "1-critical"
    }
    this.getTargetWiseData = {
      "platform": this.platformName,
      "target": "NotSet"
    }

    this.domainExposure = {
      "platform": this.platformName,
      "DomainName": "",
      "Exposure": "",
      "CHARTTYPE": this.duration
    }

    this.criticalQRC =
    {
      "platform": this.platformName,
      "QRCVector": 'WSSDebug',
      "DefectFactor": '',
      "Type": 'TotalRow',
      "Exposure": "1-critical"
    }

    this.highQRC =
    {
      "platform": this.platformName,
      "QRCVector": 'WSSDebug',
      "DefectFactor": '',
      "Type": 'TotalRow',
      "Exposure": "2-high"
    }
    this.criticalQRCDefect =
    {
      "platform": this.platformName,
      "QRCVector": "Ingredient",
      "DefectFactor": "Functional",
      "Type": "",
      "Exposure": "1-critical"
    }

    this.highQRCDefect =
    {
      "platform": this.platformName,
      "QRCVector": "Ingredient",
      "DefectFactor": "Functional",
      "Type": "",
      "Exposure": "2-high"
    }
    this.noLoscritical = {
      "platform": this.platformName,
      "exposure": "1-critical"
    }
    this.noLoshigh = {
      "platform": this.platformName,
      "exposure": "2-high"
    }

    this.keyFailing = {
      "platform": this.platformName,
      "topCount": "50"
    }
    this.issueList = {
      "platform": this.platformName,
      "exposure": "1-critical",
      "target": this.qrc_by_target_list
    }
    this.issueListhigh = {
      "platform": this.platformName,
      "exposure": "2-high",
      "target": this.qrc_by_target_list
    }
    this.verifiedPayload = {
      "platform": this.platformName,
    }

    this.apiService.getActiveCount(this.Payload).subscribe((res: any) => {
      this.activeCount = res.activeCount[0].activeCount;
      this.exposureCount = res.exposureCount;

      this.daysCount = res.daysCount;
      this.percentageInfo = res.percentageInfo;
      console.log(res.percentageInfo);
      console.log(res);
      this.exposureBarChat(res.daysStatusCount);
      this.exposurePieChat(this.percentageInfo);
    })
    this.apiService.GetStatusVerifiedHSDESResult(this.verifiedPayload).subscribe((res: any) => {
      this.verifiedCount = res.statusVerifiedInfo[0].verifiedCount;
    })
    this.apiService.getClosedCount(this.Payload).subscribe((res: any) => {
      console.log(res);
      this.closedCount = res.closedCount[0].closedCount;
      this.exposureClosedCount = res.exposureClosedCount;
      this.closedCountPercentages = res.closedCountPercentages;
      this.closedExposurePie(this.closedCountPercentages);
      this.dcrCount = res.dcrCount[0].dcrCount;
      this.sceCount = res.sceCount[0].sceCount;
    })

    this.apiService.getTotalCount(this.totalPayload).subscribe((res: any) => {
      console.log(res)
      this.totalCount = res.totalCountinfomation[0].totalCount;
      this.avgNew = res.averageCountinfomation[0].count;
      this.avgClosed = res.averageCountinfomation[1].count;
    })

    this.apiService.getSightingsByIngredienntsAndExposure(this.ingredientExposure).subscribe((res: any) => {
      console.log(res)
      //  
      this.ingredientSightingInfo(res.getIngredientSightingInfo);

    })

    this.apiService.getCriticalQRCvector(this.criticalQRC).subscribe((res: any) => {
      console.log(res.getCriticalQRCvector)
      this.getCriticalQRCvectorData = res.getCriticalQRCvector;
      let datavalue = this.getCriticalQRCvectorData
      this.getCritical_qrcvector = datavalue.qrc_vector;
      this.getCriticalQRCvectorData1 = res.getCriticalQRCvector;
      console.log(this.getCriticalQRCvectorData)
    })

    this.apiService.getHighQRCvector(this.highQRC).subscribe((res: any) => {
      console.log(res.getCriticalQRCvector)
      this.getHighQRCvector = res.getCriticalQRCvector;
    })

    this.apiService.getCriticalDefectVector(this.criticalQRCDefect).subscribe((res: any) => {
      console.log(res.getCriticalDefectsvector)
      this.getCriticalDefectsvector = res.getFunctionalDefectsvector;
      this.getFunctionalDefectsCount = res.getFunctionalDefectsCount;

      //  
      let valuearr = ['Functional', 'Power Management', 'Pre-checks', 'Reproduce on RVP', 'Total']

      let len = this.getCriticalDefectsvector.length

      for (let i = 0; i < 5; i++) {

        console.log(valuearr[i])

        if (valuearr[i] != this.getCriticalDefectsvector[i].qrc_vector) {

          this.getCriticalDefectsvector.splice(i, 0, this.objectName);

        }

      }

      if (this.getCriticalDefectsvector.qrc_vector) {

        console.log(this.getCriticalDefectsvector.qrc_vector)



      }

    })

    this.apiService.getHighDefectVector(this.highQRCDefect).subscribe((res: any) => {
      console.log(res.getFunctionalDefectsvector)
      this.getHighDefectsvector = res.getFunctionalDefectsvector;
      let valuearr = ['Functional', 'Power Management', 'Pre-checks', 'Reproduce on RVP', 'Total']

      let len = this.getHighDefectsvector.length

      for (let i = 0; i < 5; i++) {

        console.log(valuearr[i])

        if (valuearr[i] != this.getHighDefectsvector[i].qrc_vector) {

          this.getHighDefectsvector.splice(i, 0, this.objectName);

        }

      }

      if (this.getHighDefectsvector.qrc_vector) {

        console.log(this.getHighDefectsvector.qrc_vector)



      }


    })


  }

  calculate(value1, value2, tableType) {
    if (tableType) {
      let findTotal = tableType.find(data => data.qrc_vector == 'Total')
      if (findTotal) {
        let val1 = findTotal[value1] ? parseInt(findTotal[value1]) : 0
        let val2 = findTotal[value2] ? parseInt(findTotal[value2]) : 0
        return val1 + val2
      } else {
        return '0';
      }
    } else {
      return "0"
    }
  }

  sampleData(filter, chartType, type) {
    console.log(filter + '' + chartType);
    let t = this.router.serializeUrl(this.router.createUrlTree(['sample'], { queryParams: { CHARTNO: filter, FILTER: chartType, type: type, platform: this.platformName } }))
    window.open("#" + t, '_blank')
  }
  sampleData1(filter, chartType, type) {
    console.log(filter + '' + chartType);
    let t = this.router.serializeUrl(this.router.createUrlTree(['sample'], { queryParams: { CHARTNO: filter, FILTER: chartType, type: type, platform: this.platformName } }))
    window.open("#" + t, '_blank')
  }

  tableDetails(filter) {
    let t = this.router.serializeUrl(this.router.createUrlTree(['table'], { queryParams: { tabletype: filter, platform: this.platformName } }))
    window.open("#" + t, '_blank')
  }
  domainDetails(filter) {
    let t = this.router.serializeUrl(this.router.createUrlTree(['domainComponent'], { queryParams: { tabletype: filter, platform: this.platformName } }))
    window.open("#" + t, '_blank')
  }
  domainDebugDetails(filter) {
    let t = this.router.serializeUrl(this.router.createUrlTree(['domainDebugComponent'], { queryParams: { tabletype: filter, platform: this.platformName } }))
    window.open("#" + t, '_blank')
  }
  openTarget(filter) {
    let t = this.router.serializeUrl(this.router.createUrlTree(['opentarget'], { queryParams: { tabletype: filter, platform: this.platformName } }))
    window.open("#" + t, '_blank')
  }

  openDomain(filter) {
    let t = this.router.serializeUrl(this.router.createUrlTree(['openDomain'], { queryParams: { tabletype: filter, platform: this.platformName } }))
    window.open("#" + t, '_blank')
  }

  openDomainDebug(filter) {
    let t = this.router.serializeUrl(this.router.createUrlTree(['openDomainDebug'], { queryParams: { tabletype: filter, platform: this.platformName } }))
    window.open("#" + t, '_blank')
  }


  openIngredient(filter) {
    let t = this.router.serializeUrl(this.router.createUrlTree(['ingredientWise'], { queryParams: { tabletype: filter, platform: this.platformName } }))
    window.open("#" + t, '_blank')
  }

  HsdesData(filter, chartType, type) {
    console.log(filter + '' + chartType);
    let t = this.router.serializeUrl(this.router.createUrlTree(['qrc-hsdes'], { queryParams: { CHARTNO: filter, FILTER: chartType, type: type, platform: this.platformName } }))
    window.open("#" + t, '_blank')
  }

  highQRCData(filter, chartType, type) {
    console.log(filter + '' + chartType);
    let t = this.router.serializeUrl(this.router.createUrlTree(['high-qrc'], { queryParams: { CHARTNO: filter, FILTER: chartType, type: type, platform: this.platformName } }))
    window.open("#" + t, '_blank')
  }

  criticalDefect(filter, chartType, type) {
    console.log(filter + '' + chartType);
    let t = this.router.serializeUrl(this.router.createUrlTree(['critical-defect'], { queryParams: { CHARTNO: filter, FILTER: chartType, type: type, platform: this.platformName } }))
    window.open("#" + t, '_blank')
  }

  highDefect(filter, chartType, type) {
    console.log(filter + '' + chartType);
    let t = this.router.serializeUrl(this.router.createUrlTree(['high-defect'], { queryParams: { CHARTNO: filter, FILTER: chartType, type: type, platform: this.platformName } }))
    window.open("#" + t, '_blank')
  }
  report() {
    let t = this.router.serializeUrl(this.router.createUrlTree(['mail'], { queryParams: { platform: this.platformName } }))
    window.open("#" + t, '_blank')
  }

  exposureBarChat(daysCount) {
    let temp = [];
    daysCount.forEach((element, index) => {
      if (element.daysCount != 0) {
        //daysCount.splice(index, 1);
        temp.push(element);
      }
    });
    daysCount = temp;
    am4core.useTheme(am4themes_animated);
    am4core.options.autoSetClassName = true;
    am4core.options.commercialLicense = true;

    let chart = am4core.create("chartdivbar", am4charts.XYChart);
    chart.colors.list = [
      am4core.color("#0071c5"),

    ];
    chart.padding(5, 5, 5, 5);
    chart.margin(0, 0, 0, 0);
    // chart(0, 0, 0, 0);
    chart.background.fill = am4core.color('#ffffff');
    const title = chart.titles.create();
    title.text = "Days open chart";
    title.fontWeight = '500';
    title.fill = am4core.color('#0071c5');
    title.fontSize = '12';
    title.marginBottom = 5;
    title.marginTop = 0;
    title.align = 'center';
    title.paddingLeft = 10;

    // Add data
    chart.data = daysCount;
    // Create axes

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "daysRange";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.logarithmic = true;
    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "daysCount";
    series.dataFields.categoryX = "daysRange";
    series.name = "daysCount";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;

  }

  exposurePieChat(percentageInfo) {
    am4core.useTheme(am4themes_animated);
    am4core.options.autoSetClassName = true;
    am4core.options.commercialLicense = true;

    // Create chart instance
    let chart = am4core.create("chartdivpie", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0;
    chart.padding(5, 5, 5, 5);
    chart.margin(0, 0, 0, 0);
    chart.align = 'center';

    const title = chart.titles.create();
    title.text = "";
    title.fontWeight = '500';
    title.fill = am4core.color('#0071c5');
    title.fontSize = '12';
    title.marginTop = 0;
    title.align = 'center';

    chart.data = percentageInfo;
    chart.radius = am4core.percent(70);
    chart.innerRadius = am4core.percent(40);
    chart.startAngle = 180;
    chart.endAngle = 360;
    chart.background.fill = am4core.color('#ffffff');
    chart.colors.list = [
      am4core.color("#04d18d"),
      am4core.color("#969e9e"),

    ];


    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "percentage";
    pieSeries.dataFields.category = "names";

    // Let's cut a hole in our Pie chart the size of 30% the radius
    pieSeries.innerRadius = am4core.percent(30);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template
      // change the cursor on hover to make it apparent the object can be interacted with
      .cursorOverStyle = [
        {
          "property": "cursor",
          "value": "pointer"
        }
      ];

    pieSeries.alignLabels = false;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);

    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    let shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
    shadow.opacity = 0;

    // Create hover state
    let hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    let hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;

  }

  closedExposurePie(closedCountPercentages) {
    am4core.useTheme(am4themes_animated);
    am4core.options.autoSetClassName = true;
    am4core.options.commercialLicense = true;
    // Create chart instance
    let chart = am4core.create("closeExposurepie", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0;
    chart.padding(5, 5, 5, 5);
    chart.margin(0, 0, 0, 0);
    chart.data = closedCountPercentages;
    chart.radius = am4core.percent(70);
    chart.innerRadius = am4core.percent(40);
    chart.startAngle = 180;
    chart.endAngle = 360;
    chart.background.fill = am4core.color('#ffffff');

    const title = chart.titles.create();
    title.text = "";
    title.fontWeight = '500';
    title.fill = am4core.color('#0071c5');
    title.fontSize = '12';
    title.marginTop = 0;
    title.align = 'center';

    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "percentage";
    pieSeries.dataFields.category = "names";

    // Let's cut a hole in our Pie chart the size of 30% the radius
    pieSeries.innerRadius = am4core.percent(30);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template
      // change the cursor on hover to make it apparent the object can be interacted with
      .cursorOverStyle = [
        {
          "property": "cursor",
          "value": "pointer"
        }
      ];

    pieSeries.alignLabels = false;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);

    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    let shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
    shadow.opacity = 0;

    // Create hover state
    let hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    let hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;
  }

  renderChar(dataOpenCloseTrendInfo) {
    if (dataOpenCloseTrendInfo) {
      dataOpenCloseTrendInfo.forEach((d, index) => {
        if (d.target == 'power on') {
          d['bullet'] = './assets/image/poweron.png';
        } else if (d.target == 'Pre_alpha') {
          d['bullet'] = './assets/image/preAlpha.png';
        } else if (d.target == 'alpha') {
          d['bullet'] = './assets/image/alpha.png';
        } else if (d.target == 'beta') {
          d['bullet'] = './assets/image/beta.png';
        } else if (d.target == 'pv') {
          d['bullet'] = './assets/image/pv.png';
        } else if (d.target == 'POE') {
          d['bullet'] = './assets/image/poe.png';
        }


      });
    }
    am4core.useTheme(am4themes_animated);
    am4core.options.autoSetClassName = true;
    am4core.options.commercialLicense = true;

    let chart = am4core.create('chartdiv', am4charts.XYChart)
    chart.colors.list = [
      am4core.color("#fe6f5e"),
      am4core.color("#32cd32"),
    ];
    chart.padding(5, 5, 5, 5);
    chart.margin(0, 0, 0, 0);

    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    xAxis.dataFields.category = 'chartType'
    xAxis.renderer.cellStartLocation = 0.03
    xAxis.renderer.cellEndLocation = 0.97
    xAxis.renderer.grid.template.location = 0;
    xAxis.title.text = "[bold]" + this.duration;
    xAxis.renderer.minGridDistance = 20;
    xAxis.renderer.labels.template.rotation = 290;
    xAxis.renderer.labels.template.fill = am4core.color("#000000");

    let label = xAxis.renderer.labels.template;
    label.truncate = true;
    label.maxWidth = 120;
    label.tooltipText = "{category}";
    label.fontSize = 12;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;
    yAxis.title.text = '[bold] Submitted/Closed Counts';
    yAxis.renderer.labels.template.fill = am4core.color("#000000");
    yAxis.renderer.labels.template.fontSize = 12;
    yAxis.renderer.minGridDistance = 20;

    let that = this;
    function createSeries(value: any, name: any) {
      let series = chart.series.push(new am4charts.ColumnSeries())
      series.dataFields.valueY = value
      series.dataFields.categoryX = 'chartType'
      series.name = name
      series.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";
      series.events.on("hidden", arrangeColumns);
      series.events.on("shown", arrangeColumns);

      series.columns.template.events.on("hit", function (ev: any) {
        let type = (ev.target.dataItem.component.name).split(' ');
        that.chartdetails.COUNTTYPE = type[0];
        that.chartdetails.CHARTDATE = ev.target.dataItem._dataContext.chartType;
        that.chartdetails.CHARTTYPE = that.duration;
        that.chartdetails.platform = that.platformName;
        that.chartdetails['isOpenClosed'] = true;
        let t = that.router.serializeUrl(that.router.createUrlTree(['sample'], { queryParams: that.chartdetails }))
        window.open("#" + t, '_blank')
        console.log("clicked on ", that.chartdetails);

      }, this);



      let bullet = series.bullets.push(new am4charts.LabelBullet())
      bullet.interactionsEnabled = false
      bullet.label.fill = am4core.color('#000000')
      bullet.dy = 20;
      bullet.label.text = '{valueY}'
      var bullet1 = series.bullets.push(new am4charts.Bullet());
      var image = bullet1.createChild(am4core.Image);
      image.propertyFields.href = "bullet";
      image.width = 20;
      image.height = 20;
      image.maxX = 20;
      image.horizontalCenter = "middle";
      image.verticalCenter = "middle";
      return series;
    }

    chart.data = dataOpenCloseTrendInfo;

    createSeries('submittedCount', 'Submitted Counts');
    createSeries('closedCount', 'Closed Counts');

    function arrangeColumns() {

      let series = chart.series.getIndex(0);

      let w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
      if (series.dataItems.length > 1) {
        let x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
        let x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
        let delta = ((x1 - x0) / chart.series.length) * w;
        if (am4core.isNumber(delta)) {
          let middle = chart.series.length / 2;

          let newIndex = 0;
          chart.series.each(function (series) {
            if (!series.isHidden && !series.isHiding) {
              series.dummyData = newIndex;
              newIndex++;
            }
            else {
              series.dummyData = chart.series.indexOf(series);
            }
          })
          let visibleCount = newIndex;
          let newMiddle = visibleCount / 2;

          chart.series.each(function (series) {
            let trueIndex = chart.series.indexOf(series);
            let newIndex = series.dummyData;

            let dx = (newIndex - trueIndex + middle - newMiddle) * delta

            series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
            series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
          })
        }
      }
    }


    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.renderer.opposite = true;
    valueAxis.renderer.grid.template.disabled = false;
    valueAxis.title.text = '[bold] Cumulative Counts';
    valueAxis.renderer.labels.template.fontSize = 12;
    valueAxis.renderer.line.strokeOpacity = 1;
    valueAxis.renderer.line.strokeWidth = 1;

    function TraigeLineSeries(value, name, axis) {
      var lineSeries = chart.series.push(new am4charts.LineSeries());
      lineSeries.name = name;
      lineSeries.dataFields.valueY = value;
      lineSeries.dataFields.categoryX = "chartType";
      lineSeries.yAxis = valueAxis;
      lineSeries.stroke = am4core.color(axis); // yellow
      lineSeries.strokeWidth = 2;
      lineSeries.propertyFields.strokeDasharray = "lineDash";
      lineSeries.tooltip.label.textAlign = "middle";

      var bullet = lineSeries.bullets.push(new am4charts.Bullet());
      bullet.fill = am4core.color(axis); // tooltips grab fill from parent by default
      bullet.tooltipText = "[#fff font-size: 15px]{categoryX} : [/][#fff font-size: 15px]{valueY}[/] [#fff]{additional}[/]";
      var circle = bullet.createChild(am4core.Circle);
      circle.radius = 3;
      circle.fill = am4core.color("#fff");
      circle.strokeWidth = 2;
    }

    TraigeLineSeries("cummSubmittedCount", "Cumulative Submitted Sightings", "#ff0038");
    TraigeLineSeries("cummClosedCount", "Cumulative Closed Sightings", "#006b3c");
    TraigeLineSeries("cummOpenCount", "Cumulative Open Count", "  #808000");

    chart.legend = new am4charts.Legend();
    chart.legend.position = "bottom";
    chart.legend.contentAlign = "center";
    chart.cursor = new am4charts.XYCursor();

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.parent = chart.bottomAxesContainer;


    if (this.duration == 'Week') {
      chart.scrollbarX = new am4core.Scrollbar();
      chart.scrollbarX.parent = chart.bottomAxesContainer;
      zoomAxisQuarter();
    }
    if (this.duration == 'Quarter') {
      chart.scrollbarX = new am4core.Scrollbar();
      chart.scrollbarX.parent = chart.bottomAxesContainer;
      zoomAxisQuarter();
    }
    if (this.duration == 'Year') {
      chart.scrollbarX = new am4core.Scrollbar();
      chart.scrollbarX.parent = chart.bottomAxesContainer;
      zoomAxisQuarter();
    }
    function zoomAxisQuarter() {

      xAxis.start = 0.7;
      xAxis.end = 1;
    }
    function zoomAxis() {
      xAxis.start = 0.8;
      xAxis.end = 1;
    }


  }
  getIngredientSightingInfoCheck = false;
  ingredientSightingInfo(getIngredientSightingInfo) {
    console.log(getIngredientSightingInfo);
    if (!getIngredientSightingInfo || getIngredientSightingInfo.length === 0) {
      this.getIngredientSightingInfoCheck = true;
      let chart = am4core.create('getIngredientSightingInfo', am4charts.XYChart)
      const noDataMessagecontainer = chart.chartContainer.createChild(am4core.Container);
      chart.background.fill = am4core.color('#ffffff');
      noDataMessagecontainer.align = 'center';
      noDataMessagecontainer.isMeasured = false;
      noDataMessagecontainer.x = am4core.percent(50);
      noDataMessagecontainer.horizontalCenter = 'middle';
      noDataMessagecontainer.y = am4core.percent(50);
      noDataMessagecontainer.verticalCenter = 'middle';
      noDataMessagecontainer.layout = 'vertical';

      const messageLabel = noDataMessagecontainer.createChild(am4core.Label);
      messageLabel.text = 'There is no data to show on this chart.';
      messageLabel.textAlign = 'middle';
      messageLabel.maxWidth = 150;
      messageLabel.wrap = true;
    }
    else {
      am4core.useTheme(am4themes_animated);
      am4core.options.autoSetClassName = true;
      am4core.options.commercialLicense = true;
      // Themes end

      let chart = am4core.create("getIngredientSightingInfo", am4charts.XYChart);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

      chart.data = getIngredientSightingInfo;
      chart.padding(5, 5, 5, 5);
      chart.margin(0, 0, 0, 0);
      chart.background.fill = am4core.color('#ffffff');

      chart.legend = new am4charts.Legend();
      chart.legend.position = "bottom";
      chart.legend.contentAlign = "center";

      //Change the lable rotation
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "ingradients";
      categoryAxis.title.text = "[bold]" + 'Ingredients';


      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.renderer.cellStartLocation = 0.2;
      categoryAxis.renderer.cellEndLocation = 0.8;
      categoryAxis.renderer.labels.template.rotation = 290;
      categoryAxis.renderer.labels.template.verticalCenter = "middle";
      categoryAxis.renderer.labels.template.horizontalCenter = "right";
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.start = 0;
      categoryAxis.end = 0.4;


      let label = categoryAxis.renderer.labels.template;
      label.truncate = true;
      label.tooltipText = "{category}";
      label.fontSize = 12;

      let that = this;
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.strictMinMax = true;
      valueAxis.calculateTotals = true;
      valueAxis.renderer.grid.template.disabled = false;
      valueAxis.title.text = '[bold] Count';
      valueAxis.renderer.labels.template.fill = am4core.color("#000000");

      let series1 = chart.series.push(new am4charts.ColumnSeries());
      series1.columns.template.width = am4core.percent(80);
      series1.columns.template.tooltipText =
        "{name}: {valueY}";
      series1.name = "Critical";
      series1.dataFields.categoryX = "ingradients";
      series1.dataFields.valueY = "critical";
      series1.dataItems.template.locations.categoryX = 0.5;
      series1.stacked = true;
      series1.tooltip.pointerOrientation = "vertical";
      series1.columns.template.stroke = am4core.color("red");
      series1.columns.template.fill = am4core.color("red");

      series1.columns.template.events.on("hit", function (ev: any) {
        console.log("clicked on ", ev.target.dataItem._dataContext);
        that.ingredientExposure.Ingredient = ev.target.dataItem._dataContext.ingradients;
        that.ingredientExposure.platform = that.platformName;
        that.ingredientExposure.Exposure = '1-critical';
        that.ingredientExposure.CHARTTYPE = 'ingredientExposureHSDEC';
        let t = that.router.serializeUrl(that.router.createUrlTree(['sample'], { queryParams: that.ingredientExposure }))
        window.open("#" + t, '_blank')

      }, this);

      let bullet1 = series1.bullets.push(new am4charts.LabelBullet());
      bullet1.interactionsEnabled = false;
      bullet1.label.text = "{valueY}";
      bullet1.locationY = 0.5;
      bullet1.label.fill = am4core.color("#ffffff");


      let series2 = chart.series.push(new am4charts.ColumnSeries());
      series2.columns.template.width = am4core.percent(80);
      series2.columns.template.tooltipText =
        "{name}: {valueY}";
      series2.name = "High";
      series2.dataFields.categoryX = "ingradients";
      series2.dataFields.valueY = "high";
      series2.dataItems.template.locations.categoryX = 0.5;
      series2.stacked = true;
      series2.tooltip.pointerOrientation = "vertical";
      series2.columns.template.stroke = am4core.color("orange");
      series2.columns.template.fill = am4core.color("orange");

      //click
      series2.columns.template.events.on("hit", function (ev: any) {
        console.log("clicked on ", ev.target.dataItem._dataContext);
        that.ingredientExposure.Ingredient = ev.target.dataItem._dataContext.ingradients;
        that.ingredientExposure.platform = that.platformName;
        that.ingredientExposure.Exposure = '2-high';
        that.ingredientExposure.CHARTTYPE = 'ingredientExposureHSDEC';
        let t = that.router.serializeUrl(that.router.createUrlTree(['sample'], { queryParams: that.ingredientExposure }))
        window.open("#" + t, '_blank')
      }, this);

      let bullet2 = series2.bullets.push(new am4charts.LabelBullet());
      bullet2.interactionsEnabled = false;
      bullet2.label.text = "{valueY}";
      bullet2.label.fill = am4core.color("#ffffff");
      bullet2.locationY = 0.5;


      let series3 = chart.series.push(new am4charts.ColumnSeries());
      series3.columns.template.width = am4core.percent(80);
      series3.columns.template.tooltipText =
        "{name}: {valueY}";
      series3.name = "Medium";
      series3.dataFields.categoryX = "ingradients";
      series3.dataFields.valueY = "medium";
      series3.dataItems.template.locations.categoryX = 0.5;
      series3.stacked = true;
      series3.tooltip.pointerOrientation = "vertical";
      series3.columns.template.stroke = am4core.color("green");
      series3.columns.template.fill = am4core.color("green");

      series3.columns.template.events.on("hit", function (ev: any) {
        console.log("clicked on ", ev.target.dataItem._dataContext);
        that.ingredientExposure.Ingredient = ev.target.dataItem._dataContext.ingradients;
        that.ingredientExposure.platform = that.platformName;
        that.ingredientExposure.Exposure = '3-medium';
        that.ingredientExposure.CHARTTYPE = 'ingredientExposureHSDEC';
        let t = that.router.serializeUrl(that.router.createUrlTree(['sample'], { queryParams: that.ingredientExposure }))
        window.open("#" + t, '_blank')
      }, this);

      let bullet3 = series3.bullets.push(new am4charts.LabelBullet());
      bullet3.interactionsEnabled = false;
      bullet3.label.text = "{valueY}";
      bullet3.locationY = 0.5;
      bullet3.label.fill = am4core.color("#ffffff");


      let series4 = chart.series.push(new am4charts.ColumnSeries());
      series4.columns.template.width = am4core.percent(80);
      series4.columns.template.tooltipText =
        "{name}: {valueY}";
      series4.name = "Low";
      series4.dataFields.categoryX = "ingradients";
      series4.dataFields.valueY = "low";
      series4.dataItems.template.locations.categoryX = 0.5;
      series4.stacked = true;
      series4.tooltip.pointerOrientation = "vertical";
      series4.columns.template.stroke = am4core.color("blue");
      series4.columns.template.fill = am4core.color("blue");

      series4.columns.template.events.on("hit", function (ev: any) {
        console.log("clicked on ", ev.target.dataItem._dataContext);
        that.ingredientExposure.Ingredient = ev.target.dataItem._dataContext.ingradients;
        that.ingredientExposure.platform = that.platformName;
        that.ingredientExposure.Exposure = '4-low';
        that.ingredientExposure.CHARTTYPE = 'ingredientExposureHSDEC';
        let t = that.router.serializeUrl(that.router.createUrlTree(['sample'], { queryParams: that.ingredientExposure }))
        window.open("#" + t, '_blank')
      }, this);

      let bullet4 = series4.bullets.push(new am4charts.LabelBullet());
      bullet4.interactionsEnabled = false;
      bullet4.label.text = "{valueY}";
      bullet4.locationY = 0.5;
      bullet4.label.fill = am4core.color("#ffffff");

      chart.scrollbarX = new am4core.Scrollbar();
      chart.scrollbarX.parent = chart.bottomAxesContainer;
      categoryAxis.start = 0;
      categoryAxis.end = 1;

    }

  }
  ngAfterViewInit() {
    this.hide_Ncontent();
  }
  close_window() {
    window.close();
  }
  onNavigate() {
    console.log(this.powerBurl)
    if (this.powerBurl !== "") {
      window.open(this.powerBurl, "_blank");
    } else {
      window.alert("No PowerBI link given")
    }
  }
  onqrcidNavigate() {
    if (this.QueryID !== "") {
      window.open(this.QueryID, "_blank");
    } else {
      window.alert("No query ID link given")
    }
  }
  onqueryNavigate() {
    if (this.QRCQuery !== "") {
      window.open(this.QRCQuery, "_blank");
    } else {
      window.alert("No QRCQuery link given")
    }
  }
  dataFrom() {

    if (this.QRCQuery == "") {
      var element = <HTMLInputElement>document.getElementById("btn_link1");
      element.hidden = true;
    }
    if (this.QueryID == "") {
      var element = <HTMLInputElement>document.getElementById("btn_link");
      element.hidden = true;
    }
  }
  // exportAs(){
  //   var element = document.getElementById('page')
  //   html2canvas(element).then((canvas) =>{
  //     console.log(canvas)
  //     var imgData = canvas.toDataURL('image/jpeg', 1)
  //     var doc = new jsPDF()
  //     var imgHeight = canvas.height * 208 / canvas.width;
  //     doc.addImage(imgData, 0, 0, 208, imgHeight)
  //     doc.save("report.pdf")
  //   })
  // }
  // downloadAs(){
  //   const element: Element = document.getElementById('capture')
  //   const options = {
  //     margin:1,
  //     name: 'output.pdf',
  //     image: { type: 'jpeg', quality: 0.98 },
  //     html2canvas: {},
  //     jsPDF:{orientation: 'landscape'}
  //   }


  //   html2pdf()
  //     .from(element)
  //     .set(options)
  //     .save()
  // }
  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }
  downloadingAs() {
    document.getElementById("myDIV").style.display = "block";
    this.showNotification('info', 'PDF file is being generated');
    this.printPdf();
  }
  printPdf() {
    let pages = document.getElementsByClassName('page');
    const pdf = html2PDF(pages, {
      jsPDF: {
        format: 'a6',
      },
      options: {
        imageTimeout: 100,
        logging: false,
        useCORS: false
      },
      imageQuality: 1,
      margin: {
        top: 1,
        right: 1,
        bottom: 1,
        left: 1,
      },
      imageType: 'image/jpeg',
      output: './pdf/Report.pdf',
      init: function () {
        console.log("loading")

        this.displayProgressSpinner = true;
      },
      success: function (pdf) {
        pdf.save("Report.pdf", { returnPromise: true }).then(() => {
          document.getElementById("myDIV").style.display = "none";
        });


      }
    });
    console.log(pdf)
  }
  hideHeader = false;
  /* get full screen view */
  hideheader() {
    this.hideHeader = !this.hideHeader
    this.show_chart = !this.show_chart
  }
  hide_topheader = false;
  hide_header() {
    this.hide_topheader = !this.hide_topheader
  }
  hide_Ncontent() {
    this.show_chart = !this.show_chart
    this.hide_emailcontent = !this.hide_emailcontent
    this.show_emailcontent = !this.show_emailcontent
    if (this.show_emailcontent == true) {
      console.log("hai")
      this.openDialog();
    }
  }
  openClosedDataReport() {
  }
  dataOpenCloseTrendInfoCheck = false;
  rendercharOpen(dataOpenCloseTrendInfo) {
    if (dataOpenCloseTrendInfo.length == 0) {
      this.dataOpenCloseTrendInfoCheck = true;
    }
    if (dataOpenCloseTrendInfo) {
      dataOpenCloseTrendInfo.forEach((d, index) => {
        if (d.target == 'power on') {
          d['bullet'] = './assets/image/poweron.png';
        } else if (d.target == 'Pre_alpha') {
          d['bullet'] = './assets/image/preAlpha.png';
        } else if (d.target == 'alpha') {
          d['bullet'] = './assets/image/alpha.png';
        } else if (d.target == 'beta') {
          d['bullet'] = './assets/image/beta.png';
        } else if (d.target == 'pv') {
          d['bullet'] = './assets/image/pv.png';
        } else if (d.target == 'POE') {
          d['bullet'] = './assets/image/poe.png';
        }

      });
    }
    am4core.useTheme(am4themes_animated);
    am4core.options.autoSetClassName = true;
    am4core.options.commercialLicense = true;

    let chart = am4core.create('chartdivopen', am4charts.XYChart)
    chart.colors.list = [
      am4core.color("#fe6f5e"),
      am4core.color("#32cd32"),
    ];
    chart.padding(5, 0, 0, 5);
    chart.margin(0, 0, 0, 0);
    chart.background.fill = am4core.color('#ffffff');

    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    xAxis.dataFields.category = 'chartType'
    xAxis.renderer.cellStartLocation = 0.03
    xAxis.renderer.cellEndLocation = 0.97
    xAxis.renderer.grid.template.location = 0;
    xAxis.title.text = "[bold]" + this.duration;
    xAxis.renderer.minGridDistance = 20;
    xAxis.renderer.labels.template.rotation = 290;
    xAxis.renderer.labels.template.fill = am4core.color("#000000");

    let label = xAxis.renderer.labels.template;
    label.truncate = true;
    label.maxWidth = 120;
    label.tooltipText = "{category}";
    label.fontSize = 12;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;
    yAxis.title.text = '[bold] Submitted/Closed Counts';
    yAxis.renderer.labels.template.fill = am4core.color("#000000");
    yAxis.renderer.labels.template.fontSize = 12;
    yAxis.renderer.minGridDistance = 40;

    let that = this;
    function createSeries(value: any, name: any) {
      let series = chart.series.push(new am4charts.ColumnSeries())
      series.dataFields.valueY = value
      series.dataFields.categoryX = 'chartType'
      series.name = name
      series.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";
      series.events.on("hidden", arrangeColumns);
      series.events.on("shown", arrangeColumns);
    }

    chart.data = dataOpenCloseTrendInfo;

    createSeries('submittedCount', 'Submitted Counts');
    createSeries('closedCount', 'Closed Counts');

    function arrangeColumns() {

      let series = chart.series.getIndex(0);

      let w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
      if (series.dataItems.length > 1) {
        let x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
        let x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
        let delta = ((x1 - x0) / chart.series.length) * w;
        if (am4core.isNumber(delta)) {
          let middle = chart.series.length / 2;

          let newIndex = 0;
          chart.series.each(function (series) {
            if (!series.isHidden && !series.isHiding) {
              series.dummyData = newIndex;
              newIndex++;
            }
            else {
              series.dummyData = chart.series.indexOf(series);
            }
          })
          let visibleCount = newIndex;
          let newMiddle = visibleCount / 2;

          chart.series.each(function (series) {
            let trueIndex = chart.series.indexOf(series);
            let newIndex = series.dummyData;

            let dx = (newIndex - trueIndex + middle - newMiddle) * delta

            series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
            series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
          })
        }
      }
    }


    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.renderer.opposite = true;
    valueAxis.renderer.grid.template.disabled = false;
    valueAxis.title.text = '[bold] Cumulative Counts';
    valueAxis.renderer.labels.template.fontSize = 12;
    valueAxis.renderer.line.strokeOpacity = 1;
    valueAxis.renderer.line.strokeWidth = 1;
    valueAxis.renderer.grid.template.disabled = true;

    function TraigeLineSeries(value, name, axis) {
      var lineSeries = chart.series.push(new am4charts.LineSeries());
      lineSeries.name = name;
      lineSeries.dataFields.valueY = value;
      lineSeries.dataFields.categoryX = "chartType";
      lineSeries.yAxis = valueAxis;
      lineSeries.stroke = am4core.color(axis); // yellow
      lineSeries.strokeWidth = 2;
      lineSeries.propertyFields.strokeDasharray = "lineDash";
      lineSeries.tooltip.label.textAlign = "middle";

      var bullet = lineSeries.bullets.push(new am4charts.Bullet());
      bullet.fill = am4core.color(axis); // tooltips grab fill from parent by default
      bullet.tooltipText = "[#fff font-size: 15px]{categoryX} : [/][#fff font-size: 15px]{valueY}[/] [#fff]{additional}[/]";
      var circle = bullet.createChild(am4core.Circle);
      circle.radius = 3;
      circle.fill = am4core.color("#fff");
      circle.strokeWidth = 2;
    }

    TraigeLineSeries("cummSubmittedCount", "Cumulative Submitted Sightings", "#ff0038");
    TraigeLineSeries("cummClosedCount", "Cumulative Closed Sightings", "#006b3c");
    TraigeLineSeries("cummOpenCount", "Cumulative Open Count", "  #808000");

    chart.legend = new am4charts.Legend();
    chart.legend.position = "bottom";
    chart.legend.contentAlign = "center";
    chart.cursor = new am4charts.XYCursor();

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.parent = chart.bottomAxesContainer;


    if (this.duration == 'Week') {
      chart.scrollbarX = new am4core.Scrollbar();
      chart.scrollbarX.parent = chart.bottomAxesContainer;
      zoomAxisQuarter();
    }
    if (this.duration == 'Quarter') {
      chart.scrollbarX = new am4core.Scrollbar();
      chart.scrollbarX.parent = chart.bottomAxesContainer;
      zoomAxisQuarter();
    }
    if (this.duration == 'Year') {
      chart.scrollbarX = new am4core.Scrollbar();
      chart.scrollbarX.parent = chart.bottomAxesContainer;
      zoomAxisQuarter();
    }
    function zoomAxisQuarter() {
      xAxis.start = 0;
      xAxis.end = 1;
    }
    function zoomAxis() {
      xAxis.start = 0.8;
      xAxis.end = 1;
    }


  }
  //open close trend status chart for report
  chartTypeOpenfilteredCheck = true;
  GetOpenCloseTrendStatus(chartTypeOpenfiltered) {
    //   
    console.log("getOpenCloseTrendStatus", chartTypeOpenfiltered)
    if (!chartTypeOpenfiltered || chartTypeOpenfiltered.length === 0 || chartTypeOpenfiltered == null) {
      this.chartTypeOpenfilteredCheck = true;
      let chart = am4core.create('getOpenCloseTrendStatus', am4charts.XYChart)
      const noDataMessagecontainer = chart.chartContainer.createChild(am4core.Container);
      chart.background.fill = am4core.color('#ffffff');
      noDataMessagecontainer.align = 'center';
      noDataMessagecontainer.isMeasured = false;
      noDataMessagecontainer.x = am4core.percent(50);
      noDataMessagecontainer.horizontalCenter = 'middle';
      noDataMessagecontainer.y = am4core.percent(50);
      noDataMessagecontainer.verticalCenter = 'middle';
      noDataMessagecontainer.layout = 'vertical';

      const messageLabel = noDataMessagecontainer.createChild(am4core.Label);
      messageLabel.text = 'There is no data to show on this chart.';
      messageLabel.textAlign = 'middle';
      messageLabel.maxWidth = 150;
      messageLabel.wrap = true;
    }
    else {
      am4core.useTheme(am4themes_animated);
      am4core.options.autoSetClassName = true;
      am4core.options.commercialLicense = true;
      // Themes end

      let chart = am4core.create("getOpenCloseTrendStatus", am4charts.XYChart);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

      chart.data = chartTypeOpenfiltered;
      chart.padding(5, 5, 5, 5);
      chart.margin(0, 0, 0, 0);

      chart.legend = new am4charts.Legend();
      chart.legend.position = "bottom";
      chart.legend.contentAlign = "center";
      chart.background.fill = am4core.color('#ffffff');
      //Change the lable rotation
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "chartType";
      categoryAxis.title.text = "[bold]" + 'chartType';


      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.renderer.cellStartLocation = 0.2;
      categoryAxis.renderer.cellEndLocation = 0.8;
      categoryAxis.renderer.labels.template.rotation = 290;
      categoryAxis.renderer.labels.template.verticalCenter = "middle";
      categoryAxis.renderer.labels.template.horizontalCenter = "right";
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.start = 0;
      categoryAxis.end = 0.4;


      let label = categoryAxis.renderer.labels.template;
      label.truncate = true;
      label.tooltipText = "{category}";
      label.fontSize = 12;

      let that = this;
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.strictMinMax = true;
      valueAxis.calculateTotals = true;
      valueAxis.renderer.grid.template.disabled = false;
      valueAxis.title.text = '[bold] Count';
      valueAxis.renderer.labels.template.fill = am4core.color("#000000");

      let series1 = chart.series.push(new am4charts.ColumnSeries());
      series1.columns.template.width = am4core.percent(80);
      series1.columns.template.tooltipText =
        "{name}: {valueY}";
      series1.name = "Completed";
      series1.dataFields.categoryX = "chartType";
      series1.dataFields.valueY = "complete";
      series1.dataItems.template.locations.categoryX = 0.5;
      series1.stacked = true;
      series1.tooltip.pointerOrientation = "vertical";
      series1.columns.template.stroke = am4core.color("green");
      series1.columns.template.fill = am4core.color("green");

      let series2 = chart.series.push(new am4charts.ColumnSeries());
      series2.columns.template.width = am4core.percent(80);
      series2.columns.template.tooltipText =
        "{name}: {valueY}";
      series2.name = "Rejected";
      series2.dataFields.categoryX = "chartType";
      series2.dataFields.valueY = "rejected";
      series2.dataItems.template.locations.categoryX = 0.5;
      series2.stacked = true;
      series2.tooltip.pointerOrientation = "vertical";
      series2.columns.template.stroke = am4core.color("#e3dac9");
      series2.columns.template.fill = am4core.color("#e3dac9");

      let series3 = chart.series.push(new am4charts.ColumnSeries());
      series3.columns.template.width = am4core.percent(80);
      series3.columns.template.tooltipText =
        "{name}: {valueY}";
      series3.name = "Open";
      series3.dataFields.categoryX = "chartType";
      series3.dataFields.valueY = "open";
      series3.dataItems.template.locations.categoryX = 0.5;
      series3.stacked = true;
      series3.tooltip.pointerOrientation = "vertical";
      series3.columns.template.stroke = am4core.color("#ff0000");
      series3.columns.template.fill = am4core.color("#ff0000");

      let series4 = chart.series.push(new am4charts.ColumnSeries());
      series4.columns.template.width = am4core.percent(80);
      series4.columns.template.tooltipText =
        "{name}: {valueY}";
      series4.name = "Implemented";
      series4.dataFields.categoryX = "chartType";
      series4.dataFields.valueY = "implemented";
      series4.dataItems.template.locations.categoryX = 0.5;
      series4.stacked = true;
      series4.tooltip.pointerOrientation = "vertical";
      series4.columns.template.stroke = am4core.color("#fada5e");
      series4.columns.template.fill = am4core.color("#fada5e");

      let series5 = chart.series.push(new am4charts.ColumnSeries());
      series5.columns.template.width = am4core.percent(80);
      series5.columns.template.tooltipText =
        "{name}: {valueY}";
      series5.name = "Future";
      series5.dataFields.categoryX = "chartType";
      series5.dataFields.valueY = "future";
      series5.dataItems.template.locations.categoryX = 0.5;
      series5.stacked = true;
      series5.tooltip.pointerOrientation = "vertical";
      series5.columns.template.stroke = am4core.color("#f5deb3");
      series5.columns.template.fill = am4core.color("#f5deb3");

      let series6 = chart.series.push(new am4charts.ColumnSeries());
      series6.columns.template.width = am4core.percent(80);
      series6.columns.template.tooltipText =
        "{name}: {valueY}";
      series6.name = "Verified";
      series6.dataFields.categoryX = "chartType";
      series6.dataFields.valueY = "verified";
      series6.dataItems.template.locations.categoryX = 0.5;
      series6.stacked = true;
      series6.tooltip.pointerOrientation = "vertical";
      series6.columns.template.stroke = am4core.color("#89cff0");
      series6.columns.template.fill = am4core.color("#89cff0");

      let xAxis = chart.xAxes.push(new am4charts.CategoryAxis())

      chart.scrollbarX = new am4core.Scrollbar();
      chart.scrollbarX.parent = chart.bottomAxesContainer;
      zoomAxisQuarter();

      function zoomAxisQuarter() {
        xAxis.start = 0;
        xAxis.end = 1;
      }
    }
  }
  getNoloscriticalCheck = false;
  noLoscriticalchart(noLosChart) {
    // 
    if (!noLosChart || noLosChart.length === 0) {
      this.getNoloscriticalCheck = true;
      let chart = am4core.create('getNoloscritical', am4charts.XYChart)
      const noDataMessagecontainer = chart.chartContainer.createChild(am4core.Container);
      chart.background.fill = am4core.color('#ffffff');

      noDataMessagecontainer.align = 'center';
      noDataMessagecontainer.isMeasured = false;
      noDataMessagecontainer.x = am4core.percent(50);
      noDataMessagecontainer.horizontalCenter = 'middle';
      noDataMessagecontainer.y = am4core.percent(50);
      noDataMessagecontainer.verticalCenter = 'middle';
      noDataMessagecontainer.layout = 'vertical';

      const messageLabel = noDataMessagecontainer.createChild(am4core.Label);
      messageLabel.text = 'There is no data to show on this chart.';
      messageLabel.textAlign = 'middle';
      messageLabel.maxWidth = 150;
      messageLabel.wrap = true;
    }
    else {
      am4core.useTheme(am4themes_animated);
      am4core.options.autoSetClassName = true;
      am4core.options.commercialLicense = true;
      // Themes end

      let chart = am4core.create("getNoloscritical", am4charts.XYChart);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

      chart.data = noLosChart;
      chart.padding(5, 5, 5, 5);
      chart.margin(0, 0, 0, 0);
      chart.background.fill = am4core.color('#ffffff');

      chart.legend = new am4charts.Legend();
      chart.legend.position = "bottom";
      chart.legend.contentAlign = "center";

      //Change the lable rotation
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "ingredientCategory";
      categoryAxis.title.text = "[bold]" + 'Ingredients';


      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.renderer.cellStartLocation = 0.2;
      categoryAxis.renderer.cellEndLocation = 0.8;
      categoryAxis.renderer.labels.template.rotation = 290;
      categoryAxis.renderer.labels.template.verticalCenter = "middle";
      categoryAxis.renderer.labels.template.horizontalCenter = "right";
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.start = 0;
      categoryAxis.end = 0.4;


      let label = categoryAxis.renderer.labels.template;
      label.truncate = true;
      label.tooltipText = "{category}";
      label.fontSize = 12;

      let that = this;
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.strictMinMax = true;
      valueAxis.calculateTotals = true;
      valueAxis.renderer.grid.template.disabled = false;
      valueAxis.title.text = '[bold] Count';
      valueAxis.renderer.labels.template.fill = am4core.color("#000000");

      let series1 = chart.series.push(new am4charts.ColumnSeries());
      series1.columns.template.width = am4core.percent(80);
      series1.columns.template.tooltipText =
        "{name}: {valueY}";
      series1.name = "1-Critical";
      series1.dataFields.categoryX = "ingredientCategory";
      series1.dataFields.valueY = "noLOSCount";
      series1.dataItems.template.locations.categoryX = 0.5;
      series1.stacked = true;
      series1.tooltip.pointerOrientation = "vertical";
      series1.columns.template.stroke = am4core.color("red");
      series1.columns.template.fill = am4core.color("red");

      series1.columns.template.events.on("hit", function (ev: any) {
        console.log("clicked on ", ev.target.dataItem._dataContext);
        that.ingredientExposure.Ingredient = ev.target.dataItem._dataContext.ingradients;
        that.ingredientExposure.platform = that.platformName;
        that.ingredientExposure.Exposure = '1-critical';
        that.ingredientExposure.CHARTTYPE = 'ingredientExposureHSDEC';
        let t = that.router.serializeUrl(that.router.createUrlTree(['sample'], { queryParams: that.ingredientExposure }))
        window.open("#" + t, '_blank')

      }, this);

      let bullet1 = series1.bullets.push(new am4charts.LabelBullet());
      bullet1.interactionsEnabled = false;
      bullet1.label.text = "{valueY}";
      bullet1.locationY = 0.5;
      bullet1.label.fill = am4core.color("#ffffff");

      let xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      chart.scrollbarX = new am4core.Scrollbar();
      chart.scrollbarX.parent = chart.bottomAxesContainer;
      categoryAxis.start = 0;
      categoryAxis.end = 1;
    }
  }
  getNoloshighCheck = false;
  noLoscriticalhighchart(noLosChart) {
    if (!noLosChart || noLosChart.length === 0) {
      this.getNoloshighCheck = true;
      let chart = am4core.create('getNoloshigh', am4charts.XYChart)
      const noDataMessagecontainer = chart.chartContainer.createChild(am4core.Container);
      chart.background.fill = am4core.color('#ffffff');
      noDataMessagecontainer.align = 'center';
      noDataMessagecontainer.isMeasured = false;
      noDataMessagecontainer.x = am4core.percent(50);
      noDataMessagecontainer.horizontalCenter = 'middle';
      noDataMessagecontainer.y = am4core.percent(50);
      noDataMessagecontainer.verticalCenter = 'middle';
      noDataMessagecontainer.layout = 'vertical';

      const messageLabel = noDataMessagecontainer.createChild(am4core.Label);
      messageLabel.text = 'There is no data to show on this chart.';
      messageLabel.textAlign = 'middle';
      messageLabel.maxWidth = 150;
      messageLabel.wrap = true;
    }
    else {
      am4core.useTheme(am4themes_animated);
      am4core.options.autoSetClassName = true;
      am4core.options.commercialLicense = true;
      // Themes end

      let chart = am4core.create("getNoloshigh", am4charts.XYChart);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

      chart.data = noLosChart;
      chart.padding(5, 5, 5, 5);
      chart.margin(0, 0, 0, 0);
      chart.background.fill = am4core.color('#ffffff');

      chart.legend = new am4charts.Legend();
      chart.legend.position = "bottom";
      chart.legend.contentAlign = "center";

      //Change the lable rotation
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "ingredientCategory";
      categoryAxis.title.text = "[bold]" + 'Ingredients';


      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.renderer.cellStartLocation = 0.2;
      categoryAxis.renderer.cellEndLocation = 0.8;
      categoryAxis.renderer.labels.template.rotation = 290;
      categoryAxis.renderer.labels.template.verticalCenter = "middle";
      categoryAxis.renderer.labels.template.horizontalCenter = "right";
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.start = 0;
      categoryAxis.end = 0.4;


      let label = categoryAxis.renderer.labels.template;
      label.truncate = true;
      label.tooltipText = "{category}";
      label.fontSize = 12;

      let that = this;
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.strictMinMax = true;
      valueAxis.calculateTotals = true;
      valueAxis.renderer.grid.template.disabled = false;
      valueAxis.title.text = '[bold] Count';
      valueAxis.renderer.labels.template.fill = am4core.color("#000000");

      let series1 = chart.series.push(new am4charts.ColumnSeries());
      series1.columns.template.width = am4core.percent(80);
      series1.columns.template.tooltipText =
        "{name}: {valueY}";
      series1.name = "2-High";
      series1.dataFields.categoryX = "ingredientCategory";
      series1.dataFields.valueY = "noLOSCount";
      series1.dataItems.template.locations.categoryX = 0.5;
      series1.stacked = true;
      series1.tooltip.pointerOrientation = "vertical";
      series1.columns.template.stroke = am4core.color("#ffa500");
      series1.columns.template.fill = am4core.color("#ffa500");

      series1.columns.template.events.on("hit", function (ev: any) {
        console.log("clicked on ", ev.target.dataItem._dataContext);
        that.ingredientExposure.Ingredient = ev.target.dataItem._dataContext.ingradients;
        that.ingredientExposure.platform = that.platformName;
        that.ingredientExposure.Exposure = '1-critical';
        that.ingredientExposure.CHARTTYPE = 'ingredientExposureHSDEC';
        let t = that.router.serializeUrl(that.router.createUrlTree(['sample'], { queryParams: that.ingredientExposure }))
        window.open("#" + t, '_blank')

      }, this);

      let bullet1 = series1.bullets.push(new am4charts.LabelBullet());
      bullet1.interactionsEnabled = false;
      bullet1.label.text = "{valueY}";
      bullet1.locationY = 0.5;
      bullet1.label.fill = am4core.color("#ffffff");


      let xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      chart.scrollbarX = new am4core.Scrollbar();
      chart.scrollbarX.parent = chart.bottomAxesContainer;
      categoryAxis.start = 0;
      categoryAxis.end = 1;

    }
  }
  // workweek() {
  //define a date object variable that will take the current system date
  //   let todaydate: any = new Date();

  //find the year of the current date
  //   let oneJan: any = new Date(todaydate.getFullYear(), 0, 1);

  // calculating number of days in given year before a given date 
  //   let numberOfDays = Math.floor((todaydate - oneJan) / (24 * 60 * 60 * 1000));

  // adding 1 since to current date and returns value starting from 0 
  //  this.workWeek = Math.ceil((todaydate.getDay() + 1 + numberOfDays) / 7);

  //display the calculated result       
  /*   console.log("Week Numbers of current date (" + todaydate +
      ") is: <br>" + this.workWeek);
  } */
  sendMailParam: { platform: any; mailTo: any; userName: string; };
  workweek() {
    this.apiService.getWorkWeek(this.sendMailParam).subscribe((res: any) => {
      console.log(res)
      this.workWeek = res

    })

  }

  openDialog() {
    let dialogRef = this.dialogRef.open(this.callAPIDialog, {
      height: 'auto',
      width: '80vw',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result !== 'no') {
          const enabled = "Y"
          console.log(result);
        } else if (result === 'no') {
          console.log('User clicked no.');
        }
      }
    })
  }
  openDialog1() {
    let dialogRef = this.dialogRef.open(this.callAPIDialog1, {
      height: 'auto',
      width: '50vw',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result !== 'no') {
          const enabled = "Y"
          console.log(result);
        } else if (result === 'no') {
          console.log('User clicked no.');
        }
      }
    })
  }
  onSend(form: NgForm) {
    this.workweek();
    this.onValChange('Week');
    if (form.status === 'INVALID') {
      // display error in your form
    } else {
      console.log(form.value)
      this.dialogRef.closeAll();

      this.openClosedDataReport(); {
        console.log(this.objd)
        this.apiService.getOpenCloseTrendInfoReport(this.objd).subscribe((res: any) => {

          let chartTypeOpen = res.getOpenCloseTrendInfo;
          let openCloseLength = chartTypeOpen.length;
          var index = this.trend_start_date;
          if (index == "All" || index == null || index == undefined) {
            this.rendercharOpen(res.getOpenCloseTrendInfo);
          }
          else {
            var trendValue = chartTypeOpen.map(function (o) { return o.chartType; }).indexOf(this.trend_start_date);
            console.log("index of 'fn': " + trendValue);
            this.chartTypeOpenfiltered = chartTypeOpen.splice(trendValue, openCloseLength)
            console.log(this.chartTypeOpenfiltered)
            this.rendercharOpen(this.chartTypeOpenfiltered);
          }

        })
      }
      this.trendStatus = {
        "platform": this.platformName,
        "ChartType": "week",
        "target": this.trend_milestone,
      }
      this.apiService.GetOpenCloseTrendStatus(this.trendStatus).subscribe((res: any) => {
        //   
        console.log("getOpenCloseTrendStatus", res.getOpenCloseTrendStatusInfo);

        let trendstatusChart = res.getOpenCloseTrendStatusInfo;
        if (trendstatusChart == null) {
          this.GetOpenCloseTrendStatus(res.getOpenCloseTrendStatusInfo);
        } else {
          let openCloseLength = trendstatusChart.length;
          var index = this.mileTrend_start;
          console.log("getOpenCloseTrendStatus", res.getOpenCloseTrendStatusInfo);

          if (index == "All" || index == null || index == undefined) {
            this.GetOpenCloseTrendStatus(res.getOpenCloseTrendStatusInfo);
          }
          else {
            var trendValue = trendstatusChart.map(function (o) { return o.chartType; }).indexOf(this.mileTrend_start);
            console.log("index of 'fn': " + trendValue);
            this.chartTypeOpenfiltered = trendstatusChart.splice(trendValue, openCloseLength)
            this.GetOpenCloseTrendStatus(this.chartTypeOpenfiltered);

          }



        }



      })

      this.apiService.GetNoLosCountRepo(this.noLoscritical).subscribe((res: any) => {
        let noLosChart = res.noLosCountInfo
        let index = this.no_los_graph;

        if (index == "All" || index == null || index == undefined) {
          this.noLoscriticalchart(noLosChart)
        }
        else {
          this.trendChartFiltered = noLosChart.splice(0, index)
          this.noLoscriticalchart(this.trendChartFiltered);
        }
      })
      this.apiService.GetNoLosCountRepo(this.noLoshigh).subscribe((res: any) => {
        let noLosChart = res.noLosCountInfo

        let index = this.no_los_graph;
        if (index == "All" || index == null || index == undefined) {
          this.noLoscriticalhighchart(noLosChart);
          console.log('all')
        }
        else {
          this.trendChartFiltered = noLosChart.splice(0, index)
          this.noLoscriticalhighchart(this.trendChartFiltered);
          console.log('alltere')
        }
      })
      this.apiService.getSightingsByIngredienntsAndExposure(this.ingredientExposure).subscribe((res: any) => {
        console.log(res)
        let ingredExposChart = res.getIngredientSightingInfo;
        let ingredExposlength = ingredExposChart.length;
        let index = this.ingredient_exposure;


        if (index == "All" || index == "" || index == undefined) {
          this.ingredientSightingInfo(res.getIngredientSightingInfo);
          console.log('all')
        }
        else {
          this.trendChartFiltered = ingredExposChart.splice(0, this.ingredient_exposure)
          this.ingredientSightingInfo(this.trendChartFiltered);
          console.log('alltere')
        }
      })
      this.apiService.GetKeyIngredientFailing(this.keyFailing).subscribe((res: any) => {
        //   
        this.getKey_ing = res.ingredientNamesCountsInfo;
        this.ingNew = this.getKey_ing[0].counts
        this.ingClosedCount = this.getKey_ing[1].counts
        this.ingimplemented = this.getKey_ing[2].counts
        this.ingopen = this.getKey_ing[3].counts
        this.ingtotal = this.getKey_ing[4].counts
        this.getingValue1 = res.ingredientCategoryCountsInfo;
        this.getingOpenValue1 = res.ingredientCategoryCountsOpenInfo;

        let index = this.No_of_keyIngredients;
        if (index == "All" || index == "" || index == undefined) {
          this.getingValue = res.ingredientCategoryCountsInfo;
          this.getingOpenValue = res.ingredientCategoryCountsOpenInfo;
          console.log('all')
        }
        else {
          let overAlling = res.ingredientCategoryCountsInfo;
          let openAlling = res.ingredientCategoryCountsOpenInfo;
          this.getingValue = overAlling.splice(0, this.No_of_keyIngredients)
          this.getingOpenValue = openAlling.splice(0, this.No_of_keyIngredients)
          console.log(this.getingValue)
        }
      })
      if (this.flag == "1") {
        let paylo = {
          "platform": this.platformName,
          "exposure": "1-critical"
        }
        this.apiService.GetExposureListOfIssues(paylo).subscribe((res: any) => {
           
          console.log("res-ta", res);
          /*   this.critical_defectsBugs = res.defectsBugs;
    
            console.log(this.critical_defectsBugs)
            this.critical_dpmO_DPMT = res.dpmO_DPMT
            this.critical_pnP = res.pnP
            this.critical_hlk = res.hlk
            this.critical_prechecksRequiremnt = res.prechecksRequiremnt
            this.critical_tpv = res.tpv; */
          this.critical_customer_must_fix = res.criticalHigh;
          console.log("res-tat", this.critical_customer_must_fix);
          /*  this.critical_other = res.other;
   
           this.dataSource.data = this.critical_defectsBugs;
           this.dataSource1.data = this.critical_pnP;
           this.dataSource2.data = this.critical_tpv;
           this.dataSource3.data = this.critical_dpmO_DPMT; */
          this.dataSource000.data = this.critical_customer_must_fix;
          /*   this.dataSource5.data = this.critical_other;
            this.dataSource6.data = this.critical_hlk;
            this.dataSource7.data = this.critical_prechecksRequiremnt;
            console.log(this.listIssue) */
        })
        let pay = {
          "platform": this.platformName,
          "exposure": "2-high"
        }
        this.apiService.GetExposureListOfIssues(pay).subscribe((res: any) => {
          /*    this.high_defectsBugs = res.defectsBugs;
             this.high_dpmO_DPMT = res.dpmO_DPMT
             this.high_pnP = res.pnP
             this.high_hlk = res.hlk
             this.high_prechecksRequiremnt = res.prechecksRequiremnt
             this.high_tpv = res.tpv */
          console.log("res-", res);
          this.high_customer_must_fix = res.criticalHigh;
          /*     this.high_other = res.other
      
              this.dataSource00.data = this.high_defectsBugs;
              this.Countobj = {};
              this.dataSource00.data.forEach((d: any, index: any) => {
                d["type"] = "Read More";
                Object.assign(this.Countobj, {
                  [index]: 150
                });
              })
              console.log(this.Countobj)
              this.dataSource01.data = this.high_pnP;
              this.dataSource02.data = this.high_tpv;
              this.dataSource03.data = this.high_dpmO_DPMT;
              this.Countobj2 = {};
              this.dataSource03.data.forEach((d: any, index: any) => {
                d["type"] = "Read More";
                Object.assign(this.Countobj2, {
                  [index]: 150
                });
              }) */
          this.dataSource001.data = this.high_customer_must_fix;
          /*    this.dataSource05.data = this.high_other;
             this.dataSource06.data = this.high_hlk;
             this.dataSource07.data = this.high_prechecksRequiremnt; */
        })
        let pyl = {
          "platform": this.platformName
        }
        this.apiService.GetExposureListOfIssues(pyl).subscribe((res: any) => {
          /*    this.high_defectsBugs = res.defectsBugs;
             this.high_dpmO_DPMT = res.dpmO_DPMT
             this.high_pnP = res.pnP
             this.high_hlk = res.hlk
             this.high_prechecksRequiremnt = res.prechecksRequiremnt
             this.high_tpv = res.tpv */
          console.log("res-", res);
          this.implemented = res.implemented;
          /*     this.high_other = res.other
      
              this.dataSource00.data = this.high_defectsBugs;
              this.Countobj = {};
              this.dataSource00.data.forEach((d: any, index: any) => {
                d["type"] = "Read More";
                Object.assign(this.Countobj, {
                  [index]: 150
                });
              })
              console.log(this.Countobj)
              this.dataSource01.data = this.high_pnP;
              this.dataSource02.data = this.high_tpv;
              this.dataSource03.data = this.high_dpmO_DPMT;
              this.Countobj2 = {};
              this.dataSource03.data.forEach((d: any, index: any) => {
                d["type"] = "Read More";
                Object.assign(this.Countobj2, {
                  [index]: 150
                });
              }) */
          this.dataSource002.data = this.implemented;
          /*    this.dataSource05.data = this.high_other;
             this.dataSource06.data = this.high_hlk;
             this.dataSource07.data = this.high_prechecksRequiremnt; */
        })
        //  this.milestoneIssuelist(this.qrc_by_target_list);
      } else if (this.flag == "0") {
        let pyl = {
          "platform": this.platformName,
          "exposure": "1-critical"
        }
        this.apiService.GetOpenCriticalQRCVectorHSDESResult(pyl).subscribe((res: any) => {

          this.critical_defectsBugs = res.defectsBugs;
          this.dataSource.data = this.critical_defectsBugs;

          this.critical_pnP = res.pnP
          this.dataSource1.data = this.critical_pnP;

          this.critical_tpv = res.tpv
          this.dataSource2.data = this.critical_tpv;

          this.critical_dpmO_DPMT = res.dpmO_DPMT
          this.dataSource3.data = this.critical_dpmO_DPMT;

          this.critical_customer_must_fix = res.customer_must_fix;
          this.dataSource4.data = this.critical_customer_must_fix;

          this.critical_other = res.other
          this.dataSource5.data = this.critical_other;

          this.critical_hlk = res.hlk
          this.dataSource6.data = this.critical_hlk;

          this.critical_prechecksRequiremnt = res.prechecksRequiremnt
          this.dataSource7.data = this.critical_prechecksRequiremnt;

          if (this.critical_defectsBugs.length == 0 &&
            this.critical_pnP.length == 0 &&
            this.critical_tpv.length == 0 &&
            this.critical_dpmO_DPMT.length == 0 &&
            this.critical_customer_must_fix.length == 0 &&
            this.critical_other.length == 0 &&
            this.critical_hlk.length == 0 &&
            this.critical_prechecksRequiremnt.length == 0) {
            this.qrc_milestone_table = false;
          } else {
            this.qrc_milestone_table = true;
          }

          console.log("res-", res);
        })
        let pylo = {
          "platform": this.platformName,
          "exposure": "2-high"
        }
        this.apiService.GetOpenCriticalQRCVectorHSDESResult(pylo).subscribe((res: any) => {
          this.high_defectsBugs = res.defectsBugs;
          this.dataSource00.data = this.high_defectsBugs;

          this.high_pnP = res.pnP
          this.dataSource01.data = this.high_pnP;

          this.high_tpv = res.tpv
          this.dataSource02.data = this.high_tpv;

          this.high_dpmO_DPMT = res.dpmO_DPMT
          this.dataSource03.data = this.high_dpmO_DPMT;

          this.high_customer_must_fix = res.customer_must_fix;
          this.dataSource04.data = this.high_customer_must_fix;

          this.high_other = res.other
          this.dataSource05.data = this.high_other;

          this.high_hlk = res.hlk
          this.dataSource06.data = this.high_hlk;

          this.high_prechecksRequiremnt = res.prechecksRequiremnt
          this.dataSource07.data = this.high_prechecksRequiremnt;

          if (this.high_defectsBugs.length == 0 &&
            this.high_pnP.length == 0 &&
            this.high_tpv.length == 0 &&
            this.high_dpmO_DPMT.length == 0 &&
            this.high_customer_must_fix.length == 0 &&
            this.high_other.length == 0 &&
            this.high_hlk.length == 0 &&
            this.high_prechecksRequiremnt.length == 0) {
            this.high_qrc_milestone_table = false;
          } else {
            this.high_qrc_milestone_table = true;
          }

          console.log("res-", res);

          /*   this.Countobj = {};
            this.dataSource00.data.forEach((d: any, index: any) => {
              d["type"] = "Read More";
              Object.assign(this.Countobj, {
                [index]: 150
              });
            }) */
          /* console.log(this.Countobj) */
          /* this.Countobj2 = {};
          this.dataSource03.data.forEach((d: any, index: any) => {
            d["type"] = "Read More";
            Object.assign(this.Countobj2, {
              [index]: 150
            });
          }) */
          //  this.dataSource05.data = this.implemented;

        })
        // this.milestoneIssuelist(this.qrc_by_target_list);
      }
    }


    /* Defects vs Ingredients chart API call */
    let paylo =
    {
      "platform": this.platformName,
      /*  "Ingredient": this.ingredient,
       "ChartType": this.chartType,
       "CHARTTYPE": this.duration */
      "ChartType": "Defects"
    }
    let payl =
    {
      "platform": this.platformName,
      "ChartType": "Regression"
    }
    let tempDefects = [];
    let tempRegression = [];
    this.apiService.getDefectsVsRegressionHSDESResult(paylo).subscribe((res: any) => {
      console.log(res.defectsAndRegressionInfo);
      this.defectsInfo = res.defectsAndRegressionInfo;
      this.defectsInfo.forEach(element => {
        if(element.ingredients != 'Unknown'){
          let temp = {
            "ingredients": element.ingredients,
            "Defectscritical": element.critical,
            "Defectshigh": element.high,
            "Defectsmedium": element.medium,
            "Defectslow": element.low
          }
          tempDefects.push(temp);
        }
      });
      debugger;
      //regression
      this.apiService.getDefectsVsRegressionHSDESResult(payl).subscribe((res: any) => {
        console.log(res.defectsAndRegressionInfo);
         
        this.regressionInfo = res.defectsAndRegressionInfo;
        this.regressionInfo.forEach(element => {
          if(element.ingredients != 'Unknown'){
          let temp = {
            "ingredients": element.ingredients,
            "Regressioncritical": element.critical,
            "Regressionhigh": element.high,
            "Regressionmedium": element.medium,
            "Regressionlow": element.low,
            "Regressiontotal": element.total
          }
          tempRegression.push(temp);
        }
        });
        debugger;
        tempDefects.forEach(element => {
          tempRegression.forEach(ele => {
            if (element.ingredients == ele.ingredients) {
              element["Regressioncritical"] = ele.Regressioncritical;
              element["Regressionhigh"] = ele.Regressionhigh;
              element["Regressionmedium"] = ele.Regressionmedium;
              element["Regressionlow"] = ele.Regressionlow;
              element["Regressiontotal"] = ele.Regressiontotal;
            }
          });
        });

        this.renderCharData(tempDefects);
      })
    })
  }

  getBadgeClass(lifeCycle) {
    console.log("lifeCycle", lifeCycle)
    if (lifeCycle == "") {
      return 'bg_red';
    } else if (lifeCycle == 'red') {
      return 'bg_red';
    } else if (lifeCycle == 'green') {
      return 'bg_green';
    } else if (lifeCycle == 'yellow') {
      return 'bg_yellow';
    } else if (lifeCycle == 'waiver') {
      return 'bg_grey';
    }
  }

  defectsInfo; regressionInfo;
  defectRegressionParam = {};
  defectsAndRegressionInfoCheck = false;
  renderCharData(defectsAndRegressionInfo) {
    if (defectsAndRegressionInfo.length == 0) {
      this.defectsAndRegressionInfoCheck = true;
    }
    am4core.useTheme(am4themes_animated);
    am4core.options.autoSetClassName = true;
    am4core.options.commercialLicense = true;

    let chart = am4core.create('chartdivnew', am4charts.XYChart)
    chart.colors.list = [
      am4core.color("#007fff"),
      am4core.color("orange"),
    ];
    chart.padding(5, 5, 5, 5);
    chart.margin(0, 0, 0, 0);

    chart.background.fill = am4core.color('#ffffff');
    chart.legend = new am4charts.Legend();
    chart.legend.position = "bottom";
    chart.legend.contentAlign = "center";
    chart.cursor = new am4charts.XYCursor();

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.parent = chart.bottomAxesContainer;
    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.parent = chart.rightAxesContainer;


    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    xAxis.dataFields.category = 'ingredients'
    xAxis.renderer.grid.template.location = 0;
    xAxis.title.text = "[bold] ingredients";

    xAxis.renderer.labels.template.rotation = 290;
    xAxis.renderer.labels.template.fill = am4core.color("#000000");

    xAxis.renderer.grid.template.location = 0;
    xAxis.renderer.minGridDistance = 20;
    xAxis.renderer.cellStartLocation = 0.1;
    xAxis.renderer.cellEndLocation = 0.9;
    xAxis.renderer.labels.template.verticalCenter = "middle";
    xAxis.renderer.labels.template.horizontalCenter = "right";
    xAxis.renderer.grid.template.disabled = true;
    xAxis.start = 0;
    xAxis.end = 0.4;
    chart.events.on("ready", function () {
      xAxis.zoomToIndexes(0, 10);
    });
    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;
    yAxis.title.text = '[bold] Counts';
    yAxis.renderer.labels.template.fill = am4core.color("#000000");
    yAxis.renderer.labels.template.fontSize = 12;
    yAxis.renderer.minGridDistance = 20;

    let that = this;
    function createSeries(value, name, stacked, colo) {
      let series = chart.series.push(new am4charts.ColumnSeries())
      series.dataFields.valueY = value
      series.dataFields.categoryX = 'ingredients'
      series.name = name
      series.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";
      series.stacked = stacked;
      series.events.on("hidden", arrangeColumns);
      series.events.on("shown", arrangeColumns);
      series.columns.template.stroke = colo;
      series.columns.template.fill = colo;
      series.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
      // Click
      series.columns.template.events.on("hit", function (ev: any) {
        console.log("clicked on ", ev.target.dataItem._dataContext);
         
        let type = (ev.target.dataItem.component.name).split(' ');
        that.chartdetails.COUNTTYPE = type[0];

        that.domainExposure.platform = that.platformName;
        that.defectRegressionParam['Ingredient'] = ev.target.dataItem._dataContext.ingredients;
        that.defectRegressionParam['ChartType'] = type[0];
        if (type[1] == "Critical") {
          that.defectRegressionParam['Exposure'] = "1-Critical";
        } else if (type[1] == "High") {
          that.defectRegressionParam['Exposure'] = "2-High";
        } else if (type[1] == "Medium") {
          that.defectRegressionParam['Exposure'] = "3-Medium";
        } else if (type[1] == "Low") {
          that.defectRegressionParam['Exposure'] = "4-Low";
        }
        that.defectRegressionParam['platform'] = that.platformName;
        that.defectRegressionParam['CHARTTYPE'] = 'defectRegressionHSDEC';
        let t = that.router.serializeUrl(that.router.createUrlTree(['sample'], { queryParams: that.defectRegressionParam }))
        window.open("#" + t, '_blank')
        console.log("clicked on ", that.defectRegressionParam);
      }, this);


      let bullet = series.bullets.push(new am4charts.LabelBullet())
      /*  bullet.interactionsEnabled = false
       bullet.dy = 30;
       bullet.label.text = '{valueY}'*/
      bullet.label.fill = am4core.color('#ffffff')
      bullet.label.text = "[#ffffff]{valueY.formatNumber('#.a')}";
      bullet.locationY = 0.5;
      bullet.label.hideOversized = true;
      bullet.label.cursorOverStyle = am4core.MouseCursorStyle.pointer;
      bullet.label.events.on("hit", function (ev: any) {
        console.log("clicked on ", ev.target.dataItem._dataContext);
         
        let type = (ev.target.dataItem.component.name).split(' ');
        that.chartdetails.COUNTTYPE = type[0];

        that.domainExposure.platform = that.platformName;
        that.defectRegressionParam['Ingredient'] = ev.target.dataItem._dataContext.ingredients;
        that.defectRegressionParam['ChartType'] = type[0];
        if (type[1] == "Critical") {
          that.defectRegressionParam['Exposure'] = "1-Critical";
        } else if (type[1] == "High") {
          that.defectRegressionParam['Exposure'] = "2-High";
        } else if (type[1] == "Medium") {
          that.defectRegressionParam['Exposure'] = "3-Medium";
        } else if (type[1] == "Low") {
          that.defectRegressionParam['Exposure'] = "4-Low";
        }
        that.defectRegressionParam['platform'] = that.platformName;
        that.defectRegressionParam['CHARTTYPE'] = 'defectRegressionHSDEC';
        let t = that.router.serializeUrl(that.router.createUrlTree(['sample'], { queryParams: that.defectRegressionParam }))
        window.open("#" + t, '_blank')
        console.log("clicked on ", that.defectRegressionParam);
      }, this);

      return series;
    }
    chart.data = defectsAndRegressionInfo;

    /*  tenet.forEach((ele, index) => {
       createSeries(ele + "open", " Backlog" + " (" + ele + ")", false, ele + "openAgeing", color[index].open, ele);
       createSeries(ele + "completed", " Completed" + " (" + ele + ")", true, ele + "completedAgeing", color[index].complted, ele);
       createSeries(ele + "rejected", " Rejected" + " (" + ele + ")", true, ele + "rejectedAgeing", color[index].rejected, ele);
     }); */
    let ingredients = ['Defects', 'Regression'];
    ingredients.forEach((ele, index) => {
      if (ele == 'Defects') {
        createSeries(ele + 'critical', ele + ' Critical', false, "#c23616");
        createSeries(ele + 'high', ele + ' High', true, "#e1b12c");
        createSeries(ele + 'medium', ele + ' Medium', true, "#44bd32");
        createSeries(ele + 'low', ele + ' Low', true, "#0097e6");
      } else if (ele == 'Regression') {
        createSeries(ele + 'total', ele + ' Total', false, "#192a56");
      }
    });

    function arrangeColumns() {

      let series = chart.series.getIndex(0);

      let w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
      if (series.dataItems.length > 1) {
        let x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
        let x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
        let delta = ((x1 - x0) / chart.series.length) * w;
        if (am4core.isNumber(delta)) {
          let middle = chart.series.length / 2;

          let newIndex = 0;
          chart.series.each(function (series) {
            if (!series.isHidden && !series.isHiding) {
              series.dummyData = newIndex;
              newIndex++;
            }
            else {
              series.dummyData = chart.series.indexOf(series);
            }
          })
          let visibleCount = newIndex;
          let newMiddle = visibleCount / 2;

          chart.series.each(function (series) {
            let trueIndex = chart.series.indexOf(series);
            let newIndex = series.dummyData;

            let dx = (newIndex - trueIndex + middle - newMiddle) * delta

            series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
            series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
          })
        }
      }
    }
  }

  milestoneIssuelist(qrc_by_target_list_value) {
    var s = qrc_by_target_list_value;
    this.issueList = {
      "platform": this.platformName,
      "exposure": "1-critical",
      "target": s,
    }
    this.apiService.GetOpenCriticalQRCVectorHSDESResult(this.issueList).subscribe((res: any) => {
      this.listIssue = res.defectsBugs;
      this.critical_defectsBugs = res.defectsBugs;
      this.critical_dpmO_DPMT = res.dpmO_DPMT
      this.critical_pnP = res.pnP
      // below 2 table need to add
      this.critical_hlk = res.hlk
      this.critical_prechecksRequiremnt = res.prechecksRequiremnt
      this.critical_tpv = res.tpv
      this.critical_customer_must_fix = res.customer_must_fix

      console.log("res-tat1", this.critical_customer_must_fix);
      this.critical_other = res.other
      console.log(this.listIssue)
    })
  }
  ExportPDF() {
    this.downloadingAs();
  }
  exportReport() {

  }
  downloadingMail() {
    html2canvas(document.querySelector("#capture")).then(function (canvas) {
      document.body.appendChild(canvas);
    });
  }
  save(fileName) {
    // First we get our section to save from dom
    let section = document.querySelector('#capture');

    // We pass that section to html2Canvase
    html2canvas(document.querySelector("#page")).then(canvas => {
      var link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
    });
  }
  download = async () => {
    const zip = new JSZip();
    zip.file("hello.eml", "");

    zip.folder("images").file("report.png", "Hello World\n");
    zip.generateAsync({ type: "blob" })
      .then(function (content) {
        // see FileSaver.js
        saveAs(content, "example.zip");
      });
  };

  downloadMailformat = async () => {
    this.hide_header();
    document.getElementById("header_strip").style.display = "none";
    document.getElementById("myDIV").style.display = "block";
    this.showNotification('info', 'Zip File is being generated');
    html2canvas(document.querySelector("#page")).then(function (canvas) {
      //document.body.appendChild(canvas);

      var zip = new JSZip();
      var savable = new Image();
      savable.src = canvas.toDataURL();
      var x = document.getElementsByClassName("sle_Id")
      var html_content: string = 'To: User <user@domain.demo>' + 'Subject: Subject' + 'X-Unsent: 1' + 'Content-Type: text/html' + '<body style="width:auto;"><img src="./images/image.png" width="auto" height="auto"/></body>' + '';
      var html_template: any = '<html><head></head><body><img src="./images/image.png" alt="" width="auto" height="auto"/></body></html>';

      var textbox: any = document.getElementById('textbox');

      console.log(textbox.value)
      zip.file("report_template.html", textbox.value)
      zip.folder("images").file("image.png", savable.src.substr(savable.src.indexOf(',') + 1), { base64: true });
      zip.generateAsync({ type: "blob" })
        .then(function (content) {
          // see FileSaver.js
          saveAs(content, "Report.zip");
          document.getElementById("myDIV").style.display = "none";
          document.getElementById("header_strip").style.display = "block";
        });
    });

  }
  preview() {
    var previewOpen: any = window.open("", "previewOpen", "width=1200, height=600");
    var textbox: any = document.getElementById('textbox');
    previewOpen.document.body.innerHTML = textbox.value; // Get the value of text area and run HTML code
  }
  templatePreview() {
    var textFile = null,
      makeTextFile = function (text) {
        var data = new Blob([text], { type: 'text/plain' });
        if (textFile !== null) {
          window.URL.revokeObjectURL(textFile);
        }
        textFile = window.URL.createObjectURL(data);
        console.log(textFile)
        return textFile;
      };

    var create = document.getElementById('create'),
      textbox: any = document.getElementById('textbox');
    create.addEventListener('click', function () {
      var link: any = document.getElementById('downloadlink');
      console.log(typeof textbox.value, textbox.value)
      link.href = makeTextFile(textbox.value);
      link.style.display = 'block';
    }, false);
  }

  generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }

  generateTable(table, data) {
    for (let element of data) {
      let row = table.insertRow();
      for (let key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
    }
  }
  ////////////////////////////
  sendColumnlist() {
    this.sendCollist = [];
    console.log(this.displayedColumns)
    this.defaultColumns.forEach((element, index) => {
      let key: string = "<!--"
      if (this.displayedColumns.indexOf(element) !== -1) {
        return this.sendCollist.push(
          {
            [element]: [{
              "SerialNo1": "",
              "SerialNo2": ""
            }]

          }
        )
      } else {
        return this.sendCollist.push(
          {
            [element]: [{
              "SerialNo1": key,
              "SerialNo2": "-->"
            }]

          })
      }
    });
    console.log(JSON.stringify(this.sendCollist))
    console.log(Object.assign({}, ...this.sendCollist));
  }



  toggleColumn(column) {
    if (column.isActive) {
      if (column.possition > this.displayedColumns.length - 1) {
        if (column.name == "promoted_ID") {
          this.displayedColumns.splice(2, 0, column.name);
        } else {
          this.displayedColumns.push(column.name);
        }
      } else {
        if (column.name == "promoted_ID") {
          this.displayedColumns.splice(2, 0, column.name);
        } else {
          this.displayedColumns.splice(column.possition, 0, column.name);
        }
      }
    } else {
      let i = this.displayedColumns.indexOf(column.name);
      let opr = i > -1 ? this.displayedColumns.splice(i, 1) : undefined;
    }
    console.log(this.displayedColumns)
  }
  iscolSelected(column) {
    if (column.isActive == false) {
      this.select_all = false;
    }
  }
  checked = [];
  getCheckbox() {
    this.checked = [];
    const checked = this.checkBox.filter(checkbox => checkbox.checked);
    checked.forEach(data => {
      this.checked.push({
        'checked': data.checked,
        'value': data.value
      })
    })
    if (this.checked.length == 43) {
      this.select_all = true;
    }
  }
  onSelectAll(e: any): void {
    this.removeAll();
    for (let i = 0; i < this.columnShowHideList.length; i++) {
      const item = this.columnShowHideList[i];
      item.isActive = e;
    }
    console.log(this.columnShowHideList);
    this.columnShowHideList[0].isActive = "true";
    this.columnShowHideList[1].isActive = "true";
    this.columnShowHideList[2].isActive = "true";
    let column = this.columnShowHideList;
    for (let i = 0; i < column.length; i++) {
      this.toggleColumn(column[i])
    }
  }
  removeAll() {
    for (let i = 0; i < this.columnShowHideList.length; i++) {
      const item = this.columnShowHideList[i];
      item.isActive = false;
    }
    let column = this.columnShowHideList;
    for (let i = 0; i < column.length; i++) {
      this.toggleColumn(column[i])
    }
  }
  initializeColumnProperties() {
    this.columnShowHideList = [];
    debugger;
    this.defaultColumns.forEach((element, index) => {
       /*    this.displayedColumns.forEach((ele, index) => {
          if(element==ele){
            return this.columnShowHideList.push(
              { possition: index, name: element, isActive: true }
            );
          } else{
            return this.columnShowHideList.push(
              { possition: index, name: element, isActive: false })
          }
          }) */
          if (this.displayedColumns.includes(element)) {
            return this.columnShowHideList.push(
              { possition: index, name: element, isActive: true }
            );
        } else {
          return this.columnShowHideList.push(
            { possition: index, name: element, isActive: false })
        }
      /* if (index <= 7) {
        return this.columnShowHideList.push(
          { possition: index, name: element, isActive: true }
        );
      } else (index > 8); {
        return this.columnShowHideList.push(
          { possition: index, name: element, isActive: false })

      } */
    });
    console.log(this.columnShowHideList)
    // 
  }
  /////////////////////////////
  downloadcharts() {
    var can = <HTMLCanvasElement>document.getElementById("page");
    var src: any = can.toDataURL("image/png");
    console.log(src)
  }
  savecharts() {
    // First we get our section to save from dom
    let section = document.querySelector('#capture');

    html2canvas(document.querySelector("#chartdivopen")).then(canvas => {
      let src: any = canvas.toDataURL("image/png");
      console.log(src)
    });
    html2canvas(document.querySelector("#chartdivnew")).then(canvas => {
      let src: any = canvas.toDataURL("image/png");
      console.log(src)
    });
    html2canvas(document.querySelector("#chartdivbar")).then(canvas => {
      let src: any = canvas.toDataURL("image/png");
      console.log(src)
      let data = src
      var image = new Image();
      image.src = "data:image/jpg;base64," + data.d;

      var w = window.open("");
      w.document.write(image.outerHTML);

    });
    html2canvas(document.querySelector("#getOpenCloseTrendStatus")).then(canvas => {
      let src: any = canvas.toDataURL("image/png");
      console.log(src)
    });
  }
  svgtobase() {
    let svgValue = document.querySelector("#chartdivbar").getElementsByTagName("svg")[0];
    var s = new XMLSerializer().serializeToString(svgValue)
    console.log(s)
    var encodedData = window.btoa(s);
    console.log("data:image/svg+xml;base64," + encodedData)
  }
  svgtobaseimg() {

    let myStringArray = ["#chartdivbar", "#chartdivpie", "#closeExposurepie", "#chartdivopen", "#chartdivnew", "#getOpenCloseTrendStatus", "#getIngredientSightingInfo", "#getNoloscritical", "#getNoloshigh"];
    let chartImage = []
    var arrayLength = myStringArray.length;
    let s: any;
    let encodedData: any;
    for (var i = 0; i < arrayLength; i++) {
      console.log(myStringArray[i]);
      let svgValue = document.querySelector(myStringArray[i]).getElementsByTagName("svg")[0];
      s = new XMLSerializer().serializeToString(svgValue)
      //console.log(s)
      encodedData = window.btoa(s);
      let encodedChart = "data:image/svg+xml;base64," + encodedData
      console.log("data:image/svg+xml;base64," + encodedData)

      chartImage[i] = "data:image/svg+xml;base64," + encodedData;

    }
  }
  svgtopng() {

    let myStringArray = ["#chartdivbar", "#chartdivpie", "#closeExposurepie", "#chartdivopen", "#chartdivnew", "#getOpenCloseTrendStatus", "#getIngredientSightingInfo", "#getNoloscritical", "#getNoloshigh"];
    let myChartvalue = ["ActiveCountChart", "ClosedCountChart", "TotalSightingChart", "DefectsvsIngredientsChart", "OpenCloseTrendChart", "OpenCloseChart", "IngredientsExposureChart", "CriticalChart", "HighChart"];

    let chartImage = [];
    var arrayLength = myStringArray.length;
    let s: any;
    let encodedData: any;
    let options = {
      excludeCss: true
    }
    for (var i = 0; i < arrayLength; i++) {
      //   
      console.log("value", myStringArray[i])
      let data = svg.svgAsPngUri(document.querySelector(myStringArray[i]).getElementsByTagName("svg")[0], options).then((value) => {
        if (value == !undefined) {
          chartImage.push(value)
        } else {
          console.log("not working")
          console.log(value)
          chartImage.push(value)
          if (chartImage.length == 9) {
            this.sendimgdata(chartImage);
            console.log("one time")
          }
        }
      }
      )
    }
    console.log("chart data url" + chartImage)
  }
  async loadarr() {
    if (this.chartImage.length == 1) {
      this.sendimgdata(this.chartImage);
    } else {
      console.log("not reached")
    }
  }
  sendimgdata(chartImage) {
     
    let myChartvalue = ["ActiveCountChart", "ClosedCountChart", "TotalSightingChart", "OpenCloseTrendChart", "DefectsvsIngredientsChart", "OpenCloseChart", "IngredientsExposureChart", "CriticalChart", "HighChart"];
    console.log(chartImage)
    console.log(chartImage.length == 8)
    var result = myChartvalue.reduce((acc, item, i) => {

      acc[item] = chartImage[i];

      return acc;
    }, {});
    console.log("result", result)
    var r = {};
    for (let i = 0; i < myChartvalue.length; i++) {
      r[myChartvalue[i]] = chartImage[i];

      if (myChartvalue[i] == "OpenCloseTrendChart") {
        if (this.dataOpenCloseTrendInfoCheck == true) {
          r[myChartvalue[i]] = "";
        }
      }
      if (myChartvalue[i] == "DefectsvsIngredientsChart") {
        if (this.defectsAndRegressionInfoCheck == true) {
          r[myChartvalue[i]] = "";
        }
      }
      if (myChartvalue[i] == "OpenCloseChart") {
        if (this.chartTypeOpenfilteredCheck == true) {
          r[myChartvalue[i]] = "";
        }
      }
      if (myChartvalue[i] == "IngredientsExposureChart") {
        if (this.getIngredientSightingInfoCheck == true) {
          r[myChartvalue[i]] = "";
        }
      }
      if (myChartvalue[i] == "CriticalChart") {
        if (this.getNoloscriticalCheck == true) {
          r[myChartvalue[i]] = "";
        }
      }
      if (myChartvalue[i] == "HighChart") {
        if (this.getNoloshighCheck == true) {
          r[myChartvalue[i]] = "";
        }
      }


    }

    console.log(JSON.stringify(r));
    let val = r
    let corVal = [Object.assign({}, ...this.sendCollist)]
    this.mail_value = {
      listOfIssuesStatus: corVal,
      platform: this.platform_name,
      topCount: this.No_of_keyIngredients,
      reportTitle: this.Title,
      reportName: this.report_name,
      target: this.qrc_by_target_list,
      mailTo: this.mailto,
      query: this.query_for_config_gen
    }
      
    let merged = { ...val, ...this.mail_value };
    console.log(merged)
    merged['status'] = this.flag.toString();
     
    this.apiService.SendEmailReport(merged).subscribe((res: any) => {
      console.log(res)
      if (res.isCompletedSuccessfully == true) {
        this.showNotification('success', 'Mail has been sent successfully');
        this.mailto = null;
      } else {
        this.showNotification('error', 'Send again');
        console.log("error")

      }
    })
    console.log(chartImage);
  }


  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log("not valid")
    }
    else {
      console.log("valid")
      this.dialogRef.closeAll();
      this.svgtopng();

    }
  }

  readMore(type, element, index) {
    console.log(type, element, index);
    console.log(this.Countobj[index]);
    // console.log(element.sysdebug_forum.length());
    // console.log((element['sysdebug_forum']).length());
    // let a = element.sysdebug_forum.length;
    // console.log(a);
    // console.log(element.sysdebug_forum);


    if (type == "Read More") {
      element["type"] = "Read Less";
      this.Countobj[index] = 5000;
    } else {
      element["type"] = "Read More";
      this.Countobj[index] = 150;
    }
    // console.log(index)
    // // this.countWords = 5000;
    // this.selctedIndex = index;

    // this.readMoreFlag = false;
    // this.readLessFlag = true;
  }
  StressReadMore(type, element, index) {
    console.log(type, element, index);
    console.log(this.Countobj[index]);
    if (type == "Read More") {
      element["type"] = "Read Less";
      this.Countobj2[index] = 5000;
    } else {
      element["type"] = "Read More";
      this.Countobj2[index] = 150;
    }
  }



  defaultcolumns() {
    this.apiService.getDataFilterList().subscribe((res: any) => {
      console.log(res)
      if (res) {

        this.defaultColumns = res.listOfIssuesColumn;
        this.initializeColumnProperties();

      }
    })
  }





  // readLess(index) {
  //  // this.countWords = 200;
  //  console.log(index)
  //  this.selctedIndex = index;
  //   this.Countobj[index] = 200;
  //   this.readMoreFlag = true;
  //   this.readLessFlag = false;
  // }


}

