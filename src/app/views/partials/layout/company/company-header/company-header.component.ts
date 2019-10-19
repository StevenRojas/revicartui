import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SwalComponent, SwalPortalTargets} from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Company, CompanyService} from '../../../../../core/admin';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, switchMap} from 'rxjs/operators';

@Component({
  selector: 'kt-company-header',
  templateUrl: './company-header.component.html',
  styleUrls: ['./company-header.component.scss']
})
export class CompanyHeaderComponent implements OnInit {
  @Input() companySelected: Company;
  @Output() companyUpdateListRequestEmit = new EventEmitter<Company>();
  @Output() companyAddListRequestEmit = new EventEmitter<Company>();

  @ViewChild('deleteCompanyModal', {static: false}) private deleteCompanyModal: SwalComponent;
  @ViewChild('addCompanyModal', {static: false}) private addCompanyModal: SwalComponent;

  public companyAddFormControl: FormGroup;
  public company: Company; // New company
  public loading = false;
  public addModalOption: SweetAlertOptions;
  public deleteModalOption: SweetAlertOptions;
  public parents: Observable<Company[]>;
  constructor(
    private companyService: CompanyService,
    public readonly swalTargets: SwalPortalTargets,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.initRegisterCompanyForm();
    this.company = new Company();
    this.company.clear();
    this.addModalOption = {
      title: 'Nueva Empresa',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#5d78ff',
      confirmButtonText: 'Crear Empresa',
      confirmButtonClass: 'btn btn-primary btn-elevate',
      cancelButtonClass: 'btn btn-secondary btn-elevate',
      showLoaderOnConfirm: true,
      focusCancel: true,
      preConfirm: () =>  this.addCompany()
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
      preConfirm: () => this.deleteCompany(this.companySelected)
    };

    this.parents = this.companyAddFormControl.controls.parent.valueChanges.pipe(
      // this.parents = this.parentAutoComplete.valueChanges.pipe(
      filter(res => res !== null && res !== '' && res !== undefined),
      filter(res => res.length > 2),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap( val => {
        return this.getParents(val);
      })
    );
  }

  deleteCompany(company: Company) {
    const response = this.companyService.delete(company.id);
    return new Promise((resolve, reject) => {
      response.subscribe(
        () => resolve(),
        error => reject()
      );
    });
  }

  addCompany() {
    const controls = this.companyAddFormControl.controls;
    // check form
    if (this.companyAddFormControl.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return false;
    }
    const response = this.companyService.post(this.companyAddFormControl.getRawValue());
    return new Promise((resolve, reject) => {
      response.subscribe(
        (company) => {
          this.addListRequest(company);
          resolve();
        }
      );
    });
  }

  updateListRequest(company: Company) {
    this.companyUpdateListRequestEmit.emit(company);
  }

  addListRequest(company: Company) {
    this.companyAddListRequestEmit.emit(company);
  }

  openAddCompanyModal(event: any) {
    this.addCompanyModal.fire().then((result) => {
      if (result.value) {
        // TODO Message for confirm creation
      }
    });
  }
  openDeleteCompanyModal(event: any) {
    this.deleteCompanyModal.fire().then((result) => {
      if (result.value) {
        this.updateListRequest(this.companySelected);
      }
    });
  }



  initRegisterCompanyForm() {
    this.companyAddFormControl = this.fb.group({
      has_alert: ['', Validators.compose([])
      ],
      parent: ['', Validators.compose([])
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
      nit: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(200)
      ]),
      ]
    });
  }

  getParents(companyName) {
    return this.companyService.quickSearch(companyName);
  }
  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.companyAddFormControl.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  displayCompanyName(company: Company): string|undefined {
    return company ? company.name : undefined;
  }
}
