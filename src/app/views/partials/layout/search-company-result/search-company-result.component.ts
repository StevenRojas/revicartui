// Angular
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Company} from '../../../../core/admin/_models/company';


@Component({
  selector: 'kt-search-company-result',
  templateUrl: './search-company-result.component.html',
  styleUrls: ['./search-company-result.component.scss']
})
export class SearchCompanyResultComponent {
  // Public properties
  @Input() data: Company[];
  @Input() noRecordText: string;
  @Output() emitCompanySelected = new EventEmitter<Company>();

  public constructor() {}

  companySelected(company: Company) {
    this.emitCompanySelected.next(company);
  }
}
