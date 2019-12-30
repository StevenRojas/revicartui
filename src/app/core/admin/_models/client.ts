// import {BaseModel} from '../../_base/crud';

export class Client {
  id: number;
  name: string;
  phone: string;
  cell_phone: string;
  email: string;
  address: string;
  business_name: string;
  nit: string;
  vehicle_count: number;
  has_alert: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }

  clear(): void {
    this.id = undefined;
    this.name = '';
    this.phone = '';
    this.cell_phone = '';
    this.email = '';
    this.address = '';
    this.business_name = '';
    this.nit = '';
    this.vehicle_count = 0;
    this.has_alert = false;
    this.created_at = '';
    this.updated_at = '';
    this.deleted_at = '';
  }
}
