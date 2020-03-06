import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Vehicle, WorkCategoryService, WorkSubCategoryService, WorkTodoService} from '../../../../../../../core/admin';
import {fromEvent, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, switchMap} from 'rxjs/operators';
import {SweetAlertOptions} from "sweetalert2";
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'kt-work-todo',
  templateUrl: './work-todo.component.html',
  styleUrls: ['./work-todo.component.scss']
})
export class WorkTodoComponent implements OnInit, OnChanges {
  @Input() vehicleReception: any;
  @Input() vehicle: Vehicle;
  public addWorkFormGroup: FormGroup;
  public updateWorkFormGroup: FormGroup;
  public workCategories: Observable<any[]>;
  public workCategorySelected: any;
  public workSubCategories: Observable<any[]>;

  public loading = false;
  public addWorkModalOption: SweetAlertOptions;
  public errorMessage: string;
  @ViewChild('addWorkModal', {static: false}) private addWorkModal: SwalComponent;
  // @ViewChild('searchInput', {static: true}) searchInput: ElementRef;

  /**
   * Work Todo vars
   */
  public displayAddWorkFlag: boolean;
  public workTodoList: any[];
  public workCategoryRef: any[];
  public subTotal: number;
  /**
   *
   * @param workCategoryService
   * @param workSubCategoryService
   * @param workTodoService
   * @param fb
   */

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
      this.workCategoryService.all().subscribe(
        (workCategories) => {
          this.workCategoryRef = workCategories;
          this.getWorkTodos();
        }
      )
    }
  }

  getWorkTodos() {
    this.workTodoService.all(this.vehicleReception.id).subscribe(
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

    this.bindAutocompleteFields();
  }

  bindAutocompleteFields() {
    this.workCategories = this.workCategoryService.all();
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



  displayName(obj: any): string|undefined {
    return obj ? obj.category : undefined;
  }
  displaySubCategoryName(obj: any): string|undefined {
    return obj ? obj.work + ' Bs. ' + obj.default_price : undefined;
  }
  setCategoryOption(category) {
    if(category.value.id) {
      this.workSubCategories = this.workSubCategoryService.all(category.value.id, this.vehicle.id, this.vehicle.subtype.id);
    }
    // this.workCategorySelected = category.option.value;
  }

  getSubcategories(categoryId: any) {

  }
  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.addWorkFormGroup.controls[controlName];
    // console.log(control)
    if (!control) {
      return false;
    }
    // console.log(control)
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  controlQuantityAndPrice(value: number) {
    if (!value) {
      return false;
    }

    return true;
  }

  setSubcategoryDefaultOptions(subCategory: any) {
    this.addWorkFormGroup.controls.price.setValue(subCategory.value.price);
    this.addWorkFormGroup.controls.quantity.setValue(1) ;
  }

  /**
   * WORK TODO Section
   */

  cancelTodoWork() {
    this.addWorkFormGroup.reset();
    this.displayAddWorkFlag = false;
  }

  updateTodoWork(formTodo: FormGroup) {
    const controls = formTodo.controls;
    // check form
    if (formTodo.invalid) {
      Object.keys(controls).forEach(controlName => {
        controls[controlName].markAsTouched();
      });
      return false;
    }
    return true;
    // const response = this.workTodoService.post(this.vehicleReception.id, this.addWorkFormGroup.getRawValue());
    // return new Promise((resolve, reject) => {
    //   response.subscribe(
    //     (workTodo) => {
    //       console.log(workTodo)
    //       this.cancelTodoWork();
    //       resolve();
    //     }
    //   );
    // });
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
    const response = this.workTodoService.post(this.vehicleReception.id, this.addWorkFormGroup.getRawValue());
    return new Promise((resolve, reject) => {
      response.subscribe(
        (workTodo) => {
          this.cancelTodoWork();
          this.getWorkTodos();
          resolve();
        }
      );
    });
    // this.workTodoService.post();
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
    this.workTodoService.delete(this.vehicleReception.id, workTodoId).subscribe(
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
  }
}
