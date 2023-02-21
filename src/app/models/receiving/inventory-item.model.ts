export class InventoryItemModel {
  id: number = 0;
  batch_number: string = '';
  manual_batch_number: string = '';
  warehouse_id: number = 0; // warehouser receiving
  customer_id: number = 0; // warehouser receiving
  customer_material_id: number = 0; // wr item customer
  customer_material_code?: any;
  customer_material?: any;
  storage_type_id: number = 0;
  storage_type: string = '';
  upc?: any;
  inventory_pallet_id: number = 0; // inventory pallet
  inventory_pallet?: any; // inventory pallet
  wr_id: number = 0; // wr pallet
  manufacturing_date: string = ''; // wr item 
  expiry_date: string = ''; // wr item 
  unit: string = ''; // wr item 
  quantity: number = 0; // wr item 
  weight: number = 0; // wr item 
  volume: number = 0; // wr item 
  remarks: string = ''; // wr item 
  status: string = ''; // wr item 
}
