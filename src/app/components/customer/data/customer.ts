import { MatPaginator } from '@angular/material/paginator';

export interface Customer {
    id: number
    name: string
    email: string
    phone: string
    nationalId: string

    paginator: MatPaginator
}