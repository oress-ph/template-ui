export class TransferRequestModel {
  id: number = 0;
  warehouse_id: number = 0;
  tr_number: number = 0;
  tr_date: any = new Date();
  manual_doc_number: number = 0;
  customer_id: number = 0;
  customer: string = '';
  source_warehouse_id: number = 0;
  source_warehouse: string = '';
  date_needed: any = new Date();
  remarks: string = '';
  status: string = '';
  prepared_by_user_id: number = 0;
  checked_by_user_id: number = 0;
  approved_by_user_id: number = 0;
  is_locked: boolean = false;
  address: string = '';
}
