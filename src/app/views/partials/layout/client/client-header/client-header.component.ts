import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Client, ClientService} from '../../../../../core/admin';
import {SwalComponent, SwalPortalTargets} from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'kt-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.scss']
})
export class ClientHeaderComponent implements OnInit {
  @Input() clientSelected: Client;
  @Output() clientUpdateListRequestEmit = new EventEmitter<Client>();
  @Output() clientAddListRequestEmit = new EventEmitter<Client>();

  @ViewChild('deleteClientModal', {static: false}) private deleteClientModal: SwalComponent;
  @ViewChild('addClientModal', {static: false}) private addClientModal: SwalComponent;

  public clientAddFormControl: FormGroup;
  public client: Client; // New client
  public loading = false;
  public addModalOption: SweetAlertOptions;
  public deleteModalOption: SweetAlertOptions;
  constructor(
    private clientService: ClientService,
    public readonly swalTargets: SwalPortalTargets,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.initRegisterClientForm();
    this.client = new Client();
    this.client.clear();
    this.addModalOption = {
      title: 'Nuevo cliente',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#5d78ff',
      confirmButtonText: 'Crear cliente',
      confirmButtonClass: 'btn btn-primary btn-elevate',
      cancelButtonClass: 'btn btn-secondary btn-elevate',
      showLoaderOnConfirm: true,
      focusCancel: true,
      preConfirm: () =>  this.addClient()
    };
    this.deleteModalOption = {
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#5d78ff',
      confirmButtonText: 'Eliminar',
      confirmButtonClass: 'btn btn-primary btn-elevate',
      cancelButtonClass: 'btn btn-secondary btn-elevate',
      showLoaderOnConfirm: true,
      focusCancel: true,
      preConfirm: () => this.deleteClient(this.clientSelected)
    };
  }

  deleteClient(client: Client) {
    const response = this.clientService.delete(client.id);
    return new Promise((resolve, reject) => {
      response.subscribe(
        () => resolve(),
        error => reject()
      );
    });
  }

  addClient() {
    const controls = this.clientAddFormControl.controls;
    // check form
    if (this.clientAddFormControl.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return false;
    }
    const response = this.clientService.post(this.clientAddFormControl.getRawValue());
    return new Promise((resolve, reject) => {
      response.subscribe(
        (client) => {
          this.addListRequest(client);
          resolve();
        }
      );
    });
  }

  updateListRequest(client: Client) {
    this.clientUpdateListRequestEmit.emit(client);
  }

  addListRequest(client: Client) {
    this.clientAddListRequestEmit.emit(client);
  }

  openAddClientModal(event: any) {
    this.addClientModal.fire().then((result) => {
      if (result.value) {
        // TODO Message for confirm creation
      }
    });
  }
  openDeleteClientModal(event: any) {
    this.deleteClientModal.fire().then((result) => {
      if (result.value) {
        this.updateListRequest(this.clientSelected);
      }
    });
  }



  initRegisterClientForm() {
    this.clientAddFormControl = this.fb.group({
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
  }

  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.clientAddFormControl.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
}
