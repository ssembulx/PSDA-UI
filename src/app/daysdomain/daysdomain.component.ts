import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceAPIService } from '../service-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";



interface CustomColumn {
  possition: number;
  name: string;
  isActive: boolean;
}

@Component({
  selector: 'app-daysdomain',
  templateUrl: './daysdomain.component.html',
  styleUrls: ['./daysdomain.component.css']
})
export class DaysdomainComponent implements OnInit {
  domainDebuginfomation: any;
  daysByDomaininfomation: any;
  selection = new SelectionModel<any>(true, []);
  dataSource1 = new MatTableDataSource(); selectedRow: number;
  editedRows: boolean[];
  public columnShowHideList: CustomColumn[] = [];
  userListMatTabDataSource: any = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'title', 'status', 'exposure', 'domain', 'domain_debug', 'target',
    'progress', 'sysdebug_forum', 'reason', 'isolated', 'priority', 'component', 'owner', 'next_step', 'days_open',
    'board', 'regression', 'from_subject', 'submitted_by', 'ext_access', 'submitter_org', 'soc_stepping', 'target_impact',
    'impact', 'submitted_date', 'closed_date', 'closed_reason', 'repro_on_rvp', 'open_date', 'sysdebug', 'implemented_date', 'verified_date',
    'days_triage', 'qrc_vector', 'days_decimal_triage', 'days_validating', 'days_development', 'days_decimal_debugging', 'tag'];
  domainAverageInfo: any;
  daysByDomainFilterExposureInfo: any;
  selectedDomain = "";
  platformName: any;
  domain = "all";
  status : any;
  exposure : any;
  domainList1: any;
  preSelectedList = ['all'];
  preSelectedListexposure = ['all'];
  preSelectedListstatus = ['all'];
  statusList: any[];
  exposureList: any[];
  isStatusSelectedAll = true;
  isExposureSelectedAll = true;
  constructor(private apiService: ServiceAPIService, private aRouter: ActivatedRoute, private changeDetectorRefs: ChangeDetectorRef) { }
  /** control for the selected bank for multi-selection */
  public bankMultiCtrl: FormControl = new FormControl();
  public bankMultiCtrl1: FormControl = new FormControl();
  public bankMultiCtrl2: FormControl = new FormControl();
  public bankMultiCtrl3: FormControl = new FormControl();
  /* platform selection */
  @ViewChild('select') select: MatSelect;
  @ViewChild('selectDomains') selectDomains: MatSelect;
  @ViewChild('selectStatus') selectStatus: MatSelect;
  @ViewChild('selectExposure') selectExposure: MatSelect;
  domainList;
  selectedTable: any = []; selectedTooltip;
  selectedTable1: any = []; selectedTooltip1;



  ngOnInit(): void {
    this.apiService.getDataFilterList().subscribe((res: any) => {

      this.statusList = res.statusList;
      this.statusList.forEach(element => {

        element["checked"] = true

      });
      this.exposureList = res.exposureList;
      this.exposureList.forEach(element => {

        element["checked"] = true

      });
      
      console.log(this.statusList)

    });
    this.aRouter.queryParamMap.subscribe((data: any) => {
      this.platformName = data.params.platform
      console.log(data)
      if (JSON.stringify(data.params) != '{}') {
        if (data.params.tabletype == "1") {
          let payload =
          {
            "platform": data.params.platform,
            "domain": "all"
          }
          this.apiService.getDaysByDomain(payload).subscribe((res: any) => {
            this.daysByDomaininfomation = res.daysByDomaininfomation;
            this.domainAverageInfo = res.domainAverageInfo
            this.renderChar(this.daysByDomaininfomation, this.domainAverageInfo);
            console.log(this.daysByDomaininfomation);
            this.domainList = this.daysByDomaininfomation;
            this.dataSource1 = this.daysByDomaininfomation;
            this.dataSource1.data = this.daysByDomaininfomation;
            this.userListMatTabDataSource = new MatTableDataSource<any>(this.daysByDomaininfomation);
            this.daysByDomaininfomation.forEach((d, index) => {
              this.selectedTable.push(d.domain);
            });
            this.selectedTooltip = this.selectedTable.toString();
          })
        }
      } else {
        console.log('Something went wrong')
      }
    })


    this.aRouter.queryParamMap.subscribe((data: any) => {
      this.platformName = data.params.platform
      console.log(data)
      if (JSON.stringify(data.params) != '{}') {
        if (data.params.tabletype == "1") {
          let payload =
          {
            "platform": data.params.platform,
            "domain": "all",
            "status":"",
            "exposure":""
          }
          
          this.apiService.getDaysByDomainfilter(payload).subscribe((res: any) => {
            
            this.daysByDomaininfomation = res.daysByDomainFilterStatusInfo;
            this.domainAverageInfo = res.daysByDomainFilterExposureInfo
            this.renderChar(this.daysByDomaininfomation, this.domainAverageInfo);
            console.log(this.daysByDomaininfomation);
            this.domainList1 = this.daysByDomaininfomation;
            this.domainList1.forEach(element => {
              this.preSelectedList.push(element.domain);
            });
            console.log(this.preSelectedList)
            console.log(this.domainList1)
            //------domain
            // let domainall = [];
            // this.daysByDomaininfomation.forEach(element => {
            //   domainall.push(element.domain);
            // });
            // console.log(domainall)
            // let domain = [];  
            // domainall.forEach((item) => {
            //   if(!domain.includes(item)){  
            //     domain.push(item);  
            //   }  
            // });  
            // console.log(domain);  
            // this.domainList1 = domain;
            // this.domainList1.forEach(element => {
            //   this.preSelectedList.push(element);
            // });
            // console.log(this.preSelectedList)
            // console.log(this.domainList1)
            //this.statusList = this.daysByDomaininfomation;
            //---------status
            // let statusall = [];
            // this.daysByDomaininfomation.forEach(element => {
            //   statusall.push(element.status);
            // });
            // console.log(statusall)
            // let status = [];  
            // statusall.forEach((item) => {  
            //   if(!status.includes(item)){  
            //     status.push(item);  
            //   }  
            // });  
            // console.log(status);  
            // this.statusList = status;
            // this.statusList.forEach(element => {
            //   this.preSelectedListstatus.push(element);
            // });
            // console.log(this.preSelectedListstatus)
            // console.log(this.statusList)

            // //exposure ----------------
            // let exposureall = [];
            // this.daysByDomaininfomation.forEach(element => {
            //   exposureall.push(element.exposure);
            // });
            // console.log(exposureall)
            // let exposure = [];  
            // exposureall.forEach((item) => {
            //   if(!exposure.includes(item)){  
            //     exposure.push(item);  
            //   }  
            // });  
            // console.log(exposure);  
            // this.exposureList = exposure;
            // this.exposureList.forEach(element => {
            //   this.preSelectedListexposure.push(element);
            // });
            // console.log(this.preSelectedListexposure)
            // console.log(this.exposureList)
            // let animals = ["Lion", "Rabbit", "Mouse", "Monkey", "Lion","Ape"]  
            // let unique = [];  
            // this.preSelectedListstatus.forEach((item) => {  
            //   if(!unique.includes(item)){  
            //       unique.push(item);  
            //   }  
            // });  
            // console.log(unique);  
            // this.preSelectedListstatus = unique;
            //this.exposureList = this.daysByDomaininfomation;
            // this.exposureList.forEach(element => {
            //   this.preSelectedListexposure.push(element.exposure);
            // });
          })
        }
      } else {
        console.log('Something went wrong')
      }
    })
  }
  //status filter//
  columnGlobalFilter(columnName){
    this.selection.clear();
    
  switch (columnName) {
  case "status":
    let filterData1 = this.statusList.filter(item=>item.checked).map(item1=>item1.status)
    this.status = filterData1.toString();
    break;
    case "exposure":
      let filterData2 = this.exposureList.filter(item=>item.checked).map(item1=>item1.exposure)
      this.exposure = filterData2.toString();
    break;
  }
  this.apiCall();
  // console.log(this.columnFilter);
  // let keys = Object.keys(this.columnFilter)
  // let filterData = this.OriginalData;
  // keys.forEach(key => {
  //   if(this.columnFilter[key] && this.columnFilter[key].length > 0){
  //    filterData = filterData.filter(item=>this.columnFilter[key].indexOf(item[key])> -1)
  //   }
  // })
  // this.dataSource.data = filterData;
  // this.dataSource.data.forEach((row : any)  => this.selection.select(row))
  }
  statusSelectedAll(){
    if(this.isStatusSelectedAll){
      this.statusList.forEach(element => {
        element["checked"]=true
      });
    }else{
      this.statusList.forEach(element => {
        element["checked"]=false
      });
    }
  }
  changeStatusSelected(){
    let status = this.statusList.map(element => element["checked"]);
    if(status.indexOf(false) > -1){
      this.isStatusSelectedAll = false
    }else{
     this.isStatusSelectedAll = true
    }
   }
  //status filter//
  //exposure filter//
  exposureSelectedAll(){
    if(this.isExposureSelectedAll){
      this.exposureList.forEach(element => {
        element["checked"]=true
      });
    }else{
      this.exposureList.forEach(element => {
        element["checked"]=false
      });
    }
  }
  changeExposureSelected(){
    let exposure = this.exposureList.map(element => element["checked"]);
    if(exposure.indexOf(false) > -1){
      this.isExposureSelectedAll = false
    }else{
     this.isExposureSelectedAll = true
    }
   }
  //exposure filter//
  selectDomain($event) {
     
    this.selectDomains.options.forEach((item: MatOption) => {
      if (item.value == 'all') {
        item.deselect();
        this.isDomainAllSelected = false;
      }
    });
    this.domain = this.preSelectedList.join(",");
    this.apiCall();
  }
  Selectstatus($event) {
    this.selectStatus.options.forEach((item: MatOption) => {
      if (item.value == 'all') {
        item.deselect();
        this.isStatusAllSelected = false;
      }
    });
    this.status = this.preSelectedListstatus.join(",");
    console.log(this.status)
    this.apiCall();
  }
  selectexposure($event) {
    this.selectExposure.options.forEach((item: MatOption) => {
      if (item.value == 'all') {
        item.deselect();
        this.isExposureAllSelected = false;
      }
    });
    this.exposure = this.preSelectedListexposure.join(",");
    console.log(this.domain)
    this.apiCall();
  }
  apiCall() {
    // let countVal = 0;
    // for (let i = 1; i < this.selectDomains.options.length; i++) {
    //   let value = (document.getElementsByClassName('mat-option')[i])
    //   //checkArr.push(value.getAttribute('aria-selected'))
    //   if(value.getAttribute('aria-selected') == "true"){
    //     countVal = countVal + 1;
    //   }
    //   else{}
    // }
    // console.log(countVal)
    // console.log(this.domain)
    // console.log(this.domain.length)
    // if(this.domain.length >= 634){
    //   this.isDomainAllSelected = true;
    // }else{ this.isDomainAllSelected = false;}
    //  
    let obj =
    {
      "platform": this.platformName,
      "domain": this.domain,
      "status":this.status,
      "exposure":this.exposure
    }
    console.log(obj)
     
    this.apiService.getDaysByDomainfilter(obj).subscribe((res: any) => {
      this.daysByDomaininfomation = res.daysByDomainFilterStatusInfo;
      this.domainAverageInfo = res.daysByDomainFilterExposureInfo;
      this.renderChar(this.daysByDomaininfomation, this.domainAverageInfo);
      console.log(this.daysByDomaininfomation);
    })
    this.renderChar(this.daysByDomaininfomation, this.domainAverageInfo);
  }
  isDomainAllSelected = true;
  toggleAllDomain(event) {
     
    if (!this.isDomainAllSelected) {
      this.selectDomains.options.forEach((item: MatOption) => item.select());
      this.isDomainAllSelected = true;
      this.domain = "all";
      this.apiCall();
    } else {
      this.selectDomains.options.forEach((item: MatOption) => item.deselect());
      this.isDomainAllSelected = false;
      this.domain = this.preSelectedList.join(",");
      this.apiCall();
    }
  }
  isStatusAllSelected = true;
  toggleAllStatus(event) {
     
    if (!this.isStatusAllSelected) {
      this.selectStatus.options.forEach((item: MatOption) => item.select());
      this.isStatusAllSelected = true;
      this.status = "";
      this.apiCall();
    } else {
      this.selectStatus.options.forEach((item: MatOption) => item.deselect());
      this.isStatusAllSelected = false;
      this.status = this.preSelectedListstatus.join(",");
      this.apiCall();
    }
  }
  isExposureAllSelected = true;
  toggleAllExposure(event) {
     
    if (!this.isExposureAllSelected) {
      this.selectExposure.options.forEach((item: MatOption) => item.select());
      this.isExposureAllSelected = true;
      this.exposure = "";
      this.apiCall();
    } else {
      this.selectExposure.options.forEach((item: MatOption) => item.deselect());
      this.isExposureAllSelected = false;
      this.exposure = this.preSelectedListexposure.join(",");
      this.apiCall();
    }
  }

  selected = "All Domain";
  allSelected = true;
  toggleAllSelection() {
    this.tempList = [];
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => {
        item.select();
        this.daysByDomaininfomation.forEach((d, index) => {
          if (d.domain == item.value) {
            this.tempList.push(d);
          }
        });
      });
      this.allSelected = false;
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
      this.allSelected = true;
      this.tempList = [];
    }
    this.dataSource1.data = this.tempList;
    this.dataSource1 = this.tempList;
    this.userListMatTabDataSource = new MatTableDataSource<any>(this.daysByDomaininfomation);
    this.changeDetectorRefs.detectChanges();
  }

  tempList: any = [];
  optionClick() {
    this.tempList = [];
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
      } else if (item.selected) {
        this.daysByDomaininfomation.forEach((d, index) => {
          if (d.domain == item.value) {
            this.tempList.push(d);
          }
        });
      }
    });
    this.dataSource1.data = this.tempList;
    this.dataSource1 = this.tempList;
    this.userListMatTabDataSource = new MatTableDataSource<any>(this.daysByDomaininfomation);
    this.changeDetectorRefs.detectChanges();
  }

  fullScreenFlag = false;
  
  getfullScreen() {
    this.fullScreenFlag = !this.fullScreenFlag
  }
  getAlldata() {
    //this.ingredientSightingInfo()
  }

  rowClick(rowId) {
    this.selectedRow = rowId;
  }

  //Table selection 
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource1.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource1.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  // Apply filter 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
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

  initializeColumnProperties() {
    this.displayedColumns.forEach((element, index) => {
      this.columnShowHideList.push(
        { possition: index, name: element, isActive: true }
      );
    });

  }

  renderChar(daysByDomaininfomation, domainAverageInfo) {
     
    if (!daysByDomaininfomation || domainAverageInfo.length === 0){
      let chart = am4core.create('chartdiv', am4charts.XYChart)
      const noDataMessagecontainer = chart.chartContainer.createChild(am4core.Container);
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
      messageLabel.maxWidth = 300;
      messageLabel.wrap = true;
    }
    else{
      am4core.useTheme(am4themes_animated);
      am4core.options.autoSetClassName = true;
      am4core.options.commercialLicense = true;
  
      let chart = am4core.create('chartdiv', am4charts.XYChart)
      chart.colors.list = [
        am4core.color("#003f5c"),
        am4core.color("#11ada3"),
        am4core.color("#bc5090"),
        am4core.color("#ff6361"),
        am4core.color("#ffa600"),
        am4core.color("#08aed4"),
      ];
  
      chart.padding(5, 5, 5, 5);
      chart.margin(0, 0, 0, 0);
  
      let xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      xAxis.dataFields.category = 'domain'
      xAxis.maxHeight = 120;
      xAxis.renderer.cellStartLocation = 0.1;
      xAxis.renderer.cellEndLocation = 0.9;
      xAxis.renderer.grid.template.location = 0;
      xAxis.title.text = "[bold]" + 'Domain';
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
      yAxis.maxWidth = 120;
      yAxis.title.text = '[bold] Average Days';
      yAxis.renderer.labels.template.fill = am4core.color("#000000");
      yAxis.renderer.labels.template.fontSize = 14;
      yAxis.renderer.minGridDistance = 20;
  
      let range = yAxis.axisRanges.create();
      range.value = domainAverageInfo[0].days_open_average;
      range.grid.stroke = am4core.color("#08aed4");
      range.label.fill = am4core.color("#000");
      range.label.fontSize = 10;
      range.grid.strokeWidth = 1;
      range.grid.strokeOpacity = 1;
      range.label.inside = true;
      range.label.text = "Days Open =" + domainAverageInfo[0].days_open_average;;
      range.label.verticalCenter = "bottom";
  
      let range1 = yAxis.axisRanges.create();
      range1.value = domainAverageInfo[0].days_complete_average;
      range1.grid.stroke = am4core.color("#ffa600");
      range1.label.fill = am4core.color("#000");
      range1.label.fontSize = 10;
      range1.grid.strokeWidth = 1;
      range1.grid.strokeOpacity = 1;
      range1.label.inside = true;
      range1.label.text = "Days Complete = " + domainAverageInfo[0].days_complete_average;
      range1.label.verticalCenter = "bottom";
  
      let range2 = yAxis.axisRanges.create();
      range2.value = domainAverageInfo[0].days_Verified_average;
      range2.grid.stroke = am4core.color("#ff6361");
      range2.label.text = "Days Verified = " + domainAverageInfo[0].days_Verified_average;
      range2.grid.strokeWidth = 1;
      range2.grid.strokeOpacity = 1;
      range2.label.inside = true;
      range2.label.fill = am4core.color("#000");
      range2.label.fontSize = 10;
      range2.label.verticalCenter = "bottom";
  
  
      let range3 = yAxis.axisRanges.create();
      range3.value = domainAverageInfo[0].days_rejected_average;
      range3.grid.stroke = am4core.color("#bc5090");
      range3.grid.strokeWidth = 1;
      range3.grid.strokeOpacity = 1;
      range3.label.inside = true;
      range3.label.text = "Days Rejected = " + domainAverageInfo[0].days_rejected_average;
      range3.label.fill = am4core.color("#000");
      range3.label.fontSize = 10;
      range3.label.verticalCenter = "bottom";
  
      let range4 = yAxis.axisRanges.create();
      range4.value = domainAverageInfo[0].days_implemented_average;
      range4.grid.stroke = am4core.color("#11ada3");
      range4.grid.strokeWidth = 1;
      range4.grid.strokeOpacity = 1;
      range4.label.inside = true;
      range4.label.text = "Days Implemented = " + domainAverageInfo[0].days_implemented_average;
      range4.label.fill = am4core.color("#000");
      range4.label.fontSize = 10;
      range4.label.verticalCenter = "bottom";
  
      let range5 = yAxis.axisRanges.create();
      range5.value = domainAverageInfo[0].days_decimal_triage_average;
      range5.grid.stroke = am4core.color("#003f5c");
      range5.grid.strokeWidth = 1;
      range5.grid.strokeOpacity = 1;
      range5.label.inside = true;
      range5.label.text = "Days Decimal Triage = " + domainAverageInfo[0].days_decimal_triage_average;
      range5.label.fill = am4core.color("#000");
      range5.label.fontSize = 10;
      range5.label.verticalCenter = "bottom";
  
      function createSeries(value: any, name: any, count: any) {
        let a = count
        let series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.value = count
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'domain'
        series.name = name
        series.columns.template.width = am4core.percent(100);
        series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px] Mean: {valueY}\n count:{value}"
  
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
  
      chart.data = daysByDomaininfomation;
  
      createSeries('days_decimal_triage_mean', 'Days Decimal Triage', 'days_decimal_triage_count');
      createSeries('days_implemented_mean', 'Days Implemented', 'days_implemented_count');
      createSeries('days_rejected_mean', 'Days Rejected', 'days_rejected_count');
      createSeries('days_Verified_mean', 'Days Verified', 'days_Verified_count');
      createSeries('days_complete_mean', 'Days Complete', 'days_complete_count');
      createSeries('days_open_mean', 'Days Open', 'days_open_count');
  
  
      function TraigeLineSeries(value, name, axis) {
        var lineSeries = chart.series.push(new am4charts.LineSeries());
        lineSeries.name = name;
        lineSeries.dataFields.valueY = value;
        lineSeries.dataFields.categoryX = "domain";
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
  
      chart.legend = new am4charts.Legend();
      chart.legend.position = "bottom";
      chart.legend.contentAlign = "center";
  
      chart.scrollbarX = new am4core.Scrollbar();
      chart.scrollbarX.parent = chart.bottomAxesContainer;
  
      xAxis.start = 0.8;
      xAxis.end = 1;
    }
  }

}




