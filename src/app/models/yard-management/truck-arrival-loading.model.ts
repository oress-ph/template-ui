export class TruckArrivalLoadingModel {
  id: number = 0;
  ta_id: number = 0;
  slip_number: number = 0;
  loading_dock_id: number = 0;
  loading_dock?:any;
  scheduled_loading_time: any = new Date();
  start_loading_time: any = new Date();
  end_loading_time: any = new Date();
  truck_out_time: any = new Date();
  total_number_of_hours: any;
  remarks: string = '';
  status: string = '';
}
