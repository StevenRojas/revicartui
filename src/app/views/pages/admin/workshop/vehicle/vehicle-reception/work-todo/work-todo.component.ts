import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {WorkCategoryService, WorkSubCategoryService, WorkTodoService} from '../../../../../../../core/admin';
import {fromEvent, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, switchMap} from 'rxjs/operators';
import {SweetAlertOptions} from "sweetalert2";
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'kt-work-todo',
  templateUrl: './work-todo.component.html',
  styleUrls: ['./work-todo.component.scss']
})
export class WorkTodoComponent implements OnInit, OnChanges {
  @Input() vehicleReception: any;
  public addWorkFormGroup: FormGroup;
  public workCategories: Observable<any[]>;
  public workCategorySelected: any;
  public workSubCategories: Observable<any[]>;

  public loading = false;
  public addWorkModalOption: SweetAlertOptions;
  public errorMessage: string;
  @ViewChild('addWorkModal', {static: false}) private addWorkModal: SwalComponent;
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;


  constructor(
    private workCategoryService: WorkCategoryService,
    private workSubCategoryService: WorkSubCategoryService,
    private workTodoService: WorkTodoService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.addWorkModalOption = {
      title: 'Agregar Trabajo',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#5d78ff',
      confirmButtonText: 'Agregar',
      confirmButtonClass: 'btn btn-primary btn-elevate',
      cancelButtonClass: 'btn btn-secondary btn-elevate',
      showLoaderOnConfirm: true,
      focusCancel: true,
      preConfirm: () =>  this.addWork()
    };

    this.initFormControl();
  }

  ngOnChanges(changes) {
    if (this.vehicleReception && this.vehicleReception.id) {

    }
  }
  initFormControl() {
    this.addWorkFormGroup = this.fb.group({
      work_category: ['', Validators.compose([Validators.required])
      ],
      work_subcategory: ['', Validators.compose([Validators.required])
      ],
      price: ['', Validators.compose([Validators.required])
      ],
      quantity: ['', Validators.compose([Validators.required])
      ],
      notes: ['', Validators.compose([Validators.required])
      ],
    });
    this.bindAutocompleteFields();
  }

  bindAutocompleteFields() {
    this.workCategories = this.addWorkFormGroup.controls.work_category.valueChanges.pipe(
      filter(res => res !== null && res !== '' && res !== undefined),
      filter(res => res.length > 1),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap( val => {
        return this.workCategoryService.quickSearch(name);
      })
    );
    this.workSubCategories = this.addWorkFormGroup.controls.work_subcategory.valueChanges.pipe(
      filter(res => res !== null && res !== '' && res !== undefined),
      filter(res => res.length > 1),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap( val => {
        this.errorMessage = undefined;
        if (this.workCategorySelected && this.workCategorySelected.id) {
          return this.workSubCategoryService.quickSearch(name, this.workCategorySelected.id);

        } else {
          this.errorMessage = 'Por favor seleccione antes, una categoria';
          return [];
        }

      })
    );
  }
  openAddWorkModal(event: any) {
    this.addWorkFormGroup.reset();
    this.addWorkModal.fire().then((result) => {
      if (result.value) {
        // After press "Ok" button
      } else {
        // After press "Cancel" button or leave from modal
      }
    });
  }

  addWork() {
    const controls = this.addWorkFormGroup.controls;
    // check form
    if (this.addWorkFormGroup.invalid) {
      Object.keys(controls).forEach(controlName => {
        controls[controlName].markAsTouched();
      });
      return false;
    }
    const response = this.workTodoService.post(this.vehicleReception.id, this.addWorkFormGroup.getRawValue());
    return new Promise((resolve, reject) => {
      response.subscribe(
        (workTodo) => {
          console.log(workTodo)
          resolve();
        }
      );
    });
    // this.workTodoService.post();
  }

  displayName(obj: any): string|undefined {
    return obj ? obj.category : undefined;
  }
  displaySubCategoryName(obj: any): string|undefined {
    return obj ? obj.work + ' Bs. ' + obj.default_price : undefined;
  }
  setCategoryOption(category) {
    this.workCategorySelected = category.option.value;
  }

  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.addWorkFormGroup.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }



  setSubcategoryDefaultOptions(subCategory: any) {
    this.addWorkFormGroup.controls.price.setValue(subCategory.option.value.default_price);
    this.addWorkFormGroup.controls.quantity.setValue(1) ;
  }
}
