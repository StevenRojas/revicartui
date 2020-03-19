import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {
  Vehicle,
  WorkCategoryService,
  WorkSubCategoryService,
  WorkTodoRepairService,
  WorkTodoService
} from '../../../../../../../core/admin';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {SweetAlertOptions} from "sweetalert2";
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {map, startWith} from 'rxjs/operators';
import {isObject} from "util";

@Component({
  selector: 'kt-work-todo-repair',
  templateUrl: './work-todo-repair.component.html',
  styleUrls: ['./work-todo-repair.component.scss']
})
export class WorkTodoRepairComponent implements OnInit, OnChanges {
  @Input() vehicleReception: any;
  @Input() vehicle: Vehicle;
  @Output() totalWorkTodoRepairEmit = new EventEmitter<any>();
  @Output() updateReceptionWorkTodoSectionEmit = new EventEmitter<any>();

  public addWorkFormGroup: FormGroup;
  public updateWorkFormGroup: FormGroup;
  public workCategories: Observable<any[]>;
  public workCategoriesFiltered: Observable<any[]>;
  public workCategorySelected: any;
  public workSubCategories: Observable<any[]>;
  public workSubCategoriesFiltered: Observable<any[]>;

  public loading = false;
  public addWorkModalOption: SweetAlertOptions;
  public errorMessage: string;
  @ViewChild('addWorkModal', {static: false}) private addWorkModal: SwalComponent;

  /**
   * Work Todo vars
   */
  public displayAddWorkFlag: boolean;
  public workTodoList: any[];
  public workCategoryRef: any[];
  public workSubCategoryRef: any[];
  public subTotal: number;

  /**
   *
   * @param workCategoryService
   * @param workSubCategoryService
   * @param workTodoRepairService
   * @param fb
   */

  constructor(
    private workCategoryService: WorkCategoryService,
    private workSubCategoryService: WorkSubCategoryService,
    private workTodoRepairService: WorkTodoRepairService,
    private fb: FormBuilder,
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
    this.workTodoRepairService.updateReceptionInfoMessage.subscribe(
      (message) => {
        switch(message) {
          case 'update':
            this.getWorkTodos();
            break;
          case 'delete':
            break;
          default:
            break;
        }
    });
  }

  ngOnChanges(changes) {
    if (this.vehicleReception && this.vehicleReception.id) {
      this.workCategoryService.all().subscribe(
        (workCategories) => {
          this.workCategoryRef = workCategories;
          /**
           * Bind autocomplete list after get enumerator
           */
          this.workCategoriesFiltered = this.addWorkFormGroup.controls.work_category.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(this.workCategoryRef, value))
          );
          this.getWorkTodos();
        }
      );
    }
  }

  getWorkTodos() {
    this.workTodoRepairService.all(this.vehicleReception.id).subscribe(
      (workTodos) => {
        this.workTodoList = this.formatTodoList(workTodos, this.workCategoryRef);
      }
    );
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
      // notes: ['', Validators.compose([Validators.required])
      // ],
    });
  }
  displayName(obj: any): string|undefined {
    return obj ? obj.category : undefined;
  }
  displaySubCategoryName(obj: any): string|undefined {
    return obj ? obj.work + ' Bs. ' + obj.default_price : undefined;
  }
  setCategoryOption(category) {
    if(category.option.value.id) {
      this.workSubCategoryService.all(category.option.value.id, this.vehicle.id, this.vehicle.subtype.id).subscribe(
        (workSubcategories) => {
          this.workSubCategoryRef = workSubcategories;
          /**
           * Bind autocomplete list after get enumerator
           */
          this.workSubCategoriesFiltered = this.addWorkFormGroup.controls.work_subcategory.valueChanges.pipe(
            startWith(''),
            map(value => this._filterSubcategory(this.workSubCategoryRef, value))
          );
        }
      );
    }
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
    this.addWorkFormGroup.controls.price.setValue(subCategory.option.value.price);
    this.addWorkFormGroup.controls.quantity.setValue(1) ;
  }

  /**
   * WORK TODO Section
   */

  cancelTodoWork() {
    this.addWorkFormGroup.reset();
    this.displayAddWorkFlag = false;
  }

  saveTodoWork() {
    this.addWork();
  }

  displayAddWork(event: any) {
    this.displayAddWorkFlag = true;
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
    const response = this.workTodoRepairService.post(this.vehicleReception.id, this.addWorkFormGroup.getRawValue());
    return new Promise((resolve, reject) => {
      response.subscribe(
        (workTodo) => {
          this.cancelTodoWork();
          this.getWorkTodos();
          resolve();
        }
      );
    });
  }

  private formatTodoList(todos: any[], categories: any[]) {
    this.subTotal = 0;
    let treeResult = [];
    categories.forEach((value, key) => {
      let todosInfo = todos.filter((chain) => {
        return chain.category_id == value.id
      });
      if (todosInfo && todosInfo.length != 0) {
        todosInfo.forEach((value, key) => {
          this.subTotal += value.price;
        });
        this.totalWorkTodoRepairEmit.emit(this.subTotal);
      }
      let todo = {
        'category': value,
        'todos': todosInfo
      };
      treeResult.push(todo)
    });
    return treeResult;
  }

  updateTodoItem(categoryKey, subCategoryKey, newTodoItem) {
    this.workTodoList[categoryKey]['todos'][subCategoryKey] = newTodoItem;
    this.reCalculateSubTotal();
  }

  removeTodoItem(categoryKey, subCategoryKey, workTodoId: any) {
    this.workTodoRepairService.delete(this.vehicleReception.id, workTodoId).subscribe(
      (response) => {
        this.workTodoList[categoryKey]['todos'].splice(subCategoryKey, 1);
        if (this.workTodoList[categoryKey]['todos'].length == 0) {
          this.workTodoList[categoryKey]['todos'] = [];
        }
        this.reCalculateSubTotal();
      }
    )
  }

  reCalculateSubTotal() {
    this.subTotal = 0;
    this.workTodoList.forEach((value, key) => {
      value.todos.forEach((item, key) => {
        this.subTotal += item.price;
      })
    });
    this.totalWorkTodoRepairEmit.emit(this.subTotal)
  }

  /**
   * Acept enumerator with id and name properties
   *
   * @param workEnum
   * @param value
   * @private
   */
  private _filter(workEnum: any[], value: string): any[] {
    if (!isObject(value) && value != '' && value !=undefined && value != null) {
      return workEnum.filter(option => option.category.toLowerCase().indexOf(value.toLowerCase()) >= 0);
    }
    return workEnum;
  }
  /**
   * Acept enumerator with id and name properties
   *
   * @param workEnum
   * @param value
   * @private
   */
  private _filterSubcategory(workEnum: any[], value: string): any[] {
    if (!isObject(value) && value != '' && value !=undefined && value != null) {
      return workEnum.filter(option => option.work.toLowerCase().indexOf(value.toLowerCase()) >= 0);
    }
    return workEnum;
  }
}
