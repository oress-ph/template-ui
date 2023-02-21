export class TransferRequestItemModel {
  id: number = 0;
  tr_id: number = 0;
  customer_id?: number = 0;
  batch_number: string = '';
  manual_batch_number: string = '';
  customer_material_code: string = '';
  customer_material?: any;
  customer_material_id: number = 0;
  storage_type_id: number = 0;
  storage_type? : string = '';
  manufacturing_date: any = new Date();
  expiry_date: any = new Date();
  unit: string = '';
  upc: string = '';
  ccm?:any;
  material_classification?:any;
  kg1_multiplier?:any;
  quantity: number = 0;
  weight: number = 0;
  volume: number = 0;
  remarks: string = '';
}
