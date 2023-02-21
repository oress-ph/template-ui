export class DispatchRequestModel {
  id: number = 0;
  warehouse_id: number = 0;
  dr_number: string = '0000000000';
  dr_date: any = new Date();
  manual_doc_number: string = '0000000000';
  customer_id: number = 0;
  customer: string = '';
  tr_id: any = 0;
  tr_number: string = '';
  date_needed: any = new Date();
  pick_list_type: string = 'Foreground';
  remarks: string = '';
  status: string = '';
  prepared_by_user_id: number = 0;
  checked_by_user_id: number = 0;
  approved_by_user_id: number = 0;
  is_locked: boolean = false;
  address: string = '';
}