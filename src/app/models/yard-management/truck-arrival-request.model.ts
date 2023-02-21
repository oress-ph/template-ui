export class TruckArrivalRequestModel {
  id: number = 0;
  branch_id: number = 0;
  tr_number: number = 0;
  tr_date: any = new Date();
  manual_doc_number: number = 0;
  customer_id: number = 0;
  customer: string = '';
  address: string = '';
  status: string = '';
  prepared_by_user_id: any = '';
  checked_by_user_id: any = '';
  approved_by_user_id: any = '';
  is_locked: boolean = false;
  remarks: string = '';
}
