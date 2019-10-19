export class CompanyPagination {
  page: number;
  query: string|undefined;
  queryId: string|undefined;
  limit: number;
  sort: string;
  pagination?: boolean;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
