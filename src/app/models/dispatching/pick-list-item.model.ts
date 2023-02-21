export class PickListItemModel {
  id: number = 0;
  pl_id: number = 0;
  inventory_item_id: number = 0;
  inventory_item?: any;
  unit: string = '';
  quantity: number = 0;
  weight: number = 0;
  volume: number = 0;
  actual_unit: string = '';
  actual_quantity: number = 0;
  actual_weight: number = 0;
  actual_volume: number = 0;
  remarks: string = '';
  status: string = '';
}
