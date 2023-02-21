export class PickListModel {
  id: number = 0;
  warehouse_id: number = 0;
  pl_number: string = '';
  pl_date: any = new Date();
  manual_doc_number: string = '';
  customer_id: number = 0;
  customer: any;
  address: string = '';
  dr_id: any = null;
  dr_number: string = '';
  date_needed: any;
  pick_list_type: string = '';
  storage_type_id: number = 1;
  storage_type: string = '';
  remarks: string = '';
  status: string = '';
  prepared_by_user_id: number = 0;
  checked_by_user_id: number = 0;
  approved_by_user_id: number = 0;
  is_locked: boolean = false;
}