// Angular
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Client} from '../../../../core/admin';


@Component({
  selector: 'kt-search-client-result',
  templateUrl: './search-client-result.component.html',
  styleUrls: ['./search-client-result.component.scss']
})
export class SearchClientResultComponent {
  // Public properties
  @Input() data: Client[];
  @Input() noRecordText: string;
  @Output() emitClientSelected = new EventEmitter<Client>();

  public constructor() {}

  clientSelected(client: Client) {
    this.emitClientSelected.next(client);
  }
}
