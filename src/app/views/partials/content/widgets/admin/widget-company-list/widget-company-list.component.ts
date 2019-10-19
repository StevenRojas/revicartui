// Angular
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild, EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
// Lodash
import {shuffle} from 'lodash';
// Layout
import {LayoutConfigService} from '../../../../../../core/_base/layout';
import {Client, ClientList} from '../../../../../../core/admin';
import {Router} from '@angular/router';

@Component({
  selector: 'kt-widget-company-list',
  templateUrl: './widget-company-list.component.html',
  styleUrls: ['./widget-company-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetCompanyListComponent implements OnInit {
  // Public properties
  @Input() companySelected: string;
  @Input() data: ClientList;
  @Output() companySelectedEmit = new EventEmitter<number>();
  @ContentChild('actionTemplate', {static: true}) actionTemplate: TemplateRef<any>;

  /**
   * Component constructor
   *
   * @param layoutConfigService: LayoutConfigService
   */
  constructor(
    private layoutConfigService: LayoutConfigService,
    private router: Router
  ) {
    if (!this.data) {
      this.data = new ClientList();
      this.data.default();
    }
  }
  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit() { }

  selectUser(companyId: number) {
    // this.router.navigate(['/admin/workshop/company/' + userId]);
    this.companySelectedEmit.next(companyId)
  }
}
