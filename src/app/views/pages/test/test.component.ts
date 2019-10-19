import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../../core/admin';
import { Observable } from 'rxjs';


@Component({
  selector: 'kt-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  constructor(
    private clientService: ClientService
  ) { }
  list: any;
  ngOnInit(): void {
    // this.clientService.all().subscribe(
    //   list => this.list = list
    // );
  }
}
