// Angular
import {Component, Input, OnInit} from '@angular/core';
// RxJS
import {from, Observable, of} from 'rxjs';
// NGRX
// State
import {User} from '../../../../../core/auth';
import {LoginService} from '../../../../../core/auth/_services';
import {LocalStoreService} from '../../../../../core/_base/crud';

// import {currentUser, User} from '../../../../../core/auth';

@Component({
  selector: 'kt-user-profile2',
  templateUrl: './user-profile2.component.html',
})
export class UserProfile2Component implements OnInit {
  // Public properties
  user$: Observable<User> = this.getUser();

  @Input() avatar = true;
  @Input() greeting = true;
  @Input() badge: boolean;
  @Input() icon: boolean;

  /**
   * Component constructor
   *
   * @param store: Store<AppState>
   */
  constructor(
    private loginService: LoginService,
    private localStorage: LocalStoreService
  ) {

  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit(): void {
    // this.user$ = this.store.pipe(select(currentUser));
  }

  /**
   * Log out
   */
  logout() {
    this.loginService.logout();
    // this.store.dispatch(new Logout());
  }

  getUser(): Observable<User> {
    const user = new User();
    user.name = this.localStorage.getItem('user_name');
    user.email = this.localStorage.getItem('user_email');
    return of(user);
  }
}
