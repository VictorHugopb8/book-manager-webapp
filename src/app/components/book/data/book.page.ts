import { Book } from './book';

export interface BookPage {
    content: Book[]
    empty: boolean
    first: boolean
    last: boolean
    number: number
    numberOfElements: number
    size: number
    // sort: {sorted: false, unsorted: true, empty: true}
    totalElements: number
    totalPages: number
}
