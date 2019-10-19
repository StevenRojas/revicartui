import {CompanyNote} from './company-note';

export class CompanyNoteList {
  list: CompanyNote[];
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
