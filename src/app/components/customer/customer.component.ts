import { CustomerService } from './customer.service';
import { Customer } from './data/customer';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeaderService } from 'src/app/templates/header/header.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.sass']
})
export class CustomerComponent implements OnInit {

  customers: Customer[]
  pageSlice: Customer[]
  displayedColumns = ['id', 'name', 'email', 'phone', 'nationalId']

  constructor(
    private customerService: CustomerService, 
    private dialog: MatDialog,
    private headerService: HeaderService
  ) {
    headerService.headerData.title = "Clientes"
    headerService.headerData.icon = "supervised_user_circle"
    headerService.headerData.routeUrl = "/customers"
  }

  ngOnInit(): void {
    this.refreshData()
  }

  refreshData() {
    this.customerService.read().subscribe((response) => {
      this.customers = response.content
      this.pageSlice = response.content.slice(0, 25)
    })
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize
    let endIndex = event.pageIndex == 0 ? event.pageSize : startIndex + event.pageIndex
    if (endIndex > this.customers.length) {
      endIndex = this.customers.length
    }
    this.pageSlice = this.customers.slice(startIndex, endIndex)
  }
}
