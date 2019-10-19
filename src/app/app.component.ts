import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {LayoutConfigService, SplashScreenService} from './core/_base/layout';
import {NavigationEnd, Router} from '@angular/router';
import {TestComponent} from './views/pages/test/test.component';

@Component({
  selector: 'kt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'revicar-ui';
  loader: boolean;
  private unsubscribe: Subscription[] = [];

  constructor(
    private router: Router,
    private layoutConfigService: LayoutConfigService,
    private splashScreenService: SplashScreenService
  ) { }

  ngOnInit(): void {
    this.loader = this.layoutConfigService.getConfig('loader.enabled');
    const routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // hide splash screen
        this.splashScreenService.hide();

        // scroll to top on every route change
        window.scrollTo(0, 0);

        // to display back the body content
        setTimeout(() => {
          document.body.classList.add('kt-page--loaded');
        }, 500);
      }
    });
    this.unsubscribe.push(routerSubscription);
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }

}
