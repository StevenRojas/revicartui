import {Client} from './client';
import {Vehicle} from './vehicle';

export class ClientVehicle {
  id: number;
  client: Client;
  vehicle: Vehicle;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
