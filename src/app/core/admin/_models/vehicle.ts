// import {BaseModel} from '../../_base/crud';

export class Vehicle {
  id: number;
  license_plate: string;
  photo_path: string;
  brand: any;
  model: any;
  subtype: any;
  year: string;
  transmission: any;
  gas_type: any;
  use_type: any;
  mileage: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }

  clear(): void {
    this.id = null;
    this.license_plate = '';
    this.photo_path = '';
    this.brand = {};
    this.model = {};
    this.subtype = {};
    this.year = '';
    this.transmission = {};
    this.gas_type = {};
    this.use_type = {};
    this.mileage = '';
    this.created_at = '';
    this.updated_at = '';
    this.deleted_at = '';
  }
}
