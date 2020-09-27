import { PageEvent } from '@angular/material/paginator';
import { HeaderService } from './../../templates/header/header.service';
import { Book } from './data/book';
import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.sass']
})
export class BookComponent implements OnInit {

  books: Book[]
  pageSlice: Book[]
  displayedColumns = ['id', 'title', 'version', 'rentPerDay']

  constructor(
    private bookService: BookService, 
    private dialog: MatDialog,
    private headerService: HeaderService
  ) {
    headerService.headerData.title = "Livros"
    headerService.headerData.icon = "menu_book"
    headerService.headerData.routeUrl = "/books"
  }

  ngOnInit(): void {
    this.refreshData()
  }

  refreshData() {
    this.bookService.read().subscribe((response) => {
      this.books = response.content;
      this.pageSlice = response.content.slice(0, 25)
    })
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize
    let endIndex = event.pageIndex == 0 ? event.pageSize : startIndex + event.pageIndex
    if (endIndex > this.books.length) {
      endIndex = this.books.length
    }
    this.pageSlice = this.books.slice(startIndex, endIndex)
  }
}
