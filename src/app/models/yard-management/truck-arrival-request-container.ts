export class TruckArrivalRequestContainerModel {
  id: number = 0;
  tr_id: number = 0;
  container_number: number = 0;
  storage_type_id: number = 0;
  storage_type?:any;
  eta: any = new Date();
  trucking_company: string = '';
  container_size: string = '';
  container_type: string = '';
  delivery_type: string = '';
  temperature: string = '';
  remarks: string = '';
  status: string = '';
}
