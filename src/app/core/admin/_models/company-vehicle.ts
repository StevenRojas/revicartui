import {Vehicle} from './vehicle';
import {Company} from './company';

export class CompanyVehicle {
  id: number;
  company: Company;
  vehicle: Vehicle;
  responsible: any;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
