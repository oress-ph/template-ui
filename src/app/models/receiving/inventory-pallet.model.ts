export class InventoryPalletModel {
  id: number = 0;
  pallet_number: string = ''; // wr pallet
  pallet_packaging: string = ''; // wr pallet
  warehouse_id : number = 0; // wr pallet
  storage_type_id: number = 0; // wr pallet
  storage_type?: any;
  wr_id: number = 0; // wr pallet
  storage_room_bin_id: number = 0; // set default
  storage_room_bin?: any; // set default
  total_quantity: number = 0; // wr pallet
  total_weight: number = 0; // wr pallet
  total_volume: number = 0; // wr pallet
  remarks: string = '';
  status: string = ''; // set default
  warehouse_receiving?: any;
}