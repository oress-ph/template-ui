export class WarehouseReceivingPalletModel {
  id: number = 0;
  pallet_number: string = '0000000000';
  batch_number?: string = '0000000000';
  manual_pallet_number: string = '0000000000';
  wr_id: number = 0;
  customer_material?: any;
  storage_type_id: number = 0;
  pallet_packaging: string = '';
  total_quantity: number = 0;
  total_weight: number = 0;
  total_volume: number = 0;
  put_away_by_user_id: number = 0;
  status: string = '';
  remarks?: string = '';
}
