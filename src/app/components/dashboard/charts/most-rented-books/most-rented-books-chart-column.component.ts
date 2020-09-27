import { BookService } from './../../../book/book.service';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { min } from 'rxjs/operators';

@Component({
  selector: 'app-most-rented-books-chart-column',
  templateUrl: './most-rented-books-chart-column.component.html',
  styleUrls: ['./most-rented-books-chart-column.component.sass']
})
export class MostRentedBooksChartColumnComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public barChartLabels: Label[] = ['Até a Data Atual'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getDashboardInfoBar().subscribe((response) => {
      if (response) {
        response.forEach(bookData => {
          this.barChartData.push({data: [bookData.rentedQuantity], label: bookData.title})
        })
      }
    })
  }
}
