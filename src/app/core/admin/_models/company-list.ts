// import {BaseListModel} from '../../_base/crud/models/_base_list.model';
import {Company} from './company';

export class CompanyList {
  list: Company[];
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
