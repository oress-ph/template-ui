import { MaterialTypeModel } from "../administration/material-type.model";

export class CustomerMaterialModel {
  id: number = 0;
  code: string = '0000000000';
  customer_id: number = 0;
  customer?: any;
  customer_contacts?: any;
  material: string = '';
  storage_type_id: number = 0;
  storage_type: any;
  material_type_id: number = 0;
  material_type: any = new MaterialTypeModel();
  material_category_id: number = 0;
  material_category: any;
  material_classification: string = '';
  pallet_packaging: string = '';
  particulars: string = '';
  unit1_multiplier: number = 0;
  unit1: string = '';
  kg1_multiplier: any = 0;
  unit2_multiplier: number = 0;
  unit2: string = '';
  kg2_multiplier: any = 0;
  height_cm: number = 0;
  width_cm: number = 0;
  length_cm: number = 0;
  ccm: number = 0;
  shelf_life: number = 0;
  upc: string = '';
  is_valued: boolean = false;
  is_fast_moving: boolean = false;
}
