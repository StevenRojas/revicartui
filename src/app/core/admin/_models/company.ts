// import {BaseModel} from '../../_base/crud';

export class Company {
  id: number;
  parent: any;
  name: string;
  phone: string;
  email: string;
  address: string;
  nit: string;
  vehicle_count: number;
  has_alert: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }

  clear(): void {
    this.id = undefined;
    this.parent = null;
    this.name = '';
    this.phone = '';
    this.email = '';
    this.address = '';
    this.nit = '';
    this.vehicle_count = 0;
    this.has_alert = 0;
    this.created_at = '';
    this.updated_at = '';
    this.deleted_at = '';
  }
  getPut() {
  }
}
