import { InventoryAdjustmentModel } from "./inventory-adjustment.model";

export class PhysicalCountModel {
    id: number = 0;
    warehouse_id: number = 0;
    warehouse?: any;
    pc_number: string = '';
    pc_date: any = new Date();
    manual_batch_number: string = '';
    customer_id: number = 0; 
    customer?: any;
    inventory_adjustment?: Array<InventoryAdjustmentModel>;
    type: string = '';
    remarks: string = '';
    status: string = '';
    prepared_by_user_id: number = 0;
    prepared_by_user?: any;
    checked_by_user_id: number = 0;
    approved_by_user_id: number = 0;
    is_locked: boolean = false;
  }
  