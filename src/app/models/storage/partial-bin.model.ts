export class PartialBinModel {
  id: number = 0;
  warehouse_id: number = 0;
  pb_number: string = '';
  pb_date:  any = new Date;
  manual_doc_number: string = '';
  inventory_item_id: number = 0; // inventory pallet
  inventory_item: any;
  source_inventory_pallet_id: number = 0;
  source_inventory_pallet: any;
  destination_inventory_pallet_id: number = 0;
  destination_inventory_pallet: any;
  remarks: string = '';
  status: string = '';
  prepared_by_user_id: number = 0;
  checked_by_user_id: number = 0;
  approved_by_user_id: number = 0;
  is_locked: boolean = false;
}
