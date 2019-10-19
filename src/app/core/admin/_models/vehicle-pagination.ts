export class VehiclePagination {
  page: number;
  query: string|undefined;
  queryId: string|undefined;
  limit: number;
  sort: string;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
