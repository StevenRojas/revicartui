import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Company, CompanyPagination, CompanyService} from '../../../../../../core/admin';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, switchMap} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material';

@Component({
  selector: 'kt-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit, OnChanges {
  @Input() company: Company;
  @Output() companyUpdateEmit = new EventEmitter<Company>();

  public loading = false;
  public errors: any = [];
  public registerCompanyForm: FormGroup;
  public parentAutoComplete: FormControl = new FormControl();
  public parents: Observable<Company[]>;
  // public responsibles: Observable<any[]>;
  constructor(
    private translate: TranslateService,
    private fb: FormBuilder,
    private router: Router,
    private companyService: CompanyService
  ) {
    this.company = new Company();
    this.company.clear();
  }

  ngOnInit() {
    this.initRegisterCompanyForm();
    this.initQuickSearch();
  }

  ngOnChanges(changes) {
    if (this.registerCompanyForm) {
      this.loadCompanyChange();
    }
  }

  initRegisterCompanyForm() {
    this.registerCompanyForm = this.fb.group({
      id: ['', Validators.compose([])
      ],
      vehicle_count: ['', Validators.compose([])
      ],
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
    this.loadCompanyChange();
  }

  loadCompanyChange() {
    if (this.company.id) {
      this.registerCompanyForm.get('id').setValue(this.company.id);
    }
    if (this.company.has_alert) {
      this.registerCompanyForm.get('has_alert').setValue(this.company.has_alert);
    }
    this.registerCompanyForm.get('parent').setValue(this.company.parent);

    this.registerCompanyForm.get('vehicle_count').setValue(this.company.vehicle_count);
    this.registerCompanyForm.get('name').setValue(this.company.name);
    this.registerCompanyForm.get('phone').setValue(this.company.phone);
    this.registerCompanyForm.get('email').setValue(this.company.email);
    this.registerCompanyForm.get('address').setValue(this.company.address);
    this.registerCompanyForm.get('nit').setValue(this.company.nit);
  }

  submit() {
    const controls = this.registerCompanyForm.controls;
    // check form
    if (this.registerCompanyForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    this.loading = true;
    this.companyService.put(this.registerCompanyForm.getRawValue()).subscribe(
      (company: Company) => {
        this.updatedCompany(company as Company);
        setTimeout(() => {
          this.loading = false;
          this.registerCompanyForm.markAsDirty({
            onlySelf: false
          });
        }, 900);
      }
    );
  }

  updatedCompany(company: Company) {
    console.log(company)
    this.companyUpdateEmit.emit(company);
  }
  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.registerCompanyForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  displayCompanyName(company: Company): string|undefined {
    return company ? company.name : undefined;
  }

  getParents(companyName) {
    return this.companyService.quickSearch(companyName);
  }

  // getResponsible(name: string) {
  //   return this.companyService.quickSearchResponsible(this.company.id, name);
  // }

  private initQuickSearch() {
    this.parents = this.registerCompanyForm.controls.parent.valueChanges.pipe(
      filter(res => res !== null && res !== '' && res !== undefined),
      filter(res => res.length > 2),
      debounceTime(600),
      distinctUntilChanged(),
      switchMap( val => {
        return this.getParents(val);
      })
    );

    // this.responsibles = this.registerCompanyForm.controls.responsible.valueChanges.pipe(
    //   filter(res => res !== null && res !== '' && res !== undefined),
    //   filter(res => res.length > 2),
    //   debounceTime(600),
    //   distinctUntilChanged(),
    //   switchMap(val => {
    //     return this.getResponsible(val);
    //   })
    // );
  }
}
