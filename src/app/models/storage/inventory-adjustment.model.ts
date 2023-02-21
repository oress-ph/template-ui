export class InventoryAdjustmentModel {
    id: number = 0;
    warehouse_id: number = 0;
    ia_number: string = '';
    ia_date: string ='';
    manual_doc_number: string = '';
    pc_id: number = 0; 
    inventory_item_id: number = 0;
    manual_batch_number: string = '';
    manufacturing_date: string = '';
    expiry_date: string = '';
    unit: string = '';
    quantity: string = '';
    weight: string = '';
    volume: string = '';
    remarks: string = '';
    status: string = '';
    prepared_by_user_id: number = 0;
    checked_by_user_id: number = 0;
    approved_by_user_id: number = 0;
    is_locked: boolean = false;
  }
  