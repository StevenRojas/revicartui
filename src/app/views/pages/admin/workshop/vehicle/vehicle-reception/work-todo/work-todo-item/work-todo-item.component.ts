import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Company, WorkSubCategoryService, WorkTodoRepairService} from '../../../../../../../../core/admin';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {SweetAlertOptions} from "sweetalert2";

@Component({
  selector: 'kt-work-todo-item',
  templateUrl: './work-todo-item.component.html',
  styleUrls: ['./work-todo-item.component.scss']
})
export class WorkTodoItemComponent implements OnInit, OnChanges {
  @Input() category: any;
  /**
   * Worktodo Obj or subcategory value obj
   */
  @Input() worktodo: any;
  /**
   * receptionId, vehicleId and VehicleSubtypeId use for get suggest prices for this vehicle type
   */
  @Input() vehicleId: any;
  @Input() vehicleSubtypeId: any;
  @Input() receptionId: any;
  @Input() readOnlyStatus = true;
  @Output() updateWorkTodoEmit = new EventEmitter<any>();
  @Output() removeWorkTodoEmit = new EventEmitter<any>();
  public updateWorkFormGroup: FormGroup;
  /**
   * Current WorkTodo Selected or subcategory selected
   */
  public workTodoSelected: any;
  /**
   *  Subcategory list for prevent continues calls to api
   */
  public subcategoryList: any[];
  /**
   * Temporal List contain all subcategories
   */
  private tempSubcategoryList: any[];

  @ViewChild('quantityInput', {static: true}) quantityInput: ElementRef;
  @ViewChild('priceInput', {static: true}) priceInput: ElementRef;
  @ViewChild('deleteItemModal', {static: false}) private deleteItemModal: SwalComponent;
  public deleteItemModalOption: SweetAlertOptions;
  constructor(
    private fb: FormBuilder,
    private workSubCategoryService: WorkSubCategoryService,
    private workTodoRepairService: WorkTodoRepairService
  ) {
    this.workTodoSelected = {
      "default_quantity": null,
      "history_price": null,
      "id": null,
      "price": null,
      "work": null
    };
  }

  ngOnInit() {
    this.initFormControl();
    this.bindUpdateValues();
    this.deleteItemModalOption = {
      title: 'Advertencia',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonColor: '#5d78ff',
      confirmButtonText: 'S&iacute;',
      confirmButtonClass: 'btn btn-primary btn-elevate',
      cancelButtonClass: 'btn btn-secondary btn-elevate',
      showLoaderOnConfirm: true,
      type: 'warning',
      focusCancel: true,
      preConfirm: () =>  this.removeWorkTodo()
    };
  }

  ngOnChanges(changes) {
    if (this.category.id && this.worktodo.id) {
      // this.initFormControl();
      // this.bindUpdateValues();
    }
  }

  initFormControl() {
    console.log(this.readOnlyStatus)
    this.updateWorkFormGroup = this.fb.group({
      work_subcategory: [{value: '', disabled: this.readOnlyStatus}, Validators.compose([Validators.required])
      ],
      price: [{value: '', disabled: this.readOnlyStatus}, Validators.compose([Validators.required])
      ],
      quantity: [{value: '', disabled: this.readOnlyStatus}, Validators.compose([Validators.required])
      ]
    });
    this.bindValues();
  }

  public openDeleteModal() {
    this.deleteItemModal.fire().then((result) => {
      if (result.value) {
        // After press "Ok" button
      } else {
        // After press "Cancel" button or leave from modal
      }
    });
  }
  removeWorkTodo() {
    return this.removeWorkTodoEmit.emit(this.worktodo.worktodo_id);
  }

  setSubcategoryDefaultOptions(subcategory: any) {
    this.workTodoSelected = subcategory.value;
    const body = {
      work_subcategory: this.workTodoSelected,
      price: this.workTodoSelected.price,
      quantity: this.workTodoSelected.default_quantity
    };
    this.updateWorkFormGroup.patchValue(body);
    this.changeWorkTodo(body);
  }


  /**
   * Load All subcategories for especific vehicle type, fire when the select input its open
   */
  getSubcategories() {
    if (this.tempSubcategoryList) {
      this.subcategoryList = this.tempSubcategoryList;
      return;
    }
    this.workSubCategoryService.all(this.category.id, this.vehicleId, this.vehicleSubtypeId).subscribe(
      (subcategories) => {
        subcategories.forEach((value, key) => {
          // if (value.id != this.workTodoSelected.id) {
            this.subcategoryList.push(value);
          // }
        });
        this.tempSubcategoryList = this.subcategoryList;
      }
    )
  }

  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    if (!this.updateWorkFormGroup) {
      return true;
    }
    const control = this.updateWorkFormGroup.controls[controlName];
    if (!control) {
      return false;
    }
    // console.log(control)
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  /**
   * Bind keyup actions for quantity and price in form
   */
  private bindUpdateValues() {
    fromEvent(this.quantityInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((text) => {
      this.workSubCategoryService.put(this.receptionId, this.worktodo.worktodo_id, {
        'quantity': parseInt(text)
      }).subscribe(
        (response) => {
          this.worktodo.quantity = response.quantity;
          this.emitUpdate(this.worktodo);
        }
      )
    });
    fromEvent(this.priceInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((text) => {
      this.workSubCategoryService.put(this.receptionId, this.worktodo.worktodo_id, {
        'price': parseFloat(text)
      }).subscribe(
        (response) => {
          this.worktodo.price = response.price;
          this.emitUpdate(this.worktodo);
        }
      )
    });
  }

  private bindValues() {
    /**
     * Format object
     */
    this.workTodoSelected = {
      "default_quantity": this.worktodo.quantity,
      "history_price": null,
      "id": this.worktodo.subcategory_id,
      "price": this.worktodo.price,
      "work": this.worktodo.subcategory
    };
    /**
     * Start list without subcategories
     */
    this.subcategoryList = [this.workTodoSelected];
    this.updateWorkFormGroup.patchValue({
      work_subcategory: this.workTodoSelected,
      price: this.workTodoSelected.price,
      quantity: this.workTodoSelected.default_quantity
    });
  }

  private changeWorkTodo(body: any) {
    body['notes'] = null;
    this.workSubCategoryService.put(this.receptionId, this.worktodo.worktodo_id, body).subscribe(
      (response) => {
        this.worktodo.notes = null;
        this.worktodo.price = response.price;
        this.worktodo.quantity = response.quantity;
        this.worktodo.subcategory = this.workTodoSelected.work;
        this.worktodo.subcategory_id = response.work_subcategory;
        this.emitUpdate(this.worktodo);
      }
    )
  }


  private emitUpdate(workTodo: any) {
    this.updateWorkTodoEmit.emit(workTodo);
    this.workTodoRepairService.updateReceptionInfoMessage.emit('update');
  }
}
