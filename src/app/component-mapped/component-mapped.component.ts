import { Component, OnInit, ViewChild, Pipe, PipeTransform, ViewChildren, QueryList, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceAPIService } from '../service-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { DomSanitizer } from '@angular/platform-browser';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { ModelpopupComponent } from '../modelpopup/modelpopup.component';
import { MatDialog } from '@angular/material/dialog';
import { EditdialogComponent } from '../dialog/edit/editdialog.component';
import { NotifierService } from 'angular-notifier';
class User {
  id: Number;
  userName: String;
  password: String;
  email: String;
  contactNo: String;
  address: String;
  searchResult: string = "";
  edited: Boolean;
}
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
  selector: 'app-component-mapped',
  templateUrl: './component-mapped.component.html',
  styleUrls: ['./component-mapped.component.css']
})
export class ComponentMappedComponent implements OnInit {
  idVale: number;
  @ViewChild('deleteMappedComponent') deleteMappedComponent: TemplateRef<any>;
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChildren('checkBox') checkBox: QueryList<any>;
  mainComponent: any;
  selected: any;
  id: string;
  getOpenStatusOnlyResultInfo: any;
  userList: User[];
  selectedRow: number;
  searchResult: string = "";
  editedRows: boolean[];
  public columnShowHideList = [];
  userListMatTabDataSource: any = new MatTableDataSource<User>(this.getAlldata());
  OriginalData: any;
  fileName = 'ExcelSheet';
  selection = new SelectionModel<any>(true, []);
  ddvlaue$: { statusList: { status: string; }[]; exposureList: { exposure: string; }[]; domainList: { domain: string; }[]; domainDebugList: { domainDebug: string; }[]; isSuccess: boolean; message: any; };
  dataSource = new MatTableDataSource();
  changeValue: { ComponentID: string, ComponentName: string, Flag: number, ISDeleted: number, User: any, MappedComponentID: number, ModuleID: number }
  defaultColumns: string[] = ['selection_column', 'id', 'promoted_ID', 'title', 'status', 'exposure', 'domain', 'domain_debug', 'reason', 'sysdebug_forum', 'suspected_Ingredient',
    'count', 'target', 'progress', 'regression', 'priority', 'component', 'qrc_vector', 'days_open', 'tag', 'isolated', 'owner', 'next_step',
    'board', 'from_subject', 'submitted_by', 'ext_access', 'submitter_org', 'soc_stepping', 'target_impact',
    'impact', 'submitted_date', 'open_date', 'closed_date', 'closed_reason', 'repro_on_rvp', 'implemented_date', 'verified_date',
    'days_triage', 'days_decimal_triage', 'days_validating', 'days_development', 'days_decimal_debugging',
    'ingredient', 'updated_by', 'updated_date'];
  // displayedColumns: string[] = ['selection_column', 'id', 'promoted_ID', 'title', 'status', 'exposure', 'domain', 'domain_debug', 'reason','sysdebug_forum', 'suspected_Ingredient','count'];
  displayedColumns: string[] = ['selection_column', 'id', 'promoted_ID', 'title', 'status', 'exposure'];
  getImplementedReasonHSDESInfo: any;
  getOpenStatusExposureHSDESInfo: any;
  cumulativeStatusHSDES: User[];

  domainDebugList: any;
  statusList: any;
  exposureList: any;
  domainList: any;
  targetList: any;
  progressList: any;
  qrcvectorList: any;

  isDomainSelectedAll = false;
  isStatusSelectedAll = false;
  isExposureSelectedAll = false;
  isDomainDebugSelectedAll = false;

  isTargetSelectedAll = false;
  isProgressSelectedAll = false;
  isQrcvectorSelectedAll = false;
  select_all = false;
  downloadSelection: any[];
  columnFilter = {
    "status": "",
    "exposure": "",
    "domain": "",
    "domain_debug": "",
    "target": "",
    "progress": "",
    "qrc_vector": ""
  };
  platform: any;
  searchTerm: string;
  editedComponent: any;
  deleteComponent: any;

  constructor(private notifier: NotifierService, private apiService: ServiceAPIService, private aRouter: ActivatedRoute, private dialogRef: MatDialog) {
    this.notifier = notifier;
  }

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

    this.getAlldata();
    console.log(this.userList);
    this.userListMatTabDataSource.paginator = this.paginator;
    this.userListMatTabDataSource.sort = this.sort;

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

    let payload2 = {
      "ComponentID": "0",
      "ComponentName": "",
      "Flag": 1,
      "ISDeleted": 0,
      "User": "",
      "MappedComponentID": "0",
      "ModuleID": 0
    }
    this.apiService.getMainComponentList(payload2).subscribe((res: any) => {
      console.log("testdata" + res.getmaincomponent)
      this.mainComponent = res.getmaincomponent;
      this.selected = this.mainComponent[0].componentID;
    })
    let payload1 =
    {
      "ComponentID": "1",
      "ComponentName": "",
      "Flag": 2,
      "ISDeleted": 0,
      "User": "",
      "MappedComponentID": 0,
      "ModuleID": 0
    }
    this.apiService.getMappedComponentList(payload1).subscribe((res: any) => {
      this.getOpenStatusOnlyResultInfo = res.getmappedComponentdata;
      console.log(this.getOpenStatusOnlyResultInfo);
      this.dataSource.data = this.getOpenStatusOnlyResultInfo;
      this.OriginalData = this.getOpenStatusOnlyResultInfo;
      this.userListMatTabDataSource = new MatTableDataSource<User>(this.getOpenStatusOnlyResultInfo);
      this.OriginalData = this.getOpenStatusOnlyResultInfo
      this.masterToggle()
    })
  }
  fullScreenFlag4 = false;
  getfullScreen4() {
    this.fullScreenFlag4 = !this.fullScreenFlag4
  }

  getImplementedReason(payload) {
    this.apiService.getImplementedReasonResult(payload).subscribe((res: any) => {
      console.log(res);
      this.getImplementedReasonHSDESInfo = res.getImplementedReasonHSDESInfo;
      this.dataSource.data = this.getImplementedReasonHSDESInfo;
      this.OriginalData = this.getImplementedReasonHSDESInfo;
      this.OriginalData = JSON.parse(JSON.stringify(this.getImplementedReasonHSDESInfo));
      this.masterToggle()
      this.userListMatTabDataSource = new MatTableDataSource<User>(this.getImplementedReasonHSDESInfo);
    })
  }

  getOpenStatusExposure(payload) {
    this.apiService.getOpenStatusExposureResult(payload).subscribe((res: any) => {
      console.log(res.getOpenStatusExposureHSDESInfo);
      this.getOpenStatusExposureHSDESInfo = res.getOpenStatusExposureHSDESInfo;
      this.dataSource.data = this.getOpenStatusExposureHSDESInfo;
      this.OriginalData = this.getOpenStatusExposureHSDESInfo;
      this.OriginalData = JSON.parse(JSON.stringify(this.getOpenStatusExposureHSDESInfo));
      this.masterToggle()
      this.userListMatTabDataSource = new MatTableDataSource<User>(this.getOpenStatusExposureHSDESInfo);
    })

  }

  getCumulativeStatusReport(payload) {
    this.apiService.getCumulativeStatusReport(payload).subscribe((res: any) => {
      console.log(res);
      this.cumulativeStatusHSDES = res.cumulativeStatusHSDES;
      this.dataSource.data = this.cumulativeStatusHSDES;
      this.OriginalData = this.cumulativeStatusHSDES;
      this.OriginalData = JSON.parse(JSON.stringify(this.cumulativeStatusHSDES));
      this.masterToggle()
      this.userListMatTabDataSource = new MatTableDataSource<User>(this.cumulativeStatusHSDES);

    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAlldata() {
    return this.getOpenStatusOnlyResultInfo;
  }

  rowClick(rowId) {
    this.selectedRow = rowId;
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
          label: "SL NO.",
          property: "mappedComponentID"
        }, {
          label: "INGREDIENTS NAME",
          property: "mainComponentName"
        }, {
          label: "COMPONENT NAME(HSDES)",
          property: "componentName"
        }, {
          label: "CREATED BY",
          property: "createdby"
        }, {
          label: "CREATED DATE",
          property: "createdDate"
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
            workSheet.getCell('A' + [i + 2]).value = i + 1;
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

  navigateToHSDESPage(sightingId) {

    window.open('https://hsdes.intel.com/appstore/article/#/' + sightingId);

  }
  //Table selection 
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    this.downloadSelection = this.selection.selected;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    //this.selection.select(...this.dataSource.data);
    this.dataSource.data.forEach((row: any) => this.selection.select(row))

  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  // Apply filter 
  applyTagFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.data = this.OriginalData.filter(item => item['tag'].trim().toLowerCase().includes(filterValue.trim().toLowerCase()))
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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
    this.dataSource.data = filterData;
    this.dataSource.data.forEach((row: any) => this.selection.select(row))
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

  updateSearch(e) {
    this.searchTerm = e.target.value
  }
  startEdit(mappedComponentID, mainComponentName, componentName, createdby, createdDate) {
    this.editedComponent = {};
    this.editedComponent = { mappedComponentID: mappedComponentID, mainComponentName: mainComponentName, componentName: componentName, createdby: createdby, createdDate: createdDate };

    const dialogRef = this.dialogRef.open(this.callAPIDialog, {
      data: { mappedComponentID: mappedComponentID, mainComponentName: mainComponentName, componentName: componentName, createdby: createdby, createdDate: createdDate },
      height: 'auto',
      width: '30vw',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("dialog closed")

      this.refreshTable();
      this.masterToggle();
    });
  }
  updateEdit() {
    debugger;
    console.log(this.editedComponent)
    let id = this.editComponentDropdown(this.editedComponent.mainComponentName)
    let value = (id.componentID).toString();
    let payload2 = {
      "ComponentID": value,
      "ComponentName": this.editedComponent.mainComponentName,
      "Flag": 3,
      "ISDeleted": 0,
      "User": this.editedComponent.createdby,
      "MappedComponentID": this.editedComponent.mappedComponentID,
      "MainComponentName": this.editedComponent.componentName
    }
    this.apiService.EditSaveComponent(payload2).subscribe((res: any) => {
      console.log("testdata" + res.getmaincomponent)
      if (res) {
        this.dialogRef.closeAll();
        this.showNotification('success', 'Component has been updated successfully');
        this.changeComponentDropdown(value);
        this.selected = value;
      }
    })
  }
  deleteEdit(mappedComponentID, mainComponentName, componentName, createdby, createdDate) {
    this.deleteComponent = {};
    this.deleteComponent = { mappedComponentID: mappedComponentID, mainComponentName: mainComponentName, componentName: componentName, createdby: createdby, createdDate: createdDate };
    const dialogRef = this.dialogRef.open(this.deleteMappedComponent, {
      data: { mappedComponentID: mappedComponentID, mainComponentName: mainComponentName, componentName: componentName, createdby: createdby, createdDate: createdDate },
      height: 'auto',
      width: '30vw',
      disableClose: true
    });
  }
  onYesClick(data) {
    let id = this.editComponentDropdown(this.deleteComponent.mainComponentName)
    let value = (id.componentID).toString();
    let payload2 = {
      "ComponentID": value,
      "ComponentName": this.deleteComponent.mainComponentName,
      "Flag": 4,
      "ISDeleted": 1,
      "User": this.deleteComponent.createdby,
      "MappedComponentID": this.deleteComponent.mappedComponentID,
      "MainComponentName": this.deleteComponent.componentName
    }
    this.apiService.DeleteComponent(payload2).subscribe((res: any) => {
      console.log("testdata" + res.getmaincomponent)
      if (res) {
        this.dialogRef.closeAll();
        this.showNotification('success', 'Component has been updated successfully');
        this.changeComponentDropdown(value);
        this.selected = value;
      }
    })
  }
  cancelClick() {
    this.dialogRef.closeAll();
  }
  changeComponentDropdown(id) {
    this.changeValue = {
      "ComponentID": id,
      "ComponentName": "",
      "Flag": 2,
      "ISDeleted": 0,
      "User": "",
      "MappedComponentID": 0,
      "ModuleID": 0
    }
    this.apiService.getMappedComponentList(this.changeValue).subscribe((res: any) => {
      this.selection.clear();
      this.getOpenStatusOnlyResultInfo = [];
      this.getOpenStatusOnlyResultInfo = res.getmappedComponentdata;
      console.log(this.getOpenStatusOnlyResultInfo);
      this.dataSource.data = [];
      this.OriginalData = [];
      this.userListMatTabDataSource = [];
      this.dataSource.data = this.getOpenStatusOnlyResultInfo ?? "";
      this.OriginalData = this.getOpenStatusOnlyResultInfo;
      this.userListMatTabDataSource = new MatTableDataSource<User>(this.getOpenStatusOnlyResultInfo);
      this.masterToggle();
    })
  }




  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  clearInput(arg) {
    this.searchResult = "";
    this[arg] = '';
  }
  editComponentDropdown(findVal) {
    this.mainComponent
    let obj = this.mainComponent.find(o => o.componentName === findVal);
    return obj
  }
}