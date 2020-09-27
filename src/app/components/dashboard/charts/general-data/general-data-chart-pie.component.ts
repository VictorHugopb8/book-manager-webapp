import { BookService } from '../../../book/book.service';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-general-data-chart-pie',
  templateUrl: './general-data-chart-pie.component.html',
  styleUrls: ['./general-data-chart-pie.component.sass']
})
export class GeneralDataChartPieComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Livros Disponíveis', 'Livros Alugados', 'Livros Reservados'];
  public pieChartData: SingleDataSet;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  sumTotal: number = 0;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getDashboardInfoPie().subscribe((response) => {
      if (response) {
        this.pieChartData = [response[0].availableBooks, response[0].rentedBooks, response[0].reservedBooks]
        this.sumTotal = response[0].availableBooks + response[0].rentedBooks + response[0].reservedBooks
      }
    });
  }

}
