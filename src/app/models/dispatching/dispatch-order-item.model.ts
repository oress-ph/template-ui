export class DispatchOrderItem {
  id: number = 0;
  do_id: number = 0;
  pl_id: number = 0;
  pl_number? : string = '';
  batch_number? : string = '';
  manual_batch_number? : string = '';
  customer_material_code?: string = '';
  customer_material?: string = '';
  inventory_item_id: number = 0;
  inventory_item?:any;
  manufacturing_date?: any = new Date();
  expiry_date?: any = new Date();
  unit: string = '';
  quantity: number = 0;
  weight: number = 0;
  volume: number = 0;
  remarks: string = '';
}