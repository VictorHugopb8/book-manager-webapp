import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BookComponent } from './components/book/book.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';


const routes: Routes = [
  {
      path: '',
      redirectTo: 'books',
      pathMatch: 'full'
  },
  {
    path: 'books',
    component: BookComponent
  },
  {
    path: 'customers',
    component: CustomerComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
