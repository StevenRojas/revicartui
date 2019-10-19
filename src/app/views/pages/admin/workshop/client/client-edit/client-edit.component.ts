import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {Client, ClientService, Company} from '../../../../../../core/admin';

@Component({
  selector: 'kt-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientEditComponent implements OnInit, OnChanges {
  @Input() client: Client;
  @Output() clientUpdateEmit = new EventEmitter<Client>();

  public loading = false;
  public errors: any = [];
  public registerClientForm: FormGroup;
  constructor(
    private translate: TranslateService,
    private fb: FormBuilder,
    private router: Router,
    private clientService: ClientService
  ) {
    this.client = new Client();
    this.client.clear();
  }

  ngOnInit() {
    this.initRegisterClientForm();
  }
  ngOnChanges(changes) {
    if (this.registerClientForm) {
      this.loadClientChange();
    }
  }

  initRegisterClientForm() {
    this.registerClientForm = this.fb.group({
      id: ['', Validators.compose([])
      ],
      // vehicle_count: ['', Validators.compose([])
      // ],
      has_alert: ['', Validators.compose([])
      ],
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ],
      phone: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ],
      cell_phone: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ],
      email: ['', Validators.compose([
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(320)
      ]),
      ],
      address: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(200)
      ]),
      ],
      business_name: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(200)
      ]),
      ],
      nit: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(200)
      ]),
      ]
    });
    this.loadClientChange();
  }

  loadClientChange() {
    if (this.client.id) {
      this.registerClientForm.get('id').setValue(this.client.id);
    }
    if (this.client.has_alert) {
      this.registerClientForm.get('has_alert').setValue(this.client.has_alert);
    }
    // if (this.client.vehicle_count) {
    //   this.registerClientForm.get('vehicle_count').setValue(this.client.vehicle_count);
    // }
    this.registerClientForm.get('name').setValue(this.client.name);
    this.registerClientForm.get('phone').setValue(this.client.phone);
    this.registerClientForm.get('cell_phone').setValue(this.client.cell_phone);
    this.registerClientForm.get('email').setValue(this.client.email);
    this.registerClientForm.get('address').setValue(this.client.address);
    this.registerClientForm.get('business_name').setValue(this.client.business_name);
    this.registerClientForm.get('nit').setValue(this.client.nit);
  }

  submit() {
    const controls = this.registerClientForm.controls;
    // check form
    if (this.registerClientForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    this.loading = true;

    this.clientService.put(this.registerClientForm.getRawValue()).subscribe(
      (client: Client) => {
        this.updatedClient(client as Client);
        setTimeout(() => {
          this.loading = false;
          this.registerClientForm.markAsDirty({
            onlySelf: false
        });
        }, 900);
      }
    );
  }

  updatedClient(client: Client) {
    this.clientUpdateEmit.emit(client);
  }
  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.registerClientForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  displayCompanyName(company?: Company): string | undefined {
    return company ? company.name : undefined;
  }
}
