import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {  MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatSort } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';

export interface Data {
  operation: string;
  data: [string];
}

@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.css']
})
export class EditableTableComponent implements OnInit {

  @Input() data: any;
  @Input() columns: any
  @Input() editableColumns: any;
  @Input() dateColumns: any;
  @Input() pageSizeOptions: [string];
  @Input() notification: any;
  @Input() searchable: boolean;
  @Input() maxChar: number;

  @Output() action = new EventEmitter<any>();

  @ViewChild(MatSort) sort: MatSort;

  maxCharsInColumn: number;
  message: string;
  isEnabled: boolean;
  isAddRequired: boolean;
  displayedColumns: string[] = null
  editableFields = [];
  dateFields = [];
  paginationOptions = [];
  readonly notifier: NotifierService;
  k: number;
  rowData: Data;
  isSearchable: boolean;
  selectedRowIndex: number = -1;
 


  dataSource = new MatTableDataSource(null);
  constructor(public dialog: MatDialog, notifierService: NotifierService, private spinner: NgxSpinnerService) {
    this.notifier = notifierService
  }

  ngOnInit() {
    this.displayedColumns = this.columns 
    this.dataSource.data = this.data 
    this.editableFields = this.editableColumns 
    this.dateFields = this.dateColumns 
    this.paginationOptions = this.pageSizeOptions 
    this.dataSource.sort = this.sort; 
    this.isSearchable = this.searchable; 
    this.maxCharsInColumn = this.maxChar; 
    this.isAddRequired = true 
  }
  openEdit(rowData: any, i: number) {
    this.k = i
    this.highlight(rowData)
  }

  closeEdit(rowData: any) {
    this.k = -1
    this.selectedRowIndex = -1;
  }

  formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return year + '-' + [monthIndex + 1] + '-' + day;
  }

  doneEdit(rowData: any) {
    for (var prop in rowData) {
      if (rowData[prop] instanceof Date) {
        rowData[prop] = this.formatDate(rowData[prop])
      }
    }
    rowData["operation"] = 'updated';

    this.spinner.show();
    this.action.emit(rowData);

    if (this.notification && this.notification.length > 0)
      this.UI_notifications(this.notification[0], this.notification[1]);
    else
      this.UI_notifications('', ''); 
  }

  highlight(row) {
    this.selectedRowIndex = row.id;
  }

  UI_notifications(status: string, message: string) {
    setTimeout(() => {
      this.spinner.hide();
      this.closeEdit('UI_notifications')
      this.notifier.notify(status, message);
    }, 1000);

  }
}