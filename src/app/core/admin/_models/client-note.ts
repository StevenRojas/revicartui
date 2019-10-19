import {Client} from './client';
import {User} from '../../auth';

export class ClientNote {
  id: number;
  comment: string;
  date: string;
  client: Client;
  user: User;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
