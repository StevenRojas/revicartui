// Angular
import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { fromEvent } from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {Client, ClientService} from '../../../../../core/admin';

@Component({
  selector: 'kt-search-client-top-menu',
  templateUrl: './search-client-top-menu.component.html',
})
export class SearchClientTopMenuComponent implements OnInit {
  @Input() icon = 'flaticon2-search-1';
  @Input() useSVG: boolean;
  @Input() searchString: string;
  @Output() emitClientSelected = new EventEmitter<Client>();
  @Output() emitClientClear = new EventEmitter<boolean>();

  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;

  public data: any[];
  public result: any[];
  public loading: boolean;
  public pagination = { page: 1, query: undefined, queryId: undefined, limit: 10, sort: 'client.id'};

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  constructor(
    private cdr: ChangeDetectorRef,
    private clientService: ClientService
  ) {}

  /**
   * On init
   */
  ngOnInit(): void {
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
      this.clientService.all(this.pagination).subscribe(
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
  clientSelected(client: Client) {
    this.searchInput.nativeElement.value = client.name;
    this.emitClientSelected.next(client);
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
    this.emitClientClear.next(true);
  }
}
