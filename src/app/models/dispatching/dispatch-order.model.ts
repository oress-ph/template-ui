export class DispatchOrderModel {
  id: number = 0;
  warehouse_id: number = 0;
  do_number: string = '';
  do_date: any = new Date();
  manual_doc_number: string = '';
  customer_id: number = 0;
  customer: any;
  address: string = '';
  dr_id: any = 0;
  dispatch_request: any;
  container_number: string = '';
  remarks: string = '';
  status: string = '';
  prepared_by_user_id: number = 0;
  checked_by_user_id: number = 0;
  approved_by_user_id: number = 0;
  is_locked: boolean = false;
}