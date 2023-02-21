export class InventoryItemTransactionModel {
  id: number = 0;
  warehouse_id: number = 0;
  inventory_number: string = '';
  inventory_date: string = '';
  inventory_item_id: number = 0;
  inventory_item: number = 0;
  inventory_pallet_id: number = 0;
  manual_batch_number: string = '';
  manufacturing_date: string = '';
  expiry_date: string = '';
  unit: any = '';
  quantity: number = 0;
  weight: number = 0;
  volume: number = 0;
  wr_id: number = 0;
  pl_id: string = '';
  ia_id: string = '';
  pb_id: string = '';
  remarks: string = '';
}