import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Vehicle} from '../../../../../../core/admin';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'kt-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.scss']
})
export class VehicleEditComponent implements OnInit {

  @Input() vehicle: Vehicle;
  @Output() vehicleUpdateEmit = new EventEmitter<Vehicle>();

  public loading = false;
  public errors: any = [];
  public registerVehicleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.vehicle = new Vehicle();

  }

  ngOnInit() {
    this.registerVehicleForm = this.fb.group({
      id: ['', Validators.compose([])
      ],
      license_plate: ['', Validators.compose([])
      ],
      brand: ['', Validators.compose([])
      ],
      model: ['', Validators.compose([])
      ],
      subtype: ['', Validators.compose([])
      ],
      year: ['', Validators.compose([])
      ],
      transmission: ['', Validators.compose([])
      ],
      gas_type: ['', Validators.compose([])
      ],
      use_type: ['', Validators.compose([])
      ],
      mileage: ['', Validators.compose([])
      ],
    });
  }

}
