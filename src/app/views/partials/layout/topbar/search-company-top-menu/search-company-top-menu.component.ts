// Angular
import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { fromEvent } from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {Company} from '../../../../../core/admin/_models/company';
import {CompanyService} from '../../../../../core/admin/_services/company.service';

@Component({
  selector: 'kt-search-company-top-menu',
  templateUrl: './search-company-top-menu.component.html',
})
export class SearchCompanyTopMenuComponent implements OnInit {
  @Input() icon: string = 'flaticon2-search-1';
  @Input() useSVG: boolean;
  @Input() searchString: string;
  @Output() emitCompanySelected = new EventEmitter<Company>();
  @Output() emitCompanyClear = new EventEmitter<boolean>();

  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;

  public data: any[];
  public result: any[];
  public loading: boolean;
  public pagination = { page: 1, query: undefined, queryId: undefined, limit: 10, sort: 'company.id'};

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  constructor(
    private cdr: ChangeDetectorRef,
    private companyService: CompanyService
  ) {}

  /**
   * On init
   */
  ngOnInit(): void {
    this.result = [];
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      filter(res => res.length > 2),
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((text) => {
      this.pagination.query = text;
      this.loading = true;
      this.companyService.all(this.pagination, true).subscribe(
        (response) => {
          this.data = response.list;
          this.loading = false;
          this.searchInput.nativeElement.focus();
        }
      );
    });
  }

  /**
   * @param $event
   */
  companySelected(company: Company) {
    this.searchInput.nativeElement.value = company.name;
    this.emitCompanySelected.next(company);
  }

  /**
   * Clear search
   *
   * @param e: Event
   */
  clear(e) {
    this.data = null;
    this.pagination = { page: 1, query: undefined, queryId: undefined, limit: 10, sort: 'client.name'};
    this.searchInput.nativeElement.value = '';
    this.emitCompanyClear.next(true);
  }
}
