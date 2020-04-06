// Angular
import {Injectable} from '@angular/core';
// RxJS
import {BehaviorSubject} from 'rxjs';
// Object path
import * as objectPath from 'object-path';
// Services
import {MenuConfigService} from './menu-config.service';

@Injectable()
export class MenuAsideService {
  // Public properties
  public menuList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  /**
   * Service constructor
   *
   * @param menuConfigService: MenuConfigService
   */
  constructor(private menuConfigService: MenuConfigService) {
    this.loadMenu();
  }

  /**
   * Load menu list
   */
  public loadMenu() {
    // get menu list
    console.log(this.menuConfigService.getMenus())
    const menuItems: any[] = objectPath.get(this.menuConfigService.getMenus(), 'aside.items');
    this.menuList$.next(menuItems);
  }
}
