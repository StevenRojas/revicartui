// import {BaseModel} from '../../_base/crud';
// import {Address} from './address.model';
// import {SocialNetworks} from './social-networks.model';

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  cell_phone: string;
  office: any;
  role: any;
  created_at: string;
  updated_at: string;
  deleted_at: string;

  clear(): void {
    this.id = undefined;
    this.name = '';
    this.email = '';
    this.password = '';
    this.cell_phone = '';
    this.office = {};
    this.role = {};
    this.created_at = '';
    this.updated_at = '';
    this.deleted_at = '';
  }

  default(): void {
    this.id = undefined;
    this.name = 'Nelson';
    this.email = 'cokacho@gmail.com';
    this.password = '';
    this.cell_phone = '';
    this.office = {};
    this.role = {};
    this.created_at = '';
    this.updated_at = '';
    this.deleted_at = '';
  }
}
