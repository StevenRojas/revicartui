// Anglar
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// Layout Directives
// Services
import {
  FirstLetterPipe,
  GetObjectPipe,
  TimeElapsedPipe,
  SafePipe,
  JoinPipe,
  ToggleDirective,
  ImageDirective,
  PrimaryImageDirective,
  OffcanvasDirective,
  MenuDirective,
  HeaderDirective, ContentAnimateDirective, ScrollTopDirective, SparklineChartDirective, StickyDirective, TabClickEventDirective, MomentPipe
} from './_base/layout';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ToggleDirective,
    ImageDirective,
    PrimaryImageDirective,
    OffcanvasDirective,
    MenuDirective,
    HeaderDirective,
    ContentAnimateDirective,
    ScrollTopDirective,
    SparklineChartDirective,
    StickyDirective,
    TabClickEventDirective,
    FirstLetterPipe,
    GetObjectPipe,
    TimeElapsedPipe,
    SafePipe,
    JoinPipe,
    MomentPipe,
  ],
  exports: [
    ToggleDirective,
    ImageDirective,
    PrimaryImageDirective,
    OffcanvasDirective,
    MenuDirective,
    HeaderDirective,
    ContentAnimateDirective,
    ScrollTopDirective,
    SparklineChartDirective,
    StickyDirective,
    TabClickEventDirective,
    FirstLetterPipe,
    GetObjectPipe,
    TimeElapsedPipe,
    SafePipe,
    JoinPipe,
    MomentPipe,
  ],
  providers: []
})
export class CoreModule {
}
