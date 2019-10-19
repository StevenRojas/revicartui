import {CompanyVehicle} from './company-vehicle';

export class CompanyVehicleList {
  list: CompanyVehicle[];
  pagination: {
    page: number,
    total: number
  };

  clear(): void {
    this.list = [];
    this.pagination = {
      page: 0,
      total: 0
    };
  }

  default(): void {
    this.list = [];
    this.pagination = {
      page: 0,
      total: 0
    };
  }

  getDefault() {
    return {
      list: [],
      pagination: {
        page: 0,
        total: 0
      }
    };
  }
}
