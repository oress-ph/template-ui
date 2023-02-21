export class PutAwayModel {
    id: number = 0;
    warehouse_id: number = 0;
    pa_date: any = new Date;
    pa_number: string = '';
    manual_doc_number: string = '';
    inventory_pallet_id: number = 0;
    inventory_pallet: any;
    total_quantity: number = 0;
    total_weight: number = 0;
    storage_room_bin_id: number = 0;
    remarks: string = '';
    status: string = '';
    prepared_by_user_id: number = 0;
    checked_by_user_id: number = 0;
    approved_by_user_id: number = 0;
    is_locked: boolean = false;
    
}
  