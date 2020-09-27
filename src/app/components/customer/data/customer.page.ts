import { Customer } from './customer';

export interface CustomerPage {
    content: Customer[]
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