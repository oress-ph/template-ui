export class BinToBinModel {
    id: number = 0;
    warehouse_id: number = 0;
    bb_number: string= '';
    bb_date: any = new Date;
    manual_doc_number: string ='';
    inventory_pallet_id: number = 0; // inventory pallet
    source_storage_room_bin_id: number = 0;
    destination_storage_room_bin_id: number = 0;
    remarks: string = '';
    status: string = '';
    prepared_by_user_id: number = 0;
    checked_by_user_id: number = 0;
    approved_by_user_id: number = 0;
    is_locked: boolean = false;
}
  