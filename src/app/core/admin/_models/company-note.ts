import {User} from '../../auth';
import {Company} from './company';

export class CompanyNote {
  id: number;
  comment: string;
  date: string;
  company: Company;
  user: User;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
