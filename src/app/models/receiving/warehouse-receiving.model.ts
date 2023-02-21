export class WarehouseReceivingModel {
  id: number = 0;
  warehouse_id: number = 0;
  wr_number: string = '000000000';
  manual_doc_number: string = '000000000';
  container_number: string = '';
  truck_arrival?:any;
  wr_date: any = new Date;
  type: string = 'Storage';
  customer?: any;
  customer_id: number = 0;
  remarks: string = '';
  total_number_of_pallets: number = 0;
  total_weight: number = 0;
  status: string = '';
  prepared_by_user_id: number = 0;
  checked_by_user_id: number = 0;
  approved_by_user_id: number = 0;
  is_locked: boolean = false;
}
