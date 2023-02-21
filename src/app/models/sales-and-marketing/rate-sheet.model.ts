export class RateSheetModel {
  id: number = 0;
  rs_number: string = '';
  rs_date: any = new Date;
  manual_doc_number: string = '';
  customer_id: number = 0;
  customer: any;
  start_date: any = new Date;
  expiry_date: any = new Date;
  customer_type: string = '';
  status: string = '';
  remarks: string = '';
  prepared_by_user_id: number = 0;
  checked_by_user_id: number = 0;
  approved_by_user_id: number = 0;
  is_locked: boolean = false;
}
