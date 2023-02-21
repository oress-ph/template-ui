export class WarehouseReceivingItemModel {
  id: number = 0;
  batch_number: string = '0000000000';
  manual_batch_number: string = '0000000000';
  wr_id: number = 0;
  warehouse_receiving: any;
  wr_pallet_id: number = 0;
  warehouse_receiving_pallet: any;
  customer_material_id: number = 0;
  customer_material: any;
  manufacturing_date: any = new Date();
  expiry_date: any = new Date();
  unit: string = '';
  quantity: number = 0;
  weight: number = 0; // weight = gross_weight - (pallet_tare_weight + packing_tare_weight)
  volume: number = 0;
  pallet_tare_weight: number = 0;
  packing_tare_weight: number = 0;
  gross_weight: number = 0;
  remarks: string = '';
  status: string = '';
}

export class WarehouseReceivingItemPayloadModal {
  warehouseReceivingItemModel: WarehouseReceivingItemModel = new WarehouseReceivingItemModel();
  is_quick_receiving: boolean = false;
}

