export class PhysicalCountItemModel {
  id: number = 0;
  pc_id: number = 0;
  physical_count?: any;
  inventory_item_id: number = 0;
  inventory_item?: any;
  manual_batch_number: string = '';
  manufacturing_date: any = new Date;
  expiry_date: any = new Date;
  unit: string = '';
  quantity: string = '';
  weight: string = '';
  volume: string = '';
  actual_manual_batch_number: string = '';
  actual_manufacturing_date: any = new Date;
  actual_expiry_date: any = new Date;
  actual_unit: string = '';
  actual_quantity: number = 0;
  actual_weight: number = 0;
  actual_volume: number = 0;
  status: string = '';
  is_locked: boolean = false;
  remarks: string = '';
  count_inventory_adjustment?: any;
}
