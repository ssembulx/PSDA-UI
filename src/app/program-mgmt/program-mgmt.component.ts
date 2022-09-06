import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewEncapsulation, AfterViewInit, Pipe, ChangeDetectorRef, PipeTransform, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ActivatedRoute } from '@angular/router';
import { ServiceAPIService } from '../service-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { ModelpopupComponent } from '../modelpopup/modelpopup.component';
import { MatDialog } from '@angular/material/dialog';
import { EditdialogComponent } from '../dialog/edit/editdialog.component';
import { NotifierService } from 'angular-notifier';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { element } from 'protractor';
import { BehaviorSubject } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { MatSnackBar } from '@angular/material/snack-bar';
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

export class GameNode {
  children: BehaviorSubject<GameNode[]>;
  constructor(public item: string, children?: GameNode[]) {
    this.children = new BehaviorSubject(children === undefined ? [] : children);
  }
}

let TREE_DATA = [
  new GameNode('Simulation', [
    new GameNode('Factorio'),
    new GameNode('Oxygen not included'),
  ]),
  new GameNode('Indie', [
    new GameNode(`Don't Starve`, [
      new GameNode(`Region of Giants`),
      new GameNode(`Together`),
      new GameNode(`Shipwrecked`)
    ]),
    new GameNode('Terraria'),
    new GameNode('Starbound'),
    new GameNode('Dungeon of the Endless')
  ]),
  new GameNode('Action', [
    new GameNode('Overcooked')
  ]),
  new GameNode('Strategy', [
    new GameNode('Rise to ruins')
  ]),
  new GameNode('RPG', [
    new GameNode('Magicka', [
      new GameNode('Magicka 1'),
      new GameNode('Magicka 2')
    ])
  ])
];
@Component({
  selector: 'app-program-mgmt',
  templateUrl: './program-mgmt.component.html',
  styleUrls: ['./program-mgmt.component.css']
})
export class ProgramMgmtComponent implements OnInit, OnChanges {

  @Input() shortnamewithSKU;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChildren('checkBox') checkBox: QueryList<any>;
  dataSource1 = new MatTableDataSource();
  Intents = "Intents";
  Title = "COE Management/ Lead";
  getDomainHSDES: { platform: any; domain: any; type: string; };
  platform: string;
  getDomainWiseCounts: any = {};
  getDomainWiseHSDESInfo: any;
  master_checked: boolean = false;
  master_indeterminate: boolean = false;
  selection = new SelectionModel<any>(true, []);
  searchTerm: string;
  select_all = false;
  selectedTarget = [];
  public columnShowHideList: any = [];
  defaultColumns: string[] = ['selection_column', 'id', 'promoted_ID', 'title', 'status', 'exposure', 'domain', 'domain_debug', 'reason', 'sysdebug_forum', 'suspected_Ingredient',
    'count', 'target', 'progress', 'regression', 'priority', 'component', 'qrc_vector', 'days_open', 'tag', 'isolated', 'owner', 'next_step',
    'board', 'from_subject', 'submitted_by', 'ext_access', 'submitter_org', 'soc_stepping', 'target_impact',
    'impact', 'submitted_date', 'open_date', 'closed_date', 'closed_reason', 'repro_on_rvp', 'implemented_date', 'verified_date',
    'days_triage', 'days_decimal_triage', 'days_validating', 'days_development', 'days_decimal_debugging',
    'ingredient', 'updated_by', 'updated_date', 'reproducibility', 'customer_impact', 'customer_summary'];
  displayedColumns: string[] = ['selection_column', 'id', 'promoted_ID', 'title', 'status', 'exposure', 'domain', 'domain_debug', 'reason', 'sysdebug_forum', 'suspected_Ingredient', 'count'];
  downloadSelection1: any;
  editedRows: boolean[];
  isDomainSelectedAll = false;
  isStatusSelectedAll = false;
  isExposureSelectedAll = false;
  isDomainDebugSelectedAll = false;
  isTargetSelectedAll = false;
  isProgressSelectedAll = false;
  isQrcvectorSelectedAll = false;

  ddvlaue$: { statusList: { status: string; }[]; exposureList: { exposure: string; }[]; domainList: { domain: string; }[]; domainDebugList: { domainDebug: string; }[]; isSuccess: boolean; message: any; };
  OriginalData: any;
  domainDebugList: any;
  statusList: any;
  exposureList: any;
  domainList: any;
  targetList: any;
  progressList: any;
  qrcvectorList: any;

  columnFilter = {
    "status": "",
    "exposure": "",
    "domain": "",
    "domain_debug": "",
    "target": "",
    "progress": "",
    "qrc_vector": ""
  };

  openClosedData(value) {
    this.Intents = value;
    if (value == 'COE Management/ Lead') {
      this.Title = value;
      //  this.trendCharbydomain(this.trendChartByDomainInfo);
    }
    if (value == 'Program Management') {
      this.Title = "Program Management";
      /*    this.closedExposurePie(this.closedCountPercentages);
         this.exposureBarChat(this.daysCount);
         this.exposurePieChat(this.percentageInfo); */
    }
    if (value == 'Sysdebug') {
      this.Title = value;
      //   this.router.navigate(['home'], { queryParams: { platform: "ADL_P" } })
    }
  }
  shortName;
  /* change program */
  changeProgram(PId) {

    //shortName
    this.programList.forEach(element => {
      if (PId.platformGroupID == element.platformGroupID) {
        this.SKU = "SKU";
        this.program = element.platformName;
        this.shortName = PId.shortName;
        this.groupList = element.groupList;
      }
    });
  }

  /* change SKU */
  changeSKU(SKU) {
    this.SKU = SKU.skuName;
  }

  /* click Apply */
  dataView = false;
  status = "open,implemented,rejected,complete,future,verified";
  clickApply() {
    if (this.Intents != "Intents") {
      if (this.program == "Program") {
        this._snackBar.open("Please select program", "Done", {
          duration: 2000,
        });
      } else if (this.SKU == "SKU") {
        this._snackBar.open("Please select SKU", "Done", {
          duration: 2000,
        });
      } else {
        this.dataView = true;
        if (this.Intents == 'COE Management/ Lead') {
          //     this.trendCharbydomain(this.trendChartByDomainInfo);
          this.GetTrendChartByDomain();
          this.coeLeadcount(this.status);
        }
        if (this.Intents == 'Program Management') {
          this.Title = "Program Management";
          this.proManagement();
          /*      this.closedExposurePie(this.closedCountPercentages);
               this.exposureBarChat(this.daysCount);
               this.exposurePieChat(this.percentageInfo); */
        }
        if (this.Intents == 'Sysdebug') {
          this.router.navigate(['home'], { queryParams: { platform: this.shortName + "_" + this.SKU } })
        }
      }
    } else {
      this._snackBar.open("Please select Intent", "Done", {
        duration: 2000,
      });
    }
    this.apiSelectionDomainHSDES();
  }

  /* reset filter */
  reset() {
    this.Intents = "Intents";
    this.SKU = "SKU";
    this.program = "Program";
    this.dataView = false;
  }

  /* COE lead count */
  domainListOfIssuesInfo;
  domainListOfIssuesAllInfo;
  exposureInfo;
  totalRejectedSighting;
  open = true;
  implemented = true;
  verified = true;
  rejected = true;
  complete = true;
  future = true;
  all = true;
  changeCheckValue(id, value) {

    if (id == 'open' && value == false) {
      let temp = this.status.split(',');
      temp.forEach((d, index) => {
        if (id == d) {
          temp.splice(index, 1);
        }
      });
      this.status = temp.join(',');
      this.coeLeadcount(this.status);
      this.all = false;
    } else if (id == 'open' && value == true) {
      let temp = this.status.split(',');
      temp.push(id)
      this.status = temp.join(',');
      this.coeLeadcount(this.status);
      if (this.open == true && this.implemented == true && this.verified == true && this.rejected == true && this.complete == true && this.future == true) {
        this.all = true
      }
    } else if (id == 'implemented' && value == true) {
      let temp = this.status.split(',');
      temp.push(id)
      this.status = temp.join(',');
      this.coeLeadcount(this.status);
      if (this.open == true && this.implemented == true && this.verified == true && this.rejected == true && this.complete == true && this.future == true) {
        this.all = true
      }
    } else if (id == 'implemented' && value == false) {
      let temp = this.status.split(',');
      temp.forEach((d, index) => {
        if (id == d) {
          temp.splice(index, 1);
        }
      });
      this.status = temp.join(',');
      this.coeLeadcount(this.status);
      this.all = false;
    } else if (id == 'verified' && value == true) {
      let temp = this.status.split(',');
      temp.push(id)
      this.status = temp.join(',');
      this.coeLeadcount(this.status);
      if (this.open == true && this.implemented == true && this.verified == true && this.rejected == true && this.complete == true && this.future == true) {
        this.all = true
      }
    } else if (id == 'verified' && value == false) {
      let temp = this.status.split(',');
      temp.forEach((d, index) => {
        if (id == d) {
          temp.splice(index, 1);
        }
      });
      this.status = temp.join(',');
      this.coeLeadcount(this.status);
      this.all = false;
    } else if (id == 'rejected' && value == true) {
      let temp = this.status.split(',');
      temp.push(id)
      this.status = temp.join(',');
      this.coeLeadcount(this.status);
      if (this.open == true && this.implemented == true && this.verified == true && this.rejected == true && this.complete == true && this.future == true) {
        this.all = true
      }
    } else if (id == 'rejected' && value == false) {
      let temp = this.status.split(',');
      temp.forEach((d, index) => {
        if (id == d) {
          temp.splice(index, 1);
        }
      });
      this.status = temp.join(',');
      this.coeLeadcount(this.status);
      this.all = false;
    } else if (id == 'complete' && value == true) {
      let temp = this.status.split(',');
      temp.push(id)
      this.status = temp.join(',');
      this.coeLeadcount(this.status);
      if (this.open == true && this.implemented == true && this.verified == true && this.rejected == true && this.complete == true && this.future == true) {
        this.all = true
      }
    } else if (id == 'complete' && value == false) {
      let temp = this.status.split(',');
      temp.forEach((d, index) => {
        if (id == d) {
          temp.splice(index, 1);
        }
      });
      this.status = temp.join(',');
      this.coeLeadcount(this.status);
      this.all = false;
    } else if (id == 'future' && value == true) {
      let temp = this.status.split(',');
      temp.push(id)
      this.status = temp.join(',');
      this.coeLeadcount(this.status);
      if (this.open == true && this.implemented == true && this.verified == true && this.rejected == true && this.complete == true && this.future == true) {
        this.all = true
      }
    } else if (id == 'future' && value == false) {
      let temp = this.status.split(',');
      temp.forEach((d, index) => {
        if (id == d) {
          temp.splice(index, 1);
        }
      });
      this.status = temp.join(',');
      this.coeLeadcount(this.status);
      this.all = false;
    } else if (id == 'all' && value == true) {
      this.open = true;
      this.implemented = true;
      this.verified = true;
      this.rejected = true;
      this.complete = true;
      this.future = true;
      this.all = true;
      this.coeLeadcount("open,implemented,rejected,complete,future,verified");
    }
    else if (id == 'all' && value == false) {
      this.open = false;
      this.implemented = false;
      this.verified = false;
      this.rejected = false;
      this.complete = false;
      this.future = false;
      this.all = false;
      this.domainListOfIssuesAllInfo = 0;
    }

  }
  coeLeadcount(status) {
    let obj = {
      "platform": this.shortName + "_" + this.SKU,
      "status": status

    }
    this.apiService.getCOELeadcount(obj).subscribe((res: any) => {

      this.domainListOfIssuesInfo = res.domainListOfIssuesInfo[0].count;
      this.domainListOfIssuesAllInfo = res.domainListOfIssuesAllInfo[0].count;
      this.exposureInfo = res.exposureInfo;
      this.totalRejectedSighting = res.totalRejectedSighting[0].count;
    })
  }

  trendChartByDomainInfo;
  GetTrendChartByDomain() {
    let obj = {
      "platform": this.shortName + "_" + this.SKU,
      "ChartType": "week",
      "domain": "all"
    }
    this.apiService.GetTrendChartByDomain(obj).subscribe((res: any) => {
      this.trendChartByDomainInfo = res.trendChartByDomainInfo;
      this.trendCharbydomain(this.trendChartByDomainInfo);
      /*  console.log(this.domainList1)
       this.domainList1.forEach(element => {
         this.preSelectedList.push(element.domain);
       }); */
    })
  }
  Payload;
  totalPayload;
  ngOnChanges(changes: SimpleChanges) {

    for (let propName in changes) {
      let chng = changes[propName];
      if (chng.previousValue != "undefined_SKU" || chng.previousValue != undefined) {
        this.proManagement();
        this.onValChangecall();
      }
    }
  }
  backlog;
  sightingAging;
  defectProspect;
  sightingDomains;
  dataCriticalFunctional;
  dataHighFunctional;
  dataCriticalNonFunctional;
  dataHighNonFunctional;
  text = "Open : Critical : Functional: "
  text1 = ", Non-Functional : "
  text2 = " High : Functional: "
  text3 = ", Non-Functional : "
  text4 = ""
  proManagement() {

    this.Payload = {
      "platform": this.shortnamewithSKU,
      "ChartNo": "1",
      "Filter": "",
      "status": "open,implemented,verified"
    }
    this.totalPayload = {
      "platform": this.shortnamewithSKU
    }
    let payloadCriticalFunctional = {
      "platform": this.shortnamewithSKU,
      "QRCVector": "Ingredient",
      "DefectFactor": "Functional",
      "Type": "",
      "Exposure": "1-critical "
    }
    let payloadHighFunctional = {
      "platform": this.shortnamewithSKU,
      "QRCVector": "Ingredient",
      "DefectFactor": "Functional",
      "Type": "",
      "Exposure": "2-high"
    }
    let payloadCriticalNonFunctional =
    {
      "platform": this.shortnamewithSKU,
      "QRCVector": "WSSDebug",
      "DefectFactor": "",
      "Type": "TotalRow",
      "Exposure": "1-critical"
    }
    let payloadHighNonFunctional = {

      "platform": this.shortnamewithSKU,

      "QRCVector": "WSSDebug",

      "DefectFactor": "",

      "Type": "TotalRow",

      "Exposure": "2-High"

    }
    this.apiService.getCriticalDefectVector(payloadCriticalFunctional).subscribe((res: any) => {

      this.dataCriticalFunctional = res.criticalHighFuncInfo[0].total;
    })
    this.apiService.getCriticalDefectVector(payloadHighFunctional).subscribe((res: any) => {

      this.dataHighFunctional = res.criticalHighFuncInfo[0].total;
    })
    this.apiService.getCriticalQRCvectorHSDESResult(payloadCriticalNonFunctional).subscribe((res: any) => {

      this.dataCriticalNonFunctional = res.getCriticalHigh[0].total;
    })
    this.apiService.getCriticalQRCvectorHSDESResult(payloadHighNonFunctional).subscribe((res: any) => {

      this.dataHighNonFunctional = res.getCriticalHigh[0].total;
    })
    this.apiService.GetProgramSummary(this.totalPayload).subscribe((res: any) => {

      this.backlog = res.backlog[0].count;
      this.sightingAging = res.sightingAging;
      this.defectProspect = res.defectProspect;
      this.sightingDomains = res.sightingDomains;
    })
    this.apiService.getActiveCount(this.Payload).subscribe((res: any) => {

      this.activeCount = res.activeCount[0].activeCount;
      this.exposureCount = res.exposureCount;
      this.daysCount = res.daysCount;
      this.percentageInfo = res.percentageInfo;
      this.exposureBarChat(res.daysStatusCount);
      this.exposurePieChat(this.percentageInfo);
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
  }

  highQRCDefect: { platform: any; QRCVector: string; DefectFactor: string; Type: string; Exposure: string; };
  criticalQRCDefect: { platform: any; QRCVector: string; DefectFactor: string; Type: string; Exposure: string; };
  criticalQRC: { platform: any; QRCVector: string; DefectFactor: string; Type: string; Exposure: string; };
  highQRC: { platform: any; QRCVector: string; DefectFactor: string; Type: string; Exposure: string; };
  getCriticalQRCvectorData1: any;
  onValChangecall() {
    this.criticalQRCDefect =
    {
      "platform": this.shortnamewithSKU,
      "QRCVector": "Ingredient",
      "DefectFactor": "Functional",
      "Type": "",
      "Exposure": "1-critical"
    }

    this.highQRCDefect =
    {
      "platform": this.shortnamewithSKU,
      "QRCVector": "Ingredient",
      "DefectFactor": "Functional",
      "Type": "",
      "Exposure": "2-high"
    }
    this.highQRC =
    {
      "platform": this.shortnamewithSKU,
      "QRCVector": 'WSSDebug',
      "DefectFactor": '',
      "Type": 'TotalRow',
      "Exposure": "2-high"
    }
    this.criticalQRC =
    {
      "platform": this.shortnamewithSKU,
      "QRCVector": 'WSSDebug',
      "DefectFactor": '',
      "Type": 'TotalRow',
      "Exposure": "1-critical"
    }
    this.apiService.getCriticalQRCvector(this.criticalQRC).subscribe((res: any) => {
      console.log(res.getCriticalQRCvector)
      this.getCriticalQRCvectorData = res.getCriticalQRCvector;
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
    })

    this.apiService.getHighDefectVector(this.highQRCDefect).subscribe((res: any) => {
      console.log(res.getFunctionalDefectsvector)
      this.getHighDefectsvector = res.getFunctionalDefectsvector;
    })


  }
  percentageInfo = [{ "names": 'siv', "percentage": '84.97' },
  { "names": 'Other', "percentage": '15.03' }];
  daysCount = [{ "daysRange": '0-5', "daysCount": '310' },
  { "daysRange": '5-15', "daysCount": '363' },
  { "daysRange": '15-30', "daysCount": '445' },
  { "daysRange": '30-50', "daysCount": '411' },
  { "daysRange": '50-100', "daysCount": '549' },
  { "daysRange": '100-200', "daysCount": '375' },
  { "daysRange": '>200', "daysCount": '210' }];
  closedCountPercentages = [{ "names": 'SIV', "percentage": '85.55' },
  { "names": 'Other', "percentage": '14.45' }];

  txt = "Open: Critical:<functional: , Non-Functional:  >       high:<Functional: , Non-Functional: >   Total: Backlog %   sighting Aging:"
  txt1 = "Defect prospect: GFX:4, uCode:5, BIOS:6, DekelPHY, RST  <Ordered list based on open promoted HSDs>";
  txt2 = "Sightings domains: PM, Graphics, Audio, PnP, Storage  <Ordered list of open sightings> ";
  txt31 = "Next planned milestone:";
  txtB = " Name-Milestone (ex:Alpha, beta, PV, Cons PV etc) ";
  txt32 = "<on hovering on this link provide chart of criteria for each milestone> ";
  platformList: any = [];
  selectedPlatform: any;

  //PlatformName: any;
  id: any;
  timeList: any[];
  preSelectedList = ['all'];
  exposure: any;
  domain: any;
  chartdetails: { platform: any; COUNTTYPE: any; CHARTDATE: any; CHARTTYPE: any; exposure: any };
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
  getHighQRCvector = [
    {
      "qrc_vector": "Functional",
      "ingrediant": "0",
      "wssDebug": "0",
      "verified_on_eng_OWR": "0",
      "implemented_BKC": "0",
      "total": "0"
    },
    {
      "qrc_vector": "Power Management",
      "ingrediant": "0",
      "wssDebug": "0",
      "verified_on_eng_OWR": "0",
      "implemented_BKC": "0",
      "total": "0"
    },
    {
      "qrc_vector": "Pre-checks",
      "ingrediant": "0",
      "wssDebug": "0",
      "verified_on_eng_OWR": "0",
      "implemented_BKC": "0",
      "total": "0"
    },
    {
      "qrc_vector": "Reproduce on RVP",
      "ingrediant": "0",
      "wssDebug": "0",
      "verified_on_eng_OWR": "0",
      "implemented_BKC": "0",
      "total": "0"
    },
    {
      "qrc_vector": "Total",
      "ingrediant": "0",
      "wssDebug": "0",
      "verified_on_eng_OWR": "0",
      "implemented_BKC": "0",
      "total": "0"
    }
  ];
  getCriticalQRCvectorData = [
    {
      "qrc_vector": "Customer_must_fix",
      "ingrediant": "0",
      "wssDebug": "0",
      "verified_on_eng_OWR": "0",
      "implemented_BKC": "0",
      "total": "0",
      "los": "0"
    },
    {
      "qrc_vector": "Defect/Bugs(Functional) + Validation + Power_management",
      "ingrediant": "0",
      "wssDebug": "0",
      "verified_on_eng_OWR": "0",
      "implemented_BKC": "0",
      "total": "0",
      "los": "0"
    },
    {
      "qrc_vector": "DPMO/DPMT",
      "ingrediant": "0",
      "wssDebug": "0",
      "verified_on_eng_OWR": "0",
      "implemented_BKC": "0",
      "total": "0",
      "los": "0"
    },
    {
      "qrc_vector": "HLK",
      "ingrediant": "0",
      "wssDebug": "0",
      "verified_on_eng_OWR": "0",
      "implemented_BKC": "0",
      "total": "0",
      "los": "0"
    },
    {
      "qrc_vector": "Others",
      "ingrediant": "0",
      "wssDebug": "0",
      "verified_on_eng_OWR": "0",
      "implemented_BKC": "0",
      "total": "0",
      "los": "0"
    },
    {
      "qrc_vector": "PnP",
      "ingrediant": "0",
      "wssDebug": "0",
      "verified_on_eng_OWR": "0",
      "implemented_BKC": "0",
      "total": "0",
      "los": "0"
    },
    {
      "qrc_vector": "Prechecks+Requiremnt",
      "ingrediant": "0",
      "wssDebug": "0",
      "verified_on_eng_OWR": "0",
      "implemented_BKC": "0",
      "total": "0",
      "los": "0"
    },
    {
      "qrc_vector": "Total",
      "ingrediant": "0",
      "wssDebug": "0",
      "verified_on_eng_OWR": "0",
      "implemented_BKC": "0",
      "total": "0",
      "los": "0"
    }
  ];

  getCriticalDefectsvector = [
    {
      "qrc_vector": "Functional",
      "ingrediant": "0",
      "wssDebug": "0",
      "verified_on_eng_OWR": "0",
      "implemented_BKC": "0",
      "total": "0"
    },
    {
      "qrc_vector": "Power Management",
      "ingrediant": "0",
      "wssDebug": "0",
      "verified_on_eng_OWR": "0",
      "implemented_BKC": "0",
      "total": "0"
    },
    {
      "qrc_vector": "Pre-checks",
      "ingrediant": "0",
      "wssDebug": "0",
      "verified_on_eng_OWR": "0",
      "implemented_BKC": "0",
      "total": "0"
    },
    {
      "qrc_vector": "Reproduce on RVP",
      "ingrediant": "0",
      "wssDebug": "0",
      "verified_on_eng_OWR": "0",
      "implemented_BKC": "0",
      "total": "0"
    },
    {
      "qrc_vector": "Total",
      "ingrediant": "0",
      "wssDebug": "0",
      "verified_on_eng_OWR": "0",
      "implemented_BKC": "0",
      "total": "0"
    }
  ];
  getFunctionalDefectsCount = [
    {
      "numerator": "0",
      "denominator": "0"
    }
  ];

  getHighDefectsvector = [
    {
      "qrc_vector": "Functional",
      "ingrediant": "0",
      "wssDebug": "0",
      "verified_on_eng_OWR": "0",
      "implemented_BKC": "0",
      "total": "0"
    },
    {
      "qrc_vector": "Power Management",
      "ingrediant": "0",
      "wssDebug": "0",
      "verified_on_eng_OWR": "0",
      "implemented_BKC": "0",
      "total": "0"
    },
    {
      "qrc_vector": "Pre-checks",
      "ingrediant": "0",
      "wssDebug": "0",
      "verified_on_eng_OWR": "0",
      "implemented_BKC": "0",
      "total": "0"
    },
    {
      "qrc_vector": "Reproduce on RVP",
      "ingrediant": "0",
      "wssDebug": "0",
      "verified_on_eng_OWR": "0",
      "implemented_BKC": "0",
      "total": "0"
    },
    {
      "qrc_vector": "Total",
      "ingrediant": "0",
      "wssDebug": "0",
      "verified_on_eng_OWR": "0",
      "implemented_BKC": "0",
      "total": "0"
    }
  ];
  constructor(private changeDetectorRef: ChangeDetectorRef, public router: Router, private apiService: ServiceAPIService, private aRouter: ActivatedRoute, private dialogRef: MatDialog, private notifier: NotifierService, private _snackBar: MatSnackBar) {
    this.notifier = notifier;

    //Platform Starts
    this.treeFlattener = new MatTreeFlattener(this.transformerPlatform, this.getLevelPlatform,
      this.isExpandablePlatform, this.getChildrenPlatform);
    this.treeControl = new FlatTreeControl<GameNode>(
      this.getLevelPlatform, this.isExpandablePlatform);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    // this.dataSource= new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    // this.getPlatformData();
    this.dataSource.data = TREE_DATA;

    //Ends
    this.selectedValToggleGroup = 'Active';
  }

  ngAfterViewInit() {
    this.dataSource1.paginator = this.paginator;
    this.dataSource1.sort = this.sort;
  }

  public bankMultiCtrl1: FormControl = new FormControl();
  groupDomainPlaceholderTxt = "Group Domain";
  isSelectedAllGroupDomain = false;
  selectedGroupDomain = "Group Domain";
  //checklistSelection = new SelectionModel<GameNode>(true /* multiple */);
  levels = new Map<GameNode, number>();
  levelsPlatform = new Map<GameNode, number>();
  treeControl: FlatTreeControl<GameNode>;

  treeFlattener: MatTreeFlattener<GameNode, GameNode>;

  dataSource: MatTreeFlatDataSource<GameNode, GameNode>;
  groupDomainList = [
    {
      "coeGroupId": 1,
      "coeGroup": "Comms COE",
      "coeGroupList": [
        {
          "domainId": 1,
          "domainName": "cellular_modem"
        },
        {
          "domainId": 2,
          "domainName": "connectivity"
        },
        {
          "domainId": 3,
          "domainName": "connectivity.bluetooth"
        },
        {
          "domainId": 4,
          "domainName": "connectivity.location"
        },
        {
          "domainId": 5,
          "domainName": "networking.ethernet_cntrl"
        }
      ]
    },
    {
      "coeGroupId": 2,
      "coeGroup": "Graphics and Multimedia COE",
      "coeGroupList": [
        {
          "domainId": 1,
          "domainName": "audio"
        },
        {
          "domainId": 2,
          "domainName": "display"
        },
        {
          "domainId": 3,
          "domainName": "display.wireless_display"
        },
        {
          "domainId": 4,
          "domainName": "graphics"
        },
        {
          "domainId": 5,
          "domainName": "imaging"
        },
        {
          "domainId": 6,
          "domainName": "media"
        }
      ]
    },
    {
      "coeGroupId": 3,
      "coeGroup": "HLK COE",
      "coeGroupList": [
        {
          "domainId": 1,
          "domainName": "regulatory"
        }
      ]
    },
    {
      "coeGroupId": 4,
      "coeGroup": "I/O COE",
      "coeGroupList": [
        {
          "domainId": 1,
          "domainName": "connectivity.wifi"
        },
        {
          "domainId": 2,
          "domainName": "connectivity.wigig"
        },
        {
          "domainId": 3,
          "domainName": "human_input"
        },
        {
          "domainId": 4,
          "domainName": "io.ethernet"
        },
        {
          "domainId": 5,
          "domainName": "io_general"
        },
        {
          "domainId": 6,
          "domainName": "io_pcie"
        },
        {
          "domainId": 7,
          "domainName": "io_usb"
        },
        {
          "domainId": 8,
          "domainName": "io_usb.thunderbolt"
        },
        {
          "domainId": 9,
          "domainName": "sensor"
        },
        {
          "domainId": 10,
          "domainName": "storage"
        }
      ]
    },
    {
      "coeGroupId": 5,
      "coeGroup": "Power and Performance COE",
      "coeGroupList": [
        {
          "domainId": 1,
          "domainName": "power_and_perf"
        },
        {
          "domainId": 2,
          "domainName": "power_management.consumption"
        },
        {
          "domainId": 3,
          "domainName": "power_management.modern_standby"
        }
      ]
    },
    {
      "coeGroupId": 6,
      "coeGroup": "Power Management COE",
      "coeGroupList": [
        {
          "domainId": 1,
          "domainName": "power_management"
        },
        {
          "domainId": 2,
          "domainName": "power_management.battery"
        },
        {
          "domainId": 3,
          "domainName": "power_management.power_delivery"
        },
        {
          "domainId": 4,
          "domainName": "thermal_management"
        }
      ]
    },
    {
      "coeGroupId": 7,
      "coeGroup": "Product Security and Emerging Technologies COE",
      "coeGroupList": [
        {
          "domainId": 1,
          "domainName": "artificial_intelligence.computer_vision"
        },
        {
          "domainId": 2,
          "domainName": "artificial_intelligence.machine_learning"
        },
        {
          "domainId": 3,
          "domainName": "coexistence"
        },
        {
          "domainId": 4,
          "domainName": "content_protection"
        },
        {
          "domainId": 5,
          "domainName": "debug"
        },
        {
          "domainId": 6,
          "domainName": "flashing_sw_update"
        },
        {
          "domainId": 7,
          "domainName": "manageability"
        },
        {
          "domainId": 8,
          "domainName": "operating_system"
        },
        {
          "domainId": 9,
          "domainName": "overclocking"
        },
        {
          "domainId": 10,
          "domainName": "processor_core"
        },
        {
          "domainId": 11,
          "domainName": "security"
        }
      ]
    },
    {
      "coeGroupId": 8,
      "coeGroup": "Uncategorized",
      "coeGroupList": [
        {
          "domainId": 1,
          "domainName": "uncategorized"
        }
      ]
    },
    {
      "coeGroupId": 9,
      "coeGroup": "Unclassified",
      "coeGroupList": [
        {
          "domainId": 1,
          "domainName": "memory"
        },
        {
          "domainId": 2,
          "domainName": "unclassified"
        }
      ]
    },
    {
      "coeGroupId": 10,
      "coeGroup": "UnMapped",
      "coeGroupList": [
        {
          "domainId": 1,
          "domainName": "clock"
        },
        {
          "domainId": 2,
          "domainName": "customer_ev"
        },
        {
          "domainId": 3,
          "domainName": "mechanical"
        },
        {
          "domainId": 4,
          "domainName": "package"
        },
        {
          "domainId": 5,
          "domainName": "reset"
        },
        {
          "domainId": 6,
          "domainName": "telemetry"
        },
        {
          "domainId": 7,
          "domainName": "virtualization"
        }
      ]
    }
  ];

  master_change(e: any): void {
    for (let value of Object.values(this.getDomainWiseCounts)) {
      value["checked"] = this.master_checked;
    }
    console.log(this.getDomainWiseCounts)
    this.callapi();
  }


  list_change() {
    let checked_count = 0;
    //Get total checked items
    for (let value of Object.values(this.getDomainWiseCounts)) {
      if (value["checked"])
        checked_count++;
    }

    if (checked_count > 0 && checked_count < this.getDomainWiseCounts.length) {
      // If some checkboxes are checked but not all; then set Indeterminate state of the master to true.
      this.master_indeterminate = true;
    } else if (checked_count == this.getDomainWiseCounts.length) {
      //If checked count is equal to total items; then check the master checkbox and also set Indeterminate state to false.
      this.master_indeterminate = false;
      this.master_checked = true;
    } else {
      //If none of the checkboxes in the list is checked then uncheck master also set Indeterminate to false.
      this.master_indeterminate = false;
      this.master_checked = false;
    }
    console.log(this.getDomainWiseCounts)
    this.callapi();
  }

  callapi() {
    let array = this.getDomainWiseCounts
    let currenttarget = []
    for (let step = 0; step < array.length; step++) {
      if (array[step].checked == true) {
        currenttarget.push(array[step].domain)
      }
    }
    let stringValue = currenttarget.join(",")
    console.log(stringValue)
    //this.apiCallTargetData(stringValue)
    if (stringValue == "") {
      this.selection.clear();

    }
    this.selection.clear();
    this.apiDomainHSDES(stringValue)
  }
  apiDomainHSDES(countData: any) {

    this.getDomainHSDES = {
      "platform": this.shortName + "_" + this.SKU,
      "domain": countData,
      "type": "domain"
    }

    this.apiService.getDomainWiseCountHSDES(this.getDomainHSDES).subscribe((res: any) => {
      //this.getDomainWiseCounts = res.getDomainWiseCounts;
      this.getDomainWiseHSDESInfo = res.getDomainWiseHSDESInfo;

      this.dataSource1.data = this.getDomainWiseHSDESInfo;
      this.OriginalData = this.getDomainWiseHSDESInfo
      this.masterToggle()
      // console.log(this.getDomainWiseCounts)
      // console.log(this.getDomainWiseHSDESInfo)
    })

  }
  apiSelectionDomainHSDES() {

    this.getDomainHSDES = {
      "platform": this.shortName + "_" + this.SKU,
      "domain": "connectivity",
      "type": "domain"
    }

    this.apiService.getDomainWiseCountHSDES(this.getDomainHSDES).subscribe((res: any) => {
      this.getDomainWiseCounts = res.getDomainWiseCounts;

      this.masterToggle()
      // console.log(this.getDomainWiseCounts)
      // console.log(this.getDomainWiseHSDESInfo)
    })

  }




  //selectall for table
  selectTargetData(event, domain) {
    this.selection.clear();
    if (event.checked) {
      if (!this.selectedTarget.includes(domain)) {
        this.selectedTarget.push(domain)
      }
    } else {
      let index = this.selectedTarget.indexOf(domain)
      if (index > -1) {
        this.selectedTarget.splice(index, 1)
      }
    }
    this.apiDomainHSDES(this.selectedTarget.join(","));

  }

  exportexcel(): void {
    if (this.selection.selected.length > 0) {
      console.log(this.selection.selected)
      let headerNames = [];
      const workBook = new Workbook();
      const workSheet = workBook.addWorksheet('HSDES');
      Array.from(document.getElementById('excel-table').getElementsByTagName('th')).forEach((d, i) => {
        if (i != 0) {
          headerNames.push(d.innerText)
        }
      }

      )
      const HeaderRowOutlet = workSheet.addRow(headerNames);
      console.log(headerNames.length)
      HeaderRowOutlet.eachCell((cell, index) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'cecece' },
          bgColor: { argb: 'FF0000FF' },
        };
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        cell.font = { size: 12, bold: true };
        cell.alignment = { vertical: 'bottom', horizontal: 'center' };
        workSheet.getColumn(index).width = headerNames[index - 1].length < 20 ? 20 : headerNames.length[index - 1];
      });
      let tArray = []
      let tableHeader = [
        {
          label: "ID",
          property: "id"
        }, {
          label: "Promoted ID",
          property: "promoted_ID"
        }, {
          label: "Title",
          property: "title"
        }, {
          label: "Status",
          property: "status"
        }, {
          label: "Exposure",
          property: "exposure"
        }, {
          label: "Domain",
          property: "domain"
        }, {
          label: "Domain_debug",
          property: "domain_debug"
        }, {
          label: "Reason",
          property: "reason"
        }, {
          label: "Sysdebug_forum",
          property: "sysdebug_forum"
        }, {
          label: "Suspected Ingredient",
          property: "suspected_Ingredient"
        }, {
          label: "Count",
          property: "count"
        }, {
          label: "Target",
          property: "target"
        }, {
          label: "Progress",
          property: "progress"
        }, {
          label: "Regression",
          property: "regression"
        }, {
          label: "Priority",
          property: "priority"
        }, {
          label: "Component",
          property: "component"
        }, {
          label: "Qrc_vector",
          property: "qrc_vector"
        }, {
          label: "Days_open",
          property: "days_open"
        }, {
          label: "Tag",
          property: "tag"
        }, {
          label: "Isolated",
          property: "isolated"
        }, {
          label: "Owner",
          property: "owner"
        }, {
          label: "Next_step",
          property: "next_step"
        }, {
          label: "Board",
          property: "board"
        }, {
          label: "From_subject",
          property: "from_subject"
        }, {
          label: "Submitted_by",
          property: "submitted_by"
        }, {
          label: "Ext_access",
          property: "ext_access"
        }, {
          label: "Submitter_org",
          property: "submitter_org"
        }, {
          label: "Soc_stepping",
          property: "soc_stepping"
        }, {
          label: "Target_impact",
          property: "target_impact"
        }, {
          label: "Impact",
          property: "impact"
        }, {
          label: "Submitted_date",
          property: "submitted_date"
        }, {
          label: "Open_date",
          property: "open_date"
        }, {
          label: "Closed_date",
          property: "closed_date"
        }, {
          label: "Closed_reason",
          property: "closed_reason"
        }, {
          label: "Repro_on_rvp",
          property: "repro_on_rvp"
        }, {
          label: "Implemented_date",
          property: "implemented_date"
        }, {
          label: "Verified_date",
          property: "verified_date"
        }, {
          label: "Days_triage",
          property: "days_triage"
        }, {
          label: "Days_decimal_triage",
          property: "days_decimal_triage"
        }, {
          label: "Days_validating",
          property: "days_validating"
        }, {
          label: "Days_development",
          property: "days_development"
        }, {
          label: "Days_decimal_debugging",
          property: "days_decimal_debugging"
        }, {
          label: "Ingredient",
          property: "ingredient"
        }, {
          label: "updated_by",
          property: "updated_by"
        }, {
          label: "updated_date",
          property: "updated_date"
        }, {
          label: "reproducibility",
          property: "reproducibility"
        }, {
          label: "customer_impact",
          property: "customer_impact"
        }, {
          label: "customer_summary",
          property: "customer_summary"
        }];
      let finalList = [];
      tableHeader.forEach(element => {
        headerNames.forEach(ele => {
          if (element.label == ele.trim()) {
            finalList.push(element.property);
          }
        });
      });
      this.selection.selected.forEach(element => {
        let subArray = [];
        finalList.forEach(ele => {
          subArray.push(element[ele]);
        });
        tArray.push(subArray)
      });
      tArray.forEach(d => {
        let TableDataOutlet = workSheet.addRow(d);
        TableDataOutlet.eachCell((cell, index) => {
          cell.alignment = { vertical: 'bottom', horizontal: 'left' };
          workSheet.columns.forEach(function (column) {
            var dataMax = 0;
            column.width = dataMax < 20 ? 20 : dataMax;
          });
        });
      })
      var printArray = function (tArray) {
        if (tArray instanceof Array) {
          for (var i = 0; i < tArray.length; i++) {
            printArray(tArray[i][0]);
            workSheet.getCell('A' + [i + 2]).value = {
              text: tArray[i][0],
              hyperlink: 'https://hsdes.intel.com/appstore/article/#/' + tArray[i][0]
            };
            workSheet.getCell('A' + [i + 2]).style = { font: { name: 'Arial Black', underline: 'double', color: { 'argb': '3366FF' } } }
            workSheet.getCell('A' + [i + 2]).alignment = { vertical: 'bottom', horizontal: 'center' };
            workSheet.getCell('C' + [i + 2]).alignment = { vertical: 'bottom', horizontal: 'left' };
            console.log('A' + [i + 2])
          }
        }
        else console.log('listarray : ' + tArray);

      }
      printArray(tArray);
      var printArray2 = function (tArray) {
        if (tArray instanceof Array) {
          for (var i = 0; i < tArray.length; i++) {
            if (tArray[i][1].length > 0) {
              printArray(tArray[i][1]);
              workSheet.getCell('B' + [i + 2]).value = {
                text: tArray[i][1],
                hyperlink: 'https://hsdes.intel.com/appstore/article/#/' + tArray[i][1]
              };
              workSheet.getCell('B' + [i + 2]).style = { font: { name: 'Arial Black', underline: 'double', color: { 'argb': '3366FF' } } }
              workSheet.getCell('B' + [i + 2]).alignment = { vertical: 'bottom', horizontal: 'center' };
              workSheet.getCell('C' + [i + 2]).alignment = { vertical: 'bottom', horizontal: 'left' };
              console.log('B' + [i + 2])
            }
            else {
              console.log(tArray[i][1])
              workSheet.getCell('B' + [i + 2]).value = {
                text: " ",
                hyperlink: " ",
              };
            }

          }
        }
        else console.log('listarray : ' + typeof tArray);

      }
      printArray2(tArray)
      workBook.xlsx.writeBuffer().then(data => {
        let blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        saveAs(blob, 'HSDES.xlsx');
      })
    } else {
      this.dialogRef.open(ModelpopupComponent)
    }
  }

  //Table selection 
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    this.downloadSelection1 = (this.selection.selected).length || 0;
    const numRows = this.dataSource1.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    //this.selection.select(...this.dataSource.data);
    this.dataSource1.data.forEach((row: any) => this.selection.select(row))

  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  //applying filter 
  applyTagFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.data = this.OriginalData.filter(item => item['tag'].trim().toLowerCase().includes(filterValue.trim().toLowerCase()))
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }



  onSelectAll(e: any): void {
    this.removeAll();
    for (let i = 0; i < this.columnShowHideList.length; i++) {
      const item = this.columnShowHideList[i];
      item.isActive = e;
    }
    console.log(this.columnShowHideList)
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
    this.defaultColumns.forEach((element, index) => {
      if (index <= 11) {
        return this.columnShowHideList.push(
          { possition: index, name: element, isActive: true }
        );
      } else (index > 12); {
        return this.columnShowHideList.push(
          { possition: index, name: element, isActive: false })

      }
    });
  }

  toggleColumn(column) {
    if (column.isActive) {
      if (column.possition > this.displayedColumns.length - 1) {
        this.displayedColumns.push(column.name);
      } else {
        this.displayedColumns.splice(column.possition, 0, column.name);
      }
    } else {
      let i = this.displayedColumns.indexOf(column.name);
      let opr = i > -1 ? this.displayedColumns.splice(i, 1) : undefined;
    }
  }

  iscolSelected(column) {
    if (column.isActive == false) {
      this.select_all = false;
    }
  }
  checked = [];
  getCheckbox(checkbox) {
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

  fullScreenFlag4 = false;
  getfullScreen4() {
    this.fullScreenFlag4 = !this.fullScreenFlag4
  }

  updateSearch(e) {
    this.searchTerm = e.target.value
  }

  startEdit(id, promoted_ID, title, status, exposure, domain, domain_debug, reason, sysdebug_forum, count, suspected_Ingredient, target, progress, isolated,
    priority, component, owner, days_open, board, regression, from_subject, submitted_by, ext_access, submitter_org, soc_stepping, target_impact, impact, submitted_date, closed_date,
    closed_reason, repro_on_rvp, open_date, sysdebug, implemented_date, verified_date, days_triage, qrc_vector, days_decimal_triage, days_validating, days_development, days_decimal_debugging, tag, ingredient, next_step) {
    // this.id = id;
    // // index row is used just for debugging proposes and can be removed
    // this.index = i;
    console.log(id);
    console.log(promoted_ID);
    const dialogRef = this.dialogRef.open(EditdialogComponent, {
      //   data: {id: id}
      data: {
        id: id, promoted_ID: promoted_ID, title: title, status: status, exposure: exposure, domain: domain, domain_debug: domain_debug, reason: reason, sysdebug_forum: sysdebug_forum, count: count, suspected_Ingredient: suspected_Ingredient, target: target, progress: progress, isolated: isolated,
        priority: priority, component: component, owner: owner, days_open: days_open, board: board, regression: regression, from_subject: from_subject, submitted_by: submitted_by, ext_access: ext_access, submitter_org: submitter_org, soc_stepping: soc_stepping, target_impact: target_impact, impact: impact, submitted_date: submitted_date, closed_date: closed_date,
        closed_reason: closed_reason, repro_on_rvp: repro_on_rvp, open_date: open_date, sysdebug: sysdebug, implemented_date: implemented_date, verified_date: verified_date, days_triage: days_triage, qrc_vector: qrc_vector, days_decimal_triage: days_decimal_triage, days_validating: days_validating, days_development: days_development, days_decimal_debugging: days_decimal_debugging, tag: tag, ingredient: ingredient, next_step: next_step, platform: this.platform
      },
      height: 'auto',
      width: '80vw',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      //window.alert("closed");
      console.log("dialog closed")
      //this.showNotification( 'success', 'HSDES data has been update successfully' );
      // window.location.reload();
      // this.refreshTable();
      this.masterToggle();
      this.isAllSelected();
      this.list_change();
    });
  }


  // Filter for multiselection
  columnGlobalFilter(columnName) {
    this.selection.clear();

    switch (columnName) {
      case "status":
        let filterData1 = this.statusList.filter(item => item.checked).map(item1 => item1.status)
        this.columnFilter.status = filterData1;
        break;
      case "exposure":
        let filterData2 = this.exposureList.filter(item => item.checked).map(item1 => item1.exposure)
        this.columnFilter.exposure = filterData2;
        break;
      case "domain":
        let filterData3 = this.domainList.filter(item => item.checked).map(item1 => item1.domain)
        this.columnFilter.domain = filterData3;
        break;
      case "domainDebug":
        let filterData4 = this.domainDebugList.filter(item => item.checked).map(item1 => item1.domainDebug)
        this.columnFilter.domain_debug = filterData4;
        break;
      case "target":
        let filterData5 = this.targetList.filter(item => item.checked).map(item1 => item1.target)
        this.columnFilter.target = filterData5;
        break;
      case "progress":
        let filterData6 = this.progressList.filter(item => item.checked).map(item1 => item1.progress)
        this.columnFilter.progress = filterData6;
        break;
      case "qrc_vector":
        let filterData7 = this.qrcvectorList.filter(item => item.checked).map(item1 => item1.qrc_vector)
        this.columnFilter.qrc_vector = filterData7;
        break;
    }
    console.log(this.columnFilter);
    let keys = Object.keys(this.columnFilter)
    let filterData = this.OriginalData;
    keys.forEach(key => {
      if (this.columnFilter[key] && this.columnFilter[key].length > 0) {
        filterData = filterData.filter(item => this.columnFilter[key].indexOf(item[key]) > -1)
      }
    })
    this.dataSource1.data = filterData;
    this.dataSource1.data.forEach((row: any) => this.selection.select(row))
  }

  statusSelectedAll() {
    if (this.isStatusSelectedAll) {
      this.statusList.forEach(element => {
        element["checked"] = true
      });
    } else {
      this.statusList.forEach(element => {
        element["checked"] = false
      });
    }
  }

  changeStatusSelected() {
    let status = this.statusList.map(element => element["checked"]);
    if (status.indexOf(false) > -1) {
      this.isStatusSelectedAll = false
    } else {
      this.isStatusSelectedAll = true
    }
  }

  exposureSelectedAll() {
    if (this.isExposureSelectedAll) {
      this.exposureList.forEach(element => {
        element["checked"] = true
      });
    } else {
      this.exposureList.forEach(element => {
        element["checked"] = false
      });
    }
  }

  changeExposureSelected() {
    let exposure = this.exposureList.map(element => element["checked"]);
    if (exposure.indexOf(false) > -1) {
      this.isExposureSelectedAll = false
    } else {
      this.isExposureSelectedAll = true
    }
  }

  domainSelectedAll() {
    if (this.isDomainSelectedAll) {
      this.domainList.forEach(element => {
        element["checked"] = true
      });
    } else {
      this.domainList.forEach(element => {
        element["checked"] = false
      });
    }
  }
  changeDomainSelected() {
    let domain = this.domainList.map(element => element["checked"]);
    if (domain.indexOf(false) > -1) {
      this.isDomainSelectedAll = false
    } else {
      this.isDomainSelectedAll = true
    }
  }

  domainDebugSelectedAll() {
    if (this.isDomainDebugSelectedAll) {
      this.domainDebugList.forEach(element => {
        element["checked"] = true
      });
    } else {
      this.domainDebugList.forEach(element => {
        element["checked"] = false
      });
    }
  }
  changeDomainDebugSelected() {
    let domainDebug = this.domainDebugList.map(element => element["checked"]);
    if (domainDebug.indexOf(false) > -1) {
      this.isDomainDebugSelectedAll = false
    } else {
      this.isDomainDebugSelectedAll = true
    }
  }

  targetSelectedAll() {
    if (this.isTargetSelectedAll) {
      this.targetList.forEach(element => {
        element["checked"] = true
      });
    } else {
      this.targetList.forEach(element => {
        element["checked"] = false
      });
    }
  }
  changeTargetSelected() {
    let target = this.targetList.map(element => element["checked"]);
    if (target.indexOf(false) > -1) {
      this.isTargetSelectedAll = false
    } else {
      this.isTargetSelectedAll = true
    }
  }

  progressSelectedAll() {
    if (this.isProgressSelectedAll) {
      this.progressList.forEach(element => {
        element["checked"] = true
      });
    } else {
      this.progressList.forEach(element => {
        element["checked"] = false
      });
    }
  }
  changeProgressSelected() {
    let progress = this.progressList.map(element => element["checked"]);
    if (progress.indexOf(false) > -1) {
      this.isProgressSelectedAll = false
    } else {
      this.isProgressSelectedAll = true
    }
  }
  qrcVectorSelectedAll() {
    if (this.isQrcvectorSelectedAll) {
      this.qrcvectorList.forEach(element => {
        element["checked"] = true
      });
    } else {
      this.qrcvectorList.forEach(element => {
        element["checked"] = false
      });
    }
  }

  changeQRCSelected() {
    let qrc_vector = this.qrcvectorList.map(element => element["checked"]);
    if (qrc_vector.indexOf(false) > -1) {
      this.isQrcvectorSelectedAll = false
    } else {
      this.isQrcvectorSelectedAll = true
    }
  }


  groupDomainData() {
    TREE_DATA = [];
    this.groupDomainList.forEach((d, index) => {

      let tempSubDomain = [];
      d.coeGroupList.forEach((data, index) => {
        tempSubDomain.push(new GameNode(data.domainName));
      });
      TREE_DATA.push(new GameNode(d.coeGroup, tempSubDomain));
    });
    this.dataSource.data = TREE_DATA;
  }
  checkAll(state: string) {
    if (!this.isSelectedAllGroupDomain) {
      for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
        this.checklistSelection.select(this.treeControl.dataNodes[i]);
        this.treeControl.expand(this.treeControl.dataNodes[i]);
      }
      this.isSelectedAllGroupDomain = true;
    } else if (this.isSelectedAllGroupDomain) {
      for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
        this.checklistSelection.deselect(this.treeControl.dataNodes[i]);
        this.treeControl.expand(this.treeControl.dataNodes[i]);
      }
      this.isSelectedAllGroupDomain = false;
    }

    let selesctedmattreeArray = [];
    let selesctedmattreeList = this.checklistSelection.selected;
    if (selesctedmattreeList.length > 0) {
      this.groupDomainList.forEach((d, index) => {
        selesctedmattreeList.forEach((data, index) => {
          if (data.item == d.coeGroup) {
            selesctedmattreeList.splice(index, 1);
          }
        });
      });

      selesctedmattreeList.forEach((data, index) => {
        selesctedmattreeArray.push(data.item);
      });
      this.selectedGroupDomain = selesctedmattreeArray.join(",");
      this.groupDomainPlaceholderTxt = selesctedmattreeArray.join(",");




      // this.domain = this.preSelectedList.join(",");
      // this.trendDomainchart(this.preSelectedList);


    }
    else {
      this.groupDomainPlaceholderTxt = "Group Domain";
      this.selectedGroupDomain = "Group Domain";
    }
    /*   if (this.checked === 'checkedAll') {
        let data = ['All']
        this.trendDomainchart(data);
        data = ['']
        this.checked = 'UncheckedAll';
      }
      else {
        let data = ['']
        this.trendDomainchart(data);
        data = ['All']
        this.checked = 'checkedAll';
      } */




    // this.getDSI(this.duration, this.selectedGroupDomain, this.selectedSKUID);
  }



  getLevelPlatform = (node: GameNode): number => {
    return this.levels.get(node) || 0;
  };

  isExpandablePlatform = (node: GameNode): boolean => {
    return true;
  };

  getChildrenPlatform = (node: GameNode) => {
    return node.children;
  };
  hasChildren = (index: number, node: GameNode) => {
    return this.isExpandable(node);
  }

  transformerPlatform = (node: GameNode, level: number) => {
    this.levels.set(node, level);
    return node;
  }

  hasChildrenPlatform = (index: number, node: GameNode) => {
    return this.isExpandable(node);
  }
  isExpandable = (node: GameNode): boolean => {
    return node.children.value.length > 0;
  };


  nodeSelectionToggle(node: GameNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants, node)
      : this.checklistSelection.deselect(...descendants, node);
    this.changeDetectorRef.markForCheck();

    let selesctedmattreeArray = [];
    let selesctedmattreeList = this.checklistSelection.selected;
    if (selesctedmattreeList.length > 0) {
      this.groupDomainList.forEach((d, index) => {
        selesctedmattreeList.forEach((data, index) => {
          if (data.item == d.coeGroup) {
            selesctedmattreeList.splice(index, 1);
          }
        });
      });

      selesctedmattreeList.forEach((data, index) => {
        selesctedmattreeArray.push(data.item);
      });
      this.selectedGroupDomain = selesctedmattreeArray.join(",");
      this.groupDomainPlaceholderTxt = selesctedmattreeArray.join(",");
    }
    else {
      this.groupDomainPlaceholderTxt = "Group Domain";
      this.selectedGroupDomain = "Group Domain";
    }
    this.domain = this.selectedGroupDomain;
    // this.trendDomainchart(this.selectedGroupDomain);
    // this.trendDomainchart(this.preSelectedList);
    // this.getDSI(this.duration, this.selectedGroupDomain, this.selectedSKUID);
    // this.GetGroupDomainTraigeAccuracy(this.selected, this.selectedExposure, this.selectedSKUID, this.selectedGroupDomain);
  }


  /** The selection for checklist */
  checklistSelection = new SelectionModel<GameNode>(true /* multiple */);

  /** Whether all the descendants of the node are selected */
  descendantsAllSelected(node: GameNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    if (!descendants.length) {
      return this.checklistSelection.isSelected(node);
    }
    const selected = this.checklistSelection.isSelected(node);
    const allSelected = descendants.every(child => this.checklistSelection.isSelected(child));
    if (!selected && allSelected) {
      this.checklistSelection.select(node);
      this.changeDetectorRef.markForCheck();
    }
    return allSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: GameNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    if (!descendants.length) {
      return false;
    }
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  intents;
  programList;
  groupList = [];
  SKU = "SKU"
  program = "Program";
  /** Toggle the game selection. Select/deselect all the descendants node */
  ngOnInit(): void {
    this.initializeColumnProperties();
    this.editedRows = [];

    this.apiService.getDataFilterList().subscribe((res: any) => {
      this.statusList = res.statusList;
      this.domainDebugList = res.domainDebugList;
      this.exposureList = res.exposureList;
      this.domainList = res.domainList;
      this.targetList = res.targetList;
      this.progressList = res.progressList;
      this.qrcvectorList = res.qrcvectorList;

      this.domainDebugList.forEach(element => {
        element["checked"] = false
      });

      this.statusList.forEach(element => {
        element["checked"] = false
      });

      this.exposureList.forEach(element => {
        element["checked"] = false
      });

      this.domainList.forEach(element => {
        element["checked"] = false
      });
      this.targetList.forEach(element => {
        element["checked"] = false
      });

      this.progressList.forEach(element => {
        element["checked"] = false
      });

      this.qrcvectorList.forEach(element => {
        element["checked"] = false
      });
      console.log(res)
    })


    this.apiService.getEditQueryResult().subscribe((res: any) => {



      let pgmDetails = res.editQueryDetails.forEach((m: any) => {
        const newObjArr = [{ programName: m.programName }];
        this.platformList = [...this.platformList, ...newObjArr]
      });
      console.log(this.platformList);

    })
    let payload = {
      "Type": 1
    }
    this.apiService.getFilters(payload).subscribe((res: any) => {
      this.intents = res.intents;
      this.programList = res.program;
    })
    this.groupDomainData();
    //this.list_change()



    this.aRouter.queryParamMap.subscribe((data: any) => {
      console.log(data)
      if (JSON.stringify(data.params) != '{}') {
        if (data.params.tabletype == "DomainDebug") {
          this.platform = data.params.platform
          this.getDomainHSDES = {
            "platform": this.shortName + "_" + this.SKU,
            "domain": "connectivity ",
            "type": "domain"
          }

          this.apiService.getDomainWiseResult(this.getDomainHSDES).subscribe((res: any) => {

            res.getDomainWiseCounts.forEach(d => {
              d['disabled'] = this.selectedTarget.includes(d.domain) ? true : false;
              d['checked'] = this.selectedTarget.includes(d.domain) ? true : false;
            });
            this.getDomainWiseCounts = res.getDomainWiseCounts;
            this.getDomainWiseHSDESInfo = res.getDomainWiseHSDESInfo;

            this.dataSource1.data = this.getDomainWiseHSDESInfo;
            this.OriginalData = this.getDomainWiseHSDESInfo
            this.masterToggle()
          })

        }
      } else {
        console.log('Something went wrong')
      }


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
  //platformName = "ADL_S";
  closedCount;
  dcrCount;
  sceCount;
  exposureClosedCount;
  /*  closedCountPercentages = [
     { "names": "SIV", "percentage": "85.55" },
     { "names": "Other", "percentage": "14.45" }] */
  totalCount = 2663;
  averageCountinfomation;
  avgNew;
  avgClosed;
  show_chart: boolean = true;
  activeCount;
  verifiedCount;
  exposureCount;

  sampleData(filter, chartType, type) {
    console.log(filter + '' + chartType);
    let t = this.router.serializeUrl(this.router.createUrlTree(['sample'], { queryParams: { CHARTNO: filter, FILTER: chartType, type: type, platform: this.shortnamewithSKU } }))
    window.open("#" + t, '_blank')
  }

  sampleData1(filter, chartType, type) {
    console.log(filter + '' + chartType);
    let t = this.router.serializeUrl(this.router.createUrlTree(['sample'], { queryParams: { CHARTNO: filter, FILTER: chartType, type: type, platform: this.shortnamewithSKU } }))
    window.open("#" + t, '_blank')
  }

  report() {
    let t = this.router.serializeUrl(this.router.createUrlTree(['mail'], { queryParams: { platform: this.shortnamewithSKU } }))
    window.open("#" + t, '_blank')
  }

  onNavigate() {
    /*  console.log(this.powerBurl)
     if (this.powerBurl !== "") {
       window.open(this.powerBurl, "_blank");
     } else {
       window.alert("No PowerBI link given")
     } */
  }
  selectedValToggleGroup: any;
  onValChangeToggleGroup(data) {
    this.selectedValToggleGroup = data;
    if (this.selectedValToggleGroup == "Total Sighting") {
      let payload = {
        "platform": this.shortnamewithSKU,
        "ChartNo": "1",
        "Filter": ""
      }

      this.apiService.getActiveCount(payload).subscribe((res: any) => {
        this.activeCount = res.activeCount[0].activeCount;
        this.exposureCount = res.exposureCount;
        this.daysCount = res.daysCount;
        this.percentageInfo = res.percentageInfo;
        this.exposureBarChat(this.daysCount);
        this.exposurePieChat(this.percentageInfo);
      })
    } else if (this.selectedValToggleGroup == "Active") {

      let payload = {
        "platform": this.shortnamewithSKU,
        "ChartNo": "1",
        "Filter": "",
        "status": "open,implemented,verified"
      }

      this.apiService.getActiveCount(payload).subscribe((res: any) => {
        this.activeCount = res.activeCount[0].activeCount;
        this.exposureCount = res.exposureCount;
        this.daysCount = res.daysCount;
        this.percentageInfo = res.percentageInfo;
        this.exposureBarChat(res.daysStatusCount);
        this.exposurePieChat(this.percentageInfo);
      })
    }

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
  duration = 'Week';
  //trendCharbydomain starts
  trendCharbydomain(dataOpenCloseTrendInfo) {
    if (!dataOpenCloseTrendInfo || dataOpenCloseTrendInfo.length === 0) {
      let chart = am4core.create('chartdivdomain', am4charts.XYChart);
      chart.dispose();
      document.getElementById('chartdivdomain').classList.remove('chart_style');
      // document.getElementById('showNodata').classList.remove('d-none');

    }
    else {
      /*   document.getElementById('chartdivdomain').classList.add('chart_style')
        document.getElementById('showNodata').classList.add('d-none'); */
      am4core.useTheme(am4themes_animated);
      am4core.options.autoSetClassName = true;
      am4core.options.commercialLicense = true;

      let chart = am4core.create('chartdivdomain', am4charts.XYChart)
      chart.colors.list = [
        am4core.color("#fe6f5e"),
        am4core.color("#32cd32"),
        am4core.color("#fdcb6e"),
      ];
      chart.padding(5, 5, 5, 5);
      chart.margin(0, 0, 0, 0);

      let xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      xAxis.dataFields.category = 'chartType'
      xAxis.renderer.cellStartLocation = 0.03
      xAxis.renderer.cellEndLocation = 0.97
      xAxis.renderer.grid.template.location = 0;
      xAxis.title.text = "[bold]" + this.duration;
      xAxis.renderer.minGridDistance = 50;
      xAxis.renderer.labels.template.rotation = 290;
      xAxis.renderer.labels.template.fill = am4core.color("#000000");
      //xAxis.renderer.grid.template.disabled = true;

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

        series.columns.template.events.on("hit", function (ev: any) {
          if (ev.target.dataItem.component.name != 'Cumulative Open Counts') {
            let chartdetails = {};
            let type = (ev.target.dataItem.component.name).split(' ');
            chartdetails['COUNTTYPE'] = type[0];
            chartdetails['CHARTDATE'] = ev.target.dataItem._dataContext.chartType;
            chartdetails['CHARTTYPE'] = that.duration;
            chartdetails['platform'] = that.program;
            chartdetails['isOpenClosed'] = true;
            chartdetails['exposure'] = that.exposure;
            chartdetails['Domain'] = that.preSelectedList.join(',');
            let t = that.router.serializeUrl(that.router.createUrlTree(['sample'], { queryParams: chartdetails }))
            window.open("#" + t, '_blank')
            console.log("clicked on ", that.chartdetails);
          }
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
      createSeries('cummOpenCount', 'Cumulative Open Counts');

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
      //valueAxis.title.text = '[bold] Cumulative Counts';
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

      // TraigeLineSeries("cummSubmittedCount", "Cumulative Submitted Sightings", "#ff0038");
      // TraigeLineSeries("cummClosedCount", "Cumulative Closed Sightings", "#006b3c");
      // TraigeLineSeries("cummOpenCount", "Cumulative Open Count", "  #808000");

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

        xAxis.start = 0.75;
        xAxis.end = 0.84;
      }
      function zoomAxis() {
        xAxis.start = 0.8;
        xAxis.end = 1;
      }

    }
  }
  //trendCharbydomain ends

}
