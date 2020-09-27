import { HeaderService } from 'src/app/templates/header/header.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((matches) => {
      if (matches) {
        return [
          { title: 'Visão Geral', cols: 1, rows: 1 },
          { title: 'Livros Mais Alugados', cols: 1, rows: 1 }
        ]
      }
      return [
        { title: 'Livros Mais Alugados', cols: 2, rows: 2 },
        { title: 'Visão Geral', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private headerService: HeaderService) {
    headerService.headerData.title = 'Dashboard'
    headerService.headerData.icon = 'dashboard'
    headerService.headerData.routeUrl = '/dashboard'
  }

}
