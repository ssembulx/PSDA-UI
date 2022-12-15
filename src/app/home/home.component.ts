import { AfterViewInit, Component, OnInit, ViewEncapsulation, QueryList, ViewChildren, ChangeDetectorRef, Input, TemplateRef, ViewChild } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ServiceAPIService } from '../service-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BroadCastServiceService } from '../broad-cast-service.service';

import { SpinnerOverlayService } from '../spinner-overlay.service';
import { NotifierService } from 'angular-notifier';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { SelectionModel } from '@angular/cdk/collections';
import { element } from 'protractor';
import { BehaviorSubject } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';

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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})




export class HomeComponent implements OnInit, AfterViewInit {
  preSelectedList = ['all'];
  @ViewChild('callAPIDialog2') callAPIDialog2: TemplateRef<any>;

  @ViewChildren('checkBox') checkBox: QueryList<any>;
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  public bankMultiCtrl1: FormControl = new FormControl();
  @ViewChild('selectDomains') selectDomains: MatSelect;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  domainList1: any;
  i = 0;

  heightFlag = false;

  objectName = {
    implemented_BKC: "",
    ingrediant: "",
    qrc_vector: "",
    total: "",
    verified_on_eng_OWR: "",
    wssDebug: ""
  }
  checked: string = 'checkedAll';
  allSelected = true;
  platformPlaceholderTxt = "Platform";
  selectedGroupDomain = "Group Domain";
  groupDomainPlaceholderTxt = "Group Domain";
  exposurePlaceholderTxt = "Exposure";
  selectedSKU = "SKU";
  selectedSKUID = '';
  domainList2: any = [];
  duration: any;
  countType: any;
  mYear: any;
  getSightingsInfo: any;
  defectsAndRegressionInfo: any;
  activeCount: any;
  verifiedCount: any;
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
  chartdetails: { platform: any; COUNTTYPE: any; CHARTDATE: any; CHARTTYPE: any; exposure: any };
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
  keyFailing: { platform: any, topCount: any }
  issueList: { platform: any, exposure: any, target: any }
  issueListhigh: { platform: any, exposure: any, target: any }
  Cslptable: { platform: any, customer_detail: any, status: any, exposure: any }
  verifiedPayload: { platform: any }
  getCslpsightings: any;
  getFunctionalDefectsCount: any;
  editQuery: any;
  programName: any;
  powerBI: any;
  powerBurl: any;
  QueryID: any;
  QRCQuery: any;
  trend_milestone: any;
  displayProgressSpinner = true;
  select_all: boolean = true;
  show_chart: boolean = true;
  hide_emailcontent = true;
  show_emailcontent = false;
  qrc_milestone_table = true;
  high_qrc_milestone_table = true;
  cslpsightings = false;
  showDomainchart = true;
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
  high_other: any;
  contents: string;
  Title: string = "Windows Platform SysDebug Report"
  public columnShowHideList: any = [];
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  tab_index = 0;
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
  getingValue1: any;
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
  groupDomainList: any = [];
  Board_value: any;
  HW_value: any;
  trendCharlength: any;
  trendStatusinitial: { platform: any; ChartType: string; target: string; };
  enable_cslp: any;
  getCalvalue: any;
  isExposureSelectedAll = true;
  exposureList: any[];
  payload: { platform: any; mailTo: any; userName: string; };
  id: any;
  iduserName: any;
  idsId: { idsid: string; };
  name: any;
  esService: { requests: { command: string; command_args: { filter_keys: {}; }; var_args: any[]; tran_id: string; api_client: string; }[]; };
  selection = new SelectionModel<any>(true, []);
  newPlatformName: any;
  // registerForm: any;
  submitted = false;
  alert: boolean = false;
  dialogRefopen: any;
  registerForm: FormGroup;
  mailto: any;
  constructor(private changeDetectorRef: ChangeDetectorRef, private apiService: ServiceAPIService, private router: Router, private broadcastService: BroadCastServiceService,
    private aRouter: ActivatedRoute, private formBuilder: FormBuilder, private Spinnerservice: SpinnerOverlayService, private notifier: NotifierService, private dialogRef: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {
    this.notifier = notifier;

    this.broadcastService.subscribe("APICALL", (payload) => {
      console.log(payload)
      this.platformName = payload.platform;
      //this.idsId = payload.loginUserName;
      console.log("dania", this.idsId)
      this.onValChange('Week');
    });
    //New Code Added for trend chart Platform

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
    // this.registerForm = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email,
    //      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]]
    // });
    this.selectedValToggleGroup = 'Active';
  }

  getDcrDetailsList;
  ChartType = "Year"
  dcrInformation;
  isDomainGroup = true;
  isPlatform = true;
  getDSI(duration?: string, groupDomain?: string, SKUIDcombination?: string) {
    if (groupDomain == "Group Domain") {
      groupDomain = "";
    }
    if (SKUIDcombination == 'SKU') {
      SKUIDcombination = '';
    }
    let data = ['All']

    this.trendDomainchart(data);
  }

  isSelectedAllGroupDomain = false;
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
    if (this.checked === 'checkedAll') {
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
    }




    // this.getDSI(this.duration, this.selectedGroupDomain, this.selectedSKUID);
  }

  getLevelPlatform = (node: GameNode): number => {
    return this.levels.get(node) || 0;
  };

  isExpandablePlatform = (node: GameNode): boolean => {
    return node.children.value.length > 0;
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
    this.trendDomainchart(this.selectedGroupDomain);
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

  /** Toggle the game selection. Select/deselect all the descendants node */

  // New code ends here for trend Chart platform
  ngOnInit(): void {
    this.userName();

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]]
    });

    //   this.checkAll();
    //this.getPlatformData();
    this.aRouter.queryParamMap.subscribe((data: any) => {

      if (JSON.stringify(data.params) != '{}') {
        console.log(this.platformName = data.params.platform);
        this.platformName = this.platformName;
        this.newPlatformName = this.platformName;
        console.log(this.newPlatformName);
        this.getPlatformData();
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

    this.onValChange('Week');
    this.apiService.getDataFilterList().subscribe((res: any) => {

      // this.statusList = res.statusList;
      // this.statusList.forEach(element => {

      //   element["checked"] = true

      // });
      this.exposureList = res.exposureList;
      this.exposureList.forEach(element => {

        element["checked"] = true

      });

      console.log(this.exposureList)

    });
    this.exposure = "1-Critical,2-High,3-medium,4-low"
  }
  userName() {
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

      this.iduserName = res.responses[0].result_table[0].idsid;
      console.log(this.iduserName)
      // this.idsId =
      // {
      //   "idsid": this.id
      // }

      this.apiService.getUserDetails(this.idsId).subscribe((res: any) => {
        this.id = res.userModelDetails[3].id;
        console.log(this.id)

        // this.getValue = res.userModelDetails[0].wwid;
        // this.avatarurl = res.userModelDetails[0].avatarURL;
        // console.log(this.getValue)
      })
    })
  }
  openClosedData(value) {

    this.duration = value;
    let obj =
    {
      "platform": this.platformName,
      "ChartType": this.duration,
      "exposure": this.exposure
    }
    this.apiService.getOpenCloseTrendInfo(obj).subscribe((res: any) => {
      this.renderChar(res.getOpenCloseTrendInfo);
    })
  }
  levels = new Map<GameNode, number>();
  levelsPlatform = new Map<GameNode, number>();
  treeControl: FlatTreeControl<GameNode>;

  treeFlattener: MatTreeFlattener<GameNode, GameNode>;

  dataSource: MatTreeFlatDataSource<GameNode, GameNode>;


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
    this.demo1BtnClick();

    this.verifiedPayload = {
      "platform": this.platformName,
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
    let obj =
    {
      "platform": this.platformName,
      "ChartType": this.duration,
      "exposure": "1-Critical,2-High,3-medium,4-low"
    }

    this.chartdetails =
    {
      "platform": this.platformName,
      "COUNTTYPE": this.countType,
      "CHARTDATE": this.countType,
      "CHARTTYPE": this.duration,
      "exposure": this.exposure
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
    this.objd =
    {
      "platform": this.platformName,
      "ChartType": "week",
      "FromDate": "2020-03-27"
    }
    this.keyFailing = {
      "platform": this.platformName,
      "topCount": "50"
    }
    this.issueList = {
      "platform": this.platformName,
      "exposure": "1-critical",
      "target": "pc/pv"
    }
    this.issueListhigh = {
      "platform": this.platformName,
      "exposure": "2-high",
      "target": "pc/pv"
    }
    this.trendStatusinitial = {
      "platform": this.platformName,
      "ChartType": "week",
      "target": "beta",
    }

    this.apiService.getOpenCloseTrendInfo(obj).subscribe((res: any) => {
      this.renderChar(res.getOpenCloseTrendInfo);
    })

    this.apiService.getActiveCount(this.Payload).subscribe((res: any) => {
      this.activeCount = res.activeCount[0].activeCount;
      this.exposureCount = res.exposureCount;
      this.daysCount = res.daysCount;
      this.percentageInfo = res.percentageInfo;
      this.allFormulaInfoGetActiveCount = res.allFormulaInfo;
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
      this.allFormulaInfoGetClosedCount = res.allFormulaInfo;
      this.closedExposurePie(this.closedCountPercentages);
      this.dcrCount = res.dcrCount[0].dcrCount;
      this.sceCount = res.sceCount[0].sceCount;
    })

    this.apiService.getTotalCount(this.totalPayload).subscribe((res: any) => {
      console.log(res)
      this.totalCount = res.totalCountinfomation[0].totalCount;
      this.avgNew = res.averageCountinfomation[0].count;
      this.avgClosed = res.averageCountinfomation[1].count;
      this.allFormulaInfoGetTotalCount = res.allFormulaInfo;
    })

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

      if (this.getCriticalDefectsvector.qrc_vector) {
        console.log(this.getCriticalDefectsvector.qrc_vector)

      }


    })
    this.apiService.getEditQueryResult().subscribe((res: any) => {
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
      this.query_for_report_gen = currentVal.queryID;
      this.query_for_config_gen = currentVal.qrcQuery;
      this.programName = currentVal.programName;
      this.platform_name = currentVal.programName;
      //this.enable_cslp = currentVal.enable_cslp;
      this.report_name = "Windows Platform SysDebug Report";
      this.Title = "System Integration and Validation";
      //this.PowerBI = currentVal.powerBI;
      //this.trend_start_date = "50'20";
      this.qrc_by_target_list = "alpha";
      this.trend_milestone = "";
      this.No_of_keyIngredients = "7";
      this.num_lines_sysdebug = "1";
      // second edit query
      this.editQuery = res.editQueryDetails;
      console.log(this.editQuery);
      this.programName = currentVal.programName;
      this.powerBI = currentVal.powerBI;
      this.powerBurl = this.powerBI;
      this.QueryID = currentVal.queryID;
      this.QRCQuery = currentVal.qrcQuery;
      this.enable_cslp = currentVal.enable_cslp;
      console.log(this.powerBurl)
      console.log(this.QueryID)
      this.cslptable(this.enable_cslp);
      // second edit query
    })

  }
  cslptable(cslp) {

    let val = cslp;
    if (val == "true") {

      this.Cslptable = {
        "platform": this.platformName,
        "customer_detail": "dell_broadmoor14_mlk",
        "status": "open",
        "exposure": ""
      }
      this.apiService.GetSightingAndExposure(this.Cslptable).subscribe((res: any) => {
        console.log(res.getCriticalDefectsvector)
        this.getCslpsightings = res.sightingAndExposureInfo;
        console.log(this.getCslpsightings.length)
        this.cslpsightings = true;


      })
    } else if (val == undefined || val == "") {
      this.cslpsightings = false;
    }
    else {
      this.cslpsightings = false;
    }
  }
  defectsInfo; regressionInfo; allFormulaInfoGetDomainAndExposureHSDESResult; allFormulaInfoGetDefectsVsRegressionHSDESResult;
  selectedTab($event) {

    let tabRef = $event.index;
    if (tabRef == 1) {
      console.log("1")
      let pyload = {
        "UserName": this.iduserName,
        "ChartName": "Open Sightings By Domain and Exposure"
      }
      this.apiService.pushviewData(pyload).subscribe((res: any) => {
      })
      this.apiService.getDomainAndExposureHSDESResult(this.domainExposure).subscribe((res: any) => {
        console.log(res.getSightingsInfo);
        this.getSightingsInfo = res.getSightingsInfo;
        this.allFormulaInfoGetDomainAndExposureHSDESResult = res.allFormulaInfo;
        this.openSightingTrend(this.getSightingsInfo);
      })
      //this.openSightingTrend(domainAndExposure)
    }
    else if (tabRef == 2) {
      console.log("3")
      let pyload = {
        "UserName": this.iduserName,
        "ChartName": "Domain - Defects Vs Regression By Components"
      }
      this.apiService.pushviewData(pyload).subscribe((res: any) => {
      })
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
          let temp = {
            "ingredients": element.ingredients,
            "Defectscritical": element.critical,
            "Defectshigh": element.high,
            "Defectsmedium": element.medium,
            "Defectslow": element.low
          }
          tempDefects.push(temp);
        });
        //regression
        this.apiService.getDefectsVsRegressionHSDESResult(payl).subscribe((res: any) => {
          console.log(res.defectsAndRegressionInfo);

          this.regressionInfo = res.defectsAndRegressionInfo;
          this.regressionInfo.forEach(element => {
            let temp = {
              "ingredients": element.ingredients,
              "Regressioncritical": element.critical,
              "Regressionhigh": element.high,
              "Regressionmedium": element.medium,
              "Regressionlow": element.low,
              "Regressiontotal": element.total
            }
            tempRegression.push(temp);
          });
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
          this.allFormulaInfoGetDefectsVsRegressionHSDESResult = res.allFormulaInfo;
          this.renderCharData(tempDefects);
        })
      })
    }
    else if (tabRef == 3) {
      console.log("4")
      let pyload = {
        "UserName": this.iduserName,
        "ChartName": "Open Sightings By Ingredients and Exposure"
      }
      this.apiService.pushviewData(pyload).subscribe((res: any) => {
      })
      this.apiService.getSightingsByIngredienntsAndExposure(this.ingredientExposure).subscribe((res: any) => {
        console.log(res)
        this.ingredientSightingInfo(res.getIngredientSightingInfo);
        // this.renderCharData(this.ingredientSightingInfo)
      })
    }
    else if (tabRef == 4) {
      console.log("5")
      let pyload = {
        "UserName": this.iduserName,
        "ChartName": "Trend Chart By Domain"
      }
      this.apiService.pushviewData(pyload).subscribe((res: any) => {
      })
      this.trendDomainchart("all");
      let obj = {
        "platform": this.platformName,
        "ChartType": "week",
        "domain": "all"
      }

      console.log(obj)
      this.apiService.GetTrendChartByDomain(obj).subscribe((res: any) => {
        let responseVal = res.domainList;
        this.domainList1 = responseVal;
        console.log(this.domainList1)
        this.domainList1.forEach(element => {
          this.preSelectedList.push(element.domain);
        });
      })




    } else if (tabRef == 0) {

      let pyload = {
        "UserName": this.iduserName,
        "ChartName": "Open/Closed Trend Chart"
      }
      this.apiService.pushviewData(pyload).subscribe((res: any) => {
      })
    }
    else (tabRef == undefined); {
      console.log("no value")
    }
  }
  public demo1BtnClick() {

    this.tab_index = 0;
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

  // this.apiService.GetGroupDomain().subscribe((res: any) => {
  //   let responseVal = res.domainlistGroupInfo;
  //    this.domainList2 = responseVal;
  //   console.log(this.domainList2);
  //   this.domainList2.forEach(element => {
  //   this.preSelectedList.push(element.domain);
  //   });
  // });


  getPlatformData() {

    let obj =
    {
      "platform": this.newPlatformName,

    }
    console.log("newPlatformname", this.newPlatformName)
    console.log("Platform name", this.platformName)

    this.apiService.GetGroupDomain(obj).subscribe((res: any) => {
      let responseVal = res.domainlistGroupInfo;
      console.log("responseVal", responseVal);
      console.log(this.totalPayload)

      if (responseVal) {

        this.groupDomainList = responseVal;
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
    });
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
  sampleData2(filter, chartType, type, status, value) {
    console.log(filter + '' + chartType);
    let t = this.router.serializeUrl(this.router.createUrlTree(['sample'], { queryParams: { CHARTNO: filter, FILTER: chartType, type: type, status: status, platform: this.platformName, value: value } }))
    window.open("#" + t, '_blank')
  }
  sampleData3(filter, chartType, type, status, value) {
    console.log(filter + '' + chartType);
    let t = this.router.serializeUrl(this.router.createUrlTree(['sample'], { queryParams: { CHARTNO: filter, FILTER: chartType, type: type, status: status, platform: this.platformName, value: value } }))
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
    let pyload = {
      "UserName": this.iduserName,
      "ChartName": "Open Domain-wise Table"
    }
    this.apiService.pushviewData(pyload).subscribe((res: any) => {
    })
    let t = this.router.serializeUrl(this.router.createUrlTree(['openDomain'], { queryParams: { tabletype: filter, platform: this.platformName } }))
    window.open("#" + t, '_blank')
  }

  openDomainDebug(filter) {
    let pyload = {
      "UserName": this.iduserName,
      "ChartName": "Open Domain Debug Table"
    }
    this.apiService.pushviewData(pyload).subscribe((res: any) => {
    })
    let t = this.router.serializeUrl(this.router.createUrlTree(['openDomainDebug'], { queryParams: { tabletype: filter, platform: this.platformName } }))
    window.open("#" + t, '_blank')
  }


  openIngredient(filter) {
    let pyload = {
      "UserName": this.iduserName,
      "ChartName": "Open Ingredient-wise Table"
    }
    this.apiService.pushviewData(pyload).subscribe((res: any) => {
    })
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
  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  sendmail() {

    const payload = {
      "platform": this.platformName,
      "mailTo": this.registerForm.get('email').value,
      // "userName": this.iduserName


    }
    this.apiService.getCSLPEmailReport(payload).subscribe((res: any) => {
      this.dialogRefopen.close();
      this.showNotification('success', 'Mail has been successfully generated');
      this.mailto = null;
    })
    /* this.dialogRefopen.close();
    this.showNotification('success', 'Mail has been successfully generated');
    this.mailto = null; */

    this.alert = true;
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
      this.sendmail();
      this.dialogRef.closeAll();
      // this.svgtopng();

    }
  }

  closeAlert() {
    this.alert = false;
  }
  mailClosebtn() {
    this.mailto = null;
  }

  report() {
    if (this.cslpsightings) {
      this.openDialog2()
      return
    }
   /*  if (this.platformName == "CSLP_ADL_S_ADL_P") {
      this.openDialog2()
      return
    } else if (this.platformName == "RPL_CSLP") {
      this.openDialog2()
      return
    } else if (this.platformName == "RPL_P_CSLP") {
      this.openDialog2()
      return
    } */
    let t = this.router.serializeUrl(
      this.router.createUrlTree(['mail'], { queryParams: { platform: this.platformName } }))
    window.open("#" + t, '_blank')



  }
  selectedValToggleGroup: any;
  allFormulaInfoGetActiveCount;
  allFormulaInfoGetClosedCount;
  allFormulaInfoGetTotalCount;
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
        this.allFormulaInfoGetActiveCount = res.allFormulaInfo;
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

  renderChar(dataOpenCloseTrendInfo) {
    let pyload = {
      "UserName": this.iduserName,
      "ChartName": "Open/Closed Trend Chart"
    }
    this.apiService.pushviewData(pyload).subscribe((res: any) => {
    })

    if (!dataOpenCloseTrendInfo || dataOpenCloseTrendInfo.length === 0) {
      let chart = am4core.create('chartdiv', am4charts.XYChart);
      chart.dispose();
      document.getElementById('chartdiv').classList.remove('chart_style');
      document.getElementById('showNodata').classList.remove('d-none');
      document.getElementById('poweron_img').classList.add('d-none');
      document.getElementById('poweron_img').classList.remove('lableStyle');

    }
    else {
      document.getElementById('chartdiv').classList.add('chart_style')
      document.getElementById('showNodata').classList.add('d-none');
      document.getElementById('poweron_img').classList.remove('d-none');
      document.getElementById('poweron_img').classList.add('lableStyle');
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
          let type = (ev.target.dataItem.component.name).split(' ');
          that.chartdetails.COUNTTYPE = type[0];
          that.chartdetails.CHARTDATE = ev.target.dataItem._dataContext.chartType;
          that.chartdetails.CHARTTYPE = that.duration;
          that.chartdetails.platform = that.platformName;
          that.chartdetails['isOpenClosed'] = true;
          that.chartdetails.exposure = that.exposure;
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

        xAxis.start = 0.75;
        xAxis.end = 0.84;
      }
      function zoomAxis() {
        xAxis.start = 0.8;
        xAxis.end = 1;
      }

    }
  }

  //trendCharbydomain starts
  trendCharbydomain(dataOpenCloseTrendInfo) {
    if (!dataOpenCloseTrendInfo || dataOpenCloseTrendInfo.length === 0) {
      let chart = am4core.create('chartdivdomain', am4charts.XYChart);
      chart.dispose();
      document.getElementById('chartdivdomain').classList.remove('chart_style');
      document.getElementById('showNodata').classList.remove('d-none');

    }
    else {
      document.getElementById('chartdivdomain').classList.add('chart_style')
      document.getElementById('showNodata').classList.add('d-none');
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
            chartdetails['platform'] = that.platformName;
            chartdetails['isOpenClosed'] = true;
            chartdetails['exposure'] = that.exposure;
            chartdetails['Domain'] = that.selectedGroupDomain;
            chartdetails['trend_chart'] = true;

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

  //open/close trend chart for report generation tool


  openSightingTrend(domainAndExposure) {
    am4core.useTheme(am4themes_animated);
    am4core.options.autoSetClassName = true;
    am4core.options.commercialLicense = true;
    // Themes end

    let chart = am4core.create("openSightingchart", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = domainAndExposure;
    chart.padding(5, 5, 5, 5);
    chart.margin(0, 0, 0, 0);

    chart.colors.step = 2;
    chart.padding(30, 30, 5, 30);
    chart.legend = new am4charts.Legend();
    chart.legend.position = "bottom";
    chart.legend.contentAlign = "center";

    //Change the lable rotation
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "domain";
    categoryAxis.title.text = "[bold]" + 'Domain';

    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.cellStartLocation = 0.2;
    categoryAxis.renderer.cellEndLocation = 0.8;
    categoryAxis.renderer.labels.template.rotation = 290;
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.grid.template.disabled = true;

    let label = categoryAxis.renderer.labels.template;
    label.truncate = true;
    label.maxWidth = 120;
    label.tooltipText = "{category}";
    label.fontSize = 12;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.strictMinMax = true;
    valueAxis.calculateTotals = true;
    valueAxis.renderer.grid.template.disabled = false;
    valueAxis.title.text = '[bold] Count';


    let that = this;
    let series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.tooltipText =
      "{name}: {valueY}";
    series1.name = "Critical";
    series1.dataFields.categoryX = "domain";
    series1.dataFields.valueY = "critical";

    series1.dataItems.template.locations.categoryX = 0.5;
    series1.stacked = true;
    series1.tooltip.pointerOrientation = "vertical";
    series1.columns.template.stroke = am4core.color("red");
    series1.columns.template.fill = am4core.color("red");

    //click
    series1.columns.template.events.on("hit", function (ev: any) {
      console.log("clicked on ", ev.target.dataItem._dataContext);
      console.log("clicked on ", ev.target.dataItem._dataContext.critical);
      that.domainExposure.DomainName = ev.target.dataItem._dataContext.domain;
      that.domainExposure.platform = that.platformName;
      that.domainExposure.Exposure = '1-critical';
      that.domainExposure.CHARTTYPE = 'domainAndExposureHSDEC';
      let t = that.router.serializeUrl(that.router.createUrlTree(['sample'], { queryParams: that.domainExposure }))
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
    series2.dataFields.categoryX = "domain";
    series2.dataFields.valueY = "high";
    series2.dataItems.template.locations.categoryX = 0.5;
    series2.stacked = true;
    series2.tooltip.pointerOrientation = "vertical";
    series2.columns.template.stroke = am4core.color("orange");
    series2.columns.template.fill = am4core.color("orange");

    series2.columns.template.events.on("hit", function (ev: any) {
      console.log("clicked on ", ev.target.dataItem._dataContext);
      console.log("clicked on ", ev.target.dataItem._dataContext.high);
      that.domainExposure.DomainName = ev.target.dataItem._dataContext.domain;
      that.domainExposure.platform = that.platformName;
      that.domainExposure.Exposure = '2-High';
      that.domainExposure.CHARTTYPE = 'domainAndExposureHSDEC';
      let t = that.router.serializeUrl(that.router.createUrlTree(['sample'], { queryParams: that.domainExposure }))
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
    series3.dataFields.categoryX = "domain";
    series3.dataFields.valueY = "medium";
    series3.dataItems.template.locations.categoryX = 0.5;
    series3.stacked = true;
    series3.tooltip.pointerOrientation = "vertical";
    series3.columns.template.stroke = am4core.color("green");
    series3.columns.template.fill = am4core.color("green");

    series3.columns.template.events.on("hit", function (ev: any) {
      console.log("clicked on ", ev.target.dataItem._dataContext);
      console.log("clicked on ", ev.target.dataItem._dataContext.medium);
      that.domainExposure.DomainName = ev.target.dataItem._dataContext.domain;
      that.domainExposure.platform = that.platformName;
      that.domainExposure.Exposure = '3-Medium';
      that.domainExposure.CHARTTYPE = 'domainAndExposureHSDEC';
      let t = that.router.serializeUrl(that.router.createUrlTree(['sample'], { queryParams: that.domainExposure }))
      window.open("#" + t, '_blank')


    }, this);

    let bullet3 = series3.bullets.push(new am4charts.LabelBullet());
    bullet3.interactionsEnabled = false;
    bullet3.label.text = "{valueY}";
    bullet3.label.fill = am4core.color("#ffffff");
    bullet3.locationY = 0.5;


    let series4 = chart.series.push(new am4charts.ColumnSeries());
    series4.columns.template.width = am4core.percent(80);
    series4.columns.template.tooltipText =
      "{name}: {valueY}";
    series4.name = "Low";
    series4.dataFields.categoryX = "domain";
    series4.dataFields.valueY = "low";
    series4.dataItems.template.locations.categoryX = 0.5;
    series4.stacked = true;
    series4.tooltip.pointerOrientation = "vertical";
    series4.columns.template.stroke = am4core.color("blue");
    series4.columns.template.fill = am4core.color("blue");

    series4.columns.template.events.on("hit", function (ev: any) {
      console.log("clicked on ", ev.target.dataItem._dataContext);
      console.log("clicked on ", ev.target.dataItem._dataContext.low);
      that.domainExposure.DomainName = ev.target.dataItem._dataContext.domain;
      that.domainExposure.platform = that.platformName;
      that.domainExposure.Exposure = '4-low';
      that.domainExposure.CHARTTYPE = 'domainAndExposureHSDEC';
      let t = that.router.serializeUrl(that.router.createUrlTree(['sample'], { queryParams: that.domainExposure }))
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

  defectsAndRegressionChart(defectsAndRegressionInfo) {
    am4core.useTheme(am4themes_animated);
    am4core.options.autoSetClassName = true;
    am4core.options.commercialLicense = true;

    let chart = am4core.create("defectsAndRegressionInfo", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0;

    chart.data = defectsAndRegressionInfo;
    chart.padding(5, 5, 5, 5);
    chart.margin(0, 0, 0, 0);

    chart.colors.step = 2;
    chart.padding(30, 30, 5, 30);
    chart.legend = new am4charts.Legend();
    chart.legend.position = "bottom";
    chart.legend.contentAlign = "center";

    //Change the lable rotation
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "ingredients";
    categoryAxis.title.text = "[bold]" + 'Ingredients';

    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.grid.template.disabled = true;

    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.cellStartLocation = 0.2;
    categoryAxis.renderer.cellEndLocation = 0.8;
    categoryAxis.renderer.labels.template.rotation = 290;
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.grid.template.disabled = true;

    let label = categoryAxis.renderer.labels.template;
    label.truncate = true;
    label.maxWidth = 120;
    label.tooltipText = "{category}";


    let that = this;
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 250;
    valueAxis.strictMinMax = true;
    valueAxis.calculateTotals = true;
    valueAxis.title.text = '[bold] Count';

    let series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.tooltipText =
      "{name}: {valueY}";
    series1.name = "Defects";
    series1.dataFields.categoryX = "ingredients";
    series1.dataFields.valueY = "defects";

    series1.dataItems.template.locations.categoryX = 0.5;
    series1.stacked = true;
    series1.tooltip.pointerOrientation = "vertical";
    series1.columns.template.stroke = am4core.color("#007fff");
    series1.columns.template.fill = am4core.color("#007fff");

    series1.columns.template.events.on("hit", function (ev: any) {
      console.log("clicked on ", ev.target.dataItem._dataContext);
      that.defectRegression.Ingredient = ev.target.dataItem._dataContext.ingredients;
      that.defectRegression.ChartType = 'defects';
      that.defectRegression.CHARTTYPE = 'defectRegressionHSDEC';
      let t = that.router.serializeUrl(that.router.createUrlTree(['sample'], { queryParams: that.defectRegression }))
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
    series2.name = "Regression";
    series2.dataFields.categoryX = "ingredients";
    series2.dataFields.valueY = "regression";

    series2.dataItems.template.locations.categoryX = 0.5;
    series2.stacked = true;
    series2.tooltip.pointerOrientation = "vertical";
    series2.columns.template.stroke = am4core.color("#e6a605");
    series2.columns.template.fill = am4core.color("#e6a605");

    series2.columns.template.events.on("hit", function (ev: any) {
      console.log("clicked on ", ev.target.dataItem._dataContext);
      that.defectRegression.Ingredient = ev.target.dataItem._dataContext.ingredients;
      that.defectRegression.ChartType = 'regression';
      that.defectRegression.CHARTTYPE = 'defectRegressionHSDEC';
      let t = that.router.serializeUrl(that.router.createUrlTree(['sample'], { queryParams: that.defectRegression }))
      window.open("#" + t, '_blank')

    }, this);

    let bullet2 = series2.bullets.push(new am4charts.LabelBullet());
    bullet2.interactionsEnabled = false;
    bullet2.label.text = "{valueY}";
    bullet2.label.fill = am4core.color("#ffffff");
    bullet2.locationY = 0.5;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.parent = chart.bottomAxesContainer;

    categoryAxis.start = 0;
    categoryAxis.end = 0.4;
  }

  ingredientSightingInfo(getIngredientSightingInfo) {
    am4core.useTheme(am4themes_animated);
    am4core.options.autoSetClassName = true;
    am4core.options.commercialLicense = true;
    // Themes end

    let chart = am4core.create("getIngredientSightingInfo", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = getIngredientSightingInfo;
    chart.padding(5, 5, 5, 5);
    chart.margin(0, 0, 0, 0);

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

  defectRegressionParam = {};
  renderCharData(defectsAndRegressionInfo) {
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


  ngAfterViewInit() {

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

  rendercharOpen(dataOpenCloseTrendInfo) {
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
      xAxis.start = 0;
      xAxis.end = 1;
    }
    function zoomAxis() {
      xAxis.start = 0.8;
      xAxis.end = 1;
    }


  }
  openTargetapi() {
    let pyload = {
      "UserName": this.iduserName,
      "ChartName": "Open Target-wise Table"
    }
    this.apiService.pushviewData(pyload).subscribe((res: any) => {
    })
    this.apiService.getTargetWiseResult(this.getTargetWiseData).subscribe((res: any) => {
      console.log('getTargetWiseCounts' + res);
      this.getTargetWiseCounts = res.getTargetWiseCounts;
    })
  }
  openDomainapi() {
    let pyload = {
      "UserName": this.iduserName,
      "ChartName": "Open Domain-wise Table"
    }
    this.apiService.pushviewData(pyload).subscribe((res: any) => {
    })
    this.apiService.getDomainWiseResult(this.getDomainWiseDate).subscribe((res: any) => {
      this.getDomainWiseCounts = res.getDomainWiseCounts;
    })
  }
  openDomainDebugapi() {
    let pyload = {
      "UserName": this.iduserName,
      "ChartName": "Open Domain Debug Table"
    }
    this.apiService.pushviewData(pyload).subscribe((res: any) => {
    })
    this.apiService.getDomainWiseResult(this.getDomainDebugDate).subscribe((res: any) => {
      this.getDomainDebugCounts = res.getDomainWiseCounts;
    })
  }
  openIngredientapi() {
    let pyload = {
      "UserName": this.iduserName,
      "ChartName": "Open Ingredient-wise Table"
    }
    this.apiService.pushviewData(pyload).subscribe((res: any) => {
    })
    this.apiService.getIngredientWiseResult(this.getIngredientData).subscribe((res: any) => {
      console.log(res);
      this.getIngredientWiseCounts = res.getIngredientWiseCounts;
      this.getIngredientWiseHSDESInfo = res.getIngredientWiseHSDESInfo;
    })
  }
  implementedReasonapi() {
    let pyload = {
      "UserName": this.iduserName,
      "ChartName": "Implemented Reason counts table"
    }
    this.apiService.pushviewData(pyload).subscribe((res: any) => {
    })
    this.apiService.getImplementedReasonResult(this.getReasonData).subscribe((res: any) => {
      console.log(res);
      this.getImplementedReasonCounts = res.getImplementedReasonCounts;
    })
  }
  openStatusapi() {
    let pyload = {
      "UserName": this.iduserName,
      "ChartName": "Only Open Status"
    }
    this.apiService.pushviewData(pyload).subscribe((res: any) => {
    })
    this.apiService.getOpenStatusExposureResult(this.getOpenStatusExposure).subscribe((res: any) => {
      console.log("getOpenStatusExposureCounts" + res);
      this.getOpenStatusExposureCounts = res.getOpenStatusExposureCounts;
    })
  }
  trendDomainchart(domainVal) {
    let domainValstring = domainVal.toString();
    let obj = {
      "platform": this.platformName,
      "ChartType": "week",
      "domain": domainValstring
    }
    console.log(obj)
    this.apiService.GetTrendChartByDomain(obj).subscribe((res: any) => {
      let responseVal = res.domainList;
      console.log(res.trendChartByDomainInfo)
      this.trendCharbydomain(res.trendChartByDomainInfo);
      this.trendCharlength = res.trendChartByDomainInfo.length;
      console.log(this.trendCharlength)

      if (this.trendCharlength >= 0) {
        this.showDomainchart = true;
      }
      else {
        this.showDomainchart = false;
      }
    })
  }
  cumulativeStatusapi() {
    let pyload = {
      "UserName": this.iduserName,
      "ChartName": "Cumulative Status"
    }
    this.apiService.pushviewData(pyload).subscribe((res: any) => {
    })
    this.apiService.getCumulativeStatusReport(this.getCumulativeStatus).subscribe((res: any) => {
      console.log(res);
      this.cumulativeStatusCount = res.cumulativeStatusCount[0].open;
      this.cumulativeImplementedCount = res.cumulativeStatusCount[0].implemented;
      this.cumulativeCriticalCount = res.cumulativeStatusCount[0].critical;
      this.cumulativeHighCount = res.cumulativeStatusCount[0].high;
      this.cumulativeMediumCount = res.cumulativeStatusCount[0].medium;
      this.cumulativeLowCount = res.cumulativeStatusCount[0].low;
      this.cumulativeClosedCount = res.cumulativeStatusCount[0].closedCount;
      this.cumulativeDCRCount = res.cumulativeStatusCount[0].dcr;
      this.cumulativeSCECount = res.cumulativeStatusCount[0].sce;
      this.cumulativeTotalCount = res.cumulativeStatusCount[0].totalCount;

    })
  }
  accordianapicall() {
    this.cumulativeStatusapi();
    this.openTargetapi();
    this.openDomainapi();
    this.openDomainDebugapi();
    this.openIngredientapi();
    this.implementedReasonapi();
    this.openStatusapi();
  }
  isDomainAllSelected = true;
  toggleAllDomain(event) {
    if (!this.isDomainAllSelected) {
      this.selectDomains.options.forEach((item: MatOption) => item.select());
      this.isDomainAllSelected = true;
      this.domain = "all";
      this.trendDomainchart(this.preSelectedList);
    } else {
      this.selectDomains.options.forEach((item: MatOption) => item.deselect());
      this.isDomainAllSelected = false;
      this.domain = this.preSelectedList.join(",");
      this.trendDomainchart(this.preSelectedList);
    }
  }
  selectDomain($event) {
    this.selectDomains.options.forEach((item: MatOption) => {
      if (item.value == 'all') {
        item.deselect();
        this.isDomainAllSelected = false;
      }
    });
    this.domain = this.preSelectedList.join(",");
    this.trendDomainchart(this.preSelectedList);
  }
  getCal() {
    this.apiService.GetCalculations().subscribe((res: any) => {
      this.getCalvalue = res.calculationInfo;
    })
  }
  getCalvalueTrendChartByDomain: any;
  getCalTrendChartByDomain() {
    let that = this;
    let chartdetails = {};
    chartdetails['COUNTTYPE'] = 'Closed';
    chartdetails['CHARTDATE'] = "36'21";
    chartdetails['CHARTTYPE'] = that.duration;
    chartdetails['platform'] = that.platformName;
    chartdetails['Domain'] = that.preSelectedList.join(',');
    this.apiService.GetCalculationsTrendChartByDomain(chartdetails).subscribe((res: any) => {

      this.getCalvalueTrendChartByDomain = res.calculationInfo;
    })
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
    this.columnGlobalFilter('exposure')
  }
  changeExposureSelected() {

    let exposure = this.exposureList.map(element => element["checked"]);
    if (exposure.indexOf(false) > -1) {
      this.isExposureSelectedAll = false
    } else {
      this.isExposureSelectedAll = true
    }
  }

  columnGlobalFilter(columnName) {

    this.selection.clear();

    switch (columnName) {
      case "exposure":
        let filterData2 = this.exposureList.filter(item => item.checked).map(item1 => item1.exposure)
        this.exposure = filterData2.toString();
        break;
    }
    this.openClosedData('week');
  }
  //exposure filter//



  openDialog2() {
    this.dialogRefopen = this.dialogRef.open(this.callAPIDialog2, {
      height: 'auto',
      width: '50vw',
      disableClose: true
    });
    this.dialogRefopen.afterClosed().subscribe(result => {
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
}
// function getGroupDomainData() {
//   throw new Error('Function not implemented.');
// }
